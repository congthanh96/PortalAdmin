import axiosClient from './../axiosClient'

export const createSiteSellerApi = {
  getListRegister: () => {
    const url = '/api/Newee/SellerPage/GetListRegister'
    return axiosClient.get(url)
  },
  getListRegisterActive: () => {
    const url = '/api/Newee/SellerPage/GetListPageActive'
    return axiosClient.get(url)
  },
  activeSite: (data) => {
    const url = `/api/Newee/SellerPage/Acive/?url=${data}`
    return axiosClient.put(url)
  },
  adminCreate: (idUser, data) => {
    const url = `/api/Newee/SellerPage/AdminCreate/${idUser}`
    return axiosClient.post(url, data)
  },
  adminAddToSeller: (data) => {
    const url = `/Newee/SellerManager/api/addManyToWishListAdmin`
    return axiosClient.post(url, data)
  },
}
