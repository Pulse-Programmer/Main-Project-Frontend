import React, { useState } from "react";
import '../../CSS/logins-css/login.css';
import { useNavigate , useOutletContext} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const {setUser} = useOutletContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const data = { email, password, role };

    try {
      const response = await fetch('/login', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
         setUser(result)
          if (result.role === 'admin') {
            navigate('/admin-profile');
          } else if (result.role  === 'jobseeker') {
            navigate('/jobseeker-profile');
          } else if (result.role  === 'employer') {
            navigate('/employers-profile');
          }
        
      
      } else {
        // Handle errors (e.g., show a message to the user)
        console.error(result.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="login">
      <div>
        <h1 className="h1">Welcome back!</h1>
        <p className="p1">Sign in to view your profile</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 input">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="email, phone-number or username"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3 input">
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mb-3 input">
          <select className="form" value={role} onChange={handleRoleChange} required>
            <option value="" disabled>Select your role</option>
            <option value="admin">Admin</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <div className="h4">
          <a href="#">Forgot your Password?</a>
        </div>
        <div className="h4">
          <button type="submit" className="btn btn2 btn-success">Login</button>
        </div>
      </form>
      <div className="up">
        <p className="don">Don't have an account? <a href="/signup">Sign up</a> </p>
      </div>
    </div>
  );
};

export default Login;
