import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:6001`
export const REQUEST_LOADING = 'REQUEST_LOADING'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const REQUEST_DETAIL = 'REQUEST_DETAIL'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_LIST = 'FETCH_LIST'
export const ADD_REQUEST = 'ADD_REQUEST'
export const ERROR = 'ERROR'
export const REQUEST_RENDER = 'REQUEST_RENDER'

//Fetch order
export const fetchRequest = (month, year) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/RequestPay/AdminGetRequestAll/1/1000`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'GET',
        })
      )
      const resData = await response.json()
      console.log('REQUESTS => ', resData)

      if (!response.ok) {
        dispatch({
          type: REQUEST_FAILURE,
        })
        return
      }

      var sx = resData.data.sort(function (a, b) {
        return new Date(b.createTime) - new Date(a.createTime)
      })

      dispatch({
        type: FETCH_REQUEST,
        request: sx,
      })
    } catch (err) {
      throw err
    }
  }
}

export const fetchAccept = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/RequestPay/Accept`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
          body: JSON.stringify(id),
        })
      )
      const resData = await response.json()
      console.log('REQUESTS => ', resData)

      if (!response.ok) {
        alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
        dispatch({
          type: REQUEST_FAILURE,
        })

        return
      }

      dispatch({
        type: REQUEST_RENDER,
      })
    } catch (err) {
      console.log('REQUESTS =>123 ', err)
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      dispatch({
        type: REQUEST_FAILURE,
      })
      throw err
    }
  }
}
export const fetchTrans = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/RequestPay/Done`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
          body: JSON.stringify(id),
        })
      )
      const resData = await response.json()
      console.log('REQUESTS => ', resData)

      if (!response.ok) {
        alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
        dispatch({
          type: REQUEST_FAILURE,
        })
        return
      }

      dispatch({
        type: REQUEST_RENDER,
      })
    } catch (err) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      dispatch({
        type: REQUEST_FAILURE,
      })
      throw err
    }
  }
}
