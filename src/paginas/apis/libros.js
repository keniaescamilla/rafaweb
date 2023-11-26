import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './libros.css'; // Archivo CSS para los estilos

const InternetArchive = () => {
  const [data, setData] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12); // Estado para controlar el número de libros visibles

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://archive.org/advancedsearch.php?q=subject:autoayuda&output=json'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  const loadMoreBooks = () => {
    setVisibleBooks(visibleBooks + 10); 
  };

  return (
    <div className="book-container">
      <h1>Libros</h1>
      <div className="book-list">
        {data &&
          data.response &&
          data.response.docs &&
          data.response.docs.slice(0, visibleBooks).map((item, index) => (
            <div key={index} className="book-card">
              <img src="https://th.bing.com/th/id/OIP.ZlP48UINATqUGH7awm0jXAHaHa?rs=1&pid=ImgDetMain" alt={item.title} />
              <div className="book-info">
                <p className="book-title">{item.title}</p>
                <a
                  href={item.internet_archive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en Internet Archive
                </a>
              </div>
            </div>
          ))}
      </div>
      {data && data.response && data.response.docs && visibleBooks < data.response.docs.length && (
        <button onClick={loadMoreBooks}>Cargar más</button>
      )}
    </div>
  );
};

export default InternetArchive;
