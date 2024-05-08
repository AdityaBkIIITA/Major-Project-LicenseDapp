import React, { useEffect, useState } from 'react';
import { getFileFromIPFS, uploadFileToIPFS } from '../../utils/ipfs';
import { getFileContract } from '../../utils/web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Requests.css';

function Requests({ address, licenseContract, requestIds }) {
  const [licenseData, setLicenseData] = useState([]);
  const [uploadPageVisible, setUploadPageVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [fileInput, setFileInput] = useState(Date.now());
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    console.log('Fetching data...' + requestIds);
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          requestIds.map(async (requestId) => {
            const license = await licenseContract.methods.getLicense(requestId).call();
            if (license.status === 2n) {
              const ipfsHash = license.sfFileHash;
              const response = await getFileFromIPFS(ipfsHash);
              const fileContract = await getFileContract();
              const file = await fileContract.methods.getFileDetails(ipfsHash).call();
              return {
                requestId: requestId,
                sfId: license.sfId,
                message: license.message,
                file: file.fileName,
                downloadLink: URL.createObjectURL(new Blob([response])),
              };
            } else {
              return null;
            }
          })
        );

        setLicenseData(data.filter((item) => item !== null));
      } catch (error) {
        console.error('Error fetching licenses:', error);
      }
    };

    fetchData();
  }, [licenseContract, requestIds]);

  const handleAccept = async (requestId) => {
    setRequestId(requestId);
    setActionType('accept');
    setUploadPageVisible(true);
  };

  const handleReject = async (requestId) => {
    setRequestId(requestId);
    setActionType('reject');
    setUploadPageVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const file = fileInput;
      if (!file) {
        throw new Error('No file selected');
      }
      const ipfsHash = await uploadFileToIPFS(file);
      console.log(ipfsHash);
      const fileContract = await getFileContract();
      await fileContract.methods.setFileDetails(ipfsHash, file.name, file.size).send({ from: address });

      if (actionType === 'accept') {
        await licenseContract.methods.approveLicense(requestId, ipfsHash).send({ from: address });
      } else if (actionType === 'reject') {
        await licenseContract.methods.rejectLicense(requestId, ipfsHash).send({ from: address });
      }

      setUploadPageVisible(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileInput(selectedFile);
  };

  return (
    <div className="Requests" style={{ position: 'relative', zIndex: '1' }}>
      <h2>New License Requests</h2>
      {uploadSuccess && (
        <div className="alert alert-success" role="alert">
          File uploaded successfully!
        </div>
      )}
      {!uploadPageVisible && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SF ID</th>
              <th scope="col">Message</th>
              <th scope="col">File</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {licenseData.map((request, index) => (
              <tr key={index}>
                <td>{request.sfId}</td>
                <td>{request.message}</td>
                <td>
                  <a className="btn btn-success" href={request.downloadLink} download>{request.file}</a>
                </td>
                <td>
                  <button className="btn btn-success mr-2" onClick={() => handleAccept(request.requestId)}>Accept</button>
                  <button className="btn btn-danger" onClick={() => handleReject(request.requestId)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {uploadPageVisible && (
        <div>
          <h2>Upload File</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="file">Upload File:</label>
              <input type="file" id="file" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Requests;
