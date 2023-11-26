import React, { useState, useEffect } from 'react';

const StickerComponent = () => {
  const [stickerUrl, setStickerUrl] = useState('');

  useEffect(() => {
    const apiKey = '93utWC0g0hcI8SwLPKEwUWXU0nk5oAA0';
    const endpoint = `https://api.giphy.com/v1/stickers/random?api_key=${apiKey}&tag=&rating=g`;

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.data.image_url;
        setStickerUrl(imageUrl);
      })
      .catch(error => {
        console.error('Error al obtener el sticker:', error);
      });
  }, []);

  return (
    <div>
      <h1>Sticker animado</h1>
      {stickerUrl && <img src={stickerUrl} alt="Sticker animado" />}
    </div>
  );
};

export default StickerComponent;
