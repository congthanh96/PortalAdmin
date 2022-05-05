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
  PENDING
} from "../../Common/constants";
import { ordersAPI } from "../../APIs";
import { Pending } from "@mui/icons-material";

export const actGetOrders = () => {
  return async (dispatch) => {
    //const tokenUser = getState().authReducer.user;
    dispatch({
      type: ORDERS_LOADING,
    });

    try {
      const response = await ordersAPI.getOrders();
      console.log(response);
      dispatch({
        type: GET_ORDERS,
        orders: response.bills,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ORDERS_FAILURE,
      });
    }
  };
};

export const actGetOrdersWithStatus = (status) => {
  console.log(status);
  return async (dispatch) => {
    //const tokenUser = getState().authReducer.user;
    dispatch({
      type: ORDERS_LOADING,
    });

    try {
      const response = await ordersAPI.getOrdersWithStatus(status);
      console.log(response+status);
      const data = response.bills===undefined?[]:response.bills
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
      // dispatch({
      //     type: GET_ORDERS,
      //     orders: response.bills,
      // })
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ORDERS_FAILURE,
      });
    }
  };
};
