(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d3a556e"],{"268a":function(t,e,a){"use strict";a("a654")},5551:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var r=a("1da1"),n=a("d4ec"),i=a("bee2"),o=(a("d3b7"),a("25f0"),a("96cf"),function(){function t(e){Object(n["a"])(this,t),this._this=e}return Object(i["a"])(t,[{key:"getDiscountNominate",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.item,t.prev=1,r={},r["limit"]=100,r["offset"]=a.offset,r["mallId"]=a.platform_mall_id,r["discount_id"]=a.discount_id,t.next=9,this._this.$shopeemanService.getChinese(a.country,"/api/marketing/v3/discount/nominate/?",r);case 9:if(n=t.sent,i=this.isJsonString(this.isJsonString(n).data),!i||0!==i.code){t.next=15;break}return t.abrupt("return",{code:200,data:i.data});case 15:if(2!==i.code&&2!==i.errcode){t.next=19;break}return t.abrupt("return",{code:201,data:"店铺未登录"});case 19:return t.abrupt("return",{code:-2,data:"查询折扣活动详情失败"});case 20:t.next=25;break;case 22:return t.prev=22,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"查询折扣活动详情异常： ".concat(t.t0)});case 25:case"end":return t.stop()}}),t,this,[[1,22]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getByDiscountids",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,i,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.mItem,r=e.promotionid,n=e.limit,i=e.discountType,t.prev=1,o={},o["discount_id_list"]=r,o["discount_type"]=i,o["limit"]=n,o["offset"]=a.offset,o["mallId"]=a.platform_mall_id,t.next=10,this._this.$shopeemanService.getChinese(a.country,"/api/marketing/v3/discount/get_by_discountids/?",o);case 10:if(s=t.sent,c=this.isJsonString(this.isJsonString(s).data),!c||0!==c.code){t.next=16;break}return t.abrupt("return",{code:200,data:c.data});case 16:if(2!==c.code&&2!==c.errcode){t.next=20;break}return t.abrupt("return",{code:201,data:"店铺未登录"});case 20:return t.abrupt("return",{code:-2,data:"获取列表数据失败"});case 21:t.next=26;break;case 23:return t.prev=23,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取列表数据异常： ".concat(t.t0)});case 26:case"end":return t.stop()}}),t,this,[[1,23]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getDiscountStandardSearch",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,i,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.mItem,r=e.keyword,n=e.searchType,i=e.discountType,t.prev=1,o={},o["keyword"]=r,o["search_type"]=n,"all"!==i&&(o["promotion_status"]=i),o["mallId"]=a.platform_mall_id,t.next=9,this._this.$shopeemanService.getChinese(a.country,"/api/marketing/v3/discount/standard_search/?",o);case 9:if(s=t.sent,c=this.isJsonString(this.isJsonString(s).data),!c||0!==c.code){t.next=15;break}return t.abrupt("return",{code:200,data:c.data});case 15:if(2!==c.code&&2!==c.errcode){t.next=19;break}return t.abrupt("return",{code:201,data:"店铺未登录"});case 19:return t.abrupt("return",{code:-2,data:"获取失败"});case 20:t.next=25;break;case 22:return t.prev=22,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取promotionid数据异常： ".concat(t.t0)});case 25:case"end":return t.stop()}}),t,this,[[1,22]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getDiscountList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,i,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.mItem,r=e.limit,n=e.discountType,t.prev=1,i={},i["limit"]=r,i["offset"]=a.offset,i["discount_type"]=n,i["mallId"]=a.platform_mall_id,t.next=9,this._this.$shopeemanService.getChinese(a.country,"/api/marketing/v3/discount/list/?",i);case 9:if(o=t.sent,s=this.isJsonString(this.isJsonString(o).data),console.log("111",s),!s||0!==s.code){t.next=16;break}return t.abrupt("return",{code:200,data:s.data});case 16:if(2!==s.code&&2!==s.errcode){t.next=20;break}return t.abrupt("return",{code:201,data:"店铺未登录"});case 20:return t.abrupt("return",{code:-2,data:"获取失败"});case 21:t.next=26;break;case 23:return t.prev=23,t.t0=t["catch"](1),t.abrupt("return",{code:-2,data:"获取折扣列表数据异常： ".concat(t.t0)});case 26:case"end":return t.stop()}}),t,this,[[1,23]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"isJsonString",value:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}},{key:"stopActive",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,a){var r,n,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r={},r["discount_id"]=e.discount_id.toString(),r["action"]=a,r["mallId"]=e.platform_mall_id,t.next=7,this._this.$shopeemanService.mixChinese(e.country,"/api/marketing/v3/discount/?",r,{Headers:{"Content-Type":" application/json"}},"delete");case 7:if(n=t.sent,i=n&&JSON.parse(n),console.log(i),!i||200!==i.status){t.next=19;break}if(o=JSON.parse(i.data),!o||0!==o.code){t.next=16;break}return t.abrupt("return",{code:200,data:o.data||[]});case 16:return t.abrupt("return",{code:50001,data:o.message||i.statusText||""});case 17:t.next=22;break;case 19:if(403!==i.status){t.next=21;break}return t.abrupt("return",{code:i.status,data:"操作失败，店铺未登录！"});case 21:return t.abrupt("return",{code:i.status,data:"操作失败".concat(i.statusText)});case 22:t.next=27;break;case 24:return t.prev=24,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"操作异常： ".concat(t.t0)});case 27:case"end":return t.stop()}}),t,this,[[0,24]])})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"createActive",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,a){var r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._this.$shopeemanService.postChinese(e,"/api/marketing/v3/discount/?",a,{Headers:{"Content-Type":" application/json"}});case 3:if(r=t.sent,n=r&&JSON.parse(r),console.log(n),!n||200!==n.status){t.next=15;break}if(i=JSON.parse(n.data),!i||0!==i.code){t.next=12;break}return t.abrupt("return",{code:200,data:i.data||[]});case 12:return t.abrupt("return",{code:50001,data:i.message||n.statusText||""});case 13:t.next=18;break;case 15:if(403!==n.status){t.next=17;break}return t.abrupt("return",{code:n.status,data:"操作失败，店铺未登录！"});case 17:return t.abrupt("return",{code:n.status,data:"操作失败".concat(n.statusText)});case 18:t.next=23;break;case 20:return t.prev=20,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"操作异常： ".concat(t.t0)});case 23:case"end":return t.stop()}}),t,this,[[0,20]])})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"putActive",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,a){var r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._this.$shopeemanService.mixChinese(e,"/api/marketing/v3/discount/?",a,{Headers:{"Content-Type":" application/json"}},"put");case 3:if(r=t.sent,n=r&&JSON.parse(r),console.log(n),!n||200!==n.status){t.next=15;break}if(i=JSON.parse(n.data),!i||0!==i.code){t.next=12;break}return t.abrupt("return",{code:200,data:i.data||[]});case 12:return t.abrupt("return",{code:50001,data:i.message||n.statusText||""});case 13:t.next=18;break;case 15:if(403!==n.status){t.next=17;break}return t.abrupt("return",{code:n.status,data:"操作失败，店铺未登录！"});case 17:return t.abrupt("return",{code:n.status,data:"操作失败".concat(n.statusText)});case 18:t.next=23;break;case 20:return t.prev=20,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"操作异常： ".concat(t.t0)});case 23:case"end":return t.stop()}}),t,this,[[0,20]])})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"putModelActive",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,a){var r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._this.$shopeemanService.mixChinese(e,"/api/marketing/v3/discount/nominate/",a,{Headers:{"Content-Type":" application/json"}},"put");case 3:if(r=t.sent,n=r&&JSON.parse(r),console.log(n),!n||200!==n.status){t.next=15;break}if(i=JSON.parse(n.data),!i||0!==i.code){t.next=12;break}return t.abrupt("return",{code:200,data:i.data||[]});case 12:return t.abrupt("return",{code:50001,data:i.message||n.statusText||""});case 13:t.next=18;break;case 15:if(403!==n.status){t.next=17;break}return t.abrupt("return",{code:n.status,data:"操作失败，店铺未登录！"});case 17:return t.abrupt("return",{code:n.status,data:"操作失败".concat(n.statusText)});case 18:t.next=23;break;case 20:return t.prev=20,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"操作异常： ".concat(t.t0)});case 23:case"end":return t.stop()}}),t,this,[[0,20]])})));function e(e,a){return t.apply(this,arguments)}return e}()}]),t}())},9772:function(t,e,a){},"9cda":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",[t._v("店铺站点：")]),a("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),a("div",{staticStyle:{"margin-left":"20px"}},[t._v("任务名称：")]),a("el-input",{staticStyle:{width:"140px"},attrs:{size:"mini"},model:{value:t.taskName,callback:function(e){t.taskName=e},expression:"taskName"}}),a("div",{staticStyle:{"margin-left":"20px"}},[t._v("任务状态：")]),a("el-select",{attrs:{value:"",size:"mini"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.statusList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1),a("div",{staticStyle:{"margin-left":"20px"}},[t._v("任务日期：")]),a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",size:"mini",placeholder:"选择开始日期"},model:{value:t.taskTimeStart,callback:function(e){t.taskTimeStart=e},expression:"taskTimeStart"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#1a1a1a",margin:"0 7px"}}),a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",size:"mini",placeholder:"选择结束日期"},model:{value:t.taskTimeEnd,callback:function(e){t.taskTimeEnd=e},expression:"taskTimeEnd"}})],1),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.searchTask}},[t._v("搜索任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.startTask}},[t._v("启动任务")]),a("el-button",{attrs:{size:"mini"},on:{click:t.cancelTask}},[t._v("取消任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.deleteTask}},[t._v("删除任务")])],1)]),a("u-table",{attrs:{data:t.taskTable,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa",height:"50px"},"row-key":"id",border:!1,"big-data-checkbox":!0,height:"680"},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"left",type:"selection",width:"50"}}),a("u-table-column",{attrs:{align:"left",label:"序列号",type:"index",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"任务名称",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.task_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺名称","min-width":"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(r.mall_names)+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺站点",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;return[t._v(" "+t._s(t._f("chineseSite")(t.countryOption))+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺分组",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;return[t._v("全部 ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"执行时间",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.exec_time)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"商品总数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.goods_count)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"上新成功数",width:"120",prop:"category_name"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.success_count)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"上新失败数",width:"120",prop:"categoryName","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.fail_count)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"执行状态",width:"120",prop:"price"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(t.statusShow[Number(a.status)])+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"任务详情",width:"120",prop:"sys_label_name","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.viewTask(e.row)}}},[t._v("查看")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"启动任务",width:"120",prop:"sourceName"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.startTask(e.row)}}},[t._v("启动")])]}}])})],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{title:"定时上新商品列表",width:"1500px",top:"10vh","close-on-click-modal":!1,visible:t.taskSetTimeVisible},on:{"update:visible":function(e){t.taskSetTimeVisible=e}}},[a("u-table",{ref:"taskSetTimeTable",attrs:{data:t.taskSetTimeTable,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa",height:"50px"},"row-key":"id",border:!1,"big-data-checkbox":!0,height:"500"},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"left",type:"selection",width:"50"}}),a("u-table-column",{attrs:{align:"left",label:"序列号",type:"index",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"任务名称",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.task_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺名称",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(r.mall_names)+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺站点",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;return[t._v(" "+t._s(t._f("chineseSite")(t.countryOption))+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"商品主图",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:r.image}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("changeImgSizeFilter")({url:r.image,source:r.source})}})],1)]}}])}),a("u-table-column",{attrs:{align:"left",label:"上家商品Id",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(r.goods_id)}}},[a("i",{staticClass:"el-icon-document-copy"})]),a("span",{staticClass:"goToGoods",on:{click:function(e){return e.stopPropagation(),t.goToGoods(r)}}},[t._v(t._s(r.goods_id))])],1)]}}])}),a("u-table-column",{attrs:{align:"left",label:"shopee-Id",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticStyle:{display:"flex","align-items":"center"}},[r.product_id?a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(r.product_id)}}},[a("i",{staticClass:"el-icon-document-copy"})]):t._e(),a("span",{staticClass:"goToGoods",on:{click:function(e){return e.stopPropagation(),t.goToGoods(r,1)}}},[t._v(t._s(r.product_id||""))])],1)]}}])}),a("u-table-column",{attrs:{align:"left",label:"标题","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(r.title)+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"类目",prop:"category_name",width:"100","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"left",label:"shopee类目","show-overflow-tooltip":"",prop:"categoryName",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.enterCategory(0,e.row)}}},[t._v(" "+t._s(e.row.categoryName||"请选择类目")+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"价格",prop:"price",width:"80"}}),a("u-table-column",{attrs:{align:"left",label:"销量",prop:"sales",width:"80"}}),a("u-table-column",{attrs:{align:"left",label:"来源",prop:"sourceName",width:"80"}}),a("u-table-column",{attrs:{align:"left",label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(r.message)+" ")])]}}])})],1)],1),a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{country:t.countryOption,"goods-current":t.goodsCurrent},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},n=[],i=a("1da1"),o=(a("d81d"),a("a9e3"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("99af"),a("96cf"),a("7646")),s=a("e1e4"),c=a("5551"),u=a("0e0b"),l=a("eb09"),d={data:function(){return{mallListAPIInstance:new o["a"](this),GoodsManagerAPIInstance:new s["a"](this),GoodsDiscount:new c["a"](this),countriesOption:this.$filters.countries_option,countryOption:"TH",taskName:"",taskTimeStart:new Date((new Date).getTime()-1728e5),taskTimeEnd:new Date((new Date).getTime()+864e5),taskTable:[],taskSelectTable:[],statusList:[{value:"",label:"全部"},{value:1,label:"已执行"},{value:2,label:"部分失败"},{value:3,label:"待执行"},{value:4,label:"待启动"}],statusShow:{1:"已执行",2:"部分失败",3:"待执行",4:"待启动"},status:"",taskSetTimeVisible:!1,taskSetTimeTable:[],goodsCurrent:null,categoryVisible:!1,goodsClassName:{},isRefreshTable:!0}},components:{categoryMapping:l["a"]},methods:{searchTask:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,i,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.taskTable=[],a=t.countryOption,r=t.status,n=t.taskName,i=Math.floor(t.taskTimeStart.getTime()/1e3),o=Math.floor(t.taskTimeEnd.getTime()/1e3),console.log(a,"",n,i,o),e.next=9,t.$collectService.getCronPublishTask(a,r+"",n,i,o);case 9:s=e.sent,t.taskTable=s,console.log("getConfig",s);case 12:case"end":return e.stop()}}),e)})))()},startTask:function(t){0!==this.taskSelectTable.length||this.$message.error("请选择一个定时任务")},cancelTask:function(){0!==this.taskSelectTable.length||this.$message.error("请选择一个定时任务")},deleteTask:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.taskSelectTable.length){e.next=3;break}return t.$message.error("请选择一个定时任务"),e.abrupt("return");case 3:return a=t.taskSelectTable.map((function(t){return t.id})),e.next=6,t.$collectService.deleteCronPublishTask(a);case 6:if(r=e.sent,200!==Number(r.code)){e.next=18;break}t.$message.success("删除成功"),n=regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$collectService.deleteCronPublishConfig(a[r]);case 2:return e.next=4,t.$collectService.deleteCronPublishGoods(a[r]+"");case 4:n=t.taskTable.findIndex((function(t){return t.id===a[r]})),t.taskTable.splice(n,1);case 6:case"end":return e.stop()}}),e)})),i=0;case 11:if(!(i<a.length)){e.next=16;break}return e.delegateYield(n(i),"t0",13);case 13:i++,e.next=11;break;case 16:e.next=19;break;case 18:t.$message.error("删除失败");case 19:console.log(r);case 20:case"end":return e.stop()}}),e)})))()},viewTask:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("viewTask",t),a.next=3,e.$collectService.getCronPublishGoods(t.id+"");case 3:r=a.sent,n=JSON.parse(JSON.stringify(r)),e.taskSetTimeTable=n.map((function(t){return Object.assign(t,JSON.parse(t.goods_info))})),e.taskSetTimeVisible=!0,console.log("goodsRes",e.taskSetTimeTable);case 8:case"end":return a.stop()}}),a)})))()},handleSelectionChange:function(t){this.taskSelectTable=t},goToGoods:function(t,e){if(e)try{var a=this.$filters.countryShopeebuyCom(t.country);this.$BaseUtilService.openUrl("".concat(a,"/product/").concat(t.mallId,"/").concat(t.product_id))}catch(o){this.$message.error("打开失败")}else{var r=t.extra_info&&JSON.parse(t.extra_info)||{},n=Object.assign({productId:t.goods_id},r),i=Object(u["q"])(t.source,n);this.$BaseUtilService.openUrl(i.url)}},copy:function(t){Object(u["f"])(t)},enterCategory:function(){var t=arguments,e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.length>0&&void 0!==t[0]?t[0]:0,r=t.length>1&&void 0!==t[1]?t[1]:null,e.goodsCurrent=r,e.categoryVisible=!0;case 4:case"end":return a.stop()}}),a)})))()},categoryChange:function(t){var e=this;if(console.log("categoryChange",t,this.goodsCurrent),t){var a=t.categoryList,r=a[a.length-1],n=r&&"".concat(r.category_name,"(").concat(r.category_cn_name,")")||"";if(this.goodsCurrent&&this.goodsCurrent.id){var i=this.taskSetTimeTable.findIndex((function(t){return t.id===e.goodsCurrent.id}));this.taskSetTimeTable[i]["categoryName"]=n,this.$set(this.taskSetTimeTable[i],"categoryName",n),this.goodsClassName[this.taskSetTimeTable[i].category_id]=n}}var o=this.$refs.taskSetTimeTable,s=o&&o.scrollTop;this.isRefreshTable=!1,this.$nextTick((function(){e.isRefreshTable=!0,e.$nextTick((function(){var t=e.$refs.taskSetTimeTable;t.scrollTop=s}))})),this.categoryVisible=!1}}},p=d,g=(a("268a"),a("2877")),f=Object(g["a"])(p,r,n,!1,null,"6dd24244",null);e["default"]=f.exports},a654:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},eb09:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp contaniner"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,r){return a("div",{key:r,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(r+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[r],r)}},model:{value:t.categoryAction[r],callback:function(e){t.$set(t.categoryAction,r,e)},expression:"categoryAction[index]"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,r){return a("div",{key:r,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],i=a("1da1"),o=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[],isConfirmCategory:!1}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i,o,s,c,u,l,d,p,g,f,b,m,h,y,v,_,k,x,w,S;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.length>0&&void 0!==t[0]?t[0]:-1,n=e.country||e.countryOption,i=[],e.categoryList.forEach((function(t,a){var r=t.find((function(t){return t.category_id===e.categoryAction[a]}));r&&i.push(r)})),!(e.goodsCurrent&&r<0)){a.next=17;break}if(o=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,s=e.goodsCurrent.platform||e.goodsCurrent.source,!o||!s){a.next=14;break}return c=[],e.attributesList.forEach((function(t){var e=t.new_options_obj.find((function(e){return e.value_id===t.options}));c.push({attributeId:t.attribute_id,attributeName:t.attribute_name,valueId:e.value_id,value:e.value})})),u={relationCategoryId:o,country:e.country,platformId:s,platformCategoryId:i[i.length-1].category_id,categoryAttributes:c},a.next=13,e.$commodityService.saveCategoryRelation(u);case 13:a.sent;case 14:e.$emit("categoryChange",{categoryList:i,attributesList:e.attributesList,country:n||e.countryOption}),a.next=58;break;case 17:return e.isConfirmCategory=!0,r=r<0?0:r,l=e.mallList[r],d=e.categoryAction[e.categoryAction.length-1],p={mallId:l.platform_mall_id,category_ids:d,brand_status:1,cursor:0,limit:100},a.next=24,e.$shopeemanService.getBrandList(n,p,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 24:if(g=a.sent,f=JSON.parse(g),!(f.status>=200&&f.status<=300)){a.next=56;break}if(b=JSON.parse(f.data),0!==b.code){a.next=53;break}return m=b.data&&b.data.list[0]&&b.data.list[0].brand_list,h=[],m.forEach((function(t){h.push({value:t.name,value_id:t.brand_id})})),y=[{category_id:d,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:n,options:JSON.stringify(h),attribute_label:"",is_key_attribute:1}],a.prev=33,a.next=36,e.$shopeemanService.getAttributeTree(n,p,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 36:v=a.sent,_=JSON.parse(v),k=JSON.parse(_.data),x=k&&k.data&&k.data.list[0]&&k.data.list[0].attribute_tree||[],x.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),y.push({category_id:d,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:n,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=46;break;case 43:a.prev=43,a.t0=a["catch"](33),console.log(a.t0);case 46:return a.prev=46,a.next=49,e.$commodityService.uploadCateGoryAttr(y);case 49:return w=a.sent,S=JSON.parse(w),200===S.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(46);case 53:e.$emit("categoryChange",""),a.next=58;break;case 56:return a.next=58,e.confirmCategory(++r);case 58:e.isConfirmCategory=!1;case 59:case"end":return a.stop()}}),a,null,[[33,43,46,53]])})))()},getAttribute:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",r=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(r,a);case 4:n=e.sent,i=JSON.parse(n),t.attributesList=[],200===i.code&&(o=i.data&&i.data.attributes||[],o.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),r=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(r)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i,o,s,c,u,l,d,p,g,f,b,m,h,y;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.length>0&&void 0!==t[0]?t[0]:"0",n=t.length>1&&void 0!==t[1]?t[1]:0,i=t.length>2&&void 0!==t[2]?t[2]:null,o=t.length>3&&void 0!==t[3]?t[3]:"1",s=e.country||e.countryOption,0!==n||0!==e.attributesCurrent.length){a.next=20;break}if(e.categoryAction=i&&i.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId&&!e.goodsCurrent.goods_id){a.next=20;break}return e.categoryAction=[],l=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,d=e.goodsCurrent.platform||e.goodsCurrent.source,a.next=13,e.$commodityService.getCategoryRelation(l,s,d);case 13:p=a.sent,g=JSON.parse(p),e.attributesCurrent=g.data&&g.data.attributes||[],r=(null===g||void 0===g||null===(c=g.data)||void 0===c||null===(u=c.category)||void 0===u?void 0:u.platform_category_id)||r,console.log(g,r),o="0"===r&&o||0,!o&&e.categoryAction.unshift(r);case 20:if(!r){a.next=49;break}return f=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=24,e.$commodityService.getCategoryTbInfo(s,r,o);case 24:if(b=a.sent,m=JSON.parse(b),200!==m.code){a.next=47;break}if(h=m.data,console.log("categoryTbInfoData",h,e.categoryAction),0!==o){a.next=37;break}return y=(null===h||void 0===h?void 0:h.categories[0].parent_id)||0,y&&e.categoryAction.unshift(y),o=0===y?1:0,a.next=35,e.enterCategory(y+"",0,null,o);case 35:a.next=47;break;case 37:if(!h||!h.categories){a.next=45;break}return f[n]=h.categories,e.categoryList=f,e.categoryAction[n]=e.categoryAction[n]||f[n][0].category_id,a.next=43,e.enterCategory(e.categoryAction[n],++n);case 43:a.next=47;break;case 45:return a.next=47,e.getAttribute();case 47:a.next=51;break;case 49:return a.next=51,e.getAttribute(!0);case 51:case"end":return a.stop()}}),a)})))()}}}),s=o,c=(a("b0bd"),a("2877")),u=Object(c["a"])(s,r,n,!1,null,null,null);e["a"]=u.exports}}]);