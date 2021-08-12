<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <div v-for="(p, idx) in props.description" :key="idx">
          <hr v-if="idx !== 0" class="my-2" />
          <p class="page-header-tip-description" v-html="p"></p>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script setup>
  /*
      在该范围内的所有顶级变量，都可以被 template 直接使用
     */
  import { useStore } from 'vuex'
  import { computed, ref } from 'vue'

  const store = useStore()
  const props = defineProps({
    description: Array,
  })

  const avatar = require('@/assets/images/vue3_logo.png')
  const username = computed(() => store.getters['user/username'])

  // 给 <style> v-bind 使用的样式变量
  const styleVal = ref('#808695')

  const handleTips = () => {
    const hour = new Date().getHours()
    return hour < 9
      ? `早上好 ${username.value}，不想起床。`
      : hour <= 10
      ? `上午好 ${username.value}，不想上班。`
      : hour <= 12
      ? `中午好 ${username.value}，不想吃饭。`
      : hour < 16
      ? `下午好 ${username.value}，想下班了。`
      : `晚上好 ${username.value}，今晚通宵。`
  }

  // 1 emit 事件
  // const emit = defineEmits(['notify'])

  // 2 导出变量
  // defineExpose({
  //   props,
  // })

  // 3 slots 和 attrs 的使用
  // import { useSlots, useAttrs } from 'vue'
  // const slots = useSlots()
  // const attrs = useAttrs()

  // 4 可以直接使用 await，因为 setup 默认是 async 顶级模块

  // 5 当使用 script setup 后，不建议继续使用 src 属性，不然会对开发人员造成混淆
</script>

<script>
  // 可以同时使用多个 script 代码块
  // 普通的 <script> 下的代码，只会执行一次。用于放置需要仅执行一次的函数。
  // 在 <script setup> 下的代码，每次创建该组件都会被执行。

  // 一些特殊的 options 属性目前无法在 script setup 中实现
  export default {
    name: 'PageHeader',
    inheritAttrs: false,
    customOptions: {},
  }
</script>

<style lang="scss" scoped>
  .page-header {
    min-height: 105px;
    transition: $base-transition;

    :deep() {
      * {
        transition: $base-transition;
      }

      .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &-avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
    }

    &-tip {
      flex: auto;
      width: calc(100% - 200px);
      min-width: 300px;

      &-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        font-size: $base-font-size-default;
        color: v-bind(styleVal);
      }
    }

    &-avatar-list {
      flex: 1;
      min-width: 100px;
      margin-left: 20px;
      text-align: right;
      p {
        margin-right: 9px;
        line-height: 0px;
      }
    }
  }
</style>
