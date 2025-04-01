import React, { useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import DropdownComponent from "../Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IHistory } from "../../types/history";
import styles from "./styles";

interface IProps {
  history: IHistory[];
  selectedPlace: IHistory;
  setSelectedPlace: (place: IHistory) => void;
}

const Map = ({
  history,
  selectedPlace,
  setSelectedPlace,
}: IProps): React.JSX.Element => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      const region: Region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        // This is for Zoom Level
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      // Animate map to the selected place location when user select location from response
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [selectedPlace]);

  const saveHistory = useCallback(
    async (newHistory: IHistory): Promise<void> => {
      try {
        const newArr = [...history, newHistory];
        await AsyncStorage.setItem("searchHistory", JSON.stringify(newArr));
        setSelectedPlace(newHistory);
      } catch (error) {
        console.error("Error saving search history", error);
      }
    },
    [history, setSelectedPlace]
  );

  return (
    <>
      <DropdownComponent
        setSelectedPlace={saveHistory}
        selectedPlace={selectedPlace}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
          }}
          title={selectedPlace.name}
          description={selectedPlace.address}
        />
      </MapView>
    </>
  );
};

export default React.memo(Map);
