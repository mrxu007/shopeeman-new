(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-335d96d0"],{"762f":function(e,t,a){},a8b8:function(e,t,a){"use strict";a.r(t);var l=a("1da1"),o=(a("96cf"),a("d81d"),a("159b"),a("d3b7"),a("25f0"),a("4d90"),a("99af"),a("a15b"),a("4de4"),{data:function(){return{butLoading:!1,butBatchLoading:!1,wechatStatusDialogOption:[{id:1,value:1,label:"退件"},{id:2,value:2,label:"暂存仓库"},{id:3,value:3,label:"坚持发货"},{id:4,value:4,label:"等候补发"}],form:{type:[],wechatStatus:[],status:[],dateStat:[(new Date).getTime()-1296e6,new Date],packageCode:"",orderSn:""},orderDealDialogFormVisible:!1,orderDealDialogForm:{id:"",wechatStatus:1},orderBatchDealDialogFormVisible:!1,orderBatchDealDialogForm:{id:[],wechatStatus:1},exceptionTypeOptionsOne:[{id:1,value:1,label:"到货实物颜色与订单要求产品不符"},{id:2,value:2,label:"到货包裹是空包"},{id:3,value:3,label:"到货包裹码数错误"},{id:4,value:4,label:"到货包裹里多订单无法区分识别"},{id:5,value:5,label:"到货包裹缺件少件，无法满足对应销售订单"},{id:6,value:6,label:"到货包裹脏污、破损"},{id:7,value:7,label:"到货包裹渠道无法支持"},{id:8,value:8,label:"到货包裹超材超重，无法寄出"},{id:9,value:9,label:"到货包裹运费偏高，请确认是否选择发货"},{id:10,value:10,label:"到货包裹无法打印面单，请及时同步"},{id:11,value:11,label:"系统已欠费，无法寄出，请及时安排充值"},{id:12,value:12,label:"无法支持尾程物流渠道，请安排处理"},{id:13,value:13,label:"包裹未匹配订单，请及时处理"},{id:50,value:50,label:"备货缺件，无法发货"}],exceptionTypeOptionsOneAll:!0,exceptionTypeOptionsTwo:[{id:0,value:0,label:"暂未处理"},{id:1,value:1,label:"退件"},{id:2,value:2,label:"暂存仓库"},{id:3,value:3,label:"坚持发货"},{id:4,value:4,label:"等候补发"},{id:5,value:5,label:"订单匹配完成"},{id:6,value:6,label:"处理完成"},{id:50,value:50,label:"通知提示"}],exceptionTypeOptionsTwoAll:!0,status:[{id:1,value:1,label:"未处理"},{id:2,value:2,label:"处理中"},{id:3,value:3,label:"已处理"}],dealStatusAll:!0,tableData:[],tableCheck:[],isLoading:!1}},mounted:function(){this.initSelect(),this.getExceptionWarehouse()},methods:{initSelect:function(){var e=this;this.form.type.push("all"),this.exceptionTypeOptionsOne.map((function(t){e.form.type.push(t.id)})),this.form.wechatStatus.push("all"),this.exceptionTypeOptionsTwo.map((function(t){e.form.wechatStatus.push(t.id)})),this.form.status.push("all"),this.status.map((function(t){e.form.status.push(t.id)}))},selectionChangeHandle:function(e){this.tableCheck=e},orderBatchDealHandle:function(){var e;if(null===(e=this.tableCheck)||void 0===e||!e.length)return this.$message("请选择需要批量处理的订单");this.orderBatchDealDialogFormVisible=!0},orderBatchDealDialogHandle:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.butBatchLoading=!0,e.orderBatchDealDialogForm.id=[],e.tableCheck.forEach((function(t){e.orderBatchDealDialogForm.id.push(t.id)})),a={ids:e.orderBatchDealDialogForm.id.toString(),wechatStatus:e.orderBatchDealDialogForm.wechatStatus},t.next=6,e.$api.uploadDealExceptionStatus(a);case 6:200===(a=t.sent).data.code?(e.orderDealDialogFormVisible=!1,e.$message.success("订单处理成功"),e.getExceptionWarehouse()):e.$message.error(a.data.message),e.butBatchLoading=!1;case 9:case"end":return t.stop()}}),t)})))()},orderDealDialogHandle:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.butLoading=!0,t.next=3,e.$api.uploadDealExceptionStatus(e.orderDealDialogForm);case 3:200===(a=t.sent).data.code?(e.orderDealDialogFormVisible=!1,e.$message({message:"订单处理成功",type:"success"}),e.getExceptionWarehouse()):e.$message.error(a.data.message),e.butLoading=!1;case 6:case"end":return t.stop()}}),t)})))()},formatSearch:function(e){var t=new Date(e),a=t.getFullYear(),l=(t.getMonth()+1+"").padStart(2,0),o=(t.getDate()+"").padStart(2,0),r=(t.getHours()+"").padStart(2,0);e=(t.getMinutes()+"").padStart(2,0),t=(t.getSeconds()+"").padStart(2,0);return"".concat(a,"-").concat(l,"-").concat(o," ").concat(r,":").concat(e,":").concat(t)},orderDealHandle:function(e){this.orderDealDialogForm.ids=e.id,this.orderDealDialogFormVisible=!0},formatterContent:function(e,t){switch(e.type){case 1:return"到货实物颜色与订单要求产品不符";case 2:return"到货包裹是空包";case 3:return"到货包裹码数错误";case 4:return"到货包裹里多订单无法区分识别";case 5:return"到货包裹缺件少件，无法满足对应销售订单";case 6:return"到货包裹脏污、破损";case 7:return"到货包裹渠道无法支持";case 8:return"到货包裹超材超重，无法寄出";case 9:return"到货包裹运费偏高，请确认是否选择发货";case 10:return"到货包裹无法打印面单，请及时同步";case 11:return"系统已欠费无法出库，请及时安排充值";case 12:return"无法支持尾程物流渠道，请安排处理";case 13:return"包裹未匹配订单，请及时处理";case 50:return"备货缺件，无法发货"}},formatterWechatStatus:function(e,t){switch(e.wechat_status){case 0:return"暂未处理";case 1:return"退件";case 2:return"暂存仓库";case 3:return"坚持发货";case 4:return"等候补发";case 5:return"订单匹配完成";case 6:return"处理完成";case 50:return"通知提示"}},formatterStatus:function(e,t){switch(e.status){case 1:return"未处理";case 2:return"处理中";case 3:return"已处理"}},getExceptionWarehouse:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var a,l,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isLoading=!0,o={},a=e.formatSearch(e.form.dateStat[0]),l=e.formatSearch(e.form.dateStat[1]),o.dateStat="".concat(a,"/").concat(l),o.type=e.form.type.filter((function(e){return"all"!==e})).join(","),o.wechatStatus=e.form.wechatStatus.filter((function(e){return"all"!==e})).join(","),o.status=e.form.status.filter((function(e){return"all"!==e})).join(","),o.packageCode=e.form.packageCode,o.orderSn=e.form.orderSn,t.next=12,e.$api.getExceptionWarehouse(o);case 12:200===(o=t.sent).data.code?e.tableData=o.data.data:e.$message.error(o.data.message),e.isLoading=!1;case 15:case"end":return t.stop()}}),t)})))()},exceptionTypeOneChangeHandle:function(e){var t=this;this.exceptionTypeOptionsOneAll?(this.exceptionTypeOptionsOneAll=!1,-1<e.indexOf("all")?this.form.type=e.filter((function(e){return"all"!==e})):this.form.type=[]):-1<e.indexOf("all")||e.length===this.exceptionTypeOptionsOne.length?(this.form.type=["all"],this.exceptionTypeOptionsOne.forEach((function(e){t.form.type.push(e.value)})),this.exceptionTypeOptionsOneAll=!0):this.form.type=e},exceptionTypeTwoChangeHandle:function(e){var t=this;this.exceptionTypeOptionsTwoAll?(this.exceptionTypeOptionsTwoAll=!1,-1<e.indexOf("all")?this.form.wechatStatus=e.filter((function(e){return"all"!==e})):this.form.wechatStatus=[]):-1<e.indexOf("all")||e.length===this.exceptionTypeOptionsTwo.length?(this.form.wechatStatus=["all"],this.exceptionTypeOptionsTwo.forEach((function(e){t.form.wechatStatus.push(e.value)})),this.exceptionTypeOptionsTwoAll=!0):this.form.wechatStatus=e},dealStatusChangeHandel:function(e){var t=this;this.dealStatusAll?(this.dealStatusAll=!1,-1<e.indexOf("all")?this.form.status=e.filter((function(e){return"all"!==e})):this.form.status=[]):-1<e.indexOf("all")||e.length===this.status.length?(this.form.status=["all"],this.status.forEach((function(e){t.form.status.push(e.value)})),this.dealStatusAll=!0):this.form.status=e}}});a("c65a"),a=a("2877"),o=Object(a.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"CatchNoticeStoreExceptionInfo"},[a("div",{staticClass:"search"},[a("div",{staticClass:"rowOne"},[a("div",{staticClass:"exceptionType"},[e._v(" 异常类型： "),a("el-select",{attrs:{size:"mini",multiple:"","collapse-tags":""},on:{change:e.exceptionTypeOneChangeHandle},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("el-option",{attrs:{label:"全部",value:"all"}}),e._l(e.exceptionTypeOptionsOne,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}))],2)],1),a("div",{staticClass:"exceptionType"},[e._v(" 处理方式： "),a("el-select",{attrs:{size:"mini",multiple:"","collapse-tags":""},on:{change:e.exceptionTypeTwoChangeHandle},model:{value:e.form.wechatStatus,callback:function(t){e.$set(e.form,"wechatStatus",t)},expression:"form.wechatStatus"}},[a("el-option",{attrs:{label:"全部",value:"all"}}),e._l(e.exceptionTypeOptionsTwo,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}))],2)],1),a("div",{staticClass:"exceptionType"},[e._v(" 仓库处理状态： "),a("el-select",{attrs:{size:"mini",multiple:"","collapse-tags":""},on:{change:e.dealStatusChangeHandel},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"全部",value:"all"}}),e._l(e.status,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}))],2)],1),a("div",{staticClass:"creationTime"},[e._v(" 创建时间："),a("el-date-picker",{attrs:{type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:e.form.dateStat,callback:function(t){e.$set(e.form,"dateStat",t)},expression:"form.dateStat"}})],1)]),a("div",{staticClass:"rowTwo"},[a("div",{staticClass:"orderNumber"},[e._v(" 物流单号： "),a("el-input",{attrs:{size:"mini"},model:{value:e.form.packageCode,callback:function(t){e.$set(e.form,"packageCode",t)},expression:"form.packageCode"}})],1),a("div",{staticClass:"orderNumber"},[e._v(" 订单号： "),a("el-input",{attrs:{size:"mini"},model:{value:e.form.orderSn,callback:function(t){e.$set(e.form,"orderSn",t)},expression:"form.orderSn"}})],1),a("div",{staticClass:"searchRowThreeBottonGroup"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getExceptionWarehouse}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.orderBatchDealHandle}},[e._v("订单批量处理")])],1)])]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{"header-cell-style":{background:"#f5f7fa"},data:e.tableData,border:"",height:"calc(100vh - 134px)"},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:"仓库名称",prop:"warehouse_name"}}),a("el-table-column",{attrs:{prop:"package_order_sn",label:"订单号"}}),a("el-table-column",{attrs:{prop:"package_code",label:"物流单号"}}),a("el-table-column",{attrs:{prop:"wechat_status",label:"处理方式",formatter:e.formatterWechatStatus}}),a("el-table-column",{attrs:{prop:"content",label:"异常信息"}}),a("el-table-column",{attrs:{prop:"type",label:"异常类型",formatter:e.formatterContent}}),a("el-table-column",{attrs:{label:"异常图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.image?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t.row.image}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t.row.image}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1):e._e()]}}])}),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),a("el-table-column",{attrs:{prop:"updated_at",label:"更改时间"}}),a("el-table-column",{attrs:{prop:"status",label:"仓库处理状态",formatter:e.formatterStatus}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.orderDealHandle(t.row)}}},[e._v("订单处理")])]}}])})],1),a("el-dialog",{attrs:{title:"选择处理方式",visible:e.orderDealDialogFormVisible,width:"400px"},on:{"update:visible":function(t){e.orderDealDialogFormVisible=t}}},[a("el-form",{attrs:{model:e.orderDealDialogForm}},[a("el-form-item",{attrs:{label:"处理方式:","label-width":"80px"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择处理方式"},model:{value:e.orderDealDialogForm.wechatStatus,callback:function(t){e.$set(e.orderDealDialogForm,"wechatStatus",t)},expression:"orderDealDialogForm.wechatStatus"}},e._l(e.wechatStatusDialogOption,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.butLoading},on:{click:e.orderDealDialogHandle}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"选择处理方式",visible:e.orderBatchDealDialogFormVisible,width:"400px"},on:{"update:visible":function(t){e.orderBatchDealDialogFormVisible=t}}},[a("el-form",{attrs:{model:e.orderBatchDealDialogForm}},[a("el-form-item",{attrs:{label:"处理方式:","label-width":"80px"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择处理方式"},model:{value:e.orderBatchDealDialogForm.wechatStatus,callback:function(t){e.$set(e.orderBatchDealDialogForm,"wechatStatus",t)},expression:"orderBatchDealDialogForm.wechatStatus"}},e._l(e.wechatStatusDialogOption,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.butBatchLoading},on:{click:e.orderBatchDealDialogHandle}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,"6f478146",null);t.default=o.exports},c65a:function(e,t,a){"use strict";a("762f")}}]);