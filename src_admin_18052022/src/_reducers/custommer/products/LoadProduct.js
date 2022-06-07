import * as types from "./../../../_constants/ActionType";
var initialState = [];
const products = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PRODUCT_LIST:
      state = action.dataProduct.result;
      return [...state];
    default:
      return [...state];
  }
};
export default products;
