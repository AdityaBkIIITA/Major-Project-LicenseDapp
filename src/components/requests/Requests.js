import React from 'react';

function Requests() {
  // Dummy data for demonstration
  const licenseRequests = [
    { sfId: 'SF123', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', file: 'file1.pdf' },
    { sfId: 'SF456', message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', file: 'file2.pdf' },
  ];

  const handleAccept = (sfId) => {
    // Handle accept logic
    console.log(`Accept request for SF ID: ${sfId}`);
  };

  const handleReject = (sfId) => {
    // Handle reject logic
    console.log(`Reject request for SF ID: ${sfId}`);
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
          {licenseRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.sfId}</td>
              <td>{request.message}</td>
              <td>
                <a href={request.file} download>{request.file}</a>
              </td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleAccept(request.sfId)}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleReject(request.sfId)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requests;
