import React from "react";
import '../../CSS/logins-css/login.css'




function Employerlogin() {
  return (
    <div className="login">
      <div>
        <h1 className="h1">Welcome back,Employer!</h1>
        <p className="p1">Sign in to view your profile</p>
      </div>
      <div>
        <div className="mb-3 input">
          <input
         
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="email, phone-number or username"
          />
        </div>
        <div className="mb-3 input">
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="password"
          />
        </div>
        <div className="h4">
            <a href="#">Forgot your Password?</a>
        </div>
        <div className="h4">
            <button type="button" className="btn btn2 btn-success">Sign in</button>
        </div>
        <div className="up">
            <p className="don">Don't have an account? </p>
            <a href="/employer-signup">
            <button type="button" className="btn btn2 btn-success">Sign up</button>
            </a>
        </div>
      </div>
    </div>
  );
}
export default Employerlogin;
