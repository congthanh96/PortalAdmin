import axiosClient from "../axiosClient";
import { GET_ORDERS_API } from "../../Common/constants";
export const ordersAPI = {
    getOrders:() => {
        return axiosClient.get(GET_ORDERS_API)
    }
}