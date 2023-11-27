import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const initMap = () => {
      try{
      if (window.google && window.google.maps) {
        const myLatLng = { lat: -34.397, lng: 150.644 };
        const mapOptions = {
          zoom: 8,
          center: myLatLng,
          // Puedes agregar opciones de estilo aquí
        };

        const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

        const marker = new window.google.maps.Marker({
          position: myLatLng,
          map: map,
          title: "Hello World!",
        });
      } else {
        console.error("Google Maps API no está cargada correctamente.");
      }}
      catch(error){
        console.log("Error en la funcion initMap ", error)
      }
    };

    // Cargar el script de Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfgYYdDU6WlBQdCcFcRbsAbriVS2AsbcA&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Error al cargar el script de Google Maps API.");
    };
    script.onload = () => {
      initMap();
    };

    document.body.appendChild(script);

    // Limpiar el script al desmontar el componente
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