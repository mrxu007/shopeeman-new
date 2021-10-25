// 订单发货状态
const statusList = [{
  label: '无状态',
  deliveryStatus: 0
},
{
  label: '待入库',
  deliveryStatus: 1
},
{
  label: '等待包裹',
  deliveryStatus: 2
},
{
  label: '紧急入库',
  deliveryStatus: 3
},
{
  label: '待出库',
  deliveryStatus: 4
},
{
  label: '已出库',
  deliveryStatus: 5
},
{
  label: '已完成', // 暂定
  deliveryStatus: 6
},
{
  label: '订单作废',
  deliveryStatus: 7
},
{
  label: '暂停发货',
  deliveryStatus: 8
},
{
  label: '异常',
  deliveryStatus: 9
},
{
  label: '已变更包裹',
  deliveryStatus: 10
},
{
  label: '缺件',
  deliveryStatus: 11
}, {
  label: '损坏',
  deliveryStatus: 12
},
{
  label: '超重',
  deliveryStatus: 13
},
{
  label: '缺失面单',
  deliveryStatus: 14
},
{
  label: '渠道退件',
  deliveryStatus: 15
},
{
  label: '丢件',
  deliveryStatus: 16
},
{
  label: '海外退件',
  deliveryStatus: 17
},
{
  label: '等待拆件',
  deliveryStatus: 18
}
]

// 异常类型
const exceptionList = [{
  label: '正常',
  exception_type: 0
},
{
  label: '缺件',
  exception_type: 1
},
{
  label: '超长超重拦截',
  exception_type: 2
},
{
  label: '打印订单失败',
  exception_type: 3
},
{
  label: '欠费',
  exception_type: 4
}
]

// 订单平台状态
const orderStatusList = [{
  label: '等待中',
  order_status: 1
},
{
  label: '未发货',
  order_status: 2
},
{
  label: '部分发货',
  order_status: 3
},
{
  label: '已发货',
  order_status: 4
},
{
  label: '已取消',
  order_status: 5
},
{
  label: '无法履行',
  order_status: 6
},
{
  label: '已发货，未确认发票',
  order_status: 7
},
{
  label: '等待可行性',
  order_status: 8
}
]

// 包裹状态
const packageStatusList = [{
  label: '已签收',
  status: 1
},
{
  label: '已经拒收',
  status: 2
},
{
  label: '匹配不到订单包裹',
  status: 3
},
{
  label: '包裹已销毁',
  status: 4
},
{
  label: '包裹丢件',
  status: 5
},
{
  label: '申请退件',
  status: 6
},
{
  label: '已退件',
  status: 7
},
{
  label: '已匹配订单',
  status: 8
},
{
  label: '此包裹为平台物流单号',
  status: 9
},
{
  label: '包裹下架',
  status: 10
}
]

// 退件状态
const ruturnStatusList = [{
  label: '退件中',
  status: 1
},
{
  label: '已退件',
  status: 2
},
{
  label: '退件失败',
  status: 3
},
{
  label: '取消退件',
  status: 4
}
]

export { statusList, exceptionList, orderStatusList, packageStatusList, ruturnStatusList }
