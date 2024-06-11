import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Layout from "../HR-Layout";
import Modal from "./Modal"; // Adjust the import path as necessary

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
        const querySnapshot = await getDocs(collection(db, 'Projects'));
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

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Project_list'), {
        ...newProject,
      });
      setProjects([...projects, { ...newProject }]);
      setNewProject({
        title: "",
        description: "",
        team: "",
      });
      handleClose();
    } catch (error) {
      console.error('Error adding new project: ', error);
    }
  };

  const moveToCompleted = async (project) => {
    try {
      // Add project to 'Completed_Projects' collection
      await addDoc(collection(db, 'Completed_Projects'), {
        ...project,
      });

      // Remove project from 'Project_list' collection
      await deleteDoc(doc(db, 'Projects', project.id));

      // Update local state to remove the moved project
      setProjects(projects.filter(p => p.id !== project.id));
    } catch (error) {
      console.error('Error moving project to completed: ', error);
    }
  };

  return (
    <Layout>
      <div className="project-container">
        <div className="addProject" onClick={handleShow}>
          <h1>+</h1>
        </div>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              <span><strong>Team:</strong></span>
              <span>{project.team}</span>
            </p>
            <button onClick={() => moveToCompleted(project)}>Move to Completed Projects</button>
          </div>
        ))}
      </div>

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
      </Modal>
    </Layout>
  );
};

export default Project;