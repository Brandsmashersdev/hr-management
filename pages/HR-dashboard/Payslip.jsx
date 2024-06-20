import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path as necessary
import Layout from "../HR-Layout";
import { background } from "@chakra-ui/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    salary: '',
    noOfLeaves: '',
    basicSalary: 0,
    overtimePay: 0,
    additionalPay: 0,
    professionalTax: 0,
    leaveDeduction: 0,
    totalEarnings: 0,
    totalDeductions: 0,
    netSalary: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__next"); // Ensure this runs on the client side
    }

    const fetchSalaryData = async () => {
      const salaryCollection = collection(db, "SalaryData");
      const attendanceCollection = collection(db, "Attendance");

      const salarySnapshot = await getDocs(salaryCollection);
      const attendanceSnapshot = await getDocs(attendanceCollection);

      const attendanceDataMap = attendanceSnapshot.docs.reduce((map, doc) => {
        const data = doc.data();
        map[data.employeeId] = data;
        return map;
      }, {});

      const salaryDataArray = salarySnapshot.docs.map((doc) => {
        const data = doc.data();
        const attendanceData = attendanceDataMap[data.employeeId] || {};

        const date = data.date.toDate();
        const noOfLeaves = attendanceData.noOfLeaves || 0;
        const baseSalary = data.basicSalary || 0;

        return {
          id: doc.id,
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          date: data.date, 
          formattedDate: date.toLocaleDateString(), 
          noOfLeaves,
          salary: baseSalary
        };
      });

      setSalaryData(salaryDataArray);
    };

    fetchSalaryData();
  }, []);


  const openModal = (employee) => {
    const professionalTax = calculateProfessionalTax(employee.salary);
    const leaveDeduction = calculateLeaveDeduction(employee.salary, employee.noOfLeaves);
    const totalEarnings = employee.salary + formData.overtimePay + formData.additionalPay;
    const totalDeductions = professionalTax + leaveDeduction;

    setSelectedEmployee(employee);
    setFormData({
      salary: employee.salary,
      noOfLeaves: employee.noOfLeaves,
      basicSalary: employee.salary, // Set basicSalary to original salary amount
      overtimePay: 0,
      additionalPay: 0,
      professionalTax,
      leaveDeduction,
      totalEarnings,
      totalDeductions,
      netSalary: totalEarnings - totalDeductions,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: parseFloat(value) };

    const professionalTax = calculateProfessionalTax(updatedFormData.salary);
    const leaveDeduction = calculateLeaveDeduction(updatedFormData.salary, updatedFormData.noOfLeaves);
    const totalEarnings = updatedFormData.salary + updatedFormData.overtimePay + updatedFormData.additionalPay;
    const totalDeductions = professionalTax + leaveDeduction;

    setFormData({
      ...updatedFormData,
      professionalTax,
      leaveDeduction,
      totalEarnings,
      totalDeductions,
      netSalary: totalEarnings - totalDeductions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeRef = doc(db, "SalaryData", selectedEmployee.id);
    const updatedData = {
      ...selectedEmployee,
      salary: parseFloat(formData.salary),
      noOfLeaves: parseInt(formData.noOfLeaves),
      basicSalary: parseFloat(formData.basicSalary),
      overtimePay: parseFloat(formData.overtimePay),
      additionalPay: parseFloat(formData.additionalPay),
      professionalTax: parseFloat(formData.professionalTax),
      leaveDeduction: parseFloat(formData.leaveDeduction),
      totalEarnings: parseFloat(formData.totalEarnings),
      totalDeductions: parseFloat(formData.totalDeductions),
      netSalary: parseFloat(formData.netSalary),
      date: selectedEmployee.date, 
    };

    await updateDoc(employeeRef, updatedData);

    // Update local state
    setSalaryData((prevData) =>
      prevData.map((item) =>
        item.id === selectedEmployee.id ? { ...updatedData, formattedDate: item.formattedDate } : item
      )
    );

    closeModal();
  };

  const calculateProfessionalTax = (salary) => {
    const annualSalary = salary * 12;
    return annualSalary > 700000 ? salary * 0.33 : 0;
  };

  const calculateLeaveDeduction = (salary, noOfLeaves) => {
    const leaveThreshold = 1.5;
    const deductionPerLeave = 0.03; // 3% deduction per leave day beyond the threshold

    if (noOfLeaves <= leaveThreshold) {
      return 0;
    }

    const extraLeaves = noOfLeaves - leaveThreshold;
    return salary * deductionPerLeave * extraLeaves;
  };

  return (
    <Layout>
      <h1>Payrolls / Payslip</h1>
      <div className="salary-table-adjusting">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>No. of Leaves</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((item) => (
              <tr key={item.id}>
                <td>{item.employeeId}</td>
                <td>{item.employeeName}</td>
                <td>{item.formattedDate}</td>
                <td>{item.noOfLeaves}</td>
                <td>{item.salary.toFixed(2)}</td>
                <td>
                  <button className="button" onClick={() => openModal(item)}>
                    Generate Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Salary Slip Modal"
      >
        {selectedEmployee && (
          <div id="salary-slip" className="container">
            <form onSubmit={handleSubmit} className="box" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className="company-color">XYZ Company</h2>
              <hr style={{ margin: "15px 0px" }} />
              <h2>Salary invoice</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <p>Employee ID: {selectedEmployee.employeeId}</p>
                  <p>Employee Name: {selectedEmployee.employeeName}</p>
                  <p>Position: {selectedEmployee.employeeName}</p>
                  <p>Pay Period: {selectedEmployee.formattedDate}</p>
                  <p>Pay Date: {selectedEmployee.formattedDate}</p>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div className="netpay">
                    <h2>{formData.netSalary.toFixed(2)}</h2>
                  </div>
                  <p>Paid Days: </p>
                  <p>Paid Leaves: {formData.noOfLeaves}</p>
                </div>
              </div>

              <table className="table-styling">
                <thead>
                  <tr>
                    <th>Earnings</th>
                    <th>Amount</th>
                    <th>Deductions</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Earnings</td>
                    <td>
                      <input
                        type="number"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td>Professional Tax</td>
                    <td>{formData.professionalTax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Overtime Pay</td>
                    <td>
                      <input
                        type="number"
                        name="overtimePay"
                        value={formData.overtimePay}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td>Leaves ({formData.noOfLeaves})</td>
                    <td>{formData.leaveDeduction.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Additional Pay</td>
                    <td>           
                      <input
                        type="number"
                        name="additionalPay"
                        value={formData.additionalPay}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Total Earnings</strong></td>
                    <td>{formData.totalEarnings.toFixed(2)}</td>
                    <td style={{ borderTop: "1px solid gray" }}><strong>Total Deductions</strong></td>
                    <td style={{ borderTop: "1px solid gray" }}>{formData.totalDeductions.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="PayableAmount">
                <div>
                  <h4>Total Payable Amount:</h4>
                  <p style={{ fontSize: "small" }}>Gross earning - Total deduction</p>
                </div>
                <div className="netpay">
                  <h3>{formData.netSalary.toFixed(2)}</h3>
                </div>
              </div>
              <button type="submit" className="button">Generate Slip</button>
            </form>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Salary;
