//URLs
export const BASE_URL = "https://api.newee.asia:6001";
export const LOGIN_API = "/Newee/Manager/Login";
export const GET_PRODUCTS_API = "/Newee/ManagerProduct/GetList/500/1"//litmit=500, index page=1
export const GET_DETAIL_PRODUCT_API = "/Newee/ManagerProduct/GetById/"

//ACTIONS AUTHENTICATE
export const AUTH_LOADING = "AUTH_LOADING";
export const LOGIN = "LOGIN";
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGOUT = "LOGOUT";

//ACTIONS PRODUCTS
export const PRODUCTS_LOADING = "PRODUCTS_LOADING"
export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE"