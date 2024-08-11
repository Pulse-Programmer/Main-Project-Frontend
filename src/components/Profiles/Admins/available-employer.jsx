import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextCard, prevCard } from '../../../redux/actions'; // Use nextCard and prevCard here
import "../../../CSS/employer/employer.css";

function AvailableEmployersAdmin() {
  // Sample data for employers
  const employers = [
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Michael Johnson",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Emily Davis",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "David Brown",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    
  ];

  const startIndex = useSelector((state) => state.startIndex);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const totalItems = useSelector((state) => state.totalItems);
  const dispatch = useDispatch();

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
          Click on "View my profile" to learn more about each candidate or remove them from the list if necessary.
        </p>
      </div>
      <div className="row">
        {employers.slice(startIndex, startIndex + itemsPerPage).map((employer) => (
          <div key={employer.id} className="card text-bg-primary mb-3 col-4 card4a">
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
