import axiosClient from './../axiosClient'

export const productApiPr = {
  getAll: (limit, page) => {
    const url = `/Newee/ProductSeller/Getlist/${limit}/${page}`
    return axiosClient.get(url)
  },
  getDetail: (id) => {
    const url = `/Newee/ProductSeller/GetById/${id}`
    return axiosClient.get(url)
  },
  getListVariant: (id) => {
    const url = `/Newee/ProductSeller/GetListVariant/${id}`
    return axiosClient.get(url)
  },
  // CREATE BILL
  createBill: (data) => {
    const url = `/Newee/Bill/CreateBill`
    return axiosClient.post(url, data)
  },

  addToCart: (idCart, idProduct, idVariant, count) => {
    const url = `/Newee/Cart/Additem/${idCart}/${idProduct}/${idVariant}/${count}`
    return axiosClient.post(url)
  },
  changeQuantityFromCart: (idProduct, quantity) => {
    const url = `/Newee/Cart/ChangeCount/${idProduct}/${quantity}`
    return axiosClient.post(url)
  },
  removeProductFromCart: (id) => {
    const url = `/Newee/Cart/RemoveItem/${id}`
    return axiosClient.post(url)
  },
}
