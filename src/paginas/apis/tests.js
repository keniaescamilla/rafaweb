import React from 'react';
import './test.css';

function Test() {
  const tests = [
    { id: 1, nombre: 'Test de Depresion', url: 'https://pasespana.org/test-personas-altamente-sensibles' },
    { id: 2, nombre: 'Test de Distimia', url: 'https://www.psicologia-online.com/test-de-distimia' },
    { id: 3, nombre: 'Por que estoy feliz y despues triste?', url: 'https://www.psicologia-online.com/por-que-estoy-feliz-y-despues-triste' },
    // Puedes agregar más pruebas aquí
  ];

  return (
    <div>
      <h1>Tests Disponibles</h1>
      <ul className='test'>
        {tests.map(test => (
          <li key={test.id}>
            <a href={test.url} target="_blank" rel="noopener noreferrer">{test.nombre}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
