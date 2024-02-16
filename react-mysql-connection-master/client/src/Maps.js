import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const Maps = ({ google }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedMode, setSelectedMode] = useState('DRIVING');
  const [directions, setDirections] = useState({
    DRIVING: null,
    BICYCLING: null,
    TRANSIT: null,
    WALKING: null
  });
  const [infoWindowVisible, setInfoWindowVisible] = useState({
    DRIVING: false,
    BICYCLING: false,
    TRANSIT: false,
    WALKING: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(location);
            fetchNearbyStores(location);
            setLoading(false);
          },
          error => {
            console.error('Error getting user location:', error);
            setLoading(false);
            setError('Error getting user location');
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
        setError('Geolocation is not supported by this browser');
      }
    };

    getUserLocation();
  }, []); 

  const fetchNearbyStores = (location) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(
      {
        location,
        radius: 5000,
        type: ['store'],
        keyword: 'sports drinks|snacks|water'
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const promises = results.slice(0, 10).map(store => {
            return new Promise((resolve, reject) => {
              service.getDetails({ placeId: store.place_id }, (result, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  resolve({
                    ...store,
                    photoUrl: result.photos && result.photos[0] ? result.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 }) : null
                  });
                } else {
                  reject(status);
                }
              });
            });
          });

          Promise.all(promises)
            .then(data => {
              setNearbyStores(data);
            })
            .catch(error => {
              console.error('Error fetching store details:', error);
              setError('Error fetching store details');
            });
        } else {
          console.error('Error fetching nearby stores:', status);
          setError('Error fetching nearby stores');
        }
      }
    );
  };

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    calculateDirections('DRIVING', store.geometry.location);
    calculateDirections('BICYCLING', store.geometry.location);
    calculateDirections('TRANSIT', store.geometry.location);
    calculateDirections('WALKING', store.geometry.location);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  const calculateDirections = (mode, destination) => {
    if (userLocation && destination) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: userLocation,
          destination,
          travelMode: mode
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(prevState => ({
              ...prevState,
              [mode]: result
            }));
            setInfoWindowVisible(prevState => ({
              ...prevState,
              [mode]: true
            }));
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Map
        google={google}
        zoom={14}
        initialCenter={userLocation}
      >
        {userLocation && (
          <Marker
            title="Your Location"
            name="Your Location"
            position={userLocation}
          />
        )}
        {nearbyStores.map((store, index) => (
          <Marker
            key={index}
            title={store.name}
            name={store.name}
            position={store.geometry.location}
            onClick={() => handleMarkerClick(store)}
          />
        ))}
        {selectedStore && (
          <InfoWindow
            visible={true}
            position={selectedStore.geometry.location}
            onClose={() => setSelectedStore(null)}
          >
            <div>
              <h3>{selectedStore.name}</h3>
              {selectedStore.photoUrl && (
                <img
                  src={selectedStore.photoUrl}
                  alt={selectedStore.name}
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              )}
              <div>
                <h4>ADDRESS</h4>
                <p>{selectedStore.vicinity}</p>
              </div>
              <div>
                <h4>DRIVING</h4>
                <p>Distance: {directions.DRIVING && directions.DRIVING.routes[0].legs[0].distance.text}</p>
                <h4>BICYCLING</h4>
                <p>Distance: {directions.BICYCLING && directions.BICYCLING.routes[0].legs[0].distance.text}</p>
                <h4>TRANSIT</h4>
                <p>Distance: {directions.TRANSIT && directions.TRANSIT.routes[0].legs[0].distance.text}</p>
                <h4>WALKING</h4>
                <p>Distance: {directions.WALKING && directions.WALKING.routes[0].legs[0].distance.text}</p>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBbC24ktucWWxLeiVgwQ4LhnoT9NC3ebq0'
})(Maps);
