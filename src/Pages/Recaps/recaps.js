import { useState } from 'react';
import './recaps.scss';

const Recaps = () => {
    const recaps = [
        {
            racer: 'Wolverine',
            distance: '5km',
            time: '18:45',
            raceName: 'Helpful Elf 5k',
            date: '1/1/2025',
            content: 'This is my recap content, please enjoy'
        }
    ];

    // Allow word, pdf, or plain text.
    // Search filter by distance, date range, title, racer
    return (
        <div className="recaps-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Race Recaps
                    </div>
                    <div className="add-button">
                        + Add Recap
                    </div>
                </div>
                <div className="body-content">
                    {recaps.map((recap) => (
                        <div className="recap-container">
                            <div className="recap-title-container">
                                <div>{recap.raceName}</div>
                                <div>{recap.date}</div>
                            </div>
                            <div>
                                {recap.racer}
                            </div>
                            <div>
                                <div>{recap.distance} in {recap.time}</div>
                            </div>
                            <div className="recap-content">
                                {recap.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recaps;