import React, { memo, useState } from "react";
import { View } from "react-native";
import "react-native-get-random-values";

//Components
import Header from "../../components/Header";
import Map from "../../components/Map";
import History from "../../components/History";
import Tabs from "../../components/Tabs";
import { IHistory } from "../../types/history";

function Dashboard(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState("Map");
  const [history, setHistory] = useState<IHistory[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<IHistory>({
    address:
      "Business Suite The Vertical, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia",
    latitude: 3.110692,
    longitude: 101.666784,
    name: "Kloudius",
  });

  return (
    <View>
      <Header headerName={activeTab} />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Map" && (
        <Map
          history={history}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
      )}
      {activeTab === "History" && (
        <History
          setActiveTab={setActiveTab}
          history={history}
          setHistory={setHistory}
          setSelectedPlace={setSelectedPlace}
        />
      )}
    </View>
  );
}

export default memo(Dashboard);
