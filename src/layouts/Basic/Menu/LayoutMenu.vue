<!--
 * @Author: ShiJunJie
 * @Date: 2020-11-03 14:27:23
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 14:40:08
 * @Descripttion: 左侧导航
-->
<template>
  <a-layout-sider
    :trigger="null"
    :collapsible="true"
    :defaultCollapsed="true"
    :collapsed="state.collapsed"
    :collapsedWidth="50"
    :theme="'light'"
    :style="{ overflow: 'auto', height: 'calc(100vh - 70px)' }"
  >
    <div>
      <a-spin class="example" v-if="MenuData === []" />
      <a-menu v-else mode="inline" theme="light" v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" @openChange="MenuClick">
        <template v-for="(item, i) in MenuData" :key="item.id">
          <template v-if="!item.children || item.children.length === 0">
            <a-menu-item :key="item.id" @click="MenuItemClick(item)">
              <SvgIcon :name="item.icon || ''" v-if="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <LayoutMenuSub :MenuInfo="item" />
          </template>
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>
<script>
export default {
  inject: ['BaseTabsData', 'MenuItemClick', 'MenuClick'],
}
</script>
<script setup>
import { reactive, inject, provide } from 'vue'

import LayoutMenuSub from './LayoutMenuSub.vue'

const BaseMenuData = inject('BaseMenuData')
const MenuData = BaseMenuData.data
const state = BaseMenuData.state
</script>

<style lang="less" scoped></style>
