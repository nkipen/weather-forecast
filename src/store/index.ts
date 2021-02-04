import { createStore } from 'vuex'
import services from '@/services'
import { isEmpty } from 'lodash'
import { Coords, StoreState } from '@/types'
import { getItemFromLS } from '@/helpers'

export default createStore({
  state: {
    weather: getItemFromLS('weather'),
    coords: getItemFromLS('coords'),
    isGeolocationAllowed: false
  } as StoreState,
  mutations: {
    UPDATE_WEATHER (state, payload = {}) {
      state.weather = payload
      if (isEmpty(payload)) localStorage.removeItem('weather')
      else localStorage.setItem('weather', JSON.stringify(payload))
    },
    UPDATE_COORDS (state, payload: Coords) {
      state.coords = payload
      localStorage.setItem('coords', JSON.stringify(payload))
      if (!state.isGeolocationAllowed) state.isGeolocationAllowed = true
    }
  },
  actions: {
    updateWeather ({ commit, getters }) {
      const coords = getters.getCurrentCoords
      return new Promise((resolve, reject) => {
        services.getWeather(coords)
          .then(data => {
            const currentWeather = data.data[0]
            commit('UPDATE_WEATHER', currentWeather)
            return resolve(currentWeather)
          })
          .catch(error => reject(error))
      })
    },
    getCity ({ commit, state }) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude: lat, longitude: lon } = coords
            commit('UPDATE_COORDS', { lat, lon })
            resolve({ lat, lon })
          },
          ({ code }) => {
            if (code === 1) state.isGeolocationAllowed = false
            reject(code)
          })
      })
    },
    updateCity ({ commit }, payload: Coords) {
      commit('UPDATE_COORDS', payload)
    }
  },
  getters: {
    getCurrentWeather: state => state.weather,
    getCurrentCoords: state => state.coords,
    isGeolocationAllowed: state => state.isGeolocationAllowed
  },
  modules: {
  }
})
