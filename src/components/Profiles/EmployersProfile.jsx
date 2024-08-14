import React from "react"
import Profilepic from "./employer/profile-pic"
import History from "./employer/history";
import Availablejobseekrs from "./employer/available-joseekers";
import { useOutletContext } from "react-router-dom";


function EmployersProfile (){
  const { user } = useOutletContext();
  if (user) {
  return(
    <div className="bg-primary-subtle">
      <Profilepic />
      <History />
      <Availablejobseekrs/>
    </div>
  )
  }
  else {
    return (
      <div><h1>loading...</h1></div>
    )
  }
}

export default EmployersProfile;  //exporting the component