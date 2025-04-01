import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { debounce } from "lodash";
import { useApi } from "../../hooks/useApi";
import { IHistory } from "../../types/history";
import { API_KEY } from "@env";
import styles from "./styles";

interface IProps {
  setSelectedPlace: Function;
  selectedPlace: IHistory;
}

interface IPlace {
  lat: string;
  lng: string;
  formatted_address: string;
  name: string;
}

const DropdownComponent = ({
  setSelectedPlace,
  selectedPlace,
}: IProps): React.JSX.Element => {
  const [isFocus, setIsFocus] = useState(false);
  const [places, setPlaces] = useState<IHistory[]>([]);

  useEffect(() => {
    if (selectedPlace) {
      setPlaces([selectedPlace]);
    }
  }, []);

  const { get } = useApi();

  const searchPlaces = async (value: string): Promise<void> => {
    if (!value.trim()) return;

    try {
      const { status, results } = await get(
        `maps/api/place/textsearch/json?query=${value}&key=${API_KEY}`
      );

      if (status === "OK") {
        setPlaces(results);
      }
    } catch (error) {
      console.error("Error fetching history", error);
    }
  };

  const onSearchText = debounce((keyword: string): void => {
    searchPlaces(keyword);
  }, 1000);

  const toggleFocus = useCallback((flag: boolean): void => {
    setIsFocus(flag);
  }, []);

  const setPlace = useCallback(
    ({ lat, lng, name, formatted_address }: IPlace) => {
      setSelectedPlace({
        latitude: lat,
        longitude: lng,
        name: name,
        address: formatted_address,
      });
      toggleFocus(false);
    },
    []
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        data={places}
        search
        maxHeight={300}
        labelField="name"
        valueField="place_id"
        placeholder={!isFocus ? "Select history" : "..."}
        searchPlaceholder="Search..."
        //@ts-ignore
        searchQuery={onSearchText}
        onFocus={() => toggleFocus(true)}
        onBlur={() => toggleFocus(false)}
        onChange={({
          geometry: {
            location: { lat, lng },
          },
          name,
          formatted_address,
        }) => setPlace({ lat, lng, name, formatted_address })}
      />
    </View>
  );
};

export default DropdownComponent;
