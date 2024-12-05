import React, {useEffect, useState} from "react";
import Layout from "../../layout/Layout";
import {useNavigate} from "react-router-dom";

function PasswordSetting() {

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
        errors: {},
    });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(formData);
    }, [formData]);
    const validateForm = () => {
        const errors = {};
        if (!formData.oldPassword) {
            errors.oldPassword = " Old Password is required!";
        }
        if (!formData.newPassword) {
            errors.newPassword = "New Password is required!";
        }
        
        setFormData((prevState) => ({...prevState, errors}));
        return Object.keys(errors).length === 0;
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
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
        <div className={"form-container pt-3 mt-5"}>
            <form className={"row project-settings-form"}>
                
                <div className="col-md-6">
                <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                <input type="text" className="form-control" placeholder="Enter oldPassword"
                 name='oldPassword' value={formData.oldPassword} onChange={handleChange}
                 />
                 {formData.errors.oldPassword && (
                                        <p style={{ color: "red" }}>{formData.errors.oldPassword}</p>
                                    )}
                </div>
                 </div>                    
                 <div className="col-md-6">
                    <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                     <input type="text" className="form-control" placeholder="Enter New Password" name='newPassword'
                     value={formData.newPassword} onChange={handleChange}
                         />
                         {formData.errors.newPassword && (
                                        <p style={{ color: "red" }}>{formData.errors.newPassword}</p>
                                    )}
                    </div>
                    </div>
                    
              
                


                <div className={"modal-footer student-settings-btn"}>

                    <button type="submit" className={"btn btn-secondary  project-settings-btn"}
                            onClick={handleSubmit}>Update Password
                    </button>

                </div>

            </form>
        </div>
    );
}

export default PasswordSetting;