import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, DirectionsRenderer } from 'google-maps-react';

const Maps = ({ google }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedMode, setSelectedMode] = useState('DRIVING');
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

    return () => {
      setUserLocation(null);
    };
  }, []);

  const fetchNearbyStores = (location) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(
      {
        location,
        radius: 5000,
        type: ['store'],
        keyword: 'sports drinks water',
        rankBy: google.maps.places.RankBy.PROMINENCE
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const topStores = results.slice(0, 10);
          setStores(topStores);
          setLoading(false);
        } else {
          console.error('Error fetching nearby stores:', status);
          setLoading(false);
          setError('Error fetching nearby stores');
        }
      }
    );
  };

  const handleMarkerClick = (props) => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: userLocation,
        destination: props.position,
        travelMode: selectedMode
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setSelectedStore(props);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    if (selectedStore) {
      handleMarkerClick(selectedStore);
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
        {stores.map((store, index) => (
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
            marker={selectedStore}
            visible={true}
            onClose={() => setSelectedStore(null)}
          >
            <div>
              <h3>{selectedStore.name}</h3>
              <p>Location: {selectedStore.vicinity}</p>
              {selectedStore.photos && selectedStore.photos[0] && (
                <img src={selectedStore.photos[0].getUrl()} alt={selectedStore.name} style={{ width: '100px', height: 'auto' }} />
              )}
              <div>
                <button onClick={() => handleModeChange('DRIVING')}>Driving</button>
                <button onClick={() => handleModeChange('BICYCLING')}>Biking</button>
                <button onClick={() => handleModeChange('TRANSIT')}>Transit</button>
                <button onClick={() => handleModeChange('WALKING')}>Walking</button>
              </div>
              {directions && <DirectionsRenderer directions={directions} />}
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'API_KEY'
})(Maps);
