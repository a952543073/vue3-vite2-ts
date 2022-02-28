/*
 * @Author: ShiJunJie
 * @Date: 2022-02-28 14:47:07
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-28 15:34:04
 * @Descripttion:
 */

const Button = defineComponent({
  setup() {
    const data = ref(1)

    const clickIn = () => data.value++
    return () => <div onClick={clickIn}>aa123a + {data.value}</div>
  },
})

export default Button
