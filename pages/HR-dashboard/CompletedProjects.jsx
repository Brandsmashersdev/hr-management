import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Layout from "../HR-Layout";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    team: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Completed_Projects'));
        const projectData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching project data: ', error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <Layout>
      <div className="project-container">

        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              <span><strong>Team:</strong></span>
              <span>{project.team}</span>
            </p>
            {/* <button onClick={() => moveToCompleted(project)}>Move to Completed Projects</button> */}
          </div>
        ))}
      </div>
{/* 
      <Modal show={showModal} handleClose={handleClose}>
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="team">Team:</label>
            <input
              type="text"
              id="team"
              name="team"
              value={newProject.team}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Project</button>
        </form>
      </Modal> */}
    </Layout>
  );
};

export default Project;