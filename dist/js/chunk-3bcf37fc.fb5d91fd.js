(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bcf37fc"],{"03a2":function(e,t,r){},8340:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"CatchNoticeGetLogisticsOrderNo"},[r("div",{staticClass:"search"},[r("div",{staticClass:"rowOne"},[r("div",{staticClass:"flowNumber"},[e._v(" 采购物流编号： "),r("el-input",{attrs:{size:"mini",clearable:""},model:{value:e.form.shotOrderSn,callback:function(t){e.$set(e.form,"shotOrderSn",t)},expression:"form.shotOrderSn"}})],1),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.searchHandle}},[e._v("搜索")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.loginHandler(1)}}},[e._v("登录拼多多")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.loginHandler(0)}}},[e._v("登录淘宝")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.loginHandler(5)}}},[e._v("登录1688")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{size:"mini",type:"primary"},on:{click:function(t){e.siteChooseVisible=!0}}},[e._v("登录Lazada")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.syncLogistics("new")}}},[e._v("获取采购物流单号")]),r("el-checkbox",{staticStyle:{"margin-left":"15px"},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")])],1),r("div",{staticClass:"rowTwo"},[e._v("说       明：采购订单发货需及时获取采购物流单号，此通知只会同步采购后近5天未获取采购物流单号的订单")]),r("div",{staticClass:"rowThree"},[e._v("操作指引：请根据采购类型和采购账号登录对应采购账号获取采购物流单号或者手动填写采购物流单号")])]),r("div",{staticClass:"bottom"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isStart,expression:"isStart"}],staticStyle:{width:"100%"},attrs:{"header-cell-style":{background:"#f5f7fa"},data:e.tableData,border:"",height:"calc(100vh - 160px)"},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),r("el-table-column",{attrs:{type:"index",label:"序列号",width:"80"}}),r("el-table-column",{attrs:{label:"订单号",prop:"order_sn"}}),r("el-table-column",{attrs:{prop:"ori_platform",label:"采购类型"}}),r("el-table-column",{attrs:{prop:"shot_order_sn",label:"采购订单号"}}),r("el-table-column",{attrs:{prop:"shotted_at",label:"采购时间"}}),r("el-table-column",{attrs:{prop:"buy_account_info",label:"采购账号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.buy_account_info&&t.row.buy_account_info.name)+" ")]}}])}),r("el-table-column",{attrs:{prop:"pay_account_info",label:"付款账号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.pay_account_info&&t.row.pay_account_info.name)+" ")]}}])}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.logisticsOrderNoHandle(t.row)}}},[e._v("填写采购物流单号")])]}}])})],1)],1),r("el-dialog",{attrs:{title:"站点选择",visible:e.siteChooseVisible,width:"300px"},on:{"update:visible":function(t){e.siteChooseVisible=t}}},[r("div",{staticClass:"tool-item"},[r("span",[e._v("站点：")]),r("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.siteCode,callback:function(t){e.siteCode=t},expression:"siteCode"}},e._l(e.siteList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.loginHandler(7)}}},[e._v("确定")])],1)]),r("el-dialog",{attrs:{title:"采购物流单号填写",visible:e.logisticsOrderNoDialogFormVisible,width:"500px"},on:{"update:visible":function(t){e.logisticsOrderNoDialogFormVisible=t}}},[r("el-form",{staticClass:"dialog-center",attrs:{model:e.logisticsOrderNoDialogForm}},[r("el-form-item",{attrs:{label:"绑定仓库:","label-width":"80px"}},[r("el-select",{staticClass:"inputBox",attrs:{size:"mini"},model:{value:e.warehouseId,callback:function(t){e.warehouseId=t},expression:"warehouseId"}},e._l(e.logisticsOrderNoDialogWarehouseOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"物流公司:","label-width":"80px"}},[r("el-input",{staticClass:"inputBox",attrs:{size:"mini"},model:{value:e.trackingNumberCompany,callback:function(t){e.trackingNumberCompany=t},expression:"trackingNumberCompany"}})],1),r("el-form-item",{attrs:{label:"物流单号:","label-width":"80px"}},[r("el-input",{staticClass:"inputBox",attrs:{size:"mini"},model:{value:e.trackingNumber,callback:function(t){e.trackingNumber=t},expression:"trackingNumber"}})],1)],1),r("div",{staticStyle:{color:"red"}},[r("span",[e._v("关于绑定仓库选项:")]),r("p",[e._v("1、仅显示当前订单店铺绑定的仓库")]),r("p",[e._v("2、采购类型如果为国内平台时，显示国内中转仓，如果为国外平台，则显示海外仓")])]),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.logisticsOrderNoDialogHandle}},[e._v("保存")])],1)],1),r("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)},n=[],i=r("ade3"),s=r("1da1"),o=(r("b0c0"),r("96cf"),r("b85c")),c=r("d4ec"),u=r("bee2"),l=(r("4ec9"),r("d3b7"),r("3ca3"),r("ddb0"),r("7db0"),r("99af"),r("4de4"),r("ac1f"),r("466d"),r("4d63"),r("25f0"),r("bda5")),b=r("6ac8"),p=r("bb97"),d=r("a91f"),g=function(){function e(t){Object(c["a"])(this,e),Object(i["a"])(this,"$appConfig",new d["a"]),Object(i["a"])(this,"$baseUtilService",new b["a"]),Object(i["a"])(this,"$LogisticBridgeService",new p["a"]),Object(i["a"])(this,"$api",l["a"]),Object(i["a"])(this,"userInfo",this.$appConfig.getUserInfo()),Object(i["a"])(this,"logCallback",void 0),Object(i["a"])(this,"buyerAccountContainer",null),Object(i["a"])(this,"ordersContainer",null),Object(i["a"])(this,"allSetting",void 0),Object(i["a"])(this,"_that",null),this.logCallback=t}return Object(u["a"])(e,[{key:"writeLog",value:function(e,t,r){this.logCallback&&this.logCallback(e,t,r)}},{key:"start",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,i,s,c,u,l,b,p,d,g,h=this,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=f.length>2&&void 0!==f[2]?f[2]:[],this._that=t,e.next=4,this.getGlobalSetting();case 4:if(n=[],!a.length){e.next=9;break}n=a,e.next=12;break;case 9:return e.next=11,this.getOrdersFromServer();case 11:n=e.sent;case 12:if(n=this.filterOrder(n),i=n.length,i){e.next=17;break}return this._that.$refs.Logs.writeLog("没有获取到订单",!1),e.abrupt("return");case 17:this._that.$refs.Logs.writeLog("获取到【".concat(i,"】条需要同步物流的订单"),!0),s=new Map,c=function(e){var t=n[e],a=t.buy_account_info?t.buy_account_info.name:"",i=t.shot_order_sn,o=r.find((function(e){return e.UserName===a}));if(!o)return h._that.$refs.Logs.writeLog("订单【".concat(i,"】对应的买手号【").concat(a,"】没有找到，请登录对应买手号."),!1),"continue";if(s.has(o)){var c=s.get(o);c.push(t)}else s.set(o,[t])},u=0;case 21:if(!(u<i)){e.next=28;break}if(l=c(u),"continue"!==l){e.next=25;break}return e.abrupt("continue",25);case 25:u++,e.next=21;break;case 28:if(0===s.size){e.next=49;break}b=Object(o["a"])(s.keys()),e.prev=30,b.s();case 32:if((p=b.n()).done){e.next=41;break}return d=p.value,g=s.get(d),this.buyerAccountContainer=d,this.ordersContainer=g,e.next=39,this.syncLogistic();case 39:e.next=32;break;case 41:e.next=46;break;case 43:e.prev=43,e.t0=e["catch"](30),b.e(e.t0);case 46:return e.prev=46,b.f(),e.finish(46);case 49:case"end":return e.stop()}}),e,this,[[30,43,46,49]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getOrdersFromServer",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=[],e.next=3,this.getOrdersFromServerCycle();case 3:return r=e.sent,200===r.code?t=r.data.orderList:this._that.$refs.Logs.writeLog("获取需要同步物流的订单失败原因:".concat(r.code,": ").concat(r.data),!1),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getOrdersFromServerCycle",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$api.getExceptionNoTrackingNumberIndex();case 3:if(t=e.sent,200!==t.data.code){e.next=7;break}return r={total:t.data.data.count,orderList:t.data.data.data},e.abrupt("return",{code:200,data:r});case 7:return e.abrupt("return",{code:t.data.code,data:t.data.message});case 10:if(e.prev=10,e.t0=e["catch"](0),!e.t0.response){e.next=14;break}return e.abrupt("return",{code:e.t0.response.status,data:e.t0.response.data.message});case 14:return e.abrupt("return",{code:-2,data:"getOrdersFromServerCycle-catch:".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"filterOrder",value:function(e){return e.filter((function(e){return!e.logistics||!e.logistics.tracking_number&&e.shot_order_info&&e.shot_order_info.shot_order_sn&&e.buy_account_info}))}},{key:"syncLogistic",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.buyerAccountContainer||!this.ordersContainer){e.next=17;break}e.t0=this.buyerAccountContainer.shotOrderPlatform,e.next=1===e.t0?4:0===e.t0?7:5===e.t0?10:7===e.t0?13:16;break;case 4:return e.next=6,this.syncLogisticAggregation("拼多多");case 6:return e.abrupt("break",17);case 7:return e.next=9,this.syncLogisticAggregation("淘宝");case 9:return e.abrupt("break",17);case 10:return e.next=12,this.syncLogisticAggregation("1688");case 12:return e.abrupt("break",17);case 13:return e.next=15,this.syncLogisticAggregation("lazada");case 15:return e.abrupt("break",17);case 16:return e.abrupt("break",17);case 17:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"syncLogisticAggregation",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,i,s,o,c,u,l,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=this.ordersContainer,a=r.length,n=this.buyerAccountContainer,i=0;case 4:if(!(i<a)){e.next=39;break}return s=r[i],o=s.shot_order_sn||"",e.prev=7,e.next=10,this.$baseUtilService.getOriginLogistics(n.shotOrderPlatform,o,n);case 10:if(c=e.sent,200===c.Code){e.next=14;break}return this._that.$refs.Logs.writeLog("(".concat(t,")订单【").concat(o,"获取上家物流失败原因: ").concat(c.Code," : ").concat(c.Msg,"(买手号: ").concat(n.UserName,")"),!1),e.abrupt("continue",36);case 14:if(c.TrackingNumber){e.next=17;break}return this._that.$refs.Logs.writeLog("(".concat(t,")订单【").concat(o,"】未发货"),!1,"#ff9900"),e.abrupt("continue",36);case 17:return u=this.changetbOrderName(c.TrackingName),l={sysOrderId:s.sys_order_id,trackingNumber:c.TrackingNumber,trackingNumberCompany:c.TrackingName},e.next=21,this.saveOrderLogistics(l);case 21:if(b=e.sent,200===b.code){e.next=25;break}return this._that.$refs.Logs.writeLog("(".concat(t,")订单【").concat(o,"】上报物流失败原因: ").concat(b.code,": ").concat(b.data),!1),e.abrupt("continue",36);case 25:this._that.$refs.Logs.writeLog("(".concat(t,")订单【").concat(o,"】同步物流成功"),!0),s.logistics||(s.logistics={}),s.logistics.tracking_number=c.TrackingNumber,s.logistics.logistics_company=c.TrackingName,s.logistics.logistics_company_code=u,e.next=36;break;case 32:return e.prev=32,e.t0=e["catch"](7),this._that.$refs.Logs.writeLog("订单【".concat(o,"获取上家物流失败原因(").concat(t,"): ").concat(JSON.stringify(e.t0)),!1),e.abrupt("continue",36);case 36:i++,e.next=4;break;case 39:this.ordersContainer=null,this.buyerAccountContainer=null;case 41:case"end":return e.stop()}}),e,this,[[7,32]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGlobalSetting",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$appConfig.getUserConfig();case 3:t=e.sent,r=JSON.parse(t),this.allSetting=r,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),this.allSetting=null;case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"saveOrderLogistics",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._that.$api.uploadTrackingNumber(t);case 3:if(r=e.sent,200!==r.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:"物流信息上报成功"});case 6:return e.abrupt("return",{code:r.data.code,data:r.data.message});case 9:if(e.prev=9,e.t0=e["catch"](0),!e.t0.response){e.next=13;break}return e.abrupt("return",{code:e.t0.response.status,data:e.t0.response.data.message});case 13:return e.abrupt("return",{code:-2,data:"sync-service-saveOrderLogistics-catch:".concat(JSON.stringify(e.t0))});case 14:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delay",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var r=setTimeout((function(){clearTimeout(r),e(!0)}),t)})));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changetbOrderName",value:function(e){var t=JSON.parse(JSON.stringify(e));switch(t){case(t.match(RegExp(/圆通速递/))||{}).input:t="YTO";break;case(t.match(RegExp(/圆通快递/))||{}).input:t="YTO";break;case(t.match(RegExp(/韵达快递/))||{}).input:t="YUNDA";break;case(t.match(RegExp(/天天快递/))||{}).input:t="TTKDEX";break;case(t.match(RegExp(/顺丰速运/))||{}).input:t="SF";break;case(t.match(RegExp(/顺丰快递/))||{}).input:t="SF";break;case(t.match(RegExp(/百世快递/))||{}).input:t="HTKY";break;case(t.match(RegExp(/申通快递/))||{}).input:t="STO";break;case(t.match(RegExp(/中通快递/))||{}).input:t="ZTO";break;case(t.match(RegExp(/优速快递/))||{}).input:t="UC";break;case(t.match(RegExp(/EMS/))||{}).input:t="EMS";break;case(t.match(RegExp(/国通快递/))||{}).input:t="GTO";break;case(t.match(RegExp(/其它/))||{}).input:t="OTHER";break;case(t.match(RegExp(/极兔速递/))||{}).input:t="OTHER";break;case(t.match(RegExp(/邮政快递包裹/))||{}).input:t="POSTB";break;case(t.match(RegExp(/EMS经济快递/))||{}).input:t="EYB";break;default:t="";break}return t}}]),e}(),h={data:function(){return{logisticsOrderNoDialogFormVisible:!1,logisticsOrderNoDialogForm:{},trackingNumber:"",trackingNumberCompany:"",warehouseId:"",logisticsOrderNoDialogWarehouseOptions:[{value:"1",label:"星卓越泰国海外仓"},{value:"2",label:"东莞华夏本土仓"}],form:{shotOrderSn:""},showConsole:!0,tableData:[],logData:"",isStart:!1,siteCode:"TH",siteChooseVisible:!1,siteList:[{value:"TH",label:"泰国站"},{value:"MY",label:"马来站"},{value:"VN",label:"越南站"},{value:"ID",label:"印尼站"},{value:"PH",label:"菲律宾站"},{value:"SG",label:"新加坡站"}],buyerAccountList:[],multipleSelection:[],rowInfo:{}}},mounted:function(){this.getExceptionNoTrackingNumberIndex()},methods:{loginHandler:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.siteChooseVisible=!1,a="",r.t0=e,r.next=1===r.t0?5:0===r.t0?9:5===r.t0?13:7===r.t0?17:21;break;case 5:return r.next=7,t.$buyerAccountService.pddLogin();case 7:return a=r.sent,r.abrupt("break",23);case 9:return r.next=11,t.$buyerAccountService.taobaoLogin();case 11:return a=r.sent,r.abrupt("break",23);case 13:return r.next=15,t.$buyerAccountService.alibabaLogin();case 15:return a=r.sent,r.abrupt("break",23);case 17:return r.next=19,t.$buyerAccountService.lazadaLogin(t.siteCode);case 19:return a=r.sent,r.abrupt("break",23);case 21:return t.$message.error("不存在该平台，请校验后再次尝试！"),r.abrupt("break",23);case 23:a&&t.upBuyerAccountList(a,e);case 24:case"end":return r.stop()}}),r)})))()},handleSelectionChange:function(e){this.multipleSelection=e},changeAccountType:function(e){var t=e;switch(e){case 1:t=1;break;case 2:t=2;break;case 8:t=6;break;default:break}return t},changeShotOrderPlatform:function(e){var t=e;switch(e){case 1:t=1;break;case 2:t=0;break;case 8:t=5;break;case 9:t=7;break;default:break}return t},upBuyerAccountList:function(e,t){var r=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={UserName:e.name,UserNameCache:e.cache_path,Password:"",shotOrderPlatform:t,LoginedCookies:e.loginCookies},Object(i["a"])(n,"UserName",e.name),Object(i["a"])(n,"Cookiestr",JSON.stringify(e.loginCookies)),Object(i["a"])(n,"AccountType",r.changeAccountType(e.type)),Object(i["a"])(n,"Ua",e.ua),Object(i["a"])(n,"Country",e.country||""),Object(i["a"])(n,"type",e.type),s=n,o=s.AccountType+s.UserName,a.next=4,r.$appConfig.UpdateCacheInfo("buyerInfo",o,s);case 4:case"end":return a.stop()}}),a)})))()},searchHandle:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isStart){t.next=3;break}return e.$message.error("正在获取数据"),t.abrupt("return");case 3:return e.isStart=!0,t.next=6,e.$api.getExceptionNoTrackingNumberIndex(e.form);case 6:r=t.sent,200===r.data.code?e.tableData=r.data.data.data:e.$message.error(r.data.message),setTimeout((function(){e.isStart=!1}),3e3);case 9:case"end":return t.stop()}}),t)})))()},logisticsOrderNoHandle:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,t.rowInfo=e,t.logisticsOrderNoDialogFormVisible=!0,r.next=5,t.$appConfig.getWarehouseInfo(e.platform_mall_id);case 5:a=r.sent,n=a&&JSON.parse(a),t.warehouseId=n&&n[0]&&n[0].warehouse_id,r.next=12;break;case 10:r.prev=10,r.t0=r["catch"](0);case 12:case"end":return r.stop()}}),r,null,[[0,10]])})))()},logisticsOrderNoDialogHandle:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={sysOrderId:e.rowInfo.sys_order_id,lists:[{id:"0",trackingNumber:e.trackingNumber,trackingNumberCompany:e.trackingNumberCompany}],warehouseId:e.warehouseId},t.next=3,e.$api.updateOrderTrackingNumber(r);case 3:a=t.sent,200===a.data.code?(e.logisticsOrderNoDialogFormVisible=!1,e.trackingNumber="",e.trackingNumberCompany="",e.$message({message:"采购物流单号添加成功",type:"success"}),e.getExceptionNoTrackingNumberIndex()):e.$message.error(a.data.message);case 5:case"end":return t.stop()}}),t)})))()},syncLogistics:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,i,s,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.$refs.Logs.writeLog("获取采购物流轨迹开始",!0),a=new g(t.writeLog,e),r.next=6,t.$appConfig.getGlobalCacheInfo("buyerInfo","key");case 6:if(n=r.sent,n){r.next=9;break}return r.abrupt("return",t.$refs.Logs.writeLog("没有买手号",!1));case 9:for(o in i=JSON.parse(n),s=[],i)s.push(i[o]);if(s.length){r.next=14;break}return r.abrupt("return",t.$refs.Logs.writeLog("没有买手号",!1));case 14:t.multipleSelection.length>0?a.start(t,s,t.multipleSelection):a.start(t,s);case 15:case"end":return r.stop()}}),r)})))()},getExceptionNoTrackingNumberIndex:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getExceptionNoTrackingNumberIndex();case 2:r=t.sent,200===r.data.code?e.tableData=r.data.data.data:e.$message.error(r.data.message);case 4:case"end":return t.stop()}}),t)})))()}}},f=h,m=(r("fe3d"),r("2877")),v=Object(m["a"])(f,a,n,!1,null,"b631bc9e",null);t["default"]=v.exports},b85c:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");var a=r("06c5");function n(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=Object(a["a"])(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,s=e},f:function(){try{o||null==r["return"]||r["return"]()}finally{if(c)throw s}}}}},bb97:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var a=r("d4ec"),n=r("bee2"),i=function(){function e(){Object(a["a"])(this,e),this.nativeService=window["LogisticBridgeService"]}return Object(n["a"])(e,[{key:"getLogisticByOrderIdAsync",value:function(e,t){return this.nativeService.getLogisticByOrderIdAsync(e,t)}}]),e}()},fe3d:function(e,t,r){"use strict";r("03a2")}}]);