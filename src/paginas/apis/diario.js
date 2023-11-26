import React, { useState } from 'react';
import axios from 'axios';

const DiarioForm = () => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [estadoAnimo, setEstadoAnimo] = useState('');
  const [texto, setTexto] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envío de los datos a la base de datos
      const response = await axios.post('http://localhost:3003/guardar-diario', {
        titulo,
        fecha,
        estadoAnimo,
        texto,
        contraseña,
      });
      console.log('Datos guardados:', response.data);
      setMensaje('Datos guardados correctamente');
      // Limpiar el formulario después de guardar
      setTitulo('');
      setFecha('');
      setEstadoAnimo('');
      setTexto('');
      setContraseña('');
    } catch (error) {
      console.error('Error al guardar los datos:', error.response.data);
      setMensaje('Error al guardar los datos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Diario Secreto</h2>
      {mensaje && <p>{mensaje}</p>}
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </label>
      <label>
        Fecha:
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </label>
      <label>
        Estado de ánimo:
        <input type="text" value={estadoAnimo} onChange={(e) => setEstadoAnimo(e.target.value)} />
      </label>
      <label>
        Texto:
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default DiarioForm;
