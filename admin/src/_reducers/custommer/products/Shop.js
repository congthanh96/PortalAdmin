import axios from "axios";
// import Carts from "../../../components/custommer/body/shop/Carts";
import * as types from "../../../_constants/ActionType";
import Swal from "sweetalert2";
import apiLocalhost0 from "../../../_untils/apiLocalhost0";

const initProduct = JSON.parse(localStorage.getItem("shop")) || {
  numberCart: 0,
  Carts: [],
  _products: [],
  results: [],
  searchBrand: 0,
  onCategoryID: "",
  allProduct: [],
};

const data = {};
const Increase = async (id, increase) => {
  console.log("123123 123", id, increase);
  apiLocalhost0(`Newee/Cart/ChangeCount/${id}/${increase}`, "POST", null)
    .then((res) => {})
    .catch((err) => {
      console.log(err.response);
      alert("Vui lòng nhập lại số lượng!");
    });
};

const RemoveProduct = async (id) => {
  apiLocalhost0(`Newee/Cart/RemoveItem/${id}`, "POST", data)
    .then((res) => {
      window.setTimeout(window.location.reload.bind(window.location), 10);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Xóa sản phẩm thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => console.log(err.response));
};

var myReducer = (state = initProduct, action) => {
  // alert("da chay")
  switch (action.type) {
    case types.LOAD_CART_LIST:
      return {
        ...state,
        Carts: action.payload,
        numberCart: action.number,
      };
    case types.GET_NUMBER_CART_SHOP:
      return {
        ...state,
      };
    case types.ADD_CART_SHOP:
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          count: action.quantity,
          name: action.payload.productName,
          link: action.payload.link,
          price1: action.payload.price1,
          priceSeller1: action.payload.priceSeller1,
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.id === action.payload.id) {
            state.Carts[key].Count++;
            state.Carts[key].count++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            count: action.quantity,
            name: action.payload.name,
            link: action.payload.link,
            price1: action.payload.price1,
            priceSeller1: action.payload.priceSeller1,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + action.quantity,
      };

    case types.UPDATE_QUANTITY_SHOP:
      state.numberCart++;
      Increase(action.quantity, action.payload);

      return {
        ...state,
      };

    case types.INCREASE_QUANTITY_SHOP:
      state.numberCart++;
      if (state.Carts[action.payload].id) {
        Increase(
          state.Carts[action.payload].id,
          state.Carts[action.payload].count++ + 1
        );
      } else {
        Increase(action.payload, action.quantity);
      }
      return {
        ...state,
      };
    case types.DECREASE_QUANTITY_SHOP:
      let Count = state.Carts[action.payload].count;
      if (Count > 1) {
        state.numberCart--;
        Increase(
          state.Carts[action.payload].id,
          state.Carts[action.payload].count-- - 1
        );
      }

      return {
        ...state,
      };
    case types.DELETE_CART_SHOP:
      RemoveProduct([action.payload]);

      return {
        ...state,
      };
    case types.SEARCH_RESULT:
      return {
        ...state,
        results: action.payload,
      };
    case types.SEARCH_RESULT_NULL:
      return {
        ...state,
        results: null,
      };

    case types.SEARCH_BRAND:
      return {
        ...state,
        searchBrand: action.number,
        onCategoryID: undefined,
      };
    case types.CLICK_CATEGORY:
      return {
        ...state,
        onCategoryID: action.id,
        searchBrand: undefined,
      };

    case types.CLEAR_FILTER:
      if (action.brand !== null && action.category !== null) {
        return {
          ...state,
          onCategoryID: undefined,
          searchBrand: undefined,
        };
      } else if (action.brand !== null) {
        return {
          ...state,
          searchBrand: undefined,
        };
      } else if (action.category !== null) {
        return {
          ...state,
          onCategoryID: undefined,
        };
      }
      return;

    case types.CLEAR_CART_SHOP:
      return {
        numberCart: 0,
        Carts: [],
        _products: [],
        results: [],
      };

    case types.ALL_PRODUCT:
      return {
        ...state,
        allProduct: action.product,
      };

    default:
      return state;
  }
};
export default myReducer;
