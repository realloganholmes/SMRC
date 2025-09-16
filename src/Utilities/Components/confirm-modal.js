import { Modal } from '@mui/material';
import './confirm-modal.scss';

const ConfirmModal = ({ modalOpen, setModalOpen, onConfirm, onDeny, headerText, bodyText, confirmText, denyText }) => {

  const onClose = () => {
    setModalOpen(false);
  }

  const confirmed = () => {
    onConfirm();
    onClose();
  }

  const deny = () => {
    onDeny();
    onClose();
  }

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      disablePortal
    >
      <div className="modal-content">
        <h2>{headerText}</h2>
        <p>{bodyText}</p>

        <button
          className="modal-button"
          onClick={deny}
        >
          {denyText}
        </button>
        <button
          className="modal-button"
          onClick={confirmed}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;