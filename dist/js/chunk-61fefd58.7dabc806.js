(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61fefd58"],{"4c28":function(e,t,a){},8992:function(e,t,a){"use strict";a("4c28")},a254:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var r=a("1da1"),n=a("d4ec"),i=a("bee2"),s=(a("b0c0"),a("a9e3"),a("96cf"),function(){function e(t){Object(n["a"])(this,e),this._this=t}return Object(i["a"])(e,[{key:"topGoods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.goodsID,i={mallId:r,id:n},e.next=5,this._this.$shopeemanService.postChinese(a,"/api/v3/product/boost_product/?",i,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(JSON.parse(s).data),c=o.code,l=o.message,e.abrupt("return",{ecode:c,message:l});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"Mallvoucher",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,s=t.promotion_type,o={mallId:r,offset:n,limit:i,promotion_type:s},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/marketing/v3/voucher/list/?",o,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return c=e.sent,l=JSON.parse(c),u=JSON.parse(l.data),p=u.code,d=u.message,e.abrupt("return",{ecode:p,data:u,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherStop",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/voucher/stop/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=c.code,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherDel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.deleteChinese(a,"/api/marketing/v3/voucher/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate",referer:"/portal/marketing/vouchers/".concat(n)}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=c.code,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherCreate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f,v,g,b,w;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.min_price,i=t.name,s=t.value,o=t.end_time,c=t.start_time,l=t.max_value,u=t.discount,p=t.usage_quantity,d=t.claim_quantity,h=t.rule,m=t.voucher_code,_={mallId:r,min_price:n,name:i,value:s,end_time:o,start_time:c,max_value:l,discount:u,usage_quantity:p,claim_quantity:d,rule:{voucher_landing_page:h.voucher_landing_page,reward_type:h.reward_type,hide:h.hide,backend_created:h.backend_created,items:h.items,coin_cashback_voucher:{coin_percentage_real:h.coin_cashback_voucher.coin_percentage_real,max_coin:h.coin_cashback_voucher.max_coin}},voucher_code:m},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/voucher/?",_,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/vouchers/new?edit=shop"}});case 5:return f=e.sent,v=JSON.parse(f),g=JSON.parse(v.data),b=g.errcode||g.code,w=g.message,e.abrupt("return",{ecode:b,data:g,message:w});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallvoucherCreate-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getShoppUserName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={mallId:r},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/selleraccount/user_info/?",n,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/settings/shop/profile"}});case 5:return i=e.sent,s=JSON.parse(i),o=JSON.parse(s.data).data,e.abrupt("return",{data:o});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getShoppUserName-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrize",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,s={mallId:r,offset:n,limit:i},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/list/?",s,{headers:{accept:"application/json, text/plain, */*","accept-encoding":"gzip, deflate, br",referer:"/portal/marketing/follow-prize/list"}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data)||c.data,u=l.code,p=l.message||c.status,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrizeDetail",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i={mallId:r,campaign_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/?",i,{headers:{accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=c.code,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"followPrizeCreate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.discount,i=t.end_time,s=t.follow_prize_name,o=t.min_spend,c=t.quota,l=t.reward_type,u=t.start_time,p=t.coin_cash_back,d={mallId:r,shopid:Number(r),follow_prize_name:s,start_time:Number(u),end_time:Number(i),quota:Number(c),min_spend:Number(o),reward_type:Number(l),discount:n},p&&(d.coin_cash_back=p,delete d.discount),e.next=7,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/?",d,{headers:{"Content-Type":"application/json",accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/follow-prize/create"}});case 7:return h=e.sent,m=JSON.parse(h),_=JSON.parse(m.data),f=_.errcode||_.code,v=_.message,e.abrupt("return",{ecode:f,data:_,message:v});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"followPrizeCreate-catch: ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallPrizeDel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i=t.action,s={mallId:r,campaign_id:n,action:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/operation/?",s,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/follow-prize?tab=list"}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=l.code,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallPrizeDel-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"logisticsPromotion",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,s={mallId:r,status:0,offset:n,limit:i},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/logistics_promotion/list/?",s,{headers:{"Content-Type":"application/json",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=ongoing"}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallPrizeDel-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stopPromotion",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.datainfo,i={mallId:r,status:n.status,tiers:[n.tiers[0]],channel_ids:n.channel_ids,start_time:n.start_time,end_time:n.end_time,group_id:n.group_id,promotion_name:n.promotion_name,all_channels:{channels:[n.channalData],mask_channels_ids:[],is_all_mask:!1},expire_now:!0},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/logistics_promotion/?",i,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=ongoing"}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=null!==c&&void 0!==c&&c.data?c.code:c.errcode,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"stopPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delPromotion",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.datainfo,i={mallId:r,status:n.status,tiers:[n.tiers[0]],channel_ids:n.channel_ids,start_time:n.start_time,end_time:n.end_time,group_id:n.group_id,promotion_name:n.promotion_name,all_channels:{channels:[n.channalData],mask_channels_ids:[],is_all_mask:!1},expire_now:!0},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/logistics_promotion/?",i,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=all"}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=null!==c&&void 0!==c&&c.data?c.code:c.errcode,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ProDelivery",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n={mallId:r},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/shop/logistics_info/?",n,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return i=e.sent,s=JSON.parse(i),o=JSON.parse(s.data),c=null!==o&&void 0!==o&&o.data?o.code:o.errcode,l=o.message,e.abrupt("return",{ecode:c,data:o,message:l});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkDeliveryTime",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.start_time,i=t.end_time,s=t.channel_ids,o={mallId:r,start_time:n,end_time:i,channel_ids:s},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/logistics_promotion/check_channel/?",o,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return c=e.sent,l=JSON.parse(c),u=JSON.parse(l.data),p=null!==u&&void 0!==u&&u.data?u.code:u.errcode,d=u.message,e.abrupt("return",{ecode:p,data:u,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkPromotionTest",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.start_time,i=t.end_time,s=t.tiers,o=t.channel_ids,c=t.promotion_name,l={mallId:r,start_time:n,end_time:i,tiers:s,channel_ids:o,promotion_name:c},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/logistics_promotion/?",l,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return u=e.sent,p=JSON.parse(u),d=JSON.parse(p.data),h=null!==d&&void 0!==d&&d.data?d.code:d.errcode,m=d.message,e.abrupt("return",{ecode:h,data:d,message:m});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveActiveAddondeal",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_name,i=t.start_time,s=t.end_time,o=t.sub_type,c=t.sub_item_limit,l=t.purchase_min_spend,u=t.per_gift_num,p={mallId:r,add_on_deal_name:n,start_time:i,end_time:s,sub_type:o,sub_item_limit:c,purchase_min_spend:l,per_gift_num:u},"0"===o?delete p.purchase_min_spend&&p.per_gift_num:delete p.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",p,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return d=e.sent,h=JSON.parse(d),m=JSON.parse(h.data),_=null!==m&&void 0!==m&&m.data?m.code:m.errcode,f=m.message,e.abrupt("return",{ecode:_,data:m,message:f});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveActiveEdit",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.add_on_deal_name,s=t.start_time,o=t.end_time,c=t.sub_type,l=t.sub_item_limit,u=t.purchase_min_spend,p=t.per_gift_num,d={mallId:r,add_on_deal_id:n,add_on_deal_name:i,start_time:s,end_time:o,sub_type:c,sub_item_limit:l,purchase_min_spend:u,per_gift_num:p},"0"===c?delete d.purchase_min_spend&&d.per_gift_num:delete d.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",d,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return h=e.sent,m=JSON.parse(h),_=JSON.parse(m.data),f=null!==_&&void 0!==_&&_.data?_.code:_.errcode,v=_.message,e.abrupt("return",{ecode:f,data:_,message:v});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changeBuyShow",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.add_on_deal_name,s=t.start_time,o=t.end_time,c=t.sub_type,l=t.sub_item_limit,u=t.sub_item_priority,p={mallId:r,add_on_deal_id:n,add_on_deal_name:i,start_time:s,end_time:o,sub_type:c,sub_item_limit:l,sub_item_priority:u},e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",p,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return d=e.sent,h=JSON.parse(d),m=JSON.parse(h.data),_=null!==m&&void 0!==m&&m.data?m.code:m.errcode,f=m.message,e.abrupt("return",{ecode:_,data:m,message:f});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ActiveAddMasterGooods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.main_item_list,s={mallId:r,add_on_deal_id:n,main_item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/main_item_list/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"AddotherGooods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.item_list,s={mallId:r,add_on_deal_id:n,item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/check_item_logistic/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isShowGooods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d,h,m,_,f,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_name,i=t.start_time,s=t.end_time,o=t.sub_type,c=t.sub_item_limit,l=t.purchase_min_spend,u=t.per_gift_num,p=t.sub_item_priority,d={mallId:r,add_on_deal_name:n,start_time:i,end_time:s,sub_type:o,sub_item_limit:c,purchase_min_spend:l,per_gift_num:u,sub_item_priority:p},"0"===o?delete d.purchase_min_spend&&d.per_gift_num:delete d.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/check_item_logistic/?",d,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(add_on_deal_id)}});case 6:return h=e.sent,m=JSON.parse(h),_=JSON.parse(m.data),f=null!==_&&void 0!==_&&_.data?_.code:_.errcode,v=_.message,e.abrupt("return",{ecode:f,data:_,message:v});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getAddondealList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.count,i=t.offset,s=t.status,o={mallId:r,count:n,offset:i,status:0,sub_type:2},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/list/?",o,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(s,"&searchType=promotion_name")}});case 5:return c=e.sent,l=JSON.parse(c),u=JSON.parse(l.data),p=null!==u&&void 0!==u&&u.data?u.code:u.errcode,d=u.message,e.abrupt("return",{ecode:p,data:u,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delondealList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.status,i=t.add_on_deal_id,s={mallId:r,action:1,add_on_deal_id:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/operation/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(n,"&searchType=promotion_name")}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stopOndealList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.status,i=t.add_on_deal_id,s={mallId:r,action:2,add_on_deal_id:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/operation/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(n,"&searchType=promotion_name")}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"stopOndealList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMasterGoods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i={mallId:r,count:500,offset:0,add_on_deal_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/aggr_main_item_list/?",i,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/".concat(n,"?tab=list")}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=null!==c&&void 0!==c&&c.data?c.code:c.errcode,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getOtherGoods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i={mallId:r,count:500,offset:0,add_on_deal_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/aggr_sub_item_list/?",i,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 5:return s=e.sent,o=JSON.parse(s),c=JSON.parse(o.data),l=null!==c&&void 0!==c&&c.data?c.code:c.errcode,u=c.message,e.abrupt("return",{ecode:l,data:c,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changeDiscount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,c,l,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.sub_item_list,s={mallId:r,create_type:0,add_on_deal_id:n,sub_item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/sub_item_list/?",s,{headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return o=e.sent,c=JSON.parse(o),l=JSON.parse(c.data),u=null!==l&&void 0!==l&&l.data?l.code:l.errcode,p=l.message,e.abrupt("return",{ecode:u,data:l,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}())},feb6:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{staticClass:"storeChooseUL"},[e.isMall?a("li",[e._v(e._s(e._f("chineseSite")(e.countryVal)))]):a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},e._l(e.groupIdList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})})),1)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:""},on:{"visible-change":function(t){return e.filterMall("")}},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,r){return e.showMall(t,r)?a("el-option",{key:r,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},n=[],i=a("1da1"),s=a("b85c"),o=a("2909"),c=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),l=a("2b0e");l["default"].directive("loadmore",{bind:function(e,t){var a=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var u={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new c["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var r=t.indexOf("")>-1,n=e.indexOf("")>-1;r!==n?this.groupId=n?Object(o["a"])(this.groupIdList.map((function(e){return e.id}))):[]:n?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var r=this.isShowName,n=t.includes(""),i=e.includes("");if(n!==i||t.toString()===e.toString()&&this.isShowNameAll)if(i&&(!r||r&&!this.isShowNameAll)){var c=r&&Object(o["a"])(this.siteShowList.map((function(e){return e.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(e){return e.platform_mall_id})))),l=new Set([].concat(Object(o["a"])(c),Object(o["a"])(t)));this.site=Object(o["a"])(l),this.isShowNameAll=!0,r&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var u=[];if(r){var p=r&&Object(o["a"])(this.siteShowList.map((function(e){return e.platform_mall_id}))),d=p.length>this.site.length&&this.site||p,h=p.length>this.site.length&&p||this.site;u=new Set(this.site);var m,_=Object(s["a"])(h);try{for(_.s();!(m=_.n()).done;){var f=m.value;d.includes(f)&&u.delete(f)}}catch(v){_.e(v)}finally{_.f()}u.delete("")}this.site=Object(o["a"])(u)}else i?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(r),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i,s,o,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.site=[],r=t.countryVal,n=[],!(t.jsonMallData.length>0)){a.next=7;break}n=t.jsonMallData,a.next=12;break;case 7:return a.next=9,t.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:i=a.sent,n=JSON.parse(i)||[],t.jsonMallData=JSON.parse(i)||[];case 12:if(!(n.length>0)){a.next=17;break}1===e&&(t.siteList=""===r?n:n.filter((function(e){return e.country===r}))),2===e&&(0===t.groupId.length?t.siteList=[]:(t.siteList=[],t.groupId.forEach((function(e){n.forEach((function(a){r?e===a.group_id&&r===a.country&&t.siteList.push(a):e===a.group_id&&t.siteList.push(a)}))})))),a.next=22;break;case 17:return s={country:"",mallGroupIds:""},a.next=20,t.mallListAPIInstance.ddMallGoodsGetMallList(s);case 20:o=a.sent,200===o.code?(t.$appConfig.temporaryCacheInfo("save","mallAllData",o.data),c=o.data||[],t.siteList=c,t.jsonMallData=c,t.siteList=""===r?c:c.filter((function(e){return e.country===r}))):t.$message.error("获取分组、店铺列表失败");case 22:0===t.groupIdList.length&&(t.groupIdList=[{group_name:"全部",id:""}],t.groupId=[""],t.siteList.forEach((function(e){var a=t.groupIdList.findIndex((function(t){return t.id===e.group_id}));e.group_name&&a<0&&(t.groupIdList.push({group_name:e.group_name,id:e.group_id}),t.groupId.push(e.group_id))}))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var e=this,t=[],a="";this.site.forEach((function(r){if(r){var n=e.siteList.find((function(e){return e.platform_mall_id===r}));t.push(n),a+=r+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=t.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){var t=this,a=e&&this.isShowName!==e?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){t.isShowName!==e&&(t.mallShowIndex=0),t.isShowName=e||"";var a=t.siteList;e&&(a=t.siteList.filter((function(t){var a=t.mall_alias_name||t.platform_mall_name;return a.includes(e)}))),t.siteShowList=a}),a)},showMall:function(e,t){var a=e.mall_alias_name||e.platform_mall_name,r=this.site[0]===e.platform_mall_id;return r||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var a=0;e?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=a}}}},p=u,d=(a("8992"),a("2877")),h=Object(d["a"])(p,r,n,!1,null,null,null);t["a"]=h.exports}}]);