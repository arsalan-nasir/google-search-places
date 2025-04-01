import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { debounce } from "lodash";
import { useApi } from "../../hooks/useApi";
import { IHistory, ReactElement, IDropdownProps, IPlace } from "../../types";
import { API_KEY } from "@env";
import styles from "./styles";

const DropdownComponent = ({
  setSelectedPlace,
  selectedPlace,
}: IDropdownProps): ReactElement => {
  const [isFocus, setIsFocus] = useState(false);
  const [places, setPlaces] = useState<IHistory[]>([]);
  const { get } = useApi();

  useEffect(() => {
    if (selectedPlace) {
      setPlaces([selectedPlace]);
    }
  }, []);

  const searchPlaces = useCallback(async (value: string): Promise<void> => {
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
  }, []);

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
        }) => {
          setPlace({ lat, lng, name, formatted_address });
        }}
      />
    </View>
  );
};

export default DropdownComponent;
