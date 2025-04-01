import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IHistory} from '../types/history';

interface IProps {
  history: IHistory[];
  setHistory: Function;
  setSelectedPlace: Function;
  setActiveTab: Function;
}

const History = ({
  history,
  setHistory,
  setSelectedPlace,
  setActiveTab,
}: IProps) => {
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('searchHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history', error);
    }
  };

  const handleHistorySelect = (query: IHistory) => {
    setSelectedPlace(query);
    setActiveTab('Map');
  };

  return (
    <>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Search History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleHistorySelect(item)}>
              <Text style={styles.historyItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  historyContainer: {
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
