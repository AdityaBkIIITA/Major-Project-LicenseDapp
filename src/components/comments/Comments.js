import React from 'react';

function Comments() {
  // Dummy data for demonstration
  const comments = [
    { licenseId: '1234', userId: 'user1', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { licenseId: '5678', userId: 'user2', comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ];

  return (
    <div>
      <h2>Reported Comments</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">License ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.licenseId}</td>
              <td>{comment.userId}</td>
              <td>{comment.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comments;
