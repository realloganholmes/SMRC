import { useState } from 'react';
import './account.scss';
import axios from 'axios';
import { setLoading } from '../../Utilities/loading';

const Account = () => {
    const [update, setUpdate] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        if (/^\d{0,4}$/.test(password)) {
            setPassword(password);
        }
        setError('');
    }

    const updatePassword = async () => {        
        if (password.length !== 4) {
            setError('PIN must be exactly 4 digits');
            return;
        }
    
        try {
            setLoading(true);
            await axios.post('https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth-protected/resetPassword', { password });
            setUpdate(false);
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
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
                    <h1>USER NAME</h1>
                    { !update && 
                        <div className='button-container'>
                            <button onClick={() => setUpdate(true)}>Update PIN</button>
                            <button>Logout</button>
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
                </div>
            </div>
        </div>
    );
}

export default Account;