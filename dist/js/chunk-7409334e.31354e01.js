(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7409334e"],{"599a":function(t,e,a){},"9a8a":function(t,e,a){"use strict";a("599a")},fc8f:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"PersonalCenterSoftwareFinance"},[a("div",{staticClass:"message"},[t.amountLoading?a("div",[t._v("账户余额："),a("span",{staticClass:"warning-style"},[t._v("获取中...")])]):a("div",[t._v("账户余额："+t._s(t.account.balance)+"元")]),a("div",{staticClass:"bottonGroup"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.getAccountAmount}},[t._v("刷新余额")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.rechargeVisible=!0}}},[t._v("充值")])],1),a("div",[t._v("今日翻译费用："+t._s(t.account.translationCosts)+"元")]),a("div",{staticStyle:{"margin-left":"10px"}},[t.account.translationCosts>"0"?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.getTransDetail("")}}},[t._v("翻译明细")]):t._e()],1)]),a("div",{staticClass:"search"},[a("div",{staticClass:"rowOne"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"creationTime"},[a("label",[t._v("创建时间：")]),a("el-date-picker",{attrs:{type:"daterange","range-separator":"-","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.form.creationTime,callback:function(e){t.$set(t.form,"creationTime",e)},expression:"form.creationTime"}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"tradingTime"},[a("label",[t._v("交易时间：")]),a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.form.tradingTime,callback:function(e){t.$set(t.form,"tradingTime",e)},expression:"form.tradingTime"}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"moneyRange"},[a("label",[t._v("金额范围：")]),a("el-input",{attrs:{size:"mini",clearable:""},model:{value:t.form.minMoney,callback:function(e){t.$set(t.form,"minMoney",e)},expression:"form.minMoney"}}),a("span",[t._v("-")]),a("el-input",{attrs:{size:"mini",clearable:""},model:{value:t.form.maxMoney,callback:function(e){t.$set(t.form,"maxMoney",e)},expression:"form.maxMoney"}})],1)])],1)],1),a("div",{staticClass:"rowTwo"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"transactionStatus"},[a("label",[t._v("交易状态：")]),a("el-select",{attrs:{size:"mini"},model:{value:t.form.transactionStatus,callback:function(e){t.$set(t.form,"transactionStatus",e)},expression:"form.transactionStatus"}},t._l(t.tranStatus,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"moneyFlow"},[a("label",[t._v("资金流向：")]),a("el-select",{staticStyle:{width:"207px"},attrs:{size:"mini",multiple:"","collapse-tags":"",clearable:""},on:{change:function(e){return t.changeSelect(e,"moneyFlow")}},model:{value:t.form.moneyFlow,callback:function(e){t.$set(t.form,"moneyFlow",e)},expression:"form.moneyFlow"}},[a("el-option",{attrs:{label:"全部",value:0},nativeOn:{click:function(e){return t.selectAll("moneyFlow",t.moneyFlow)}}}),t._l(t.moneyFlow,(function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],2)],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"transactionType"},[a("label",[t._v("交易类型：")]),a("el-select",{staticStyle:{width:"198px"},attrs:{size:"mini",multiple:"","collapse-tags":"",clearable:""},on:{change:function(e){return t.changeSelect(e,"transactionType")}},model:{value:t.form.transactionType,callback:function(e){t.$set(t.form,"transactionType",e)},expression:"form.transactionType"}},[a("el-option",{attrs:{label:"全部",value:0},nativeOn:{click:function(e){return t.selectAll("transactionType",t.transactionType)}}}),t._l(t.transactionType,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2)],1)])],1)],1),a("div",{staticClass:"rowThree"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"orderNumber"},[a("label",[t._v("订单编号：")]),a("el-input",{attrs:{size:"mini",clearable:""},model:{value:t.form.orderNumber,callback:function(e){t.$set(t.form,"orderNumber",e)},expression:"form.orderNumber"}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"bigBagNumber"},[t._v(" 星卓越大包号： "),a("el-input",{attrs:{size:"mini"},model:{value:t.form.bigBagNumber,callback:function(e){t.$set(t.form,"bigBagNumber",e)},expression:"form.bigBagNumber"}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"searchRowThreeBottonGroup"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.selectList}},[t._v("查询")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.reset}},[t._v("重置查询条件")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导出数据")])],1)])],1)],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.allbillingData,"tooltip-effect":"dark",height:"calc(100vh - 256px)","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50px",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("el-table-column",{attrs:{"min-width":"180px",label:"交易号",align:"center",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticClass:"tabletext"},[a("span",{staticStyle:{cursor:"pointer"}},[t._v(" "+t._s(e.row.trans_number))]),a("span",{staticClass:"copyIcon",on:{click:function(a){return t.copy(e.row.trans_number)}}},[a("i",{staticClass:"el-icon-document-copy"})])])]}}])}),a("el-table-column",{attrs:{"min-width":"180px",label:"订单编号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.order_sn?a("p",{staticClass:"tabletext"},[a("span",{staticStyle:{cursor:"pointer"}},[t._v(t._s(e.row.order_sn))]),a("span",{staticClass:"copyIcon",on:{click:function(a){return t.copy(e.row.order_sn)}}},[a("i",{staticClass:"el-icon-document-copy"})])]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",prop:"type",label:"资金流向","min-width":"80px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.type>0?a("p",[t._v(t._s(1===e.row.type?"收入":"支出"))]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",prop:"trans_type",label:"交易类型","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.trans_type>0?a("p",[t._v(t._s(t.changeTypeName(e.row.trans_type,t.transactionType)))]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",prop:"trans_type",label:"交易状态","min-width":"70px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.trans_type>0?a("p",[t._v(t._s(t.changeTypeName(e.row.trans_status,t.tranStatus)))]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"trans_time",label:"交易时间",align:"center","min-width":"140px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.trans_time)+" ")]}}])}),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",align:"center","min-width":"140px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.created_at)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"交易金额","min-width":"70px"}}),a("el-table-column",{attrs:{align:"center",prop:"current_amount",label:"账户余额","min-width":"80px"}}),a("el-table-column",{attrs:{align:"center",prop:"package_sn",label:"大包号","min-width":"80px"}}),a("el-table-column",{attrs:{align:"center",prop:"sys_sku_id",label:"商品skuID","min-width":"80px"}}),a("el-table-column",{attrs:{align:"center",label:"费用明细","min-width":"90px"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.trans_type?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.getTransDetail(e.row)}}},[t._v("翻译明细")]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"备注","min-width":"150px","show-overflow-tooltip":"",fixed:"right"}})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[20,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1),a("el-dialog",{attrs:{title:"账户充值",visible:t.rechargeVisible,width:"900px"},on:{"update:visible":function(e){t.rechargeVisible=e}}},[a("div",{staticClass:"recharge-box"},[a("p",[t._v("账户余额："+t._s(t.account.balance))]),a("div",{staticClass:"account-box"},t._l(t.rechargeList,(function(e,n){return a("div",{key:n,staticClass:"account-item",class:{activeColor:t.amount===e},on:{click:function(a){t.amount=e}}},[t._v("￥"+t._s(e))])})),0),a("div",{staticClass:"account-input",staticStyle:{display:"flex","align-items":"center"}},[t._v(" 充值金额："),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",clearable:""},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.recharge}},[t._v("立即充值")])],1)]),a("el-dialog",{attrs:{title:"翻译明细",visible:t.translateDetailVisible,width:"900px"},on:{"update:visible":function(e){t.translateDetailVisible=e}}},[a("div",{staticClass:"tranDetail"},[a("div",{staticClass:"header-selsect"},[a("div",{staticClass:"select-item"},[a("p",[t._v("翻译时间:")]),a("el-date-picker",{attrs:{disabled:!0,type:"daterange",size:"mini",format:"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","23:59:59"]},model:{value:t.chooseDate,callback:function(e){t.chooseDate=e},expression:"chooseDate"}})],1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.exportDetailData}},[t._v("导出数据")])],1),a("div",{staticClass:"table-style"},[a("el-table",{attrs:{data:t.tranDetailData,"tooltip-effect":"dark","max-height":"650"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),a("el-table-column",{attrs:{prop:"type",label:"翻译类型",align:"center",width:"90px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(1==e.row.type?"文字":"图片"))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"翻译字符串","min-width":"70","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.text))])]}}])}),a("el-table-column",{attrs:{prop:"amount",label:"翻译金额",align:"center",width:"90px"}}),a("el-table-column",{attrs:{prop:"created_at",label:"翻译时间",align:"center",width:"160px"}})],1)],1)])])],1)},r=[],i=a("1da1"),o=(a("96cf"),a("d81d"),a("99af"),a("a9e3"),a("ac1f"),a("1276"),a("7db0"),a("b0c0"),a("caad"),a("2532"),a("4de4"),a("0e0b")),s={data:function(){return{account:{balance:"",translationCosts:"0"},form:{creationTime:[],tradingTime:[],minMoney:"",maxMoney:"",transactionStatus:0,moneyFlow:[],transactionType:[],orderNumber:"",bigBagNumber:""},tranStatus:[{id:0,name:"全部"},{id:1,name:"成功"},{id:2,name:"失败"},{id:3,name:"退款"},{id:4,name:"等待付款"}],moneyFlow:[{id:1,label:"收入"},{id:2,label:"支出"}],transactionType:[],pageSize:20,currentPage:1,total:0,allbillingData:[],tableLoading:!1,translateDetailVisible:!1,tranDetailData:[],chooseDate:[],rechargeVisible:!1,rechargeList:[100,200,500,1e3,2e3,5e3],amount:"",exportDataList:[],uuid:"",uid:"",amountLoading:!1}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.form.moneyFlow.push(0),t.moneyFlow.map((function(e){t.form.moneyFlow.push(e.id)})),t.form.creationTime=Object(o["g"])(31),e.next=5,t.getTransType();case 5:return e.next=7,t.getAccountAmount();case 7:return e.next=9,t.getTranslateAmount();case 9:return e.next=11,t.selectList();case 11:case"end":return e.stop()}}),e)})))()},methods:{exportData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n,r,i,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.total){e.next=2;break}return e.abrupt("return",t.$message.warning("没有可以导出的订单"));case 2:return t.exportDataList=[],a={},a.page=t.currentPage,a.pageSize=t.pageSize,a.createdAt=t.form.creationTime.length?t.form.creationTime[0]+" 00:00:00/"+t.form.creationTime[1]+" 23:59:59":"/",a.transTime=t.form.tradingTime.length?t.form.tradingTime[0]+" 00:00:00/"+t.form.tradingTime[1]+" 23:59:59":"/",a.transStatus=t.form.transactionStatus,a.type=t.form.moneyFlow,a.amount="".concat(""!==t.form.minMoney?Number(t.form.minMoney):0,"/").concat(""!==t.form.maxMoney?Number(t.form.maxMoney):0),a.transType=t.form.transactionType,a.orderSn=t.form.orderNumber,a.childName="",a.packageSn=t.form.bigBagNumber,t.tableLoading=!0,e.next=18,t.$api.getAccountAmountDetailList(a);case 18:n=e.sent,r=n.data,i=r.data&&r.data.data.length?r.data.data:void 0;case 21:if(!i){e.next=31;break}return t.exportDataList=t.exportDataList.concat(i),a.page++,e.next=26,t.$api.getAccountAmountDetailList(a);case 26:o=e.sent,s=o.data,i=s.data&&s.data.data.length?s.data.data:void 0,e.next=21;break;case 31:t.tableLoading=!1,t.exportExcel(t.exportDataList);case 33:case"end":return e.stop()}}),e)})))()},exportDetailData:function(){if(!this.tranDetailData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n              <td>编号</td>\n              <td>翻译类型</td>\n              <td>翻译字符串</td>\n              <td>翻译金额</td>\n              <td>翻译时间</td>\n            </tr>",a=0;a<this.tranDetailData.length;a++){var n=this.tranDetailData[a];e+="<tr><td>".concat(t++,"</td>\n                    <td>").concat(n.type?1===n.type?"文字":"图片":"\t","</td>\n                    <td>").concat(n.text?n.text:"\t","</td>\n                    <td>").concat(n.amount?n.amount:"\t","</td>\n                    <td>").concat(n.created_at?n.created_at:"\t","</td>\n                </tr>")}Object(o["k"])("翻译明细数据",e)},exportExcel:function(t){if(!t.length)return this.$message.warning("没有可导出的数据");for(var e=1,a="<tr>\n              <td>编号</td>\n              <td>交易号</td>\n              <td>订单编号</td>\n              <td>资金流向</td>\n              <td>交易类型</td>\n              <td>交易状态</td>\n              <td>交易时间</td>\n              <td>创建时间</td>\n              <td>交易金额</td>\n              <td>账户余额</td>\n              <td>大包号</td>\n              <td>商品SkuId</td>\n              <td>备注</td>\n            </tr>",n=0;n<t.length;n++){var r=t[n];a+="<tr><td>".concat(e++,"</td>\n                    <td style=\"mso-number-format:'@';\">").concat(r.trans_number?r.trans_number:"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(r.order_sn?r.order_sn:"\t","</td>\n                    <td>").concat(r.type&&1===r.type?"收入":"支出","</td>\n                    <td>").concat(r.trans_type?this.changeTypeName(r.trans_type,this.transactionType):"\t","</td>\n                    <td>").concat(r.trans_status?this.changeTypeName(r.trans_status,this.tranStatus):"\t","</td>\n                    <td>").concat(r.trans_time?r.trans_time:"\t","</td>\n                    <td>").concat(r.created_at?r.created_at:"\t","</td>\n                    <td>").concat(r.amount?r.amount:"\t","</td>\n                    <td>").concat(r.current_amount?r.current_amount:"\t","</td>\n                    <td>").concat(r.package_sn?r.package_sn:"\t","</td>\n                    <td>").concat(r.sys_sku_id?r.sys_sku_id:"\t","</td>\n                    <td>").concat(r.remark?r.remark:"\t","</td>\n                </tr>")}Object(o["k"])("账单数据",a)},recharge:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.amount<20)){e.next=3;break}return t.$message.error("最低充值金额为20"),e.abrupt("return");case 3:return a={amount:t.amount},e.prev=4,e.next=7,t.$api.getChargeUrlV2(a);case 7:n=e.sent,200===n.data.code?window.open(n.data.data.url):t.$message.success(n.data.message),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](4),t.$message.error("充值失败");case 14:case"end":return e.stop()}}),e,null,[[4,11]])})))()},getTranslateAmount:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getTranslateAmount();case 2:a=e.sent,200===a.data.code&&(t.account.translationCosts=a.data.data.amount);case 4:case"end":return e.stop()}}),e)})))()},getTransDetail:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,i,s,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.translateDetailVisible=!0,n=t&&t.trans_time?t.trans_time.split(" ")[0]:"",r=Object(o["g"])(0)[0]+" 00:00:00",i=Object(o["g"])(0)[0]+" 23:23:23",e.chooseDate=t?[n+" 00:00:00",n+" 23:59:59"]:[r,i],s={uid:t?t.uid:"",uuid:t?t.uuid:"",startTime:e.chooseDate[0],endTime:e.chooseDate[1]},a.next=8,e.$api.getTranslateDetail(s);case 8:c=a.sent,200===c.data.code?e.tranDetailData=c.data.data:e.$message.warning(c.data.message);case 10:case"end":return a.stop()}}),a)})))()},reset:function(){this.form={creationTime:[],tradingTime:[],minMoney:"",maxMoney:"",transactionStatus:"",moneyFlow:[],transactionType:[],orderNumber:"",bigBagNumber:""}},selectList:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a.page=t.currentPage,a.pageSize=t.pageSize,a.createdAt=t.form.creationTime&&t.form.creationTime.length?t.form.creationTime[0]+" 00:00:00/"+t.form.creationTime[1]+" 23:59:59":"/",a.transTime=t.form.tradingTime&&t.form.tradingTime.length?t.form.tradingTime[0]+" 00:00:00/"+t.form.tradingTime[1]+" 23:59:59":"/",a.transStatus=t.form.transactionStatus,a.type=t.form.moneyFlow,a.amount="".concat(""!==t.form.minMoney?Number(t.form.minMoney):0,"/").concat(""!==t.form.maxMoney?Number(t.form.maxMoney):0),a.transType=t.form.transactionType,a.orderSn=t.form.orderNumber,a.childName="",a.packageSn=t.form.bigBagNumber,t.tableLoading=!0,e.next=15,t.$api.getAccountAmountDetailList(a);case 15:n=e.sent,200===n.data.code&&(t.allbillingData=n.data.data.data,t.total=n.data.data.total),t.tableLoading=!1;case 18:case"end":return e.stop()}}),e)})))()},getTransType:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getTransType();case 2:a=e.sent,200===a.data.code?(t.transactionType=a.data.data,t.form.transactionType.push(0),t.transactionType.map((function(e){t.form.transactionType.push(e.id)}))):t.$message.error(a.data.message);case 4:case"end":return e.stop()}}),e)})))()},getAccountAmount:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.amountLoading=!0,e.next=3,t.$api.getAccountAmount();case 3:a=e.sent,200===a.data.code?t.account.balance=a.data.data:t.$message.error(a.data.message),t.amountLoading=!1,t.getTranslateAmount();case 7:case"end":return e.stop()}}),e)})))()},setDateFmt:function(t){return t[0]=t[0]+" 00:00:00",t[1]=t[1]+" 23:59:59",t},changeTypeName:function(t,e){var a="",n=e.find((function(e){return e.id===t}));return a=n?n.name:"",a},selectAll:function(t,e){var a=this;this.form[t].length<e.length?(this.form[t]=[],this.form[t].push(0),e.map((function(e){a.form[t].push(e.id)}))):this.form[t]=[]},changeSelect:function(t,e){(t.includes(0)||t.length!==this.form[e].length)&&t.includes(0)&&t.length-1<this.form[e].length&&(this.form[e]=this.form[e].filter((function(t){return 0!==t})))},handleCurrentChange:function(t){this.currentPage=t,this.selectList()},handleSizeChange:function(t){this.pageSize=t,this.selectList()},copy:function(t){var e=document.createElement("div");e.id="tempTarget",e.style.opacity="0",e.innerText=t,document.body.appendChild(e);try{var a=document.createRange();a.selectNode(e),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(n){}e.parentElement.removeChild(e)}}},c=s,l=(a("9a8a"),a("2877")),u=Object(l["a"])(c,n,r,!1,null,"72510012",null);e["default"]=u.exports}}]);