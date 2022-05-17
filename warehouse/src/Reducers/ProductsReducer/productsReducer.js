/**
 * Reducers của danh sách sản phẩm
 */
import {
  PRODUCTS_LOADING,
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
} from "../../Common/constants";
const initialState = {
  products: [],
  isLoading: false,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        isLoading: false,
      };
    default:
      return state;
  }
}
