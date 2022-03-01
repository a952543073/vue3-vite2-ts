/*
 * @Author: ShiJunJie
 * @Date: 2022-02-28 14:47:07
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-28 17:00:11
 * @Descripttion:
 */

const Button = defineComponent({
  setup() {
    const data = ref(1)

    return () => (
      <div onClick={() => data.value++}>
        aa123a + {data.value}
        {Array.from({ length: 50 }).map((e, i) => (
          <p>{i}</p>
        ))}
        <a-button>123</a-button>
      </div>
    )
  },
})

export default Button
