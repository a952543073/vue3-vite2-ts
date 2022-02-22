<!--
 * @Author: ShiJunJie
 * @Date: 2021-11-02 14:09:53
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2021-12-23 15:54:45
 * @Descripttion: 
-->
<!-- 
  表格跨行颜色
  :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
-->
<template>
  <section class="table">
    <div class="tableTitle">
      <slot name="title"></slot>
    </div>
    <a-table
      class="ant-table-striped"
      size="small"
      :loading="loading"
      :columns="newColumn"
      :data-source="newDataScourde"
      :pagination="false"
      :scroll="newScroll"
      :rowSelection="rowSelection"
      bordered
      @resizeColumn="handleResizeColumn"
      @change="onChange"
    >
      <template #headerCell="{ column }">
        <!-- <template v-if="column.ellipsis === true">
          <a-tooltip color="#fff" placement="bottomLeft">
            <template #title>
              <span style="color: #7b8ba1">{{ column.title }}</span>
            </template>
            <div class="cell-ellipsis">{{ column.title }}</div>
          </a-tooltip>
        </template>
        <template v-else>-->
        {{ column.title }}
        <!-- </template> -->
      </template>

      <template #bodyCell="{ column, record }">
        <!-- 包裹方法 -->
        <div @click.stop="column.fun ? column.fun(record) : ''">
          <template v-if="column.key === 'operation'">
            <!-- 操作栏 -->
            <template v-if="column.funs && column.funs.length > 0">
              <template v-for="(e, i) in column.funs" :key="i">
                <a-button type="link" @click="e.fun(record)" v-if="e.show ? e.show(record) : true" :danger="e.label.indexOf(['删除']) !== -1">
                  <span>{{ e.label }}</span>
                </a-button>
              </template>
            </template>
          </template>

          <template v-else-if="column.type === 'status'">
            <!-- 状态对照 -->
            <div class="statusPoint">
              <i class="point" v-if="column.typeData[record[column.key]]?.color" :style="{ backgroundColor: column.typeData[record[column.key]]?.color }"></i>
              <span>{{ column.typeData[record[column.key]]?.label }}</span>
            </div>
          </template>

          <template v-else-if="column.type === 'tag'">
            <!-- 标签 -->
            <div :style="`height: 23px;background-color:${getTagColor(record[column.key])}`"></div>
          </template>

          <template v-else-if="column.type === 'tags'">
            <!-- 标签组 -->
            <a-tooltip color="#fefefe" placement="bottomLeft" v-if="record[column.key].length > 0">
              <template #title>
                <div class="cards">
                  <template v-for="(e, i) in record[column.key]" :key="i">
                    <span class="card" :style="{ color: e.color }" v-if="e['label']">
                      {{ e.label }}<SvgIcon name="icon-cha" @click.stop="column.tagsFun ? column.tagsFun({ codeId: record.id, tagId: e.id }) : ''" />
                    </span>
                  </template>
                </div>
              </template>
              <div class="cards noWarp">
                <template v-for="(e, i) in record[column.key]" :key="i">
                  <span class="card" :style="{ color: e.color }" v-if="e['label']">
                    {{ e.label }}<SvgIcon name="icon-cha" @click.stop="column.tagsFun ? column.tagsFun({ codeId: record.id, tagId: e.id }) : ''" />
                  </span>
                </template>
              </div>
            </a-tooltip>
            <template v-else> - </template>
          </template>

          <template v-else-if="column.type === 'progress'">
            <!-- 进度条 -->
            <a-row style="flex" v-if="record[column.key]" :gutter="[0, 8]">
              <a-col flex="auto"><a-progress :percent="parseInt(record[column.key])" size="small" style="cursor: pointer" :showInfo="false" /></a-col>
              <a-col style="width: 45px; text-align: right">{{ record[column.key] === 'NaN' ? '0' : record[column.key] }}%</a-col>
            </a-row>
            <template v-else>-</template>
          </template>
          <template v-else-if="column.ellipsis === true">
            <!-- 单行显示 -->
            <a-tooltip color="#fff" placement="bottomLeft" v-if="record[column.key] && record[column.key] !== 'Invalid Date'">
              <template #title>
                <span style="color: #7b8ba1">{{ record[column.key] }}</span>
              </template>
              <div class="cell-ellipsis">{{ record[column.key] || '-' }}</div>
            </a-tooltip>
            <template v-else> - </template>
          </template>
          <template v-else>
            <!-- 默认 -->
            {{ record[column.key] === 'Invalid Date' ? '无' : record[column.key] || '-' }}
          </template>
        </div>
      </template>
    </a-table>
    <BaseTablePage v-show="!hidePage" :total="total" :current="current" :pageSize="size" @page="page" />
  </section>
</template>

<script setup>
import { computed, onMounted, watch, onUnmounted, reactive, toRaw, readonly, unref } from 'vue'
import { useRouter } from 'vue-router'
import { _debounce as debounce, getTagColor } from '/@/utils/util'

