import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import PasswordSetting from "./PasswordSetting";
import axios from "axios";

function Settings(props) {
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        // phoneNo: "",
        errors: {},
    });
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios
    //       .get("http://127.0.0.1:8000/project")
    //       .then((response) => {
    //         setFormData(response.data);
    //         console.log(formData);
    //         console.log("Settings Date successfully!");
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching Settings Date :", error);
    //       });
    //   }, []);   

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

    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div>
                        <h3 className={"content-heading pb-4"}>Settings</h3></div>
                    <div className={"form-container"}>
                        <form onSubmit={handleSubmit} className={"row project-settings-form"}>
                            <div className="edit-img mb-3">
                                {/*<img src={Edit_img} alt="Profile image"/>*/}
                            </div>
                            <div className="col-md-6">
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
                            <div className="col-md-6">
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

                            <div className="col-md-6">
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
                            <div className="col-md-6">
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
                            {/* <div className="modal-footer ">
                                
                                    <button className="btn btn-secondary" type="Cancel"
                                            onClick={handleCancel}>Cancel
                                    </button>
                                    <button className="project-settings-btn" type="submit"
                                            onClick={handleSubmit}>Save
                                    </button>
                                
                                </div> */}
                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary  project-settings-btn"}
                                    onClick={handleSubmit}>Save
                                </button>

                            </div>
                        </form>
                    </div>
                    <PasswordSetting />
                </div>
            </div>


        </Layout>
    )
}

export default Settings;