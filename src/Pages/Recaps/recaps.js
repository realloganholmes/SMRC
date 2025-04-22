import './recaps.scss';
import RecapsModal from './recaps-modal';
import { apiFetch } from '../../Utilities/apiClient.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Utilities/authContext.js';
import { useSlideToggle } from '../../Utilities/slideToggleContext.js';
import { format } from 'date-fns';

const Recaps = () => {
    const { user } = useAuth();
    const { isToggled } = useSlideToggle();

    const [recaps, setRecaps] = useState([]);

    const loadRecaps = async () => {
        const data = await apiFetch('/api/recaps/getRecaps', {
            method: 'GET'
        });

        setRecaps(data);
    };
    
    useEffect(() => {
        loadRecaps();
    }, []);

    const deleteRecap = async (e, recap) => {
        e.preventDefault();
        
        const recapId = recap._id;
        await apiFetch(`/api/recaps-admin/deleteRecap/${recapId}`, {
            method: 'DELETE',
        });

        loadRecaps();
    }

    // Allow word / pdf
    // Search filter by distance, date range, title, racer
    return (
        <div className="recaps-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Race Recaps
                    </div>
                    <RecapsModal reloadRecaps={loadRecaps}></RecapsModal>
                </div>
                <div className="body-content">
                    {recaps.map((recap) => (
                        <a href={recap.hostUrl} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="recap-container">
                                <div className="recap-title-container">
                                    <div>{recap.raceName}</div>
                                    <div>{format(new Date(recap.date), 'MM/dd/yyyy')}</div>
                                </div>
                                <div>
                                    {recap.author}
                                </div>
                                <div>
                                    <div>{recap.distance} in {recap.time}</div>
                                </div>
                                { (user.isAdmin || user.isRecapAdmin) && isToggled ?
                                    <div>
                                        <button onClick={(e) => deleteRecap(e, recap)}>Delete</button>
                                    </div>
                                : ''}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recaps;