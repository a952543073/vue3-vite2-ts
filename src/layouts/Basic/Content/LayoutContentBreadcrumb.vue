<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-28 17:07:25
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 14:40:34
 * @Descripttion: 面包屑
-->
<template>
  <template v-if="breadcrumbArray.length > 1">
    <a-breadcrumb class="breadcrumb" separator=">">
      <a-breadcrumb-item v-for="(e, i) in breadcrumbArray" :key="i">
        <template v-if="breadcrumbArray.length - 1 === i || i === 0">
          {{ e.title || e.meta.name || e.name }}
        </template>
        <router-link :to="e" v-else>
          {{ e.title || e.meta.name || e.name }}
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </template>
</template>

<script setup>
import { watch, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()
console.log(route.params)
const routeParams = (e) => (route.params[e] ? '/' + route.params[e] : e)

const getBreadcrumb = (item) => {
  const arr = item.filter((e) => {
    return e.redirect ? false : true || e.path ? true : false
  })
  console.log(arr)
  let arrData = []
  arr.forEach((e) => {
    // let str = ''
    // if (e.path && e.path.indexOf(':') !== -1) {
    //   e.path.split(':').forEach(item => {
    //     str += routeParams(item.replace(/(^:)|(\/$)/g, '')) || item
    //   })
    // }
    // e.path = str || e.path
    arrData.push({ path: e.path, params: route.params })
  })
  return toRaw(arr)
}

let breadcrumbArray = $ref(getBreadcrumb(route.matched))
console.log(breadcrumbArray)

watch(
  () => route,
  (item, old) => (breadcrumbArray = getBreadcrumb(item.matched)),
  { deep: true }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 15px;
  line-height: 100%;
}
</style>
