import * as types from "../../../_constants/ActionType";
var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDTOCART:
      return [...state, state.items = (action.item)];
    case types.REMOVETOCART:
      state = state.filter((item) => {
        return item.id !== action.payload.id;
      });
      return [...state];
     
    default:
      return state;
  }
};
export default myReducer;
