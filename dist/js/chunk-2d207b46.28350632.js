(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d207b46"],{a254:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var r=a("5530"),n=a("1da1"),i=a("d4ec"),c=a("bee2"),s=(a("b0c0"),a("a9e3"),a("96cf"),function(){function e(t){Object(i["a"])(this,e),this._this=t}return Object(c["a"])(e,[{key:"topGoods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.goodsID,i={mallId:r,id:n},e.next=5,this._this.$shopeemanService.postChinese(a,"/api/v3/product/boost_product/?",i,{headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*","Accept-Encoding":"gzip, deflate, br",referer:"/portal/product/list/all"}});case 5:return c=e.sent,s=JSON.parse(JSON.parse(c).data),o=s.code,p=s.message,e.abrupt("return",{ecode:o,message:p});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"topedGoods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n={mallId:r,version:"3.1.0"},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/product/get_boost_product_id_list/?",n,{headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*","Accept-Encoding":"gzip, deflate, br",referer:"/portal/product/list/all"}});case 5:return i=e.sent,c=JSON.parse(JSON.parse(i).data),s=c.code,o=c.message,p=c.data.list,e.abrupt("return",{ecode:s,message:o,data:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"Mallvoucher",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,c=t.promotion_type,s={mallId:r,offset:n,limit:i,promotion_type:c},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/marketing/v3/voucher/list/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return o=e.sent,p=JSON.parse(o),u=JSON.parse(p.data),d=u.code,l=u.message,e.abrupt("return",{ecode:d,data:u,message:l});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherStop",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/voucher/stop/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate"}});case 5:return c=e.sent,s=JSON.parse(c),o=JSON.parse(s.data),p=o.code,u=o.message,e.abrupt("return",{ecode:p,data:o,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherDel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.deleteChinese(a,"/api/marketing/v3/voucher/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate",referer:"/portal/marketing/vouchers/".concat(n)}});case 5:return c=e.sent,s=JSON.parse(c),o=JSON.parse(s.data),p=o.code,u=o.message,e.abrupt("return",{ecode:p,data:o,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherCreate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v,g,f,b,y;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.min_price,i=t.name,c=t.value,s=t.end_time,o=t.start_time,p=t.max_value,u=t.discount,d=t.usage_quantity,l=t.claim_quantity,m=t.rule,h=t.voucher_code,_={mallId:r,min_price:n,name:i,value:c,end_time:s,start_time:o,max_value:p,discount:u,usage_quantity:d,claim_quantity:l,rule:{voucher_landing_page:m.voucher_landing_page,reward_type:m.reward_type,hide:m.hide,backend_created:m.backend_created,items:m.items,coin_cashback_voucher:{coin_percentage_real:m.coin_cashback_voucher.coin_percentage_real,max_coin:m.coin_cashback_voucher.max_coin}},voucher_code:h},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/voucher/?",_,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/vouchers/new?edit=shop"}});case 5:return v=e.sent,g=JSON.parse(v),f=JSON.parse(g.data),b=f.errcode||f.code,y=f.message,e.abrupt("return",{ecode:b,data:f,message:y});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallvoucherCreate-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getShoppUserName",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={mallId:r},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/selleraccount/user_info/?",n,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/settings/shop/profile"}});case 5:return i=e.sent,c=JSON.parse(i),s=JSON.parse(c.data).data,e.abrupt("return",{data:s});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getShoppUserName-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrize",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,c={mallId:r,offset:n,limit:i},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/list/?",c,{headers:{accept:"application/json, text/plain, */*","accept-encoding":"gzip, deflate, br",referer:"/portal/marketing/follow-prize/list"}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data)||o.data,u=p.code,d=p.message||o.status,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrizeDetail",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i={mallId:r,campaign_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/?",i,{headers:{accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return c=e.sent,s=JSON.parse(c),o=JSON.parse(s.data),p=o.code,u=o.message,e.abrupt("return",{ecode:p,data:o,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"followPrizeCreate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.discount,i=t.end_time,c=t.follow_prize_name,s=t.min_spend,o=t.quota,p=t.reward_type,u=t.start_time,d=t.coin_cash_back,l={mallId:r,shopid:Number(r),follow_prize_name:c,start_time:Number(u),end_time:Number(i),quota:Number(o),min_spend:Number(s),reward_type:Number(p),discount:n},d&&(l.coin_cash_back=d,delete l.discount),e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/create?",l,{headers:{"Content-Type":"application/json",accept:"application/json, text/plain, */*",referer:"/portal/marketing/follow-prize/create"}});case 6:return m=e.sent,h=JSON.parse(m),_=JSON.parse(h.data),v=_.errcode||_.code,g=_.message,e.abrupt("return",{ecode:v,data:_,message:g});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"followPrizeCreate-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallPrizeDel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i=t.action,c={mallId:r,campaign_id:n,action:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/operation/?",c,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/follow-prize?tab=list"}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=p.code,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallPrizeDel-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"logisticsPromotion",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,c={mallId:r,status:0,offset:n,limit:i},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/logistics_promotion/list/?",c,{headers:{"Content-Type":"application/json",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=ongoing"}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallPrizeDel-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stopPromotion",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,n=t.mallId,i=t.datainfo,c={mallId:n,status:i.status,tiers:[Object(r["a"])(Object(r["a"])({},i.tiers[0]),{},{discount_type:1})],channel_ids:i.channel_ids,start_time:i.start_time,end_time:i.end_time,group_rule_id:i.group_rule_id,promotion_name:i.promotion_name,all_channels:{channels:[i.channalData],mask_channels_ids:[],is_all_mask:!1},expire_now:!0},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/logistics_promotion/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=ongoing"}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"stopPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delPromotion",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,n=t.mallId,i=t.datainfo,c={mallId:n,status:i.status,tiers:[Object(r["a"])(Object(r["a"])({},i.tiers[0]),{},{discount_type:1})],channel_ids:i.channel_ids,start_time:i.start_time,end_time:i.end_time,group_rule_id:i.group_rule_id,promotion_name:i.promotion_name,all_channels:{channels:[i.channalData],mask_channels_ids:[],is_all_mask:!1},expire_now:!0},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/logistics_promotion/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping?status=all"}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ProDelivery",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n={mallId:r},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/shop/logistics_info/?",n,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return i=e.sent,c=JSON.parse(i),s=JSON.parse(c.data),o=null!==s&&void 0!==s&&s.data?s.code:s.errcode,p=s.message,e.abrupt("return",{ecode:o,data:s,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkDeliveryTime",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.start_time,i=t.end_time,c=t.channel_ids,s={mallId:r,start_time:n,end_time:i,channel_ids:c},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/logistics_promotion/check_channel/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return o=e.sent,p=JSON.parse(o),u=JSON.parse(p.data),d=null!==u&&void 0!==u&&u.data?u.code:u.errcode,l=u.message,e.abrupt("return",{ecode:d,data:u,message:l});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkPromotionTest",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.start_time,i=t.end_time,c=t.tiers,s=t.channel_ids,o=t.promotion_name,p={mallId:r,start_time:n,end_time:i,tiers:c,channel_ids:s,promotion_name:o},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/logistics_promotion/?",p,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/shipping/new"}});case 5:return u=e.sent,d=JSON.parse(u),l=JSON.parse(d.data),m=null!==l&&void 0!==l&&l.data?l.code:l.errcode,h=l.message,e.abrupt("return",{ecode:m,data:l,message:h});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveActiveAddondeal",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_name,i=t.start_time,c=t.end_time,s=t.sub_type,o=t.sub_item_limit,p=t.purchase_min_spend,u=t.per_gift_num,d={mallId:r,add_on_deal_name:n,start_time:i,end_time:c,sub_type:s,sub_item_limit:o,purchase_min_spend:p,per_gift_num:u},"0"===s?delete d.purchase_min_spend&&d.per_gift_num:delete d.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",d,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return l=e.sent,m=JSON.parse(l),h=JSON.parse(m.data),_=null!==h&&void 0!==h&&h.data?h.code:h.errcode,v=h.message,e.abrupt("return",{ecode:_,data:h,message:v});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveActiveEdit",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.add_on_deal_name,c=t.start_time,s=t.end_time,o=t.sub_type,p=t.sub_item_limit,u=t.purchase_min_spend,d=t.per_gift_num,l={mallId:r,add_on_deal_id:n,add_on_deal_name:i,start_time:c,end_time:s,sub_type:o,sub_item_limit:p,purchase_min_spend:u,per_gift_num:d},"0"===o?delete l.purchase_min_spend&&l.per_gift_num:delete l.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",l,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return m=e.sent,h=JSON.parse(m),_=JSON.parse(h.data),v=null!==_&&void 0!==_&&_.data?_.code:_.errcode,g=_.message,e.abrupt("return",{ecode:v,data:_,message:g});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changeBuyShow",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.add_on_deal_name,c=t.start_time,s=t.end_time,o=t.sub_type,p=t.sub_item_limit,u=t.sub_item_priority,d={mallId:r,add_on_deal_id:n,add_on_deal_name:i,start_time:c,end_time:s,sub_type:o,sub_item_limit:p,sub_item_priority:u},e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/?",d,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 6:return l=e.sent,m=JSON.parse(l),h=JSON.parse(m.data),_=null!==h&&void 0!==h&&h.data?h.code:h.errcode,v=h.message,e.abrupt("return",{ecode:_,data:h,message:v});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ActiveAddMasterGooods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.main_item_list,c={mallId:r,add_on_deal_id:n,main_item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/main_item_list/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"AddotherGooods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.item_list,c={mallId:r,add_on_deal_id:n,item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/check_item_logistic/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isShowGooods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l,m,h,_,v,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_name,i=t.start_time,c=t.end_time,s=t.sub_type,o=t.sub_item_limit,p=t.purchase_min_spend,u=t.per_gift_num,d=t.sub_item_priority,l={mallId:r,add_on_deal_name:n,start_time:i,end_time:c,sub_type:s,sub_item_limit:o,purchase_min_spend:p,per_gift_num:u,sub_item_priority:d},"0"===s?delete l.purchase_min_spend&&l.per_gift_num:delete l.sub_item_limit,e.next=6,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/check_item_logistic/?",l,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(add_on_deal_id)}});case 6:return m=e.sent,h=JSON.parse(m),_=JSON.parse(h.data),v=null!==_&&void 0!==_&&_.data?_.code:_.errcode,g=_.message,e.abrupt("return",{ecode:v,data:_,message:g});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getAddondealList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.count,i=t.offset,c=t.status,s={mallId:r,count:n,offset:i,status:0,sub_type:2},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/list/?",s,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(c,"&searchType=promotion_name")}});case 5:return o=e.sent,p=JSON.parse(o),u=JSON.parse(p.data),d=null!==u&&void 0!==u&&u.data?u.code:u.errcode,l=u.message,e.abrupt("return",{ecode:d,data:u,message:l});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delondealList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.status,i=t.add_on_deal_id,c={mallId:r,action:1,add_on_deal_id:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/operation/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(n,"&searchType=promotion_name")}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"delPromotion-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stopOndealList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.status,i=t.add_on_deal_id,c={mallId:r,action:2,add_on_deal_id:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/operation/?",c,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/list?status=".concat(n,"&searchType=promotion_name")}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"stopOndealList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMasterGoods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i={mallId:r,count:500,offset:0,add_on_deal_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/aggr_main_item_list/?",i,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/".concat(n,"?tab=list")}});case 5:return c=e.sent,s=JSON.parse(c),o=JSON.parse(s.data),p=null!==o&&void 0!==o&&o.data?o.code:o.errcode,u=o.message,e.abrupt("return",{ecode:p,data:o,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getOtherGoods",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i={mallId:r,count:500,offset:0,add_on_deal_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v3/add_on_deal/aggr_sub_item_list/?",i,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/add-on-deal/list?tab=list"}});case 5:return c=e.sent,s=JSON.parse(c),o=JSON.parse(s.data),p=null!==o&&void 0!==o&&o.data?o.code:o.errcode,u=o.message,e.abrupt("return",{ecode:p,data:o,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"changeDiscount",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,c,s,o,p,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.add_on_deal_id,i=t.sub_item_list,c={mallId:r,create_type:0,add_on_deal_id:n,sub_item_list:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/add_on_deal/sub_item_list/?",c,{headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*",referer:"/portal/marketing/add-on-deal/".concat(n)}});case 5:return s=e.sent,o=JSON.parse(s),p=JSON.parse(o.data),u=null!==p&&void 0!==p&&p.data?p.code:p.errcode,d=p.message,e.abrupt("return",{ecode:u,data:p,message:d});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMasterGoods-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}())}}]);