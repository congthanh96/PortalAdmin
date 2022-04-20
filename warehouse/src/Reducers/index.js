
import { combineReducers } from 'redux';
import authReducer from './AuthenticateReducer/authenticateReducer';

/**
 * Gộp các reducer thành một
 */
export default combineReducers({
    authReducer: authReducer,
});
