import React from 'react';
import '../../CSS/signups-css/signup.css'

const AdminSignUp = () => {
  return (
    <div className="signup">
      <h1 className='h1'>Welcome Admin!</h1>
      <p className='p1'>create your profile</p>
      <form>
        <div className='mb-3 input'>
        <input 
            type="text"  
            className='form-control' 
            placeholder="first name" />
            
        </div>
        <div className='mb-3 input'>
        <input 
            type="text" 
            className='form-control' 
            placeholder="last name" />

        </div>
        <div className='mb-3 input'>
        <input 
            type="email" 
            className='form-control' 
            placeholder="enter your email" />

        </div>
        <div className='mb-3 input'>
        <input 
            type="tel"  
            className='form-control' 
            placeholder="phone number" />

        </div>
        <div className='mb-3 input'>
        <input 
            type="password" 
            className='form-control' 
            placeholder="password" />

        </div>
        <div className='mb-3 input'>
        <input 
            type="password" 
            className='form-control' 
            placeholder="confirm password" />
            
        </div>
        <div className='h4'>
        <button type='submit' className='btn btn2 btn-success'>sign up</button>
        </div>
      </form>
      <div className='up'>
      <p className='don'>have an account? <a href="/admin-login">sign in</a></p>
      </div>
    </div>
  );
};

export default AdminSignUp;
