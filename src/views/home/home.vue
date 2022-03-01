<!--
 * @Author: ShiJunJie
 * @Date: 2022-02-09 16:27:05
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 11:36:07
 * @Descripttion: 
-->

<template>
  <div>
    <!-- <Button /> -->

    {{ t('hello') }}, {{ $t('about') }}! {{ $t('demotxt') }}
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

import Button from './Button'
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
