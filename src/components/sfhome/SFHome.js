import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Comments from '../comments/Comments';
import Licenses from '../licenses/Licenses';
import NewLicenseRequest from '../new-license-request/NewLicenseRequest';
import { getLicenseContract, getRegisterContract } from '../../utils/web3';
import './SFHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SFHome({ address }) {
  const [sfId, setSfId] = useState([]);
  const [licenseContract,setLicenseContract] = useState([]);
  const [registerContract,setRegisterContract] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registerContract = await getRegisterContract();
        setRegisterContract(registerContract);
        const sfId = await registerContract.methods.getId(address).call();
        setSfId(sfId);
        const licenseContract = await getLicenseContract();
        setLicenseContract(licenseContract);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [address]);
  // Add address to the dependency array

  return (
    <div>
      <h2>SF Firm Home</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <Link to="/sfhome/comments" className="btn btn-primary">See Reported Comments</Link>
        </li>
        <li className="list-group-item">
          <Link to="/sfhome/licenses" className="btn btn-primary">View Owned Licenses</Link>
        </li>
        <li className="list-group-item">
          <Link to="/sfhome/raise-request" className="btn btn-primary">Raise New License Request</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/comments" element={<Comments sfId={sfId} licenseContract={licenseContract} />} />
        <Route path="/licenses" element={<Licenses address={address} sfId={sfId} licenseContract={licenseContract}/>} />
        <Route path="/raise-request" element={<NewLicenseRequest address={address} licenseContract={licenseContract} registerContract={registerContract} sfId={sfId} />}/>
        </Routes>
    </div>
  );
}

export default SFHome;
