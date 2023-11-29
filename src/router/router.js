import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Body from '../paginas/body';
import AboutUs from '../paginas/about';
import RedditPosts from '../paginas/apis/subreddit';
import Login from '../paginas/loginpag';
import Contenidos from '../paginas/game';
import TusMedicamentos from '../paginas/apis/medicamentosbd';
import Tests from '../paginas/apis/tests';
import DiarioForm from '../paginas/apis/diario';
import ContactUs from '../paginas/apis/contactanos';
import Chat from '../paginas/chat/chat'
import MapaInterfaz from '../paginas/apis/mapainterfaz';


function RouterComponent() {
  // Simula el estado de inicio de sesión
  const isLoggedIn = false; // Cambia esto según tu lógica de inicio de sesión

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              
              <Link to="/Home">Pagina de Inicio</Link>
            </li>
            <li>
              <Link to="/about">Sobre nosotros</Link>
            </li>
            <li>
              
              <Link to="/Foro">Comunidad</Link>
            </li>
            <li>
              
              <Link to="/Mapa">Encuentra centros de ayuda cerca de ti</Link>
            </li>
            <li>
              
              <Link to="/Login">registrate o inicia sesion</Link>
            </li>
            <li>
              
              <Link to="/Tests">Test Psicológicos</Link>
            </li>
            <li>
              
              <Link to="/Diario">diario personal</Link>
            </li>
            <li>
              
              <Link to="/Contac">Contactanos</Link>
            </li>
            
          
            {/* Otros enlaces de navegación que desees agregar */}
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/Home">
          {/* Página de inicio de sesión */}
          {isLoggedIn ? <Redirect to="/Home" /> : <Body />}
        </Route>

        <Route exact path="/about">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <AboutUs /> : <Redirect to="/about" />}
        </Route>
        <Route exact path="/Foro">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <RedditPosts /> : <Redirect to="/Foro" />}
        </Route>
        <Route exact path="/chat">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <Chat /> : <Redirect to="/chat" />}
        </Route>
        <Route exact path="/Maps">
          {/* Página de MedicationTable */}
          {isLoggedIn ? < MapaInterfaz/> : <Redirect to="/Maps" />}
        </Route>
        <Route exact path="/Contenidos">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <Contenidos /> : <Redirect to="/Contenidos" />}
        </Route>
        <Route exact path="/Meds">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <TusMedicamentos /> : <Redirect to="/Meds" />}
        </Route>
        <Route exact path="/Tests">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <Tests /> : <Redirect to="/Tests" />}
        </Route>
        <Route exact path="/Diario">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <DiarioForm /> : <Redirect to="/Diario" />}
        </Route>
        <Route exact path="/Contact">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <ContactUs/> : <Redirect to="/Contact" />}
        </Route>
        
        {/* Otras rutas de tu aplicación */}
      
      </Switch>
    </Router>
  );
}

export default RouterComponent;
