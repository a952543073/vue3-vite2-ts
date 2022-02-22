<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-05 09:54:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-14 18:51:14
 * @Descripttion: 
-->
<template>
  <!-- 弹窗组件默认按钮 -->
  <a-button type="primary" @click="showModal" v-if="label"> <SvgIcon v-if="iconAlign" :name="icon" />{{ label }}<SvgIcon v-if="!iconAlign" :name="icon" /> </a-button>

  <!-- 弹窗体 -->
  <a-modal
    v-model:visible="visible"
    :width="size === 'small' ? 350 : width"
    :destroyOnClose="true"
    :maskStyle="{ backgroundColor: 'rgba(77, 124, 254, .15)' }"
    @cancel="handleCancel"
  >
    <!-- 头部 -->
    <template #title>
      <BaseTitle :label="title" :slabel="stitle" />
      <slot name="newTitle"></slot>
    </template>
    <!-- 底部按钮 -->
    <template #footer>
      <div class="footer" :style="[`text-align:${footerAlign}`]">
        <div v-if="footer">
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ okText }}</a-button>
          <a-button key="back" @click="handleCancel" :disabled="loading">{{ cancelText }}</a-button>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
    <!-- 内容 -->
    <div
      class="content"
      :style="[
        {
          borderTopWidth: borderTop ? '1px' : '1px',
          borderBottomWidth: borderBottom ? '1px' : '0',
        },
        size === 'small' ? smallModal : '',
      ]"
    >
      <slot></slot>
      <slot name="content"></slot>
    </div>
  </a-modal>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const smallModal = { textAlign: 'center', minHeight: '97px', padding: '35px 0 0 0' }

const props = defineProps({
  title: { type: String, default: '弹窗标题' },
  stitle: String,
  icon: { type: String, default: '' },
  iconAlign: { type: Boolean, default: true },
  borderTop: { type: Boolean, default: false },
  borderBottom: { type: Boolean, default: false },
  label: { type: String },
  width: Number,
  size: { type: String, default: 'default' }, // small
  footer: { type: Boolean, default: true },
  footerAlign: { type: String, default: 'center' },
  okText: { type: String, default: '确认' },
  cancelText: { type: String, default: '取消' },
})

let visible = $ref(false)
let loading = $ref(false)

const router = useRouter()

router.afterEach((to, from, next) => {
  hide()
})

const emit = defineEmits(['ok', 'close'])

const show = () => {
  visible = true
}

const hide = () => {
  visible = false
  loading = false
}

const handleOk = e => {
  console.log('弹窗点击确认')
  loading = true
  emit('ok', { code: true })
  setTimeout(() => {
    loading = false
  }, 6000)
}

const handleCancel = e => {
  console.log('弹窗点击关闭')
  visible = false
  emit('close', e)
}

defineExpose({ show, hide, loading: e => (loading = e) })
</script>

<style lang="less" scoped>
.content {
  border: 1px solid #edf1f2;
  border-left: 0;
  border-right: 0;
  padding: 10px 0;
  max-height: calc(100vh - 300px);
  overflow: auto;
  .footer {
    padding: 10px 16px;
  }
}
:deep(.ant-modal-footer) {
  padding: 0;
}
</style>
