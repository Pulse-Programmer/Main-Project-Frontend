import React, { useState, useEffect } from "react";
import "../../../CSS/employer/employer.css";
import { useOutletContext } from "react-router-dom";

function HistoryServices() {
  // State to hold the history and services data
  const [history, setHistory] = useState("");
  const [services, setServices] = useState("");

  // Assuming useOutletContext returns an object with a `user` property
  const { user } = useOutletContext();

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/employers/${user.id}`);
        const data = await response.json();
        setHistory(data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch(`/employers/${user.id}`);
        const data = await response.json();
        setServices(data.services_offered);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchHistory();
    fetchServices();
  }, [user.id]);

  return (
    <div className="row history">
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="card bg-transparent">
          <div>
            <h4 className="text-success">Our History</h4>
          </div>
          <div className="card-body">
            <p className="card-text fs-5">{history || "Loading history..."}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card bg-transparent">
          <div>
            <h4 className="text-success">Our Services</h4>
          </div>
          <div className="card-body">
            <p className="card-text fs-5">{services || "Loading services..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryServices;
