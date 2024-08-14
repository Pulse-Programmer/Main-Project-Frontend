import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';


const UpdateForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [history, setHistory] = useState('');
  const [services, setServices] = useState('');
  const { user } = useOutletContext();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/employers/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          history: history,
          services_offered: services,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data updated successfully:', data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label>Our History:</label>
        <textarea
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
      </div>
      <div>
        <label>Our Services:</label>
        <textarea
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
