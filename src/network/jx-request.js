import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'

const baseURL = window.appInfo.route
const AppRequest = axios.create({ // 壳内转发请求
  baseURL,
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
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const jdRequest = axios.create({
  timeout: '50000',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})

export default {
  jdRequest,
  AppRequest, // 对接第三方请求
  ycjRequest, // 对接云采集请求
  otherRequest, // 对接第三方请求
  // 测试数据-----------------------------------------------------
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析

  // 个人中心-------------------------------------------------
  getTransType: (data) => AppRequest.get('/user/transType', { data }), // 获取账单交易类型
  getAccountAmount: (data) => AppRequest.get('/user/accountAmount', { data }), // 查询用户账号余额
  getAccountAmountDetailList: (data) => AppRequest.post('/user/accountAmountDetailList', data), // 查询用户账号余额
  getTranslateDetail: (data) => AppRequest.get('/translate/getTranslateDetail', { params: data }), // 获取翻译明细数据
  getChargeUrlV2: (data) => AppRequest.get('/emptyBag/chargeUrl', { params: data }), // 充值
  getTranslateAmount: (data) => AppRequest.get('/translate/getTranslateAmount', { params: data }), // 获取今日翻译费用
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
  getUserInfo: (data) => AppRequest.get('/user/info', data), // 获取用户信息

  // 数据统计-------------------------------------------------------------------
  getDrderBasicStatV2: (data) => AppRequest.post('/mallDataStatistics/orderBasicStatV2', data), // 数据统计获取订单列表数据
  getDataStat: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 数据统计图表数据

  // 店铺管理 ------------------------------------------------------------------
  ddMallGoodsGetMallList: (data) => AppRequest.post('/ddMallGoods/getMallList', data), // 联动站点分组获取店铺列表
  mallGroupIndex: (data) => AppRequest.get('/mallGroup/index', { params: data }), // 获取店铺分组列表
  getMallList: (data) => AppRequest.get('/bindMall/mallList', { params: data }), // 获取店铺列表
  getGroupList: (data) => AppRequest.post('/ddMallGoods/getMallList', data), // 获取店铺分组
  getMallStatistics: (data) => AppRequest.get('/mallStatistics/index', { params: data }), // 店铺数据+店铺指标列表
  syncMallData: (data) => AppRequest.post('/mallStatistics/save', data), // 上报店铺数据+店铺指标列表
  updateWatermark: (data) => AppRequest.post('/bindMall/updateWatermark', data), // 修改店铺水印
  updateMallAliasName: (data) => AppRequest.post('/bindMall/updateMallAliasName', data), // 修改店铺别名
  updateUserPassword: (data) => AppRequest.post('/bindMall/uploadUserPassword', data), // 修改账户登录密码
  uploadMallCookie: (data) => AppRequest.post('/bindMall/uploadWebLoginInfo', data), // 上报店铺cookie
  deleteBindMall: (data) => AppRequest.post('/bindMall/deleteMall', data), // 删除店铺信息
  saveMallAuthInfo: (data) => AppRequest.post('/bindMall/saveMallAuthInfo', data), // 上报保存店铺信息
  updateMallInfo: (data) => AppRequest.post('/bindMall/updateMallInfo', data), // 上报更新店铺信息
  getBankList: (data) => AppRequest.get('/getBankList', data), // 获取银行卡信息
  getMallGroup: (data) => AppRequest.get('/mallGroup/index', { params: data }), // 获取店铺分组列表
  getMallGroupList: (data) => AppRequest.get('/ddMallGoods/getMallGroupList', { params: data }), // 根据站点 获取分组
  addGroup: (data) => AppRequest.post('/mallGroup/save', data), // 新增分组
  updateGroup: (data) => AppRequest.post('/mallGroup/update', data), // 修改分组
  deleteGroup: (data) => AppRequest.post('/mallGroup/delete', data), // 删除分组
  mallStatisticsSave: (data) => AppRequest.post('/mallStatistics/save', data), // 上报数据
  getMallManagerStoreMainManagementList: (data) => AppRequest.get('/yunip/api/myiplist', { params: data }), // 店铺主体管理列表
  getPaymentList: (data) => AppRequest.post('/mallAccountBill', data), // 货款对账列表
  getMallSite: (data) => AppRequest.post('/ddMallGoods/getMallList', data), // 店铺站点信息
  exchangeRateList: (data) => AppRequest.get('/exchangeRateList', { params: data }), // 获取汇率
  uploadPaymentList: (data) => AppRequest.post('/mallAccountBill/save', data), // 上报货款对账单

  // 异常公告------------------------------------------------------------------------
  getExceptionNoOrderIndex: (data) => AppRequest.get('/exceptionNoOrderIndex', { params: data }), // 签收包裹异常列表
  markPackageToMy: (data) => AppRequest.post('/signPackage/markPackageToMy', data), // 标记为我的
  applicationForreJection: (data) => AppRequest.post('/packageReturn/apply', data), // 申请退件
  getExceptionNoTrackingNumberIndex: (data) => AppRequest.get('/exceptionNoTrackingNumberIndex', { params: data }), // 订单列表
  updateOrderTrackingNumber: (data) => AppRequest.post('/order/updateOrderTrackingNumber', data), // 添加采购物流单号
  uploadTrackingNumber: (data) => AppRequest.post('/order/uploadOrderTrackingNumber', data), // 上报同步物流单号
  apply: (data) => AppRequest.post('/packageReturn/apply', data), // 异常公告签收包裹异常：申请退件
  getExceptionExpiredOrderIndex: (data) => AppRequest.get('/exceptionExpiredOrderIndex', { params: data }), // 异常公告即将过期订单列表
  getExceptionWarehouse: (data) => AppRequest.get('/exceptionWarehouse', { params: data }), // 异常公告仓库异常信息列表
  uploadDealExceptionStatus: (data) => AppRequest.post('/uploadDealExceptionStatus', data), // 异常公告仓库异常处理状态上报
  getOriginalTrackingNumberEmpty: (data) => AppRequest.get('/order/originalTrackingNumberEmpty', { params: data }), // 获取订单列表

  // 智能仓库-------------------------------------------------------------------
  getSignPackageList: (data) => AppRequest.post('/signPackage', data), // 获取包裹列表
  cancelReturn: (data) => AppRequest.post('/packageReturn/cancel', data), // 取消退件
  getReturnInfo: (data) => AppRequest.get('/packageReturn/info', { params: data }), // 退件详情
  getUnclaimedPackage: (data) => AppRequest.get('/signPackage/getUnclaimedPackage', { params: data }), // 失物招领列表
  getReturnManage: (data) => AppRequest.get('/packageReturn', { params: data }), // 获取退件管理列表
  getAbnormalPayment: (data) => AppRequest.get('/warehouseAbnormalPayment', { params: data }), // 获取退件管理列表
  colorLabelList: () => AppRequest.get('/colorLabel'), // 订单颜色标识列表
  orderPackage: (data) => AppRequest.post('/orderPackage', data), // 订单包裹列表
  refuseList: (data) => AppRequest.get('/interceptConfig', data), // 拒签列表
  markOrderNeedDeal: (data) => AppRequest.post('/orderPackage/markOrderNeedDeal', data), // 标记订单紧急处理
  setNoWait: (data) => AppRequest.post('/orderPackage/setNoWait', data), // 订单设置不等待子订单
  trackingNumberChangeOrder: (data) => AppRequest.post('/order/trackingNumberChangeOrder', data), // 采购物流单号变更
  noticeTodeliver: (data) => AppRequest.post('/orderPackage/changeOrderDeliveryStatus', data), // 通知仓库发货/暂停发货
  // getGoodsInfo: (data) => AppRequest.get('/goodsPackageCode/getGoodsInfoV2 ', data), // 订单包裹详情
  getGoodsInfo: (data) => AppRequest.get('/goodsPackageCode/getGoodsInfo ', data), // 订单包裹详情
  uploadExtService: (data) => AppRequest.post('/orderPackage/uploadExtService ', data), // 订单增值服务
  getNotHaveLogisticsInformations: () => AppRequest.get('/orderPackage/getNotHaveLogisticsInformations'), // 获取面单信息
  cancelSign: (data) => AppRequest.post('/interceptConfig/delete', data), // 取消拒收/签收信息
  packageSign: (data) => AppRequest.post('/interceptConfig/save', data), // 仓库包裹拒签/签收
  //  warehouseAddress: () => AppRequest.get('/warehouseAddress/userIndex'), // 获取仓库信息
  //  uploadWarehouseOrder: (data) => AppRequest.post('/warehouseAddress/uploadWarehouseOrder', data), // 获取仓库信息
  uploadWarehouseOrder: (data) => AppRequest.post('/warehouseAddress/uploadWarehouseOrder', data), // 推送订单至仓库
  setColorLabel: (data) => AppRequest.post(`/colorLabel/setOrder`, data), // 设置订单颜色标识
  getUserStore: (data) => AppRequest.get('/userStock/get', { params: data }), // 自有仓库列表
  insertUserGoods: (data) => AppRequest.post('/userStock/save', data), // 新增自有商品
  updataUserGoods: (data) => AppRequest.post('/userStock/update', data), // 编辑自有商品
  deleteUserGoods: (data) => AppRequest.post('/userStock/deleteGoods', data), // 删除自有商品
  setUserRemark: (data) => AppRequest.post('/orderPackage/setUserRemark', data), // 批量更新用户备注
  deleteUserSku: (data) => AppRequest.post('/userStock/deleteSkus', data), // 删除sku
  getMoney: (data) => AppRequest.get('/warehouseAbnormalPayment/getMoney', { params: data }), // 仓库工作台：获取赔付金额
  applyCompensation: (data) => AppRequest.post('/warehouseAbnormalPayment/apply', data), // 仓库工作台：申请赔付

  // 订单管理
  shotAmountRecord: (data) => AppRequest.get('/shotAmountRecord/index', data), // 采购价变更记录
  upLoadBuyAccount: (data) => AppRequest.post('/buyerAccount/save', data), // 上传买手号
  getBuyerList: (data) => AppRequest.get('/buyerAccount/index', data), // 下载买手号
  getOrderList: (data) => AppRequest.post('/order', data), // 获取订单列表
  checkAfterOrderSnStatus: (data) => AppRequest.get('/order/checkAfterOrderSnStatus', data), // 售后订单检测
  checkOrderSnStatus: (data) => AppRequest.get('/order/checkOrderSnStatus', { params: data }), // 正常订单检测
  uploadOrderSave: (data) => AppRequest.post('/order/saveOrder', data), // 上报接口--线上
  uploadOrderSaveTest: (data) => AppRequest.post('/order/uploadOrder', data), // 上报接口--测试
  uploadOrderAfterSale: (data) => AppRequest.post('/order/uploadAfter', data), // 售后订单上报接口--测试
  getColumnsConfig: (data) => AppRequest.get('/columnsConfig/index', data), // 获取表格列配置
  uploadColumnsConfig: (data) => AppRequest.post('/columnsConfig/save', data), // 上报表格列配置
  markGoodsIsOverseas: (data) => AppRequest.post('/order/markGoodsIsOverseas', data), // 标记海外商品
  setLocalRemark: (data) => AppRequest.post('/order/remark', data), // 标记本地备注
  batchUpdateShotOrder: (data) => AppRequest.post('/order/batchUpdateShotOrder', data), // 批量上传拍单信息
  pushOrderToStore: (data) => AppRequest.post('/warehouseAddress/uploadWarehouseOrder', data), // 推送订单至仓库
  getDetail: (data) => AppRequest.get('/orderAmountDetail/getDetail', { params: data }), // 订单列表: 订单金额详情
  getOrderSn: (data) => AppRequest.get('/order/getOrderSn', data), // 丢件查询
  aftermarket: (data) => AppRequest.post('/aftermarket', data), // 虾皮售后
  xzyAllIndex: (data) => AppRequest.get('/warehouseAddress/xzyAllIndex', data), // 仓库地址设置：获取星卓越地址
  xzyIndex: (data) => AppRequest.get('/warehouseAddress/xzyIndex', { params: data }), // 仓库地址设置：系统仓库获取
  adduserStore: (data) => AppRequest.post('/warehouseAddress/userStore', data), // 仓库地址设置：添加国内自有仓库地址
  updateOwnPhone: (data) => AppRequest.post('/warehouseAddress/updateOwnPhone', data), // 仓库地址设置：配置手机号码
  deleteOwnStore: (data) => AppRequest.post('/warehouseAddress/delete', data), // 仓库地址设置：删除自有仓库
  getBindMall: (data) => AppRequest.get('/warehouseAddress/getBindMall', { params: data }), // 仓库地址设置：绑定店铺、申请仓库的店铺列表
  addXzyStore: (data) => AppRequest.post('/warehouseAddress/xzyStore', data), // 仓库地址设置：新增系统仓库
  updateData: (data) => AppRequest.post('/warehouseAddress/update', data), // 仓库地址设置：修改绑定店铺、修改仓库自用地址
  cancelHomeOrder: (data) => AppRequest.post('/homeOutStockOrder/cancel', data), // 国内出库单: 删除

  getStockingForecastLists: (data) => AppRequest.get('/warehouse/stockingForecastLists', { params: data }), // 海外仓商品备货-预报单列表
  deleteForecast: (data) => AppRequest.post('/warehouse/stockingForecastDestroy', data), // 海外仓商品备货-删除预报单
  getOverseasWarehouse: (data) => AppRequest.get('/warehouse/getOverseasWarehouse', data), // 获取中转仓库和目标仓库列表(海外仓备货)
  updateShotStatus: (data) => AppRequest.post('/aftermarket/updateShotStatus', data), // 采购状态变更
  orderSaveRemark: (data) => AppRequest.post('/order/remark', data), // 添加店铺备注

  getsecondlist: (data) => AppRequest.get('/overseasTansferPackage/indexAll', { params: data }), // 获取二次销售列表

  // getBuyerList: (data) => AppRequest.get('/buyerAccount/index', data), // 下载买手号
  stockingForecastUpload: (data) => AppRequest.post('/warehouse/stockingForecastUpload', data), // 海外仓商品备货：发起商品预报
  getHomeWarehouse: (data) => AppRequest.get('/homeStockingForecast/index', { params: data }), // 国内仓备货预报单: 列表
  getWarehouseList: (data) => AppRequest.get('/homeStockingForecast/getWarehouseList', data), // 国内中转备货预报单: 获取国内仓库地址
  stockingHomeUpload: (data) => AppRequest.post('/homeStockingForecast/upload', data), // 国内中转备货预报单: 上报
  deleteHomeForecast: (data) => AppRequest.post('/homeStockingForecast/delete', data), // 国内中转备货预报单: 删除
  getOutOfStockList: (data) => AppRequest.get('/warehouse/outOfStockList', { params: data }), // 海外仓出库订单：列表
  addReissueStore: (data) => AppRequest.post('/addReissueStore', JSON.stringify(data)), // 海外仓补件：新增补件
  cancelOverseaOrder: (data) => AppRequest.post('/warehouse/cancelOverseaOrder', data), // 海外仓出库订单：批量取消订单
  deleteBuyAccount: (data) => AppRequest.post('/buyerAccount/destroy', data), // 删除买手号
  getUserWarehouse: (data) => AppRequest.get('/warehouseAddress/userIndex', { params: data }), // 仓库收货地址设置---获取列表
  getPurchaseLists: (data) => AppRequest.post('/getPurchaseLists', data), // 获取采购链接
  getOrderBySn: (data) => AppRequest.post('/order/getSimpleOrderInfo', data), // 根据订单号获取订单
  uploadOrderWarehourseShipAmount: (data) => AppRequest.post('/order/uploadOrderWarehourseShipAmount', data), // 上报仓库发货金额
  savePurchase: (data) => AppRequest.post('/purchase', data), // 上报采购链接
  getOrderTrackingNumber: (data) => AppRequest.get('/order/getOrderTrackingNumber', { params: data }), // 获取多物流单号列表
  getHomeOutStockOrder: (data) => AppRequest.get('/homeOutStockOrder/index', { params: data }), // 国内出库单: 列表
  homeOutStockOrder: (data) => AppRequest.post('/homeOutStockOrder/add', data), // 国内仓出库
  outOfStockAbroad: (data) => AppRequest.post('/warehouse/outOfStock', data), // 海外仓出库
  getLogisticsInformationBatch: (data) => AppRequest.post('/getLogisticsInformationBatch', data), // 获取面单信息
  getAsyncExportOrder: (data) => AppRequest.get('/getAsyncExportOrder', { params: data }), // 获取导出报表信息
  applyAsyncExportOrder: (data) => AppRequest.post('/applyAsyncExportOrder', { params: data }), // 点击导出报表信息
  saveUserConfig: (data) => AppRequest.post('/user/saveUserConfig', data), // 保存回复评论设置
  cancelSecondSale: (data) => AppRequest.post('/overseasTansferPackage/cancelSecondSale', data), // 取消二次销售数据
  uploadSecondSale: (data) => AppRequest.post('/overseasTansferPackage/uploadSecondSale', data), // 二次销售出库上报
  getsecondStroelist: (data) => AppRequest.post('/overseasTansferPackage/index', data), // 获取智能仓库二次销售列表
  getlupplementlist: (data) => AppRequest.get('/getReissueStoreList', { params: data }), // 获取海外仓补件列表
  cancelsupplement: (data) => AppRequest.post('/cancelReissueOrder', data), // 取消补件
  // 产品中心------------------------------------------------------------------------
  getproductlist: (data) => AppRequest.get('/product/list', { params: data }), // 获取产品列表
  deleteproduct: (data) => AppRequest.post('/product/delete', data), // 删除产品
  saveproduct: (data) => AppRequest.post('/product/save', data), // 保存产品
  getpddBuyerAccount: (data) => AppRequest.get('/pddBuyerAccount/index', { params: data }), // 拼多多买手号-列表 
  uplaodLazadaPaymentMethod: (data) => AppRequest.post('/order/uplaodShotOrderPaymentMethod',  data ),//上报lazada付款方式 
  uploadOrderLogisticsInfo: (data) => AppRequest.post('/order/uploadOrderLogisticsInfo',  data ),//上报shop平台的物流
  // 商品置顶
  topTaskadd: (data) => AppRequest.post('/topTask/add', data), // 创建任务
  topTask: (data) => AppRequest.get('/topTask/index', { params: data }), // 创建任务
  topTaskdel: (data) => AppRequest.post('/topTask/delete', data), // 删除任务
  uploadTopGood: (data) => AppRequest.post('/topTask/uploadTopGood', data), // 上报置顶商品
  uploadTopHistory: (data) => AppRequest.post('/topTask/uploadTopHistory', data), // 上报置顶商品历史记录
  getDeliveryList: (data) => AppRequest.post('/order/deliveryIndex',  data ),//发货管理列表
  updateShotOrder: (data) => AppRequest.post('/order/uploadShotOrderInfo', data), // 上传拍单信息 
  selfOutStock: (data) => AppRequest.post('/userStock/outStock', data), // 自有仓库出库  
  productOutStock: (data) => AppRequest.post('/userStock/productOutStock', data), //产品中心仓库出库  
  uploadGressProfit: (data) => AppRequest.post('/order/uploadGressProfit', data), // 修正含邮毛利  
  uploadOrderFaceSheetInfo: (data) => AppRequest.post('/order/uploadOrderFaceSheetInfo', data), // 上报面单信息  
  getEmptyTrackingNoOrder: (data) => AppRequest.get('/order/getEmptyTrackingNoOrder', { params: data }), // 获取需同步的平台物流订单



  // 标签列表---------------------------------------------------------------------------
  getLabels: (data) => AppRequest.get('/publishGoodsWindowConfig/getLabels', { params: data }), //编辑上新弹窗配置: 获取标签列表
  getLabel: (data) => AppRequest.get('/publishGoodsWindowConfig/get', { params: data }), //编辑上新弹窗配置: 获取单个(根据标签)
  saveLabel: (data) => AppRequest.post('/publishGoodsWindowConfig/save', data) //编辑上新弹窗配置: 保存配置
}
