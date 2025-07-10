import axios from "axios";

function http(token){
  const headers = {}
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  const instance = axios.create({
    headers,
    baseURL: import.meta.env.VITE_BACKEND_URL
  })
  return instance
}

export default http