import React, { FC, useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Message from './Message';
import Geocode from 'react-geocode';
import SpinningGlobe from './SpinningGlobe';

interface MapProps {
  location: string;
}

const DachshundMap: FC<MapProps> = ({ location }) => {
  const [, setNoLocation] = useState(false);
  const [latLng, setLatLng] = useState({}) as any;
  const containerStyle = {
    height: '500px',
    width: '100%',
  };

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);

  // set response language. Defaults to english.
  Geocode.setLanguage('en');

  Geocode.setRegion('en');

  // Enable or disable logs. Its optional.
  // Geocode.enableDebug();

  // Get latitude & longitude from address.
  useEffect(() => {
    location &&
      Geocode.fromAddress(location).then(
        (response: any) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatLng({ lat, lng });
        },
        () => {
          setNoLocation(true);
        }
      );
  }, [location]);

  return loadError ? (
    <Message variant='danger'>{loadError}</Message>
  ) : isLoaded && Object.keys(latLng).length > 0 ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={7}
      center={{
        lat: latLng.lat,
        lng: latLng.lng,
      }}
    >
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: latLng.lat,
            lng: latLng.lng,
          })
        }
      />
    </GoogleMap>
  ) : (
    <SpinningGlobe />
  );
};

export default DachshundMap;
