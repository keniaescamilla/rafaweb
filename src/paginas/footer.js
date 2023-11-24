import React from 'react';
import '../index.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 Mi Sitio Web</p>
        <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
