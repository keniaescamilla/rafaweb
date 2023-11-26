import React, { useEffect } from 'react';
import './HeroEffects.css'; // Archivo CSS para los estilos

const HeroEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const Num = window.scrollY / 500;
      const Num2 = window.scrollY * 0.0004; // higher number for more zoom
      const Num2mod = Num2 + 1;
      const Num3 = window.scrollY * 0.2; // Title speed
      const Num3mod = Num3 + 1;

      document.querySelector('.shade').style.opacity = Num;
      document.querySelector('.bg').style.transform = `scale(${Num2mod})`;
      document.querySelector('.text').style.marginTop = `-${Num3mod}px`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='heroEffects'>
      <div className="bg">
        <div className="arrow bouncy">
          <svg height="25" width="50">
            <polygon points="0,0 25,10 50,0 25,25" fill="rgba(255,255,255,.5)" strokeWidth="0" stroke="rgba(255,255,255,.3)"/>
          </svg>
        </div>
        <div className="title centerV">
          <div>
            <div className="text">
              <h1>Bienvenido a Tsakin!</h1>
              <p>"Porque cada mente importa, estamos aquí."</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shade"></div>
    </div>
  );
};

export default HeroEffects;
