import React, { useState } from 'react';
import Web3 from 'web3';
import { getRegisterContract } from '../../utils/web3';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp({name, email, userName, role, setAuthenticated, setAddress, setName, setEmail, setUserName, setRole }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const storeCredentials = (address) => {
    localStorage.setItem('address', address);
    localStorage.setItem('name', name);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setAuthenticated(true);
  }

  const handleSignUp = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      const web3 = new Web3(window.ethereum);
      const message = 'You are now signing up for DApp';
      const signedMessage = await web3.eth.personal.sign(message, address, '');
      console.log("Signed Message:", signedMessage);
      const registerContract = await getRegisterContract();
      await registerContract.methods.register(name, userName, email, parseInt(role), signedMessage).send({ from: address });

      // Store address and authentication status in localStorage
      setAddress(address);
      storeCredentials(address);
      navigate("/");
    } catch (error) {
      console.error('Sign-up error:', error);
      setError(error.message || 'An error occurred during sign-up.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up with MetaMask</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
