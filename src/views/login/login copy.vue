<!--
 * @Author: ShiJunJie
 * @Date: 2021-09-07 15:40:54
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-09 16:29:12
 * @Descripttion: 
-->
<template>
  <div class="loginContent">
    <div class="l">
      <div class="img">
        <img src="../../assets/login/img1.png" class="img1" />
        <img src="../../assets/login/img2.png" class="img2" />
        <img src="../../assets/login/img3.png" class="img3" />
        <img src="../../assets/login/img4.png" class="img4" />
      </div>
      <div class="title">
        <p class="t">景安邮件归档 -- 授权文件生成</p>
        <p class="subt">邮里夷易 优选景安</p>
      </div>
    </div>
    <div class="r">
      <div class="tab">
        <a-button :type="loginType === 'admin' ? 'primary' : 'default'" @click="setLoginType('admin')">
          管理员登录
        </a-button>
        <a-button :type="loginType === 'employ' ? 'primary' : 'default'" @click="setLoginType('employ')">
          员工登录
        </a-button>
        <div class="or">
          <p>
            <span>OR</span>
          </p>
        </div>
      </div>
      <div class="cont">
        <a-form :model="formState" :label-col="{ style: { width: '50px' } }">
          <a-form-item name="account" :validateStatus="validateStatus === 'account' ? 'error' : ''">
            <a-input
              v-model:value="formState.account"
              :placeholder="loginType === 'admin' ? '请输入用户名' : '请输入完整邮箱账户'"
            >
              <template #prefix>
                <span class="label" :style="[loginType === 'admin' ? 'width:50px' : 'width:70px']">
                  {{ loginType === 'admin' ? '用户名' : '邮箱账户' }}
                </span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" :validateStatus="validateStatus === 'password' ? 'error' : ''">
            <a-input-password
              v-model:value="formState.password"
              :placeholder="loginType === 'admin' ? '请输入密码' : '请输入客户端授权密码'"
            >
              <template #prefix>
                <span class="label" :style="[loginType === 'admin' ? 'width:50px' : 'width:70px']">
                  {{ loginType === 'admin' ? '密码' : '授权密码' }}
                </span>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <div class="types">
              <span>
                <!-- <a-checkbox v-model:checked="formState.login">自动登录</a-checkbox> -->
              </span>
              <span class="wj" @click="$router.push('/login/forgotpassword')">忘记密码?</span>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="slidingView">
        <SlidingVerify class="sliding" ref="sliding" @onCallback="setVerifyToken" />
        <a-button type="primary" block size="large" @click="login" :loading="buttonLoding">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import storage from 'good-storage'
import { ref, toRaw, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { USER } from '../../api/user'

import { message } from 'ant-design-vue'
import { toArray } from 'lodash-es'

let sliding = $ref(null)

const route = useRoute()
const router = useRouter()

let formState = $ref({ account: '', password: '', verifyToken: '', autoLogin: false })

let loginType = $ref('admin')
const setLoginType = (e) => {
  loginType = e
  formState.verifyToken = ''
}

if (storage.get('USER_TOKEN')) {
  router.push('/')
}

let validateStatus = $ref('')

let buttonLoding = $ref(false)
const onSubmit = async () => {
  buttonLoding = true
  const res = await USER.login(toRaw(formState), loginType)
  formState.verifyToken = ''
  buttonLoding = false
  if (!res.code) {
    if (res?.data?.emailToken && loginType === 'admin') {
      router.push({
        name: '邮箱验证',
        params: { ...res.data, account: formState.account, autoLogin: formState.autoLogin },
      })
    } else {
      message.success('登录成功')
      setTimeout(() => {
        router.push(`/`)
        // location.reload()
      }, 1000)
    }
  }
}

const login = () => {
  if (formState.account === '') {
    validateStatus = 'account'
    message.error('用户名不能为空')
  } else if (formState.password === '') {
    validateStatus = 'password'
    message.error('密码不能为空')
  } else if (formState.verifyToken === '') {
    validateStatus = ''
    sliding.init(toRaw(formState))
  } else {
    onSubmit()
  }
}

const setVerifyToken = (verifyToken) => {
  formState.verifyToken = verifyToken
  onSubmit()
}
</script>

<style lang="scss" scoped>
.loginContent {
  display: flex;
  width: 1200px;
  min-width: 1200px;
  padding: 0 7px;
  margin: 0 auto;
  height: 408px;
  position: relative;
  top: calc((100vh - 408px) / 2);
  .l {
    flex-grow: 1;
    display: flex;
    align-items: center;
    .img {
      position: relative;
      img {
        position: absolute;
      }
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 300%;
        top: -100%;
        left: 0;
        z-index: 1;
      }
      .img1 {
        top: -75px;
        right: 36px;
        transform: translateY(-100%);
      }
      .img2 {
        top: -12px;
        transform: translateY(-100%);
        right: 0;
      }
      .img3 {
        position: relative;
      }
      .img4 {
        top: calc(100% + 13px);
        left: 0;
      }
    }
    .title {
      text-align: center;
      padding-right: 211px;
      width: 100%;
      .t {
        font-size: 36px;
        color: $font-1;
      }
      .subt {
        font-size: 20px;
        color: #aebbc9;
      }
    }
  }
  .r {
    width: 400px;
    background: #fff;
    height: 100%;
    padding: 64px 35px 62px;

    .slidingView {
      position: relative;
      .sliding {
        position: absolute;
        height: 40px;
        display: flex;
        align-items: center;
        background: #fff;
        z-index: 1;
      }
    }
    .tab {
      .ant-btn {
        width: calc(50% - 15px);
        height: 36px;
        &:first-child {
          margin-right: 30px;
        }
      }
      .or {
        text-align: center;
        color: #b3bfcc;
        font-size: 14px;
        margin: 15px 0;
        span {
          display: inline-block;
          vertical-align: middle;
          &::before,
          &::after {
            display: inline-block;
            vertical-align: middle;
            content: '';
            margin: 0 5px;
            width: 12px;
            height: 1px;
            background: #b3bfcc;
          }
        }
      }
    }
    .cont :deep(*) {
      .ant-input-affix-wrapper {
        border-top: 0;
        border-left: 0;
        border-right: 0;
      }
      .ant-input-affix-wrapper-focused {
        box-shadow: 0 2px 0 0 rgb(24 144 255 / 20%);
        border-top: 0;
        border-left: 0;
        border-right: 0;
      }
      .ant-form-item-has-error .ant-input-affix-wrapper-focused {
        box-shadow: 0 2px 0 0 rgb(255 77 79 / 20%);
      }
      .ant-form-item {
        margin-bottom: 18px;
        // border-bottom: 1px solid #e2e5e9;
        &:last-child {
          border: 0;
        }
      }
      .label {
        width: 50px;
        font-size: 14px;
        color: #333;
        &::after {
          content: ':';
          padding-left: 3px;
        }
      }
    }
  }
}
.types {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wj {
    cursor: pointer;
    color: #aaa;
  }
}
</style>
