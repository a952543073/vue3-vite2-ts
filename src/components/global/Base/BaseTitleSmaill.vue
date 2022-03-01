<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-29 13:57:49
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-11-12 14:20:46
 * @Descripttion: 
-->
<template>
  <div class="title">
    <div class="cont">
      <div>
        <span class="i" :class="icontype"><SvgIcon v-if="icon" :name="icon" /></span>
        <span class="v" :class="icontype">{{ label }}</span>
      </div>
      <div><slot></slot></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    style: String,
    default: '这里是标题对应字段 : label',
    required: true,
  },
  icon: String,
  icontype: {
    srtle: String,
    default: 'dark', // 'light'
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  width: 100%;
  color: #13121d;
  display: inline-block;
  line-height: 100%;
  .cont {
    width: 100%;
    display: flex;
    align-items: center;

    > :first-child {
      flex-grow: 1;
    }

    .i {
      display: inline-block;
      position: relative;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      .svg-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: inline-block;
        font-size: 12px;
        position: relative;
        z-index: 1;
      }
      &.dark {
        color: #fff;
        .svg-icon {
          background: $primary-2;
        }
        &::before {
          content: '';
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: $primary-3;
          z-index: 0;
          border-radius: 50%;
          position: absolute;
        }
      }
      &.light {
        background: #fff;
        .svg-icon {
          color: $primary-2;
        }
      }
    }
    .v {
      margin-left: 8px;
      color: @font-2;
      &.light {
        color: #000;
      }
    }
  }
}
</style>
