import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { values } from "underscore";

export const EditProfile = (props) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    // phoneNo: "",
    errors: {},
});
const navigate = useNavigate();
const validateForm = () => {
  const errors = {};
  if (!formData.fName) {
      errors.fName = "First name is required!";
  }
  if (!formData.lName) {
      errors.lName = "Last name is required!";
  }
  if (!formData.email) {
      errors.email = "Email is required!";
  }
  if (!formData.phoneNo) {
      errors.phoneNo = "Contact no is required!";
  }
  setFormData((prevState) => ({ ...prevState, errors }));
  return Object.keys(errors).length === 0;
}
  const [userNames, setUserNames] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

const handleCancel = () => {
    console.log("Form is cancelled")
    navigate('/home')
}
const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log(formData)
        console.log("Updated successfully")
    } else {
        console.log("Form is invalid");
    }
};

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/username")
  //     .then((response) => {
  //       setUserNames(response.data);
  //       console.log("Axios response", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching username list:", error);
  //     });
  // }, []);



  

  function statusUpdate(status) {
    values.status = status;
    console.log(props.selectedAppointment);
    console.log(props.selectedAppointment._id);
  }
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (

    <Modal

      {...props}
      size="ms"
      position='top-right'
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-right-top" // Add a custom class for styling
    >

      <Modal.Header
        closeButton


      >
        {
          <Modal.Title id="contained-modal-title-vcenter">
            {props.type === "Edit" && <div> Edit profile</div>}

          </Modal.Title>
        }
      </Modal.Header>
      <Modal.Body scrollable>
        <form onSubmit={handleSubmit}>
          {
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="fName" className="form-label">First name</label>
                <input type="text" className="form-control" placeholder="Enter First name"
                  name='fName' value={formData.fName} onChange={handleChange}
                />
                {formData.errors.fName && (
                  <p style={{ color: "red" }}>{formData.errors.fName}</p>
                )}
              </div>
            </div>
          }
          <div className="col-md-9">
            <div className="mb-3">
              <label htmlFor="lName" className="form-label">Last name</label>
              <input type="text" className="form-control" placeholder="Enter Last name" name='lName'
                value={formData.lName} onChange={handleChange}
              />
              {formData.errors.lName && (
                <p style={{ color: "red" }}>{formData.errors.lName}</p>
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" placeholder="Enter email"
                value={formData.email} onChange={handleChange}
              />
              {formData.errors.email && (
                <p style={{ color: "red" }}>{formData.errors.email}</p>
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">Contact Number</label>
              <input type="text" className="form-control" name="phoneNo" placeholder="Enter phoneNo"
                value={formData.phoneNo} onChange={handleChange}
              />
              {formData.errors.phoneNo && (
                <p style={{ color: "red" }}>{formData.errors.phoneNo}</p>
              )}
            </div>
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
        <button
            type="button"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          >
           save
          </button>


        



      </Modal.Footer>
    </Modal>

  );
};
