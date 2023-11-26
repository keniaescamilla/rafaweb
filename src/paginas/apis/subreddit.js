import React, { useState, useEffect } from 'react';
import './reddit.css'; // Asegúrate de tener un archivo CSS asociado

const RedditPosts = () => {
  const subreddit = 'psychology'; // Reemplaza 'nombre_del_subreddit' con el nombre del subreddit que desees
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.children);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [subreddit]);

  return (
    <div className="reddit-posts">
      <h1>Posts de r/{subreddit}</h1>
      <ul className="post-list">
        {posts.map((post, index) => (
          <li key={index} className="post-item">
            <a href={post.data.url} className="post-link">{post.data.title}</a> por <span className="post-author">{post.data.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedditPosts;