import axios from "axios";
import * as Config from "../_constants/ActionType";

const Api5001 = async (endPoint, method, body) => {
  return await axios({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: method,
    url: `${Config.API_NEWEE_5001}/${endPoint}`,
    data: body,
  });
};
export default Api5001;
