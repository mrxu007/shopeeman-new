(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-912f9e10"],{"4c28":function(t,e,a){},"68c0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"overdata_view"},[a("div",{staticClass:"account-box"},[a("span",{staticClass:"account-title"},[t._v("金额总览")]),a("div",{staticClass:"account-item"},[a("span",[t._v("即将拨款：")]),a("h3",[t._v(t._s(t.to_back_amount)+t._s(t.site_query.typeCoin))]),a("div",{staticStyle:{width:"20px"}}),a("span",[t._v("已完成拨款：")]),a("h3",[t._v(t._s(t.haved_amount)+t._s(t.site_query.typeCoin))])])])]),a("div",{staticClass:"all_condition"},[a("div",{staticClass:"condition_box"},[a("div",{staticClass:"condition_item"},[a("storeChoose",{attrs:{"is-all":!1},on:{changeMallList:t.changeMallList}})],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("平台店铺ID：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",placeholder:"输入多个ID请使用,隔开",size:"mini"},model:{value:t.plantform_mallID,callback:function(e){t.plantform_mallID=e},expression:"plantform_mallID"}})],1)]),a("div",{staticClass:"condition_box"},[a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("状态：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"站点"},model:{value:t.query.status,callback:function(e){t.$set(t.query,"status",e)},expression:"query.status"}},[a("el-option",{attrs:{value:"",label:"全部"}}),a("el-option",{attrs:{label:"已拨款",value:"1"}}),a("el-option",{attrs:{label:"即将拨款",value:"2"}})],1)],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("订单编号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"订单编号",size:"mini",clearable:""},model:{value:t.query.orderSn,callback:function(e){t.$set(t.query,"orderSn",e)},expression:"query.orderSn"}})],1),a("div",{staticClass:"condition_item"},[a("span",{staticClass:"w80"},[t._v("拨款时间：")]),a("el-date-picker",{staticStyle:{width:"240px"},attrs:{size:"mini",type:"daterange","unlink-panels":"","range-separator":"-","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.cloumn_date,callback:function(e){t.cloumn_date=e},expression:"cloumn_date"}})],1),a("div",{staticClass:"condition_item"},[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"grey"},on:{change:function(e){return t.compete_Coin()}},model:{value:t.showRMB,callback:function(e){t.showRMB=e},expression:"showRMB"}}),a("span",[t._v("显示人民币：")]),a("span",[t._v("(当前汇率："+t._s(t.site_query.rate_coin?t.site_query.rate_coin:"暂无该站点的汇率")+")")])],1)])]),a("div",{staticClass:"condition_box",staticStyle:{"padding-left":"20px"}},[a("div",{staticClass:"condition_item"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!1,t.updataMall()}}},[t._v("同步数据")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.cancelActive=!0}}},[t._v("取消同步")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearLog}},[t._v("清空日志")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.export_table(t.query.page=1),t.exportList=[]}}},[t._v("导出 ")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v(" 隐藏日志")])],1)])]),a("div",{staticClass:"table_clo"},[a("div",{staticClass:"data_table",staticStyle:{height:"100%","background-color":"white"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{height:"calc(100vh - 281px)",data:t.tableList,"row-style":{height:"50px"},"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{label:"序号",width:"60",type:"index",align:"center"}}),a("el-table-column",{attrs:{prop:"country",width:"120px",label:"站点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(t._f("chineseSite")(a.country))+" ")]}}])}),a("el-table-column",{attrs:{prop:"platform_mall_name","min-width":"120px",label:"店铺名称",align:"center"}}),a("el-table-column",{attrs:{prop:"order_sn",label:"订单编号","min-width":"120px",align:"center"}}),a("el-table-column",{attrs:{prop:"","min-width":"80px",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(1===Number(a.status)?"已拨款 ":"即将拨款"))]}}])}),a("el-table-column",{attrs:{prop:"bill_num",width:"100px",label:"拨款单号",align:"center"}}),a("el-table-column",{attrs:{prop:"appropriate_amount",label:"拨款金额",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"拨款金额(RMB)",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s((a.appropriate_amount*t.site_query.rate_coin).toFixed(2)))]}}])}),a("el-table-column",{attrs:{prop:"created_at",label:"拨款时间",width:"160px",align:"center"}})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end",margin:"4px 0px"}},[a("el-pagination",{attrs:{background:"","current-page":t.query.page,"page-sizes":[20,50,100,200],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.query,"page",e)},"update:current-page":function(e){return t.$set(t.query,"page",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)},n=[],s=a("2909"),r=a("1da1"),o=(a("96cf"),a("ac1f"),a("841c"),a("159b"),a("4de4"),a("99af"),a("b680"),a("a9e3"),a("feb6")),l=a("0e0b"),c={components:{storeChoose:o["a"]},data:function(){return{isLoading:!1,orgin:"",to_back_amount:"",haved_amount:"",exportList:[],tableList:[],total:0,mallList_gruop:[],mallList_mall:[],site_query:{country:"TH",typeCoin:"฿",rate_coin:""},plantform_mallID:"",mallGroupId:[],all_mallgruopID:[],query:{sysMallId:[],orderSn:"",status:"",appropriateTime:""},page:1,pageSize:20,cloumn_date:[],pickerOptions:{},showRMB:!1,showConsole:!0,selectMallList:[],mallPageSize:50,cancelActive:!1}},mounted:function(){this.cloumn_date=[(new Date).getTime()-864e6,(new Date).getTime()+1728e6],this.search(),this.exchangeRateList()},methods:{clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(t){this.selectMallList=t,this.site_query["country"]=this.selectMallList["country"],this.exchangeRateList()},updataMall:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.selectMallList.length||t.$message.warning("请选择要同步的店铺！"),t.showConsole=!1,t.$refs.Logs.consoleMsg="",t.$refs.Logs.writeLog("开始同步",!0),e.prev=4,a=0;case 6:if(!(a<t.selectMallList.length)){e.next=31;break}if(!t.cancelActive){e.next=10;break}return t.$refs.Logs.writeLog("操作已取消！",!0),e.abrupt("return");case 10:if(i=t.selectMallList[a],n=1,t.$refs.Logs.writeLog("开始同步店铺【".concat(i.platform_mall_name,"】对账信息"),!0),""!==t.query.status){e.next=20;break}return e.next=16,t.searchSingleMall(n,i,0);case 16:return e.next=18,t.searchSingleMall(n,i,2);case 18:e.next=28;break;case 20:if("1"!==t.query.status){e.next=25;break}return e.next=23,t.searchSingleMall(n,i,0);case 23:e.next=28;break;case 25:if("2"!==t.query.status){e.next=28;break}return e.next=28,t.searchSingleMall(n,i,2);case 28:a++,e.next=6;break;case 31:e.next=35;break;case 33:e.prev=33,e.t0=e["catch"](4);case 35:t.search();case 36:case"end":return e.stop()}}),e,null,[[4,33]])})))()},searchSingleMall:function(t,e,a){var i=arguments,n=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var r,o,l,c,u,d,p;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(r=i.length>3&&void 0!==i[3]?i[3]:[],o=i.length>4&&void 0!==i[4]?i[4]:0,!n.cancelActive){s.next=5;break}return n.$refs.Logs.writeLog("操作已取消！",!0),s.abrupt("return");case 5:return l={tran_type:a,page_number:t,page_size:n.mallPageSize,shop_id:e.platform_mall_id},0===a&&(l["start_date"]=n.$dayjs(n.cloumn_date[0]).format("YYYY-MM-DD"),l["end_date"]=n.$dayjs(n.cloumn_date[1]).format("YYYY-MM-DD")),s.next=9,n.$shopeemanService.getIncomeTransaction(e.country,l);case 9:c=s.sent,u=c&&JSON.parse(c),u&&200===u.status?(d=JSON.parse(u.data),0===d.code&&(p=d.data.list.length,d.data.list&&d.data.list.forEach((function(t){var e={order_id:t.order_id+"",status:1===t.status?"1":"2",bill_num:t.id+"",amount:t.amount+"",using_wallet:t.using_wallet?"1":"0",release_time:n.$dayjs(t.release_time).format("YYYY-MM-DD HH:mm:ss")},a=r.filter((function(t){return t.bill_num===e.bill_num}))[0]||"";a&&p--,!a&&r.push(e)})),p&&n.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】【").concat(0===a?"已拨款":"即将拨款","】第【").concat(++o,"】页货款对账数据【").concat(p,"】条"),!0),r.length<d.data.page_info.total&&d.data.list.length>=n.mallPageSize?(t++,n.searchSingleMall(t,e,a,r,o)):(""===n.query.status&&2===a||n.$refs.Logs.writeLog("同步店铺【".concat(e.platform_mall_name,"】数据完成"),!0),r.length&&n.UploadRecordData(e.platform_mall_id,r)))):u&&403===u.status?""===n.query.status&&2===a||n.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):""===n.query.status&&2===a||n.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1);case 12:case"end":return s.stop()}}),s)})))()},UploadRecordData:function(t,e){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n={mallId:t,bills:e},i.next=3,a.$api.uploadPaymentList(n);case 3:i.sent;case 4:case"end":return i.stop()}}),i)})))()},compete_Coin:function(){!1===this.showRMB?(this.to_back_amount=(this.to_back_amount/this.site_query.rate_coin).toFixed(2),this.haved_amount=(this.haved_amount/this.site_query.rate_coin).toFixed(2),this.site_query.typeCoin=this.orgin):(this.orgin=this.site_query.typeCoin,this.to_back_amount=(this.site_query.rate_coin*this.to_back_amount).toFixed(2),this.haved_amount=(this.site_query.rate_coin*this.haved_amount).toFixed(2),this.site_query.typeCoin="￥")},exchangeRateList:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.exchangeRateList();case 2:if(a=e.sent,200!==a.data.code){e.next=49;break}e.t0=t.site_query.country,e.next="MY"===e.t0?7:"SG"===e.t0?10:"PH"===e.t0?13:"TH"===e.t0?16:"ID"===e.t0?19:"TW"===e.t0?22:"VN"===e.t0?25:"BR"===e.t0?28:"US"===e.t0?31:"MX"===e.t0?34:"CL"===e.t0?37:"CO"===e.t0?40:"PL"===e.t0?43:46;break;case 7:return t.site_query.rate_coin=a.data.data.MY,t.site_query.typeCoin="RM",e.abrupt("break",47);case 10:return t.site_query.rate_coin=a.data.data.SG,t.site_query.typeCoin="$",e.abrupt("break",47);case 13:return t.site_query.rate_coin=a.data.data.PH,t.site_query.typeCoin="₱",e.abrupt("break",47);case 16:return t.site_query.rate_coin=a.data.data.TH,t.site_query.typeCoin="฿",e.abrupt("break",47);case 19:return t.site_query.rate_coin=a.data.data.ID,t.site_query.typeCoin="Rp",e.abrupt("break",47);case 22:return t.site_query.rate_coin=a.data.data.TW,t.site_query.typeCoin="$",e.abrupt("break",47);case 25:return t.site_query.rate_coin=a.data.data.VN,t.site_query.typeCoin="₫",e.abrupt("break",47);case 28:return t.site_query.rate_coin=a.data.data.BR,t.site_query.typeCoin="R$",e.abrupt("break",47);case 31:return t.site_query.rate_coin=a.data.data.US,t.site_query.typeCoin="$",e.abrupt("break",47);case 34:return t.site_query.rate_coin=a.data.data.MX,t.site_query.typeCoin="MX$",e.abrupt("break",47);case 37:return t.site_query.rate_coin=a.data.data.CL,t.site_query.typeCoin="$",e.abrupt("break",47);case 40:return t.site_query.rate_coin=a.data.data.CO,t.site_query.typeCoin="$",e.abrupt("break",47);case 43:return t.site_query.rate_coin=a.data.data.PL,t.site_query.typeCoin="zł",e.abrupt("break",47);case 46:return e.abrupt("break",47);case 47:e.next=50;break;case 49:t.$message.warning("网络请求失败");case 50:case"end":return e.stop()}}),e)})))()},export_table:function(t){var e=this;if(this.query.page=t,this.exportList.length>=this.total){var a="<tr>\n              <td>序号</td>\n              <td>站点</td>\n              <td>店铺名称</td>\n              <td>订单编号</td>\n              <td>状态</td>\n              <td>拨款编号</td>\n              <td>拨款金额</td>\n              <td>拨款金额（RMB）</td>\n              <td>拨款时间</td>\n            </tr>";this.exportList.forEach((function(t,i){a+="<tr>\n              <td>".concat(i+1,"</td>\n              <td>").concat(t.country?e.$filters.chineseSite(t.country):"-\t","</td>\n              <td>").concat(t.platform_mall_name?t.platform_mall_name:"-\t","</td>\n              <td>").concat(t.order_sn?t.order_sn:"-\t","</td>\n              <td>").concat(t.status&&1===Number(t.status)?"已拨款":"即将拨款\t","</td>\n              <td>").concat(t.bill_num?t.bill_num:"-\t","</td>\n              <td>").concat(t.appropriate_amount?t.appropriate_amount:"-\t","</td>\n              <td>").concat(t.appropriate_amount?(t.appropriate_amount*e.site_query.rate_coin).toFixed(2):"-\t","</td>\n              <td>").concat(t.created_at?t.created_at:"-\t","</td>\n            </tr>")})),Object(l["h"])("货款对账详情",a),this.query.page=1}else{var i;this.getTableList(),(i=this.exportList).push.apply(i,Object(s["a"])(this.tableList)),this.export_table(t+1)}},search:function(){this.isLoading=!0;var t=this.query,e="";this.selectMallList.forEach((function(t,a){e=0===a?t.id:e+","+t.id})),t.sysMallId=e,t.appropriateTime=this.cloumn_date.length>=0?this.$dayjs(this.cloumn_date[0]).format("YYYY-MM-DD")+" 00:00:00/"+this.$dayjs(this.cloumn_date[1]).format("YYYY-MM-DD")+" 23:59:59":"",t.page=this.page,t.pageSize=this.pageSize,this.getTableList(t)},getTableList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$api.getPaymentList(t);case 2:i=a.sent,200===i.data.code?(e.tableList=i.data.data.data,e.total=i.data.data.total,e.to_back_amount=i.data.data.to_back_amount,e.haved_amount=i.data.data.haved_amount):e.$message.warning("数据请求失败！"),e.isLoading=!1;case 5:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(t){this.pageSize=t,this.search()},handleCurrentChange:function(t){this.page=t,this.search()}}},u=c,d=(a("a680"),a("2877")),p=Object(d["a"])(u,i,n,!1,null,null,null);e["default"]=p.exports},8992:function(t,e,a){"use strict";a("4c28")},a680:function(t,e,a){"use strict";a("ac1d")},ac1d:function(t,e,a){},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1)])])},n=[],s=a("1da1"),r=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),o={name:"StoreChoose",props:{showMallAll:{type:Boolean,default:!1},spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var i=e.indexOf("")>-1,n=t.indexOf("")>-1;i!==n?n?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=e.indexOf("")>-1,n=t.indexOf("")>-1;i!==n?n?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}))}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{changeSelect:function(t){return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,i,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,i=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:i},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:s=t.sent,200===s.code?(e.siteList=s.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[];this.site.forEach((function(a){if(a){var i=t.siteList.filter((function(t){return t.platform_mall_id===a}));e.push(i[0])}})),e["country"]=this.countryVal,this.$emit("changeMallList",e),this.source?(e["country"]=this.countryVal,this.$emit("changeMallList",{mallList:e,source:this.source})):(e["country"]=this.countryVal,this.$emit("changeMallList",e))}}},l=o,c=(a("8992"),a("2877")),u=Object(c["a"])(l,i,n,!1,null,null,null);e["a"]=u.exports}}]);