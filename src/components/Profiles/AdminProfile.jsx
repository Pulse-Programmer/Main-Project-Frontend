import React from "react";
import Adminpic from "./Admins/admin-pic";
import AvailablejobseekrsAdmin from "./Admins/available-jobseekers-ADMIN";
import AvailableemployersAdmin from "./Admins/available-employer";

function AdminProfile (){
  return(
    <div>
      <Adminpic/>
      <AvailablejobseekrsAdmin/>
      <AvailableemployersAdmin/>
    </div>
  )
}
export default AdminProfile