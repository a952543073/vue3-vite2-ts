<!--
 * @Author: ShiJunJie
 * @Date: 2022-02-09 16:27:05
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 09:44:11
 * @Descripttion: 
-->

<template>
  <div>
    <TestTsx />
    ------------------
    <Test />
    ------------------
    <p>{{ x }}, {{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh-CN": {
    "language": "言语",
    "hello": "你好，世界！"
  }
}
</i18n>

<style scoped></style>
