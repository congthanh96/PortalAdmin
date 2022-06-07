import * as types from "./../../../_constants/ActionType";
import apiLocalhost0 from "../../../_untils/apiLocalhost0";
import apiPublic from "../../../_untils/apiPublic";
import axios from "axios";

export const IDName = (id) => {
  return {
    type: types.ID,
    id, /// đúng tên
  };
};
export const ID_PRODUCT = (id) => {
  return {
    type: types.ID_PRODUCT,
    id,
  };
};

export const getProduct = () => {
  return {
    type: types.GETPRODUCT,
  };
};
export const getSearchResult = (payload) => {
  return {
    type: types.SEARCH_RESULT,
    payload,
  };
};
export const getSearchResultNull = (payload) => {
  return {
    type: types.SEARCH_RESULT_NULL,
    payload,
  };
};

// cart
export const addProductToCart = (payload) => {
  return {
    type: types.ADD_PRODUCT_TO_CART,
    payload,
  };
};

//cart
export const deleteProductInCart = (payload) => {
  return {
    type: types.DELETE_CART,
    payload,
  };
};
export const getIncrease_Quantity = (payload) => {
  return {
    type: types.INCREASE_QUANTITY,
    payload,
  };
};
export const getDecrease_Quantity = (payload) => {
  return {
    type: types.DECREASE_QUANTITY,
    payload,
  };
};

export const getTotal_Price = (payload) => {
  return {
    type: types.TOTAL_PRICE,
    payload,
  };
};

// end cart

// bill
// end cart
export const getBill_ID = (bill_id) => {
  return {
    type: types.BILL_ID,
    bill_id,
  };
};
export const getUSER_ID = (user_id) => {
  return {
    type: types.CART_ID,
    user_id,
  };
};

export const getIMG_ID = (img_id) => {
  return {
    type: types.UPIMG_ID,
    img_id,
  };
};

export const getPRODUCT_ID = (product_id) => {
  return {
    type: types.UPPRODUCT_ID,
    product_id,
  };
};
export const GETSTATE = () => {
  return {
    type: types.GETSTATE,
  };
};

// end bill

// cart
export const addToCart2 = (item) => {
  return {
    type: types.ADDTOCART,
    item,
  };
};
export const removeCart2 = (payload) => {
  return {
    type: types.REMOVETOCART,
    payload,
  };
};

//

//CART

/*GET NUMBER CART*/
export function GetNumberCartSHOP() {
  return {
    type: "GET_NUMBER_CART_SHOP",
  };
}

export function AddCartSHOP(payload, quantity) {
  return {
    type: "ADD_CART_SHOP",
    payload,
    quantity,
  };
}
export function UpdateCartSHOP(payload) {
  return {
    type: "UPDATE_CART_SHOP",
    payload,
  };
}
export function DeleteCartSHOP(payload) {
  return {
    type: "DELETE_CART_SHOP",
    payload,
  };
}

// all redirect

//   let { token, cart, idUser } = useParams();
export const neweeLogin = (token, idCart, idUser) => {
  return {
    type: "NEWEE_LOGIN",
    token,
    idCart,
    idUser,
  };
};

// all data in Login
export const actLoadDataLogin = () => {
  return (dispatch, getState) => {
    // const user = getState().Login.DATA_LOGIN;
    // console.log(user);
    return apiLocalhost0(`Newee/Seller/GetUserById`, "POST", null)
      .then((res) => {
        dispatch(transferDataLogin(res.data.data));
        console.log("dataLogin", res);
      })
      .catch((err) => console.log(err.response));
  };
};
export const transferDataLogin = (data) => {
  return {
    type: types.DATA_LOGIN,
    data, //action sẽ nhận lại
  };
};
// all data in Login

//Load Cart List
export const actLoadCartListRequest = (idCart) => {
  return (dispatch) => {
    return apiLocalhost0(`Newee/Cart/GetList/${idCart}`, "GET", null)
      .then((res) => {
        let numberCart = 0;
        res.data.data.forEach((element) => {
          numberCart += element.count;
        });
        dispatch(actLoadCartList(res.data.data, numberCart));
      })
      .catch((err) => console.log(err));
  };
};

// load cart
export const actLoadCartList = (payload, number) => {
  return {
    type: types.LOAD_CART_LIST,
    payload, //action sẽ nhận lại
    number,
  };
};

export function UpdateQuantitySHOP(payload, quantity) {
  return {
    type: "UPDATE_QUANTITY_SHOP",
    payload,
    quantity,
  };
}

export function IncreaseQuantitySHOP(payload, quantity) {
  return {
    type: "INCREASE_QUANTITY_SHOP",
    payload,
    quantity,
  };
}

export function DecreaseQuantitySHOP(payload) {
  return {
    type: "DECREASE_QUANTITY_SHOP",
    payload,
  };
}

// load cart
export const DecreaseQuantityREDUX = (payload) => {
  return {
    type: types.DECREASE_QUANTITY_SHOP,
    payload, //action sẽ nhận lại
  };
};

export function ClearCart(payload) {
  return {
    type: "CLEAR_CART_SHOP",
    payload,
  };
}

//END CART

export function chooseStep1(payload) {
  return {
    type: "CHOOSE_STEP_1",
    payload,
  };
}
export function chooseStep2(payload) {
  return {
    type: "CHOOSE_STEP_2",
    payload,
  };
}
export function chooseStep3(payload) {
  return {
    type: "CHOOSE_STEP_3",
    payload,
  };
}
export function chooseImageStep3(payload) {
  return {
    type: "CHOOSE_STEP_3_IMAGE",
    payload,
  };
}

// click danh mục
export const onClickCategory = (id) => {
  return {
    type: types.CLICK_CATEGORY,
    id,
  };
};

export const searchBrand = (number) => {
  return {
    type: types.SEARCH_BRAND,
    number,
  };
};

// clear filter
export const clearFilter = (brand, category) => {
  return {
    type: types.CLEAR_FILTER,
    brand,
    category,
  };
};

export const loadALLPRODUCT = (product) => {
  return {
    type: types.ALL_PRODUCT,
    product,
  };
};

//LoadALL
export const actLoadAllProductListRequest = (limit, page) => {
  return (dispatch) => {
    return apiLocalhost0(
      `Newee/ProductSeller/Getlist/${limit}/${page}`,
      "GET",
      null
    )
      .then((res) => {
        dispatch(actLoadAllProductList(res.data.data, "private"));
        dispatch(social("private"));
      })
      .catch((err) => console.log(err.response));
  };
};

export const actLoadAllProductList = (data2, social) => {
  let data = data2.sort(() => Math.random() - 0.5);
  return {
    type: types.LOAD_ALL_PRODUCT_LIST,
    data, //action sẽ nhận lại
  };
};
export const social = (social) => {
  return {
    type: types.LOAD_ALL_PRODUCT_SOCIAL,
    social, //action sẽ nhận lại
  };
};

export const actLoadAllProductListRequestPublic = (limit, page) => {
  return (dispatch) => {
    return apiLocalhost0(
      `Newee/ProductPublic/Getlist/${limit}/${page}`,
      "GET",
      null
    )
      .then((res) => {
        console.log("res 1", res);
        dispatch(actLoadAllProductList(res.data.data, "public"));
        dispatch(social("public"));
      })
      .catch((err) => console.log(err.response));
  };
};





//ADMIN
