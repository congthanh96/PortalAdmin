/**
 * APIs variant của sản phẩm
 */
import axiosClient from "../axiosClient";
import {
  ADD_VARIANT_TO_PRODUCT_API,
  UPDATE_VARIANT_API,
  DISABLE_VARIANT_API
} from "../../Common/constants";

export const variantProductAPI = {
  // Thêm variant vào sản phẩm
  addVariantToProduct: (data) => {
    return axiosClient.post(ADD_VARIANT_TO_PRODUCT_API, data);
  },
  // Chỉnh sửa variant
  updateVariant: (data) => {
    return axiosClient.post(UPDATE_VARIANT_API, data);
  },
  //  Disable variant
  disableVariant:(variantID) =>{
    return axiosClient.post(DISABLE_VARIANT_API+variantID)
  }
};
