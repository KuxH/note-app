import axios from "axios";
const url = 'http://localhost:3001/notes'
const getAll = ()=>{
    return axios.get(url)
    }
const create = newObject =>{
    return axios.post(url, newObject)
}

const update = (id, newObject) =>{
      
}
