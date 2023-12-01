import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './libros.css';

const InternetArchive = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://archive.org/advancedsearch.php?q=subject:autoayuda&output=json'
        );
        setBooks(response.data.response.docs.slice(0, 20)); // Muestra los primeros 20 libros
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Libros de autoayuda en Internet Archive</h1>
      <div className="card-container">
        {books.map((book, index) => (
          <div key={index} className="card">
            <h3>{book.title}</h3>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              Ver en Internet Archive
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternetArchive;
