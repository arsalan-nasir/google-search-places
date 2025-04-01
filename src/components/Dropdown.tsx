import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {debounce} from 'lodash';
import {useApi} from '../hooks/useApi';
import {IHistory} from '../types/history';

interface IProps {
  setSelectedPlace: Function;
  selectedPlace: IHistory;
}

const DropdownComponent = ({setSelectedPlace, selectedPlace}: IProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [places, setPlaces] = useState<IHistory[]>([]);

  useEffect(() => {
    if (selectedPlace) {
      setPlaces([selectedPlace]);
    }
  }, []);

  const {get} = useApi();

  const searchPlaces = async (value: string) => {
    if (!value.trim()) return;

    try {
      const {status, results} = await get(
        `maps/api/place/textsearch/json?query=${value}&key=${process.env.API_KEY}`,
      );

      if (status === 'OK') {
        setPlaces(results);
      }
    } catch (error) {
      console.error('Error fetching history', error);
    }
  };

  const onSearchText = debounce((keyword: string) => {
    searchPlaces(keyword);
  }, 1000);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        data={places}
        search
        maxHeight={300}
        labelField="name"
        valueField="place_id"
        placeholder={!isFocus ? 'Select history' : '...'}
        searchPlaceholder="Search..."
        //@ts-ignore
        searchQuery={onSearchText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={({
          geometry: {
            location: {lat, lng},
          },
          name,
          formatted_address,
        }) => {
          setSelectedPlace({
            latitude: lat,
            longitude: lng,
            name: name,
            address: formatted_address,
          });
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
