import React, { useState } from 'react';

function JobSeekerProfile() {
  const [formValues, setFormValues] = useState({
    name: "",
    experience: "",
    jobCategory: "",
    education: "",
    skills: "",
    bio: "",
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [documentsUrls, setDocumentsUrls] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Handle file change for profile picture
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file).then(url => setProfilePictureUrl(url));
    }
  };

  // Handle file change for documents
  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(file => uploadFile(file));
    
    Promise.all(uploadPromises).then(urls => setDocumentsUrls(urls));
  };

  // Upload a file to the server and return the URL
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      const data = await response.json();
      return data.fileUrl; // Assuming the server returns the file URL
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  // Validate form fields
  const isFormValid = () => {
    return (
      formValues.name &&
      formValues.experience &&
      formValues.jobCategory &&
      formValues.education &&
      formValues.skills &&
      formValues.bio
    );
  };

  // Clear form fields
  const clearForm = () => {
    setFormValues({
      name: "",
      experience: "",
      jobCategory: "",
      education: "",
      skills: "",
      bio: "",
    });
    setProfilePictureUrl("");
    setDocumentsUrls([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill out all required fields.');
      return;
    }

    // Create profile data with URLs
    const profileData = {
      name: formValues.name,
      experience: formValues.experience,
      jobCategory: formValues.jobCategory,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
      profilePicture: profilePictureUrl,
      documents: documentsUrls,
    };

    try {
      const response = await fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Profile creation failed');
      }
      await response.json();
      alert('Profile created successfully!');

      // Clear the form after successful submission
      clearForm();
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  return (
    <div className="authict-page">
      <div className="authic-page">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-card">
            <h4 className="card-title">Profile Picture</h4>
            <input
              type="file"
              name="profilePicture"
              onChange={handleProfilePictureChange}
              className="card-content"
            />
            {profilePictureUrl && (
              <a
                href={profilePictureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-picture-link"
              >
                View Profile Picture
              </a>
            )}
          </div>
          <div className="profile-card">
            <h4 className="card-title">Name</h4>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Experience</h4>
            <input
              type="text"
              name="experience"
              value={formValues.experience}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Job Category</h4>
            <input
              type="text"
              name="jobCategory"
              value={formValues.jobCategory}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Education</h4>
            <input
              type="text"
              name="education"
              value={formValues.education}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Skills</h4>
            <input
              type="text"
              name="skills"
              value={formValues.skills}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Bio</h4>
            <input
              type="text"
              name="bio"
              value={formValues.bio}
              onChange={handleInputChange}
              className="card-content"
              required
            />
          </div>
          <div className="profile-card">
            <h4 className="card-title">Documents</h4>
            <input
              type="file"
              name="documents"
              multiple
              onChange={handleDocumentsChange}
              className="card-content"
            />
            {documentsUrls.length > 0 && documentsUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="document-link"
              >
                View Document {index + 1}
              </a>
            ))}
          </div>
          <button type="submit" className="save-button" disabled={!isFormValid()}>
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerProfile;
