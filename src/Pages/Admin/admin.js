import { Fragment, useEffect, useState } from 'react';
import { apiFetch } from '../../Utilities/apiClient.js';
import './admin.scss';
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const Admin = () => {

    // Verified user load
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const data = await apiFetch('/api/admin/users', {
            method: 'GET'
        });

        setUsers(data);
    };


    // Unverified users load
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);

    const loadUnverifiedUsers = async () => {
        const data = await apiFetch('/api/admin/unverified-users', {
            method: 'GET'
        });

        setUnverifiedUsers(data);
    };
    
    useEffect(() => {
        loadUnverifiedUsers();
        loadUsers();
    }, []);


    // Modal management
    const [currentUser, setCurrentUser] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState({
        admin: false,
        coolerAdmin: false,
        raceAdmin: false,
        RFGAdmin: false,
        recapAdmin: false,
        dashboardAdmin: false
    });
    

    const onClose = () => {
        setIsOpen(false);
        setSelectedRoles({
            admin: false,
            coolerAdmin: false,
            raceAdmin: false,
            RFGAdmin: false,
            recapAdmin: false,
            dashboardAdmin: false
        });
    }

    const onOpen = (user) => {
        setIsOpen(true);
        setCurrentUser(user);
        setSelectedRoles({
            admin: user.admin || false,
            coolerAdmin: user.coolerAdmin || false,
            raceAdmin: user.raceAdmin || false,
            RFGAdmin: user.RFGAdmin || false,
            recapAdmin: user.recapAdmin || false,
            dashboardAdmin: user.dashboardAdmin || false
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...currentUser,
            ...selectedRoles
        };

        await apiFetch('/api/admin/permissions', {
            method: 'PUT',
            body: JSON.stringify({ currentUser: updatedUser }),
        });
        
        onClose();
        loadUsers();
    }

    const verifyUser = async (user) => {
        await apiFetch('/api/admin/verifyUser', {
            method: 'PUT',
            body: JSON.stringify({ user }),
        });

        loadUnverifiedUsers();
        loadUsers();
    }

    const denyUser = async (user) => {
        const userId = user._id;
        await apiFetch(`/api/admin/denyUser/${userId}`, {
            method: 'DELETE',
        });

        loadUnverifiedUsers();
    }

    const handleCheckboxChange = (role) => {
        setSelectedRoles((prevRoles) => {
            const newRoles = { ...prevRoles };
    
            if (role === "admin") {
                if (!newRoles.admin) {
                    return {
                        admin: true,
                        coolerAdmin: false,
                        raceAdmin: false,
                        RFGAdmin: false,
                        recapAdmin: false,
                        dashboardAdmin: false
                    };
                } else {
                    return { ...newRoles, admin: false };
                }
            } else {
                return { ...newRoles, [role]: !newRoles[role], admin: false };
            }
        });
    };

    return (
        <div className="admin-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Admin
                    </div>
                </div>
                <div className="body-content">
                    {unverifiedUsers.length > 0 ?
                        <Fragment>
                            <h1>Unverified Users</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Username</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unverifiedUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td><div class="table-button"><button onClick={() => verifyUser(user)}>Verify</button></div></td>
                                            <td><div class="table-button"><button onClick={() => denyUser(user)}>Deny</button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Fragment>
                    : ''}
                    <h1>User Permissions</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>Username</td>
                                <td>Permissions</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.admin ? 'Admin' : ''} {user.coolerAdmin ? 'Cooler' : ''} {user.raceAdmin ? 'Race' : ''} {user.RFGAdmin ? 'RFG' : ''} {user.recapAdmin ? 'Recap' : ''} {user.dashboardAdmin ? 'Dashboard' : ''}</td>
                                    <td><div class="table-button"><button onClick={() => onOpen(user)}>Edit</button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                open={modalIsOpen}
                onClose={onClose}
                disablePortal
                >
                    <div className="modal-content">
                        <h2>Edit Permissions</h2>

                        <p>Editing for {currentUser ? currentUser.username : ''}</p>

                        <FormGroup className="checkbox-form">
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.admin} onChange={() => handleCheckboxChange('admin')} />} label="Admin" />
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.coolerAdmin} onChange={() => handleCheckboxChange('coolerAdmin')} />} label="Coolers" />
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.raceAdmin} onChange={() => handleCheckboxChange('raceAdmin')} />} label="Races" />
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.RFGAdmin} onChange={() => handleCheckboxChange('RFGAdmin')} />} label="RFG" />
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.recapAdmin} onChange={() => handleCheckboxChange('recapAdmin')} />} label="Recaps" />
                            <FormControlLabel control={<Checkbox size="small" checked={selectedRoles.dashboardAdmin} onChange={() => handleCheckboxChange('dashboardAdmin')} />} label="Dashboard" />
                        </FormGroup>

                        <button 
                            className="modal-button"
                            onClick={onSubmit}
                        >
                            Save
                        </button>

                        <button className="modal-button" onClick={onClose}>Close</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Admin;