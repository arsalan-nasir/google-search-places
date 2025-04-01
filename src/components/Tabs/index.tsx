import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { TAB_TITLE } from "../../utils";
import { ReactElement, ITabsProps } from "../../types";

const Tabs = ({ setActiveTab, activeTab }: ITabsProps): ReactElement => {
  const handleTabPress = useCallback((tab: string): void => {
    setActiveTab(tab);
  }, []);

  return (
    <View style={styles.tabsContainer}>
      {TAB_TITLE.map((tab) => (
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
