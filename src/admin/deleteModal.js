import React from 'react';
import './deleteModal.css'; // Asegúrate de crear este archivo CSS

function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Eliminar Usuario</h2>
        <p className='mensaje'>¿Estás seguro de que quieres eliminar al usuario?</p>
        <div className="confirm-modal-actions">
          <button onClick={onConfirm}>Eliminar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
