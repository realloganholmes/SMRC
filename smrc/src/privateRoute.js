import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './privateRoute.css'

const PrivateRoute = ({ element, elName, ...rest }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const [navTo, setNavTo] = useState(null);
  useEffect(() => {
    navigate(navTo);
  }, [navTo])

  return (
    <div>
      <div className="navbar">
        <div className={elName === 'home' ? 'selected' : ''} onClick={() => setNavTo('/home')}>Home</div>
        <div className={elName === 'recaps' ? 'selected' : ''} onClick={() => setNavTo('/recaps')}>Recaps</div>
        <div className={elName === 'rfg' ? 'selected' : ''} onClick={() => setNavTo('/rfg')}>RFG</div>
        <div className={elName === 'races' ? 'selected' : ''} onClick={() => setNavTo('/races')}>Race Schedule</div>
        <div className={elName === 'coolers' ? 'selected' : ''} onClick={() => setNavTo('/coolers')}>Cooler </div>
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
