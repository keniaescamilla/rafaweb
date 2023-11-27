import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Body from '../paginas/body';
import AboutUs from '../paginas/about';
import RedditPosts from '../paginas/apis/subreddit';
import Chat from '../paginas/chat/chat'


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
      
      </Switch>
    </Router>
  );
}

export default RouterComponent;
