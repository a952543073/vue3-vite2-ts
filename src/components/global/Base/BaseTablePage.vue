<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-02 14:18:52
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-13 15:13:05
 * @Descripttion: 
-->
<template>
  <div class="tablePage">
    <a-pagination
      :current="current"
      :total="total"
      show-quick-jumper
      :pageSize="pageSize"
      :show-total="(total) => `共 ${total} 条`"
      :showSizeChanger="true"
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    ></a-pagination>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  total: Number,
  current: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['page'])
let pageChangeType = $ref(false)

const onChange = (page, pageSize) => {
  if (pageChangeType) {
    pageChangeType = false
    return false
  }
  // console.log("页码改变: ", { page, pageSize })
  emit('page', page, pageSize)
}
const onShowSizeChange = (page, pageSize) => {
  // console.log("页条数改变: ", { page, pageSize })
  pageChangeType = true
  emit('page', 1, pageSize)
}
</script>

<style lang="scss" scoped>
.tablePage {
  padding: 18px 0 5px 0;
  display: flex;
  &::before {
    content: '';
    flex-grow: 1;
  }
}
</style>
