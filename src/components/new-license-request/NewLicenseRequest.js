import React, { useState, useEffect } from 'react';
import './NewLicenseRequest.css';
import { uploadFileToIPFS } from '../../utils/ipfs';
import { getFileContract } from '../../utils/web3';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewLicenseRequest({ address, licenseContract, registerContract, sfId }) {
  console.log(sfId);
  // State variables to store form data
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [rbId, setRbId] = useState('');
  const [rbUsers, setRbUsers] = useState([]);

  useEffect(() => {
    // Fetch RB Users when component mounts
    const fetchRbUsers = async () => {
      try {
        const rbUsers = await registerContract.methods.getRbUser().call();
        setRbUsers(rbUsers);
      } catch (error) {
        console.error('Error fetching RB Users:', error);
      }
    };
    fetchRbUsers();
  }, [registerContract]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload file to IPFS and get the IPFS hash
    const ipfsHash = await uploadFileToIPFS(file);
    const fileContract = await getFileContract();
    await fileContract.methods.setFileDetails(ipfsHash, file.name, file.size).send({ from: address });

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
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">New License Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">Upload File</label>
            <input type="file" className="form-control" id="file" onChange={handleFileChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="rbId" className="form-label">Regulatory Body Identifier</label>
            <select className="form-select" id="rbId" value={rbId} onChange={handleRbIdChange}>
              <option value="">Select Regulatory Body</option>
              {/* Map over rbUsers array to populate options */}
              {rbUsers.map(rbUser => (
                <option key={rbUser.userId} value={rbUser.userId}>{rbUser.userName}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewLicenseRequest;
