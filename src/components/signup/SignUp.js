import React, { useState } from 'react';
import Web3 from 'web3';
import { getRegisterContract } from '../../utils/web3';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './SignUp.css'; // Import CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SignUp({address}) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('0'); // State to store the selected role
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useHistory

  const handleSignUp = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      
      const message = 'You are now signing up for DApp';
      const signedMessage = await web3.eth.personal.sign(message, address, '');
      console.log("Signed Message:", signedMessage);

      const registerContract = await getRegisterContract();

      // Call register method on the contract instance
      await registerContract.methods.register(name, userName, email, parseInt(role), signedMessage).send({ from: address });

      // Handle successful sign-up
      console.log('User signed up:', { address, name, userName, email, role });

      // Redirect based on role
      if (role === '0') {
        navigate('/userhome');
      } else if (role === '1') {
        navigate('/sfhome');
      } else if (role === '2') {
        navigate('/rbhome');
      }
    } catch (error) {
      // Handle sign-up error
      console.error('Sign-up error:', error);
      setError(error.message || 'An error occurred during sign-up.');
    }
  };

  return (
    <div className="container mt-5"> {/* Add container class */}
      <div className="row justify-content-center"> {/* Add row class */}
        <div className="col-md-6"> {/* Add column class */}
          <div className="card"> {/* Add card class */}
            <div className="card-body"> {/* Add card-body class */}
              <h2 className="card-title text-center mb-4">Sign Up</h2> {/* Add card-title class */}
              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label> {/* Add form-label class */}
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Add form-control class */}
                </div>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label> {/* Add form-label class */}
                  <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} /> {/* Add form-control class */}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label> {/* Add form-label class */}
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Add form-control class */}
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label> {/* Add form-label class */}
                  <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="0">Normal User</option>
                    <option value="1">Software Firm</option>
                    <option value="2">Regulatory Body</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up with MetaMask</button> {/* Add btn and btn-primary classes */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
