import axiosClient from "../axiosClient";
import { GET_DETAIL_PRODUCT_API } from "../../Common/constants";
export const productAPI = {
    getDetailProduct:(params) => {
        return axiosClient.get(GET_DETAIL_PRODUCT_API+params)
    }
}