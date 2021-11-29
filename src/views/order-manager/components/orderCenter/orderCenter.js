/*
 * @Author: your name
 * @Date: 2021-11-10 12:02:05
 * @LastEditTime: 2021-11-29 17:38:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\selectData.js
 */

import {
  rearg
} from "lodash"

//订单状态  1:待支付 2:待发货 3:已发货 4:已完成  5:取消中 6:已取消 7:退款/退货 8:确认签收 9:退款成功 10:退款失败  20:无售后订单
const orderStatusList = [{
    value: 1,
    label: '待支付'
  },
  {
    value: 2,
    label: '待发货'
  },
  {
    value: 3,
    label: '已发货'
  },
  {
    value: 4,
    label: '已完成'
  },
  {
    value: 5,
    label: '取消中'
  },
  {
    value: 6,
    label: '已取消'
  },
  {
    value: 7,
    label: '退款/退货'
  },
  {
    value: 8,
    label: '确认签收'
  },
  {
    value: 9,
    label: '退款成功'
  },
  {
    value: 10,
    label: '退款失败'
  },
  {
    value: 20,
    label: '无售后订单'
  }
]
function changeOrderStatus(val){
  let obj = orderStatusList.find(item=>item.value == val)
 return obj && obj.label || ''
}
//采购状态  1:待采购  3:采购成功  4:采购上家已发货 5:待支付 6:已完成  7:已取消 8:已申请退款 9:退款成功
const shotStatusList = [{
    value: 1,
    label: '待采购'
  },
  {
    value: 3,
    label: '采购成功'
  },
  {
    value: 4,
    label: '采购上家已发货'
  },
  {
    value: 5,
    label: '待支付'
  },
  {
    value: 6,
    label: '已完成'
  },
  {
    value: 7,
    label: '已取消'
  },
  {
    value: 8,
    label: '已申请退款'
  },
  {
    value: 9,
    label: '退款成功'
  }
]
const shotStatuForEdit = [{
    value: 1,
    label: '待采购'
  },
  {
    value: 3,
    label: '采购成功'
  },
  {
    value: 4,
    label: '采购上家已发货'
  },
  {
    value: 6,
    label: '已完成'
  },
]
//时间类型  timeType : 订单支付时间  shopeeDeliveryTime: 发货时间  sourceShippingTime:采购发货时间   shipByDate: 订单截止发货时间
const timeTypeList = [{
    value: 'payTime',
    label: '订单支付时间'
  },
  {
    value: 'shopeeDeliveryTime',
    label: '发货时间'
  },
  {
    value: 'sourceShippingTime',
    label: '采购发货时间'
  },
  {
    value: 'shipByDate',
    label: '订单截止发货时间'
  }
]
//查询类型  订单编号：orderSn ，采购物流单号：originalTrackingNumber，采购单号：patOrderSn，平台物流单号：trackingNo，
//备注：remark，商品货号：variationSku，买手号：buyAccount，支付账号:payAccount
const inputTypeList = [{
    value: 'orderSn',
    label: '订单编号'
  },
  {
    value: 'originalTrackingNumber',
    label: '采购物流单号'
  },
  {
    value: 'patOrderSn',
    label: '采购单号'
  },
  {
    value: 'trackingNo',
    label: '平台物流单号'
  },
  {
    value: 'remark',
    label: '备注'
  },
  {
    value: 'variationSku',
    label: '商品货号'
  },
  {
    value: 'buyAccount',
    label: '买手号'
  },
  {
    value: 'payAccount',
    label: '支付账号'
  }
]
//商品来源  1:拼多多 2:淘宝 3:天猫 5:自有 8:1688  9: Lazada   10:京喜  11:shopee  12:ALIEXPRESS 15:货老板海外  13: 天猫淘宝海外平台
const goodsSourceList = [{
    value: 1,
    label: '拼多多'
  },
  {
    value: 2,
    label: '淘宝'
  },
  {
    value: 3,
    label: '天猫'
  },
  {
    value: 5,
    label: '自有'
  },
  {
    value: 8,
    label: '1688'
  },
  {
    value: 9,
    label: 'Lazada'
  },
  {
    value: 10,
    label: '京喜'
  },
  {
    value: 11,
    label: 'shopee'
  },
  {
    value: 12,
    label: 'ALIEXPRESS'
  },
  {
    value: 13,
    label: '天猫淘宝海外平台'
  },
  {
    value: 15,
    label: '货老板海外'
  },
]
const goodsSourceListLink = [{
    value: "1",
    label: '拼多多'
  },
  {
    value: "2",
    label: '淘宝'
  },
  {
    value: "3",
    label: '天猫'
  },
  {
    value: "8",
    label: '1688'
  },
  {
    value: "9",
    label: 'Lazada'
  },
  {
    value: "10",
    label: '京喜'
  },
  {
    value: "11",
    label: 'shopee'
  },
  {
    value: "13",
    label: '天猫淘宝海外平台'
  },
]
//各站点物流
const site_mall = [{
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '7000',
    'ShipName': 'Standard Delivery - ส่งธรรมดาในประเทศ'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '7001',
    'ShipName': 'Standard Delivery Bulky - ส่งสินค้าขนาดใหญ่'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '70021',
    'ShipName': 'Kerry'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '70023',
    'ShipName': 'Best Express'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '70022',
    'ShipName': 'J&T Express'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '70020',
    'ShipName': 'DHL Domestic'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '70024',
    'ShipName': 'DHL Bulky'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '70016',
    'ShipName': 'Thailand Post - Registered Mail'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '70015',
    'ShipName': 'Thailand Post - EMS'
  },
  {
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '79003',
    'ShipName': 'Seller Own Fleet'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30005',
    'ShipName': '7-11'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30013',
    'ShipName': '蝦皮店到店'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30007',
    'ShipName': '萊爾富'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30006',
    'ShipName': '全家'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30001',
    'ShipName': '黑貓宅急配'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '30008',
    'ShipName': 'OK Mart'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '30010',
    'ShipName': '萊爾富-經濟包'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '39303',
    'ShipName': '中華郵政'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '39304',
    'ShipName': '賣家宅配'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '39312',
    'ShipName': '賣家宅配：大型/超重物品運送'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '39308',
    'ShipName': '賣家宅配：箱購'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '39013',
    'ShipName': '賣家宅配：虛擬物品'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '30012',
    'ShipName': '蝦皮宅配'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '20021',
    'ShipName': 'Ninja Van'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '20010',
    'ShipName': 'DHL eCommerce'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '20011',
    'ShipName': 'J&T Express'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '20007',
    'ShipName': 'Poslaju'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '2000',
    'ShipName': 'Standard Delivery'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '20023',
    'ShipName': 'City-Link Express'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '29910',
    'ShipName': 'Others (West Malaysia)'
  },
  {
    'Country': '马来站',
    'CountryCode': 'MY',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '29911',
    'ShipName': 'Others (East Malaysia)'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '40018',
    'ShipName': 'J&T Express'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '40012',
    'ShipName': 'XPost Integrated'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '40017',
    'ShipName': 'Ninja Van Own Packaging'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '40066',
    'ShipName': 'Standard Delivery'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '40021',
    'ShipName': 'GoGo Xpress'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '4000',
    'ShipName': 'Standard Local'
  },
  {
    'Country': '菲律宾站',
    'CountryCode': 'PH',
    'ShipId': '49900',
    'ShipName': 'Other Logistics Provider'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50016',
    'ShipName': 'VNPost Tiết Kiệm'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50018',
    'ShipName': 'J&T Express'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50020',
    'ShipName': 'GrabExpress'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50022',
    'ShipName': 'NowShip'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50023',
    'ShipName': 'Ninja Van'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50024',
    'ShipName': 'BEST Express'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50010',
    'ShipName': 'Viettel Post'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50011',
    'ShipName': 'Giao Hàng Nhanh'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50012',
    'ShipName': 'Giao Hàng Tiết Kiệm'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '50015',
    'ShipName': 'VNPost Nhanh'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '5001',
    'ShipName': 'Nhanh'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '5002',
    'ShipName': 'Tiết kiệm'
  },
  {
    'Country': '越南站',
    'CountryCode': 'VN',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '5000',
    'ShipName': 'Hoả Tốc'
  },
  {
    'Country': '新加坡站',
    'CountryCode': 'SG',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '18035',
    'ShipName': 'SpeedPost Economy'
  },
  {
    'Country': '新加坡站',
    'CountryCode': 'SG',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '10014',
    'ShipName': 'J&T Express'
  },
  {
    'Country': '新加坡站',
    'CountryCode': 'SG',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '10007',
    'ShipName': 'Ninja Van (Home Delivery)'
  },
  {
    'Country': '新加坡站',
    'CountryCode': 'SG',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '19100',
    'ShipName': 'Singpost - Normal Mail'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '8003',
    'ShipName': 'Reguler (Cashless)'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '8005',
    'ShipName': 'Hemat'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '8001',
    'ShipName': 'Same Day'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '8000',
    'ShipName': 'Instant'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '8002',
    'ShipName': 'Next Day'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '80008',
    'ShipName': 'JNE Trucking (JTR)'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '80031',
    'ShipName': 'Sicepat Gokil'
  },
  {
    'Country': '印尼站',
    'CountryCode': 'ID',
    'IsDeafult': true,
    'IsSelected': true,
    'ShipId': '80024',
    'ShipName': 'J&T Jemari'
  }
]

