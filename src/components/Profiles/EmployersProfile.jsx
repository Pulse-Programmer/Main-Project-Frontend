import React from "react"
import Profilepic from "./employer/profile-pic"
import History from "./employer/history";
import Availablejobseekrs from "./employer/available-joseekers";


function EmployersProfile (){
  return(
    <div>
      <Profilepic />
      <History />
      <Availablejobseekrs/>
    </div>
  )
}
export default EmployersProfile;  //exporting the component