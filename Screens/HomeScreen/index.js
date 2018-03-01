import React, { Component } from "react";
import HomeScreen from "./Home";
import SearchScreen from "./SearchScreen";
import Profile from "../ProfileScreen/index.js";
import SideBar from '../Sidebar/Sidebar';
import MedicineScreen from './MedicineScreen';
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Search:{screen:SearchScreen},
    MedicineDetail:{screen:MedicineScreen},
    Profile: { screen: Profile }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;