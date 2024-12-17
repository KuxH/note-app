import axios from "axios"

const baseUrl = "http://localhost:3001/api/users"

const register = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const checkUsername = async (username) => {
  const response = await axios.post(`${baseUrl}/check-username`, { username })
  return response.data
}

export default { register, checkUsername }
