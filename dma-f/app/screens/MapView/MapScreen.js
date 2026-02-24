import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {  GOOGLE_API_KEY } from '../../../environments';
import { FontAwesome5,Feather } from '@expo/vector-icons';


const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]); // State to hold filtered hospitals


  useEffect(() => {
    const fetchHospitals = async (latitude, longitude) => {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=hospital&key=${GOOGLE_API_KEY}`;

      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setHospitals(json.results);
      } catch (error) {
        console.error(error);
      }
    };

    const requestLocationPermissionAndGetLocation = async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the current location of the device
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      // Set the region on the map to the current location
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Fetch hospitals nearby the current location
      fetchHospitals(latitude, longitude);
    };

    requestLocationPermissionAndGetLocation();
  }, []);

  useEffect(() => {
    // Filter hospitals based on the search query
    if (searchQuery.trim() === '') {
      setFilteredHospitals([]);
    } else {
      const filtered = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHospitals(filtered);
    }
  }, [searchQuery, hospitals]);

  // Function to handle hospital selection from search results
  const handleHospitalSelect = (hospital) => {
    // Set the region to the selected hospital's location
    setRegion({
      latitude: hospital.geometry.location.lat,
      longitude: hospital.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }
  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search hospitals"
        placeholderTextColor="black"
        
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.searchResultsContainer}>
        {filteredHospitals.map((hospital, index) => (
          <TouchableOpacity
            key={index}
            style={styles.searchResultItem}
            onPress={() => handleHospitalSelect(hospital)}
          >
            <Text>{hospital.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {region ? ( // Check if region is set before rendering the MapView
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          {hospitals.map((hospital, index) => (
            <Marker
            key={index}
            coordinate={{
              latitude: hospital.geometry.location.lat,
              longitude: hospital.geometry.location.lng,
            }}
            title={hospital.name}
            description={hospital.vicinity}
          >
            <FontAwesome5 name="hospital-symbol" size={24} color="red" />
          </Marker>
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#E91E63" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%', 
    height: '100%',
  },
  searchBar: {
    height: 40,
    position: 'absolute', 
    top: '10%', 
    left: '10%', 
    width: '80%', 
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the search bar is above other elements
  },
  searchResultsContainer: {
    position: 'absolute', 
    top: '17%', 
    left: '10%',
    width: '80%',
    maxHeight: 100,
    zIndex: 1, 
    
  },
  searchResultItem: {
    backgroundColor: '#F7C6E8',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default MapScreen;
