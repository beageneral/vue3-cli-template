/**
 * @description 正则校验规则集合
 * @author ErrorJE
 * @date 13/07/2021
 * @interface IRegKeys
 */
interface IRegKeys {
  /**
   * @description 邮箱
   */
  email: RegExp
  /**
   * @description 手机，仅校验位数
   */
  phone0: RegExp
  /**
   * @description 手机，强校验
   */
  phone1: RegExp
  /**
   * @description 固话
   */
  landline: RegExp
  /**
   * @description 小灵通
   */
  phs: RegExp
}

// 正则校验规则
export const regExps: IRegKeys = {
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  phone0: /^1\d{10}$/,
  phone1: /0?(13|14|15|17|18|19)[0-9]{9}/,
  landline: /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/,
  phs: /^\d{8}$/,
}

/**
 * @description 处理校验，并返回结果
 * @author ErrorJE
 * @date 13/07/2021
 * @export
 * @param {unknown} value
 * @param {keyof IRegKeys} type
 * @return {*}  {boolean}
 */
export function handleValidate(value: unknown, type: keyof IRegKeys): boolean {
  return regExps[type].test(value as string)
}
