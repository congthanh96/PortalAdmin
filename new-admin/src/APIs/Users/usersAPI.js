/**
 * APIs của danh sách tài khoản
 */
 import axiosClient from "../axiosClient";
 import {
   GET_USERS_API,
 } from "../../Common/constants";
 
 export const usersAPI = {
   // Lấy danh sách đơn hàng
   getUsers: () => {
     return axiosClient.get(GET_USERS_API);
   },
}