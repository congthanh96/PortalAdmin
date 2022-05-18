import * as types from "../../../_constants/ActionType";

var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ID_PRODUCT:
      return (state = action.id);
    default:
      return state;
  }
};
export default myReducer;
