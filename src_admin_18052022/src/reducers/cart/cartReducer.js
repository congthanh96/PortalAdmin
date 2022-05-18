import { Cart } from "../../models/Cart";
import { API } from "../../utils/Config";
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  INCREASE_CART_QUANTITY,
  DES_CART_QUANTITY,
  RESET_CART,
  CART_LOADING,
  CART_FAILURE,
  SAVE_INFO,
} from "./cartActions";
import { LOGOUT } from "../auth/authActions";
import { Alert, NativeModules } from "react-native";

const emptyCart = {
  items: [],
};

const initialState = {
  cartItems: emptyCart,
  isLoading: false,
  info: emptyCart,
};

const findIndex = (cartList, id) => {
  const index = cartList.findIndex((cart) => {
    return cart.id === id;
  });
  return index;
};

export const cartReducer = (state = initialState, action) => {
  const cartList = state.cartItems.data;

  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CART:
      return {
        ...state,
        cartItems: action.carts,
        isLoading: false,
      };

    case ADD_CART:
      const id = action.cartItem.id;
      if (cartList.length !== 0) {
        const index = findIndex(cartList, id);
        if (index >= 0) {
          cartList[index] = new Cart(
            action.cartItem.item === undefined
              ? { item: action.cartItem }
              : action.cartItem,
            +cartList[index].count + 1
          );
        } else {
          const newItem = new Cart(action.cartItem, 1);
          cartList.push(newItem);
        }
      } else {
        const newItem = new Cart(action.cartItem, 1);
        cartList.push(newItem);
      }

      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };

    case REMOVE_FROM_CART:
      const { itemId } = action;
      const indexItem = findIndex(cartList, itemId);
      cartList.splice(indexItem, 1);
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };

    case DES_CART_QUANTITY:
      const { cartItemId } = action;
      const index = findIndex(cartList, cartItemId);
      cartList[index].count = +cartList[index].count - 1;
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case RESET_CART:
      state.cartItems.data = [];
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case LOGOUT: {
      return {
        cartItems: emptyCart,
        isLoading: false,
      };
    }
    case SAVE_INFO: {
      console.log("action info", action.info);
      return {
        ...state,
        info: action.info,
      };
    }
  }
  return state;
};
