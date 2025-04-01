import React, {useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import DropdownComponent from './Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IHistory} from '../types/history';

interface IProps {
  history: IHistory[];
  selectedPlace: IHistory;
  setSelectedPlace: (place: IHistory) => void;
}

const Map = ({history, selectedPlace, setSelectedPlace}: IProps) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      const region: Region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      // Animate map to the selected place location
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [selectedPlace]);

  const saveHistory = useCallback(
    async (newHistory: IHistory) => {
      try {
        const newArr = [...history, newHistory];
        await AsyncStorage.setItem('searchHistory', JSON.stringify(newArr));
        setSelectedPlace(newHistory);
      } catch (error) {
        console.error('Error saving search history', error);
      }
    },
    [history, setSelectedPlace],
  );

  return (
    <>
      <DropdownComponent
        setSelectedPlace={saveHistory}
        selectedPlace={selectedPlace}
      />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        </MapView>
      </View>
    </>
  );
};

export default React.memo(Map);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
