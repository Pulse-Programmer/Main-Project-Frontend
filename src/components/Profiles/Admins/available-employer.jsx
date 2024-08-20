import React, { useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';
import Modal from '../employer/modal';

const AvailableEmployersAdmin = () => {
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const outletContext = useOutletContext();

  useEffect(() => {
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

    fetchEmployersData();
  }, [outletContext]);

  const handleViewEmployer = (employer) => {
    setSelectedEmployer(employer);
    setIsModalOpen(true); // Open the modal
  };

  const handleRemoveEmployer = async (id) => {
    if (window.confirm('Are you sure you want to remove this employer?')) {
      try {
        console.log('Removing employer with ID:', id);
        const response = await fetch(`/employers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Employer removed successfully');
          setEmployers(employers.filter((employer) => employer.id !== id));
        } else {
          console.error('Error removing employer:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing employer:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployer(null);
  };

  return (
    <div className="jobseekers-list">
      <h2 className='text-success'>Available Employers</h2>
      {employers.length > 0 ? (
        <ul className='ul'>
          {employers.map((employer) => (
            <li key={employer.id} className="jobseeker-item">
              <span className="employer-info">
                <strong>Username:</strong> {employer.user.username} <br />
                <strong>Company Name:</strong> {employer.company_name}
              </span>
              <div className="actions">
                <button 
                  className='btn bg-primary V text-white' 
                  onClick={() => handleViewEmployer(employer)}
                >
                  View
                </button>
                <button 
                  className='btn bg-danger text-white' 
                  onClick={() => handleRemoveEmployer(employer.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employers found.</p>
      )}

      {/* Use your Modal component */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        {selectedEmployer && (
          <>
            <h3>Employer Details</h3>
            <p><strong>Username:</strong> {selectedEmployer.user.username}</p>
            <p><strong>Email:</strong> {selectedEmployer.user.email}</p>
            <p><strong>Company Name:</strong> {selectedEmployer.company_name}</p>
            <p><strong>Company history:</strong> {selectedEmployer.history}</p>
            <p><strong>Company Services:</strong> {selectedEmployer.services_offered}</p>
            
            {/* Add more details as needed */}
          </>
        )}
      </Modal>
    </div>
  );
};

export default AvailableEmployersAdmin;
