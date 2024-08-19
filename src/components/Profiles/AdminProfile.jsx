import React from "react";
import Adminpic from "./Admins/admin-pic";
import AvailablejobseekrsAdmin from "./Admins/available-jobseekers-ADMIN";
import AvailableemployersAdmin from "./Admins/available-employer";
import { useOutletContext } from "react-router-dom";


function AdminProfile (){
  const {user} = useOutletContext();
  if (user) {
    return(
      <div className="bg-light">
  
        <Adminpic/>
        <AvailablejobseekrsAdmin/>
        <AvailableemployersAdmin/>
        
        
      </div>
    )
  }
  else{
    return(
      <div>
        <h1>loading...</h1>
      </div>
    )
  }
}
export default AdminProfile