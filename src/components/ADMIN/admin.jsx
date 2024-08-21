import React, { useState, useEffect } from "react";
import "../../CSS/ADMIN/admin.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import Modal from "../Profiles/employer/modal";

function AdminDashboard() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const [selectedJobseeker, setSelectedJobseeker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [jobseekers, setJobseekers] = useState([]);

  // FETCHING JOBSEEKERS
  useEffect(() => {
    const fetchJobseekersData = async () => {
      try {
        const response = await fetch(
          "https://main-project-backend-1z6e.onrender.com/jobseekers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobseekers(data); // Display all job seekers
      } catch (error) {
        console.error("Error fetching jobseekers data:", error);
      }
    };

    const fetchEmployersData = async () => {
      try {
        const response = await fetch(
          "https://main-project-backend-1z6e.onrender.com/employers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setEmployers(data);
      } catch (error) {
        console.error("Error fetching employers data:", error);
      }
    };

    fetchJobseekersData();
    fetchEmployersData();
  }, [user]);

  const handleViewEmployer = (employer) => {
    setSelectedEmployer(employer);
    setIsModalOpen(true); // Open the modal
  };

  const handleRemoveEmployer = async (id) => {
    if (window.confirm("Are you sure you want to remove this employer?")) {
      try {
        console.log("Removing employer with ID:", id);
        const response = await fetch(
          `https://main-project-backend-1z6e.onrender.com/employers/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Employer removed successfully");
          setEmployers(employers.filter((employer) => employer.id !== id));
        } else {
          console.error("Error removing employer:", response.statusText);
        }
      } catch (error) {
        console.error("Error removing employer:", error);
      }
    }
  };

  const handleRemoveJobseeker = async (id) => {
    if (window.confirm("Are you sure you want to remove this jobseeker?")) {
      try {
        console.log("Removing jobseeker with ID:", id);
        const response = await fetch(
          `https://main-project-backend-1z6e.onrender.com/jobseekers/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Jobseeker removed successfully");
          setJobseekers(jobseekers.filter((jobseeker) => jobseeker.id !== id));
        } else {
          console.error("Error removing jobseeker:", response.statusText);
        }
      } catch (error) {
        console.error("Error removing jobseeker:", error);
      }
    }
  };

  // handle log out
  function handleLogoutClick() {
    fetch("https://main-project-backend-1z6e.onrender.com/logout", {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          console.log("Logout successful");
          navigate("/Main-Project-Frontend"); // Redirect after logout
        } else {
          console.error("Logout failed", r.statusText);
        }
      })
      .catch((error) => console.error("Network error during logout:", error));
  }

  const handleViewJobseeker = (jobseeker) => {
    setSelectedJobseeker(jobseeker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobseeker(null);
    setSelectedEmployer(null);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-success">
        <a className="navbar-brand" href="#">
          <img
            src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png"
            alt="Acme Employers"
            className="navbar-logo"
          />
          Acme Admins
        </a>
        <div className="d-flex align-items-center me-5">
          <button className="btn btn-outline-light" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>

      <div className="username-display mt-3 text-center">
        <h5>Welcome, {user?.username}</h5>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h3>Job Seekers</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobseekers.map((jobseeker) => (
                  <tr key={jobseeker.id}>
                    <td>{jobseeker.user.username}</td>
                    <td>{jobseeker.user.email}</td>
                    <td>{jobseeker.jobCategory}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleViewJobseeker(jobseeker)}
                      >
                        View Profile
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveJobseeker(jobseeker.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-12 mt-4">
          <h3>Employers</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employers.map((employer) => (
                  <tr key={employer.id}>
                    <td>{employer.user.username}</td>
                    <td>{employer.company_name}</td>
                    <td>{employer.user.email}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleViewEmployer(employer)}
                      >
                        View Profile
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveEmployer(employer.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        {selectedJobseeker && (
          <>
            <h3>Jobseeker Details</h3>
            <p>
              <strong>Username:</strong> {selectedJobseeker.user.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedJobseeker.user.email}
            </p>
            <p>
              <strong>Job Category:</strong> {selectedJobseeker.jobCategory}
            </p>
            {/* Add more details as needed */}
          </>
        )}

        {selectedEmployer && (
          <>
            <h3>Employer Details</h3>
            <p>
              <strong>Username:</strong> {selectedEmployer.user.username}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedEmployer.company_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployer.user.email}
            </p>
            {/* Add more details as needed */}
          </>
        )}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
