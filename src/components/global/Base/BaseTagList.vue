<!--
 * @Author: ShiJunJie
 * @Date: 2021-12-15 16:46:06
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:59:55
 * @Descripttion: 公共标签展示组件
-->
<template>
  <div class="tagList">
    <!-- {{ tagsData }} -->
    <div
      class="tagCard"
      v-for="(e, i) in tagArray"
      :key="i"
      :style="{ color: e.color }"
      :class="[checkList.indexOf(e.id) !== -1 ? 'on' : '']"
      @click="tagChcek(e)"
    >
      <span>{{ e.label }}</span>
      <SvgIcon v-show="checkList.indexOf(e.id) !== -1" :name="`icon-gou`" />
    </div>
    <SvgIcon v-if="showAdd" class="addIcon" name="icon-control_point" @click="() => emit('addClick')" />
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'

const props = defineProps({
  tagsData: { type: Array, default: () => [] },
  showAdd: { type: Boolean, default: false },
  checkList: { type: Array, default: () => [] },
})
const emit = defineEmits(['addClick', 'update:checkList'])

import { getTagColor } from '/@/utils/util'

//TODO: 此处可能会有灵异问题 值会变动但是 不追响应式
let tagArray = computed(() => {
  return props.tagsData.map((e) => ({ ...e, color: getTagColor(e.colorType), check: e.check ?? false }))
})

let tagList = $ref([])
watch(
  () => props.checkList,
  (a) => {
    tagList = a
  }
)
const tagChcek = (e) => {
  e.check = !e.check
  e.check ? tagList.push(e.id) : tagList.splice(tagList.indexOf(e.id), 1)
  console.log(e)
  emit('update:checkList', tagList)
}
</script>

<style lang="scss" scoped>
:deep(*) {
  transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
  animation: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
  -moz-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
  -o-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
}
.tagList {
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  > * {
    display: inline-flex;
    align-items: center;
  }
  .addIcon {
    font-size: 22px;
    color: #3f7cf9;
    cursor: pointer;
  }
  .tagCard {
    padding: 2px 8px;
    min-width: 80px;
    justify-content: space-between;
    border: 1px dashed;
    border-radius: 3px;
    opacity: 0.8;
    cursor: pointer;
    gap: 8px;
    &.on {
      opacity: 1;
      border-style: solid;
    }
    .svg-icon {
      font-size: 10px;
    }
  }
}
</style>
