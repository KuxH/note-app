import axios from "axios";
const url = 'http://localhost:3001/api/login'

const login = async creadentials=>{
    const res = await axios.post(url, creadentials)
    return res.data
    }

export default {
    login : login
}