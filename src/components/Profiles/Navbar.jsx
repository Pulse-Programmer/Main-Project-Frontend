import React from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/jobseeker-css/navbar.css";

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("https://main-project-backend-1z6e.onrender.com/logout", {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/Main-Project-Frontend"));
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
