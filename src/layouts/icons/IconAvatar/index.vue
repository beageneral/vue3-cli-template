<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <AppIcon class="layout-dropdown" :class="{ 'layout-dropdown-active': active }" flex icon="el-icon-arrow-down" />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personalCenter">
          <AppIcon icon="el-icon-s-custom" />
          {{ 'Insight' }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <AppIcon icon="el-icon-guide" />
          {{ '退出' }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { logout, insightLink } from '@/config'

  export default {
    name: 'IconAvatar',
    data() {
      return {
        active: false,
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    methods: {
      ...mapActions({
        _logout: 'user/logout',
      }),
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
          case 'personalCenter':
            this.personalCenter()
            break
        }
      },
      handleVisibleChange(val) {
        this.active = val
      },
      personalCenter() {
        location.href = insightLink
      },
      async logout() {
        location.href = logout
      },
    },
  }
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
</style>
