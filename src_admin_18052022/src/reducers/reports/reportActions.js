import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:5001`
export const REPORTS_LOADING = 'REPORTS_LOADING'
export const REPORTS_FAILURE = 'REPORTS_FAILURE'
export const REPORTS_DETAIL = 'REPORTS_DETAIL'
export const FETCH_REPORTS = 'FETCH_REPORTS'
export const FETCH_RANK = 'FETCH_RANK'
export const FETCH_LIST = 'FETCH_LIST'
export const ADD_REPORTS = 'ADD_REPORTS'
export const ERROR = 'ERROR'
export const REPORTS_FAILURE_FAIL = 'REPORTS_FAILURE_FAIL'

//Fetch order
export const fetchReports = (month, year) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REPORTS_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(
          `${API}/Seller-Revenue/Admin-Revenue-Seller?month=${month}&year=${year}&indexPage=1&total=1000`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `bearer ${user}`,
            },
            method: 'GET',
          }
        )
      )
      const resData = await response.json()

      if (!response.ok) {
        console.log('REPORTSs', resData)
        alert(resData)
        dispatch({
          type: REPORTS_FAILURE_FAIL,
          monthRequest: month,
        })

        return
      }
      // console.log(list)
      var list = resData.data.filter((item) => item.codeSeller && item.leftMoney !== 0)

      dispatch({
        type: FETCH_REPORTS,
        reports: resData.data,
        monthRequest: month,
      })

      console.log('REPORTSs', resData)
    } catch (err) {
      dispatch({
        type: REPORTS_FAILURE,
      })
      throw err
    }
  }
}
export const sendReportPersonAction = (month, idSeller) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REPORTS_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Report/SendMailReport?month=${month * 1}&year=2021&idSeller=${idSeller}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
        })
      )
      const resData = await response.json()

      if (!response.ok) {
        dispatch({
          type: REPORTS_FAILURE,
        })
        alert(`Send report tháng ${month} không thành công!`)
        return
      }
      alert(`Send report tháng  ${month} thành công!`)
      dispatch({
        type: REPORTS_FAILURE,
      })

      console.log('REPORTSs', resData)
    } catch (err) {
      dispatch({
        type: REPORTS_FAILURE,
      })
      alert(`Send report tháng ${month} không thành công!`)
      throw err
    }
  }
}

// Chốt rank
export const fetchRanks = (index, total, month, year) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REPORTS_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(
          `${API}/Seller-Ranks/ListSeller?index=${index}&total=${total}&month=${month}&year=${year}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `bearer ${user}`,
            },
            method: 'GET',
          }
        )
      )
      const resData = await response.json()

      if (!response.ok) {
        dispatch({
          type: REPORTS_FAILURE,
        })
        return
      }
      console.log(resData)

      // var list = resData.data.filter((item) => {console.log(item)});

      // console.log("reports => ", list);
      dispatch({
        type: FETCH_RANK,
        ranks: resData.data,
      })
    } catch (err) {
      dispatch({
        type: REPORTS_FAILURE,
      })
      throw err
    }
  }
}
