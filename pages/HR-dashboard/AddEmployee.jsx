import React, { useState } from "react";
import { db } from "../firebaseConfig"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Layout from "../HR-Layout";

const AddEmployee = () => {
  const [Name, setName] = useState("");
  const [Position, setPosition] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNum] = useState("");
  const [DateOfJoining, setDOJ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dateOfJoiningTimestamp = Timestamp.fromDate(new Date(DateOfJoining));
      await addDoc(collection(db, "Employee_list"), {
        Name,
        Position,
        Email,
        ContactNumber,
        DateOfJoining: dateOfJoiningTimestamp
      });
      setName("");
      setPosition("");
      setEmail("");
      setContactNum("");
      setDOJ("");
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee: ", error);
      alert("Failed to add employee");
    }
  };

  return (
    <Layout>
      <div className="Add-emp-container">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit} className="add-employee">
          <div>
            <label htmlFor="Name">Employee Name:</label>
            <input
              type="text"
              id="Name"
              value={Name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Position">Position:</label>
            <input
              type="text"
              id="Position"
              value={Position}
              placeholder="position"
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              value={Email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="ContactNumber">Contact number:</label>
            <input
              type="text"
              id="ContactNumber"
              value={ContactNumber}
              placeholder="number"
              onChange={(e) => setContactNum(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="DateOfJoining">Date of joining:</label>
            <input
              type="date"
              id="DateOfJoining"
              value={DateOfJoining}
              onChange={(e) => setDOJ(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Add Employee</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEmployee;