import React from 'react';
import './libros.css';

function Test() {
  const tests = [
    { id: 1, nombre: 'Test de Depresion', url: 'https://pasespana.org/test-personas-altamente-sensibles/?gad_source=1&gclid=CjwKCAiAmZGrBhAnEiwAo9qHiXwx5x509ejQkae3bED6diipxFqmc26tTinQeTuUMjgOuroBLbnWZxoCv8AQAvD_BwE' },
    
    { id: 2, nombre: 'Test de Distimia', url: 'https://www.psicologia-online.com/test-de-distimia-4483.html' },
    { id: 3, nombre: 'Por que estoy feliz y despues triste?', url: 'https://www.psicologia-online.com/por-que-estoy-feliz-y-despues-triste-7093.html' },
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
