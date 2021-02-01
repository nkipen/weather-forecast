import axios from '@/axios'
import { Coords } from '@/types'

export default {
  getWeather (coords: Coords) {
    return axios.get('', { params: { ...coords } })
  }
}
