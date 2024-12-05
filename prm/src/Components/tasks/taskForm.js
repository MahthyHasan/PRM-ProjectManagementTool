import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { values } from "underscore";
import { useParams } from "react-router-dom";

export const TaskForm = (props) => {
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    member: "",
    deadline: "",
    errors: {},
  });
  const navigate = useNavigate();

  const initialFormData = {
    taskName: "",
    description: "",
    member: "",
    deadline: "",
    errors: {},
  };
  const [userNames, setUserNames] = useState([]);
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.taskName) {
      errors.taskName = "Task name is required!";
    }
    if (!formData.description) {
      errors.description = "Description is required!";
    }
    if (!formData.member) {
      errors.member = "Member is required!";
    }
    if (!formData.deadline) {
      errors.deadline = "Deadline is required!";
    }

    setFormData((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/username")
      .then((response) => {
        setUserNames(response.data);
        console.log("Axios response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching username list:", error);
      });
  }, []);

  useEffect(() => {
    if (props.type === "View" && props.selectedTaskId) {
      axios
        .get(`http://127.0.0.1:8000/task/${props.selectedTaskId}`)
        .then((response) => {
          setFormData(response.data);
          console.log("Axios response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });
    }
  }, [props.type, props.selectedTaskId]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(id);
    try {
      if (validateForm()) {
        axios
          .post(`http://127.0.0.1:8000/task/${id}`, formData)
          .then(() => {
            console.log(formData);
            setFormData(initialFormData);
            console.log("Task created successfully");
            alert("Task created successfully!");
            props.onHide();
          })
          .catch(() => {
            alert("Task creation failed!");
          });
      } else {
        console.log("Invalid form");
      }
    } catch (err) {
      alert("Task creation Failed");
    }
  }

  function statusUpdate(status) {
    values.status = status;
    console.log(props.selectedAppointment);
    console.log(props.selectedAppointment._id);
  }
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      scrollable={true}
    >
      <Modal.Header
        closeButton
        // onHide={() => {
        //   if (!formSubmitted) {
        //       initForm({});
        //   }
        // }}
      >
        {
          <Modal.Title id="contained-modal-title-vcenter">
            {props.type === "Add" && <div> Add Task Details</div>}
            {props.type === "View" && <div> View Task Details</div>}
          </Modal.Title>
        }
      </Modal.Header>
      <Modal.Body scrollable>
        <form onSubmit={handleSubmit}>
          {
            <div className={"mb-4"}>
              <label
                htmlFor="taskName"
                className={`form-label ${
                  ["View", "State"].includes(props.type)
                    ? " profile-view-text "
                    : ""
                }`}
              >
                Task Name
              </label>
              <input
                name={"taskName"}
                placeholder={"Enter Task Name"}
                className={` form-control  ${
                  formData.errors.taskName ? "border-red" : ""
                } ${
                  ["View", "State"].includes(props.type)
                    ? " form-control:disabled"
                    : ""
                }  `}
                id="taskName"
                onChange={handleChange}
                value={
                  props.type == "View"
                    ? props.modelData.taskName
                    : formData.taskName
                }
                disabled={["View", "State"].includes(props.type)}
              />
              {formData.errors.taskName && (
                <p className={"text-red"}>{formData.errors.taskName}</p>
              )}
            </div>
          }

          {["Add", "State", "View"].includes(props.type) && (
            <div className={"col-md-12"}>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className={`form-label ${
                    ["View", "State"].includes(props.type)
                      ? " profile-view-text "
                      : "form-label"
                  }`}
                >
                  Description
                </label>
                <textarea
                  name={"description"}
                  placeholder={"Enter Description"}
                  className={`form-control ${
                    formData.errors.description ? "border-red" : ""
                  }${
                    ["View", "State"].includes(props.type)
                      ? " form-control:disabled "
                      : ""
                  } `}
                  id="description"
                  onChange={handleChange}
                  value={
                    props.type === "View"
                      ? props.modelData.description
                      : formData.description
                  }
                  aria-describedby="emailHelp"
                  disabled={["View", "State"].includes(props.type)}
                />
                {formData.errors.description && (
                  <p className={"text-red"}>{formData.errors.description}</p>
                )}
              </div>
            </div>
          )}
          {
            <div className={"mb-4"}>
              <label
                htmlFor="deadline"
                className={`form-label ${
                  ["View", "State"].includes(props.type)
                    ? " profile-view-text "
                    : "form-label"
                }`}
              >
                Deadline{" "}
              </label>
              <input
                id="deadline"
                className={`form-control ${
                  formData.errors.deadline ? "border-red" : ""
                } ${
                  ["View", "State"].includes(props.type)
                    ? " form-control:disabled "
                    : ""
                } `}
                onChange={handleChange}
                name={"deadline"}
                value={
                  props.type === "View"
                    ? props.modelData.deadline
                    : formData.deadline
                }
                type="date"
                disabled={["View", "State"].includes(props.type)}
              />

              {formData.errors.deadline && (
                <p className={"text-red"}>{formData.errors.deadline}</p>
              )}
            </div>
          }

          <div className="mb-4">
            <label htmlFor="member" className="form-label">
              Assigned To
            </label>
            <select
              name="member"
              className="form-select"
              value={
                props.type === "View" ? props.modelData.member : formData.member
              }
              onChange={handleChange}
            >
              {userNames.map((user, index) => (
                <option key={index} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
            {formData.errors.member && (
              <p style={{ color: "red" }}>{formData.errors.member}</p>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className={"btn btn-secondary"}
          onClick={() => {
            if (!formSubmitted) {
              // Prevent hiding the modal if the form is submitted
              props.onHide();
            }
          }}
        >
          Cancel
        </button>

        {props.type === "State" && (
          <div className="d-flex gap-2">
            <button
              type="button"
              className={"btn btn-success"}
              onClick={() => statusUpdate("ACCEPTED")}
            >
              In Progress
            </button>
            <button
              type="button"
              className={"btn btn-danger"}
              onClick={() => statusUpdate("DECLINE")}
            >
              Canceled
            </button>
            {/* <button*/}
            {/*    type="button"*/}
            {/*    className={"btn btn-warning"}*/}
            {/*    onClick={()=>statusUpdate("REQUESTED")}*/}
            {/*>*/}
            {/*    Request*/}
            {/*</button>*/}
          </div>
        )}
        {props.type === "Add" && (
          <button
            type="button"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          >
            Create Task
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
