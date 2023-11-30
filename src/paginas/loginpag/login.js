import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Instancia useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/usuarios/login",
        { correo, password }
      );
      console.log(response.data);

      // Guardar ID del usuario en localStorage
      localStorage.setItem("usuarioId", response.data.usuarioId);
      // Asegúrate de que guardas el nombre del usuario en localStorage con esta clave
      localStorage.setItem("userName", response.data.nombre); // Suponiendo que `response.data.nombre` tiene el nombre del usuario

// Suponiendo que recibes un token o algún identificador en la respuesta
localStorage.setItem('sessionToken', response.data.sessionToken);



      navigate("/Home");
    } catch (error) {
      console.error("Error de inicio de sesión", error);
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    // Aquí puedes enviar el token de Google a tu backend o manejarlo directamente en el frontend
    // Si el inicio de sesión es exitoso, redirige a Home
    // navigate('/Home');
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <div className="brand-logo"></div>
        <div className="brand-title">TSAKIN</div>
        <form className="inputs" onSubmit={handleLogin}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="example@test.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Min 6 characters long"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-login" type="submit">
            LOGIN
          </button>
          <label style={{ textAlign: "center" }}>Or</label>

          <GoogleLogin
            clientId="798178047339-bbq2h0biat1du60sbuuo72j67ulfnilj.apps.googleusercontent.com" // Reemplaza con tu Client ID
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="google-login-button" // Clase para estilos personalizados
          />

          <Link to="/Registro">
            <button className="button-login">
              <span>
                <Link to="/Registro">REGISTRATE</Link>
              </span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
