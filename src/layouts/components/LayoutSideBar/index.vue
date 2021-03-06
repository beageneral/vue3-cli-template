<template>
  <el-scrollbar class="layout-side-bar" :class="{ 'is-collapse': collapse, 'side-bar-common': layout === 'common' }">
    <!-- 菜单标题 logo -->
    <LayoutLogo v-if="layout === 'vertical' || layout === 'comprehensive'" />
    <el-menu
      :active-text-color="variables['menu-color-active']"
      :background-color="variables['menu-background']"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      menu-trigger="click"
      mode="vertical"
      :text-color="variables['menu-color']"
      :unique-opened="uniqueOpened"
    >
      <template v-for="(route, index) in handleRoutes" :key="index + route.name">
        <LayoutMenu v-if="route.meta && !route.meta.hidden" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { computed, ref, watch, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { handleActivePath } from '@utils/routes'
  import { defaultOpeneds, uniqueOpened } from '@/config'
  import variables from '@/assets/scss/variables/variables.scss'

  export default {
    name: 'LayoutSideBar',
    props: {
      layout: {
        type: String,
        default: 'vertical',
      },
    },
    setup(props) {
      const store = useStore()
      const route = useRoute()

      const extra = computed(() => store.getters['settings/extra'])
      const routes = computed(() => store.getters['routes/routes'])
      const collapse = computed(() => store.getters['settings/collapse'])
      const _activeMenu = computed(() => store.getters['routes/activeMenu'])

      const activeMenu = ref(null)

      const handleRoutes = computed(() =>
        props.layout === 'comprehensive'
          ? handlePartialRoutes()
          : routes.value.flatMap((_route) => (_route.meta && _route.meta.levelHidden === true && _route.children ? _route.children : _route))
      )

      const handlePartialRoutes = () => {
        const activeMenu = routes.value.find((_route) => _route.name === extra.value.first)
        return activeMenu ? activeMenu.children : []
      }

      watchEffect(() => (activeMenu.value = handleActivePath(route)))

      watch(
        () => _activeMenu.value,
        () => {
          activeMenu.value = _activeMenu.value
        },
        {
          deep: true,
        }
      )

      return {
        routes,
        collapse,
        variables,
        activeMenu,
        handleRoutes,
        uniqueOpened,
        defaultOpeneds,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }

    &.is-active {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }
  }

  .layout-side-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index + 1;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-menu-background;
    box-shadow: $base-box-shadow;
    transition: $base-transition;

    &.side-bar-common {
      top: $base-top-bar-height;
      height: calc(100vh - #{$base-top-bar-height});
    }

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      :deep {
        .el-menu--collapse.el-menu {
          > .el-menu-item,
          > .el-submenu {
            text-align: center;

            .el-tag {
              display: none;
            }
          }
        }

        .el-menu-item,
        .el-submenu {
          text-align: left;
        }

        .el-menu--collapse {
          border-right: 0;

          .el-submenu__icon-arrow {
            right: 10px;
            margin-top: -3px;
          }
        }
      }
    }

    :deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-menu {
        border: 0;
      }

      .el-menu-item,
      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;

        i {
          color: inherit;
        }
      }

      .el-menu-item {
        @include active;
      }
    }
  }
</style>
