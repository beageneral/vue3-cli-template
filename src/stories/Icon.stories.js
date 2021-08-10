import AppIcon from '../components/Icon'
import { ElButton } from 'element-plus'

export default {
  title: 'Dxy/Icon',
  component: AppIcon,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
}

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
}
