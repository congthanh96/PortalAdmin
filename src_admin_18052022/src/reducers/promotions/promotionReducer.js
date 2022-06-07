/* eslint-disable default-case */
import {
  ADD_PROMOTION,
  FETCH_PROMOTION,
  PROMOTION_LOADING,
  PROMOTION_DETAIL,
  PROMOTION_FAILURE,
  FETCH_LIST,
} from "./promotionActions";

const initialState = {
  promotions: [],
  isLoading: false,
  list: [],
};

export const promotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROMOTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROMOTION_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_PROMOTION:
      return {
        ...state,
        promotions: action.promotion,
        isLoading: false,
      };
  }
  return state;
};
