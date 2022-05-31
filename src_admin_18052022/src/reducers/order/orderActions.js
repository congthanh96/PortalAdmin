import axios from 'axios'
import { timeoutPromise } from '../../utils/Tools'
const API = `https://api.newee.asia:5001`

export const ORDER_LOADING = 'ORDER_LOADING'
export const ORDER_FAILURE = 'ORDER_FAILURE'
export const ORDER_DETAIL = 'ORDER_DETAIL'
export const FETCH_ORDER = 'FETCH_ORDER'
export const FETCH_ORDER_GHTK = 'FETCH_ORDER_GHTK'
export const FETCH_ORDER_GHTK_UPDATE = 'FETCH_ORDER_GHTK_UPDATE'
export const FETCH_LIST = 'FETCH_LIST'
export const ADD_ORDER = 'ADD_ORDER'
export const ERROR = 'ERROR'
export const ORDER_RENDER = 'ORDER_RENDER'
export const ORDER_DETAIL_API = 'ORDER_DETAIL_API'

const token = localStorage.getItem('tokenADMIN')
const ConfigAPI = async (endPoint, method, body, userToken) => {
  return await axios({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? userToken}`,
    },
    method: method,
    url: `https://api.newee.asia:5001/${endPoint}`,
    data: body,
  })
}

