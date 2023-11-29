import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css';
import axios from 'axios';

function Registro() {
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Instancia useNavigate

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/usuarios/login', {
                correo,
                password
            });
            console.log(response.data);

            // Si el inicio de sesión es exitoso, redirige a /body
            navigate('/Home');
        } catch (error) {
            console.error('Error de inicio de sesión', error);
        }
    };

    return (
        <div className='body-login'>
            <div className="container-login">
                <div className="brand-logo"></div>
                <div className="brand-title">TSAKIN</div>
                <form className="inputs" onSubmit={handleLogin}>
                    <label>USUARIO</label>
                    <input
                    type="text"
                    placeholder="eliga un nombre de usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    
                    />
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
                    <button className='button-login' type="submit">REGISTRATE</button>
                    <label>Ya formas parte? :</label>
                    <button className='button-login' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Registro;