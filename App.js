import React, { Component } from "react";
import Expo from "expo";
import HomeScreen from "./Screens/HomeScreen/index.js";
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers,{},applyMiddleware(reduxThunk))
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return(<Provider store={store}>
     <HomeScreen />
    </Provider>
    )
  }
}