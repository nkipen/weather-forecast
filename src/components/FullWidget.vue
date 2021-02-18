<template>
  <el-row class="weather-item" :gutter="20" type="flex" justify="center">
    <el-col :xs="24" :sm="12" :md="6" :lg="4" class="weather-item__card">
      <div class="weather-item__date">
        <div>{{ dateString }}</div>
        <div><i class="el-icon-location"></i>{{ locationName }}</div>
      </div>
      <img :src="imgSrc" class="weather-icon" alt="Weather Icon">
      <div class="weather-item__temp">{{ temperature }}<div>°C</div></div>
      <div>{{ currentWeather.weather.description }}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8" :lg="6" class="weather-item__card weather-item__card_detailed">
      <div class="weather-item__row">
        <div class="weather-item__column">{{ transformToUpperText('Relative humidity:') }}</div>
        <div class="weather-item__column">{{ currentWeather.rh }} %</div>
      </div>
      <div class="weather-item__row">
        <div class="weather-item__column">{{ transformToUpperText('Wind speed:') }}</div>
        <div class="weather-item__column">{{ windSpeed }} km/hr</div>
      </div>
      <div class="weather-item__row">
        <div class="weather-item__column">{{ transformToUpperText('Sunrise:') }}</div>
        <div class="weather-item__column">{{ sunRise }}</div>
      </div>
      <div class="weather-item__row">
        <div class="weather-item__column">{{ transformToUpperText('Sunset:') }}</div>
        <div class="weather-item__column">{{ sunSet }}</div>
      </div>
      <mini-widget :forecast-array="getWeather.data" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { format, fromUnixTime, parseISO } from 'date-fns'
import MiniWidget from '@/components/MiniWidget.vue'

export default defineComponent({
  name: 'FullWidget',
  setup () {
    const store = useStore()
    const getWeather = computed(() => store.getters.getWeather)
    const currentWeather = computed(() => store.getters.getCurrentWeather)
    const locationName = computed(() => `${getWeather.value.city_name}, ${getWeather.value.country_code}`)
    const windSpeed = computed(() => (currentWeather.value.wind_spd * 3.6).toFixed(2))
    const sunRise = format(fromUnixTime(currentWeather.value.sunrise_ts), 'p')
    const sunSet = format(fromUnixTime(currentWeather.value.sunset_ts), 'p')
    const icon = computed(() => currentWeather.value.weather.icon)
    const dateString = computed(() => format(parseISO(currentWeather.value.datetime), 'ccc, d MMMM yyyy'))
    const transformToUpperText = (text: string): string => text.toUpperCase()

    return {
      getWeather,
      currentWeather,
      locationName,
      windSpeed,
      sunRise,
      sunSet,
      dateString,
      transformToUpperText,
      temperature: computed(() => store.getters.getCurrentWeather.temp),
      imgSrc: computed(() => require(`@/assets/icons/${icon.value}.png`))
    }
  },
  components: {
    MiniWidget
  }
})
</script>

<style scoped lang="scss">
.weather-item {
  display: flex;
  margin: 2rem 0;
  justify-content: center;

  &__temp {
    display: flex;
    font-size: 3rem;
    line-height: .9;
    color: #42b983;

    div {
      font-size: 1rem;
      margin-top: .3rem;
    }
  }

  &__card {
    background: linear-gradient(#343d4b, #63738c);
    color: aliceblue;
    border-radius: 2rem;
    padding: 1rem 1.5rem !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(&_detailed) {
      div + div {
        margin-top: .5rem;
      }
    }

    &_detailed {
      align-items: normal;
      border-radius: 0 1rem 1rem 0;
      margin: 2rem 0;
      padding: 1rem !important;
      background: #343d4b;
      font-size: .8rem;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: .5rem;
    }
  }

  &__column {
    & + & {
      margin-left: 1.5rem;
    }
  }

  .weather-icon {
    width: 110px;
    height: 110px;
    margin: 4rem 0 0 -1rem;
  }

  @media(max-width: 767px ) {
    &__card {
      max-width: 400px;

      &_detailed {
        border-radius: 2rem;
      }
      & /deep/.widget__item {
        padding: 1rem 0;
      }
    }
  }
}
</style>