//同步状态列表 unpaid：未支付、toship：待发货、shipping：运送中、completed：已完成、cancelled：取消中、refund：退款中
//每隔4小时同步一次 手动同步
const syncStatusAll = [
  // { label: '未支付', value: 'unpaid'},
  {
    label: '待发货',
    value: 'toship'
  },
  {
    label: '运送中',
    value: 'shipping'
  },
  {
    label: '已完成',
    value: 'completed'
  },
  {
    label: '取消中',
    value: 'cancelled'
  },
  {
    label: '退款中',
    value: 'refund'
  },
]
const syncStatus = [
  // {
  //   label: '未支付',
  //   value: 'unpaid'
  // // },
  // {
  //   label: '待发货',
  //   value: 'toship'
  // },
  // {
  //   label: '运送中',
  //   value: 'shipping'
  // },
  // {
  //   label: '已完成',
  //   value: 'completed'
  // },
  // {
  //   label: '取消中',
  //   value: 'cancelled'
  // }, //cancelled  //cancelled_all
  {
    label: '退款中',
    value: 'refund'
  },
]
//货物类型
const packageType = [
  {
    label:"普货",
    value:1
  },
  {
    label:"敏感货",
    value:2
  },
  {
    label:"商检货",
    value:3
  },
]
function changePackageType(val){
  let obj = packageType.find(item=>item.value == val)
 return obj && obj.label || '普货'
}
//仓库发货状态 //1：待入库 2：等待包裹  3: 紧急入库  4: 待出库 5: 已出库 6: 已完成 7:订单作废 8:暂停发货 9:异常
const deliveryStatus  = [
  {
    label:"待入库",
    value:1
  },
  {
    label:"等待包裹",
    value:2
  },
  {
    label:"紧急入库",
    value:3
  },
  {
    label:"待出库",
    value:4
  },
  {
    label:"已出库",
    value:5
  },
  {
    label:"已完成",
    value:6
  },
  {
    label:"订单作废",
    value:7
  },
  {
    label:"暂停发货",
    value:8
  },
  {
    label:"异常",
    value:9
  },
]
function changeDeliveryStatus(val){
  let obj = deliveryStatus.find(item=>item.value == val)
 return obj && obj.label || ''
}

