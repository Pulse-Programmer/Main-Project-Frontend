import React from "react";
import "../../../CSS/employer/employer.css";

function HistoryServices() {
  return (
    <div className="row history">
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="card">
        <div ><h4> Our History</h4></div>
          <div className="icons">
            <img className="edit" src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="delete" /> 
            <img className="edit" src="https://img.icons8.com/?size=100&id=3062&format=png&color=000000" alt="delete" />
          </div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        
        <div className="card">
        <div ><h4> Our Services</h4></div>
          <div className="icons">
            <img className="edit" src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="delete" /> 
            <img className="edit" src="https://img.icons8.com/?size=100&id=3062&format=png&color=000000" alt="delete" />
          </div>

          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HistoryServices; //export default keyword is used to export a single module. It can be
