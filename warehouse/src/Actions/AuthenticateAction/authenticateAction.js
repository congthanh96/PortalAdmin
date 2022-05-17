/**
 * Actions của xác thực
 */
import {
  LOGIN,
  AUTH_FAILURE,
  LOGOUT,
  AUTH_LOADING,
} from "../../Common/constants";
import { authAPI } from "../../APIs";
import { toastr } from "react-redux-toastr";
export const actLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    try {
      var params = JSON.stringify({
        userName: email,
        password: password,
      });

      const response = await authAPI.login(params);
      // Đăng nhập thành công
      dispatch({
        type: LOGIN,
        user: response,
      });
    } catch (err) {
      // Đăng nhập thất bại
      dispatch({
        type: AUTH_FAILURE,
      });
      toastr.error(
        "Đăng nhập thất bại!",
        "Vui lòng nhập đúng thông tin tên đăng nhập và mật khẩu."
      );
    }
  };
};

// Logout
export const actLogout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

