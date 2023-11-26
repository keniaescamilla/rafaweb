import React from 'react';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './paginas/navbar';
import Footer from './paginas/footer';
import Body from './paginas/body';
import Header from './paginas/header';
import QuotesContainer from './paginas/apis/frasesinsp';
import RedditPosts from './paginas/apis/subreddit';
import AboutUs from '../src/paginas/about';
import Login from './paginas/loginpag/login';
import MapComponent from './paginas/apis/mapscript';
import Tests from './paginas/apis/tests';
import Contenidos from './paginas/game';
import TusMedicamentos from './paginas/apis/medicamentosbd';
import Loader from './paginas/loader';
import InternetArchive from './paginas/apis/libros';
import YouTubeVideo from './paginas/apis/videos';
import DiarioForm from './paginas/apis/diario';
import DiarioList from './paginas/apis/obtenerdiario';


const Content = () => {
  return (
    <div className="content">
      <Navbar />
      <Header />
    
      <Body />
    
      <QuotesContainer />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga (puedes realizar una lógica de carga real aquí)
    setTimeout(() => {
      setLoading(false); // Cambia el estado para ocultar el loader
    }, 2000); // Tiempo de simulación de carga (2 segundos)
  }, []);
  return (
    <Router>
    <div className="App">
      {loading ? ( // Muestra el loader si está cargando
        <Loader />
      ) : (
        <Routes>
          <Route path="/Home" element={<Content/>} />
          <Route path="/Maps" element={<MapComponent />} />
          <Route path="/Contenido" element={
          <>
          <Navbar />
        <h1>Contenido didactico</h1>
          <YouTubeVideo />
          <Contenidos/>
          <InternetArchive />
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

          {/* Agrega más rutas aquí */}
        </Routes>
      )}
    </div>
  </Router>
);
};

export default App;
