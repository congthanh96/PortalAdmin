/* eslint-disable default-case */
import {
  ADD_REPORTS,
  FETCH_REPORTS,
  REPORTS_LOADING,
  REPORTS_DETAIL,
  REPORTS_FAILURE,
  FETCH_LIST,
  FETCH_RANK,
  REPORTS_FAILURE_FAIL
} from "./reportActions";

const initialState = {
  reports: [],
  isLoading: false,
  list: [],
  ranks: [],
  isRender: false,
  month: '',
  dataReport: [],
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
      case REPORTS_FAILURE_FAIL:
      return {
        ...state,
        reports: [],
        month: action.monthRequest,
        isLoading: false,
        }
    case FETCH_REPORTS:
      // var list = {month: action.monthRequest, data: action.reports};
      return {
        ...state,
        reports: action.reports,
        month: action.monthRequest,
        // dataReport: [...state.dataReport, list],
        isLoading: false,
      };
    case  FETCH_RANK:
      return {
        ...state,
        ranks: action.ranks,
        isLoading: false,
      };
  }
  return state;
};
