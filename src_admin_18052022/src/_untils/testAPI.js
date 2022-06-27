import axios from "axios";
import * as Config from "../_constants/ActionType";

const apiLocalhost0 = async (endPoint, method, body) => {
  return await axios({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: method,
    // url: `${Config.LOCALHOST_5000}/${endPoint}`,
    url: `${Config.API_NEWEE_6001}/${endPoint}`,
    // url: `${Config.API_NEWEE_6001}/${endPoint}`,
    data: body,
  });
};
export default apiLocalhost0;
