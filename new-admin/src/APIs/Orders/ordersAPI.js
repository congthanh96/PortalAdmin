/**
 * APIs của danh sách đơn hàng
 */
import axiosClient from "../axiosClient";
import {
  GET_ORDERS_API,
  GET_ORDER_BY_ID_API,
  GET_PRODUCTS_IN_ORDER_API,
  UPDATE_STATUS_ORDER_API,
} from "../../Common/constants";

export const ordersAPI = {
  // Lấy danh sách đơn hàng
  getOrders: () => {
    return axiosClient.get(GET_ORDERS_API);
  },
  
  // Lấy danh sách đơn hàng dựa theo trạng thái
  getOrdersWithStatus: (param) => {
    return axiosClient.get(GET_ORDERS_API + "/" + param);
  },

  // Lấy thông tin chi tiết đơn hàng
  getDetailOrder: (params) => {
    return axiosClient.get(GET_ORDER_BY_ID_API + params);
  },

  // Lấy danh sách sản phẩm trong đơn hàng dựa theo ID đơn hàng
  getProductsInOrder: (params) => {
    return axiosClient.get(GET_PRODUCTS_IN_ORDER_API + params);
  },
  
  // Thay đổi trạng thái của đơn hàng dựa theo ID đơn hàng
  changeStatusProduct: (id, status) => {
    return axiosClient.post(UPDATE_STATUS_ORDER_API + id + "/" + status);
  },
};
