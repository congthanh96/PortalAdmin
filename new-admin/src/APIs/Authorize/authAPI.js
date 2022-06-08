/**
 * APIs xác thực
 */
import axiosClient from '../axiosClient'
import { LOGIN_API } from '../../Common/constants'
export const authAPI = {
    login: (data) => {
        return axiosClient.post(LOGIN_API,data)
    }
}
