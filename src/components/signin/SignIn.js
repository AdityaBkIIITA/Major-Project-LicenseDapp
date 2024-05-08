import React, { useState } from 'react';
import Web3 from 'web3';
import { getRegisterContract } from '../../utils/web3';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SignIn({name, email, userName, role, setAuthenticated, setAddress, setName, setEmail, setUserName, setRole}) {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const storeCredentials = async (address, _name, _email) => {
    console.log(_name);
    console.log(_email);
    console.log(address);
    console.log(userName);
    console.log(role);
    localStorage.setItem('address', address);
    localStorage.setItem('name', _name);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', _email);
    localStorage.setItem('role', role);
  }

  const handleSignIn = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
  
      const web3 = new Web3(window.ethereum);
      
      const message = 'You are now signing up for DApp';
      const signedMessage = await web3.eth.personal.sign(message, address, '');
  
      const registerContract = await getRegisterContract();
  
      const userDetails = await registerContract.methods.getUser(address).call();
      const fetchedUserName = userDetails.userName;
      const fetchedRole = userDetails.role;
  
      if (signedMessage !== userDetails.signedMessage || userName !== fetchedUserName || Number(role) !== Number(fetchedRole)) {
        setError('Invalid signed message, username, or role. Please sign in with the correct account.');
        return;
      }
  
      // Update state variables
      await setAddress(address);
      await setName(userDetails.name);
      await setEmail(userDetails.email);
      await setAuthenticated(true);
  
      // Store credentials
      await storeCredentials(address, userDetails.name, userDetails.email);
  
      // Navigate based on role
      navigate("/");
    } catch (error) {
      console.error('Sign-in error:', error);
      setError(error.message || 'An error occurred during sign-in.');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="0">Normal User</option>
                    <option value="1">Software Firm</option>
                    <option value="2">Regulatory Body</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignIn}>Sign In with MetaMask</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
