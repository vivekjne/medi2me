import React,{PureComponent} from 'react';
import {FlatList,View,AsyncStorage,ActivityIndicator,VirtualizedList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Footer,Title } from 'native-base';
import CartList from '../../Components/CartList';
import { connect } from 'react-redux';
import { getCartCount } from '../../actions'
export default class CartScreen extends PureComponent{

  state = {
    cart:null,
    loading:false
  }
    static navigationOptions = ({ navigation }) => ({
        header: (
           null
        )
      });
componentDidMount = async()=>{
  this.setState({loading:true})
 this.getCart();
}
getCart=async()=>{
  try {
    
    cart_id = await AsyncStorage.getItem('@medi2me:cart_id');

    let response = await fetch(
      `http://192.168.0.100/api/public/cart/${cart_id}`
    );
    let responseJson = await response.json();
   
   this.setState({cart: responseJson,loading:false})

  } catch (error) {
    console.error(error);
  }
}
removeQty=(item)=>{
  this.setState({loading:true})
  let quantity = this.state.cart[item].quantity;
  quantity--;
  let mrp_price = this.state.cart[item].product.n_mrp;
  mrp_price = mrp_price * quantity;
  let t_price =   (this.state.cart[item].product.n_mrp - ( this.state.cart[item].product.n_max_dis_per/100 )) * quantity;
  let id = this.state.cart[item].id;
  let update = JSON.stringify({id,quantity,t_price,mrp_price});
console.log(update);
  fetch('http://192.168.0.100/api/public/cart/update', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: update,
}).then((res)=>res.json()).then(res=>{
  console.log(res);
  if(res.status==true){
    this.getCart();
  
  }
})
    

}
_keyExtractor = (item, index) => item.id;

addQty=(item)=>{
  this.setState({loading:true})
  let quantity = this.state.cart[item].quantity;
  quantity++;
  let mrp_price = this.state.cart[item].product.n_mrp;
  mrp_price = mrp_price * quantity;
  let t_price =   (this.state.cart[item].product.n_mrp - ( this.state.cart[item].product.n_max_dis_per/100 )) * quantity;
  let id = this.state.cart[item].id;
  let update = JSON.stringify({id,quantity,t_price,mrp_price});
  
console.log(update);
  fetch('http://192.168.0.100/api/public/cart/update', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: update,
}).then((res)=>res.json()).then(res=>{
  console.log(res);
  if(res.status==true){
    this.getCart();
  
  }
})
    

 
}

_getItemLayout=(item, index) => (
  {length: 100, offset: 100 * index, index}
)

deleteItem=(item)=>{
  this.setState({loading:true})
  id = this.state.cart[item].id;
  fetch('http://192.168.0.100/api/public/cart/delete/'+id)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.status==true){
      this.getCart();
    }
  })
  .catch((error) => {
    console.error(error);
  });
}
renderItem=({ item, index })=> {
  return <CartList item={item} 
  deleteItem={this.deleteItem.bind(this,index)}
  removeQty={this.removeQty.bind(this,index)}
  addQty={this.addQty.bind(this,index)}
  loading={this.state.loading}/>

     }
    render(){
    
        
 
 
 
     
        return(
            <Container>
              <Header style={{height:70,backgroundColor:'#0db1b0'}}>
      <Left>
        <Button
          transparent
          onPress={() =>this.props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>CartItems</Title>
      </Body>
     
    </Header>
        <View style={{flex:1}}> 
        {this.state.loading&&<View style={{flex:1,alignItems:'center',justifyContent:'center',position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.6,
      backgroundColor: 'black',
      zIndex:1}}>
        <ActivityIndicator size="large" color="#00ffff"/>
      </View>}
       <FlatList 
       disableVirtualization
       
        data={this.state.cart}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        initialNumToRender={4}
        getItemLayout={(item, index) => (
          {length: 20, offset: 20 * index, index}
        )}
      />
        </View>
        <Footer style={{backgroundColor:'#0db1b0'}}>
            <View ></View>
        </Footer>
      </Container>
        )
    }
}

