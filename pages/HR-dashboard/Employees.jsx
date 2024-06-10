import { db } from "../firebaseConfig"
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../HR-Layout";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

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

  return (
    <Layout>
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.Name}</td>
              <td>{employee.Email}</td>
              <td>{employee.Position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default Employees;