(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cb9f572"],{"3a98":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"detai"},[a("div",{staticClass:"condition"},[a("div",{staticClass:"row"},[a("storeChoose",{attrs:{"is-all":!0,"show-mall":!0},on:{changeMallList:t.changeMallList}}),a("div",{staticClass:"row_item"},[a("label",[t._v("创建时间：")]),a("el-date-picker",{staticStyle:{width:"324px"},attrs:{size:"mini",type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"-","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.cloumn_date1,callback:function(e){t.cloumn_date1=e},expression:"cloumn_date1"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"row_item"},[a("label",[t._v("售后状态：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.query.shotOrderStatus,callback:function(e){t.$set(t.query,"shotOrderStatus",e)},expression:"query.shotOrderStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"取消中",value:"5"}}),a("el-option",{attrs:{label:"已取消",value:"6"}}),a("el-option",{attrs:{label:"退货退款中",value:"7"}}),a("el-option",{attrs:{label:"退款成功",value:"9"}}),a("el-option",{attrs:{label:"退款失败",value:"10"}})],1)],1),a("div",{staticClass:"row_item"},[a("label",[t._v("采购状态：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:t.query.refundStatus,callback:function(e){t.$set(t.query,"refundStatus",e)},expression:"query.refundStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"待拍单",value:"1"}}),a("el-option",{attrs:{label:"拍单中",value:"2"}}),a("el-option",{attrs:{label:"拍单成功",value:"3"}}),a("el-option",{attrs:{label:"拍单失败",value:"4"}})],1)],1),a("div",{staticClass:"row_item"},[a("label",[t._v("颜色标识：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:t.query.colorLabelId,callback:function(e){t.$set(t.query,"colorLabelId",e)},expression:"query.colorLabelId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.colorLogoList,(function(t){return a("el-option",{key:t.id,style:t.color,attrs:{label:t.label,value:t.id}})}))],2)],1),a("div",{staticClass:"row_item"},[a("label",[t._v("申请时间：")]),a("el-date-picker",{staticStyle:{width:"324px"},attrs:{size:"mini",type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"-","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.cloumn_date2,callback:function(e){t.cloumn_date2=e},expression:"cloumn_date2"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"row_item"},[a("el-select",{staticStyle:{width:"120px","margin-right":"3px"},attrs:{size:"mini"},on:{change:function(e){t.inputDes=""}},model:{value:t.selType,callback:function(e){t.selType=e},expression:"selType"}},[a("el-option",{attrs:{label:"订单编号",value:"1"}}),a("el-option",{attrs:{label:"采购物流单号",value:"2"}}),a("el-option",{attrs:{label:"采购单号",value:"3"}})],1),a("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:""},model:{value:t.inputDes,callback:function(e){t.inputDes=e},expression:"inputDes"}})],1),a("div",{staticClass:"row_item"},[a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"row",staticStyle:{"margin-top":"10px"}},[a("div",{staticClass:"row_item"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.setShotStatusFun}},[t._v("采购状态变更")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.optionOrder("reject")}}},[t._v("批量拒绝买家取消订单")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.setColorLabelFun}},[t._v("批量标记颜色标识")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.optionOrder("accept")}}},[t._v("批量接受买家取消订单")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.tableToExcel}},[t._v("导出数据")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("售后同步")]),a("el-checkbox",{staticClass:"row_item",model:{value:t.mall_compare,callback:function(e){t.mall_compare=e},expression:"mall_compare"}},[t._v("全店同步")]),a("el-checkbox",{model:{value:t.shoeLog,callback:function(e){t.shoeLog=e},expression:"shoeLog"}},[t._v("隐藏日志")])],1)])]),a("div",{staticClass:"table-form"},[a("el-table",{ref:"multipleTable",attrs:{width:"100%",height:"calc(100vh - 213px)",data:t.tableList,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{label:"站点",prop:"country","min-width":"100px",fixed:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("span",[t._v(t._s(t._f("chineseSite")(o.mall_info.country)))])]}}])}),a("el-table-column",{attrs:{label:"店铺名称",prop:"mall_info.platform_mall_name","min-width":"120px",fixed:"",align:"center"}}),a("el-table-column",{attrs:{label:"颜色标识",prop:"colorText","min-width":"100px",align:"center"}}),a("el-table-column",{attrs:{label:"订单编号",prop:"order_sn","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("span",[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(e){return t.open("itemDetail",o.goods_info.goods_id,o.mall_info.platform_mall_id,"orderID")}}},[t._v(" "+t._s(o.order_sn)+" ")]),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(o.order_sn)}}},[a("i",{staticClass:"el-icon-document-copy"})])],1)]}}])}),a("el-table-column",{attrs:{label:"退款金额",prop:"refund_amount","min-width":"100px",align:"center"}}),a("el-table-column",{attrs:{label:"售后状态",prop:"status","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("div",[t._v(t._s(t.sta[o.status]))])]}}])}),a("el-table-column",{attrs:{label:"申请时间",prop:"update_time","min-width":"180px",align:"center"}}),a("el-table-column",{attrs:{label:"采购状态",prop:"shot_order_info.shot_status","min-width":"90px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("span",[t._v(t._s(t.shot_status[o.shot_order_info.shot_status]))])]}}])}),a("el-table-column",{attrs:{label:"售后原因",prop:"after_reason","min-width":"100px",align:"center"}}),a("el-table-column",{attrs:{label:"本地备注",prop:"remark","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[o.isChecked?a("el-input",{directives:[{name:"fo",rawName:"v-fo"}],attrs:{size:"mini",resize:"none",placeholder:"本地备注"},on:{blur:function(e){return t.changeRemark(o)}},model:{value:o.remark,callback:function(e){t.$set(o,"remark",e)},expression:"row.remark"}}):a("span",{on:{click:function(t){o.isChecked=!0}}},[a("el-input",{attrs:{disabled:!o.isChecked,size:"mini"},model:{value:o.remark,callback:function(e){t.$set(o,"remark",e)},expression:"row.remark"}})],1)]}}])}),a("el-table-column",{attrs:{label:"商品ID",prop:"goods_info.goods_id","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("span",[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(e){return t.open(null,o.goods_info.goods_id,o.mall_info.platform_mall_id,"goodsID")}}},[t._v(" "+t._s(o.goods_info.goods_id)+" ")]),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(o.goods_info.goods_id)}}},[a("i",{staticClass:"el-icon-document-copy"})])],1)]}}])}),a("el-table-column",{attrs:{label:"商品数量",prop:"goods_info.goods_count","min-width":"150px",align:"center"}}),a("el-table-column",{attrs:{label:"商品图片",prop:"goods_info.goods_img","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([o.country,o.goods_info.ori_platform_mall_id,o.goods_info.goods_img])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("imageRender")([o.country,o.goods_info.ori_platform_mall_id,o.goods_info.goods_img])}})],1)]}}])}),a("el-table-column",{attrs:{label:"商品类目",prop:"goods_info.goods_category_id","min-width":"100px",align:"center"}}),a("el-table-column",{attrs:{label:"商品规格",prop:"goods_info.goods_spec","min-width":"100px",align:"center"}}),a("el-table-column",{attrs:{label:"采购商品ID",prop:"goods_info.ori_goods_id","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[o.goods_info.ori_goods_id?a("span",[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(e){return t.open(null,o.goods_info.goods_id,null,"orderGoodsID")}}},[t._v(" "+t._s(o.goods_info.ori_goods_id)+" ")]),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(o.goods_info.ori_goods_id)}}},[a("i",{staticClass:"el-icon-document-copy"})])],1):t._e()]}}])}),a("el-table-column",{attrs:{label:"采购订单号",prop:"shot_order_info.shot_order_sn","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[o.shot_order_info.shot_order_sn?a("span",[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(e){return t.getorderDetail(o)}}},[t._v(" "+t._s(o.shot_order_info.shot_order_sn)+" ")]),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(o.shot_order_info.shot_order_sn)}}},[a("i",{staticClass:"el-icon-document-copy"})])],1):t._e()]}}])}),a("el-table-column",{attrs:{label:"采购时间",prop:"shot_order_info.shotted_at","min-width":"180px",align:"center"}}),a("el-table-column",{attrs:{label:"采购物流单号",prop:"shot_order_info.shot_tracking_number","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[o.shot_order_info.shot_tracking_number?a("span",[t._v(t._s(o.shot_order_info.shot_tracking_number)+" "),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(e){return t.copy(o.shot_order_info.shot_tracking_number)}}},[a("i",{staticClass:"el-icon-document-copy"})])],1):t._e()]}}])}),a("el-table-column",{attrs:{label:"采购账号",prop:"shot_order_info.buy_account","min-width":"180px",align:"center"}}),a("el-table-column",{attrs:{label:"订单创建时间",prop:"after_created_at","min-width":"180px",align:"center"}}),a("el-table-column",{attrs:{label:"退货物流号",prop:"return_tracking_number","min-width":"180px",align:"center"}}),a("el-table-column",{attrs:{label:"退货地址",prop:"return_address","min-width":"200px",align:"center"}}),a("el-table-column",{attrs:{label:"退货邮寄地址",prop:"return_pickup_address","min-width":"200px",align:"center"}}),a("el-table-column",{attrs:{label:"操作状态",prop:"","min-width":"150px",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("el-dropdown",{staticStyle:{width:"100px","margin-left":"10px"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",plain:"",type:"primary"}},[t._v(" 更多操作"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[a("div",{staticClass:"dropdownItem",on:{click:function(e){return t.delGoods(o)}}},[t._v("删除商品")])]),a("el-dropdown-item",[a("div",{staticClass:"dropdownItem",on:{click:function(e){return t.deList(o)}}},[t._v("下架商品")])]),a("el-dropdown-item",[a("div",{staticClass:"dropdownItem",on:{click:function(e){t.shotVisible=!0,t.rowData=o}}},[t._v("修改采购状态")])]),a("el-dropdown-item",[a("div",{staticClass:"dropdownItem"},[t._v("同步此店铺售后订单")])]),a("el-dropdown-item",[a("div",{staticClass:"dropdownItem",on:{click:function(e){t.colorVisible=!0,t.rowData=o}}},[t._v("订单颜色标识")])])],1)],1)]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{background:"","current-page":t.query.page,"page-sizes":[20,50,100,200],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.query,"page",e)},"update:current-page":function(e){return t.$set(t.query,"page",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{staticClass:"dialog-color",attrs:{title:"标记颜色标识",width:"400px",top:"6vh","close-on-press-escape":!1,"close-on-click-modal":!1,visible:t.colorVisible},on:{"update:visible":function(e){t.colorVisible=e},closed:t.closeDialog}},[a("div",{staticClass:"color-dialog"},[a("div",{staticClass:"form-item"},[a("span",{staticClass:"search-title"},[t._v("颜色标识：")]),a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",clearable:""},model:{value:t.colorLabelId1,callback:function(e){t.colorLabelId1=e},expression:"colorLabelId1"}},t._l(t.colorLogoList,(function(t){return a("el-option",{key:t.id,style:t.color,attrs:{label:t.label,value:t.id}})})),1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.setColorLabel}},[t._v("保存")])],1)])]),a("el-dialog",{staticClass:"dialog-color",attrs:{title:"采购状态变更",width:"300px",top:"6vh","close-on-press-escape":!1,"close-on-click-modal":!1,visible:t.shotVisible},on:{"update:visible":function(e){t.shotVisible=e},closed:t.closeDialog}},[a("div",{staticClass:"color-dialog"},[a("div",{staticClass:"form-item"},[a("span",{staticClass:"search-title"},[t._v("状态：")]),a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",clearable:""},model:{value:t.shotstatus,callback:function(e){t.shotstatus=e},expression:"shotstatus"}},t._l(t.shotstatusList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.setShotStatus}},[t._v("保存")])],1)])])],1)},n=[],r=a("1da1"),i=(a("a9e3"),a("ac1f"),a("841c"),a("159b"),a("b0c0"),a("99af"),a("5319"),a("d3b7"),a("25f0"),a("a15b"),a("96cf"),a("d4ec")),s=a("bee2"),l=function(){function t(e){Object(i["a"])(this,t),this._this=e,this.mallList=[]}return Object(s["a"])(t,[{key:"refuseCancerOrder",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,o,n,r,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=e.type,o=e.order_id,n=e.country,r=e.platform_mall_id,i={action:a,order_id:o,mallId:r},t.next=5,this._this.$shopeemanService.postChinese(n,"/api/v3/order/respond_cancel_request/?",i,{headers:{referer:"/portal/sale/88860579400074","Content-Type":"application/json"}});case 5:return s=t.sent,t.abrupt("return",{code:s.errcode,data:"".concat(s.errcode," ").concat(s.message)});case 9:return t.prev=9,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"getMallGoodsAmount-catch: ".concat(t.t0)});case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"deleteProduct",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,o,n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=e.country,o=e.platform_mall_id,n=e.product_id_list,r={mallId:o,product_id_list:n,version:"3.1.0"},t.next=5,this._this.$shopeemanService.postChinese(a,"/api/v3/product/delete_product/?",r,{headers:{"Content-Type":"application/json;charset=UTF-8"}});case 5:if(i=t.sent,i=JSON.parse(JSON.parse(i).data),0!==i.code){t.next=9;break}return t.abrupt("return",{code:200,data:i.data});case 9:return t.abrupt("return",{code:i.errcode,data:"".concat(i.errcode," ").concat(i.message)});case 12:return t.prev=12,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"deleteProduct-catch: ".concat(t.t0)});case 15:case"end":return t.stop()}}),t,this,[[0,12]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"deListProduct",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,o,n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=e.country,o=e.platform_mall_id,n=e.product_id_list,r={mallId:o,product_id_list:n,version:"3.1.0",source:"seller_center"},t.next=5,this._this.$shopeemanService.postChinese(a,"/api/v3/product/update_product/?",r,{headers:{"Content-Type":"application/json;charset=UTF-8"}});case 5:if(i=t.sent,i=JSON.parse(JSON.parse(i).data),0!==i.code){t.next=9;break}return t.abrupt("return",{code:200,data:i.data});case 9:return t.abrupt("return",{code:i.errcode,data:"".concat(i.errcode," ").concat(i.message)});case 12:return t.prev=12,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"delListProduct-catch: ".concat(t.t0)});case 15:case"end":return t.stop()}}),t,this,[[0,12]])})));function e(e){return t.apply(this,arguments)}return e}()}]),t}(),c=a("feb6"),d=a("0e0b"),u={components:{storeChoose:c["a"]},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},orderRemark:"",activeRemarkID:0,shotVisible:!1,shotstatus:"",shotstatusList:[{label:"待拍单",value:1},{label:"拍单中",value:2},{label:"拍单成功",value:3},{label:"拍单失败",value:4},{label:"待支付",value:5},{label:"已完成",value:6},{label:"已取消",value:7},{label:"已申请退款",value:8},{label:"退款成功",value:9},{label:"付款失败",value:10}],sta:{5:"取消中",6:"已取消",7:"退货退款中",9:"退款成功",10:"退款失败"},shot_status:{1:"待拍单",2:"拍单中",3:"拍单完成，待上家发货",4:"上家已发货",5:"待支付",6:"已完成",7:"已取消",8:"已申请退款",9:"退款成功",10:"付款失败"},rowData:"",multipleSelection:[],colorVisible:!1,colorLabelId1:"",colorLogoList:[],mall_compare:!1,shoeLog:!1,selType:"1",inputDes:"",cloumn_date1:[],cloumn_date2:[],query:{sysMallIds:"",cerateTime:"",saleStatus:"",refundStatus:"",color:"",orderSn:"",trackingNumber:"",shotOrderSn:"",shotOrderStatus:"",afterApplyTime:"",createdTime:"",colorLabelId:"",page:1,pageSize:20},total:0,tableList:[],loading:!1,orderInstance:new l(this),buyerAccountList:[]}},created:function(){this.getInfo(),this.getBuyerList()},methods:{editRemark:function(t,e){this.activeRemarkID=e,this.orderRemark=this.tableList[t].remark},changeRemark:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isChecked=!1,a.next=3,e.$api.orderSaveRemark({id:t.order_id,remark:t.remark});case 3:if(o=a.sent,200===o.data.code){a.next=7;break}return e.$message.error("修改失败:".concat(o.data.message),!1),a.abrupt("return");case 7:e.$message.success("修改成功",!0);case 8:case"end":return a.stop()}}),a)})))()},deList:function(t){var e=this;this.$confirm("是否下架该商品","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.deListFun(t)}))},deListFun:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var o,n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return o=[{id:Number(t.goods_info.goods_id),unlisted:!0}],n={country:t.country,platform_mall_id:t.mall_info.platform_mall_id,product_id_list:o},e.loading=!0,a.next=5,e.orderInstance.deListProduct(n);case 5:r=a.sent,e.loading=!1,200===r.code?e.$message.success("下架成功"):e.$message.error(r.data),e.search();case 9:case"end":return a.stop()}}),a)})))()},open:function(t,e,a,o){if("orderID"===o){var n={type:t,shopId:a,id:e};this.$BaseUtilService.getOrderDetailInfo(a,JSON.stringify(n))}"goodsID"===o&&window.BaseUtilBridgeService.openUrl("https://id.xiapibuy.com/product/"+a+"/"+e),"orderGoodsID"===o&&window.BaseUtilBridgeService.openUrl("http://mobile.yangkeduo.com/goods.html?goods_id="+e)},getBuyerList:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getBuyerList();case 2:a=e.sent,200===a.data.code&&(t.buyerAccountList=a.data.data);case 4:case"end":return e.stop()}}),e)})))()},getorderDetail:function(t){if(t.shot_order_info.buy_account_info){var e=null;this.buyerAccountList.forEach((function(a){a.name===t.shot_order_info.buy_account_info.name&&a.type===t.shot_order_info.buy_account_info.name&&(e=a)}));var a=this.changeAccountParams(e);this.changeType(a),this.changeAccountParams(a)}else this.$message.warning("云端没有此账户信息，请让拍单人员上传或登录")},changeType:function(t){switch(t){case 1:return 1;case 2:return 0;case 8:return 5;case 10:return 3;case 9:return 7;case 11:return 8;default:return t}},changeAccountParams:function(t){var e={UserNameCache:t.cache_path,Password:"",shotOrderPlatform:this.changeType(t.type),LoginedCookies:t.login_info,UserName:t.name,Cookiestr:JSON.stringify(t.login_info),AccountType:t.type,Ua:t.ua,Country:t.site||""};return e},delGoods:function(t){var e=this;this.$confirm("是否要删除该商品","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.delGoodsFun(t)}))},delGoodsFun:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var o,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return o={country:t.country,platform_mall_id:t.mall_info.platform_mall_id,product_id_list:[Number(t.goods_info.goods_id)]},e.loading=!0,a.next=4,e.orderInstance.deleteProduct(o);case 4:n=a.sent,e.loading=!1,200===n.code?e.$message.success("删除成功"):e.$message.error(n.data),e.search();case 8:case"end":return a.stop()}}),a)})))()},optionOrder:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$message.warning("暂无需要处理的数据");case 1:case"end":return t.stop()}}),t)})))()},initDate:function(){var t=new Date,e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" 00:00:00",a=t.getFullYear()+"-"+t.getMonth()+"-"+t.getDate()+" 23:59:59";this.cloumn_date2=[a,e]},tableToExcel:function(){var t=this;if(this.multipleSelection.length){var e=1,a="<tr><td>编号</td><td>站点</td><td>店铺名称</td><td>颜色标识</td><td>订单标识</td><td>订单编号</td><td>退款金额</td><td>售后状态</td><td>申请时间</td><td>售后原因</td><td>本地备注</td><td>采购状态</td>\n            <td>商品ID</td><td>商品数量</td><td>商品图片</td><td>商品类目</td><td>商品规格</td><td>采购商品ID</td><td>采购订单号</td>\n            <td>采购时间</td><td>采购物流单号</td><td>采购账号</td><td>订单创建时间</td>\n            <td>退货物流号</td><td>退货地址</td><td>退货邮寄地址</td>\n            </tr>",o=this.multipleSelection;o.forEach((function(o){a+="<tr><td>".concat(e++,"</td>\n                <td>").concat(o.mall_info&&o.mall_info.country?t.$filters.chineseSite(o.mall_info.country):"\t","</td>\n                <td>").concat(o.mall_info&&o.mall_info.platform_mall_name?o.mall_info.platform_mall_name:"\t","</td>\n                <td>").concat(o.colorText?o.colorText:"-\t","</td>\n                <td style=\"mso-number-format:'@';\">").concat(o.order_sn?o.order_sn:"\t","</td>\n                <td>").concat(o.refund_amount?o.refund_amount:"\t","</td>\n                <td>").concat(o.status?t.sta[o.status]:"\t","</td>\n                <td>").concat(o.update_time?o.update_time:"\t","</td>\n                <td>").concat(o.after_reason?o.after_reason:"\t","</td>\n                <td>").concat(o.remark?o.remark:"\t","</td>\n                <td>").concat(o.shot_order_info&&o.shot_order_info.shot_statu?t.shot_status[o.shot_order_info.shot_status]:"\t","</td>\n                <td>").concat(o.goods_info.goods_id?o.goods_info.goods_id:"\t","</td>\n                <td>").concat(o.goods_info.goods_count?o.goods_info.goods_count:"\t","</td>\n                <td>").concat(t.$filters.imageRender([o.platform,o.shopid,o.image])+"\t","</td>\n                <td>").concat(o.goods_info.goods_category_id?o.goods_info.goods_category_id:"\t","</td>\n                <td>").concat(o.goods_info.goods_spec?o.goods_info.goods_spec:"\t","</td>\n                <td>").concat(o.shot_order_info.shot_order_sn?o.shot_order_info.shot_order_sn:"\t","</td>\n                <td>").concat(o.shot_order_info.shotted_at?o.shot_order_info.shotted_at:"\t","</td>\n                <td>").concat(o.shot_order_info.shot_tracking_number?o.shot_order_info.shot_tracking_number:"\t","</td>\n                 <td>").concat(o.shot_order_info.buy_account?o.shot_order_info.buy_account:"\t","</td>\n              <td>").concat(o.after_created_at?o.after_created_at:"\t","</td>\n               <td>").concat(o.return_tracking_number?o.return_tracking_number:"\t","</td>\n               <td>").concat(o.return_address?o.return_address:"\t","</td>\n               <td>").concat(o.return_pickup_address?o.return_pickup_address:"\t","</td>\n                </tr>")})),Object(d["h"])("虾皮售后数据",a),this.setSelect()}else this.$message.warning("请选择要导出的数据")},generateUUID:function(){var t=(new Date).getTime();window.performance&&"function"===typeof window.performance.now&&(t+=performance.now());var e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var a=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?a:3&a|8).toString(16)}));return e},handleSelectionChange:function(t){this.multipleSelection=t},indexMethod:function(t){return t=t+1+(this.page-1)*this.pageSize,t},setShotStatusFun:function(){this.multipleSelection.length?this.shotVisible=!0:this.$message.warning("请勾选需要操作的数据")},setShotStatus:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,o,n,r,i,s,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.shotstatus){e.next=3;break}return t.$message.warning("请选择变更状态"),e.abrupt("return");case 3:return t.isLoading=!0,a=[],o={sysOrderIds:"",status:t.shotstatus},""===t.rowData?(t.multipleSelection.forEach((function(t){a.push(t.sys_order_id)})),o.sysOrderIds=a.toString()||""):o.sysOrderIds=t.rowData.sys_order_id,e.prev=7,e.next=10,t.$api.updateShotStatus(o);case 10:if(n=e.sent,r=n.data,200!==r.code){e.next=16;break}t.$message.success("操作成功"),e.next=27;break;case 16:i="",s=0;case 18:if(!(s<r.data.length)){e.next=26;break}if(l=r.data[s],200===l.code){e.next=23;break}return i=l.message,e.abrupt("break",26);case 23:s++,e.next=18;break;case 26:t.$message.warning(i);case 27:t.shotVisible=!1,t.isLoading=!1,t.setSelect(),t.search(),t.rowData="",e.next=39;break;case 34:e.prev=34,e.t0=e["catch"](7),t.setSelect(),t.shotVisible=!1,t.isLoading=!1;case 39:case"end":return e.stop()}}),e,null,[[7,34]])})))()},setColorLabelFun:function(){this.multipleSelection.length?this.colorVisible=!0:this.$message.warning("请勾选需要操作的数据")},setColorLabel:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,o,n,r,i,s,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.colorLabelId1){e.next=3;break}return t.$message.warning("请选择要标记的颜色"),e.abrupt("return");case 3:return t.isLoading=!0,a=[],o={sysOrderIds:"",id:t.colorLabelId1},""===t.rowData?(t.multipleSelection.forEach((function(t){a.push(t.sys_order_id)})),o.sysOrderIds=a.toString()||""):o.sysOrderIds=t.rowData.sys_order_id,e.prev=7,e.next=10,t.$api.setColorLabel(o);case 10:if(n=e.sent,r=n.data,200!==r.code){e.next=16;break}t.$message.success("操作成功"),e.next=27;break;case 16:i="",s=0;case 18:if(!(s<r.data.length)){e.next=26;break}if(l=r.data[s],200===l.code){e.next=23;break}return i=l.message,e.abrupt("break",26);case 23:s++,e.next=18;break;case 26:t.$message.warning(i);case 27:t.colorVisible=!1,t.isLoading=!1,t.setSelect(),t.search(),t.rowData="",e.next=39;break;case 34:e.prev=34,e.t0=e["catch"](7),t.setSelect(),t.colorVisible=!1,t.isLoading=!1;case 39:case"end":return e.stop()}}),e,null,[[7,34]])})))()},closeDialog:function(){this.setSelect(),this.colorLabelId1=this.colorLogoList[0].id||"",this.colorVisible=!1,this.shotstatus="",this.shotVisible=!1},setSelect:function(){var t=this;this.tableList.forEach((function(e){t.$refs.multipleTable.toggleRowSelection(e,!1)}))},getInfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.initDate(),Object(d["d"])().then((function(e){t.colorLogoList=e})),Object(d["m"])().then((function(e){t.shopAccountList=e,t.query.sysMallIds=[],t.shopAccountList.forEach((function(e){t.query.sysMallIds.push(e.id)})),t.search()}));case 3:case"end":return e.stop()}}),e)})))()},changeMallList:function(t){var e=this;this.query.sysMallIds=[],t.forEach((function(t){e.query.sysMallIds.push(t.id)}))},search:function(){this.query.orderSn="",this.query.trackingNumber="",this.query.shotOrderSn="",1===Number(this.selType)&&(this.query.orderSn=this.inputDes),2===Number(this.selType)&&(this.query.trackingNumber=this.inputDes),3===Number(this.selType)&&(this.query.shotOrderSn=this.inputDes),this.query.createdTime=this.cloumn_date1&&this.cloumn_date1.length>0?this.cloumn_date1.join("/").toString():"",this.query.afterApplyTime=this.cloumn_date2&&this.cloumn_date2.length>0?this.cloumn_date2.join("/").toString():"";var t=this.query;t.sysMallIds=this.query.sysMallIds.toString()||"",this.getTableList(t)},getTableList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var o,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.loading=!0,e.tableList=[],a.prev=2,a.next=5,e.$api.aftermarket(t);case 5:o=a.sent,200===o.status?(n=o.data.data.data||[],n.forEach((function(t){t.colorText=Object(d["n"])(e.colorLogoList,"label","id",t.color_id)||"-",t.isChecked=!1})),e.tableList=n,e.query.page=o.data.data.current_page,e.total=o.data.data.total):e.$message.error("数据请求失败"),e.loading=!1,a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](2),e.loading=!1;case 13:case"end":return a.stop()}}),a,null,[[2,10]])})))()},handleSizeChange:function(t){this.query.pageSize=t,this.search()},handleCurrentChange:function(t){this.query.page=t,this.search()},copy:function(t){var e=document.createElement("div");e.id="tempTarget",e.style.opacity="0",e.innerText=t,document.body.appendChild(e);try{var a=document.createRange();a.selectNode(e),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(o){}e.parentElement.removeChild(e)}}},p=u,h=(a("ec42"),a("2877")),m=Object(h["a"])(p,o,n,!1,null,null,null);e["default"]=m.exports},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},b34e:function(t,e,a){},ec42:function(t,e,a){"use strict";a("b34e")},feb6:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,o){return t.showMall(e,o)?a("el-option",{key:o,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},n=[],r=a("1da1"),i=a("2909"),s=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),l=a("2b0e");l["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this),isShowName:"",showNumber:100,showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var o=e.indexOf("")>-1,n=t.indexOf("")>-1;o!==n?this.groupId=n?[""].concat(Object(i["a"])(this.groupIdList.map((function(t){return t.id})))):[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var o=e.indexOf("")>-1,n=t.indexOf("")>-1;o!==n?this.site=n?[""].concat(Object(i["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,o,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,o=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:o},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:r=t.sent,200===r.code?(e.siteList=r.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(o){if(o){var n=t.siteList.find((function(t){return t.platform_mall_id===o}));e.push(n),a+=o+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-100;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(i["a"])(e),Object(i["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,o=this.site.length<10&&this.site.includes(t.platform_mall_id);return o||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){var a=0;t?(a=this.mallShowIndex+10,a=a<=this.showMallNumber&&a||this.showMallNumber):(a=this.mallShowIndex-10,a=a>=0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}},d=c,u=(a("8992"),a("2877")),p=Object(u["a"])(d,o,n,!1,null,null,null);e["a"]=p.exports}}]);