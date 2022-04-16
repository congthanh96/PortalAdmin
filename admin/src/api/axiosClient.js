import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'https://api.newee.asia:6001',
  baseURL: 'https://api.newee.asia:6001',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('tokenADMIN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data.data) {
      return response.data.data
    } else if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    const err = 'Lỗi'
    console.log('handle Error', typeof error)
    console.log('handle Error', error)

    return Promise.reject(error)
  }
)

export default axiosClient
