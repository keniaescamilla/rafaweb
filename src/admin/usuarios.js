import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from './modalForm'; // Para agregar nuevos usuarios
import EditModalForm from './editarModal'; // Para editar usuarios
import './usuarios.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmDeleteModal from './deleteModal';

function UsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEliminarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/${usuarioSeleccionado.id_usuario}`);
      setShowDeleteModal(false);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
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
    setUsuarioSeleccionado(null);
    setShowModal(true);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleFormSubmit = async (usuarioData) => {
    try {
      if (usuarioSeleccionado) {
        await axios.put(`http://localhost:3001/usuarios/${usuarioSeleccionado.id_usuario}`, usuarioData);
      } else {
        await axios.post('http://localhost:3001/usuarios/', usuarioData);
      }
      handleModalClose();
      fetchUsuarios();
    } catch (error) {
      console.error('Error al procesar el formulario', error);
    }
  };

  return (
    <>
    <div className='contPrincipal'>
    <h1 className='tituloTabla'>Lista de Usuarios</h1>
      <button className="agregar-usuario-btn" onClick={handleAgregarUsuario}>Agregar Nuevo Usuario</button>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Password</th>
            <th className='tituloAcciones'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id_usuario}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.password}</td>
              <td className='acciones'>
                <button className="editar-btn" onClick={() => handleEditarUsuario(usuario)}><FaEdit /> Editar</button>
                <button className="eliminar-btn" onClick={() => handleEliminarUsuario(usuario)}>
          <FaTrashAlt /> Eliminar
        </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalForm
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
      {showEditModal && (
        <EditModalForm
          usuario={usuarioSeleccionado}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          usuario={usuarioSeleccionado}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
     
    </>
  );
}

export default UsuariosTable;
