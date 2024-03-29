import React, { Component } from 'react';
import '../index.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
      userName: localStorage.getItem('userName') || '',
    };
  }
  

  logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userName'); // Eliminar el nombre del usuario de localStorage
    this.setState({ isAuthenticated: false, userName: '' });
    // Aquí también puedes redireccionar al usuario a la página de inicio o de login
  };

 

  toggleMenu = () => {
    this.setState(prevState => ({
      menuToggle: !prevState.menuToggle
    }));
  };

  render() {
    const { menuToggle } = this.state;
    const { isAuthenticated, userName } = this.state;

    return (
      <div className='body-home'>
        <nav id="navbar" className={menuToggle ? 'active' : ''}>
          <div className="nav-wrapper">
            {/* Navbar Logo */}
            <div className="logo">
              <a className='a-home' href="/home">
                <i className="fas fa-chess-knight"></i> TSAKIN
              </a>
            </div>

            {/* Navbar Links */}
            <ul id="menu">
              <li><a href="/home">Inicio</a></li>
              <li><a href="/about">Sobre Nosotros</a></li>
              <li><a href="/contact">Contáctanos</a></li>
              {!isAuthenticated && <li><a href="/login">Inicio De Sesión</a></li>}
          {isAuthenticated && (
            <>
             
              <li><a onClick={this.logout}>Cerrar Sesión</a></li>

              <li> Bienvenido {userName}</li> {/* Muestra el nombre del usuario */}
            </>
          )}
              
            </ul>

          
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
             
                <li><a href="/login">Login</a></li>
              
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
