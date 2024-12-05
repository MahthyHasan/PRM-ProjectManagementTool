import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { values, pick, filter, pluck } from "underscore";

function Home(props) {
  const [projectsList, setProjectsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/project")
      .then((response) => {
        setProjectsList(response.data);
        console.log(projectsList);
        console.log("Project listed successfully!");
      })
      .catch((error) => {
        console.error("Error fetching project list:", error);
      });
  }, []);

  const [projectsAllist, setprojectsAllist] = useState([]);

  function handleSearch(e) {
    let val = e.target.value;
    if (val !== "") {
      let res = filter(projectsAllist, function (item) {
        return values(pick(item, "Name", "Key", "Type", "Lead"))
          .toString()
          .toLocaleLowerCase()
          .includes(val.toLocaleLowerCase());
      });
      setprojectsAllist(res);
      console.log(res);
    } else {
      setProjectsList(projectsAllist);
    }
  }

  function handleIconClick(event) {
    event.stopPropagation();
    navigate("/projectSetting");
  }

  return (
    <Layout>
      <div className={"container"}>
        <div className={"p-5"}>
          <div className={"project_container"}>
            <div className={"students_container"}>
              <div>
                <h3 className={"content-heading"}>Project</h3>
              </div>
              <div
                className={
                  "students-dropdown-container d-flex justify-content-end pb-3"
                }
              >
                <div className={"table-btn-container"}>
                  <div className={"appointment-search"}>
                    <div className="container-fluid">
                      <form className="d-flex" role="search">
                        <input
                          className="form-control project_btn me-2 w-50"
                          onChange={handleSearch}
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                  {
                    <button
                      type="button"
                      className={"btn btn-primary"}
                      onClick={() => {
                        navigate("/createProject");
                        console.log("Create project button clicked!");
                      }}
                    >
                      <FeatherIcon
                        className={"action-icons text-white"}
                        icon={"plus"}
                      />
                      Create Project
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>

          <table className={"table table-hover table-striped"}>
            <thead className={"top-0 position-sticky h-45"}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Project Name</th>
                <th scope="col">Key</th>
                <th scope="col">Project Type</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((project, index) => (
                <tr
                  key={project.id}
                  onClick={() => navigate(`/tasks/${project.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <th scope="row">{project.id}</th>
                  <td>{project.name}</td>
                  <td>{project.key}</td>
                  <td>{project.proType}</td>
                  <td>{project.desc}</td>
                  <td onClick={(event) => handleIconClick(event)}>
                    <FeatherIcon className={"action-icons"} icon={"edit"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projectsList.length === 0 && (
            <div className={"text-center py-5 fw-bold"}>
              No Projects Found, Please Add
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;