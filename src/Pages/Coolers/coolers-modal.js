import { useState } from 'react';
import Modal from "@mui/material/Modal";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import './coolers-modal.scss';
import { apiFetch } from '../../Utilities/apiClient';

const CoolersModal = ({ reloadNominations }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [nominee, setNominee] = useState("");
    const [date, setDate] = useState(null);
    const [comment, setComment] = useState("");

    const onClose = () => {
        setIsOpen(false);
        setNominee("");
        setDate(null);
        setComment("");
    }

    const onOpen = () => {
        setIsOpen(true);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await apiFetch('/api/coolers/coolerNominate', {
            method: 'POST',
            body: JSON.stringify({
                nominee,
                date,
                comment
            }),
        });
        
        onClose();
        reloadNominations();
    }

    const getValidSaturdays = (date) => {
        const today = dayjs();
        const mostRecentDecember = today.month() < 11 ? today.year() - 1 : today.year();
        const startOfValidRange = dayjs(`${mostRecentDecember}-12-01`);
        
        return date.isAfter(startOfValidRange, "day") && date.isBefore(today, "day");
    }; 

    const isFormValid = nominee.trim() !== "" && date !== null;

    return (
        <div className="coolers-modal-container">
            <div className="nominate-button" onClick={onOpen}>
                + Nominate
            </div>
            <Modal
                open={modalIsOpen}
                onClose={onClose}
                disablePortal
                >
                <div className="modal-content">
                    <h2>COY Nomination Form</h2>

                    <div className="form-group">
                        <label htmlFor="nominee">Nominee:</label>
                        <input
                            id="nominee"
                            type="text"
                            value={nominee}
                            onChange={(e) => setNominee(e.target.value)}
                        />
                        {nominee.trim() === "" && (
                            <p className="error-message">* Nominee is required *</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Pick a Saturday:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="date-picker"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                shouldDisableDate={(date) =>
                                    date.day() !== 6 || !getValidSaturdays(date)
                                }
                            />
                        </LocalizationProvider>
                        {date === null && (
                            <p className="error-message">* Date is required *</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comment (Optional):</label>
                        <textarea
                            id="comment"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
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

export default CoolersModal;