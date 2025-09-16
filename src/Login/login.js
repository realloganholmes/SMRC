import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { setLoading } from '../Utilities/loading';

const Login = ({loginType, setLoginType}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {    
    e.preventDefault();

    if (password.length !== 4) {
        setError('PIN must be exactly 4 digits');
        return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post('https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    if (/^\d{0,4}$/.test(password)) {
        setPassword(password);
    }
    setError('');
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length !== 4) {
        setError('PIN must be exactly 4 digits');
        return;
    }

    try {
      setLoading(true);

      await axios.post('https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth/register', { username, password });
      navigate('/');
      setLoginType("login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
        { loginType === 'login' ? (
            <form onSubmit={handleLogin}>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    placeholder="PIN"
                    maxLength="4"
                    required
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        ) : (
            <form onSubmit={handleRegister}>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    placeholder="PIN"
                    maxLength="4"
                    required
                />
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        )}
    </div>
  );
};

export default Login;