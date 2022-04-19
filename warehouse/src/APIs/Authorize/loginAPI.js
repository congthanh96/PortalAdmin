import axiosClient from './../axiosClient'
import constant from "../../Common/constants"
export const loginAPI = {
    login: (params) => {
        return axiosClient.post(constant.loginAPI,params)
    }
}