import React, { useState } from 'react';
import './modalForm.css'; // Asegúrate de crear este archivo CSS

function ModalForm({ usuario, onClose, onSubmit }) {
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : '');
  const [correo, setCorreo] = useState(usuario ? usuario.correo : '');
  const [password, setPassword] = useState(usuario ? usuario.password : '');


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, correo, password });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{usuario ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Correo:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
