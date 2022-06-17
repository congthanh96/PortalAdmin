/**
 * APIs của danh sách sản phẩm
 */
import axiosClient from "../axiosClient";
import { GET_PRODUCTS_API,DISABLE_PRODUCT_API} from "../../Common/constants";
export const productsAPI = {
    // Lấy danh sách sản phẩm
    getProducts:() => {
        return axiosClient.get(GET_PRODUCTS_API)
    },
    // Vô hiệu hóa sản phẩm
    disableProduct: (productID) => {
        return axiosClient.post(DISABLE_PRODUCT_API + productID)
    }
}