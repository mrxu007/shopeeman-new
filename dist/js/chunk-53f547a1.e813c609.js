(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53f547a1"],{1752:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticClass:"contaniner"},[i("el-row",{staticClass:"header"},[i("ul",{staticStyle:{"margin-bottom":"10px"}},[i("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),i("li",[i("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[i("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),i("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname"}}),i("el-table-column",{attrs:{prop:"total_item",label:"商品总数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"abnormal_item",label:"待改善商品数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"normal_item",label:"优质商品数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"titlecount",label:"偏短的商品名称数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"categorycount",label:"错误分类数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"descriptioncount",label:"偏短的描述商品数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"imagecount",label:"图片太少商品数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"shippingcount",label:"缺失包裹详情商品数","min-width":"200px",align:"center"}})],1)],1)],1)},l=[],n=i("1da1"),s=(i("96cf"),i("a4d3"),i("e01a"),i("feb6")),r=i("0e0b"),o={components:{storeChoose:s["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3)}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,i=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var l,n,s,r,o,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return l=e.length>1&&void 0!==e[1]?e[1]:{count:1},a.prev=1,n=t.mall_alias_name||t.platform_mall_name,s={mallId:t.platform_mall_id},a.next=6,i.$shopeemanService.getsalesassistance(i.site,s,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:r=a.sent,r&&(o=JSON.parse(r)),o.data=JSON.parse(o.data),200===o.status?(c={},c["total_item"]=o.data.result.summary.total_item,c["abnormal_item"]=o.data.result.summary.abnormal_item,c["normal_item"]=o.data.result.summary.normal_item,c["titlecount"]=o.data.result.data.title.count,c["categorycount"]=o.data.result.data.category.count,c["descriptioncount"]=o.data.result.data.description.count,c["imagecount"]=o.data.result.data.image.count,c["shippingcount"]=o.data.result.data.shipping.count,c["mallname"]=n,i.tableData.push(c)):403===o.status&&i.errmall.push(n),a.next=14;break;case 12:a.prev=12,a.t0=a["catch"](1);case 14:return a.prev=14,--l.count,a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[1,12,14,17]])})))()},getallinfo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(r["d"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()}}},c=o,u=(i("cfe8"),i("2877")),d=Object(u["a"])(c,a,l,!1,null,"64c1cbeb",null);e["default"]=d.exports},3268:function(t,e,i){},"4c28":function(t,e,i){},"4f51":function(t,e,i){"use strict";i("50ca")},"50ca":function(t,e,i){},8992:function(t,e,i){"use strict";i("4c28")},cfe8:function(t,e,i){"use strict";i("3268")},feb6:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[t.isMall?i("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[i("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,a){return i("el-option",{key:a,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),i("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?i("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[i("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(i){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),i("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?i("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?i("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),i("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},l=[],n=i("1da1"),s=i("2909"),r=(i("96cf"),i("a9e3"),i("caad"),i("2532"),i("99af"),i("d81d"),i("fb6a"),i("4de4"),i("d3b7"),i("6062"),i("3ca3"),i("ddb0"),i("c740"),i("a434"),i("25f0"),i("7db0"),i("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(s["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var a,l,n,r,o,c,u;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.searchSite="",1!==t){i.next=10;break}return a=e.countryVal,i.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:l=i.sent,200===l.code?(n=l.data||[],e.isAShop||n.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=n,e.siteList=""===a?n:n.filter((function(t){return(null===t||void 0===t?void 0:t.country)===a||!t.platform_mall_id}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(r=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),r.delete(void 0),o=Object(s["a"])(r),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(s["a"])(c),e.groupId=[""].concat(Object(s["a"])(c.map((function(t){return t.id}))))),i.next=13;break;case 10:u=[],u=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=u;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return i.stop()}}),i)})))()},changeSiteSelect:function(t,e){var i=this.searchSite,a=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(i){var l=this.siteShowList.map((function(t){return t.platform_mall_id}));if(a.includes(t))a=a.filter((function(t){return!l.includes(t)}));else{var n=new Set([""].concat(Object(s["a"])(a),Object(s["a"])(l)));a=Object(s["a"])(n)}}else a=a.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var r=a.findIndex((function(e){return e===t}));if(r>-1)a.splice(r,1),a.includes("")&&a.splice(0,1);else if(a.push(t),i){var o,c=this.siteShowList.filter((function(t){return a.includes(t.platform_mall_id)}));a.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==c.length+1||a.unshift("")}else{var u;a.includes("")||(null===(u=this.siteList)||void 0===u?void 0:u.length)!==a.length+1||a.unshift("")}}this.siteId=a}this.changeMallList()},changeMallList:function(){var t=[],e="",i=this.siteId;if(this.isAShop){i=i[0];var a=this.siteList.find((function(t){return t.platform_mall_id===i}));e=i,t.push(a)}else this.site=this.siteList.filter((function(t){return i.includes(t.platform_mall_id)})),i.length&&""===i[0]?(i=i.slice(1),t=this.site.slice(1)):t=this.site,e=i.toString();!this.countryVal&&this.groupId.indexOf("")>-1&&(e=t.length!==this.siteList.length&&e||""),this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var i=!0;if(t.searchSite&&e.platform_mall_id){var a=e.mall_alias_name||e.platform_mall_name;i=a.includes(t.searchSite)}return i}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=o,u=(i("8992"),i("4f51"),i("2877")),d=Object(u["a"])(c,a,l,!1,null,"5836cb4c",null);e["a"]=d.exports}}]);