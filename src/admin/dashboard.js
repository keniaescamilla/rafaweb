import React, { Component } from 'react';
import './index.css';
import './dashboard.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false,
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
      userName: localStorage.getItem('userName') || ''
    };
  }

  logout = () => {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
    this.setState({ isAuthenticated: false, userName: '' });
    window.location.href = '/login'; // Asegúrate de que esta ruta es correcta
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuToggle: !prevState.menuToggle
    }), () => {
      // Asumiendo que tienes un método para actualizar la clase en el nav-wrapper
      if (this.state.menuToggle) {
        document.querySelector('.nav-wrapper').classList.add('sidebar-hidden');
      } else {
        document.querySelector('.nav-wrapper').classList.remove('sidebar-hidden');
      }
    });
  };
  
  render() {
    const { menuToggle, isAuthenticated, userName } = this.state;

    return (
      <>


<div className='body-home'>
<div className="sidebar">
  <a href="/tabla" className='opciones'>Usuarios</a>
</div>


        <nav id="navbar" className={menuToggle ? 'active' : ''}>
          <div className="nav-wrapper">
            {/* Navbar Logo */}
            <div className="logo">
              <a className='a-home' href="/home"> {/* Asegúrate de que esta ruta es correcta */}
                <i className="fas fa-chess-knight"></i> TSAKIN
              </a>
            </div>

            {/* Navbar Links */}
            <ul id="menu">
              <li><a href="/home">Inicio</a></li>
              <li><a href="/about">Sobre Nosotros</a></li>
              <li><a href="/contact">Contáctanos</a></li>
              {!isAuthenticated && (
                <li><a href="/login">Inicio De Sesión</a></li>
              )}
            </ul>

            {/* Sección de bienvenida y botón de cerrar sesión */}
            {isAuthenticated && (
              <ul className="navbar-right">
                <li className="welcome-text">Bienvenido {userName}</li>
                <li><button onClick={this.logout} className="logout-button">Cerrar Sesión</button></li>
              </ul>
            )}
          </div>

          {/* Menu Icon */}
          <div className="menuIcon" onClick={this.toggleMenu}>
            <span className="icon icon-bars"></span>
            <span className="icon icon-bars overlay"></span>
          </div>

          {/* Overlay Menu */}
          <div className={`overlay-menu ${menuToggle ? 'open' : ''}`}>
            <ul id="menu">
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              {!isAuthenticated && (
                <li><a href="/login">Login</a></li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      
      </>
     
    );
  };
}

export default Navbar;

