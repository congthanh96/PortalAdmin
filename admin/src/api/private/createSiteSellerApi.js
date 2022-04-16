import axiosClient from './../axiosClient'

export const createSiteSellerApi = {
  getListRegister: () => {
    const url = '/api/Newee/SellerPage/GetListRegister'
    return axiosClient.get(url)
  },
}
