
/**
 * INDEX
 */
import { combineReducers } from 'redux';
import authReducer from './AuthenticateReducer/authenticateReducer';
import productsReducer from './ProductsReducer/productsReducer';
import ordersReducer from './OrdersReducer/ordersReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'
/**
 * Gộp các reducer thành một
 */
export default combineReducers({
    authReducer: authReducer,
    toastr: toastrReducer, // <- Mounted at toastr.
    productsReducer: productsReducer,
    ordersReducer:ordersReducer
});
