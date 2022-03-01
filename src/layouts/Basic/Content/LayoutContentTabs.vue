<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-27 14:44:11
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-22 16:10:58
 * @Descripttion: 头部选项卡
-->
<template>
  <!--  e.id === BaseMenuData.state.selectedKeys[0] &&  -->
  <div class="baseTabs" ref="baseTabs">
    <a-space>
      <div class="tabsView" ref="tabsView">
        <template v-for="(e, i) in BaseTabsDataSource" :key="i">
          <BaseTabsBtn
            class="tabs"
            :class="[{ on: route.path === e.path }]"
            @click="click(e, i)"
            @inClose="close(e, i)"
            :close="e.close"
            :label="e.title || e.name"
          />
        </template>
      </div>
      <div class="tabsMore" v-if="BaseTabsDataSourceOut.length > 0">
        <a-popover placement="bottomLeft">
          <!-- <template #title>
            <div>关闭所有</div>
          </template> -->
          <template #content>
            <div
              class="popoverCard"
              :class="[{ on: route.path === e.path }]"
              v-for="(e, i) in BaseTabsDataSourceOut"
              :key="i"
              @click.stop="click(e, i)"
            >
              <span>{{ e.title || e.name }}</span>
              <SvgIcon name="icon-guanbijiantou" @click.stop="close(e, i), --offsetNum" />
            </div>
          </template>
          <SvgIcon class="icon" name="icon-bofang" />
        </a-popover>
      </div>
    </a-space>
  </div>
</template>

<script setup>
import { inject, toRaw, computed, onUpdated, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const BaseTabsDataSource = computed(() => Object.values(inject('BaseTabsData').data.value))
const BaseTabsData = inject('BaseTabsData')
const LayoutTabsClick = inject('LayoutTabsClick')

let baseTabs = $ref(null)
let tabsView = $ref(null)
let offsetNum = $ref(0)

const BaseTabsDataSourceOut = computed(() => {
  const data = Object.values(inject('BaseTabsData').data.value)
  if (offsetNum) {
    return data.slice(offsetNum * -1)
  } else {
    return []
  }
})

import { _debounce } from '../../../utils/util'

const setOffsetNum = () => {
  offsetNum = 0
  if (tabsView) {
    const tabsDom = tabsView.getElementsByClassName('base-tabs-btn')
    for (const e of tabsDom) {
      e.offsetTop !== tabsDom[0].offsetTop ? ++offsetNum : ''
    }
  }
  // console.log(offsetNum)
}

const setOffsetNum_debounce = _debounce(setOffsetNum, 300)
const BaseMenuData = inject('BaseMenuData')
watch([() => BaseTabsData, () => BaseMenuData], () => setOffsetNum_debounce(), { deep: true })
onMounted(() => {
  // console.log('onMounted')
  setOffsetNum()
  window.addEventListener('resize', () => {
    setOffsetNum_debounce()
  })
})
const click = (e, i) => {
  LayoutTabsClick(e, i)
  e.path ? router.push(e.path) : ''
}
const close = (e, i) => {
  BaseTabsData.del(e, i)
}
</script>

<style lang="scss" scoped>
.baseTabs {
  margin-bottom: 15px;
  display: flex;
  .tabsView {
    height: 32px;
    overflow: hidden;
  }
  .tabsMore {
    height: 32px;
    width: 32px;
    .icon {
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      border-radius: 4px;
      display: inline-block;
      background: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .ant-popover-inner-content {
    padding: 10px;
  }
  :deep(.ant-popover-inner-content) {
    padding: 10px;
  }
}
.popoverCard {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  &.on {
    color: #4d7cfe;
  }
  > :first-child {
    flex: 1;
  }
}
// popover 样式重新
:deep(.ant-popover-inner) {
  background: #fff;
  box-shadow: 0px 2px 5px #ccc;
  border-radius: 4px;
}
:deep(.ant-popover-inner-content) {
  padding: 20px 18px;
  background: rgba(204, 204, 204, 0.1);
}
</style>
