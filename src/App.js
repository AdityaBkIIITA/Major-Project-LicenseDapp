import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import AddFile from './components/addfile/AddFile';
import FileList from './components/filelist/FileList';
import UserHome from './components/userhome/UserHome';
import SFHome from './components/sfhome/SFHome';
import RBHome from './components/rbhome/RBHome';
import Comments from './components/comments/Comments';
import Requests from './components/requests/Requests';
import Licenses from './components/licenses/Licenses';
import NewLicenseRequest from './components/new-license-request/NewLicenseRequest';

function App() {
  return (
    <Router>
      <div>
        <h1>IPFS DApp</h1>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addfile" element={<AddFile />} />
          <Route path="/filelist" element={<FileList />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/rbhome" element={<RBHome />} />
          <Route path="/rbhome/requests" element={<Requests/>} />
          <Route path="/rbhome/comments" element={<Comments/>} />
          <Route path="/sfhome" element={<SFHome />} />
          <Route path="/sfhome/comments" element={<Comments />} />
          <Route path="/sfhome/licenses" element={<Licenses />} />
          <Route path="/sfhome/raise-request" element={<NewLicenseRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
