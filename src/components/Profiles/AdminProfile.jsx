import React, { useState } from 'react';


const AdminProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    skills: '',
    bio: '',
    documents: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('profilePicture', profilePicture);
    data.append('experience', formData.experience);
    data.append('education', formData.education);
    data.append('skills', formData.skills);
    data.append('bio', formData.bio);
    if (formData.documents) {
      data.append('documents', formData.documents);
    }

    fetch('http://localhost:3000/update-profile', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Profile updated successfully', data);
      })
      .catch((err) => {
        console.error('Error updating profile', err);
      });
  };

  const handleDelete = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: '',
    }));
  };

  return (
    <div className='authict-page'>
    <div className="authic-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-header">
          <input type="file" onChange={handleProfilePictureChange} id="profilePicInput" className="hidden-input" />
          {profilePicture && (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="profile-picture"
            />
          )}
          <div className="profile-info">
            <h2 className="profile-name">John Doe</h2>
            <h3 className="profile-title">Software Engineer</h3>
          </div>
        </div>
        <div className="profile-card">
          <h4 className="card-title">Work Experience</h4>
          <textarea
            className="card-content"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
          <button className="add-button" type="button" onClick={() => handleDelete('experience')}>Delete</button>
        </div>
        <div className="profile-card">
          <h4 className="card-title">Education</h4>
          <textarea
            className="card-content"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
          />
          <button className="add-button" type="button" onClick={() => handleDelete('education')}>Delete</button>
        </div>
        <div className="profile-card">
          <h4 className="card-title">Skills</h4>
          <textarea
            className="card-content"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
          <button className="add-button" type="button" onClick={() => handleDelete('skills')}>Delete</button>
        </div>
        <div className="profile-card">
          <h4 className="card-title">Bio</h4>
          <textarea
            className="card-content"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
          <button className="add-button" type="button" onClick={() => handleDelete('bio')}>Delete</button>
        </div>
        <div className="profile-card">
          <h4 className="card-title">Documents</h4>
          <input className="card-content" type="file" name="documents" onChange={handleFileChange} />
          {formData.documents && <p className="document-name">{formData.documents.name}</p>}
          <button className="add-button" type="button" onClick={() => handleDelete('documents')}>Delete</button>
        </div>
        <button type="submit" className="save-button">Save Profile</button>
      </form>
    </div>
    </div>
  );
};

export default AdminProfile;
