import React, { useState } from 'react';
import '../../CSS/EMPLOYERS/add-profile.css'
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function EditForm() {
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
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div  onSubmit={handleSubmit} className="card p-4 shadow-lg company-form-card">
                <h3 className="mb-4 text-success">About Your Company</h3>
                <p className="mb-4">Fill out the details below to showcase your business.</p>
                <div className="mb-3">
                    <label  className="form-label">Company Name</label>
                    <input
                        type="text"
                        // name="company_name"
                        className="form-control"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter your company name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Our History</label>
                    <textarea
                        // name="history"
                        className="form-control"
                        value={history}
                        onChange={(e) => setHistory(e.target.value)}
                        placeholder="Tell us about your company's history"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Our Services</label>
                    <textarea
                        // name="services_offered"
                        className="form-control"
                        rows="3"
                        value={services}
                        onChange={(e) => setServices(e.target.value)}
                        placeholder="Describe the services you offer"
                        required
                    ></textarea>
                </div>
                <button className="btn btn-dark" type="submit">Save changes</button>
            </div>
        </div>
    );
}

export default EditForm;
