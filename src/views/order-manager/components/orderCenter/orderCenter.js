/*
 * @Author: your name
 * @Date: 2021-11-10 12:02:05
 * @LastEditTime: 2021-11-15 15:58:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\selectData.js
 */

import { rearg } from "lodash"

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
//时间类型  timeType : 订单支付时间  shopeeDeliveryTime: 发货时间  sourceShippingTime:采购发货时间   shipByDate: 订单截止发货时间
const timeTypeList = [{
    value: 'timeType',
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
  // { label: '未支付', value: 'unpaid'},
  // {
  //   label: '待发货',
  //   value: 'toship'
  // },
  // {
  //   label: '运送中',
  //   value: 'shipping'
  // },
  {
    label: '已完成',
    value: 'completed'
  },
  // {
  //   label: '取消中',
  //   value: 'cancelled'
  // }, //cancelled  //cancelled_all
  // {
  //   label: '退款中',
  //   value: 'refund'
  // },
]

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
  siteShip
}