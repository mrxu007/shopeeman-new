(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-057bc332"],{"4c28":function(t,e,a){},"5a71":function(t,e,a){},"68c0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"overdata_view"},[a("div",{staticClass:"account-box"},[a("span",{staticClass:"account-title"},[t._v("金额总览")]),a("div",{staticClass:"account-item"},[a("span",[t._v("即将拨款：")]),a("h3",[t._v(t._s(t.to_back_amount)+t._s(t.site_query.typeCoin))]),a("div",{staticStyle:{width:"20px"}}),a("span",[t._v("已完成拨款：")]),a("h3",[t._v(t._s(t.haved_amount)+t._s(t.site_query.typeCoin))])])])]),a("div",{staticClass:"all_condition"},[a("div",{staticClass:"condition_box"},[a("div",{staticClass:"condition_item"},[a("storeChoose",{attrs:{"is-all":!1},on:{changeMallList:t.changeMallList}})],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("平台店铺ID：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",placeholder:"输入多个ID请使用,隔开",size:"mini"},model:{value:t.plantform_mallID,callback:function(e){t.plantform_mallID=e},expression:"plantform_mallID"}})],1)]),a("div",{staticClass:"condition_box"},[a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("状态：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"站点"},model:{value:t.query.status,callback:function(e){t.$set(t.query,"status",e)},expression:"query.status"}},[a("el-option",{attrs:{value:"",label:"全部"}}),a("el-option",{attrs:{label:"已拨款",value:"1"}}),a("el-option",{attrs:{label:"即将拨款",value:"2"}})],1)],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("订单编号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"订单编号",size:"mini",clearable:""},model:{value:t.query.orderSn,callback:function(e){t.$set(t.query,"orderSn",e)},expression:"query.orderSn"}})],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("拨款时间：")]),a("el-date-picker",{staticStyle:{width:"240px"},attrs:{size:"mini",type:"daterange","unlink-panels":"","range-separator":"-","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.cloumn_date,callback:function(e){t.cloumn_date=e},expression:"cloumn_date"}})],1),a("div",{staticClass:"condition_item"},[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"grey"},on:{change:function(e){return t.compete_Coin()}},model:{value:t.showRMB,callback:function(e){t.showRMB=e},expression:"showRMB"}}),a("span",[t._v("显示人民币：")]),a("span",[t._v("(当前汇率："+t._s(t.site_query.rate_coin?t.site_query.rate_coin:"暂无该站点的汇率")+")")])],1)])]),a("div",{staticClass:"condition_box",staticStyle:{"padding-left":"20px"}},[a("div",{staticClass:"condition_item"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!1,t.updataMall()}}},[t._v("同步数据")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!0}}},[t._v("取消同步")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearLog}},[t._v("清空日志")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.export_table}},[t._v("导出 ")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v(" 隐藏日志")])],1)])]),a("div",{staticClass:"table_clo"},[a("div",{staticClass:"data_table",staticStyle:{height:"100%","background-color":"white"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{height:"calc(100vh - 266px)",data:t.tableList,"row-style":{height:"50px"},"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{label:"序号",width:"60",type:"index",align:"center"}}),a("el-table-column",{attrs:{prop:"country",width:"120px",label:"站点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(t._f("chineseSite")(a.country))+" ")]}}])}),a("el-table-column",{attrs:{"min-width":"120px",label:"店铺名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name||a.platform_mall_name))]}}])}),a("el-table-column",{attrs:{prop:"order_sn",label:"订单编号","min-width":"120px",align:"center"}}),a("el-table-column",{attrs:{prop:"","min-width":"80px",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(1===Number(a.status)?"已拨款 ":"即将拨款"))]}}])}),a("el-table-column",{attrs:{prop:"bill_num",width:"100px",label:"拨款单号",align:"center"}}),a("el-table-column",{attrs:{prop:"appropriate_amount",label:"拨款金额",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"拨款金额(RMB)",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s((a.appropriate_amount*t.site_query.rate_coin).toFixed(2)))]}}])}),a("el-table-column",{attrs:{prop:"appropriate_time",label:"拨款时间",width:"160px",align:"center"}})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end",margin:"4px 0px"}},[a("el-pagination",{attrs:{background:"","current-page":t.query.page,"page-sizes":[20,50,100,200],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.query,"page",e)},"update:current-page":function(e){return t.$set(t.query,"page",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)},n=[],s=a("1da1"),r=(a("96cf"),a("ac1f"),a("841c"),a("159b"),a("4de4"),a("99af"),a("b680"),a("a9e3"),a("feb6")),l=a("0e0b"),o={components:{storeChoose:r["a"]},data:function(){return{isLoading:!1,orgin:"",to_back_amount:"",haved_amount:"",exportList:[],tableList:[],total:0,mallList_gruop:[],mallList_mall:[],site_query:{country:"TH",typeCoin:"฿",rate_coin:""},plantform_mallID:"",mallGroupId:[],all_mallgruopID:[],query:{sysMallId:[],orderSn:"",status:"",appropriateTime:""},page:1,pageSize:20,cloumn_date:[],pickerOptions:{},showRMB:!1,showConsole:!0,selectMallList:[],mallPageSize:50,cancelActive:!1}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.cloumn_date=[(new Date).getTime()-864e6,(new Date).getTime()+1728e6],e.next=3,Object(l["D"])((function(){return t.selectMallList&&t.selectMallList[0]}),50);case 3:return e.next=5,t.search();case 5:return e.next=7,t.exchangeRateList();case 7:case"end":return e.stop()}}),e)})))()},methods:{clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(t){this.selectMallList=t,this.site_query["country"]=this.selectMallList["country"],this.exchangeRateList()},updataMall:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.selectMallList.length||t.$message.warning("请选择要同步的店铺！"),t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.$refs.Logs.writeLog("开始同步",!0),e.prev=4,a=0;case 6:if(!(a<t.selectMallList.length)){e.next=31;break}if(!t.cancelActive){e.next=10;break}return t.$refs.Logs.writeLog("操作已取消！",!0),e.abrupt("return");case 10:if(i=t.selectMallList[a],n=1,t.$refs.Logs.writeLog("开始同步店铺【".concat(i.platform_mall_name,"】对账信息"),!0),""!==t.query.status){e.next=20;break}return e.next=16,t.searchSingleMall(n,i,0);case 16:return e.next=18,t.searchSingleMall(n,i,2);case 18:e.next=28;break;case 20:if("1"!==t.query.status){e.next=25;break}return e.next=23,t.searchSingleMall(n,i,0);case 23:e.next=28;break;case 25:if("2"!==t.query.status){e.next=28;break}return e.next=28,t.searchSingleMall(n,i,2);case 28:a++,e.next=6;break;case 31:e.next=35;break;case 33:e.prev=33,e.t0=e["catch"](4);case 35:t.search();case 36:case"end":return e.stop()}}),e,null,[[4,33]])})))()},searchSingleMall:function(t,e,a){var i=arguments,n=this;return Object(s["a"])(regeneratorRuntime.mark((function s(){var r,l,o,c,u,d,p;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(r=i.length>3&&void 0!==i[3]?i[3]:[],l=i.length>4&&void 0!==i[4]?i[4]:0,!n.cancelActive){s.next=5;break}return n.$refs.Logs.writeLog("操作已取消！",!0),s.abrupt("return");case 5:return o={tran_type:a,page_number:t,page_size:n.mallPageSize,shop_id:e.platform_mall_id},0===a&&(o["start_date"]=n.$dayjs(n.cloumn_date[0]).format("YYYY-MM-DD"),o["end_date"]=n.$dayjs(n.cloumn_date[1]).format("YYYY-MM-DD")),s.next=9,n.$shopeemanService.getIncomeTransaction(e.country,o);case 9:c=s.sent,u=c&&JSON.parse(c),u&&200===u.status?(d=JSON.parse(u.data),0===d.code&&(p=d.data.list.length,d.data.list&&d.data.list.forEach((function(t){var e={order_id:t.order_id+"",status:1===t.status?"1":"2",bill_num:t.id+"",amount:t.amount+"",using_wallet:t.using_wallet?"1":"0",release_time:n.$dayjs(1e3*t.release_time).format("YYYY-MM-DD HH:mm:ss")},a=r.filter((function(t){return t.bill_num===e.bill_num}))[0]||"";a&&p--,!a&&r.push(e)})),p&&n.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】【").concat(0===a?"已拨款":"即将拨款","】第【").concat(++l,"】页货款对账数据【").concat(p,"】条"),!0),r.length<d.data.page_info.total&&d.data.list.length>=n.mallPageSize?(t++,n.searchSingleMall(t,e,a,r,l)):(""===n.query.status&&2===a||n.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】数据完成"),!0),r.length&&n.UploadRecordData(e.platform_mall_id,r)))):u&&403===u.status?""===n.query.status&&2===a||n.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):""===n.query.status&&2===a||n.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1);case 12:case"end":return s.stop()}}),s)})))()},UploadRecordData:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n={mallId:t,bills:e},i.next=3,a.$api.uploadPaymentList(n);case 3:i.sent;case 4:case"end":return i.stop()}}),i)})))()},compete_Coin:function(){!1===this.showRMB?(this.to_back_amount=(this.to_back_amount/this.site_query.rate_coin).toFixed(2),this.haved_amount=(this.haved_amount/this.site_query.rate_coin).toFixed(2),this.site_query.typeCoin=this.orgin):(this.orgin=this.site_query.typeCoin,this.to_back_amount=(this.site_query.rate_coin*this.to_back_amount).toFixed(2),this.haved_amount=(this.site_query.rate_coin*this.haved_amount).toFixed(2),this.site_query.typeCoin="￥")},exchangeRateList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.rateList=t.$userInfo.ExchangeRates||{},t.site_query.rate_coin=t.rateList[t.site_query.country];case 2:case"end":return e.stop()}}),e)})))()},export_table:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.total){e.next=2;break}return e.abrupt("return",t.$message("暂无导出数据"));case 2:a=[],t.isLoading=!0,i=JSON.parse(JSON.stringify(t.query)),i.pageSize=200,i.page=1;case 7:if(!(a.length<t.total)){e.next=27;break}return e.prev=8,e.next=11,t.$api.getPaymentList(i);case 11:if(n=e.sent,200!==n.data.code){e.next=17;break}a=a.concat(n.data.data.data),i.page++,e.next=19;break;case 17:return t.$refs.Logs.writeLog("导出数据错误"),e.abrupt("break",27);case 19:e.next=25;break;case 21:return e.prev=21,e.t0=e["catch"](8),t.$refs.Logs.writeLog("导出数据异常"),e.abrupt("break",27);case 25:e.next=7;break;case 27:s="<tr>\n              <td>序号</td>\n              <td>站点</td>\n              <td>店铺名称</td>\n              <td>订单编号</td>\n              <td>状态</td>\n              <td>拨款编号</td>\n              <td>拨款金额</td>\n              <td>拨款金额（RMB）</td>\n              <td>拨款时间</td>\n            </tr>",a.forEach((function(e,a){s+="<tr>\n              <td>".concat(a+1,"</td>\n              <td>").concat(e.country?t.$filters.chineseSite(e.country):"-\t","</td>\n              <td>").concat(e.platform_mall_name?e.platform_mall_name:"-\t","</td>\n              <td>").concat(e.order_sn?e.order_sn:"-\t","</td>\n              <td>").concat(e.status&&1===Number(e.status)?"已拨款":"即将拨款\t","</td>\n              <td>").concat(e.bill_num?e.bill_num:"-\t","</td>\n              <td>").concat(e.appropriate_amount?e.appropriate_amount:"-\t","</td>\n              <td>").concat(e.appropriate_amount?(e.appropriate_amount*t.site_query.rate_coin).toFixed(2):"-\t","</td>\n              <td>").concat(e.appropriate_time?e.appropriate_time:"-\t","</td>\n            </tr>")})),Object(l["k"])("货款对账详情",s),t.isLoading=!1;case 31:case"end":return e.stop()}}),e,null,[[8,21]])})))()},search:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==(null===(a=t.selectMallList)||void 0===a?void 0:a.length)){e.next=2;break}return e.abrupt("return",t.$message("请选择店铺"));case 2:return t.isLoading=!0,n=t.query,s="",t.selectMallList.forEach((function(t,e){s=0===e?t.id:s+","+t.id})),n.sysMallId=s,n.appropriateTime=(null===(i=t.cloumn_date)||void 0===i?void 0:i.length)>=0?t.$dayjs(t.cloumn_date[0]).format("YYYY-MM-DD")+" 00:00:00/"+t.$dayjs(t.cloumn_date[1]).format("YYYY-MM-DD")+" 23:59:59":"",n.page=t.page,n.pageSize=t.pageSize,e.next=12,t.getTableList(n);case 12:case"end":return e.stop()}}),e)})))()},getTableList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$api.getPaymentList(t);case 2:i=a.sent,200===i.data.code?(e.tableList=i.data.data.data,e.total=i.data.data.total,e.to_back_amount=i.data.data.to_back_amount,e.haved_amount=i.data.data.haved_amount,e.site_query.typeCoin=e.$shopeeManConfig.getSiteCoinSymbol(e.site_query.country)):e.$message.warning("数据请求失败！"),e.isLoading=!1;case 5:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(t){this.pageSize=t,this.search()},handleCurrentChange:function(t){this.page=t,this.search()}}},c=o,u=(a("a680"),a("2877")),d=Object(u["a"])(c,i,n,!1,null,null,null);e["default"]=d.exports},8992:function(t,e,a){"use strict";a("4c28")},a680:function(t,e,a){"use strict";a("ac1d")},ac1d:function(t,e,a){},f4e2:function(t,e,a){"use strict";a("5a71")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,i){return a("el-option",{key:i,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},n=[],s=a("1da1"),r=a("2909"),l=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var i,n,s,l,o,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return i=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:n=a.sent,200===n.code?(s=n.data||[],e.isAShop||s.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=""===i?s:s.filter((function(t){return(null===t||void 0===t?void 0:t.country)===i||!t.platform_mall_id})),e.siteList=e.allSiteList):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(l=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),l.delete(void 0),o=Object(r["a"])(l),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(r["a"])(c),e.groupId=[""].concat(Object(r["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:u=[],u=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=u;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,i=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var n=this.siteShowList.map((function(t){return t.platform_mall_id}));if(i.includes(t))i=i.filter((function(t){return!n.includes(t)}));else{var s=new Set([""].concat(Object(r["a"])(i),Object(r["a"])(n)));i=Object(r["a"])(s)}}else i=i.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var l=i.findIndex((function(e){return e===t}));if(l>-1)i.splice(l,1),i.includes("")&&i.splice(0,1);else if(i.push(t),a){var o,c=this.siteShowList.filter((function(t){return i.includes(t.platform_mall_id)}));i.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==c.length+1||i.unshift("")}else{var u;i.includes("")||(null===(u=this.siteList)||void 0===u?void 0:u.length)!==i.length+1||i.unshift("")}}this.siteId=i}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var i=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(i)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=this.groupId.includes("")&&a.length===this.siteList.length-1?"":a.toString();this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var i=e.mall_alias_name||e.platform_mall_name;a=i.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=o,u=(a("8992"),a("f4e2"),a("2877")),d=Object(u["a"])(c,i,n,!1,null,"7cb8233b",null);e["a"]=d.exports}}]);