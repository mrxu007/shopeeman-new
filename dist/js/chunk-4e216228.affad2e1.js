(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e216228"],{"0b64":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a("1da1"),n=a("d4ec"),s=a("bee2"),o=(a("96cf"),function(){function e(t){Object(n["a"])(this,e),this._this=t}return Object(s["a"])(e,[{key:"putModelActive",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$shopeemanService.mixChinese(t,"/api/marketing/v3/discount/nominate/",a,{Headers:{"Content-Type":" application/json"}},"put");case 3:if(r=e.sent,n=r&&JSON.parse(r),!n||200!==n.status){e.next=14;break}if(s=JSON.parse(n.data),!s||0!==s.code){e.next=11;break}return e.abrupt("return",{code:200,data:s.data||[]});case 11:return e.abrupt("return",{code:50001,data:s.message||n.statusText||""});case 12:e.next=17;break;case 14:if(403!==n.status){e.next=16;break}return e.abrupt("return",{code:n.status,data:"操作失败，店铺未登录！"});case 16:return e.abrupt("return",{code:n.status,data:"操作失败".concat(n.statusText)});case 17:e.next=22;break;case 19:return e.prev=19,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"操作异常： ".concat(e.t0)});case 22:case"end":return e.stop()}}),e,this,[[0,19]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"deleteCollectGoodsInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.deleteCollectGoodsInfo(t);case 3:if(a=e.sent,r=this.isJsonString(a),200!==r.code){e.next=7;break}return e.abrupt("return",{code:200});case 7:return e.abrupt("return",{code:201,data:r.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除云商品库数据异常 ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"dismissInvalidProducts",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a={},a["ids"]=[t.id],a["mallId"]=t.platform_mall_id,e.next=6,this._this.$shopeemanService.postChinese(t.country,"/api/v3/product/dismiss_invalid_products?",a);case 6:if(r=e.sent,n=this.isJsonString(r),200!==n.status){e.next=12;break}if(s=this.isJsonString(n.data),0!==s.code){e.next=12;break}return e.abrupt("return",{code:200});case 12:return e.abrupt("return",{code:201,data:n.statusText});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"确认虾皮禁卖异常： ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteAddOnDealSubItemList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a,r){var n,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={},n["add_on_deal_id"]=a,n["create_type"]=0,n["sub_item_list"]=r,n["mallId"]=t.platform_mall_id,e.next=8,this._this.$shopeemanService.postChinese(t.country,"/api/marketing/v3/add_on_deal/sub_item_list/?",n);case 8:if(s=e.sent,o=this.isJsonString(this.isJsonString(s).data),"success"!==o.message){e.next=12;break}return e.abrupt("return",{code:200});case 12:return e.abrupt("return",{code:201,data:o.message});case 15:return e.prev=15,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除加购子商品异常： ".concat(e.t0)});case 18:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t,a,r){return e.apply(this,arguments)}return t}()},{key:"getAdd0nDealAggrSubItemList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r["add_on_deal_id"]=a,r["mallId"]=t.platform_mall_id,r["promotion_status"]="ongoing",e.prev=4,e.next=7,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/aggr_sub_item_list/?",r);case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200,data:s.data});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](4),e.abrupt("return",{code:-2,data:"子商品加购活动列表异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[4,14]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"deleteAddOnDealMainItemList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a,r){var n,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={},n["add_on_deal_id"]=r,n["main_item_list"]=[{item_id:t.id,status:a}],n["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.postChinese(t.country,"/api/marketing/v3/add_on_deal/main_item_list/?",n);case 7:if(s=e.sent,o=this.isJsonString(this.isJsonString(s).data),"success"!==o.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:o.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除加购主商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,a,r){return e.apply(this,arguments)}return t}()},{key:"getAdd0nDealAggrMainItemList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r["add_on_deal_id"]=a,r["mallId"]=t.platform_mall_id,e.prev=3,e.next=6,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/aggr_main_item_list/?",r);case 6:if(n=e.sent,s=this.isJsonString(n),200!==s.status){e.next=11;break}return o=this.isJsonString(s.data),e.abrupt("return",{code:200,data:o.data});case 11:return e.abrupt("return",{code:201,data:s.statusText});case 14:return e.prev=14,e.t0=e["catch"](3),e.abrupt("return",{code:-2,data:"主商品加购活动列表异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[3,14]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getAddOnDealStandardSearch",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["search_type"]="item_id",a["keyword"]=t.id,a["mallId"]=t.platform_mall_id,a["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/add_on_deal/standard_search/?",a);case 8:if(r=e.sent,n=this.isJsonString(r),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"加购活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteBundleGoods",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={},r["bundle_deal_id"]=a,r["items"]=[{item_id:t.id}],r["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.deleteChinese(t.country,"/api/marketing/v3/bundle_deal/item/",r,{headers:{"Content-Type":"application/json",referer:"portal/marketing/bundle/".concat(a)}});case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除套装商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getBundleDeal",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["keyword"]=t.id,a["search_type"]="item_id",a["mallId"]=t.platform_mall_id,a["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChineseReferer(t.country,"/api/marketing/v3/bundle_deal/standard_search/?",a);case 8:if(r=e.sent,n=this.isJsonString(r),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"套装活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteDiscountCampainDetail",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={},r["discount_id"]=a,r["itemid_list"]=[t.id],r["mallId"]=t.platform_mall_id,e.next=7,this._this.$shopeemanService.deleteChinese(t.country,"/api/marketing/v3/discount/nominate/abnormal/",r,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/discount/".concat(a,"/")}});case 7:if(n=e.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){e.next=11;break}return e.abrupt("return",{code:200});case 11:return e.abrupt("return",{code:201,data:s.message});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除折扣商品异常： ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getMallDiscountsIdByKeyword",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["search_type"]="item_id",a["keyword"]=t.id,a["mallId"]=t.platform_mall_id,a["promotion_status"]="ongoing",e.prev=5,e.next=8,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/discount/standard_search/?",a);case 8:if(r=e.sent,n=this.isJsonString(r),200!==n.status){e.next=13;break}return s=this.isJsonString(n.data),e.abrupt("return",{code:200,data:s.data});case 13:return e.abrupt("return",{code:201,data:n.statusText});case 16:return e.prev=16,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"折扣活动异常： ".concat(e.t0)});case 19:case"end":return e.stop()}}),e,this,[[5,16]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getCategoryName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a,r,n){var s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.getCategoryTbInfo(t,a+"",r,n);case 3:if(s=e.sent,o=this.isJsonString(s),200!==o.code){e.next=7;break}return e.abrupt("return",{code:200,data:o.data});case 7:return e.abrupt("return",{code:201,data:o.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取类目名异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,a,r,n){return e.apply(this,arguments)}return t}()},{key:"searchProductList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s,o,i,c,u,l,d,p,g,m,h,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.mItem,r=t.pageSize,n=t.searchType,s=t.keyword,o=t.goodsMin,i=t.goodsMax,c=t.soldMin,u=t.soldMax,l=t.listType,d=t.categoryId,p=t.cursor,e.prev=1,g={page_number:a.pageNumber,page_size:r,mallId:a.platform_mall_id,search_type:n,keyword:s,category_id:d,stock_min:o,stock_max:i,sold_min:c,sold_max:u,list_type:l,count_list_types:"sold_out,banned,deboosted,deleted,unlisted",source:"seller_center",cursor:p,version:"4.0.0"},e.next=5,this._this.$shopeemanService.getChinese(a.country,"/api/v3/product/search_product_list/?",g,{headers:{accept:"application/json, text/plain, */*"}});case 5:if(m=e.sent,h=this.isJsonString(m),200!==h.status){e.next=12;break}if(f=this.isJsonString(h.data),"success"!==f.message){e.next=11;break}return e.abrupt("return",{code:200,data:f.data});case 11:return e.abrupt("return",{code:201,data:"数据获取失败：".concat(f.message)});case 12:if(403!==h.status){e.next=14;break}return e.abrupt("return",{code:403,data:"未登录，请登录后再查询"});case 14:if(0!==h.status){e.next=16;break}return e.abrupt("return",{code:0,data:"异常，请检查代理"});case 16:return e.abrupt("return",{code:h.status,data:"".concat(h.statusText)});case 19:return e.prev=19,e.t0=e["catch"](1),e.abrupt("return",{code:-2,data:"获取数据异常： ".concat(e.t0)});case 22:case"end":return e.stop()}}),e,this,[[1,19]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMpskuList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,s,o,i,c,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.mItem,r=t.pageSize,n=t.listType,s=t.listOrderType,o=t.cursor,e.prev=1,i={page_number:a.pageNumber,page_size:r,mallId:a.platform_mall_id,list_type:n,source:"seller_center",version:"1.0.0"},s&&(i["list_order_type"]=s),o&&(i["cursor"]=o),e.next=7,this._this.$shopeemanService.getChinese(a.country,"/api/v3/mpsku/get_mpsku_list/?",i,{headers:{accept:"application/json, text/plain, */*"}});case 7:if(c=e.sent,u=this.isJsonString(c),200!==u.status){e.next=14;break}if(l=this.isJsonString(u.data),"success"!==l.message){e.next=13;break}return e.abrupt("return",{code:200,data:l.data});case 13:return e.abrupt("return",{code:201,data:"数据获取失败：".concat(l.message)});case 14:if(403!==u.status){e.next=16;break}return e.abrupt("return",{code:403,data:"未登录，请登录后再查询"});case 16:if(0!==u.status){e.next=18;break}return e.abrupt("return",{code:0,data:"异常，请检查代理"});case 18:return e.abrupt("return",{code:u.status,data:"".concat(u.statusText)});case 21:return e.prev=21,e.t0=e["catch"](1),e.abrupt("return",{code:-2,data:"获取数据异常： ".concat(e.t0)});case 24:case"end":return e.stop()}}),e,this,[[1,21]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isJsonString",value:function(e){if("string"!==typeof e)return e;try{return JSON.parse(e),JSON.parse(e)}catch(t){return e}}}]),e}())},"4e42":function(e,t,a){},"5daf":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"row",staticStyle:{display:"flex","margin-top":"25px","background-color":"white",padding:"15px 4px",overflow:"auto"}},[a("div",{staticClass:"row2_left",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px",width:"748px"}},[a("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("基础数据配置")]),a("ul",[a("li",[a("storeChoose",{staticStyle:{"margin-left":"-20px",width:"730px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}})],1),a("li",{staticStyle:{"margin-top":"20px","align-items":"center"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.getTopTestTable}},[e._v("搜索任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.delTeskFun}},[e._v("批量删除任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopdTesk}},[e._v("停止创建任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.aaa}},[e._v("aaa")])],1),e._m(0)])]),a("div",{staticClass:"row2_right",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px","margin-left":"20px",width:"507px"}},[a("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("置顶任务操作")]),a("ul",{staticStyle:{width:"505px"}},[a("li",[a("div",[e._v(" 置顶时间设置： "),a("el-radio-group",{model:{value:e.set_time,callback:function(t){e.set_time=t},expression:"set_time"}},[a("el-radio",{attrs:{label:"1"}},[e._v("当前时间")]),a("el-radio",{staticStyle:{"margin-left":"11px"},attrs:{label:"2"}},[a("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini",type:"datetime","value-format":"timestamp","picker-options":e.pickerOptions,placeholder:"选择日期时间"},model:{value:e.cloumn_date,callback:function(t){e.cloumn_date=t},expression:"cloumn_date"}})],1)],1)],1)]),a("li",[a("div",[e._v(" 置顶维度设置： "),a("el-radio-group",{model:{value:e.otherConditon,callback:function(t){e.otherConditon=t},expression:"otherConditon"}},[a("el-radio",{attrs:{label:"1"}},[e._v("自定义商品")]),a("el-radio",{attrs:{label:"2"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.saleType,callback:function(t){e.saleType=t},expression:"saleType"}},[a("el-option",{attrs:{label:"默认排序",value:"2"}}),a("el-option",{attrs:{label:"销量从低往高",value:"3"}}),a("el-option",{attrs:{label:"销量从高往低",value:"4"}}),a("el-option",{attrs:{label:"价格从低往高",value:"5"}}),a("el-option",{attrs:{label:"价格从高往低",value:"6"}})],1)],1)],1),"1"===e.otherConditon?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")]):e._e()],1)]),a("li",{staticStyle:{"align-items":"baseline"}},[a("div",[e._v("循环置顶商品个数： "),a("el-input",{staticStyle:{width:"60px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.loopGoodsNum,callback:function(t){e.loopGoodsNum=t},expression:"loopGoodsNum"}}),a("el-button",{staticStyle:{"margin-left":"32px"},attrs:{size:"mini",type:"primary"},on:{click:e.createTeskFun}},[e._v("创建任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.refreshTopGoods}},[e._v("重新获取置顶商品")])],1)])])])]),a("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableList,height:"calc(100vh - 232px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{type:"index",fixed:"",label:"序号"}}),a("el-table-column",{attrs:{prop:"country",label:"站点",align:"center","min-width":"150px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e._f("chineseSite")(a.country)))]}}])}),a("el-table-column",{attrs:{prop:"mallName",label:"店铺名称",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"top_type",label:"置顶维度",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("span",[e._v(e._s(e.top_typeList[r.top_type]))])]}}])}),a("el-table-column",{attrs:{prop:"top_total_count",label:"置顶商品总数",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"toped_count",label:"已置顶商品数",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"created_at",label:"任务创建时间",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"next_top_time",label:"下次置顶时间",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"all_good_ids",label:"置顶商品",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.all_good_ids?a("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[a("div",{staticStyle:{"max-width":"200px",height:"auto"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(r.all_good_ids))]),a("span",{staticClass:"bindmallclass",attrs:{type:"text"}},[e._v(e._s(r.all_good_ids))])]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"result",label:"操作结果",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"历史记录",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.checkRecord(r.id)}}},[e._v("查看置顶记录")])]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delTesk(r.id)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[15,50,100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"置顶记录",top:"3vh",visible:e.dialogRecord,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"},on:{"update:visible":function(t){e.dialogRecord=t}}},[a("div",[a("el-table",{attrs:{data:e.recordList,"header-cell-style":{background:"#f7fafa"},height:"calc(100vh - 233px)","row-style":{color:"black",height:"50px"}}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"55"}}),a("el-table-column",{attrs:{prop:"created_at",label:"记录时间","min-width":"150",sortable:""}}),a("el-table-column",{attrs:{prop:"top_history_msg",label:"历史信息","min-width":"280"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogRecord=!1}}},[e._v("关 闭")])],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?a("goodsItemSelector",{attrs:{mall:e.selectMallList},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",{staticStyle:{color:"red",display:"block","margin-top":"5px"}},[e._v("提示：每个店铺可置顶商品数量大为5个，置顶时间为4小时")])])}],s=a("2909"),o=a("1da1"),i=(a("159b"),a("a9e3"),a("99af"),a("d3b7"),a("a434"),a("25f0"),a("3ca3"),a("ddb0"),a("c740"),a("96cf"),a("0b64")),c=a("feb6"),u=a("01cd"),l=a("0e0b"),d=a("a254"),p=(a("c4e3"),{components:{storeChoose:c["a"],goodsItemSelector:u["a"]},data:function(){return{goodsItemSelectorVisible:!1,dialogRecord:!1,stoptoping:!1,createDel:!1,MarketManagerAPIInstance:new d["a"](this),loading:!1,GoodsList:new i["a"](this),top_typeList:{1:"商品ID",2:"默认排序",3:"销量从低往高",4:"销量从高往低",5:"价格从低往高",6:"价格从高往低"},page:1,pageSize:15,total:0,showlog:!0,pickerOptions:{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}},cloumn_date:"",set_time:"1",otherConditon:"2",saleType:"2",loopGoodsNum:"",tableList:[],selectMalllist:[],shopAccountList:[],selectTable:[],topHistoryMsg:[],recordList:[],currentDate:"",createTag:!1,couponGoodslist:[],topok:0}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getInfo();case 2:case"end":return t.stop()}}),t)})))()},methods:{addGoods:function(){this.selectMalllist.length>1?this.$message.warning("选择自定义商品时,只能选择一个店铺"):this.goodsItemSelectorVisible=!0},changeGoodsItem:function(e){e&&(this.couponGoodslist=e.goodsList),this.goodsItemSelectorVisible=!1},clearLog:function(){this.$refs.Logs.consoleMsg=""},refreshTopGoods:function(){this.selectTable.length||this.$message.warning("请选择需要操作的数据!"),"1"===this.otherConditon&&this.$message.warning("商品ID不能为空！"),this.otherConditon},checkRecord:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.dialogRecord=!0,r={topTaskId:e},a.next=4,t.$api.getTopHistory(r);case 4:n=a.sent,200===n.data.code?t.recordList=n.data.data.data:t.$refs.Logs.writeLog("置顶记录获取失败");case 6:case"end":return a.stop()}}),a)})))()},getTopTestTable:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showlog=!1,e.$refs.Logs.writeLog("正在获取列表信息......",!0),r={country:(null===(a=e.selectMalllist[0])||void 0===a?void 0:a.country)||"TH",pageSize:e.pageSize,page:e.page},t.next=5,e.$api.topTask(r);case 5:n=t.sent,200===n.data.code?(e.page=n.data.data.current_page,e.total=n.data.data.total,s=n.data.data.data,s.forEach((function(t){t.mallName=Object(l["a"])(e.shopAccountList,"label","value",t.sys_mall_id)})),e.tableList=s,e.$refs.Logs.writeLog("获取列表信息完毕",!0)):e.$message.error("列表获取失败--".concat(n.message),!1);case 7:case"end":return t.stop()}}),t)})))()},getTopTest:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showlog=!1,e.$refs.Logs.writeLog("正在获取置顶任务......"),t.next=4,e.$api.topTask();case 4:if(a=t.sent,200!==a.data.code){t.next=16;break}return e.$refs.Logs.writeLog("获取置顶任务成功",!0),e.page=a.data.data.current_page,e.total=a.data.data.total,r=a.data.data.data,t.next=12,Object(l["c"])(r,e.checkMall);case 12:return t.next=14,e.getTopTestTable();case 14:t.next=17;break;case 16:e.$message.error("任务获取失败--".concat(a.message),!1);case 17:case"end":return t.stop()}}),t)})))()},checkMall:function(e){var t=arguments,a=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,s,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n=t.length>1&&void 0!==t[1]?t[1]:{count:1},r.prev=1,s=Object(l["a"])(a.shopAccountList,"label","value",e.sys_mall_id),s){r.next=7;break}return a.$refs.Logs.writeLog("【".concat(e.sys_mall_id,"】店铺不存在"),!1),a.topHistoryMsg.push({topHistoryMsg:"店铺不存在"}),r.abrupt("return");case 7:if(o=new Date(e.next_top_time).getTime(),i=(new Date).getTime(),!(o>i)||a.createTag){r.next=12;break}return a.$refs.Logs.writeLog("【".concat(s,"】店铺,未到置顶时间"),!0),r.abrupt("return");case 12:if(!(Number(e.top_total_count)<=Number(e.toped_count))){r.next=16;break}return a.$refs.Logs.writeLog("【".concat(s,"】店铺,已置顶完所有商品")),a.topHistoryMsg.push({topHistoryMsg:"已置顶完所有商品"}),r.abrupt("return");case 16:if(1===Number(e.top_type)){r.next=21;break}return e.page=1,e.mallName=s,r.next=21,a.getMallTopGoods(e);case 21:Number(e.top_type),r.next=27;break;case 24:r.prev=24,r.t0=r["catch"](1),a.$refs.Logs.writeLog("catch--【".concat(e.sys_mall_id,"】,").concat(r.t0),!1);case 27:return r.prev=27,n.count--,r.finish(27);case 30:case"end":return r.stop()}}),r,null,[[1,24,27,30]])})))()},getMallTopGoods:function(e){var t=this;return new Promise(function(){var a=Object(o["a"])(regeneratorRuntime.mark((function a(r){var n,o,i,c,u,l,d,p,g,m,h,f,b,_;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n={country:e.country,pageNumber:e.page,platform_mall_id:e.sys_mall_id},o={mItem:n,pageSize:48,listType:"all"},"3"===e.top_type&&(o.listOrderType="sales_asc"),"4"===e.top_type&&(o.listOrderType="sales_dsc"),"5"===e.top_type&&(o.listOrderType="price_asc"),"6"===e.top_type&&(o.listOrderType="price_dsc"),t.$refs.Logs.writeLog("【".concat(e.mallName,"】获取商品数据"),!0),i=Number(e.top_total_count)<=48?1:Math.floor(Number(e.top_total_count)/48)+1,c=[],u=0;case 10:if(!(u<i)){a.next=26;break}return o.mItem.pageNumber=u+1,a.prev=12,a.next=15,t.GoodsList.getMpskuList(o);case 15:l=a.sent,200===l.code?(null!==(d=l.data.list)&&void 0!==d&&d.length||(t.$refs.Logs.writeLog("【".concat(e.mallName,"】暂无商品数据")),r()),c.push.apply(c,Object(s["a"])(l.data.list))):(t.$refs.Logs.writeLog("获取店铺【".concat(e.mallName,"】商品数据获取失败,").concat(l.data),!1),r()),a.next=23;break;case 19:a.prev=19,a.t0=a["catch"](12),t.$refs.Logs.writeLog("获取店铺【".concat(e.mallName,"】商品数据获取失败,catch---").concat(a.t0),!1),r();case 23:u++,a.next=10;break;case 26:return p=[],c.forEach((function(t){t.country=e.country,t.sys_mall_id=e.sys_mall_id,t.topTaskId=e.id,t.mallName=e.mallName,t.top_total_count=e.top_total_count,t.toped_count=e.toped_count})),g=[],p=c.splice(0,e.top_total_count),p.forEach((function(e){g.push({goodsId:e.id.toString(),isTop:0})})),t.$refs.Logs.writeLog("【".concat(e.mallName,"】获取置顶商品【").concat(p.length,"】条"),!0),m={list:[{topTaskId:e.id.toString(),topGoods:g}]},a.next=35,t.$api.uploadTopGood(m);case 35:h=a.sent,200!==h.data.code&&t.$refs.Logs.writeLog("【".concat(e.mallName,"】商品上报失败，").concat(h.data.data.errors),!1),t.$refs.Logs.writeLog("【".concat(e.mallName,"】商品上报成功"),!0),f=0;case 39:if(!(f<5)){a.next=46;break}if(!p[f]){a.next=43;break}return a.next=43,t.topAction(p[f]);case 43:f++,a.next=39;break;case 46:return b=[{id:e.id.toString(),topTotalCount:e.top_total_count,topedCount:e.toped_count+t.topok}],a.next=50,t.$api.topTaskUpdate(b);case 50:_=a.sent,200===_.code?t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品置顶更新成功"),!0):t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品置顶更新失败").concat(_.message),!1),t.topok=0,r();case 54:case"end":return a.stop()}}),a,null,[[12,19]])})));return function(e){return a.apply(this,arguments)}}())},topAction:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,s,o,i,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,r={country:e.country,mallId:e.sys_mall_id,goodsID:e.id},a.next=4,t.MarketManagerAPIInstance.topGoods(r);case 4:return n=a.sent,s={list:[{topTaskId:e.topTaskId.toString(),topGoods:[{goodsId:e.id.toString(),isTop:0}]}]},0===n.ecode?(s.list[0].topGoods[0].isTop=1,t.topok++,t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶成功"),!0),t.topHistoryMsg.push({topHistoryMsg:"商品【".concat(e.id,"】置顶成功")})):(t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶失败").concat(n.message),!1),t.topHistoryMsg.push({topHistoryMsg:"商品【".concat(e.id,"】置顶失败").concat(n.message)})),a.next=9,t.$api.uploadTopGood(s);case 9:return o=a.sent,200!==o.data.code&&t.$refs.Logs.writeLog("【商品".concat(e.id,"】上报失败，").concat(o.data.data.errors),!1),t.$refs.Logs.writeLog("【商品".concat(e.id,"】上报成功"),!0),i={list:[{topTaskId:e.topTaskId.toString(),topHistory:t.topHistoryMsg}]},a.next=15,t.$api.uploadTopHistory(i);case 15:c=a.sent,200!==c.data.code?t.$refs.Logs.writeLog("【商品".concat(e.id,"】历史记录上传失败，").concat(c.data.message),!1):t.$refs.Logs.writeLog("【商品".concat(e.id,"】历史记录上传成功"),!0),a.next=22;break;case 19:a.prev=19,a.t0=a["catch"](0),t.$refs.Logs.writeLog("【商品".concat(e.id,"】操作失败----catch").concat(a.t0),!1);case 22:case"end":return a.stop()}}),a,null,[[0,19]])})))()},stopdTesk:function(){Object(l["z"])(),this.stoptoping=!0,this.$refs.autoReplyLogs.writeLog("正在停止创建任务")},handleSelectionChange:function(e){this.selectTable=e},delTeskFun:function(){var e=this;this.selectTable.length?this.$confirm("确定删除这些任务吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.delTesk();case 1:case"end":return t.stop()}}),t)})))):this.$message.warning("请选择要操作的数据！")},delTesk:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=[],e?r.push(e):t.selectTable.forEach((function(e){r.push(e.id)})),n={ids:r.toString()},a.prev=3,a.next=6,t.$api.topTaskdel(n);case 6:s=a.sent,200===s.data.code?t.$message.success("删除成功"):(o=s.data.data,o.forEach((function(e){t.$refs.Logs.writeLog("【".concat(e,"】"),!1)}))),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](3),t.$refs.Logs.writeLog("【".concat(a.t0,"】"),!1);case 13:t.getTopTestTable();case 14:case"end":return a.stop()}}),a,null,[[3,10]])})))()},getInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Object(l["r"])().then((function(t){e.shopAccountList=t}));case 1:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.pageSize=e,this.getTopTestTable()},handleCurrentChange:function(e){this.page=e,this.getTopTestTable()},changeMallList:function(e){this.selectMalllist=e},createTeskFun:function(){this.selectMalllist.length?"2"!==this.set_time||this.cloumn_date?"1"!==this.otherConditon||this.couponGoodslist.length?"2"!==this.otherConditon||this.loopGoodsNum?this.createTesk():this.$message.warning("请设置任务执行的商品个数"):this.$message.warning("请选择自定义商品"):this.$message.warning("请设置任务执行时间"):this.$message.warning("请选择要执行的任务的店铺")},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),r=t.getMonth()+1,n=t.getDate(),s=t.getHours(),o=t.getMinutes(),i=t.getSeconds();return a+"-"+this.add0(r)+"-"+this.add0(n)+" "+this.add0(s)+":"+this.add0(o)+":"+this.add0(i)},aaa:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={country:"TH",mallId:"213693788",goodsID:10053264472},t.next=3,e.MarketManagerAPIInstance.topGoods(a);case 3:t.sent;case 5:case"end":return t.stop()}}),t)})))()},createTesk:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s,o,i,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!("1"!==e.set_time&&e.cloumn_date<(new Date).getTime())){t.next=3;break}return e.$message.warning("请选择正确的创建任务时间"),t.abrupt("return");case 3:e.createDel=!0,a=regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=e.selectMalllist.findIndex((function(t){return e.tableList[a].sys_mall_id===Number(t.platform_mall_id)})),!(r>=0)){t.next=4;break}return t.next=4,e.delTesk(e.tableList[a].id);case 4:case"end":return t.stop()}}),t)})),r=0;case 6:if(!(r<e.tableList.length)){t.next=11;break}return t.delegateYield(a(r),"t0",8);case 8:r++,t.next=6;break;case 11:return e.createTag=!0,n=[],e.selectMalllist.forEach((function(t){var a={country:t.country,sysMallId:t.platform_mall_id,topType:"1"===e.otherConditon?e.otherConditon:e.saleType,topTotalCount:e.loopGoodsNum,topedCount:"0",nextTopTime:"1"===e.set_time?e.formatTime((new Date).getTime()+144e5):e.formatTime(e.cloumn_date+144e5),result:""};n.push(a)})),s={list:n},t.prev=15,e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务......,请耐心等待几秒",!0),t.next=20,e.$api.topTaskadd(s);case 20:if(o=t.sent,200!==o.data.code){t.next=32;break}return e.$refs.Logs.writeLog("任务创建成功",!0),o.data.data.top_tasks||"",i=o.data.data.success||"",c=o.data.data.error||"",null!==i&&void 0!==i&&i.length&&c.forEach((function(t){e.$refs.Logs.writeLog("".concat(t),!0)})),t.next=29,e.getTopTest();case 29:e.createDel=!1,t.next=33;break;case 32:e.$refs.Logs.writeLog("任务创建--请求失败:".concat(o.data.message),!1);case 33:t.next=38;break;case 35:t.prev=35,t.t1=t["catch"](15),e.$refs.Logs.writeLog("任务创建--请求失败--catch".concat(t.t1),!1);case 38:case"end":return t.stop()}}),t,null,[[15,35]])})))()}}}),g=p,m=(a("b13a"),a("2877")),h=Object(m["a"])(g,r,n,!1,null,"2fff22a4",null);t["default"]=h.exports},b13a:function(e,t,a){"use strict";a("4e42")}}]);