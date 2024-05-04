import React, { useState } from 'react';
import Web3 from 'web3';
import { signInUser } from '../../utils/web3';
import './SignIn.css'; // Import CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import registerContractAbi from '../../abis/Register.json'; // Import Register contract ABI
const contractAbi = registerContractAbi.abi;

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0); // State to store the selected role
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      // Prompt for MetaMask wallet connection
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const address = accounts[0];  

      const message = 'You are now signing up for DApp';
      const signedMessage = await web3.eth.personal.sign(message, address, '');
      console.log("Signed Message:", signedMessage);

      // Get contract instance
      const contractAddress = '0xBbF67741127C4E8e07cF2E136c0Ed99bD62a0B2d'; // Replace with your contract address
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Call getUser method on the contract instance
      const [userName, userEmail, userRole, userSignedMessage] = await contract.methods.getUser(address).call();
      console.log(userRole);
      
      // Check if the signed message matches the one stored in the contract
      if (signedMessage !== userSignedMessage || userName!==name || userEmail!==email || role!==userRole) {
        setError('Invalid signed message. Please sign in with the correct account.');
        return;
      }

      // Store user details and sign in
      const user = await signInUser(address, userName, userEmail, role); // Pass role to signInUser function

      // Handle successful sign-in
      console.log('User signed in:', user);
    } catch (error) {
      // Handle sign-in error
      console.error('Sign-in error:', error);
      setError(error.message || 'An error occurred during sign-in.');
    }
  };

  return (
    <div className="container mt-5"> {/* Add container class */}
      <div className="row justify-content-center"> {/* Add row class */}
        <div className="col-md-6"> {/* Add column class */}
          <div className="card"> {/* Add card class */}
            <div className="card-body"> {/* Add card-body class */}
              <h2 className="card-title text-center mb-4">Sign In</h2> {/* Add card-title class */}
              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label> {/* Add form-label class */}
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Add form-control class */}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label> {/* Add form-label class */}
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Add form-control class */}
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label> {/* Add form-label class */}
                  <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value={0}>Normal User</option>
                    <option value={1}>Software Firm</option>
                    <option value={2}>Regulatory Body</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignIn}>Sign In with MetaMask</button> {/* Add btn and btn-primary classes */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
