import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/jobseeker-css/navbar.css';

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch('/logout', { method: 'DELETE' })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate('/'));
  };

  return (
    <nav className="navbar">
      <h1>JobSeeker App</h1>
      <button onClick={handleLogoutClick} className="logout-button">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
