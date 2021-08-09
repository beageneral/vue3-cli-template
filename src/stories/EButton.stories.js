import ElButton from './EButton'

export default {
  title: 'elementPlus/Button',
  component: ElButton,
  argTypes: {},
}

const Template = (args) => ({
  components: { ElButton },
  setup() {
    return { args }
  },
  template: '<el-button v-bind="args" />',
})

export const DefaultMsg = Template.bind({})
DefaultMsg.args = {
  msg: '更改按钮文本',
  type: 'primary',
  size: 'mini',
}
