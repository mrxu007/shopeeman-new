(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-605f2413"],{"37be":function(t,e,a){"use strict";a("bd09")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},bd09:function(t,e,a){},bfc9:function(t,e,a){"use strict";a.r(e);var n=a("1da1"),s=(a("159b"),a("99af"),a("fb6a"),a("7db0"),a("96cf"),a("feb6")),i=a("0e0b");s={components:{storeChoose:s.a},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},showConsole:!0,countryVal:"",groupId:"",selectMallList:[],recordTime:[],tableData:[],tableDataCut:[],tableLoading:!1,statusList:[{value:"0",label:"未知状态"},{value:"2",label:"提现中"},{value:"3",label:"已提现"},{value:"4",label:"提现失败"}],pageSize:20,currentPage:1,total:0,mallPageSize:50,totalAmount:0}},mounted:function(){this.recordTime=Object(i.e)(30)},methods:{changeMallList:function(t){this.selectMallList=t},searchRecord:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.selectMallList.length){e.next=2;break}return e.abrupt("return",t.$message.warning("请选择店铺"));case 2:t.totalAmount=0,t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.tableData=[],t.tableDataCut=[],t.total=0,t.tableLoading=!0,t.$refs.Logs.writeLog("开始同步！",!0),a=0;case 11:if(!(a<t.selectMallList.length)){e.next=21;break}if(t.cancelAction)return e.abrupt("return");e.next=14;break;case 14:return n=t.selectMallList[a],e.next=18,t.getRecordList(1,n);case 18:a++,e.next=11;break;case 21:t.dataCut(),t.tableLoading=!1;case 23:case"end":return e.stop()}}),e)})))()},getRecordList:function(t,e){var a=this;return Object(n.a)(regeneratorRuntime.mark((function s(){var i,l;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return i={wallet_type:0,page_number:t,page_size:a.mallPageSize,start_date:a.recordTime[0],end_date:a.recordTime[1],transaction_types:"201,203",shop_id:e.platform_mall_id},s.prev=1,s.next=4,a.$shopeemanService.getWithDrawalRecord(e.country,i);case 4:l=s.sent,200===(i=JSON.parse(l)).status?0===(l=JSON.parse(i.data)).code?(l.data.list&&l.data.list.forEach(function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(n){var s,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.country=e.country,n.platform_mall_name=e.platform_mall_name,n.mall_alias_name=e.mall_alias_name,n.platform_mall_id=e.platform_mall_id,t.next=6,a.$shopeemanService.getBankAccount(e.country,{bank_account_id:n.bank_account_id,shop_id:e.platform_mall_id});case 6:i=t.sent,200===(s=i&&JSON.parse(i)).status?0===(i=JSON.parse(s.data)).code&&(n.bank_name=i.data.bank_name,n.bank_account_number=i.data.account_number,n.bank_account_name=i.data.full_name,n.ic_number=i.data.ic_number):403===s.status?a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1),a.totalAmount+=-1*n.amount,a.tableData.push(n),a.total=a.tableData.length;case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取到第【").concat(t,"】页提现记录数据【").concat(l.data.list.length,"】条"),!0),l.data.list.length>=a.mallPageSize&&(t++,a.getRecordList(t,e))):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】").concat(l.message),!1):403===i.status?a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1),s.next=11;break;case 9:s.prev=9,s.t0=s.catch(1);case 11:case"end":return s.stop()}}),s,null,[[1,9]])})))()},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n              <td>编号</td>\n              <td>站点</td>\n              <td>店铺名</td>\n              <td>交易流水号</td>\n              <td>银行</td>\n              <td>持卡人</td>\n              <td>银行卡号</td>\n              <td>IcNumber</td>\n              <td>提现金额</td>\n              <td>提现时间</td>\n              <td>完成时间</td>\n              <td>提现状态</td>\n            </tr>",a=0;a<this.tableData.length;a++){var n=this.tableData[a];e+="<tr><td>".concat(t++,"</td>\n                    <td>").concat(n.country?this.$filters.chineseSite(n.country):"\t","</td>\n                    <td>").concat(n.platform_mall_name||"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(n.transaction_id&&n.transaction_id+"\t","</td>\n                    <td>").concat(n.bank_name||"\t","</td>\n                    <td>").concat(n.bank_account_name||"\t","</td>\n                    <td>").concat(n.bank_account_number||"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(n.ic_number||"\t","</td>\n                    <td>").concat(n.amount?-1*n.amount:"\t","</td>\n                    <td>").concat(n.ctime?this.$dayjs(1e3*n.ctime).format("YYYY-MM-DD HH:mm:ss"):"\t","</td>\n                    <td>").concat(n.complete_time?this.$dayjs(1e3*n.complete_time).format("YYYY-MM-DD HH:mm:ss"):"\t","</td>\n                    <td>").concat(n.status?this.changeTypeName(n.status,this.statusList):"\t","</td>\n                </tr>")}Object(i.h)("提现记录",e)},dataCut:function(){this.tableDataCut=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,this.dataCut()},handleSizeChange:function(t){this.pageSize=t,this.dataCut()},changeTypeName:function(t,e){return e=e.find((function(e){return e.value==t})),e?e.label:""}}},a("37be"),a=a("2877"),s=Object(a.a)(s,(function(){var t=this,e=t.$createElement;e=t._self._c||e;return e("div",{staticClass:"drawal-record"},[e("div",{staticClass:"tool-bar"},[e("div",{staticClass:"tool-row"},[e("storeChoose",{on:{changeMallList:t.changeMallList}})],1),e("div",{staticClass:"tool-row"},[e("div",{staticClass:"tool-item mar-right"},[e("span",[t._v("时间：")]),e("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.recordTime,callback:function(e){t.recordTime=e},expression:"recordTime"}})],1),e("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.searchRecord}},[t._v("查询提现记录")]),e("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导 出")]),e("el-checkbox",{staticClass:"mar-right",model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")]),e("div",{staticClass:"activeColor"},[t._v("当前提现金额合计："+t._s(parseFloat(t.totalAmount).toFixed(2)))])],1)]),e("div",{staticClass:"content"},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableDataCut,"tooltip-effect":"dark",height:"calc(100vh - 215px)"}},[e("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),e("el-table-column",{attrs:{"min-width":"80px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e=e.row,[t._v(" "+t._s(t._f("chineseSite")(e.country))+" ")]}}])}),e("el-table-column",{attrs:{"min-width":"80px",label:"店铺名称",prop:"platform_mall_name",align:"center"}}),e("el-table-column",{attrs:{align:"center",prop:"transaction_id",label:"交易流水号","min-width":"120"}}),e("el-table-column",{attrs:{align:"center",prop:"bank_name",label:"银行","min-width":"70"}}),e("el-table-column",{attrs:{align:"center",prop:"bank_account_name",label:"持卡人","min-width":"70"}}),e("el-table-column",{attrs:{prop:"bank_account_number",label:"银行卡号",align:"center","min-width":"120px"}}),e("el-table-column",{attrs:{align:"center",prop:"ic_number",label:"IcNumber","min-width":"100"}}),e("el-table-column",{attrs:{align:"center",prop:"amount",label:"提现金额","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(-1*e.row.amount)+" "+t._s(t._f("siteCoin")(e.row.country)))]}}])}),e("el-table-column",{attrs:{align:"center",prop:"ctime",label:"提现时间","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$dayjs(1e3*e.row.ctime).format("YYYY-MM-DD HH:mm:ss")))]}}])}),e("el-table-column",{attrs:{align:"center",prop:"complete_time",label:"完成时间","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0===e.row.complete_time?"":t.$dayjs(1e3*e.row.complete_time).format("YYYY-MM-DD HH:mm:ss")))]}}])}),e("el-table-column",{attrs:{align:"center",prop:"status",label:"提现状态","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.changeTypeName(e.row.status,t.statusList)))]}}])})],1),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{background:"","page-sizes":[20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1),e("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)}),[],!1,null,"a073b7a2",null);e.default=s.exports},feb6:function(t,e,a){"use strict";var n=a("1da1"),s=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),i={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s.a(this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;this.isAllowSet2&&(this.isAllowSet2=!1,-1<e.indexOf("")!=(e=-1<t.indexOf(""))?e?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:e?this.groupId=t.slice(1):0<this.groupIdList.length&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10))},deep:!0},site:{handler:function(t,e){var a=this;this.isAllowSet1&&(this.isAllowSet1=!1,-1<e.indexOf("")!=(e=-1<t.indexOf(""))?e?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:e?this.site=t.slice(1):0<this.siteList.length&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0})))},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},changeSelect:function(t){return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,n=-1<e.groupId.indexOf("")&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:n},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:200===(n=t.sent).code?(e.siteList=n.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(n){var s;n&&(s=t.siteList.filter((function(t){return t.platform_mall_id===n})),e.push(s[0]),a+=n+",")})),!this.countryVal&&-1<this.groupId.indexOf("")&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e.country=this.countryVal,this.$emit("changeMallList",e))}}};a("8992"),a=a("2877"),i=Object(a.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])}),[],!1,null,null,null);e.a=i.exports}}]);