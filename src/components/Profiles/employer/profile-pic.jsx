import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profilepic() {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState("");

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/"));
  }

  useEffect(() => {
    fetch(`/employers`)  // Assuming you're fetching by user ID
      .then((r) => r.json())
      .then((data) => {
        setCompanyName(data.company_name);  // Update with the correct field from the backend
      })
      .catch((error) => console.error("Error fetching company name:", error));
  }, [user.id]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      handleImageUpload(file);
    }
  }

  function handleImageUpload(file) {
    const formData = new FormData();
    formData.append("profileImage", file);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({ ...user, profileImage: data.filePath });
      })
      .catch((error) => console.error("Error uploading image:", error));
  }

  function handleImageClick() {
    document.getElementById("imageUpload").click();
  }

  return (
    <div className="profilepic">
      <div className="pic" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <img
          className="src"
          src={user.profileImage ? user.profileImage : "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt="profile-pic"
        />
      </div>
      <div>
        <h1 className="name text-success">{user.username}</h1>
        <h4 className="text-secondary compname">{companyName}RoamTech</h4> 
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="button" onClick={handleLogoutClick}  class="btn btn-danger logout">log out</button>
        <Link to="/company-form" className="btn EDIT btn-primary">EDIT</Link>
      </div>
    </div>
  );
}

export default Profilepic;
