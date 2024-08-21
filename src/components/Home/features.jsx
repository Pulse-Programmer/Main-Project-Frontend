import React from "react";
import "../../CSS/home/home.css";

const Features = () => {
  return (
    <div className="container-fluid features-container">
      <div className="text-center mb-5">
        <p className="K text-black">Key Features</p>
        <h2 className="display-5">Discover the Power of Our App</h2>
        <p className="text-muted-2 fs-4">
          Our job seekers app offers a comprehensive suite of tools to help you
          find your dream job, <br />
          build a standout resume, and ace your interviews.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 text-center feature-box">
          <div className="icon">
            {/* <i className="bi bi-search"></i> */}
            <img
              className="bg-success icon-8"
              src="https://img.icons8.com/?size=80&id=112468&format=png"
              alt=""
            />
          </div>
          <h5 className="font-weight-bold">Job Search</h5>
          <p className="text-muted-2 fs-4">
            Easily search and apply for jobs from top companies. Our advanced
            filters and job alerts help you find the perfect fit.
          </p>
        </div>
        <div className="col-md-4 text-center feature-box">
          <div className="icon">
            <img
              className="bg-success icon-8"
              src="https://img.icons8.com/?size=64&id=CgELV9WHcecG&format=png"
              alt=""
            />
          </div>
          <h5 className="font-weight-bold">Resume Builder</h5>
          <p className="text-muted-2 fs-4">
            Create a professional resume that showcases your skills and
            experience. Our templates and tips help you stand out.
          </p>
        </div>
        <div className="col-md-4 text-center feature-box">
          <div className="icon">
            {/* <i className="bi bi-mortarboard"></i> */}
            <img
              className="bg-success icon-8"
              src="https://img.icons8.com/?size=50&id=45589&format=png"
              alt=""
            />
          </div>
          <h5 className="font-weight-bold">Interview Prep</h5>
          <p className="text-muted-2 fs-4">
            Prepare for your interviews with our comprehensive guides and
            practice tools. Get feedback and tips to ace your interviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
