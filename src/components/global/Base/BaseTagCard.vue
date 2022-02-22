<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-29 17:37:35
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-11-29 18:35:19
 * @Descripttion: 标签颜色组件
-->
<template>
  <div class="cards">
    <div v-for="(e, i) in getTagColor()" :key="i" :style="{backgroundColor:e}" @click="click_(i)">
      <SvgIcon v-show="value == i" name="icon-selected" />
    </div>
  </div>
</template>

<script setup>
import { getTagColor } from '../../../utils/util'

const props = defineProps({
  value: String,
})

const emit = defineEmits(['update:value'])
const click_ = i => emit('update:value', i)
</script>

<style lang="less" scoped>
.cards {
  font-size: 0;

  > * {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    width: 23px;
    height: 23px;
    cursor: pointer;
    color: #fff;
    font-size: 23px;
    margin: 4.5px 10px 4.5px 0;
  }
  .svg-icon {
    left: -1px;
  }
}
</style>