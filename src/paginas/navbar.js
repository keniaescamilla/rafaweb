import React, { Component } from 'react';

import'../index.css';


class Navbar extends Component {
  state = {
    menuToggle: false,
    isAuthenticated: false,
    userName: ''
  };


  componentDidMount() {
    const userId = localStorage.getItem('usuarioId');
    const userName = localStorage.getItem('userName');
    if (userId && userName) {
      this.setState({
        isAuthenticated: true,
        userName: 'Usuario' 
      });
    }
  }
  
  logout = () => {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('userName');
    this.setState({ isAuthenticated: false, userName: '' });
    window.location.href = '#login';
  };
  




  toggleMenu = () => {
    this.setState(prevState => ({
      menuToggle: !prevState.menuToggle
    }));
  };

  render() {
    const { menuToggle, isAuthenticated, userName } = this.state;

    return (
      <div className='body-home'>
      <nav id="navbar" className={menuToggle ? 'active' : ''}>
        <div className="nav-wrapper">
          {/* Navbar Logo */}
          <div className="logo">
            {/* Logo Placeholder for Illustration */}
            <a className='a-home' href="home">
              <i className="fas fa-chess-knight"></i> TSAKIN
            </a>
          </div>

          {/* Navbar Links */}
          <ul id="menu">
            <li><a href="home">Inicio</a></li>
            <li><a href="about">Sobre Nosotros</a></li>
            <li><a href="Contact">Contactanos</a></li>
            {!isAuthenticated && (
              <li><a href="Login">Inicio De Sesion</a></li>
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
            <li><a href="#home">Home</a></li>
            <li><a href = "#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#Login">Login</a></li>

          </ul>
        </div>
     
      </nav>
      </div>
    );
  }
}

export default Navbar;
