import React,{useState} from 'react';
import '../../CSS/signups-css/signup.css'

const SignUp = () => {
  const [role, setRole] = useState('')

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }
  return (
    <div className="signup">
      <h1 className='h1'>Welcome !</h1>
      <p className='p1'>create your profile</p>
      <form>
        <div className='mb-3 input'>
        <input 
            type="text"  
            className='form-control' 
            placeholder="user-name" 
            required
            />   
        </div>
        
        <div className='mb-3 input'>
        <input 
            type="email" 
            className='form-control' 
            placeholder="enter your email" 
            required
            />
        </div>

        <div className='mb-3 input'>
        <input 
            type="tel"  
            className='form-control' 
            placeholder="phone number" 
            required
            />
        </div>

        <div className='mb-3 input'>
        <input 
            type="password" 
            className='form-control' 
            placeholder="password" 
            required
            />
        </div>

        <div className='mb-3 input'>
        <input 
            type="password" 
            className='form-control' 
            placeholder="confirm password" 
            required
            />   
        </div>

        <div className='mb-3 input'>
        <select className='form' value={role} onChange={handleRoleChange} required>
          <option value="" disabled>Select your role</option>
          <option value="admin">Admin</option>
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        </div>
        
        <div className='h4'>
        <button type='submit' className='btn btn2 btn-success'>sign up</button>
        </div>
      </form>
      <div className='up'>
      <p className='don'>have an account? <a href="/login">sign in</a></p>
      </div>
    </div>
  );
};

export default SignUp;
