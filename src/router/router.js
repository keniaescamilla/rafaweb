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
import ComponenteCalendario from '../paginas/apis/ComponenteCalendar';

import Chetos from '../paginas/chat/chetos'

function RouterComponent() {

  const isLoggedIn = false; 

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
            
          
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/Home">
         
          {isLoggedIn ? <Redirect to="/Home" /> : <Body />}
        </Route>

        <Route exact path="/about">
          
          {isLoggedIn ? <AboutUs /> : <Redirect to="/about" />}
        </Route>
        <Route exact path="/Foro">
         
          {isLoggedIn ? <RedditPosts /> : <Redirect to="/Foro" />}
        </Route>
        <Route exact path="/chat">
        
          {isLoggedIn ? <Chat /> : <Redirect to="/chat" />}
        </Route>
        <Route exact path="/Maps">
       
          {isLoggedIn ? < MapaInterfaz/> : <Redirect to="/Maps" />}
        </Route>
        <Route exact path="/Contenidos">
         
          {isLoggedIn ? <Contenidos /> : <Redirect to="/Contenidos" />}
        </Route>
        <Route exact path="/Meds">
          
          {isLoggedIn ? <TusMedicamentos /> : <Redirect to="/Meds" />}
        </Route>
        <Route exact path="/Tests">
          
          {isLoggedIn ? <Tests /> : <Redirect to="/Tests" />}
        </Route>
        <Route exact path="/Diario">
          
          {isLoggedIn ? <DiarioForm /> : <Redirect to="/Diario" />}
        </Route>
        <Route exact path="/Contact">
         
          {isLoggedIn ? <ContactUs/> : <Redirect to="/Contact" />}
        </Route>
        <Route exact path="/Agenda">
          
          {isLoggedIn ? <ComponenteCalendario/> : <Redirect to="/Agenda" />}
        </Route>
        
        <Route exact path="/chetos">
          
          {isLoggedIn ? <Chetos /> : <Redirect to="/chetos" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
