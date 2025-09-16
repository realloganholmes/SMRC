import { useEffect, useState } from 'react';
import { apiFetch } from '../../Utilities/apiClient';
import { FaArrowRight, FaTrash } from 'react-icons/fa6';
import './convert-recaps.scss';
import ConfirmModal from '../../Utilities/Components/confirm-modal.js';
import RFGModalConvert from './rfg-modal-convert.js';

const ConvertRecaps = ({ reloadRFG }) => {
  const [recaps, setRecaps] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showRFGConvertModal, setShowRFGConvertModal] = useState(false);
  const [currentRecap, setCurrentRecap] = useState(null);

  const loadRecaps = async () => {
    const data = await apiFetch(`/api/recaps-admin/getUnconvertedRecaps`, {
      method: 'GET',
    });

    setRecaps(data);
  };

  const setRecapAsConverted = async (recapId) => {
    await apiFetch(`/api/recaps-admin/recapConverted`, {
      method: 'POST',
      body: JSON.stringify({ recapId })
    });
  }

  useEffect(() => {
    loadRecaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRecapConverted = async () => {
    await setRecapAsConverted(currentRecap._id);
    loadRecaps();
  }

  const addedRFGConversion = () => {
    setRecapConverted();
    reloadRFG();
  }

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
                <button className="convert-button" onClick={(e) => { setCurrentRecap(recap); setShowRFGConvertModal(true); }}><FaArrowRight /></button>
              </td>
              <td>
                <button className="ignore-button" onClick={(e) => { setCurrentRecap(recap); setConfirmModalOpen(true); }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal modalOpen={confirmModalOpen} setModalOpen={setConfirmModalOpen} onConfirm={setRecapConverted} onDeny={() => { }} headerText="Ignore Recap?" bodyText="Are you sure you want to ignore this recap with respect to RFG points?" confirmText="Ignore" denyText="Keep">
      </ConfirmModal>
      {showRFGConvertModal ?
        <RFGModalConvert isOpen={showRFGConvertModal} setIsOpen={setShowRFGConvertModal} handleConversion={addedRFGConversion} _date={currentRecap.date} _race={currentRecap.raceName} _distance={currentRecap.distance} _time={currentRecap.time} _racer={currentRecap.author}>
        </RFGModalConvert>
        : ""}
    </div>
  );
}

export default ConvertRecaps;