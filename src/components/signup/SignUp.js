import React, { useState } from 'react';
import Web3 from 'web3';
import registerContractAbi from '../../abis/Register.json';
const contractAbi = registerContractAbi.abi;


function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0);

  const handleSignUp = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const contractAddress = '0xBbF67741127C4E8e07cF2E136c0Ed99bD62a0B2d'; // Replace with your contract address
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      const message = 'You are now signing up for DApp';
      const signedMessage = await web3.eth.personal.sign(message, accounts[0], '');

      // Call signUpUser method on the contract instance
      const result = await contract.methods.register(userName, email, role, signedMessage).send({ from: accounts[0] });
    console.log(result);

      // Handle successful sign-up
      console.log('Transaction receipt:', result);
    } catch (error) {
      // Handle sign-up error
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="userName">Username</label>
        <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value={0}>Normal User</option>
          <option value={1}>Software Firm</option>
          <option value={2}>Regulatory Body</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSignUp}>Sign Up with MetaMask</button>
    </div>
  );
}

export default SignUp;
