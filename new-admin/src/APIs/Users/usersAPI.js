/**
 * APIs của danh sách tài khoản
 */
import axiosClient from "../axiosClient";
import { GET_USERS_API, GET_USER_BY_ID_API, UPDATE_USER_BY_ID_API } from "../../Common/constants";

export const usersAPI = {
  // Lấy danh sách đơn hàng
  getUsers: () => {
    return axiosClient.get(GET_USERS_API);
  },
  // Lấy thông tin chi tiết tài khoản thông qua id
  getUserByID: (userID) => {
    return axiosClient.post(GET_USER_BY_ID_API + userID);
  },
  //Update thông tin user
  updateUserByID:(data) =>{
    return axiosClient.post(UPDATE_USER_BY_ID_API,data);
  }
  
};
