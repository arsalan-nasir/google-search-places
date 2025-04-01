import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { memo, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IHistory } from "../../types/history";
import styles from "./styles";

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
}: IProps): React.JSX.Element => {
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = useCallback(async (): Promise<void> => {
    try {
      const savedHistory = await AsyncStorage.getItem("searchHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Error loading search history", error);
    }
  }, []);

  const handleHistorySelect = useCallback((query: IHistory): void => {
    setSelectedPlace(query);
    setActiveTab("Map");
  }, []);

  return (
    <>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Search History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleHistorySelect(item)}>
              <Text style={styles.historyItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default memo(History);
