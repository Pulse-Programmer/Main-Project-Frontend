import React from 'react';
import '../../CSS/home/home.css'
const Testimonials = () => {
  return (
    <div className="container-fluid testimonials-container">
      <div className="text-center">
        <span className="K text-black">Testimonials</span>
        <h2 className="display-6 mt-3">What Our Users Say</h2>
        <p className="text-muted-1 fs-4">Hear from real job seekers who have found <br/> success with our app.</p>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-4 testimonial-box">
          <div className="testimonial-content">
            <div className="user-icon mb-3">
              <img src="https://img.icons8.com/?size=80&id=ywULFSPkh4kI&format=png" alt="" />
            </div>
            <h5 className="font-weight-bold">John Doe</h5>
            <p className="text-muted-1 fs-5">Software Engineer</p>
            <p className="testimonial-text fs-4">"The job search feature on this app is amazing. I was able to find my dream job in just a few weeks!"</p>
          </div>
        </div>
        <div className="col-md-4 testimonial-box">
          <div className="testimonial-content">
            <div className="user-icon mb-3">
              <img src="https://img.icons8.com/?size=80&id=ywULFSPkh4kI&format=png" alt="" />
            </div>
            <h5 className="font-weight-bold">Sarah Anderson</h5>
            <p className="text-muted-1 fs-5">Marketing Manager</p>
            <p className="testimonial-text fs-4">"The resume builder tool is a game-changer. It helped me create a professional-looking resume that got me noticed."</p>
          </div>
        </div>
        <div className="col-md-4 testimonial-box">
          <div className="testimonial-content">
            <div className="user-icon mb-3">
              <img src="https://img.icons8.com/?size=80&id=ywULFSPkh4kI&format=png" alt="" />
            </div>
            <h5 className="font-weight-bold">Michael Rodriguez</h5>
            <p className="text-muted-1 fs-5">Sales Representative</p>
            <p className="testimonial-text fs-4">"The interview preparation tools on this app are fantastic. I felt so much more confident going into my interviews."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
