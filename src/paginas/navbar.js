import React, { Component } from 'react';

import'../index.css';


class Navbar extends Component {
  state = {
    menuToggle: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuToggle: !prevState.menuToggle
    }));
  };

  render() {
    const { menuToggle } = this.state;

    return (
      <div className='body-home'>
      <nav id="navbar" className={menuToggle ? 'active' : ''}>
        <div className="nav-wrapper">
          {/* Navbar Logo */}
          <div className="logo">
            {/* Logo Placeholder for Illustration */}
            <a href="home">
              <i className="fas fa-chess-knight"></i> TSAKIN
            </a>
          </div>

          {/* Navbar Links */}
          <ul id="menu">
            <li><a href="home">Home</a></li>
            <li><a href="about">About</a></li>
            <li><a href="Contact">Contact</a></li>
            <li><a href="Login">Login</a></li>
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
