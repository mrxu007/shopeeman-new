(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cca59e44"],{"29ca":function(t,e,a){"use strict";a("6a65")},"4c28":function(t,e,a){},"50c7":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"260px",prop:"mallname"}}),a("el-table-column",{attrs:{prop:"new_followers",label:"新粉丝","min-width":"250px",align:"center"}}),a("el-table-column",{attrs:{prop:"viewers",label:"观众","min-width":"250px",align:"center"}}),a("el-table-column",{attrs:{prop:"buyers",label:"买家","min-width":"250px",align:"center"}}),a("el-table-column",{attrs:{prop:"sales",label:"销售量","min-width":"250px",align:"center"}}),a("el-table-column",{attrs:{prop:"cost",label:"每位买家的销售额","min-width":"250px",align:"center"}}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"操作","min-width":"150px",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.view(i)}}},[t._v("关注礼概览")])]}}])})],1),a("el-dialog",{attrs:{title:"关注礼概览",visible:t.eidtVisible,width:"61%"},on:{"update:visible":function(e){t.eidtVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"关注礼名称",width:"160",prop:"follow_prize_name"}}),a("el-table-column",{attrs:{align:"center",prop:"start_day",label:"开始时间",width:"150"}}),a("el-table-column",{attrs:{align:"center",prop:"end_day",label:"结束时间",width:"150"}}),a("el-table-column",{attrs:{prop:"new_followers",label:"新粉丝",width:"100",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"viewers",label:"观众",width:"100"}}),a("el-table-column",{attrs:{align:"center",prop:"buyers",label:"买家数",width:"130"}}),a("el-table-column",{attrs:{align:"center",prop:"sales",label:"销售量",width:"100"}}),a("el-table-column",{attrs:{prop:"salePer",label:"每位买家的销售额",width:"130",align:"center"}})],1)],1)],1)],1)},s=[],l=a("1da1"),n=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("d81d"),a("159b"),a("b680"),a("0e0b")),r=a("feb6"),o={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),n=i.split("");l[5]=n[0],l[6]=Number(n[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var r=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=r.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");c[5]=d[0],c[6]=Number(d[1])+1,c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var s,l,n,r,o,h,c,d,m,u;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,l=t.mall_alias_name||t.platform_mall_name,n={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,status:0},i.next=6,a.$shopeemanService.getattention(a.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(r=i.sent,r&&(o=JSON.parse(r)),o.data=JSON.parse(o.data),200!==o.status){i.next=33;break}for(d in h={},h["mallname"]=l,h["viewers"]=o.data.result.viewers.value,h["sales"]=o.data.result.sales.value,h["claims"]=o.data.result.claims.value,h["usage_rate"]=o.data.result.usage_rate.value,h["new_followers"]=o.data.result.new_followers.value,h["orders"]=o.data.result.orders.value,h["buyers"]=o.data.result.buyers.value,h["cost"]=o.data.result.cost.value,a.exportdata.push(h),c={},c["mallname"]=l,o.data.result)c["".concat(d)]="sales"===d||"cost"===d?"".concat(a.$filters.siteCoin(a.site)).concat(o.data.result[d].value):o.data.result[d].value;return i.next=26,a.$shopeemanService.getattentionview(a.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 26:if(m=i.sent,m&&(m=JSON.parse(m),m.data=JSON.parse(m.data)),c["view"]=m.data.data,c["view"])for(u=0;u<c["view"].length;u++)c["view"][u].start_day=a.$dayjs(1e3*c["view"][u].start_day).format("YYYY-MM-DD hh:mm:ss"),c["view"][u].end_day=a.$dayjs(1e3*c["view"][u].end_day).format("YYYY-MM-DD hh:mm:ss"),c["view"][u].sales="".concat(a.$filters.siteCoin(a.site)).concat(c["view"][u].sales),c["view"][u].sales_per_buyer="".concat(a.$filters.siteCoin(a.site)).concat(c["view"][u].sales_per_buyer);a.tableData.push(c),i.next=34;break;case 33:403===o.status&&a.errmall.push(l);case 34:i.next=38;break;case 36:i.prev=36,i.t0=i["catch"](1);case 38:return i.prev=38,--s.count,i.finish(38);case 41:case"end":return i.stop()}}),i,null,[[1,36,38,41]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(n["c"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">新粉丝</td>\n        <td style="width: 200px; text-align:left;">观众</td>\n        <td style="width: 200px; text-align:left;">买家</td>\n        <td style="width: 200px; text-align:left;">销售量</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.new_followers,'</td>\n          <td style="text-align:left;">').concat(t.viewers,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.sales,'</td>\n          <td style="text-align:left;">').concat(t.cost,"</td>\n        </tr>\n        ")})),Object(n["i"])("关注礼信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"关注礼信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},view:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.eidtVisible=!0,t.view.forEach((function(t){var e=t.sales_per_buyer.substr(0,1),a=Number(t.sales_per_buyer.split(e)[1]).toFixed(2);t.salePer=e+a})),e.tableData1=t.view;case 3:case"end":return a.stop()}}),a)})))()}}},h=o,c=(a("29ca"),a("2877")),d=Object(c["a"])(h,i,s,!1,null,"aafdc14c",null);e["default"]=d.exports},"6a65":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},b85c:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");var i=a("06c5");function s(t,e){var a="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=Object(i["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var s=0,l=function(){};return{s:l,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r=!0,o=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return r=t.done,t},e:function(t){o=!0,n=t},f:function(){try{r||null==a["return"]||a["return"]()}finally{if(o)throw n}}}}},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],l=a("1da1"),n=a("b85c"),r=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),h=a("2b0e");h["default"].directive("loadmore",{bind:function(t,e){var a=this,i=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)})),i.addEventListener("blur",(function(){a.scrollTop=0}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName,s=e.includes(""),l=t.includes("");if(s!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!i||i&&!this.isShowNameAll)){var o=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(r["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),h=new Set([].concat(Object(r["a"])(o),Object(r["a"])(e)));this.site=Object(r["a"])(h),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var c=[];if(i){var d=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),m=d.length>this.site.length&&this.site||d,u=d.length>this.site.length&&d||this.site;c=new Set(this.site);var p,f=Object(n["a"])(u);try{for(f.s();!(p=f.n()).done;){var Y=p.value;m.includes(Y)&&c.delete(Y)}}catch(w){f.e(w)}finally{f.f()}c.delete("")}this.site=Object(r["a"])(c)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(i),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,s,l,n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],i=e.countryVal,s=[],!(e.jsonMallData.length>0)){a.next=7;break}s=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,s=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(s.length>0)){a.next=17;break}1===t&&(e.siteList=""===i?s:s.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){s.forEach((function(a){i?t===a.group_id&&i===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return n={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 20:r=a.sent,200===r.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",r.data),o=r.data||[],e.siteList=o,e.jsonMallData=o,e.siteList=""===i?o:o.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.mallShowIndex=0,e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=c,m=(a("8992"),a("2877")),u=Object(m["a"])(d,i,s,!1,null,null,null);e["a"]=u.exports}}]);