<template>
  <AppIcon v-if="theme.showRefresh" class="text-2xl" icon="el-icon-refresh" style="height: unset; cursor: pointer" @click="refreshRoute" />
</template>

<script>
  import { computed, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import NProgress from 'nprogress'

  export default {
    name: 'IconRefresh',
    setup(_, ctx) {
      const store = useStore()
      const theme = computed(() => store.getters['settings/theme'])
      const { proxy } = getCurrentInstance()

      const refreshRoute = () => {
        if (theme.value.showProgressBar) NProgress.start()
        proxy.$pub('reload-router-view')
        setTimeout(() => {
          if (theme.value.showProgressBar) NProgress.done()
        }, 200)
      }

      return {
        theme,
        refreshRoute,
      }
    },
  }
</script>
