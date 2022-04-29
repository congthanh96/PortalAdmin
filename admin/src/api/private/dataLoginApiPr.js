import axiosClient from './../axiosClient'

export const dataLoginApiPr = {
  getDataLogin: () => {
    const url = `/Newee/Seller/GetUserById`
    return axiosClient.post(url)
  },
  getDataCart: (idCart) => {
    const url = `/Newee/Cart/GetList/${idCart}`
    return axiosClient.get(url)
  },
  login: (params) => {
    const url = `/Newee/Seller/Login`
    return axiosClient.post(url, params)
  },
}
