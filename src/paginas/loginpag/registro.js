import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import './registro.css';

function Registro() {
    // Estados para manejar los inputs del formulario y el modal
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); // Asume que tu ruta de login es '/login'
    };


    // Manejador para el evento submit del formulario
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Intenta registrar al usuario haciendo una solicitud POST al servidor
            await axios.post('http://localhost:3001/usuarios', {
                nombre: usuario,
                correo,
                password
            });
            // Si el registro es exitoso, muestra un mensaje en el modal
            setModalMessage('Registro exitoso. Bienvenido a TSAKIN!');
            setModalVisible(true);
        } catch (error) {
            // Si hay un error, muestra un mensaje de error en el modal
            setModalMessage('Error en el registro. Por favor, intente de nuevo.');
            setModalVisible(true);
        }
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
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
                        placeholder="Elija un nombre de usuario"
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
                        placeholder="Min 6 caracteres" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className='button-login' type="submit">REGISTRATE</button>
                    
                </form>
                <label>Ya formas parte? :</label>
                <button className='button-login' onClick={goToLogin}>Login</button>
            </div>

            {/* Modal para mostrar mensajes */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Registro;
