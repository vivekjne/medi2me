import React, { Component } from "react";

import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import MedicineScreen from './MedicineScreen';
import CameraScreen from '../CameraScreen/CameraScreen';
import { StackNavigator } from "react-navigation";
import CartScreen from './CartScreen';

export default (DrawNav = StackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  MedicineDetail: { screen: MedicineScreen },
  Camera:{screen:CameraScreen},
  Cart:{screen:CartScreen}
}));