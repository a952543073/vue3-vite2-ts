<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 14:49:37
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 15:24:58
 * @Descripttion: 
-->
<template>
  <div @click="count++">这是 Test.vue 文件 {count : {{ count }}}</div>

  <div>{{ $t('hello') }}, {{ $t('about') }}! {{ $t('demotxt') }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()

const count = ref(0)
</script>

<style lang="scss" scoped></style>

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
