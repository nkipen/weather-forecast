<template>
  <div class="weather-item">
    <div class="weather-item__card">
      <div class="weather-item__date">
        <div>{{ dateString }}</div>
        <div><i class="el-icon-location"></i> {{ cityName }}</div>
      </div>
      <img :src="imgSrc" class="weather-icon" alt="Weather Icon">
      <div class="weather-item__temp">{{ temperature }}<div>°C</div></div>
      <div>{{ weather.description }}</div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'

export default defineComponent({
  name: 'MiniWidget',
  setup () {
    const store = useStore()
    const weather = computed(() => store.getters.getCurrentWeather.weather)
    const icon = computed(() => store.getters.getCurrentWeather.weather.icon)
    const dateString = ref(format(new Date(), 'ccc, d MMMM yyyy'))
    return {
      weather,
      dateString,
      cityName: computed(() => store.getters.getCurrentWeather.city_name),
      temperature: computed(() => store.getters.getCurrentWeather.temp),
      imgSrc: computed(() => require(`@/assets/icons/${icon.value}.png`))
    }
  }
})
</script>

<style scoped lang="scss">
.weather-item {
  display: flex;
  margin: 2rem 0;

  &__temp {
    display: flex;
    font-size: 3rem;
    line-height: .9;
    justify-content: center;
    color: #42b983;

    div {
      font-size: 1rem;
      margin-top: .3rem;
      //color: #2c3e50;
    }
  }

  &__card {
    background: #2c3e50;
    color: aliceblue;
    border-radius: 2rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    div + div {
      margin-top: .5rem;
    }
  }

  .weather-icon {
    width: 110px;
    height: 110px;
    margin: 4rem 0 0 -1rem;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
