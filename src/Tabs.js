import { useState } from "react";
import "./tabs.css";
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';

function Tabs({name, email, userName, role, setAuthenticated, setAddress, setName, setEmail, setUserName, setRole}) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          LogIn
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Register
        </button>
       
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <SignIn name={name} email={email} userName={userName} role={role} setAuthenticated={setAuthenticated} setAddress={setAddress} setName={setName} setEmail={setEmail} setUserName={setUserName} setRole={setRole}/>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
           
          <SignUp name={name} email={email} userName={userName} role={role} setAuthenticated={setAuthenticated} setAddress={setAddress} setName={setName} setEmail={setEmail} setUserName={setUserName} setRole={setRole}/>
        </div>

        
      </div>
    </div>
  );
}

export default Tabs;