const props = defineProps({
  total: { type: Number, default: 0 },
  current: { type: Number, default: 1 },
  loading: Boolean,
  size: { type: Number, default: 10 },
  columns: { type: Array, default: [] },
  dataSource: { type: Array, default: [] },
  rowSelect: { type: Boolean, default: false },
  hidePage: { type: Boolean, default: false },
  selectData: { type: Array, default: [] },
})
let selectedRowKeys = $ref([])
watch(
  () => props.selectData,
  (a, b) => {
    selectedRowKeys = toRaw(a)
    // console.log(toRaw(a), toRaw(b))
  }
)

const emit = defineEmits(['page', 'rowSelectData', 'update:selectData'])

const rowSelection = computed(() => {
  if (props.rowSelect === true) {
    return {
      preserveSelectedRowKeys: unref(selectedRowKeys),
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        emit('rowSelectData', selectedRowKeys)
        emit('update:selectData', selectedRowKeys)
        console.log(`selectedRowKeys: ${selectedRowKeys}`, '\nselectedRows: ', selectedRows)
      },
      getCheckboxProps: record => ({
        // disabled: record.name === "",
        name: record.name,
      }),
    }
  } else if (props.rowSelect !== false) {
    return props.rowSelect
  } else {
    return null
  }
})

const page = (pageSize, pageNum) => {
  emit('page', pageSize, pageNum)
}

const newColumn = computed(() => {
  return (
    (props.columns &&
      props.columns.length > 0 &&
      reactive([
        ...Array.from(props.columns, e => {
          return {
            key: e.dataIndex,
            resizable: true,
            sorter: e.sorter ? e.sorterFun() : false,
            // sorter:
            //   e?.sorter !== false
            //     ? (a, b) => {
            //         const [current, next] = [a[e.dataIndex], b[e.dataIndex]]
            //         switch (typeof current) {
            //           case 'string':
            //             return current.localeCompare(next)
            //           case 'number':
            //             return current - next
            //           default:
            //             return false
            //         }
            //       }
            //     : false,
            width: e.title.length * 12 + 40 + 20,
            fixed: e.dataIndex === 'operation' ? 'right' : false,
            ...e,
          }
        }),
      ])) ||
    reactive([
      { title: 'name', key: 'name', resizable: true, fixed: 'left', width: 100, dataIndex: 'name' },
      { title: 'value', key: 'value', resizable: true, dataIndex: 'value' },
      {
        title: '操作',
        key: 'operation',
        resizable: true,
        width: 50,
        fixed: 'right',
        align: 'center',
        funs: [{ label: '修改', fun: e => console.log(e) }],
      },
    ])
  )
})

const newDataScourde = computed(() => {
  return props.dataSource && Array.from(props.dataSource, e => ({ key: e.id, ...e }))
})

const scroll_x = computed(() => {
  let x = 0
  Array.from(newColumn, e => (x += e.width))
  // console.log(props.columns[props.columns.length - 1].width)
  return x + props.columns.length
})
let newScroll = $ref({ x: scroll_x, y: 200 })
const setNewScroll_y = () => {
  const $main = document.getElementsByClassName('main')[0]
  const $table = document.getElementsByClassName('ant-table-wrapper')[0]
  // console.log($table.offsetTop)
  const y = $main.offsetHeight - $table.offsetTop - 114
  newScroll.y = y
}
watch(
  () => props.dataSource,
  () => setNewScroll_y()
)
onMounted(() => {
  window.onresize = debounce(setNewScroll_y)
})
onUnmounted(() => {
  console.log('表格自适应组件方法销毁')
  window.onresize = null
})

const handleResizeColumn = (w, col) => {
  // console.log(w, col)
  col.width = w
}
const onChange = (pagination, filters, sorter, extra) => {
  // console.log("params", pagination, filters, sorter, extra)
}
defineExpose({ setNewScroll_y: debounce(setNewScroll_y) })
</script>

<style lang="less" scoped>
// .ant-table-striped :deep(.table-striped) td {
//   // background-color: #fafafa;
// }
:deep(.ant-table) tr {
  td {
    transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
    animation: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
    -moz-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
    -webkit-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);
    -o-transition: all 0.3s cubic-bezier(0.4, 0.8, 0.4, 1);

    // opacity: 0.7;
    color: #777;
    &.ant-table-cell-fix-right {
      // opacity: 1;
    }
  }
  &:hover td {
    color: #333;
    // opacity: 1;
  }
}
.table {
  padding: 16px 18px;
  overflow: hidden;
  .tableTitle {
    margin-bottom: 12px;
  }
  .ant-btn {
    padding: 0;
    height: auto;
    + .ant-btn {
      margin-left: 15px;
    }
  }
  .cell-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  .statusPoint {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .point {
      width: 6px;
      height: 6px;
      margin-right: 5px;
      background: #f00;
      border-radius: 100%;
    }
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  &.noWarp {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
    display: block;
    .card {
      margin-right: 8px;
    }
  }
  .card {
    border: 1px solid transparent;
    border-radius: 3px;
    line-height: 100%;
    padding: 3px 5px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding-right: 19px;
    .svg-icon {
      display: none;
      font-size: 10px;
    }
    &:hover {
      padding-right: 5px;
      border: 1px solid;
      .svg-icon {
        cursor: pointer;
        display: block;
      }
    }
  }
}
</style>
