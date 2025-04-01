import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface IHeaderProps {
  headerName: string;
}

const Header = ({headerName}: IHeaderProps) => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.heading}>{headerName}</Text>
    </View>
  </SafeAreaView>
);

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
  },
});
