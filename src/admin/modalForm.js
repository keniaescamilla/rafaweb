import React, { useState } from 'react';
import './modalForm.css';

function ModalForm({ onClose, onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalMessageType, setModalMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !correo || !password) {
      setModalMessageType('error');
      setModalMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      await onSubmit({ nombre, correo, password });
      setModalMessageType('success');
      setModalMessage('Usuario registrado correctamente.');
      // Limpia los campos del formulario
      setNombre('');
      setCorreo('');
      setPassword('');
      setTimeout(() => {
        onClose(); // Cierra el modal después de un tiempo si el registro es exitoso
      }, 2000); // 2 segundos antes de cerrar el modal
    } catch (error) {
      setModalMessageType('error');
      setModalMessage('Hubo un problema al registrar el usuario.');
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2 className='tituloForm'>Agregar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label>Correo:</label>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className='botonForm' type="submit">Agregar</button>
          </form>
          {modalMessage && (
            <div className={`modal-message ${modalMessageType}`}>
              {modalMessage}
            </div>
          )}
        </div>
      </div>

    
    </>
  );
}

export default ModalForm;
