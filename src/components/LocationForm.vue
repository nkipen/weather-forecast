<template>
  <form @submit.prevent="onSubmit">
    <select name="countrySelector" id="countrySelector" v-model="checkedCountry"
            @change="checkedCityId = filteredCities['0'].city_id">
      <option v-for="(country, id) in countries" :value="country.country_code" :key="id">
        {{ country.country_name || country.country_code }}
      </option>
    </select>
    <select name="citySelector" id="citySelector" v-model="checkedCityId">
      <option v-for="city in filteredCities" :value="city.city_id" :key="city.city_id">
        {{ city.city_name }}
      </option>
    </select>
    <button type="submit">Check</button>
  </form>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import countriesArray from '@/../countries.json'
import citiesArray from '@/../cities.json'

export default defineComponent({
  name: 'LocationForm',
  setup () {
    const store = useStore()
    const updateCity = (coords) => store.dispatch('updateCity', coords)
    const countries = ref(countriesArray)
    const checkedCountry = ref(countriesArray[0].country_code)
    const filteredCities = computed(() => citiesArray.filter(({ country_code: code }) => code === checkedCountry.value))
    const checkedCityId = ref(filteredCities.value['0'].city_id)
    const checkedCity = computed(() => filteredCities.value.find(({ city_id: id }) => id === checkedCityId.value))

    function onSubmit () {
      const { lat, lon } = checkedCity.value
      updateCity({ lat, lon })
      store.dispatch('updateWeather')
    }

    return {
      countries,
      checkedCountry,
      filteredCities,
      checkedCityId,
      onSubmit
    }
  }
})
</script>
