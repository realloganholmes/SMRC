import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './privateRoute.css'
import { IoMdHome } from "react-icons/io";
import { PiTreasureChestFill } from "react-icons/pi";
import { FaNewspaper, FaPersonRunning, FaMedal } from "react-icons/fa6";

const PrivateRoute = ({ element, elName, ...rest }) => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) {
    navigate('/');
  }

  const [navTo, setNavTo] = useState(null);
  useEffect(() => {
    navigate(navTo);
  }, [navTo])

  return (
    <div>
      <div className="navbar">
        <div className={elName === 'home' ? 'selected' : ''} onClick={() => setNavTo('/home')}><IoMdHome /></div>
        <div className={elName === 'recaps' ? 'selected' : ''} onClick={() => setNavTo('/recaps')}><FaNewspaper /></div>
        <div className={elName === 'rfg' ? 'selected' : ''} onClick={() => setNavTo('/rfg')}><FaMedal /></div>
        <div className={elName === 'races' ? 'selected' : ''} onClick={() => setNavTo('/races')}><FaPersonRunning /></div>
        <div className={elName === 'coolers' ? 'selected' : ''} onClick={() => setNavTo('/coolers')}><PiTreasureChestFill /></div>
      </div>
      <div className="background">
        <div>
          {element}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
