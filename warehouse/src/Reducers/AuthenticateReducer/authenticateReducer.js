/**
 * Reducers của xác thực
 */
import {AUTH_LOADING, LOGIN, LOGOUT} from "../../Common/constants"

const initialState = {
    user: localStorage.getItem("tokenADMIN") || {},
    dataUser: {},
    notification: {},
    isLoading: false,
    error: false,
    forgetPW: "",
    login_101: false,
    login_100: false,
    isLogin: localStorage.getItem("tokenADMIN") ? true : false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case LOGIN:
            localStorage.setItem("tokenADMIN", action.user.token);
            return {
                user: action.user.token,
                isLoading: false,
                isLogin: true
            };
        case LOGOUT:
            localStorage.removeItem("tokenADMIN");
            return {
                ...state,
                user: {},
                dataUser: {},
                isLoading: false,
                isLogin: false
            };
        default:
            return state;
    }
}