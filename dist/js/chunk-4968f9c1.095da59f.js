(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4968f9c1"],{"4c28":function(e,t,n){},"60d9":function(e,t,n){},8992:function(e,t,n){"use strict";n("4c28")},ed4b:function(e,t,n){"use strict";n("60d9")},ef52:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"delivery-manager"},[n("div",{staticClass:"selectBox"},[n("div",{staticClass:"left-box mar-right"},[n("div",{staticClass:"base-box"},[n("span",{staticClass:"base-title"},[e._v("基础操作")]),n("div",{staticClass:"base-item base-left"},[n("el-row",{staticClass:"row-style"},[n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:e.syncSurfaceBefore}},[e._v("批量同步面单信息")]),n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.batnchDownLoad(e.multipleSelection,"down")}}},[e._v("批量下载平台面单")])],1),n("el-row",{staticClass:"row-style"},[n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.batnchDownLoad(e.multipleSelection,"view")}}},[e._v("批量预览打印平台面单")]),n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:e.getExportData}},[e._v("导出数据")])],1),n("el-row",{staticClass:"row-style"},[n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:e.downTWface}},[e._v("批量打印台湾虚拟面单")]),n("el-button",{staticClass:"btnWidth",attrs:{size:"mini",type:"primary"},on:{click:e.downLoadPickList}},[e._v("批量下载拣货单")])],1)],1)])]),n("div",{staticClass:"right-box"},[n("div",{staticClass:"base-box"},[n("span",{staticClass:"base-title"},[e._v("列表筛选操作")]),n("div",{staticClass:"base-item"},[n("el-row",{staticClass:"row-style"},[n("storeChoose",{attrs:{"is-all":!0,spanWidth:"90px",selectWidth:"180px",source:"orderCenter"},on:{changeMallList:e.changeMallList}}),n("div",{staticClass:"tool-item"},[n("span",[e._v("创建时间：")]),n("el-date-picker",{staticStyle:{width:"300px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:function(t){return e.changeTime(t,"createTime")}},model:{value:e.createTime,callback:function(t){e.createTime=t},expression:"createTime"}})],1)],1),n("el-row",{staticClass:"row-style"},[n("div",{staticClass:"tool-item mar-right"},[n("span",[e._v("发货状态：")]),n("el-select",{staticClass:"inputBox",attrs:{placeholder:"",size:"mini"},model:{value:e.selectForm.orderStatus,callback:function(t){e.$set(e.selectForm,"orderStatus",t)},expression:"selectForm.orderStatus"}},[n("el-option",{attrs:{label:"全部",value:""}}),e._l(e.orderStatusList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),n("div",{staticClass:"tool-item mar-right"},[n("span",[e._v("物流单号：")]),n("el-select",{staticClass:"inputBox",attrs:{placeholder:"",size:"mini"},model:{value:e.selectForm.hasTrackingNo,callback:function(t){e.$set(e.selectForm,"hasTrackingNo",t)},expression:"selectForm.hasTrackingNo"}},[n("el-option",{attrs:{label:"全部",value:""}}),n("el-option",{attrs:{label:"已申请",value:"1"}}),n("el-option",{attrs:{label:"未申请",value:"2"}})],1)],1),n("div",{staticClass:"tool-item mar-right"},[n("span",[e._v("面单下载状态：")]),n("el-select",{staticClass:"inputBox",attrs:{placeholder:"",size:"mini"},model:{value:e.selectForm.isPrint,callback:function(t){e.$set(e.selectForm,"isPrint",t)},expression:"selectForm.isPrint"}},[n("el-option",{attrs:{label:"全部",value:""}}),n("el-option",{attrs:{label:"已下载",value:"1"}}),n("el-option",{attrs:{label:"未下载",value:"2"}})],1)],1),n("div",{staticClass:"tool-item mar-right"},[n("span",[e._v("截止时间：")]),n("el-date-picker",{staticStyle:{width:"300px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){return e.changeTime(t,"shipByDate")}},model:{value:e.shipByDate,callback:function(t){e.shipByDate=t},expression:"shipByDate"}})],1)]),n("el-row",{staticClass:"row-style"},[n("div",{staticClass:"tool-item mar-right"},[n("span",[e._v("订单编号：")]),n("el-input",{staticClass:"inputBox",attrs:{size:"mini",clearable:""},model:{value:e.selectForm.orderSn,callback:function(t){e.$set(e.selectForm,"orderSn",t)},expression:"selectForm.orderSn"}})],1),n("el-button",{staticClass:"mar-right",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.getOrderList(1)}}},[e._v("搜索")]),n("el-button",{staticClass:"mar-right",attrs:{size:"mini",type:"primary"},on:{click:function(t){e.goodsSearchVisible=!0}}},[e._v("订单号批量查询")]),n("el-button",{staticClass:"mar-right",attrs:{size:"mini",type:"primary"},on:{click:e.openBefore}},[e._v("批量添加本地备注")]),n("el-checkbox",{staticClass:"mar-right",model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")]),n("p",{staticClass:"tableActive"},[e._v("同步和打印台湾站的面单信息（除711外），请走代理")])],1)],1)])])]),n("div",{staticClass:"content"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableData,"tooltip-effect":"dark",height:"calc(100vh - 257px)"},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),n("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",fixed:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s((e.currentPage-1)*e.pageSize+t.$index+1))]}}])}),n("el-table-column",{attrs:{prop:"order_sn",label:"订单编号","min-width":"170px",fixed:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("i",{staticClass:"el-icon-document-copy copyStyle",on:{click:function(n){return e.copyItem(t.row.order_sn)}}}),n("span",{staticClass:"tableActive",on:{click:function(n){return e.viewDetails("orderDetail",t.row.order_id,t.row.mall_info.platform_mall_id)}}},[e._v(e._s(t.row.order_sn))])]}}])}),n("el-table-column",{attrs:{"min-width":"80px",label:"站点",prop:"country",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.mall_info?[e._v(e._s(e._f("chineseSite")(t.row.mall_info.country)))]:void 0}}],null,!0)}),n("el-table-column",{attrs:{label:"店铺名称",prop:"mall_info.platform_mall_name","min-width":"120px",align:"center","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{align:"center",label:"商品数量","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.goods_count))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"123456",label:"商品详情","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.openGoodsDetail(t.row)}}},[e._v("商品详情")])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"created_time",label:"订单创建时间","min-width":"140"}}),n("el-table-column",{attrs:{align:"center",prop:"ship_by_date",label:"截止发货时间","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.ship_by_date))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"ship_by_date",label:"是否已申请物流单号","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("p",{style:{color:""==t.row.tracking_no?"red":"green"}},[e._v(e._s(""==t.row.tracking_no?"未申请":"已申请"))])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"ship_by_date",label:"是否同步面单信息","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("p",{style:{color:0==t.row.hasLogistics?"red":"green"}},[e._v(e._s(0==t.row.hasLogistics?"否":"是"))])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"order_status",label:"发货状态","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("p",{style:{color:e.changeOrderStatus(t.row.order_status,"color")}},[e._v(e._s(e.changeOrderStatus(t.row.order_status)))])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"logistics_name",label:"虾皮物流","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.logistics_name))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"tracking_no",label:"虾皮物流单号","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.tracking_no))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"remark",label:"本地备注","min-width":"120","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{directives:[{name:"show",rawName:"v-show",value:!(t.row.id===e.activeRemarkID),expression:"!(scope.row.id === activeRemarkID ? true : false)"}],staticStyle:{cursor:"pointer"},on:{click:function(n){return e.editRemark(t.$index,t.row.id)}}},[n("el-input",{attrs:{disabled:"",size:"mini"},model:{value:t.row.remark,callback:function(n){e.$set(t.row,"remark",n)},expression:"scope.row.remark"}})],1),t.row.id===e.activeRemarkID?n("el-input",{attrs:{size:"mini"},on:{blur:function(n){return e.changeRemark(t.row.id,t.$index)}},model:{value:e.orderRemark,callback:function(t){e.orderRemark=t},expression:"orderRemark"}}):e._e()]}}])}),n("el-table-column",{attrs:{align:"center",prop:"note",label:"shopee备注","min-width":"100","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.note))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"note",label:"是否已下载面单","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("1"==t.row.is_print?"已下载":"未下载"))]}}])}),n("el-table-column",{attrs:{label:"操作",prop:"","min-width":"150px",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-dropdown",{staticStyle:{width:"100px","margin-left":"10px"}},[n("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",plain:"",type:"primary"}},[e._v(" 更多操作"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[n("div",{staticClass:"dropdownItem",on:{click:function(n){return e.syncFaceDataSingle(t.row)}}},[e._v("同步面单信息")])]),n("el-dropdown-item",[n("div",{staticClass:"dropdownItem",on:{click:function(n){return e.batnchDownLoad([t.row],"view")}}},[e._v("面单预览")])]),n("el-dropdown-item",[0!=t.row.hasLogistics?n("div",{staticClass:"dropdownItem",on:{click:function(n){return e.batnchDownLoad([t.row],"down")}}},[e._v("下载面单")]):e._e()])],1)],1)]}}])})],1),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"","page-sizes":[20,50,100],"page-size":e.pageSize,"current-page":e.currentPage,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1),n("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}}),n("el-dialog",{attrs:{title:"商品详情",visible:e.goodsListVisible,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(t){e.goodsListVisible=t},close:e.closeDialog}},[n("el-table",{ref:"goodsTable",attrs:{data:e.goodsList,"tooltip-effect":"dark",height:"400px"}},[n("el-table-column",{attrs:{align:"center",prop:"order_sn",label:"订单编号","min-width":"120"}}),n("el-table-column",{attrs:{align:"center",label:"商品图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("imageRender")([e.clickRow.country,e.clickRow.mall_info?e.clickRow.mall_info.platform_mall_id:"",t.row.goods_img])}})]}}])}),n("el-table-column",{attrs:{align:"center",prop:"goods_id",label:"商品ID","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.openUrl(e.clickRow,t.row.goods_id,"product")}}},[e._v("查看商品详情")])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"goods_count",label:"商品数量","min-width":"120"}}),n("el-table-column",{attrs:{align:"center",prop:"variation_name",label:"商品规格","min-width":"120"}})],1)],1),n("el-dialog",{attrs:{title:"订单号批量查询",visible:e.goodsSearchVisible,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.goodsSearchVisible=t},close:e.closeDialog}},[n("p",[e._v("请输入订单号，一行一个，最多五十个")]),n("el-input",{attrs:{type:"textarea",rows:10},model:{value:e.goodsOrderSnStr,callback:function(t){e.goodsOrderSnStr=t},expression:"goodsOrderSnStr"}}),n("span",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.getOrderList(1,e.goodsOrderSnStr)}}},[e._v("批量查询")])],1)],1),n("el-dialog",{attrs:{title:"批量添加本地备注",visible:e.localRamarkVisible,width:"400px","close-on-click-modal":!1},on:{"update:visible":function(t){e.localRamarkVisible=t}}},[n("div",{staticClass:"remark-style"},[n("span",[e._v("本地备注")]),n("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:e.localRamark,callback:function(t){e.localRamark=t},expression:"localRamark"}})],1),n("span",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.batchSetRemark}},[e._v("批量添加")])],1)])],1)},r=[],i=n("1da1"),o=(n("96cf"),n("d3b7"),n("25f0"),n("4de4"),n("159b"),n("b64b"),n("7db0"),n("b0c0"),n("ac1f"),n("5319"),n("caad"),n("2532"),n("a9e3"),n("99af"),n("a434"),n("d81d"),n("1276"),n("a15b"),n("bcd0")),s=n("feb6"),l=n("0e0b"),c=n("0098"),u={components:{storeChoose:s["a"]},data:function(){return{pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},selectMallList:[],createTime:[],shipByDate:[],selectForm:{orderStatus:2,orderSn:"",isPrint:"",hasTrackingNo:"2"},orderStatusList:o["n"],trackStatus:["","已申请","未申请"],logisticsStatusList:["未下载","已下载","未下载"],total:0,pageSize:20,currentPage:1,multipleSelection:[],tableLoading:!1,tableData:[],showConsole:!0,goodsList:[],goodsListVisible:!1,goodsSearchVisible:!1,goodsOrderSnStr:"",localRamarkVisible:!1,localRamark:"",activeRemarkID:"",orderRemark:""}},mounted:function(){var e=this;this.createTime=Object(l["e"])(30),setTimeout((function(){e.getOrderList()}),2e3)},methods:{changeTime:function(e,t,n){var a=Object(l["m"])(new Date(e[0]).getTime(),new Date(e[1]).getTime());if(a>93)return n?this[t][n]=Object(l["e"])(30):this[t]=Object(l["e"])(30),this.$message.warning("只支持查询或导出93天内的数据,请重新选择时间！")},downTWface:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a,r,i,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,n=e.multipleSelection.filter((function(e){return"TW"==e.country})),n.length){t.next=4;break}return t.abrupt("return",e.$message.warning("请选择台湾站订单数据"));case 4:return a=[],n.forEach((function(e){a.push(e.main_order_sn)})),r=a.toString(),i={mainOrderSns:r},t.next=10,e.$api.getLogisticsInformationBatch(i);case 10:o=t.sent,s=[],s=200===o.data.code&&o.data.data.length?o.data.data:n,e.downFace(s,n,"TW",!1,!1,!1,!0),t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),e.tableLoading=!1;case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()})),batnchDownLoad:function(e,t){var n=this;if(!e.length)return this.$message.warning("请选择要操作的数据！");"down"==t?this.$confirm("pdf文件后缀是否小写?","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){n.batchPrintOrderSurface(e,!0,!0,!1,!1)})).catch((function(){n.batchPrintOrderSurface(e,!1,!0,!1,!1)})):"view"==t&&this.$confirm("是否需要打印虚拟面单?","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){n.batchPrintOrderSurface(e,!1,!1,!0,!0)})).catch((function(){n.batchPrintOrderSurface(e,!1,!1,!0,!1)}))},batchPrintOrderSurface:function(e,t,n,a,r){var o=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var s,l,c,u,d,m;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(s="",l={},c="",e.forEach((function(e,t){l[e.country]=e.country,s=e.country,c=0===t?e.main_order_sn:c+","+e.main_order_sn})),!(Object.keys(l).length>1)){i.next=6;break}return i.abrupt("return",o.$message.warning("由于每个站点面单不一致，请分站点批量预览和打印！"));case 6:return u={mainOrderSns:c},d=[],i.prev=8,i.next=11,o.$api.getLogisticsInformationBatch(u);case 11:if(m=i.sent,200!==m.data.code){i.next=16;break}d=m.data.data,i.next=17;break;case 16:return i.abrupt("return",o.$message.warning("面单获取失败！"));case 17:if(d.length){i.next=19;break}return i.abrupt("return",o.$message.warning("暂无面单信息"));case 19:o.downFace(d,e,s,t,n,a,r),i.next=25;break;case 22:i.prev=22,i.t0=i["catch"](8),o.tableLoading=!1;case 25:case"end":return i.stop()}}),i,null,[[8,22]])})))()},downFace:function(e,t,n,a,r,o,s){var l=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var c,u,d,m,p,f,h,g,w,b,_,v,k,y,S,x,L,I,C;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:i.prev=0,c=[],u=function(a){var r=e[a];if(!r.url&&"TW"!==n)return l.$refs.Logs.writeLog("订单".concat(r.order_sn,"未获取到面单信息"),!1),"continue";var i=t.find((function(e){return e.order_sn==r.order_sn})),o={PDFUrl:r.url||"",OrderNo:i.order_sn,MainOrderNo:i.order_sn,PlatformLogisticsId:i.tracking_no,PlatformLogisticsName:"",CreateTime:i.created_at,BuyerName:i.name,BuyerPhone:i.phone,BuyerAddress:r.data&&r.data.full_address?r.data.full_address:i.address,BuyerNote:"",BarInfo:{BarCode:i.order_sn,BarCodeWidth:200,BarCodeHeight:50},SkuList:[i.goodsInfo[0].variation_sku.replace("=|=",""),i.goodsInfo[0].goods_count],IsNeedCut:30007==i.logistics_id||30008==i.logistics_id,IsUseA4Size:!1,PdfWidth:320,PdfHeight:425,LocationY:-420,PrintStatus:"0",MallId:i.mall_info.platform_mall_id,MallName:i.mall_info.platform_mall_name};c.push(o)},d=0;case 4:if(!(d<e.length)){i.next=11;break}if(m=u(d),"continue"!==m){i.next=8;break}return i.abrupt("continue",8);case 8:d++,i.next=4;break;case 11:return p={IsDownload:r,PdfExtendName:a?".pdf":".PDF",PdfExtendNameIsLower:a,IsPrintVirtualFaceSheet:s,Site:n,IsShowWindow:o,PdfInfoList:c,VirtualPdfPath:{},ConvertFaceInfoList:[]},i.next=14,window["BaseUtilBridgeService"].getOrderPdfInfo(p);case 14:if(f=i.sent,h=JSON.parse(f),200==h.code){i.next=18;break}return i.abrupt("return",l.$refs.Logs.writeLog("预览失败",!1));case 18:if(g=null,w={},!s){i.next=27;break}return i.next=23,window["BaseUtilBridgeService"].getVirtualFace(c,!0);case 23:if(g=i.sent,w=g&&JSON.parse(g),w&&"200"==w.code){i.next=27;break}return i.abrupt("return",l.$message.warning("获取虚拟面单失败"));case 27:b=[],_=function(a){var r=e[a];if(!r.url&&"TW"!==n)return l.$refs.Logs.writeLog("订单".concat(r.order_sn,"未获取到面单信息"),!1),"continue";var i=t.find((function(e){return e.order_sn==r.order_sn})),o=null;r.url&&r.url.includes(".html")&&(o=h.data&&h.data.find((function(e){return e&&e.OrderSn==i.order_sn}))||null);var c={HtmlFilePath:o?o.PDFFilePath:r.url&&r.url.includes(".html")?r.url:"",PDFFilePath:r.url&&r.url.includes(".PDF")||r.url&&r.url.includes(".pdf")?r.url:"",LogisticsId:i.logistics_id.toString(),OrderSn:i.order_sn,MallId:Number(i.mall_info.platform_mall_id),VirtualFilePath:s?w.data[i.order_sn]:""};b.push(c)},v=0;case 30:if(!(v<e.length)){i.next=37;break}if(k=_(v),"continue"!==k){i.next=34;break}return i.abrupt("continue",34);case 34:v++,i.next=30;break;case 37:return i.next=39,window["BaseUtilBridgeService"].htmlToPdf(b,!1);case 39:if(y=i.sent,S=y&&JSON.parse(y),200==S.code){i.next=45;break}for(L in x="",S.failList)x=x+","+L+","+S.failList[L],x=x.substring(1);return i.abrupt("return",l.$refs.Logs.writeLog("打印面单失败,".concat(x),!1));case 45:return I=JSON.parse(JSON.stringify(c)),I.forEach((function(e){var t=h.data.find((function(t){return t&&t.OrderSn==e.OrderNo}));t&&(e.PDFUrl=t.PDFFilePath)})),C={IsDownload:r,PdfExtendName:a?".pdf":".PDF",PdfExtendNameIsLower:a,IsPrintVirtualFaceSheet:s,Site:n,IsShowWindow:o,PdfInfoList:I,VirtualPdfPath:s?w.data:{},ConvertFaceInfoList:S.data},l.tableLoading=!0,i.next=51,window["BaseUtilBridgeService"].downloadPdf(C);case 51:l.tableLoading=!1,r&&l.$refs.Logs.writeLog("面单下载完成",!0),i.next=59;break;case 55:i.prev=55,i.t0=i["catch"](0),l.tableLoading=!1,l.$refs.Logs.writeLog("打印面单失败，".concat(i.t0),!1);case 59:case"end":return i.stop()}}),i,null,[[0,55]])})))()},syncFaceDataSingle:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.syncSurface([e],!0);case 1:case"end":return n.stop()}}),n)})))()},syncSurfaceBefore:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.multipleSelection.length){t.next=2;break}return t.abrupt("return",e.$message.warning("请先选择数据！"));case 2:n=e.multipleSelection.filter((function(e){return"TW"==e.country})),n.length?e.$confirm("是否同时批量同步台湾站点的面单（同步台湾站的面单将会缩短发货时效，请谨慎选择）!","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){e.syncSurface(e.multipleSelection,!0)})).catch((function(){var t=e.multipleSelection.filter((function(e){return"TW"!==e.country}));e.syncSurface(t,!1)})):e.syncSurface(e.multipleSelection,!1);case 4:case"end":return t.stop()}}),t)})))()},syncSurface:function(e,t){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n.showConsole=!1,e.length){a.next=4;break}return n.$refs.Logs.writeLog("没有要同步的订单！",!0),a.abrupt("return");case 4:n.$refs.Logs.writeLog("同步面单信息开始，请耐心等待！",!0),r=new c["a"](n,n.$refs.Logs.writeLog),r.handleStart(e,t);case 7:case"end":return a.stop()}}),a)})))()},downLoadPickList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.multipleSelection.length){t.next=2;break}return t.abrupt("return",e.$message.warning("请先选择数据！"));case 2:e.showConsole=!1,e.$refs.Logs.writeLog("下载拣货单开始，请耐心等待！",!0),n=new c["a"](e,e.$refs.Logs.writeLog),n.getPickListData(e.multipleSelection);case 6:case"end":return t.stop()}}),t)})))()},getExportData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a,r,o,s,l,c,u,d,m,p;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="",e.selectMallList.forEach((function(e,t){n=0===t?e.id:n+","+e.id})),a=JSON.parse(JSON.stringify(e.selectForm)),a["page"]=1,a["pageSize"]=200,a["sysMallId"]=n,a["createTime"]=e.createTime.length?e.createTime[0]+" 00:00:00/"+e.createTime[1]+" 23:59:59":"",e.tableLoading=!0,t.next=10,e.$api.getDeliveryList(a);case 10:r=t.sent,o=r.data,s=[],l=o&&200===o.code&&o.data.data&&o.data.data||[];case 14:if(!l||!l.length){t.next=25;break}return l.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.joinLink(n,n.goodsInfo[0].goods_id);case 2:n.goodsLink=t.sent;case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),s=s.concat(l),a.page++,t.next=20,e.$api.getDeliveryList(a);case 20:c=t.sent,u=c.data,l=u&&200===u.code&&u.data.data&&u.data.data||[],t.next=14;break;case 25:if(e.tableLoading=!1,s.length){t.next=28;break}return t.abrupt("return",e.$message.warning("没有可导出的数据！"));case 28:if(d=[],m=JSON.parse(JSON.stringify(s)),m.length>7e3){p=0;while(m.length)d[p]=m.splice(0,7e3),p++}else d[0]=m;e.tableToExcel(d);case 32:case"end":return t.stop()}}),t)})))()},tableToExcel:function(e){for(var t=1,n="<tr>\n            <td>编号</td>\n            <td>站点</td>\n            <td>店铺名称</td>\n            <td>订单编号</td>\n            <td>商品数量</td>\n            <td>商品规格</td>\n            <td>商品链接</td>\n            <td>商品图片</td>\n            <td>订单创建时间</td>\n            <td>截止发货时间</td>\n            <td>是否已申请物流单号</td>\n            <td>是否同步面单信息</td>\n            <td>发货状态</td>\n            <td>虾皮物流</td>\n            <td>虾皮物流单号</td>\n            </tr>",a=0;a<e.length;a++)for(var r=e[a],i=0;i<r.length;i++)for(var s=r[i],c=0;c<s.goodsInfo.length;c++){var u=s.goodsInfo[c];n+="<tr><td>".concat(t++,"</td>\n                <td>").concat(s.mall_info&&s.mall_info.country?this.$filters.chineseSite(s.mall_info.country):"\t","</td>\n                <td>").concat(s.mall_info&&s.mall_info.platform_mall_name?s.mall_info.platform_mall_name:"\t","</td>\n                <td style=\"mso-number-format:'@';\">").concat(s.order_sn?s.order_sn:"\t","</td>\n                <td>").concat(s.goods_count?s.goods_count:"\t","</td>\n                <td>").concat(u?u.variation_name:"\t","</td>\n                <td>").concat(s.goodsLink?s.goodsLink:"\t","</td>\n                <td>").concat(u?this.$filters.imageRender([s.country,s.mall_info?s.mall_info.platform_mall_id:"",u.goods_img]):"\t","</td>\n                <td>").concat(s.created_time?s.created_time:"\t","</td>\n                <td>").concat(s.ship_by_date?s.ship_by_date:"\t","</td>\n                <td>").concat(s.is_apply_tracking_no?this.trackStatus[s.is_apply_tracking_no]:"\t","</td>\n                <td>").concat(0==s.hasLogistics?"否":"是\t","</td>\n                <td>").concat(s.order_status?Object(o["d"])(s.order_status):"\t","</td>\n                <td>").concat(s.logistics_name?s.logistics_name:"\t","</td>\n                <td>").concat(s.tracking_no?s.tracking_no:"\t","</td>\n                </tr>")}Object(l["i"])("发货管理订单数据",n)},changeRemark:function(e,t){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,n.$api.setLocalRemark({id:e,remark:n.orderRemark});case 2:if(r=a.sent,200!=r.data.code){a.next=8;break}return n.$message.success("设置备注成功"),n.tableData[t].remark=n.orderRemark,n.activeRemarkID="",a.abrupt("return");case 8:n.$message.error("设置备注失败"),n.activeRemarkID="";case 10:case"end":return a.stop()}}),a)})))()},editRemark:function(e,t){this.activeRemarkID=t,this.orderRemark=this.tableData[e].remark},openBefore:function(){if(!this.multipleSelection.length)return this.$message.warning("请先选择需要备注的商品！");this.localRamarkVisible=!0},batchSetRemark:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.multipleSelection.length){t.next=2;break}return t.abrupt("return",e.$message.warning("请先选择需要标记的商品！"));case 2:e.showConsole=!1,e.multipleSelection.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={id:n.id,remark:e.localRamark},t.next=3,e.$api.setLocalRemark(a);case 3:r=t.sent,200===r.data.code?(e.$refs.multipleTable.toggleRowSelection(n,!1),e.$refs.Logs.writeLog("订单编号【".concat(n.order_sn,"】备注成功"),!0)):e.$refs.Logs.writeLog("订单编号【".concat(n.order_sn,"】备注失败-").concat(r.data.message),!1);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),e.closeDialog(),e.getOrderList();case 6:case"end":return t.stop()}}),t)})))()},handleKey:function(e){return e.split("\n").map((function(e){return e.replace(/(^\s*)|(\s*$)/g,"")})).filter((function(e){return""!=e}))},openGoodsDetail:function(e){this.clickRow=e,this.goodsList=e.goodsInfo,this.goodsListVisible=!0},closeDialog:function(){this.clickRow={},this.goodsList=[],this.goodsSearchVisible=!1,this.goodsOrderSnStr="",this.localRamark="",this.localRamarkVisible=!1},getOrderList:function(e,t){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,i,o,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r="",n.selectMallList.forEach((function(e,t){r=0===t?e.id:r+","+e.id})),i=JSON.parse(JSON.stringify(n.selectForm)),n.currentPage=e||n.currentPage,i["page"]=n.currentPage,i["pageSize"]=n.pageSize,i["sysMallIds"]=r,i["createTime"]=n.createTime&&n.createTime.length?n.createTime[0]+" 00:00:00/"+n.createTime[1]+" 23:59:59":"",i["shipByDate"]=n.shipByDate&&n.shipByDate.length?n.shipByDate[0]+" 00:00:00/"+n.shipByDate[1]+" 23:59:59":"",t&&(o=n.handleKey(t),o=o.splice(0,50),i.orderSn=o.join(",")),n.tableLoading=!0,a.next=13,n.$api.getDeliveryList(i);case 13:s=a.sent,200===s.data.code?(n.tableData=s.data.data.data,n.total=s.data.data.total):n.$message.error("获取列表失败，".concat(s.data.message)),n.tableLoading=!1,n.closeDialog();case 17:case"end":return a.stop()}}),a)})))()},joinLink:function(e,t){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r="",!e.mall_info||!e.mall_info.platform_mall_id){a.next=7;break}return i={platform_mall_id:e.mall_info?e.mall_info.platform_mall_id:""},a.next=5,n.$shopeemanService.getWebUrl(e.country,i);case 5:o=a.sent,r=o+"/product/"+e.mall_info.platform_mall_id+"/"+t;case 7:return a.abrupt("return",r);case 8:case"end":return a.stop()}}),a)})))()},openUrl:function(e,t,n){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var i,o,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(i=e,"product"!==n){r.next=7;break}return o={platform_mall_id:e.mall_info.platform_mall_id},r.next=5,a.$shopeemanService.getWebUrl(e.country,o);case 5:s=r.sent,i=s+"/product/"+e.mall_info.platform_mall_id+"/"+t;case 7:a.$BaseUtilService.openUrl(i);case 8:case"end":return r.stop()}}),r)})))()},viewDetails:function(e,t,n){var a={type:e,shopId:n,id:t};this.$BaseUtilService.getOrderDetailInfo(n,JSON.stringify(a))},changeMallList:function(e){this.selectMallList=e.mallList},handleCurrentChange:function(e){this.currentPage=e,this.getOrderList()},handleSizeChange:function(e){this.pageSize=e,this.getOrderList()},handleSelectionChange:function(e){this.multipleSelection=e},copyItem:function(e){var t=document.createElement("div");t.id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t);try{var n=document.createRange();n.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(n),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(a){}t.parentElement.removeChild(t)},changeOrderStatus:o["d"]}},d=u,m=(n("ed4b"),n("2877")),p=Object(m["a"])(d,a,r,!1,null,"0054fe2c",null);t["default"]=p.exports},feb6:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"storeChooseUL"},[n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),n("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?n("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),n("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},[n("el-option",{attrs:{label:"全部",value:""}}),e._l(e.groupIdList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})}))],2)],1),n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),n("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:""},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[e.isShowName?e._e():n("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,a){return e.showMall(t,a)?n("el-option",{key:a,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?n("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[n("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},r=[],i=n("1da1"),o=n("2909"),s=(n("96cf"),n("99af"),n("d81d"),n("fb6a"),n("d3b7"),n("25f0"),n("159b"),n("c740"),n("7db0"),n("4de4"),n("caad"),n("2532"),n("7646")),l=n("2b0e");l["default"].directive("loadmore",{bind:function(e,t){var n=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");n.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var n=this;if(this.isAllowSet2){this.isAllowSet2=!1;var a=t.indexOf("")>-1,r=e.indexOf("")>-1;a!==r?this.groupId=r?[""].concat(Object(o["a"])(this.groupIdList.map((function(e){return e.id})))):[]:r?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){n.isAllowSet2=!0,n.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var n=this;if(this.isAllowSet1){this.isAllowSet1=!1;var a=t.indexOf("")>-1,r=e.indexOf("")>-1;a!==r?this.site=r?[""].concat(Object(o["a"])(this.siteList.map((function(e){return e.platform_mall_id})))):[]:r?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){n.changeMallList(),n.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.site=[],n=t.countryVal,a=t.groupId.indexOf("")>-1&&t.groupId.slice(1).toString()||t.groupId.toString(),r={country:n,mallGroupIds:a},e.next=6,t.mallListAPIInstance.ddMallGoodsGetMallList(r);case 6:i=e.sent,200===i.code?(t.siteList=i.data,0===t.groupIdList.length&&(t.groupId=[""],t.siteList.forEach((function(e){var n=t.groupIdList.findIndex((function(t){return t.id===e.group_id}));e.group_name&&n<0&&(t.groupIdList.push({group_name:e.group_name,id:e.group_id}),t.groupId.push(e.group_id))}))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=[""]}),10)):t.$message.error("获取分组、店铺列表失败");case 8:case"end":return e.stop()}}),e)})))()},changeMallList:function(){var e=this,t=[],n="";this.site.forEach((function(a){if(a){var r=e.siteList.find((function(e){return e.platform_mall_id===a}));t.push(r),n+=a+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(n=t.length!==this.siteList.length&&n||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:n,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){this.isShowName=e||"";var t=this.siteList.filter((function(t){var n=t.mall_alias_name||t.platform_mall_name;return n.includes(e)}));this.showMallNumber=t.length-this.showMallNumber;var n=this.siteList.filter((function(t){var n=t.mall_alias_name||t.platform_mall_name;return!n.includes(e)}));this.siteShowList=[].concat(Object(o["a"])(t),Object(o["a"])(n))},showMall:function(e,t){var n=e.mall_alias_name||e.platform_mall_name,a=this.site[0]===e.platform_mall_id;return a||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||n.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var n=0;e?(n=this.mallShowIndex+10,n=n<this.siteShowList.length&&n||this.mallShowIndex):(n=this.mallShowIndex-10,n=n>0&&n||0),n!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=n}}}},u=c,d=(n("8992"),n("2877")),m=Object(d["a"])(u,a,r,!1,null,null,null);t["a"]=m.exports}}]);