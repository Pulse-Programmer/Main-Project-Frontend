import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../../CSS/EMPLOYERS/add-profile.css";
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
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://main-project-backend-1z6e.onrender.com/employers/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company_name: companyName,
            history: history,
            services_offered: services,
          }),
        }
      );

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-lg company-form-card"
      >
        <h3 className="mb-4 text-success">About Your Company</h3>
        <p className="mb-4">
          Fill out the details below to showcase your business.
        </p>
        <div className="mb-3">
          <label className="form-label">Company Name:</label>
          <input
            type="text"
            value={companyName}
            className="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Our History:</label>
          <textarea
            value={history}
            className="form-control"
            onChange={(e) => setHistory(e.target.value)}
            placeholder="Enter our history"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Our Services:</label>
          <textarea
            value={services}
            className="form-control"
            onChange={(e) => setServices(e.target.value)}
            placeholder="Enter our services"
          />
        </div>
        <button className="btn btn-dark mt-4" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
