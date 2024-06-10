import { db } from "../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../Layout";

async function addData(name, email) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email
    });
    console.log("doc added with ID ", docRef.id);
    return true;
    }
  catch (error) {
    console.error("error occured ", error);
    return false;
    }
}


const Employees = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addData(name, email) 
    if (added) {
      setName("");
      setEmail("");

      alert("Data added to HRMS")
    }
  }

  return (
    <Layout>
      <h1>Employees</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">name: </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">email: </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Employees;