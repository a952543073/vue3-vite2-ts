<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-28 09:44:02
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-11-29 10:52:13
 * @Descripttion: 
-->
<template>
  <div class="base-tabs-btn">
    <span class="label">{{ label }}</span>
    <SvgIcon v-if="close" @click.stop="inClose" name="icon-guanbijiantou" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { style: String, default: "label" },
  close: { style: Boolean, default: true },
  disabled: { style: Boolean, default: false },
})

const emit = defineEmits(["inClose"])

const inClose = () => {
  emit("inClose")
}
</script>

<style lang="less" scoped>
.base-tabs-btn {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #5f7490;
  background: #fff;
  border-radius: 3px;
  display: inline-block;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover,
  &.on {
    background: @primary-2;
    color: #fff;
    .svg-icon {
      color: #fff;
    }
  }
  + .base-tabs-btn {
    margin-left: 8px;
  }
  .label {
    padding: 0 15px 0 15px;
    display: inline-block;
  }
  .svg-icon {
    font-size: 12px;
    height: 100%;
    line-height: 32px;
    display: inline-block;
    vertical-align: top;
    width: 24px;
  }
}
</style>
