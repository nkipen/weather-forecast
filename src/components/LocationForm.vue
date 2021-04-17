<template>
  <el-form @submit.prevent="onSubmit" class="location-form">
    <el-form-item label="Country">
      <el-select v-model="checkedCountry"
                 filterable
                 remote
                 :fremote-method="onCountrySearch"
                 @change="onCountryChange"
                 placeholder="Select country">
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
                 :disabled="!checkedCountry"
                 :filter-method="getCitiesOptions"
                 :placeholder="cityPlaceholder">
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid delectus exercitationem harum impedit
        itaque nam provident quaerat recusandae repellat veritatis.
      </p>
      <span>text</span>
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
    const checkedCountry = ref(undefined)
    const checkedCityId = ref(undefined)
    const filteredCities = computed(() => {
      return checkedCountry.value
        ? citiesArray.filter(({ country_code: code }) => code === checkedCountry.value) : citiesArray.slice(0, 100)
    })
    const checkedCity = computed(() => filteredCities.value.find(({ city_id: id }) => id === checkedCityId.value))
    const cityPlaceholder = computed(() => checkedCountry.value ? checkedCity.value.city_name : 'Select city')
    const getCitiesOptions = () => filteredCities
    const onCountryChange = () => { checkedCityId.value = filteredCities.value['0'].city_id }

    const onCountrySearch = (searchQuery) => {
      countries.value = searchQuery.length ? countriesArray.filter(({ country_name: name, country_code: code }) => {
        const countryName = name || code
        return countryName.toLowerCase().includes(searchQuery.toLowerCase())
      }) : countriesArray
    }

    const onSubmit = async () => {
      const { lat, lon } = checkedCity.value
      await updateCity({ lat, lon })
      await store.dispatch('updateWeather')
    }

    return {
      countries,
      checkedCountry,
      filteredCities,
      checkedCityId,
      cityPlaceholder,
      getCitiesOptions,
      onCountrySearch,
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
