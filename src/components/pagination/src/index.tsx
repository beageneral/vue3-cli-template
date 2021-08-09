import { defineComponent, inject, toRefs, InjectionKey } from 'vue'
import { IPagination, TSetPagination } from '../types'
import { defaultPagination } from '../hooks'

const symbols = {
  pagination: Symbol() as InjectionKey<IPagination>,
  setPagination: Symbol() as InjectionKey<TSetPagination>,
}

export default defineComponent({
  name: 'AppPagination',
  emits: ['onPaginationChange'],
  setup(props, { emit }) {
    const pagination = inject(symbols.pagination, defaultPagination)
    const setPagination = inject(symbols.setPagination, () => {})

    const handleSizeChange = (val: number) => setPagination({ pageSize: val }, () => emit('onPaginationChange'))
    const handleCurrentChange = (val: number) => setPagination({ pageNo: val }, () => emit('onPaginationChange'))
    const handleTotalChange = (val: number) => setPagination({ totalCount: val }, false)

    return () => {
      const { pageNo, pageSize, pageSizes, totalCount } = toRefs(pagination)

      return (
        <>
          <div class="text-right absolute right-5 bottom-5">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              current-page={pageNo}
              page-size={pageSize}
              page-sizes={pageSizes}
              total={totalCount}
              onCurrentChange={handleCurrentChange}
              onSizeChange={handleSizeChange}
              onTotalChange={handleTotalChange}
            />
          </div>
        </>
      )
    }
  },
})
