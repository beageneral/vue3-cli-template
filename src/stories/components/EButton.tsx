import { defineComponent, PropType } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'my-button',
  components: { ElButton },
  props: {
    msg: {
      type: String as PropType<string>,
      default: 'el-button default msg',
      required: true,
    },
    color: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <el-button {...props} style={{ color: props.color }}>
        {props.msg}
      </el-button>
    )
  },
})
