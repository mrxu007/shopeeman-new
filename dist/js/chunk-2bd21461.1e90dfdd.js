(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bd21461"],{1752:function(t,e,i){"use strict";i.r(e);var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticClass:"contaniner"},[i("el-row",{staticClass:"header"},[i("ul",{staticStyle:{"margin-bottom":"10px"}},[i("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),i("li",[i("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[i("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),i("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname"}}),i("el-table-column",{attrs:{prop:"total_item",label:"商品总数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"abnormal_item",label:"待改善商品数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"normal_item",label:"优质商品数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"titlecount",label:"偏短的商品名称数","min-width":"180px",align:"center"}}),i("el-table-column",{attrs:{prop:"categorycount",label:"错误分类数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"descriptioncount",label:"偏短的描述商品数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"imagecount",label:"图片太少商品数","min-width":"200px",align:"center"}}),i("el-table-column",{attrs:{prop:"shippingcount",label:"缺失包裹详情商品数","min-width":"200px",align:"center"}})],1)],1)],1)},a=[],s=i("1da1"),n=(i("96cf"),i("a4d3"),i("e01a"),i("feb6")),o=i("0e0b"),r={components:{storeChoose:n["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3)}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,i=this;return Object(s["a"])(regeneratorRuntime.mark((function l(){var a,s,n,o,r,u;return regeneratorRuntime.wrap((function(l){while(1)switch(l.prev=l.next){case 0:return a=e.length>1&&void 0!==e[1]?e[1]:{count:1},l.prev=1,s=t.mall_alias_name||t.platform_mall_name,n={mallId:t.platform_mall_id},l.next=6,i.$shopeemanService.getsalesassistance(i.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:o=l.sent,o&&(r=JSON.parse(o)),r.data=JSON.parse(r.data),200===r.status?(u={},u["total_item"]=r.data.result.summary.total_item,u["abnormal_item"]=r.data.result.summary.abnormal_item,u["normal_item"]=r.data.result.summary.normal_item,u["titlecount"]=r.data.result.data.title.count,u["categorycount"]=r.data.result.data.category.count,u["descriptioncount"]=r.data.result.data.description.count,u["imagecount"]=r.data.result.data.image.count,u["shippingcount"]=r.data.result.data.shipping.count,u["mallname"]=s,i.tableData.push(u)):403===r.status&&i.errmall.push(s),l.next=14;break;case 12:l.prev=12,l.t0=l["catch"](1);case 14:return l.prev=14,--a.count,l.finish(14);case 17:case"end":return l.stop()}}),l,null,[[1,12,14,17]])})))()},getallinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(o["c"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()}}},u=r,c=(i("cfe8"),i("2877")),h=Object(c["a"])(u,l,a,!1,null,"64c1cbeb",null);e["default"]=h.exports},3268:function(t,e,i){},"4c28":function(t,e,i){},8992:function(t,e,i){"use strict";i("4c28")},cfe8:function(t,e,i){"use strict";i("3268")},feb6:function(t,e,i){"use strict";var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[t.isMall?i("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,l){return t.showMall(e,l)?i("el-option",{key:l,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},a=[],s=i("1da1"),n=i("b85c"),o=i("2909"),r=(i("96cf"),i("d81d"),i("fb6a"),i("caad"),i("2532"),i("d3b7"),i("25f0"),i("99af"),i("6062"),i("3ca3"),i("ddb0"),i("4de4"),i("159b"),i("c740"),i("7db0"),i("7646")),u=i("2b0e");u["default"].directive("loadmore",{bind:function(t,e){var i=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var i=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var l=e.indexOf("")>-1,a=t.indexOf("")>-1;l!==a?this.groupId=a?Object(o["a"])(this.groupIdList.map((function(t){return t.id}))):[]:a?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){i.isAllowSet2=!0,i.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var i=this;if(this.isAllowSet1){this.isAllowSet1=!1;var l=this.isShowName;if(!this.isAShop){var a=e.includes(""),s=t.includes("");if(a!==s||e.toString()===t.toString()&&this.isShowNameAll)if(s&&(!l||l&&!this.isShowNameAll)){var r=l&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),u=new Set([].concat(Object(o["a"])(r),Object(o["a"])(e)));this.site=Object(o["a"])(u),this.isShowNameAll=!0,l&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var c=[];if(l){var h=l&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),d=h.length>this.site.length&&this.site||h,m=h.length>this.site.length&&h||this.site;c=new Set(this.site);var p,f=Object(n["a"])(m);try{for(f.s();!(p=f.n()).done;){var g=p.value;d.includes(g)&&c.delete(g)}}catch(b){f.e(b)}finally{f.f()}c.delete("")}this.site=Object(o["a"])(c)}else s?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){i.changeMallList(),i.filterMall(l),i.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var l,a,s,n,o,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.site=[],l=e.countryVal,a=[],!(e.jsonMallData.length>0)){i.next=7;break}a=e.jsonMallData,i.next=12;break;case 7:return i.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:s=i.sent,a=JSON.parse(s)||[],e.jsonMallData=JSON.parse(s)||[];case 12:if(!(a.length>0)){i.next=17;break}1===t&&(e.siteList=""===l?a:a.filter((function(t){return t.country===l}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){a.forEach((function(i){l?t===i.group_id&&l===i.country&&e.siteList.push(i):t===i.group_id&&e.siteList.push(i)}))})))),i.next=22;break;case 17:return n={country:"",mallGroupIds:""},i.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 20:o=i.sent,200===o.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",o.data),r=o.data||[],e.siteList=r,e.jsonMallData=r,e.siteList=""===l?r:r.filter((function(t){return t.country===l}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.groupId=[""],e.siteList.forEach((function(t){var i=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&i<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 24:case"end":return i.stop()}}),i)})))()},changeMallList:function(){var t=this,e=[],i="";if(this.isAShop){var l=this.siteList.find((function(e){return e.platform_mall_id===t.site}));e.push(l)}else this.site.forEach((function(l){if(l){var a=t.siteList.find((function(t){return t.platform_mall_id===l}));e.push(a),i+=l+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(i=e.length!==this.siteList.length&&i||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,i=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var i=e.siteList;t&&(i=e.siteList.filter((function(e){var i=e.mall_alias_name||e.platform_mall_name;return i.includes(t)}))),e.siteShowList=i}),i)},showMall:function(t,e){var i=t.mall_alias_name||t.platform_mall_name,l=this.site[0]===t.platform_mall_id;return l||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||i.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var i=0;t?(i=this.mallShowIndex+10,i=i<this.siteShowList.length-this.showMallNumber&&i||this.siteShowList.length-this.showMallNumber):(i=this.mallShowIndex-10,i=i>0&&i||0),i!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=i}}}},h=c,d=(i("8992"),i("2877")),m=Object(d["a"])(h,l,a,!1,null,null,null);e["a"]=m.exports}}]);