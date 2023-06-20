import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, Animated } from 'react-native';
import SvgComponent from './components/svg.js';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [rotation, setRotation] = useState(new Animated.Value(0));
  
  // mapRef para o botão de centralizar
  const mapRef = useRef(null);

  const centerToUserLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };
  
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

    Location.watchHeadingAsync(heading => {
      const { trueHeading } = heading;
      Animated.timing(rotation, {
        toValue: trueHeading,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
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
      <View style={styles.appbar}>
        <Image source={require('./assets/wing-left.png')} style={styles.appbarIcon} />
        <Text style={styles.textappbar}>Crowpass</Text>
        <Image source={require('./assets/wing-right.png')} style={styles.appbarIcon} />
      </View>
      {location ? (
        <MapView ref={mapRef} style={styles.map} initialRegion={mapRegion}>
          <Marker coordinate={mapRegion} title="Você está aqui" style={styles.marker}>
            <Animated.Image source={require('./assets/crow.png')} 
            style={[styles.markerIcon, { transform: [{ rotate: rotation.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            }) }] }]} />
          </Marker>
        </MapView>
      ) : (
        <Text style={styles.text}>Esperando pela sua localização...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={centerToUserLocation}>
        <Text style={styles.buttonText}>Onde estou?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    marginTop: '10%',
    height: '10%',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,

    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 1,
    
    backgroundColor: "#545454",
  },

  appbarIcon: {
    width: 100,
    height: 75,
  },

  textappbar: {
    color: '#f2f2f2',
    fontSize: 30,
    fontFamily: 'serif',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#545454",
  },
  map: {
    marginTop: '-10%',
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 90,
    height: 90,
    justifyContent: 'center',
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
  markerIcon: {
    width: 70,
    height: 30,
  },
  text: {
    color: '#f2f2f2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#545454',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
});
