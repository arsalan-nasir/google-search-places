import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface IProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Tabs = ({setActiveTab, activeTab}: IProps) => {
  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <View style={styles.tabsContainer}>
      {['Map', 'History'].map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabPress(tab)}
          style={[styles.tabs, activeTab === tab && styles.activeTab]}>
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Tabs);

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  tabs: {
    width: '50%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    textAlign: 'center',
  },
});
