(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cf9d4462"],{"033e":function(e,t,r){"use strict";r("2916")},2916:function(e,t,r){},f9db:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",{staticClass:"contaniner"},[r("el-row",{staticClass:"header"},[r("ul",[r("li",[r("span",[e._v("仓库名称：")]),r("el-select",{attrs:{size:"mini",filterable:""},model:{value:e.form.wid,callback:function(t){e.$set(e.form,"wid",t)},expression:"form.wid"}},[r("el-option",{attrs:{value:"0",label:"全部"}}),e._l(e.widList,(function(e,t){return r("el-option",{key:t,attrs:{value:e.id,label:e.warehouse_name}})}))],2)],1),r("li",{staticClass:"status"},[r("span",[e._v("商品状态：")]),r("el-select",{attrs:{size:"mini",filterable:""},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[r("el-option",{attrs:{value:"",label:"全部"}}),e._l(e.statusList,(function(e,t){return r("el-option",{key:t,attrs:{value:e.value,label:e.label}})}))],2)],1),r("li",[r("span",[e._v("系统商品编号：")]),r("el-input",{attrs:{clearable:"",size:"mini"},model:{value:e.form.sys_sku_id,callback:function(t){e.$set(e.form,"sys_sku_id",t)},expression:"form.sys_sku_id"}})],1),r("li",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.page=1,e.stockSharedList()}}},[e._v("搜 索")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportTableData}},[e._v("导出数据")])],1)])]),r("el-row",{attrs:{id:"article"}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isShowLoading,expression:"isShowLoading"}],ref:"plTable",attrs:{height:"calc(100vh - 160px)",data:e.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"},"default-sort":{prop:"s_sku_name",order:"descending"}},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),r("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),r("el-table-column",{attrs:{label:"仓库名称",align:"center","min-width":"130",prop:"warehouse_name"}}),r("el-table-column",{attrs:{prop:"sys_sku_id",label:"系统商品编号","min-width":"120",align:"center"}}),r("el-table-column",{attrs:{label:"商品编号(SkuId)",align:"center","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(r.stock&&r.stock.sku_id?r.stock.sku_id:"")+" ")]}}])}),r("el-table-column",{attrs:{label:"商品名称",align:"center","min-width":"140","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(r.stock&&r.stock.goods_name?r.stock.goods_name:"")+" ")]}}])}),r("el-table-column",{attrs:{label:"商品规格",align:"center","min-width":"140",prop:"s_sku_name","show-overflow-tooltip":"",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(r.stock&&r.stock.sku_name?r.stock.sku_name:"")+" ")]}}])}),r("el-table-column",{attrs:{prop:"status",label:"状态",align:"center","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("span",{style:e.colorObj[a.status]&&"color:"+e.colorObj[a.status]},[e._v(e._s(a.status?e.statusObj[a.status]:""))])]}}])}),r("el-table-column",{attrs:{prop:"shared_num",label:"共享库存",align:"center","min-width":"70"}}),r("el-table-column",{attrs:{prop:"consume_num",label:"可使用库存",align:"center","min-width":"80"}}),r("el-table-column",{attrs:{"min-width":"130",align:"center",label:"商品链接"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[a.stock&&a.stock.sku_url?r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openUrl(a.stock&&a.stock.sku_url)}}},[e._v("查看商品链接")]):e._e()]}}])}),r("el-table-column",{attrs:{label:"商品单价(RMB)",align:"center","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(r.stock&&r.stock&&r.stock.sku_price?r.stock.sku_price/100:"")+" ")]}}])}),r("el-table-column",{attrs:{width:"80",align:"center",label:"商品图片"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[a.stock&&a.stock.sku_image||a.stock&&a.stock.real_image_url?r("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[r("div",{attrs:{slot:"content"},slot:"content"},[r("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:a.stock&&a.stock.sku_image||a.stock&&a.stock.real_image_url}},[r("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1),r("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:a.stock&&a.stock.sku_image||a.stock&&a.stock.real_image_url}},[r("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1):e._e()]}}])}),r("el-table-column",{attrs:{label:"绑定用户",align:"center","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.getSharedUserList(a.id)}}},[e._v("查看绑定用户")])]}}])}),r("el-table-column",{attrs:{label:"操作",align:"center","min-width":"260",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1===a.status?r("div",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.bindUser(a)}}},[e._v("绑定用户")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.editSharedInventory(a)}}},[e._v("修改库存")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delSharedInventory(a)}}},[e._v("撤 销")])],1):e._e()]}}])})],1),r("div",{staticClass:"pagination"},[r("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[30,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),r("el-dialog",{staticClass:"shared-user-dialog",attrs:{title:"共享库存绑定用户",visible:e.sharedUserVisible,width:"550px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.sharedUserVisible=t}}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.sharedUserLoading,expression:"sharedUserLoading"}],attrs:{height:"420",data:e.sharedUserData,"header-cell-style":{backgroundColor:"#f5f7fa"},"row-style":{color:"black",height:"50px"}}},[r("el-table-column",{attrs:{width:"50",align:"center",type:"index",label:"序号"}}),r("el-table-column",{attrs:{prop:"platform_id",width:"150",align:"center",label:"平台名称"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v(" "+e._s(r.platform_id?e.platformObj[r.platform_id]:"")+" ")]}}])}),r("el-table-column",{attrs:{width:"150",align:"center",label:"用户名称",prop:"username"}}),r("el-table-column",{attrs:{width:"150",align:"center",label:"操作",prop:"sku_id"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.delbindUser(a)}}},[e._v("删除用户")])]}}])})],1)],1),r("el-dialog",{staticClass:"bind-user-dialog",attrs:{title:"添加共享库存绑定用户",visible:e.bindUserVisible,width:"300px","show-close":!e.addBindUserLoading,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.bindUserVisible=t},close:e.bindUserClose}},[r("ul",[r("li",{staticStyle:{"margin-bottom":"15px"}},[r("span",[e._v("共享平台：")]),r("el-select",{attrs:{size:"mini",filterable:""},model:{value:e.platformUserFrom.platform_ids,callback:function(t){e.$set(e.platformUserFrom,"platform_ids",t)},expression:"platformUserFrom.platform_ids"}},[r("el-option",{attrs:{value:"",label:"请选择平台"}}),e._l(e.platformList,(function(e,t){return r("el-option",{key:t,attrs:{value:e.value,label:e.label}})}))],2)],1),r("li",{staticStyle:{"margin-bottom":"15px"}},[r("span",[e._v("用户名称：")]),r("el-input",{attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s/g,'')"},model:{value:e.platformUserFrom.username,callback:function(t){e.$set(e.platformUserFrom,"username",t)},expression:"platformUserFrom.username"}})],1),r("li",[r("el-button",{attrs:{type:"primary",size:"mini",loading:e.addBindUserLoading},on:{click:e.addSharedBindUser}},[e._v("添 加")])],1)])]),r("el-dialog",{staticClass:"edit-storck-dialog",attrs:{visible:e.editSharedVisible,width:"300px",title:"修改共享库存"},on:{"update:visible":function(t){e.editSharedVisible=t}}},[r("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[r("el-form-item",{attrs:{label:"商品名称："}},[e._v(" "+e._s(e.shareTockData.goods_name)+" ")]),r("el-form-item",{attrs:{label:"商品规格："}},[e._v(" "+e._s(e.shareTockData.sku_name)+" ")]),r("el-form-item",{attrs:{label:"skuid："}},[e._v(" "+e._s(e.shareTockData.sku_id)+" ")]),r("el-form-item",{attrs:{label:"可用库存："}},[e._v(" "+e._s(e.shareTockData.stock_num)+" ")]),r("el-form-item",{attrs:{label:"共享库存："}},[r("el-input",{staticStyle:{width:"150px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)",clearable:""},model:{value:e.shareTockData.shared_num,callback:function(t){e.$set(e.shareTockData,"shared_num",t)},expression:"shareTockData.shared_num"}})],1),r("div",{staticClass:"footer"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addSharedInventory}},[e._v("确 定")])],1)],1)],1)],1)},n=[],s=r("1da1"),i=(r("a9e3"),r("498a"),r("4ec9"),r("d3b7"),r("3ca3"),r("ddb0"),r("159b"),r("99af"),r("4de4"),r("96cf"),r("d4ec")),o=r("bee2"),c=function(){function e(t){Object(i["a"])(this,e),this._this=t}return Object(o["a"])(e,[{key:"addSharedInventory",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.addSharedInventory",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"修改共享库存库存异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"overseasWh",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$appConfig.getGlobalCacheInfo("overseasWh",t);case 3:if(r=e.sent,"null"===r){e.next=7;break}return a=JSON.parse(r),e.abrupt("return",{code:200,data:a.warehouse_name});case 7:return e.abrupt("return",{code:200,data:""});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取海外仓库中文名异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delSharedInventory",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.delSharedInventory",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"撤销共享库存异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"delbindUser",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.delbindUser",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"删除绑定用户异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"addSharedBindUser",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.addSharedBindUser",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"添加绑定用户异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getBindUser",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.getBindUser",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"查询平台用户异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getSharedUserList",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.getSharedUserList",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==Number(a.code)){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:Number(a.code),data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"查看绑定用户异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stockSharedList",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.stockSharedList",t);case 3:if(r=e.sent,a=JSON.parse(JSON.parse(r).data),200!==a.code){e.next=7;break}return e.abrupt("return",{code:200,data:a.data});case 7:return e.abrupt("return",{code:a.code,data:"".concat(a.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取我共享的库存列表异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getOverseasWarehouse",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$appConfig.getGlobalCacheInfo("allWh","");case 3:if(t=e.sent,r=this.isJsonString(t),null===r||void 0===r||!r.length){e.next=7;break}return e.abrupt("return",{code:200,data:r});case 7:return e.abrupt("return",{code:201,data:"仓库列表为空"});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取仓库列表异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"isJsonString",value:function(e){if("string"!==typeof e)return e;try{return JSON.parse(e),JSON.parse(e)}catch(t){return e}}},{key:"searchIntegralNumberRecord",value:function(){}}]),e}(),u=r("0e0b"),d={data:function(){return{isShowLoading:!1,sharedUserLoading:!1,addBindUserLoading:!1,sharedUserVisible:!1,bindUserVisible:!1,editSharedVisible:!1,ShareBroadStock:new c(this),total:0,pageSize:30,page:1,tableData:[],multipleSelection:[],widList:[],sharedUserData:[],shareTockData:{},sharedNum:"",sharedId:"",form:{wid:"0",sys_sku_id:"",status:""},platformUserFrom:{username:"",platform_ids:""},addBindUserFrom:{shared_id:"",userList:[]},delBindUserFrom:{shared_id:"",app_uid_list:[]},platformList:[{value:"1",label:"莱赞"},{value:"2",label:"ShopeeMan"},{value:"12",label:"星卓越用户"},{value:"14",label:"店梯货代"}],statusList:[{value:1,label:"正常"},{value:2,label:"已完成"},{value:3,label:"弃用"}],statusObj:{1:"正常",2:"已完成",3:"弃用"},platformObj:{1:"莱赞",2:"ShopeeMan",14:"店梯货代"},colorObj:{1:"green",3:"red"}}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getOverseasWarehouse();case 2:return t.next=4,e.stockSharedList();case 4:case"end":return t.stop()}}),t)})))()},methods:{addSharedInventory:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.shareTockData.shared_num){t.next=2;break}return t.abrupt("return",e.$message("请输入共享库数"));case 2:if(!(Number(e.shareTockData.shared_num)>Number(e.shareTockData.stock_num))){t.next=4;break}return t.abrupt("return",e.$message("共享库存数不能大于可用库存数"));case 4:return r={},r["wid"]=e.shareTockData.wid,r["shared_num"]=e.shareTockData.shared_num,r["sys_sku_id"]=e.shareTockData.sys_sku_id,t.next=10,e.ShareBroadStock.addSharedInventory(r);case 10:a=t.sent,200===a.code?(e.$message.success("修改共享库存成功"),e.editSharedVisible=!1,e.stockSharedList()):e.$message.error(a.data);case 12:case"end":return t.stop()}}),t)})))()},editSharedInventory:function(e){this.editSharedVisible=!0,this.sharedNum="",this.shareTockData=e.stock},openUrl:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$BaseUtilService.openUrl(e);case 3:r.next=8;break;case 5:r.prev=5,r.t0=r["catch"](0),t.$message.error("打开链接【".concat(e,"】失败"));case 8:case"end":return r.stop()}}),r,null,[[0,5]])})))()},delSharedInventory:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=e.id,n=e.wid,s={},s["shared_id"]=a,s["wid"]=n,r.next=6,t.ShareBroadStock.delSharedInventory(s);case 6:i=r.sent,200===i.code?(t.$message.success("撤销成功"),t.stockSharedList()):t.$message.error(i.data);case 8:case"end":return r.stop()}}),r)})))()},delbindUser:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.delBindUserFrom["app_uid_list"]=[],a=e.app_uid,n=e.platform_id,s=e.username,i={app_uid:a,platform_id:n,username:s},t.delBindUserFrom["shared_id"]=t.sharedId,t.delBindUserFrom["app_uid_list"].push(i),r.next=7,t.ShareBroadStock.delbindUser(t.delBindUserFrom);case 7:o=r.sent,200===o.code?(t.$message.success("删除成功"),t.getSharedUserList(t.sharedId)):t.$message.error(o.data);case 9:case"end":return r.stop()}}),r)})))()},bindUser:function(e){this.bindUserVisible=!0,this.addBindUserFrom["shared_id"]=e.id},addSharedBindUser:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.addBindUserFrom["userList"]=[],e.platformUserFrom.platform_ids){t.next=3;break}return t.abrupt("return",e.$message("请先选择共享平台"));case 3:if(e.platformUserFrom.username){t.next=5;break}return t.abrupt("return",e.$message("请输入用户名称"));case 5:return e.addBindUserLoading=!0,t.next=8,e.ShareBroadStock.getBindUser(e.platformUserFrom);case 8:if(r=t.sent,200!==r.code){t.next=22;break}if(!((null===(a=r.data)||void 0===a?void 0:a.length)>0)){t.next=19;break}return n={app_uid:r.data[0].app_uid,platform_id:e.platformUserFrom.platform_ids,username:e.platformUserFrom.username},e.addBindUserFrom["userList"].push(n),t.next=15,e.ShareBroadStock.addSharedBindUser(e.addBindUserFrom);case 15:s=t.sent,200===s.code?e.$message.success("绑定成功"):e.$message.error(s.data),t.next=20;break;case 19:e.$message("未查询到用户");case 20:t.next=23;break;case 22:e.$message.error(r.data);case 23:e.addBindUserLoading=!1;case 24:case"end":return t.stop()}}),t)})))()},getSharedUserList:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.sharedUserVisible=!0,t.sharedUserLoading=!0,t.sharedId=e,a={shared_id:e},r.next=6,t.ShareBroadStock.getSharedUserList(a);case 6:n=r.sent,200===n.code?t.sharedUserData=n.data:t.$message.error(n.data),t.sharedUserLoading=!1;case 9:case"end":return r.stop()}}),r)})))()},stockSharedList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,n,s,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isShowLoading=!0,e.form.page=e.page,e.form.page_num=e.pageSize,e.form.sys_sku_id.trim(),t.next=6,e.ShareBroadStock.stockSharedList(e.form);case 6:if(r=t.sent,200!==r.code){t.next=23;break}e.tableData=r.data.data,e.total=r.data.total,a=0;case 11:if(!(a<e.tableData.length)){t.next=21;break}return i=e.tableData[a],i.s_sku_name=null!==(n=null===i||void 0===i||null===(s=i.stock)||void 0===s?void 0:s.sku_name)&&void 0!==n?n:"",t.next=16,e.ShareBroadStock.overseasWh(i.wid);case 16:o=t.sent,200===o.code?e.$set(i,"warehouse_name",o.data):e.$set(i,"warehouse_name","");case 18:a++,t.next=11;break;case 21:t.next=24;break;case 23:e.$message.error(r.data);case 24:e.isShowLoading=!1;case 25:case"end":return t.stop()}}),t)})))()},getOverseasWarehouse:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new Map,t.next=3,e.ShareBroadStock.getOverseasWarehouse();case 3:a=t.sent,200===a.code?a.data.forEach((function(t){e.widList=e.widList.concat(t.child)})):e.$message.error(a.data),e.widList=e.widList.filter((function(e){return!r.has(e.id)&&r.set(e.id,1)}));case 6:case"end":return t.stop()}}),t)})))()},exportTableData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,n,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!==e.total){t.next=2;break}return t.abrupt("return",e.$message("暂无导出数据"));case 2:e.isShowLoading=!0,r=[],e.form.sys_sku_id.trim(),a=e.form,a.page_num=200,a.page=1;case 8:if(!(r.length<e.total)){t.next=23;break}return t.next=11,e.ShareBroadStock.stockSharedList(a);case 11:if(n=t.sent,200!==n.code){t.next=18;break}i=n.data.data,i.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ShareBroadStock.overseasWh(a.wid);case 2:n=t.sent,200===n.code?a.warehouse_name=n.data:a.warehouse_name="",r.push(a);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),a.page++,t.next=21;break;case 18:return e.$message.error("导出数据错误",n.data),e.isShowLoading=!1,t.abrupt("break",23);case 21:t.next=8;break;case 23:o="<tr>\n          <td>仓库名称</td>\n          <td>系统商品编号</td>\n          <td>商品编号</td>\n          <td>商品名称</td>\n          <td>商品规格</td>\n          <td>状态</td>\n          <td>共享库存</td>\n          <td>可使用库存</td>\n          <td>商品单价(RMB)</td>\n          <td>商品图片</td>\n          <td>商品链接</td>\n        </td>",r.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:o+="<tr>\n        <td>".concat(r.warehouse_name?r.warehouse_name:"\t","</td>\n        <td>").concat(r.sys_sku_id?r.sys_sku_id:"\t","</td>\n        <td style=\"mso-number-format:'@';\">").concat(r.stock&&r.stock.sku_id?r.stock.sku_id:"\t","</td>\n        <td>").concat(r.stock&&r.stock.goods_name?r.stock.goods_name:"\t","</td>\n        <td>").concat(r.stock&&r.stock.sku_name?r.stock.sku_name:"\t","</td>\n        <td>").concat(e.statusObj[r.status]?e.statusObj[r.status]:"\t","</td>\n        <td>").concat(r.shared_num?r.shared_num:"\t","</td>\n        <td>").concat(r.consume_num?r.consume_num:"\t","</td>\n        <td>").concat(r.stock&&r.stock.sku_price?r.stock.sku_price/100:"\t","</td>\n        <td>").concat(r.stock&&(r.stock.sku_image||r.stock.real_image_url)+"\t","</td>\n         <td>").concat(r.stock&&r.stock.sku_url?r.stock.sku_url:"\t","</td>\n        </tr>");case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),e.isShowLoading=!1,Object(u["k"])("海外共享库存管理数据",o);case 27:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.stockSharedList()},handleCurrentChange:function(e){this.page=e,this.stockSharedList()},handleSelectionChange:function(e){this.multipleSelection=e},bindUserClose:function(){this.platformUserFrom["username"]="",this.platformUserFrom["platform_ids"]="",this.addBindUserFrom["shared_id"]=""}}},l=d,p=(r("033e"),r("2877")),m=Object(p["a"])(l,a,n,!1,null,"1891950a",null);t["default"]=m.exports}}]);