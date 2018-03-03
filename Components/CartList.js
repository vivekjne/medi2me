import React,{ PureComponent } from 'react';

import { View,TouchableHighlight,TouchableOpacity,Text,ActivityIndicator,StyleSheet } from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';
export default class CartList extends PureComponent{
    render(){
        const item = this.props.item
         
        return(
          <View style={{shadowColor:'#000',shadowOpacity:0.8,shadowOffset:{width:5,height:10},shadowRadius:5,borderWidth:1,borderColor:'#ccc',marginBottom:5,elevation:3,backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'#e5e5e5'}}>
          <Text style={{flex:1}}>{item.product.c_item_name}</Text>
          <TouchableOpacity onPress={this.props.deleteItem}>
          <Entypo name="trash" size={24} color="red"/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',padding:10}}>
          <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'space-between'}}>
                  <TouchableOpacity onPress={this.props.removeQty}>
                    <Entypo name="minus" size={20} color="#0db1b0" />
                  </TouchableOpacity>
        
        
                  <Text>{item.quantity}</Text>
        
                  <TouchableOpacity onPress={this.props.addQty}>
                    <Entypo name="plus" size={20} color="#0db1b0" />
                  </TouchableOpacity>
                  
          </View>
        
          <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
               <Text style={{textDecorationLine:'line-through',textDecorationStyle:'solid',marginRight:5}}> &#8377;{item.mrp_price}</Text>
              <Text style={{color:'#018BC8'}}> &#8377;{item.t_price}</Text>
              </View>
        </View>
        </View>
        )
    }
}