//每隔30分钟同步一次
const statusListSecond = [{
    label: '待发货',
    value: 'toship'
  },
  {
    label: '取消中',
    value: 'cancelled'
  },
  {
    label: '退款中',
    value: 'refund'
  }
]

//每隔60分钟同步一次
const statusListThird = [{
    label: '运送中',
    value: 'shipping'
  },
  {
    label: '已完成',
    value: 'completed'
  }
]

function siteShip(country) {
  let arr = site_mall.filter(item => {
    return item.Country === country
  })
  return arr
}

function sourceName(val) {
  let name = ''
  let info = goodsSourceList.find(item => {
    return item.value == val
  })
  name = info ? info.label : ''
  return name
}

function orderStatusName(val) {
  let name = ''
  let info = orderStatusList.find(item => {
    return item.value == val
  })
  name = info ? info.label : ''
  return name
}

//syncType： 订单同步类型：auto:自动(后台自动同步订单)     manual：手动同步（页面点击同步）   single ：单个订单同步（选择订单列表单个订单进行同步）
const upLoadType = [{
    label: '自动',
    value: 'auto'
  },
  {
    label: '手动同步',
    value: 'manual'
  },
  {
    label: '单个同步',
    value: 'single'
  }
]
//配置列表
const columnData = [{
    column_header: '站点',
    is_show: 1,
    first_column_is_checkbox: -1
  },
  {
    column_header: '店铺分组',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '店铺名称',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购绑定仓库',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '颜色标识',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '标识名称',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单编号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单创建时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '发货状态',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '发货时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购类型',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '查看采购地址',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '是否可二次销售',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品ID',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品创建时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品图片',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品单价',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品数量',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品标题',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '搜同款',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品类目',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '规格编号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品规格',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商品货号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '是否为海外仓商品',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '买家付款金额',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单收入',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单收入(RMB)',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '实际总邮费',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '卖家补贴邮费',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购价',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购价(RMB)',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '仓库发货金额',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '仓库发货金额(RMB)',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '含邮费毛利',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '含邮费毛利(RMB)',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '最终毛利',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '最终毛利(RMB)',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '付款账号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购账号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '账单明细',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '拍单',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购状态',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购订单号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购付款方式',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '平台付款方式',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购物流公司',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购物流单号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购发货时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '采购物流轨迹',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '商户订单号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '运输方式',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '货物类型',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '虾皮物流',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '虾皮物流单号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '虾皮物流轨迹',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '截止发货时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '仓库发货状态',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '入库时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '出库时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '本地备注',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: 'shopee备注',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: 'shopee备注更新时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '买家姓名',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '买家地址',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '手机号',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单支付时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单轨迹',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '订单更新时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '操作',
    is_show: 1,
    first_column_is_checkbox: -1
  },
]

