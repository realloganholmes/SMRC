import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './privateRoute.scss'
import { IoMdHome } from "react-icons/io";
import { PiTreasureChestFill } from "react-icons/pi";
import { FaNewspaper, FaPersonRunning, FaMedal } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { AuthProvider, useAuth } from './Utilities/authContext';

const PrivateRoute = ({ element, elName, ...rest }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  })

  const [navTo, setNavTo] = useState(null);
  useEffect(() => {
    navigate(navTo);
  }, [navTo])

  return (
    <div className="private-route-container">
      <div className="navbar">
        <div className={elName === 'home' ? 'selected' : ''} onClick={() => setNavTo('/home')}><IoMdHome /></div>
        <div className={elName === 'recaps' ? 'selected' : ''} onClick={() => setNavTo('/recaps')}><FaNewspaper /></div>
        <div className={elName === 'rfg' ? 'selected' : ''} onClick={() => setNavTo('/rfg')}><FaMedal /></div>
        <div className={elName === 'races' ? 'selected' : ''} onClick={() => setNavTo('/races')}><FaPersonRunning /></div>
        <div className={elName === 'coolers' ? 'selected' : ''} onClick={() => setNavTo('/coolers')}><PiTreasureChestFill /></div>
        { user && user.isAdmin ? 
          (<div className={elName === 'admin' ? 'selected' : ''} onClick={() => setNavTo('/admin')}><MdAdminPanelSettings /></div>) : ''
        }
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
