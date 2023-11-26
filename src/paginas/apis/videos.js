import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const YouTubeVideo = () => {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/videos', {
            params: {
              part: 'snippet',
              key: 'AIzaSyD7QP_BkDPJ5UkrwfreeDwSUyIiiRlAZxY', 
              id: 'IqIRXf4k7JE' 
            }
          }
        );

        const { items } = response.data;
        if (items.length > 0) {
          setVideoId(items[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {videoId && <YouTube videoId={videoId} />}
    </div>
  );
};

export default YouTubeVideo;
