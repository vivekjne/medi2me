
import { GET_CART_COUNT,GET_CART_COUNT_SUCCESS } from './types';

export const getCartCount = (cart_id)=> async (dispatch)=>{
    console.log("cart_id=",cart_id);
    fetch('http://192.168.0.100/api/public/get_cart_count/'+cart_id)
    .then((response) => response.json())
    .then((responseJson) => {
      
     console.log(responseJson[0]);
     dispatch({ type:GET_CART_COUNT,payload:responseJson[0].count})
     
    })
    .catch((error) => {
      console.error(error);
    });
    };

