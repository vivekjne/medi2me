import React,{Component} from 'react';
import { View,Text,TouchableOpacity,Dimensions } from 'react-native';
import {Right,Left,Grid,Col } from 'native-base'
export default class SuggestedList extends Component{
    _onPress=()=>{
        console.log(this.props)
         this.props.selectSugMed(this.props.sugmed);
    }
    render(){
        console.log(this.props.sugmed)
        return(
            <TouchableOpacity onPress={this._onPress} style={{padding:5}}>
            <Grid>
                <Col size={75}>
              <Text>{this.props.sugmed.c_item_name}</Text>
              <Text>{this.props.sugmed.c_mfac_name}</Text>
              </Col>
              <Col size={25} style={{justifyContent:'center',alignItems:'center'}}>
              <Text>{this.props.sugmed.n_mrp}</Text>
              </Col>
            
                
            </Grid>
            </TouchableOpacity>
        )
    }
}