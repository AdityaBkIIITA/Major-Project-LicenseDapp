import React, { useState } from 'react';
import './UserHome.css'; // Import CSS file for UserHome

function UserHome() {
  // Dummy data for demonstration
  const data = [
    { slNo: 1, name: 'File 1', size: '10 MB', date: '2024-05-10' },
    { slNo: 2, name: 'File 2', size: '15 MB', date: '2024-05-12' },
    { slNo: 3, name: 'File 3', size: '8 MB', date: '2024-05-15' },
  ];

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
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{item.slNo}</td>
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
                    <button className="btn btn-success">Download</button>
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
