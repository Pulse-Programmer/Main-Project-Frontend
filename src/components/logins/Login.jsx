import React,{useState} from "react";
import '../../CSS/logins-css/login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to respective profile page based on role
    if (role === 'admin') {
      navigate('/admin-profile');
    } else if (role === 'jobseeker') {
      navigate('/jobseeker-profile');
    } else if (role === 'employer') {
      navigate('/employers-profile');
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
            required
          />
        </div>
        <div className="mb-3 input">
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput"
            placeholder="password"
            required
          />
        </div>
        <div className="mb-3 input">
        <select  className= "form" value={role} onChange={handleRoleChange} required>
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
}
export default Login;
