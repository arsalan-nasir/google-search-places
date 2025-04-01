import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { memo, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IHistory, ReactElement, IHistoryProps } from "../../types";
import styles from "./styles";
import { Tab } from "../../utils";

const History = ({
  history,
  setHistory,
  setSelectedPlace,
  setActiveTab,
}: IHistoryProps): ReactElement => {
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
    setActiveTab(Tab.MAP);
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
