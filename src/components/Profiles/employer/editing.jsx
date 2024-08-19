import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../../CSS/employer/employer.css";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [history, setHistory] = useState("");
  const [services, setServices] = useState("");
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/employers/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: companyName,
          history: history,
          services_offered: services,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.ok) {
        navigate("/Main-Project-Frontend/employers-profile");
      } else {
        console.error("Failed to update data");
      }

      const data = await response.json();
      console.log("Data updated successfully:", data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        <div className="form-group">
          <label>Our History:</label>
          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="Enter our history"
          />
        </div>
        <div className="form-group">
          <label>Our Services:</label>
          <textarea
            value={services}
            onChange={(e) => setServices(e.target.value)}
            placeholder="Enter our services"
          />
        </div>
        <button className="inputbutton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
