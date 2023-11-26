import React from 'react';
import './body.css';

const Loader = () => {
  return (
    <div className="preloader">
      {/* Aquí va la estructura HTML de tu loader */}
      <svg version="1.1" id="sun" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" enableBackground="new 0 0 10 10" xmlSpace="preserve">
        {/* ...otros elementos SVG y HTML de tu loader */}
      </svg>
      {/* ...más elementos de tu loader */}
    </div>
  );
};

export default Loader;
