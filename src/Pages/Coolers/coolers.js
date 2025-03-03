import { useEffect, useState } from 'react';
import CoolersModal from './coolers-modal.js';
import { format } from 'date-fns';
import './coolers.scss';
import { apiFetch } from '../../Utilities/apiClient.js';
import { useAuth } from '../../Utilities/authContext.js';
import { useSlideToggle } from '../../Utilities/slideToggleContext.js';

const Coolers = () => {
    const { user } = useAuth();
    const { isToggled } = useSlideToggle();

    const [coolerNominations, setCN] = useState([]);

    const loadNominations = async () => {
        const data = await apiFetch('/api/coolers/coolerNominations', {
            method: 'GET'
        });

        setCN(data);
    };
    
    useEffect(() => {
        loadNominations();
    }, []);

    const deleteCooler = async (cooler) => {
        const coolerId = cooler._id;
        await apiFetch(`/api/coolers-admin/deleteCooler/${coolerId}`, {
            method: 'DELETE',
        });

        loadNominations();
    }

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
                            { (user.isAdmin || user.isCoolerAdmin) && isToggled ?
                                <div>
                                    <button onClick={() => deleteCooler(cooler)}>Delete</button>
                                </div>
                            : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coolers;