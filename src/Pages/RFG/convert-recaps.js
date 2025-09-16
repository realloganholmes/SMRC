import { useEffect, useState } from 'react';
import { apiFetch } from '../../Utilities/apiClient';
import { useAuth } from '../../Utilities/authContext';
import { useSlideToggle } from '../../Utilities/slideToggleContext.js';
import { FaArrowRight, FaTrash } from 'react-icons/fa6';
import { Modal } from '@mui/material';

const ConvertRecaps = () => {
  // Add default value of 0 to all recaps for new field 'ConvertedToRFG'
  // Get all recaps with ConvertedToRFG = 0
  // Show in a list
  // Button click takes values and opens existing modal with those values to be edited if needed
  // When sent, flip ConvertedToRFG = 1

  const { user } = useAuth();
  const { isToggled } = useSlideToggle();

  const [recaps, setRecaps] = useState([]);

  const loadRecaps = async () => {
    const data = await apiFetch(`/api/recaps-admin/getUnconvertedRecaps`, {
      method: 'GET',
    });

    setRecaps(data);
  };

  useEffect(() => {
    loadRecaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertRecap = () => {

  }

  const setRecapConverted = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const onClose = () => {

  }

  const onSubmit = () => {

  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <table className="inner-table">
        <thead>
          <tr>
            <td>Race</td>
            <td>Date</td>
            <td>Distance</td>
            <td>Time</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {recaps.map((recap) => (
            <tr>
              <td>{recap.raceName}</td>
              <td>{new Date(recap.date).toLocaleDateString()}</td>
              <td>{recap.distance}</td>
              <td>{recap.time}</td>
              <td>
                <button className="convert-button" onClick={(e) => convertRecap(e, recap)}><FaArrowRight /></button>
              </td>
              <td>
                <button className="ignore-button" onClick={(e) => setRecapConverted(e, recap)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={modalIsOpen}
        onClose={onClose}
        disablePortal
      >
        <div className="modal-content">
          <h2>Ignore Recap?</h2>
          <p>Are you sure you want to ignore this recap with respect to RFG points?</p>
          <button
            className="modal-button"
            onClick={onSubmit}
          >
            Keep
          </button>
          <button
            className="modal-button"
            onClick={onSubmit}
          >
            Ignore
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ConvertRecaps;