/**
 * @description: 改变浏览器地址参数
 * @param {*} url 原 url， 默认是当前地址
 * @param {*} arg 需要修改的参数字段
 * @param {*} arg_val 修改参数字段的新值
 * @return {*} 新的 url
 */
export function changeURLArg({ url = location.href, arg, arg_val }) {
  var pattern = arg + '=([^&]*)'
  var replaceText = arg + '=' + arg_val
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi'
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText
    } else {
      return url + '?' + replaceText
    }
  }
}
