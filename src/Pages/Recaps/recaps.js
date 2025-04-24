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

    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        date: '',
        distance: '',
        raceName: '',
        author: '',
    });

    const loadRecaps = async () => {
        const queryParams = new URLSearchParams();
    
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });
    
        const queryString = queryParams.toString();
        const url = `/api/recaps/getRecaps${queryString ? `?${queryString}` : ''}`;
    
        const data = await apiFetch(url, {
            method: 'GET',
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

    return (
        <div className="recaps-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Race Recaps
                    </div>
                    <div className="header-buttons">
                        <div onClick={() => setShowFilters(!showFilters)} className="filter-button">{showFilters ? 'Hide ' : 'Show '}Filters</div>
                        <RecapsModal reloadRecaps={loadRecaps}></RecapsModal>
                    </div>
                </div>
                <div className="body-content">
                    { showFilters &&
                        <div className="filter-container">
                            <div className="filter-options">
                                <div>
                                    <label>Date:</label>
                                    <input type="date" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })} />
                                </div>
                                <div>
                                    <label>Start Date:</label>
                                    <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label>End Date:</label>
                                    <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
                                </div>
                                <div>
                                    <label>Distance:</label>
                                    <select type="text" value={filters.distance} onChange={e => setFilters({ ...filters, distance: e.target.value })}>
                                        {RACE_DISTANCES.map((dist) => (
                                            <option key={dist} value={dist}>
                                                {dist}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Race Name:</label>
                                    <input type="text" value={filters.raceName} onChange={e => setFilters({ ...filters, raceName: e.target.value })} />
                                </div>
                                <div>
                                    <label>Author:</label>
                                    <input type="text" value={filters.author} onChange={e => setFilters({ ...filters, author: e.target.value })} />
                                </div>
                            </div>
                            <button onClick={() => loadRecaps()}>Search</button>
                        </div>
                    }
                    {recaps.map((recap) => (
                        <a href={recap.hostUrl} target='_blank' rel='noreferrer' style={{ textDecoration: 'none', color: 'inherit' }}>
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

export const RACE_DISTANCES = ["5k", "10k", "Half Marathon", "Marathon", "50k", "50 Mile", "100k", "100 Mile"]