import React, { useState, useEffect } from 'react';
import './Licenses.css';
import { getFileFromIPFS } from '../../utils/ipfs';

function License({ sfId, licenseContract, registerContract }) {
  // State variable to store license data
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get license IDs for the SF
        const licenseIds = await licenseContract.methods.getLicensesForSF(sfId).call();
        
        // Fetch details for each license
        const licenseData = await Promise.all(
          licenseIds.map(async (licenseId) => {
            // Fetch license details from the contract
            const license = await licenseContract.methods.getLicense(licenseId).call();
            const ipfsHash = license.ipfsHash;
            const { data, contentType } = await getFileFromIPFS(ipfsHash);
            
            // Return an object with all necessary details
            return {
              id: licenseId,
              name: license.name, // Corrected: Use license.name instead of data.name
              size: data.length, // Corrected: Use data.length to get the size in bytes
              date: new Date(license.grantDate * 1000).toLocaleDateString(), // Convert timestamp to date
              downloadLink: URL.createObjectURL(new Blob([data], { type: contentType })), // Create download link
            };
          })
        );

        // Set the fetched data in state
        setLicenses(licenseData);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      }
    };

    fetchData();
  }, [sfId, licenseContract]);

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
      <h2>My Licenses</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Size (bytes)</th> {/* Updated: Show size in bytes */}
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
              <td><button onClick={() => handleDownload(license.downloadLink)}>Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default License;
