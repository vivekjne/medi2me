import { combineReducers } from 'redux';
import cartreducer from './cartReducer';

export default combineReducers({
    cart:cartreducer
});