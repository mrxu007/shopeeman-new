(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7804dae3"],{"0278":function(t,e,a){"use strict";a("5b8a")},"4c28":function(t,e,a){},"55be":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"putOn-statistics"},[a("div",{staticClass:"tool-bar"},[a("div",{staticClass:"tool-row"},[a("storeChoose",{attrs:{"is-all":!0},on:{changeMallList:t.changeMallList}})],1),a("div",{staticClass:"tool-row"},[a("div",{staticClass:"tool-item mar-right"},[a("span",[t._v("查询时间：")]),a("el-date-picker",{staticStyle:{width:"220px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.statisticsTime,callback:function(e){t.statisticsTime=e},expression:"statisticsTime"}})],1),a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.searchTableList}},[t._v("查 询")]),a("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导 出")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableDataCut,"tooltip-effect":"dark",height:"calc(100vh - 145px)"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("el-table-column",{attrs:{width:"120px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.country)))]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"店铺",prop:"platform_mall_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.mall_alias_name||i.platform_mall_name))])]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"店铺分组",prop:"group_name",align:"center"}}),a("el-table-column",{attrs:{"min-width":"60px",label:"上架总量",prop:"upCount",align:"center",sortable:""}})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[100,200],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])},l=[],s=a("1da1"),n=(a("99af"),a("159b"),a("a9e3"),a("fb6a"),a("96cf"),a("feb6")),o=a("0e0b"),r={components:{storeChoose:n["a"]},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},statisticsTime:[],pageSize:100,currentPage:1,total:0,multipleSelection:[],tableLoading:!1,tableData:[],mallData:[],tableDataCut:[]}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=(new Date).getTime(),i=a-2592e5,t.statisticsTime=[t.$dayjs(i).format("YYYY-MM-DD"),t.$dayjs(a).format("YYYY-MM-DD")],Object(o["w"])((function(){return t.mallData[0]}),20),t.searchTableList();case 5:case"end":return e.stop()}}),e)})))()},methods:{changeMallList:function(t){this.mallData=t},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据！");for(var t=1,e="<tr>\n                <td>编号</td>\n                <td>站点</td>\n                <td>店铺</td>\n                <td>店铺分组</td>\n                <td>店铺总量</td>\n                </tr>",a=0;a<this.tableData.length;a++){var i=this.tableData[a];e+="<tr><td>".concat(t++,"</td>\n                        <td>").concat(i.country?this.$filters.chineseSite(i.country):"\t","</td>\n                        <td>").concat(i.platform_mall_name?i.platform_mall_name:"\t","</td>\n                        <td>").concat(i.group_name?i.group_name:"\t","</td>\n                        <td>").concat(i.upCount?i.upCount:"0\t","</td>\n                    </tr>")}Object(o["i"])("店铺上架数量统计",e)},searchTableList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,i,l,s,n,o,r,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.tableData=[],a=[t.statisticsTime[0]+" 00:00:00",t.statisticsTime[1]+" 23:59:59"],t.tableLoading=!0,e.next=5,t.$commodityService.getStatisticsNew(a);case 5:if(i=e.sent,i){e.next=9;break}return t.tableLoading=!1,e.abrupt("return");case 9:for(l=i&&JSON.parse(i),s=l.data||[],n={country:"--",platform_mall_name:"--",group_name:"--",upCount:0},o=0,t.tableData.push(n),r=function(e){var a=t.mallData[e];a.upCount=0,s.forEach((function(t){t.list.forEach((function(t){Number(t.mallId)===Number(a.platform_mall_id)&&(a.upCount+=t.cnt)}))})),o+=a.upCount,t.tableData.push(a)},u=0;u<t.mallData.length;u++)r(u);t.$set(n,"upCount",o),t.total=t.tableData.length,t.dataCut(),t.tableLoading=!1;case 20:case"end":return e.stop()}}),e)})))()},selectionChange:function(t){this.multipleSelection=t},dataCut:function(){this.tableDataCut=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,this.dataCut()},handleSizeChange:function(t){this.pageSize=t,this.dataCut()}}},u=r,c=(a("0278"),a("2877")),d=Object(c["a"])(u,i,l,!1,null,"0d739670",null);e["default"]=d.exports},"5b8a":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},l=[],s=a("1da1"),n=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),r=a("2b0e");r["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var u={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var i=e.indexOf("")>-1,l=t.indexOf("")>-1;i!==l?this.groupId=l?[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):[]:l?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=e.indexOf("")>-1,l=t.indexOf("")>-1;i!==l?this.site=l?[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,i,l,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,i=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),l={country:a,mallGroupIds:i},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(l);case 6:s=t.sent,200===s.code?(e.siteList=s.data||[],0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var l=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(l),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(n["a"])(e),Object(n["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},c=u,d=(a("8992"),a("2877")),h=Object(d["a"])(c,i,l,!1,null,null,null);e["a"]=h.exports}}]);