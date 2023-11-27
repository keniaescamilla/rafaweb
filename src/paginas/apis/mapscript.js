import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      try {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 8,
            center: { lat: 21.154122, lng: -86.8386295},
          });

          const marker = new window.google.maps.Marker({
            position: { lat: 21.154122, lng: -86.8386295 },
            map: map,
            title: "Hello World!",
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          });

          // Agregar el cuadro de búsqueda
          const input = searchInputRef.current;
          const searchBox = new window.google.maps.places.SearchBox(input);

          map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
          });

          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
              return;
            }

            const bounds = new window.google.maps.LatLngBounds();
            places.forEach((place) => {
              if (place.geometry && place.geometry.location) {
                bounds.extend(place.geometry.location);
              }
            });

            map.fitBounds(bounds);

            const firstPlace = places[0];
            const newLocation = firstPlace.geometry.location;
            marker.setPosition(newLocation);
            map.setCenter(newLocation);
          });


          markerRef.current = marker;
        } else {
          console.error("Google Maps API no está cargada correctamente.");
        }
      } catch (error) {
        console.log("Error en la función initMap ", error);
      }
    };


    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpxqx49qpfduYShktgqPZtti8cHpubI2s&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Error al cargar el script de Google Maps API.");
    };
    script.onload = () => {
      initMap();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Buscar ubicación"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MapComponent;