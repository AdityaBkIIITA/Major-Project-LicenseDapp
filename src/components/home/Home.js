import React, { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import UserHome from '../userhome/UserHome';
import SFHome from '../sfhome/SFHome';
import RBHome from '../rbhome/RBHome';
import Profile from '../profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ address, name, email, userName, role, setAuthenticated, setAddress, setName, setEmail, setUserName, setRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('address');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setAddress('');
    setName('');
    setEmail('');
    setUserName('');
    setRole('');
    setAuthenticated(false);
  };

  const handleRedirect = () => {
    if (role === '0') {
      navigate('/userhome');
    } else if (role === '1') {
      navigate('/sfhome');
    } else if (role === '2') {
      navigate('/rbhome');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">IPFS DApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleRedirect}>
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
            </ul>
            <div>
              <p className="navbar-text">Welcome, {localStorage.getItem('userName')}!</p>
              <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/profile" element={<Profile name={name} email={email} userName={userName} role={role} />} />
        <Route path="/userhome" element={<UserHome address={address} />} />
        <Route path="/rbhome/*" element={<RBHome address={address} />} />
        <Route path="/sfhome/*" element={<SFHome address={address} />} />
      </Routes>
      {location.pathname === '/' && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Welcome to IPFS DApp</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget ante vitae eros placerat condimentum. Vestibulum lacinia lacus nec tortor tincidunt aliquet.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Explore Your Dashboard</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget ante vitae eros placerat condimentum. Vestibulum lacinia lacus nec tortor tincidunt aliquet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
