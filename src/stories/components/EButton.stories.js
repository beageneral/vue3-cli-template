import config from '../config'
import ElButton from './EButton'
import { action } from '@storybook/addon-actions'

export default {
  title: `${config.elementName}/Button`,
  component: ElButton,
  // 组件级别参数的类型描述
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'success', 'warning', 'danger', 'info', 'text'] } },
    size: { control: { type: 'select' }, options: ['medium', 'small', 'mini'] },
    disabled: { control: { type: 'boolean' } },
    color: { control: 'color', description: 'description' },
    msg: {
      control: 'select',
      options: ['Bold', 'Italic'],
      // mapping 可以匹配 options 里的 item，并借助 jsx 进行内容实现
      mapping: {
        Bold: (
          <>
            <div>
              <span className="text-red-600">jsx</span>
            </div>{' '}
            <div>
              <span>第二行</span>
            </div>
          </>
        ),
        Italic: <i>Italicxx</i>,
      },
    },
  },
  // 组件级别参数的默认值
  args: {
    disabled: true,
  },
  // 布局容器的配置
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
}

const Template = (args) => ({
  components: { ElButton },
  setup() {
    const handleClicked = () => console.dir(args)

    return () => {
      const { onClick, customerEl } = args
      return (
        <>
          <div className="border-2 p-2 flex justify-around items-center">
            <el-button {...args} onClick={handleClicked} />
            <customer-el vSlots={{ customerEl }} vHtml={customerEl} />
          </div>
        </>
      )
    }
  },
})

// story 级别参数默认值
export const DisabledBtn = Template.bind({})
DisabledBtn.args = {
  msg: 'Bold',
}

export const contentBtn = Template.bind({})
contentBtn.args = {
  msg: 'Italic',
  // 调试的时候直接可以写组件，去渲染调试插槽等场景
  customerEl: '<a class="hover:underline" href="https://storybook.js.org/">JSX 动态a标签</a>',
}
