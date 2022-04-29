/* eslint-disable default-case */
import {
  ADD_ORDER,
  FETCH_LIST,
  FETCH_ORDER,
  FETCH_ORDER_GHTK,
  FETCH_ORDER_GHTK_UPDATE,
  ORDER_DETAIL,
  ORDER_DETAIL_API,
  ORDER_FAILURE,
  ORDER_LOADING,
  ORDER_RENDER,
} from "./orderActions";

const initialState = {
  orders: [],
  ghtk: [],
  orderDetail: [],
  isLoading: false,
  list: [],
  isRender: false,
  orderDetailApi: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ORDER:
      // console.log()
      return {
        ...state,
        orders: action.orderData,
        isLoading: false,
      };
    case FETCH_ORDER_GHTK:
      return {
        ...state,
        ghtk: action.data,
        isLoading: false,
      };
    case FETCH_ORDER_GHTK_UPDATE:
      return {
        ...state,
        ghtk: action.data,
        isLoading: false,
      };
    case ORDER_DETAIL:
      var response = state.orders.filter((item) => item.idBill === action.res);

      console.log("respóne", response);
      return {
        ...state,
        orderDetail: response,
        isLoading: false,
      };
    case ORDER_DETAIL_API:
      // var response = state.orders.filter((item) => item.idBill === action.res);

      return {
        ...state,
        orderDetailApi: action.response,
        isLoading: false,
      };
    case ORDER_RENDER:
      return {
        ...state,
        isRender: !state.isRender,
        isLoading: false,
      };
    case FETCH_LIST:
      return {
        ...state,
        list: action.orderData,
        isLoading: false,
      };
    case ADD_ORDER:
      const newOrder = action.orderItem;
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        isLoading: false,
      };
  }
  return state;
};
