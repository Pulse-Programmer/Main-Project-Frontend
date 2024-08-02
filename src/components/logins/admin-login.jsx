import React from "react";
import '/home/victor/Moringa/Code/SE-phase-5/final-project/Main-Project-Frontend/src/CSS/logins-css/admins-login.css'




function Adminlogin() {
  return (
    <div className="landing">
      <div>
        <h1 className="h1">Welcome back,Admin!</h1>
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
            <button type="button" className="btn btn2 btn-success">Sign up</button>
        </div>
      </div>
    </div>
  );
}
export default Adminlogin;
