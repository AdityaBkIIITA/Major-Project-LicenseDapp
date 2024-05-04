// License.js

import React, { useState, useEffect } from 'react';
import './Licenses.css';

function License() {
  // State variable to store license data
  const [licenses, setLicenses] = useState([]);

  // Simulated data for licenses (replace with actual data fetching logic)
  const dummyData = [
    { id: 1, name: 'License 1', size: '10 MB', date: '2024-05-10', downloadLink: '/downloads/license1.pdf' },
    { id: 2, name: 'License 2', size: '8 MB', date: '2024-05-12', downloadLink: '/downloads/license2.pdf' },
    // Add more license data as needed
  ];

  useEffect(() => {
    // Simulated fetching of license data (replace with actual data fetching logic)
    setLicenses(dummyData);
  }, []);

  return (
    <div>
      <h2>My Licenses</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Size</th>
            <th>Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license, index) => (
            <tr key={license.id}>
              <td>{index + 1}</td>
              <td>{license.name}</td>
              <td>{license.size}</td>
              <td>{license.date}</td>
              <td><a href={license.downloadLink} download>Download</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default License;
