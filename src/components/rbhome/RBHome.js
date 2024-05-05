import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Comments from '../comments/Comments';
import Requests from '../requests/Requests';
import { getLicenseContract, getRegisterContract } from '../../utils/web3';

function RBHome({address}) {
  const [licenseIds, setLicenseIds] = useState([]);
  const [rbId, setRbId] = useState([]);
  const [licenseContract,setLicenseContract] = useState([]);
  const navigate = useNavigate();

  const handleCommentsClick = () => {
    navigate('/rbhome/comments');
  };

  const handleRequestsClick = () => {
    navigate('/rbhome/requests');
  };

  useEffect(() => {
    const fetchLicenseIds = async () => {
      try {
        const registerContract = await getRegisterContract();
        const rbId = await registerContract.methods.getId(address);
        setRbId(rbId);
        const licenseContract = await getLicenseContract();
        setLicenseContract(licenseContract);
        const ids = await licenseContract.methods.getLicensesForRB(rbId).call();
        setLicenseIds(ids);
      } catch (error) {
        console.error('Error fetching license ids:', error);
        // Handle error (e.g., show error message to the user)
      }
    };
    fetchLicenseIds();
  }, [address]);

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
      <Routes>
    <Route path="/requests" element={<Requests address={address} rbId={rbId} licenseContract={licenseContract} licenseIds={licenseIds}/>} />
        <Route path="/comments" element={<Comments licenseIds={licenseIds}/>} />
        </Routes>
        </div>
  );
}

export default RBHome;
