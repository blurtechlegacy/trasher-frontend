import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GeolocatedProps, geolocated } from 'react-geolocated';

const points: object[] = [];

const AdminPanel = (props: GeolocatedProps) => {
  return (
    <div style={{width: "100%", height: 500}}>
      { props.coords && process.env.REACT_APP_API_KEY &&
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_KEY,
        }}
        center={{
          lat: props.coords.latitude,
          lng: props.coords.longitude,
        }}
        zoom={20}
      >
        {points.map(point => (
          <div />
        ))}
      </GoogleMapReact>}
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(AdminPanel);

export { AdminPanel };