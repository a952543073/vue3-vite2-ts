<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 18:28:54
 * @Descripttion: 入口APP文件
-->
<template>
  data: {{ data }}
  <a-config-provider :getPopupContainer="getPopupContainer" :locale="locale">
    <router-view></router-view>
  </a-config-provider>
  <!-- <Cos /> -->
</template>

<script setup>
// import Cos from './components/cos/Cos.vue'
// import { onMounted } from 'vue'
let a = $ref(0)
const data = computed(() => {
  return a + 123
})

import { provide, reactive, readonly, toRaw } from 'vue'
import { message } from 'ant-design-vue'

import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = zhCN

message.config({
  maxCount: 1,
})

const getPopupContainer = (el, dialogContext) => {
  if (dialogContext) {
    return dialogContext.getDialogWrap()
  } else {
    return document.body
  }
}

import { _throttle } from '/@/utils/util'
onMounted(() => {
  console.log(123)
  _throttle(() => {
    console.log('节流测试')
  }, 200)
})
// 全局参数
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
