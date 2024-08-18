import React, { useEffect, useState } from 'react';
import '../../../CSS/employer/availableemployer.css';
import { useOutletContext, useNavigate } from 'react-router-dom';

const AvailableEmployersAdmin = () => {
  const [employers, setEmployers] = useState([]);
  const outletContext = useOutletContext();
  const navigate = useNavigate();

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

  const handleViewEmployer = (id) => {
    console.log('Navigating to employer with ID:', id);
    navigate(`/employers-profile/${id}`); // Pass the employer ID in the route
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
                  onClick={() => handleViewEmployer(employer.id)}
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
    </div>
  );
};

export default AvailableEmployersAdmin;
