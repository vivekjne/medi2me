import React from "react";
import { AppRegistry, Alert,TouchableOpacity,KeyboardAvoidingView,View } from "react-native";
import { Container,List,ListItem,Item,Input,Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text } from "native-base";
export default class SearchScreen extends React.Component {
    state ={
        medicines:null
    }


 async searchMedicines(query){
     console.log("query",query);
     if(query.length>2){
  fetch('http://192.168.0.100/api/public/search/'+query)
        .then((response) => response.json())
        .then((responseJson) => {
           
          this.setState({medicines:responseJson})
        })
        .catch((error) => {
          console.error(error);
        });
    }
 }
 

 static navigationOptions = ({ navigation }) => ({
    header: (
       null
    )
  });
  render() {
      console.log(this.state.medicines)
    return (
   
      <Container>
            <Header searchBar rounded style={{height:80,backgroundColor:'#0db1b0'}}>
           
        
           <Item style={{flex:1}}>
           <Button transparent  onPress={() =>this.props.navigation.goBack()}>
             <Icon name='arrow-back' />
           </Button>
               <Icon name="ios-search" />
               <Input autoFocus={true} placeholder="Search" ref={component=>this._search=component} onChangeText={(text)=>this.searchMedicines(text)}/>
               
           </Item>
         
       
            </Header>
        <Content padder>
 
         
          {this.state.medicines?  <List dataArray={this.state.medicines}
            renderRow={(item) =>
               
              <ListItem>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('MedicineDetail',{medicine:item})}>
                <View style={{flexDirection:'row'}}>
                  <Text>{item.c_item_name} </Text>
                  <Text style={{fontSize:12,color:'#777'}}>,{item.cont_mst.c_name}</Text>
                </View>
                </TouchableOpacity>
              </ListItem>
            
            }>
          </List>:null}
        
        </Content>
      </Container>
     
    );
  }
}