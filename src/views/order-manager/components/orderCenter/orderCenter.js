// 订单状态  1:待支付 2:待发货 3:已发货 4:已完成  5:取消中 6:已取消 7:退款/退货 8:确认签收 9:退款成功 10:退款失败  20:无售后订单
const orderStatusList = [{
  value: 1,
  label: '待支付',
  color: '#000'
},
  {
    value: 2,
    label: '待发货',
    color: '#FF0000'
  },
  {
    value: 3,
    label: '已发货',
    color: '#32CD32'
  },
  {
    value: 4,
    label: '已完成',
    color: '#32CD32'
  },
  {
    value: 5,
    label: '取消中',
    color: '#000'
  },
  {
    value: 6,
    label: '已取消',
    color: '#000'
  },
  {
    value: 7,
    label: '退款/退货',
    color: '#FF0000'
  },
  {
    value: 8,
    label: '确认签收',
    color: '#000'
  },
  {
    value: 9,
    label: '退款成功',
    color: '#32CD32'
  },
  {
    value: 10,
    label: '退款失败',
    color: '#FF0000'
  },
  {
    value: 20,
    label: '无售后订单',
    color: '#000'
  }
]

function changeOrderStatus(val, type) {
  const obj = orderStatusList.find(item => item.value == val)
  if (type === 'color') {
    return obj && obj.color || '#000'
  }
  return obj && obj.label || ''
}

// 采购状态  1:待采购  3:采购成功  4:上家已发货 5:待支付 6:已完成  7:已取消 8:已申请退款 9:退款成功
const shotStatusList = [{
  value: 1,
  label: '待采购',
  color: '#FF0000'
},
  {
    value: 3,
    label: '采购成功',
    color: '#32CD32'
  },
  {
    value: 4,
    label: '上家已发货',
    color: '#000'
  },
  {
    value: 5,
    label: '待支付',
    color: '#000'
  },
  {
    value: 6,
    label: '已完成',
    color: '#32CD32'
  },
  {
    value: 7,
    label: '已取消',
    color: '#000'
  },
  {
    value: 8,
    label: '已申请退款',
    color: '#FF0000'
  },
  {
    value: 9,
    label: '退款成功',
    color: '#000'
  }
]

