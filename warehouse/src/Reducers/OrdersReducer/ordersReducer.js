import {
  ORDERS_LOADING,
  GET_ORDERS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_ACCEPT,
  GET_ORDERS_PREPARING,
  GET_ORDERS_SHIPPING,
} from "../../Common/constants";
const initialState = {
  orders: [],
  ordersAccept: [],
  ordersPreparing: [],
  ordersShipping: [],
  isLoading: false,
};

export default function ordersReducer(state = initialState, action) {
  console.log(action.type);
  console.log(action.orders);
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
    default:
      return state;
  }
}
