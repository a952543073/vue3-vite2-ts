<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 15:53:07
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-21 14:54:34
 * @Descripttion: 
-->
<template>
  <div class="error">
    <div>
      <h1>404</h1>
      <a-button @click="goBack" type="primary">返回首页</a-button>
    </div>
  </div>
</template>

<script setup>
import HelloWorld from '/@/components/HelloWorld.vue'
import Test from '/@/components/Test.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 8vmax;
    margin-bottom: 0;
  }
}
</style>
