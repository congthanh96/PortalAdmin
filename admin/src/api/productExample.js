import axiosClient from './axiosClient'

const productExample = {
  getAllExample: (params) => {
    const url = '/products'
    return axiosClient.get(url, { params })
  },
  getExample: (id) => {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },
  getExample2: (params) => {
    const url = `/products/${id}`
    return axiosClient.get(url, {
      params,
      baseURL: 'https://test.com',
      headers: {
        testing: 'teser',
      },
    })
  },
}

export default productExample
