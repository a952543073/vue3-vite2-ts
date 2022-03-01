/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 16:59:49
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 17:34:53
 * @Descripttion:
 */

export default defineComponent({
  setup() {
    const data = ref(1)
    const { t } = useI18n()

    const clickIn = () => data.value++

    return () => (
      <div>
        <div onClick={clickIn}>这是 TestTex.tex文件 {`{count : ${data.value}}`}</div>
        <div>
          {t('hello')}, {t('about')}! {t('demotxt')}
        </div>
      </div>
    )
  },
})
