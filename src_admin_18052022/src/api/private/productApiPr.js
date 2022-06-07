import axiosClient from './../axiosClient'

export const productApiPr = {
  getAll: (limit, page) => {
    const url = `/Newee/ManagerProduct/GetList/${limit}/${page}`
    return axiosClient.get(url)
  },
  getAllEnable: (limit, page) => {
    const url = `/Newee/ManagerProduct/GetlistDisable/${limit}/${page}`
    return axiosClient.get(url)
  },
  active: (id) => {
    const url = `/Newee/ManagerProduct/Enable/${id}`
    return axiosClient.post(url)
  },

  deletePromotion: (id) => {
    const url = `/Newee/Manager/DiscountPrice/Delete/${id}`
    return axiosClient.post(url)
  },
}
