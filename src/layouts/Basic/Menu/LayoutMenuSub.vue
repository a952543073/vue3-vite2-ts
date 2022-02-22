<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-22 18:15:38
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-10-28 17:37:50
 * @Descripttion: 
-->
<template>
  <a-sub-menu :key="MenuInfo.id">
    <template #title>
      <span>
        <SvgIcon :name="MenuInfo.icon || ''" v-if="MenuInfo.icon" />
        <span>{{ MenuInfo.name }}</span>
      </span>
    </template>
    <template v-for="(item, i) in MenuInfo.children" :key="item.id">
      <template v-if="!(item.children && item.children.length > 0)">
        <a-menu-item :key="item.id" @click="MenuItemClick(item)">
          <SvgIcon :name="item.icon || ''" v-if="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <LayoutMenuSub :MenuInfo="item" :key="item.id" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: "LayoutMenuSub",
  inject: ["BaseTabsData", "MenuItemClick"],
  props: {
    MenuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
