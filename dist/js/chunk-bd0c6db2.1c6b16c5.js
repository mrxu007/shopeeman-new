(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bd0c6db2"],{"07bc":function(e,t,a){},"0846":function(e,t,a){"use strict";a("07bc")},c42a:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",[a("li",[a("div",{staticClass:"base-box"},[a("span",{staticClass:"base-title"},[e._v("店铺分组")]),a("div",{staticClass:"base-item"},[a("storeChoose",{on:{changeMallList:e.changeMallList}})],1),a("div",{staticClass:"base-item",staticStyle:{"margin-left":"18px"}},[a("el-checkbox",{attrs:{disabled:e.isDisabled},model:{value:e.isStatus,callback:function(t){e.isStatus=t},expression:"isStatus"}},[e._v("只查询已启用的精选组")])],1),a("div",{staticStyle:{"margin-left":"18px"}},[a("el-button",{attrs:{disabled:e.isDisabled,type:"primary",size:"mini"},on:{click:e.queryData}},[e._v("查询精选组")]),a("el-button",{attrs:{disabled:e.isDisabled,type:"primary",size:"mini"},on:{click:e.singleAdd}},[e._v("添加单个精选组")]),a("el-button",{attrs:{disabled:e.isDisabled,type:"primary",size:"mini"},on:{click:function(t){return e.deleteSelection(e.multipleSelection,2)}}},[e._v("批量删除精选组")]),a("el-button",{attrs:{disabled:e.isDisabled,type:"primary",size:"mini"},on:{click:function(t){return e.queryIsOpen(e.multipleSelection,2)}}},[e._v("批量关闭精选组")]),a("el-checkbox",{staticStyle:{margin:"0 10px"},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.$refs.Logs.consoleMsg=""}}},[e._v("清除日志")])],1)])]),a("li",[a("div",{staticClass:"base-box",staticStyle:{"padding-left":"20px"}},[a("span",{staticClass:"base-title"},[e._v("添加精选组参数数据")]),a("div",{staticClass:"base-item",staticStyle:{"margin-top":"5px"}},[a("span",[e._v("每个店铺添加 "),a("el-input",{staticClass:"input",attrs:{disabled:e.isDisabled,onkeyup:"value=value.replace(/[^\\d]/g,'')",size:"mini",clearable:""},model:{value:e.groupNum,callback:function(t){e.groupNum=t},expression:"groupNum"}}),e._v(" 组精选商品"),a("span",{staticClass:"red-span"},[e._v("（最大10组）")])],1),a("span",[e._v("每组精选添加 "),a("el-input",{staticClass:"input",attrs:{disabled:e.isDisabled,onkeyup:"value=value.replace(/[^\\d]/g,'')",size:"mini",clearable:""},model:{value:e.goodsNum,callback:function(t){e.goodsNum=t},expression:"goodsNum"}}),e._v(" 个商品"),a("span",{staticClass:"red-span"},[e._v("（最少4个，最多8个）")])],1)]),a("div",{staticClass:"base-item"},[a("span",[e._v("精选商品排序 ")]),a("el-select",{attrs:{size:"mini",filterable:"",disabled:e.isDisabled},model:{value:e.goodsSort,callback:function(t){e.goodsSort=t},expression:"goodsSort"}},e._l(e.goodsSortList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1),a("el-button",{attrs:{disabled:e.isDisabled,type:"primary",size:"mini"},on:{click:e.batchSelection}},[e._v("开始批量添加")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.flag2=!0,e.stop()}}},[e._v("停止添加")])],1),a("span",{staticClass:"red-span"},[e._v("批量添加：精选名称自动生成，默认开启第一组精选商品")])])])])]),a("el-row",{attrs:{id:"article"}},[a("u-table",{ref:"plTable",attrs:{data:e.tableData,"use-virtual":"",height:700,"row-height":68,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange}},[a("u-table-column",{attrs:{align:"center",type:"selection","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"100",prop:"mallName"}}),a("u-table-column",{attrs:{align:"center",label:"精选名称","min-width":"100",prop:"name"}}),a("u-table-column",{attrs:{align:"center",label:"商品详情","min-width":"400"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticStyle:{display:"flex"}},e._l(r.images,(function(t,r){return a("div",{key:r},[t?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:e._f("imageRender")([t])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v(" 加载中"),a("span",{staticClass:"dot"},[e._v("...")])])])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:e._f("imageRender")([t,!0])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v(" 加载中"),a("span",{staticClass:"dot"},[e._v("...")])])])],1):e._e()],1)})),0)]}}])}),a("u-table-column",{attrs:{align:"center",label:"启用状态","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(t){e.flag1=!1,e.queryIsOpen(r,1)}},model:{value:r.status,callback:function(t){e.$set(r,"status",t)},expression:"row.status"}})]}}])}),a("u-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.editData(r)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:r.status},on:{click:function(t){return e.deleteSelection(r,1)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1),e.detailsVisible?a("el-dialog",{staticClass:"details-dialog",attrs:{title:"编辑精选组详情",visible:e.detailsVisible,width:"1000px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.detailsVisible=t},close:e.handleClose}},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[e._v("店铺名称："+e._s(e.detailsData.mallName))])]),a("li",[a("span",{staticStyle:{width:"113px"}},[e._v("精选组名称：")]),a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",size:"mini"},model:{value:e.detailsData.name,callback:function(t){e.$set(e.detailsData,"name",t)},expression:"detailsData.name"}})],1),a("li",[a("span",[e._v("启用状态："+e._s(e.detailsData.status?"已启用":"未启用"))])]),a("li",[a("el-button",{attrs:{type:"primary",size:"mini",loading:e.queryProductLoading},on:{click:e.productSelector}},[e._v("添加商品")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.detailsData.status},on:{click:function(t){return e.saveSelectionGroup(!0)}}},[e._v("保存并启用")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.saveSelectionGroup(!1)}}},[e._v("保存")])],1)]),a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("el-input",{attrs:{size:"mini"},model:{value:e.productId,callback:function(t){e.productId=t},expression:"productId"}}),a("span",{staticClass:"red-span",staticStyle:{width:"270px"},attrs:{clearable:""}},[e._v("添加多个商品，请以英文逗号（,）隔开")])],1),a("ul",[a("u-table",{ref:"plTable",attrs:{data:e.detailsData.graphqlData,"use-virtual":"",height:385,"row-height":68,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("u-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50"}}),a("u-table-column",{attrs:{align:"center",label:"商品ID","min-width":"100",prop:"itemid"}}),a("u-table-column",{attrs:{align:"center",label:"商品图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.images[0]?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:e._f("imageRender")([r.images[0]])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v(" 加载中"),a("span",{staticClass:"dot"},[e._v("...")])])])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:e._f("imageRender")([r.images[0],!0])}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"}),a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v(" 加载中"),a("span",{staticClass:"dot"},[e._v("...")])])])],1):e._e()]}}],null,!1,2688352715)}),a("u-table-column",{attrs:{align:"center",label:"商品名称","min-width":"300",prop:"name","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",label:"商品价格","min-width":"100",prop:"price"}}),a("u-table-column",{attrs:{align:"center",label:"销量","min-width":"80",prop:"sold"}}),a("u-table-column",{attrs:{align:"center",label:"操作","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.detailsData.graphqlData.splice(t.$index,1)}}},[e._v("删除")])]}}],null,!1,1132089802)})],1)],1)]):e._e()],1)},n=[],s=a("2909"),i=a("1da1"),l=(a("96cf"),a("a9e3"),a("99af"),a("159b"),a("a434"),a("c740"),a("d3b7"),a("25f0"),a("b0c0"),a("4de4"),a("d81d"),a("4ec9"),a("3ca3"),a("ddb0"),a("ac1f"),a("1276"),a("0e0b")),o=a("feb6"),c=a("2f6f"),u={components:{StoreChoose:o["a"]},data:function(){return{flag1:!1,flag2:!1,isStatus:!1,isDisabled:!1,detailsVisible:!1,queryProductLoading:!1,StoreSelection:new c["a"](this),planIds:[],groupNum:1,goodsNum:8,productId:"",goodsSort:"-sales",showConsole:!0,country:"",selectMallList:[],tableData:[],multipleSelection:[],detailsData:{graphqlData:[],name:"",status:null,productId:""},goodsSortList:[{value:"-sales",label:"最热销"},{value:"price",label:"价格（从低至高）"},{value:"-price",label:"价格（从高至低）"}]}},methods:{batchSelection:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectMallList.length){t.next=2;break}return t.abrupt("return",e.$message("请选择店铺"));case 2:if(!(!e.groupNum||Number(e.groupNum)>10||Number(e.groupNum)<=0)){t.next=4;break}return t.abrupt("return",e.$message("最多添加10组精选商品"));case 4:if(!(!e.goodsNum||Number(e.goodsNum)>8||Number(e.goodsNum)<4)){t.next=6;break}return t.abrupt("return",e.$message("每组精选商品添加数量为 4 到 8 个"));case 6:return e.$refs.Logs.writeLog("开始批量添加精选组任务...",!0),e.showConsole=!1,e.flag1=!1,e.flag2=!1,e.isDisabled=!0,e.planIds=[],t.next=14,Object(l["c"])(e.selectMallList,e.batchSelectionGroup,1);case 14:if(e.flag2){t.next=20;break}return t.next=17,e.queryData();case 17:return t.next=19,e.queryIsOpen("",3);case 19:e.$refs.Logs.writeLog("添加精选组完成",!0);case 20:case"end":return t.stop()}}),t)})))()},batchSelectionGroup:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s,i,o,c,u,d,p,m,g,b,f,h,v,x;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.length>1&&void 0!==t[1]?t[1]:{count:1},s="",s=e.mall_alias_name||e.platform_mall_name,r.prev=3,a.$refs.Logs.writeLog("店铺【".concat(s,"】正在获取商品数据..."),!0),c={},c["platform_mall_id"]=e.platform_mall_id,c["country"]=e.country,c["sort_by"]=a.goodsSort,r.next=11,a.StoreSelection.productSelector(c);case 11:if(u=r.sent,200===u.code){r.next=15;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】").concat(u.data),!1),r.abrupt("return");case 15:if(a.$refs.Logs.writeLog("店铺【".concat(s,"】获取商品成功，共【").concat(null===(i=u.data)||void 0===i?void 0:i.length,"】条"),!0),!((null===(o=u.data)||void 0===o?void 0:o.length)>0)){r.next=53;break}return r.next=19,a.StoreSelection.markeHotSalePlanList(e);case 19:p=r.sent,200===p.code&&(null===(d=p.data)||void 0===d?void 0:d.length)>0&&p.data.forEach((function(e){e.item_id_list.forEach((function(e){u.data.splice(u.data.findIndex((function(t){return t.itemid===e})),1)}))})),m=0;case 22:if(!(m<=Number(a.groupNum)-1)){r.next=53;break}if(!a.flag2){r.next=26;break}return a.stop(),r.abrupt("break",53);case 26:if(!(p.data.length+(m+1)>10)){r.next=29;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】下的精选组已达上线"),!1),r.abrupt("break",53);case 29:for(g=[],b={},f=u.data.splice(m*Number(a.goodsNum),Number(a.goodsNum)),h=0;h<f.length;h++)v=f[h],g.push(v.itemid);if(!(g.length<=0)){r.next=36;break}return a.$refs.Logs.writeLog("店铺【".concat(s,"】下的商品数量不足"),!1),r.abrupt("break",53);case 36:return b["item_id_list"]=g,b["name"]=Date.parse(new Date).toString().substr(0,10),b["country"]=e.country,b["platform_mall_id"]=e.platform_mall_id,r.next=42,a.StoreSelection.markeHotSalePlan(b,"postChineseReferer");case 42:if(x=r.sent,200===x.code){r.next=46;break}return a.$refs.Logs.writeLog("【".concat(s,"】添加第【").concat(m+1,"】个精选组失败：").concat(x.data),!1),r.abrupt("continue",50);case 46:return 0===m&&a.planIds.push(x.data.id),a.$refs.Logs.writeLog("【".concat(s,"】添加第【").concat(m+1,"】个精选组成功"),!0),r.next=50,Object(l["h"])(2e3);case 50:m++,r.next=22;break;case 53:r.next=58;break;case 55:r.prev=55,r.t0=r["catch"](3),a.$refs.Logs.writeLog("店铺【".concat(s,"】添加精选组异常"),!1);case 58:return r.prev=58,--n.count,r.finish(58);case 61:case"end":return r.stop()}}),r,null,[[3,55,58,61]])})))()},deleteSelection:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(1!==t){r.next=5;break}return r.next=3,a.deleteSelectionGroup(e);case 3:r.next=15;break;case 5:if(a.multipleSelection.length){r.next=7;break}return r.abrupt("return",a.$message("请选择数据后操作"));case 7:n=0;case 8:if(!(n<a.multipleSelection.length)){r.next=15;break}return s=a.multipleSelection[n],r.next=12,a.deleteSelectionGroup(s);case 12:n++,r.next=8;break;case 15:case"end":return r.stop()}}),r)})))()},deleteSelectionGroup:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={},r["plan_id"]=e.id,r["platform_mall_id"]=e.platform_mall_id,r["country"]=e.country,a.next=6,t.StoreSelection.markeHotSalePlan(r,"deleteChinese");case 6:n=a.sent,200===n.code?(t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】删除成功"),!0),t.tableData.splice(t.tableData.findIndex((function(t){return t.id===e.id})),1)):t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】删除失败：").concat(n.data),!1);case 8:case"end":return a.stop()}}),a)})))()},queryIsOpen:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,i,l,o,c,u,d,p,m,g,b;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(1!==t){r.next=11;break}if(a.$refs.Logs.writeLog("正在设置精选组状态...",!0),n=a.tableData.filter((function(t){return!0===t.status&&t.platform_mall_id===e.platform_mall_id&&e.id!==t.id})),!((null===n||void 0===n?void 0:n.length)>0)){r.next=7;break}return n[0].status=!1,r.next=7,a.setSelectionGroup.apply(a,Object(s["a"])(n));case 7:return r.next=9,a.setSelectionGroup(e);case 9:r.next=57;break;case 11:if(2!==t){r.next=29;break}if(a.multipleSelection.length){r.next=14;break}return r.abrupt("return",a.$message("请选择数据后操作"));case 14:if(l=a.multipleSelection.filter((function(e){return!0===e.status})),!(!(null!==(i=a.newData)&&void 0!==i&&i.length)<=0)){r.next=17;break}return r.abrupt("return",a.$message("没有可关闭的数据"));case 17:a.$refs.Logs.writeLog("正在设置精选组状态...",!0),o=0;case 19:if(!(o<l.length)){r.next=27;break}return c=l[o],c.status=!1,r.next=24,a.setSelectionGroup(c);case 24:o++,r.next=19;break;case 27:r.next=57;break;case 29:if(a.$refs.Logs.writeLog("正在设置精选组状态...",!0),!(a.planIds.length>0)){r.next=41;break}u=0;case 32:if(!(u<a.tableData.length)){r.next=41;break}if(d=a.tableData[u],!0!==d.status){r.next=38;break}return d.status=!1,r.next=38,a.setSelectionGroup(d);case 38:u++,r.next=32;break;case 41:p=0;case 42:if(!(p<a.planIds.length)){r.next=57;break}m=a.planIds[p],g=0;case 45:if(!(g<a.tableData.length)){r.next=54;break}if(b=a.tableData[g],m!==b.id){r.next=51;break}return b.status=!0,r.next=51,a.setSelectionGroup(b);case 51:g++,r.next=45;break;case 54:p++,r.next=42;break;case 57:case"end":return r.stop()}}),r)})))()},setSelectionGroup:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={},r["name"]=e.name,r["plan_id"]=e.id,r["status"]=e.status?1:0,r["platform_mall_id"]=e.platform_mall_id,r["country"]=e.country,r["item_id_list"]=e.item_id_list.map((function(e){return Number(e)})),a.next=9,t.StoreSelection.markeHotSalePlan(r,"putChinese");case 9:if(n=a.sent,i=t.tableData.filter((function(t){return t.id===e.id})),200!==n.code){a.next=15;break}t.flag1?t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】修改成功"),!0):(t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】").concat(e.status?"开启":"关闭","成功"),!0),t.$set.apply(t,Object(s["a"])(i).concat(["status",e.status]))),a.next=24;break;case 15:if(!t.flag1){a.next=21;break}return t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】修改失败"),!0),t.showConsole=!1,a.abrupt("return");case 21:return t.$refs.Logs.writeLog("【".concat(e.mallName,"】下【").concat(e.name,"】").concat(e.status?"开启":"关闭","失败：").concat(n.data),!1),t.$set.apply(t,Object(s["a"])(i).concat(["status",!e.status])),a.abrupt("return");case 24:case"end":return a.stop()}}),a)})))()},saveSelectionGroup:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,t.detailsData.name){a.next=3;break}return a.abrupt("return",t.$message("精选组名不能为空"));case 3:if(!(t.detailsData.graphqlData.length<4||!t.detailsData.graphqlData.length||t.detailsData.graphqlData.length>8)){a.next=5;break}return a.abrupt("return",t.$message("商品数量不能小于4"));case 5:if(r={},n=[],t.detailsData.graphqlData.forEach((function(e){n.push(e.itemid)})),r["item_id_list"]=n,r["name"]=t.detailsData.name,r["country"]=t.detailsData.country,r["platform_mall_id"]=t.detailsData.platform_mall_id,!t.flag1){a.next=23;break}return r["status"]=!!e||t.detailsData.status,r["id"]=t.detailsData.id,r["mallName"]=t.detailsData.mallName,a.next=18,t.queryIsOpen(r,1);case 18:return t.detailsVisible=!1,a.next=21,t.queryData();case 21:a.next=39;break;case 23:return a.next=25,t.StoreSelection.markeHotSalePlan(r,"postChineseReferer");case 25:if(s=a.sent,200!==s.code){a.next=38;break}return t.detailsVisible=!1,a.next=30,t.queryData();case 30:if(!e){a.next=36;break}return r["id"]=s.data.id,r["status"]=!0,r["mallName"]=t.detailsData.mallName,a.next=36,t.queryIsOpen(r,1);case 36:a.next=39;break;case 38:t.$message.error("保存精选组失败：".concat(s.data));case 39:a.next=44;break;case 41:a.prev=41,a.t0=a["catch"](0),t.$message.error("保存精选组异常：".concat(a.t0));case 44:case"end":return a.stop()}}),a,null,[[0,41]])})))()},productSelector:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.productId){t.next=3;break}return t.abrupt("return",e.$message("商品ID不能为空"));case 3:if(!((null===(a=e.detailsData.graphqlData)||void 0===a?void 0:a.length)>=8)){t.next=5;break}return t.abrupt("return",e.$message("最多8个商品"));case 5:return r=new Map,n={},n["id"]=e.productId.toString(),n["platform_mall_id"]=e.detailsData.platform_mall_id,n["country"]=e.detailsData.country,e.queryProductLoading=!0,t.next=13,e.StoreSelection.productSelector(n);case 13:if(s=t.sent,200!==s.code){t.next=25;break}if(s.data.length){t.next=19;break}return e.queryProductLoading=!1,e.$message("商品查询数据为空"),t.abrupt("return");case 19:s.data.map((function(t){t.images=t.images.split(","),t.country=e.detailsData.country,t.platform_mall_id=e.detailsData.platform_mall_id})),e.detailsData.graphqlData=e.detailsData.graphqlData.concat(s.data),e.detailsData.graphqlData=e.detailsData.graphqlData.filter((function(e){return!r.has(e.itemid)&&r.set(e.itemid,1)})),e.$forceUpdate(),t.next=26;break;case 25:e.$message.error("".concat(s.data));case 26:t.next=31;break;case 28:t.prev=28,t.t0=t["catch"](0),e.$message.error("添加商品异常：".concat(t.t0));case 31:e.queryProductLoading=!1;case 32:case"end":return t.stop()}}),t,null,[[0,28]])})))()},singleAdd:function(){if(this.selectMallList.length>=2||!this.selectMallList.length)return this.$message("添加单个精选组，只能选择一个店铺");this.detailsVisible=!0,this.detailsData.mallName=this.selectMallList[0].mall_alias_name||this.selectMallList[0].platform_mall_name,this.detailsData.platform_mall_id=this.selectMallList[0].platform_mall_id,this.detailsData.country=this.selectMallList[0].country,this.flag1=!1,this.handleClose()},editData:function(e){this.detailsVisible=!0,e.graphqlData.map((function(t){t.country=e.country,t.platform_mall_id=e.platform_mall_id})),this.detailsData=JSON.parse(JSON.stringify(e)),this.flag1=!0},queryData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectMallList.length){t.next=2;break}return t.abrupt("return",e.$message("请选择店铺"));case 2:return e.showConsole=!1,e.isDisabled=!0,e.tableData=[],e.$refs.Logs.writeLog("开始查询精选组...",!0),t.next=8,Object(l["c"])(e.selectMallList,e.getSelectionGroup);case 8:e.$refs.Logs.writeLog("查询精选组结束",!0),e.isDisabled=!1;case 10:case"end":return t.stop()}}),t)})))()},getSelectionGroup:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s,i,l,o,c,u,d;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.length>1&&void 0!==t[1]?t[1]:{count:1},s="",s=e.mall_alias_name||e.platform_mall_name,r.prev=3,r.next=6,a.StoreSelection.markeHotSalePlanList(e);case 6:if(i=r.sent,200!==i.code){r.next=24;break}if(a.$refs.Logs.writeLog("查询店铺【".concat(s,"】【").concat(i.data.length,"】条数据"),!0),!((null===(l=i.data)||void 0===l?void 0:l.length)>0)){r.next=22;break}o=regeneratorRuntime.mark((function t(r){var n,l,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=i.data[r],n.status=1===n.status,n.country=e.country,n.platform_mall_id=e.platform_mall_id,n.mallName=s,n.item_id_list=n.item_id_list.map((function(e){return e.toString()})),t.next=8,a.StoreSelection.getGraphql(n);case 8:if(l=t.sent,200===l.code){t.next=11;break}return t.abrupt("return","continue");case 11:n.graphqlData=l.data,o=[],n.graphqlData.map((function(e){o.push(e.images[0])})),n.images=o;case 15:case"end":return t.stop()}}),t)})),c=0;case 12:if(!(c<i.data.length)){r.next=20;break}return r.delegateYield(o(c),"t0",14);case 14:if(u=r.t0,"continue"!==u){r.next=17;break}return r.abrupt("continue",17);case 17:c++,r.next=12;break;case 20:d=a.filterData(i.data),a.tableData=a.tableData.concat(d);case 22:r.next=25;break;case 24:a.$refs.Logs.writeLog("店铺【".concat(s,"】").concat(i.data),!1);case 25:r.next=30;break;case 27:r.prev=27,r.t1=r["catch"](3),a.$refs.Logs.writeLog("店铺【".concat(s,"】获取数据异常：").concat(r.t1),!1);case 30:return r.prev=30,--n.count,r.finish(30);case 33:case"end":return r.stop()}}),r,null,[[3,27,30,33]])})))()},filterData:function(e){for(var t=[],a=0;a<e.length;a++){var r=e[a];this.isStatus&&!r.status||t.push(r)}return t},handleClose:function(){this.detailsData.name="",this.detailsData.graphqlData=[],this.productId="",this.detailsData.status=!1},handleSelectionChange:function(e){this.multipleSelection=e},changeMallList:function(e){this.selectMallList=e,this.country=e.country},stop:function(){this.$refs.Logs.writeLog("停止添加",!0),Object(l["w"])(),this.isDisabled=!1}}},d=u,p=(a("0846"),a("2877")),m=Object(p["a"])(d,r,n,!1,null,"ebda3764",null);t["default"]=m.exports}}]);