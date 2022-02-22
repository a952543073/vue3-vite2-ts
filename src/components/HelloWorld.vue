<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-03 16:45:54
 * @Descripttion: 单文件组件示例 
 * 参考 https://v3.cn.vuejs.org/api/sfc-script-setup.html
-->
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { useSlots, useAttrs } from 'vue'

const props = defineProps({
  msg: String,
})
const emit = defineEmits([])
const slots = useSlots()
const attrs = useAttrs()

// console.log('props', props)
// console.log('emit', emit)
// console.log('slots', slots)
// console.log('attrs', attrs)

let count = $ref(0)

defineExpose({})
</script>
