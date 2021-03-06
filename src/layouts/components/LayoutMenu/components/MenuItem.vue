<template>
  <el-menu-item :index="itemOrMenu.path" @click="handleLink">
    <AppIcon v-if="itemOrMenu?.meta?.icon" :icon="itemOrMenu.meta.icon" />

    <span :title="translateTitle(itemOrMenu.meta.title)">
      {{ translateTitle(itemOrMenu.meta.title) }}
    </span>

    <el-tag v-if="itemOrMenu?.meta?.badge" effect="dark" type="danger">
      {{ itemOrMenu.meta.badge }}
    </el-tag>

    <span v-if="itemOrMenu?.meta?.dot" class="layout-dot layout-dot-error">
      <span />
    </span>
  </el-menu-item>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { isExternal } from '@utils/validate'
  import { isHashRouterMode } from '@/config'
  import { translateTitle } from '@/assets/utils/i18n'

  export default {
    name: 'MenuItem',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    setup(props) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const device = computed(() => store.getters['settings/device'])
      const foldSideBar = () => store.dispatch('settings/foldSideBar')

      const handleLink = () => {
        const routePath = props.itemOrMenu.path
        const target = props.itemOrMenu.meta.target
        if (target === '_blank') {
          if (isExternal(routePath)) window.open(routePath)
          else if (route.path !== routePath) isHashRouterMode ? window.open('/#' + routePath) : window.open(routePath)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (route.path !== routePath) {
            if (device.value === 'mobile') foldSideBar()
            router.push(props.itemOrMenu.path)
          }
        }
      }

      return {
        handleLink,
        translateTitle,
      }
    },
  }
</script>

<style lang="scss" scoped>
  :deep {
    .el-tag {
      float: right;
      height: 16px;
      padding-right: 4px;
      padding-left: 4px;
      margin-top: #{math.div($base-menu-item-height - 16, 2)};
      line-height: 16px;
      border: 0;
    }
  }

  .layout-dot {
    float: right;
    margin-top: #{math.div($base-menu-item-height - 6, 2)};
  }
</style>
