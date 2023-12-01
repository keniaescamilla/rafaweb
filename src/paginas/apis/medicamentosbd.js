import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TusMedicamentos = () => {
  const [new_table, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3006/medicamentos')
      .then(response => {
        setMedicamentos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener medicamentos:', error);
      });
  }, []);

  const handleBusqueda = event => {
    setBusqueda(event.target.value);
  };

  const buscarMedicamento = medicamentoNombre => {
    const resultado = new_table.find(
      new_table => new_table.nombre === medicamentoNombre
    );
    if (resultado) {
      setResultados([resultado]);
    } else {
      setResultados([]);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      buscarMedicamento(busqueda);
    }
  };

  return (
    <div className='container-neumorphic'>
      <h1>Consulta Algun Medicamento</h1>
      <p className='p-libro'>Comprender la importancia de tus medicamentos y cómo funcionan
         puede aumentar tu motivación para seguir el tratamiento de manera
          consistente. Además, al conocer tus medicamentos, puedes estar alerta sobre posibles
           interacciones con otros fármacos, suplementos o alimentos, así como sobre posibles contraindicaciones que podrían surgir debido a tu historial médico o condiciones específicas.</p>
           <br></br>
           <br></br>
           <br></br>
      <h1>Buscar Medicamentos:</h1>
      <input
        type="text"
        placeholder="Buscar medicamento"
        value={busqueda}
        onChange={handleBusqueda}
        list="sugerencias"
        onKeyPress={handleKeyPress}
      />
      <datalist id="sugerencias">
        {new_table.map(medicamento => (
          <option
            key={medicamento.id_meds}
            value={medicamento.nombre}
            onClick={() => buscarMedicamento(medicamento.medicamentos)}
          />
        ))}
      </datalist>

      <h2>Resultados:</h2>
      <ul>
        {resultados.map(medicamento => (
          <li key={medicamento.id_meds}>
            {medicamento.nombre} - {medicamento.descripcion} - {medicamento.formula} - {medicamento.efectos} - {medicamento.otros_nombres}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TusMedicamentos;
