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

  const translateText = async (text) => {
    const apiKey = 'AIzaSyDK42eoXbmLqhdfS3sU9_P84zaquYXOO0U'; 
    const sourceLang = 'en'; 
    const targetLang = 'es'; 

    try {
      const translationResponse = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURI(
          text
        )}&source=${sourceLang}&target=${targetLang}`,
        {
          method: 'POST',
        }
      );
      const translationData = await translationResponse.json();
      return translationData.data.translations[0].translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text;
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const translatedText = await translateText(quotes[randomIndex].text);
        setCurrentQuote({ ...quotes[randomIndex], text: translatedText });
      }
    }, 1000000); 

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="quotes-container">
      {currentQuote && <QuoteCard text={currentQuote.text} author={currentQuote.author} />}
    </div>
  );
};

export default QuotesContainer;
