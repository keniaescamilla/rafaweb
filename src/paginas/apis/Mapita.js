import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const center = {
  lat: 21.0495167,
  lng: -86.8494987
};

const containerStyle = {
  width: '100%', 
  height: '139%'
};

const MapaF = ({ googleMapsApiKey }) => {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapLoad = map => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '10000',
      type: ['psicologo'] 
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onMapLoad}
      >
        {places.map(place => (
          <Marker 
            key={place.place_id}
            position={place.geometry.location}
            onClick={() => setSelected(place)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={selected.geometry.location}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2 className="font-semibold">{selected.name}</h2>
              <p>{selected.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MapaF);


