import React, { useState, useEffect } from 'react';

const DiarioForm = () => {
  const [titulo, setTitulo] = useState('');
  const [estadoAnimo, setEstadoAnimo] = useState('');
  const [texto, setTexto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [notas, setNotas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState('');

  useEffect(() => {
    cargarNotasGuardadas();
  }, []);

  const cargarNotasGuardadas = () => {
    const savedData = localStorage.getItem('savedData');
    const savedDate = localStorage.getItem('savedDate');
    const deleteAt = localStorage.getItem('deleteAt');
    
    if (savedData && savedDate && deleteAt) {
      const parsedData = JSON.parse(savedData);
      const currentDate = new Date().getTime();

      if (currentDate < parseInt(deleteAt, 10)) {
        setNotas([parsedData]);
        iniciarTemporizador(parseInt(deleteAt, 10));
      } else {
        eliminarNotasGuardadas();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    const deleteAt = new Date().getTime() + (48 * 60 * 60 * 1000); 
    const savedData = {
      titulo,
      estadoAnimo,
      texto,
      fechaCreacion: currentDate,
    };

    localStorage.setItem('savedData', JSON.stringify(savedData));
    localStorage.setItem('savedDate', currentDate.toString());
    localStorage.setItem('deleteAt', deleteAt.toString());

    setNotas([...notas, savedData]);
    setTitulo('');
    setEstadoAnimo('');
    setTexto('');
    setMensaje('Nota guardada correctamente.');
    iniciarTemporizador(deleteAt);
  };

  const iniciarTemporizador = (deleteAt) => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distancia = deleteAt - now;

      if (distancia <= 0) {
        clearInterval(interval);
        eliminarNotasGuardadas();
      } else {
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        setTiempoRestante(`${horas}h ${minutos}m ${segundos}s`);
      }
    }, 1000);
  };

  const eliminarNotasGuardadas = () => {
    localStorage.removeItem('savedData');
    localStorage.removeItem('savedDate');
    localStorage.removeItem('deleteAt');
    setNotas([]);
    setMensaje('Notas eliminadas automáticamente después de 48 horas.');
    setTiempoRestante('');
  };

  return (
    <div>
      <h1>Escribe Como Te Sientes</h1>
      <p className='p-meds'>
  Por qué es importante expresar lo que sentimos?
  <br></br>
  Muchas veces nos preguntamos por qué es importante expresar lo que sentimos y no guardar esos sentimientos para nosotros mismos.

  Pero cuando comprendemos cómo beneficia nuestra salud mental el mostrar nuestras emociones se disipa cualquier duda.

  Sentir miedo, tristeza, euforia es completamente normal y generalmente esos sentimientos dirigen nuestras acciones.

  Además, exteriorizarlos es importante para el desarrollo de la inteligencia emocional, que nos ayuda a llevar de una mejor manera nuestra vida en los diferentes aspectos.
  Escribe lo que sientas
  Si quieres saber lo que sientes puedes comenzar por escribirlo para luego poder expresarlo.

  Además, te puede ayudar a ensayar la mejor forma de comunicarlo a los demás.
</p>

      <form onSubmit={handleSubmit}>
  <label>
    Título:
    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
  </label>
  <label>
    Estado de ánimo:
    <input type="text" value={estadoAnimo} onChange={(e) => setEstadoAnimo(e.target.value)} />
  </label>
  <label>
    Texto:
    <textarea className='text-diario' value={texto} onChange={(e) => setTexto(e.target.value)} />
  </label>
  <button type="submit">Agregar Nota</button>
</form>

      {tiempoRestante && notas.length > 0 && <p className='p-meds'>Tiempo restante para eliminación: {tiempoRestante}</p>}
      <button onClick={eliminarNotasGuardadas}>Eliminar Notas</button>
      {mensaje && <p>{mensaje}</p>}
      <div>
        <h1>Notas recientes:</h1>
        {notas.map((nota, index) => (
          <div key={index}>
            <h1>{nota.titulo}</h1>
            <p className='p-meds'>Fecha de creación: {nota.fechaCreacion}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiarioForm;
