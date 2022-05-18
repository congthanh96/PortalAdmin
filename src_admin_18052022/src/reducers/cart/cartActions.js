import { API_URL, API } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";

export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const FETCH_CART = "FETCH_CART";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DES_CART_QUANTITY = "DES_CART_QUANTITY";
export const SAVE_INFO = "SAVE_INFO";
import axios from 'axios';

// import { Updates } from 'expo';
//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    // console.log('user test ',user.data.token);
    if (user.data && user.data.token !== undefined) {
      dispatch({
        type: CART_LOADING,
      });
      try {
        axios
          .get(`${API}/Newee/Cart/GetList/${user.data.cart}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${
                user.data.token ? user.data.token : null
              }`,
            },
          })

          .then((result) => {
            var carts = result.data;
            console.log("fetch", carts);
            dispatch({
              type: FETCH_CART,
              carts,
            });
          })
          .catch((error) => {
            // console.log('error', error);
            dispatch({
              type: CART_FAILURE,
            });
          });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};

//Add Add to Cart
export const addToCart = (item, token, idProduct, idVariant, count) => {
  console.log("item add to cart", item);
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;

    // if(user.data.token ? )
    try {
      const response = await timeoutPromise(
        fetch(
          `${API}/Newee/Cart/Additem/${user.data.cart}/${item.item.id}/${idVariant}/${count}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${
                user.data.token ? user.data.token : null
              }`,
            },
            method: "POST",
          }
        )
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      // dispatch(fetchCart());
      dispatch({
        type: "ADD_CART",
        cartItem: item,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const homeAddToCart = (item, idProduct, idVariant, count) => {
  // console.log(idProduct, idVariant);

  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;

    try {
      const response = await timeoutPromise(
        fetch(
          `${API}/Newee/Cart/Additem/${user.data.cart}/${idProduct}/${idVariant}/${count}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${
                user.data.token ? user.data.token : null
              }`,
            },
            method: "POST",
          }
        )
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch(fetchCart());
      // dispatch({
      //   type: "ADD_CART",
      //   cartItem: item,
      // });
    } catch (err) {
      throw err;
    }
  };
};

//Remove from Cart
export const removeFromCart = (cartId, itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Cart/RemoveItem/${itemId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user.data.token ? user.data.token : null}`,
          },
          method: "post",
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "REMOVE_FROM_CART",
        itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const plusCartQuantity = (idCartItem, count, item, dec) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    var quantity = 1;
    // console.log(dec)
    dec === undefined
      ? (quantity = count + 1)
      : count > 1
      ? (quantity = count - 1)
      : (quantity = 0);

    // console.log('plus Cart Quantiy ', quantity);

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Cart/ChangeCount/${idCartItem}/${quantity}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user.data.token ? user.data.token : null}`,
          },
          method: "POST",
        })
      );
      // const resData = await response.json();
      // console.log('res data => ',resData);
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch(fetchCart());
    } catch (err) {
      throw err;
    }
  };
};

//Decrease cart quantity
export const decCartQuantity = (cartId, itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/cartitem/${cartId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "PUT",
          body: JSON.stringify({
            item: itemId,
            quantity: "decrease",
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "DES_CART_QUANTITY",
        cartItemId: itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Reset Cart
export const resetCart = (cartId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "RESET_CART",
    });
  };
};

//Add Add to Cart
export const saveInformation = (name, phone, address) => {
  console.log("item add to cart", name, phone, address);
  return async (dispatch, getState) => {
    try {
      var info = {
        name,
        phone,
        address,
      };
      dispatch({
        type: "SAVE_INFO",
        info,
      });
    } catch (err) {
      throw err;
    }
  };
};
