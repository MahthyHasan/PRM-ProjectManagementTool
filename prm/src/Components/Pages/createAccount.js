import React from "react";
import { useState } from "react";
import iconpath1 from "../../assets/icons/user-icon.svg";
import iconpath2 from "../../assets/icons/lock-icon.svg";
import iconpath3 from "../../assets/icons/email-icon.svg";
import iconpath4 from "../../assets/icons/name-icon.svg";
import logopath from "../../assets/logo.svg";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ... (previous imports)

function CreateAccount() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fName: "",
    lName: "",
    password: "",
    rPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    fName: "",
    lName: "",
    password: "",
    rPassword: "",
  });

  const initialFormData = {
    email: "",
    username: "",
    fName: "",
    lName: "",
    password: "",
    rPassword: "",
  };
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { ...errors };

    // Validate email
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    } else {
      newErrors.email = "";
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      hasErrors = true;
    } else {
      newErrors.username = "";
    }

    // Validate first name
    if (!formData.fName.trim()) {
      newErrors.fName = "First name is required";
      hasErrors = true;
    } else {
      newErrors.fName = "";
    }

    // Validate last name
    if (!formData.lName.trim()) {
      newErrors.lName = "Last name is required";
      hasErrors = true;
    } else {
      newErrors.lName = "";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
      hasErrors = true;
    } else {
      newErrors.password = "";
    }

    // Validate re-entered password
    if (!formData.rPassword.trim()) {
      newErrors.rPassword = "Please re-enter your password";
      hasErrors = true;
    } else if (formData.password !== formData.rPassword) {
      newErrors.rPassword = "Passwords do not match";
      hasErrors = true;
    } else {
      newErrors.rPassword = "";
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      try {
        axios
          .post("http://127.0.0.1:8000/register", formData)
          .then(() => {
            console.log(formData);
            setFormData(initialFormData);
            console.log("Account created successfully");
            alert("Account created successfully!");
            navigate("/signIn");
          })
          .catch(() => {
            alert("Account creation failed!");
          });
      } catch (err) {
        alert("Account creation Failed");
      }
    }
  };

  return (
    <div className="sign-in-page">
      <div className="create-account-form">
        <div className="row text-center">
          <img src={logopath} className="logo-pmt" alt="Logo"></img>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-6">
              <label htmlFor="email" className="sign-in-form-input-lable">
                <img
                  src={iconpath3}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="email"
                  className="sign-in-form-input"
                  type="text"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              {errors.email && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="username" className="sign-in-form-input-lable">
                <img
                  src={iconpath1}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="username"
                  className="sign-in-form-input"
                  type="text"
                  placeholder="USERNAME"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              {errors.username && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.username}
                </p>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label htmlFor="fName" className="sign-in-form-input-lable">
                <img
                  src={iconpath4}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="fName"
                  className="sign-in-form-input"
                  type="text"
                  placeholder="FIRST NAME"
                  value={formData.fName}
                  onChange={handleChange}
                />
              </label>
              {errors.fName && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.fName}
                </p>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="lName" className="sign-in-form-input-lable">
                <img
                  src={iconpath4}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="lName"
                  className="sign-in-form-input"
                  type="text"
                  placeholder="LAST NAME"
                  value={formData.lName}
                  onChange={handleChange}
                />
              </label>
              {errors.lName && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.lName}
                </p>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label htmlFor="password" className="sign-in-form-input-lable">
                <img
                  src={iconpath2}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="password"
                  className="sign-in-form-input"
                  type="password"
                  placeholder="PASSWORD"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              {errors.password && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="rPassword" className="sign-in-form-input-lable">
                <img
                  src={iconpath2}
                  alt="User Icon"
                  className="input-lable-icon"
                />
                <input
                  id="rPassword"
                  className="sign-in-form-input"
                  type="password"
                  placeholder="RE-ENTER PASSWORD"
                  value={formData.rPassword}
                  onChange={handleChange}
                />
              </label>
              {errors.rPassword && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.rPassword}
                </p>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <button type="submit" className="signin-button">
              Create Account
            </button>
          </div>
        </form>
        <div className="row mt-2">
          <p className="sign-in-small-text">Log In</p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
