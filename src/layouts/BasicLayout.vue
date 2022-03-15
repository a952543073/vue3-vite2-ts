<!--
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 12:15:49
 * @Descripttion: 后台管理布局
-->
<template>
  <a-layout id="basicLayout">
    <LayoutHeader />
    <a-layout>
      <LayoutMenu />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>
<script setup>
import LayoutMenu from "./Basic/Menu/LayoutMenu.vue";
import LayoutHeader from "./Basic/Header/LayoutHeader.vue";
import LayoutContent from "./Basic/Content/LayoutContent.vue";

import { reactive, provide, readonly, onMounted, watch, computed, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { _throttle } from "/@/utils/util";

import storage from "good-storage";

const router = useRouter();

const userTokens = storage.get("USER_TOKEN");
const getMenuDataAdmin = () => {
  let newMenu = [
    { id: 0, name: "工作台", close: false, path: "/admin/home", icon: "icon-layers-o" },
  ];
  storage.get("USER_ROUTERS")
    ? storage.get("USER_ROUTERS").forEach((e) => {
        if (e.name !== "功能模块") {
          newMenu.push({
            ...e,
            children: e.children.map((el) => ({ ...el, children: [] })),
          });
        }
      })
    : "";
  console.log(newMenu);
  return newMenu;
};

const MenuDataAdmin = reactive(getMenuDataAdmin());

// 导航菜单数据
const MenuData =
  userTokens && userTokens?.type !== "admin"
    ? reactive([
        {
          id: 0,
          name: "归档邮件查询",
          close: false,
          path: "/employ/home",
          icon: "icon-layers-o",
        },
        {
          id: 1,
          name: "邮件恢复队列",
          close: false,
          path: "/employ/list",
          icon: "icon-layers-o",
        },
      ])
    : MenuDataAdmin;
/*||
      reactive([
        { id: 0, name: '工作台', close: false, path: '/admin/home', icon: 'icon-layers-o' },
        {
          id: 1,
          name: '企业配置',
          icon: 'icon-dashboard-o',
          path: '/admin',
          children: [
            { id: 12, name: '归档配置', path: '/enterprise/email/archive' },
            { id: 13, name: '账户管理', path: '/enterprise/user/page' },
            { id: 14, name: '角色管理', path: '/enterprise/role/page' },
            { id: 15, name: '员工管理', path: '/enterprise/email/unit' },
            { id: 16, name: '发信配置', path: '/enterprise/email/letter' },
            { id: 17, name: '报警配置', path: '/enterprise/email/alarm' },
            {
              id: 18,
              name: '验证配置',
              path: '/enterprise/email/verify',
              children: [
                { id: 12, name: '归档配置', path: '/enterprise/email/archive' },
                { id: 13, name: '账户管理', path: '/enterprise/user/page' },
                { id: 14, name: '角色管理', path: '/enterprise/role/page' },
                { id: 15, name: '员工管理', path: '/enterprise/email/unit' },
                { id: 16, name: '发信配置', path: '/enterprise/email/letter' },
                { id: 17, name: '报警配置', path: '/enterprise/email/alarm' },
                { id: 18, name: '验证配置', path: '/enterprise/email/verify' },
              ],
            },
          ],
        },
        {
          id: 2,
          name: '邮件搜索',
          icon: 'icon-LOV-o',
          children: [{ id: 21, name: '邮件搜索', path: '/search' }],
        },
        {
          id: 3,
          name: '邮件审计',
          icon: 'icon-SQLcheck-o',
          children: [
            { id: 31, name: '审计管理', path: '/audit/page' },
            { id: 32, name: '申请审批', path: '/audit/approve' },
          ],
        },
        {
          id: 4,
          name: '辅助工具',
          icon: 'icon-view_list-o',
          children: [
            { id: 41, name: '标签管理', path: '/tool/archive' },
            { id: 42, name: '归档备份', path: '/tool/label' },
          ],
        },
        {
          id: 5,
          name: '日志管理',
          icon: 'icon-description-o',
          children: [
            { id: 51, name: '搜索日志', path: '/log/search' },
            { id: 52, name: '审计任务日志', path: '/log/auditTask' },
            { id: 53, name: '审计邮件日志', path: '/log/auditMail' },
            { id: 54, name: '登录日志', path: '/log/login' },
            { id: 55, name: '查看日志', path: '/log/browse' },
            { id: 56, name: '归档日志', path: '/log/archive' },
            { id: 57, name: '备份日志', path: '/log/backup' },
            { id: 58, name: '同步日志', path: '/log/synchronous' },
          ],
        },
        { id: 6, name: '关于系统', icon: 'icon-error_outline', children: [{ id: 61, name: '关于系统', path: '/about' }] },
      ])*/

const defaultMenuTabsData = {
  tabs:
    userTokens.type !== "admin"
      ? {
          归档邮件查询: {
            id: 0,
            title: "归档邮件查询",
            path: "/employ/home",
            close: false,
          },
        }
      : {
          工作台: { id: 0, title: "工作台", path: "/admin/home", close: false },
        },
  openKeys: [],
  selectedKeys: [0],
  collapsed: false,
};
// 将导航条相关数据进行缓存
const MENU_TABS_STORAGE = {
  set: (e) => {
    storage.set(
      "MENU_TABS",
      (MENU_TABS_STORAGE.get() && { ...MENU_TABS_STORAGE.get(), ...e }) ||
        defaultMenuTabsData
    );
  },
  get: () => {
    return storage.get("MENU_TABS") || defaultMenuTabsData;
  },
};

// 获取并设置导航条导航菜单的初始信息
const menuTabsStorage = MENU_TABS_STORAGE.get();
if (!menuTabsStorage) {
  MENU_TABS_STORAGE.set();
}

// 菜单属性
const MenuState = reactive({
  openKeys: menuTabsStorage.openKeys, // 初始展开
  selectedKeys: menuTabsStorage.selectedKeys, // 初始选中
  collapsed: menuTabsStorage.collapsed,
  // rootSubmenuKeys: [],
});
// 菜单整体
const BaseMenuData = {
  data: readonly(MenuData),
  state: MenuState,
  set: (e) => {
    MenuData.value = e;
  },
};
provide("BaseMenuData", BaseMenuData);

let MenuClickType = $ref(false);
const MenuSetCollapsed = () => {
  MenuClickType = true;
  MenuState.collapsed = !MenuState.collapsed;
  MENU_TABS_STORAGE.set({ collapsed: MenuState.collapsed });
};

onMounted(() => {
  window.addEventListener(
    "resize",
    _throttle(() => {
      if (MenuClickType === false && window.innerWidth < 1366) {
        MenuState.collapsed = true;
        MENU_TABS_STORAGE.set({ collapsed: MenuState.collapsed });
      } else if (MenuClickType === false && window.innerWidth > 1366) {
        MenuState.collapsed = false;
        MENU_TABS_STORAGE.set({ collapsed: MenuState.collapsed });
      }
    })
  );
});

provide("MenuSetCollapsed", MenuSetCollapsed);

// 头部选项卡
const TabsData = reactive({ value: menuTabsStorage.tabs });
const BaseTabsData = {
  data: readonly(TabsData),
  set: (e) => {
    TabsData.value = menuTabsStorage.tabs;
  },
  add: (e) => {
    TabsData.value[e.title || e.name] = e;
    const TabsDataVal = toRaw(TabsData.value);
    MENU_TABS_STORAGE.set({ tabs: TabsDataVal });
    // console.log(TabsDataVal)
  },
  del: (e) => {
    if ((e.title || e.name) !== "工作台") {
      console.log(e.id);
      if (MENU_TABS_STORAGE.get().selectedKeys[0] === e.id) {
        router.push(defaultMenuTabsData.tabs.工作台.path);
      }
      MenuState.selectedKeys = defaultMenuTabsData.selectedKeys;
      delete TabsData.value[e.title || e.name];
      MENU_TABS_STORAGE.set({ tabs: TabsData.value });
    }
  },
};
provide("BaseTabsData", BaseTabsData);

// 含有子集的菜单点击
const MenuClick = (arr) => {
  // console.log(arr)
  MENU_TABS_STORAGE.set({ openKeys: arr });
};
provide("MenuClick", MenuClick);
// 末尾菜单点击
const MenuItemClick = (e) => {
  e.path && router.push(e.path);
  console.log(e);
  BaseTabsData.add(e);
  MENU_TABS_STORAGE.set({ selectedKeys: [e.id] });
};
provide("MenuItemClick", MenuItemClick);

// 头部导航条点击
const LayoutTabsClick = (e) => {
  MENU_TABS_STORAGE.set({ selectedKeys: [e.id] });
  MenuState.selectedKeys = [e.id];
};
provide("LayoutTabsClick", LayoutTabsClick);
</script>

<style lang="scss" scoped></style>
