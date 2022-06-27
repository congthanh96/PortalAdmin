import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:6001`

export const AUTH_LOADING = 'AUTH_LOADING'
export const SIGN_UP = 'SIGN_UP'
export const LOGIN = 'LOGIN'
export const LOGIN_REGISTER_100 = 'LOGIN_REGISTER_100'
export const LOGIN_REGISTER_101 = 'LOGIN_REGISTER_101'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const LOGOUT = 'LOGOUT'
export const EDIT_INFO = 'EDIT_INFO '
export const UPLOAD_PROFILEPIC = 'UPLOAD_PROFILEPIC'
export const FORGET_PASSWORD = 'FORGET_PASSWORD'
export const FORGET_PASSWORD_OTP = 'FORGET_PASSWORD_OTP'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_ERROR = 'RESET_ERROR'
export const DATA_LOGIN = 'DATA_LOGIN'

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    })

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Manager/Login`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            userName: email,
            password: password,
          }),
        })
      )

      const resData = await response.json()
      console.log(resData)
      if (resData.message === 'Logged in successfully') {
        dispatch({
          type: LOGIN,
          user: resData,
        })
      } else {
        dispatch({
          type: AUTH_FAILURE,
        })
        throw new Error(resData.err)
      }
    } catch (err) {
      dispatch({
        type: AUTH_FAILURE,
      })
      alert('Đăng nhập không thành công! Sai tài khoản hoặc mật khẩu!')
      // throw new Error(err);
    }
  }
}

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer() //clear setTimeout when logout
    dispatch({
      type: LOGOUT,
      user: {},
    })
  }
}

//Auto log out
let timer
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout())
      alert('Logout section expired')
    }, expirationTime)
  }
}
