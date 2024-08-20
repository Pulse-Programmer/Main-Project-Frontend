import React from 'react';
import '../../CSS/JOBSEEKERS/jobseeker.css'
import {useOutletContext, useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const navigate = useNavigate();
    const { user, setUser } = useOutletContext();

    const handleLogoutClick = () => {
        fetch("/logout", { method: "DELETE" })
          .then((r) => {
            if (r.ok) {
              setUser(null);
            }
          })
          .then(() => navigate("/Main-Project-Frontend"));
      };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
            <img src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png" alt="Acme Employers" className="navbar-logo" />
            Acme Jobseeker
          </a>
          <div className="" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
              <li className="nav-item">
                <a className="nav-link" href="#">Add profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Edit profile</a>
              </li>
              <li className="nav-item">
               <a onClick={handleLogoutClick} className="nav-link" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="card profile-card p-4 mt-5 bg-">
        <div className="card-body text-center">
          <div className="profile-icon mb-3">
            <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="card-title mb-0">Jared Palmer</h5>
          <h6 className="card-subtitle text-muted mb-4">Software Engineer</h6>

          <div className="text-start">
            <h5 className="font-weight-bold">Bio</h5>
            <p>
              I am a passionate software engineer with 5 years of experience in building web applications. 
              I have a strong background in JavaScript, React, and Node.js, and I'm always eager to learn 
              new technologies and techniques.
            </p>

            <h5 className="font-weight-bold">Work Experience</h5>
            <p><strong>Software Engineer</strong></p>
            <p className="text-muted">Acme Inc. <span className="float-end">2019 - Present</span></p>
            <p>
              Developed and maintained web applications using React, Node.js, and various other technologies. 
              Collaborated with cross-functional teams to deliver high-quality software.
            </p>
            <p><strong>Intern</strong></p>
            <p className="text-muted">Widgets Inc. <span className="float-end">2018 - 2019</span></p>
            <p>
              Gained hands-on experience in web development, participating in various projects and learning 
              new technologies.
            </p>

            <h5 className="font-weight-bold">Education</h5>
            <p><strong>Bachelor of Science in Computer Science</strong></p>
            <p className="text-muted">University of Technology <span className="float-end">2014 - 2018</span></p>
            <p>
              Completed a four-year program with a focus on software engineering, data structures, and algorithms. 
              Engaged in various projects, including building a real-time chat application as a final year project.
            </p>

            <h5 className="font-weight-bold">Salary Expectation</h5>
            <p>$80,000 - $100,000</p>

            <h5 className="font-weight-bold">Resume</h5>
            <a href="#" className="btn btn-outline-dark">
              <i className="bi bi-file-earmark-pdf"></i> Jared_Palmer_Resume.pdf
            </a>
            <p className="text-muted mt-2"><small>Last updated: August 19, 2024</small></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
