import React from 'react';

function ContactUs() {
  const helpNumbers = [
    { id: 1, name: 'Línea de ayuda 1', number: '+123456789' },
    { id: 2, name: 'Línea de ayuda 2', number: '+987654321' },
    // Puedes agregar más números de ayuda aquí
  ];

  return (
    <div>
      <h2>Contáctanos</h2>
      <h3>Números de ayuda:</h3>
      <ul>
        {helpNumbers.map(help => (
          <li key={help.id}>
            <p>
              <strong>{help.name}: </strong>
              <a href={`tel:${help.number}`}>{help.number}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactUs;
