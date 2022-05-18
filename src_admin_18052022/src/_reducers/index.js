import { combineReducers } from "redux";
import IDName from "./custommer/products/Id";
import isDisplayForm from "./custommer/isDisplayForm/isDisplayForm";
import LoadProduct from "./custommer/products/LoadProduct";
import Shop from "./custommer/products/Shop";
import Register from "./custommer/products/Register";
import Login from "./custommer/products/Login";
import FetchAllProduct from "./custommer/products/LoadProduct/FetchAllProduct";
import Social from "./custommer/products/LoadProduct/Social";

const appReducer = combineReducers({
  IDName,
  isDisplayForm,
  LoadProduct,
  Shop,
  Register,
  Login,

  // fetch ALL PRODUCT
  FetchAllProduct,
  Social,
});
export default appReducer;
