import React, { memo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";

interface IHeaderProps {
  headerName: string;
}

const Header = ({ headerName }: IHeaderProps): React.JSX.Element => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.heading}>{headerName}</Text>
    </View>
  </SafeAreaView>
);

export default memo(Header);
