import {
  GET_ORDERS,
  ORDERS_LOADING,
  GET_ORDERS_FAILURE,
  GET_ORDERS_ACCEPT,
  GET_ORDERS_PREPARING,
  GET_ORDERS_SHIPPING,
  ACCEPT,
  PREPARING,
  SHIPPING
} from "../../Common/constants";
import { ordersAPI } from "../../APIs";

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
      console.log(response);
      if(response.bills===undefined)
      {
          return;
      }
      switch (status) {
        case ACCEPT: {
          dispatch({
            type: GET_ORDERS_ACCEPT,
            orders: response.bills,
          });
          break;
        }
        case PREPARING: {
          dispatch({
            type: GET_ORDERS_PREPARING,
            orders: response.bills,
          });
          break;
        }
        case SHIPPING: {
          dispatch({
            type: GET_ORDERS_SHIPPING,
            orders: response.bills,
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
