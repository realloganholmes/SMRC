import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
        <div>
            <div onClick={() => setPage('Login')}>Login</div>
            <div onClick={() => setPage('Register')}>Register</div>
        </div>
        { page === 'Login' ? (
            <form onSubmit={handleLogin}>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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
                    placeholder="username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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