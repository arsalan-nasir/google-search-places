import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  tabs: {
    width: "50%",
    paddingTop: 15,
    paddingBottom: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  tabText: {
    textAlign: "center",
  },
});
