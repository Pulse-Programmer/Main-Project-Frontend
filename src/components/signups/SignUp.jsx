import React, { useState } from 'react';
import '../../CSS/signups-css/signup.css'
import { useNavigate, useOutletContext } from 'react-router-dom';


const SignUp = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const {setUser} = useOutletContext()

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create the data object to send to the backend
    const data = {
      username,
      email,
      phone_number,
      password,
      role,
    };

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        response.json().then((user_data) =>{ setUser(user_data)
          if (user_data.role === 'admin') {
            navigate('/admin-profile');
          } else if (user_data.role  === 'jobseeker') {
            navigate('/jobseeker-profile');
          } else if (user_data.role  === 'employer') {
            navigate('/employers-profile');
          }
        })
      
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="signup">
      <h1 className='h1'>Welcome!</h1>
      <p className='p1'>Create your profile</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-3 input'>
          <input 
            type="text"  
            className='form-control' 
            placeholder="User name" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />   
        </div>
        
        <div className='mb-3 input'>
          <input 
            type="email" 
            className='form-control' 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='mb-3 input'>
          <input 
            type="tel"  
            className='form-control' 
            placeholder="Phone number" 
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className='mb-3 input'>
          <input 
            type="password" 
            className='form-control' 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='mb-3 input'>
          <input 
            type="password" 
            className='form-control' 
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button type='submit' className='btn btn2 btn-success'>Sign up</button>
        </div>
      </form>
      <div className='up'>
        <p className='don'>Have an account? <a href="/">Sign in</a></p>
      </div>
    </div>
  );
};

export default SignUp;
