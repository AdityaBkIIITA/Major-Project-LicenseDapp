import React from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile({ name, userName, email, role }) {
  return (
    <div className="container">
      <div className="profile-card card">
        <div className="card-header">Profile</div>
        <div className="card-body">
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{name}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{userName}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Role:</span>
              <span className="profile-value">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
