import { GET_CART_COUNT,GET_CART_COUNT_SUCCESS }   from '../actions/types';

export default function(state= null,action){
    switch(action.type){
        case GET_CART_COUNT:
            return action.payload || false;
        default:
            return state;
    }
}