const platformLinkList = [{
    purchase_platform_id: 1,
    purchase_url: 'http://mobile.yangkeduo.com/goods.html?goods_id=',
    purchase_url_all: 'http://mobile.yangkeduo.com/goods.html?goods_id=2459375892',
    label: '拼多多'
  },
  {
    purchase_platform_id: 2,
    purchase_url: 'https://item.taobao.com/item.htm?id=',
    purchase_url_all: 'https://item.taobao.com/item.htm?id=561870475654',
    label: '淘宝'
  },
  {
    purchase_platform_id: 3,
    purchase_url: 'https://detail.tmall.com/item.htm?id=',
    purchase_url_all: 'https://detail.tmall.com/item.htm?id=20601016004',
    label: '天猫'
  },
  {
    purchase_platform_id: 8,
    purchase_url: 'https://detail.1688.com/offer/',
    purchase_url_all: 'https://detail.1688.com/offer/635819118296.html',
    label: '1688'
  },
  {
    purchase_platform_id: 10,
    purchase_url: 'https://m.jingxi.com/item/view?sku=',
    purchase_url_all: 'https://m.jingxi.com/item/view?sku=20601016004',
    label: '京喜'
  },
  {
    purchase_platform_id: 9,
    purchase_url: 'https://www.lazada.com.my/products/i',
    purchase_url_all: 'https://www.lazada.com.my/products/i1143594827.html',
    label: 'lazada'
  },
  {
    purchase_platform_id: 11,
    purchase_url: 'https://xiapi.xiapibuy.com/product/60119183/',
    purchase_url_all: 'https://xiapi.xiapibuy.com/product/60119183/2677842767',
    label: 'shopee'
  },
  {
    purchase_platform_id: 13,
    purchase_url: 'https://distributor.taobao.global/apps/product/detail?mpId=',
    purchase_url_all: 'https://distributor.taobao.global/apps/product/detail?mpId=60003345',
    label: '天猫淘宝海外平台'
  },
]
const warehouseType = [{
    label: "国内中转仓",
    value: 0
  },
  {
    label: "存储转运仓",
    value: 1
  },
  {
    label: "海外存储仓",
    value: 2
  },
  {
    label: "海外中转仓",
    value: 3
  }
]
const lazadaUrlList =  {
  "TH" : "https://acs-m.lazada.co.th",
  "MY" : "https://acs-m.lazada.com.my",
  "VN" : "https://acs-m.lazada.vn",
  "ID" : "https://acs-m.lazada.co.id",
  "PH" : "https://acs-m.lazada.com.ph",
  "SG" : "https://acs-m.lazada.sg",
};
const forbidData = [
  "爆炸性、易燃性、腐蚀性、放射性和毒性等危险物品",
  "货币、支票、有价证券、有价金属、人造钻石、珠宝或其他贵重物品",
  "形仿武器、弹药",
  "燃料矿物、矿物油及其蒸馏产品、可燃易燃性气体、液体、固体，打火机，火柴",
  "沥青矿物；矿物蜡；润滑油、油漆；指甲油、指甲胶",
  "药物（麻醉药物、精神药物）、急救箱",
  "淫秽物品、性用品",
  "活体动、植物",
  "种子、水果、食品、茶叶",
  "液体、粉末，毛皮、皮肤",
  "烟、酒",
  "仿牌货物",
  "发光、发热、烟花类物品",
  "含马达、发动机",
  "磁类货物",
  "纯电池和配套电池货物",
  "反动书籍、报刊、杂志、光碟",
  "证件：身份证、护照、驾照等",
  "压缩类气体；以及其他航司及目的地海关及法律禁运货限运的物品"
]
const forbidTHData = [
  "食品",
  "食材",
  "酱料",
  "零食",
  "纯电池",
  "移动电源",
  "电动车",
  "航模飞机",
  "台式主机",
  "美容美发",
  "医疗产品",
  "清洁剂",
  "胶水",
  "油漆",
  "摩托车（头盔，轮胎）",
  "化妆品（成品无牌）",
  "卷尺",
  "蚊香",
  "肥皂",
  "洗头水",
  "沐浴露",
  "牙膏",
  "足膜足贴",
  "运动健身贴",
  "仿产地",
  "摩托车排气管",
  "特殊危险敏感贵重货物",
  "手机及平板",
  "性用品（药品，情趣用品）",
  "电子烟",
  "赌具",
  "香烟",
  "酒",
  "古董"
]
const shotOrderPlatform = {
  /// 淘宝
  TaoBao : 0,
  PinDuoduo : 1,
  JingDong : 2,
  JingXi : 3,
  HYJ : 4,
  Alibaba : 5,
  YunPaiDan : 6,
  Lazada : 7,
  Shopee : 8,
  CrossBorder : 9,
  OwnPlatform : 10,
  PpxiasGhpt : 11,
  AliExpressPlatform : 12
}
function  changeBuyerType(type) {
  switch (type) {
  case 1:
    return shotOrderPlatform.PinDuoduo
  case 2:
  case 3:
    return shotOrderPlatform.TaoBao
  case 4:
    return shotOrderPlatform.JingDong
  case 8:
    return shotOrderPlatform.Alibaba
  case 9:
    return shotOrderPlatform.Lazada
  case 10:
    return shotOrderPlatform.JingXi
  case 11:
    return shotOrderPlatform.Shopee
  case 13:
    return shotOrderPlatform.CrossBorder
  default:
    return shotOrderPlatform.PinDuoduo
}
}
export {
  orderStatusList,
  shotStatusList,
  timeTypeList,
  inputTypeList,
  goodsSourceList,
  syncStatusAll,
  syncStatus,
  statusListSecond,
  statusListThird,
  site_mall,
  shotStatuForEdit,
  warehouseType,
  columnData,
  goodsSourceListLink,
  platformLinkList,
  forbidData,
  forbidTHData,
  packageType,
  lazadaUrlList,
  changeBuyerType,
  changeOrderStatus,
  changeDeliveryStatus,
  changePackageType,
  sourceName,
  orderStatusName,
  siteShip
}