(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229810"],{de70:function(e,t,r){"use strict";r.d(t,"a",(function(){return _}));var a=r("1da1"),i=r("d4ec"),n=r("bee2"),s=r("ade3"),o=(r("96cf"),r("99af"),r("fb6a"),r("4de4"),r("159b"),r("d3b7"),r("25f0"),r("ac1f"),r("5319"),r("7db0"),r("b0c0"),r("30d0")),c=r("bda5"),l=r("b5e1"),u=r("a91f"),h=r("5f91"),d=r("bcd0"),_=function(){function e(t,r,a,n){var d=this;Object(i["a"])(this,e),Object(s["a"])(this,"tbNetworkService",c["a"].tbRequest),Object(s["a"])(this,"$api",c["a"]),Object(s["a"])(this,"$commodityService",new l["a"]),Object(s["a"])(this,"$shopeemanService",new h["a"]),Object(s["a"])(this,"$configService",new u["a"]),Object(s["a"])(this,"jdNetworkService",c["a"].jdRequest),Object(s["a"])(this,"jszNetworkService",c["a"].jxRequest),Object(s["a"])(this,"isStop",!1),Object(s["a"])(this,"mall",void 0),Object(s["a"])(this,"_this",null),Object(s["a"])(this,"pageSize",40),Object(s["a"])(this,"orderService",new o["a"]),Object(s["a"])(this,"skuImageCache",{}),Object(s["a"])(this,"syncStatus",void 0),Object(s["a"])(this,"mallNo",""),Object(s["a"])(this,"upLoadType",""),Object(s["a"])(this,"writeLog",void 0),Object(s["a"])(this,"timeRange",60),Object(s["a"])(this,"muid",0),this.mall=t,this._this=a,this.syncStatus=r,this.writeLog=n,console.log("mall",this.mall),this.$configService.getUserInfo().then((function(e){d.muid=e.muid,console.log("nickInfo",e)}))}return Object(n["a"])(e,[{key:"startSingel",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t,"startSingel"),this.writeLog=r,this.mall=t.mall_info,a={order_id:t.order_id,shop_id:t.mall_info.platform_mall_id},e.next=6,this.$shopeemanService.getDetailsSinger(t.country,a);case 6:if(i=e.sent,console.log("res---",i),console.log("startSingel",i),200!==i.code){e.next=19;break}return n=[i.data],e.next=13,this.getOrderOtherInfo(n);case 13:return e.next=15,this.upLoadOrders(n);case 15:s=e.sent,s?this.writeLog("【".concat(t.order_id,"】订单同步成功，上报成功"),!0):this.writeLog("【".concat(t.order_id,"】订单同步失败，上报失败"),!1),e.next=20;break;case 19:this.writeLog("【".concat(t.order_id,"】订单同步失败").concat(i.data),!1);case 20:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"start",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.timeRange=a,this.writeLog("正在同步【".concat(this.syncStatus.label,"】状态订单......"),!0),"refund"!==this.syncStatus.value){e.next=7;break}return e.next=5,this.refund(t,r);case 5:e.next=14;break;case 7:if("toship"!==this.syncStatus.value){e.next=12;break}return e.next=10,this.toShip(t,r);case 10:e.next=14;break;case 12:return e.next=14,this.otherStatus(t,r);case 14:case"end":return e.stop()}}),e,this)})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"toShip",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,i,n,s,o,c,l,u,h,d,_,m,p,g,f,y,b,k=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.mallNo=t,this.upLoadType=r,e.prev=2,a={page_size:this.pageSize,page_number:1,total:0,sort_by:"confirmed_date_desc",shop_id:this.mall.platform_mall_id},e.next=6,this.$shopeemanService.getToShipOrderIdList(this.mall.country,a);case 6:if(i=e.sent,console.log(i,"toShip"),200!==i.code){e.next=60;break}n=i.data,s=n.package_list,o=n.total,c=0,l=[];case 12:if(!s.length){e.next=57;break}u=[],h=0;case 15:if(!(h<s.length)){e.next=36;break}return d=s.slice(h,h+5),e.next=19,this.$shopeemanService.getDetailsByOrderIds(this.mall.country,{from_seller_data:!1,orders:this.changeParams(d),shop_id:this.mall.platform_mall_id});case 19:if(_=e.sent,console.log(_,"resDetail"),200!==_.code){e.next=33;break}if(m=_.data&&_.data.orders||[],l=l.concat(_.data.orders),!m||!m.length){e.next=33;break}return p=m.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*k.timeRange*60*60*1e3})),e.next=28,this.getOrderOtherInfo(p);case 28:return g=[],e.next=31,this.checkOrderSnStatus(p);case 31:g=e.sent,u=u.concat(g);case 33:h+=5,e.next=15;break;case 36:if(!u.length){e.next=41;break}return e.next=39,this.upLoadOrders(u);case 39:f=e.sent,f&&(c+=u.length);case 41:if(y="",y=l[l.length-1].create_time,console.log(y,"lastTime",(new Date).getTime()-1e3*y>24*this.timeRange*60*60*1e3),!(s.length<40||y&&(new Date).getTime()-1e3*y>24*this.timeRange*60*60*1e3)){e.next=48;break}s=[],e.next=55;break;case 48:return console.log("toShip翻页--------------------"),a.page_number++,a.total=o,e.next=53,this.$shopeemanService.getToShipOrderIdList(this.mall.country,a);case 53:b=e.sent,s=b&&b.data&&b.data.package_list||[];case 55:e.next=12;break;case 57:this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】成功-【").concat(c,"】条"),!0),e.next=65;break;case 60:if(403!==i.code){e.next=64;break}return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】未登录"),!1));case 64:return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】").concat(i.code,"-").concat(i.data),!1));case 65:e.next=71;break;case 67:return e.prev=67,e.t0=e["catch"](2),console.log(e.t0),e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】同步失败"),!1));case 71:case"end":return e.stop()}}),e,this,[[2,67]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"refund",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,i,n,s,o,c,l,u,h,d,_,m,p,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.mallNo=t,this.upLoadType=r,e.prev=2,a={page_size:this.pageSize,page_number:1,keyword:"",from_page_number:1,shop_id:this.mall.platform_mall_id},e.next=6,this.$shopeemanService.getRefundOrderIdList(this.mall.country,a);case 6:if(i=e.sent,console.log(i,"refund"),200!==i.code){e.next=56;break}n=i.data,s=n.list,n.page_info,o=0;case 11:if(!s.length){e.next=53;break}c=[],l=0;case 14:if(!(l<s.length)){e.next=35;break}if(u=s[l],h={return_sn:u.return_sn,shop_id:this.mall.platform_mall_id},!((new Date).getTime()-1e3*u.create_time>24*this.timeRange*60*60*1e3)){e.next=20;break}return console.log("过滤after",new Date(1e3*u.create_time)),e.abrupt("continue",32);case 20:return e.next=22,this.$shopeemanService.getRefundOrderDetail(this.mall.country,h);case 22:if(d=e.sent,console.log("resDetail",d),200!==d.code){e.next=32;break}return u.refundDetail=d.data,e.next=28,this.getOrderOtherInfoRefund(u);case 28:return e.next=30,this.checkAfterOrderSnStatus(u);case 30:_=e.sent,_&&c.push(u);case 32:l++,e.next=14;break;case 35:return e.next=37,this.afterUpLoadOrders(c);case 37:if(m=e.sent,m&&(o+=c.length),p="",p=s[s.length-1].create_time,!(s.length<40||p&&(new Date).getTime()-1e3*p>24*this.timeRange*60*60*1e3)){e.next=45;break}s=[],e.next=51;break;case 45:return console.log("refundp翻页--------------------"),a.page_number++,e.next=49,this.$shopeemanService.getRefundOrderIdList(this.mall.country,a);case 49:g=e.sent,s=g&&g.data&&g.data.list||[];case 51:e.next=11;break;case 53:this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】成功-【").concat(o,"】条"),!0),e.next=61;break;case 56:if(403!==i.code){e.next=60;break}return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】未登录"),!1));case 60:return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】").concat(i.code,"-").concat(i.data),!1));case 61:e.next=67;break;case 63:return e.prev=63,e.t0=e["catch"](2),console.log(e.t0),e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】同步失败"),!1));case 67:case"end":return e.stop()}}),e,this,[[2,63]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"otherStatus",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,i,n,s,o,c,l,u,h,d,_,m,p,g,f,y,b,k=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.mallNo=t,this.upLoadType=r,e.prev=2,a={from_page_number:1,source:this.syncStatus.value,page_size:this.pageSize,page_number:1,total:0,is_massship:!1,shop_id:this.mall.platform_mall_id},e.next=6,this.$shopeemanService.getOrderIdList(this.mall.country,a);case 6:if(i=e.sent,console.log(i,"res-first"),200!==i.code){e.next=62;break}n=i.data,s=n.orders,o=n.page_info,c=0,l=[];case 12:if(!s.length){e.next=59;break}u=[],h=0;case 15:if(!(h<s.length)){e.next=37;break}return d=s.slice(h,h+5),e.next=19,this.$shopeemanService.getDetailsByOrderIds(this.mall.country,{from_seller_data:!1,orders:d,shop_id:this.mall.platform_mall_id});case 19:if(_=e.sent,console.log(_,"resDetail"),200!==_.code){e.next=34;break}if(m=_.data&&_.data.orders||[],l=l.concat(_.data.orders),!m||!m.length){e.next=34;break}return p=m.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*k.timeRange*60*60*1e3})),console.log(p,"过滤"),e.next=29,this.getOrderOtherInfo(p);case 29:return g=[],e.next=32,this.checkOrderSnStatus(p);case 32:g=e.sent,u=u.concat(g);case 34:h+=5,e.next=15;break;case 37:if(!u.length){e.next=42;break}return e.next=40,this.upLoadOrders(u);case 40:f=e.sent,f&&(c+=u.length);case 42:if(y="",console.log("自动翻页",l,l[l.length-1]),y=l[l.length-1].create_time,console.log(y,"lastTime",(new Date).getTime()-1e3*y>24*this.timeRange*60*60*1e3),!(s.length<40||y&&(new Date).getTime()-1e3*y>24*this.timeRange*60*60*1e3)){e.next=50;break}s=[],e.next=57;break;case 50:return console.log("other翻页--------------------"),a.page_number++,a.total=o.total,e.next=55,this.$shopeemanService.getOrderIdList(this.mall.country,a);case 55:b=e.sent,s=b&&b.data&&b.data.orders||[];case 57:e.next=12;break;case 59:this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】成功-【").concat(c,"】条"),!0),e.next=67;break;case 62:if(403!==i.code){e.next=66;break}return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】未登录"),!1));case 66:return e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】").concat(i.code,"-").concat(i.data),!1));case 67:e.next=73;break;case 69:return e.prev=69,e.t0=e["catch"](2),console.log(e.t0),e.abrupt("return",this.writeLog("".concat("manual"!==this.upLoadType?"【"+this.upLoadType+"】":"").concat(this.mallNo," 店铺【").concat(this.mall.mall_alias_name||this.mall.platform_mall_name,"】【").concat(this.syncStatus.label,"】同步失败"),!1));case 73:case"end":return e.stop()}}),e,this,[[2,69]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"changeParams",value:function(e){var t=[];return e.forEach((function(e){var r={order_id:e.order_id,region_id:e.region_id||e.region,shop_id:e.shop_id};t.push(r)})),t}},{key:"getOrderOtherInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i,n,s,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=0;case 1:if(!(r<t.length)){e.next=28;break}return a=t[r],i={order_id:a.order_id,shop_id:this.mall.platform_mall_id},e.next=6,this.$shopeemanService.getIncomeTransactionHistoryDetail(this.mall.country,i);case 6:return n=e.sent,console.log(n,"res3"),200===n.code&&(a["transactionHistoryDetail"]=n.data),e.next=11,this.$shopeemanService.getOrdeTrackingHistory(this.mall.country,i);case 11:return s=e.sent,console.log(s,"res4"),200===s.code&&(a["ordeTrackingHistory"]=s.data),e.next=16,this.$shopeemanService.getLogisticsTrackingHistory(this.mall.country,i);case 16:return o=e.sent,console.log(o,"res5"),200===o.code&&(a["logisticsTrackingHistory"]=o.data),e.next=21,this.$shopeemanService.getDropOff(this.mall.country,i);case 21:c=e.sent,console.log(c,"res6"),200===c.code&&(a["forderLogistics"]=c.data),console.log(a,"orderAll");case 25:r++,e.next=1;break;case 28:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getOrderOtherInfoRefund",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i,n,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t,"order-after"),r={order_id:t.order_id,shop_id:this.mall.platform_mall_id},e.next=4,this.$shopeemanService.getIncomeTransactionHistoryDetail(this.mall.country,r);case 4:return a=e.sent,console.log(a,"res3-after"),200===a.code&&(t["transactionHistoryDetail"]=a.data),i={return_id:t.return_id,shop_id:this.mall.platform_mall_id},e.next=10,this.$shopeemanService.getRefundOrdeTrackingHistory(this.mall.country,i);case 10:return n=e.sent,console.log(n,"res4-after"),200===n.code&&(t["ordeTrackingHistory"]=n.data),s={order_id:t.order_id,shop_id:this.mall.platform_mall_id,log_id:1},e.next=16,this.$shopeemanService.getLogisticsTrackingHistoryRefund(this.mall.country,s);case 16:o=e.sent,console.log(o,"res5-after"),200===o.code&&(t["logisticsTrackingHistory"]=o.data),console.log(t,"orderAll");case 20:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkOrderSnStatus",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i,n,s,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=[],a=0;case 2:if(!(a<t.length)){e.next=14;break}return i=t[a],n=i&&i.ordeTrackingHistory&&i.ordeTrackingHistory.history&&i.ordeTrackingHistory.history[0]&&i.ordeTrackingHistory.history[0].new_status||"",s=i&&i.transactionHistoryDetail&&i.transactionHistoryDetail.payment_info&&i.transactionHistoryDetail.payment_info.shipping_subtotal&&i.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf||0,o=i.order_sn+"_"+i.status+"_"+i.status_ext+"_"+i.logistics_status+"_"+n+"_"+s,e.next=9,this.$api.checkOrderSnStatus({orderSn:i.order_sn,orderKey:o,muid:this.muid});case 9:c=e.sent,c.data.orderKey||r.push(i);case 11:a++,e.next=2;break;case 14:return e.abrupt("return",r);case 15:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkAfterOrderSnStatus",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=!1,a="".concat(t.return_id,"_").concat(t.status,"_").concat(t.mtime?t.mtime:0),e.next=4,this.$api.checkOrderSnStatus({orderSn:t.order_sn,orderKey:a,muid:this.muid});case 4:return i=e.sent,console.log(i,"checkAfterOrderSnStatus"),i.data.orderKey||(r=!0),e.abrupt("return",r);case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"upLoadOrders",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i,n,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(e.prev=0,r=[],a=[],i=0;i<t.length;i++)n=t[i],s=1,n.first_item_return&&!1===n.first_item_return&&(s=0),console.log(n,"upLoadOrders--------------"),o={order_id:n.order_id,ordersn:n.order_sn,currency:n.order_items[0].product.currency,shipping_carrier:n.fulfillment_carrier_name,days_to_ship:n.days_to_ship||7,auto_cancel_date:n.auto_cancel_3pl_ack_date,note:n.note,note_update_time:n.note_mtime,payment_method:n.payment_method,create_time:n.create_time,update_time:n.ordeTrackingHistory&&n.ordeTrackingHistory.history&&n.ordeTrackingHistory.history[0]&&n.ordeTrackingHistory.history[0].ctime||0,pay_time:n.shipping_confirm_time,ship_by_date:n.ship_by_date,delivery_time:this.getDeliveryTime(n),tracking_no:n.shipping_traceno||this.getTrackingNo(n),buyer_cancel_reason:n.buyer_cancel_reason,message_to_seller:n.remark,goods_to_declare:0,recipient_address:{phone:n.buyer_address_phone,name:n.buyer_address_name,full_address:n.shipping_address},logistics_status:n.logistics_status,status:n.status,status_ext:n.status_ext,return_id:n.return_id,income_detail:JSON.stringify(n.transactionHistoryDetail),total_amount:this.getTotalAmount(n),goods_price:Math.abs(n.transactionHistoryDetail.payment_info.merchant_subtotal.product_price),actual_shipping_cost:Math.abs(n.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf),shipping_fee:Math.abs(n.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_buyer),estimated_shipping_fee:Math.abs(n.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_buyer),shipping_rebate:Math.abs(n.transactionHistoryDetail.buyer_payment_info.shopee_coins_redeemed),voucher_price:Math.abs(n.transactionHistoryDetail.buyer_payment_info.seller_voucher),card_txn_fee:Math.abs(n.transactionHistoryDetail.payment_info.fees_and_charges.transaction_fee),comm_fee:Math.abs(n.transactionHistoryDetail.payment_info.fees_and_charges.transaction_fee),tax_amount:Math.abs(n.transactionHistoryDetail.buyer_payment_info.tax_amount)||0,seller_service_fee:Math.abs(n.transactionHistoryDetail.payment_info.fees_and_charges.service_fee),shopee_rebate:Math.abs(n.transactionHistoryDetail.payment_info.rebate_and_voucher.product_discount_rebate_from_shopee),escrow_amount:n.transactionHistoryDetail.amount,needCheckactualShippingCost:Math.abs(n.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf),items:this.getItems(n),apply_time:this.getApplyTime(n),log_current_status:n.ordeTrackingHistory.history[0].new_status,order_logistics_info:"",checkOrderSnKeyNew:this.getCheckKeyNew(n),logistics_channel:n.logistics_channel,first_item_return:s},r.push(o),o.return_id&&a.push(o);return e.next=6,this.$commodityService.saveOrder(this.mall.id.toString(),this.mall.platform_mall_id.toString(),r);case 6:return c=e.sent,l=JSON.parse(c),console.log(l,"saveOrder"),u=!0,u=200===l.code,a.length&&this.syncRefundContinue(a,this.mall.platform_mall_id),e.abrupt("return",u);case 15:e.prev=15,e.t0=e["catch"](0),console.log(e.t0);case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"syncRefundContinue",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,i,n,s,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("正常订单同步流程里的售后订单同步"),console.log(t),a=[],i=0;case 4:if(!(i<t.length)){e.next=23;break}return n=t[i],console.log("refund more"),s={return_id:n.return_id,shop_id:r},console.log(s,"paramsRefund"),e.next=11,this.$shopeemanService.getRefundOrderDetail(this.mall.country,s);case 11:if(o=e.sent,console.log("startSingel-after",o),200!==o.code){e.next=20;break}return n["refundDetail"]=o.data,e.next=17,this.getOrderOtherInfoRefund(n);case 17:a.push(n),e.next=20;break;case 20:i++,e.next=4;break;case 23:if(!(a.length>0)){e.next=28;break}return e.next=26,this.afterUpLoadOrders(a);case 26:c=e.sent,console.log(c,"resA");case 28:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"afterUpLoadOrders",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,i,n,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(console.log(t,"orderList"),e.prev=1,r=[],a=0;a<t.length;a++)i=t[a],n={return_detail_info:{buyer_images:i.refundDetail.buyer_images,return_pickup_address:i.refundDetail.return_pickup_address?i.refundDetail.return_pickup_address:"",return_address:i.refundDetail.return_address.address.replace("\n","")||"",requested_time:"",tracking_number:i.refundDetail.tracking_number||"",return_delivery_time:i.logisticsTrackingHistory&&i.logisticsTrackingHistory.history&&i.logisticsTrackingHistory.history.length&&i.logisticsTrackingHistory.history[0].ctime||0},return_id:i.return_id,return_sn:i.return_sn||i.ordersn,order_id:i.order_id,return_channel_id:i.return_channel_id?i.return_channel_id:0,text_reason:i.refundDetail.text_reason,reason_id:i.refundDetail.reason,ctime:i.ordeTrackingHistory&&i.ordeTrackingHistory.history&&i.ordeTrackingHistory.history.length&&i.ordeTrackingHistory.history[0].ctime||0,mtime:i.ordeTrackingHistory&&i.ordeTrackingHistory.history&&i.ordeTrackingHistory.history.length&&i.ordeTrackingHistory.history[i.ordeTrackingHistory.history.length-1].ctime||0,refund_amount:i.refund_amount||i.refundDetail.refund_amount,refund_total_price:i.amount_before_discount||i.refundDetail.amount_before_discount,status:i.refundDetail.status,return_item:this.dealWithReturnTime(i),ckeckAfterOrderSnKey:this.getCheckRefundKey(i)},r.push(n);return console.log(r),e.next=7,this.$commodityService.saveAfterOrder(this.mall.id.toString(),this.mall.platform_mall_id.toString(),r);case 7:if(s=e.sent,o=JSON.parse(s),console.log(o,"saveAfterOrder"),console.log(this.mall,"上报after",o),200!==o.code){e.next=15;break}return e.abrupt("return",!0);case 15:return e.abrupt("return",!1);case 16:e.next=21;break;case 18:e.prev=18,e.t0=e["catch"](1),console.log(e.t0,"56555555555555555555555");case 21:case"end":return e.stop()}}),e,this,[[1,18]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"dealWithCtime",value:function(e){var t=0;if(e.return_header&&e.return_header.attribute_list&&e.return_header.attribute_list.return_attributes){var r=e.return_header.attribute_list.return_attributes.find((function(e){return"heimao_contact_by"===e.key}));t=r&&r.value||0}return t}},{key:"getCheckRefundKey",value:function(e){var t="";return t="".concat(e.return_id,"_").concat(e.status,"_").concat(e.mtime?e.mtime:0),t}},{key:"dealWithReturnTime",value:function(e){var t=[],r=e.order_product_list||e.refundDetail.order_product_list;return r.forEach((function(e){var r={price:e.model.price,modelid:e.model.id,sku:e.model.sku,itemid:e.product.id,id:e.product.id,price_before_discount:e.product.price};t.push(r)})),t}},{key:"getDeliveryTime",value:function(e){var t=0,r=d["x"].find((function(t){return t.ShipId==e.logistics_channel}));return console.log(r,"4444444444444444444",e),r?(e.logistics_status>1&&(t=r.IsDeafult?e.logisticsTrackingHistory&&e.logisticsTrackingHistory.list[0]&&e.logisticsTrackingHistory.list[0].tracking_info&&e.logisticsTrackingHistory.list[0].tracking_info.length>1&&e.logisticsTrackingHistory.list[0].tracking_info[e.logisticsTrackingHistory.list[0].tracking_info.length-1-1].ctime||0:e.logisticsTrackingHistory&&e.logisticsTrackingHistory.list[0]&&e.logisticsTrackingHistory.list[0].tracking_info&&e.logisticsTrackingHistory.list[0].tracking_info.length&&e.logisticsTrackingHistory.list[0].tracking_info[e.logisticsTrackingHistory.list[0].tracking_info.length-1].ctime||0),t):t}},{key:"getTrackingNo",value:function(e){var t="",r=e.forderLogistics&&e.forderLogistics.list&&e.forderLogistics.list[0]&&e.forderLogistics.list[0].forders&&e.forderLogistics.list[0].forders[0].third_party_tn||"";return t=r||e.forderLogistics&&e.forderLogistics.consignment_no,t}},{key:"getTotalAmount",value:function(e){var t=0,r=e.transactionHistoryDetail.buyer_payment_info.merchant_subtotal||0,a=e.transactionHistoryDetail.buyer_payment_info.shipping_fee||0,i=e.transactionHistoryDetail.buyer_payment_info.import_tax||0,n=e.transactionHistoryDetail.buyer_payment_info.seller_voucher||0,s=e.transactionHistoryDetail.buyer_payment_info.shopee_coins_redeemed||0,o=e.transactionHistoryDetail.buyer_payment_info.shopee_voucher||0,c=e.transactionHistoryDetail.buyer_payment_info.credit_card_promotion||0;return t=Math.abs(r+a+i+n+s+o+c)||0,t}},{key:"getCheckKey",value:function(e){var t="",r=e.ordeTrackingHistory&&e.ordeTrackingHistory.history&&e.ordeTrackingHistory.history[0]&&e.ordeTrackingHistory.history[0].ctime||0,a=e.shipping_traceno||this.getTrackingNo(e),i=Math.abs(e.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf)||0,n=e&&e.ordeTrackingHistory&&e.ordeTrackingHistory.history&&e.ordeTrackingHistory.history[0]&&e.ordeTrackingHistory.history[0].new_status||"";return t=e.order_sn+"_"+e.status+"_"+e.status_ext+"_"+e.logistics_status+"_"+n+"_"+r+"_"+a+"_"+i,t}},{key:"getCheckKeyNew",value:function(e){var t="",r=e&&e.ordeTrackingHistory&&e.ordeTrackingHistory.history&&e.ordeTrackingHistory.history[0]&&e.ordeTrackingHistory.history[0].new_status||"",a=e&&e.transactionHistoryDetail&&e.transactionHistoryDetail.payment_info&&e.transactionHistoryDetail.payment_info.shipping_subtotal&&e.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf||0;return t=e.order_sn+"_"+e.status+"_"+e.status_ext+"_"+e.logistics_status+"_"+r+"_"+a,t}},{key:"getApplyTime",value:function(e){var t="";return 16===e.ordeTrackingHistory.history[0].new_status&&2===e.ordeTrackingHistory.history[0].old_status&&(t=e.ordeTrackingHistory.history[0].ctime),t}},{key:"getItems",value:function(e){var t=[];return e.order_items.forEach((function(e){var r=e.product,a=e.item_model,i=e.bundle_deal_product,n=e.bundle_deal_model,s=!0===e.is_wholesale?"1":"0",o=e.status,c=e.item_list||[],l=[],u=0,h=0;if(c.length)c.forEach((function(e){u+=e.item_price})),h=e.order_price/u,c.forEach((function(e){var t={actual_item_price:e.item_price*h,amount:e.amount,snapshotid:e.snapshot_id,modelid:e.model_id};l.push(t)}));else{var d={actual_item_price:e.order_price,amount:e.amount,snapshotid:e.snapshot_id,modelid:e.model_id};l.push(d)}l.forEach((function(e,c){var l=e["actual_item_price"],u=e["amount"],h=(e["snapshotid"],e["modelid"],""),d="",_="",m=[],p="0",g="0",f="0",y="",b="",k="";i.length>0?(h=i[c]["sku"],d=i[c]["name"],_=i[c]["cat_id"],m=i[c]["images"],p=i[c]["price_before_discount"],g=i[c]["item_id"],l=i[c]["price"],f=n[c]&&n[c]["model_id"]||"",y=n[c]&&n[c]["name"]||"",b=n[c]&&n[c]["sku"]||"",k=n[c]&&n[c]["ctime"]||""):(h=r["sku"],d=r["name"],_=r["cat_id"],m=r["images"],p=r["price_before_discount"],g=r["item_id"],f=a["model_id"],y=a["name"],b=a["sku"],k=a["ctime"]);var v={};v["is_wholesale"]=s.toString(),v["variation_quantity_purchased"]=u.toString(),v["item_sku"]=h.toString(),v["item_name"]=d.toString(),v["variation_id"]=f.toString(),v["variation_name"]=y.toString(),v["variation_sku"]=b.toString(),v["variation_discounted_price"]=l.toString(),v["variation_original_price"]=p.toString(),v["item_id"]=g.toString(),v["item_cat_id"]=_.toString(),v["item_images"]=m,v["weight"]=0,v["item_status"]=o.toString(),v["item_ctime"]=k.toString(),t.push(v)}))})),console.log(t,"orderItem"),t}},{key:"delay",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var r=setTimeout((function(){clearTimeout(r),e(!0)}),t)})));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}()}}]);