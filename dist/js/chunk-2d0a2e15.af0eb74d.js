(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a2e15"],{"0098":function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var a=r("1da1"),n=r("d4ec"),i=r("bee2"),s=r("ade3"),c=(r("96cf"),r("4de4"),r("159b"),r("99af"),r("c740"),r("7db0"),r("a9e3"),r("d3b7"),r("25f0"),r("caad"),r("2532"),r("5b81"),r("ac1f"),r("1276"),r("466d"),r("5cc6"),r("9a8c"),r("a975"),r("735e"),r("c1ac"),r("d139"),r("3a7b"),r("d5d6"),r("82f8"),r("e91f"),r("60bd"),r("5f96"),r("3280"),r("3fcc"),r("ca91"),r("25a1"),r("cd26"),r("3c5d"),r("2954"),r("649e"),r("219c"),r("170b"),r("b39a9"),r("72f7"),r("5319"),r("3ca3"),r("ddb0"),r("fb6a"),r("bda5")),o=r("5f91"),u=r("b5e1"),d=r("a91f"),l=r("1431"),h=r.n(l),p=r("0e0b"),b=r("bcd0"),f=function(){function e(t,r){Object(n["a"])(this,e),Object(s["a"])(this,"$api",c["a"]),Object(s["a"])(this,"$shopeemanService",new o["a"]),Object(s["a"])(this,"$commodityService",new u["a"]),Object(s["a"])(this,"$appConfig",new d["a"]),Object(s["a"])(this,"isStop",!1),Object(s["a"])(this,"_this",null),Object(s["a"])(this,"pageSize",40),Object(s["a"])(this,"writeLog",void 0),Object(s["a"])(this,"orders",[]),Object(s["a"])(this,"schemaType",""),Object(s["a"])(this,"activeType","handle"),Object(s["a"])(this,"isAuto",!1),Object(s["a"])(this,"isApplyForceFaceInfo",!1),this._this=t,this.writeLog=r}return Object(i["a"])(e,[{key:"autoStart",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r,a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isAuto=!0,this.activeType="auto",e.prev=2,this.isApplyForceFaceInfo=!1,e.next=6,this.$api.getEmptyTrackingNoOrder();case 6:if(t=e.sent,200!==t.data.code){e.next=24;break}if(r=t.data.data||[],a=r.filter((function(e){return"TW"!=e.country})),a.length){e.next=12;break}return e.abrupt("return",this.writeLog("【自动同步物流-面单】，终止-目前没有要同步的订单！",!1));case 12:this.writeLog("一共获取到需要自动同步的订单".concat(a.length,"条"),!0),n=0;case 14:if(!(n<a.length)){e.next=21;break}return i=a[n],e.next=18,this.autoMainFlow(i);case 18:n++,e.next=14;break;case 21:this.writeLog("自动同步物流-面单完成",!0),e.next=25;break;case 24:this.writeLog("【自动同步物流-面单】，终止-获取待同步物流订单数据失败",!1);case 25:e.next=30;break;case 27:return e.prev=27,e.t0=e["catch"](2),e.abrupt("return",this.writeLog("【自动同步物流-面单】，终止-".concat(e.t0),!1));case 30:case"end":return e.stop()}}),e,this,[[2,27]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"autoStartStore",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r,a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isAuto=!0,this.activeType="auto",e.prev=2,this.isApplyForceFaceInfo=!1,e.next=6,this.$api.getNotHaveLogisticsInformations();case 6:if(t=e.sent,200!==t.data.code){e.next=25;break}if(r=t.data.data||[],a=[],r.forEach((function(e){e.orders.forEach((function(t){t.platform_mall_id=e.platform_mall_id,a.push(t)}))})),a.length){e.next=13;break}return e.abrupt("return",this.writeLog("【自动同步仓库中没有面单-面单】，终止-目前没有要同步的订单！",!1));case 13:this.writeLog("【仓库中没有面单】一共获取到需要自动同步的订单".concat(a.length,"条"),!0),n=0;case 15:if(!(n<a.length)){e.next=22;break}return i=a[n],e.next=19,this.autoMainFlow(i);case 19:n++,e.next=15;break;case 22:this.writeLog("自动仓库中没有面单完成",!0),e.next=26;break;case 25:this.writeLog("【自动仓库中没有面单】，终止获取数据失败",!1);case 26:e.next=31;break;case 28:return e.prev=28,e.t0=e["catch"](2),e.abrupt("return",this.writeLog("【自动仓库中没有面单】，终止-".concat(e.t0),!1));case 31:case"end":return e.stop()}}),e,this,[[2,28]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"autoStartNoLogi",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r,a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isAuto=!0,this.activeType="auto",e.prev=2,this.isApplyForceFaceInfo=!1,e.next=6,this.$api.getNoLogisticsOrders();case 6:if(t=e.sent,200!==t.data.code){e.next=25;break}if(r=t.data.data||[],a=[],r.forEach((function(e){e.orders.forEach((function(t){t.platform_mall_id=e.platform_mall_id,a.push(t)}))})),a.length){e.next=13;break}return e.abrupt("return",this.writeLog("【自动同步订单中没有面单-面单】，终止-目前没有要同步的订单！",!1));case 13:this.writeLog("【订单中没有面单】一共获取到需要自动同步的订单".concat(a.length,"条"),!0),n=0;case 15:if(!(n<a.length)){e.next=22;break}return i=a[n],e.next=19,this.autoMainFlow(i);case 19:n++,e.next=15;break;case 22:this.writeLog("自动同步物流-面单完成",!0),e.next=26;break;case 25:this.writeLog("【自动同步物流-面单】，终止-获取待同步物流订单数据失败",!1);case 26:e.next=31;break;case 28:return e.prev=28,e.t0=e["catch"](2),e.abrupt("return",this.writeLog("【自动同步物流-面单】，终止-".concat(e.t0),!1));case 31:case"end":return e.stop()}}),e,this,[[2,28]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"autoMainFlow",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,i,s,c,o,u,d,l,h,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("TW"!==t.country){e.next=2;break}return e.abrupt("return",this.writeLog("自动流程不同步台湾站面单",!1));case 2:if(r=t.platform_mall_id||(t.mall_info?t.mall_info.platform_mall_id:""),a=t.sys_mall_id||(t.mall_info?t.mall_info.id:"")||"",n=t.order_id||t.platform_order_id,i=t.country||"",s=t.order_sn||t.main_order_sn||t.platform_order_sn,e.prev=7,c=null,0!=n&&n){e.next=17;break}return o={keyword:s,shop_id:r},e.next=13,this.$shopeemanService.getOrderHint(i,o);case 13:u=e.sent,c=200===u.code&&u.data&&u.data.orders&&u.data.orders.length&&u.data.orders[0]||null,e.next=22;break;case 17:return d={order_id:n,shop_id:r},e.next=20,this.$shopeemanService.getDetailsSinger(i,d);case 20:l=e.sent,c=200===l.code&&l.data||null;case 22:if(c){e.next=25;break}return this.writeLog("订单【".concat(s,"】同步面单失败,获取订单详情失败,请检查店铺登录状态！"),!1),e.abrupt("return");case 25:if(h=this.checkTrackInfo(c),!h.trackingNo){e.next=33;break}return e.next=29,this.uploadTrackingNo(a,r,s,h.trackingNo,h.logistics_channel);case 29:return e.next=31,this.getPrintInfoFlow(a,c,i,h.trackingNo);case 31:e.next=43;break;case 33:return e.next=35,this.applyOrderTrackingNo(n,r,c.logistics_channel,i,a,s);case 35:if(p=e.sent,200!==p.code){e.next=41;break}return e.next=39,this.getPrintInfoFlow(a,c,i,p.data);case 39:e.next=43;break;case 41:return this.writeLog("订单【".concat(s,"】同步面单失败,获取运单号失败,").concat(p.data),!1),e.abrupt("return");case 43:e.next=47;break;case 45:e.prev=45,e.t0=e["catch"](7);case 47:case"end":return e.stop()}}),e,this,[[7,45]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"handleStart",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.isAuto=!1,this.activeType="handle",this.isApplyForceFaceInfo=r||!1,this.orders=t,a=0;case 5:if(!(a<t.length)){e.next=12;break}return n=t[a],e.next=9,this.handleMainFlow(n);case 9:a++,e.next=5;break;case 12:this.writeLog("面单同步已完成",!0);case 13:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"handleMainFlow",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,i,s,c,o,u,d,l,h,p,b,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.platform_mall_id||(t.mall_info?t.mall_info.platform_mall_id:""),a=t.sys_mall_id||(t.mall_info?t.mall_info.id:""),n=t.order_id,i=t.country,s=t.order_sn||t.main_order_sn,e.prev=5,c=null,0!=n&&n){e.next=15;break}return o={keyword:s,shop_id:r},e.next=11,this.$shopeemanService.getOrderHint(i,o);case 11:u=e.sent,c=200===u.code&&u.data&&u.data.orders&&u.data.orders.length&&u.data.orders[0]||null,e.next=20;break;case 15:return d={order_id:n,shop_id:r},e.next=18,this.$shopeemanService.getDetailsSinger(i,d);case 18:l=e.sent,c=200===l.code&&l.data||null;case 20:if(c){e.next=23;break}return this.writeLog("订单【".concat(s,"】同步面单失败,获取订单详情失败,请检查店铺登录状态！"),!1),e.abrupt("return");case 23:if(h=this.checkTrackInfo(c),!h.trackingNo){e.next=38;break}return e.next=27,this.uploadTrackingNo(a,r,s,h.trackingNo,h.logistics_channel);case 27:if(p=this._this.tableData.findIndex((function(e){return e.order_sn===t.order_sn})),p>-1&&this._this.$set(this._this.tableData[p],"tracking_no",h.trackingNo),"TW"!==t.country){e.next=34;break}return e.next=32,this.getPrintTWinfoFlow(a,c,i,h.trackingNo);case 32:e.next=36;break;case 34:return e.next=36,this.getPrintInfoFlow(a,c,i,h.trackingNo);case 36:e.next=55;break;case 38:return e.next=40,this.applyOrderTrackingNo(n,r,c.logistics_channel,i,a,s);case 40:if(b=e.sent,200!==b.code){e.next=53;break}if(f=this._this.tableData.findIndex((function(e){return e.order_sn===t.order_sn})),f>-1&&this._this.$set(this._this.tableData[f],"tracking_no",b.data),"TW"!==t.country){e.next=49;break}return e.next=47,this.getPrintTWinfoFlow(a,c,i,b.data);case 47:e.next=51;break;case 49:return e.next=51,this.getPrintInfoFlow(a,c,i,b.data);case 51:e.next=55;break;case 53:return this.writeLog("订单【".concat(s,"】同步面单失败，获取运单号失败,").concat(b.data),!1),e.abrupt("return");case 55:e.next=59;break;case 57:e.prev=57,e.t0=e["catch"](5);case 59:case"end":return e.stop()}}),e,this,[[5,57]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getForderLogistics",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={order_id:t,shop_id:r},e.next=3,this.$shopeemanService.getForderLogistics(a,n);case 3:if(i=e.sent,!(i&&200===i.code&&i.data&&i.data.list&&i.data.list.length)){e.next=8;break}return e.abrupt("return",i.data.list[0].thirdparty_tracking_number);case 8:return e.abrupt("return","");case 9:case"end":return e.stop()}}),e,this)})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"getDropOff",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={order_id:t,shop_id:r},e.next=3,this.$shopeemanService.getDropOff(a,n);case 3:return i=e.sent,s=i.data&&i.data.list&&i.data.list[0]&&i.data.list[0].forders&&i.data.list[0].forders[0]&&i.data.list[0].forders[0].third_party_tn||null,s||(s=i.data&&i.data.consignment_no||""),e.abrupt("return",s);case 7:case"end":return e.stop()}}),e,this)})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"checkTrackInfo",value:function(e){var t={};t["orderId"]=e.order_id;var r=e.shipping_traceno;if(!r){var a=JSON.parse(e.logistics_extra_data);a&&a.sls_info&&a.sls_info.last_mile_tracking_number&&(r=a.sls_info.last_mile_tracking_number)}return t["trackingNo"]=r,t["logistics_channel"]=e.logistics_channel||"",t}},{key:"checkIsAutoApplyTrackingNumber",value:function(e){var t=b["x"].find((function(t){return t.ShipId==e}));return!(!t||1!=t.IsDeafult)}},{key:"applyOrderTrackingNo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i,s){var c,o,u,d,l,h,b,f,g,_,m,k,x,w,v,y;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("TW"!==n||this.isApplyForceFaceInfo){e.next=2;break}return e.abrupt("return",{code:50001,data:"台湾站不强制申请物流单号"});case 2:return e.next=4,this.$appConfig.getUserConfig();case 4:if(c=e.sent,o=c&&JSON.parse(c),"TW"===n||o&&o.is_apply_shopee_logistics){e.next=9;break}if(this.isApplyForceFaceInfo){e.next=9;break}return e.abrupt("return",this.getShopeeShipNumber(t,r,n,i,s));case 9:if(u=this.checkIsAutoApplyTrackingNumber(a),u){e.next=12;break}return e.abrupt("return",this.getShopeeShipNumber(t,r,n,i,s,"不支持自动申请虾皮运输单号功能"));case 12:if(e.prev=12,"TW"!==n){e.next=54;break}return d={shop_id:r},e.next=17,this.$shopeemanService.getShopSellerRealName(n,d);case 17:if(l=e.sent,h=""!=l&&l?l:null,h||(h="nick"),"30001"!=a){e.next=41;break}return b={shop_id:r},e.next=24,this.$shopeemanService.getShop(n,b);case 24:if(f=e.sent,g=200===f.code&&f.data.pickup_address_id||null,g){e.next=28;break}return e.abrupt("return",{code:50002,data:"no_address"});case 28:return _={order_id:t,address_id:g,channel_id:a,shop_id:r},e.next=31,this.$shopeemanService.getPickupTimeSlots(n,_);case 31:if(m=e.sent,k=200===m.code&&m.data.time_slots&&m.data.time_slots[0].value||null,k){e.next=35;break}return e.abrupt("return",{code:50003,data:"no_pickup_time"});case 35:return x={order_id:t,channel_id:a,forder_id:t,seller_real_name:h,pickup_time:k,seller_address_id:g,shop_id:r},e.next=38,this.$shopeemanService.handleOutOrder(n,x);case 38:e.sent,e.next=52;break;case 41:if("30014"!=a&&"30015"!=a){e.next=48;break}return w={order_id:t,seller_real_name:h,slug:"30014"==a?"SLTW003":"SLTW001",shipping_mode:"dropoff",shop_id:r},e.next=45,this.$shopeemanService.handleOutOrder(n,w);case 45:e.sent,e.next=52;break;case 48:return v={order_id:t,channel_id:a,forder_id:t,seller_real_name:h,shop_id:r},e.next=51,this.$shopeemanService.handleOutOrder(n,v);case 51:e.sent;case 52:e.next=58;break;case 54:return y={order_id:t,channel_id:a,forder_id:t,shop_id:r},e.next=57,this.$shopeemanService.handleOutOrder(n,y);case 57:e.sent;case 58:return e.next=60,Object(p["y"])(2e3);case 60:return e.abrupt("return",this.getShopeeShipNumber(t,r,n,i,s,"",a));case 63:return e.prev=63,e.t0=e["catch"](12),e.abrupt("return",{code:50004,data:"catch - error"});case 66:case"end":return e.stop()}}),e,this,[[12,63]])})));function t(t,r,a,n,i,s){return e.apply(this,arguments)}return t}()},{key:"uploadTrackingNo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i){var s,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=[{orderSn:a,trackingNo:n,logisticsId:i}],e.next=3,this.$commodityService.saveLogisticsInfo(t,r,s);case 3:c=e.sent,o=JSON.parse(c),200===o.code?this.writeLog("订单【".concat(a,"】同步物流成功，上报成功"),!0):this.writeLog("订单【".concat(a,"】同步物流失败，上报失败"),!1);case 6:case"end":return e.stop()}}),e,this)})));function t(t,r,a,n,i){return e.apply(this,arguments)}return t}()},{key:"getShopeeShipNumber",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i,s){var c,o,u,d,l,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.prev=0,c="",o="",u={order_id:t,shop_id:r},d=0;case 5:if(!(d<3)){e.next=23;break}return e.next=8,this.$shopeemanService.getDropOff(a,u);case 8:if(l=e.sent,l&&200!==!l.code&&l.data){e.next=11;break}return e.abrupt("continue",20);case 11:if(h=l.data&&l.data.list&&l.data.list[0]&&l.data.list[0].forders[0].third_party_tn||"",null!=h&&""!=h||(h=l.data.consignment_no||""),o=l.data&&l.data.channel_id||"",c=h||"",""!==c){e.next=19;break}return e.abrupt("continue",20);case 19:return e.abrupt("break",23);case 20:d++,e.next=5;break;case 23:if(!c){e.next=29;break}return e.next=26,this.uploadTrackingNo(n,r,i,c,o);case 26:return e.abrupt("return",{code:200,data:c});case 29:return e.abrupt("return",{code:50005,data:s||"未获取到物流单号"});case 30:e.next=35;break;case 32:return e.prev=32,e.t0=e["catch"](0),e.abrupt("return",{code:50006,data:"error"});case 35:case"end":return e.stop()}}),e,this,[[0,32]])})));function t(t,r,a,n,i,s){return e.apply(this,arguments)}return t}()},{key:"getPrintInfoFlow",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n){var i,s,c,o,u,d,l,h,b,f,g,_;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getPrintWaybillType(r.shop_id,a);case 3:if(i=e.sent,200===i.code&&i.data){e.next=7;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败[501]"),!1),e.abrupt("return");case 7:return this.writeLog("订单【".concat(r.order_sn,"】获取面单类型成功"),!0),s=i.data.waybill_type,c=[{order_id:Number(r.order_id),shop_id:Number(r.shop_id),region_id:a}],e.next=12,this.checkPackagePrintWaybillMultiShop(c,r.shop_id,a);case 12:if(o=e.sent,200===o.code&&o.data.list&&o.data.list.length&&o.data.list[0].package_number){e.next=16;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，未获取到包裹号[502]"),!1),e.abrupt("return");case 16:return this.writeLog("订单【".concat(r.order_sn,"】获取包裹号成功"),!0),u=o.data.list[0].package_number,e.next=20,this.getSdConfig(r.shop_id,a);case 20:if(d=e.sent,d){e.next=24;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，获取面单打印配置失败[503]"),!1),e.abrupt("return");case 24:return this.writeLog("订单【".concat(r.order_sn,"】获取面单打印配置成功"),!0),"VN"===a&&"NORMAL"===s&&(d=2),"THERMAL"===s&&(d=3),l=[{order_id:Number(r.order_id),package_number:u,region_id:a,shop_id:Number(r.shop_id),channel_id:Number(r.logistics_channel)}],e.next=30,this.createSdJobsMultiShop(l,r.shop_id,a,s+"_PDF","Air Waybill."+r.actual_carrier,d);case 30:if(h=e.sent,200===h.code&&h.data.list&&h.data.list.length&&h.data.list[0].job_id){e.next=34;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，创建打印任务失败[504]"),!1),e.abrupt("return");case 34:return this.writeLog("订单【".concat(r.order_sn,"】创建打印任务成功"),!0),b=h.data.list[0].job_id,e.next=38,Object(p["y"])(2e3);case 38:return e.next=40,this.downloadSdJob(r.shop_id,b,a);case 40:if(f=e.sent,200===f.code){e.next=50;break}if(120510475!==f.code){e.next=48;break}return e.next=45,this.downloadSdJob(r.shop_id,b,a);case 45:f=e.sent,e.next=50;break;case 48:return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，").concat(f.message),!1),e.abrupt("return");case 50:if(g=f.data,g){e.next=54;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败,下载失败[505]"),!1),e.abrupt("return");case 54:return e.next=56,this.checkFaceInfo(g,r.order_sn,n,r.actual_carrier,a,d,r);case 56:if(_=e.sent,200===_.code){e.next=60;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，").concat(_.data,"[508]"),!1),e.abrupt("return");case 60:return e.next=62,this.uploadFaceInfo(t.toString(),r.shop_id.toString(),r.order_sn.toString(),_.data,".PDF");case 62:e.next=67;break;case 64:e.prev=64,e.t0=e["catch"](0),this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，获取面单打印配置失败[000]"),!1);case 67:case"end":return e.stop()}}),e,this,[[0,64]])})));function t(t,r,a,n){return e.apply(this,arguments)}return t}()},{key:"uploadFaceInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i){var s,c,o,u,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=Object(p["w"])(!1,32)+"_"+(new Date).getTime()+i,e.next=3,this._this.$ossService.uploadFile(n,s);case 3:if(c=e.sent,!c){e.next=19;break}return o=[{url:c,orderSn:a.toString(),is_auto:this.isAuto}],{sysMallId:t.toString(),mallId:r,faceSheetInfos:o},e.next=9,this.$commodityService.saveFaceSheetInfo(t,r,o);case 9:if(u=e.sent,d=JSON.parse(u),!d||200!==d.code){e.next=16;break}return"handle"===this.activeType&&(l=this._this.tableData.findIndex((function(e){return e.order_sn===a})),l>-1&&this._this.$set(this._this.tableData[l],"hasLogistics","1")),e.abrupt("return",this.writeLog("订单【".concat(a,"】同步面单成功,上报成功"),!0));case 16:return e.abrupt("return",this.writeLog("订单【".concat(a,"】同步面单失败，上报失败，").concat(d.data.message),!1));case 17:e.next=20;break;case 19:return e.abrupt("return",this.writeLog("订单【".concat(a,"】获取面单异常！"),!1));case 20:case"end":return e.stop()}}),e,this)})));function t(t,r,a,n,i){return e.apply(this,arguments)}return t}()},{key:"getPrintTWinfoFlow",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,i,s,c,o,u,d,l,h,b,f,g=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=g.length>2&&void 0!==g[2]?g[2]:"TW",n=g.length>3?g[3]:void 0,e.prev=2,"30001"!=r.logistics_channel){e.next=6;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，黑猫无面单"),!1),e.abrupt("return",null);case 6:i="C2C_SHIPPING_LABEL_HTML",e.t0=Number(r.logistics_channel),e.next=30012===e.t0||30014===e.t0||30015===e.t0?10:12;break;case 10:return i="THERMAL_PDF",e.abrupt("break",14);case 12:return i="C2C_SHIPPING_LABEL_HTML",e.abrupt("break",14);case 14:return s=[{order_id:Number(r.order_id),shop_id:Number(r.shop_id),region_id:a}],e.next=17,this.checkPackagePrintWaybillMultiShop(s,r.shop_id,a);case 17:if(c=e.sent,200===c.code&&c.data.list&&c.data.list.length&&c.data.list[0].package_number){e.next=21;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，未获取到包裹号[502]"),!1),e.abrupt("return");case 21:if(o=c.data.list[0].package_number,u=null,"30012"!=r.logistics_channel){e.next=27;break}u=3,e.next=34;break;case 27:if("30014"!=r.logistics_channel&&"30015"!=r.logistics_channel){e.next=31;break}u=14,e.next=34;break;case 31:return e.next=33,this.getSdConfig(r.shop_id,a);case 33:u=e.sent;case 34:if(u){e.next=37;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，获取面单打印配置失败[503]"),!1),e.abrupt("return");case 37:return d=[{order_id:Number(r.order_id),package_number:o,region_id:a,shop_id:Number(r.shop_id)}],"30014"!=r.logistics_channel&&"30015"!=r.logistics_channel||(d[0]["channel_id"]=r.logistics_channel),e.next=41,this.createSdJobsMultiShop(d,r.shop_id,a,i,"寄件单"+r.actual_carrier,u);case 41:if(l=e.sent,200===l.code&&l.data.list&&l.data.list.length&&l.data.list[0].job_id){e.next=45;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，创建打印任务失败"),!1),e.abrupt("return");case 45:return h=l.data.list[0].job_id,e.next=48,Object(p["y"])(3e3);case 48:return e.next=50,this.downloadTwFace(r,h,a,n);case 50:if(b=e.sent,!b){e.next=69;break}if("30005"!=r.logistics_channel&&"30006"!=r.logistics_channel){e.next=57;break}return e.next=55,this.uploadFaceInfo(t.toString(),r.shop_id.toString(),r.order_sn.toString(),b,".html");case 55:e.next=67;break;case 57:return e.next=59,this.checkFaceInfo(b,r.order_sn,n,r.actual_carrier,a,u);case 59:if(f=e.sent,200===f.code){e.next=65;break}return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，").concat(f.data),!1),e.abrupt("return");case 65:return e.next=67,this.uploadFaceInfo(t.toString(),r.shop_id.toString(),r.order_sn.toString(),f.data,".PDF");case 67:e.next=71;break;case 69:return this.writeLog("订单【".concat(r.order_sn,"】同步面单失败，下载面单失败"),!1),e.abrupt("return");case 71:e.next=75;break;case 73:e.prev=73,e.t1=e["catch"](2);case 75:case"end":return e.stop()}}),e,this,[[2,73]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"downloadTwFace",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n){var i,s,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("30005"!=t.logistics_channel){e.next=8;break}return e.next=3,this.downloadSdJobTW(t.shop_id,r,a);case 3:if(i=e.sent,i){e.next=7;break}return this.writeLog("订单【".concat(t.order_sn,"】同步面单失败,下载失败[505]"),!1),e.abrupt("return",null);case 7:return e.abrupt("return",this.get711FaceInfo(n,i));case 8:if("30006"!=t.logistics_channel){e.next=17;break}return e.next=11,this.downloadSdJobTW(t.shop_id,r,a);case 11:if(s=e.sent,s){e.next=16;break}return this.writeLog("订单【".concat(t.order_sn,"】同步面单失败,下载失败[505]"),!1),e.abrupt("return");case 16:return e.abrupt("return",this.getQuanJiaFaceInfo(n,s,t.shop_id));case 17:return e.next=19,this.downloadSdJob(t.shop_id,r,a);case 19:if(c=e.sent,200===c.code){e.next=29;break}if(120510475!==c.code){e.next=27;break}return e.next=24,this.downloadSdJob(t.shop_id,r,a);case 24:c=e.sent,e.next=29;break;case 27:return this.writeLog("订单【".concat(t.order_sn,"】同步面单失败,下载失败,").concat(c.message),!1),e.abrupt("return",null);case 29:return e.abrupt("return",c.data);case 30:case"end":return e.stop()}}),e,this)})));function t(t,r,a,n){return e.apply(this,arguments)}return t}()},{key:"get711FaceInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,i,s,c,o,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=h.a.load(r),n=a('input[name="tempvar"]')[0].attribs.value||void 0,n){e.next=4;break}return e.abrupt("return",null);case 4:return i={PinCodeNumber:t,tempvar:n,NewWindow:"Y",BackTag:"https://seller.shopee.tw/portal/sale/"},s={headers:{Referer:"https://epayment.7-11.com.tw/C2C/C2CWeb/C2C.aspx","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Content-Type":"application/x-www-form-urlencoded",isGBK:!1}},s["params"]=i,e.next=9,window["NetMessageBridgeService"].post("https://epayment.7-11.com.tw/C2C/C2CWeb/PrintC2CPinCode.aspx",JSON.stringify(s),JSON.stringify(i));case 9:if(c=e.sent,o=JSON.parse(c),u=o.data,!u||!u.includes(t)){e.next=20;break}return u=u.replaceAll("css/C2CPrint.css","https://epayment.7-11.com.tw/C2C/C2CWeb/css/C2CPrint.css").replaceAll("BarCode.ashx?CodeValue=","https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode.ashx?CodeValue=").replaceAll("QRCode.ashx?CodeValue=","https://epayment.7-11.com.tw/C2C/C2CWeb/QRCode.ashx?CodeValue=").replaceAll("BarCode128.ashx?CodeValue=","https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode128.ashx?CodeValue="),e.next=16,window["BaseUtilBridgeService"].htmlToBase64(u);case 16:return d=e.sent,e.abrupt("return",d);case 20:return e.abrupt("return",null);case 21:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"dataURLtoFile",value:function(e,t){var r=e.split(","),a=r[0].match(/:(.*?);/)[1],n=atob(r[1]),i=n.length,s=new Uint8Array(i);while(i--)s[i]=n.charCodeAt(i);return new File([s],t,{type:a})}},{key:"getQuanJiaFaceInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i,s,c,o,u,d,l,p,b,f,g,_,m,k,x,w;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=h.a.load(r),i=n("input")[0].attribs.value,s=n("input")[1].attribs.value,s=s.replace("&lt;","<").replace("&gt;",">").replace("&#39;","'"),c=Number(n("input")[2].attribs.value),o=n("input")[3].attribs.value,e.next=9,window["ConfigBridgeService"].getGlobalCacheInfo("mallInfo",a);case 9:return u=e.sent,d=JSON.parse(u),l=d.mall_main_id,d.IPType,p={ApiKey:i,Data:s,TimeStamp:c,Signature:o},b={headers:{Host:"external2.shopee.tw","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",isProxyMallId:l.toString(),"Content-Type":"application/x-www-form-urlencoded",isGBK:!1}},b["params"]=p,e.next=16,window["NetMessageBridgeService"].post("https://external2.shopee.tw/ext/familymart/OrderPrint/OrderPrint.aspx",JSON.stringify(b),JSON.stringify(p));case 16:if(f=e.sent,g=JSON.parse(f),_=g.data,_&&_.includes(".gif")){e.next=21;break}return e.abrupt("return",null);case 21:if(m=h.a.load(_),!m("img")){e.next=32;break}return k=m("img")[0].attribs.src,x="https://external2.shopee.tw/ext/familymart/OrderPrint/"+k,_=_.replace(k,x),e.next=28,window["BaseUtilBridgeService"].htmlToBase64(_);case 28:return w=e.sent,e.abrupt("return",w);case 32:return e.abrupt("return",null);case 33:e.next=38;break;case 35:return e.prev=35,e.t0=e["catch"](0),e.abrupt("return",null);case 38:case"end":return e.stop()}}),e,null,[[0,35]])})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"getPrintWaybillType",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={shop_id:t},e.next=3,this.$shopeemanService.getPrintWaybillType(r,a);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"checkPackagePrintWaybillMultiShop",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={order_info_list:t,shop_id:r},e.next=3,this.$shopeemanService.checkPackagePrintWaybillMultiShop(a,n);case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}}),e,this)})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"getSdConfig",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,i,s,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={shop_id:t},e.next=3,this.$shopeemanService.getSdConfig(r,a);case 3:if(n=e.sent,i=null,!(200===n.code&&n.data&&n.data.suggest_schema&&n.data.suggest_schema.last_normal_selected_schema)){e.next=14;break}return s=!1,c=n.data.suggest_schema.last_normal_selected_schema,o=n.data.suggest_schema.suggest_default_schema,(c.length<1&&o.length>1||c.length>1)&&(s=!0),i=s||"VN"===r?"TW"===r?6:"MY"===r||"PH"===r||"VN"===r?3:"TH"===r||"ID"===r?2:Number(o[1]):c.length<1?Number(o[0]):Number(c[0]),e.abrupt("return",i);case 14:return e.abrupt("return",null);case 15:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"createSdJobsMultiShop",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i,s){var c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c={record_generate_schema:!1,package_list:t,generate_file_details:[{file_type:n,file_name:i,file_contents:[s]}],shop_id:r},e.next=3,this.$shopeemanService.createSdJobsMultiShop(a,c);case 3:return o=e.sent,e.abrupt("return",o);case 5:case"end":return e.stop()}}),e,this)})));function t(t,r,a,n,i,s){return e.apply(this,arguments)}return t}()},{key:"downloadSdJob",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={job_id:r,shop_id:t},e.next=3,this.$shopeemanService.downloadSdJob(a,n);case 3:if(i=e.sent,e.prev=4,s=i&&JSON.parse(i.data),!s||0!==s.code){e.next=10;break}return e.abrupt("return",{code:200,data:i.rawBytes});case 10:return e.abrupt("return",{code:s.code||50001,message:s.message||""});case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e["catch"](4),e.abrupt("return",{code:200,data:i.rawBytes});case 16:case"end":return e.stop()}}),e,this,[[4,13]])})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"downloadSdJobTW",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={job_id:r,shop_id:t},e.next=3,this.$shopeemanService.downloadSdJob(a,n);case 3:return i=e.sent,e.abrupt("return",i.data||"");case 5:case"end":return e.stop()}}),e,this)})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"checkFaceInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i,s,c){var o,u,d,l,h,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(null===t||t.length<500)&&r&&a){e.next=3;break}return window["BaseUtilBridgeService"].checkAutoScriptLog("[".concat(r,"]面单长度小于500")),e.abrupt("return",{code:50001,data:"面单大小或平台物流获取异常，请重新同步！"});case 3:if(o=t,"VN"!=i||"J&T Exoress"!=n||2!=s){e.next=13;break}return e.next=7,this.cutFaseSize(t,r,!0,300,420,-420);case 7:if(u=e.sent,200==u.code&&u.data){e.next=10;break}return e.abrupt("return",{code:50001,data:u.msg});case 10:o=200==u.code&&u.data||t,e.next=29;break;case 13:if("VN"!=i||"VNPost Nhanh"!=n){e.next=22;break}return e.next=16,this.cutFaseSize(t,r,!0,300,425,-420);case 16:if(d=e.sent,200==d.code&&d.data){e.next=19;break}return e.abrupt("return",{code:50001,data:d.msg});case 19:o=200==d.code&&d.data||t,e.next=29;break;case 22:if("ID"!=i){e.next=29;break}return e.next=25,this.cutFaseSize(t,r,!0,425,595,0);case 25:if(l=e.sent,200==l.code&&l.data){e.next=28;break}return e.abrupt("return",{code:50001,data:l.msg});case 28:o=200==l.code&&l.data||t;case 29:return e.next=31,window["BaseUtilBridgeService"].checkFaceInfo(o,r,a);case 31:if(h=e.sent,p=JSON.parse(h),200!==p.code){e.next=37;break}return e.abrupt("return",{code:200,data:o});case 37:return e.abrupt("return",{code:50001,data:"订单【".concat(r,"】获取面单异常, ").concat(p.msg)});case 38:case"end":return e.stop()}}),e,this)})));function t(t,r,a,n,i,s,c){return e.apply(this,arguments)}return t}()},{key:"cutFaseSize",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n,i,s){var c,o,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c={OrderNo:r,IsUseA4Size:a,PdfWidth:n,PdfHeight:i,LocationY:s},e.next=3,window["BaseUtilBridgeService"].getFaceData(t,!0,c);case 3:return o=e.sent,u=o&&JSON.parse(o),e.abrupt("return",u);case 6:case"end":return e.stop()}}),e)})));function t(t,r,a,n,i,s){return e.apply(this,arguments)}return t}()},{key:"blobToDataURL",value:function(e,t){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.readAsDataURL(e)}},{key:"getPickListData",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,i,s=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.prev=0,r=this.dealWithMallOrderGroup(t),a="NORMAL",n=regeneratorRuntime.mark((function e(t){var n,i,c,o,u,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=r[t],i=n[0].country,c=t,o=r[t][0].mall_info.platform_mall_name,u=regeneratorRuntime.mark((function e(t){var r,u,d,l,h,p,b,f,g,_;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=n.slice(t,t+50),u=[],r.forEach((function(e){if(0!=e.order_id){var t={order_id:Number(e.order_id),shop_id:Number(c),region_id:i};u.push(t)}})),e.next=5,s.checkPackagePrintWaybillMultiShop(u,c,i);case 5:if(d=e.sent,200!==d.code){e.next=36;break}if(d.data.list.length){e.next=12;break}return s.writeLog("店铺【".concat(o,"】当前数据没有可下载的拣货单"),!1),e.abrupt("return","continue");case 12:return l=d.data.list,h=[],l.forEach((function(e){var t={order_id:Number(e.order_id),package_number:e.package_number,region_id:i,shop_id:Number(c)};h.push(t)})),e.next=17,s.createSdJobsMultiShop(h,c,i,a+"_PDF","PickList",0);case 17:if(p=e.sent,200===p.code&&p.data.list&&p.data.list.length&&p.data.list[0].job_id){e.next=22;break}s.writeLog("创建拣货单失败，".concat(p.data),!1),e.next=34;break;case 22:return b=p.data.list[0].job_id,e.next=25,s.downloadSdJob(c,b,i);case 25:if(f=e.sent,f&&!(f.length<500)){e.next=29;break}return s.writeLog("店铺【".concat(o,"】下载拣货单失败，稍后请重试"),!1),e.abrupt("return","continue");case 29:return e.next=31,window["BaseUtilBridgeService"].downloadPickForm(f,o);case 31:g=e.sent,_=JSON.parse(g),200===_.code?s.writeLog("店铺【".concat(o,"】下载拣货单成功"),!0):s.writeLog("店铺【".concat(o,"】下载拣货单失败，").concat(_.msg),!1);case 34:e.next=37;break;case 36:403===d.code?s.writeLog("店铺【".concat(o,"】下载拣货单失败,店铺未登录"),!1):s.writeLog("店铺【".concat(o,"】下载拣货单失败"),!1);case 37:case"end":return e.stop()}}),e)})),d=0;case 6:if(!(d<n.length)){e.next=14;break}return e.delegateYield(u(d),"t0",8);case 8:if(l=e.t0,"continue"!==l){e.next=11;break}return e.abrupt("continue",11);case 11:d+=50,e.next=6;break;case 14:case"end":return e.stop()}}),e)})),e.t0=regeneratorRuntime.keys(r);case 5:if((e.t1=e.t0()).done){e.next=10;break}return i=e.t1.value,e.delegateYield(n(i),"t2",8);case 8:e.next=5;break;case 10:e.next=14;break;case 12:e.prev=12,e.t3=e["catch"](0);case 14:this.writeLog("下载拣货单完成，请前往桌面【平台拣货单】文件夹查看",!0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"dealWithMallOrderGroup",value:function(e){for(var t={},r=0;r<e.length;r++){var a=e[r];t[a.mall_info.platform_mall_id]||(t[a.mall_info.platform_mall_id]=[]),t[a.mall_info.platform_mall_id].push(a)}return t}}]),e}()}}]);