<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 15:40:54
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-21 15:42:36
 * @Descripttion: 
-->
<template>
  <div class="loginView">
    <header>
      <div class="logo">
        <SvgIcon name="logo" style="font-size: 200px; height: 78px" />
      </div>
    </header>

    <router-view></router-view>

    <footer>
      <p>copyright©2021 北京东方网景网络技术有限公司</p>
    </footer>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.loginView {
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  min-height: 500px;
  overflow: hidden;
  background: url('/@/assets/login/bg.png') center;
  position: relative;
  .logo {
    position: absolute;
    left: 39px;
    top: 20px;
    // background: url('/@/assets/logo.png') no-repeat center;
  }
  footer {
    position: absolute;
    bottom: 18px;
    color: #aebbc9;
    width: 100%;
    text-align: center;
  }
}
</style>
