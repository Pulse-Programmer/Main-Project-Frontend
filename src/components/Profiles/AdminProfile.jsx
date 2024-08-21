import React from "react";
import AdminDashboard from "../ADMIN/admin";

import { useOutletContext } from "react-router-dom";

function AdminProfile() {
  const { user } = useOutletContext();
  if (user) {
    return (
      <div className="bg-light">
        <AdminDashboard />
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
}
export default AdminProfile;
