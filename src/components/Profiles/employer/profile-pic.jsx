import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profilepic() {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [companyName, setCompanyName] = useState("");

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/Main-Project-Frontend"));
  }

  useEffect(() => {
    fetch(`/employers/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setCompanyName(data.company_name); // Update with the correct field from the backend
      })
      .catch((error) => console.error("Error fetching company name:", error));
  }, [user.id]);

  return (
    <div className="profilepic">
      <div className="pic" style={{ cursor: "pointer" }}>
        <img
          className="src"
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="profile-pic"
        />
      </div>
      <div>
        <h1 className="name sm- text-success">{user.username}</h1>
        <h4 className="text-secondary compname">{companyName}</h4>
        <button
          type="button"
          onClick={handleLogoutClick}
          className="btn btn-danger logout"
        >
          log out
        </button>
        <Link to="/company-form" className="btn EDIT btn-primary">
          POST
        </Link>
        <Link to="/update-form" className="btn EDIT btn-primary">
          EDIT
        </Link>
      </div>
    </div>
  );
}

export default Profilepic;
