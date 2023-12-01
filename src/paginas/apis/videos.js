import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../game.css';

const YouTubeVideo = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            key: 'AIzaSyDK42eoXbmLqhdfS3sU9_P84zaquYXOO0U', 
            q: 'psicologia', 
            maxResults: 3,
            type: 'video',
            order: 'date', 
          }
        }
      );

      const { items } = response.data;
      if (items.length > 0) {
        setVideos(items);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input className='input-meds'
          type="text"
          placeholder="busca videos de psicologia"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='boton'type="submit">Search</button>
      </form>
      <br />
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <YouTube videoId={video.id.videoId} opts={opts} />
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideo;
