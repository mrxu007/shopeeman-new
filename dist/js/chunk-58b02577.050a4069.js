(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58b02577"],{"05a7":function(t,e,a){"use strict";a("b607")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},b607:function(t,e,a){},bfc9:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"drawal-record"},[a("div",{staticClass:"tool-bar"},[a("div",{staticClass:"tool-row"},[a("storeChoose",{attrs:{"is-all":!0},on:{changeMallList:t.changeMallList}})],1),a("div",{staticClass:"tool-row"},[a("div",{staticClass:"tool-item mar-right"},[a("span",[t._v("时间：")]),a("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.recordTime,callback:function(e){t.recordTime=e},expression:"recordTime"}})],1),a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.searchRecord}},[t._v("查询提现记录")]),a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导 出")]),a("el-checkbox",{staticClass:"mar-right",model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")]),a("div",{staticClass:"activeColor"},[t._v("当前提现金额合计："+t._s(t.totalAmount))])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableData,"tooltip-effect":"dark",height:"calc(100vh - 215px)"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("el-table-column",{attrs:{"min-width":"80px",label:"站点",prop:"country",align:"center"}}),a("el-table-column",{attrs:{"min-width":"80px",label:"店铺名称",prop:"platform_mall_name",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"transaction_id",label:"交易流水号","min-width":"120"}}),a("el-table-column",{attrs:{align:"center",prop:"bank_name",label:"银行","min-width":"70"}}),a("el-table-column",{attrs:{align:"center",prop:"bank_account_name",label:"持卡人","min-width":"70"}}),a("el-table-column",{attrs:{prop:"bank_account_number",label:"银行卡号",align:"center","min-width":"120px"}}),a("el-table-column",{attrs:{align:"center",prop:"ic_number",label:"IcNumber","min-width":"100"}}),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"提现金额","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.amount)+" "+t._s(t._f("siteCoin")(e.row.country)))]}}])}),a("el-table-column",{attrs:{align:"center",prop:"ctime",label:"提现时间","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$dayjs(1e3*e.row.ctime).format("YYYY-MM-DD HH:mm:ss")))]}}])}),a("el-table-column",{attrs:{align:"center",prop:"complete_time",label:"完成时间","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$dayjs(1e3*e.row.complete_time).format("YYYY-MM-DD HH:mm:ss")))]}}])}),a("el-table-column",{attrs:{align:"center",prop:"status",label:"提现状态","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.changeTypeName(e.row.status,t.statusList)))]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)},l=[],i=a("1da1"),s=(a("159b"),a("99af"),a("fb6a"),a("7db0"),a("96cf"),a("feb6")),r=a("0e0b"),o={components:{storeChoose:s["a"]},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},showConsole:!0,countryVal:"",groupId:"",selectMallList:[],recordTime:[],tableData:[],tableDataCut:[],tableLoading:!1,statusList:[{value:"0",label:"未知状态"},{value:"2",label:"提现中"},{value:"3",label:"已提现"},{value:"4",label:"提现失败"}],pageSize:20,currentPage:1,total:0,mallPageSize:50,totalAmount:0}},mounted:function(){this.recordTime=Object(r["e"])(30)},methods:{changeMallList:function(t){this.selectMallList=t},searchRecord:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.selectMallList.length){e.next=2;break}return e.abrupt("return",t.$message.warning("请选择店铺"));case 2:t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.tableData=[],t.tableDataCut=[],t.total=0,t.tableLoading=!0,t.$refs.Logs.writeLog("开始同步！",!0),a=0;case 10:if(!(a<t.selectMallList.length)){e.next=20;break}if(!t.cancelAction){e.next=13;break}return e.abrupt("return");case 13:return n=t.selectMallList[a],l=1,e.next=17,t.getRecordList(l,n);case 17:a++,e.next=10;break;case 20:t.dataCut(),t.tableLoading=!1;case 22:case"end":return e.stop()}}),e)})))()},getRecordList:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var l,s,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return l={wallet_type:0,page_number:t,page_size:a.mallPageSize,start_date:a.recordTime[0],end_date:a.recordTime[1],transaction_types:"201,203",shop_id:e.platform_mall_id},n.prev=1,n.next=4,a.$shopeemanService.getWithDrawalRecord(e.country,l);case 4:s=n.sent,r=JSON.parse(s),200===r.status?(o=JSON.parse(r.data),0===o.code?(o.data.list&&o.data.list.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){var l,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.country=e.country,n.platform_mall_name=e.platform_mall_name,n.mall_alias_name=e.mall_alias_name,n.platform_mall_id=e.platform_mall_id,t.next=6,a.$shopeemanService.getBankAccount(e.country,{bank_account_id:n.bank_account_id,shop_id:e.platform_mall_id});case 6:l=t.sent,i=l&&JSON.parse(l),200===i.status?(s=JSON.parse(i.data),0===s.code&&(n.bank_name=s.data.bank_name,n.bank_account_number=s.data.account_number,n.bank_account_name=s.data.full_name,n.ic_number=s.data.ic_number)):403===i.status?a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1),a.totalAmount+=-1*n.amount/100,a.tableData.push(n),a.total=a.tableData.length;case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取到第【").concat(t,"】页提现记录数据【").concat(o.data.list.length,"】条"),!0),o.data.list.length>=a.mallPageSize&&(t++,a.getRecordList(t,e))):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】").concat(o.message),!1)):403===r.status?a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1),n.next=11;break;case 9:n.prev=9,n.t0=n["catch"](1);case 11:case"end":return n.stop()}}),n,null,[[1,9]])})))()},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n              <td>编号</td>\n              <td>站点</td>\n              <td>店铺名</td>\n              <td>交易流水号</td>\n              <td>银行</td>\n              <td>持卡人</td>\n              <td>银行卡号</td>\n              <td>IcNumber</td>\n              <td>提现金额</td>\n              <td>提现时间</td>\n              <td>完成时间</td>\n              <td>提现状态</td>\n            </tr>",a=0;a<this.tableData.length;a++){var n=this.tableData[a];e+="<tr><td>".concat(t++,"</td> \n                    <td>").concat(n.country?n.country:"\t","</td>\n                    <td>").concat(n.platform_mall_name?n.platform_mall_name:"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(n.transaction_id&&n.transaction_id+"\t","</td>\n                    <td>").concat(n.bank_name?n.bank_name:"\t","</td>\n                    <td>").concat(n.bank_account_name?n.bank_account_name:"\t","</td>\n                    <td>").concat(n.bank_account_number?n.bank_account_number:"\t","</td> \n                    <td style=\"mso-number-format:'@';\">").concat(n.ic_number?n.ic_number:"\t","</td>\n                    <td>").concat(n.amount?-1*n.amount:"\t","</td>\n                    <td>").concat(n.ctime?this.$dayjs(1e3*n.ctime).format("YYYY-MM-DD HH:mm:ss"):"\t","</td>\n                    <td>").concat(n.complete_time?this.$dayjs(1e3*n.complete_time).format("YYYY-MM-DD HH:mm:ss"):"\t","</td>\n                    <td>").concat(n.status?this.changeTypeName(n.status,this.statusList):"\t","</td>\n                </tr>")}Object(r["h"])("提现记录",e)},dataCut:function(){this.tableDataCut=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,this.dataCut()},handleSizeChange:function(t){this.pageSize=t,this.dataCut()},changeTypeName:function(t,e){var a="",n=e.find((function(e){return e.value==t}));return a=n?n.label:"",a}}},c=o,u=(a("05a7"),a("2877")),d=Object(u["a"])(c,n,l,!1,null,"a724386e",null);e["default"]=d.exports},feb6:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1)])])},l=[],i=a("1da1"),s=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),r={name:"StoreChoose",props:{showMallAll:{type:Boolean,default:!1},spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var n=e.indexOf("")>-1,l=t.indexOf("")>-1;n!==l?l?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:l?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var n=e.indexOf("")>-1,l=t.indexOf("")>-1;n!==l?l?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}))}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{changeSelect:function(t){return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,l,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,n=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),l={country:a,mallGroupIds:n},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(l);case 6:i=t.sent,200===i.code?(e.siteList=i.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[];this.site.forEach((function(a){if(a){var n=t.siteList.filter((function(t){return t.platform_mall_id===a}));e.push(n[0])}})),this.$emit("changeMallList",e),this.source?this.$emit("changeMallList",{mallList:e,source:this.source}):this.$emit("changeMallList",e)}}},o=r,c=(a("8992"),a("2877")),u=Object(c["a"])(o,n,l,!1,null,null,null);e["a"]=u.exports}}]);