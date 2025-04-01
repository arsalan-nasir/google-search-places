import React from "react";

export interface IHistory {
  address: string;
  latitude: number;
  longitude: number;
  name: string;
}

export type ReactElement = React.JSX.Element;

export interface IHeaderProps {
  headerName: string;
}

export interface ITabsProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export interface IMapProps {
  history: IHistory[];
  selectedPlace: IHistory;
  setSelectedPlace: (place: IHistory) => void;
}

export interface IDropdownProps {
  setSelectedPlace: Function;
  selectedPlace: IHistory;
}

export interface IPlace {
  lat: string;
  lng: string;
  formatted_address: string;
  name: string;
}

export interface IHistoryProps {
  history: IHistory[];
  setHistory: Function;
  setSelectedPlace: Function;
  setActiveTab: Function;
}
