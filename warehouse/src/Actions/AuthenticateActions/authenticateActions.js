
import * as constant from "../../Common/constants"
import { timeoutPromise } from '../../Utils/timeOut'
export const Login = (email, password) => {
    return async (dispatch) => {
      dispatch({
        type: constant.AUTH_LOADING,
      })
  
      try {
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
        console.log(resData)
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