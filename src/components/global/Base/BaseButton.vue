<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-11 13:46:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-11-17 11:41:58
 * @Descripttion: 
-->
<template>
  <button class="base-button" :class="class_">
    <p class="cont">
      <span class="font"><SvgIcon v-if="icon" :name="icon" />{{ label }}</span>
      <SvgIcon v-if="isClose" name="icon-guanbijiantou" @click.stop="onClose" />
    </p>
  </button>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  icon: String,
  label: {
    type: String,
    default: "按钮: label",
  },
  type: {
    type: String,
    // default  primary
    default: "default",
  },
  radius: {
    type: Boolean,
    default: false,
  },
  check: {
    type: Boolean,
    default: false,
  },
  isClose: {
    type: Boolean,
    default: false,
  },
})

const class_ = computed(() => {
  return [props.type, props.radius ? "radius" : "", props.check ? "on" : ""]
})

const emit = defineEmits(["onClose"])

const onClose = e => {
  emit("onClose")
}
</script>

<style lang="less" scoped>
.base-button {
  display: inline-block;
  box-sizing: border-box;
  min-width: 80px;
  height: 32px;
  font-size: 14px;
  background: #fafafa;
  color: #7b8ba1;
  border: 1px solid #7b8ba1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  .cont {
    display: flex;
    align-items: center;
    height: 100%;
    .font {
      flex-grow: 1;
      .anticon {
        margin-right: 5px;
        font-size: inherit;
      }
    }
    .anticon {
      height: 100%;
      font-size: 12px;
      padding-right: 8px;
    }
  }
  &:hover,
  &:focus,
  &.on {
    background: #f2f3f5;
  }
  &.radius {
    min-width: 86px;
    height: 26px;
    border: 0px;
    font-size: 12px;
    border-radius: 26px;
    .font {
      padding: 0 13px;
    }
  }
  &.primary {
    color: #fff;
    background: #4d7cfe;
    border-color: #4d7cfe;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    &:hover,
    &:focus,
    &.on {
      background: #325cfd;
      border-color: #325cfd;
    }
  }
  &.purple {
    color: #9f9ef7;
    background: #efeffb;
    border-color: #efeffb;
    &:hover,
    &:focus,
    &.on {
      color: #fff;
      background: #9f9ef7;
      border-color: #9f9ef7;
    }
  }
  &.green {
    color: #4ac48e;
    background: #e5f3ee;
    border-color: #e5f3ee;
    &:hover,
    &:focus,
    &.on {
      color: #fff;
      background: #4ac48e;
      border-color: #4ac48e;
    }
  }
  &.blue {
    color: #3b77fc;
    background: #eff3ff;
    border-color: #eff3ff;
    &:hover,
    &:focus,
    &.on {
      color: #fff;
      background: #3b77fc;
      border-color: #3b77fc;
    }
  }
}
</style>
