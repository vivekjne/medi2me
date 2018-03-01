import React from "react";
import { AppRegistry, Alert,TouchableHighlight,View,FlatList,Dimensions,ScrollView,Picker,AsyncStorage,ActivityIndicator } from "react-native";
import {Grid,Badge,Col, Container,List,ListItem,Item,Input,Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { getCartCount } from '../../actions'
import SuggestedList from '../../Components/SuggesteList';
 class MedicineScreen extends React.Component {
    state ={
        medicine:null,
        qty:1,
        suggested_meds:null,
        selected_sug_med:null,
        limit:0,
        loading:false,
        first_loading:false,
        cart_count:0
    }
 componentDidMount=async()=>{
     let { medicine } = this.props.navigation.state.params
     this.setState({first_loading:true})
      this.getSuggestedMeds(medicine.c_cont_code);
     this.setState({medicine:medicine})
 }

 changeQty(qty){
   console.log("qty=",qty)
    this.setState({ qty })
 }
 addToCart=async()=>{
   this.setState({loading:true})
let cart_id = await AsyncStorage.getItem('@medi2me:cart_id');
let mrp_price = (this.state.medicine.n_mrp * this.state.qty).toFixed(2)
let total_price = ((this.state.medicine.n_mrp - (this.state.medicine.n_mrp*(this.state.medicine.n_max_dis_per/100)))* this.state.qty).toFixed(2)
let quantity = this.state.qty;
let pid = this.state.medicine.c_code;
let cart = JSON.stringify({cart_no:cart_id,pdt_id:pid,quantity:quantity,t_price:total_price,mrp_price:mrp_price})
console.log(cart)
fetch('http://192.168.0.100/api/public/cart/add', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: cart,
}) .then((response) => response.json())
.then((responseJson) => {
  this.setState({loading:false})
  this.props.getCartCount(cart_id)
  console.log(responseJson);
})
.catch((error) => {
  console.error(error);
});
 }

 getSuggestedMeds=(code)=>{
  fetch('http://192.168.0.100/api/public/suggested/'+code)
  .then((response) => response.json())
  .then((responseJson) => {

    
    this.setState({suggested_meds:responseJson,first_loading:false})
  })
  .catch((error) => {
    console.error(error);
  });
 }
 selectSugMedItem=(item)=>{
  this.setState({medicine:item})
 }

 _keyExtractor = (item, index) => item.c_code;
 _renderItem=({item})=>{
  console.log(item);
  return(
  <SuggestedList sugmed={item} selectSugMed={this.selectSugMedItem} />
  )
 }


 
 loadMore(code){
   let limit = this.state.limit;
   limit = limit+10;
   console.log("code=",code)
  fetch('http://192.168.0.100/api/public/suggested/')
  .then((response) => response.json())
  .then((responseJson) => {
    let sugmed =this.state.suggested_meds.slice()
    sugmed.push(responseJson)
    this.setState({suggested_meds:sugmed,limit:limit})
  })
  .catch((error) => {
    console.error(error);
  });
 }
 static navigationOptions = ({ navigation }) => ({
    header: (
        null
    )
  });
  render() {
    
   
     
    return (

      <Container style={{height:Dimensions.get('window').height}}>
        <Header style={{height:80,backgroundColor:'#0db1b0'}}>
        <Left>
          <Button transparent onPress={()=>this.props.navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent>

            <Icon name='cart' />
            {this.props.count>0 && <Badge>
            <Text>{this.props.count}</Text>
          </Badge>}
           
          </Button>
        </Right>
      </Header>
     {this.state.medicine&&
        <Content>
      {this.state.first_loading==false?<View style={{flex:1}}>
         <View style={{flex:1,padding:5}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.medicine.c_item_name}</Text>
        <Text style={{fontSize:10,color:'#777'}}>{this.state.medicine.cont_mst.c_name}</Text>
        <View style={{flexDirection:'row',marginTop:5}}>
        <Text style={{fontSize:12,fontWeight:'bold'}}>Company:</Text>
          
        <Text style={{fontSize:12}}>{this.state.medicine.c_mfac_name}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:12,fontWeight:'bold'}}>Quantity:</Text>
          
        <Text style={{fontSize:12}}>{this.state.medicine.c_pack_name} {this.state.medicine.c_group_name}/{this.state.medicine.c_pack_type}</Text>

        
        </View>
        <Grid style={{marginTop:20}}>
          <Col>
            <Text style={{color:'#646363',textAlign:'center'}}>Mrp Price</Text>
            <Text style={{color:'#646363',textAlign:'center'}}>{(this.state.medicine.n_mrp * this.state.qty).toFixed(2)}</Text>
          </Col>
          
          <Col>
          <Text  style={{color:'#018BC8',textAlign:'center'}}>Our Price</Text>
            <Text  style={{color:'#018BC8',textAlign:'center'}}>{((this.state.medicine.n_mrp - (this.state.medicine.n_mrp*(this.state.medicine.n_max_dis_per/100)))* this.state.qty).toFixed(2)}</Text>
          </Col>

          <Col>
          <Text style={{color:'#FF4557',textAlign:'center'}}>You Save</Text>
            <Text style={{color:'#FF4557',textAlign:'center'}}>{((this.state.medicine.n_mrp*(this.state.medicine.n_max_dis_per/100)) * this.state.qty).toFixed(2)}</Text>
          </Col>
        </Grid>

        <View style={{flexDirection:'row',marginTop:10}}>
        <Item style={{flex:1}}>
            <Input placeholder="Check pincode" keyboardType='numeric'  />
          </Item>
          <Button style={{backgroundColor:'#0DB1B0'}}>
            <Text>CHECK</Text>
          </Button>
        </View>

        <View style={{backgroundColor:'#F37B24',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
        <Picker style={{flex:1,color:'#ffffff'}} itemStyle={{color:'white'}}
  selectedValue={this.state.qty}
  onValueChange={(itemValue, itemIndex) => this.setState({qty: itemValue})}>
  <Picker.Item label="1" value="1" />
  <Picker.Item label="2" value="2" />
  <Picker.Item label="3" value="3" />
  <Picker.Item label="4" value="4" />
  <Picker.Item label="5" value="5" />
  <Picker.Item label="6" value="6" />
  <Picker.Item label="7" value="7" />
  <Picker.Item label="8" value="8" />
  <Picker.Item label="9" value="9" />
  <Picker.Item label="10" value="10" />
</Picker>
      {!this.state.loading && <Button transparent light style={{flex:1,marginTop:10,justifyContent:'center'}} onPress={()=>this.addToCart()}>
        <Text style={{fontSize:18}}>ADD TO CART</Text>
      </Button>}
      {this.state.loading && <ActivityIndicator size="large" color="#ffffff" style={{flex:1}}/>}
        </View>

       

        </View>
        
        <Card style={{height:230,marginLeft:10,marginRight:10}}>
        <CardItem header>
            <Text>Suggested alternatives for {this.state.medicine.c_item_name}</Text>
              
            </CardItem>
            <ScrollView>
            <CardItem>
           
              <FlatList 
                data = {this.state.suggested_meds}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
               
              />
               </CardItem>
              </ScrollView>
               
           </Card>
  
            </View>:<ActivityIndicator size="large" color="#00ffff"/>}
        </Content>
     }

      </Container>
      
    
    );
  }
}

function mapStateToProps(state){
  console.log(state);
  return { count:state.cart }
}

export default connect(mapStateToProps,{getCartCount})(MedicineScreen);