(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bd21461"],{1752:function(t,e,l){"use strict";l.r(e);var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("el-row",{staticClass:"contaniner"},[l("el-row",{staticClass:"header"},[l("ul",{staticStyle:{"margin-bottom":"10px"}},[l("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),l("li",[l("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)],1),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[l("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),l("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname"}}),l("el-table-column",{attrs:{prop:"total_item",label:"商品总数","min-width":"180px",align:"center"}}),l("el-table-column",{attrs:{prop:"abnormal_item",label:"待改善商品数","min-width":"180px",align:"center"}}),l("el-table-column",{attrs:{prop:"normal_item",label:"优质商品数","min-width":"180px",align:"center"}}),l("el-table-column",{attrs:{prop:"titlecount",label:"偏短的商品名称数","min-width":"180px",align:"center"}}),l("el-table-column",{attrs:{prop:"categorycount",label:"错误分类数","min-width":"200px",align:"center"}}),l("el-table-column",{attrs:{prop:"descriptioncount",label:"偏短的描述商品数","min-width":"200px",align:"center"}}),l("el-table-column",{attrs:{prop:"imagecount",label:"图片太少商品数","min-width":"200px",align:"center"}}),l("el-table-column",{attrs:{prop:"shippingcount",label:"缺失包裹详情商品数","min-width":"200px",align:"center"}})],1)],1)],1)},i=[],s=l("1da1"),n=(l("96cf"),l("a4d3"),l("e01a"),l("feb6")),o=l("0e0b"),r={components:{storeChoose:n["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3)}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,l=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var i,s,n,o,r,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},a.prev=1,s=t.mall_alias_name||t.platform_mall_name,n={mallId:t.platform_mall_id},a.next=6,l.$shopeemanService.getsalesassistance(l.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:o=a.sent,o&&(r=JSON.parse(o)),r.data=JSON.parse(r.data),200===r.status?(u={},u["total_item"]=r.data.result.summary.total_item,u["abnormal_item"]=r.data.result.summary.abnormal_item,u["normal_item"]=r.data.result.summary.normal_item,u["titlecount"]=r.data.result.data.title.count,u["categorycount"]=r.data.result.data.category.count,u["descriptioncount"]=r.data.result.data.description.count,u["imagecount"]=r.data.result.data.image.count,u["shippingcount"]=r.data.result.data.shipping.count,u["mallname"]=s,l.tableData.push(u)):403===r.status&&l.errmall.push(s),a.next=14;break;case 12:a.prev=12,a.t0=a["catch"](1);case 14:return a.prev=14,--i.count,a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[1,12,14,17]])})))()},getallinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(o["c"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()}}},u=r,c=(l("cfe8"),l("2877")),d=Object(c["a"])(u,a,i,!1,null,"64c1cbeb",null);e["default"]=d.exports},3268:function(t,e,l){},"4c28":function(t,e,l){},8992:function(t,e,l){"use strict";l("4c28")},cfe8:function(t,e,l){"use strict";l("3268")},feb6:function(t,e,l){"use strict";var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("ul",{staticClass:"storeChooseUL"},[t.isMall?l("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):l("li",{style:t.isReset&&"margin-bottom: 5px"},[l("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),l("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?l("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return l("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),l("li",{style:t.isReset&&"margin-bottom: 5px"},[l("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),l("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[l("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return l("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),l("li",{style:t.isReset&&"margin-bottom: 5px"},[l("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),l("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():l("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,a){return t.showMall(e,a)?l("el-option",{key:a,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?l("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[l("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],s=l("1da1"),n=l("2909"),o=(l("96cf"),l("99af"),l("d81d"),l("fb6a"),l("d3b7"),l("25f0"),l("159b"),l("c740"),l("7db0"),l("4de4"),l("caad"),l("2532"),l("7646")),r=l("2b0e");r["default"].directive("loadmore",{bind:function(t,e){var l=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");l.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var u={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var l=this;if(this.isAllowSet2){this.isAllowSet2=!1;var a=e.indexOf("")>-1,i=t.indexOf("")>-1;a!==i?this.groupId=i?[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){l.isAllowSet2=!0,l.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var l=this;if(this.isAllowSet1){this.isAllowSet1=!1;var a=e.indexOf("")>-1,i=t.indexOf("")>-1;a!==i?this.site=i?[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:i?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){l.changeMallList(),l.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var l,a,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],l=e.countryVal,a=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),i={country:l,mallGroupIds:a},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(i);case 6:s=t.sent,200===s.code?(e.siteList=s.data||[],0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var l=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&l<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],l="";this.site.forEach((function(a){if(a){var i=t.siteList.find((function(t){return t.platform_mall_id===a}));e.push(i),l+=a+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(l=e.length!==this.siteList.length&&l||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:l,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var l=e.mall_alias_name||e.platform_mall_name;return l.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var l=this.siteList.filter((function(e){var l=e.mall_alias_name||e.platform_mall_name;return!l.includes(t)}));this.siteShowList=[].concat(Object(n["a"])(e),Object(n["a"])(l))},showMall:function(t,e){var l=t.mall_alias_name||t.platform_mall_name,a=this.site[0]===t.platform_mall_id;return a||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||l.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var l=0;t?(l=this.mallShowIndex+10,l=l<this.siteShowList.length&&l||this.mallShowIndex):(l=this.mallShowIndex-10,l=l>0&&l||0),l!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=l}}}},c=u,d=(l("8992"),l("2877")),h=Object(d["a"])(c,a,i,!1,null,null,null);e["a"]=h.exports}}]);