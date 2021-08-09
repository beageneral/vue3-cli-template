<template>
  <component :is="menuComponent" v-if="item.meta && !item.meta.hidden" :item-or-menu="item">
    <template v-if="item.children && item.children.length">
      <el-scrollbar
        v-if="(layout === 'horizontal' && item.children.length > 18) || (layout !== 'horizontal' && collapse && item.children.length > 18)"
        style="height: 86vh"
      >
        <LayoutMenu v-for="route in item.children" :key="route.path" :item="route" />
      </el-scrollbar>
      <template v-else>
        <LayoutMenu v-for="route in item.children" :key="route.path" :item="route" />
      </template>
    </template>
  </component>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'LayoutMenu',
    props: {
      item: {
        type: Object,
        required: true,
      },
      layout: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const store = useStore()
      const collapse = computed(() => store.getters['settings/collapse'])

      const menuComponent = computed(() =>
        props.item?.children?.some((_route) => {
          return _route.meta && _route.meta.hidden !== true
        })
          ? 'SubMenu'
          : 'MenuItem'
      )

      return {
        collapse,
        menuComponent,
      }
    },
  }
</script>

<style lang="scss">
  // element-plus bug fix
  .el-popper.is-light {
    border: 0 !important;
  }
</style>
