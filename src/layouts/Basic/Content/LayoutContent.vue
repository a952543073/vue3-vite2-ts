<!--
 * @Author: ShiJunJie
 * @Date: 2020-12-04 17:30:22
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 14:39:43
 * @Descripttion: 
-->
<template>
  <a-layout-content>
    <div class="header">
      <LayoutContentTabs />
      <LayoutContentBreadcrumb />
    </div>
    <div class="main">
      <!-- <template v-if="$route.meta.keepAlive">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
      <router-view v-else></router-view> -->
      <router-view></router-view>
    </div>
  </a-layout-content>
</template>

<script setup>
import LayoutContentTabs from './LayoutContentTabs.vue'
import LayoutContentBreadcrumb from './LayoutContentBreadcrumb.vue'
</script>

<style lang="less" scoped>
.ant-layout-content {
  min-height: calc(100vh - 70px);
  max-height: calc(100vh - 70px);
  .header {
    top: 0;
    padding: 15px 17px 0;
    // height: 100px;
    background: #f0f2f5;
  }
  .main {
    padding: 0 15px;
    margin-bottom: 15px;
    height: calc(100% - 100px);
    overflow: auto;
    position: relative;
    > :deep(div) {
      height: 100%;
    }
    :deep(section) {
      padding: 16px 15px 18px;
    }
  }
}
</style>
