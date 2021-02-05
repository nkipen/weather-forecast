<template>
  <el-row class="home" type="flex" justify="center">
    <el-col :span="12">
      <h2 v-html="title"></h2>
      <location-form />
      <template v-if="hasWeather">
        <mini-widget />
      </template>
      <el-empty v-else>
        <el-alert :title="warningMessage" type="warning" :closable="false" show-icon />
      </el-empty>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MiniWidget from '@/components/MiniWidget.vue'
import LocationForm from '@/components/LocationForm.vue'
import { isEmpty } from 'lodash'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const title = ref('<i class=\'el-icon-location\'></i> Choose your <s>fighter</s> city')
    const warningMessage = ref('Allow \'Weather Forecast\' to access your location.')
    const initWeather = async () => {
      await store.dispatch('getCity')
      // await store.dispatch('updateWeather')
    }
    const hasWeather = computed(() => store.getters.isGeolocationAllowed && !isEmpty(store.getters.getCurrentWeather))
    onMounted(() => initWeather())
    return {
      title,
      warningMessage,
      hasWeather
    }
  },
  components: {
    MiniWidget,
    LocationForm
  }
})
</script>
