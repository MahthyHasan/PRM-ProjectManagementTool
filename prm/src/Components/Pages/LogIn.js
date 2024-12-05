import React, { useState } from "react";
import iconpath1 from "../../assets/icons/user-icon.svg";
import iconpath2 from "../../assets/icons/lock-icon.svg";
import logopath from "../../assets/logo.svg";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const initialFormData = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked!");

    // let hasErrors = false;
    // const newErrors = { ...errors };

    // // Validate username
    // if (!formData.username.trim()) {
    //   newErrors.username = "Username is required";
    //   hasErrors = true;
    // } else {
    //   newErrors.username = "";
    // }

    // // Validate password
    // if (!formData.password.trim()) {
    //   newErrors.password = "Password is required";
    //   hasErrors = true;
    // } else if (formData.password.length < 6) {
    //   newErrors.password = "Password should be at least 6 characters";
    //   hasErrors = true;
    // } else {
    //   newErrors.password = "";
    // }

    // if (hasErrors) {
    //   setErrors(newErrors);
    // } else {
      // console.log("dsbfadhsfadksf dshfayusdhvcyfsd")
      try {
        axios
          .post("http://127.0.0.1:8000/login", formData)
          .then(() => {
            console.log(formData);
            // setFormData(initialFormData);
            console.log("Login check");

            alert("Login successfully!");
            navigate("/home");
          })
          .catch(() => {
            alert("Login failed!");
          });
      } catch (err) {
        alert("Login Failed");
      }
    // }
  }

  return (
    <div className="sign-in-page">
      <div className="sign-in-form">
        <div className="row text-center">
          <img src={logopath} className="logo-pmt"></img>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
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
          </div>
          <div className="row mt-2">
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
          </div>
          <div className="row mt-4">
            <button className="signin-button" type="submit">
              Login
            </button>
          </div>
          <div className="row mt-1">
            <div className="col-6 d-flex justify-content-start">
              <p className="sign-in-small-text">Create new account</p>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <p className="sign-in-small-text">Forgot password?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
