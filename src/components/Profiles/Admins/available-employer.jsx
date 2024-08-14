import React, { useState } from 'react';
import '../../../CSS/employer/availableemployer.css'

const AvailableemployersAdmin = () => {
    const [employers, setEmployers] = useState([
        { name: 'ABC Corp', username: 'abc123' },
        { name: 'XYZ Inc', username: 'xyz789' },
        { name: 'Tech Solutions', username: 'tech_solutions' },
        { name: 'Innovative Systems', username: 'innovative123' },
        { name: 'Global Services', username: 'global_serv' }
    ]);

    const viewEmployer = (employer) => {
        // Handle view employer action
        console.log(`Viewing employer: ${employer.name}, Username: ${employer.username}`);
    };

    const removeEmployer = (employer) => {
        // Handle remove employer action
        console.log(`Removing employer: ${employer.name}`);
        setEmployers(employers.filter(e => e.name !== employer.name));
    };

    return (
        <div className="employer-list">
            <h2>Available Employers</h2>
            <ul>
                {employers.map((employer, index) => (
                    <li key={index} className="employer-item">
                        <span>
                            {employer.name} <em>({employer.username})</em>
                        </span>
                        <button onClick={() => viewEmployer(employer)}>View Employer</button>
                        <button onClick={() => removeEmployer(employer)}>Remove Employer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableemployersAdmin;
