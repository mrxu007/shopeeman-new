(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-912f9e10"],{"4c28":function(t,e,a){},"68c0":function(t,e,a){"use strict";a.r(e);var n=a("1da1"),i=(a("96cf"),a("ac1f"),a("841c"),a("159b"),a("4de4"),a("99af"),a("b680"),a("a9e3"),a("feb6")),s=a("0e0b");i={components:{storeChoose:i.a},data:function(){return{isLoading:!1,orgin:"",to_back_amount:"",haved_amount:"",exportList:[],tableList:[],total:0,mallList_gruop:[],mallList_mall:[],site_query:{country:"TH",typeCoin:"฿",rate_coin:""},plantform_mallID:"",mallGroupId:[],all_mallgruopID:[],query:{sysMallId:[],orderSn:"",status:"",appropriateTime:""},page:1,pageSize:20,cloumn_date:[],pickerOptions:{},showRMB:!1,showConsole:!0,selectMallList:[],mallPageSize:50,cancelActive:!1}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.cloumn_date=[(new Date).getTime()-864e6,(new Date).getTime()+1728e6],e.next=3,Object(s.p)((function(){return t.selectMallList&&t.selectMallList[0]}),50);case 3:return e.next=5,t.search();case 5:return e.next=7,t.exchangeRateList();case 7:case"end":return e.stop()}}),e)})))()},methods:{clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(t){this.selectMallList=t,this.site_query.country=this.selectMallList.country,this.exchangeRateList()},updataMall:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.selectMallList.length||t.$message.warning("请选择要同步的店铺！"),t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.$refs.Logs.writeLog("开始同步",!0),e.prev=4,a=0;case 6:if(!(a<t.selectMallList.length)){e.next=31;break}if(t.cancelActive)return t.$refs.Logs.writeLog("操作已取消！",!0),e.abrupt("return");e.next=10;break;case 10:if(n=t.selectMallList[a],i=1,t.$refs.Logs.writeLog("开始同步店铺【".concat(n.platform_mall_name,"】对账信息"),!0),""===t.query.status)return e.next=16,t.searchSingleMall(i,n,0);e.next=20;break;case 16:return e.next=18,t.searchSingleMall(i,n,2);case 18:e.next=28;break;case 20:if("1"===t.query.status)return e.next=23,t.searchSingleMall(i,n,0);e.next=25;break;case 23:e.next=28;break;case 25:if("2"===t.query.status)return e.next=28,t.searchSingleMall(i,n,2);e.next=28;break;case 28:a++,e.next=6;break;case 31:e.next=35;break;case 33:e.prev=33,e.t0=e.catch(4);case 35:t.search();case 36:case"end":return e.stop()}}),e,null,[[4,33]])})))()},searchSingleMall:function(t,e,a){var i=arguments,s=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var r,o,l,c,u;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=3<i.length&&void 0!==i[3]?i[3]:[],o=4<i.length&&void 0!==i[4]?i[4]:0,s.cancelActive)return s.$refs.Logs.writeLog("操作已取消！",!0),n.abrupt("return");n.next=5;break;case 5:return l={tran_type:a,page_number:t,page_size:s.mallPageSize,shop_id:e.platform_mall_id},0===a&&(l.start_date=s.$dayjs(s.cloumn_date[0]).format("YYYY-MM-DD"),l.end_date=s.$dayjs(s.cloumn_date[1]).format("YYYY-MM-DD")),n.next=9,s.$shopeemanService.getIncomeTransaction(e.country,l);case 9:c=n.sent,(l=c&&JSON.parse(c))&&200===l.status?0===(c=JSON.parse(l.data)).code&&(u=c.data.list.length,c.data.list&&c.data.list.forEach((function(t){var e={order_id:t.order_id+"",status:1===t.status?"1":"2",bill_num:t.id+"",amount:t.amount+"",using_wallet:t.using_wallet?"1":"0",release_time:s.$dayjs(1e3*t.release_time).format("YYYY-MM-DD HH:mm:ss")};t=r.filter((function(t){return t.bill_num===e.bill_num}))[0]||"";t&&u--,t||r.push(e)})),u&&s.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】【").concat(0===a?"已拨款":"即将拨款","】第【").concat(++o,"】页货款对账数据【").concat(u,"】条"),!0),r.length<c.data.page_info.total&&c.data.list.length>=s.mallPageSize?(t++,s.searchSingleMall(t,e,a,r,o)):(""===s.query.status&&2===a||s.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】数据完成"),!0),r.length&&s.UploadRecordData(e.platform_mall_id,r))):l&&403===l.status?""===s.query.status&&2===a||s.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):""===s.query.status&&2===a||s.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1);case 12:case"end":return n.stop()}}),n)})))()},UploadRecordData:function(t,e){var a=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i={mallId:t,bills:e},n.next=3,a.$api.uploadPaymentList(i);case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()},compete_Coin:function(){!1===this.showRMB?(this.to_back_amount=(this.to_back_amount/this.site_query.rate_coin).toFixed(2),this.haved_amount=(this.haved_amount/this.site_query.rate_coin).toFixed(2),this.site_query.typeCoin=this.orgin):(this.orgin=this.site_query.typeCoin,this.to_back_amount=(this.site_query.rate_coin*this.to_back_amount).toFixed(2),this.haved_amount=(this.site_query.rate_coin*this.haved_amount).toFixed(2),this.site_query.typeCoin="￥")},exchangeRateList:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.exchangeRateList();case 2:200===(a=e.sent).data.code?t.site_query.rate_coin=a.data.data[t.site_query.country]:t.$message.warning("网络请求失败");case 4:case"end":return e.stop()}}),e)})))()},export_table:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n,i,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0===t.total)return e.abrupt("return",t.$message("暂无导出数据"));e.next=2;break;case 2:a=[],t.isLoading=!0,(n=JSON.parse(JSON.stringify(t.query))).pageSize=200,n.page=1;case 7:if(a.length<t.total)return e.prev=8,e.next=11,t.$api.getPaymentList(n);e.next=27;break;case 11:if(200!==(i=e.sent).data.code){e.next=17;break}a=a.concat(i.data.data.data),n.page++,e.next=19;break;case 17:return t.$refs.Logs.writeLog("导出数据错误"),e.abrupt("break",27);case 19:e.next=25;break;case 21:return e.prev=21,e.t0=e.catch(8),t.$refs.Logs.writeLog("导出数据异常"),e.abrupt("break",27);case 25:e.next=7;break;case 27:r="<tr>\n              <td>序号</td>\n              <td>站点</td>\n              <td>店铺名称</td>\n              <td>订单编号</td>\n              <td>状态</td>\n              <td>拨款编号</td>\n              <td>拨款金额</td>\n              <td>拨款金额（RMB）</td>\n              <td>拨款时间</td>\n            </tr>",a.forEach((function(e,a){r+="<tr>\n              <td>".concat(a+1,"</td>\n              <td>").concat(e.country?t.$filters.chineseSite(e.country):"-\t","</td>\n              <td>").concat(e.platform_mall_name||"-\t","</td>\n              <td>").concat(e.order_sn||"-\t","</td>\n              <td>").concat(e.status&&1===Number(e.status)?"已拨款":"即将拨款\t","</td>\n              <td>").concat(e.bill_num||"-\t","</td>\n              <td>").concat(e.appropriate_amount||"-\t","</td>\n              <td>").concat(e.appropriate_amount?(e.appropriate_amount*t.site_query.rate_coin).toFixed(2):"-\t","</td>\n              <td>").concat(e.appropriate_time||"-\t","</td>\n            </tr>")})),Object(s.i)("货款对账详情",r),t.isLoading=!1;case 31:case"end":return e.stop()}}),e,null,[[8,21]])})))()},search:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0===(null===(a=t.selectMallList)||void 0===a?void 0:a.length))return e.abrupt("return",t.$message("请选择店铺"));e.next=2;break;case 2:return t.isLoading=!0,n=t.query,i="",t.selectMallList.forEach((function(t,e){i=0===e?t.id:i+","+t.id})),n.sysMallId=i,n.appropriateTime=0<=(null===(a=t.cloumn_date)||void 0===a?void 0:a.length)?t.$dayjs(t.cloumn_date[0]).format("YYYY-MM-DD")+" 00:00:00/"+t.$dayjs(t.cloumn_date[1]).format("YYYY-MM-DD")+" 23:59:59":"",n.page=t.page,n.pageSize=t.pageSize,e.next=12,t.getTableList(n);case 12:case"end":return e.stop()}}),e)})))()},getTableList:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$api.getPaymentList(t);case 2:200===(n=a.sent).data.code?(e.tableList=n.data.data.data,e.total=n.data.data.total,e.to_back_amount=n.data.data.to_back_amount,e.haved_amount=n.data.data.haved_amount,e.site_query.typeCoin=e.$shopeeManConfig.getSiteCoinSymbol(e.site_query.country)):e.$message.warning("数据请求失败！"),e.isLoading=!1;case 5:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(t){this.pageSize=t,this.search()},handleCurrentChange:function(t){this.page=t,this.search()}}},a("a680"),a=a("2877"),i=Object(a.a)(i,(function(){var t=this,e=t.$createElement;e=t._self._c||e;return e("div",{staticClass:"content"},[e("div",{staticClass:"overdata_view"},[e("div",{staticClass:"account-box"},[e("span",{staticClass:"account-title"},[t._v("金额总览")]),e("div",{staticClass:"account-item"},[e("span",[t._v("即将拨款：")]),e("h3",[t._v(t._s(t.to_back_amount)+t._s(t.site_query.typeCoin))]),e("div",{staticStyle:{width:"20px"}}),e("span",[t._v("已完成拨款：")]),e("h3",[t._v(t._s(t.haved_amount)+t._s(t.site_query.typeCoin))])])])]),e("div",{staticClass:"all_condition"},[e("div",{staticClass:"condition_box"},[e("div",{staticClass:"condition_item"},[e("storeChoose",{attrs:{"is-all":!1},on:{changeMallList:t.changeMallList}})],1),e("div",{staticClass:"condition_item"},[e("span",{staticClass:"w80"},[t._v("平台店铺ID：")]),e("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",placeholder:"输入多个ID请使用,隔开",size:"mini"},model:{value:t.plantform_mallID,callback:function(e){t.plantform_mallID=e},expression:"plantform_mallID"}})],1)]),e("div",{staticClass:"condition_box"},[e("div",{staticClass:"condition_item"},[e("span",{staticClass:"w80"},[t._v("状态：")]),e("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"站点"},model:{value:t.query.status,callback:function(e){t.$set(t.query,"status",e)},expression:"query.status"}},[e("el-option",{attrs:{value:"",label:"全部"}}),e("el-option",{attrs:{label:"已拨款",value:"1"}}),e("el-option",{attrs:{label:"即将拨款",value:"2"}})],1)],1),e("div",{staticClass:"condition_item"},[e("span",{staticClass:"w80"},[t._v("订单编号：")]),e("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"订单编号",size:"mini",clearable:""},model:{value:t.query.orderSn,callback:function(e){t.$set(t.query,"orderSn",e)},expression:"query.orderSn"}})],1),e("div",{staticClass:"condition_item"},[e("span",{staticClass:"w80"},[t._v("拨款时间：")]),e("el-date-picker",{staticStyle:{width:"240px"},attrs:{size:"mini",type:"daterange","unlink-panels":"","range-separator":"-","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.cloumn_date,callback:function(e){t.cloumn_date=e},expression:"cloumn_date"}})],1),e("div",{staticClass:"condition_item"},[e("div",[e("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"grey"},on:{change:function(e){return t.compete_Coin()}},model:{value:t.showRMB,callback:function(e){t.showRMB=e},expression:"showRMB"}}),e("span",[t._v("显示人民币：")]),e("span",[t._v("(当前汇率："+t._s(t.site_query.rate_coin||"暂无该站点的汇率")+")")])],1)])]),e("div",{staticClass:"condition_box",staticStyle:{"padding-left":"20px"}},[e("div",{staticClass:"condition_item"},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.search}},[t._v("搜索")]),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!1,t.updataMall()}}},[t._v("同步数据")]),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!0}}},[t._v("取消同步")]),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearLog}},[t._v("清空日志")]),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.export_table(1),t.exportList=[]}}},[t._v("导出 ")]),e("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v(" 隐藏日志")])],1)])]),e("div",{staticClass:"table_clo"},[e("div",{staticClass:"data_table",staticStyle:{height:"100%","background-color":"white"}},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{height:"calc(100vh - 266px)",data:t.tableList,"row-style":{height:"50px"},"header-cell-style":{background:"#f7fafa"}}},[e("el-table-column",{attrs:{label:"序号",width:"60",type:"index",align:"center"}}),e("el-table-column",{attrs:{prop:"country",width:"120px",label:"站点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e=e.row,[t._v(" "+t._s(t._f("chineseSite")(e.country))+" ")]}}])}),e("el-table-column",{attrs:{"min-width":"120px",label:"店铺名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e=e.row,[t._v(" "+t._s(e.mall_alias_name||e.platform_mall_name)+" ")]}}])}),e("el-table-column",{attrs:{prop:"order_sn",label:"订单编号","min-width":"120px",align:"center"}}),e("el-table-column",{attrs:{prop:"","min-width":"80px",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e=e.row,[t._v(t._s(1===Number(e.status)?"已拨款 ":"即将拨款"))]}}])}),e("el-table-column",{attrs:{prop:"bill_num",width:"100px",label:"拨款单号",align:"center"}}),e("el-table-column",{attrs:{prop:"appropriate_amount",label:"拨款金额",align:"center"}}),e("el-table-column",{attrs:{prop:"",label:"拨款金额(RMB)",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e=e.row,[t._v(t._s((e.appropriate_amount*t.site_query.rate_coin).toFixed(2)))]}}])}),e("el-table-column",{attrs:{prop:"appropriate_time",label:"拨款时间",width:"160px",align:"center"}})],1),e("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end",margin:"4px 0px"}},[e("el-pagination",{attrs:{background:"","current-page":t.query.page,"page-sizes":[20,50,100,200],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.query,"page",e)},"update:current-page":function(e){return t.$set(t.query,"page",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)]),e("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)}),[],!1,null,null,null);e.default=i.exports},8992:function(t,e,a){"use strict";a("4c28")},a680:function(t,e,a){"use strict";a("ac1d")},ac1d:function(t,e,a){},feb6:function(t,e,a){"use strict";var n=a("1da1"),i=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),s={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new i.a(this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;this.isAllowSet2&&(this.isAllowSet2=!1,-1<e.indexOf("")!=(e=-1<t.indexOf(""))?e?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:e?this.groupId=t.slice(1):0<this.groupIdList.length&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10))},deep:!0},site:{handler:function(t,e){var a=this;this.isAllowSet1&&(this.isAllowSet1=!1,-1<e.indexOf("")!=(e=-1<t.indexOf(""))?e?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:e?this.site=t.slice(1):0<this.siteList.length&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0})))},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},changeSelect:function(t){return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,n=-1<e.groupId.indexOf("")&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:n},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:200===(n=t.sent).code?(e.siteList=n.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(n){var i;n&&(i=t.siteList.filter((function(t){return t.platform_mall_id===n})),e.push(i[0]),a+=n+",")})),!this.countryVal&&-1<this.groupId.indexOf("")&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e.country=this.countryVal,this.$emit("changeMallList",e))}}};a("8992"),a=a("2877"),s=Object(a.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])}),[],!1,null,null,null);e.a=s.exports}}]);