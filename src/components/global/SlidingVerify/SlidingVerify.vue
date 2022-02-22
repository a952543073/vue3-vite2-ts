<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-12 14:44:38
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 17:38:11
 * @Descripttion: 
-->
<!--
 * @Author: ShiJunJie
 * @Date: 2021-08-09 09:52:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-09-29 16:33:02
 * @Descripttion: 
-->
<template>
  <transition name="slide-fade">
    <div
      :style="{
        width: `${resData.background.x}px`,
      }"
      v-if="resData"
      v-show="showType"
      @mouseleave="hover = false"
    >
      <div class="tips" :class="{ inHover: hover || down }" :data-placeholder="placeholder || '向右拖动滑块填充拼图'" @mouseenter="hover = true">
        <div
          class="imgs"
          :style="{
            width: `${resData.background.x}px`,
            height: `${resData.background.y}px`,
          }"
        >
          <div class="reload" @click.stop="init">
            <svg t="1628665464058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2006">
              <path
                d="M55.935033 264.48948c0 0 85.897017-132.548409 221.81443-203.673173 135.916406-71.121743 303.368504-50.646859 413.187968 18.319527 109.819465 68.970415 146.791894 127.160016 146.791894 127.160016l94.59499-53.879895c0 0 19.576483-9.697092 19.576483 12.932142l0 338.379961c0 0 0 30.17399-22.837719 19.395191-19.210878-9.062571-226.959086-127.198289-292.424528-164.466828-35.950145-16.035251-4.365101-29.062068-4.365101-29.062068l91.284402-52.173738c0 0-52.068992-65.209619-128.278989-99.744682-81.576231-42.501826-157.948384-47.541735-251.497925-12.224097-61.002644 23.025054-132.823368 81.988166-184.553949 169.082716L55.935033 264.48948 55.935033 264.48948 55.935033 264.48948zM904.056909 711.697844c0 0-85.897017 132.550423-221.816444 203.671159-135.917413 71.12275-303.366489 50.651895-413.186961-18.315498-109.825508-68.972429-146.790886-127.165052-146.790886-127.165052L27.662591 823.768348c0 0-19.572454 9.703135-19.572454-12.932142L8.090137 472.459267c0 0 0-30.170968 22.831676-19.397205 19.211885 9.067607 226.965129 127.198289 292.430571 164.470856 35.950145 16.035251 4.366109 29.058039 4.366109 29.058039l-91.285409 52.175753c0 0 52.071006 65.206598 128.279996 99.744682 81.57321 42.498804 157.942341 47.540728 251.496918 12.222082 60.998616-23.026061 132.820346-81.983131 184.546898-169.082716L904.056909 711.697844 904.056909 711.697844 904.056909 711.697844zM904.056909 711.697844"
                p-id="2007"
              />
            </svg>
          </div>
          <div
            style="position: absolute; background-size: 100% 100%"
            :style="{
              width: `${resData.background.x}px`,
              height: `${resData.background.y}px`,
              background: `url(${resData.background.url})`,
            }"
          ></div>
          <div
            :style="{
              zIndex: '2',
              position: 'absolute',
              backgroundSize: '100% 100%',
              left: `${x}px`,
              width: `${resData.slide.x}px`,
              height: `${resData.slide.y}px`,
              background: `url(${resData.slide.url})`,
            }"
          ></div>
        </div>

        <div class="trail" :class="dragType" :style="{ width: `${x + 10}px` }"></div>
        <div
          class="drag"
          :class="dragType"
          :style="{
            left: `${x}px`,
          }"
          @mousedown="mousedown"
          @mousemove="mousemove"
        >
          <svg v-if="dragType === 'ok'" t="1628668520732" class="icon" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2804">
            <path
              d="M512.283136 1023.998976a102.399693 102.399693 0 0 1-72.703782-29.695911l-409.598771-409.598771a102.399693 102.399693 0 0 1 145.407564-145.407564l325.631023 326.65502L1044.761539 40.961925a102.399693 102.399693 0 1 1 163.839508 122.879631l-614.398157 819.197543a102.399693 102.399693 0 0 1-74.751775 40.959877z"
              p-id="2805"
            />
          </svg>
          <svg v-else-if="dragType === 'error'" t="1628669080160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3748">
            <path
              d="M613.316249 509.579623l224.87829-224.871064c28.213646-28.220871 28.213646-73.962379 0-102.176025-28.220871-28.213646-73.955154-28.213646-102.18325 0L511.140224 407.396373 286.26916 182.532534c-28.220871-28.213646-73.955154-28.213646-102.18325 0-28.213646 28.213646-28.213646 73.962379 0 102.176025L408.956975 509.579623l-224.871065 224.87829c-28.213646 28.220871-28.213646 73.962379 0 102.18325a72.047753 72.047753 0 0 0 51.088012 21.16204 72.047753 72.047753 0 0 0 51.088013-21.16204l224.871064-224.87829 224.87829 224.87829a72.047753 72.047753 0 0 0 51.088012 21.16204 72.033303 72.033303 0 0 0 51.088013-21.16204c28.213646-28.220871 28.213646-73.962379 0-102.18325L613.316249 509.579623z"
              p-id="3749"
            />
          </svg>
          <svg v-else t="1628649273861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1192">
            <path d="M837.9904 570.0608H124.5696a29.0304 29.0304 0 0 1-29.0304-29.0304V482.9696a29.0304 29.0304 0 0 1 29.0304-29.0304h713.4208z" p-id="1193" />
            <path
              d="M561.3056 808.96l-40.96-40.96a28.928 28.928 0 0 1 0-40.96l215.04-215.04-215.04-215.04a28.9792 28.9792 0 0 1 0-40.96l40.96-40.96a28.9792 28.9792 0 0 1 40.96 0l296.96 296.96-296.96 296.96a28.9792 28.9792 0 0 1-40.96 0z"
              p-id="1194"
            />
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import axios from 'axios'
import { verify } from '/@/api/user'

