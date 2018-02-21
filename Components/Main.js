import React, { Component } from 'react';
import { Container,Item,Input, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import { View,DatePickerAndroid,TimePickerAndroid } from  'react-native';
export default class Main extends Component {

  openDatePicker = async()=>{
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
    
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  openTimePicker = async()=>{
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  render() {
    return (
      <Container>
          
        <Header style={{paddingTop:10,height:80}}>
          <Left>
            <Button transparent onPress={this.props.drawerClick}>
              <Icon name='menu' />
            </Button>

          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
    
        <Content>
        <View style={{margin:10}}>
        <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"/>
            
          </Item>
         </View>
         <Button onPress={()=>this.openDatePicker() }>
            <Text>DatePicker</Text>
         </Button>
         
         <Button onPress={()=>this.openTimePicker() }>
            <Text>TimePicker</Text>
         </Button>

        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}