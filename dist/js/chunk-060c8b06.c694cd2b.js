(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-060c8b06"],{"2f6f":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a("1da1"),n=a("d4ec"),s=a("bee2"),i=(a("96cf"),a("99af"),a("b0c0"),function(){function t(e){Object(n["a"])(this,t),this._this=e}return Object(s["a"])(t,[{key:"productSelector",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},a["offset"]=0,a["limit"]=100,a["need_brand"]=0,a["need_item_model"]=0,a["is_ads"]=0,e.sort_by&&(a["sort_by"]=e.sort_by),e.id&&(a["search_content"]=e.id,a["search_type"]=1),a["mallId"]=e.platform_mall_id,t.prev=9,t.next=12,this._this.$shopeemanService.getChinese(e.country,"/api/marketing/v3/public/product_selector/?",a);case 12:if(r=t.sent,n=this.isJsonString(this.isJsonString(r).data),"success"!==n.message){t.next=16;break}return t.abrupt("return",{code:200,data:n.data.item_list});case 16:if(n){t.next=18;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 18:return t.abrupt("return",{code:201,data:"".concat(n.errcode," ").concat(n.message.indexOf("token not found")>-1?"未登录，请登录后再查询":n.message)});case 21:return t.prev=21,t.t0=t["catch"](9),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 24:case"end":return t.stop()}}),t,this,[[9,21]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getGraphql",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,s,i,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={variables:{}},a["query"]="query Products($productIds: [String], $statusType: Int) {\n        products(productIds: $productIds, statusType: $statusType) {\n      items {\n        itemid,\n        name,\n        images,\n        sold,\n        price,\n      }\n    }\n      }",a["variables"]["productIds"]=e.item_id_list,a["variables"]["statusType"]=0,a["mallId"]=e.platform_mall_id,t.prev=5,t.next=8,this._this.$shopeemanService.postChineseReferer(e.country,"/api/marketing/v4/graphql/query/?",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 8:if(s=t.sent,i=this.isJsonString(this.isJsonString(s).data),l=null===i||void 0===i||null===(r=i.data)||void 0===r||null===(n=r.products)||void 0===n?void 0:n.items,!(l.length>0)){t.next=13;break}return t.abrupt("return",{code:200,data:l});case 13:if(i){t.next=15;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 15:return t.abrupt("return",{code:201,data:"".concat(i.errcode," ").concat(i.message.indexOf("token not found")>-1?"未登录，请登录后再查询":i.message)});case 18:return t.prev=18,t.t0=t["catch"](5),t.abrupt("return",{code:-2,data:"getGraphql-error ".concat(t.t0)});case 21:case"end":return t.stop()}}),t,this,[[5,18]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlan",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,a){var r,n,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r={},n="",t.t0=a,t.next="postChineseReferer"===t.t0?5:"deleteChinese"===t.t0?9:"putChinese"===t.t0?12:18;break;case 5:return r["item_id_list"]=e.item_id_list,r["name"]=e.name,n="portal/marketing/hotsale/new",t.abrupt("break",18);case 9:return r["plan_id"]=e.plan_id,n="portal/marketing/hotsale",t.abrupt("break",18);case 12:return r["plan_id"]=e.plan_id,r["name"]=e.name,r["status"]=e.status,r["item_id_list"]=e.item_id_list,n="portal/marketing/hotsale",t.abrupt("break",18);case 18:return r["mallId"]=e.platform_mall_id,t.prev=19,t.next=22,this._this.$shopeemanService[a](e.country,"/api/marketing/v4/hot_sale/plan/",r,{headers:{"Content-Type":"application/json",referer:n}});case 22:if(s=t.sent,i=this.isJsonString(this.isJsonString(s).data),"success"!==i.message){t.next=26;break}return t.abrupt("return",{code:200,data:i.data});case 26:if(i){t.next=28;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 28:return t.abrupt("return",{code:201,data:"".concat(i.errcode||i.code," ").concat(i.message&&i.message.indexOf("token not found")>-1?"未登录，请登录后再查询":i.message)});case 31:return t.prev=31,t.t1=t["catch"](19),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t1)});case 34:case"end":return t.stop()}}),t,this,[[19,31]])})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"markeHotSalePlanList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},a["mallId"]=e.platform_mall_id,t.prev=2,t.next=5,this._this.$shopeemanService.getChineseReferer(e.country,"/api/marketing/v4/hot_sale/plan/list/?",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 5:if(r=t.sent,n=this.isJsonString(this.isJsonString(r).data),"success"!==n.message){t.next=9;break}return t.abrupt("return",{code:200,data:n.data});case 9:if(n){t.next=11;break}return t.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 11:return t.abrupt("return",{code:201,data:"".concat(n.errcode," ").concat(n.message&&n.message.indexOf("token not found")>-1?"未登录，请登录后再查询":n.message)});case 14:return t.prev=14,t.t0=t["catch"](2),t.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[2,14]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"isJsonString",value:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}]),t}())},"3a5c":function(t,e,a){"use strict";a("e650")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},c42a:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",[a("li",[a("div",{staticClass:"base-box"},[a("span",{staticClass:"base-title"},[t._v("店铺分组")]),a("div",{staticClass:"base-item"},[a("storeChoose",{on:{changeMallList:t.changeMallList}})],1),a("div",{staticClass:"base-item",staticStyle:{"margin-left":"18px"}},[a("el-checkbox",{attrs:{disabled:t.isDisabled},model:{value:t.isStatus,callback:function(e){t.isStatus=e},expression:"isStatus"}},[t._v("只查询已启用的精选组")])],1),a("div",{staticStyle:{"margin-left":"18px"}},[a("el-button",{attrs:{disabled:t.isDisabled,type:"primary",size:"mini"},on:{click:t.queryData}},[t._v("查询精选组")]),a("el-button",{attrs:{disabled:t.isDisabled,type:"primary",size:"mini"},on:{click:t.singleAdd}},[t._v("添加单个精选组")]),a("el-button",{attrs:{disabled:t.isDisabled,type:"primary",size:"mini"},on:{click:function(e){return t.deleteSelection(t.multipleSelection,2)}}},[t._v("批量删除精选组")]),a("el-button",{attrs:{disabled:t.isDisabled,type:"primary",size:"mini"},on:{click:function(e){return t.queryIsOpen(t.multipleSelection,2)}}},[t._v("批量关闭精选组")]),a("el-checkbox",{staticStyle:{margin:"0 10px"},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.$refs.Logs.consoleMsg=""}}},[t._v("清除日志")])],1)])]),a("li",[a("div",{staticClass:"base-box",staticStyle:{"padding-left":"20px"}},[a("span",{staticClass:"base-title"},[t._v("添加精选组参数数据")]),a("div",{staticClass:"base-item",staticStyle:{"margin-top":"5px"}},[a("span",[t._v("每个店铺添加 "),a("el-input",{staticClass:"input",attrs:{disabled:t.isDisabled,onkeyup:"value=value.replace(/[^\\d]/g,'')",size:"mini",clearable:""},model:{value:t.groupNum,callback:function(e){t.groupNum=e},expression:"groupNum"}}),t._v(" 组精选商品"),a("span",{staticClass:"red-span"},[t._v("（最大10组）")])],1),a("span",[t._v("每组精选添加 "),a("el-input",{staticClass:"input",attrs:{disabled:t.isDisabled,onkeyup:"value=value.replace(/[^\\d]/g,'')",size:"mini",clearable:""},model:{value:t.goodsNum,callback:function(e){t.goodsNum=e},expression:"goodsNum"}}),t._v(" 个商品"),a("span",{staticClass:"red-span"},[t._v("（最少4个，最多8个）")])],1)]),a("div",{staticClass:"base-item"},[a("span",[t._v("精选商品排序 ")]),a("el-select",{attrs:{size:"mini",filterable:"",disabled:t.isDisabled},model:{value:t.goodsSort,callback:function(e){t.goodsSort=e},expression:"goodsSort"}},t._l(t.goodsSortList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1),a("el-button",{attrs:{disabled:t.isDisabled,type:"primary",size:"mini"},on:{click:t.batchSelection}},[t._v("开始批量添加")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.flag2=!0,t.stop()}}},[t._v("停止添加")])],1),a("span",{staticClass:"red-span"},[t._v("批量添加：精选名称自动生成，默认开启第一组精选商品")])])])])]),a("el-row",{attrs:{id:"article"}},[a("u-table",{ref:"plTable",attrs:{data:t.tableData,"use-virtual":"",height:700,"row-height":68,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"center",type:"selection","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"100",prop:"mallName"}}),a("u-table-column",{attrs:{align:"center",label:"精选名称","min-width":"100",prop:"name"}}),a("u-table-column",{attrs:{align:"center",label:"商品详情","min-width":"400"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticStyle:{display:"flex"}},t._l(r.images,(function(e,r){return a("div",{key:r},[e?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([e])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t._f("imageRender")([e,!0])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])],1):t._e()],1)})),0)]}}])}),a("u-table-column",{attrs:{align:"center",label:"启用状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(e){t.flag1=!1,t.queryIsOpen(r,1)}},model:{value:r.status,callback:function(e){t.$set(r,"status",e)},expression:"row.status"}})]}}])}),a("u-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.editData(r)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:r.status},on:{click:function(e){return t.deleteSelection(r,1)}}},[t._v("删除")])]}}])})],1)],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1),t.detailsVisible?a("el-dialog",{staticClass:"details-dialog",attrs:{title:"编辑精选组详情",visible:t.detailsVisible,width:"1000px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.detailsVisible=e},close:t.handleClose}},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[t._v("店铺名称："+t._s(t.detailsData.mallName))])]),a("li",[a("span",{staticStyle:{width:"113px"}},[t._v("精选组名称：")]),a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",size:"mini"},model:{value:t.detailsData.name,callback:function(e){t.$set(t.detailsData,"name",e)},expression:"detailsData.name"}})],1),a("li",[a("span",[t._v("启用状态："+t._s(t.detailsData.status?"已启用":"未启用"))])]),a("li",[a("el-button",{attrs:{type:"primary",size:"mini",loading:t.queryProductLoading},on:{click:t.productSelector}},[t._v("添加商品")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.detailsData.status},on:{click:function(e){return t.saveSelectionGroup(!0)}}},[t._v("保存并启用")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.saveSelectionGroup(!1)}}},[t._v("保存")])],1)]),a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("el-input",{attrs:{size:"mini"},model:{value:t.productId,callback:function(e){t.productId=e},expression:"productId"}}),a("span",{staticClass:"red-span",staticStyle:{width:"270px"},attrs:{clearable:""}},[t._v("添加多个商品，请以英文逗号（,）隔开")])],1),a("ul",[a("u-table",{ref:"plTable",attrs:{data:t.detailsData.graphqlData,"use-virtual":"",height:385,"row-height":68,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("u-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",label:"商品ID","min-width":"100",prop:"itemid"}}),a("u-table-column",{attrs:{align:"center",label:"商品图片","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[r.images[0]?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([r.images[0]])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t._f("imageRender")([r.images[0],!0])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])],1):t._e()]}}],null,!1,2688352715)}),a("u-table-column",{attrs:{align:"center",label:"商品名称","min-width":"300",prop:"name","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",label:"商品价格","min-width":"100",prop:"price"}}),a("u-table-column",{attrs:{align:"center",label:"销量","min-width":"80",prop:"sold"}}),a("u-table-column",{attrs:{align:"center",label:"操作","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.detailsData.graphqlData.splice(e.$index,1)}}},[t._v("删除")])]}}],null,!1,1132089802)})],1)],1)]):t._e()],1)},n=[],s=a("2909"),i=a("1da1"),l=(a("96cf"),a("a9e3"),a("99af"),a("159b"),a("a434"),a("c740"),a("d3b7"),a("25f0"),a("b0c0"),a("4de4"),a("d81d"),a("4ec9"),a("3ca3"),a("ddb0"),a("ac1f"),a("1276"),a("0e0b")),o=a("feb6"),c=a("2f6f"),u={components:{StoreChoose:o["a"]},data:function(){return{flag1:!1,flag2:!1,isStatus:!1,isDisabled:!1,detailsVisible:!1,queryProductLoading:!1,StoreSelection:new c["a"](this),planIds:[],groupNum:1,goodsNum:8,productId:"",goodsSort:"-sales",showConsole:!0,country:"",selectMallList:[],tableData:[],multipleSelection:[],detailsData:{graphqlData:[],name:"",status:null,productId:""},goodsSortList:[{value:"-sales",label:"最热销"},{value:"price",label:"价格（从低至高）"},{value:"-price",label:"价格（从高至低）"}]}},methods:{batchSelection:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.selectMallList.length){e.next=2;break}return e.abrupt("return",t.$message("请选择店铺"));case 2:if(!(!t.groupNum||Number(t.groupNum)>10||Number(t.groupNum)<=0)){e.next=4;break}return e.abrupt("return",t.$message("最多添加10组精选商品"));case 4:if(!(!t.goodsNum||Number(t.goodsNum)>8||Number(t.goodsNum)<4)){e.next=6;break}return e.abrupt("return",t.$message("每组精选商品添加数量为 4 到 8 个"));case 6:return t.$refs.Logs.writeLog("开始批量添加精选组任务...",!0),t.showConsole=!1,t.flag1=!1,t.flag2=!1,t.isDisabled=!0,t.planIds=[],e.next=14,Object(l["c"])(t.selectMallList,t.batchSelectionGroup,1);case 14:if(t.flag2){e.next=20;break}return e.next=17,t.queryData();case 17:return e.next=19,t.queryIsOpen("",3);case 19:t.$refs.Logs.writeLog("添加精选组完成",!0);case 20:case"end":return e.stop()}}),e)})))()},batchSelectionGroup:function(t){var e=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s,i,o,c,u,d,p,m,h,f,g,b,v,_;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.length>1&&void 0!==e[1]?e[1]:{count:1},s="",s=t.mall_alias_name||t.platform_mall_name,r.prev=3,a.$refs.Logs.writeLog("店铺【".concat(s,"】正在获取商品数据..."),!0),c={},c["platform_mall_id"]=t.platform_mall_id,c["country"]=t.country,c["sort_by"]=a.goodsSort,r.next=11,a.StoreSelection.productSelector(c);case 11:if(u=r.sent,200===u.code){r.next=15;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】").concat(u.data),!1),r.abrupt("return");case 15:if(a.$refs.Logs.writeLog("店铺【".concat(s,"】获取商品成功，共【").concat(null===(i=u.data)||void 0===i?void 0:i.length,"】条"),!0),!((null===(o=u.data)||void 0===o?void 0:o.length)>0)){r.next=53;break}return r.next=19,a.StoreSelection.markeHotSalePlanList(t);case 19:p=r.sent,200===p.code&&(null===(d=p.data)||void 0===d?void 0:d.length)>0&&p.data.forEach((function(t){t.item_id_list.forEach((function(t){u.data.splice(u.data.findIndex((function(e){return e.itemid===t})),1)}))})),m=0;case 22:if(!(m<=Number(a.groupNum)-1)){r.next=53;break}if(!a.flag2){r.next=26;break}return a.stop(),r.abrupt("break",53);case 26:if(!(p.data.length+(m+1)>10)){r.next=29;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】下的精选组已达上线"),!1),r.abrupt("break",53);case 29:for(h=[],f={},g=u.data.splice(m*Number(a.goodsNum),Number(a.goodsNum)),b=0;b<g.length;b++)v=g[b],h.push(v.itemid);if(!(h.length<=0)){r.next=36;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】下的商品数量不足"),!1),r.abrupt("break",53);case 36:return f["item_id_list"]=h,f["name"]=Date.parse(new Date).toString().substr(0,10),f["country"]=t.country,f["platform_mall_id"]=t.platform_mall_id,r.next=42,a.StoreSelection.markeHotSalePlan(f,"postChineseReferer");case 42:if(_=r.sent,200===_.code){r.next=46;break}return a.$refs.Logs.writeLog("【".concat(s,"】添加第【").concat(m+1,"】个精选组失败：").concat(_.data),!1),r.abrupt("continue",50);case 46:return 0===m&&a.planIds.push(_.data.id),a.$refs.Logs.writeLog("【".concat(s,"】添加第【").concat(m+1,"】个精选组成功"),!0),r.next=50,Object(l["h"])(2e3);case 50:m++,r.next=22;break;case 53:r.next=58;break;case 55:r.prev=55,r.t0=r["catch"](3),a.$refs.Logs.writeLog("店铺【".concat(s,"】添加精选组异常"),!1);case 58:return r.prev=58,--n.count,r.finish(58);case 61:case"end":return r.stop()}}),r,null,[[3,55,58,61]])})))()},deleteSelection:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(1!==e){r.next=5;break}return r.next=3,a.deleteSelectionGroup(t);case 3:r.next=8;break;case 5:if(a.multipleSelection.length){r.next=7;break}return r.abrupt("return",a.$message("请选择数据后操作"));case 7:for(n=0;n<a.multipleSelection.length;n++)s=a.multipleSelection[n],a.deleteSelectionGroup(s);case 8:case"end":return r.stop()}}),r)})))()},deleteSelectionGroup:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={},r["plan_id"]=t.id,r["platform_mall_id"]=t.platform_mall_id,r["country"]=t.country,a.next=6,e.StoreSelection.markeHotSalePlan(r,"deleteChinese");case 6:n=a.sent,200===n.code?(e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】删除成功"),!0),e.tableData.splice(e.tableData.findIndex((function(e){return e.id===t.id})),1)):e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】删除失败：").concat(n.data),!1);case 8:case"end":return a.stop()}}),a)})))()},queryIsOpen:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,i,l,o,c,u,d,p,m,h,f;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(1!==e){r.next=11;break}if(a.$refs.Logs.writeLog("正在设置精选组状态...",!0),n=a.tableData.filter((function(e){return!0===e.status&&e.platform_mall_id===t.platform_mall_id&&t.id!==e.id})),!((null===n||void 0===n?void 0:n.length)>0)){r.next=7;break}return n[0].status=!1,r.next=7,a.setSelectionGroup.apply(a,Object(s["a"])(n));case 7:return r.next=9,a.setSelectionGroup(t);case 9:r.next=57;break;case 11:if(2!==e){r.next=29;break}if(a.multipleSelection.length){r.next=14;break}return r.abrupt("return",a.$message("请选择数据后操作"));case 14:if(l=a.multipleSelection.filter((function(t){return!0===t.status})),!(!(null!==(i=a.newData)&&void 0!==i&&i.length)<=0)){r.next=17;break}return r.abrupt("return",a.$message("没有可关闭的数据"));case 17:a.$refs.Logs.writeLog("正在设置精选组状态...",!0),o=0;case 19:if(!(o<l.length)){r.next=27;break}return c=l[o],c.status=!1,r.next=24,a.setSelectionGroup(c);case 24:o++,r.next=19;break;case 27:r.next=57;break;case 29:if(a.$refs.Logs.writeLog("正在设置精选组状态...",!0),!(a.planIds.length>0)){r.next=41;break}u=0;case 32:if(!(u<a.tableData.length)){r.next=41;break}if(d=a.tableData[u],!0!==d.status){r.next=38;break}return d.status=!1,r.next=38,a.setSelectionGroup(d);case 38:u++,r.next=32;break;case 41:p=0;case 42:if(!(p<a.planIds.length)){r.next=57;break}m=a.planIds[p],h=0;case 45:if(!(h<a.tableData.length)){r.next=54;break}if(f=a.tableData[h],m!==f.id){r.next=51;break}return f.status=!0,r.next=51,a.setSelectionGroup(f);case 51:h++,r.next=45;break;case 54:p++,r.next=42;break;case 57:case"end":return r.stop()}}),r)})))()},setSelectionGroup:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={},r["name"]=t.name,r["plan_id"]=t.id,r["status"]=t.status?1:0,r["platform_mall_id"]=t.platform_mall_id,r["country"]=t.country,r["item_id_list"]=t.item_id_list.map((function(t){return Number(t)})),a.next=9,e.StoreSelection.markeHotSalePlan(r,"putChinese");case 9:if(n=a.sent,i=e.tableData.filter((function(e){return e.id===t.id})),200!==n.code){a.next=15;break}e.flag1?e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】修改成功"),!0):(e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】").concat(t.status?"开启":"关闭","成功"),!0),e.$set.apply(e,Object(s["a"])(i).concat(["status",t.status]))),a.next=24;break;case 15:if(!e.flag1){a.next=21;break}return e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】修改失败"),!0),e.showConsole=!1,a.abrupt("return");case 21:return e.$refs.Logs.writeLog("【".concat(t.mallName,"】下【").concat(t.name,"】").concat(t.status?"开启":"关闭","失败：").concat(n.data),!1),e.$set.apply(e,Object(s["a"])(i).concat(["status",!t.status])),a.abrupt("return");case 24:case"end":return a.stop()}}),a)})))()},saveSelectionGroup:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.detailsData.name){a.next=3;break}return a.abrupt("return",e.$message("精选组名不能为空"));case 3:if(!(e.detailsData.graphqlData.length<4||!e.detailsData.graphqlData.length||e.detailsData.graphqlData.length>8)){a.next=5;break}return a.abrupt("return",e.$message("商品数量不能小于4"));case 5:if(r={},n=[],e.detailsData.graphqlData.forEach((function(t){n.push(t.itemid)})),r["item_id_list"]=n,r["name"]=e.detailsData.name,r["country"]=e.detailsData.country,r["platform_mall_id"]=e.detailsData.platform_mall_id,!e.flag1){a.next=23;break}return r["status"]=!!t||e.detailsData.status,r["id"]=e.detailsData.id,r["mallName"]=e.detailsData.mallName,a.next=18,e.queryIsOpen(r,1);case 18:return e.detailsVisible=!1,a.next=21,e.queryData();case 21:a.next=39;break;case 23:return a.next=25,e.StoreSelection.markeHotSalePlan(r,"postChineseReferer");case 25:if(s=a.sent,200!==s.code){a.next=38;break}return e.detailsVisible=!1,a.next=30,e.queryData();case 30:if(!t){a.next=36;break}return r["id"]=s.data.id,r["status"]=!0,r["mallName"]=e.detailsData.mallName,a.next=36,e.queryIsOpen(r,1);case 36:a.next=39;break;case 38:e.$message.error("保存精选组失败：".concat(s.data));case 39:a.next=44;break;case 41:a.prev=41,a.t0=a["catch"](0),e.$message.error("保存精选组异常：".concat(a.t0));case 44:case"end":return a.stop()}}),a,null,[[0,41]])})))()},productSelector:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.productId){e.next=3;break}return e.abrupt("return",t.$message("商品ID不能为空"));case 3:if(!((null===(a=t.detailsData.graphqlData)||void 0===a?void 0:a.length)>=8)){e.next=5;break}return e.abrupt("return",t.$message("最多8个商品"));case 5:return r=new Map,n={},n["id"]=t.productId.toString(),n["platform_mall_id"]=t.detailsData.platform_mall_id,n["country"]=t.detailsData.country,t.queryProductLoading=!0,e.next=13,t.StoreSelection.productSelector(n);case 13:if(s=e.sent,200!==s.code){e.next=25;break}if(s.data.length){e.next=19;break}return t.queryProductLoading=!1,t.$message("商品查询数据为空"),e.abrupt("return");case 19:s.data.map((function(e){e.images=e.images.split(","),e.country=t.detailsData.country,e.platform_mall_id=t.detailsData.platform_mall_id})),t.detailsData.graphqlData=t.detailsData.graphqlData.concat(s.data),t.detailsData.graphqlData=t.detailsData.graphqlData.filter((function(t){return!r.has(t.itemid)&&r.set(t.itemid,1)})),t.$forceUpdate(),e.next=26;break;case 25:t.$message.error("".concat(s.data));case 26:e.next=31;break;case 28:e.prev=28,e.t0=e["catch"](0),t.$message.error("添加商品异常：".concat(e.t0));case 31:t.queryProductLoading=!1;case 32:case"end":return e.stop()}}),e,null,[[0,28]])})))()},singleAdd:function(){if(this.selectMallList.length>=2||!this.selectMallList.length)return this.$message("添加单个精选组，只能选择一个店铺");this.detailsVisible=!0,this.detailsData.mallName=this.selectMallList[0].mall_alias_name||this.selectMallList[0].platform_mall_name,this.detailsData.platform_mall_id=this.selectMallList[0].platform_mall_id,this.detailsData.country=this.selectMallList[0].country,this.flag1=!1,this.handleClose()},editData:function(t){this.detailsVisible=!0,t.graphqlData.map((function(e){e.country=t.country,e.platform_mall_id=t.platform_mall_id})),this.detailsData=JSON.parse(JSON.stringify(t)),this.flag1=!0},queryData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.selectMallList.length){e.next=2;break}return e.abrupt("return",t.$message("请选择店铺"));case 2:return t.showConsole=!1,t.isDisabled=!0,t.tableData=[],t.$refs.Logs.writeLog("开始查询精选组...",!0),e.next=8,Object(l["c"])(t.selectMallList,t.getSelectionGroup);case 8:t.$refs.Logs.writeLog("查询精选组结束",!0),t.isDisabled=!1;case 10:case"end":return e.stop()}}),e)})))()},getSelectionGroup:function(t){var e=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s,i,l,o,c,u,d;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.length>1&&void 0!==e[1]?e[1]:{count:1},s="",s=t.mall_alias_name||t.platform_mall_name,r.prev=3,r.next=6,a.StoreSelection.markeHotSalePlanList(t);case 6:if(i=r.sent,200!==i.code){r.next=24;break}if(a.$refs.Logs.writeLog("查询店铺【".concat(s,"】【").concat(i.data.length,"】条数据"),!0),!((null===(l=i.data)||void 0===l?void 0:l.length)>0)){r.next=22;break}o=regeneratorRuntime.mark((function e(r){var n,l,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=i.data[r],n.status=1===n.status,n.country=t.country,n.platform_mall_id=t.platform_mall_id,n.mallName=s,n.item_id_list=n.item_id_list.map((function(t){return t.toString()})),e.next=8,a.StoreSelection.getGraphql(n);case 8:if(l=e.sent,200===l.code){e.next=11;break}return e.abrupt("return","continue");case 11:n.graphqlData=l.data,o=[],n.graphqlData.map((function(t){o.push(t.images[0])})),n.images=o;case 15:case"end":return e.stop()}}),e)})),c=0;case 12:if(!(c<i.data.length)){r.next=20;break}return r.delegateYield(o(c),"t0",14);case 14:if(u=r.t0,"continue"!==u){r.next=17;break}return r.abrupt("continue",17);case 17:c++,r.next=12;break;case 20:d=a.filterData(i.data),a.tableData=a.tableData.concat(d);case 22:r.next=25;break;case 24:a.$refs.Logs.writeLog("店铺【".concat(s,"】").concat(i.data),!1);case 25:r.next=30;break;case 27:r.prev=27,r.t1=r["catch"](3),a.$refs.Logs.writeLog("店铺【".concat(s,"】获取数据异常：").concat(r.t1),!1);case 30:return r.prev=30,--n.count,r.finish(30);case 33:case"end":return r.stop()}}),r,null,[[3,27,30,33]])})))()},filterData:function(t){for(var e=[],a=0;a<t.length;a++){var r=t[a];this.isStatus&&!r.status||e.push(r)}return e},handleClose:function(){this.detailsData.name="",this.detailsData.graphqlData=[],this.productId="",this.detailsData.status=!1},handleSelectionChange:function(t){this.multipleSelection=t},changeMallList:function(t){this.selectMallList=t,this.country=t.country},stop:function(){this.$refs.Logs.writeLog("停止添加",!0),Object(l["v"])(),this.isDisabled=!1}}},d=u,p=(a("3a5c"),a("2877")),m=Object(p["a"])(d,r,n,!1,null,"5cf14ef8",null);e["default"]=m.exports},e650:function(t,e,a){},feb6:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,r){return t.showMall(e,r)?a("el-option",{key:r,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},n=[],s=a("1da1"),i=a("2909"),l=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),o=a("2b0e");o["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var r=e.indexOf("")>-1,n=t.indexOf("")>-1;r!==n?this.groupId=n?[""].concat(Object(i["a"])(this.groupIdList.map((function(t){return t.id})))):[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var r=e.indexOf("")>-1,n=t.indexOf("")>-1;r!==n?this.site=n?[""].concat(Object(i["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,r=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:r},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:s=t.sent,200===s.code?(e.siteList=s.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(r){if(r){var n=t.siteList.find((function(t){return t.platform_mall_id===r}));e.push(n),a+=r+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(i["a"])(e),Object(i["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,r=this.site[0]===t.platform_mall_id;return r||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},u=c,d=(a("8992"),a("2877")),p=Object(d["a"])(u,r,n,!1,null,null,null);e["a"]=p.exports}}]);