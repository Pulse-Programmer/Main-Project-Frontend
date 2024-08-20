import React from 'react';
import '../../CSS/home/home.css'
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className="container-fluid home-container">
      <nav className="navbar bg-success navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png" alt="Logo" className="logo" />
          </a>
          <div className=" justify-content-end" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#about">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Admin</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row justify-content-between align-items-center home-content">
        <div className="col-md-6 landing-details">
          <h1 className="display-4">Find Your Dream Job with Ease</h1>
          <p className="text-muted fs-4">
            Our job seekers app helps you search for the perfect job, build a standout resume, and prepare for interviews. Get started today!
          </p>
          <div className="button-group">
            <Link to={"/Main-Project-Frontend/login"} ><button className="btn btn-success btn-lg">Get Started</button></Link>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="image-placeholder">
            <img src="https://img.freepik.com/free-photo/teenager-holding-magnifying-glass-with-her-left-hand_1149-541.jpg?size=626&ext=jpg&ga=GA1.1.1094609213.1712839815&semt=ais_hybrid" alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
