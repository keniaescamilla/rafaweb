import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../body.css';

const DiarioList = () => {
  const [diario, setDiario] = useState([]);
  const [intervalos, setIntervalos] = useState([]);

  useEffect(() => {
    obtenerEscritos();
    return () => {
      limpiarIntervalos();
    };
  }, []);

  const obtenerEscritos = async () => {
    try {
      const response = await axios.get('http://localhost:3003/obtener-escritos');
      setDiario(response.data);
      iniciarTemporizadores(response.data.length);
    } catch (error) {
      console.error('Error al obtener los escritos:', error);
    }
  };

  const borrarEscrito = async (id, index) => {
    console.log('Escrito con ID:', id);
    try {
      await axios.delete(`http://localhost:3003/borrar-escrito`, { data: { id_escrito: id } });
      const updatedDiario = [...diario];
      updatedDiario.splice(index, 1);
      setDiario(updatedDiario);
      limpiarIntervalo(index);
    } catch (error) {
      console.error('Error al borrar el escrito:', error);
    }
  };

  const limpiarIntervalo = (index) => {
    const nuevosIntervalos = [...intervalos];
    clearInterval(nuevosIntervalos[index]);
    nuevosIntervalos.splice(index, 1);
    setIntervalos(nuevosIntervalos);
  };

  const limpiarIntervalos = () => {
    intervalos.forEach((intervalo) => {
      clearInterval(intervalo);
    });
  };

  const iniciarTemporizadores = (length) => {
    const nuevosIntervalos = Array(length).fill(null);
    setIntervalos(nuevosIntervalos);
  };

  const iniciarTemporizador = (distancia, index) => {
    if (distancia > 0) {
      const intervalo = setInterval(() => {
        // Lógica del temporizador...
      }, 1000);
      const nuevosIntervalos = [...intervalos];
      nuevosIntervalos[index] = intervalo;
      setIntervalos(nuevosIntervalos);
    }
  };

  return (
    <div>
      <ul>
        {diario.map((escrito, index) => (
          <li key={escrito.id_escrito}>
            <div>
              <h3>{escrito.titulo}</h3>
              <p>{escrito.fecha}</p>
              <p>{escrito.estado_animo}</p>
              <p>{escrito.texto}</p>
              {intervalos[index] && <p>Cronómetro: ...</p>}
              <button className='button-neumorphic' onClick={() => borrarEscrito(escrito.id_escrito, index)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiarioList;
