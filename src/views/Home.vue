<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <mini-widget />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MiniWidget from '@/components/MiniWidget.vue'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const headerText = ref('test')
    const initWeather = async () => {
      await store.dispatch('updateCity')
      await store.dispatch('updateWeather')
    }
    onMounted(() => initWeather())
    return { headerText }
  },
  components: {
    MiniWidget
  }
})
</script>
