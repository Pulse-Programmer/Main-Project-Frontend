import React, { useState } from "react";
import "../../CSS/EMPLOYERS/add-profile.css";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function CompanyForm() {
  const [formData, setFormData] = useState({
    company_name: "",
    history: "",
    services_offered: "",
  });
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://main-project-backend-1z6e.onrender.com/employers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Data submitted successfully");
        // Navigate to the employers page
        navigate("/Main-Project-Frontend/employers-profile");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        onSubmit={handleSubmit}
        className="card p-4 shadow-lg company-form-card"
      >
        <h3 className="mb-4 text-success">About Your Company</h3>
        <p className="mb-4">
          Fill out the details below to showcase your business.
        </p>
        <div className="mb-3">
          <label htmlFor="company_name" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            className="form-control"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter your company name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="history" className="form-label">
            Our History
          </label>
          <textarea
            name="history"
            className="form-control"
            value={formData.history}
            onChange={handleChange}
            placeholder="Tell us about your company's history"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="services_offered" className="form-label">
            Our Services
          </label>
          <textarea
            name="services_offered"
            className="form-control"
            rows="3"
            value={formData.services_offered}
            onChange={handleChange}
            placeholder="Describe the services you offer"
            required
          ></textarea>
        </div>
        <button className="btn btn-dark" type="submit">
          Save
        </button>
      </div>
    </div>
  );
}

export default CompanyForm;
