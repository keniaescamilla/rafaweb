import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config"; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigate('/home');
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setErrorMessage("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <div className="brand-logo"></div>
        <div className="brand-title">TSAKIN</div>
        {errorMessage && <div className="error-modal">{errorMessage}</div>}
        <form className="inputs" onSubmit={handleLogin}>
          <label>Iniciar sesión:</label>
          <input
            type="email"
            placeholder="example@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Min 6 characters long"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-login" type="submit">LOGIN</button>
          <Link to="/Registro">
            <button type="button" className="button-login">REGISTRATE</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
