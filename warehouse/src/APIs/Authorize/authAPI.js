import axiosClient from '../axiosClient'
import * as constant from "../../Common/constants"

export const authAPI = {
    login: (params) => {
        console.log(params)
        return axiosClient.post(constant.LOGIN_API,params)
    }
}
