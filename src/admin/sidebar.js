import React from 'react';
import './sidebar.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta y tenga este nombre

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="menu-item">
                <i className="icon-home">🏠</i> {/* Reemplaza con el icono deseado */}
                <span>Inicio</span>
            </div>
            <div className="menu-item">
                <i className="icon-users">👥</i> {/* Reemplaza con el icono deseado */}
                <span>Usuarios</span>
            </div>
        </div>
    );
};

export default Sidebar;
