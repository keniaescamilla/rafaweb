import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './paginas/navbar';
import Footer from './paginas/footer';
import Body from './paginas/body';
import Header from './paginas/header';
import QuotesContainer from './paginas/apis/frasesinsp';
import RedditPosts from './paginas/apis/subreddit';
import AboutUs from '../src/paginas/about';
// import  BotpressChat from './paginas/apis/chatbot';

const Content = () => {
  return (
    <div className="content">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Body />
      <br></br>
      <br></br>
      <br></br>
      <QuotesContainer />
      {/* < BotpressChat/> */}
      {/* <AboutUs /> */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <Routes>
          <Route path="/Home" element={<Content />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/Foro" element={<RedditPosts />} />
          {/* Agrega más rutas aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
