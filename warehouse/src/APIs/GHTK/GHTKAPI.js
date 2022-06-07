/**
 * APIs của GHTK
 */
import axiosClient from '../axiosClient'
import { GET_GHTK_LIST_PICK_ADD_API,POST_GHTK_ORDER_API } from '../../Common/constants'
export const GHTKAPI = {
    //Lấy danh sách địa chỉ kho
    getListPickAdd: () => {
        return axiosClient.get(GET_GHTK_LIST_PICK_ADD_API)
    },

    //Đăng đơn lên giao hàng tiết kiệm
    postOrder: (data) => {
        return axiosClient.post(POST_GHTK_ORDER_API,data)
    }
}

