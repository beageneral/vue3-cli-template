<!--
 * @Description: 首页看板
-->
<template>
  <div class="dashboard-container home">
    <el-row class="time">当前时间：{{ time }}</el-row>
    <el-row :gutter="20">
      <!-- 动态组件 -->
      <component :is="PageHeader" :description="[...versionChangeLog].splice(0, 2)" />

      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <div class="text-indigo-500">敬请期待...</div>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <!-- block2 -->
        <span class="text-red-400">心脏骤停</span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  // 组件引入就可以直接使用
  import PageHeader from './components/PageHeader'
  import { $ref, onMounted } from 'vue'
  import Dayjs from 'dayjs'
  import { versionChangeLog } from '@/config'

  let time = $ref(new Dayjs().format('YYYY-MM-DD HH:mm:ss'))

  onMounted(() =>
    setInterval(() => {
      // HACK $ref 是 vue3.2 实验性特性，搭配 vue.config.js 的配置使用
      // 就像是是普通的响应式对象，无需使用 .value
      time = new Dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 500)
  )
</script>

<style lang="scss" scoped>
  img {
    height: fit-content;
  }

  .time {
    height: 40px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(to top, #77e0a0, #75c3e9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
