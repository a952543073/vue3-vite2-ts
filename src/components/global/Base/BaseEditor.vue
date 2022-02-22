<!--
 * @Author: ShiJunJie
 * @Date: 2021-07-16 11:33:53
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-10-27 15:35:34
 * @Descripttion: 
-->
<template>
  <div class="editor">
    <div id="editor"></div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs, toRaw, watch } from "vue"
import E from "wangeditor"

export default {
  name: "BaseEditor",
  props: ["value", "keys"],
  setup(props, { emit }) {
    let editor
    const { value, keys } = toRefs(props)
    onMounted(() => {
      console.log(keys.value, value.value)

      editor = new E("#editor")
      editor.config.uploadImgServer = "/upload-img"

      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        "head", // 标题
        "bold", // 加粗
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "indent", // 缩进
        "lineHeight", // 行高
        "foreColor", // 文字颜色
        "backColor", // 背景色
        "link", // 链接
        "list", // 序列
        // "todo", // 待办事项
        "justify", // 对齐
        "quote", // 引用
        // "emoticon", // 表情
        "image", // 图片
        // "video", // 视频
        "table", // 表格
        // "code", // 代码
        "splitLine", // 分割线
        "undo", // 撤销
        "redo", // 恢复
      ]

      // 配置 onchange 回调函数
      editor.config.onchange = newHtml => {
        emit("valueChange", { keys: keys.value, value: newHtml })
        console.log("change 之后最新的 html", newHtml)
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500 // 修改为 500ms

      editor.create()
      // 初始化富文本内容
      editor.txt.html(value.value)
    })
    watch(value, (nVal, Oval) => {
      console.log(nVal, Oval)
      // editor.txt.html(value.value)
    })
    return {}
  },
}
</script>

<style lang="less">
.w-e-toolbar .w-e-menu {
  width: 32px !important;
  height: 30px !important;
}
</style>
