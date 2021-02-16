<template>
  <div class="widget">
    <div class="widget__item" v-for="(item, id) in forecastArray" :key="id" :class="{ 'widget__item_active': id === 0 }">
      <div>{{ formatData(item).day }}</div>
      <img :src="formatData(item).img" class="weather-icon" alt="Weather Icon">
      <div>{{ formatData(item).temp }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { format, parseISO } from 'date-fns'

export default defineComponent({
  name: 'MiniWidget',
  props: {
    forecastArray: {
      type: Array,
      required: true
    }
  },
  setup () {
    const miniWidget = reactive({
      formatData ({ datetime, temp, weather }) {
        return {
          day: format(parseISO(datetime), 'ccc'),
          temp: `${temp}°C`,
          img: require(`@/assets/icons/${weather.icon}.png`)
        }
      }
    })

    return { ...toRefs(miniWidget) }
  }
})
</script>

<style lang="scss" scoped>
  .widget {
    display: flex;
    margin: 1rem 0;
    border-radius: .3rem;
    background: #40526e;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: .3rem;
      padding: 1rem .3rem;
      transition: all .3s ease;
      font-weight: bold;

      &_active, &:hover {
        background: aliceblue;
        color: #343d4b;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    img {
      width: auto;
      height: 50px;
    }
  }
</style>
