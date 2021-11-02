/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-01 14:27:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\network\jx-request.js
 */
import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'
const AppRequest = axios.create({ // 壳内转发请求
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const AppRequest2 = axios.create({ // 壳内转发请求
  baseURL: 'http://local.spm.com',
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
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})

export default {
  AppRequest, // 对接第三方请求
  ycjRequest, // 对接云采集请求
  otherRequest, // 对接第三方请求

  // 请按照一下格式填写
  // 2021-09-24
  // weTbUploadGetHeaders: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadGetHeaders', data), // 上传淘宝图片（由爬虫组提供）
  // weTbUploadPostResult: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadPostResult', data) // 上报淘宝图片（由爬虫组提供）

  // 2021-10-09
  // 测试数据-----------------------------------------------------
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析

  // 个人中心-------------------------------------------------

  // 软件财务中心
  getTransType: (data) => AppRequest.get('/user/transType', { data }), // 获取账单交易类型
  getAccountAmount: (data) => AppRequest.get('/user/accountAmount', { data }), // 查询用户账号余额
  getAccountAmountDetailList: (data) => AppRequest.post('/user/accountAmountDetailList', data), // 查询用户账号余额
  getTranslateDetail: (data) => AppRequest.get('/translate/getTranslateDetail', { params: data }), // 获取翻译明细数据
  getChargeUrlV2: (data) => AppRequest.get('/emptyBag/chargeUrlV2', { params: data }), // 充值
  getTranslateAmount: (data) => AppRequest.get('/translate/getTranslateAmount', { params: data }), // 获取今日翻译费用

  // 账单核算
  getOrderStatisticsList: (data) => AppRequest.get('/orderStatistics/index', { params: data }), // 账单核算：列表
  getChildUserList: (data) => AppRequest.post('/user/childUserList', data), // 团队管理-查询子账号列表
  userRoleList: (data) => AppRequest.get('/user/userRoleList', data), // 团队管理-获取子账号角色类型
  saveChildUsers: (data) => AppRequest.post('/user/saveChildUsers', data), // 团队管理-新增子账号列表
  deleteChildUser: (data) => AppRequest.post('/user/deleteChildUser', data), // 团队管理-删除子账号
  editChildUsers: (data) => AppRequest.post('/user/editChildUserDatas', data), // 团队管理-修改子账号信息
  getBindMallCount: (data) => AppRequest.get('/mallGroup/bindMallCount', { params: data }), // 团队管理-获取店铺分组
  getIPTrustList: (data) => AppRequest.get('/getIPTrustList', { params: data }), // 信任IP-获取列表
  updateTrustedIP: (data) => AppRequest.post('/updateTrustedIP', data), // 信任IP-更新用户的IP信任列表
  deleteTrustedIP: (data) => AppRequest.post('/deleteTrustedIP', data), // 信任IP-删除用户的IP信任
  setIpCheck: (data) => AppRequest.post('/user/setIpCheck', data), // 信任IP-设置信任IP是否开启
  getPhoneLists: (data) => AppRequest.get('/user/getPhoneLists', data), // 信任IP-获取手机号码列表
  updatePhoneListForIp: (data) => AppRequest.post('/user/updatePhoneListForIp', data), // 信任IP-配置接收手机验证码的手机号

  // 数据统计-------------------------------------------------------------------

  // 数据统计
  getDrderBasicStatV2: (data) => AppRequest.post('/mallDataStatistics/orderBasicStatV2', data), // 数据统计获取订单列表数据
  getDataStat: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 数据统计图表数据

  // 店铺管理 ------------------------------------------------------------------

  // 店铺管理
  ddMallGoodsGetMallList: (data) => AppRequest.get('/ddMallGoods/getMallList', data), // 联动站点分组获取店铺列表
  mallGroupIndex: (data) => AppRequest.get('/mallGroup/index', { params: data }), // 获取店铺分组列表
  getMallList: (data) => AppRequest.get('/bindMall/mallList', { params: data }), // 获取店铺列表
  getMallStatistics: (data) => AppRequest.get('/mallStatistics/index', { params: data }), // 店铺数据+店铺指标列表
  syncMallData: (data) => AppRequest.post('/mallStatistics/save', data), // 上报店铺数据+店铺指标列表
  test: (data) => AppRequest.get('/bindMall/getMallLoginDatasV2', data),
  updateWatermark: (data) => AppRequest.post('/bindMall/updateWatermark', data), // 修改店铺水印
  updateUserPassword: (data) => AppRequest.post('/bindMall/uploadUserPassword', data), // 修改账户登录密码
  uploadMallCookie: (data) => AppRequest.post('/bindMall/uploadWebLoginInfo', data), // 上报店铺cookie
  deleteBindMall: (data) => AppRequest.post('/bindMall/deleteMall', data), // 上报店铺cookie

  // 店铺分组
  getMallGroup: (data) => AppRequest.get('/mallGroup/index', { params: data }), // 获取店铺分组列表
  addGroup: (data) => AppRequest.post('/mallGroup/save', data), // 新增分组
  updateGroup: (data) => AppRequest.post('/mallGroup/update', data), // 修改分组
  deleteGroup: (data) => AppRequest.post('/mallGroup/delete', data), // 删除分组

  // 店铺指标
  mallStatisticsSave: (data) => AppRequest.post('/mallStatistics/save', data), // 上报数据

  // 异常公告------------------------------------------------------------------------
  // 签收包裹异常
  getExceptionNoOrderIndex: (data) => AppRequest.get('/exceptionNoOrderIndex', { params: data }), // 签收包裹异常列表
  markPackageToMy: (data) => AppRequest.post('/signPackage/markPackageToMy', data), // 标记为我的
  applicationForreJection: (data) => AppRequest.post('/packageReturn/apply', data), // 申请退件

  // 待获取物流单号
  getExceptionNoTrackingNumberIndex: (data) => AppRequest.get('/exceptionNoTrackingNumberIndex', { params: data }), // 订单列表
  updateOrderTrackingNumber: (data) => AppRequest.post('/order/updateOrderTrackingNumber', data), // 添加采购物流单号

  // 异常公告
  apply: (data) => AppRequest.post('/packageReturn/apply', data), // 异常公告签收包裹异常：申请退件
  getExceptionExpiredOrderIndex: (data) => AppRequest.get('/exceptionExpiredOrderIndex', { params: data }), // 异常公告即将过期订单列表
  getExceptionWarehouse: (data) => AppRequest.get('/exceptionWarehouse', { params: data }), // 异常公告仓库异常信息列表
  uploadDealExceptionStatus: (data) => AppRequest.post('/uploadDealExceptionStatus', data), // 异常公告仓库异常处理状态上报

  // 2021-10-18
  // 店铺管理
  getMallManagerStoreMainManagementList: (data) => AppRequest.get('/yunip/api/myiplist', { params: data }), // 店铺主体管理列表
  getPaymentList: (data) => AppRequest.post('/mallAccountBill', data), // 货款对账列表
  getMallSite: (data) => AppRequest.get('/ddMallGoods/getMallList', { params: data }), // 店铺站点信息
  exchangeRateList: (data) => AppRequest.get('/exchangeRateList', { params: data }), // 获取汇率
  updateMallInfo: (data) => AppRequest.post('/bindMall/updateMallInfo',  data ), // 同步信息
  uploadPaymentList: (data) => AppRequest.post('/mallAccountBill/save', data), //上报货款对账单

  // 异常公告--即将过期订单
  getExceptionExpiredOrderIndex: (data) => AppRequest.get('/exceptionExpiredOrderIndex', { params: data }), // 订单列表
  getExceptionWarehouse: (data) => AppRequest.get('/exceptionWarehouse', { params: data }), // 仓库异常信息列表
  uploadDealExceptionStatus: (data) => AppRequest.post('/uploadDealExceptionStatus', data), // 仓库异常处理状态上报

  // 智能仓库 --自有仓库
  getUserStore: (data) => AppRequest.get('/userStock/get', { params: data }), // 自有仓库列表
  insertUserGoods: (data) => AppRequest.post('/userStock/save', data), // 新增自有商品
  updataUserGoods: (data) => AppRequest.post('/userStock/update', data), // 编辑自有商品
  deleteUserGoods: (data) => AppRequest.post('/userStock/deleteGoods', data), // 删除自有商品 
  deleteUserSku: (data) => AppRequest.post('/userStock/deleteSkus', data)//删除sku
}
