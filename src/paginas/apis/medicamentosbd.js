import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TusMedicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/medicamentos')
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
    const resultado = medicamentos.find(
      medicamento => medicamento.medicamentos === medicamentoNombre
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
    <div>
      <p>Comprender la importancia de tus medicamentos y cómo funcionan
         puede aumentar tu motivación para seguir el tratamiento de manera
          consistente. Además, al conocer tus medicamentos, puedes estar alerta sobre posibles
           interacciones con otros fármacos, suplementos o alimentos, así como sobre posibles contraindicaciones que podrían surgir debido a tu historial médico o condiciones específicas.</p>
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
        {medicamentos.map(medicamento => (
          <option
            key={medicamento.id_meds}
            value={medicamento.medicamentos}
            onClick={() => buscarMedicamento(medicamento.medicamentos)}
          />
        ))}
      </datalist>

      <h2>Resultados:</h2>
      <ul>
        {resultados.map(medicamento => (
          <li key={medicamento.id_meds}>
            {medicamento.medicamentos} - {medicamento.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TusMedicamentos;
