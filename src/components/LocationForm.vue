<template>
  <el-form @submit.prevent="onSubmit" class="location-form">
    <el-form-item label="Country">
      <el-select v-model="checkedCountry"
              @change="onCountryChange" :placeholder="checkedCountry">
        <el-option v-for="(country, id) in countries"
                  :value="country.country_code"
                  :key="id"
                  :label="country.country_name || country.country_code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="City">
      <el-select v-model="checkedCityId"
                filterable
                :filter-method="getCitiesOptions"
                :placeholder="checkedCity.city_name">
        <el-option v-for="city in filteredCities"
                  :value="city.city_id"
                  :key="city.city_id"
                  :label="city.city_name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" plain>
        <i class="el-icon-search" /> Search
      </el-button>
    </el-form-item>
  </el-form>
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
    const onCountryChange = () => {
      checkedCityId.value = filteredCities.value['0'].city_id
    }
    const getCitiesOptions = () => filteredCities
    const onSubmit = () => {
      const { lat, lon } = checkedCity.value
      updateCity({ lat, lon })
      store.dispatch('updateWeather')
    }

    return {
      countries,
      checkedCountry,
      filteredCities,
      checkedCity,
      checkedCityId,
      getCitiesOptions,
      onCountryChange,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
  .location-form {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    .el-form-item + .el-form-item {
      margin-left: 1rem;
    }

    @media(max-width: 768px ) {
      flex-direction: column;
      align-items: center;

      .el-form-item + .el-form-item {
        margin-left: 0;
      }
    }
  }
</style>
