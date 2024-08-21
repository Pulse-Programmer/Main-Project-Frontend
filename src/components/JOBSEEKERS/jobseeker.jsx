import React, { useState, useEffect } from "react";
import "../../CSS/JOBSEEKERS/jobseeker.css";
import { useOutletContext, useNavigate } from "react-router-dom";

function ProfileCard() {
  const { user, setUser } = useOutletContext();
  const [profile, setProfile] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    work_experience: "",
    job_category: "",
    education: "",
    skills: "",
    bio: "",
    salary_expectation: "",
    resume_file: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [contactRequests, setContactRequests] = useState([]);
  // const [viewingMessages, setViewingMessages] = useState(false);
  const [switched, setSwitched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `https://main-project-backend-1z6e.onrender.com/jobseekers/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        console.log(data);

        setProfile(data);
        setFormValues(data);
        setIsEditing(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    console.log(user);
    console.log(profile);

    const fetchContactRequests = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `https://main-project-backend-1z6e.onrender.com/jobseekers/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch contact requests");
        const data = await response.json();
        setContactRequests(data.contact_requests || []);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
        setContactRequests([]);
      }
    };

    if (user?.id) {
      fetchProfile();
      fetchContactRequests();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAddOrUpdateProfile = async (e) => {
    e.preventDefault();
    const profileData = {
      name: formValues.name,
      work_experience: formValues.work_experience,
      job_category: formValues.job_category,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
      salary_expectation: parseFloat(formValues.salary_expectation),
      resume_file: formValues.resume_file,
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = profile
        ? await fetch(
            `https://main-project-backend-1z6e.onrender.com5/jobseekers/${user.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(profileData),
            }
          )
        : await fetch(
            `https://main-project-backend-1z6e.onrender.com/jobseekers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(profileData),
            }
          );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setFormValues(updatedProfile);
      setSwitched("profile");

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://main-project-backend-1z6e.onrender.com/jobseekers/${user.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setProfile(null);
      setFormValues({
        name: "",
        job_category: "",
        work_experience: "",
        education: "",
        skills: "",
        bio: "",
        salary_expectation: "",
        resume_file: "",
      });
      setIsEditing(true);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const toggleViewMessages = () => {
    setSwitched(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/Main-Project-Frontend");
  };

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log(profile);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src="https://img.icons8.com/?size=50&id=pB77uEobJRjy&format=png"
              alt="Acme Employers"
              className="navbar-logo"
            />
            Acme Jobseeker
          </span>
          <div id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button //changed
                  className="nav-link"
                  onClick={() => setSwitched(true)}
                >
                  Edit Profile
                </button>
              </li>
              <li className="nav-item">
                <button //changed
                  onClick={toggleViewMessages}
                  className="nav-link"
                >
                  View Messages
                </button>
              </li>
              <li className="nav-item">
                <button //changed
                  onClick={handleDeleteProfile}
                  className="nav-link"
                >
                  Delete Profile
                </button>
              </li>
              <li className="nav-item">
                <button //changed
                  onClick={handleLogoutClick}
                  className="nav-link"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="contact-requests-container">
        {switched === false ? (
          <div className="contact-requests">
            <div className="requests-header">
              <h3>Contact Requests</h3>
              {/* <button className="mark-all-read">Mark all as read</button> */}
            </div>
            <ul className="requests-list">
              {contactRequests.map((request) => (
                <li key={request.id} className="request-item">
                  <div className="request-content">
                    <div className="request-header">
                      <div className="request-icon">
                        {/* Add an icon here if needed */}
                        <span className="icon-placeholder">👤</span>
                      </div>
                      <div className="request-details">
                        <p className="request-sender">
                          {request.employer.company_name}
                          <span className="request-time">
                            {request.created_at}
                          </span>
                        </p>
                        <p className="request-message">{request.message}</p>
                      </div>
                    </div>
                    <button className="request-action">
                      <span>✔️</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {profile && (
              <button
                onClick={() => setSwitched("profile")}
                className="back-button"
              >
                Back to Profile
              </button>
            )}
          </div>
        ) : switched === true ? (
          <form className="profile-form" onSubmit={handleAddOrUpdateProfile}>
            <div className="profile-form-container">
              <div className="profile-card-2">
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <textarea
                  className="input-field"
                  name="work_experience"
                  placeholder="Experience"
                  value={formValues.work_experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <textarea
                  className="input-field"
                  name="job_category"
                  placeholder="Job Category"
                  value={formValues.job_category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <textarea
                  className="input-field"
                  name="education"
                  placeholder="Education"
                  value={formValues.education}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <textarea
                  className="input-field"
                  name="skills"
                  placeholder="Skills"
                  value={formValues.skills}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <textarea
                  className="input-field"
                  name="bio"
                  placeholder="Bio"
                  value={formValues.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <input
                  className="input-field"
                  type="number"
                  name="salary_expectation"
                  placeholder="Salary Expectation"
                  value={formValues.salary_expectation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-2">
                <input
                  className="input-field"
                  name="resume_file"
                  placeholder="Resume File URL"
                  value={formValues.resume_file}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-button">
                {profile ? "Update Profile" : "Save Profile"}
              </button>
            </div>
          </form>
        ) : (
          switched === "profile" && (
            <div className="profile-card-1">
              <h2 className="profile-name">{profile.name}</h2>
              <h4 className="profile-title">{profile.job_category}</h4>
              <div className="profile-section">
                <h5 className="profile-section-title">Bio</h5>
                <p className="profile-section-content">{profile.bio}</p>
              </div>
              <div className="profile-section">
                <h5 className="profile-section-title">Work Experience</h5>
                <p className="profile-description">{profile.work_experience}</p>
              </div>
              <div className="profile-section">
                <h5 className="profile-section-title">Education</h5>
                <p className="profile-education-title">{profile.education}</p>
              </div>
              <div className="profile-section">
                <h5 className="profile-section-title">Salary Expectation</h5>
                <p className="profile-salary">${profile.salary_expectation}</p>
              </div>
              <div className="profile-section">
                <h5 className="profile-section-title">Resume</h5>
                <a href={profile.resume_file} className="profile-resume-link">
                  View Resume
                </a>
              </div>

              <div className="mt-3">
                {/* <button onClick={toggleViewMessages} className="save-button">
                  View Messages
                </button> */}
                {/* <button
                  onClick={() => setIsEditing(true)}
                  className="save-button"
                >
                  Edit
                </button> */}
                {/* <button onClick={handleDeleteProfile} className="save-button">
                  Delete Profile
                </button> */}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ProfileCard;
