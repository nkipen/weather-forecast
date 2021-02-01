<template>
  <div class="hello">
    <h1 v-html="msg"></h1>
    <div class="weather-item">
      <div class="weather-item__name">{{ cityName }}</div>
      <div class="weather-item__temp">{{ temperature }}<div>°C</div></div>
      <div class="weather-item__description">
        <img :src="imgSrc" class="weather-icon" alt="weather-icon">
        {{ weather.description }}
      </div>
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
    const weather = computed(() => store.getters.getCurrentWeather.weather)
    const icon = computed(() => store.getters.getCurrentWeather.weather.icon)
    return {
      weather,
      cityName: computed(() => store.getters.getCurrentWeather.city_name),
      temperature: computed(() => store.getters.getCurrentWeather.temp),
      imgSrc: computed(() => require(`@/assets/icons/${icon.value}.png`))
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
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  & div {
    display: flex;
  }

  &__temp {
    display: flex;
    font-size: 8rem;
    line-height: .9;
    justify-content: center;
    margin: 1rem 0;
    color: #42b983;

    div {
      font-size: 2rem;
      margin-top: .8rem;
      color: #2c3e50;
    }
  }

  &__description {
    align-items: center;
  }

  .weather-icon {
    width: 50px;
    height: 50px;
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
