(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0027ef2a"],{"140e":function(t,e,a){},2040:function(t,e,a){"use strict";a("140e")},"4c28":function(t,e,a){},"4f43":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"store-evaluation"},[a("div",{staticClass:"tool-bar"},[a("div",{staticClass:"tool-row"},[a("storeChoose",{attrs:{"span-width":"80px"},on:{changeMallList:t.changeMallList}}),a("div",{staticClass:"tool-item"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",size:"mini",clearable:""},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}},[a("el-select",{staticClass:"miniSelectBox",attrs:{slot:"prepend",placeholder:"用户名称"},slot:"prepend",model:{value:t.userTypeSelect,callback:function(e){t.userTypeSelect=e},expression:"userTypeSelect"}},t._l(t.userType,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),a("div",{staticClass:"tool-row"},[a("div",{staticClass:"tool-item mar-right"},[a("span",[t._v("评价星数：")]),a("el-select",{staticClass:"miniSelectBox",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.startNum,callback:function(e){t.startNum=e},expression:"startNum"}},t._l(t.startNumList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"tool-item mar-right"},[a("span",[t._v("时间：")]),a("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.assessTime,callback:function(e){t.assessTime=e},expression:"assessTime"}})],1),a("div",{staticClass:"tool-item mar-right"},[a("span",[t._v("回复类型：")]),a("el-select",{staticClass:"miniSelectBox",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.replayType,callback:function(e){t.replayType=e},expression:"replayType"}},t._l(t.replayTypeList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("el-button",{staticStyle:{width:"75px"},attrs:{type:"primary",size:"mini",disabled:t.tableLoading},on:{click:t.searchRate}},[t._v("查 询")]),a("el-button",{staticClass:"mar-right btnbox",attrs:{type:"primary",size:"mini",disabled:t.tableLoading},on:{click:t.batchReplay}},[t._v("批量回复")]),a("el-button",{staticClass:"mar-right btnbox",attrs:{type:"primary",size:"mini"},on:{click:function(e){t.cancelAction=!0}}},[t._v("取消操作")]),a("el-button",{staticClass:"mar-right btnbox",attrs:{type:"primary",size:"mini",disabled:t.tableLoading},on:{click:t.exportData}},[t._v("导出数据")]),a("el-button",{staticClass:"mar-right btnbox",attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")]),a("div",{staticClass:"tool-item mar-right"},[a("el-checkbox",{model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}},[t._v("隐藏日志")])],1)],1)]),a("div",{staticClass:"content"},[a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableDataCut,"tooltip-effect":"dark","max-height":"630px","use-virtual":"","big-data-checkbox":t.checked,"data-changes-scroll-top":!1},on:{"selection-change":t.selectionChange}},[a("u-table-column",{attrs:{type:"selection",width:"55"}}),a("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("u-table-column",{attrs:{width:"120px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.country)))]}}])}),a("u-table-column",{attrs:{"min-width":"100px",label:"店铺名称",prop:"platform_mall_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.mall_alias_name?e.row.mall_alias_name:e.row.platform_mall_name))])]}}])}),a("u-table-column",{attrs:{align:"center",prop:"order_sn",label:"订单编号","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticClass:"tableActive",on:{click:function(a){return t.viewDetails("orderDetail",e.row.order_id,e.row.platform_mall_id)}}},[t._v(t._s(e.row.order_sn))])]}}])}),a("u-table-column",{attrs:{align:"center",prop:"product_name",label:"商品名称","min-width":"80","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",prop:"product_id",label:"商品ID",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticClass:"tableActive",on:{click:function(a){return t.openUrl(e.row)}}},[t._v(t._s(e.row.product_id))])]}}])}),a("u-table-column",{attrs:{label:"商品图片",prop:"product_cover",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([e.row.country,e.row.platform_mall_id,e.row.product_cover])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("imageRender")([e.row.country,e.row.platform_mall_id,e.row.product_cover])}})],1)]}}])}),a("u-table-column",{attrs:{prop:"user_name",label:"买家姓名",align:"center","min-width":"90px"}}),a("u-table-column",{attrs:{align:"center",prop:"rating_star",label:"评价星数","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-rate",{model:{value:e.row.rating_star,callback:function(a){t.$set(e.row,"rating_star",a)},expression:"scope.row.rating_star"}})]}}])}),a("u-table-column",{attrs:{align:"center",prop:"ctime",label:"评价时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$dayjs(1e3*e.row.ctime).format("YYYY-MM-DD HH:MM"))+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"comment",label:"评价内容","min-width":"80","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",label:"您的回复","min-width":"80","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.reply&&e.row.reply.comment?a("div",[t._v(t._s(e.row.reply.comment))]):a("div",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.singleReplay(e.$index)}}},[t._v("回复")])],1)]}}])}),a("u-table-column",{attrs:{align:"center",label:"回复时间","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.reply?[t._v(" "+t._s(t.$dayjs(1e3*e.row.reply.ctime).format("YYYY-MM-DD HH:MM"))+" ")]:void 0}}],null,!0)}),a("u-table-column",{attrs:{align:"center",prop:"replyStatus",label:"操作状态","min-width":"70","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{style:e.row.statusColor&&"color:"+e.row.statusColor},[t._v(" "+t._s(e.row.replyStatus))])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[1e3,2e3,5e3,1e4],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}}),a("el-dialog",{attrs:{title:"回复内容编辑",visible:t.replayTextVisible,width:"30%"},on:{"update:visible":function(e){t.replayTextVisible=e}}},[a("div",{staticClass:"replay-dialog"},[a("el-input",{attrs:{type:"textarea",rows:8,placeholder:"请输入内容"},model:{value:t.replayText,callback:function(e){t.replayText=e},expression:"replayText"}}),a("el-button",{staticClass:"btn",attrs:{type:"primary",size:"mini"},on:{click:t.userReplaySave}},[t._v("确定")])],1)])],1)},r=[],n=a("1da1"),i=(a("159b"),a("4de4"),a("99af"),a("c740"),a("fb6a"),a("96cf"),a("0e0b")),s=a("feb6"),o={components:{storeChoose:s["a"]},data:function(){return{checked:!0,pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},countryVal:"",groupId:"",mallSelect:"",countries:this.$filters.countries_option,assessTime:[],tableDataCut:[],tableData:[],tableLoading:!1,replayType:"",replayTypeList:[{value:"",label:"全部"},{value:"1",label:"待回复"},{value:"2",label:"已回复"}],startNum:"",startNumList:[{value:"",label:"全部"},{value:"5",label:"五颗星"},{value:"4",label:"四颗星"},{value:"3",label:"三颗星"},{value:"2",label:"两颗星"},{value:"1",label:"一颗星"}],userName:"",userTypeSelect:"1",userType:[{value:"1",label:"用户名称"},{value:"2",label:"商品名称"},{value:"3",label:"规格名称"}],showConsole:!0,pageSize:1e3,currentPage:1,total:0,replayTextVisible:!1,replayText:"",isBatchReplay:!1,multipleSelection:[],selectMallList:[],cancelAction:!1,rowInfo:{},mallPageSize:50,rowIndex:null}},mounted:function(){},methods:{viewDetails:function(t,e,a){var l={type:t,shopId:a,id:e};this.$BaseUtilService.getOrderDetailInfo(a,JSON.stringify(l))},searchRate:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,l,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.cancelAction=!1,t.selectMallList.length){e.next=3;break}return e.abrupt("return",t.$message.warning("请选择店铺"));case 3:t.clearLog(),t.showConsole=!1,t.$refs.Logs.writeLog("开始查询",!0),t.tableData=[],t.tableDataCut=[],t.total=0,t.tableLoading=!0,e.prev=10,a=0;case 12:if(!(a<t.selectMallList.length)){e.next=24;break}if(!t.cancelAction){e.next=17;break}return t.tableLoading=!1,t.$refs.Logs.writeLog("操作已取消！",!0),e.abrupt("return");case 17:return l=t.selectMallList[a],r=1,e.next=21,t.searchSingleMall(r,l);case 21:a++,e.next=12;break;case 24:e.next=29;break;case 26:e.prev=26,e.t0=e["catch"](10),t.tableLoading=!1;case 29:t.tableLoading=!1;case 30:case"end":return e.stop()}}),e,null,[[10,26]])})))()},searchSingleMall:function(t,e){var a=arguments,l=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var i,s,o,c,u,p,d;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=a.length>2&&void 0!==a[2]?a[2]:[],s=a.length>3&&void 0!==a[3]?a[3]:0,o={page_number:t,page_size:l.mallPageSize,cursor:0,shop_id:e.platform_mall_id},l.assessTime.length&&(o.ctime_start=Math.round(new Date(l.assessTime[0]).getTime()/1e3),o.ctime_end=Math.round(new Date(l.assessTime[1]).getTime()/1e3)),l.startNum&&(o.rating_star=l.startNum),l.userName&&("1"===l.userTypeSelect?o.user_name=l.userName:"2"===l.userTypeSelect?o.product_name=l.userName:"3"===l.userTypeSelect&&(o.model_name=l.userName)),"1"===l.replayType?o.replied=!1:"2"===l.replayType&&(o.replied=!0),r.prev=7,r.next=10,l.$shopeemanService.getShopEvaluateList(e.country,o);case 10:c=r.sent,u=JSON.parse(c),200===u.status?(p=JSON.parse(u.data),0===p.code?(d=p.data.list.length,p.data.list&&p.data.list.forEach(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.country=e.country,a.platform_mall_name=e.platform_mall_name,a.mall_alias_name=e.mall_alias_name,a.platform_mall_id=e.platform_mall_id,a.replyStatus="",a.statusColor="",t.next=8,l.productUrl(a);case 8:a.productUrl=t.sent,r=i.filter((function(t){return t.comment_id===a.comment_id}))[0]||"",!r&&i.push(a),!r&&l.tableData.push(a),l.total=l.tableData.length,l.dataCut();case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),d&&l.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】获取到第【").concat(++s,"】页店铺评价数据【").concat(d,"】条"),!0),i.length<p.data.page_info.total&&p.data.list.length>=l.mallPageSize?(t++,l.searchSingleMall(t,e,i,s)):(l.total+=i.length,l.dataCut())):l.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】").concat(p.message,"！"),!1)):403===u.status?l.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】请检查店铺是否登录！"),!1):l.$refs.Logs.writeLog("店铺【".concat(e.platform_mall_name,"】获取失败！"),!1),r.next=17;break;case 15:r.prev=15,r.t0=r["catch"](7);case 17:case"end":return r.stop()}}),r,null,[[7,15]])})))()},exportData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,l,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.tableData.length){e.next=2;break}return e.abrupt("return",t.$message.warning("没有可以导出的订单"));case 2:for(a=1,l="<tr>\n              <td>编号</td>\n              <td>站点</td>\n              <td>店铺名</td>\n              <td>订单编号</td>\n              <td>商品链接</td>\n              <td>图片链接</td>\n              <td>商品名称</td>\n              <td>买家姓名</td>\n              <td>评价星数</td>\n              <td>评价时间</td>\n              <td>评价内容</td>\n              <td>您的回复</td>\n              <td>回复时间</td>\n            </tr>",r=0;r<t.tableData.length;r++)n=t.tableData[r],l+="<tr><td>".concat(a++,"</td>\n                    <td style=\"mso-number-format:'@';\">").concat(n.country?t.$filters.chineseSite(n.country):"\t","</td>\n                    <td>").concat(n.platform_mall_name?n.platform_mall_name:"\t","</td>\n                    <td style=\"mso-number-format:'@';\">").concat(n.order_sn&&n.order_sn+"\t","</td>\n                    <td>").concat(n.productUrl?n.productUrl:"\t","</td>\n                    <td>").concat(n.product_cover?t.$filters.imageRender([n.country,n.platform_mall_id,n.product_cover]):"\t","</td>\n                    <td>").concat((n.product_name||"111")+"\t","</td>\n                    <td>").concat(n.user_name?n.user_name:"\t","</td>\n                    <td>").concat(n.rating_star?n.rating_star:"\t","</td>\n                    <td>").concat(n.ctime?t.$dayjs(1e3*n.ctime).format("YYYY-MM-DD HH:MM"):"\t","</td>\n                    <td>").concat(n.comment?n.comment:"\t","</td>\n                    <td>").concat(n.reply&&n.reply.comment?n.reply.comment:"\t","</td>\n                    <td>").concat(n.reply&&n.reply.ctime?t.$dayjs(1e3*n.reply.ctime).format("YYYY-MM-DD HH:MM"):"\t","</td>\n                </tr>");Object(i["h"])("商店评价信息",l);case 6:case"end":return e.stop()}}),e)})))()},singleReplay:function(t){this.rowIndex=t,this.replayTextVisible=!0},batchReplay:function(){if(!this.multipleSelection.length)return this.$message.warning("请先勾选数据！");this.isBatchReplay=!0,this.replayTextVisible=!0},userReplay:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var l,r,n,i,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(l={order_id:t.order_id,comment_id:t.comment_id,comment:e.replayText,shop_id:t.platform_mall_id},r=e.tableData.findIndex((function(e){return e.comment_id===t.comment_id})),n=e.tableDataCut.findIndex((function(e){return e.comment_id===t.comment_id})),!t.reply||!t.reply.ctime){a.next=8;break}return e.tableData[r].replyStatus="已经回复过了",e.tableData[r].statusColor="green",e.$refs.multipleTable.toggleRowSelection(e.tableDataCut[n],!1),a.abrupt("return");case 8:return a.next=10,e.$shopeemanService.replyShopRating(t.country,l);case 10:i=a.sent,s=JSON.parse(i),200===s.status?(o=JSON.parse(s.data),0===o.code?(e.tableData[r].reply?(e.tableData[r].reply.ctime=Math.round((new Date).getTime()/1e3),e.tableData[r].reply.comment=e.replayText):(e.tableData[r].reply={},e.tableData[r].reply.comment=e.replayText,e.tableData[r].reply.ctime=Math.round((new Date).getTime()/1e3)),e.tableData[r].replyStatus="回复成功",e.tableData[r].statusColor="green",e.replayTextVisible=!1,e.$refs.multipleTable.toggleRowSelection(e.tableDataCut[n],!1)):e.tableData[r].replyStatus=o.message):403===s.status?(e.tableData[r].statusColor="red",e.tableData[r].replyStatus="请检查店铺是否登录"):(e.tableData[r].statusColor="red",e.tableData[r].replyStatus="操作失败");case 13:case"end":return a.stop()}}),a)})))()},userReplaySave:function(){if(this.isBatchReplay)for(var t=0;t<this.multipleSelection.length;t++)this.userReplay(this.multipleSelection[t]);else this.userReplay(this.tableData[this.rowIndex]);this.isBatchReplay=!1},productUrl:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var l,r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return l={platform_mall_id:t.platform_mall_id},a.next=3,e.$shopeemanService.getWebUrl(t.country,l);case 3:return r=a.sent,n=r+"/product/"+t.platform_mall_id+"/"+t.product_id,a.abrupt("return",n);case 6:case"end":return a.stop()}}),a)})))()},openUrl:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var l,r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return l={platform_mall_id:t.platform_mall_id},a.next=3,e.$shopeemanService.getWebUrl(t.country,l);case 3:r=a.sent,n=r+"/product/"+t.platform_mall_id+"/"+t.product_id,e.$BaseUtilService.openUrl(n);case 6:case"end":return a.stop()}}),a)})))()},selectionChange:function(t){this.multipleSelection=t},changeMallList:function(t){this.selectMallList=t},dataCut:function(){this.tableDataCut=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,this.dataCut()},handleSizeChange:function(t){this.pageSize=t,this.dataCut()},clearLog:function(){this.$refs.Logs.consoleMsg=""}}},c=o,u=(a("2040"),a("2877")),p=Object(u["a"])(c,l,r,!1,null,"14e0e787",null);e["default"]=p.exports},8992:function(t,e,a){"use strict";a("4c28")},feb6:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,l){return t.showMall(e,l)?a("el-option",{key:l,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},r=[],n=a("1da1"),i=a("2909"),s=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),o=a("2b0e");o["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var l=e.indexOf("")>-1,r=t.indexOf("")>-1;l!==r?this.groupId=r?[""].concat(Object(i["a"])(this.groupIdList.map((function(t){return t.id})))):[]:r?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var l=e.indexOf("")>-1,r=t.indexOf("")>-1;l!==r?this.site=r?[""].concat(Object(i["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:r?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,l,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,l=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),r={country:a,mallGroupIds:l},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 6:n=t.sent,200===n.code?(e.siteList=n.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(l){if(l){var r=t.siteList.find((function(t){return t.platform_mall_id===l}));e.push(r),a+=l+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(i["a"])(e),Object(i["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,l=this.site[0]===t.platform_mall_id;return l||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){var a=0;t?(a=this.mallShowIndex+10,a=a<=this.showMallNumber&&a||this.showMallNumber):(a=this.mallShowIndex-10,a=a>=0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}},u=c,p=(a("8992"),a("2877")),d=Object(p["a"])(u,l,r,!1,null,null,null);e["a"]=d.exports}}]);