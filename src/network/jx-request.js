import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'
const AppRequest = axios.create({ // 壳内转发请求
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const ycjRequest = axios.create({ // 云采集请求
  baseURL: 'http://129.204.71.240',
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return tbAdaptert(config)
  }
})
const otherRequest = axios.create({ // 第三方请求
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
  AppRequest, // 对接第三方请求
  ycjRequest, // 对接本地请求
  otherRequest, // 对接云采集请求

  // 请按照一下格式填写
  // 2021-09-24
  // weTbUploadGetHeaders: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadGetHeaders', data), // 上传淘宝图片（由爬虫组提供）
  // weTbUploadPostResult: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadPostResult', data) // 上报淘宝图片（由爬虫组提供）

  // 2020-10-09
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析
  getChildUserList: (data) => AppRequest.post('/user/childUserList', data), // 个人中心-团队管理-查询子账号列表
  userRoleList: (data) => AppRequest.get('/user/userRoleList', data), // 个人中心-团队管理-获取子账号角色类型
  saveChildUsers: (data) => AppRequest.post('/user/saveChildUsers', data), // 个人中心-团队管理-新增子账号列表
  deleteChildUser: (data) => AppRequest.post('/user/deleteChildUser', data), // 个人中心-团队管理-删除子账号
  editChildUsers: (data) => AppRequest.post('/user/editChildUserDatas', data), // 个人中心-团队管理-修改子账号信息
  getIPTrustList: (data) => AppRequest.get('/getIPTrustList', data), // 个人中心-信任IP-获取列表
  updateTrustedIP: (data) => AppRequest.post('/updateTrustedIP', data), // 个人中心-信任IP-更新用户的IP信任列表
  deleteTrustedIP: (data) => AppRequest.post('/deleteTrustedIP', data), // 个人中心-信任IP-删除用户的IP信任
  setIpCheck: (data) => AppRequest.post('/user/setIpCheck', data) // 个人中心-信任IP-设置信任IP是否开启
}