import { onMounted, toRaw } from 'vue'

const props = defineProps({
  placeholder: String,
  config: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emit = defineEmits(['onCallback'])

// 滑块x坐标
let x = $ref(0)
// 偏移量
let offset = $ref(0)
// 鼠标按下状态
let down = $ref(false)
// 接口请求状态
let postType = $ref(false)
// 组件显示状态
let showType = $ref(true)
// 滑动轨迹
let positionArray = $ref([])
let hover = $ref(false)
// 移动状态
let dragType = $ref('')
// 触点回退
let setIntervalVal = $ref(null)
// 初始化参数
let resData = $ref(null)
// 错误次数
let errorCount = $ref(0)

// 组件配置项
let defaultConfig = {
  // 错误刷新次数
  errorNum: 3,
  // 组件默认展示样式
  showType: 'alert',
  // 组件配置项覆盖
  ...props.config,
}

const show = () => (showType = true)
const hide = () => ((showType = false), (resData = null))

let formStatus = null
const init = async data => {
  showType = true
  !formStatus ? (formStatus = data) : ''
  let res = await verify.get(formStatus.account)

  resData = res.data || res.data.data
  console.log('加载完毕数据为:', resData)

  x = 0
  offset = 0
  down = false
  dragType = ''
}

// 鼠标开始滑动
const mousedown = event => {
  if (down || dragType) return false
  down = true
  offset = event.x - x
  dragType = 'move'

  event = event || window.event
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
  document.onmousemove = function (ev) {
    let _event = ev || window.event
    if (down) {
      x = Math.min(Math.max(0, _event.x - offset), resData.background.x - resData.slide.x)
      positionArray.push({
        position: _event.clientX,
        // y: _event.clientY,
        time: new Date().getTime(),
      })
    }
  }
  document.onmouseup = mouseup
}

// 鼠标滑动抬起
const mouseup = async () => {
  if (down || dragType) {
    down = false
    document.onmousemove = null
    const res = await verify.post({
      account: formStatus.account,
      position: x,
      imageToken: resData.imageToken,
      timeStart: positionArray[0].time,
      timeEnd: positionArray[positionArray.length - 1].time,
      coord: toRaw(positionArray),
    })

    if (!res.code) {
      reInit('ok')
      emit('onCallback', res.data.verifyToken)
    } else {
      reInit('error')
    }
  }
  document.onmouseup = ''
}

// 提交回调
const reInit = _dragType => {
  if (_dragType !== 'ok') {
    dragType = 'error'
    errorCount++
    setTimeout(() => {
      // 错误达到指定次数重新拉取图片
      errorCount >= defaultConfig.errorNum ? (init(), (errorCount = 0)) : ''
      // 回退动画
      setIntervalVal = setInterval(() => {
        if (x > 0) {
          x = x - resData.background.x / 40
        } else {
          x = 0
          dragType = ''
          clearInterval(setIntervalVal)
          setIntervalVal = null
        }
      }, 1)
    }, 500)
    positionArray = []
  } else {
    dragType = 'ok'
    setTimeout(() => {
      hide()
    }, 800)
  }
}

// 对外暴漏的方法
defineExpose({ reInit, init, show, hide })
</script>

<style lang="less">
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
@import './Verify.less';
</style>
