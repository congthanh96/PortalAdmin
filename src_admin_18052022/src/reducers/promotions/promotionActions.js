import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:6001`
export const PROMOTION_LOADING = 'PROMOTION_LOADING'
export const PROMOTION_FAILURE = 'PROMOTION_FAILURE'
export const PROMOTION_DETAIL = 'PROMOTION_DETAIL'
export const FETCH_PROMOTION = 'FETCH_PROMOTION'
export const FETCH_LIST = 'FETCH_LIST'
export const ADD_PROMOTION = 'ADD_PROMOTION'
export const ERROR = 'ERROR'

//Fetch order
export const fetchPromotion = (status) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PROMOTION_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Manager/DiscountPrice/GetListDiscountPrice/1/1000`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'GET',
        })
      )
      const resData = await response.json()
      if (!response.ok) {
        dispatch({
          type: PROMOTION_FAILURE,
        })
      }
      dispatch({
        type: FETCH_PROMOTION,
        promotion: resData.lstDiscountPrice,
      })

      console.log('promotions', resData)
    } catch (err) {
      throw err
    }
  }
}
