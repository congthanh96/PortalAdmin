import axios from 'axios'

const ConfigAPI = async (endPoint, method, body, user) => {
  return await axios({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('tokenADMIN') ?? user}`,
    },
    method: method,
    url: `https://api.newee.asia:6001/${endPoint}`,
    data: body,
  })
}
export default ConfigAPI
