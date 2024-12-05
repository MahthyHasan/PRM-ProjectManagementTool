import React, {useEffect, useState} from "react";
import Layout from "../../layout/Layout";
import {useNavigate} from "react-router-dom";

function EditProfile() {
    const [formData, setFormData] = useState({
        fName: "Kekajan",
        lName: "Paramalingam",
        email: "kekajanpk4220@gmail.com",
        phoneNo: "0776053898",
        errors: {},
    });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(formData);
    }, [formData]);
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
        <Layout>
            <div className='container'>
                <div className='col-lg-6 col-md-12'>
                    <div className='row mt-5'>
                        <div className=''>
                            <h2 className='common-color mb-5'>Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="edit-img mb-3">
                                    {/*<img src={Edit_img} alt="Profile image"/>*/}
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label htmlFor="fName" className="form-label">First name</label>
                                        <input type="text" className="form-control" placeholder="First name"
                                               name='fName' value={formData.fName} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lName" className="form-label">Last name</label>
                                        <input type="text" className="form-control" placeholder="Last name" name='lName'
                                               value={formData.lName} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="email"
                                           value={formData.email} onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phoneNo" className="form-label">Contact Number</label>
                                    <input type="text" className="form-control" name="phoneNo"
                                           value={formData.phoneNo} onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-around mt-4'>
                                    <button className="btn btn-secondary" type="submit"
                                            onClick={handleCancel}>Cancel
                                    </button>
                                    <button className="btn btn-primary" type="submit"
                                            onClick={handleSubmit}>Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile