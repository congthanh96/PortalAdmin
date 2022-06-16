/**
 * APIs của hình ảnh
 */
 import axiosClientImage from "../axiosClientImage";
 
 import { POST_IMAGE_API } from "../../Common/constants";
 export const imageAPI = {
    uploadImage:(data)=>{
        return axiosClientImage.post(POST_IMAGE_API,data)
    }
 }