(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ad43"],{bcd0:function(e,l,a){"use strict";a.d(l,"n",(function(){return o})),a.d(l,"s",(function(){return t})),a.d(l,"B",(function(){return i})),a.d(l,"m",(function(){return n})),a.d(l,"k",(function(){return c})),a.d(l,"A",(function(){return d})),a.d(l,"z",(function(){return m})),a.d(l,"x",(function(){return f})),a.d(l,"y",(function(){return I})),a.d(l,"u",(function(){return _})),a.d(l,"r",(function(){return s})),a.d(l,"h",(function(){return T})),a.d(l,"l",(function(){return h})),a.d(l,"p",(function(){return P})),a.d(l,"i",(function(){return g})),a.d(l,"j",(function(){return H})),a.d(l,"w",(function(){return y})),a.d(l,"a",(function(){return w})),a.d(l,"q",(function(){return N})),a.d(l,"f",(function(){return x})),a.d(l,"g",(function(){return r})),a.d(l,"b",(function(){return B})),a.d(l,"d",(function(){return u})),a.d(l,"c",(function(){return C})),a.d(l,"e",(function(){return p})),a.d(l,"v",(function(){return D})),a.d(l,"o",(function(){return k})),a.d(l,"t",(function(){return v}));a("7db0"),a("4de4");var o=[{value:1,label:"待支付",color:"#000"},{value:2,label:"待发货",color:"#FF0000"},{value:3,label:"已发货",color:"#32CD32"},{value:4,label:"已完成",color:"#32CD32"},{value:5,label:"取消中",color:"#000"},{value:6,label:"已取消",color:"#000"},{value:7,label:"退款/退货",color:"#FF0000"},{value:8,label:"确认签收",color:"#000"},{value:9,label:"退款成功",color:"#000"},{value:10,label:"退款失败",color:"#000"},{value:20,label:"无售后订单",color:"#000"}];function u(e,l){var a=o.find((function(l){return l.value==e}));return"color"==l?a&&a.color||"#000":a&&a.label||""}var t=[{value:1,label:"待采购",color:"#FF0000"},{value:3,label:"采购成功",color:"#32CD32"},{value:4,label:"上家已发货",color:"#000"},{value:5,label:"待支付",color:"#000"},{value:6,label:"已完成",color:"#32CD32"},{value:7,label:"已取消",color:"#000"},{value:8,label:"已申请退款",color:"#FF0000"},{value:9,label:"退款成功",color:"#000"}];function r(e,l){var a=t.find((function(l){return l.value==e}));return"color"==l?a&&a.color||"#000":a&&a.label||""}var s=[{value:1,label:"待采购"},{value:3,label:"采购成功"},{value:4,label:"上家已发货"},{value:6,label:"已完成"}],i=[{value:"payTime",label:"订单支付时间"},{value:"shopeeDeliveryTime",label:"发货时间"},{value:"sourceShippingTime",label:"采购发货时间"},{value:"shipByDate",label:"订单截止发货时间"}],n=[{value:"orderSn",label:"订单编号"},{value:"originalTrackingNumber",label:"采购物流单号"},{value:"patOrderSn",label:"采购单号"},{value:"trackingNo",label:"平台物流单号"},{value:"remark",label:"备注"},{value:"variationSku",label:"商品货号"},{value:"buyAccount",label:"买手号"},{value:"payAccount",label:"支付账号"}],c=[{value:1,label:"拼多多"},{value:2,label:"淘宝"},{value:3,label:"天猫"},{value:5,label:"自有"},{value:8,label:"1688"},{value:9,label:"Lazada"},{value:10,label:"京喜"},{value:11,label:"shopee"},{value:12,label:"ALIEXPRESS"},{value:13,label:"天猫淘宝海外平台"},{value:15,label:"货老板海外"}],h=[{value:"1",label:"拼多多"},{value:"2",label:"淘宝"},{value:"3",label:"天猫"},{value:"8",label:"1688"},{value:"9",label:"Lazada"},{value:"10",label:"京喜"},{value:"11",label:"shopee"},{value:"13",label:"天猫淘宝海外平台"}],_=[{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"7000",ShipName:"Standard Delivery - ส่งธรรมดาในประเทศ"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"7001",ShipName:"Standard Delivery Bulky - ส่งสินค้าขนาดใหญ่"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70021",ShipName:"Kerry"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"70023",ShipName:"Best Express"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"70022",ShipName:"J&T Express"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70020",ShipName:"DHL Domestic"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70024",ShipName:"DHL Bulky"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!1,IsSelected:!1,ShipId:"70016",ShipName:"Thailand Post - Registered Mail"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!1,IsSelected:!1,ShipId:"70015",ShipName:"Thailand Post - EMS"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!1,IsSelected:!1,ShipId:"79003",ShipName:"Seller Own Fleet"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30005",ShipName:"7-11"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30013",ShipName:"蝦皮店到店"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30007",ShipName:"萊爾富"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30006",ShipName:"全家"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30001",ShipName:"黑貓宅急配"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30008",ShipName:"OK Mart"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"30010",ShipName:"萊爾富-經濟包"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39303",ShipName:"中華郵政"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39304",ShipName:"賣家宅配"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39312",ShipName:"賣家宅配：大型/超重物品運送"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!1,ShipId:"39308",ShipName:"賣家宅配：箱購"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39013",ShipName:"賣家宅配：虛擬物品"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"30012",ShipName:"蝦皮宅配"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!1,ShipId:"20021",ShipName:"Ninja Van"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!1,ShipId:"20010",ShipName:"DHL eCommerce"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!0,ShipId:"20011",ShipName:"J&T Express"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"20007",ShipName:"Poslaju"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!0,ShipId:"2000",ShipName:"Standard Delivery"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"20023",ShipName:"City-Link Express"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"29910",ShipName:"Others (West Malaysia)"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"29911",ShipName:"Others (East Malaysia)"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!0,ShipId:"40018",ShipName:"J&T Express"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40012",ShipName:"XPost Integrated"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40017",ShipName:"Ninja Van Own Packaging"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40066",ShipName:"Standard Delivery"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!1,IsSelected:!1,ShipId:"40021",ShipName:"GoGo Xpress"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!0,ShipId:"4000",ShipName:"Standard Local"},{Country:"菲律宾站",CountryCode:"PH",ShipId:"49900",ShipName:"Other Logistics Provider"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50016",ShipName:"VNPost Tiết Kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50018",ShipName:"J&T Express"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50020",ShipName:"GrabExpress"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50022",ShipName:"NowShip"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50023",ShipName:"Ninja Van"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50024",ShipName:"BEST Express"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50010",ShipName:"Viettel Post"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50011",ShipName:"Giao Hàng Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50012",ShipName:"Giao Hàng Tiết Kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50015",ShipName:"VNPost Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"5001",ShipName:"Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!1,ShipId:"5002",ShipName:"Tiết kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!1,ShipId:"5000",ShipName:"Hoả Tốc"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"18035",ShipName:"SpeedPost Economy"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"10014",ShipName:"J&T Express"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"10007",ShipName:"Ninja Van (Home Delivery)"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!1,IsSelected:!1,ShipId:"19100",ShipName:"Singpost - Normal Mail"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8003",ShipName:"Reguler (Cashless)"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8005",ShipName:"Hemat"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8001",ShipName:"Same Day"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8000",ShipName:"Instant"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8002",ShipName:"Next Day"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!1,IsSelected:!1,ShipId:"80008",ShipName:"JNE Trucking (JTR)"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!1,IsSelected:!1,ShipId:"80031",ShipName:"Sicepat Gokil"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"80024",ShipName:"J&T Jemari"}],d=[{label:"全部",value:"all"}],m=[{label:"待发货",value:"toship"},{label:"已完成",value:"completed"},{label:"退款中",value:"refund"}],b=[{label:"普货",value:1},{label:"敏感货",value:2},{label:"商检货",value:3}];function p(e){var l=b.find((function(l){return l.value==e}));return l&&l.label||"普货"}var S=[{label:"待入库",value:1},{label:"等待包裹",value:2},{label:"紧急入库",value:3},{label:"待出库",value:4},{label:"已出库",value:5},{label:"已完成",value:6},{label:"订单作废",value:7},{label:"暂停发货",value:8},{label:"异常",value:9}];function C(e){var l=S.find((function(l){return l.value==e}));return l&&l.label||""}var f=[{label:"待发货",value:"toship"},{label:"取消中",value:"cancelled"},{label:"退款中",value:"refund"}],I=[{label:"运送中",value:"shipping"},{label:"已完成",value:"completed"}],y=[{label:"取消中",value:"cancelled"},{label:"退款中",value:"refund"}];function v(e){var l=_.filter((function(l){return l.CountryCode===e}));return l}function D(e){var l="",a=c.find((function(l){return l.value==e}));return l=a?a.label:"",l}function k(e){var l="",a=o.find((function(l){return l.value==e}));return l=a?a.label:"",l}var w={0:"",1:"货到付款",2:"信用卡/借记卡",3:"lazada钱包",4:"Credit",5:"Gcash e-Wallet",6:"ShopeePay",20:"未知，请联系客服"},N={ID:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Indomaret",value:"13"},{label:"Bank Transfer",value:"2"},{label:"SPayLater",value:"24"},{label:"ShopeePay",value:"27"},{label:"Online Payment",value:"41"},{label:"COD",value:"6"}],MY:[{label:"全部",value:""},{label:"信用卡",value:"1"},{label:"银行转账",value:"2"},{label:"卖家余额",value:"20"},{label:"ShopeePay",value:"27"},{label:"在7-11的现金支付",value:"34"},{label:"ibanking",value:"37"},{label:"VISA金融卡",value:"4"}],PH:[{label:"全部",value:""},{label:"Credit",value:"1"},{label:"Bank Transfer",value:"2"},{label:"ShopeePay",value:"27"},{label:"Debit Card",value:"4"},{label:"COD",value:"6"}],SG:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Bank Transfer",value:"2"},{label:"ShopeePay",value:"27"},{label:"Online Payment",value:"49"}],TH:[{label:"全部",value:""},{label:"Credit",value:"18"},{label:"Bank Transfe",value:"2"},{label:"SPayLater",value:"24"},{label:"AirPay",value:"28"},{label:"airpay_giro",value:"30"},{label:"Debit Card",value:"4"},{label:"free with promotion",value:"5"},{label:"Online Payment",value:"50"},{label:"COD",value:"6"}],TW:[{label:"全部",value:""},{label:"信用卡",value:"1"},{label:"银行转账",value:"2"},{label:"虾皮钱包",value:"20"},{label:"信用卡分期付款",value:"23"},{label:"SPayLater",value:"24"},{label:"接口支付Local",value:"33"},{label:"接口支付Cross",value:"36"},{label:"撤销的款项",value:"5"},{label:"货到付款",value:"6"}],VN:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Seller Balance",value:"20"},{label:"AirPay",value:"28"},{label:"airpay_giro",value:"30"},{label:"COD",value:"6"}]};function x(e,l){var a="",o=N[e]||[];if(o.length){var u=o.find((function(e){return e.value==l}));a=u?u.label:""}return a}var T=[{column_header:"站点",is_show:1,first_column_is_checkbox:-1},{column_header:"店铺分组",is_show:1,first_column_is_checkbox:-1},{column_header:"店铺名称",is_show:1,first_column_is_checkbox:-1},{column_header:"采购绑定仓库",is_show:1,first_column_is_checkbox:-1},{column_header:"颜色标识",is_show:1,first_column_is_checkbox:-1},{column_header:"标识名称",is_show:1,first_column_is_checkbox:-1},{column_header:"订单编号",is_show:1,first_column_is_checkbox:-1},{column_header:"订单创建时间",is_show:1,first_column_is_checkbox:-1},{column_header:"发货状态",is_show:1,first_column_is_checkbox:-1},{column_header:"发货时间",is_show:1,first_column_is_checkbox:-1},{column_header:"采购类型",is_show:1,first_column_is_checkbox:-1},{column_header:"查看采购地址",is_show:1,first_column_is_checkbox:-1},{column_header:"是否可二次销售",is_show:1,first_column_is_checkbox:-1},{column_header:"商品ID",is_show:1,first_column_is_checkbox:-1},{column_header:"商品创建时间",is_show:1,first_column_is_checkbox:-1},{column_header:"商品图片",is_show:1,first_column_is_checkbox:-1},{column_header:"商品单价",is_show:1,first_column_is_checkbox:-1},{column_header:"商品数量",is_show:1,first_column_is_checkbox:-1},{column_header:"商品标题",is_show:1,first_column_is_checkbox:-1},{column_header:"搜同款",is_show:1,first_column_is_checkbox:-1},{column_header:"商品类目",is_show:1,first_column_is_checkbox:-1},{column_header:"规格编号",is_show:1,first_column_is_checkbox:-1},{column_header:"商品规格",is_show:1,first_column_is_checkbox:-1},{column_header:"商品货号",is_show:1,first_column_is_checkbox:-1},{column_header:"是否为海外仓商品",is_show:1,first_column_is_checkbox:-1},{column_header:"买家付款金额",is_show:1,first_column_is_checkbox:-1},{column_header:"订单收入",is_show:1,first_column_is_checkbox:-1},{column_header:"订单收入(RMB)",is_show:1,first_column_is_checkbox:-1},{column_header:"实际总邮费",is_show:1,first_column_is_checkbox:-1},{column_header:"卖家补贴邮费",is_show:1,first_column_is_checkbox:-1},{column_header:"采购价",is_show:1,first_column_is_checkbox:-1},{column_header:"采购价(RMB)",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库发货金额",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库发货金额(RMB)",is_show:1,first_column_is_checkbox:-1},{column_header:"含邮费毛利",is_show:1,first_column_is_checkbox:-1},{column_header:"含邮费毛利(RMB)",is_show:1,first_column_is_checkbox:-1},{column_header:"最终毛利",is_show:1,first_column_is_checkbox:-1},{column_header:"最终毛利(RMB)",is_show:1,first_column_is_checkbox:-1},{column_header:"付款账号",is_show:1,first_column_is_checkbox:-1},{column_header:"采购账号",is_show:1,first_column_is_checkbox:-1},{column_header:"账单明细",is_show:1,first_column_is_checkbox:-1},{column_header:"拍单",is_show:1,first_column_is_checkbox:-1},{column_header:"采购状态",is_show:1,first_column_is_checkbox:-1},{column_header:"采购时间",is_show:1,first_column_is_checkbox:-1},{column_header:"采购订单号",is_show:1,first_column_is_checkbox:-1},{column_header:"采购付款方式",is_show:1,first_column_is_checkbox:-1},{column_header:"平台付款方式",is_show:1,first_column_is_checkbox:-1},{column_header:"采购物流公司",is_show:1,first_column_is_checkbox:-1},{column_header:"采购物流单号",is_show:1,first_column_is_checkbox:-1},{column_header:"采购发货时间",is_show:1,first_column_is_checkbox:-1},{column_header:"采购物流轨迹",is_show:1,first_column_is_checkbox:-1},{column_header:"商户订单号",is_show:1,first_column_is_checkbox:-1},{column_header:"运输方式",is_show:1,first_column_is_checkbox:-1},{column_header:"货物类型",is_show:1,first_column_is_checkbox:-1},{column_header:"虾皮物流",is_show:1,first_column_is_checkbox:-1},{column_header:"虾皮物流单号",is_show:1,first_column_is_checkbox:-1},{column_header:"虾皮物流轨迹",is_show:1,first_column_is_checkbox:-1},{column_header:"截止发货时间",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库发货状态",is_show:1,first_column_is_checkbox:-1},{column_header:"入库时间",is_show:1,first_column_is_checkbox:-1},{column_header:"出库时间",is_show:1,first_column_is_checkbox:-1},{column_header:"本地备注",is_show:1,first_column_is_checkbox:-1},{column_header:"shopee备注",is_show:1,first_column_is_checkbox:-1},{column_header:"shopee备注更新时间",is_show:1,first_column_is_checkbox:-1},{column_header:"买家姓名",is_show:1,first_column_is_checkbox:-1},{column_header:"买家地址",is_show:1,first_column_is_checkbox:-1},{column_header:"手机号",is_show:1,first_column_is_checkbox:-1},{column_header:"订单支付时间",is_show:1,first_column_is_checkbox:-1},{column_header:"订单轨迹",is_show:1,first_column_is_checkbox:-1},{column_header:"订单更新时间",is_show:1,first_column_is_checkbox:-1},{column_header:"操作",is_show:1,first_column_is_checkbox:-1}],P=[{purchase_platform_id:1,purchase_url:"http://mobile.yangkeduo.com/goods.html?goods_id=",purchase_url_all:"http://mobile.yangkeduo.com/goods.html?goods_id=2459375892",label:"拼多多"},{purchase_platform_id:2,purchase_url:"https://item.taobao.com/item.htm?id=",purchase_url_all:"https://item.taobao.com/item.htm?id=561870475654",label:"淘宝"},{purchase_platform_id:3,purchase_url:"https://detail.tmall.com/item.htm?id=",purchase_url_all:"https://detail.tmall.com/item.htm?id=20601016004",label:"天猫"},{purchase_platform_id:8,purchase_url:"https://detail.1688.com/offer/",purchase_url_all:"https://detail.1688.com/offer/635819118296.html",label:"1688"},{purchase_platform_id:10,purchase_url:"https://m.jingxi.com/item/view?sku=",purchase_url_all:"https://m.jingxi.com/item/view?sku=20601016004",label:"京喜"},{purchase_platform_id:9,purchase_url:"https://www.lazada.com.my/products/i",purchase_url_all:"https://www.lazada.com.my/products/i1143594827.html",label:"lazada"},{purchase_platform_id:11,purchase_url:"https://xiapi.xiapibuy.com/product/60119183/",purchase_url_all:"https://xiapi.xiapibuy.com/product/60119183/2677842767",label:"shopee"},{purchase_platform_id:13,purchase_url:"https://distributor.taobao.global/apps/product/detail?mpId=",purchase_url_all:"https://distributor.taobao.global/apps/product/detail?mpId=60003345",label:"天猫淘宝海外平台"}],g=["爆炸性、易燃性、腐蚀性、放射性和毒性等危险物品","货币、支票、有价证券、有价金属、人造钻石、珠宝或其他贵重物品","形仿武器、弹药","燃料矿物、矿物油及其蒸馏产品、可燃易燃性气体、液体、固体，打火机，火柴","沥青矿物；矿物蜡；润滑油、油漆；指甲油、指甲胶","药物（麻醉药物、精神药物）、急救箱","淫秽物品、性用品","活体动、植物","种子、水果、食品、茶叶","液体、粉末，毛皮、皮肤","烟、酒","仿牌货物","发光、发热、烟花类物品","含马达、发动机","磁类货物","纯电池和配套电池货物","反动书籍、报刊、杂志、光碟","证件：身份证、护照、驾照等","压缩类气体；以及其他航司及目的地海关及法律禁运货限运的物品"],H=["食品","食材","酱料","零食","纯电池","移动电源","电动车","航模飞机","台式主机","美容美发","医疗产品","清洁剂","胶水","油漆","摩托车（头盔，轮胎）","化妆品（成品无牌）","卷尺","蚊香","肥皂","洗头水","沐浴露","牙膏","足膜足贴","运动健身贴","仿产地","摩托车排气管","特殊危险敏感贵重货物","手机及平板","性用品（药品，情趣用品）","电子烟","赌具","香烟","酒","古董"],V={TaoBao:0,PinDuoduo:1,JingDong:2,JingXi:3,HYJ:4,Alibaba:5,YunPaiDan:6,Lazada:7,Shopee:8,CrossBorder:9,OwnPlatform:10,PpxiasGhpt:11,AliExpressPlatform:12};function B(e){switch(e){case 1:return V.PinDuoduo;case 2:case 3:return V.TaoBao;case 4:return V.JingDong;case 8:return V.Alibaba;case 9:return V.Lazada;case 10:return V.JingXi;case 11:return V.Shopee;case 13:return V.CrossBorder;default:return V.PinDuoduo}}}}]);