(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ad43"],{bcd0:function(e,o,l){"use strict";l.d(o,"q",(function(){return t})),l.d(o,"v",(function(){return i})),l.d(o,"G",(function(){return u})),l.d(o,"n",(function(){return h})),l.d(o,"k",(function(){return p})),l.d(o,"l",(function(){return c})),l.d(o,"m",(function(){return d})),l.d(o,"E",(function(){return y})),l.d(o,"D",(function(){return m})),l.d(o,"C",(function(){return w})),l.d(o,"A",(function(){return I})),l.d(o,"B",(function(){return v})),l.d(o,"x",(function(){return _})),l.d(o,"u",(function(){return s})),l.d(o,"h",(function(){return O})),l.d(o,"s",(function(){return L})),l.d(o,"i",(function(){return B})),l.d(o,"j",(function(){return E})),l.d(o,"z",(function(){return k})),l.d(o,"a",(function(){return N})),l.d(o,"t",(function(){return x})),l.d(o,"o",(function(){return z})),l.d(o,"p",(function(){return V})),l.d(o,"F",(function(){return H})),l.d(o,"f",(function(){return P})),l.d(o,"g",(function(){return n})),l.d(o,"b",(function(){return W})),l.d(o,"d",(function(){return r})),l.d(o,"c",(function(){return S})),l.d(o,"e",(function(){return b})),l.d(o,"y",(function(){return T})),l.d(o,"r",(function(){return D})),l.d(o,"w",(function(){return g}));l("7db0"),l("4de4"),l("a9e3");var a=l("4586"),t=[{value:1,label:"待支付",color:"#000"},{value:2,label:"待发货",color:"#FF0000"},{value:3,label:"已发货",color:"#32CD32"},{value:4,label:"已完成",color:"#32CD32"},{value:5,label:"取消中",color:"#000"},{value:6,label:"已取消",color:"#000"},{value:7,label:"退款/退货",color:"#FF0000"},{value:8,label:"确认签收",color:"#000"},{value:9,label:"退款成功",color:"#32CD32"},{value:10,label:"退款失败",color:"#FF0000"},{value:20,label:"无售后订单",color:"#000"}];function r(e,o){var l=t.find((function(o){return o.value==e}));return"color"===o?l&&l.color||"#000":l&&l.label||""}var i=[{value:1,label:"待采购",color:"#FF0000"},{value:3,label:"采购成功",color:"#32CD32"},{value:4,label:"上家已发货",color:"#000"},{value:5,label:"待支付",color:"#000"},{value:6,label:"已完成",color:"#32CD32"},{value:7,label:"已取消",color:"#000"},{value:8,label:"已申请退款",color:"#FF0000"},{value:9,label:"退款成功",color:"#000"}];function n(e,o){var l=i.find((function(o){return o.value==e}));return"color"===o?l&&l.color||"#000":l&&l.label||""}var s=[{value:1,label:"待采购"},{value:3,label:"采购成功"},{value:4,label:"上家已发货"},{value:6,label:"已完成"}],u=[{value:"payTime",label:"订单支付时间"},{value:"shopeeDeliveryTime",label:"发货时间"},{value:"sourceShippingTime",label:"采购发货时间"},{value:"shipByDate",label:"订单截止发货时间"}],h=[{value:"orderSn",label:"订单编号"},{value:"variationId",label:"规格编号"},{value:"originalTrackingNumber",label:"采购物流单号"},{value:"patOrderSn",label:"采购单号"},{value:"trackingNo",label:"平台物流单号"},{value:"remark",label:"备注"},{value:"variationSku",label:"商品货号"},{value:"buyAccount",label:"买手号"},{value:"payAccount",label:"支付账号"}],p=[{value:1,label:"拼多多"},{value:2,label:"淘宝"},{value:3,label:"天猫"},{value:5,label:"自有"},{value:8,label:"1688"},{value:9,label:"Lazada"},{value:10,label:"京喜"},{value:11,label:"shopee"},{value:12,label:"ALIEXPRESS"},{value:13,label:"天猫淘宝海外平台"},{value:15,label:"货老板海外"},{value:16,label:"Tokopedia"},{value:17,label:"Bukalapak"}],d={1:"拼多多",2:"淘宝",3:"天猫",4:"京东",5:"自有产品",6:"皮皮虾供货平台",7:"货源甲",8:"1688",9:"lazada",10:"京喜",11:"Shopee",12:"速卖通",13:"天猫淘宝海外平台",15:"货老板云仓",16:"Tokopedia",17:"Bukalapak"},c=[{value:"1",label:"拼多多"},{value:"2",label:"淘宝"},{value:"3",label:"天猫"},{value:"8",label:"1688"},{value:"9",label:"Lazada"},{value:"10",label:"京喜"},{value:"11",label:"shopee"},{value:"13",label:"天猫淘宝海外平台"}],_=[{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"7000",ShipName:"Standard Delivery - ส่งธรรมดาในประเทศ"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"7001",ShipName:"Standard Delivery Bulky - ส่งสินค้าขนาดใหญ่"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70021",ShipName:"Kerry"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"70023",ShipName:"Best Express"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!0,ShipId:"70022",ShipName:"J&T Express"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70020",ShipName:"DHL Domestic"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70024",ShipName:"DHL Bulky"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70017",ShipName:"Registered Mail - Thailand Post"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!0,IsSelected:!1,ShipId:"70018",ShipName:"EMS - Thailand Post"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!1,IsSelected:!1,ShipId:"79003",ShipName:"Seller Own Fleet"},{Country:"泰国站",CountryCode:"TH",IsDeafult:!1,IsSelected:!1,ShipId:"79707",ShipName:"ผู้ขายทำการจัดส่งให้"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30005",ShipName:"7-11"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30015",ShipName:"蝦皮店到店"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30007",ShipName:"萊爾富"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30006",ShipName:"全家"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30001",ShipName:"黑貓宅急配"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!0,ShipId:"30014",ShipName:"OK Mart"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"30010",ShipName:"萊爾富-經濟包"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39303",ShipName:"中華郵政"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39304",ShipName:"賣家宅配"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39312",ShipName:"賣家宅配：大型/超重物品運送"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!1,ShipId:"39308",ShipName:"賣家宅配：箱購"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"39013",ShipName:"賣家宅配：虛擬物品"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!1,IsSelected:!1,ShipId:"30012",ShipName:"蝦皮宅配"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!1,ShipId:"30014",ShipName:"OK Mart"},{Country:"台湾站",CountryCode:"TW",IsDeafult:!0,IsSelected:!1,ShipId:"30015",ShipName:"蝦皮店到店"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!1,ShipId:"20021",ShipName:"Ninja Van"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!1,ShipId:"20010",ShipName:"DHL eCommerce"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!0,ShipId:"20011",ShipName:"J&T Express"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"20007",ShipName:"Poslaju"},{Country:"马来站",CountryCode:"MY",IsDeafult:!0,IsSelected:!0,ShipId:"2000",ShipName:"Standard Delivery"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"20023",ShipName:"City-Link Express"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"29910",ShipName:"Others (West Malaysia)"},{Country:"马来站",CountryCode:"MY",IsDeafult:!1,IsSelected:!1,ShipId:"29911",ShipName:"Others (East Malaysia)"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!0,ShipId:"40018",ShipName:"J&T Express"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40012",ShipName:"XPost Integrated"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40017",ShipName:"Ninja Van Own Packaging"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!1,ShipId:"40066",ShipName:"Standard Delivery"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!1,IsSelected:!1,ShipId:"40021",ShipName:"GoGo Xpress"},{Country:"菲律宾站",CountryCode:"PH",IsDeafult:!0,IsSelected:!0,ShipId:"4000",ShipName:"Standard Local"},{Country:"菲律宾站",CountryCode:"PH",ShipId:"49900",ShipName:"Other Logistics Provider"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50016",ShipName:"VNPost Tiết Kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50018",ShipName:"J&T Express"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50020",ShipName:"GrabExpress"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50022",ShipName:"NowShip"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50023",ShipName:"Ninja Van"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50024",ShipName:"BEST Express"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50010",ShipName:"Viettel Post"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50011",ShipName:"Giao Hàng Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50012",ShipName:"Giao Hàng Tiết Kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"50015",ShipName:"VNPost Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!0,ShipId:"5001",ShipName:"Nhanh"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!1,ShipId:"5002",ShipName:"Tiết kiệm"},{Country:"越南站",CountryCode:"VN",IsDeafult:!0,IsSelected:!1,ShipId:"5000",ShipName:"Hoả Tốc"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"18035",ShipName:"SpeedPost Economy"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"10014",ShipName:"J&T Express"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!0,IsSelected:!0,ShipId:"10007",ShipName:"Ninja Van (Home Delivery)"},{Country:"新加坡站",CountryCode:"SG",IsDeafult:!1,IsSelected:!1,ShipId:"19100",ShipName:"Singpost - Normal Mail"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8003",ShipName:"Reguler (Cashless)"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8005",ShipName:"Hemat"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8001",ShipName:"Same Day"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8000",ShipName:"Instant"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"8002",ShipName:"Next Day"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!1,IsSelected:!1,ShipId:"80008",ShipName:"JNE Trucking (JTR)"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!1,IsSelected:!1,ShipId:"80031",ShipName:"Sicepat Gokil"},{Country:"印尼站",CountryCode:"ID",IsDeafult:!0,IsSelected:!0,ShipId:"80024",ShipName:"J&T Jemari"}],m=[{label:"待发货",value:"toship"},{label:"已发货",value:"shipping"},{label:"已完成",value:"completed"},{label:"取消中",value:"cancelled"},{label:"退货/退款",value:"refund"}],y=[{label:"全部",value:"all"}],w=[{label:"全部",value:"all"},{label:"待发货",value:"toship"},{label:"退货/退款",value:"refund"}],f=[{label:"普货",value:1},{label:"敏感货",value:2},{label:"商检货",value:3}];function b(e){var o=f.find((function(o){return o.value==e}));return o&&o.label||"普货"}var C=[{label:"待入库",value:1},{label:"等待包裹",value:2},{label:"紧急入库",value:3},{label:"待出库",value:4},{label:"已出库",value:5},{label:"已完成",value:6},{label:"订单作废",value:7},{label:"暂停发货",value:8},{label:"异常",value:9}];function S(e){var o=C.find((function(o){return o.value==e}));return o&&o.label||""}var I=[{label:"待发货",value:"toship"},{label:"取消中",value:"cancelled"},{label:"退款中",value:"refund"}],v=[{label:"已发货",value:"shipping"},{label:"已完成",value:"completed"}],k=[{label:"取消中",value:"cancelled"},{label:"退款中",value:"refund"}];function g(e){var o=_.filter((function(o){return o.CountryCode===e}));return o}function T(e){var o="",l=p.find((function(o){return o.value==e}));return o=l?l.label:"",o}function D(e){var o="",l=t.find((function(o){return o.value==e}));return o=l?l.label:"",o}var N={0:"",1:"货到付款",2:"信用卡/借记卡",3:"lazada钱包",4:"Credit",5:"Gcash e-Wallet",6:"ShopeePay",20:"未知，请联系客服"},x={ID:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Indomaret",value:"13"},{label:"Bank Transfer",value:"2"},{label:"SPayLater",value:"24"},{label:"ShopeePay",value:"27"},{label:"Online Payment",value:"41"},{label:"COD",value:"6"}],MY:[{label:"全部",value:""},{label:"信用卡",value:"1"},{label:"银行转账",value:"2"},{label:"卖家余额",value:"20"},{label:"ShopeePay",value:"27"},{label:"在7-11的现金支付",value:"34"},{label:"ibanking",value:"37"},{label:"VISA金融卡",value:"4"}],PH:[{label:"全部",value:""},{label:"Credit",value:"1"},{label:"Bank Transfer",value:"2"},{label:"ShopeePay",value:"27"},{label:"Debit Card",value:"4"},{label:"COD",value:"6"}],SG:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Bank Transfer",value:"2"},{label:"ShopeePay",value:"27"},{label:"Online Payment",value:"49"}],TH:[{label:"全部",value:""},{label:"Credit",value:"18"},{label:"Bank Transfe",value:"2"},{label:"SPayLater",value:"24"},{label:"AirPay",value:"28"},{label:"airpay_giro",value:"30"},{label:"Debit Card",value:"4"},{label:"free with promotion",value:"5"},{label:"Online Payment",value:"50"},{label:"COD",value:"6"}],TW:[{label:"全部",value:""},{label:"信用卡",value:"1"},{label:"银行转账",value:"2"},{label:"虾皮钱包",value:"20"},{label:"信用卡分期付款",value:"23"},{label:"SPayLater",value:"24"},{label:"接口支付Local",value:"33"},{label:"接口支付Cross",value:"36"},{label:"撤销的款项",value:"5"},{label:"货到付款",value:"6"}],VN:[{label:"全部",value:""},{label:"Credit/Debit Card",value:"1"},{label:"Seller Balance",value:"20"},{label:"AirPay",value:"28"},{label:"airpay_giro",value:"30"},{label:"COD",value:"6"}]};function P(e,o){var l="",a=x[e]||[];if(a.length){var t=a.find((function(e){return e.value==o}));l=t?t.label:""}return l}var O=[{column_header:"订单编号",is_show:1,first_column_is_checkbox:-1},{column_header:"操作",is_show:1,first_column_is_checkbox:-1},{column_header:"订单收入",is_show:1,first_column_is_checkbox:-1},{column_header:"店铺所属信息",is_show:1,first_column_is_checkbox:-1},{column_header:"店铺名称",is_show:1,first_column_is_checkbox:-1},{column_header:"采购绑定仓库",is_show:1,first_column_is_checkbox:-1},{column_header:"颜色标识",is_show:1,first_column_is_checkbox:-1},{column_header:"发货状态",is_show:1,first_column_is_checkbox:-1},{column_header:"订单时间信息",is_show:1,first_column_is_checkbox:-1},{column_header:"采购类型",is_show:1,first_column_is_checkbox:-1},{column_header:"是否可二次销售",is_show:1,first_column_is_checkbox:-1},{column_header:"商品ID",is_show:1,first_column_is_checkbox:-1},{column_header:"商品创建时间",is_show:1,first_column_is_checkbox:-1},{column_header:"商品图片",is_show:1,first_column_is_checkbox:-1},{column_header:"商品单价",is_show:1,first_column_is_checkbox:-1},{column_header:"搜同款",is_show:1,first_column_is_checkbox:-1},{column_header:"商品类目",is_show:1,first_column_is_checkbox:-1},{column_header:"规格编号",is_show:1,first_column_is_checkbox:-1},{column_header:"商品规格",is_show:1,first_column_is_checkbox:-1},{column_header:"商品货号",is_show:1,first_column_is_checkbox:-1},{column_header:"买家付款金额",is_show:1,first_column_is_checkbox:-1},{column_header:"实际总邮费",is_show:1,first_column_is_checkbox:-1},{column_header:"卖家补贴邮费",is_show:1,first_column_is_checkbox:-1},{column_header:"采购价",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库发货金额",is_show:1,first_column_is_checkbox:-1},{column_header:"含邮费毛利",is_show:1,first_column_is_checkbox:-1},{column_header:"最终毛利",is_show:1,first_column_is_checkbox:-1},{column_header:"付款账号",is_show:1,first_column_is_checkbox:-1},{column_header:"采购账号",is_show:1,first_column_is_checkbox:-1},{column_header:"拍单",is_show:1,first_column_is_checkbox:-1},{column_header:"采购状态",is_show:1,first_column_is_checkbox:-1},{column_header:"采购时间",is_show:1,first_column_is_checkbox:-1},{column_header:"采购订单号",is_show:1,first_column_is_checkbox:-1},{column_header:"采购付款方式",is_show:1,first_column_is_checkbox:-1},{column_header:"平台付款方式",is_show:1,first_column_is_checkbox:-1},{column_header:"采购物流信息",is_show:1,first_column_is_checkbox:-1},{column_header:"采购发货时间",is_show:1,first_column_is_checkbox:-1},{column_header:"商户订单号",is_show:1,first_column_is_checkbox:-1},{column_header:"货物运输及类型",is_show:1,first_column_is_checkbox:-1},{column_header:"虾皮物流信息",is_show:1,first_column_is_checkbox:-1},{column_header:"虾皮物流轨迹",is_show:1,first_column_is_checkbox:-1},{column_header:"截止发货时间",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库发货状态",is_show:1,first_column_is_checkbox:-1},{column_header:"仓库时间信息",is_show:1,first_column_is_checkbox:-1},{column_header:"本地备注",is_show:1,first_column_is_checkbox:-1},{column_header:"shopee备注",is_show:1,first_column_is_checkbox:-1},{column_header:"shopee备注更新时间",is_show:1,first_column_is_checkbox:-1},{column_header:"买家信息",is_show:1,first_column_is_checkbox:-1},{column_header:"买家地址",is_show:1,first_column_is_checkbox:-1},{column_header:"订单支付时间",is_show:1,first_column_is_checkbox:-1},{column_header:"订单更新时间",is_show:1,first_column_is_checkbox:-1},{column_header:"是否为海外仓商品",is_show:1,first_column_is_checkbox:-1},{column_header:"商品数量",is_show:1,first_column_is_checkbox:-1},{column_header:"商品标题",is_show:1,first_column_is_checkbox:-1},{column_header:"买家备注",is_show:1,first_column_is_checkbox:-1}],H=[{key:1,name:"订单编号",width:"170",fixed:"left",align:"",iCopy:"order_sn",prop:"order_sn",rowClick:"viewDetails_orderDetail",showType:0},{key:2,name:"操作",width:"125",fixed:"left",align:"center",showType:2},{key:3,width:"120",name:"店铺所属信息",align:"",propList:[{name:"站点",filter:a["chineseSite"],prop:"country"},{name:"分组",width:"80",prop:"group_name"}],showOverflowTooltip:!0,showType:0},{key:5,name:"店铺名称",width:"120",align:"",rowDblClick:"copyItem",prop:"mall_info.mall_alias_name,mall_info.platform_mall_name",showOverflowTooltip:!0,showType:0},{key:6,name:"采购绑定仓库",width:"120",align:"",prop:"shot_order_info.warehouse_name",showOverflowTooltip:!0,showType:0},{key:7,name:"颜色标识",width:"120",align:"center",prop:"color_id",iColor:"color_id",rowShow:"changeColorLabel",showType:4},{key:9,name:"发货状态",width:"100",align:"",rowColor:"changeOrderStatus_color",rowShow:"changeOrderStatus",prop:"order_status",sortable:!0,showType:4},{key:8,name:"订单时间信息",width:"180",align:"",prop:"created_time",sortable:!0,propList:[{name:"创建",prop:"created_time"},{name:"发货",prop:"shopee_delivery_time"}],showType:0},{key:11,name:"采购类型",width:"120",align:"center",rowShow:"changeTypeName",prop:"goods_info.ori_platform_id",propLink:"goods_info.ori_url",propLinkName:"查看采购地址",rowClick:"openUrl",sortable:!0,showType:4},{key:13,name:"是否可二次销售",width:"140",prop:"shot_order_info.buy_account_info.second_sale_num",align:"",showType:8},{key:14,name:"商品ID",width:"140",align:"",iCopy:"goods_info.goods_id",prop:"goods_info.goods_id",rowClick:"openUrl_product",sortable:!0,showType:0},{key:15,name:"商品创建时间",width:"140",align:"",prop:"goods_info.platform_create_time",sortable:!0,showType:0},{key:16,name:"商品图片",width:"80",align:"center",filter:a["imageRender"],prop:"goods_info.goods_img",showType:10},{key:17,name:"商品单价",width:"120",filter:a["siteCoin"],align:"",prop:"goods_info.discounted_price",sortable:!0,showType:11},{key:18,name:"商品数量",width:"70",prop:"goods_info.goods_count",showOverflowTooltip:!0,showType:0},{key:19,name:"商品标题",width:"140",prop:"goods_info.goods_name",showOverflowTooltip:!0,showType:0},{key:20,name:"搜同款",width:"120",align:"",showType:12},{key:21,name:"商品类目",width:"120",align:"",rowShow:"getCategoryName",prop:"goods_info.goods_category_id",showOverflowTooltip:!0,showType:4},{key:22,name:"规格编号",width:"120",align:"",prop:"goods_info.variation_id",showType:0},{key:23,name:"商品规格",width:"100",align:"center",propLink:"goods_info.ori_platform_id",prop:"goods_info.variation_name",showOverflowTooltip:!0,showType:4},{key:24,name:"商品货号",width:"120",align:"",rowShow:"replace_=|=",prop:"goods_info.variation_sku",showOverflowTooltip:!0,sortable:!0,showType:4},{key:25,name:"买家付款金额",width:"120",filter:a["siteCoin"],prop:"total_amount",sortable:!0,showType:11},{key:26,name:"订单收入",width:"120",align:"",filter:a["siteCoin"],prop:"escrow_amount",sortable:!0,showType:11},{key:27,name:"实际总邮费",width:"100",align:"",filter:a["siteCoin"],prop:"actual_shipping_cost",showType:11},{key:28,name:"卖家补贴邮费",width:"120",align:"",filter:a["siteCoin"],prop:"sell_shipping_cost",showType:11},{key:29,name:"采购价",width:"120",align:"",filter:a["siteCoin"],prop:"shot_order_info.shot_amount",sortable:!0,showType:11},{key:30,name:"仓库发货金额",width:"120",align:"",filter:a["siteCoin"],prop:"warehouse_ship_amount",sortable:!0,showType:16},{key:31,name:"含邮费毛利",width:"120",align:"",filter:a["siteCoin"],prop:"gross_profit",showType:11},{key:32,name:"最终毛利",width:"120",align:"",filter:a["siteCoin"],prop:"real_gross_profit",sortable:!0,showType:11},{key:33,name:"付款账号",width:"120",align:"",prop:"shot_order_info.pay_account_info.name",showType:0},{key:34,name:"采购账号",width:"120",align:"",prop:"shot_order_info.buy_account_info.name",sortable:!0,showType:0},{key:35,name:"拍单",width:"80",align:"",showType:17},{key:36,name:"采购状态",width:"120",align:"",propLink:"true",rowColor:"changeShotStatus_color",rowShow:"changeShotStatus",prop:"shot_order_info.shot_status",sortable:!0,showType:4},{key:37,name:"采购时间",width:"140",align:"",prop:"shot_order_info.shotted_at",sortable:!0,showType:0},{key:38,name:"采购订单号",width:"140",align:"",rowClick:"clickBuyOrder",prop:"shot_order_info.shot_order_sn",showOverflowTooltip:!0,showType:19},{key:39,name:"采购付款方式",width:"120",align:"",rowShow:"buyPayMethod",prop:"shot_order_info.shot_payment_method",showType:4},{key:40,name:"平台付款方式",width:"120",align:"",rowShow:"changePlatformPayMethod",prop:"payment_method",showType:4},{key:41,name:"采购物流信息",width:"140",align:"",prop:"shot_order_info.shot_logistics_company",propList:[{name:"公司",prop:"shot_order_info.shot_logistics_company"},{name:"单号",prop:"shot_order_info.shot_tracking_number"}],sortable:!0,showType:0},{key:43,name:"采购发货时间",width:"140",align:"",prop:"shot_order_info.shot_shipping_time",showType:0},{key:44,name:"商户订单号",width:"140",align:"",prop:"shot_order_info.merchant_no",showOverflowTooltip:!0,showType:0},{key:45,name:"货物运输及类型",width:"120",align:"",propList:[{name:"运输方式",filter:J,prop:"transport_type"},{name:"货物类型",filter:b,prop:"package_type"}],showType:0},{key:47,name:"虾皮物流信息",width:"170",align:"",propList:[{name:"公司",prop:"logistics_name"},{name:"单号",prop:"tracking_no"}],prop:"logistics_name",showOverflowTooltip:!0,showType:0},{key:48,name:"买家备注",width:"140",align:"",prop:"message_to_seller",showOverflowTooltip:!0,showType:0},{key:49,name:"虾皮物流轨迹",width:"130",align:"",rowClick:"getSHtrackPath",buttonName:"虾皮物流轨迹",prop:"123456",showType:7},{key:50,name:"截止发货时间",width:"140",align:"",prop:"ship_by_date",sortable:!0,showType:0},{key:51,name:"仓库发货状态",width:"120",align:"",filter:S,prop:"delivery_status",sortable:!0,showType:0},{key:52,name:"仓库时间信息",width:"180",propList:[{name:"入库",prop:"storage_time"},{name:"出库",prop:"outbound_time"}],prop:"outbound_time",sortable:!0,showType:0},{key:54,name:"本地备注",width:"120",align:"",prop:"remark",showOverflowTooltip:!0,sortable:!0,showType:23},{key:55,name:"shopee备注",width:"120",align:"",showOverflowTooltip:!0,showType:24},{key:56,name:"shopee备注更新时间",width:"140",align:"",prop:"note_update_time",showType:0},{key:57,name:"买家信息",width:"150",align:"",propList:[{prop:"name",name:"姓名",rowDblClick:"copyItem"},{name:"手机",prop:"phone",rowDblClick:"copyItem"}],showOverflowTooltip:!0,showType:0},{key:58,name:"买家地址",width:"120",align:"",prop:"receiver_info.address",showOverflowTooltip:!0,rowDblClick:"copyItem",showType:0},{key:60,name:"订单支付时间",width:"140",align:"",prop:"pay_time",sortable:!0,showType:0},{key:61,name:"订单更新时间",width:"140",align:"",prop:"update_time",sortable:!0,showType:0},{key:62,name:"是否为海外仓商品",width:"120",rowShow:"1_or_true",align:"",prop:"goods_info.is_overseas_goods",showType:4}],L=[{purchase_platform_id:1,purchase_url:"http://mobile.yangkeduo.com/goods.html?goods_id=",purchase_url_all:"http://mobile.yangkeduo.com/goods.html?goods_id=2459375892",label:"拼多多"},{purchase_platform_id:2,purchase_url:"https://item.taobao.com/item.htm?id=",purchase_url_all:"https://item.taobao.com/item.htm?id=561870475654",label:"淘宝"},{purchase_platform_id:3,purchase_url:"https://detail.tmall.com/item.htm?id=",purchase_url_all:"https://detail.tmall.com/item.htm?id=20601016004",label:"天猫"},{purchase_platform_id:8,purchase_url:"https://detail.1688.com/offer/",purchase_url_all:"https://detail.1688.com/offer/635819118296.html",label:"1688"},{purchase_platform_id:10,purchase_url:"https://m.jingxi.com/item/view?sku=",purchase_url_all:"https://m.jingxi.com/item/view?sku=20601016004",label:"京喜"},{purchase_platform_id:9,purchase_url:"https://www.lazada.com.my/products/i",purchase_url_all:"https://www.lazada.com.my/products/i1143594827.html",label:"lazada"},{purchase_platform_id:11,purchase_url:"https://xiapi.xiapibuy.com/product/60119183/",purchase_url_all:"https://xiapi.xiapibuy.com/product/60119183/2677842767",label:"shopee"},{purchase_platform_id:13,purchase_url:"https://distributor.taobao.global/apps/product/detail?mpId=",purchase_url_all:"https://distributor.taobao.global/apps/product/detail?mpId=60003345",label:"天猫淘宝海外平台"},{purchase_platform_id:16,purchase_url:"https://www.tokopedia.com/velove/",purchase_url_all:"https://www.tokopedia.com/velove/v856-malta-dress-3-color-2-size-sage-green-s?extParam=ivf%3Dfalse",label:"tokopedia"},{purchase_platform_id:17,purchase_url:"https://www.bukalapak.com/p/handphone/",purchase_url_all:"https://www.bukalapak.com/p/handphone/hp-smartphone/iphone/4goavx1-jual-iphone-7-second-likenew",label:"bukalapak"}],z=["https://www.lazada.com.my","https://www.lazada.vn","https://www.lazada.co.id","https://www.lazada.com.ph","http://www.lazada.co.th","https://www.lazada.sg"],V={my:"https://www.lazada.com.my",vn:"https://www.lazada.vn",id:"https://www.lazada.co.id",ph:"https://www.lazada.com.ph",th:"http://www.lazada.co.th",sg:"https://www.lazada.sg"},B=["爆炸性、易燃性、腐蚀性、放射性和毒性等危险物品","货币、支票、有价证券、有价金属、人造钻石、珠宝或其他贵重物品","形仿武器、弹药","燃料矿物、矿物油及其蒸馏产品、可燃易燃性气体、液体、固体，打火机，火柴","沥青矿物；矿物蜡；润滑油、油漆；指甲油、指甲胶","药物（麻醉药物、精神药物）、急救箱","淫秽物品、性用品","活体动、植物","种子、水果、食品、茶叶","液体、粉末，毛皮、皮肤","烟、酒","仿牌货物","发光、发热、烟花类物品","含马达、发动机","磁类货物","纯电池和配套电池货物","反动书籍、报刊、杂志、光碟","证件：身份证、护照、驾照等","压缩类气体；以及其他航司及目的地海关及法律禁运货限运的物品"],E=["食品","食材","酱料","零食","纯电池","移动电源","电动车","航模飞机","台式主机","美容美发","医疗产品","清洁剂","胶水","油漆","摩托车（头盔，轮胎）","化妆品（成品无牌）","卷尺","蚊香","肥皂","洗头水","沐浴露","牙膏","足膜足贴","运动健身贴","仿产地","摩托车排气管","特殊危险敏感贵重货物","手机及平板","性用品（药品，情趣用品）","电子烟","赌具","香烟","酒","古董"],M={TaoBao:0,PinDuoduo:1,JingDong:2,JingXi:3,HYJ:4,Alibaba:5,YunPaiDan:6,Lazada:7,Shopee:8,CrossBorder:9,OwnPlatform:10,PpxiasGhpt:11,AliExpressPlatform:12};function W(e){switch(e){case 1:return M.PinDuoduo;case 2:case 3:return M.TaoBao;case 4:return M.JingDong;case 8:return M.Alibaba;case 9:return M.Lazada;case 10:return M.JingXi;case 11:return M.Shopee;case 13:return M.CrossBorder;default:return M.PinDuoduo}}function J(e){return e=Number(e)||0,(1===e?"空运":2===e&&"陆运")||""}}}]);