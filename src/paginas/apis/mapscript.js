import React, { useEffect } from 'react';

const MapComponent = () => {
  let map;

  useEffect(() => {
    const initMap = () => {
      const myLatLng = { lat: -34.397, lng: 150.644 };
      const mapOptions = {
        zoom: 8,
        center: myLatLng,
      };
      
      map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
      
      const marker = new window.google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Hello World!",
      });
    };

    // Cargar el script de Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfgYYdDU6WlBQdCcFcRbsAbriVS2AsbcA&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>
      {/* Aquí se renderizará el mapa */}
    </div>
  );
};

export default MapComponent;
