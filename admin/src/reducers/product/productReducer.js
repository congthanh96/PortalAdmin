import { CallToActionSharp } from "@material-ui/icons";
import {
  FETCH_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
  FILTER_PRODUCTS,
  CREATE_PRODUCTS,
  CREATE_VARIANT,
  IMG_PRODUCT,
  IMG_VARIANT,
  CATEGORY_PRODUCTS,
  PRODUCT_RENDER,
  PRODUCT_CONVERT,
} from "./productActions";

const initialState = {
  products: [],
  filterProducts: [],
  keyword: "",
  isFirstOpen: false,
  isLoading: false,

  createProduct: {},
  isVariant: [],
  imgProduct: "",
  imgVariant: [],
  infoProduct: {},
  category: [],
  isRender: false,

  isFlavors: [],
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_PRODUCTS:
      // console.log('reducers',action.products);
      return {
        ...state,
        products: [...action.products],
        filterProducts: [...action.products],
        isLoading: false,
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filterProducts: [...action.filterProducts],
        keyword: action.keyword,
        isLoading: false,
      };
    case IMG_PRODUCT:
      console.log("thoong tin reducer", action.infoProduct);

      return {
        ...state,
        infoProduct: action.infoProduct,
        isLoading: false,
      };
    case IMG_VARIANT:
      return {
        ...state,
        createProduct: action.imgVariant,
        isLoading: false,
      };
    case CREATE_PRODUCTS:
      return {
        ...state,
        createProduct: action.isNew,
        isLoading: false,
      };
    case CREATE_VARIANT:
      return {
        ...state,
        // isVariant: [...action.isVariant],
        isLoading: false,
      };
    case CATEGORY_PRODUCTS:
      return {
        ...state,
        category: action.category,
        isLoading: false,
      };
    case PRODUCT_RENDER:
      return {
        ...state,
        isRender: !state.isRender,
        isLoading: false,
      };
    case PRODUCT_CONVERT:
      var array = [];
      state.products?.forEach((element, index) => {
        var values = { value: element.id, label: element.name };
        array.push(values);
      });

      return {
        ...state,
        isFlavors: array,
        isLoading: false,
      };

    default:
      return state;
  }
};
