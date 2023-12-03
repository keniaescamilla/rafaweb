import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import './registro.css'

function Registro() {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState('');   // Estado para el mensaje de error

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/usuarios/', userData);
      console.log(response.data);
      setSuccessMessage('Registro completado con éxito'); // Establecer mensaje de éxito
      setErrorMessage(''); // Limpiar mensaje de error
    } catch (error) {
      console.error("Hubo un error en el registro", error);
      setErrorMessage('No se pudo completar el registro'); // Establecer mensaje de error
      setSuccessMessage(''); // Limpiar mensaje de éxito
    }
  };

  return (
    <div className='body-login'>
      <div className="container-login">
        <div className="brand-logo"></div>
        <div className="brand-title">TSAKIN</div>
        {successMessage && <div className="modal-message success">{successMessage}</div>} {/* Mensaje de éxito */}
        {errorMessage && <div className="modal-message error">{errorMessage}</div>}   {/* Mensaje de error */}
        <form className="inputs" onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input 
            type="text" 
            name="nombre"
            onChange={handleChange}
          />
          <label>EMAIL</label>
          <input 
            type="email" 
            name="correo"
            onChange={handleChange}
          />
          <label>PASSWORD</label>
          <input 
            type="password" 
            name="password"
            onChange={handleChange}
          />
          <button className='button-login' type="submit">REGISTRATE</button>
        </form>
        <label>Ya tienes una cuenta</label>
        <Link to="/login">
          <button className='button-login'>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Registro;
