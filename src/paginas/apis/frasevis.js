// Quote.js
import React from 'react';
import './quotes.css';

const Quote = ({ text, author }) => {
  return (
  
      <p className="quote-text">"{text}"</p>
      <p className="quote-author">- {author}</p>

  );
};

export default Quote;