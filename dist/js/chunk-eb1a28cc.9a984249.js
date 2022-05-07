(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb1a28cc"],{"09d7":function(e,t,a){"use strict";a("ecb2")},e94a:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",[a("li",[a("span",[e._v("仓库名称：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:e.form.wid,callback:function(t){e.$set(e.form,"wid",t)},expression:"form.wid"}},e._l(e.widList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.warehouse_name,value:e.wid}})})),1)],1),a("li",[a("span",[e._v("商品编号：")]),a("el-input",{attrs:{clearable:"",size:"mini"},model:{value:e.form.sku_id,callback:function(t){e.$set(e.form,"sku_id",t)},expression:"form.sku_id"}})],1),a("li",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.page=1,e.getStock()}}},[e._v("搜 索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportTableData}},[e._v("导出数据")])],1)])]),a("el-row",{attrs:{id:"article"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isShowLoading,expression:"isShowLoading"}],ref:"plTable",attrs:{height:"calc(100vh - 160px)",data:e.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),a("el-table-column",{attrs:{label:"仓库名称",align:"center","min-width":"130",prop:"warehouse_name"}}),a("el-table-column",{attrs:{label:"商品编号(SkuId)",align:"center","min-width":"150",prop:"sku_id"}}),a("el-table-column",{attrs:{label:"商品名称",align:"center","min-width":"150",prop:"goods_name","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"商品规格",align:"center","min-width":"150",prop:"sku_name","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"采购数量",align:"center","min-width":"100",prop:"purchase_num"}}),a("el-table-column",{attrs:{label:"仓库库存",align:"center","min-width":"90",prop:"stock"}}),a("el-table-column",{attrs:{label:"在途库存",align:"center","min-width":"90",prop:"transport_num"}}),a("el-table-column",{attrs:{label:"总库存",align:"center","min-width":"90","render-header":e.allStockTooltip},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.transport_num+a.stock)+" ")]}}])}),a("el-table-column",{attrs:{label:"占用库存",align:"center","min-width":"100",prop:"frozen_num"}}),a("el-table-column",{attrs:{label:"商品单价(RMB)",align:"center","min-width":"110",prop:"sku_price"}}),a("el-table-column",{attrs:{"min-width":"130",align:"center",label:"商品链接"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.goods_url?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openUrl(r.goods_url)}}},[e._v("查看商品链接")]):e._e()]}}])}),a("el-table-column",{attrs:{width:"80",align:"center",label:"商品图片"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[a("el-tooltip",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t.sku_image,"preview-src-list":[t.sku_image],effect:"light"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t.sku_image}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t.sku_image}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1)]}}])}),a("el-table-column",{attrs:{label:"货架仓位",align:"center","min-width":"150",prop:"position_code","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updateStockPriceDia(r)}}},[e._v("商品编辑")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[30,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{staticClass:"update-price-dialog",attrs:{visible:e.updatePriceVisible,width:"330px",title:"修改库存价格","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.updatePriceVisible=t}}},[a("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[a("el-form-item",{attrs:{label:"商品名称："}},[a("el-input",{attrs:{size:"mini",disabled:""},model:{value:e.updatePriceData.goods_name,callback:function(t){e.$set(e.updatePriceData,"goods_name",t)},expression:"updatePriceData.goods_name"}})],1),a("el-form-item",{attrs:{label:"skuId："}},[a("el-input",{attrs:{size:"mini",disabled:""},model:{value:e.updatePriceData.sku_id,callback:function(t){e.$set(e.updatePriceData,"sku_id",t)},expression:"updatePriceData.sku_id"}})],1),a("el-form-item",{attrs:{label:"商品规格："}},[a("el-input",{attrs:{size:"mini"},model:{value:e.updatePriceData.sku_name,callback:function(t){e.$set(e.updatePriceData,"sku_name",t)},expression:"updatePriceData.sku_name"}})],1),a("el-form-item",{attrs:{label:"商品链接："}},[a("el-input",{attrs:{size:"mini"},model:{value:e.updatePriceData.goods_url,callback:function(t){e.$set(e.updatePriceData,"goods_url",t)},expression:"updatePriceData.goods_url"}})],1),a("el-form-item",{attrs:{label:"图片链接："}},[a("el-input",{attrs:{size:"mini"},model:{value:e.updatePriceData.sku_image,callback:function(t){e.$set(e.updatePriceData,"sku_image",t)},expression:"updatePriceData.sku_image"}})],1),a("el-form-item",{attrs:{label:"商品价格："}},[a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.updatePriceData.sku_price,callback:function(t){e.$set(e.updatePriceData,"sku_price",t)},expression:"updatePriceData.sku_price"}}),a("span",{staticStyle:{color:"#969393","margin-left":"5px"}},[e._v("RMB")])],1),a("el-form-item",{staticStyle:{"margin-top":"10px"}},[a("el-button",{staticStyle:{"margin-left":"10px",width:"100px"},attrs:{type:"primary",size:"mini"},on:{click:e.updateStockPrice}},[e._v("确 定")])],1)],1)],1)],1)},n=[],i=a("1da1"),s=(a("b680"),a("498a"),a("4ec9"),a("d3b7"),a("3ca3"),a("ddb0"),a("159b"),a("4de4"),a("99af"),a("96cf"),a("d4ec")),c=a("bee2"),o=(a("a9e3"),function(){function e(t){Object(s["a"])(this,e),this._this=t}return Object(c["a"])(e,[{key:"updateStockPrice",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.updateStockDetail",t);case 3:if(a=e.sent,r=JSON.parse(JSON.parse(a).data),200!==Number(r.code)){e.next=7;break}return e.abrupt("return",{code:200});case 7:return e.abrupt("return",{code:Number(r.code),data:"".concat(r.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"改价异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isJsonString",value:function(e){if("string"!==typeof e)return e;try{return JSON.parse(e),JSON.parse(e)}catch(t){return e}}},{key:"getUserInfo",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$appConfig.getUserInfo();case 3:return t=e.sent,e.abrupt("return",{code:200,data:t});case 7:return e.prev=7,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取用户信息异常： ".concat(e.t0)});case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"transferWarehouse",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$appConfig.getGlobalCacheInfo("transferWarehouse",t);case 3:if(a=e.sent,"null"===a){e.next=7;break}return r=JSON.parse(a),e.abrupt("return",{code:200,data:r.warehouse_name});case 7:return e.abrupt("return",{code:200,data:""});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取仓库中文名异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getStock",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$XzyNetMessageService.post("xzy.shopifyV2.get_stock",t);case 3:if(a=e.sent,r=JSON.parse(JSON.parse(a).data),200!==r.code){e.next=7;break}return e.abrupt("return",{code:200,data:r.data});case 7:return e.abrupt("return",{code:r.code,data:"".concat(r.message)});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取国内仓库存列表异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getWarehouseList",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getWarehouseList();case 3:if(t=e.sent,200!==t.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:t.data.data});case 6:return e.abrupt("return",{code:t.data.code,data:"".concat(t.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取仓库异常： ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"temporaryCacheInfo",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,a,r){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$appConfig.temporaryCacheInfo(t,a,r);case 3:if(n=e.sent,i=this.isJsonString(n),null===i||void 0===i||!i.length){e.next=7;break}return e.abrupt("return",{code:200,data:i});case 7:return e.abrupt("return",{code:201});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"获取缓存中转仓异常： ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,a,r){return e.apply(this,arguments)}return t}()}]),e}()),u=a("0e0b"),l={data:function(){return{updatePriceVisible:!1,isShowLoading:!1,ChineseStock:new o(this),total:0,pageSize:30,page:1,updatePriceData:{},tableData:[],widList:[],muid:0,form:{wid:"",sku_id:""}}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getUserInfo();case 2:return t.next=4,e.getWarehouseList();case 4:return t.next=6,e.getStock();case 6:case"end":return t.stop()}}),t)})))()},methods:{updateStockPrice:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.updatePriceData.sku_price){t.next=2;break}return t.abrupt("return",e.$message("价格不能为空"));case 2:return a={},a["wid"]=e.updatePriceData.wid,a["sku_id"]=e.updatePriceData.sku_id,a["sku_name"]=e.updatePriceData.sku_name,a["goods_url"]=e.updatePriceData.goods_url,a["sku_image"]=e.updatePriceData.sku_image,a["sku_price"]=parseFloat(e.updatePriceData.sku_price).toFixed(2),t.next=11,e.ChineseStock.updateStockPrice(a);case 11:r=t.sent,200===r.code?(e.$message.success("商品编辑成功"),e.updatePriceVisible=!1,e.getStock()):e.$message.error(r.data);case 13:case"end":return t.stop()}}),t)})))()},updateStockPriceDia:function(e){this.updatePriceVisible=!0,this.updatePriceData=JSON.parse(JSON.stringify(e))},getStock:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isShowLoading=!0,e.form.page=e.page,e.form.page_size=e.pageSize,e.form.sku_id.trim(),t.next=6,e.ChineseStock.getStock(e.form);case 6:if(a=t.sent,200!==a.code){t.next=22;break}e.tableData=a.data.data,e.total=a.data.total,r=0;case 11:if(!(r<e.tableData.length)){t.next=20;break}return n=e.tableData[r],t.next=15,e.ChineseStock.transferWarehouse(n.wid);case 15:i=t.sent,200===i.code?e.$set(n,"warehouse_name",i.data):e.$set(n,"warehouse_name","");case 17:r++,t.next=11;break;case 20:t.next=23;break;case 22:e.$message.error(a.data);case 23:e.isShowLoading=!1;case 24:case"end":return t.stop()}}),t)})))()},getUserInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ChineseStock.getUserInfo();case 2:a=t.sent,200===a.code?e.muid=a.data.muid:e.$message.error(a.data);case 4:case"end":return t.stop()}}),t)})))()},getWarehouseList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[],r=new Map,t.next=4,e.ChineseStock.temporaryCacheInfo("get","getWarehouseList","");case 4:if(n=t.sent,200!==n.code){t.next=9;break}a=n.data,t.next=20;break;case 9:return t.next=11,e.ChineseStock.getWarehouseList();case 11:if(i=t.sent,200!==i.code){t.next=18;break}return a=i.data,t.next=16,e.ChineseStock.temporaryCacheInfo("save","getWarehouseList",a);case 16:t.next=20;break;case 18:return e.$message.error("".concat(i.data)),t.abrupt("return");case 20:a.forEach((function(t){if(t.user_ids){var a=t.user_ids.some((function(t){return t===e.muid}));a&&e.widList.push(t)}else 2!==t.status&&e.widList.push(t)})),e.widList=e.widList.filter((function(e){return!r.has(e.id)&&r.set(e.id,1)})),e.form.wid=e.widList[0].wid;case 23:case"end":return t.stop()}}),t)})))()},openUrl:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$BaseUtilService.openUrl(e);case 3:a.next=8;break;case 5:a.prev=5,a.t0=a["catch"](0),t.$message.error("打开链接【".concat(e,"】失败"));case 8:case"end":return a.stop()}}),a,null,[[0,5]])})))()},exportTableData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!==e.total){t.next=2;break}return t.abrupt("return",e.$message("暂无导出数据"));case 2:e.isShowLoading=!0,a=[],e.form.sku_id.trim(),r=e.form,r.page_size=200,r.page=1;case 8:if(!(a.length<e.total)){t.next=23;break}return t.next=11,e.ChineseStock.getStock(r);case 11:if(n=t.sent,200!==n.code){t.next=18;break}s=n.data.data,s.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ChineseStock.transferWarehouse(r.wid);case 2:n=t.sent,200===n.code?r.warehouse_name=n.data:r.warehouse_name="",a.push(r);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),r.page++,t.next=21;break;case 18:return e.$message.error("导出数据错误",n.data),e.isShowLoading=!1,t.abrupt("break",23);case 21:t.next=8;break;case 23:c="<tr>\n          <td>仓库名称</td>\n          <td>商品编号(SkuId)</td>\n          <td>商品名称</td>\n          <td>商品规格</td>\n          <td>采购数量</td>\n          <td>仓库库存</td>\n          <td>在途库存</td>\n          <td>总库存</td>\n          <td>占用库存</td>\n          <td>商品单价(RMB)</td>\n          <td>商品图片</td>\n          <td>商品链接</td>\n          <td>货架仓位</td>\n        </td>",a.forEach((function(e){c+="<tr>\n        <td>".concat(e.warehouse_name?e.warehouse_name:"\t","</td>\n        <td style=\"mso-number-format:'@';\">").concat(e.sku_id?e.sku_id:"\t","</td>\n        <td>").concat(e.goods_name?e.goods_name:"\t","</td>\n        <td>").concat(e.sku_name?e.sku_name:"\t","</td>\n        <td>").concat(e.purchase_num?e.purchase_num:"\t","</td>\n        <td>").concat(e.stock?e.stock:"\t","</td>\n        <td>").concat(e.transport_num?e.transport_num:"\t","</td>\n        <td>").concat(e.transport_num&&e.stock?e.transport_num+e.stock:"\t","</td>\n        <td>").concat(e.frozen_num?e.frozen_num:"\t","</td>\n        <td>").concat(e.sku_price?e.sku_price:"\t","</td>\n        <td>").concat(e.sku_image?e.sku_image:"\t","</td>\n        <td>").concat(e.goods_url?e.goods_url:"\t","</td>\n        <td>").concat(e.position_code?e.position_code:"\t","</td>\n        </tr>")})),e.isShowLoading=!1,Object(u["k"])("国内仓库存数据",c);case 27:case"end":return t.stop()}}),t)})))()},allStockTooltip:function(e,t){var a=t.column;return[a.label,e("el-tooltip",{props:{content:"仓库库存+在途库存",placement:"top"}},[e("span",{class:{"el-icon-question":!0}})])]},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.getStock()},handleCurrentChange:function(e){this.page=e,this.getStock()}}},d=l,p=(a("09d7"),a("2877")),m=Object(p["a"])(d,r,n,!1,null,"9020d4c4",null);t["default"]=m.exports},ecb2:function(e,t,a){}}]);