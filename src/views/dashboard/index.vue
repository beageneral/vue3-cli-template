<!--
 * @Description: 首页看板
-->
<template>
  <div class="dashboard-container home">
    <el-row class="time">当前时间：{{ time }}</el-row>
    <el-row :gutter="20">
      <PageHeader />

      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <div class="text-indigo-500">敬请期待...</div>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <!-- block2 -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import Dayjs from 'dayjs'
  import PageHeader from './components/PageHeader'

  export default {
    name: 'Dashboard',
    components: {
      PageHeader,
    },
    setup() {
      const time = ref(new Dayjs().format('YYYY-MM-DD HH:mm:ss'))

      setInterval(() => {
        time.value = new Dayjs().format('YYYY-MM-DD HH:mm:ss')
      }, 500)

      return {
        time,
      }
    },
  }
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
