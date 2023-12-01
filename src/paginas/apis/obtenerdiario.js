import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../body.css';

const DiarioList = () => {
  const [diario, setDiario] = useState([]);

  useEffect(() => {
    obtenerEscritos();
  }, []);

  const obtenerEscritos = async () => {
    try {
      const response = await axios.get('http://localhost:3003/obtener-escritos');
      setDiario(response.data);
    } catch (error) {
      console.error('Error al obtener los escritos:', error);
    }
  };



  const borrarEscrito = async (id) => {
    console.log(' escrito con ID:', id);
    try {
      await axios.delete(`http://localhost:3003/borrar-escrito`, { data: { id_escrito: id } });
      obtenerEscritos(); // Vuelve a obtener la lista actualizada después de borrar
    } catch (error) {
      console.error('Error al borrar el escrito:', error);
    }
  };

  return (
    <div>
      <h2> de Escritos</h2>
      <ul>
        {diario.map((escrito) => (
          <li key={escrito.id_escrito}>
            <div>
              <h3>{escrito.titulo}</h3>
              <p>{escrito.fecha}</p>
              <p>{escrito.estado_animo}</p>
              <p>{escrito.texto}</p>
              <button className='button-neumorphic' onClick={() => borrarEscrito(escrito.id_escrito)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiarioList;
