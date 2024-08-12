import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextCard, prevCard } from '../../../redux/actions';
import "../../../CSS/employer/employer.css";

function AvailableEmployersAdmin() {
  const [employers, setEmployers] = useState([]);
  const startIndex = useSelector((state) => state.startIndex);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from backend
    const fetchEmployers = async () => {
      try {
        const response = await fetch('/api/employers'); // Replace with your API endpoint
        const data = await response.json();
        setEmployers(data);
      } catch (error) {
        console.error('Error fetching employers:', error);
      }
    };

    fetchEmployers();
  }, []);

  const totalItems = employers.length;

  const handleNext = () => {
    dispatch(nextCard());
  };

  const handlePrevious = () => {
    dispatch(prevCard());
  };

  return (
    <div>
      <div className="adminjob">
        <h4 className="h4a text-success">Available Employers</h4>
        <p className="p4a">
          Browse through the profiles of available employers who are looking for new opportunities. <br />
          Click on "View Profile" to learn more about each candidate or remove them from the list if necessary.
        </p>
      </div>
      <div className="row">
        {employers.slice(startIndex, startIndex + itemsPerPage).map((employer) => (
          <div key={employer.id} className="card mb-3 col-4 card4a">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={employer.profilePic}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <h5 className="card-title">{employer.name}</h5>
                <div className="d-flex justify-content-between w-100 mt-3">
                  <button className="btn btn-danger">Remove Employer</button>
                  <button className="btn btn-primary">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-success me-2"
          onClick={handlePrevious}
          disabled={startIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= totalItems}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AvailableEmployersAdmin;
