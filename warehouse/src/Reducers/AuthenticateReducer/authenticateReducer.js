import * as constant from "../../Common/constants"

const initialState = {
    user: localStorage.getItem("tokenADMIN") || {},
    dataUser: {},
    notification: {},
    isLoading: false,
    error: false,
    forgetPW: "",
    login_101: false,
    login_100: false,
    isLogin: localStorage.getItem("tokenADMIN")?true:false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case constant.AUTH_LOADING: {
            console.log("authloadingreducer")
            return {
                ...state,
                isLoading: true,
                // error: false,
            };
        }
        case constant.LOGIN:
            console.log("loginreducer")
            localStorage.setItem("tokenADMIN", action.user.data.token);
            return {
                user: action.user.data.token,
                isLoading: false,
                isLogin: true
            };
        case constant.LOGOUT:
            localStorage.removeItem("tokenADMIN");
            return {
                ...state,
                user: {},
                dataUser: {},
                isLoading: false,
                isLogin: false
            };

         case constant.LOGOUT:
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