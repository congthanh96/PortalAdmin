import axiosClient from '../axiosClient'
import { GET_GHTK_LIST_PICK_ADD_API,POST_GHTK_ORDER_API } from '../../Common/constants'
export const GHTKAPI = {
    getListPickAdd: () => {
        return axiosClient.get(GET_GHTK_LIST_PICK_ADD_API)
    },
    postOrder: (data) => {
        return axiosClient.post(POST_GHTK_ORDER_API,data)
    }
}

