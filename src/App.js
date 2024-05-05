import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import AddFile from './components/addfile/AddFile';
import FileList from './components/filelist/FileList';
import UserHome from './components/userhome/UserHome';
import SFHome from './components/sfhome/SFHome';
import RBHome from './components/rbhome/RBHome';

function App() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <Router>
      <div>
        <h1>IPFS DApp</h1>
        <Routes>
          <Route path="/signup" element={<SignUp address={address} />} />
          <Route path="/signin" element={<SignIn address={address}/>} />
          <Route path="/addfile" element={<AddFile address={address}/>} />
          <Route path="/filelist" element={<FileList address={address}/>} />
          <Route path="/userhome" element={<UserHome address={address}/>} />
          <Route path="/rbhome/*" element={<RBHome address={address}/>} />
          <Route path="/sfhome/*" element={<SFHome address={address}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
