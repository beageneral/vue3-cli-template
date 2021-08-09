<template>
  <el-breadcrumb class="layout-breadcrumb" separator=">">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <a @click.prevent="handleLink(item.redirect)">
        <AppIcon v-if="item?.meta?.icon" :icon="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { computed, ref, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {
    name: 'LayoutBreadcrumb',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const routes = computed(() => store.getters['routes/routes'])
      const breadcrumbList = ref([])

      const handleLink = (redirect) => {
        if (redirect) router.push(redirect)
      }

      const updateBreadcrumbList = (_routes) => {
        _routes.forEach((_route) => {
          if (_route.childrenPathList.indexOf(route.path) + 1) {
            breadcrumbList.value.push(_route)
            if (_route.children) updateBreadcrumbList(_route.children)
          }
        })
      }

      watchEffect(() => {
        breadcrumbList.value = []
        updateBreadcrumbList(routes.value)
        breadcrumbList.value = breadcrumbList.value.filter((item) => item.meta && item.meta.title)
      })

      return {
        handleLink,
        breadcrumbList,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-breadcrumb {
    height: $base-nav-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-height;

    :deep {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          a {
            font-weight: normal;
            color: #515a6e;
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
