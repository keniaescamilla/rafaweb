import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoogleBooks.css'; // Importa tu archivo de estilos CSS

const GoogleBooksAPI = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const YOUR_API_KEY = 'AIzaSyDK42eoXbmLqhdfS3sU9_P84zaquYXOO0U'; 
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:autoayuda&key=${YOUR_API_KEY}`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Libros de autoayuda en Google Books</h1>
      <div className="book-list">
        {books
          .filter(book => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail)
          .map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.volumeInfo.title}</h3>
              <div>
              <img
                className='img-libro'
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="Miniatura del libro"
                className="thumbnail"
              />
              </div>
              <div className='libro-card'>
              <p className='p-libros'>Autores: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No disponible'}</p>
            <p className='p-libros'>Código de barras: {book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : 'No disponible'}</p>
            <p className='p-libros' >Categorías: {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'No disponible'}</p>
            <p className='p-libros'>Link de vista previa: <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Ver vista previa</a></p>
            <p className='p-libros'>Precio: {book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'No disponible'}</p>
            <p className='p-libros'>Enlace: <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">Ver en Google Books</a></p>
            </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GoogleBooksAPI;
