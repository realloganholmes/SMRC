import { useEffect, useState } from 'react';
import { apiFetch } from '../../Utilities/apiClient.js';
import './admin.scss';

const Admin = () => {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const token = localStorage.getItem('token');
        const data = await apiFetch('http://localhost:5000/api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        setUsers(data);
    };
    
    useEffect(() => {
        loadUsers();
    }, []);

    const [unverifiedUsers, setUnverifiedUsers] = useState([]);

    const loadUnverifiedUsers = async () => {
        const token = localStorage.getItem('token');
        const data = await apiFetch('http://localhost:5000/api/admin/unverified-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        setUnverifiedUsers(data);
    };
    
    useEffect(() => {
        loadUnverifiedUsers();
    }, []);

    return (
        <div className="admin-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Admin
                    </div>
                </div>
                <div className="body-content">
                    <div>
                        {unverifiedUsers.map((user, index) => (
                            <div>
                                {user.username}
                                <button>Verify</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        {users.map((user, index) => (
                            <div>
                                {user.username} {user.admin ? 'Admin' : ''} {user.coolerAdmin ? 'Cooler' : ''} {user.raceAdmin ? 'Race' : ''} {user.RFGAdmin ? 'RFG' : ''} {user.recapAdmin ? 'Recap' : ''} {user.dashboardAdmin ? 'Dashboard' : ''}
                                <button>Edit</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;