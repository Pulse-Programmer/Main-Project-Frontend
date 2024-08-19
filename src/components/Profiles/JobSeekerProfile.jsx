import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Navbar from './Navbar';
import '../../CSS/jobseeker-css/jobseeker.css';

function JobSeekerProfile() {
  const { user, setUser } = useOutletContext();
  const [profpic, setProfpic] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    work_experience: '',
    job_category: '',
    education: '',
    skills: '',
    bio: '',
    salary_expectation: '',
    resume_file: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [contactRequests, setContactRequests] = useState([]);
  const [viewingMessages, setViewingMessages] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/jobseekers/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchContactRequests = async () => {
      try {
        const response = await fetch(`/jobseekers/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch contact requests');
        const data = await response.json();
        // Ensure contactRequests is an array
        console.log(data);
        setContactRequests(data.contact_requests);
      } catch (error) {
        console.error('Error fetching contact requests:', error);
        setContactRequests([]); // Set contactRequests to an empty array on error
      }
    };

    if (user?.id) {
      fetchProfile();
      fetchContactRequests();
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    setProfpic(e.target.files[0]);
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
      prof_pic: profpic ? URL.createObjectURL(profpic) : null,
    };

    try {
      const response = profile
        ? await fetch(`/jobseekers/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          })
        : await fetch('/jobseekers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setFormValues({
        name: '',
        work_experience: '',
        job_category: '',
        education: '',
        skills: '',
        bio: '',
        salary_expectation: '',
        resume_file: '',
      });
      setProfpic(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`/jobseekers/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setProfile(null);
      setFormValues({
        name: '',
        job_category: '',
        work_experience: '',
        education: '',
        skills: '',
        bio: '',
        salary_expectation: '',
        resume_file: '',
      });
      setProfpic(null);
      setIsEditing(true);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const toggleViewMessages = () => {
    setViewingMessages(!viewingMessages);
  };

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="authict-page">
      <Navbar setUser={setUser} />
      <h2>Job Seeker Profile</h2>
      <div className="authic-page">
        {viewingMessages ? (
          <div className="contact-requests">
            <h3>Contact Requests</h3>
            <ul className="profile-card">
              {contactRequests.map((request) => (
                <li key={request.id} className='request-item'>
                  <div className='request-message'>
                  <p>{request.message}</p>
                  </div>
                  <div className='request-info'>
                  <small>From: {request.employer.company_name}</small>
                  <small>{request.created_at}</small>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={toggleViewMessages} className="save-button">
              Back to Profile
            </button>
          </div>
        ) : isEditing ? (
          <form className="profile-form" onSubmit={handleAddOrUpdateProfile}>
            <div className="profile-header">
              <h3>{user.username}</h3>
              <input
                className="hidden-input"
                type="file"
                name="profilePicture"
                onChange={handleProfilePictureChange}
              />
              {profpic && (
                <img
                  src={URL.createObjectURL(profpic)}
                  alt="Profile Preview"
                  className="profile-picture"
                />
              )}
            </div>
            <div className="profile-card">
              <input
                className="card-content"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-card">
              <textarea
                className="card-content"
                name="work_experience"
                placeholder="Experience"
                value={formValues.work_experience}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-card">
              <textarea
                className="card-content"
                name="job_category"
                placeholder="Job Category"
                value={formValues.job_category}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-card">
              <textarea
                className="card-content"
                name="education"
                placeholder="Education"
                value={formValues.education}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-card">
              <textarea
                className="card-content"
                name="skills"
                placeholder="Skills"
                value={formValues.skills}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-card">
              <textarea
                className="card-content"
                name="bio"
                placeholder="Bio"
                value={formValues.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-card">
              <input
                className="card-content"
                type="number"
                name="salary_expectation"
                placeholder="Salary Expectation"
                value={formValues.salary_expectation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-card">
              <input
                className="card-content"
                name="resume_file"
                placeholder="Resume File URL"
                value={formValues.resume_file}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="save-button">
              {profile ? 'Update Profile' : 'Save Profile'}
            </button>
          </form>
        ) : (
          profile && (
            <div className="authic-page">
              <div className="profile-card">
                {profile.prof_pic && (
                  <img
                    src={profile.prof_pic}
                    alt="Profile Preview"
                    className="profile-picture"
                  />
                )}
                <h3>{user.username}</h3>
                <p>Name: {profile.name}</p>
                <p>Experience: {profile.work_experience}</p>
                <p>Job Category: {profile.job_category}</p>
                <p>Education: {profile.education}</p>
                <p>Skills: {profile.skills}</p>
                <p>Bio: {profile.bio}</p>
                <p>Salary Expectation: {profile.salary_expectation}</p>
                <p>Resume: {profile.resume_file}</p>
              </div>
              <button onClick={handleDeleteProfile} className="delete-button">
                Delete Profile
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="save-button"
              >
                Edit Profile
              </button>
              <button
                onClick={toggleViewMessages}
                className="save-button"
              >
                View Messages
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default JobSeekerProfile;