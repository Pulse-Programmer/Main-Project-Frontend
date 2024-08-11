import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../CSS/profiles-css/jobseeker.css'

function JobSeekerProfile() {
  const location = useLocation();
  const username = location.state?.username || '';
  const [profilePicture, setProfilePicture] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    experience: '',
    jobCategory: '',
    education: '',
    skills: '',
    bio: '',
    documents: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      documents: files,
    }));
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const uploadProfilePicture = async (profileId) => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      try {
        const response = await fetch(`http://localhost:3000/upload-picture`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const uploadDocuments = async (profileId) => {
    if (formValues.documents.length > 0) {
      const formData = new FormData();
      formValues.documents.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });

      try {
        const response = await fetch(`http://localhost:3000/upload-documents`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to upload documents');
        }
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    }
  };

  const handleAddProfile = async (e) => {
    e.preventDefault();
    const profileData = {
      name: formValues.name,
      experience: formValues.experience,
      jobCategory: formValues.jobCategory,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
    };

    try {
      const response = await fetch('http://localhost:3000/jobseekers', {
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

      const newProfile = await response.json();

      await uploadProfilePicture(newProfile.id);
      await uploadDocuments(newProfile.id);

      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
      setFormValues({
        name: '',
        experience: '',
        jobCategory: '',
        education: '',
        skills: '',
        bio: '',
        documents: [],
      });
      setProfilePicture(null);

    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleUpdateProfile = async (profileId) => {
    const profileData = {
      name: formValues.name,
      experience: formValues.experience,
      jobCategory: formValues.jobCategory,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
    };

    try {
      const response = await fetch(`http://localhost:3000/jobseekers/${profileId}`, {
        method: 'PUT',
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

      await uploadProfilePicture(updatedProfile.id);
      await uploadDocuments(updatedProfile.id);

      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) => (profile.id === profileId ? updatedProfile : profile))
      );

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="authict-page">
      <h2>Job Seeker Profile</h2>
      <div className="authic-page">
        <form className="profile-form" onSubmit={handleAddProfile}>
          <div className="profile-header">
            <h3>{username}</h3>
            <input
              className="hidden-input"
              type="file"
              name="profilePicture"
              onChange={handleProfilePictureChange}
            />
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
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
              required
            />
          </div>
          <div className="profile-card">
            <textarea
              className="card-content"
              name="experience"
              placeholder="Experience"
              value={formValues.experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-card">
            <textarea
              className="card-content"
              name="jobCategory"
              placeholder="Job Category"
              value={formValues.jobCategory}
              onChange={handleInputChange}
              required
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
              placeholder=" Bio"
              value={formValues.bio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Upload Documents</h4>
            <input
              className="card-content"
              type="file"
              name="documents"
              onChange={handleFileChange}
              multiple
            />
            {formValues.documents.length > 0 && (
              <p className="document-name">
                {formValues.documents.map((file, index) => (
                  <span key={index}>{file.name}</span>
                ))}
              </p>
            )}
          </div>
          <button type="submit" className='save-button'>Save Profile</button>
        </form>
      </div>
      <br />
      {profiles.length > 0 && (
        <div className="authic-page">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <h3>{profile.name}</h3>
              <p>Experience: {profile.experience}</p>
              <p>Job Category: {profile.jobCategory}</p>
              <p>Education: {profile.education}</p>
              <p>Skills: {profile.skills}</p>
              <p>Bio: {profile.bio}</p>
              <button onClick={() => handleUpdateProfile(profile.id)} className='add-button'>Edit Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobSeekerProfile;
