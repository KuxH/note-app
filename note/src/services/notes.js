import axios from "axios"
const url = "http://localhost:3001/api/notes"

let token = null

const noteService = {
  setToken(newToken) {
    token = `Bearer ${newToken}`
  },

  async getAll() {
    const request = await axios.get(url)
    return request.data
  },

  async create(obj) {
    const config = {
      headers: { Authorization: token },
    }

    const res = await axios.post(url, obj, config)
    return res.data
  },
}

export default noteService
