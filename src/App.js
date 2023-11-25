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

const Content = () => {
  return (
    <div className="content">
      <Navbar />
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Body />
      <br></br>
      <br></br>
      <br></br>
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
          <Route path="/about" element={
            <>
              <Navbar />
              <Header />
              <AboutUs />
            </>
          } />
          <Route path="/Foro" element={
            <>
              <Navbar />
              <Header />
              <RedditPosts />
            </>
          } />

          {/* Ruta de login sin Navbar, Header ni Footer */}
          <Route path="/login" element={<Login />} />

          {/* Agrega más rutas aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
