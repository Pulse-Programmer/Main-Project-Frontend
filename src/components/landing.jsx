import React  from "react";
import '/home/victor/Moringa/Code/SE-phase-5/final-project/Main-Project-Frontend/src/CSS/landing.css'


function Welcomepage(){
    return(
        <div >
            <div>
                <h1 className=" h1">Welcome To Job Seek!</h1>
                <p className="p1">Sign in as one of the following to get started</p>
            </div>
            <div className="row row-sm">
                <div className="col-3 wel col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div>
                        <img className="icon" src="https://img.icons8.com/?size=100&id=101865&format=png&color=000000" alt="" />
                        <h2 className="icon-name">Admin</h2>
                        <button type="button" className="btn btn1 btn-success">Sign in</button>
                        
                    </div>
                </div>
                <div className="col-3 wel col-sm-12 col-md-6 col-lg-6 col-xl-3 ">
                    <div>
                        <img className="icon"  src="https://img.icons8.com/?size=100&id=43460&format=png&color=000000" alt="" />
                        <h2 className="icon-name">Job Seeker</h2>
                        <button type="button" className="btn btn1 btn-success">Sign in</button>
                        
                    </div>
                </div>
                <div className="col-3 wel col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <div>
                        <img className="icon"  src="https://img.icons8.com/?size=100&id=ajuvm9ItWIP7&format=png&color=000000" alt="" />
                        <h2 className="icon-name">Employer</h2>
                        <button type="button" class="btn btn1 btn-success">Sign in</button>
                        
                    </div>
                </div>

            </div>

            
        </div>
    )
}
export default Welcomepage;  