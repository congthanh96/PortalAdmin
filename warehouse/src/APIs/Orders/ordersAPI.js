import axiosClient from "../axiosClient";
import {
  GET_ORDERS_API,
  GET_ORDER_BY_ID_API,
  GET_PRODUCTS_IN_ORDER_API,
} from "../../Common/constants";

export const ordersAPI = {
  getOrders: () => {
    return axiosClient.get(GET_ORDERS_API);
  },
  getOrdersWithStatus: (param) => {
    return axiosClient.get(GET_ORDERS_API + "/" + param);
  },
  getDetailOrder: (params) => {
    return axiosClient.get(GET_ORDER_BY_ID_API + params);
  },
  getProductsInOrder: (params) => {
    return axiosClient.get(GET_PRODUCTS_IN_ORDER_API + params);
  },
};
