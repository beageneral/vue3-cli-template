import Pagination from './src/index'

Pagination.install = (app) => app.component(Pagination.name, Pagination)

export { usePaginationEffect } from './hooks/index'

export default Pagination
