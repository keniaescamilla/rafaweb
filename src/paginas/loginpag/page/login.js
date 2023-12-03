import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'
import './login2.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(''); // Estado para el mensaje de error

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', { correo: email, password });
      console.log(response.data);
      if (response.data.idUsuario) {
        localStorage.setItem('isAuthenticated', 'true'); 
        localStorage.setItem('userName', response.data.nombre);
        console.log(localStorage.getItem('userName')); 
        
        navigate('/home'); // Redirecciona a Home si el login es exitoso
      }
    } catch (error) {
      console.error('Error en el login', error);
      setErrorMessage('Datos de inicio de sesión incorrectos'); // Establecer mensaje de error
    }
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <div className="brand-logo"></div>
        <div className="brand-title">TSAKIN</div>
        {errorMessage && <div className="login-error">{errorMessage}</div>} {/* Renderizar mensaje de error */}
        <form className="inputs" onSubmit={handleSubmit}>
          <label>Iniciar sesion: </label>
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
        </form>
        <Link to="/Registro">
          <button className="button-login">REGISTRATE</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
