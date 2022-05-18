/* eslint-disable default-case */
import {
  ADD_USER,
  FETCH_USER,
  USER_LOADING,
  USER_DETAIL,
  USER_FAILURE,
  FETCH_LIST,
  USER_SUCCESS
} from "./userActions";

const initialState = {
  listUser: [],
  detailUser: [],
  isLoading: false,
  list: [],
  isSuccess: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        listUser: action.listUser,
        isLoading: false,
      };
    case USER_DETAIL:
      return {
        ...state,
        detailUser: action.detailUser,
        isLoading: false,
      };
    case USER_SUCCESS:
      return {
        ...state,
        isSuccess: !state.isSuccess,
        isLoading: false,
      };
  }
  return state;
};
