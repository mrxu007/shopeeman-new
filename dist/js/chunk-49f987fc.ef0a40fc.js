(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-49f987fc"],{"1ffc":function(e,t,a){"use strict";a.r(t);var r=a("1da1"),n=(a("a9e3"),a("99af"),a("ac1f"),a("5319"),a("7db0"),a("96cf"),a("0e0b")),c={data:function(){return{rechargeRemark:"",rechargeMoney:"",activeName:"rechargeRecord",tradeTime:[],pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},pageSize:20,currentPage:1,total:0,tableData:[],orderNumber:"",tradeType:"",tradeTypeList:[{value:"",label:"全部"},{value:"1",label:"仓库发货"},{value:"2",label:"退件"},{value:"3",label:"异常赔付"},{value:"4",label:"清关赔付"},{value:"5",label:"退款"},{value:"6",label:"补扣"},{value:"11",label:"海外中转仓出库"},{value:"12",label:"中转仓增值"},{value:"13",label:"海外仓上架入仓"},{value:"14",label:"贴单出库"},{value:"15",label:"补单出库"},{value:"16",label:"海外退件"}],tradeStatusList:[{value:"1",label:"成功"},{value:"2",label:"失败"},{value:"3",label:"退款"},{value:"4",label:"等待付款"},{value:"5",label:"已向用户发起扣款"}],muid:null,mappingUid:null,balanceLoading:!1,userBalance:0,exportDataList:[],tableLoading:!1}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getAppUid();case 2:e.searchRechargeRecord(),e.searchUserBalance();case 4:case"end":return t.stop()}}),t)})))()},methods:{userRecharge:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Number(e.rechargeMoney)<35)return t.abrupt("return",e.$message.warning("最低不能小于35元"));t.next=2;break;case 2:return t.prev=2,t.next=5,e.$BaseUtilService.openUrl("http://user.xzy.17hyj.com/externalPay?amount=".concat(e.rechargeMoney,"&app_uid=").concat(e.mappingUid,"&remark=").concat(e.rechargeRemark));case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),e.$message.error("充值打开失败");case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},exportTableData:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a,r,n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.total){t.next=2;break}return t.abrupt("return",e.$message.warning("没有可以导出的订单"));case 2:if(e.exportDataList=[],e.tableLoading=!0,"rechargeRecord"!==e.activeName){t.next=31;break}a={app_uid:e.muid,page_size:200,page:e.currentPage,trans_time:e.tradeTime.length?e.tradeTime[0]+" 00:00:00/"+e.tradeTime[1]+" 23:59:59":""};case 6:if(e.exportDataList.length<e.total)return t.prev=7,t.next=10,e.$XzyNetMessageService.post("xzy.UserGetUserRecharge",a);t.next=28;break;case 10:if(r=t.sent,200!==(r=r&&JSON.parse(r)).status){t.next=18;break}c=r&&r.data&&JSON.parse(r.data),e.exportDataList=e.exportDataList.concat(c.data.data),a.page++,t.next=20;break;case 18:return e.$message.error("导出数据错误"),t.abrupt("break",28);case 20:t.next=26;break;case 22:return t.prev=22,t.t0=t.catch(7),e.$message.error("导出数据异常"),t.abrupt("break",28);case 26:t.next=6;break;case 28:e.exportRecharge(e.exportDataList),t.next=56;break;case 31:if("accountRecord"!==e.activeName){t.next=56;break}n={app_uid:e.muid,page_size:200,page:e.currentPage,trans_time:e.tradeTime.length?e.tradeTime[0]+" 00:00:00/"+e.tradeTime[1]+" 23:59:59":"",package_order_sn:e.orderNumber,trans_type:e.tradeType};case 33:if(e.exportDataList.length<e.total)return t.prev=34,t.next=37,e.$XzyNetMessageService.post("xzy.UserGetUserAccountAmount",n);t.next=55;break;case 37:if(c=t.sent,200!==(c=c&&JSON.parse(c)).status){t.next=45;break}c=c&&c.data&&JSON.parse(c.data),e.exportDataList=e.exportDataList.concat(c.data.data),n.page++,t.next=47;break;case 45:return e.$message.error("导出数据错误"),t.abrupt("break",55);case 47:t.next=53;break;case 49:return t.prev=49,t.t1=t.catch(34),e.$message.error("导出数据异常"),t.abrupt("break",55);case 53:t.next=33;break;case 55:e.exportAccount(e.exportDataList);case 56:e.tableLoading=!1;case 57:case"end":return t.stop()}}),t,null,[[7,22],[34,49]])})))()},exportRecharge:function(e){for(var t=1,a="<tr>\n              <td>编号</td>\n              <td>内部交易单号</td>\n              <td>充值金额</td>\n              <td>交易时间</td>\n              <td>实收金额</td>\n              <td>买家付款金额</td>\n              <td>交易状态</td>\n              <td>是否已充值</td>\n              <td>卖家支付宝用户号</td>\n              <td>买家支付宝唯一用户号</td>\n              <td>备注</td>\n              <td>支付时间</td>\n              <td>交易创建时间</td>\n            </tr>",r=0;r<e.length;r++){var c=e[r];a+="<tr><td>".concat(t++,"</td>\n                    <td style=\"mso-number-format:'@';\">").concat(c.trade_no||"\t","</td>\n                    <td>").concat(c.amount||"\t","</td>\n                    <td>").concat(c.trans_time&&this.$dayjs(1e3*c.trans_time).format("YYYY-MM-DD")+"\t","</td>\n                    <td>").concat(c.receipt_amount||"\t","</td>\n                    <td>").concat(c.buyer_pay_amount||"\t","</td>\n                    <td>").concat(c.status?1===c.status?"进行中":"充值成功":"\t","</td> \n                    <td>").concat(c.is_recharge?1===c.is_recharge?"是":"否":"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(c.seller_id||"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(c.buyer_id||"\t","</td>\n                    <td>").concat(c.remark?c.remark.replace('"',"").replace('"',""):"\t","</td>\n                    <td>").concat(c.pay_time?this.$dayjs(1e3*c.pay_time).format("YYYY-MM-DD"):"\t","</td>\n                    <td>").concat(c.gmt_create?this.$dayjs(1e3*c.gmt_create).format("YYYY-MM-DD"):"\t","</td>\n                </tr>")}Object(n.i)("充值记录数据",a)},exportAccount:function(e){for(var t=1,a="<tr>\n              <td>编号</td>\n              <td>仓库名称</td>\n              <td>交易号</td>\n              <td>资金流向</td>\n              <td>交易类型</td>\n              <td>订单编号</td>\n              <td>交易金额</td>\n              <td>交易状态</td>\n              <td>当前剩余金额</td>\n              <td>清关费用</td>\n              <td>头程物流费用</td>\n              <td>仓库操作费</td>\n              <td>备注</td>\n              <td>交易时间</td>\n            </tr>",r=0;r<e.length;r++){var c=e[r];a+="<tr><td>".concat(t++,"</td>\n                    <td>").concat(c.warehouse_name||"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(c.trans_number||"\t","</td>\n                    <td>").concat(c.type&&1===c.type?"收入":"支出\t","</td>\n                    <td>").concat(c.trans_type?this.changeTypeName(c.trans_type,this.tradeTypeList):"\t","</td>\n                    <td>").concat(c.package_order_sn||"\t","</td>\n                    <td>").concat(c.amount||"\t","</td> \n                    <td>").concat(c.trans_status?this.changeTypeName(c.trans_status,this.tradeStatusList):"\t","</td>\n                    <td>").concat(c.current_amount||"\t","</td>\n                    <td>").concat(c.customs_money||"\t","</td>\n                    <td>").concat(c.first_express_money||"\t","</td>\n                    <td>").concat(c.warhouse_money||"\t","</td>\n                    <td>").concat(c.remark||"\t","</td>\n                    <td>").concat(c.trans_time||"\t","</td>\n                </tr>")}Object(n.i)("用户账单记录数据",a)},getAppUid:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$appConfig.getUserInfo();case 2:a=t.sent,e.mappingUid=a.mapping_uid,e.muid=a.muid;case 5:case"end":return t.stop()}}),t)})))()},searchUserBalance:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.balanceLoading=!0,a={app_uid:e.muid},t.prev=2,t.next=5,e.$XzyNetMessageService.post("xzy.UserGetUserDetail",a);case 5:a=t.sent,a=a&&JSON.parse(a),(a=a&&a.data&&JSON.parse(a.data))&&200===a.code&&(e.userBalance=a.data.amount),t.next=13;break;case 11:t.prev=11,t.t0=t.catch(2);case 13:e.balanceLoading=!1;case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()},searchBillRecord:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={app_uid:e.muid,page_size:e.pageSize,page:e.currentPage,trans_time:e.tradeTime.length?e.tradeTime[0]+" 00:00:00/"+e.tradeTime[1]+" 23:59:59":"",package_order_sn:e.orderNumber,trans_type:e.tradeType},e.tableLoading=!0,t.prev=2,t.next=5,e.$XzyNetMessageService.post("xzy.UserGetUserAccountAmount",a);case 5:a=t.sent,a=a&&JSON.parse(a),(a=a&&a.data&&JSON.parse(a.data))&&200===a.code&&(e.tableData=a.data.data,e.total=a.data.total),t.next=13;break;case 11:t.prev=11,t.t0=t.catch(2);case 13:e.tableLoading=!1;case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()},searchRechargeRecord:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={app_uid:e.muid,page_size:e.pageSize,page:e.currentPage,trans_time:e.tradeTime.length?e.tradeTime[0]+" 00:00:00/"+e.tradeTime[1]+" 23:59:59":""},e.tableLoading=!0,t.prev=2,t.next=5,e.$XzyNetMessageService.post("xzy.UserGetUserRecharge",a);case 5:a=t.sent,a=a&&JSON.parse(a),(a=a&&a.data&&JSON.parse(a.data))&&200===a.code&&(e.tableData=a.data.data,e.total=a.data.total),t.next=13;break;case 11:t.prev=11,t.t0=t.catch(2);case 13:e.tableLoading=!1;case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()},changeTypeName:function(e,t){return t=t.find((function(t){return t.value===e})),t?t.label:""},setDateFmt:function(e){var t=[];return t[0]=e[0]+" 00:00:00",t[1]=e[1]+" 23:59:59",t},handleClick:function(){this.pageSize=20,this.currentPage=1,this.total=0,this.tableData=[],this.tradeTime=[],this.tradeType="",this.orderNumber="","rechargeRecord"===this.activeName?this.searchRechargeRecord():"accountRecord"===this.activeName&&this.searchBillRecord()},handleCurrentChange:function(e){this.currentPage=e,"rechargeRecord"===this.activeName?this.searchRechargeRecord():"accountRecord"===this.activeName&&this.searchBillRecord()},handleSizeChange:function(e){this.pageSize=e,"rechargeRecord"===this.activeName?this.searchRechargeRecord():"accountRecord"===this.activeName&&this.searchBillRecord()}}};a("7544"),a=a("2877"),c=Object(a.a)(c,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"store-finance"},[a("div",{staticClass:"herder-bar"},[a("div",{staticClass:"account-box mar-right"},[a("span",{staticClass:"account-title"},[e._v("余额信息")]),a("div",{staticClass:"account-item"},[e.balanceLoading?a("span",[e._v("余额："),a("span",{staticClass:"warning-style"},[e._v("获取中...")])]):a("span",[e._v("余额："),a("span",{staticClass:"warning-style"},[e._v(e._s(e.userBalance)+" 元")])]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.searchUserBalance}},[e._v("刷新余额")])],1)]),a("div",{staticClass:"account-box"},[a("span",{staticClass:"account-title"},[e._v("充值")]),a("div",{staticClass:"account-item"},[a("div",{staticClass:"acount-item-sub mar-right"},[a("span",[e._v("充值金额：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",clearable:""},model:{value:e.rechargeMoney,callback:function(t){e.rechargeMoney=t},expression:"rechargeMoney"}})],1),a("div",{staticClass:"acount-item-sub mar-right"},[a("span",[e._v("充值备注：")]),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",clearable:""},model:{value:e.rechargeRemark,callback:function(t){e.rechargeRemark=t},expression:"rechargeRemark"}})],1),a("div",{staticClass:"acount-item-sub"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.userRecharge}},[e._v("充值")])],1)])])]),a("div",{staticClass:"tab-box"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"用户充值记录",name:"rechargeRecord"}}),a("el-tab-pane",{attrs:{label:"用户账单记录",name:"accountRecord"}})],1)],1),a("div",{staticClass:"content"},[a("div",{staticClass:"btn-box"},[a("div",{staticClass:"btn-item mar-right"},[e._v(" 交易时间： "),a("el-date-picker",{staticStyle:{width:"207px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.tradeTime,callback:function(t){e.tradeTime=t},expression:"tradeTime"}})],1),"accountRecord"===e.activeName?a("div",{staticClass:"btn-item mar-right"},[e._v(" 交易类型： "),a("el-select",{attrs:{size:"mini"},model:{value:e.tradeType,callback:function(t){e.tradeType=t},expression:"tradeType"}},e._l(e.tradeTypeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1):e._e(),"accountRecord"===e.activeName?a("div",{staticClass:"btn-item mar-right"},[e._v(" 订单号： "),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",clearable:""},model:{value:e.orderNumber,callback:function(t){e.orderNumber=t},expression:"orderNumber"}})],1):e._e(),"rechargeRecord"===e.activeName?a("div",[a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:e.searchRechargeRecord}},[e._v("搜 索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportTableData}},[e._v("导 出")])],1):e._e(),"accountRecord"===e.activeName?a("div",[a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:e.searchBillRecord}},[e._v("搜 索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportTableData}},[e._v("导 出")])],1):e._e()]),"rechargeRecord"===e.activeName?a("div",{staticClass:"container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{height:"calc(100vh - 257px)",data:e.tableData,"tooltip-effect":"dark","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s((e.currentPage-1)*e.pageSize+t.$index+1))]}}],null,!1,2114148009)}),a("el-table-column",{attrs:{"min-width":"180px",label:"内部交易单号",prop:"trade_no",align:"center",fixed:""}}),a("el-table-column",{attrs:{"min-width":"100px",label:"充值金额",prop:"amount",align:"center"}}),a("el-table-column",{attrs:{align:"center",label:"交易时间","min-width":"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$dayjs(1e3*t.row.trans_time).format("YYYY-MM-DD"))+" ")]}}],null,!1,2622924746)}),a("el-table-column",{attrs:{align:"center",prop:"receipt_amount",label:"实收金额","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"buyer_pay_amount",label:"买家付款金额","min-width":"100px"}}),a("el-table-column",{attrs:{label:"交易状态",align:"center","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.status?[e._v(" "+e._s(1===t.row.status?"进行中":"充值成功")+" ")]:void 0}}],null,!0)}),a("el-table-column",{attrs:{prop:"is_recharge",label:"是否已充值",align:"center","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.is_recharge?[e._v(" "+e._s(1===t.row.is_recharge?"是":"否")+" ")]:void 0}}],null,!0)}),a("el-table-column",{attrs:{align:"center",prop:"seller_id",label:"买家支付宝用户号","min-width":"180px"}}),a("el-table-column",{attrs:{align:"center",prop:"buyer_id",label:"买家支付宝唯一用户号","min-width":"180px"}}),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"备注","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return t=t.row,[e._v(" "+e._s(t.remark?t.remark.replace('"',"").replace('"',""):"--")+" ")]}}],null,!1,544339742)}),a("el-table-column",{attrs:{align:"center",label:"支付时间","min-width":"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$dayjs(1e3*t.row.pay_time).format("YYYY-MM-DD"))+" ")]}}],null,!1,1242640120)}),a("el-table-column",{attrs:{align:"center",label:"交易创建时间","min-width":"180px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$dayjs(1e3*t.row.gmt_create).format("YYYY-MM-DD"))+" ")]}}],null,!1,1837621471)})],1)],1):e._e(),"accountRecord"===e.activeName?a("div",{staticClass:"container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableData,height:"calc(100vh - 258px)","tooltip-effect":"dark","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s((e.currentPage-1)*e.pageSize+t.$index+1))]}}],null,!1,2114148009)}),a("el-table-column",{attrs:{"min-width":"150px",label:"仓库名称",prop:"warehouse_name",align:"center"}}),a("el-table-column",{attrs:{"min-width":"150px",label:"交易号",prop:"trans_number",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"type",label:"资金流向","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.type?[e._v(" "+e._s(1===t.row.type?"收入":"支出")+" ")]:void 0}}],null,!0)}),a("el-table-column",{attrs:{align:"center",prop:"trans_type",label:"交易类型","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.changeTypeName(t.row.trans_type,e.tradeTypeList))+" ")]}}],null,!1,1099621800)}),a("el-table-column",{attrs:{align:"center",prop:"package_order_sn",label:"订单编号","min-width":"180px"}}),a("el-table-column",{attrs:{prop:"amount",label:"交易金额",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"trans_status",label:"交易状态","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.changeTypeName(t.row.trans_status,e.tradeStatusList))+" ")]}}],null,!1,3306742504)}),a("el-table-column",{attrs:{align:"center",prop:"current_amount",label:"当前剩余金额","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"customs_money",label:"清关费用","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"first_express_money",label:"头程物流费用","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"warhouse_money",label:"仓库操作费","min-width":"100px"}}),a("el-table-column",{attrs:{align:"center",prop:"order_outbound_img",label:"出库图片","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.order_outbound_img?a("el-image",{attrs:{src:t.row.order_outbound_img}}):e._e()]}}],null,!1,755080695)}),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"备注",width:"120px","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",prop:"trans_time",label:"交易时间","min-width":"180px",fixed:"right"}})],1)],1):e._e(),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)])])}),[],!1,null,"21ca3146",null);t.default=c.exports},7544:function(e,t,a){"use strict";a("d272")},d272:function(e,t,a){}}]);