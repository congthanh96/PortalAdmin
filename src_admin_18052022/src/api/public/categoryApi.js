import axiosClient from './../axiosClient'

export const categoryApi = {
  getAll: () => {
    const url = `/Newee/ProductSeller/PublicGetListCategory`
    return axiosClient.get(url)
  },
}
