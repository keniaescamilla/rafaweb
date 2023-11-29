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
      <h2 className='h2-diario'>Escribe Como Te Sientes </h2>
      <p className='p-diario'>
Por qué es importante expresar lo que sentimos?
<br></br>
Muchas veces nos preguntamos por qué es importante expresar lo que sentimos y no guardar esos sentimientos para nosotros mismos.

Pero cuando comprendemos cómo beneficia nuestra salud mental el mostrar nuestras emociones se disipa cualquier duda.

Sentir miedo, tristeza, euforia es completamente normal y generalmente esos sentimientos dirigen nuestras acciones.

Además, exteriorizarlos es importante para el desarrollo de la inteligencia emocional, que nos ayuda a llevar de una mejor manera nuestra vida en los diferentes aspectos.
Escribe lo que sientas
Si quieres saber lo que sientes puedes comenzar por escribirlo para luego poder expresarlo.

Además, te puede ayudar a ensayar la mejor forma de comunicarlo a los demás.</p>
      <br></br>
      <br></br>
      <br></br>
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
        <input  type="text" value={estadoAnimo} onChange={(e) => setEstadoAnimo(e.target.value)} />
      </label>
      <label>
        Texto:
        <textarea className='text-diario' value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
    </form>
  );
};

export default DiarioForm;
