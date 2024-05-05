import React, { useEffect, useState } from 'react';
import { getFileFromIPFS } from '../../utils/ipfs';

function Requests({ address, licenseContract, licenseIds }) {
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          licenseIds.map(async (licenseId) => {
            const license = await licenseContract.methods.getLicense(licenseId).call();
            if (license.status === "Pending") {
              const ipfsHash = license.ipfsHash;
              const { data, contentType } = await getFileFromIPFS(ipfsHash);
              return {
                sfId: license.sfId,
                lfId: license.lfId,
                message: license.message,
                file: "Software"+ipfsHash,
                downloadLink: URL.createObjectURL(new Blob([data], { type: contentType })),
              };
            } else {
              return null; // Return null for non-pending requests
            }
          })
        );

        // Filter out null values before setting the state
        const filteredData = data.filter((item) => item !== null);
        setLicenseData(filteredData);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      }
    };

    fetchData();
  }, [licenseContract, licenseIds]);

  const handleAccept = async (lfId) => {
    try {
      await licenseContract.methods.approveLicense(lfId).send({ from: address });
    } catch (error) {
      console.error('Error approving license:', error);
    }
  };

  const handleReject = async (lfId) => {
    try {
      await licenseContract.methods.rejectLicense(lfId).send({ from: address });
    } catch (error) {
      console.error('Error rejecting license:', error); // Add error handling logic here
    }
  };

  const handleDownload = (url) => {
    try {
      // Open the download link in a new window
      window.open(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h2>New License Requests</h2>
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
                <button className="btn btn-link" onClick={() => handleDownload(request.url)}>request.file</button>
              </td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleAccept(request.lfId)}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleReject(request.lfId)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requests;
