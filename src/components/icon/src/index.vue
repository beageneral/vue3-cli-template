<template>
  <i aria-hidden="true" class="app-icon" :class="icon" :style="style"></i>
</template>

<script>
  export default {
    name: 'AppIcon',
    props: {
      icon: {
        type: String,
        default: 'el-icon-s-opportunity',
      },
      flex: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      style() {
        if (this.flex) {
          return {
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          }
        } else {
          return {
            display: 'inline-block',
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .app-icon {
    display: inline-block;
    font-size: 16px;
    text-align: center;
    vertical-align: -1.5px;
  }
</style>
