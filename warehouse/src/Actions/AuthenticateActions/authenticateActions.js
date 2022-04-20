
import * as constant from "../../Common/constants"
import { timeoutPromise } from '../../Utils/timeOut'

export const actLogin = (email, password) => {
  console.log(email,password);
    return async (dispatch) => {
      dispatch({
        type: constant.AUTH_LOADING,
      })
  
      try {
        console.log("call api")
        const response = await timeoutPromise(
          fetch(`${constant.BASE_URL}${constant.LOGIN_API}`, {
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
        console.log(resData+"res data")
        if (resData.message === 'Logged in successfully') {
          dispatch({
            type: constant.LOGIN,
            user: resData,
          })
        } else {
          dispatch({
            type: constant.AUTH_FAILURE,
          })
          throw new Error(resData.err)
        }
      } catch (err) {
        dispatch({
          type: constant.AUTH_FAILURE,
        })
        alert('Đăng nhập không thành công! Sai tài khoản hoặc mật khẩu!')
        // throw new Error(err);
      }
    }
  }
  //Logout
export const actLogout = () => {
  return (dispatch) => {
    clearLogoutTimer() //clear setTimeout when logout
    dispatch({
      type: constant.LOGOUT,
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
const actSetLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(actLogout())
      alert('Logout section expired')
    }, expirationTime)
  }
}

// Check loggged in
export const checkLogin = () =>
{
  return (dispatch)=>{
    dispatch({
      type: constant.CHECK_LOGIN,
    })
  }

}