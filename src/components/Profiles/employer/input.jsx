import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOutletContext } from "react-router-dom";

const FormComponent = () => {
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
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://main-project-backend-1z6e.onrender.com/employers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      <form
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
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="history" className="form-label">
            Our History
          </label>
          <textarea
            name="history"
            value={formData.history}
            className="form-control"
            onChange={handleChange}
            placeholder="Enter our history"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="services_offered" className="form-label">
            Our Services
          </label>
          <textarea
            name="services_offered"
            value={formData.services_offered}
            className="form-control"
            onChange={handleChange}
            placeholder="Enter our services"
            required
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
