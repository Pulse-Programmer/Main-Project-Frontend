import React, { useEffect, useState } from "react";
import "../../CSS/EMPLOYERS/employers-page.css";
import { useOutletContext } from "react-router-dom";
import Modal from "../Profiles/employer/modal";

const JobSeekersSection = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const outletContext = useOutletContext();
  const [modalType, setModalType] = useState(null);
  const [selectedJobseeker, setSelectedJobseeker] = useState(null);
  const [contactMessage, setContactMessage] = useState("");

  // FETCHING JOBSEEKERS DATA
  const fetchJobseekersData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://main-project-backend-1z6e.onrender.com/jobseekers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setJobseekers(data);
    } catch (error) {
      console.error("Error fetching jobseekers data:", error);
    }
  };

  useEffect(() => {
    fetchJobseekersData();
  }, [outletContext]);

  // Simulate payment process
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://main-project-backend-1z6e.onrender.com/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: 50 }), // Adjust the amount as needed
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Payment successful:", data);
        setPaymentStatus("Payment successful");
        setModalType(null);
        fetchJobseekersData();
      } else {
        throw new Error(`Payment failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentStatus("Payment failed");
    }
  };
  // contact me

  const handleContactJobseeker = (jobseeker) => {
    setSelectedJobseeker(jobseeker);
    setModalType("contact");
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://main-project-backend-1z6e.onrender.com/contact_requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobseekerID: selectedJobseeker.id,
            message: contactMessage,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Contact request sent:", data);
        setModalType(null);
        setContactMessage("");
        setSelectedJobseeker(null);
      } else {
        throw new Error(`Contact request failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending contact request:", error);
    }
  };
  // view profile
  const handleViewJobseeker = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://main-project-backend-1z6e.onrender.com/jobseekers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching jobseeker details: ${response.status}`);
      }
      const data = await response.json();
      setSelectedJobseeker(data);
      setModalType("details");
    } catch (error) {
      console.error("Error fetching jobseeker details:", error);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJobseeker(null);
    setPaymentStatus(null);
    setContactMessage("");
  };

  return (
    <section className="job-seekers-section">
      <div className="container">
        <h2 className="section-title fs-1">Browse Job Seekers</h2>
        <p className="section-subtitle fs-4">
          Explore our curated list of top-tier job seekers and find the perfect
          candidate for your organization.
        </p>

        <div className="payment-section">
          <p className="pay-p fs-4">
            To view the available job seekers, please make a payment.
          </p>
          <button
            className="btn btn-primary pay-button"
            onClick={() => setModalType("payment")}
          >
            Pay Now
          </button>
        </div>
        {/* Modal Rendering */}
        {modalType === "payment" && (
          <Modal show onClose={closeModal}>
            <h3>Payment Form</h3>
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  value={50}
                  disabled
                />
              </div>
              <button type="submit" className="btn  btn-success mt-3">
                Pay
              </button>
            </form>
            {paymentStatus && <p>{paymentStatus}</p>}
          </Modal>
        )}
        {modalType === "contact" && selectedJobseeker && (
          <Modal show onClose={closeModal}>
            <h3>Contact {selectedJobseeker?.user?.username}</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  className="form-control"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Send
              </button>
            </form>
          </Modal>
        )}
        {modalType === "details" && selectedJobseeker && (
          <Modal show onClose={closeModal}>
            <div className="modal-header">
              <h3 className="modal-title">Jobseeker Details</h3>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedJobseeker && (
                <div>
                  <p>
                    <strong>Username:</strong> {selectedJobseeker.user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedJobseeker.user.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {selectedJobseeker.user.phone_number}
                  </p>
                  <p>
                    <strong>Job Category:</strong>{" "}
                    {selectedJobseeker.job_category}
                  </p>
                  <p>
                    <strong>Skills:</strong> {selectedJobseeker.skills}
                  </p>
                  <p>
                    <strong>Experience:</strong> {selectedJobseeker.experience}
                  </p>
                  <p>
                    <strong>Education:</strong> {selectedJobseeker.education}
                  </p>
                  {/* Add other fields as necessary */}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}

        {jobseekers.length > 0 ? (
          <div className="row">
            {jobseekers.map((jobseeker) => (
              <div key={jobseeker.id} className="col-md-3">
                <div className="card job-seeker-card">
                  <div className="card-body">
                    <h5 className="card-title fs-4">
                      <span className="fw-normal fs-4">username:</span>
                      {jobseeker.user.username}
                    </h5>
                    <h5 className="card-title fs-4">
                      <span className="fw-normal fs-4">job category:</span>
                      {jobseeker.job_category}
                    </h5>
                    {/* <p className="card-text">{seeker.description}</p> */}
                    <div className="skills">
                      <h5 className="card-title fs-4">
                        <span className="fw-normal fs-4">Skills:</span>
                        {jobseeker.skills}
                      </h5>
                    </div>
                    <button
                      className="btn view-button btn-outline-primary mt-3"
                      onClick={() => handleViewJobseeker(jobseeker.user_id)}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn btn-primary cont-cutoon mt-2"
                      onClick={() => handleContactJobseeker(jobseeker)}
                    >
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No jobseekers found.</p>
        )}
      </div>
    </section>
  );
};

export default JobSeekersSection;
