import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from './modalForm'; // Asegúrate de que este componente esté correctamente importado
import './usuarios.css'; // Asegúrate de que este archivo CSS exista
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 

function UsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);


  const handleEditarUsuario = (usuario) => {
      setUsuarioActual(usuario); // Establecer el usuario actual a editar
      setShowModal(true);
    };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuarios/');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleAgregarUsuario = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (usuarioData) => {
    try {
      await axios.post('http://localhost:3001/usuarios/', usuarioData);
      setShowModal(false);
      fetchUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  };

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <button className="agregar-usuario-btn" onClick={handleAgregarUsuario}>Agregar Nuevo Usuario</button>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id_usuario}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.password}</td>
              <td>
              <button className="editar-btn" onClick={() => handleEditarUsuario(usuario)}>
                  <FaEdit /> Editar
                </button>
                <button className="eliminar-btn"><FaTrashAlt /> Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalForm
          usuario={usuarioActual}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

export default UsuariosTable;
