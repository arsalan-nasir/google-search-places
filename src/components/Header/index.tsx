import React, { memo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";
import { ReactElement, IHeaderProps } from "../../types";

const Header = ({ headerName }: IHeaderProps): ReactElement => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.heading}>{headerName}</Text>
    </View>
  </SafeAreaView>
);

export default memo(Header);
