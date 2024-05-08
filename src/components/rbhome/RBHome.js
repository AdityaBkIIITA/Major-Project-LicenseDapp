import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Comments from '../comments/Comments';
import Requests from '../requests/Requests';
import { getLicenseContract, getRegisterContract} from '../../utils/web3';
import 'bootstrap/dist/css/bootstrap.min.css';

function RBHome({ address }) {
  const [requestIds, setRequestIds] = useState([]);
  const [rbId, setRbId] = useState([]);
  const [licenseContract, setLicenseContract] = useState([]);
  const navigate = useNavigate();

  const handleCommentsClick = () => {
    navigate('/rbhome/comments');
  };

  const handleRequestsClick = () => {
    navigate('/rbhome/requests');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registerContract = await getRegisterContract();
        const rbId = await registerContract.methods.getId(address).call();
        setRbId(rbId);
        const licenseContract = await getLicenseContract();
        setLicenseContract(licenseContract);
  
        const requestIds = await licenseContract.methods.getRequestsForRB(rbId).call();
        setRequestIds(requestIds);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message to the user)
      }
    };
  
    fetchData();
  }, [address]);
  

  return (
    <div>
      <h2 >RB Home</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <button onClick={handleCommentsClick}>See Reported Comments</button>
        </li>
        <li className="list-group-item">
          <button onClick={handleRequestsClick}>See New License Requests</button>
        </li>
      </ul>
      <Routes>
        <Route path="/requests" element={<Requests address={address} rbId={rbId} licenseContract={licenseContract} requestIds={requestIds} />} />
        <Route path="/comments" element={<Comments rbId={rbId} licenseContract={licenseContract} />} />
      </Routes>
    </div>
  );
}

export default RBHome;
