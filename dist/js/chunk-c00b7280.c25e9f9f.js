(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c00b7280"],{"2f6f":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var a=i("1da1"),s=i("d4ec"),r=i("bee2"),n=(i("96cf"),i("99af"),i("b0c0"),function(){function t(e){Object(s["a"])(this,t),this._this=e}return Object(r["a"])(t,[{key:"productSelector",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var i,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={},i["offset"]=0,i["limit"]=100,i["need_brand"]=0,i["need_item_model"]=0,i["is_ads"]=0,e.sort_by&&(i["sort_by"]=e.sort_by),e.id&&(i["search_content"]=e.id,i["search_type"]=1),i["mallId"]=e.platform_mall_id,t.prev=9,t.next=12,this._this.$shopeemanService.getChinese(e.country,"/api/marketing/v3/public/product_selector/?",i);case 12:if(a=t.sent,s=this.isJsonString(this.isJsonString(a).data),console.log(s),"success"!==s.message){t.next=17;break}return t.abrupt("return",{code:200,data:s.data.item_list});case 17:if(s){t.next=19;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 19:return t.abrupt("return",{code:201,data:"".concat(s.errcode," ").concat(s.message.indexOf("token not found")>-1?"未登录，请登录后再查询":s.message)});case 22:return t.prev=22,t.t0=t["catch"](9),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 25:case"end":return t.stop()}}),t,this,[[9,22]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getGraphql",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var i,a,s,r,n,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={variables:{}},i["query"]="query Products($productIds: [String], $statusType: Int) {\n        products(productIds: $productIds, statusType: $statusType) {\n      items {\n        itemid,\n        name,\n        images,\n        sold,\n        price,\n      }\n    }\n      }",i["variables"]["productIds"]=e.item_id_list,i["variables"]["statusType"]=0,i["mallId"]=e.platform_mall_id,t.prev=5,t.next=8,this._this.$shopeemanService.postChineseReferer(e.country,"/api/marketing/v4/graphql/query/?",i,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 8:if(r=t.sent,n=this.isJsonString(this.isJsonString(r).data),l=null===n||void 0===n||null===(a=n.data)||void 0===a||null===(s=a.products)||void 0===s?void 0:s.items,!(l.length>0)){t.next=13;break}return t.abrupt("return",{code:200,data:l});case 13:if(n){t.next=15;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 15:return t.abrupt("return",{code:201,data:"".concat(n.errcode," ").concat(n.message.indexOf("token not found")>-1?"未登录，请登录后再查询":n.message)});case 18:return t.prev=18,t.t0=t["catch"](5),t.abrupt("return",{code:-2,data:"getGraphql-error ".concat(t.t0)});case 21:case"end":return t.stop()}}),t,this,[[5,18]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlan",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,i){var a,s,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a={},s="",t.t0=i,t.next="postChineseReferer"===t.t0?5:"deleteChinese"===t.t0?9:"putChinese"===t.t0?12:18;break;case 5:return a["item_id_list"]=e.item_id_list,a["name"]=e.name,s="/portal/marketing/hotsale/new",t.abrupt("break",18);case 9:return a["plan_id"]=e.plan_id,s="/portal/marketing/hotsale",t.abrupt("break",18);case 12:return a["plan_id"]=e.plan_id,a["name"]=e.name,a["status"]=e.status,a["item_id_list"]=e.item_id_list,s="/portal/marketing/hotsale",t.abrupt("break",18);case 18:return a["mallId"]=e.platform_mall_id,t.prev=19,t.next=22,this._this.$shopeemanService[i](e.country,"/api/marketing/v4/hot_sale/plan/",a,{headers:{"Content-Type":"application/json",referer:s}});case 22:if(r=t.sent,n=this.isJsonString(this.isJsonString(r).data),console.log("jsonData",n),"success"!==n.message){t.next=27;break}return t.abrupt("return",{code:200,data:n.data});case 27:if(n){t.next=29;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 29:return t.abrupt("return",{code:201,data:"".concat(n.errcode||n.code," ").concat(n.message&&n.message.indexOf("token not found")>-1?"未登录，请登录后再查询":n.message)});case 32:return t.prev=32,t.t1=t["catch"](19),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t1)});case 35:case"end":return t.stop()}}),t,this,[[19,32]])})));function e(e,i){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlanList",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var i,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={},i["mallId"]=e.platform_mall_id,t.prev=2,t.next=5,this._this.$shopeemanService.getChineseReferer(e.country,"/api/marketing/v4/hot_sale/plan/list/?",i,{headers:{accept:"application/json, text/plain, */*",referer:"/portal/marketing/hotsale"}});case 5:if(a=t.sent,s=this.isJsonString(this.isJsonString(a).data),"success"!==s.message){t.next=9;break}return t.abrupt("return",{code:200,data:s.data});case 9:if(s){t.next=11;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 11:return t.abrupt("return",{code:201,data:"".concat(s.errcode," ").concat(s.message&&s.message.indexOf("token not found")>-1?"未登录，请登录后再查询":s.message)});case 14:return t.prev=14,t.t0=t["catch"](2),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[2,14]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"isJsonString",value:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}]),t}())},"4c28":function(t,e,i){},8992:function(t,e,i){"use strict";i("4c28")},feb6:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[t.isMall?i("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,a){return t.showMall(e,a)?i("el-option",{key:a,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],r=i("1da1"),n=i("b85c"),l=i("2909"),o=(i("96cf"),i("d81d"),i("fb6a"),i("caad"),i("2532"),i("d3b7"),i("25f0"),i("99af"),i("6062"),i("3ca3"),i("ddb0"),i("4de4"),i("159b"),i("c740"),i("7db0"),i("7646")),u=i("2b0e");u["default"].directive("loadmore",{bind:function(t,e){var i=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var i=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var a=e.indexOf("")>-1,s=t.indexOf("")>-1;a!==s?this.groupId=s?Object(l["a"])(this.groupIdList.map((function(t){return t.id}))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){i.isAllowSet2=!0,i.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var i=this;if(this.isAllowSet1){this.isAllowSet1=!1;var a=this.isShowName;if(!this.isAShop){var s=e.includes(""),r=t.includes("");if(s!==r||e.toString()===t.toString()&&this.isShowNameAll)if(r&&(!a||a&&!this.isShowNameAll)){var o=a&&Object(l["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(l["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),u=new Set([].concat(Object(l["a"])(o),Object(l["a"])(e)));this.site=Object(l["a"])(u),this.isShowNameAll=!0,a&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var c=[];if(a){var h=a&&Object(l["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),d=h.length>this.site.length&&this.site||h,p=h.length>this.site.length&&h||this.site;c=new Set(this.site);var m,f=Object(n["a"])(p);try{for(f.s();!(m=f.n()).done;){var g=m.value;d.includes(g)&&c.delete(g)}}catch(b){f.e(b)}finally{f.f()}c.delete("")}this.site=Object(l["a"])(c)}else r?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){i.changeMallList(),i.filterMall(a),i.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a,s,r,n,o,u,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.site=[],a=e.countryVal,s=[],!(e.jsonMallData.length>0)){i.next=7;break}s=e.jsonMallData,i.next=12;break;case 7:return i.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:r=i.sent,s=JSON.parse(r)||[],e.jsonMallData=JSON.parse(r)||[];case 12:if(!(s.length>0)){i.next=17;break}1===t&&(e.siteList=""===a?s:s.filter((function(t){return t.country===a}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){s.forEach((function(i){a?t===i.group_id&&a===i.country&&e.siteList.push(i):t===i.group_id&&e.siteList.push(i)}))})))),i.next=22;break;case 17:return n={country:"",mallGroupIds:""},i.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 20:o=i.sent,200===o.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",o.data),u=o.data||[],e.siteList=u,e.jsonMallData=u,e.siteList=""===a?u:u.filter((function(t){return t.country===a}))):e.$message.error("获取分组、店铺列表失败");case 22:c=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=c.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&c.push({group_name:t.group_name,id:t.group_id})})),c.zzSort("id"),e.groupIdList=[].concat(Object(l["a"])(e.groupIdList),c),e.groupId=[""].concat(Object(l["a"])(c.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return i.stop()}}),i)})))()},changeMallList:function(){var t=this,e=[],i="";if(this.isAShop){var a=this.siteList.find((function(e){return e.platform_mall_id===t.site}));i=this.site,e.push(a)}else this.site.forEach((function(a){if(a){var s=t.siteList.find((function(t){return t.platform_mall_id===a}));e.push(s),i+=a+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(i=e.length!==this.siteList.length&&i||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,i=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var i=e.siteList;t&&(i=e.siteList.filter((function(e){var i=e.mall_alias_name||e.platform_mall_name;return i.includes(t)}))),e.siteShowList=i}),i)},showMall:function(t,e){var i=t.mall_alias_name||t.platform_mall_name,a=this.site[0]===t.platform_mall_id;return a||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||i.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var i=0;t?(i=this.mallShowIndex+10,i=i<this.siteShowList.length-this.showMallNumber&&i||this.siteShowList.length-this.showMallNumber):(i=this.mallShowIndex-10,i=i>0&&i||0),i!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=i}}}},h=c,d=(i("8992"),i("2877")),p=Object(d["a"])(h,a,s,!1,null,null,null);e["a"]=p.exports}}]);