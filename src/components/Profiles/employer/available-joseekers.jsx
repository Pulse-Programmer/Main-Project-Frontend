import React, { useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';
import Modal from '../../Profiles/employer/modal';

const Availablejobseekrs = () => {
  // const [jobseekers, setJobseekers] = useState([]);
  const [selectedJobseeker, setSelectedJobseeker] = useState(null);
  // const [modalType, setModalType] = useState(null); // To track which modal to show
  const [contactMessage, setContactMessage] = useState('');
  // const [paymentStatus, setPaymentStatus] = useState(null);
  // const outletContext = useOutletContext();

  const fetchJobseekersData = async () => {
    try {
      const response = await fetch(`/jobseekers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setJobseekers(data);
    } catch (error) {
      console.error('Error fetching jobseekers data:', error);
    }
  };

  useEffect(() => {
    fetchJobseekersData();
  }, [outletContext]);

  const handleViewJobseeker = async (id) => {
    try {
      const response = await fetch(`/jobseekers/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching jobseeker details: ${response.status}`);
      }
      const data = await response.json();
      setSelectedJobseeker(data);
      setModalType('details');
    } catch (error) {
      console.error('Error fetching jobseeker details:', error);
    }
  };
  // const handleViewJobseeker = (jobseeker) => {
  //   setSelectedJobseeker(jobseeker);
  //   setIsModalOpen(true); // Open the modal
  // };


  const handleContactJobseeker = (jobseeker) => {
    setSelectedJobseeker(jobseeker);
    setModalType('contact');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/contact_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobseekerID: selectedJobseeker.id,
          message: contactMessage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Contact request sent:', data);
        setModalType(null);
        setContactMessage('');
        setSelectedJobseeker(null);
      } else {
        throw new Error(`Contact request failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending contact request:', error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 50 }), // Adjust the amount as needed
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Payment successful:', data);
        setPaymentStatus('Payment successful');
        setModalType(null);
        fetchJobseekersData();
      } else {
        throw new Error(`Payment failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment failed');
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJobseeker(null);
    setPaymentStatus(null);
    setContactMessage('');
  };

  return (
    <div className="jobseekers-list mt-5">
      <h2 className="text-success top text-center mb-4">Available Job Seekers</h2>
      <div className="text-center mb-4">
        <button onClick={() => setModalType('payment')} className="btn btn-danger">
          Pay Now
        </button>
      </div>

      {/* Modal Rendering */}
      {modalType === 'payment' && (
        <Modal show onClose={closeModal}>
          <h3>Payment Form</h3>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Amount:</label>
              <input type="number" className="form-control" value={50} disabled />
            </div>
            <button type="submit" className="btn btn-success mt-3">Pay</button>
          </form>
          {paymentStatus && <p>{paymentStatus}</p>}
        </Modal>
      )}

      {modalType === 'contact' && selectedJobseeker && (
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
            <button type="submit" className="btn btn-success mt-3">Send</button>
          </form>
        </Modal>
      )}

      {modalType === 'details' && selectedJobseeker && (
        <Modal show onClose={closeModal}>
          <h3>Jobseeker Details</h3>
          {selectedJobseeker && (
            <div>
              <p><strong>Username:</strong> {selectedJobseeker.user.username}</p>
              <p><strong>Email:</strong> {selectedJobseeker.user.email}</p>
              <p><strong>Phone Number:</strong> {selectedJobseeker.user.phone_number}</p>
              <p><strong>Skills:</strong> {selectedJobseeker.skills}</p>
              <p><strong>Experience:</strong> {selectedJobseeker.experience}</p>
              <p><strong>Education:</strong> {selectedJobseeker.education}</p>
              {/* Add other fields as necessary */}
            </div>
          )}
        </Modal>
      )}

      {jobseekers.length > 0 ? (
        <ul className="list-group">
          {jobseekers.map((jobseeker) => (
            <li key={jobseeker.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{jobseeker.user.username}</h5>
                <p className="mb-1"><strong>Skills:</strong> {jobseeker.skills}</p>
              </div>
              <div>
                <button 
                  className="btn btn-primary mr-2" 
                  onClick={() => handleViewJobseeker(jobseeker.user_id)}
                >
                  View
                </button>
                <button 
                  className="btn btn-info" 
                  onClick={() => handleContactJobseeker(jobseeker)}
                >
                  Contact Me
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No jobseekers found.</p>
      )}
    </div>
  );
};

export default Availablejobseekrs;
