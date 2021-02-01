import { createStore } from 'vuex'
import services from '@/services'
import { isEmpty } from 'lodash'
import { Coords } from '@/types'

const weatherData: any = () => localStorage.getItem('weather')
const coordsData: any = () => localStorage.getItem('coords')

export default createStore({
  state: {
    weather: weatherData() !== null ? JSON.parse(weatherData()) : {},
    coords: coordsData() !== null ? JSON.parse(coordsData()) : {
      lat: 49.994062799999995,
      lon: 36.2317086
    } as Coords
  },
  mutations: {
    UPDATE_WEATHER (state, payload = {}) {
      state.weather = payload
      if (isEmpty(payload)) localStorage.removeItem('weather')
      else localStorage.setItem('weather', JSON.stringify(payload))
    },
    UPDATE_COORDS (state, payload: Coords) {
      state.coords = payload
      localStorage.setItem('coords', JSON.stringify(payload))
    }
  },
  actions: {
    updateWeather ({ commit, getters }) {
      const coords = getters.getCurrentCoords
      services.getWeather(coords)
        .then(data => {
          const currentWeather = data.data[0]
          commit('UPDATE_WEATHER', currentWeather)
        })
        .catch(error => console.log(error))
    },
    async updateCity ({ commit }) {
      await navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude: lat, longitude: lon } = coords
          commit('UPDATE_COORDS', { lat, lon })
        },
        error => console.log(error))
    }
  },
  getters: {
    getCurrentWeather: state => state.weather,
    getCurrentCoords: state => state.coords
  },
  modules: {
  }
})
