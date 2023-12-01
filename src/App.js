import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './paginas/navbar';
import Footer from './paginas/footer';
import Body from './paginas/body';
import Header from './paginas/header';
import HeroEffects from './paginas/header';
import QuotesContainer from './paginas/apis/frasesinsp';
import RedditPosts from './paginas/apis/subreddit';
import AboutUs from '../src/paginas/about';
import Login from './paginas/loginpag/login';
import Contacto from './paginas/apis/contactanos';
import Tests from './paginas/apis/tests';
import Contenidos from './paginas/game';
import TusMedicamentos from './paginas/apis/medicamentosbd';
import InternetArchive from './paginas/apis/libros';
import YouTubeVideo from './paginas/apis/videos';
import DiarioForm from './paginas/apis/diario';
import DiarioList from './paginas/apis/obtenerdiario';
import ContactUs from './paginas/apis/contactanos';
import Chat from './paginas/chat/chat'
import MapaInterfaz from './paginas/apis/mapainterfaz';
import Registro from './paginas/loginpag/registro';
import ComponenteCalendario from './paginas/apis/ComponenteCalendar';
import Rutinas from './paginas/apis/Rutinas';
import Mapita from './paginas/apis/Mapita';



const Content = () => {
  return (
    <div >
      <Navbar />
      <Body />
      <QuotesContainer />
      <Footer />
    </div>
  );
};

const App = () => {
  
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/home" element={
          <>
          <HeroEffects />
          <Content/>
          
          </>
          } />
          <Route path="/Maps" element={
          <>
          <Navbar />
          <br></br>
          <br></br>
          <br></br>
          {/* <HeaderMaps/> */}
          {/* <MapaInterfaz/> */}
          <MapaInterfaz/>
          <Footer />
          </>
          } />
          <Route path="/Contenido" element={
          <>
          <div className="body-foro">
          <Navbar />
        
        <h1>Contenido didactico</h1>
          <YouTubeVideo />
          <br></br>
          <br></br>
          <br></br>
          <Contenidos/>
          <br></br>
          <br></br>
          <br></br>
          <InternetArchive />
          <br></br><br></br><br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Footer />
          </div>
          </>

          } />
          <Route path="/Meds" element={
          <>
          <Navbar />
          <br></br>
          <br></br>
          <br></br>
          <TusMedicamentos />
          <Footer />
          </>
          } />
          <Route path="/Tests" element={
          <>
        
          <HeroEffects />
          <Tests />
          <Footer />
          
          </>
          } />
          <Route path="/Contact" element={
          
          <>
          <Navbar />
<br></br>
<br></br>
<br></br>
          <h1>Envianos tu comentario</h1>
          
          <ContactUs/>
          <Footer />
          </>
          } />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <Header />
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
          path="/Diario"
          element={
            <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <DiarioForm/>
      <DiarioList />
            </>
          }
          />
          <Route
            path="/Foro"
            element={
              
            <>
                <Navbar />
                <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                <RedditPosts />
                <Footer />
              </>
            }
          />

          {/* Ruta de login sin Navbar, Header ni Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Agenda" element={
          <>
          <Navbar />
          <br></br>
          <br></br>
          <br></br>
          <ComponenteCalendario />
          <Footer />
          </>
          } />

          <Route path="/chat" element={<>
            <Navbar />
            <Header />
            <Chat />
          </>} />

          

          {/* Agrega más rutas aquí */}
        </Routes>
      
    </div>
  </Router>
);
};

export default App;
