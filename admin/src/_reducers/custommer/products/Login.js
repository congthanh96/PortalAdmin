import * as types from "../../../_constants/ActionType";

const initProduct = {
  dataLogin: [],
  token: "",
  idCart: "",
  idUser: "",
};

var myReducer = (state = initProduct, action) => {
  switch (action.type) {
    case types.DATA_LOGIN:
      return {
        ...state,
        dataLogin: action.data,
      };

    case types.NEWEE_LOGIN:
      return {
        ...state,
        token: action.token,
        idCart: action.idCart,
        idUser: action.idUser,
      };

    default:
      return state;
  }
};
export default myReducer;
