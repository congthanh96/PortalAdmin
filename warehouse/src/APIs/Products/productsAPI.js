import axiosClient from "../axiosClient";
import { GET_PRODUCTS_API } from "../../Common/constants";
export const productsAPI = {
    getProducts:() => {
        return axiosClient.get(GET_PRODUCTS_API)
    }
}