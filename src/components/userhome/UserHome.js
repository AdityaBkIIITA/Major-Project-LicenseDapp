import React, { useState, useEffect } from 'react';
import { getLicenseContract, getCommentContract, getFileContract } from '../../utils/web3';
import { getFileFromIPFS } from '../../utils/ipfs';
import './UserHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserHome({ address, username }) {
  console.log(address);
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const licenseContract = await getLicenseContract();
        const allLicenses = await licenseContract.methods.getAllLicenses().call();

        const data = await Promise.all(
          allLicenses.map(async (license) => {
            if (license.status === 0n && license.licenseFileHash !== '') {
              const ipfsHash = license.licenseFileHash;
              const response = await getFileFromIPFS(ipfsHash);
              const fileContract = await getFileContract();
              const file = await fileContract.methods.getFileDetails(ipfsHash).call();
              const commentContract = await getCommentContract();
              const comments = await commentContract.methods.getComments(license.licenseId).call();
              return {
                licenseId: license.licenseId,
                sfId: license.sfId,
                rbId: license.rbId,
                name: file.fileName, // Adjust name as needed
                size: Number(file.fileSize), // Assuming size is available in data
                date: new Date(Number(license.grantTimestamp) * 1000).toLocaleDateString(), // Convert timestamp to date
                downloadLink: URL.createObjectURL(new Blob([response])),
                comments: comments, // Initialize comments array
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

  // Function to handle reporting comment
  const reportComment = async (licenseId, comment) => {
    const commentContract = await getCommentContract();
    await commentContract.methods.addComment(licenseId, comment).send({ from: address });

    // Fetch comments again after adding a new one
    const updatedLicenseData = await Promise.all(
      licenseData.map(async (item) => {
        // Check if the current item is the one where the comment was added
        if (item.licenseId === licenseId) {
          // Fetch updated comments for the license
          const comments = await commentContract.methods.getComments(licenseId).call();
          return {
            ...item,
            comments: comments,
          };
        } else {
          return item;
        }
      })
    );

    // Update state with the updated license data
    setLicenseData(updatedLicenseData);
  };

  return (
    <div>
    <h2>User Home</h2>
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl No.</th>
            <th scope="col">Name</th>
            <th scope="col">Size(in Bytes)</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenseData.map((item, index) => (
            <React.Fragment key={index}>
              <tr className='rows'>
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
                    <div>
                      <input type="text" placeholder="Enter Comments" />
                      <button className="btn btn-info" onClick={() => reportComment(item.licenseId, document.querySelector('input').value)}>Add Comment</button>
                    </div>
                    <div>
                      <h3>Comments</h3>
                      <ul>
                      {item.comments.map((comment, commentIndex) => (
                      <li key={commentIndex}>{comment.text} (By: {comment.userId})</li>
                      ))}

                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default UserHome;
