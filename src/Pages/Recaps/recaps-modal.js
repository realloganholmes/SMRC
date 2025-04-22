import { useState } from 'react';
import Modal from "@mui/material/Modal";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import './recaps-modal.scss';
import { apiFetch } from '../../Utilities/apiClient';

const RecapsModal = ({ reloadRecaps }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [raceName, setRaceName] = useState("");
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [distance, setDistance] = useState("5k");
    const [file, setFile] = useState(null)

    const onClose = () => {
        setIsOpen(false);
        setDate(null);
        setRaceName("");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        setDistance("5k");
        setFile(null);
    }

    const onOpen = () => {
        setIsOpen(true);
    }

    const getTimeString = () => {
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const paddedSeconds = seconds.toString().padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }

    const handleFileUpload = async (e) => {
        setFile(e.target.files[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        const hostUrl = await apiFetch('/api/uploadFile', {
            method: 'POST',
            body: formData
        }, true);

        console.log(hostUrl);

        await apiFetch('/api/recaps/addRecap', {
            method: 'POST',
            body: JSON.stringify({
                date,
                raceName,
                time: getTimeString(),
                distance,
                hostUrl,
            }),
        });
        
        onClose();
        reloadRecaps();
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

    const isFormValid = raceName.trim() !== "" && date !== null && file !== null;

    return (
        <div className="recaps-modal-container">
            <div className="add-recap-button" onClick={onOpen}>
                + Add Recap
            </div>
            <Modal
                open={modalIsOpen}
                onClose={onClose}
                disablePortal
                >
                <div className="modal-content">
                    <h2>Upload Recap</h2>

                    <div className="form-group">
                        <label htmlFor="raceName">Race Name:</label>
                        <input
                            id="raceName"
                            type="text"
                            value={raceName}
                            onChange={(e) => setRaceName(e.target.value)}
                        />
                        {raceName.trim() === "" && (
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
                            {["5k", "10k", "Half Marathon", "Marathon", "50k", "50 Mile", "100k", "100 Mile"].map((dist) => (
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
                        <label htmlFor="file">Recap File (PDF):</label>
                        <input type="file" accept="application/pdf" id="file" onChange={handleFileUpload} />
                        {file === null && (
                            <p className="error-message">* File is required *</p>
                        )}
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

export default RecapsModal;