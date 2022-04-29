//URLs
export const BASE_URL = "https://api.newee.asia:6001";
export const LOGIN_API = "/Newee/Manager/Login";
export const GET_PRODUCTS_API = "/Newee/ManagerProduct/GetList/500/1"; //litmit = 500, index page=1
export const GET_DETAIL_PRODUCT_API = "/Newee/ManagerProduct/GetById/";
export const GET_VARIANT_PRODUCT_API = "/Newee/ManagerVariant/Get/";
export const UPDATE_MOUNT_VARIANT_PRODUCT_API = "/Newee/ManagerVariant/Edit";
export const GET_ORDERS_API = "/Newee/Bill/GetListBill/1000/1"; //limit = 1000, indexpage = 1
export const GET_ORDER_BY_ID_API = "/Newee/Bill/GetBillById/"
export const GET_PRODUCTS_IN_ORDER_API = "/Newee/Bill/GetBillDetailByIdBill/"

//ACTIONS AUTHENTICATE
export const AUTH_LOADING = "AUTH_LOADING";
export const LOGIN = "LOGIN";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";

//ACTIONS PRODUCTS
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

//ACTIONS ORDERS
export const ORDERS_LOADING = "ORDERS_LOADING";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";
export const GET_ORDERS_ACCEPT = "GET_ORDERS_ACCEPT";
export const GET_ORDERS_PREPARING = "GET_ORDERS_PREPARING";
export const GET_ORDERS_SHIPPING = "GET_ORDERS_SHIPPING";

// STATUS ORDER
export const ACCEPT = "Accecpt";
export const PREPARING = "Preparing";
export const SHIPPING = "Shipping";

