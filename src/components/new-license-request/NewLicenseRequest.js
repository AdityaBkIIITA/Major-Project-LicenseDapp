// NewLicenseRequest.js

import React, { useState } from 'react';
import './NewLicenseRequest.css';

function NewLicenseRequest() {
  // State variables to store form data
  const [licenseId, setLicenseId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to backend
    console.log('Form submitted:', { licenseId, file, message });
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to generate a new license ID
  const generateLicenseId = () => {
    // Implement logic to generate a unique license ID
    // For example, you can fetch the count from the backend and add 1
    const count = 100; // Example count
    const newLicenseId = `L-${count + 1}`;
    setLicenseId(newLicenseId);
  };

  return (
    <div>
      <h2>New License Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="licenseId">License ID</label>
          <input type="text" id="licenseId" value={licenseId} readOnly />
          <button type="button" onClick={generateLicenseId}>Generate ID</button>
        </div>
        <div>
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewLicenseRequest;
