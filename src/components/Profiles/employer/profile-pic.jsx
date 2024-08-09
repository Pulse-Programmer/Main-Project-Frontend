import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";



function Profilepic() {
    const navigate = useNavigate()
    const {user, setUser} = useOutletContext()
    // const [username, setUsername] = useState("John Doe"); // Default username

    // useEffect(() => {
    //     // Fetch username from backend

    //     fetch("/check_session") // Replace with your API endpoint
    //         .then(response => response.json())
    //         .then(data => {
    //             setUsername(data.username); // Adjust according to the API response
    //         })
    //         .catch(error => console.error("Error fetching username:", error));
    // }, []); // Empty dependency array means this effect runs once on mount
    function handleLogoutClick() {
        console.log("hello");
        fetch("/logout", { method: "DELETE" })
          .then((r) => {
            if (r.ok) {
              setUser(null);
            }
          })
          .then(() => navigate("/"));
        
      }

    return (
        <div className="profilepic">
            <div className="pic">
                <img className="src" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="profile-pic" />
            </div>
            <div>
            <button onClick={handleLogoutClick} className="bg-danger">logOut</button>
                <h1 className="name text-success">{user.username}</h1>
                
            </div>
        </div>
    );
}

export default Profilepic;
