import React, { useState, useEffect, useContext } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Import bottom navigation bar & menu option icons
import UserContext from './UserContext';

/*
  Release 1 & Release 2: Mahalaxmi Kalappareddigari Contribution
  NOTE: The bottom navigation bar will only look different for this page due to maps
*/
const Maps = ({ google }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [directions, setDirections] = useState({
    DRIVING: null,
    BICYCLING: null,
    TRANSIT: null,
    WALKING: null
  });
  const [infoWindowForUserLocationVisible, setInfoWindowForUserLocationVisible] = useState(false);
  const [infoWindowForStoreVisible, setInfoWindowForStoreVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocationAddress, setUserLocationAddress] = useState(null); // State to store user location address
  const { userEmail } = useContext(UserContext);

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
            fetchUserLocationAddress(location); // Fetch user location address
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
          const promises = results.slice(0, 11).map(store => {
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

  const fetchUserLocationAddress = (location) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          setUserLocationAddress(results[0].formatted_address);
        } else {
          console.error('No address found for user location');
          setUserLocationAddress('Address not found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
        setUserLocationAddress('Geocoder failed');
      }
    });
  };


  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setInfoWindowForStoreVisible(true);
    calculateDirections('DRIVING', store.geometry.location);
    calculateDirections('BICYCLING', store.geometry.location);
    calculateDirections('TRANSIT', store.geometry.location);
    calculateDirections('WALKING', store.geometry.location);
    // setTimeout(() => {
    //     navigate('/resume');
    // }, 20000);
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
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  };

  // Release 2 Sprint 1 -> Temporary Placeholder Logic For OnClick Functionality
  const exitMaps = () => {
    // Release 2 Sprint 2 -> Exit Maps OnClick, Redirect To Menu Option Page
    navigate('/menu');
  };

  const menuOptionClick = () => {
    navigate('/menu');
  };

  const logoutClick = () => {
    navigate('/login');
  };

  const profileClick = () => {
    navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
  };

  const homeClick = () => {
    navigate(`/home?email=${encodeURIComponent(userEmail)}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div classname="maps-container"> 
      <Map
        google={google}
        style={{
          width: '22%',
          height: '90%',
          borderTop: '8px solid #333', // Define top, left, & right borders to add bottom navigation bar better
          borderLeft: '8px solid #333', 
          borderRight: '8px solid #333', 
          borderRadius: '40px', // Add border radius for nice look
          margin: '22px auto',
        }}
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
        zoom={14}
        initialCenter={userLocation}
      >
        <div className="exit-maps-btn">
          <button onClick={exitMaps}>Exit Maps</button>
        </div>
        {userLocation && (
          <Marker
            title="Your Location"
            name="Your Location"
            position={userLocation}
            onClick={() => setInfoWindowForUserLocationVisible(true)}
          />
        )}
        {userLocation && (
          <InfoWindow
            visible={infoWindowForUserLocationVisible}
            onClose={() => setInfoWindowForUserLocationVisible(false)}
            position={userLocation}
          >
            <div>
              <h3>Your Current Location</h3>
              <div>
                {userLocationAddress && <p>Address: {userLocationAddress}</p>}
              </div>
            </div>
          </InfoWindow>
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
            visible={infoWindowForStoreVisible}
            onClose={() => setInfoWindowForStoreVisible(false)}
            position={selectedStore.geometry.location}
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
        <div
          className="bottom-navbar-maps"
          style={{
            position: 'absolute',
            bottom: '0',
            transform: 'translateX(-1%)',
            alignItems: 'center',
            width: '20%',
            backgroundColor: '#f3f3f3',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '4px 2px',
            margin: '45px 617px',
            borderRadius: '40px',
            borderBottom: '7px solid #333', 
        }}
      >
        <div><FaHome onClick={homeClick}/></div>  
        <div><FaUser onClick={profileClick}/></div>
        <div onClick={logoutClick}><FaSignOutAlt /></div>
        <div onClick={menuOptionClick}><FaBars /></div>
        </div>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  #apiKey: 'N/A'
})(Maps);
