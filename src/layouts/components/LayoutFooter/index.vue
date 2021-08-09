<template>
  <footer class="layout-footer">
    {{ copyright }}
  </footer>
</template>

<script>
  import { copyright, menuTitle } from '@/config'

  export default {
    name: 'LayoutFooter',
    data() {
      return {
        fullYear: new Date().getFullYear(),
        copyright,
        menuTitle,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55px;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    background: $base-color-white;
    border-top: 1px dashed $base-border-color;

    i {
      margin: 0 5px;
    }
  }
</style>
