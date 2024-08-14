import React  from "react";
import '../CSS/landing.css'
import { Link } from "react-router-dom";


function Welcomepage(){
    return(
        <div className="landing" >
            <div>
                <h1 className=" h1">Welcome To Job Seek!</h1>
                <p className="p1">Sign in as one of the following to get started</p>
            </div>
            <div className="row row-sm">
                <div className="col-3 wel col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div>
                        
                        <Link to={`/login`} type="button" className="btn btn1 btn-success">Login </Link> 
                    </div>
                </div>

            </div>

            
        </div>
    )
}
export default Welcomepage;  