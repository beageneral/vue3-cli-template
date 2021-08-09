<template>
  <div class="layouts-wrapper" :class="classObj">
    <component :is="'layout-' + theme.layout" :collapse="collapse" :device="device" :fixed-header="theme.fixedHeader" :show-tabs="theme.showTabs" />
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, onBeforeMount, onBeforeUnmount } from 'vue'

  export default {
    name: 'Layouts',
    setup() {
      const store = useStore()
      // 设备信息
      const device = computed(() => store.getters['settings/device'])
      // 展开状态
      const collapse = computed(() => store.getters['settings/collapse'])
      // 主题
      const theme = computed(() => store.getters['settings/theme'])
      // 切换设备
      const toggleDevice = (device) => store.dispatch('settings/toggleDevice', device)
      // 切换 sidebar 展开状态
      const foldSideBar = () => store.dispatch('settings/foldSideBar')
      const openSideBar = () => store.dispatch('settings/openSideBar')

      let isMobile = false,
        oldLayout = ''

      const classObj = computed(() => ({ mobile: device.value === 'mobile' }))

      // 切换布局
      const handleLayouts = () => {
        // 当前设备
        const isMobileTemp = document.body.getBoundingClientRect().width - 1 < 992

        if (isMobileTemp !== isMobile) {
          if (isMobileTemp) {
            oldLayout = theme.value.layout
            foldSideBar()
          } else {
            openSideBar()
          }

          // 移动端只能使用 vertical 布局模式
          theme.value.layout = isMobileTemp ? 'vertical' : oldLayout
          toggleDevice(isMobileTemp ? 'mobile' : 'desktop')
          isMobile = isMobileTemp
        }
      }

      // 改变屏幕大小时重新切换布局模式
      onBeforeMount(() => {
        oldLayout = theme.value.layout
        window.addEventListener('resize', handleLayouts)
        handleLayouts()
      })

      // 注销事件监听
      onBeforeUnmount(() => {
        if (isMobile) {
          theme.value.layout = oldLayout
        }
        window.removeEventListener('resize', handleLayouts)
      })

      return {
        device,
        collapse,
        theme,
        classObj,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layouts-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    // 布局系统 整体 + header
    [class*='layout-container-'] {
      position: relative;

      :deep {
        .layout-header {
          box-shadow: $base-box-shadow;
        }
      }

      &.fixed {
        padding-top: $base-nav-height + $base-tabs-height;
      }
      &.fixed.no-tabs-bar {
        padding-top: $base-nav-height;
      }
    }

    // 布局系统 main + header
    :deep {
      .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
      }

      .layout-main {
        position: relative;
        width: auto;
        min-height: 100%;
        margin-left: $base-left-menu-width;

        &.is-collapse-main {
          margin-left: $base-left-menu-width-min;

          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - #{$base-left-menu-width-min});
          }
        }
      }
    }

    // 手机端模式
    &.mobile {
      :deep {
        // vertical 模式
        .layout-container-vertical {
          .el-scrollbar.layout-side-bar.is-collapse {
            width: 0;
          }

          .layout-main {
            .fixed-header {
              left: 0;
              width: 100%;
            }

            width: 100%;
            margin-left: 0;
          }
        }

        // 隐藏分页和页码跳转
        .el-pager,
        .el-pagination__jump {
          display: none;
        }
      }
    }
  }
</style>
