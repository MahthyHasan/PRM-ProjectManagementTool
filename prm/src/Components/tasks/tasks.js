import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import FeatherIcon from "feather-icons-react";
import { values, pick, filter } from "underscore";
import { TaskForm } from "./TaskForm";
import Dad2 from "../dad/Dad2";
import axios from "axios";
import "./Task.css";
// import TaskForm from "../tasks/TaskForm";

function Tasks(props) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/task")
      .then((response) => {
        setTaskList(response.data);
        console.log("Axios response", response.data);
        console.log("Task listed successfully!");
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  console.log(taskList);

  const [modalType, setModalType] = useState("view");
  const [projectsAllist, setprojectsAllist] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [graph, setGraph] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

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
      setTaskList(projectsAllist);
    }
  }

  function colorChange(status) {
    switch (status) {
      case "Todo":
        return "bg-warning text-dark";
      case "Inprogress":
        return "bg-success text-white";
      case "Done":
        return "bg-primary text-white";
      default:
        return "";
    }
  }

  return (
    <Layout>
      <div className={"container"}>
        <div className={"p-5"}>
          <div className={"project_container"}>
            <div className={"students_container"}>
              <div>
                <h3 className={"content-heading"}>Tasks</h3>
              </div>
              <div
                className={
                  "students-dropdown-container d-flex justify-content-end pb-3"
                }
              >
                {!graph && (
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
                        </form>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={"btn btn-primary tasks-dropdown-btn"}
                      onClick={() => {
                        setModalType("Add");
                        setModalShow(true);
                      }}
                    >
                      <FeatherIcon
                        className={"action-icons text-white"}
                        icon={"plus"}
                      />
                      Add Tasks
                    </button>
                  </div>
                )}
                <div>
                  <button
                    className={"btn btn-primary tasks-dropdown-btn"}
                    type="button"
                    aria-expanded="false"
                    onClick={() => setGraph(!graph)}
                  >
                    <FeatherIcon
                      className={"action-icons text-white"}
                      icon={"bar-chart-2"}
                    />
                    {graph ? "Table" : "List"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {!graph && (
            <div>
              <table className={"table table-hover table-striped "}>
                <thead className={"top-0 position-sticky h-45"}>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((task, index) => (
                    <tr>
                      <th scope="row">{task.id}</th>
                      <td>{task.taskName}</td>
                      <td>{task.description}</td>
                      <td>{task.deadline}</td>
                      <td>{task.member}</td>
                      <td>
                        <div
                          className={
                            "text-center cursor-pointer taskstate " +
                            colorChange(task.status)
                          }
                          onClick={() => {
                            setModalShow(true);
                            setModalType("State");
                          }}
                        >
                          {task.status}
                        </div>
                      </td>
                      <td className={"table-action"}>
                        <div
                          type="button"
                          onClick={() => {
                            setModalType("View");
                            setModalShow(true);
                            setModalData(task);
                          }}
                        >
                          <FeatherIcon
                            className={"action-icons"}
                            icon={"eye"}
                            onClick={() => {
                              setModalType("View");
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {taskList.length === 0 && (
                <div className={"text-center py-5 fw-bold"}>
                  No task found,Please Add
                </div>
              )}
            </div>
          )}
          {graph && <Dad2 />}
        </div>
      </div>
      <TaskForm
        show={modalShow}
        type={modalType}
        // update={() => setUpdate(!update)}
        onHide={() => {
          setModalShow(false);
        }}
        modelData={modalData}
      />
    </Layout>
  );
}

export default Tasks;
