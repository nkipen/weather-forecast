import axios from 'axios'
import { API_KEY } from '@/config.json'
const baseURL = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}`

const axiosInstance = axios.create({
  baseURL,
  withCredentials: false, // CORS
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(response => {
  if (response.status >= 200 && response.status < 300) return response.data
  return response
})

export default axiosInstance
