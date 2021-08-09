<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <div v-for="(p, idx) in description" :key="idx">
          <hr v-if="idx !== 0" class="my-2" />
          <p class="page-header-tip-description" v-html="p"></p>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { versionChangeLog } from '@/config'

  export default {
    data() {
      return {
        description: [...versionChangeLog].splice(0, 2),
        avatar: require('@/assets/images/vue3_logo.png'),
      }
    },
    computed: {
      ...mapGetters({
        username: 'user/username',
      }),
    },

    methods: {
      handleTips() {
        const hour = new Date().getHours()
        return hour < 9
          ? `早上好 ${this.username}，看到勤劳的你我好开心。`
          : hour <= 10
          ? `上午好 ${this.username}，马上要开始干活了~`
          : hour <= 12
          ? `中午好 ${this.username}，准备吃午餐了~`
          : hour < 16
          ? `下午好 ${this.username}，你一定有些累了，企业微信或许更新了菜单~`
          : `晚上好 ${this.username}，下班别忘打卡~`
      },
    },
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
        color: #808695;
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
