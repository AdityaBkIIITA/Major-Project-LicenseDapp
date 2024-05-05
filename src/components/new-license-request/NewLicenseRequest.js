import React, { useState } from 'react';
import './NewLicenseRequest.css';
import { uploadFileToIPFS } from '../../utils/ipfs';

function NewLicenseRequest({ address, licenseContract, sfId }) {
  console.log(sfId);
  // State variables to store form data
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [rbId, setRbId] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload file to IPFS and get the IPFS hash
    const ipfsHash = await uploadFileToIPFS(file);
    console.log(ipfsHash, typeof(ipfsHash));
    console.log(sfId, typeof(sfId));
    console.log(rbId, typeof(rbId));
    console.log(message, typeof(message));

    // Call the contract method to add a license request
    try {
      await licenseContract.methods.addLicenseRequest(sfId, rbId, message, ipfsHash).send({ from: address });
      // Clear the form after submission
      setFile(null);
      setMessage('');
      setRbId('');
    } catch (error) {
      console.error('Error submitting license request:', error);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle RBId input change
  const handleRbIdChange = (e) => {
    const rbIdValue = e.target.value;
    setRbId(rbIdValue);
  };

  return (
    <div>
      <h2>New License Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="rbId">Regulatory Body Identifier</label>
          <input type="text" id="rbId" value={rbId} onChange={handleRbIdChange} />
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
