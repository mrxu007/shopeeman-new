(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b19a058"],{"4c28":function(t,e,i){},"4d2a":function(t,e,i){},"55be":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"putOn-statistics"},[i("div",{staticClass:"tool-bar"},[i("div",{staticClass:"tool-row"},[i("storeChoose",{attrs:{"is-all":!0},on:{changeMallList:t.changeMallList}})],1),i("div",{staticClass:"tool-row"},[i("div",{staticClass:"tool-item mar-right"},[i("span",[t._v("查询时间：")]),i("el-date-picker",{staticStyle:{width:"220px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.statisticsTime,callback:function(e){t.statisticsTime=e},expression:"statisticsTime"}})],1),i("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.searchTableList}},[t._v("查 询")]),i("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导 出")])],1)]),i("div",{staticClass:"content"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableDataCut,"tooltip-effect":"dark","max-height":"650"}},[i("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),i("el-table-column",{attrs:{width:"120px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.country)))]}}])}),i("el-table-column",{attrs:{"min-width":"60px",label:"店铺",prop:"platform_mall_name",align:"center"}}),i("el-table-column",{attrs:{"min-width":"60px",label:"店铺分组",prop:"group_name",align:"center"}}),i("el-table-column",{attrs:{"min-width":"60px",label:"上架总量",prop:"upCount",align:"center"}})],1),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"","page-sizes":[10,20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])},n=[],s=i("1da1"),l=(i("99af"),i("159b"),i("fb6a"),i("96cf"),i("feb6")),r=i("0e0b"),o={components:{storeChoose:l["a"]},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},statisticsTime:[],pageSize:20,currentPage:1,total:0,multipleSelection:[],tableLoading:!1,tableData:[],mallData:[],tableDataCut:[]}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=(new Date).getTime(),a=i-2592e5,t.statisticsTime=[t.$dayjs(a).format("YYYY-MM-DD"),t.$dayjs(i).format("YYYY-MM-DD")],setTimeout((function(){t.searchTableList()}),1e3);case 4:case"end":return e.stop()}}),e)})))()},methods:{changeMallList:function(t){this.mallData=t},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据！");for(var t=1,e="<tr>\n                <td>编号</td>\n                <td>站点</td>\n                <td>店铺</td>\n                <td>店铺分组</td>\n                <td>店铺总量</td>\n                </tr>",i=0;i<this.tableData.length;i++){var a=this.tableData[i];e+="<tr><td>".concat(t++,"</td>\n                        <td>").concat(a.country?this.$filters.chineseSite(a.country):"\t","</td>\n                        <td>").concat(a.platform_mall_name?a.platform_mall_name:"\t","</td>\n                        <td>").concat(a.group_name?a.group_name:"\t","</td> \n                        <td>").concat(a.upCount?a.upCount:"0\t","</td>\n                    </tr>")}Object(r["i"])("店铺上架数量统计",e)},searchTableList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,a,n,s,l,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=[t.statisticsTime[0]+" 00:00:00",t.statisticsTime[1]+" 23:59:59"],t.tableLoading=!0,e.next=4,t.$commodityService.getStatisticsNew(i);case 4:if(a=e.sent,a){e.next=8;break}return t.tableLoading=!1,e.abrupt("return");case 8:for(n=a&&JSON.parse(a),s=n.data||[],l=function(e){var i=t.mallData[e];i.upCount=0,s.forEach((function(t){t.list.forEach((function(t){t.mallId==i.platform_mall_id&&(i.upCount+=t.cnt)}))})),t.tableData.push(i)},r=0;r<t.mallData.length;r++)l(r);t.total=t.tableData.length,t.dataCut(),t.tableLoading=!1;case 15:case"end":return e.stop()}}),e)})))()},selectionChange:function(t){this.multipleSelection=t},dataCut:function(){this.tableDataCut=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,this.dataCut()},handleSizeChange:function(t){this.pageSize=t,this.dataCut()}}},u=o,c=(i("74d6"),i("2877")),d=Object(c["a"])(u,a,n,!1,null,"22da3fdd",null);e["default"]=d.exports},"74d6":function(t,e,i){"use strict";i("4d2a")},8992:function(t,e,i){"use strict";i("4c28")},feb6:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},n=[],s=i("1da1"),l=(i("96cf"),i("159b"),i("fb6a"),i("d3b7"),i("25f0"),i("c740"),i("4de4"),i("7646")),r={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var i=this;if(this.isAllowSet2){this.isAllowSet2=!1;var a=e.indexOf("")>-1,n=t.indexOf("")>-1;a!==n?n?(this.groupId=[""],this.groupIdList.forEach((function(t){i.groupId.push(t.id)}))):this.groupId=[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){i.isAllowSet2=!0,i.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var i=this;if(this.isAllowSet1){this.isAllowSet1=!1;var a=e.indexOf("")>-1,n=t.indexOf("")>-1;a!==n?n?(this.site=[""],this.siteList.forEach((function(t){i.site.push(t.platform_mall_id)}))):this.site=[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){i.changeMallList(),i.isAllowSet1=!0}))}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},changeSelect:function(t){return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,a,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],i=e.countryVal,a=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:i,mallGroupIds:a},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:s=t.sent,200===s.code?(e.siteList=s.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var i=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&i<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],i="";this.site.forEach((function(a){if(a){var n=t.siteList.filter((function(t){return t.platform_mall_id===a}));e.push(n[0]),i+=a+","}})),e["country"]=this.countryVal,i=e.length===this.siteList.length&&i||"",this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):this.$emit("changeMallList",e)}}},o=r,u=(i("8992"),i("2877")),c=Object(u["a"])(o,a,n,!1,null,null,null);e["a"]=c.exports}}]);