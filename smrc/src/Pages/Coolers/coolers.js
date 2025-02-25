import { useEffect, useState } from 'react';
import CoolersModal from './coolers-modal.js';
import { format } from 'date-fns';
import './coolers.scss';
import { apiFetch } from '../../Utilities/apiClient.js';

const Coolers = () => {
    const [coolerNominations, setCN] = useState([]);

    const loadNominations = async () => {
        const token = localStorage.getItem('token');
        const data = await apiFetch('http://localhost:5000/api/coolers/coolerNominations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        setCN(data);
    };
    
    useEffect(() => {
        loadNominations();
    }, []);

    return (
        <div className="cooler-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Cooler Of The Year Nominees
                    </div>
                    <CoolersModal reloadNominations={loadNominations}></CoolersModal>
                </div>
                <div className="body-content">
                    {coolerNominations.map((cooler, index) => (
                        <div className="nominee-content" key={index}>
                            <div className="nominee-title-container">
                                <div>{cooler.nominee}</div>
                                <div>{format(new Date(cooler.date), 'MM/dd/yyyy')}</div>
                            </div>
                            <div className="nominator-comment">
                                {cooler.comment}
                            </div>
                            <div className="nominator-name">
                                Nominated By: {cooler.nominator}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coolers;