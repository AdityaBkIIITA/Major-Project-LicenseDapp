import React, { useState, useEffect } from 'react';
import './Licenses.css';
import { getFileFromIPFS } from '../../utils/ipfs';
import { getFileContract } from '../../utils/web3';
import 'bootstrap/dist/css/bootstrap.min.css';

function License({ address, sfId, licenseContract }) {
  const [acceptedLicense, setAcceptedLicense] = useState([]);
  const [rejectedLicense, setRejectedLicense] = useState([]);
  const [pendingLicense, setPendingLicense] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState('accepted');

  const acceptedFields = ['RequestId', 'LicenseId', 'rbId', 'name', 'size', 'date', 'status'];
  const rejectedFields = ['RequestId', 'rbId', 'Feedback', 'status'];
  const pendingFields = ['RequestId', 'rbId', 'status'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestIds = await licenseContract.methods.getRequestsForSF(sfId).call();

        const accepted = [];
        const rejected = [];
        const pending = [];

        for (const requestId of requestIds) {
          const license = await licenseContract.methods.getLicense(requestId).call();
          const fileContract = await getFileContract();

          if (license.status === 0n && license.licenseFileHash !== '') {
            const ipfsHash = license.licenseFileHash;
            const response = await getFileFromIPFS(ipfsHash);
            const file = await fileContract.methods.getFileDetails(ipfsHash).call();
            accepted.push({
              RequestId: requestId,
              LicenseId: license.licenseId,
              rbId: license.rbId,
              name: file.fileName,
              size: Number(file.fileSize),
              date: new Date(Number(license.grantTimestamp) * 1000).toLocaleDateString(),
              status: 'accepted',
              downloadButton: URL.createObjectURL(new Blob([response])),
            });
          } else if (license.status === 1n) {
            const ipfsHash = license.feedbackHash;
            const response = await getFileFromIPFS(ipfsHash);
            const file = await fileContract.methods.getFileDetails(ipfsHash).call();
            rejected.push({
              RequestId: requestId,
              rbId: license.rbId,
              Feedback: file.name,
              status: 'rejected',
              downloadButton: URL.createObjectURL(new Blob([response])),
            });
          } else if (license.status === 2n) {
            pending.push({
              RequestId: requestId,
              rbId: license.rbId,
              status: 'pending',
            });
          }
        }

        setAcceptedLicense(accepted);
        setRejectedLicense(rejected);
        setPendingLicense(pending);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      }
    };

    fetchData();
  }, [sfId, licenseContract]);

  const handleDownload = (url) => {
    try {
      window.open(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    filterLicenseByStatus();
  };

  const filterLicenseByStatus = () => {
    if (selectedStatus === 'accepted') {
      return acceptedLicense;
    } else if (selectedStatus === 'rejected') {
      return rejectedLicense;
    } else {
      return pendingLicense;
    }
  };

  return (
    <div className="container-fluid text-light">
      <h2 className="mt-4 mb-4">My Licenses</h2>
      <select value={selectedStatus} onChange={handleStatusChange} className="form-select mb-4" style={{ zIndex: 1 }}>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>
      {filterLicenseByStatus().length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark">
            <thead>
              <tr>
                {selectedStatus === 'accepted' && acceptedFields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
                {selectedStatus === 'rejected' && rejectedFields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
                {(selectedStatus !== 'accepted' && selectedStatus !== 'rejected') && pendingFields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
                {((selectedStatus === 'accepted') || (selectedStatus === 'rejected')) && (<th>Download</th>)}
              </tr>
            </thead>
            <tbody>
              {filterLicenseByStatus().map((license, index) => (
                <tr key={index}>
                  {selectedStatus === 'accepted' && acceptedFields.map((field, index) => (
                    <td key={index}>{license[field] || 'N/A'}</td>
                  ))}
                  {selectedStatus === 'rejected' && rejectedFields.map((field, index) => (
                    <td key={index}>{license[field] || 'N/A'}</td>
                  ))}
                  {(selectedStatus !== 'accepted' && selectedStatus !== 'rejected') && pendingFields.map((field, index) => (
                    <td key={index}>{license[field] || 'N/A'}</td>
                  ))}
                  {((selectedStatus === 'accepted') || (selectedStatus === 'rejected')) && (
                    <td><button onClick={() => handleDownload(license.downloadButton)} className="btn btn-primary">Download</button></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No licenses found.</p>
      )}
    </div>
  );
}

export default License;
