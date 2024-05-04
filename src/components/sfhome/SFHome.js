// SFHome.js

import React from 'react';
import { Link } from 'react-router-dom';

function SFHome() {
  return (
    <div>
      <h2>SF Firm Home</h2>
      <ul>
        <li>
          <Link to="/sfhome/comments">See Reported Comments</Link>
        </li>
        <li>
          <Link to="/sfhome/licenses">View Owned Licenses</Link>
        </li>
        <li>
          <Link to="/sfhome/raise-request">Raise New License Request</Link>
        </li>
      </ul>
    </div>
  );
}

export default SFHome;
