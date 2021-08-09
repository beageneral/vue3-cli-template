<template>
  <div v-if="itemOrMenu?.meta?.levelHidden">
    <template v-for="route in itemOrMenu.children" :key="route.path">
      <LayoutMenu :item="route" />
    </template>
  </div>

  <el-submenu v-else ref="subMenu" :index="itemOrMenu.path" popper-append-to-body>
    <template #title>
      <AppIcon v-if="itemOrMenu?.meta?.icon" :icon="itemOrMenu.meta.icon" />
      <span :title="translateTitle(itemOrMenu.meta.title)">
        {{ translateTitle(itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
  import { translateTitle } from '@/assets/utils/i18n'

  export default {
    name: 'SubMenu',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    setup() {
      return {
        translateTitle,
      }
    },
  }
</script>
