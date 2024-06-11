import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../HR-Layout";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Employee_list'));
        const employeeData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching employee data: ', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'Employee_list', id));
        setEmployees(employees.filter(employee => employee.id !== id));
        alert('Employee deleted successfully');
      } catch (error) {
        console.error('Error deleting employee: ', error);
        alert('Failed to delete employee');
      }
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee.id);
    setEditData({
      Name: employee.Name,
      Position: employee.Position,
      Email: employee.Email,
      ContactNumber: employee.ContactNumber,
      DateOfJoining: new Date(employee.DateOfJoining.seconds * 1000).toISOString().substr(0, 10),
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    try {
      const docRef = doc(db, 'Employee_list', id);
      await updateDoc(docRef, {
        ...editData,
        DateOfJoining: new Date(editData.DateOfJoining),
      });
      setEmployees(employees.map(emp => (emp.id === id ? { id, ...editData, DateOfJoining: { seconds: new Date(editData.DateOfJoining).getTime() / 1000 } } : emp)));
      setEditId(null);
      alert('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee: ', error);
      alert('Failed to update employee');
    }
  };

  return (
    <Layout>
      <div>
        <h1>Employee List</h1>
        <table className="employee-list-table">
          <thead>
            <tr>
              <th className="head-column1">Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="epm-table row" style={{ padding: "10px 0px" }}>
                {editId === employee.id ? (
                  <>
                    <td className="column1">
                      <input
                        type="text"
                        name="Name"
                        value={editData.Name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Position"
                        value={editData.Position}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="Email"
                        value={editData.Email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ContactNumber"
                        value={editData.ContactNumber}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="DateOfJoining"
                        value={editData.DateOfJoining}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(employee.id)}>
                      <Image 
                      src={"/img/tableIcons/check.png"}
                      width={22}
                      height={22}
                      className='table-icon'
                      />
                      </button>
                      <button onClick={handleCancel}>
                      <Image 
                      src={"/img/tableIcons/x-button.png"}
                      width={22}
                      height={22}
                      className='table-icon'
                      />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="column1">{employee.Name}</td>
                    <td>{employee.Position}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.ContactNumber}</td>
                    <td>{new Date(employee.DateOfJoining.seconds * 1000).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>
                      <Image 
                      src={"/img/tableIcons/edit.png"}
                      width={22}
                      height={22}
                      className='table-icon'
                      />
                      </button>
                      <button onClick={() => handleDelete(employee.id)}>
                      <Image 
                      src={"/img/tableIcons/bin.png"}
                      width={22}
                      height={22}
                      className='table-icon'
                      />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Employees;