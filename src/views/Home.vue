<template>
    <el-container v-loading="loading" direction="vertical">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :xl="12">
          <h2 v-html="title"></h2>
          <location-form />
        </el-col>
      </el-row>
      <template v-if="hasWeather">
        <full-widget />
      </template>
      <el-empty v-else>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-alert :title="warningMessage" type="warning" :closable="false" show-icon />
          </el-col>
        </el-row>
      </el-empty>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import FullWidget from '@/components/FullWidget.vue'
import LocationForm from '@/components/LocationForm.vue'
import { isEmpty } from 'lodash'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const title = ref('<i class=\'el-icon-location\'></i> Choose your <s>fighter</s> city')
    const warningMessage = ref('Allow \'Weather Forecast\' to access your location.')
    const initWeather = async () => {
      try {
        await store.dispatch('toggleLoading')
        await store.dispatch('getCity')
        await store.dispatch('updateWeather')
      } catch (error) {
        console.log(error)
      } finally {
        await store.dispatch('toggleLoading', false)
      }
    }
    const hasWeather = computed(() => store.getters.isGeolocationAllowed && !isEmpty(store.getters.getCurrentWeather))
    onMounted(() => initWeather())
    return {
      title,
      warningMessage,
      hasWeather,
      loading: computed(() => store.getters.loading)
    }
  },
  components: {
    FullWidget,
    LocationForm
  }
})
</script>
