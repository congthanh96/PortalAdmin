import {
  AUTH_FAILURE,
  AUTH_LOADING,
  DATA_LOGIN,
  EDIT_INFO,
  FORGET_PASSWORD,
  FORGET_PASSWORD_OTP,
  LOGIN,
  LOGIN_REGISTER_100,
  LOGIN_REGISTER_101,
  LOGOUT,
  RESET_PASSWORD,
  SIGN_UP,
  UPLOAD_PROFILEPIC,
} from "./authActions";

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
    case AUTH_LOADING: {
      return {
        ...state,
        isLoading: true,
        // error: false,
      };
    }
    case LOGIN:
      localStorage.setItem("tokenADMIN", action.user.data.token);
      return {
        user: action.user.data.token,
        isLoading: false,
      };
    case LOGIN_REGISTER_101:
      console.log("101");
      return {
        ...state,
        isLoading: false,
        login_100: false,
        login_101: true,
      };
    case LOGIN_REGISTER_100:
      console.log("100");
      return {
        ...state,
        isLoading: false,
        login_101: false,
        login_100: true,
      };
    case DATA_LOGIN:
      // console.log('datUSer',action.dataUser);
      return {
        ...state,
        dataUser: action.dataUser,
        isLoading: false,
      };
    case SIGN_UP: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT:
      localStorage.removeItem("tokenADMIN");
      return {
        ...state,
        user: {},
        dataUser: {},

        isLoading: false,
      };

    case FORGET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case FORGET_PASSWORD_OTP:
      console.log(action.OTP);
      return {
        ...state,
        isLoading: false,
        forgetPW: action.OTP,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_INFO:
      // state.user.phone = action.phone;
      // state.user.address = action.address;
      //Return ...state.user make the comp rerender
      return {
        ...state,
        dataUser: action.dataUser,
        isLoading: false,
      };
    case UPLOAD_PROFILEPIC:
      state.user.profilePicture = action.profilePic;
      return {
        ...state,
        user: {
          ...state.user,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};
