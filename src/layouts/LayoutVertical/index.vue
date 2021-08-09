<template>
  <!-- 纵向布局 -->
  <div class="layout-container-vertical" :class="{ fixed: fixedHeader, 'no-tabs-bar': !showTabs }">
    <!-- sideBar 侧栏 -->
    <LayoutSideBar />

    <!-- 移动端遮罩 -->
    <div v-if="device === 'mobile' && !collapse" class="v-modal" @click="handleFoldSideBar"></div>

    <!-- header menus: use min margin-left on sideBar collapsed -->
    <div class="layout-main" :class="{ 'is-collapse-main': collapse }">
      <div
        class="layout-header"
        :class="{
          'fixed-header': fixedHeader,
        }"
      >
        <!-- nav -->
        <LayoutNav />
        <LayoutTabs v-show="showTabs" />
      </div>

      <!-- main page -->
      <LayoutAppMain />
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'

  export default {
    name: 'LayoutVertical',
    props: {
      collapse: {
        type: Boolean,
        default() {
          return false
        },
      },
      fixedHeader: {
        type: Boolean,
        default() {
          return true
        },
      },
      showTabs: {
        type: Boolean,
        default() {
          return true
        },
      },
      device: {
        type: String,
        default() {
          return 'desktop'
        },
      },
    },
    setup() {
      const store = useStore()

      return {
        handleFoldSideBar: () => store.dispatch('settings/foldSideBar'),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-container-vertical {
    .fixed-header {
      left: $base-left-menu-width;
      width: $base-right-content-width;
    }
  }
</style>
