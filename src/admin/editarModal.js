import React, { useState } from 'react';
import './modalForm.css'; // Utilizando el mismo archivo CSS

function EditModalForm({ usuario, onClose, onSubmit }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);
  const [password, setPassword] = useState(usuario.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...usuario, nombre, correo, password });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 className='tituloForm'>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />

          <label>Correo:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
          />

          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default EditModalForm;
