(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d10963e"],{"31af":function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var n=r("b85c"),a=r("1da1"),i=r("d4ec"),c=r("bee2"),s=r("ade3"),o=(r("96cf"),r("4ec9"),r("d3b7"),r("3ca3"),r("ddb0"),r("b0c0"),r("99af"),r("7db0"),r("4de4"),r("ac1f"),r("466d"),r("4d63"),r("25f0"),r("bda5")),u=r("6ac8"),g=r("bb97"),h=r("a91f"),p=function(){function e(t){Object(i["a"])(this,e),Object(s["a"])(this,"$appConfig",new h["a"]),Object(s["a"])(this,"$baseUtilService",new u["a"]),Object(s["a"])(this,"$LogisticBridgeService",new g["a"]),Object(s["a"])(this,"$api",o["a"]),Object(s["a"])(this,"userInfo",this.$appConfig.getUserInfo()),Object(s["a"])(this,"logCallback",void 0),Object(s["a"])(this,"buyerAccountContainer",null),Object(s["a"])(this,"ordersContainer",null),Object(s["a"])(this,"allSetting",void 0),Object(s["a"])(this,"_that",null),Object(s["a"])(this,"writeLog",void 0),this.writeLog=t}return Object(c["a"])(e,[{key:"start",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var i,c,s,o,u,g,h,p,f,d,l=this,b=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=b.length>3&&void 0!==b[3]?b[3]:[],this.writeLog=a,this._that=t,e.next=5,this.getGlobalSetting();case 5:if(c=[],!i.length){e.next=10;break}c=i,e.next=13;break;case 10:return e.next=12,this.getOrdersFromServer();case 12:c=e.sent;case 13:if(c=this.filterOrder(c),c.length){e.next=17;break}return this.writeLog("目前没有需要获取物流单号的订单",!1),e.abrupt("return");case 17:this.writeLog("获取到【".concat(c.length,"】条需要同步物流的订单"),!0),s=new Map,o=function(e){var t=c[e],n=t.shot_order_info.buy_account_info?t.shot_order_info.buy_account_info.name:"",a=t.shot_order_info.buy_account_info?t.shot_order_info.buy_account_info.type:"",i=t.shot_order_sn||t.order_sn;if(!n)return l.writeLog("【".concat(e+1,"/").concat(c.length,"】订单【").concat(i,"】对应的买手号为空，请检查！"),!1),"continue";if(10001==a||1e4==a)return l.writeLog("【".concat(e+1,"/").concat(c.length,"】订单【").concat(i,"】对应的买手号【").concat(n,"】无需同步采购物流！"),!0),"continue";var o=r.find((function(e){return e.name===n}));if(!o)return l.writeLog("【".concat(e+1,"/").concat(c.length,"】订单【").concat(i,"】对应的买手号【").concat(n,"】没有找到，请登录对应买手号."),!1),"continue";if(s.has(o)){var u=s.get(o);u.push(t)}else s.set(o,[t])},u=0;case 21:if(!(u<c.length)){e.next=28;break}if(g=o(u),"continue"!==g){e.next=25;break}return e.abrupt("continue",25);case 25:u++,e.next=21;break;case 28:if(0===s.size){e.next=49;break}h=Object(n["a"])(s.keys()),e.prev=30,h.s();case 32:if((p=h.n()).done){e.next=41;break}return f=p.value,d=s.get(f),this.buyerAccountContainer=f,this.ordersContainer=d,e.next=39,this.syncLogistic();case 39:e.next=32;break;case 41:e.next=46;break;case 43:e.prev=43,e.t0=e["catch"](30),h.e(e.t0);case 46:return e.prev=46,h.f(),e.finish(46);case 49:case"end":return e.stop()}}),e,this,[[30,43,46,49]])})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"getOrdersFromServer",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=[],e.next=3,this.getOrdersFromServerCycle();case 3:return r=e.sent,200===r.code?t=r.data.orderList:this.writeLog("获取需要同步物流的订单失败原因:".concat(r.code,": ").concat(r.data),!1),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getOrdersFromServerCycle",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$api.getOriginalTrackingNumberEmpty();case 3:if(t=e.sent,200!==t.data.code){e.next=7;break}return r={total:t.data.data.length,orderList:t.data.data},e.abrupt("return",{code:200,data:r});case 7:return e.abrupt("return",{code:t.data.code,data:t.data.message});case 10:if(e.prev=10,e.t0=e["catch"](0),!e.t0.response){e.next=14;break}return e.abrupt("return",{code:e.t0.response.status,data:e.t0.response.data.message});case 14:return e.abrupt("return",{code:-2,data:"getOrdersFromServerCycle-catch:".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"filterOrder",value:function(e){return e.filter((function(e){return!e.logistics||!e.logistics.tracking_number&&e.shot_order_info&&e.shot_order_info.shot_order_sn&&e.buy_account_info}))}},{key:"syncLogistic",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.buyerAccountContainer||!this.ordersContainer){e.next=23;break}e.t0=this.buyerAccountContainer.type,e.next=1===e.t0?4:2===e.t0?7:8===e.t0?10:9===e.t0?13:10===e.t0?16:11===e.t0?19:22;break;case 4:return e.next=6,this.syncLogisticAggregation("拼多多");case 6:return e.abrupt("break",23);case 7:return e.next=9,this.syncLogisticAggregation("淘宝");case 9:return e.abrupt("break",23);case 10:return e.next=12,this.syncLogisticAggregation("1688");case 12:return e.abrupt("break",23);case 13:return e.next=15,this.syncLogisticAggregation("lazada");case 15:return e.abrupt("break",23);case 16:return e.next=18,this.syncLogisticAggregation("京喜");case 18:return e.abrupt("break",23);case 19:return e.next=21,this.syncLogisticAggregation("shopee");case 21:return e.abrupt("break",23);case 22:return e.abrupt("break",23);case 23:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"changeType",value:function(e){switch(e){case 1:return 1;case 2:return 0;case 8:return 5;case 10:return 3;case 9:return 7;case 11:return 8;default:return e}}},{key:"changeAccountParams",value:function(e){var t={UserNameCache:e.cache_path,Password:"",shotOrderPlatform:this.changeType(e.type),LoginedCookies:e.login_info,UserName:e.name,Cookiestr:JSON.stringify(e.login_info),AccountType:e.type,Ua:e.ua,Country:e.site||""};return t}},{key:"syncLogisticAggregation",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,n,a,i,c,s,o,u,g,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=this.ordersContainer,n=r.length,a=this.changeAccountParams(this.buyerAccountContainer),i=0;case 4:if(!(i<n)){e.next=42;break}if(c=r[i],s=c.shot_order_info.shot_order_sn||"",s){e.next=10;break}return this.writeLog("(".concat(t,")订单【").concat(c.order_sn,"】获取上家物流失败,订单无采购单号"),!1),e.abrupt("continue",39);case 10:return e.prev=10,e.next=13,this.$baseUtilService.getOriginLogistics(a.shotOrderPlatform,s,a);case 13:if(o=e.sent,200===o.Code){e.next=17;break}return this.writeLog("(".concat(t,")订单【").concat(s,"】获取上家物流失败, ").concat(o.Msg,"(买手号: ").concat(a.UserName,")"),!1),e.abrupt("continue",39);case 17:if(o.TrackingNumber){e.next=20;break}return this.writeLog("(".concat(t,")订单【").concat(s,"】未发货，(买手号: ").concat(a.UserName,")"),!1,"#ff9900"),e.abrupt("continue",39);case 20:return u=this.changetbOrderName(o.TrackingName),g={sysOrderId:c.id,trackingNumber:o.TrackingNumber,trackingNumberCompany:o.TrackingName},e.next=24,this.saveOrderLogistics(g);case 24:if(h=e.sent,200===h.code){e.next=28;break}return this.writeLog("(".concat(t,")订单【").concat(s,"】上报物流失败原因: ").concat(h.code,": ").concat(h.data),!1),e.abrupt("continue",39);case 28:this.writeLog("(".concat(t,")订单【").concat(s,"】同步物流成功"),!0),c.logistics||(c.logistics={}),c.logistics.tracking_number=o.TrackingNumber,c.logistics.logistics_company=o.TrackingName,c.logistics.logistics_company_code=u,e.next=39;break;case 35:return e.prev=35,e.t0=e["catch"](10),this.writeLog("订单【".concat(s,"获取上家物流失败原因(").concat(t,"): ").concat(JSON.stringify(e.t0)),!1),e.abrupt("continue",39);case 39:i++,e.next=4;break;case 42:this.ordersContainer=null,this.buyerAccountContainer=null;case 44:case"end":return e.stop()}}),e,this,[[10,35]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGlobalSetting",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$appConfig.getUserConfig();case 3:t=e.sent,r=JSON.parse(t),this.allSetting=r,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),this.allSetting=null;case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"saveOrderLogistics",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$api.uploadTrackingNumber(t);case 3:if(r=e.sent,200!==r.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:"物流信息上报成功"});case 6:return e.abrupt("return",{code:r.data.code,data:r.data.message});case 9:if(e.prev=9,e.t0=e["catch"](0),!e.t0.response){e.next=13;break}return e.abrupt("return",{code:e.t0.response.status,data:e.t0.response.data.message});case 13:return e.abrupt("return",{code:-2,data:"sync-service-saveOrderLogistics-catch:".concat(JSON.stringify(e.t0))});case 14:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delay",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var r=setTimeout((function(){clearTimeout(r),e(!0)}),t)})));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changetbOrderName",value:function(e){var t=JSON.parse(JSON.stringify(e));switch(t){case(t.match(RegExp(/圆通速递/))||{}).input:t="YTO";break;case(t.match(RegExp(/圆通快递/))||{}).input:t="YTO";break;case(t.match(RegExp(/韵达快递/))||{}).input:t="YUNDA";break;case(t.match(RegExp(/天天快递/))||{}).input:t="TTKDEX";break;case(t.match(RegExp(/顺丰速运/))||{}).input:t="SF";break;case(t.match(RegExp(/顺丰快递/))||{}).input:t="SF";break;case(t.match(RegExp(/百世快递/))||{}).input:t="HTKY";break;case(t.match(RegExp(/申通快递/))||{}).input:t="STO";break;case(t.match(RegExp(/中通快递/))||{}).input:t="ZTO";break;case(t.match(RegExp(/优速快递/))||{}).input:t="UC";break;case(t.match(RegExp(/EMS/))||{}).input:t="EMS";break;case(t.match(RegExp(/国通快递/))||{}).input:t="GTO";break;case(t.match(RegExp(/其它/))||{}).input:t="OTHER";break;case(t.match(RegExp(/极兔速递/))||{}).input:t="OTHER";break;case(t.match(RegExp(/邮政快递包裹/))||{}).input:t="POSTB";break;case(t.match(RegExp(/EMS经济快递/))||{}).input:t="EYB";break;default:t="";break}return t}}]),e}()},"8e61":function(e,t,r){"use strict";r("e99d")},bb97:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("d4ec"),a=r("bee2"),i=function(){function e(){Object(n["a"])(this,e),this.nativeService=window["LogisticBridgeService"]}return Object(a["a"])(e,[{key:"getLogisticByOrderIdAsync",value:function(e,t){return this.nativeService.getLogisticByOrderIdAsync(e,t)}}]),e}()},df50:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"auto-order"},[r("Logs",{ref:"Logs",staticClass:"logBox",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)},a=[],i=r("1da1"),c=(r("a9e3"),r("99af"),r("96cf"),r("bcd0")),s=r("de70"),o=r("0098"),u=r("31af"),g={data:function(){return{showConsole:!1,mallList:[],statusListFirst:c["C"],statusListSecond:c["z"],statusListThird:c["A"],buyerAccountList:[],logisiticeTime:2,isAutoLogisitice:"1",isApplyShopeeLogistics:"2"}},mounted:function(){var e=this;this.getAllMall(),this.$refs.Logs.writeLog("定时任务分别在五分钟、八分钟之后开启",!0),window["BaseUtilBridgeService"].checkAutoScriptLog("定时任务分别在五分钟、八分钟之后开启");try{this.syncLogis(),this.syncShopeeFace(),setTimeout((function(){e.syncOrders(e.statusListFirst,"auto-first",60),setInterval((function(){e.syncOrders(e.statusListFirst,"auto-first",60)}),144e5)}),3e5),setTimeout((function(){e.syncOrders(e.statusListSecond,"auto-second",60),setInterval((function(){e.syncOrders(e.statusListSecond,"auto-second",60)}),18e5)}),48e4),setTimeout((function(){e.syncOrders(e.statusListThird,"auto-third",60),setInterval((function(){e.syncOrders(e.statusListThird,"auto-third",60)}),36e5)}),48e4)}catch(t){this.$refs.Logs.writeLog("error".concat(t),!1)}},methods:{syncShopeeFace:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,window["ConfigBridgeService"].getUserConfig();case 2:r=t.sent,r=r&&JSON.parse(r)||{},e.isApplyShopeeLogistics=r&&r.is_apply_shopee_logistics||"2","1"===e.isApplyShopeeLogistics&&setTimeout((function(){e.syncFaceData(),setInterval((function(){e.syncFaceData()}),72e5)}),48e4);case 6:case"end":return t.stop()}}),t)})))()},syncLogis:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,window["ConfigBridgeService"].getUserConfig();case 2:if(r=t.sent,r=r&&JSON.parse(r)||{},e.isAutoLogisitice=r&&r.is_auto_ori_logistics||"1",e.logisiticeTime=r&&r.ori_logistics_interval_time||4,"2"!==e.isAutoLogisitice){t.next=10;break}return t.next=9,e.getAccountList();case 9:setTimeout((function(){e.logisticeSync(),setInterval((function(){e.logisticeSync()}),60*Number(e.logisiticeTime)*60*1e3)}),36e4);case 10:case"end":return t.stop()}}),t)})))()},syncOrders:function(e,t,r){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var i,c,o,u,g;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:window["BaseUtilBridgeService"].checkAutoScriptLog("开始自动同步订单"),n.$refs.Logs.writeLog("【".concat(t,"】开始同步"),!0),i=0;case 3:if(!(i<n.mallList.length)){a.next=17;break}c=n.mallList[i],o=0;case 6:if(!(o<e.length)){a.next=14;break}return u=e[o],g=new s["a"](c,u,n,n.$refs.Logs.writeLog),a.next=11,g.start("".concat(i+1,"/").concat(n.mallList.length),t,r);case 11:o++,a.next=6;break;case 14:i++,a.next=3;break;case 17:case"end":return a.stop()}}),a)})))()},getAllMall:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$appConfig.getGlobalCacheInfo("allMallInfo","key");case 2:if(r=t.sent,n=r&&JSON.parse(r),n)for(a in n)e.mallList.push(n[a]);case 5:case"end":return t.stop()}}),t)})))()},syncFaceData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.Logs.writeLog("开始同步面单---------------------------",!0),window["BaseUtilBridgeService"].checkAutoScriptLog("开始同步面单、平台物流"),r=new o["a"](e,e.$refs.Logs.writeLog),r.autoStart();case 4:case"end":return t.stop()}}),t)})))()},getAccountList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getBuyerList();case 2:r=t.sent,n=r.data,200===n.code&&(e.buyerAccountList=n.data);case 5:case"end":return t.stop()}}),t)})))()},logisticeSync:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return window["BaseUtilBridgeService"].checkAutoScriptLog("开始自动同步采购物流"),e.$refs.Logs.writeLog("开始自动同步采购物流---------------------------",!0),r=new u["a"],t.next=5,r.start(e,e.buyerAccountList,e.$refs.Logs.writeLog);case 5:case"end":return t.stop()}}),t)})))()}}},h=g,p=(r("8e61"),r("2877")),f=Object(p["a"])(h,n,a,!1,null,"20f062ca",null);t["default"]=f.exports},e99d:function(e,t,r){}}]);