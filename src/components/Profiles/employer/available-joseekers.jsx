import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextCard, prevCard } from '../../../redux/actions';
import "../../../CSS/employer/employer.css";

const jobseekers = [
  {
    name: "John Doe",
    company: "RoamTech Technologies",
    imgSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Primary card title",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
  },
  {
    name: "Jane Smith",
    company: "Tech Innovators",
    imgSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Secondary card title",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
  },
  {
    name: "Alice Johnson",
    company: "FutureWorks",
    imgSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Success card title",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
  },
  {
    name: "Bob Brown",
    company: "InnovateX",
    imgSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Innovation card title",
    description: "Some more example text to build on the card title and make up the bulk of the card's content."
  },
  {
    name: "Charlie White",
    company: "NextGen Tech",
    imgSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "NextGen card title",
    description: "Additional example text to build on the card title and make up the bulk of the card's content."
  }
];

function Availablejobseekrs() {
  const startIndex = useSelector((state) => state.startIndex);
  const dispatch = useDispatch();

  const handleNextClick = () => {
    dispatch(nextCard());
  };

  const handlePrevClick = () => {
    dispatch(prevCard());
  };

  const displayedJobseekers = [
    jobseekers[(startIndex + 0) % jobseekers.length],
    jobseekers[(startIndex + 1) % jobseekers.length],
    jobseekers[(startIndex + 2) % jobseekers.length]
  ];

  return (
    <div>
      <div className="row">
        <div className="previousicon" onClick={handlePrevClick}>
          <img className="icon2" src="https://img.icons8.com/?size=100&id=26144&format=png&color=000000" alt="previous" />
        </div>
        <h4 className="h41">Available jobseekers</h4>
        {displayedJobseekers.map((jobseeker, index) => (
          <div key={index} className="card col-4 jobcards border-secondary mb-3">
            <div className="pic">
              <img className="src1" src={jobseeker.imgSrc} alt="profile-pic" />
              <div>
                <h1 className="name1 text-success mt-4">{jobseeker.name}</h1>
                <h4 className="compname1 text-secondary ms-3">{jobseeker.company}</h4>
              </div>
            </div>
            <div className="card-body text-secondary">
              <h5 className="card-title">{jobseeker.title}</h5>
              <p className="card-text">{jobseeker.description}</p>
            </div>
            <div>
              <button type="button" className="btn contact btn-success">contact me</button>
              <button type="button" className="btn view btn-success">view my profile</button>
            </div>
          </div>
        ))}
        <div className="nexticon" onClick={handleNextClick}>
          <img className="icon1" src="https://img.icons8.com/?size=100&id=26138&format=png&color=000000" alt="next" />
        </div>
      </div>
    </div>
  );
}

export default Availablejobseekrs;
