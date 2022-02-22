<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-29 13:57:49
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-07 14:39:05
 * @Descripttion: 
-->
<template>
  <div class="title">
    <a-row class="cont" :gutter="[0, 12]" justify="space-between" type="flex" align="top">
      <a-col flex="auto">
        <span v-if="label">{{ label }}</span>
        <span v-if="slabel" class="stitle">{{ slabel }}</span>
        <slot name="left"></slot>
      </a-col>
      <a-col>
        <slot></slot>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  slabel: String,
})
</script>
<style lang="less" scoped>
.title {
  font-size: 16px;
  color: #13121d;
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 500;
  line-height: 100%;
  .cont {
    height: 100%;
    flex-grow: 1;
    .stitle {
      font-size: 12px;
      vertical-align: middle;
      margin-left: 5px;
      color: #5f7490;
      background: #ffffff;
    }
  }
}
</style>
