// export function $log() {
//   console.log.apply(console, [
//     `%c globalInfo %c Detected Vue %c`,
//     "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
//     "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
//     "background:transparent",
//     ...arguments,
//   ]);
// }

export const $log = {} // 单色输出
export const $$log = {} // 双色输出
$log.primary = function (text, back = false) {
  this.print(text, 'primary', back)
}
$log.success = function (text, back = false) {
  this.print(text, 'success', back)
}
$log.info = function (text, back = false) {
  this.print(text, 'info', back)
}
$log.warning = function (text, back = false) {
  this.print(text, 'warning', back)
}
$log.danger = function (text, back = false) {
  this.print(text, 'danger', back)
}
$$log.primary = function (title, text) {
  this.print(title, text, 'primary')
}
$$log.success = function (title, text) {
  this.print(title, text, 'success')
}
$$log.info = function (title, text) {
  this.print(title, text, 'info')
}
$$log.warning = function (title, text) {
  this.print(title, text, 'warning')
}
$$log.danger = function (title, text) {
  this.print(title, text, 'danger')
}

/**
 * 美化打印
 * @param text 输出文本
 * @param type 输出样式，可以是6个状态值，也可以是自定义颜色
 * @param back 是否将色值应用于背景色
 */
$log.print = function (text, type = 'default', back = false) {
  if (typeof text === 'object') {
    // 如果是对象则调用打印对象方式
    console.dir(text)
    return
  }
  if (back) {
    // 如果是打印带背景图的
    console.log(`%c ${text} `, `background:${typeColor(type)}; padding: 2px; border-radius: 4px;color: #fff;`)
  } else {
    console.log(`%c ${text} `, `color: ${typeColor(type)};`)
  }
}

/**
 * 两栏打印
 * @param title 前面的标题
 * @param text 输出文本
 * @param type 输出样式，可以是6个状态值，也可以是自定义颜色
 */
$$log.print = function (title, text, type = 'primary') {
  // 输出基本双色字段信息
  if (type === 'info') {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${typeColor(type)};border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
      `border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 0 4px 4px 0; color: ${typeColor(type)};`,
      'background:transparent'
    )
    return
  }

  console.log(
    `%c ${title} %c`,
    `background:${typeColor(type)};border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
    'background:transparent',
    text
  )
}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info ]
 */
function typeColor(type = 'default') {
  let color = ''
  switch (type) {
    case 'primary':
      color = '#2d8cf0'
      break
    case 'success':
      color = '#19be6b'
      break
    case 'info':
      color = '#909399'
      break
    case 'warning':
      color = '#ff9900'
      break
    case 'danger':
      color = '#f03f14'
      break
    case 'default':
      color = '#35495E'
      break
    default:
      color = type
      break
  }
  return color
}
