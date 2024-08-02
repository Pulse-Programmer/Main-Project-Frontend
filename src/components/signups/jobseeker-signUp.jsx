import React from 'react';
import '../../CSS/signups-css/signup.css'

const JobSeekerSignUp = () => {
  return (
    <div className="signup">
      <h1 className='h1'>Welcome job seeker!</h1>
      <p className='p1'>create your profile</p>
      <form >
        <div className='mb-3 input'>
        <input
          className='form-control'  
          type="text"
          name="firstName"
          placeholder="first name"
         
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'          
          type="text"
          name="lastName"
          placeholder="sir name"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'  
          type="email"
          name="email"
          placeholder="enter your email"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'  
          type="text"
          name="username"
          placeholder="username"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'  
          type="text"
          name="jobCategory"
          placeholder="job category"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          type="tel"
          className='form-control'
          name="phoneNumber"
          placeholder="phone number"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'          
          type="password"
          name="password"
          placeholder="password"
          
        />
        </div>
        <div className='mb-3 input'>
        <input
          className='form-control'  
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          
        />
        </div>
        <div className='h4'>
        <button type="submit" className='btn btn2 btn-success'>sign up</button>
        </div>
      </form>
      <div className='up'>
      <p className='don'>
        have an account? <a href="/jobseeker-login">sign in</a>
      </p>
      </div>
    </div>
  );
};

export default JobSeekerSignUp;



