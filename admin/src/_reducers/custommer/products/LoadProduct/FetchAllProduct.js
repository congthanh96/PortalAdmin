import * as Types from "./../../../../_constants/ActionType";
var initialState = [];

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_ALL_PRODUCT_LIST:
      console.log("social", action.social);
      state = action.data;
      return [...state];
    default:
      return [...state];
  }
};
export default products;
