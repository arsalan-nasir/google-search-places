import React, { useEffect, useRef, useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import DropdownComponent from "../Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IHistory, ReactElement, IMapProps } from "../../types";
import styles from "./styles";
import { ZOOM_LEVEL } from "../../utils";

const Map = ({
  history,
  selectedPlace,
  setSelectedPlace,
}: IMapProps): ReactElement => {
  const [loading, setLoading] = useState<Boolean>(false);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      const region: Region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        // This is for Zoom Level
        latitudeDelta: ZOOM_LEVEL.latitude,
        longitudeDelta: ZOOM_LEVEL.longitude,
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
        setLoading={setLoading}
      />

      {loading ? (
        <View
          style={{
            marginTop: "60%",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
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
      )}
    </>
  );
};

export default React.memo(Map);
