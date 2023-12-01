import React, { useState } from "react";
import { Link } from "react-router-dom";
import './login.css';
import'./registro.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config"; 

function Registro() {
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(auth, emailRegister, passwordRegister);
      console.log("Usuario registrado con éxito", response);
      setSuccessMessage("Registro exitoso. Ya puedes iniciar sesión.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error en el registro", error);
      setErrorMessage("No se pudo completar el registro. Por favor, intenta de nuevo.");
      setSuccessMessage("");
    }
  };

  return (
    <div className='body-login'>
      <div className="container-login">
        <div className="brand-logo"></div>
        <div className="brand-title">TSAKIN</div>
        {successMessage && <div className="success-modal">{successMessage}</div>}
        {errorMessage && <div className="error-modal-2">{errorMessage}</div>}
        <form className="inputs" onSubmit={handleRegister}>
          <label>EMAIL</label>
          <input 
            type="email" 
            placeholder="example@test.com"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <label>PASSWORD</label>
          <input 
            type="password" 
            placeholder="Min 6 caracteres"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          <button className='button-login' type="submit">REGISTRATE</button>
        </form>

        <label>¿Ya tienes una cuenta?</label>
        <Link to="/login">
          <button className='button-login'>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Registro;
