import * as types from "../../../_constants/ActionType";

const initProduct = {
  step1: [],
  step2: [],
  image: [],
  data: [],
};

var myReducer = (state = initProduct, action) => {
  switch (action.type) {
    case types.CHOOSE_STEP_1:
      return { data: [action.payload] };
    case types.CHOOSE_STEP_2:
      return { data: [...state.data, action.payload] };
    case types.CHOOSE_STEP_3:
      return { data: [...state.data, action.payload] };
    case types.CHOOSE_STEP_3_IMAGE:
      return { data: [...state.data, action.payload] };

    default:
      return state;
  }
};
export default myReducer;
