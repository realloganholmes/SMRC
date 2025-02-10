import { useEffect, useState } from 'react';
import './home.css';
import Login from '../../Login/login';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);
  
  const [loginType, setLoginType] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const rotationDiv = document.getElementById('rotationDiv');
      const newRotationSize = (Math.min(window.innerWidth, window.innerHeight) * 0.75) + 'px'
      rotationDiv.style.width = newRotationSize;
      rotationDiv.style.height = newRotationSize;
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function showLoginDiv(newLoginType) {
    document.getElementById('loginDiv').style.opacity = 1;
    document.getElementById('loginDiv').style.visibility = 'visible';
    document.getElementById('loginDiv').style.width = 'fit-content';
    document.getElementById('loginDiv').style.height = 'fit-content';
    setLoginType(newLoginType);
  }

  return (
    <div className="home-container">
      <div className="full-login-wrapper">
        <div id="loginDiv">
          <Login loginType={loginType}/>
        </div>
        <div className="login-buttons">
          <div className={loginType === "login" ? 'button-selected' : ''} onClick={() => showLoginDiv("login")}>Login</div>
          <div className={loginType === "register" ? 'button-selected' : ''} onClick={() => showLoginDiv("register")}>Register</div>
        </div>
      </div>
      <img id="rotationDiv" src="./Assets/smrc-ring.png" />
    </div>
  );
};

export default Home;