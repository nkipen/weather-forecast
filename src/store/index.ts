import { createStore } from 'vuex'
import services from '@/services'
import { isEmpty } from 'lodash'
import { Coords, StoreState } from '@/types'
import { getItemFromLS } from '@/helpers'

export default createStore({
  state: {
    weather: getItemFromLS('weather'),
    coords: getItemFromLS('coords'),
    checkedDayId: 0,
    loading: false,
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
    },
    UPDATE_LOADING (state, payload = true) {
      state.loading = payload
    },
    UPDATE_CHECKED_DAY_ID (state, payload: number) {
      state.checkedDayId = payload
    }
  },
  actions: {
    updateWeather ({ commit, getters }) {
      const coords = getters.getCurrentCoords
      commit('UPDATE_LOADING')
      return new Promise((resolve, reject) => {
        services.getWeather(coords)
          .then(data => {
            commit('UPDATE_WEATHER', data)
            return resolve(data)
          })
          .catch(error => reject(error))
          .finally(() => commit('UPDATE_LOADING', false))
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
    },
    updateCheckedDayId ({ commit }, payload: number) {
      commit('UPDATE_CHECKED_DAY_ID', payload)
    },
    toggleLoading ({ commit }, payload: boolean) {
      commit('UPDATE_LOADING', payload)
    }
  },
  getters: {
    getWeather: ({ weather }) => weather,
    checkedDayId: ({ checkedDayId }) => checkedDayId,
    getCurrentWeather: ({ weather, checkedDayId }) => weather.data[checkedDayId],
    getCurrentCoords: ({ coords }) => coords,
    loading: ({ loading }) => loading,
    isGeolocationAllowed: ({ isGeolocationAllowed }) => isGeolocationAllowed
  }
})
