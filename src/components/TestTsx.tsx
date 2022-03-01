/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 16:59:49
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 17:15:33
 * @Descripttion:
 */

export default defineComponent({
  setup() {
    const data = ref(1)
    const { t } = useI18n()

    const clickIn = () => data.value++

    return () => (
      <div>
        <div>
          {t('hello')}, {t('about')}! {t('demotxt')}
        </div>
        <div onClick={clickIn}>aa123a + {data.value}</div>
      </div>
    )
  },
})
