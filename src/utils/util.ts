/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:58:12
 * @Descripttion:
 */

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s: string) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

// 防抖
export const _debounce = (fn: () => void, delay = 200) => {
  // console.log('utils --> 触发防抖')
  let timer: NodeJS.Timeout = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn()
    }, delay)
  }
}
// 节流
export const _throttle = (fn: () => void, interval = 200) => {
  // console.log('utils --> 触发节流')
  let last: number
  let timer: NodeJS.Timeout = null
  return function () {
    let now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn()
      }, interval)
    } else {
      last = now
      fn()
    }
  }
}

/**
 * 树无限极拍平
 * @param {*} array Array [{'children':[ {''children:[]} ]},{}]
 * @param {*} key 子节点的key
 * @param {*} _response 返回体
 * @returns []
 */
export const patDown = (array: any = [], key: any = 'children', _response: any = []) => {
  array.forEach((e: { [x: string]: any }) => {
    _response.push(e)
    e[key] && e[key].length > 0 && patDown(e[key], key, _response)
  })
  return _response

  // return [].concat(...array.map(item => [].concat(item, ...patDown(item[key],key))))
}

/**
 * 树数据过滤并生成新的树
 * patDown2([...array],Object:{ sonK: "children", k: "value", v: "123" })
 * @param {*} array 树
 * @param {*} conditions {sonk=>子节点的Key , k=>判断条件的Key , v=>判断条件的值}
 * @param {*} _response 新的树
 * @returns
 */
export const patDown2 = (
  array: any = [],
  conditions: any = { sonK: 'children', k: 'value', v: '123' },
  _response: any = []
) => {
  _response = array
  for (let k = 0; k < _response.length; k++) {
    const e = _response[k]
    // console.log(e[conditions.sonK].length, e, k, e[conditions.k], conditions.v)
    if (e[conditions.sonK].length === 0 && e[conditions.k] !== conditions.v) {
      _response.splice(k, 1)
      k--
    }
    e[conditions.sonK] && e[conditions.sonK].length > 0 && patDown2(e[conditions.sonK], conditions, _response)
  }
  return _response
}

/**
 * 只有当前同子节点的child为空才会给该末子节点增加特定class
 *
 * ant 树样式重写
 * scss => .ant-tree-list-holder-inner {display: block !important;.inlineTreeNodeSon {display: inline-flex;}}
 *
 * @param {Array} data
 * @returns
 */
export const inlineTreeData = (data: Array<any>) => {
  // 当前同级节点的数量
  let count = data.length
  // 计算同级节点的子节点为空数量
  data.forEach((e) => (e.children && e.children.length > 0 ? inlineTreeData(e.children) : --count))
  // 当同节点的所有子节点都为空时给子节点增加自定义class
  !count && data.forEach((item) => (item['class'] = 'inlineTreeNodeSon'))
  // console.log(data.length, count, data[0].key)
  return data
}

/**
 * 密码格式效验
 * 密码必须为大写英文、小写英文、数字、英文特殊字符组合的8-16位值，且不包含3位以上连续重复字符！
 * @param {String} value
 * @returns Boolean
 */
export const testPassword = (value: string) => {
  let type = true
  const reg = new RegExp(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[_!@#\$%\^&\*`~()\-\+=])[0-9a-zA-Z_!@#\$%\^&\*`~()\-\+=]{8,16}$/
  )
  if (reg.test(value)) {
    const arr = value.split('')
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) {
        console.log('不合规', arr[i], arr[i + 1], arr[i + 2])
        type = false
        break
      }
    }
  } else {
    type = false
  }
  return type
}

/** 文件大小转换 */
export const fileSizeConversion = (e: string | number) => {
  const num = parseInt(`${e}`)
  if (num > 1024 * 1024) {
    return (num / 1024 / 1024).toFixed(2) + ' MB'
  } else if (num > 1024) {
    return (num / 1024).toFixed(2) + ' KB'
  } else {
    return num + ' B'
  }
}

/** 标签颜色转换 */
export const getTagColor = (e: string | number) => {
  const color = {
    1: '#4D7CFE',
    2: '#9F9EF7',
    3: '#4AC48E',
    4: '#9961FD',
    5: '#FF6FB9',
    // 11: '#4D7CFE',
    // 21: '#9F9EF7',
    // 31: '#4AC48E',
    // 41: '#9961FD',
    // 51: '#FF6FB9',
    // 12: '#4D7CFE',
    // 22: '#9F9EF7',
    // 32: '#4AC48E',
    // 42: '#9961FD',
    // 52: '#FF6FB9',
  }
  return color[e] || e || color
}
