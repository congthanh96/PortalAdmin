/**
 * APIs của hình ảnh
 */
 import axiosClient from "../axiosClient";
 import { GET_USERS_API, GET_USER_BY_ID_API } from "../../Common/constants";

 export const imageAPI = {
    uploadImage:()=>{
        return axiosClient.post()
    }
 }