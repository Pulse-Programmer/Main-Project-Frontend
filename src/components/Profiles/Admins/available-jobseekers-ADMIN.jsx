import React, { useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';
import Modal from '../employer/modal';

const AvailableJobseekersAdmin = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [selectedJobseeker, setSelectedJobseeker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const outletContext = useOutletContext();

  useEffect(() => {
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

    fetchJobseekersData();
  }, [outletContext]);

  const handleViewJobseeker = (jobseeker) => {
    setSelectedJobseeker(jobseeker);
    setIsModalOpen(true); // Open the modal
  };

  const handleRemoveJobseeker = async (id) => {
    if (window.confirm('Are you sure you want to remove this jobseeker?')) {
      try {
        console.log('Removing jobseeker with ID:', id);
        const response = await fetch(`/jobseekers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Jobseeker removed successfully');
          setJobseekers(jobseekers.filter((jobseeker) => jobseeker.id !== id));
        } else {
          console.error('Error removing jobseeker:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing jobseeker:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobseeker(null);
  };

  return (
    <div className="jobseekers-list">
      <h2 className='text-success'>Available Jobseekers</h2>
      {jobseekers.length > 0 ? (
        <ul className='ul'>
          {jobseekers.map((jobseeker) => (
            <li key={jobseeker.id} className="jobseeker-item">
              <span className="jobseeker-info">
                <strong>Username:</strong> {jobseeker.user.username} <br />
                <strong>Skills:</strong> {jobseeker.skills}
              </span>
              <div className="actions">
                <button 
                  className='btn bg-primary V text-white' 
                  onClick={() => handleViewJobseeker(jobseeker)}
                >
                  View
                </button>
                <button 
                  className='btn bg-danger text-white' 
                  onClick={() => handleRemoveJobseeker(jobseeker.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobseekers found.</p>
      )}

      {/* Use your Modal component */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        {selectedJobseeker && (
          <>
            <h3>Jobseeker Details</h3>
            <p><strong>Username:</strong> {selectedJobseeker.user.username}</p>
            <p><strong>Email:</strong> {selectedJobseeker.user.email}</p>
            <p><strong>Skills:</strong> {selectedJobseeker.skills}</p>
            <p><strong>Experience:</strong> {selectedJobseeker.experience}</p>
            {/* Add more details as needed */}
          </>
        )}
      </Modal>
    </div>
  );
};

export default AvailableJobseekersAdmin;
 .