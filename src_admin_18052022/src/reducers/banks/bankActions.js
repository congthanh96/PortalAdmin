import { API_URL, API } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";

export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const FETCH_CART = "FETCH_CART";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DES_CART_QUANTITY = "DES_CART_QUANTITY";

export const BANK_LOADING = "BANK_LOADING";
export const BANK_FAILURE = "BANK_FAILURE";
export const FETCH_BANK = "FETCH_BANK";
export const CANCEL_BANK = "CANCEL_BANK";
export const GET_PRICE = "GET_PRICE";
export const FETCH_BANK_REQUEST = "FETCH_BANK_REQUEST";

import { Alert } from "react-native";
import axios from "axios";
// import { Updates } from 'expo';
//Fetch Cart

export const fetchPrice = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    console.log("user data token fetch price", user.data.token);

    if (user === undefined) return;

    dispatch({
      type: BANK_LOADING,
    });

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/Manager/Private/GetPaySeller`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user.data.token ? user.data.token : null}`,
          },
          method: "GET",
        })
      );
      const resData = await response.json();

      if (!response.ok) {
        alert(resData.errors);
        console.log(errorResData);

        dispatch({
          type: BANK_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      console.log("123 => fetch Price", resData);
      // alert("thanh cong");
      dispatch({
        type: GET_PRICE,
        isPrice: resData,
      });
    } catch (err) {
      console.log("123", err);
      alert("Hệ thống không phản hồi!");
      dispatch({
        type: BANK_FAILURE,
      });

      throw err;
    }

    return;
  };
};

export const fetchBank = () => {
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
            console.log("fetch bank", carts);
            dispatch({
              type: FETCH_CART,
              carts,
            });
          })
          .catch((error) => {
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
export const fetchBanks = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    // console.log('user test ',user.data.token);
    if (user.data && user.data.token !== undefined) {
      dispatch({
        type: BANK_LOADING,
      });
      try {
        axios
          .get(`${API}/Newee/RequestPay/GetRequestAllByIdSeller/1/1000`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${
                user.data.token ? user.data.token : null
              }`,
            },
          })

          .then((result) => {
            var res = result.data;
            // console.log("fetch bank", res);
            var sort = res.data.sort(function (a, b) {
              return (
                new Date(b.createTime).getTime() -
                new Date(a.createTime).getTime()
              );
            });
            // console.log("sort", sort.length);

            dispatch({
              type: FETCH_BANK,
              sort,
            });
          })
          .catch((error) => {
            dispatch({
              type: BANK_FAILURE,
            });
          });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};
export const fetchBankRequest = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    // console.log('user test ',user.data.token);
    if (user.data && user.data.token !== undefined) {
      dispatch({
        type: BANK_LOADING,
      });
      try {
        axios
          .get(`${API}/Newee/HistoryPay/GetHistoryPaySellerAll/1/1000`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${
                user.data.token ? user.data.token : null
              }`,
            },
          })

          .then((result) => {
            var res = result.data;
            // console.log("fetch bank", res);
            var sort = res.data.sort(function (a, b) {
              return (
                new Date(b.createTime).getTime() -
                new Date(a.createTime).getTime()
              );
            });
            // console.log("sort", sort.length);

            dispatch({
              type: FETCH_BANK_REQUEST,
              sort,
            });
          })
          .catch((error) => {
            dispatch({
              type: BANK_FAILURE,
            });
          });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};
export const CancelRequests = (id) => {
  console.log(id);
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    console.log(user.data.token);

    if (user === undefined) return;

    dispatch({
      type: BANK_LOADING,
    });

    try {
      const response = await timeoutPromise(
        fetch(`${API}/Newee/RequestPay/Cancel`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user.data.token ? user.data.token : null}`,
          },
          method: "POST",
          body: JSON.stringify(id),
        })
      );
      const resData = await response.json();
      if (!response.ok) {
        // const errorResData = await response.json();
        alert(resData.errors);
        console.log(resData);

        dispatch({
          type: BANK_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      console.log("Huỷ thành công =>", resData);
      dispatch({
        type: CANCEL_BANK,
      });
    } catch (err) {
      console.log("123", err);
      alert("Huỷ yêu cầu không thành công!");
      dispatch({
        type: BANK_FAILURE,
      });

      throw err;
    }

    return;
  };
};
