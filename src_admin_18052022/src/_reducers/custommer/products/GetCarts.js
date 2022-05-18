import * as types from "./../../../_constants/ActionType";

const init = JSON.parse(localStorage.getItem("cart")) || {
  numberCart: 0,
  totalPrice: 0,
  items: [],
  bill: 0,
  userID: 0,
  upload: [],
  imgID: [],
  productID: 0,
};

var myReducer = (state = init, action) => {
  const updateTotal = () => {
    let total = 0;
    if ((state.items.length !== 0)) {
      for (let i = 0; i < state.items.length; i++) {
        total +=
          parseInt(state.items[i].price) * (state.items[i].quantity || 1);
      }
      state.totalPrice = total;
    }
    if (state.items.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(state));
    }
    return;
  };
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          quantity: 1,
          title: action.payload.title,
          name: action.payload.name,
          url: action.payload.url,
          price: action.payload.price,
        };
        state.items.push(cart);
      } else {
        let check = false;
        state.items.map((value, key) => {
          if (value.id === action.payload.id) {
            state.items[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            title: action.payload.title,
            name: action.payload.name,
            url: action.payload.url,
            price: action.payload.price,
          };
          state.items.push(_cart);
        }
      }

      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case types.INCREASE_QUANTITY:
      state.numberCart++;
      state.items[action.payload].quantity++;
      updateTotal();
      return {
        ...state,
      };
    case types.DECREASE_QUANTITY:
      let quantity = state.items[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.items[action.payload].quantity--;
      }
      updateTotal();
      return {
        ...state,
      };
    case types.DELETE_CART:
      let quantity_ = state.items[action.payload].quantity;
      state.numberCart -= quantity_;
      state.items = state.items.filter((item) => {
        return item.id !== state.items[action.payload].id;
      });
      if (state.items.length) {
        updateTotal();
      }
      if (state.items.length === 0) {
        localStorage.removeItem("cart");
        state.totalPrice = 0;
      }
      return {
        ...state,
      };
    case types.BILL_ID:
      return { ...state, bill: action.bill_id };
    case types.CART_ID:
      return { ...state, userID: action.user_id };
    default:
      return state;
  }
};

export default myReducer;
