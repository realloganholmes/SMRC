import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './privateRoute.scss'
import { IoMdHome } from "react-icons/io";
import { PiTreasureChestFill } from "react-icons/pi";
import { FaNewspaper, FaMedal} from "react-icons/fa6"; //FaPersonRunning
import { MdAdminPanelSettings, MdAccountBox } from "react-icons/md";
import { useAuth } from './Utilities/authContext';
import { Switch } from '@mui/material';
import { useSlideToggle } from './Utilities/slideToggleContext';

const PrivateRoute = ({ element, elName, ...rest }) => {
  const { user } = useAuth();
  const { isToggled, toggle } = useSlideToggle();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate])

  const [navTo, setNavTo] = useState(null);
  useEffect(() => {
    navigate(navTo);
  }, [navTo, navigate])

  return (
    <div className="private-route-container">
      <div className="navbar">
        <div className={elName === 'home' ? 'selected' : ''} onClick={() => setNavTo('/home')}><IoMdHome /></div>
        <div className={elName === 'recaps' ? 'selected' : ''} onClick={() => setNavTo('/recaps')}><FaNewspaper /></div>
        {/*<div className={elName === 'races' ? 'selected' : ''} onClick={() => setNavTo('/races')}><FaPersonRunning /></div>*/}
        <div className={elName === 'coolers' ? 'selected' : ''} onClick={() => setNavTo('/coolers')}><PiTreasureChestFill /></div>
        <div className={elName === 'rfg' ? 'selected' : ''} onClick={() => setNavTo('/rfg')}><FaMedal /></div>
        <div className={elName === 'account' ? 'selected' : ''} onClick={() => setNavTo('/account')}><MdAccountBox /></div>
        { user && user.isAdmin ? 
          (<div className={elName === 'admin' ? 'selected' : ''} onClick={() => setNavTo('/admin')}><MdAdminPanelSettings /></div>) : ''
        }
        { user && (user.isAdmin || user.isCoolerAdmin || user.isRaceAdmin || user.isRFGAdmin || user.isRecapAdmin || user.isDashboardAdmin) ?
          <Switch checked={isToggled} onChange={toggle} />
        : ''}
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
