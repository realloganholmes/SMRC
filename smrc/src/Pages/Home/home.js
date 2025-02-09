import { useEffect, useState } from 'react';
import './home.css';
import Login from '../../Login/login';

const Home = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [loginType, setLoginType] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const rotationDiv = document.getElementById('rotationDiv');
      const textDiv = document.getElementById('textDiv');
      const newRotationSize = (Math.min(window.innerWidth, window.innerHeight) * 0.75) + 'px'
      const newTextSize = (Math.min(window.innerWidth, window.innerHeight) * 0.35) + 'px'
      rotationDiv.style.width = newRotationSize;
      rotationDiv.style.height = newRotationSize;
      textDiv.style.width = newTextSize;
      textDiv.style.height = newTextSize;
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function showLoginDiv(newLoginType) {
    document.getElementById('loginDiv').style.opacity = 1;
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
      <img id="textDiv" src="./Assets/smrc-text.png" />
    </div>
  );
};

export default Home;