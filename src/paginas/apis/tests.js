import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/tests') 
      .then(response => {
        setTests(response.data); 
      })
      .catch(error => {
        console.error('Error al obtener los tests:', error);
      });
  }, []);

  return (
    <div>
      <h1>Tests Psicológicos:</h1>
      <ul>
        {tests.map(test => (
          <li key={test.id_test}>
            <img src={test.imagen_test} alt="Imagen del test" />
            <br></br>
            {test.nombre_test} - <a href={test.url_test}>Enlace al test</a>
            <br></br>
            <br></br>
            <br></br>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tests;
