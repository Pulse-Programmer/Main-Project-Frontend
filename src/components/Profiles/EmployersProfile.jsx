import React from "react";
import OurHistory from "../EMPLOYERS/history";
import ServicesSection from "../EMPLOYERS/services";
import JobSeekersSection from "../EMPLOYERS/available-jobseekers";
import Footer from "../Home/footer";
import { useOutletContext } from "react-router-dom";

function EmployersProfile() {
  const { user } = useOutletContext();
  if (user) {
    return (
      <div>
        <OurHistory />
        <ServicesSection />
        <JobSeekersSection />
        <Footer />
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

export default EmployersProfile; //exporting the component
