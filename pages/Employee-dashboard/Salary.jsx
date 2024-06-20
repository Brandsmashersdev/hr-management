import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path as necessary
import Layout from "../Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

        const date = data.date.toDate(); // Convert Firestore timestamp to JavaScript Date object
        const noOfLeaves = attendanceData.noOfLeaves || 0;
        const bonus = data.bonus || 0;
        const baseSalary = data.salary || 0;
        const adjustedSalary = calculateAdjustedSalary(baseSalary, noOfLeaves);

        return {
          id: doc.id,
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          date: date.toLocaleDateString(), // Format the date as needed
          noOfLeaves,
          bonus,
          salary: adjustedSalary,
        };
      });

      setSalaryData(salaryDataArray);
    };

    fetchSalaryData();
  }, []);

  const calculateAdjustedSalary = (salary, noOfLeaves) => {
    const leaveThreshold = 1.5;
    const deductionPerLeave = 0.03; // 3% deduction per leave day beyond the threshold

    if (noOfLeaves <= leaveThreshold) {
      return salary;
    }

    const extraLeaves = noOfLeaves - leaveThreshold;
    const deduction = salary * deductionPerLeave * extraLeaves;
    const adjustedSalary = salary - deduction;

    return adjustedSalary;
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  const downloadPDF = () => {
    const input = document.getElementById('salary-slip');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('salary_slip.pdf');
    });
  };

  return (
    <Layout>
      <div className="salary-table-adjusting">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>No. of Leaves</th>
              <th>Bonus</th>
              <th>Salary</th>
              <th>Slip</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((item) => (
              <tr key={item.id}>
                <td>{item.employeeId}</td>
                <td>{item.employeeName}</td>
                <td>{item.date}</td>
                <td>{item.noOfLeaves}</td>
                <td>{item.bonus}</td>
                <td>{item.salary.toFixed(2)}</td>
                <td>
                  <button className="button" onClick={() => openModal(item)}>
                    Slip
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
            <div className="box" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className="company-color">XYZ Company</h2>
              <hr style={{margin: "15px 0px"}} />
              <h2>Salary invoice</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <p>Employee ID: {selectedEmployee.employeeId}</p>
                  <p>Employee Name: {selectedEmployee.employeeName}</p>
                  <p>Position: {selectedEmployee.employeeName}</p>
                  <p>Pay Period: {selectedEmployee.date}</p>
                  <p>Pay Date: {selectedEmployee.date}</p>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div className="netpay">
                    <h2>{selectedEmployee.salary.toFixed(2)}</h2>
                  </div>
                  <p>Paid Days: </p>
                  <p>Paid Leaves: {selectedEmployee.noOfLeaves}</p>
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
                    <td>$1000</td>
                    <td>Professional Tax</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>Overtime Pay</td>
                    <td>$200</td>
                    <td>Leaves (2)</td>
                    <td>$30</td>
                  </tr>
                  <tr>
                    <td>Additional Pay</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td><strong>Total Earnings</strong></td>
                    <td>$1400</td>
                    <td style={{borderTop:"1px solid gray"}}><strong>Total Deductions</strong></td>
                    <td style={{borderTop:"1px solid gray"}}>$70</td>
                  </tr>
                  {/* <tr>
                    <td colSpan="4"><strong>Net Amount</strong></td>
                  </tr> */}
                </tbody>
              </table>

              <div className="PayableAmount">
                <div>
                <h4>Total Payable Amount:</h4>
                  <p style={{fontSize: "small"}}>Gross earning - Total deduction</p>
                </div>
                <div className="netpay">
                <h3>{selectedEmployee.salary.toFixed(2)}</h3>
                </div>
              </div>

              <span className="download"><button onClick={downloadPDF} className="btn">Download</button></span>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Salary;
