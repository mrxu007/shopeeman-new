(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b80668b8"],{"0b64":function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var a=r("1da1"),n=r("d4ec"),s=r("bee2"),i=(r("96cf"),function(){function e(t){Object(n["a"])(this,e),this._this=t}return Object(s["a"])(e,[{key:"putModelActive",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$shopeemanService.mixChinese(t,"/api/marketing/v3/discount/nominate/",r,{Headers:{"Content-Type":" application/json"}},"put");case 3:if(a=e.sent,n=a&&JSON.parse(a),!n||200!==n.status){e.next=14;break}if(s=JSON.parse(n.data),!s||0!==s.code){e.next=11;break}return e.abrupt("return",{code:200,data:s.data||[]});case 11:return e.abrupt("return",{code:50001,data:s.message||n.statusText||""});case 12:e.next=17;break;case 14:if(403!==n.status){e.next=16;break}return e.abrupt("return",{code:n.status,data:"操作失败，店铺未登录！"});case 16:return e.abrupt("return",{code:n.status,data:"操作失败".concat(n.statusText)});case 17:e.next=22;break;case 19:return e.prev=19,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"操作异常： ".concat(e.t0)});case 22:case"end":return e.stop()}}),e,this,[[0,19]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"deleteCollectGoodsInfo",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.deleteCollectGoodsInfo(t);case 3:if(r=e.sent,a=this.isJsonString(r),200!==a.code){e.next=7;break}return e.abrupt("return",{code:200});case 7:return e.abrupt("return",{code:201,data:a.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除云商品库数据异常 ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"dismissInvalidProducts",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={},r["ids"]=[t.id],r["mallId"]=t.platform_mall_id,e.next=6,this._this.$shopeemanService.postChinese(t.country,"/api/v3/product/dismiss_invalid_products?",r);case 6:if(a=e.sent,n=this.isJsonString(a),200!==n.status){e.next=12;break}if(s=this.isJsonString(n.data),0!==s.code){e.next=12;break}return e.abrupt("return",{code:200});case 12:return e.abrupt("return",{code:201,data:n.statusText});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"确认虾皮禁卖异常： ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteAddOnDealSubItemList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={},n["add_on_deal_id"]=r,n["create_type"]=0,n["sub_item_list"]=a,n["mallId"]=t.platform_mall_id,e.next=8,this._this.$shopeemanService.postChinese(t.country,"/api/marketing/v3/add_on_deal/sub_item_list/?",n);case 8:if(s=e.sent,i=this.isJsonString(this.isJsonString(s).data),"success"!==i.message){e.next=12;break}return e.abrupt("return",{code:200});case 12:return e.abrupt("return",{code:201,data:i.message});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除加购子商品异常： ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"getAdd0nDealAggrSubItemList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["add_on_deal_id"]=r,a["mallId"]=t.platform_mall_id,a["promotion_status"]="ongoing",e.prev=4,e.next=7,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/aggr_sub_item_list/?",a);case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200,data:s.data});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](4),e.abrupt("return",{code:-2,data:"子商品加购活动列表异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[4,14]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"deleteAddOnDealMainItemList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a){var n,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={},n["add_on_deal_id"]=a,n["main_item_list"]=[{item_id:t.id,status:r}],n["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.postChinese(t.country,"/api/marketing/v3/add_on_deal/main_item_list/?",n);case 7:if(s=e.sent,i=this.isJsonString(this.isJsonString(s).data),"success"!==i.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:i.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除加购主商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,r,a){return e.apply(this,arguments)}return t}()},{key:"getAdd0nDealAggrMainItemList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["add_on_deal_id"]=r,a["mallId"]=t.platform_mall_id,e.prev=3,e.next=6,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/aggr_main_item_list/?",a);case 6:if(n=e.sent,s=this.isJsonString(n),200!==s.status){e.next=11;break}return i=this.isJsonString(s.data),e.abrupt("return",{code:200,data:i.data});case 11:return e.abrupt("return",{code:201,data:s.statusText});case 14:return e.prev=14,e.t0=e["catch"](3),e.abrupt("return",{code:-2,data:"主商品加购活动列表异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[3,14]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getAddOnDealStandardSearch",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r["search_type"]="item_id",r["keyword"]=t.id,r["mallId"]=t.platform_mall_id,r["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/standard_search/?",r);case 8:if(a=e.sent,n=this.isJsonString(a),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"加购活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteBundleGoods",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a={},a["bundle_deal_id"]=r,a["items"]=[{item_id:t.id}],a["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.deleteChinese(t.country,"/api/marketing/v3/bundle_deal/item/",a,{headers:{"Content-Type":"application/json",referer:"portal/marketing/bundle/".concat(r)}});case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除套装商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getBundleDeal",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r["keyword"]=t.id,r["search_type"]="item_id",r["mallId"]=t.platform_mall_id,r["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChineseReferer(t.country,"/api/marketing/v3/bundle_deal/standard_search/?",r);case 8:if(a=e.sent,n=this.isJsonString(a),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"套装活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteDiscountCampainDetail",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a={},a["discount_id"]=r,a["itemid_list"]=[t.id],a["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.deleteChinese(t.country,"/api/marketing/v3/discount/nominate/abnormal/",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/discount/".concat(r,"/")}});case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除折扣商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getMallDiscountsIdByKeyword",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r["search_type"]="item_id",r["keyword"]=t.id,r["mallId"]=t.platform_mall_id,r["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/discount/standard_search/?",r);case 8:if(a=e.sent,n=this.isJsonString(a),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"折扣活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getCategoryName",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r,a,n){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.getCategoryTbInfo(t,r+"",a,n);case 3:if(s=e.sent,i=this.isJsonString(s),200!==i.code){e.next=7;break}return e.abrupt("return",{code:200,data:i.data});case 7:return e.abrupt("return",{code:201,data:i.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取类目名异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,r,a,n){return e.apply(this,arguments)}return t}()},{key:"searchProductList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s,i,o,c,u,l,d,p,g,m,h,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.mItem,a=t.pageSize,n=t.searchType,s=t.keyword,i=t.goodsMin,o=t.goodsMax,c=t.soldMin,u=t.soldMax,l=t.listType,d=t.categoryId,p=t.cursor,e.prev=1,g={page_number:r.pageNumber,page_size:a,mallId:r.platform_mall_id,search_type:n,keyword:s,category_id:d,stock_min:i,stock_max:o,sold_min:c,sold_max:u,list_type:l,count_list_types:"sold_out,banned,deboosted,deleted,unlisted",source:"seller_center",cursor:p,version:"4.0.0"},e.next=5,this._this.$shopeemanService.getChinese(r.country,"/api/v3/product/search_product_list/?",g,{headers:{accept:"application/json, text/plain, */*"}});case 5:if(m=e.sent,h=this.isJsonString(m),200!==h.status){e.next=12;break}if(f=this.isJsonString(h.data),"success"!==f.message){e.next=11;break}return e.abrupt("return",{code:200,data:f.data});case 11:return e.abrupt("return",{code:201,data:"数据获取失败：".concat(f.message)});case 12:if(403!==h.status){e.next=14;break}return e.abrupt("return",{code:403,data:"未登录，请登录后再查询"});case 14:if(0!==h.status){e.next=16;break}return e.abrupt("return",{code:0,data:"异常，请检查代理"});case 16:return e.abrupt("return",{code:h.status,data:"".concat(h.statusText)});case 19:return e.prev=19,e.t0=e["catch"](1),e.abrupt("return",{code:-2,data:"获取数据异常： ".concat(e.t0)});case 22:case"end":return e.stop()}}),e,this,[[1,19]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMpskuList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,a,n,s,i,o,c,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.mItem,a=t.pageSize,n=t.listType,s=t.listOrderType,i=t.cursor,e.prev=1,o={page_number:r.pageNumber,page_size:a,mallId:r.platform_mall_id,list_type:n,source:"seller_center",version:"1.0.0"},s&&(o["list_order_type"]=s),i&&(o["cursor"]=i),e.next=7,this._this.$shopeemanService.getChinese(r.country,"/api/v3/mpsku/get_mpsku_list/?",o,{headers:{accept:"application/json, text/plain, */*"}});case 7:if(c=e.sent,u=this.isJsonString(c),200!==u.status){e.next=14;break}if(l=this.isJsonString(u.data),"success"!==l.message){e.next=13;break}return e.abrupt("return",{code:200,data:l.data});case 13:return e.abrupt("return",{code:201,data:"数据获取失败：".concat(l.message)});case 14:if(403!==u.status){e.next=16;break}return e.abrupt("return",{code:403,data:"未登录，请登录后再查询"});case 16:if(0!==u.status){e.next=18;break}return e.abrupt("return",{code:0,data:"异常，请检查代理"});case 18:return e.abrupt("return",{code:u.status,data:"".concat(u.statusText)});case 21:return e.prev=21,e.t0=e["catch"](1),e.abrupt("return",{code:-2,data:"获取数据异常： ".concat(e.t0)});case 24:case"end":return e.stop()}}),e,this,[[1,21]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isJsonString",value:function(e){if("string"!==typeof e)return e;try{return JSON.parse(e),JSON.parse(e)}catch(t){return e}}}]),e}())},"2a63":function(e,t,r){},"5daf":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"detail"},[r("div",{staticClass:"row",staticStyle:{display:"flex","margin-top":"25px","background-color":"white",padding:"15px 4px",overflow:"auto"}},[r("div",{staticClass:"row2_left",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px",width:"748px"}},[r("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("基础数据配置")]),r("ul",[r("li",[r("storeChoose",{staticStyle:{"margin-left":"-20px",width:"730px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}})],1),r("li",{staticStyle:{"margin-top":"20px","align-items":"center"}},[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.getTopTestTable}},[e._v("搜索任务")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.delTeskFun}},[e._v("批量删除任务")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopdTesk}},[e._v("停止创建任务")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),r("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.aaa}},[e._v("aaa")])],1),e._m(0)])]),r("div",{staticClass:"row2_right",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px","margin-left":"20px",width:"507px"}},[r("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("置顶任务操作")]),r("ul",{staticStyle:{width:"505px"}},[r("li",[r("div",[e._v(" 置顶时间设置： "),r("el-radio-group",{model:{value:e.set_time,callback:function(t){e.set_time=t},expression:"set_time"}},[r("el-radio",{attrs:{label:"1"}},[e._v("当前时间")]),r("el-radio",{staticStyle:{"margin-left":"11px"},attrs:{label:"2"}},[r("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini",type:"datetime","value-format":"timestamp","picker-options":e.pickerOptions,placeholder:"选择日期时间"},model:{value:e.cloumn_date,callback:function(t){e.cloumn_date=t},expression:"cloumn_date"}})],1)],1)],1)]),r("li",[r("div",[e._v(" 置顶维度设置： "),r("el-radio-group",{model:{value:e.otherConditon,callback:function(t){e.otherConditon=t},expression:"otherConditon"}},[r("el-radio",{attrs:{label:"1"}},[e._v("自定义商品")]),r("el-radio",{attrs:{label:"2"}},[r("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.saleType,callback:function(t){e.saleType=t},expression:"saleType"}},[r("el-option",{attrs:{label:"默认排序",value:"2"}}),r("el-option",{attrs:{label:"销量从低往高",value:"3"}}),r("el-option",{attrs:{label:"销量从高往低",value:"4"}}),r("el-option",{attrs:{label:"价格从低往高",value:"5"}}),r("el-option",{attrs:{label:"价格从高往低",value:"6"}})],1)],1)],1),"1"===e.otherConditon?r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")]):e._e()],1)]),r("li",{staticStyle:{"align-items":"baseline"}},[r("div",[e._v("循环置顶商品个数： "),r("el-input",{staticStyle:{width:"60px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.loopGoodsNum,callback:function(t){e.loopGoodsNum=t},expression:"loopGoodsNum"}}),r("el-button",{staticStyle:{"margin-left":"32px"},attrs:{size:"mini",type:"primary"},on:{click:e.createTeskFun}},[e._v("创建任务")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.refreshTopGoods}},[e._v("重新获取置顶商品")])],1)])])])]),r("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableList,height:"calc(100vh - 232px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),r("el-table-column",{attrs:{type:"index",fixed:"",label:"序号"}}),r("el-table-column",{attrs:{prop:"country",label:"站点",align:"center","min-width":"150px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(e._s(e._f("chineseSite")(r.country)))]}}])}),r("el-table-column",{attrs:{prop:"mallName",label:"店铺名称",align:"center","min-width":"150px"}}),r("el-table-column",{attrs:{prop:"top_type",label:"置顶维度",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("span",[e._v(e._s(e.top_typeList[a.top_type]))])]}}])}),r("el-table-column",{attrs:{prop:"top_total_count",label:"置顶商品总数",align:"center","min-width":"100px"}}),r("el-table-column",{attrs:{prop:"toped_count",label:"已置顶商品数",align:"center","min-width":"100px"}}),r("el-table-column",{attrs:{prop:"created_at",label:"任务创建时间",align:"center","min-width":"150px"}}),r("el-table-column",{attrs:{prop:"next_top_time",label:"下次置顶时间",align:"center","min-width":"150px"}}),r("el-table-column",{attrs:{prop:"all_good_ids",label:"置顶商品",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[a.all_good_ids?r("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[r("div",{staticStyle:{"max-width":"200px",height:"auto"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(a.all_good_ids))]),r("span",{staticClass:"bindmallclass",attrs:{type:"text"}},[e._v(e._s(a.all_good_ids))])]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"result",label:"操作结果",align:"center","min-width":"100px"}}),r("el-table-column",{attrs:{prop:"",label:"历史记录",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.checkRecord(a.id)}}},[e._v("查看置顶记录")])]}}])}),r("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delTesk(a.id)}}},[e._v("删除")])]}}])})],1),r("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end"}},[r("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[15,50,100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),r("el-dialog",{attrs:{title:"置顶记录",top:"3vh",visible:e.dialogRecord,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"},on:{"update:visible":function(t){e.dialogRecord=t}}},[r("div",[r("el-table",{attrs:{data:e.recordList,"header-cell-style":{background:"#f7fafa"},height:"calc(100vh - 233px)","row-style":{color:"black",height:"50px"}}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"55"}}),r("el-table-column",{attrs:{prop:"created_at",label:"记录时间","min-width":"150",sortable:""}}),r("el-table-column",{attrs:{prop:"top_history_msg",label:"历史信息","min-width":"280"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogRecord=!1}}},[e._v("关 闭")])],1)]),r("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),r("div",{staticClass:"on_new_dialog"},[r("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?r("goodsItemSelector",{attrs:{mall:e.selectMallList},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)],1)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("span",{staticStyle:{color:"red",display:"block","margin-top":"5px"}},[e._v("提示：每个店铺可置顶商品数量大为5个，置顶时间为4小时")])])}],s=r("b85c"),i=r("1da1"),o=(r("d3b7"),r("25f0"),r("d81d"),r("a9e3"),r("99af"),r("159b"),r("96cf"),r("0b64")),c=r("feb6"),u=r("01cd"),l=r("0e0b"),d=r("a254"),p=(r("c4e3"),{components:{storeChoose:c["a"],goodsItemSelector:u["a"]},data:function(){return{goodsItemSelectorVisible:!1,dialogRecord:!1,stoptoping:!1,createDel:!1,MarketManagerAPIInstance:new d["a"](this),loading:!1,GoodsList:new o["a"](this),top_typeList:{1:"商品ID",2:"默认排序",3:"销量从低往高",4:"销量从高往低",5:"价格从低往高",6:"价格从高往低"},page:1,pageSize:15,total:0,showlog:!0,pickerOptions:{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}},cloumn_date:"",set_time:"1",otherConditon:"2",saleType:"2",loopGoodsNum:"",tableList:[],selectMalllist:[],shopAccountList:[],selectTable:[],topHistoryMsg:[],recordList:[],currentDate:"",createTag:!1,couponGoodslist:[],topok:0}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getInfo();case 2:case"end":return t.stop()}}),t)})))()},methods:{addGoods:function(){this.selectMalllist.length>1?this.$message.warning("选择自定义商品时,只能选择一个店铺"):this.goodsItemSelectorVisible=!0},changeGoodsItem:function(e){e&&(this.couponGoodslist=e.goodsList),this.goodsItemSelectorVisible=!1},clearLog:function(){this.$refs.Logs.consoleMsg=""},refreshTopGoods:function(){this.selectTable.length||this.$message.warning("请选择需要操作的数据!"),"1"===this.otherConditon&&this.$message.warning("商品ID不能为空！"),this.otherConditon},checkRecord:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.dialogRecord=!0,a={topTaskId:e},r.next=4,t.$api.getTopHistory(a);case 4:n=r.sent,200===n.data.code?t.recordList=n.data.data.data:t.$refs.Logs.writeLog("置顶记录获取失败");case 6:case"end":return r.stop()}}),r)})))()},getTopTestTable:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showlog=!1,e.$refs.Logs.writeLog("正在获取列表信息......",!0),r=e.selectMalllist.map((function(e){return e["platform_mall_id"]})).toString(),t.next=5,window.BaseUtilBridgeService.getTopGoodsTask(r);case 5:a=t.sent,a.length||e.$refs.Logs.writeLog("当前暂无置顶任务",!0),e.$refs.Logs.writeLog("列表信息获取结束",!0);case 9:case"end":return t.stop()}}),t)})))()},getTopTest:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showlog=!1,e.$refs.Logs.writeLog("正在获取置顶任务......"),t.next=4,e.$api.topTask();case 4:if(r=t.sent,200!==r.data.code){t.next=16;break}return e.$refs.Logs.writeLog("获取置顶任务成功",!0),e.page=r.data.data.current_page,e.total=r.data.data.total,a=r.data.data.data,t.next=12,Object(l["c"])(a,e.checkMall);case 12:return t.next=14,e.getTopTestTable();case 14:t.next=17;break;case 16:e.$message.error("任务获取失败--".concat(r.message),!1);case 17:case"end":return t.stop()}}),t)})))()},checkMall:function(e){var t=arguments,r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s,i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=t.length>1&&void 0!==t[1]?t[1]:{count:1},a.prev=1,s=Object(l["a"])(r.shopAccountList,"label","value",e.sys_mall_id),s){a.next=7;break}return r.$refs.Logs.writeLog("【".concat(e.sys_mall_id,"】店铺不存在"),!1),r.topHistoryMsg.push({topHistoryMsg:"店铺不存在"}),a.abrupt("return");case 7:if(i=new Date(e.next_top_time).getTime(),o=(new Date).getTime(),!(i>o)||r.createTag){a.next=12;break}return r.$refs.Logs.writeLog("【".concat(s,"】店铺,未到置顶时间"),!0),a.abrupt("return");case 12:if(!(Number(e.top_total_count)<=Number(e.toped_count))){a.next=16;break}return r.$refs.Logs.writeLog("【".concat(s,"】店铺,已置顶完所有商品")),r.topHistoryMsg.push({topHistoryMsg:"已置顶完所有商品"}),a.abrupt("return");case 16:if(1===Number(e.top_type)){a.next=21;break}return e.page=1,e.mallName=s,a.next=21,r.getMallTopGoods(e);case 21:Number(e.top_type),a.next=27;break;case 24:a.prev=24,a.t0=a["catch"](1),r.$refs.Logs.writeLog("catch--【".concat(e.sys_mall_id,"】,").concat(a.t0),!1);case 27:return a.prev=27,n.count--,a.finish(27);case 30:case"end":return a.stop()}}),a,null,[[1,24,27,30]])})))()},getMallTopGoods:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,i,o,c,u,l,d,p,g,m,h;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n={country:e.country,pageNumber:0,platform_mall_id:e.platform_mall_id},i={mItem:n,pageSize:48,listType:"all"},"3"===e.top_type&&(i.listOrderType="sales_asc"),"4"===e.top_type&&(i.listOrderType="sales_dsc"),"5"===e.top_type&&(i.listOrderType="price_asc"),"6"===e.top_type&&(i.listOrderType="price_dsc"),o=[],c=!0;case 8:if(!c){a.next=41;break}return n["pageNumber"]++,a.next=12,r.GoodsList.getMpskuList(i);case 12:if(u=a.sent,200!==u.code){a.next=38;break}if(null!==(l=u.data.list)&&void 0!==l&&l.length){a.next=17;break}return r.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】暂无商品数据")),a.abrupt("break",41);case 17:d=u.data.list,p=Object(s["a"])(d),a.prev=19,m=function(){var e=g.value;if(t.length){var r=t.indexOf((function(t){return e.id===t}));if(r>=0)return"continue"}o.push(e.id),o.length>=5&&(c=!1)},p.s();case 22:if((g=p.n()).done){a.next=28;break}if(h=m(),"continue"!==h){a.next=26;break}return a.abrupt("continue",26);case 26:a.next=22;break;case 28:a.next=33;break;case 30:a.prev=30,a.t0=a["catch"](19),p.e(a.t0);case 33:return a.prev=33,p.f(),a.finish(33);case 36:a.next=39;break;case 38:c=!1;case 39:a.next=8;break;case 41:case"end":return a.stop()}}),a,null,[[19,30,33,36]])})))()},topAction:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i,o,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,a={country:e.country,mallId:e.sys_mall_id,goodsID:e.id},r.next=4,t.MarketManagerAPIInstance.topGoods(a);case 4:return n=r.sent,s={list:[{topTaskId:e.topTaskId.toString(),topGoods:[{goodsId:e.id.toString(),isTop:0}]}]},0===n.ecode?(s.list[0].topGoods[0].isTop=1,t.topok++,t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶成功"),!0),t.topHistoryMsg.push({topHistoryMsg:"商品【".concat(e.id,"】置顶成功")})):(t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶失败").concat(n.message),!1),t.topHistoryMsg.push({topHistoryMsg:"商品【".concat(e.id,"】置顶失败").concat(n.message)})),r.next=9,t.$api.uploadTopGood(s);case 9:return i=r.sent,200!==i.data.code&&t.$refs.Logs.writeLog("【商品".concat(e.id,"】上报失败，").concat(i.data.data.errors),!1),t.$refs.Logs.writeLog("【商品".concat(e.id,"】上报成功"),!0),o={list:[{topTaskId:e.topTaskId.toString(),topHistory:t.topHistoryMsg}]},r.next=15,t.$api.uploadTopHistory(o);case 15:c=r.sent,200!==c.data.code?t.$refs.Logs.writeLog("【商品".concat(e.id,"】历史记录上传失败，").concat(c.data.message),!1):t.$refs.Logs.writeLog("【商品".concat(e.id,"】历史记录上传成功"),!0),r.next=22;break;case 19:r.prev=19,r.t0=r["catch"](0),t.$refs.Logs.writeLog("【商品".concat(e.id,"】操作失败----catch").concat(r.t0),!1);case 22:case"end":return r.stop()}}),r,null,[[0,19]])})))()},stopdTesk:function(){Object(l["z"])(),this.stoptoping=!0,this.$refs.autoReplyLogs.writeLog("正在停止创建任务")},handleSelectionChange:function(e){this.selectTable=e},delTeskFun:function(){var e=this;this.selectTable.length?this.$confirm("确定删除这些任务吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.delTesk();case 1:case"end":return t.stop()}}),t)})))):this.$message.warning("请选择要操作的数据！")},delTesk:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=[],e?a.push(e):t.selectTable.forEach((function(e){a.push(e.id)})),n={ids:a.toString()},r.prev=3,r.next=6,t.$api.topTaskdel(n);case 6:s=r.sent,200===s.data.code?t.$message.success("删除成功"):(i=s.data.data,i.forEach((function(e){t.$refs.Logs.writeLog("【".concat(e,"】"),!1)}))),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](3),t.$refs.Logs.writeLog("【".concat(r.t0,"】"),!1);case 13:t.getTopTestTable();case 14:case"end":return r.stop()}}),r,null,[[3,10]])})))()},getInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Object(l["r"])().then((function(t){e.shopAccountList=t}));case 1:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.pageSize=e,this.getTopTestTable()},handleCurrentChange:function(e){this.page=e,this.getTopTestTable()},changeMallList:function(e){this.selectMalllist=e},createTeskFun:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectMalllist.length){t.next=3;break}return e.$message.warning("请选择要执行的任务的店铺"),t.abrupt("return");case 3:if("2"!==e.set_time||e.cloumn_date){t.next=6;break}return e.$message.warning("请设置任务执行时间"),t.abrupt("return");case 6:if("1"!==e.otherConditon||e.couponGoodslist.length){t.next=9;break}return e.$message.warning("请选择自定义商品"),t.abrupt("return");case 9:if("2"!==e.otherConditon||e.loopGoodsNum){t.next=12;break}return e.$message.warning("请设置任务执行的商品个数"),t.abrupt("return");case 12:return e.$refs.Logs.writeLog("正在创建任务",!0),t.next=15,Object(l["c"])(e.selectMalllist,e.createTesk);case 15:e.$refs.Logs.writeLog("任务创建结束",!0);case 16:case"end":return t.stop()}}),t)})))()},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),r=t.getFullYear(),a=t.getMonth()+1,n=t.getDate(),s=t.getHours(),i=t.getMinutes(),o=t.getSeconds();return r+"-"+this.add0(a)+"-"+this.add0(n)+" "+this.add0(s)+":"+this.add0(i)+":"+this.add0(o)},aaa:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={country:"TH",mallId:"213693788",goodsID:10053264472},t.next=3,e.MarketManagerAPIInstance.topGoods(r);case 3:t.sent;case 5:case"end":return t.stop()}}),t)})))()},createTesk:function(e){var t=arguments,r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s,i,o,c,u,l,d,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.length>1&&void 0!==t[1]?t[1]:{count:1},a.prev=1,a.next=4,window.BaseUtilBridgeService.getTopGoodsTask(e.platform_mall_id);case 4:if(s=a.sent,i=s?2:1,o=0,o="1"===r.otherConditon?r.couponGoodslist.length:r.loopGoodsNum,c=[],"1"!==r.otherConditon){a.next=13;break}c=r.couponGoodslist,a.next=19;break;case 13:return a.next=15,window.BaseUtilBridgeService.getTopGoods(e.platform_mall_id,null,!0);case 15:return u=a.sent,a.next=18,r.getMallTopGoods(e,u);case 18:c=a.sent;case 19:return l=(new Date).getTime(),d={country:e.country,mall_name:e.mall_alias_name||e.platform_mall_name,mall_id:e.platform_mall_id,top_task_type:i,top_total_count:o,toped_count:s.toped_count||0,next_top_time:r.formatTime(l+144e5),topping_goods_ids:c,message:"任务创建成功",created_at:r.formatTime(l),updated_at:r.formatTime(l)},a.next=24,window.BaseUtilBridgeService.saveTopGoodsTask(d);case 24:if(p=a.sent,200===p.code){a.next=28;break}return r.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败"),!1),a.abrupt("return");case 28:a.next=33;break;case 30:a.prev=30,a.t0=a["catch"](1),r.$refs.Logs.writeLog("【".concat(a.t0,"】"),!1);case 33:return a.prev=33,--n.count,a.finish(33);case 36:case"end":return a.stop()}}),a,null,[[1,30,33,36]])})))()}}}),g=p,m=(r("ae31"),r("2877")),h=Object(m["a"])(g,a,n,!1,null,"1ba40278",null);t["default"]=h.exports},ae31:function(e,t,r){"use strict";r("2a63")}}]);