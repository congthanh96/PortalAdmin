//URLs
export const BASE_URL = "https://api.newee.asia:6001";
export const BASE_URL_IMAGE = "https://api.newee.asia:8001";
export const LOGIN_API = "/Newee/Manager/Login";
export const GET_PRODUCTS_API = "/Newee/ManagerProduct/GetList/500/1"; //litmit = 500, index page=1
export const GET_DETAIL_PRODUCT_API = "/Newee/ManagerProduct/GetById/";
export const GET_VARIANT_PRODUCT_API = "/Newee/ManagerVariant/Get/";
export const UPDATE_MOUNT_VARIANT_PRODUCT_API = "/Newee/ManagerVariant/Edit";
export const GET_ORDERS_API = "/Newee/Bill/GetListBill/1000/1"; //limit = 1000, indexpage = 1
export const GET_ORDER_BY_ID_API = "/Newee/Bill/GetBillById/";
export const GET_PRODUCTS_IN_ORDER_API = "/Newee/Bill/GetBillDetailByIdBill/";
export const UPDATE_STATUS_ORDER_API = "/Newee/Bill/ChangeStatusTo/"; //"/Newee/Bill/ChangeStatusTo/{idBill}/{status}"
export const GET_GHTK_LIST_PICK_ADD_API = "/ghtk/get-list-pickadd";
export const POST_GHTK_ORDER_API = "/ghtk/post-order";
export const GET_USERS_API = "/Newee/Manager/GetListSeller/1000/1"; //litmit = 1000, index page=1
export const GET_USER_BY_ID_API = "/Newee/Manager/GetUserById/"; // :{userID}
export const UPDATE_USER_BY_ID_API = "/Newee/Manager/EditProfile";
export const POST_IMAGE_API = "/upload-image";
export const DISABLE_PRODUCT_API = "/Newee/ManagerProduct/Disable/"; //:{productID}
export const CREATE_PRODUCT_API = "/Newee/ManagerProduct/Create";
export const GET_LIST_CATEGORY_API = "/Newee/ProductSeller/GetListCategory";
export const ADD_VARIANT_TO_PRODUCT_API = "/Newee/ManagerVariant/Create";
export const UPDATE_VARIANT_API = "/Newee/ManagerVariant/Edit";
export const DISABLE_VARIANT_API = "/Newee/ManagerVariant/Disable/"; //:{variantID}
export const EDIT_PRODUCT_API = "/Newee/ManagerProduct/Edit";

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
export const GET_ORDERS_PENDING = "GET_ORDERS_PENDING";

// STATUS
export const PENDING = "Pending";
export const ACCEPT = "Accecpt";
export const PREPARING = "Preparing";
export const SHIPPING = "Shipping";
export const LIST_STATUS_ORDER = [
  {
    name: "T???t c???",
    value: "All",
  },
  {
    name: "????n ch??? duy???t",
    value: "Pending",
  },
  {
    name: "Duy???t ????n",
    value: "Accecpt",
  },
  {
    name: "Chu???n b??? giao",
    value: "Preparing",
  },
  {
    name: "??ang giao",
    value: "Shipping",
  },
  {
    name: "Giao th??nh c??ng",
    value: "Delivered",
  },
  {
    name: "Ho??n ????n",
    value: "Delay",
  },
  {
    name: "H???y ????n",
    value:"Cancel"
  },
];

// LIST ADDRESS WAREHOUSE
export const LIST_ADDRESS_WAREHOUSE = [
  {
    id: "1",
    name: "Kho B??nh Th???nh",
    province: "Th??nh Ph??? H??? Ch?? Minh",
    district: "Qu???n B??nh Th???nh",
    ward: "Ph?????ng 13",
    address: "438 N?? Trang Long",
    tel: "0972100200",
  },
  // {
  //     id:"2",
  //     name:"Kho Th??? ?????c",
  //     province:"Th??nh Ph??? H??? Ch?? Minh",
  //     district:"Qu???n Th??? ?????c",
  //     ward:"Ph?????ng Long Tr?????ng",
  //     address:"22 L?? V??n Vi???t",
  //     tel:"0338847312"
  // }
];

export const DATA_ROUTE = [
  {
    linkTo: "/",
    nameLink: "Trang ch???",
  },
  {
    linkTo: "/users",
    nameLink: "Danh s??ch t??i kho???n",
  },
  {
    linkTo: "/products",
    nameLink: "S???n ph???m",
  },
  {
    linkTo: "/orders",
    nameLink: "????n h??ng",
  },
];
