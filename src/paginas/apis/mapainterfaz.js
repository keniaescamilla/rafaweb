import React, { useEffect, useRef, useState } from 'react';

const MapaInterfaz = () => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const initMap = () => {
      try {
        if (window.google && window.google.maps) {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 8,
            center: { lat: 21.154122, lng: -86.8386295 },
          });

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
            setPlaces(places); // Almacena los lugares en el estado 'places'
          });

          const defaultSearch = 'psicólogo';
          input.value = defaultSearch;

          const placesService = new window.google.maps.places.PlacesService(map);
          placesService.textSearch({ query: defaultSearch }, (results, status, pagination) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPlaces(results); // Almacena los resultados en el estado 'places'
              results.forEach((place) => {
                const marker = new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                });
                markersRef.current.push(marker);
              });

              if (pagination.hasNextPage) {
                pagination.nextPage();
              }
            } else {
              console.error('Error al buscar lugares:', status);
            }
          });

          const showInfoWindow = (marker, content) => {
            if (!infoWindowRef.current) {
              infoWindowRef.current = new window.google.maps.InfoWindow();
            }
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(map, marker);
          };

          markersRef.current.forEach((marker, index) => {
            marker.addListener('click', () => {
              const place = places[index];
              const content = `<strong>${place.name}</strong><br>${place.formatted_address}`;
              showInfoWindow(marker, content);
            });
          });
        } else {
          console.error('Google Maps API no está cargada correctamente.');
        }
      } catch (error) {
        console.error('Error en la función initMap ', error);
      }
    };

    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpxqx49qpfduYShktgqPZtti8cHpubI2s&callback=initMap&libraries=places&sensor=false";

    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Error al cargar el script de Google Maps API.');
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

export default MapaInterfaz;
