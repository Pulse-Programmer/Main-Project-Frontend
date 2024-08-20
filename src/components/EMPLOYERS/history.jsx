import React from "react";
import "../../CSS/EMPLOYERS/employers-page.css";
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const OurHistory = () => {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [companyName, setCompanyName] = useState("");
  const [history, setHistory] = useState("");

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/Main-Project-Frontend"));
  }
  // getting user name and comanies name
  useEffect(() => {
    fetch(`/employers/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setCompanyName(data.company_name); // Update with the correct field from the backend
      })
      .catch((error) => console.error("Error fetching company name:", error));

    // fetching company history
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/employers/${user.id}`);
        const data = await response.json();
        setHistory(data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();

  }, [user.id]);


  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png"
              alt="Acme Employers"
              className="navbar-logo"
            />
            Acme Employers
          </a>

          <div className="" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/Main-Project-Frontend/company-form"
                  className="nav-link"
                >
                  {" "}
                  Add profile{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Main-Project-Frontend/update-form"
                  className="nav-link"
                >
                  {" "}
                  Edit profile{" "}
                </Link>
              </li>
              <li className="nav-item">
                <a onClick={handleLogoutClick} className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="user-info-section">
        <div className="container">
          <p className="user-info fs-4 mt-3">
            Username: <strong>{user.username}</strong> | Company Name:{" "}
            <strong>{companyName}</strong>
          </p>
        </div>
      </div>

      <section className="history-section">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <h2 className="history-title">Our History</h2>
              <p className="history-text fs-5">
              {history || "Loading history..."}
              </p>
            </div>
            <div className="col-md-6">
              <div className="history-image-placeholder">
                <img
                  className="img-history"
                  src="https://media.istockphoto.com/id/1129545215/photo/business-time-and-working-hours-for-financial-and-money-office.jpg?s=612x612&w=0&k=20&c=5KXyYmwH_fH2z8AwB4a4K-J01crXsIBDdVv10S4-vtk="
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurHistory;
