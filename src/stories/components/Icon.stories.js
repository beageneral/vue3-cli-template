import config from '../config'
import AppIcon from '@/components/Icon'
import { ElButton } from 'element-plus'

// 默认导出关于组件的基础功能描述
export default {
  title: `${config.bizName}/Icon`,
  component: AppIcon,
  argTypes: {
    style: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
}

// 这里的拿到的 args 是上面 argTypes + 下面具名 args 的合集参数
const Template = (args) => ({
  components: { AppIcon, ElButton },
  setup() {
    return { args }
  },
  template: '<app-icon v-bind="args" /><el-button v-bind="args" >xx</el-button>',
})

export const Primary = Template.bind({})
Primary.args = {
  icon: 'el-icon-s-opportunity',
  flex: false,
  type: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  icon: 'el-icon-s-opportunity',
  flex: true,
  type: 'x',
}
