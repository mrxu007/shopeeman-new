import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'
const jxRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const tbRequest = axios.create({
  baseURL: 'http://129.204.71.240',
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return tbAdaptert(config)
  }
})
const jdRequest = axios.create({
  timeout: 5000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
export default {
  jdRequest, // 对接第三方请求
  jxRequest, // 对接本地请求
  tbRequest // 对接云采集请求

  // 请按照一下格式填写
  // 2021-09-24
  // weTbUploadGetHeaders: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadGetHeaders', data), // 上传淘宝图片（由爬虫组提供）
  // weTbUploadPostResult: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadPostResult', data) // 上报淘宝图片（由爬虫组提供）

}
