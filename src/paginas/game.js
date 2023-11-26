import React from 'react';

const TwineGame = ({ games }) => {
  return (
    <div>
      <h1>Juegos:</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {games.map((game, index) => (
          <iframe
            key={index}
            title={`Twine Game ${index}`}
            frameBorder="0"
            src={game.src}
            width={game.width}
            height={game.height}
            style={{ width: '45%', height: '300px', marginBottom: '20px' }}
          />
        ))}
      </div>
    </div>
  );
};

const Contenidos = () => {
  const games = [
    {
      src: 'https://itch.io/embed/2387542?link_color=ffffff',
      width: '552',
      height: '167',
    },
    {
      src: 'https://itch.io/embed/273806?link_color=000000',
      width: '552',
      height: '167',
    },
  ];

  return <TwineGame games={games} />;
};

export default Contenidos;
