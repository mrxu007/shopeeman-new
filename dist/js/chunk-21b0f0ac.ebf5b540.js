(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21b0f0ac"],{"2f6f":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var i=a("1da1"),r=a("d4ec"),n=a("bee2"),s=(a("96cf"),a("99af"),a("b0c0"),function(){function t(e){Object(r["a"])(this,t),this._this=e}return Object(n["a"])(t,[{key:"productSelector",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},a["offset"]=0,a["limit"]=100,a["need_brand"]=0,a["need_item_model"]=0,a["is_ads"]=0,e.sort_by&&(a["sort_by"]=e.sort_by),e.id&&(a["search_content"]=e.id,a["search_type"]=1),a["mallId"]=e.platform_mall_id,t.prev=9,t.next=12,this._this.$shopeemanService.getChinese(e.country,"/api/marketing/v3/public/product_selector/?",a);case 12:if(i=t.sent,r=this.isJsonString(this.isJsonString(i).data),"success"!==r.message){t.next=16;break}return t.abrupt("return",{code:200,data:r.data.item_list});case 16:if(r){t.next=18;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 18:return t.abrupt("return",{code:201,data:"".concat(r.errcode," ").concat(r.message.indexOf("token not found")>-1?"未登录，请登录后再查询":r.message)});case 21:return t.prev=21,t.t0=t["catch"](9),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 24:case"end":return t.stop()}}),t,this,[[9,21]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getGraphql",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,i,r,n,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={variables:{}},a["query"]="query Products($productIds: [String], $statusType: Int) {\n        products(productIds: $productIds, statusType: $statusType) {\n      items {\n        itemid,\n        name,\n        images,\n        sold,\n        price,\n      }\n    }\n      }",a["variables"]["productIds"]=e.item_id_list,a["variables"]["statusType"]=0,a["mallId"]=e.platform_mall_id,t.prev=5,t.next=8,this._this.$shopeemanService.postChineseReferer(e.country,"/api/marketing/v4/graphql/query/?",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 8:if(n=t.sent,s=this.isJsonString(this.isJsonString(n).data),l=null===s||void 0===s||null===(i=s.data)||void 0===i||null===(r=i.products)||void 0===r?void 0:r.items,!(l.length>0)){t.next=13;break}return t.abrupt("return",{code:200,data:l});case 13:if(s){t.next=15;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 15:return t.abrupt("return",{code:201,data:"".concat(s.errcode," ").concat(s.message.indexOf("token not found")>-1?"未登录，请登录后再查询":s.message)});case 18:return t.prev=18,t.t0=t["catch"](5),t.abrupt("return",{code:-2,data:"getGraphql-error ".concat(t.t0)});case 21:case"end":return t.stop()}}),t,this,[[5,18]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlan",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a){var i,r,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i={},r="",t.t0=a,t.next="postChineseReferer"===t.t0?5:"deleteChinese"===t.t0?9:"putChinese"===t.t0?12:18;break;case 5:return i["item_id_list"]=e.item_id_list,i["name"]=e.name,r="/portal/marketing/hotsale/new",t.abrupt("break",18);case 9:return i["plan_id"]=e.plan_id,r="/portal/marketing/hotsale",t.abrupt("break",18);case 12:return i["plan_id"]=e.plan_id,i["name"]=e.name,i["status"]=e.status,i["item_id_list"]=e.item_id_list,r="/portal/marketing/hotsale",t.abrupt("break",18);case 18:return i["mallId"]=e.platform_mall_id,t.prev=19,t.next=22,this._this.$shopeemanService[a](e.country,"/api/marketing/v4/hot_sale/plan/",i,{headers:{"Content-Type":"application/json",referer:r}});case 22:if(n=t.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){t.next=26;break}return t.abrupt("return",{code:200,data:s.data});case 26:if(s){t.next=28;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 28:return t.abrupt("return",{code:201,data:"".concat(s.errcode||s.code," ").concat(s.message&&s.message.indexOf("token not found")>-1?"未登录，请登录后再查询":s.message)});case 31:return t.prev=31,t.t1=t["catch"](19),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t1)});case 34:case"end":return t.stop()}}),t,this,[[19,31]])})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlanList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},a["mallId"]=e.platform_mall_id,t.prev=2,t.next=5,this._this.$shopeemanService.getChineseReferer(e.country,"/api/marketing/v4/hot_sale/plan/list/?",a,{headers:{accept:"application/json, text/plain, */*",referer:"/portal/marketing/hotsale"}});case 5:if(i=t.sent,r=this.isJsonString(this.isJsonString(i).data),"success"!==r.message){t.next=9;break}return t.abrupt("return",{code:200,data:r.data});case 9:if(r){t.next=11;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 11:return t.abrupt("return",{code:201,data:"".concat(r.errcode," ").concat(r.message&&r.message.indexOf("token not found")>-1?"未登录，请登录后再查询":r.message)});case 14:return t.prev=14,t.t0=t["catch"](2),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[2,14]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"isJsonString",value:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}]),t}())},"4c28":function(t,e,a){},"5a71":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},f4e2:function(t,e,a){"use strict";a("5a71")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,i){return a("el-option",{key:i,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},r=[],n=a("1da1"),s=a("2909"),l=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(s["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,r,n,l,o,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return i=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:r=a.sent,200===r.code?(n=r.data||[],e.isAShop||n.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=""===i?n:n.filter((function(t){return(null===t||void 0===t?void 0:t.country)===i||!t.platform_mall_id})),e.siteList=e.allSiteList):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(l=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),l.delete(void 0),o=Object(s["a"])(l),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(s["a"])(c),e.groupId=[""].concat(Object(s["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:u=[],u=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=u;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,i=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var r=this.siteShowList.map((function(t){return t.platform_mall_id}));if(i.includes(t))i=i.filter((function(t){return!r.includes(t)}));else{var n=new Set([""].concat(Object(s["a"])(i),Object(s["a"])(r)));i=Object(s["a"])(n)}}else i=i.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var l=i.findIndex((function(e){return e===t}));if(l>-1)i.splice(l,1),i.includes("")&&i.splice(0,1);else if(i.push(t),a){var o,c=this.siteShowList.filter((function(t){return i.includes(t.platform_mall_id)}));i.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==c.length+1||i.unshift("")}else{var u;i.includes("")||(null===(u=this.siteList)||void 0===u?void 0:u.length)!==i.length+1||i.unshift("")}}this.siteId=i}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var i=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(i)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=this.groupId.includes("")&&a.length===this.siteList.length-1?"":a.toString();this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var i=e.mall_alias_name||e.platform_mall_name;a=i.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=o,u=(a("8992"),a("f4e2"),a("2877")),d=Object(u["a"])(c,i,r,!1,null,"7cb8233b",null);e["a"]=d.exports}}]);