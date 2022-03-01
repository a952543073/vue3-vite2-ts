<!--
 * @Author: ShiJunJie
 * @Date: 2020-12-04 14:32:21
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 10:30:14
 * @Descripttion: svg图标  <SvgIcon name="(svgurl||iconfont)" />
-->
<template>
  <div class="anticon svg-icon" v-if="iconHref">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconHref" />
    </svg>
  </div>
</template>
<!-- <MyIcon class="svg-icon" :type="iconfont" /> -->

<script setup>
import { computed } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const MyIcon = createFromIconfontCN({
  //   //at.alicdn.com/t/font_2874356_hburnxc94qo.js
  scriptUrl: import.meta.env.VITE_ICONFONT, // 在 iconfont.cn 上生成
})

const props = defineProps({
  name: {
    type: String,
  },
})

const iconHref = computed(() => {
  if (props.name && props.name.indexOf('icon') > -1) {
    return `#${props.name}`
  } else if (props.name) {
    return `#svg-${props.name}`
  } else {
    return ''
  }
})
// console.log(iconHref.value)
</script>

<style lang="scss" scoped>
// .svg-icon > span {
//   display: inline-block;
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
// }
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 1em;
  height: 1em;
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
:deep(svg) {
  width: 1.2em;
  height: 1.2em;
  line-height: 35px;
  display: inline-block;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
