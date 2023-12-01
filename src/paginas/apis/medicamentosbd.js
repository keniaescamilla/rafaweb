import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quotes.css'

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
    <div>
      <h1>Consulta algún medicamento</h1>
      <p className='p-meds'>Comprender la importancia de tus medicamentos y cómo funcionan puede aumentar tu motivación para seguir el tratamiento de manera
          consistente. Además, al conocer tus medicamentos, puedes estar alerta sobre posibles
           interacciones con otros fármacos, suplementos o alimentos, así como sobre posibles contraindicaciones que podrían surgir debido a tu historial médico o condiciones específicas.</p>
           <br></br>
           <br></br>
           <br></br>
      <h1>Buscar Medicamentos:</h1>
      <div className='body-meds'>
      <input className='input-meds'
        type="text"
        placeholder="Buscar medicamento"
        value={busqueda}
        onChange={handleBusqueda}
        list="sugerencias"
        onKeyPress={handleKeyPress}
      />
      </div>
      <datalist id="sugerencias">
        {new_table.map(medicamento => (
          <option
            key={medicamento.id_meds}
            value={medicamento.nombre}
            onClick={() => buscarMedicamento(medicamento.medicamentos)}
          />
        ))}
      </datalist>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <ul>
        {resultados.map(medicamento => (
         
          <li className='li-meds' key={medicamento.id_meds}>
            <div className='img-meds'>
            <img  src='https://cdn-icons-png.flaticon.com/512/11411/11411396.png'></img>
            </div>
           
          <h3> Medicamento:</h3><br></br> {medicamento.nombre} <br></br><br></br>
          
          <h3>Descripcion:</h3><br></br> {medicamento.descripcion} <br></br> <br></br>
          <h3>Formula:</h3><br></br> {medicamento.formula} <br></br><br></br>
           <h3>Efectos:</h3><br></br> {medicamento.efectos} <br></br><br></br>
           <h3> Otros Nombres Con Los Que Los Podrias Encontrar:</h3><br></br>{medicamento.otros_nombres}<br></br><br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TusMedicamentos;
