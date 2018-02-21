import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Drawer } from 'native-base';
import  Main from './Components/Main';
export default class App extends React.Component {
state={
  isReady:false,
  drawerToggle:false
}
closeDrawer = () => {
  this.drawer._root.close()
};
openDrawer = () => {
  this.drawer._root.open()
};


  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      
    });
    this.setState({isReady:true})
  }
  render() {

    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
       
      content={<View style={{flex:1,backgroundColor:'red'}}><Text> Test </Text></View>}
      onClose={() => this.closeDrawer()} >
    {this.state.isReady?<Main drawerClick={()=>this.openDrawer()}></Main>:null}
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
});
