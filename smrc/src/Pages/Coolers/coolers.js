import { useEffect, useState } from 'react';
import CoolersModal from './coolers-modal.js';
import { format } from 'date-fns';
import './coolers.scss';

const Coolers = () => {
    const [coolerNominations, setCN] = useState([]);

    const loadNominations = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/coolers/coolerNominations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setCN(await response.json());
        } else {
            alert('Error fetching nominations: ' + response.error);
        }            
    };
    
    useEffect(() => {
        loadNominations();
    }, []);

    // Validate duplicate cooler nominations by making sure no cooler within 6 days either side. If so, they have wrong date or its a duplicate
    // Look into forced select of an existing user
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