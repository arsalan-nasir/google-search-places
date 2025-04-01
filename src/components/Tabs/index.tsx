import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface IProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Tabs = ({ setActiveTab, activeTab }: IProps): React.JSX.Element => {
  const handleTabPress = useCallback((tab: string): void => {
    setActiveTab(tab);
  }, []);

  return (
    <View style={styles.tabsContainer}>
      {["Map", "History"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabPress(tab)}
          style={[styles.tabs, activeTab === tab && styles.activeTab]}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Tabs);
