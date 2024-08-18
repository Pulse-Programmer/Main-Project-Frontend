import React, { useEffect, useState } from 'react';
import '../../../CSS/employer/availableemployer.css';
import { useOutletContext, useNavigate } from 'react-router-dom';

const AvailableJobseekersAdmin = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const outletContext = useOutletContext();
  const navigate = useNavigate();

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

  const handleViewJobseeker = (id) => {
    console.log('Navigating to jobseeker with ID:', id);
    navigate(`/jobseeker-profile/${id}`); // Pass the jobseeker ID in the route
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
                  onClick={() => handleViewJobseeker(jobseeker.id)}
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
    </div>
  );
};

export default AvailableJobseekersAdmin;
