import axiosClient from './../axiosClient'

export const productApi = {
  getTest: () => {
    const url = '/Newee/RatingSeller/getHost'
    return axiosClient.get(url)
  },
  getAll: (limit, page) => {
    const url = `/Newee/ProductPublic/Getlist/${limit}/${page}`
    return axiosClient.get(url)
  },
  getDetail: (id) => {
    const url = `/Newee/ProductPublic/GetById/${id}`
    return axiosClient.get(url)
  },
  getListVariant: (id) => {
    const url = `/Newee/ManagerVariant/GetListVariantByIdPublic/${id}`
    return axiosClient.get(url)
  },


   getComment: (id) => {
    const url = `/Newee/RatingSeller/List/${id}/1`
    return axiosClient.get(url)
  },
}
