<!--
 * @Author: ShiJunJie
 * @Date: 2021-12-17 14:28:15
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-17 14:39:33
 * @Descripttion: 收件人 发件人组件
-->
<template>
  <div class="base-email-input">
    <a-auto-complete v-model:value="value" :options="options" :placeholder="placeholder" @search="handleSearch">
      <template #option="{ value: val }">
        {{ val.split('@')[0] }} @
        <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
      </template>
    </a-auto-complete>
    {{ value }}
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入',
  },
})

let value = $ref('')
let options = $ref([])

const handleSearch = val => {
  let res

  if (!val || val.indexOf('@') >= 0) {
    res = []
  } else {
    res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
      value: `${val}@${domain}`,
    }))
  }

  options.value = res
}
</script>

<style lang="less" scoped>
.base-email-input {
  width: 100%;
}
</style>