function changeShotStatus(val, type) {
  const obj = shotStatusList.find(item => item.value == val)
  if (type === 'color') {
    return obj && obj.color || '#000'
  }
  return obj && obj.label || ''
}

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
    label: '上家已发货'
  },
  {
    value: 6,
    label: '已完成'
  }
]
// 时间类型  timeType : 订单支付时间  shopeeDeliveryTime: 发货时间  sourceShippingTime:采购发货时间   shipByDate: 订单截止发货时间
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
// 查询类型  订单编号：orderSn ，采购物流单号：originalTrackingNumber，采购单号：patOrderSn，平台物流单号：trackingNo，
// 备注：remark，商品货号：variationSku，买手号：buyAccount，支付账号:payAccount
const inputTypeList = [{
  value: 'orderSn',
  label: '订单编号'
},
  {
    value: 'variationId',
    label: '规格编号'
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
// 商品来源  1:拼多多 2:淘宝 3:天猫 5:自有 8:1688  9: Lazada   10:京喜  11:shopee  12:ALIEXPRESS 15:货老板海外  13: 天猫淘宝海外平台
const goodsSourceList = [
  {
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
  {
    value: 16,
    label: 'tokopedia'
  }
]
const goodsSourceNameList = {
  1: '拼多多',
  2: '淘宝',
  3: '天猫',
  4: '京东',
  5: '自有产品',
  6: '皮皮虾供货平台',
  7: '货源甲',
  8: '1688',
  9: 'lazada',
  10: '京喜',
  11: 'Shopee',
  12: '速卖通',
  13: '天猫淘宝海外平台',
  15: '货老板云仓',
  // 16: 'tokopedia'
}
const goodsSourceListLink = [
  {
  value: '1',
  label: '拼多多'
},
  {
    value: '2',
    label: '淘宝'
  },
  {
    value: '3',
    label: '天猫'
  },
  {
    value: '8',
    label: '1688'
  },
  {
    value: '9',
    label: 'Lazada'
  },
  {
    value: '10',
    label: '京喜'
  },
  {
    value: '11',
    label: 'shopee'
  },
  {
    value: '13',
    label: '天猫淘宝海外平台'
  }
]
// 各站点物流
const site_mall = [
  {
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
    'Country': '泰国站',
    'CountryCode': 'TH',
    'IsDeafult': false,
    'IsSelected': false,
    'ShipId': '79707',
    'ShipName': 'ผู้ขายทำการจัดส่งให้'
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
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '30014',
    'ShipName': 'OK Mart'
  },
  {
    'Country': '台湾站',
    'CountryCode': 'TW',
    'IsDeafult': true,
    'IsSelected': false,
    'ShipId': '30015',
    'ShipName': '蝦皮店到店'
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

// 同步状态列表 unpaid：未支付、toship：待发货、shipping：运送中、completed：已完成、cancelled：取消中、refund：退款中
// 每隔4小时同步一次 手动同步
const syncStatusAll = [
  // {
  //   label: '全部',
  //   value: 'all'
  // },
  {
    label: '待发货',
    value: 'toship'
  },
  {
    label: '已发货',
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
    label: '退货/退款',
    value: 'refund'
  }
]
const syncStatusFirst = [
  {
    label: '全部',
    value: 'all'
  }
]
const syncStatus = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '待发货',
    value: 'toship'
  },
  {
    label: '退货/退款',
    value: 'refund'
  }
]
// 货物类型
const packageType = [
  {
    label: '普货',
    value: 1
  },
  {
    label: '敏感货',
    value: 2
  },
  {
    label: '商检货',
    value: 3
  }
]

function changePackageType(val) {
  const obj = packageType.find(item => item.value == val)
  return obj && obj.label || '普货'
}

// 仓库发货状态 //1：待入库 2：等待包裹  3: 紧急入库  4: 待出库 5: 已出库 6: 已完成 7:订单作废 8:暂停发货 9:异常
const deliveryStatus = [
  {
    label: '待入库',
    value: 1
  },
  {
    label: '等待包裹',
    value: 2
  },
  {
    label: '紧急入库',
    value: 3
  },
  {
    label: '待出库',
    value: 4
  },
  {
    label: '已出库',
    value: 5
  },
  {
    label: '已完成',
    value: 6
  },
  {
    label: '订单作废',
    value: 7
  },
  {
    label: '暂停发货',
    value: 8
  },
  {
    label: '异常',
    value: 9
  }
]

function changeDeliveryStatus(val) {
  const obj = deliveryStatus.find(item => item.value == val)
  return obj && obj.label || ''
}

// 每隔30分钟同步一次
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

// 每隔60分钟同步一次
const statusListThird = [{
  label: '已发货',
  value: 'shipping'
},
  {
    label: '已完成',
    value: 'completed'
  }
]
const statusAfterList = [{
  label: '取消中',
  value: 'cancelled'
},
  {
    label: '退款中',
    value: 'refund'
  }
]

// 物流方式
function siteShip(country) {
  const arr = site_mall.filter(item => {
    return item.CountryCode === country
  })
  return arr
}

// 采购平台
function sourceName(val) {
  let name = ''
  const info = goodsSourceList.find(item => {
    return item.value == val
  })
  name = info ? info.label : ''
  return name
}

// 发货状态
function orderStatusName(val) {
  let name = ''
  const info = orderStatusList.find(item => {
    return item.value == val
  })
  name = info ? info.label : ''
  return name
}

// syncType： 订单同步类型：auto:自动(后台自动同步订单)     manual：手动同步（页面点击同步）   single ：单个订单同步（选择订单列表单个订单进行同步）
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
const buyPayMethod = {
  0: '',
  1: '货到付款',
  2: '信用卡/借记卡',
  3: 'lazada钱包',
  4: 'Credit',
  5: 'Gcash e-Wallet',
  6: 'ShopeePay',
  20: '未知，请联系客服'
}

const platformPayMethod = {
  'ID': [{
    label: '全部',
    value: ''
  },
    {
      label: 'Credit/Debit Card',
      value: '1'
    }, {
      label: 'Indomaret',
      value: '13'
    }, {
      label: 'Bank Transfer',
      value: '2'
    }, {
      label: 'SPayLater',
      value: '24'
    },
    {
      label: 'ShopeePay',
      value: '27'
    },
    {
      label: 'Online Payment',
      value: '41'
    }, {
      label: 'COD',
      value: '6'
    }
  ],
  'MY': [{
    label: '全部',
    value: ''
  }, {
    label: '信用卡',
    value: '1'
  }, {
    label: '银行转账',
    value: '2'
  }, {
    label: '卖家余额',
    value: '20'
  }, {
    label: 'ShopeePay',
    value: '27'
  }, {
    label: '在7-11的现金支付',
    value: '34'
  }, {
    label: 'ibanking',
    value: '37'
  }, {
    label: 'VISA金融卡',
    value: '4'
  }],
  'PH': [{
    label: '全部',
    value: ''
  },
    {
      label: 'Credit',
      value: '1'
    },
    {
      label: 'Bank Transfer',
      value: '2'
    }, {
      label: 'ShopeePay',
      value: '27'
    }, {
      label: 'Debit Card',
      value: '4'
    }, {
      label: 'COD',
      value: '6'
    }
  ],
  'SG': [{
    label: '全部',
    value: ''
  },
    {
      label: 'Credit/Debit Card',
      value: '1'
    },
    {
      label: 'Bank Transfer',
      value: '2'
    }, {
      label: 'ShopeePay',
      value: '27'
    }, {
      label: 'Online Payment',
      value: '49'
    }
  ],
  'TH': [{
    label: '全部',
    value: ''
  }, {
    label: 'Credit',
    value: '18'
  }, {
    label: 'Bank Transfe',
    value: '2'
  }, {
    label: 'SPayLater',
    value: '24'
  }, {
    label: 'AirPay',
    value: '28'
  }, {
    label: 'airpay_giro',
    value: '30'
  }, {
    label: 'Debit Card',
    value: '4'
  }, {
    label: 'free with promotion',
    value: '5'
  },
    {
      label: 'Online Payment',
      value: '50'
    },
    {
      label: 'COD',
      value: '6'
    }
  ],
  'TW': [{
    label: '全部',
    value: ''
  }, {
    label: '信用卡',
    value: '1'
  }, {
    label: '银行转账',
    value: '2'
  }, {
    label: '虾皮钱包',
    value: '20'
  }, {
    label: '信用卡分期付款',
    value: '23'
  }, {
    label: 'SPayLater',
    value: '24'
  }, {
    label: '接口支付Local',
    value: '33'
  }, {
    label: '接口支付Cross',
    value: '36'
  },
    {
      label: '撤销的款项',
      value: '5'
    },
    {
      label: '货到付款',
      value: '6'
    }
  ],
  'VN': [{
    label: '全部',
    value: ''
  },
    {
      label: 'Credit/Debit Card',
      value: '1'
    },
    {
      label: 'Seller Balance',
      value: '20'
    }, {
      label: 'AirPay',
      value: '28'
    }, {
      label: 'airpay_giro',
      value: '30'
    }, {
      label: 'COD',
      value: '6'
    }
  ]
}

function changePlatformPayMethod(country, key) {
  let str = ''
  const arr = platformPayMethod[country] || []
  if (arr.length) {
    const res = arr.find(item => item.value == key)
    str = res ? res.label : ''
  }
  return str
}

// 配置列表
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
  },
// {
//   column_header: '标识名称',
//   is_show: 1,
//   first_column_is_checkbox: -1
// },
  {
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
  },
  {
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
    column_header: '仓库发货金额',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '含邮费毛利',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '最终毛利',
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
  },
  {
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
  },
//  {
//   column_header: '采购物流轨迹',
//   is_show: 1,
//   first_column_is_checkbox: -1
// },
  {
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
  },
  {
    column_header: '订单更新时间',
    is_show: 1,
    first_column_is_checkbox: -1
  }, {
    column_header: '操作',
    is_show: 1,
    first_column_is_checkbox: -1
  }
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
  // {
  //   purchase_platform_id: 16,
  //   purchase_url: 'https://www.tokopedia.com/velove/',
  //   purchase_url_all: 'https://www.tokopedia.com/velove/v856-malta-dress-3-color-2-size-sage-green-s?extParam=ivf%3Dfalse',
  //   label: 'tokopedia'
  // }
]
const warehouseType = [{
  label: '国内中转仓',
  value: 0
},
  {
    label: '存储转运仓',
    value: 1
  },
  {
    label: '海外存储仓',
    value: 2
  },
  {
    label: '海外中转仓',
    value: 3
  }
]
const lazadaUrlList = {
  'TH': 'https://acs-m.lazada.co.th',
  'MY': 'https://acs-m.lazada.com.my',
  'VN': 'https://acs-m.lazada.vn',
  'ID': 'https://acs-m.lazada.co.id',
  'PH': 'https://acs-m.lazada.com.ph',
  'SG': 'https://acs-m.lazada.sg'
}
const lazadaBuyLinkList = [
  'https://www.lazada.com.my',
  'https://www.lazada.vn',
  'https://www.lazada.co.id',
  'https://www.lazada.com.ph',
  'http://www.lazada.co.th',
  'https://www.lazada.sg'
]
const lazadaBuyLinkObj = {
  'my': 'https://www.lazada.com.my',
  'vn': 'https://www.lazada.vn',
  'id': 'https://www.lazada.co.id',
  'ph': 'https://www.lazada.com.ph',
  'th': 'http://www.lazada.co.th',
  'sg': 'https://www.lazada.sg'
}
const forbidData = [
  '爆炸性、易燃性、腐蚀性、放射性和毒性等危险物品',
  '货币、支票、有价证券、有价金属、人造钻石、珠宝或其他贵重物品',
  '形仿武器、弹药',
  '燃料矿物、矿物油及其蒸馏产品、可燃易燃性气体、液体、固体，打火机，火柴',
  '沥青矿物；矿物蜡；润滑油、油漆；指甲油、指甲胶',
  '药物（麻醉药物、精神药物）、急救箱',
  '淫秽物品、性用品',
  '活体动、植物',
  '种子、水果、食品、茶叶',
  '液体、粉末，毛皮、皮肤',
  '烟、酒',
  '仿牌货物',
  '发光、发热、烟花类物品',
  '含马达、发动机',
  '磁类货物',
  '纯电池和配套电池货物',
  '反动书籍、报刊、杂志、光碟',
  '证件：身份证、护照、驾照等',
  '压缩类气体；以及其他航司及目的地海关及法律禁运货限运的物品'
]
const forbidTHData = [
  '食品',
  '食材',
  '酱料',
  '零食',
  '纯电池',
  '移动电源',
  '电动车',
  '航模飞机',
  '台式主机',
  '美容美发',
  '医疗产品',
  '清洁剂',
  '胶水',
  '油漆',
  '摩托车（头盔，轮胎）',
  '化妆品（成品无牌）',
  '卷尺',
  '蚊香',
  '肥皂',
  '洗头水',
  '沐浴露',
  '牙膏',
  '足膜足贴',
  '运动健身贴',
  '仿产地',
  '摩托车排气管',
  '特殊危险敏感贵重货物',
  '手机及平板',
  '性用品（药品，情趣用品）',
  '电子烟',
  '赌具',
  '香烟',
  '酒',
  '古董'
]
const colorList = [{
  'id': 1,
  'uid': 974,
  'color_name': 'red',
  'color': '#FF0000',
  'name': '标识一',
  'status': 1,
  'created_at': '2020-06-30 11:12:54',
  'updated_at': '2020-07-01 09:59:16',
  'deleted_at': null
}, {
  'id': 2,
  'uid': 974,
  'color_name': '水绿色',
  'color': '#00FFFF',
  'name': '标识二',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-11-24 15:19:12',
  'deleted_at': null
}, {
  'id': 3,
  'uid': 974,
  'color_name': '绿色',
  'color': '#008000',
  'name': '标识三',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 4,
  'uid': 974,
  'color_name': '蓝色',
  'color': '#0000FF',
  'name': '标识四',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 5,
  'uid': 974,
  'color_name': '紫色',
  'color': '#800080',
  'name': '标识五',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 6,
  'uid': 974,
  'color_name': '棕色',
  'color': '#8B4513',
  'name': '标识六',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 7,
  'uid': 974,
  'color_name': '橙色',
  'color': '#FF8C00',
  'name': '标识七',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 8,
  'uid': 974,
  'color_name': '黑色',
  'color': '#000000',
  'name': '标识八',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 9,
  'uid': 974,
  'color_name': '粉红',
  'color': '#FFC0CB',
  'name': '标识九',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 10,
  'uid': 974,
  'color_name': '橄榄绿',
  'color': '#808000',
  'name': '标识十',
  'status': 1,
  'created_at': '2020-06-30 11:12:55',
  'updated_at': '2020-06-30 11:12:55',
  'deleted_at': null
}, {
  'id': 41,
  'uid': 974,
  'color_name': '杜若色',
  'color': '#426ab3',
  'name': '标识十一',
  'status': 1,
  'created_at': '2021-06-07 14:44:42',
  'updated_at': '2021-06-07 14:44:42',
  'deleted_at': null
}, {
  'id': 42,
  'uid': 974,
  'color_name': '黄色',
  'color': '#ffd400',
  'name': '标识十二',
  'status': 1,
  'created_at': '2021-06-07 14:44:42',
  'updated_at': '2021-06-07 14:44:42',
  'deleted_at': null
}, {
  'id': 43,
  'uid': 974,
  'color_name': '踯躅色',
  'color': '#ef5b9c',
  'name': '标识十三',
  'status': 1,
  'created_at': '2021-06-07 14:44:42',
  'updated_at': '2021-06-07 14:44:42',
  'deleted_at': null
}, {
  'id': 44,
  'uid': 974,
  'color_name': '若绿',
  'color': '#7fb80e',
  'name': '标识十四',
  'status': 1,
  'created_at': '2021-06-07 14:44:42',
  'updated_at': '2021-06-07 14:44:42',
  'deleted_at': null
}, {
  'id': 45,
  'uid': 974,
  'color_name': '群青色',
  'color': '#4e72b8',
  'name': '标识十五',
  'status': 1,
  'created_at': '2021-06-07 14:44:42',
  'updated_at': '2021-06-07 14:44:42',
  'deleted_at': null
}
]
const muidList = [
  691349,
  767407,
  853140,
  451548,
  445241,
  934995,
  771359,
  856015,
  763370,
  767726,
  897859,
  812310,
  765144,
  758559,
  656857,
  763364,
  696397,
  470663,
  388573,
  758617,
  775960,
  804446,
  461073,
  773551,
  633156,
  759607,
  970302,
  799955,
  418355,
  556874,
  819973,
  927291,
  533951,
  506230,
  644635,
  705364,
  876878,
  634413,
  844185,
  723991,
  959417,
  722420,
  804708,
  629155,
  578605,
  723816,
  340542,
  730252,
  630890,
  679844,
  685435,
  321180,
  870749,
  675076,
  513891,
  608922,
  768604,
  841501,
  767940,
  625654,
  740854,
  917232,
  758903,
  845202,
  772766,
  932106,
  483429,
  835141,
  774788,
  683157,
  213791,
  658855,
  736337,
  771476,
  759496,
  658448,
  928819,
  774928,
  634412,
  475003,
  719555,
  314960,
  764894,
  448611,
  510027,
  789299,
  701719,
  627576,
  758906,
  354965,
  457328,
  674962,
  622671,
  621296,
  758445,
  798642,
  806155,
  249849,
  960376,
  470706,
  249876,
  697122,
  678270,
  774854,
  500507,
  837294,
  708457,
  622798,
  877459,
  664700,
  767711,
  675048,
  519432,
  845194,
  741612,
  730170,
  601903,
  708069,
  747186,
  489751,
  343385,
  739764,
  841586,
  569782,
  282439,
  774547,
  792587,
  749094,
  559349,
  716810,
  696578,
  576389,
  567189,
  764885,
  408380,
  760633,
  856684,
  925507,
  456448,
  843596,
  923436,
  653846,
  747795,
  764993,
  745451,
  566537,
  523116,
  598085,
  749284,
  848867,
  658809,
  625804,
  798774,
  553498,
  856868,
  489140,
  471391,
  771293,
  905030,
  770933,
  642432,
  806806,
  606214,
  507400,
  415046,
  534328,
  512136,
  661533,
  676053,
  767034,
  585583,
  944976,
  775914,
  250625,
  870067,
  856545,
  549011,
  912120,
  532935,
  574178,
  686718,
  522388,
  474837,
  475862,
  530764,
  790064,
  564366,
  878639,
  818759,
  526594,
  586080,
  352133,
  707888,
  331040,
  754692,
  946561,
  878897,
  836674,
  299918,
  833603,
  638537,
  904845,
  490125,
  805781,
  905873,
  736766,
  514036,
  833971,
  755758,
  773548,
  249851,
  917864,
  880719,
  625818,
  627205,
  286017,
  550470,
  546787,
  977063,
  885923,
  381866,
  716749,
  897837,
  646077,
  855672,
  933695,
  771167,
  810755,
  358247,
  909978,
  687229,
  639339,
  966291,
  746204,
  743129,
  794569,
  303983,
  764855,
  925509,
  857113,
  523020,
  633415,
  689514,
  822047,
  494140,
  775824,
  678059,
  498329,
  569878,
  773119,
  931255,
  933366,
  845200,
  790538,
  774412,
  741199,
  844172,
  704542,
  686632,
  370498,
  827374,
  886691,
  914101,
  708380,
  618899,
  793693,
  723456,
  881281,
  687198
]
const shotOrderPlatform = {
  // / 淘宝
  TaoBao: 0,
  PinDuoduo: 1,
  JingDong: 2,
  JingXi: 3,
  HYJ: 4,
  Alibaba: 5,
  YunPaiDan: 6,
  Lazada: 7,
  Shopee: 8,
  CrossBorder: 9,
  OwnPlatform: 10,
  PpxiasGhpt: 11,
  AliExpressPlatform: 12
}

function changeBuyerType(type) {
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

function getTransportType(val) {
  val = Number(val) || 0
  return val === 1 && '空运' || val === 2 && '陆运' || ''
}

export {
  orderStatusList,
  shotStatusList,
  timeTypeList,
  inputTypeList,
  goodsSourceList,
  goodsSourceListLink,
  goodsSourceNameList,
  syncStatusFirst,
  syncStatusAll,
  syncStatus,
  statusListSecond,
  statusListThird,
  site_mall,
  shotStatuForEdit,
  warehouseType,
  columnData,
  platformLinkList,
  forbidData,
  forbidTHData,
  packageType,
  lazadaUrlList,
  colorList,
  statusAfterList,
  buyPayMethod,
  platformPayMethod,
  muidList,
  lazadaBuyLinkList,
  lazadaBuyLinkObj,
  changePlatformPayMethod,
  changeShotStatus,
  changeBuyerType,
  changeOrderStatus,
  changeDeliveryStatus,
  changePackageType,
  sourceName,
  orderStatusName,
  siteShip,
  getTransportType
}
