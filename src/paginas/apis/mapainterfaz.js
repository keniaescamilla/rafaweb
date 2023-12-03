import React, { useEffect, useRef, useState } from 'react';
import './maps.css';

const MapaInterfaz = () => {
  const mapRef = useRef(null);
  const searchInputRef = useRef();
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [searchPsychologistsNearby, setSearchPsychologistsNearby] = useState(true);

  
  const initMap = () => {
    let placesService;

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

        // Limpiar marcadores anteriores
        markersRef.current.forEach((marker) => {
          marker.setMap(null);
        });
        markersRef.current = [];

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
        setPlaces(places);

        // Crear nuevos marcadores
        placesService = new window.google.maps.places.PlacesService(map);
        places.forEach((place) => {
          placesService.getDetails(
            { placeId: place.place_id },
            (result, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const marker = new window.google.maps.Marker({
                  position: result.geometry.location,
                  map: map,
                  title: result.name,
                });
                markersRef.current.push(marker);

                marker.addListener('click', () => {
                  const content = `<strong>${result.name}</strong><br>${result.formatted_address}`;
                  showInfoWindow(marker, content);
                });
              } else {
                console.error('Error al obtener detalles del lugar:', status);
              }
            }
          );
        });
      });

      // Si la opción de búsqueda de psicólogos cercanos está habilitada, realizar la búsqueda
      if (searchPsychologistsNearby) {
        searchPsychologists();
      }

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
      console.error('Google Maps API is not loaded correctly.');
    }
  };

  const searchPsychologists = () => {
    const input = searchInputRef.current;

    if (input) {
      input.value = "psicólogos"; // Establece el valor del input como "psicólogos"
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);

      // Simula un evento 'places_changed' para activar la búsqueda automáticamente
      const searchBox = new window.google.maps.places.SearchBox(input);
      const places = searchBox.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();

      if (places.length > 0) {
        places.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            bounds.extend(place.geometry.location);
          }
        });

        const map = mapRef.current;
        map.fitBounds(bounds);
        setPlaces(places);
      }
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const API_KEY = 'Tu-API-KEY'; // Reemplaza 'Tu-API-KEY' con tu clave de API de Google Maps

      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;

          script.addEventListener('load', () => {
            if (window.google && window.google.maps && window.google.maps.places) {
              resolve();
            } else {
              reject(new Error('Error loading Google Maps API.'));
            }
          });

          script.addEventListener('error', () => {
            reject(new Error('Error loading Google Maps API.'));
          });

          document.body.appendChild(script);
        }
      });
    };

    loadGoogleMapsScript()
      .then(() => {
        if (!window.initMap) {
          window.initMap = initMap; // Asignar initMap globalmente si no está definido
        }
        initMap();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const toggleSearchType = () => {
    setSearchPsychologistsNearby(!searchPsychologistsNearby);

    // Si la opción de búsqueda de psicólogos cercanos se habilita, realizar la búsqueda
    if (!searchPsychologistsNearby) {
      searchPsychologists();
    }
  };

  return (
    <div className='min-h-screen'>
      <input
        ref={searchInputRef}
        placeholder="psicólogos"
        style={{ width: '100%', marginBottom: '10px' }}
        value={"psicólogos"}
      />
      <button onClick={toggleSearchType}>
      </button>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default MapaInterfaz;
