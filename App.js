import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import SvgComponent from './components/svg.js';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let mapRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (location) {
    mapRegion.latitude = location.coords.latitude;
    mapRegion.longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      {location ? (
        <MapView style={styles.map} initialRegion={mapRegion}>
          <Marker coordinate={mapRegion} title="Você está aqui" style={styles.marker}>
            {/* Custom marker content */}
            <SvgComponent style={styles.icon}/>
          </Marker>
        </MapView>
      ) : (
        <Text style={styles.text}>Waiting for location...</Text>
        )}
        <SvgComponent style={styles.icon}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  marker: {
    width: 400,
    height: 700,
  },
  customMarker: {
    backgroundColor: '#FF000088',
    // borderRadius: 20,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
