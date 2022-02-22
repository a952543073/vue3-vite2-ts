<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 14:49:37
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-09-07 14:51:43
 * @Descripttion: 
-->
<template>
  <div @click="count++"> 这是 Test.vue 文件 {count : {{ count }}}</div>
</template>

<script setup>
  import { ref } from 'vue'

  const count = ref(0)
</script>

<style lang="scss" scoped></style>
