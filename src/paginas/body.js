import React from 'react';
import './body.css';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    
    <div className='body-home'>
         <br></br>
         <br></br>
      <h1>Hola! ¿Como podemos ayudarte hoy?</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className="buttons">
        <button className="neumorphic active">
          <i className="fa-light fa-fire"></i>
          <span>chat con psicologo IA</span>
        </button>
        <button className="neumorphic">
          <i className="fa-light fa-dna"></i>
          <span>
        <Link to="/Maps">Encuentra centros de ayuda</Link>
      </span>
        </button>
        <button className="neumorphic">
          <i className="fa-light fa-chart-mixed"></i>
          <span>
        <Link to="/Contenido">Contenido didactico</Link>
      </span>
          
        </button>
        <button className="neumorphic">
          <i className="fa-light fa-atom"></i>
          <span>Tests </span>
        </button>
        <button className="neumorphic">
          <i className="fa-light fa-seedling"></i>
          <span>Mi Agenda</span>
        </button>
        <button className="neumorphic">
          <i className="fa-light fa-disease"></i>
          <span>Mis Medicamentos</span>
        </button>
        <Link to="/Foro">
        <button className="neumorphic">
      <i className="fa-light fa-disease"></i>
      <span>
        <Link to="/Foro">Foros</Link>
      </span>
    </button>
    </Link>

      </div>
   <div>
       <br></br>
      <br></br>
      <br></br>
   </div>
    </div>
  );
};

export default Body;
