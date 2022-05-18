import * as Types from "./../../../../_constants/ActionType";
var initialState = {};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_ALL_PRODUCT_SOCIAL:
      console.log("actions", action.social);
      state = action.social;
      return state;
    default:
      return state;
  }
};
export default products;
