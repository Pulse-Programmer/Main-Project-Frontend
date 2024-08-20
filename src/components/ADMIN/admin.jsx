import React, { useState, useEffect } from 'react';
import '../../CSS/ADMIN/admin.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import { Modal } from 'bootstrap';

function AdminDashboard() {
    const { user, setUser } = useOutletContext();
    const navigate = useNavigate();
    const [pendingJobSeekers, setPendingJobSeekers] = useState([]);
    const [approvedJobSeekers, setApprovedJobSeekers] = useState([]);
    const [selectedJobseeker, setSelectedJobseeker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobseekersData = async () => {
            try {
                const response = await fetch(`/jobseekers`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                // Assuming data contains all job seekers, split them into pending and approved
                setPendingJobSeekers(data.filter(jobseeker => !jobseeker.approved));
                setApprovedJobSeekers(data.filter(jobseeker => jobseeker.approved));
            } catch (error) {
                console.error('Error fetching jobseekers data:', error);
            }
        };
        const fetchEmployersData = async () => {
            try {
              const response = await fetch(`/employers`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log('Fetched data:', data);
              setEmployers(data);
            } catch (error) {
              console.error('Error fetching employers data:', error);
            }
          };
      

        fetchJobseekersData();
        fetchEmployersData()
    }, [user]);

    // handle log out
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" })
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

    const handleApprove = async (id) => {
        const seeker = pendingJobSeekers.find((seeker) => seeker.id === id);
        try {
            const response = await fetch(`/jobseekers/${id}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }),
            });
            if (response.ok) {
                setApprovedJobSeekers([...approvedJobSeekers, { ...seeker, approved: true }]);
                setPendingJobSeekers(pendingJobSeekers.filter((seeker) => seeker.id !== id));
                console.log(`Jobseeker with ID: ${id} approved successfully.`);
            } else {
                console.error('Error approving jobseeker:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving jobseeker:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`/jobseekers/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPendingJobSeekers(pendingJobSeekers.filter((seeker) => seeker.id !== id));
                console.log(`Jobseeker with ID: ${id} rejected successfully.`);
            } else {
                console.error('Error rejecting jobseeker:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting jobseeker:', error);
        }
    };

    const handleViewJobseeker = (jobseeker) => {
        setSelectedJobseeker(jobseeker);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJobseeker(null);
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-dark bg-success">
                <a className="navbar-brand" href="#">
                    <img src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png" alt="Acme Employers" className="navbar-logo" />
                    Acme Employers
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
                <div className="col-md-6">
                    <h3>Pending Job Seekers</h3>
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
                                {pendingJobSeekers.map((seeker) => (
                                    <tr key={seeker.id}>
                                        <td>{seeker.user.username}</td>
                                        <td>{seeker.user.email}</td>
                                        <td>{seeker.jobCategory}</td>
                                        <td>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(seeker.id)}>Approve</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleReject(seeker.id)}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-6">
                    <h3>Approved Job Seekers</h3>
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
                                {approvedJobSeekers.map((seeker) => (
                                    <tr key={seeker.id}>
                                        <td>{seeker.user.username}</td>
                                        <td>{seeker.user.email}</td>
                                        <td>{seeker.jobCategory}</td>
                                        <td>
                                            <button className="btn btn-info btn-sm me-2" onClick={() => handleViewJobseeker(seeker)}>View Profile</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleReject(seeker.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-6 mt-4">
                    <h3>Employers</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Contact Person</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Employer rows */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={handleCloseModal}>
                {selectedJobseeker && (
                    <>
                        <h3>Jobseeker Details</h3>
                        <p><strong>Username:</strong> {selectedJobseeker.user.username}</p>
                        <p><strong>Email:</strong> {selectedJobseeker.user.email}</p>
                        <p><strong>Job Category:</strong> {selectedJobseeker.jobCategory}</p>
                        {/* Add more details as needed */}
                    </>
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
