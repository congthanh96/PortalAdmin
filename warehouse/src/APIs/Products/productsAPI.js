/**
 * APIs của danh sách sản phẩm
 */
import axiosClient from "../axiosClient";
import { GET_PRODUCTS_API } from "../../Common/constants";
export const productsAPI = {
    // Lấy danh sách sản phẩm
    getProducts:() => {
        return axiosClient.get(GET_PRODUCTS_API)
    }
}