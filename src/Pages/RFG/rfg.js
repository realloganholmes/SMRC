import React, { useState, useEffect } from 'react';
import './rfg.scss';
import { apiFetch } from '../../Utilities/apiClient.js';
import { useAuth } from '../../Utilities/authContext.js';
import { useSlideToggle } from '../../Utilities/slideToggleContext.js';
import RFGModal from './rfg-modal';
import { FaTrash } from 'react-icons/fa6';
import ConvertRecaps from './convert-recaps.js';

const RFG = () => {
    const { user } = useAuth();
    const { isToggled } = useSlideToggle();

    const [rfg, setRFG] = useState([]);
    const [convertRecaps, setConvertRecaps] = useState(false);

    const flipConvertRecaps = () => {
        setConvertRecaps(!convertRecaps)
    };

    const loadRFG = async () => {
        const data = await apiFetch(`/api/rfg/getStandings`, {
            method: 'GET',
        });

        setRFG(data);
    };

    useEffect(() => {
        loadRFG();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteRFG = async (e, rfg) => {
        e.preventDefault();

        const rfgId = rfg.id;
        await apiFetch(`/api/rfg-admin/deleteRFG/${rfgId}`, {
            method: 'DELETE',
        });

        loadRFG();
    }

    const [openRows, setOpenRows] = useState({});
    const toggleRow = (index) => {
        setOpenRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="RFG-container">
            <div className="content">
                <div className="header-content">
                    {(user?.isAdmin || user?.isRFGAdmin) && isToggled ?
                        <div className="header-button-convert">
                            <div className="rfg-modal-container">
                                <div className="convert-recaps-button" onClick={flipConvertRecaps}>
                                    {convertRecaps ? 'Hide ' : 'Show '}Recaps
                                </div>
                            </div>
                        </div>
                        : ''}
                    <div className="header-text">
                        RFG Standings
                    </div>
                    {(user?.isAdmin || user?.isRFGAdmin) && isToggled ?
                        <div className="header-buttons">
                            <RFGModal reloadRFG={loadRFG}></RFGModal>
                        </div>
                        : ''}
                </div>
                <div className="body-content">
                    {convertRecaps ?
                        <ConvertRecaps reloadRFG={loadRFG}></ConvertRecaps>
                        : ''}
                    <div className="rfg-content">
                        <div>
                            <div className="runner-name">{rfg[1]?.racer ?? ""}</div>
                            <div className="rfg-second">2</div>
                        </div>
                        <div>
                            <div className="runner-name">{rfg[0]?.racer ?? ""}</div>
                            <div className="rfg-first">1</div>
                        </div>
                        <div>
                            <div className="runner-name">{rfg[2]?.racer ?? ""}</div>
                            <div className="rfg-third">3</div>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="outer-table">
                            <thead>
                                <tr>
                                    <td>Place</td>
                                    <td>Name</td>
                                    <td>Points</td>
                                </tr>
                            </thead>
                            <tbody>
                                {rfg.map((racer, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="outer-tr" onClick={() => toggleRow(index)}>
                                            <td>{racer.place}</td>
                                            <td>{racer.racer}</td>
                                            <td>{racer.points}</td>
                                        </tr>
                                        {openRows[index] && (
                                            <tr>
                                                <td className="inner-table-container" colSpan="3">
                                                    <table className="inner-table">
                                                        <thead>
                                                            <tr>
                                                                <td>Race</td>
                                                                <td>Date</td>
                                                                <td>Distance</td>
                                                                <td>Time</td>
                                                                <td>PR</td>
                                                                <td>Points</td>
                                                                {(user.isAdmin || user.isRFGAdmin) && isToggled ?
                                                                    <td></td>
                                                                    : ''}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {racer.races.map((race) => (
                                                                <tr>
                                                                    <td>{race.race}</td>
                                                                    <td>{new Date(race.date).toLocaleDateString()}</td>
                                                                    <td>{race.distance}</td>
                                                                    <td>{race.time}</td>
                                                                    <td>{race.pr ? "Y" : "N"}</td>
                                                                    <td>{race.points}</td>
                                                                    {(user.isAdmin || user.isRFGAdmin) && isToggled ?
                                                                        <td>
                                                                            <button className="delete-button" onClick={(e) => deleteRFG(e, race)}><FaTrash /></button>
                                                                        </td>
                                                                        : ''}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RFG;