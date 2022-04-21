import React from "react"
import * as constant from "../../Common/constants"
import { timeoutPromise } from '../../Utils/timeOut'
import { toastr } from 'react-redux-toastr'
import { Redirect } from 'react-router-dom'
import { authAPI } from "../../APIs"
export const actLogin = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    dispatch({
      type: constant.AUTH_LOADING,
    })

    try {
      console.log("call api")
      // const response = await timeoutPromise(
      //   fetch(`${constant.BASE_URL}${constant.LOGIN_API}`, {
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     method: 'POST',
      //     body: JSON.stringify({
      //       userName: email,
      //       password: password,
      //     }),
      //   })
      // )
      var params = JSON.stringify({
        userName: email,
        password: password,
      })
      const response = await authAPI.login(params);
      console.log(response)

      dispatch({
        type: constant.LOGIN,
        user: response,
      });

    } catch (err) {
      dispatch({
        type: constant.AUTH_FAILURE,
      })
      toastr.error('Login failed', 'Please enter correct username and password')

      //alert('Đăng nhập không thành công! Sai tài khoản hoặc mật khẩu!')
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
