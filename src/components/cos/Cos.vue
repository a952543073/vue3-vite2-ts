<!--
 * @Copyright: 12308
 * @Author: ShiJunJie
 * @Date: 2020-11-13 12:08:07
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 17:00:24
 * @Descripttion: 全球文件上传质量测试
-->
<template>
  <div id="cosDemo">
    <h1>全球文件上传质量测试 v1.0</h1>
    <p style="padding-bottom: 20px">Step1 : 从手机相册中选择一张图片上传</p>
    <p>
      <label for="file">
        <span class="button" :class="[type ? 'disable' : '']">选择照片</span>
        <input type="file" id="file" @change="getFile($event)" />
      </label>
    </p>
    <div class="img">
      <!-- TODO: 需要删除 -->
      <!-- <img :src="url" alt="" /> -->
      <!-- TODO: 需要删除 -->
      <img v-if="imgData.src" :src="imgData.src" />
      <img v-else src="./cos.jpg" />
      <p style="margin-top: 10px; color: #999">
        <template v-if="imgData.size"> 图片大小: {{ imgData.size }} </template>
        <template v-else> 请先选择图片 </template>
      </p>
    </div>
    <template v-if="file">
      <p style="padding-bottom: 20px; padding-top: 40px">Step2 : 点击开始上传按钮进行上传测试</p>
      <p style="padding: 20px">
        <span class="button" @click="go" :class="[type ? 'disable' : '']">开始测试</span>
      </p>
      <template>
        <template v-if="!err">
          <p v-if="load.kpbs" style="padding-bottom: 10px">当前上传速率: {{ load.kpbs }} kpbs</p>
          <p v-if="load.times">上传完成: 总耗时 {{ load.times }} 秒</p>
        </template>
        <template>
          <p style="padding-bottom: 10px">
            {{ err }}
          </p>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import cos from '/@/tools/cos'
// import { initUploadObj, initGetUrl } from '/@/tools/cos'
export default {
  name: 'demo',
  data() {
    return {
      that: this,
      img: './cos.jpg',
      imgData: {
        src: '',
        size: '',
      },
      file: '',
      load: {
        kpbs: '',
        times: 0,
      },
      err: '',
      type: false,
      url: '',
    }
  },
  mounted() {
    // let that = this;
    // cos.initGetUrl("image/sign/20201223/e8e801e6-4da1-4099-ba7f-f4b02c55c40a.jpg", function (res) {
    // 	console.log(res);
    // 	console.log(res.data.Url);
    // 	that.url = res.original_img_url + res.man_size;
    // });
  },
  methods: {
    getFile(event) {
      if (!this.type) {
        this.type = true
        let _this = this
        this.file = event.target.files[0]
        if (!event || !window.FileReader) return // 判断是否支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(this.file) // 文件转换
        reader.onloadend = function () {
          _this.imgData.src = this.result
          _this.type = false
        }
        this.imgData.size = `${this.conversionM(this.file.size)} MB`
      }
    },
    go() {
      if (!this.type) {
        this.type = true
        this.err = ''
        let that = this
        let file = this.file
        let thatDateTime = this.getDateOf()
        //初始化文件上传
        // console.log(file)
        cos.initUploadObj(`cms/${file.name}`, file, 'image', function (res) {
          that.src = ''
          if (res.success) {
            let oldTime = that.getDateOf()
            // console.log(oldTime, thatDateTime)
            that.load.times = (oldTime - thatDateTime).toFixed(3)
            that.type = false
            console.log(res)
          } else if (res.msg === '上传中') {
            that.load.kpbs = that.conversionK(res.speed)
          } else {
            that.err = res
            that.type = false
          }
        })
      }
    },
    getDateOf() {
      return new Date().valueOf() / 1000
    },
    conversionK(obj) {
      return (obj / 1024).toFixed(2)
    },
    conversionM(obj) {
      return (obj / 1024 / 1024).toFixed(2)
    },
  },
}
</script>

<style lang="scss" scoped>
#cosDemo {
  padding: 0 30px;
  * {
    font-size: 26px;
  }
  text-align: center;
  h1 {
    padding: 30px 0;
    font-size: 50px;
  }
  .button {
    display: inline-block;
    background: rgba(9, 155, 211);
    color: #fff;
    padding: 4px 8px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  .button.disable {
    background: rgb(122, 122, 122);
  }
  .img {
    width: 60vw;
    height: 40vw;
    display: inline-block;
    position: relative;
    border: 1px solid #999;

    img {
      width: 100%;
      height: 100%;
    }
  }
  #file {
    display: none;
  }
}
</style>