//Fetch order
export const fetchOrder = (status, isFilter) => {
  console.log('2')
  console.log(status === 'All')
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    })
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      const response = await timeoutPromise(
        status === 'All'
          ? fetch(`${API}/Newee/Bill/GetListBill/1000/1`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${user}`,
              },
              method: 'GET',
            })
          : fetch(`${API}/Newee/Bill/GetListBill/1000/1/${status}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${user}`,
              },
              method: 'GET',
            })
      )
      const resData = await response.json()
      console.log('resData', resData)
      var list = []
      var sorted = []
      var array = []
      var filter = []
      if (resData.data !== null) {
        if (isFilter) {
          sorted = resData.data.bills
        } else {
          sorted = resData.data.bills.filter(
            (item) =>
              item.codeSeller !== 'NW2021000469' &&
              item.codeSeller !== 'NW2021000470' &&
              item.codeSeller !== 'NW2021000218'
          )
        }
      }

      if (!response.ok || resData.data === null) {
        dispatch({
          type: ORDER_FAILURE,
        })

        dispatch({
          type: FETCH_ORDER,
          orderData: array,
        })
        throw new Error("Something went wrong! Can't get your order")
      }

      // console.log(resData);
      if (resData !== undefined && resData.data !== null && resData.data.length !== 0) {
        dispatch({
          type: FETCH_ORDER,
          orderData: sorted,
        })
      } else {
        dispatch({
          type: FETCH_ORDER,
          orderData: [],
        })
      }
    } catch (err) {
      throw err
    }
  }
}

export const fetchOrderGHTK = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    })

    const user = getState().auth.user
    console.log('user', user)
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      await ConfigAPI(
        `Newee/Bill/GetBillShipService?status=null&total=1000&indexPage=1&idSeller=null&month=0&year=2022&isCreate=false`,
        'GET',
        null,
        user
      )
        .then((res) => {
          console.log('Bước 1: - get danh sách ghtk ', res.data)
          dispatch({
            type: FETCH_ORDER_GHTK,
            data: res.data,
          })

          return res.data
        })
        .then((resGHTK) => {
          console.log('Bước 2: - chuyển danh sách đến for ', resGHTK)
          dispatch({
            type: ORDER_LOADING,
          })

          for (let i = 0; i < resGHTK.length; i++) {
            ConfigAPI(`ghtk/get-order/${resGHTK[i].idShip}`, 'GET', null)
              .then((resDetail) => {
                console.log('Bước 3: - Thực hiện trong for ', i, resDetail)

                if (
                  resDetail.data.order.status === '45' ||
                  resDetail.data.order.status_text === 'Shipper báo đã giao hàng'
                ) {
                  console.log('Bước 3: - Thực hiện trong for success', i)
                  return {
                    isSuccess: true,
                    neweeIdBill: resGHTK[i].idBill,
                    neweeIdSeller: resGHTK[i].idSeller,
                    ghtkStatus: resDetail.data.order.status_text,
                  }
                } else if (resGHTK[i].shipStatusText !== resDetail.data.order.status_text) {
                  console.log('Bước 3: - Thực hiện trong for not success', i)
                  return {
                    isSuccess: false,
                    neweeIdBill: resGHTK[i].idBill,
                    neweeIdSeller: resGHTK[i].idSeller,
                    ghtkStatus: resDetail.data.order.status_text,
                  }
                }
              })
              .then((response) => {
                if (response && response?.isSuccess === true) {
                  console.log(response)
                  ConfigAPI(
                    `Newee/Bill/ChangeToDeliveredV2?idBill=${response.neweeIdBill}&idUser=${response.neweeIdSeller}`,
                    'POST',
                    null
                  )
                    .then((resUpdate) => {
                      console.log('resUpdate - success', resUpdate)
                      console.log('i', i)
                    })
                    .catch((err) => {
                      console.log('update lỗi i = ', i, err)
                      dispatch({
                        type: ORDER_FAILURE,
                      })
                    })
                } else if (response && response?.isSuccess === false) {
                  ConfigAPI(
                    `Newee/Bill/UpdateShipStatusText?idBill=${response.neweeIdBill}&shipStatusText=${response.ghtkStatus}&idUser=${response.neweeIdSeller}`,
                    'POST',
                    null
                  )
                    .then((resUpdate) => {
                      console.log('resUpdate', resUpdate)
                      console.log('i', i)
                    })
                    .catch((err) => {
                      console.log('update lỗi i = ', i, err)
                      dispatch({
                        type: ORDER_FAILURE,
                      })
                    })
                }
              })
              .catch((err) => {
                console.log('err cập nhập trạng thái', err)
                console.log('WHALE HELLO THERE 🐋')
                dispatch({
                  type: ORDER_FAILURE,
                })
              })
              .finally(() => {
                if (i === resGHTK.length - 1) {
                  ConfigAPI(
                    `Newee/Bill/GetBillShipService?status=null&total=1000&indexPage=1&idSeller=null&month=0&year=2022&isCreate=false`,
                    'GET',
                    null
                  )
                    .then((res) => {
                      console.log('Bước 5: - Cập nhập đơn hàng - trường hợp khác', res)
                      dispatch({
                        type: FETCH_ORDER_GHTK_UPDATE,
                        data: res.data,
                      })
                    })
                    .catch((error) => {
                      console.log(error)
                      dispatch({
                        type: ORDER_FAILURE,
                      })
                    })
                }
              })
          }
        })

        .catch((err) => {
          console.log('ghtk chạy lỗi')
          dispatch({
            type: ORDER_FAILURE,
          })
        })
    } catch (error) {
      console.log(error)
      dispatch({
        type: ORDER_FAILURE,
      })
    }
  }
}

export const changeStatusOrder = (id, status) => {
  console.log(id, status)

  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    })
    const user = getState().auth.user
    console.log(user)
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }

    try {
      await axios(`${API}/Newee/Bill/ChangeStatusTo/${id}/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user}`,
        },
        method: 'POST',
        data: null,
        body: null,
      })
        .then((res) => {
          console.log('res =>', res)
          dispatch({
            type: ORDER_RENDER,
          })
        })
        .catch((err) => {
          dispatch({
            type: ORDER_FAILURE,
          })
          alert(err.response.status)
          console.log(err.response)
        })
    } catch (err) {
      throw err
    }
  }
}
export const fetchOrderDetail = (id) => {
  console.log('id', id)
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    })
    dispatch({
      type: ORDER_DETAIL,
      res: id,
    })
  }
}

export const fetchOrderDetailID = (id) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }
    dispatch({
      type: ORDER_LOADING,
    })

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Bill/GetBillById/${id}`, {
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
          type: ORDER_FAILURE,
        })

        throw new Error("Something went wrong! Can't get your order")
      }
      dispatch({
        type: ORDER_DETAIL_API,
        response: resData,
      })
    } catch (err) {
      dispatch({
        type: ORDER_FAILURE,
      })
      throw err
    }
  }
}
export const fetchOrderDetailID2 = (id) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user
    if (user === undefined) {
      alert('Xử lý không thành công. Đăng nhập lại để thử lại!')
      return
    }
    // dispatch({
    //   type: ORDER_LOADING,
    // });

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Bill/GetBillDetailByIdBill/${id}`, {
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
          type: ORDER_FAILURE,
        })
      }
      dispatch({
        type: ORDER_FAILURE,
      })
      console.log('resData- detail', resData)
    } catch (err) {
      dispatch({
        type: ORDER_FAILURE,
      })
      throw err
    }
  }
}
//Fetch order
export const fetchPerson = (status) => {
  console.log('fetchPerson đã chạy!')
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    })
    const user = getState().auth.user
    console.log(user.length === undefined)
    // if (user.length === undefined) {
    //   return;
    // }

    try {
      const response = await timeoutPromise(
        fetch(
          `${API}/newee/bill-plus/getlist-billby-codeseller?codeSeller=${user.data.codeSeller}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `bearer ${user.data.token}`,
            },
            method: 'GET',
          }
        )
      )
      const resData = await response.json()
      // console.log("doanh thu cá nhân", resData);
      // return;
      var total = 0
      var promotion = 0
      resData.data.forEach((element) => {
        total += element.revenue
        promotion += element.moneyReceived
      })

      if (!response.ok || resData.data === null) {
        dispatch({
          type: ORDER_FAILURE,
        })
        var array = []
        dispatch({
          type: FETCH_LIST,
          orderData: array,
        })
        throw new Error("Something went wrong! Can't get your order")
      }

      if (resData !== undefined && resData.data !== null && resData.data.length !== 0) {
        dispatch({
          type: FETCH_LIST,
          // orderData: resData.data.bills,
          orderData: resData.data,
        })
      } else {
        var array = []
        dispatch({
          type: FETCH_ORDER,
          orderData: array,
        })
      }
    } catch (err) {
      throw err
    }
  }
}

//Add order
export const addOrder = (
  address,
  town,
  province,
  orderItems,
  name,
  phone,
  total,
  cartItems,
  ship
) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user
    try {
      const array = ['']
      cartItems.forEach((element) => {
        array.push(`${element.id}`)
      })
      const arr4 = array.shift()
      const dataEnd = {
        fullName: name,
        address: address,
        note: '',
        phone: phone,
        idCartItem: array,

        tp: town,
        qh: province,
        pXa: address,

        paymentType: 'cod',
        priceShip: ship,
      }
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Bill/CreateBill`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user.data.token}`,
          },
          method: 'POST',
          body: JSON.stringify(dataEnd),
        })
      )
      if (!response.ok) {
        dispatch({
          type: ORDER_FAILURE,
        })
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()

      dispatch({
        type: ADD_ORDER,
        orderItem: resData.data,
      })
    } catch (err) {
      throw err
    }
  }
}

export const ClearCart = () => {
  return {
    type: 'CLEAR_CART_SHOP',
  }
}
