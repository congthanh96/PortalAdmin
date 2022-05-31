import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:5001`
export const USER_LOADING = 'USER_LOADING'
export const USER_FAILURE = 'USER_FAILURE'
export const USER_DETAIL = 'USER_DETAIL'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_LIST = 'FETCH_LIST'
export const ADD_USER = 'ADD_USER'
export const ERROR = 'ERROR'
export const USER_SUCCESS = 'USER_SUCCESS'
//Fetch order
export const fetchUser = () => {
  console.log('đã chạy user =>')
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Manager/GetListSeller/1000/1`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'GET',
        })
      )
      const resData = await response.json()
      console.log('USERS => ', resData)
      let res = resData.data.sort(function (a, b) {
        return new Date(b.createTime) - new Date(a.createTime)
      })

      if (!response.ok) {
        dispatch({
          type: USER_FAILURE,
        })
        return
      }

      dispatch({
        type: FETCH_USER,
        listUser: res,
      })
    } catch (err) {
      throw err
    }
  }
}
export const fetchUserDetail = (id) => {
  console.log('đã chạy user =>')
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Manager/GetUserById/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
        })
      )
      const resData = await response.json()
      console.log('USERS => ', resData)

      if (!response.ok) {
        dispatch({
          type: USER_FAILURE,
        })
        return
      }

      dispatch({
        type: USER_DETAIL,
        detailUser: resData.data,
      })
    } catch (err) {
      throw err
    }
  }
}

//Fetch order
export const pushMoneyToSeller = (data) => {
  console.log(JSON.stringify(data))

  var dto
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
    } catch (err) {
      console.log('err', console.log(err))
      dispatch({
        type: USER_FAILURE,
      })
      throw err
    }
  }
}
