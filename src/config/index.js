/*
 * @Author: wujy
 * @Date: 2021-01-15 15:17:24
 * @LastEditTime: 2021-06-02 17:04:19
 * @Description: 聚合配置
 */

const theme = require('./theme.config')
const setting = require('./setting.config')
const net = require('./net.config')
const build = require('./build.config')
module.exports = {
  ...theme,
  ...setting,
  ...net,
  ...build,
}
