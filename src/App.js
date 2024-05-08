import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tabs from './Tabs';
import Home from './components/home/Home';
import ParticlesApp from './particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedAddress = localStorage.getItem('address');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedUserName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('role');

    if (storedAddress && storedName && storedEmail && storedUserName && storedRole) {
      setAddress(storedAddress);
      setName(storedName);
      setEmail(storedEmail);
      setUserName(storedUserName);
      setRole(storedRole);
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
        <ParticlesApp />
        <div className="container">
          <Routes>
            <Route path="/*" element={authenticated ? <Home address={address} name={name} email={email} userName={userName} role={role} setAuthenticated={setAuthenticated} setAddress={setAddress} setName={setName} setEmail={setEmail} setUserName={setUserName} setRole={setRole} /> : <Tabs name={name} email={email} userName={userName} role={role} setAuthenticated={setAuthenticated} setAddress={setAddress} setName={setName} setEmail={setEmail} setUserName={setUserName} setRole={setRole} />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
