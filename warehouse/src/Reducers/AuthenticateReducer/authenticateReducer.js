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
  };
  
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.AUTH_LOADING: {
            return {
                ...state,
                isLoading: true,
                // error: false,
            };
        }

        default:
            return state;
    }
}