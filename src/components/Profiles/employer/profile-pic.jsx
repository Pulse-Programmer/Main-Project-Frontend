import React from "react";
import '../../../CSS/employer/employer.css'



function Profilepic(){
    return(
        <div className="profilepic">
            <h1></h1>
            <div className="pic">
                <img className="src" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="profile-pic" />
            </div>
            <div>
                <h1 className="name">John Doe</h1>
                <h4 className="compname">RoamTech Technologies</h4>
            </div>
        </div>
    )
}
export default Profilepic;  //exporting the component