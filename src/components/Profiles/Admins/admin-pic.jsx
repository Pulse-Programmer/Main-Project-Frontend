import React, { useState } from "react";
import "../../../CSS/employer/employer.css";
import { useOutletContext, useNavigate } from "react-router-dom";

function Adminpic() {
  const [profilePic, setProfilePic] = useState(
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
  );
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("https://main-project-backend-1z6e.onrender.com/logout", {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          console.log("Logout successful");
          navigate("/Main-Project-Frontend"); // Redirect after logout
        } else {
          console.error("Logout failed", r.statusText);
        }
      })
      .catch((error) => console.error("Network error during logout:", error));
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        setIsEditing(false); // Automatically close edit mode after selecting a new image
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profilepic">
      <div className="pic">
        <img
          className="src"
          src={profilePic}
          alt="profile-pic"
          onClick={toggleEdit}
        />
      </div>
      {isEditing && (
        <div>
          <input
            type="file"
            onChange={handlePicChange}
            accept="image/*"
            className="pic-input"
          />
        </div>
      )}
      <div>
        <h1 className="name text-success">{user.username}</h1>
        <button
          onClick={handleLogoutClick}
          className="bg-danger btn text-white"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}

export default Adminpic;
