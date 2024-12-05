import React from "react";
import iconpath1 from "../../assets/icons/user-icon.svg";
import iconpath2 from "../../assets/icons/lock-icon.svg";
import logopath from "../../assets/logo.svg";

function Signin() {
  return (
    <div className="sign-in-page">
      <div className="sign-in-form">
        <div className="row text-center">
          <img src={logopath} className="logo-pmt"></img>
        </div>
        <div className="row mt-4">
          <label htmlFor="username" className="sign-in-form-input-lable">
            <img src={iconpath1} alt="User Icon" className="input-lable-icon" />
            <input
              id="username"
              className="sign-in-form-input"
              type="text"
              placeholder="USERNAME"
            />
          </label>
        </div>
        <div className="row mt-2">
          <label htmlFor="username" className="sign-in-form-input-lable">
            <img src={iconpath2} alt="User Icon" className="input-lable-icon" />
            <input
              id="username"
              className="sign-in-form-input"
              type="text"
              placeholder="PASSWORD"
            />
          </label>
        </div>
        <div className="row mt-4">
          <button className="signin-button">Login</button>
        </div>
        <div className="row mt-1">
          <div className="col-6 d-flex justify-content-start">
            <p className="sign-in-small-text">Create new account</p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <p className="sign-in-small-text">Forgot password?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
