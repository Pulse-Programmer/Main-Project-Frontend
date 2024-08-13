import React, { useState , useEffect} from 'react';
import { useOutletContext, useNavigate} from 'react-router-dom';
import '../../CSS/jobseeker-css/jobseeker.css'

function JobSeekerProfile() {
  const {user, setUser} = useOutletContext()
  const navigate = useNavigate()
  
  const [profpic, setProfpic] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    work_experience: '',
    job_category: '',
    education: '',
    skills: '',
    bio: '',
    resume_file:'',
    salary_expectation:'',
    
  });

  useEffect(() => {
    // Fetch user profile if available
    const fetchProfiles = async () => {
      const response = await fetch(`/jobseekers?user_id=${user.id}`);
      const data = await response.json();
      setProfiles(data);
    };
    fetchProfiles();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     documents: files,
  //   }));
  // };

  const handleProfilePictureChange = (e) => {
    setProfpic(e.target.files[0]);
  };

  // const uploadProfilePicture = async (profileId) => {
  //   if (profpic) {
  //     const formData = new FormData();
  //     formData.append('profpic', profpic);

  //     try {
  //       const response = await fetch(`http://localhost:3000/upload-picture`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (!response.ok) {
  //         throw new Error('Failed to upload profile picture');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading profile picture:', error);
  //     }
  //   }
  // };

  // const uploadDocuments = async (profileId) => {
  //   if (formValues.documents.length > 0) {
  //     const formData = new FormData();
  //     formValues.documents.forEach((file, index) => {
  //       formData.append(`documents[${index}]`, file);
  //     });

  //     try {
  //       const response = await fetch(`http://localhost:3000/upload-documents`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (!response.ok) {
  //         throw new Error('Failed to upload documents');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading documents:', error);
  //     }
  //   }
  // };

  const handleAddProfile = async (e) => {
    e.preventDefault();
    const profileData = {
      // name: formValues.name,
      work_experience: formValues.work_experience,
      job_category: formValues.job_category,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
      resume_file: formValues.resume_file,
      salary_expectation: formValues.salary_expectation,
    };
    console.log(profileData)
    try {
      const response = await fetch('/jobseekers', {
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

      // await uploadProfilePicture(newProfile.id);
      // await uploadDocuments(newProfile.id);

      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
      setFormValues({
        // name: '',
        work_experience: '',
        job_category: '',
        education: '',
        skills: '',
        bio: '',
        resume_file:'',
        salary_expectation:'',
      });
      setProfpic(null);

    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleUpdateProfile = async (profileId) => {
    const profileData = {
      // name: formValues.name,
      work_experience: formValues.work_experience,
      job_category: formValues.job_category,
      education: formValues.education,
      skills: formValues.skills,
      bio: formValues.bio,
      resume_file: formValues.resume_file,
      salary_expectation: formValues.salary_expectation,
    };

    try {
      const response = await fetch(`/jobseekers/${profileId}`, {
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

      // await uploadProfilePicture(updatedProfile.id);
      // await uploadDocuments(updatedProfile.id);

      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) => (profile.id === profileId ? updatedProfile : profile))
      );

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  function handleLogoutClick() {
    console.log("hello");
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => navigate("/"));
    
  }
  if(user){
  return (
    <div className="authict-page">
      <h2>Job Seeker Profile</h2>
      <div className="authic-page">
        <form className="profile-form" onSubmit={handleAddProfile}>
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
            <button onClick={handleLogoutClick} > logout</button>
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
              placeholder=" Bio"
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
              placeholder='resumeFile_url'
              value={formValues.resume_file}
              onChange={handleInputChange}
              required
            />
            {/* {formValues.documents.length > 0 && (
              <p className="document-name">
                {formValues.documents.map((file, index) => (
                  <span key={index}>{file.name}</span>
                ))}
              </p>
            )} */}
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
              <p>Resume: {profile.resume_file}</p>
              <button onClick={() => handleUpdateProfile(profile.id)} className='add-button'>Edit Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
  }else{
    return (
      <div><h1> loading....</h1></div>
    );
  ;
}
}

export default JobSeekerProfile;
