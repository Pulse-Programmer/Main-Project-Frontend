import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../CSS/employer/employer.css'



function Adminpic({setUser}){
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        fetch('/logout', { method: 'DELETE' })
          .then((r) => {
            if (r.ok) {
              setUser(null);
            }
          })
          .then(() => navigate('/'));
      };
    
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
            <button onClick={handleLogoutClick} className="logout-button">
        Logout
      </button>
        </div>
    )
}
export default Adminpic;  //exporting the component