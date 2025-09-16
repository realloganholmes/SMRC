import { useState, useContext } from 'react';
import Modal from "@mui/material/Modal";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import './rfg-modal-convert.scss';
import { apiFetch } from '../../Utilities/apiClient.js';
import { RACE_DISTANCES } from '../../Utilities/values.js';
import { AllUsersContext } from '../../Utilities/allUsersContext.js';

const RFGModalConvert = ({ isOpen, setIsOpen, handleConversion, _date, _race, _time, _distance, _racer }) => {
    console.log(dayjs("2025-09-16T14:30:00").startOf("day"));
    const [date, setDate] = useState(dayjs("2025-09-16T14:30:00").startOf("day"));
    const [race, setRace] = useState(_race ? _race : "");
    const [hours, setHours] = useState(_time ? _time.split(":")[0] : "00");
    const [minutes, setMinutes] = useState(_time ? _time.split(":")[1] : "00");
    const [seconds, setSeconds] = useState(_time ? _time.split(":")[2] : "00");
    const [distance, setDistance] = useState(_distance ? _distance : "5k");
    const [pr, setPR] = useState(false);
    const [racer, setRacer] = useState(_racer ? _racer : "");

    const onClose = () => {
        setIsOpen(false);
    }

    const { ALL_USERNAMES } = useContext(AllUsersContext);

    const getTimeString = () => {
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const paddedSeconds = seconds.toString().padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await apiFetch('/api/rfg-admin/addRFG', {
            method: 'POST',
            body: JSON.stringify({
                date,
                race,
                racer,
                time: getTimeString(),
                distance,
                pr,
            }),
        });

        onClose();
        handleConversion();
    }

    const getValidDates = (date) => {
        return !date.isAfter(dayjs(), "day");
    };

    const trySetTime = (maxValue, setter, value) => {
        if (value > maxValue) {
            setter(maxValue);
        } else if (value < 0) {
            setter(0);
        } else {
            setter(value);
        }
    }

    const isFormValid = race.trim() !== "" && date !== null && racer.trim() !== "";

    return (
        <div className="rfg-modal-container">
            <Modal
                open={isOpen}
                onClose={onClose}
                disablePortal
            >
                <div className="modal-content">
                    <h2>Upload Result</h2>

                    <div className="form-group">
                        <label htmlFor="race">Race Name:</label>
                        <input
                            id="race"
                            type="text"
                            value={race}
                            onChange={(e) => setRace(e.target.value)}
                        />
                        {race.trim() === "" && (
                            <p className="error-message">* Race Name is required *</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Race Date:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="date-picker"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                shouldDisableDate={(date) => !getValidDates(date)}
                            />
                        </LocalizationProvider>
                        {date === null && (
                            <p className="error-message">* Date is required *</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="distance">Race Distance:</label>
                        <select
                            id="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                        >
                            {RACE_DISTANCES.map((dist) => (
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Finish Time (hh:mm:ss):</label>
                        <div className="time-inputs" style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="number"
                                min="0"
                                max="99"
                                placeholder="hh"
                                value={hours}
                                onChange={(e) => trySetTime(99, setHours, e.target.value)}
                            />
                            <input
                                type="number"
                                min="0"
                                max="60"
                                placeholder="mm"
                                value={minutes}
                                onChange={(e) => trySetTime(59, setMinutes, e.target.value)}
                            />
                            <input
                                type="number"
                                min="0"
                                max="60"
                                placeholder="ss"
                                value={seconds}
                                onChange={(e) => trySetTime(59, setSeconds, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="racer">Racer:</label>
                        <select type="text" value={racer} onChange={e => setRacer(e.target.value)}>
                            {!racer && (
                                <option value="" disabled>
                                    -- Select --
                                </option>
                            )}
                            {ALL_USERNAMES.map((username) => (
                                <option key={username} value={username}>
                                    {username}
                                </option>
                            ))}
                        </select>
                        {racer.trim() === "" && (
                            <p className="error-message">* Racer is required *</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="pr">PR?</label>
                        <input
                            className="pr-checkbox"
                            id="pr"
                            type="checkbox"
                            checked={pr}
                            onChange={(e) => setPR(e.target.checked)}
                        />
                    </div>

                    <button
                        className="modal-button"
                        disabled={!isFormValid}
                        onClick={onSubmit}
                    >
                        Submit
                    </button>

                    <button className="modal-button" onClick={onClose}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default RFGModalConvert;