<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 17:03:59
 * @Descripttion: 入口APP文件
-->
<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :locale="locale">
    <router-view></router-view>
  </a-config-provider>
  <!-- <Cos /> -->
</template>

<script setup>
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
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
