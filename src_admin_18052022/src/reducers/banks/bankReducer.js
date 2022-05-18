import { Cart } from "../../models/Cart";
import { API } from "../../utils/Config";
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  INCREASE_CART_QUANTITY,
  DES_CART_QUANTITY,
  RESET_CART,
  BANK_LOADING,
  BANK_FAILURE,
  FETCH_BANK,
  CANCEL_BANK,
  GET_PRICE,
  FETCH_BANK_REQUEST,
} from "./bankActions";
import { LOGOUT } from "../auth/authActions";
import { Alert, NativeModules } from "react-native";

const emptyCart = {
  items: [],
};
const initialState = {
  bankItems: emptyCart,
  bankItemsRequest: emptyCart,
  isLoading: false,
  isRender: false,
  isPrice: [],
};

const findIndex = (cartList, id) => {
  const index = cartList.findIndex((cart) => {
    return cart.id === id;
  });
  return index;
};

export const bankReducer = (state = initialState, action) => {
  const cartList = state.bankItems.data;

  switch (action.type) {
    case BANK_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BANK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_BANK:
      console.log("da chay fetch bank", action.sort);
      return {
        ...state,
        bankItems: action.sort,
        isLoading: false,
        isRender: false,
      };
    case FETCH_BANK_REQUEST:
      console.log("da chay fetch bank", action.sort);
      return {
        ...state,
        bankItemsRequest: action.sort,
        isLoading: false,
        isRender: false,
      };
    case CANCEL_BANK:
      console.log("đã chạy Cancel bạnk");
      return {
        ...state,
        isRender: true,
        isLoading: false,
      };
    case GET_PRICE:
      return {
        ...state,
        isRender: false,
        isLoading: false,
        isPrice: action.isPrice,
      };
  }
  return state;
};
