<template>
  <div class="hello">
    <h1 v-html="msg"></h1>
    <div class="weather-item">
      <div class="weather-item__name">{{ cityName }}</div>
      <div class="weather-item__temp">{{ temperature }}<div>°C</div></div>
      <div>{{ weather.description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MiniWidget',
  setup () {
    const store = useStore()
    return {
      weather: computed(() => store.getters.getCurrentWeather.weather),
      cityName: computed(() => store.getters.getCurrentWeather.city_name),
      temperature: computed(() => store.getters.getCurrentWeather.temp)
    }
  },
  props: {
    msg: {
      type: String,
      default: 'Choose your <s>fighter</s> city.'
    }
  }
})
</script>

<style scoped lang="scss">
.weather-item {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  &__temp {
    display: flex;
    font-size: 8rem;
    line-height: .9;
    justify-content: center;
    margin: 1rem 0;

    div {
      font-size: 2rem;
    }
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
