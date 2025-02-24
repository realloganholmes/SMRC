import React, { useState } from 'react';
import './rfg.scss';


// TODO: Points rubrik for reference

const RFG = () => {
    const [rfgData, setRfgData] = useState([
            {
                place: 1,
                name: 'Wolverine',
                points: 35,
                races: [
                    {
                        name: 'race1',
                        date: '01/01/2025',
                        distance: '5K',
                        time: '18:35',
                        pr: true,
                        points: 10
                    },
                    {
                        name: 'race2',
                        date: '01/08/2025',
                        distance: '5K',
                        time: '18:50',
                        pr: false,
                        points: 5
                    },
                    {
                        name: 'race3',
                        date: '01/15/2025',
                        distance: 'Marathon',
                        time: '3:00:00',
                        pr: true,
                        points: 20
                    }
                ]
            },
            {
                place: 2,
                name: 'Eggs',
                points: 20,
                races: [
                    {
                        name: 'race3',
                        date: '01/15/2025',
                        distance: 'Marathon',
                        time: '3:00:00',
                        pr: true,
                        points: 20
                    }
                ]
            },
            {
                place: 3,
                name: 'Joe The Show',
                points: 15,
                races: [
                    {
                        name: 'race4',
                        date: '01/01/2025',
                        distance: '10K',
                        time: '40:00',
                        pr: true,
                        points: 15
                    }
                ]
            },
            {
                place: 4,
                name: 'CRich',
                points: 10,
                races: [
                    {
                        name: 'race1',
                        date: '01/01/2025',
                        distance: '5K',
                        time: '20:00',
                        pr: true,
                        points: 10
                    }
                ]
            },
            {
                place: 5,
                name: 'MDub',
                points: 5,
                races: [
                    {
                        name: 'race1',
                        date: '01/01/2025',
                        distance: '5K',
                        time: '20:00',
                        pr: false,
                        points: 5
                    }
                ]
            }
        ]);

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
                    <div className="header-text">
                        RFG Standings
                    </div>
                </div>
                <div className="body-content">
                    <div className="rfg-content">
                        <div>
                            <div className="runner-name">Eggs</div>
                            <div className="rfg-second">2</div>
                        </div>
                        <div>
                            <div className="runner-name">Wolverine</div>
                            <div className="rfg-first">1</div>
                        </div>
                        <div>
                            <div className="runner-name">Joe The Show</div>
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
                                {rfgData.map((racer, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="outer-tr" onClick={() => toggleRow(index)}>
                                            <td>{racer.place}</td>
                                            <td>{racer.name}</td>
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {racer.races.map((race) => (
                                                                <tr>
                                                                    <td>{race.name}</td>
                                                                    <td>{race.date}</td>
                                                                    <td>{race.distance}</td>
                                                                    <td>{race.time}</td>
                                                                    <td>{race.pr ? "Y" : "N"}</td>
                                                                    <td>{race.points}</td>
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