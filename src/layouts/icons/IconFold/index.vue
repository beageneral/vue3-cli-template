<template>
  <AppIcon class="fold-unfold text-2xl" :icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="height: unset" @click="toggleCollapse" />
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'IconFold',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
      }),
    },
    methods: {
      ...mapActions({
        toggleCollapse: 'settings/toggleCollapse',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .fold-unfold {
    display: flex;
    color: $base-color-grey;
    cursor: pointer;
  }
</style>
