import React from 'react';
import { useNavigate } from 'react-router-dom';

function RBHome() {
  const navigate = useNavigate();

  const handleCommentsClick = () => {
    navigate('/rbhome/comments');
  };

  const handleRequestsClick = () => {
    navigate('/rbhome/requests');
  };

  return (
    <div>
      <h2>RB Home</h2>
      <ul>
        <li>
          <button onClick={handleCommentsClick}>See Reported Comments</button>
        </li>
        <li>
          <button onClick={handleRequestsClick}>See New License Requests</button>
        </li>
      </ul>
    </div>
  );
}

export default RBHome;
