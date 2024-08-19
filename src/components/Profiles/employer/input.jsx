import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../CSS/employer/employer.css";
import { useOutletContext } from 'react-router-dom';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    history: '',
    services_offered: ''
  });
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/employers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        // Navigate to the employers page
        navigate('/employers-profile');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="history">Our History</label>
          <textarea
            name="history"
            value={formData.history}
            onChange={handleChange}
            placeholder="Enter our history"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="services_offered">Our Services</label>
          <textarea
            name="services_offered"
            value={formData.services_offered}
            onChange={handleChange}
            placeholder="Enter our services"
            required
          />
        </div>
        <button className='inputbutton' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
