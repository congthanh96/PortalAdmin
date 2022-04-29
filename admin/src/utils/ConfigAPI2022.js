import axios from 'axios'

const ConfigAPI2022 = async (endPoint, method, body, user) => {
  return await axios({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('tokenADMIN') ?? user}`,
    },
    method: method,
    url: `https://api.newee.asia:6001/${endPoint}`,
    data: JSON.stringify(body),
  })
}
export default ConfigAPI2022
