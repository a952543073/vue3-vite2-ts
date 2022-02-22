/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:02:31
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:45:54
 * @Descripttion:
 */
module.exports = {
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  printWidth: 120, // 每行到多少长度开始折行
  proseWrap: 'never', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  tabWidth: 2, // 缩进长度
  singleQuote: true, // 是否单引号
  semi: false, // 是否在行尾加分号
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  useTabs: false, // 使用tab（制表符）缩进而非空格
  formatOnSave: true,
  arrowParens: 'always', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid不带）always
}
