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
        <button className="neumorphic ">
          <i className="fa fa-comments"></i>
          <span> <Link to="/chat">chat con psicologo IA</Link></span>
        </button>
        <button className="neumorphic">
          <i className="fa fa-map-marker"></i>
          <span>
        <Link to="/Maps">Encuentra Ayuda</Link>
      </span>
        </button>
        <button className="neumorphic">
          <i className="fa fa-puzzle-piece"></i>
          <span>
        <Link to="/Contenido">Contenido didactico</Link>
      </span>
          
        </button>
      
    <Link to="/Agenda">
        <button className="neumorphic">
      <i className="fa fa-calendar" aria-hidden="true"></i>
      <span>
        <Link to="/Agenda">Tu agenda Personal</Link>
      </span>
    </button>
    </Link>
        <Link to="/Meds">
        <button className="neumorphic">
      <i className="fa fa-medkit"></i>
      <span>
        <Link to="/Meds">Conoce tus Medicamentos</Link>
      </span>
    </button>
    </Link>
        <Link to="/Foro">
        <button className="neumorphic">
        <i class="fa fa-users" aria-hidden="true"></i>
      <span>
        <Link to="/Foro">Comunidades De Reddit</Link>
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