import React, { useState, useEffect } from 'react';
import { getLicenseContract } from '../../utils/web3';
import { getFileFromIPFS } from '../../utils/ipfs';

function UserHome({ address }) {
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const licenseContract = await getLicenseContract();
        const allLicenses = await licenseContract.methods.getAllLicenses().call();

        const data = await Promise.all(
          allLicenses.map(async (license) => {
            if (license.status === "Approved") {
              const ipfsHash = license.ipfsHash;
              const { data, contentType } = await getFileFromIPFS(ipfsHash);
              return {
                lfId: license.lfId,
                rbId: license.rbId,
                name: "LicenseFile+" + ipfsHash, // Adjust name as needed
                size: data.size, // Assuming size is available in data
                date: new Date(license.grantTimestamp * 1000).toLocaleDateString(), // Convert timestamp to date
                downloadLink: URL.createObjectURL(new Blob([data], { type: contentType })),
              };
            } else {
              return null; // Return null for non-approved licenses
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
  }, []); // Removed dependencies as we're not using any external props or state

  // State to track expanded rows
  const [expandedRow, setExpandedRow] = useState(null);

  // Function to toggle expanded row
  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div>
      <h2>User Home</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl No.</th>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenseData.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => toggleExpand(index)}>Expand</button>
                </td>
              </tr>
              {expandedRow === index && (
                <tr className="expanded-row">
                  <td colSpan="5">
                    <a className="btn btn-success" href={item.downloadLink} download>Download</a>
                    <input type="text" placeholder="Enter license code" />
                    <button className="btn btn-info">Report License</button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserHome;
