import React from 'react';
import './body.css';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    
    <div className='body-home'>
         <br></br>
         <br></br>
      <h1 className='h1-body'>Hola! ¿Como podemos ayudarte hoy?</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className="buttons">
        <button className="neumorphic active">
          <i className="fa-light fa-fire"></i>
          <span> <Link to="/chat">chat con psicologo IA</Link></span>
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
        <Link to="/Tests">
        <button className="neumorphic">
      <i className="fa-light fa-disease"></i>
      <span>
        <Link to="/Tests">Tests Psicológicos</Link>
      </span>
    </button>
    </Link>
        <button className="neumorphic">
          <i className="fa-light fa-seedling"></i>
          <span>Mi Agenda</span>
        </button>
        <Link to="/Meds">
        <button className="neumorphic">
      <i className="fa-light fa-disease"></i>
      <span>
        <Link to="/Meds">Conoce tus Medicamentos</Link>
      </span>
    </button>
    </Link>
        <Link to="/Foro">
        <button className="neumorphic">
      <i className="fa-light fa-disease"></i>
      <span>
        <Link to="/Foro">Foros</Link>
      </span>
    </button>
    </Link>
    <Link to="/Diario">
        <button className="neumorphic">
      <i className="fa-light fa-disease"></i>
      <span>
        <Link to="/Diario"> Tu Diario Personal</Link>
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
