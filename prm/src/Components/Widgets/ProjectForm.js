import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectForm({ props, initialData, onSubmit }) {
  const [projectData, setProjectData] = useState({
    name: "",
    key: "",
    proType: "",
    desc: "",
    errors: {},
  });
  const initialProjectData = {
    name: "",
    key: "",
    proType: "",
    desc: "",
    errors: {},
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (props === "update") {
      setProjectData(initialData);
    }
  }, [props, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!projectData.name) {
      errors.name = "Project name is required!";
    }
    if (!projectData.key) {
      errors.key = "Key is required!";
    }
    if (!projectData.proType) {
      errors.proType = "Team type is required!";
    }
    if (!projectData.desc) {
      errors.desc = "Description is required!";
    }
    setProjectData((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    console.log("Form is cancelled");
    navigate("/home");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (validateForm()) {
        axios
          .post("http://127.0.0.1:8000/project", projectData)
          .then(() => {
            setProjectData(initialProjectData);
            console.log(projectData);
            console.log("Project created successfully");
            alert("Project created successfully!");
            navigate("/home");
          })
          .catch(() => {
            alert("Project creation failed!");
          });
      } else {
        console.log("Invalid form");
      }
    } catch (err) {
      alert("Project creation Failed");
    }
  }

  return (
    <div className="container">
      <div className="col-lg-6 col-md-12">
        <div className="row mt-4">
          <div className="common-color mb-4">
            {props === "create" && <h2>Create Project</h2>}
            {props === "update" && <h2>Update Project</h2>}
          </div>
          <div>
            {props === "create" && (
              <p>
                Add your project's details to create your new project. Edit
                project details anytime in project settings.
              </p>
            )}
            {props === "update" && (
              <p>You can easily edit project details here.</p>
            )}
          </div>
          <div className="col-md-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your project name"
                  value={projectData.name}
                  onChange={handleChange}
                />
                {projectData.errors.name && (
                  <p style={{ color: "red" }}>{projectData.errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="key" className="form-label">
                  Key
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="key"
                  placeholder="Enter your key"
                  value={projectData.key}
                  onChange={handleChange}
                />
                {projectData.errors.key && (
                  <p style={{ color: "red" }}>{projectData.errors.key}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="proType" className="form-label">
                  Project type
                </label>
                <select
                  name="proType"
                  className="form-select"
                  value={projectData.proType}
                  onChange={handleChange}
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Desktop Application">
                    Desktop Application
                  </option>
                  <option value="Embedded Systems">Embedded Systems</option>
                  <option value="Data Science and Machine Learning">
                    Data Science and Machine Learning
                  </option>
                  <option value="Game Development">Game Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
                {projectData.errors.proType && (
                  <p style={{ color: "red" }}>{projectData.errors.proType}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="desc"
                  rows="3"
                  value={projectData.desc}
                  onChange={handleChange}
                ></textarea>
                {projectData.errors.desc && (
                  <p style={{ color: "red" }}>{projectData.errors.desc}</p>
                )}
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-secondary me-5"
                  type="submit"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {props === "create" ? "Create project" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
