(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69a17ec8"],{"4c28":function(t,e,i){},"5c92":function(t,e,i){},8992:function(t,e,i){"use strict";i("4c28")},a285:function(t,e,i){"use strict";i("5c92")},aa44:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticClass:"contaniner"},[i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"活动列表",name:"list"}},[i("el-row",{staticClass:"header"},[i("ul",{staticStyle:{"margin-bottom":"10px"}},[i("storeChoose",{on:{changeMallList:t.changeMallList}})],1),i("ul",{staticStyle:{"margin-left":"20px"}},[i("li",[i("span",[t._v("活动状态：")]),i("el-select",{staticStyle:{width:"100px"},attrs:{disabled:t.isDisabled,size:"mini",filterable:""},model:{value:t.discountType,callback:function(e){t.discountType=e},expression:"discountType"}},[i("el-option",{attrs:{value:"all",label:"全部"}}),t._l(t.discountTypeList,(function(t,e){return i("el-option",{key:e,attrs:{value:t.value,label:t.label}})}))],2)],1),i("li",[i("el-input",{staticStyle:{width:"242px"},attrs:{disabled:t.isDisabled,size:"mini",oninput:"value=value.replace(/\\s+/g,'')",clearable:""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[i("el-select",{staticStyle:{width:"100px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:t.searchType,callback:function(e){t.searchType=e},expression:"searchType"}},t._l(t.searchTypeList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)],1),i("li",[i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled},on:{click:t.queryData}},[t._v("搜 索")]),i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled},on:{click:function(e){t.activeName="edit"}}},[t._v("创建新的活动")]),i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled}},[t._v("批量结束活动")]),i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled},on:{click:t.restartActivityDia}},[t._v("重新启动已过期的活动")]),i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled}},[t._v("数据导出")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("清除日志")]),i("el-checkbox",{staticStyle:{"margin-left":"20px"},attrs:{disabled:t.isDisabled},model:{value:t.hideEnded,callback:function(e){t.hideEnded=e},expression:"hideEnded"}},[t._v("不显示过期活动")]),i("el-checkbox",{model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")])],1)])]),i("el-row",{attrs:{id:"article"}},[i("u-table",{ref:"plTable",attrs:{data:t.tableData,"use-virtual":"",height:680,"row-height":45,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":t.handleSelectionChange1}},[i("u-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),i("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),i("u-table-column",{attrs:{align:"center",label:"店铺","min-width":"150",prop:"mallName"}}),i("u-table-column",{attrs:{align:"center",label:"活动ID","min-width":"150",prop:"discount_id"}}),i("u-table-column",{attrs:{align:"center",label:"活动名称","min-width":"150",prop:"title"}}),i("u-table-column",{attrs:{align:"center",label:"活动状态","min-width":"100",prop:"statusName"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("span",{style:t.statusNameColor[a.statusName]&&"color:"+t.statusNameColor[a.statusName]},[t._v(" "+t._s(a.statusName)+" ")])]}}])}),i("u-table-column",{attrs:{align:"center",label:"商品数量","min-width":"100",prop:"total_product"}}),i("u-table-column",{attrs:{align:"center",label:"活动时间","min-width":"270"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[t._v(" "+t._s(t.$dayjs(i.start_time).format("MM/DD/YYYY HH:mm:ss")+" - "+t.$dayjs(i.end_time).format("MM/DD/YYYY HH:mm:ss"))+" ")]}}])}),i("u-table-column",{attrs:{align:"center",label:"操作","min-width":"240"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;return[i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("查看详情")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("复制")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("结束")])]}}])})],1),t.timeVisible?i("el-dialog",{staticClass:"time-dialog",attrs:{title:"选择时间",visible:t.timeVisible,width:"500px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.timeVisible=e}}},[i("div",{staticClass:"content"},[i("span",[t._v("折扣促销时间：")]),i("el-date-picker",{attrs:{type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.promotionTime,callback:function(e){t.promotionTime=e},expression:"promotionTime"}})],1),i("div",{staticClass:"footer"},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"mini"},on:{click:function(e){t.timeVisible=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.determineRestart}},[t._v("确 定")])],1)]):t._e()],1)],1),i("el-tab-pane",{attrs:{label:"活动编辑",name:"edit"}},[i("el-row",{staticClass:"header edit"},[i("ul",{staticStyle:{"margin-bottom":"10px"}},[i("storeChoose",{on:{changeMallList:t.changeMallList}})],1),i("ul",{staticStyle:{margin:"0 0 10px 20px"}},[i("li",[i("span",[t._v("活动名称：")]),i("el-input",{attrs:{size:"mini",oninput:"value=value.replace(/\\s+/g,'')",clearable:""}})],1),i("li",[i("span",[t._v("商品编号：")]),i("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",oninput:"value=value.replace(/\\s+/g,'')",clearable:""}})],1),i("li",[i("span",[t._v("活动时间：")]),i("el-date-picker",{attrs:{"unlink-panels":"",size:"mini",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"}}),i("el-button",{staticStyle:{"margin-left":"21px"},attrs:{type:"primary",size:"mini"}},[t._v("搜 索")])],1)]),i("ul",{staticStyle:{margin:"0 0 10px 20px"}},[i("li",{staticStyle:{"margin-right":"19px"}},[i("span",[t._v("活动折扣：")]),i("el-input",{attrs:{size:"mini",oninput:"value=value.replace(/\\s+/g,'')",clearable:""}}),t._v("% ")],1),i("li",[i("span",[t._v("限购数量：")]),i("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",oninput:"value=value.replace(/\\s+/g,'')",clearable:""}})],1),i("li",[i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("搜 索")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("批量修改折扣和限购")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("添加商品")]),i("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("创建活动")]),i("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")])],1)]),i("ul",{staticStyle:{margin:"0 0 0 20px"}},[i("span",{staticStyle:{color:"red"}},[t._v("折扣公式为：折扣价格=商品原价*折扣%。如原价100元的商品，输入80，最后的折扣价格为80元")])])]),i("el-row",{attrs:{id:"article"}},[i("u-table",{ref:"editPlTable",attrs:{data:t.editTableData,"use-virtual":"",height:620,"row-height":68,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":t.handleSelectionChange2}},[i("u-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),i("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),i("u-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"主图","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"商品名称","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"商品编号","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"商品规格","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"原价","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"售价","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"折扣","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"购买限制","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"操作","min-width":"150"}}),i("u-table-column",{attrs:{align:"center",label:"操作状态","min-width":"150"}})],1)],1)],1)],1),i("div",{staticClass:"logging"},[i("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)],1)},n=[],s=i("1da1"),l=(i("96cf"),i("d3b7"),i("25f0"),i("159b"),i("99af"),i("0e0b")),r=i("feb6"),o=i("d4ec"),c=i("bee2"),u=function(){function t(e){Object(o["a"])(this,t),this._this=e}return Object(c["a"])(t,[{key:"getDiscountNominate",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var i,a,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.item,t.prev=1,a={},a["limit"]=100,a["offset"]=i.offset,a["mallId"]=i.platform_mall_id,a["discount_id"]=i.discount_id,t.next=9,this._this.$shopeemanService.getChinese(i.country,"/api/marketing/v3/discount/nominate/?",a);case 9:if(n=t.sent,s=this.isJsonString(this.isJsonString(n).data),"success"!==s.message){t.next=13;break}return t.abrupt("return",{code:200,data:s.data});case 13:return t.abrupt("return",{code:201,data:"".concat(s.code||s.errcode,"， ").concat(s.message.indexOf("token not found")>-1?"未登录，请登录后再查询":s.message)});case 16:return t.prev=16,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"查询折扣活动详情异常： ".concat(t.t0)});case 19:case"end":return t.stop()}}),t,this,[[1,16]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getByDiscountids",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var i,a,n,s,l,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.mItem,a=e.promotionid,n=e.limit,s=e.discountType,t.prev=1,l={},l["discount_id_list"]=a,l["discount_type"]=s,l["limit"]=n,l["offset"]=i.offset,l["mallId"]=i.platform_mall_id,t.next=10,this._this.$shopeemanService.getChinese(i.country,"/api/marketing/v3/discount/get_by_discountids/?",l);case 10:if(r=t.sent,o=this.isJsonString(this.isJsonString(r).data),"success"!==o.message){t.next=14;break}return t.abrupt("return",{code:200,data:o.data});case 14:return t.abrupt("return",{code:201,data:"".concat(o.code||o.errcode,"， ").concat(o.message.indexOf("token not found")>-1?"未登录，请登录后再查询":o.message)});case 17:return t.prev=17,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取列表数据异常： ".concat(t.t0)});case 20:case"end":return t.stop()}}),t,this,[[1,17]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getDiscountStandardSearch",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var i,a,n,s,l,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.mItem,a=e.keyword,n=e.searchType,s=e.discountType,t.prev=1,l={},l["keyword"]=a,l["search_type"]=n,"all"!==s&&(l["promotion_status"]=s),l["mallId"]=i.platform_mall_id,t.next=9,this._this.$shopeemanService.getChinese(i.country,"/api/marketing/v3/discount/standard_search/?",l);case 9:if(r=t.sent,o=this.isJsonString(this.isJsonString(r).data),"success"!==o.message){t.next=13;break}return t.abrupt("return",{code:200,data:o.data});case 13:return t.abrupt("return",{code:201,data:"".concat(o.code||o.errcode,"， ").concat(o.message.indexOf("token not found")>-1?"未登录，请登录后再查询":o.message)});case 16:return t.prev=16,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取promotionid数据异常： ".concat(t.t0)});case 19:case"end":return t.stop()}}),t,this,[[1,16]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getDiscountList",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var i,a,n,s,l,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.mItem,a=e.limit,n=e.discountType,t.prev=1,s={},s["limit"]=a,s["offset"]=i.offset,s["discount_type"]=n,s["mallId"]=i.platform_mall_id,t.next=9,this._this.$shopeemanService.getChinese(i.country,"/api/marketing/v3/discount/list/?",s);case 9:if(l=t.sent,r=this.isJsonString(this.isJsonString(l).data),"success"!==r.message){t.next=13;break}return t.abrupt("return",{code:200,data:r.data});case 13:return t.abrupt("return",{code:201,data:"".concat(r.code||r.errcode,"， ").concat(r.message.indexOf("token not found")>-1?"未登录，请登录后再查询":r.message)});case 16:return t.prev=16,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取折扣列表数据异常： ".concat(t.t0)});case 19:case"end":return t.stop()}}),t,this,[[1,16]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"isJsonString",value:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}]),t}(),d={components:{StoreChoose:r["a"]},data:function(){return{activeName:"list",GoodsDiscount:new u(this),showConsole:!0,promotionTime:[],timeVisible:!1,hideEnded:!1,limit:100,isDisabled:!1,keyword:"",searchType:"promotion_name",discountType:"all",selectMallList:[],tableData:[],multipleSelection:[],endedActivityData:[],discountTypeList:[{value:"ongoing",label:"进行中"},{value:"upcoming",label:"接下来有活动"},{value:"ended",label:"活动已过期"}],searchTypeList:[{value:"promotion_name",label:"活动名称"},{value:"item_name",label:"商品名称"},{value:"item_id",label:"商品ID"}],statusNameColor:{"进行中":"green","即将开始":"orangered"},editTableData:[],editMultipleSelection:[]}},methods:{restartActivityDia:function(){this.endedActivityData=[];for(var t=0;t<(null===(e=this.multipleSelection)||void 0===e?void 0:e.length);t++){var e,i=this.multipleSelection[t];"已过期"===i.statusName&&this.endedActivityData.push(i)}if(!this.endedActivityData.length)return this.$message("请选择已过期活动执行此操作");this.timeVisible=!0,this.promotionTime=[new Date,(new Date).getTime()+36e5]},determineRestart:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null!==(i=t.promotionTime)&&void 0!==i&&i.length){e.next=2;break}return e.abrupt("return",t.$message("请选择折扣促销时间"));case 2:return t.timeVisible=!1,t.promotionTime[0].getTime().toString().substr(0,10),t.promotionTime[1].toString().substr(0,10),t.isDisabled=!0,t.$refs.Logs.writeLog("开始重启已过期的活动",!0),t.endedActivityData.forEach((function(t){t.offset=0,t.mList=[]})),e.next=10,Object(l["c"])(t.endedActivityData,t.restartActivity);case 10:t.isDisabled=!1;case 11:case"end":return e.stop()}}),e)})))()},restartActivity:function(t){var e=arguments,i=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,s,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.length>1&&void 0!==e[1]?e[1]:{count:1},s={},a.prev=2,s["item"]=t,a.next=6,i.GoodsDiscount.getDiscountNominate(s);case 6:if(l=a.sent,200===l.code){a.next=9;break}return a.abrupt("return",i.$refs.Logs.writeLog("获取【".concat(t.title,"】【").concat(t.discount_id,"】错误：").concat(l.data),!1));case 9:i.$refs.Logs.writeLog("获取【".concat(t.title,"】【").concat(t.discount_id,"】详情结束，共").concat(l.data.item_info.length,"件商品"),!0),a.next=14;break;case 12:a.prev=12,a.t0=a["catch"](2);case 14:return a.prev=14,--n.count,a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[2,12,14,17]])})))()},queryData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.selectMallList.length){e.next=2;break}return e.abrupt("return",t.$message("请选择店铺"));case 2:return t.isDisabled=!0,t.showConsole=!1,t.tableData=[],t.$refs.Logs.writeLog("开始查询",!0),t.selectMallList.forEach((function(t){t.offset=0,t.mList=[]})),e.next=9,Object(l["c"])(t.selectMallList,t.getDiscountList);case 9:t.$refs.Logs.writeLog("查询结束",!0),t.isDisabled=!1;case 11:case"end":return e.stop()}}),e)})))()},getDiscountList:function(t){var e=arguments,i=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,s,l,r,o,c,u,d,m,p,h,f,g,b;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=e.length>1&&void 0!==e[1]?e[1]:{count:1},s="",l=0,r="",s=t.mall_alias_name||t.platform_mall_name,o={},o["mItem"]=t,o["discountType"]=i.discountType,o["limit"]=i.limit,a.prev=9,c=[],!i.keyword){a.next=22;break}return o["keyword"]=i.keyword,o["searchType"]=i.searchType,a.next=16,i.GoodsDiscount.getDiscountStandardSearch(o);case 16:if(p=a.sent,200===p.code){a.next=19;break}return a.abrupt("return",i.$refs.Logs.writeLog("店铺【".concat(s,"】：").concat(p.data),!1));case 19:if(null!==(u=p.data)&&void 0!==u&&u.hits&&!((null===(d=p.data)||void 0===d||null===(m=d.hits)||void 0===m?void 0:m.length)<=0)){a.next=21;break}return a.abrupt("return",i.$refs.Logs.writeLog("店铺【".concat(s,"】共查询到【0】条数据"),!0));case 21:p.data.hits.forEach((function(t){c.push(t.promotionid)}));case 22:if(!(i.keyword&&(null===c||void 0===c?void 0:c.length)>0)){a.next=29;break}return o["promotionid"]=c,a.next=26,i.GoodsDiscount.getByDiscountids(o);case 26:r=a.sent,a.next=32;break;case 29:return a.next=31,i.GoodsDiscount.getDiscountList(o);case 31:r=a.sent;case 32:if(200===r.code){for(l=r.data.total_count,h=0;h<r.data.discount_list.length;h++)f=r.data.discount_list[h],f.mallName=s,f.start_time=1e3*f.start_time,f.end_time=1e3*f.end_time,f.country=t.country,f.platform_mall_id=t.platform_mall_id,g=(new Date).getTime(),f.start_time>g?f.statusName="即将开始":f.end_time<g?f.statusName="已过期":f.statusName="进行中";t.mList=t.mList.concat(r.data.discount_list),b=i.filterData(r.data.discount_list),i.tableData=i.tableData.concat(b)}else i.$refs.Logs.writeLog("店铺【".concat(s,"】：").concat(r.data),!1);t.offset+=i.limit;case 34:if(t.mList.length<l&&0!==l){a.next=22;break}case 35:i.$refs.Logs.writeLog("查询店铺【".concat(s,"】共").concat(t.mList.length,"条数据"),!0),a.next=41;break;case 38:a.prev=38,a.t0=a["catch"](9),i.$refs.Logs.writeLog("店铺【".concat(s,"】异常：").concat(a.t0),!1);case 41:return a.prev=41,--n.count,a.finish(41);case 44:case"end":return a.stop()}}),a,null,[[9,38,41,44]])})))()},filterData:function(t){for(var e=[],i=0;i<t.length;i++){var a=t[i];this.hideEnded&&"已过期"===a.statusName||e.push(a)}return e},handleClick:function(t,e){},handleSelectionChange1:function(t){this.multipleSelection=t},handleSelectionChange2:function(t){this.editMultipleSelection=t},changeMallList:function(t){this.selectMallList=t,this.country=t.country}}},m=d,p=(i("a285"),i("2877")),h=Object(p["a"])(m,a,n,!1,null,"3b9d2166",null);e["default"]=h.exports},feb6:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,a){return t.showMall(e,a)?i("el-option",{key:a,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},n=[],s=i("1da1"),l=i("2909"),r=(i("96cf"),i("99af"),i("d81d"),i("fb6a"),i("d3b7"),i("25f0"),i("159b"),i("c740"),i("7db0"),i("4de4"),i("caad"),i("2532"),i("7646")),o=i("2b0e");o["default"].directive("loadmore",{bind:function(t,e){var i=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var i=this;if(this.isAllowSet2){this.isAllowSet2=!1;var a=e.indexOf("")>-1,n=t.indexOf("")>-1;a!==n?this.groupId=n?[""].concat(Object(l["a"])(this.groupIdList.map((function(t){return t.id})))):[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){i.isAllowSet2=!0,i.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var i=this;if(this.isAllowSet1){this.isAllowSet1=!1;var a=e.indexOf("")>-1,n=t.indexOf("")>-1;a!==n?this.site=n?[""].concat(Object(l["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){i.changeMallList(),i.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,a,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],i=e.countryVal,a=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:i,mallGroupIds:a},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:s=t.sent,200===s.code?(e.siteList=s.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var i=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&i<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],i="";this.site.forEach((function(a){if(a){var n=t.siteList.find((function(t){return t.platform_mall_id===a}));e.push(n),i+=a+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(i=e.length!==this.siteList.length&&i||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var i=e.mall_alias_name||e.platform_mall_name;return i.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var i=this.siteList.filter((function(e){var i=e.mall_alias_name||e.platform_mall_name;return!i.includes(t)}));this.siteShowList=[].concat(Object(l["a"])(e),Object(l["a"])(i))},showMall:function(t,e){var i=t.mall_alias_name||t.platform_mall_name,a=this.site[0]===t.platform_mall_id;return a||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||i.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var i=0;t?(i=this.mallShowIndex+10,i=i<this.siteShowList.length&&i||this.mallShowIndex):(i=this.mallShowIndex-10,i=i>0&&i||0),i!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=i}}}},u=c,d=(i("8992"),i("2877")),m=Object(d["a"])(u,a,n,!1,null,null,null);e["a"]=m.exports}}]);