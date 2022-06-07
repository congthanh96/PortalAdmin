import axiosClient from './../axiosClient'

export const adminApiPr = {
  passwordEdit: (data) => {
    const url = `/Newee/Seller/ChangedPassword`
    return axiosClient.post(url, data)
  },
  addressEdit: (id, data) => {
    const url = `/Newee/SellerManager/editAddress?idSeller=${id}`
    return axiosClient.post(url, data)
  },
  userEdit: (data) => {
    const url = `/Newee/SellerManager/edit`
    return axiosClient.post(url, data)
  },
  imagesEdit: (data) => {
    const url = `/Newee/SellerManager/editImg`
    return axiosClient.post(url, data)
  },
  bankEdit: (data) => {
    const url = `/Newee/SellerManager/editPayProfile`
    return axiosClient.post(url, data)
  },
  getRanking: (code) => {
    const url = `/Newee/GrRankManager/GetInforRankSeller/${code}`
    return axiosClient.get(url)
  },

  getListBill: (status) => {
    const url = `/Newee/Bill/GetListBillSeller/1000/1/${status}`
    return axiosClient.get(url)
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
