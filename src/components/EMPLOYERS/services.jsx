import React from 'react';
import '../../CSS/EMPLOYERS/employers-page.css'
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";



const ServicesSection = () => {
  const [services, setServices] = useState("");
  const { user } = useOutletContext();


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/employers/${user.id}`);
        const data = await response.json();
        setServices(data.services_offered);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  },  [user.id]);

  return (
    <section className="services-section">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="services-image-placeholder">
              <img className='img-history' src="https://media.istockphoto.com/id/1202843504/photo/business-technology-internet-and-network-concept-technical-support-center-customer-service.jpg?s=612x612&w=0&k=20&c=E0cRrrLXV71xYzAtNgNYs4e8-XE12Nob9DGiJPp5DX8=" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="services-title">Our Services</h2>
            <p className="services-text">
            {services || "Loading services..."}
            </p>
            {/* <ul className="services-list">
              <li><i className="text-success">&#10003;</i> Executive Search</li>
              <li><i className="text-success">&#10003;</i> Permanent Placement</li>
              <li><i className="text-success">&#10003;</i> Contract Staffing</li>
              <li><i className="text-success">&#10003;</i> Employer Branding</li>
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
