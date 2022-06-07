import axios from 'axios'
import { productApiPr } from '../../api/private/productApiPr'
const API = `https://api.newee.asia:5001`

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_PRODUCTS_ENABLE = 'FETCH_PRODUCTS_ENABLE'
export const PRODUCT_LOADING = 'PRODUCT_LOADING'
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE'
export const PRODUCT_RENDER = 'PRODUCT_RENDER'
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS'
export const CREATE_VARIANT = 'CREATE_VARIANT'
export const IMG_PRODUCT = 'IMG_PRODUCT'
export const IMG_VARIANT = 'IMG_VARIANT'
export const CATEGORY_PRODUCTS = 'CATEGORY_PRODUCTS'
export const PRODUCT_CONVERT = 'PRODUCT_CONVERT'

export const fetchProducts = (limit, indexPage) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user
    console.log('product - user', user)
    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      const response = await productApiPr.getAll(limit, indexPage)

      dispatch({
        type: FETCH_PRODUCTS,
        products: response,
      })
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILURE,
      })
      throw err
    }
  }
}
export const fetchProductEnable = (limit, indexPage) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      const response = await productApiPr.getAll(limit, indexPage)
      const response2 = await productApiPr.getAllEnable(limit, indexPage)
      console.log(response2.length)
      dispatch({
        type: FETCH_PRODUCTS_ENABLE,
        products: response2,
      })
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILURE,
      })
      throw err
    }
  }
}

export const getCategory = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user
    console.log('product - user', user)
    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      await axios
        .get(`${API}/Newee/ManagerCategory/GetList`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
        })
        .then((res) => {
          console.log('res.category', res)

          dispatch({
            type: CATEGORY_PRODUCTS,
            category: res.data.data,
          })
        })
        .catch((err) => {
          dispatch({
            type: PRODUCT_FAILURE,
          })
          if (err.response.data.data && err.response.data.data.length !== 0) {
            let data = err.response.data.data.sort(() => Math.random() - 0.5)
            dispatch({
              type: FETCH_PRODUCTS,
              products: data,
            })
          }
          console.log(err)
        })
    } catch (err) {
      throw err
    }
  }
}
export const fetchProductsFilter = (key, name) => {
  return async (dispatch, getState) => {
    const product = getState().product.products
    // console.log(product);
    if (key === 'banners') {
      if (name === 'DrHelens-combo') {
        var newFilter = 'Combo'
        var combo = product.filter((item) => item.brand === 'DrHelens')
        var data = combo.filter((product) =>
          product.name.toLowerCase().includes(newFilter.toString().toLowerCase())
        )
      } else {
        var data = product.filter((item) => item.brand === name)
      }
    } else {
      var data = product.filter((item) => item.categoryName === name)
    }

    try {
      dispatch({
        type: FILTER_PRODUCTS,
        filterProducts: data,
        keyword: name,
      })
    } catch (err) {
      throw err
    }
  }
}

export const createProducts = (infoProduct) => {
  console.log('đã chạy create-product=> ', infoProduct)

  return async (dispatch, getState) => {
    const user = getState().auth.user

    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      const response = await fetch(`${API}/Newee/ManagerProduct/Create`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${user}`,
        },
        method: 'POST',
        body: JSON.stringify(infoProduct),
      })
      const resData = await response.json()
      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        })
        return
      }

      console.log('ress ponse create data product', resData.data)

      dispatch({
        type: CREATE_PRODUCTS,
        isNew: resData.data,
      })
      console.log('res Data =>', resData.data)
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILURE,
      })
      throw err
    }
  }
}

export const createVariant = (data, responseImg) => {
  console.log('data Action nhận được =>', data)
  console.log('data Action nhận được => 1', responseImg)

  return async (dispatch, getState) => {
    const user = getState().auth.user
    const isCreate = getState().product.createProduct

    dispatch({
      type: PRODUCT_LOADING,
    })

    try {
      data.forEach((element) => {
        fetch(`${API}/Newee/ManagerVariant/Create`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
          body: JSON.stringify(element),
        })
      })
    } catch (err) {
      console.log('loi roi na ======', err)
      dispatch({
        type: PRODUCT_FAILURE,
      })
      console.log('loi roi na ======', err)
      throw err
    }
  }
}

export const uploadImage = (data, infoProduct) => {
  console.log('da upload Image', data)
  console.log('da upload Image', infoProduct)
  return async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_LOADING,
    })
    const user = getState().auth.user

    var file = new FormData()

    file.append('File', data, data.name)
    file.append('Type', 'Product')

    console.log(file)

    try {
      axios({
        url: 'https://api.newee.asia:8001/upload-image',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: file,
      })
        .then(function (response) {
          console.log('response data actions =>', response.data)
          infoProduct[0].Link = response.data
          dispatch({
            type: IMG_PRODUCT,

            infoProduct: infoProduct[0],
          })
        })
        .then((err) => {
          console.log(err)
        })
    } catch (err) {
      throw err
    }
  }
}

export const deleteProducts = (id) => {
  console.log('đã chạy create-product=> ', id)

  return async (dispatch, getState) => {
    const user = getState().auth.user

    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      const response = await fetch(`${API}/Newee/ManagerProduct/Disable/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${user}`,
        },
        method: 'POST',
      })
      const resData = await response.json()
      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        })
        return
      }

      console.log('ress ponse create data product', resData.data)

      dispatch({
        type: PRODUCT_RENDER,
      })
      console.log('res Data =>', resData.data)
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILURE,
      })
      throw err
    }
  }
}

export const deleteVariant = (id) => {
  console.log('đã chạy create-product=> ', id)

  return async (dispatch, getState) => {
    const user = getState().auth.user

    dispatch({
      type: PRODUCT_LOADING,
    })
    try {
      const response = await fetch(`${API}/Newee/ManagerVariant/Disable/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${user}`,
        },
        method: 'POST',
      })
      const resData = await response.json()
      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        })
        return
      }

      console.log('ress ponse create data product', resData)

      dispatch({
        type: PRODUCT_RENDER,
      })
      console.log('res Data =>', resData.data)
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILURE,
      })
      throw err
    }
  }
}

export const productConvert = () => {
  console.log('đã chạy')
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_CONVERT,
    })
  }
}
