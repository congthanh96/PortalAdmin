/**
 * Actions của đơn hàng
 */
import {
  GET_ORDERS,
  ORDERS_LOADING,
  GET_ORDERS_FAILURE,
  GET_ORDERS_ACCEPT,
  GET_ORDERS_PREPARING,
  GET_ORDERS_SHIPPING,
  GET_ORDERS_PENDING,
  ACCEPT,
  PREPARING,
  SHIPPING,
  PENDING,
} from "../../Common/constants";
import { ordersAPI } from "../../APIs";

// Lấy danh sách đơn hàng
export const actGetOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: ORDERS_LOADING,
    });

    try {
      const response = await ordersAPI.getOrders();
      dispatch({
        type: GET_ORDERS,
        orders: response.bills,
      });
    } catch (err) {
      dispatch({
        type: GET_ORDERS_FAILURE,
      });
    }
  };
};

// Lấy danh sách đơn hàng dựa theo trạng thái đơn hàng
export const actGetOrdersWithStatus = (status) => {
  return async (dispatch) => {
    dispatch({
      type: ORDERS_LOADING,
    });
    try {
      const response = await ordersAPI.getOrdersWithStatus(status);
      const data = response.bills === undefined ? [] : response.bills;
      switch (status) {
        case ACCEPT: {
          dispatch({
            type: GET_ORDERS_ACCEPT,
            orders: data,
          });
          break;
        }
        case PREPARING: {
          dispatch({
            type: GET_ORDERS_PREPARING,
            orders: data,
          });
          break;
        }
        case SHIPPING: {
          dispatch({
            type: GET_ORDERS_SHIPPING,
            orders: data,
          });
          break;
        }
        case PENDING: {
          dispatch({
            type: GET_ORDERS_PENDING,
            orders: data,
          });
          break;
        }
        default:
          return;
      }
    } catch (err) {
      dispatch({
        type: GET_ORDERS_FAILURE,
      });
    }
  };
};
