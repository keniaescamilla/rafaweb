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
import MapComponent from './paginas/apis/mapscript';
import Tests from './paginas/apis/tests';
import Contenidos from './paginas/game';
import TusMedicamentos from './paginas/apis/medicamentosbd';
import InternetArchive from './paginas/apis/libros';
import YouTubeVideo from './paginas/apis/videos';
import DiarioForm from './paginas/apis/diario';
import DiarioList from './paginas/apis/obtenerdiario';
import Chat from './paginas/chat/chat'


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
          <Route path="/Home" element={
          <>
          <HeroEffects />
          <Content/>
          
          </>
          } />
          <Route path="/Maps" element={<MapComponent />} />
          <Route path="/Contenido" element={
          <>
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
          </>
          } />
          <Route path="/Meds" element={<TusMedicamentos />} />
          <Route path="/Tests" element={<Tests />} />
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
                <Header />
                <RedditPosts />
                <Footer />
              </>
            }
          />

          {/* Ruta de login sin Navbar, Header ni Footer */}
          <Route path="/login" element={<Login />} />


          <Route path="/chat" element={<Chat />} />

          {/* Agrega más rutas aquí */}
        </Routes>
      
    </div>
  </Router>
);
};

export default App;
