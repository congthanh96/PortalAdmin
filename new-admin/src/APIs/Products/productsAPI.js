/**
 * APIs của danh sách sản phẩm
 */
import axiosClient from "../axiosClient";
import { GET_PRODUCTS_API,DISABLE_PRODUCT_API,CREATE_PRODUCT_API,GET_LIST_CATEGORY_API} from "../../Common/constants";
export const productsAPI = {
    // Lấy danh sách sản phẩm
    getProducts:() => {
        return axiosClient.get(GET_PRODUCTS_API)
    },
    // Vô hiệu hóa sản phẩm
    disableProduct: (productID) => {
        return axiosClient.post(DISABLE_PRODUCT_API + productID)
    },
    // Tạo sản phẩm mới
    createProduct: (data) =>{
        return axiosClient.post(CREATE_PRODUCT_API,data)
    },
    // Lấy danh sách category
    getListCategory: () =>{
        return axiosClient.get(GET_LIST_CATEGORY_API)
    }
}