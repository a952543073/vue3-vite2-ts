/*
 * @Author: ShiJunJie
 * @Date: 2021-06-21 15:50:29
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-23 11:44:46
 * @Descripttion:
 */
import COS from 'cos-js-sdk-v5'

// 接口异步赋值及异步返回 COS初始化
import https from '/@/utils/https'

const getdata = (data: any) => https.get(`cms/v1/cos/tmp-secret`, { data })

let Bucket = ''
let Region = ''
async function getAll(filePath: any) {
  let res = await getdata({ resourcePath: filePath })
  console.log(res)
  Bucket = res.data.bucket
  Region = res.data.region
  return new COS({
    // UseAccelerate: true,
    getAuthorization: (options: any, callback: any) => {
      callback({
        TmpSecretId: res.data.tmpSecretId, // 临时密钥的 tmpSecretId
        TmpSecretKey: res.data.tmpSecretKey, // 临时密钥的 tmpSecretKey
        XCosSecurityToken: res.data.securityToken, // 临时密钥的 sessionToken
        ExpiredTime: res.data.expiredTime, // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
      })
    },
  })
}

/**
 * @method uploadFile
 * @param {object} cos
 */
function uploadFile(cos: any, file: any, fileInfo: any, callback: any) {
  // var Bucket = 'mfa-test-v2-130122076'
  // var Bucket = 'mfa-test-1258181780'
  // var Bucket = 'mfa-dev-1258181780'
  // var Region = 'ap-beijing' // 库的地址
  // var Region = 'accelerate' // 启用全球访问
  let fileUrl = fileInfo.file_path
  cos.putObject(
    {
      Bucket: Bucket, // 存储桶名字
      Region: Region, // 存储桶空间位置
      Key: fileUrl, // 文件目录
      Body: file, // 文件流
      onHashProgress: function (progressData: any) {
        callback({ msg: '校验中', ...progressData })
      },
      onProgress: function (progressData: any) {
        callback({ msg: '上传中', ...progressData })
      },
    },
    function (err: any, data: any) {
      if (err) {
        callback({
          success: false,
          msg: '文件上传失败!',
          ...err,
        })
        return
      }
      callback({
        success: true,
        msg: '上传成功!',
        data: data,
        signInfo: fileInfo,
      })
    }
  )
}

/**
 * @method uploadFile
 * @param {object} cos
 */
function getFile(cos: any, filePath: any, callback: any) {
  // var Bucket = 'mfa-test-1258181780'
  // var Bucket = 'mfa-dev-1258181780'
  // var Region = 'ap-beijing' // 库的地址
  var Region = 'accelerate' // 启用全球访问
  let fileUrl = filePath
  cos.getObjectUrl(
    {
      Bucket: Bucket, // 存储桶名字
      Region: Region, // 存储桶空间位置
      Key: fileUrl, // 文件目录
      // Sign: true,
      // Range: 'bytes=1-3',
      // Expires: 3600, // 单位秒
    },
    function (err: any, data: any) {
      if (err) {
        callback({
          success: false,
          msg: '文件获取失败',
          ...err,
        })
        return
      } else {
        let url = data?.Url
        let thumbnail = '&imageMogr2/thumbnail/'
        callback({
          success: true,
          msg: '成功',
          data: data,
          original_img_url: url, // 原始尺寸图片
          card_size: `${thumbnail}${324 / 2}x${180 / 2}!`, // 资料宽高比图片
          man_size: `${thumbnail}${264 / 2}x${352 / 2}!`, // 人像宽高比图片
          small_size: `${thumbnail}!30p=`, // 30%缩略图
        })
      }
    }
  )
}

/** 获取请求路径 */
const initGetUrl = function (filePath: any, Callbalck: any) {
  getAll(filePath).then((cos) => {
    getFile(cos, filePath, Callbalck)
  })
}

/**
 * 初始化上传文件对象
 * @param {string} fileName 文件名
 * @param {object} file 上传的文件流及文件类型 名称相关信息
 * @param {Array} 允许上传的文件类型
 * @param {function} uploadStatusCallbalck
 * @return {function} 返回回调函数
 */
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
const initUploadObj = function (filePath: any, file: any, type: any, uploadStatusCallbalck: any) {
  let fileType = file.name ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : ''
  filePath = `cms/${dayjs().format('YYYYMMDD')}/${uuidv4()}${fileType}`
  let fileInfo = {
    file_path: filePath,
    file_name: '',
    media_type: 2,
    media_sub_type: 0,
    size_of_bytes: 122,
    file_expired_type: 'permanent',
  }
  //前端做文件类型限制
  if (type == 'image') {
    type = ['.jpg', '.gif', '.jpeg', '.bmp', '.png']
  }
  if (type == 'excel') {
    type = ['.xlsx']
  }
  if (!!type && type.indexOf(fileType) < 0) {
    uploadStatusCallbalck({
      success: false,
      msg: '请上传正确的' + type + '文件格式!',
    })
    return
  }
  getAll(fileInfo.file_path).then((cos) => {
    fileInfo.file_name = file.name
    uploadFile(cos, file, fileInfo, uploadStatusCallbalck)
  })
}

export default { initUploadObj, initGetUrl }
