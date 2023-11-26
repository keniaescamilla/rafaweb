import React from 'react';
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
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Content />} />
          <Route path="/Maps" element={<MapComponent />} />
          <Route path="/Contenido" element={<Contenidos />} />
          <Route path="/Meds" element={<TusMedicamentos />} />
          <Route path="/Tests" element={<Tests />} />
          <Route path="/about" element={
            <>
              <Navbar />
              <Header />
              <AboutUs />
              <Footer />
              
            </>
          } />
          <Route path="/Foro" element={
            <>
              <Navbar />
              <Header />
              <RedditPosts />
                 <Footer />
            </>
          } />

          {/* Ruta de login sin Navbar, Header ni Footer */}
          <Route path="/login" element={<Login />} />

          {/* Agrega más rutas aquí */}
        </Routes>
     
      </div>
    </Router>
  );
};

export default App;
