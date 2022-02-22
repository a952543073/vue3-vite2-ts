<!--
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 14:47:08
 * @Descripttion: 头部信息条 布局
-->
<template>
  <a-layout-header :theme="'light'" class="header">
    <div class="l">
      <div class="logo" @click="MenuSetCollapsed">
        <a-space>
          <SvgIcon name="logo" style="font-size: 200px; height: 78px" />
        </a-space>
      </div>
    </div>
    <div class="r">
      <template v-if="storage.get('USER_TOKEN').type === 'admin'">
        <a-button type="text" @click="message.info('使用流程')"> <SvgIcon name="icon-ziliucheng" />使用流程 </a-button>
        <a-button type="text" @click="router.push('/account/password')"> <SvgIcon name="icon-set" />账户设置 </a-button>
      </template>
      <a-button type="text" @click="goBack(0)"> <SvgIcon name="icon-guanbijiantou" />退出登录 </a-button>
    </div>
  </a-layout-header>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { message } from 'ant-design-vue'

import { USER } from '/@/api/user'

const MenuSetCollapsed = inject('MenuSetCollapsed')

const router = useRouter()
const newRoute = storage.get('USER_ROUTERS')

const goBack = async url => {
  if (!url) {
    const res = await USER.loginOut()
    if (!res.code) {
      storage.clear()
      message.success('退出登录成功')
      setTimeout(() => {
        window.location.reload()
      }, 500)
      // router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  .l {
    flex-grow: 1;
    display: flex;
    .logo {
      padding-left: 25px;
      cursor: pointer;
    }
    .title {
      color: @primary-1;
      font-size: 18px;
      padding-top: 12px;
      margin-left: 8px;
      > span::before {
        content: '';
        padding-right: 8px;
        border-left: 1px solid @primary-1;
      }
    }
  }
  .r {
    padding-top: 20px;
    padding-right: 40px;
    .ant-btn {
      padding: 4px 9px;
      .anticon {
        color: #3b77fc;
      }
    }
  }
}
</style>
