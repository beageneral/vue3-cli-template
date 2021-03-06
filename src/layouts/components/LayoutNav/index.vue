<!--
 * @Description: 布局 - 顶部栏
-->
<template>
  <div class="layout-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <IconFold />
          <!-- TODO comprehensive 布局 el-tabs 方案 -->
          <LayoutBreadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <!-- <layout-error-log />
          <layout-search />
          <layout-notice />
          <layout-full-screen />
          <layout-theme />
           -->
          <layout-language class="mr-4" />
          <el-tooltip content="刷新当前页" effect="dark" placement="bottom">
            <IconRefresh />
          </el-tooltip>
          <IconAvatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import { openFirstMenu } from '@/config'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'LayoutNav',
    props: {
      layout: {
        type: String,
        default: '',
      },
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const extra = computed(() => store.getters['settings/extra'])
      const routes = computed(() => store.getters['routes/routes'])

      const handleRoutes = computed(() => routes.value.filter((_route) => _route.meta && _route.meta.hidden !== true))
      const handleActiveMenu = () => routes.value.find((_route) => _route.name === extra.value.first)

      const handleTabClick = (handler) => {
        if (handler !== true && openFirstMenu) router.push(handleActiveMenu())
      }

      watch(
        () => route.matched[0].name,
        (name) => {
          extra.value.first = name
          handleTabClick(true)
        },
        {
          immediate: true,
        }
      )

      return {
        extra,
        routes,
        handleRoutes,
        handleTabClick,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-nav {
    position: relative;
    height: $base-nav-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-height;

      :deep {
        .layout-breadcrumb {
          margin-left: $base-margin;
        }

        .el-tabs {
          margin-left: $base-margin;

          .el-tabs__header {
            margin: 0;
          }

          .el-tabs__item {
            > div {
              display: flex;
              align-items: center;

              i {
                margin-right: 3px;
              }
            }
          }
        }

        .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-height;

      :deep {
        [class*='ri-'] {
          margin-left: $base-margin;
          color: $base-color-grey;
          cursor: pointer;
        }

        button {
          [class*='ri-'] {
            margin-left: 0;
            color: $base-color-white;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
