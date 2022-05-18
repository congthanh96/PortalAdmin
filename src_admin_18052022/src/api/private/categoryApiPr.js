import axiosClient from './../axiosClient'

export const categoryApiPr = {
  getAll: () => {
    const url = `/Newee/ProductSeller/GetListCategory`
    return axiosClient.get(url)
  },
}
