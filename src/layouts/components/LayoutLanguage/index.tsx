import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import getPageTitle from '@/assets/utils/pageTitle'
import i18n from '@/i18n'

export default defineComponent({
  name: 'LayoutLanguage',
  setup() {
    const store = useStore()
    const route = useRoute()

    const changeLanguage = (language) => store.dispatch('settings/changeLanguage', language)
    const handleCommand = (language) => {
      changeLanguage(language)
      i18n.global.locale = language
      document.title = getPageTitle(route.meta.title)
    }

    const theme = computed(() => store.getters['settings/theme']) as any
    const dropdownSlot = {
      dropdown: () => (
        <el-dropdown-menu>
          <el-dropdown-item command="zh">中文简体</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      ),
    }

    return () => (
      <>
        {theme.value.showLanguage && (
          <el-dropdown class="mr-4" onCommand={handleCommand} v-slots={dropdownSlot}>
            <app-icon icon="el-icon-eleme" />
          </el-dropdown>
        )}
      </>
    )
  },
})
