(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61fefd58"],{"4c28":function(e,t,a){},8992:function(e,t,a){"use strict";a("4c28")},a254:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var r=a("1da1"),n=a("d4ec"),i=a("bee2"),s=(a("b0c0"),a("a9e3"),a("96cf"),function(){function e(t){Object(n["a"])(this,e),this._this=t}return Object(i["a"])(e,[{key:"topGoods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.goodsID,i={mallId:r,id:n},e.next=5,this._this.$shopeemanService.postChinese(a,"/api/v3/product/boost_product/?",i,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(JSON.parse(s).data),l=o.code,c=o.message,e.abrupt("return",{ecode:l,message:c});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"Mallvoucher",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u,p,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,s=t.promotion_type,o={mallId:r,offset:n,limit:i,promotion_type:s},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/marketing/v3/voucher/list/?",o,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return l=e.sent,c=JSON.parse(l),u=JSON.parse(c.data),p=u.code,h=u.message,e.abrupt("return",{ecode:p,data:u,message:h});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherStop",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.putChinese(a,"/api/marketing/v3/voucher/stop/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(s),l=JSON.parse(o.data),c=l.code,u=l.message,e.abrupt("return",{ecode:c,data:l,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherDel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.voucher_id,i={mallId:r,voucher_id:n},e.next=5,this._this.$shopeemanService.deleteChinese(a,"/api/marketing/v3/voucher/?",i,{headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate",referer:"/portal/marketing/vouchers/".concat(n)}});case 5:return s=e.sent,o=JSON.parse(s),l=JSON.parse(o.data),c=l.code,u=l.message,e.abrupt("return",{ecode:c,data:l,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallvoucherCreate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u,p,h,d,m,f,v,g,_,w,x;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.min_price,i=t.name,s=t.value,o=t.end_time,l=t.start_time,c=t.max_value,u=t.discount,p=t.usage_quantity,h=t.claim_quantity,d=t.rule,m=t.voucher_code,f={mallId:r,min_price:n,name:i,value:s,end_time:o,start_time:l,max_value:c,discount:u,usage_quantity:p,claim_quantity:h,rule:{voucher_landing_page:d.voucher_landing_page,reward_type:d.reward_type,hide:d.hide,backend_created:d.backend_created,items:d.items,coin_cashback_voucher:{coin_percentage_real:d.coin_cashback_voucher.coin_percentage_real,max_coin:d.coin_cashback_voucher.max_coin}},voucher_code:m},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v3/voucher/?",f,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/vouchers/new?edit=shop"}});case 5:return v=e.sent,g=JSON.parse(v),_=JSON.parse(g.data),w=_.errcode||_.code,x=_.message,e.abrupt("return",{ecode:w,data:_,message:x});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallvoucherCreate-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getShoppUserName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={mallId:r},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/selleraccount/user_info/?",n,{headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json, text/plain, */*",referer:"/portal/settings/shop/profile"}});case 5:return i=e.sent,s=JSON.parse(i),o=JSON.parse(s.data).data,e.abrupt("return",{data:o});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getShoppUserName-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrize",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.offset,i=t.limit,s={mallId:r,offset:n,limit:i},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/list/?",s,{headers:{accept:"application/json, text/plain, */*","accept-encoding":"gzip, deflate, br",referer:"/portal/marketing/follow-prize/list"}});case 5:return o=e.sent,l=JSON.parse(o),c=JSON.parse(l.data)||l.data,u=c.code,p=c.message||l.status,e.abrupt("return",{ecode:u,data:c,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"FollowPrizeDetail",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i={mallId:r,campaign_id:n},e.next=5,this._this.$shopeemanService.getChineseReferer(a,"/api/marketing/v4/follow_prize/?",i,{headers:{accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return s=e.sent,o=JSON.parse(s),l=JSON.parse(o.data),c=l.code,u=l.message,e.abrupt("return",{ecode:c,data:l,message:u});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"FollowPrize-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"followPrizeCreate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u,p,h,d,m,f,v,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.discount,i=t.end_time,s=t.follow_prize_name,o=t.min_spend,l=t.quota,c=t.reward_type,u=t.start_time,p=t.coin_cash_back,h={mallId:r,shopid:Number(r),follow_prize_name:s,start_time:Number(u),end_time:Number(i),quota:Number(l),min_spend:Number(o),reward_type:Number(c),discount:n},p&&(h.coin_cash_back=p,delete h.discount),e.next=7,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/?",h,{headers:{"Content-Type":"application/json",accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/follow-prize/create"}});case 7:return d=e.sent,m=JSON.parse(d),f=JSON.parse(m.data),v=f.errcode||f.code,g=f.message,e.abrupt("return",{ecode:v,data:f,message:g});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"followPrizeCreate-catch: ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"MallPrizeDel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,i,s,o,l,c,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.campaign_id,i=t.action,s={mallId:r,campaign_id:n,action:i},e.next=5,this._this.$shopeemanService.postChineseReferer(a,"/api/marketing/v4/follow_prize/operation/?",s,{headers:{"Content-Type":"application/json",Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml",referer:"/portal/marketing/follow-prize?tab=list"}});case 5:return o=e.sent,l=JSON.parse(o),c=JSON.parse(l.data),u=c.code,p=c.message,e.abrupt("return",{ecode:u,data:c,message:p});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"MallPrizeDel-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}())},feb6:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{staticClass:"storeChooseUL"},[e.isMall?a("li",[e._v(e._s(e._f("chineseSite")(e.countryVal)))]):a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.groupIdList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})}))],2)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:""},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[e.isShowName?e._e():a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,r){return e.showMall(t,r)?a("el-option",{key:r,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},n=[],i=a("1da1"),s=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),l=a("2b0e");l["default"].directive("loadmore",{bind:function(e,t){var a=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var r=t.indexOf("")>-1,n=e.indexOf("")>-1;r!==n?this.groupId=n?[""].concat(Object(s["a"])(this.groupIdList.map((function(e){return e.id})))):[]:n?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var r=t.indexOf("")>-1,n=e.indexOf("")>-1;r!==n?this.site=n?[""].concat(Object(s["a"])(this.siteList.map((function(e){return e.platform_mall_id})))):[]:n?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.site=[],a=t.countryVal,r=t.groupId.indexOf("")>-1&&t.groupId.slice(1).toString()||t.groupId.toString(),n={country:a,mallGroupIds:r},e.next=6,t.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:i=e.sent,200===i.code?(t.siteList=i.data||[],0===t.groupIdList.length&&(t.groupId=[""],t.siteList.forEach((function(e){var a=t.groupIdList.findIndex((function(t){return t.id===e.group_id}));e.group_name&&a<0&&(t.groupIdList.push({group_name:e.group_name,id:e.group_id}),t.groupId.push(e.group_id))}))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=[""]}),10)):t.$message.error("获取分组、店铺列表失败");case 8:case"end":return e.stop()}}),e)})))()},changeMallList:function(){var e=this,t=[],a="";this.site.forEach((function(r){if(r){var n=e.siteList.find((function(e){return e.platform_mall_id===r}));t.push(n),a+=r+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=t.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){this.isShowName=e||"";var t=this.siteList.filter((function(t){var a=t.mall_alias_name||t.platform_mall_name;return a.includes(e)}));this.showMallNumber=t.length-this.showMallNumber;var a=this.siteList.filter((function(t){var a=t.mall_alias_name||t.platform_mall_name;return!a.includes(e)}));this.siteShowList=[].concat(Object(s["a"])(t),Object(s["a"])(a))},showMall:function(e,t){var a=e.mall_alias_name||e.platform_mall_name,r=this.site[0]===e.platform_mall_id;return r||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var a=0;e?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=a}}}},u=c,p=(a("8992"),a("2877")),h=Object(p["a"])(u,r,n,!1,null,null,null);t["a"]=h.exports}}]);