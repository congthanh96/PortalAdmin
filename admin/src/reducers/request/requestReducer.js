/* eslint-disable default-case */
import {
  ADD_REQUEST,
  FETCH_REQUEST,
  REQUEST_LOADING,
  REQUEST_DETAIL,
  REQUEST_FAILURE,
  FETCH_LIST,
  REQUEST_RENDER
} from "./requestActions";

const initialState = {
  request: [],
  isLoading: false,
  list: [],
  isRender: false,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
     case REQUEST_RENDER:
      return {
        ...state,
        isRender: !state.isRender,
        isLoading: false,
      };
    
    
    case FETCH_REQUEST:
      return {
        ...state,
        request: action.request,
        isLoading: false,
      };
  }
  return state;
};
