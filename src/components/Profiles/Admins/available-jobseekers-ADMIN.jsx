import React, { useState } from "react";
import "../../../CSS/admin/admin.css";

function AvailablejobseekrsAdmin() {
  // Sample data for job seekers
  const jobSeekers = [
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

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < jobSeekers.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
      <div className="adminjob">
        <h4 className="text-success h4a">Available Job seekers</h4>
        <p className="text-secondary p4a">
          Browse through the profiles of talented jobseekers who are looking for new opportunities. <br />
          Click on "View my profile" to learn more about each candidate or remove them from the list if necessary.
        </p>
      </div>
      <div className="row">
        {jobSeekers.slice(startIndex, startIndex + 3).map((jobSeeker) => (
          <div key={jobSeeker.id} className="card  mb-3 col-4 card4a">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={jobSeeker.profilePic}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <h5 className="card-title">{jobSeeker.name}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className="d-flex justify-content-between w-100">
                  <button className="btn mt-5 btn-danger">Remove Jobseeker</button>
                  <button className="btn mt-5 btn-primary">View Profile</button>
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
          disabled={startIndex >= jobSeekers.length - 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AvailablejobseekrsAdmin;
