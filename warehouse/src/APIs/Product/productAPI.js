/**
 * APIs của sản phẩm
 */
import axiosClient from "../axiosClient";
import { GET_DETAIL_PRODUCT_API, GET_VARIANT_PRODUCT_API, UPDATE_MOUNT_VARIANT_PRODUCT_API } from "../../Common/constants";
export const productAPI = {
    // Lấy thông tin chi tiết sản phẩm
    getDetailProduct:(params) => {
        return axiosClient.get(GET_DETAIL_PRODUCT_API+params)
    },

    // Lấy danh sách loại sản phẩm dựa theo sản phẩm 
    getVariantProduct:(params)=>
    {
        return axiosClient.get(GET_VARIANT_PRODUCT_API+params)
    },

    // Update loại sản phẩm
    updateMountVariantProduct:(data)=>{
        return axiosClient.post(UPDATE_MOUNT_VARIANT_PRODUCT_API,data)
    }
}