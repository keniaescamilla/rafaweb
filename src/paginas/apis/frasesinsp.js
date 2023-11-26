import React, { useState, useEffect } from 'react';
import './quotes.css';


const QuoteCard = ({ text, author }) => {
  return (
    <div className="quote-card">
      <div className="quote-content">
        <p className="quote-text">"{text}"</p>
        <p className="quote-author">- {author || 'Unknown'}</p>
      </div>
    </div>
  );
};

const QuotesContainer = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
      }
    }, 10000); // Cambiar la cita cada 100 segundos

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="quotes-container">
      {currentQuote && <QuoteCard text={currentQuote.text} author={currentQuote.author} />}
      
    </div>
    
  );
};

export default QuotesContainer;
