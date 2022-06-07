/**
 * Reducers của danh sách đơn hàng
 */
import {
  ORDERS_LOADING,
  GET_ORDERS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_ACCEPT,
  GET_ORDERS_PREPARING,
  GET_ORDERS_SHIPPING,
  GET_ORDERS_PENDING,
} from "../../Common/constants";
const initialState = {
  orders: [],
  ordersAccept: [],
  ordersPreparing: [],
  ordersShipping: [],
  ordersPending: [],
  isLoading: false,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        isLoading: false,
      };
    case GET_ORDERS_ACCEPT:
      return {
        ...state,
        ordersAccept: action.orders,
        isLoading: false,
      };
    case GET_ORDERS_PREPARING:
      return {
        ...state,
        ordersPreparing: action.orders,
        isLoading: false,
      };
    case GET_ORDERS_SHIPPING:
      return {
        ...state,
        ordersShipping: action.orders,
        isLoading: false,
      };
    case GET_ORDERS_PENDING:
      return {
        ...state,
        ordersPending: action.orders,
        isLoading: false,
      };
    default:
      return state;
  }
}
