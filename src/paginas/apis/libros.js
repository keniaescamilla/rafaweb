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
        setBooks(response.data.response.docs.slice(0, 5)); // Muestra solo los primeros 5 libros
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <h1>Libros de autoayuda en Internet Archive</h1>
      <div className='card'>
        <ul className='ul-libro'>
          {books.map((book, index) => (
            <li key={index}>
              <p className='p-libro'>{book.title}</p>
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                Ver en Internet Archive
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InternetArchive;
