import { useState } from 'react';
import './account.scss';
import axios from 'axios';
import { setLoading } from '../../Utilities/loading';
import { useAuth } from '../../Utilities/authContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [update, setUpdate] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (/^\d{0,4}$/.test(password)) {
            setPassword(password);
        }
        setError('');
    }

    console.log(user);

    const updatePassword = async () => {        
        if (password.length !== 4) {
            setError('PIN must be exactly 4 digits');
            return;
        }

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    
        try {
            setLoading(true);
            await axios.post('https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth-protected/resetPassword', { password }, { headers });
            setUpdate(false);
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const logOut = () => {
        setUser(null);
        localStorage.clear();
        navigate('/')
    }

    return (
        <div className="account-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Account
                    </div>
                </div>
                <div className="body-content">
                    <h1>{user?.username}</h1>
                    { !update && 
                        <div className='button-container'>
                            <button onClick={() => setUpdate(true)}>Update PIN</button>
                            <button onClick={() => logOut()}>Logout</button>
                        </div>
                    }
                    { update &&
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => validatePassword(e.target.value)}
                                placeholder="PIN"
                                maxLength="4"
                                required
                            />
                            <div className='button-container'>
                                <button onClick={() => updatePassword()}>Submit</button>
                                <button onClick={() => setUpdate(false)}>Cancel</button>
                            </div>
                        </div>
                    }
                    {error && <p>{error}</p>}
                    <p>To delete account and account data, contact Logan Holmes (loganholmes33@gmail.com)</p>
                </div>
            </div>
        </div>
    );
}

export default Account;