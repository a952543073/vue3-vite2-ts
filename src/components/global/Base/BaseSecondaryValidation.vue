<!--
 * @Author: ShiJunJie
 * @Date: 2021-12-14 16:22:35
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-15 10:57:45
 * @Descripttion: 二次验证
-->
<template>
  <div>
    <section class="emailContent">
      <div class="cont">
        <a-row :gutter="[0, 20]">
          <a-col :span="24">
            <div class="title">请进行二次验证</div>
          </a-col>
          <a-col :span="24">
            <a-input :value="formState.email" disabled>
              <template #suffix>
                <a-button type="default" @click="getCode" :disabled="enterButtonTime !== 60" :loading="loading">
                  {{ enterButtonTime !== 60 ? `${enterButtonTime}秒后重试` : enterButtonLabel }}
                </a-button>
              </template>
            </a-input>
          </a-col>
          <a-col :span="24">
            <a-input v-model:value="resData.code"></a-input>
          </a-col>
          <a-col :span="24" class="button">
            <a-button type="primary" block size="large" @click="submitData" :loading="primaryLoading">确认</a-button>
          </a-col>
        </a-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { toRaw } from 'vue'
import storage from 'good-storage'

const props = defineProps(['email', 'token'])
const emit = defineEmits('ok')

let formState = $ref({ email: props.email || null, token: props.token || null })
let resData = $ref({ code: null, emailToken: storage.get('SV_TOKEN') || null })

let enterButtonLabel = $ref('获取验证码')
let enterButtonTime = $ref(60)
let loading = $ref(false)

import { SYS } from '../../../api/sys.js'
import { message } from 'ant-design-vue'

let interval = null
const getCode = async () => {
  loading = true
  const res = await SYS.sendEmail(formState.token)
  if (!res.code) {
    message.success('发送成功')
    resData.emailToken = res.data.emailToken
    storage.set('SV_TOKEN', resData.emailToken)
    --enterButtonTime
    interval = setInterval(() => {
      --enterButtonTime
      if (!enterButtonTime) {
        enterButtonTime = 60
        interval && clearInterval(interval)
      }
    }, 1000)
  } else {
  }
  loading = false
}

let primaryLoading = $ref(false)
const submitData = async () => {
  primaryLoading = true
  console.log(toRaw(resData))
  const res = await SYS.postEmailCode(toRaw(resData))
  if (!res.code) {
    emit('ok', res.data.verifyToken)
  }
  primaryLoading = false
}
</script>

<style lang="scss" scoped>
.emailContent {
  width: 430px;
  min-width: 430px;
  padding: 25px 30px;
  margin: 0 auto;
  position: relative;
  .cont {
    width: 100%;
    .title {
      text-align: center;
      font-size: 20px;
    }
    .button {
      padding-top: 15px;
    }
  }
}
</style>
