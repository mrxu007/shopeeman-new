(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2e8a6ec"],{"4c28":function(t,e,a){},"7d65":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("订单类型：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},t._l(t.returnStatusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{loading:t.Loading1,type:"primary",size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)],1),a("br")]),a("el-row",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",attrs:{height:"calc(100vh - 85px)",data:t.tableData2,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname",fixed:""}}),a("el-table-column",{attrs:{align:"center",prop:"place_gmv",label:"销售量","min-width":"260px"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.place_gmv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"place_orders",label:"订单总数","min-width":"260px"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.place_orders)}})]}}])}),a("el-table-column",{attrs:{prop:"shop_uv_to_placed_buyers_rate",label:"访客转换率","min-width":"260px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv_to_placed_buyers_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"place_sales_per_order",label:"各订单销售额","min-width":"260px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.place_sales_per_order)}})]}}])}),a("el-table-column",{attrs:{prop:"shop_uv",label:"访客","min-width":"245px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{prop:"shop_pv",label:"页面浏览量","min-width":"245px",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])})],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("feb6")),n=a("0e0b"),o={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,allgroupid:[],allmallid:[],tableData2:[],errmall:[],Status:"palced",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}],returnStatusList:[{value:"palced",label:"下单"},{value:"confirmed",label:"确认订单"},{value:"paid",label:"付费订单"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),u=o.split("");c[5]=u[0],c[6]=Number(u[1])+1,c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var d=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=d.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=m.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,l,r,n,o,h,c,u,d,m,p,f,Y,_,M,y,D;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,l=t.mall_alias_name||t.platform_mall_name,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,orderType:a.Status,mallId:t.platform_mall_id,fetag:"fetag",limit:5},s.next=6,a.$shopeemanService.dashboard(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(n=s.sent,o="",n&&(o=JSON.parse(n)),200===o.status){if(o.data=JSON.parse(o.data),"real_time"===a.Statisticaltime)for(h in o.data.result)c="green",u="",o.data.result[h].chain_ratio>0?u="↑":o.data.result[h].chain_ratio<0&&(c="red",u="↓"),o.data.result[h]="shop_uv_to_placed_buyers_rate"===h?'<pre style="color:'.concat(c,'">').concat((100*o.data.result[h].value).toFixed(2),"%\nvs 00:00 - 13:00  ").concat(Math.abs(100*o.data.result[h].chain_ratio).toFixed(2),"%")+" ".concat(u,"</pre>"):'<pre style="color:'.concat(c,'">').concat(parseInt(o.data.result[h].value),"\nvs 00:00 - 13:00  ").concat(Math.abs(100*o.data.result[h].chain_ratio).toFixed(2),"%")+" ".concat(u,"</pre>");if("yesterday"===a.Statisticaltime)for(d in o.data.result)m="green",p="",o.data.result[d].chain_ratio>0?p="↑":o.data.result[d].chain_ratio<0&&(p="↓",m="red"),o.data.result[d]="shop_uv_to_placed_buyers_rate"===d?'<pre style="color:'.concat(m,'">').concat((100*o.data.result[d].value).toFixed(2),"%\nvs 前一天  ").concat(Math.abs(100*o.data.result[d].chain_ratio).toFixed(2),"%")+" ".concat(p,"</pre>"):'<pre style="color:'.concat(m,'">').concat(parseInt(o.data.result[d].value),"\nvs 前一天  ").concat(Math.abs(100*o.data.result[d].chain_ratio).toFixed(2),"%")+" ".concat(p,"</pre>");if("past7days"===a.Statisticaltime)for(f in o.data.result)Y="green",_="",o.data.result[f].chain_ratio>0?_="↑":o.data.result[f].chain_ratio<0&&(_="↓",Y="red"),o.data.result[f]="shop_uv_to_placed_buyers_rate"===f?'<pre style="color:'.concat(Y,'">').concat((100*o.data.result[f].value).toFixed(2),"%\nvs 前7天  ").concat(Math.abs(100*o.data.result[f].chain_ratio).toFixed(2),"%")+" ".concat(_,"</pre>"):'<pre style="color:'.concat(Y,'">').concat(parseInt(o.data.result[f].value),"\nvs 前7天  ").concat(Math.abs(100*o.data.result[f].chain_ratio).toFixed(2),"%")+" ".concat(_,"</pre>");if("past30days"===a.Statisticaltime)for(M in o.data.result)y="green",D="",o.data.result[M].chain_ratio>0?D="↑":o.data.result[M].chain_ratio<0&&(D="↓",y="red"),o.data.result[M]="shop_uv_to_placed_buyers_rate"===M?'<pre style="color:'.concat(y,'">').concat((100*o.data.result[M].value).toFixed(2),"%\nvs 前30天  ").concat(Math.abs(100*o.data.result[M].chain_ratio).toFixed(2),"%")+" ".concat(D,"</pre>"):'<pre style="color:'.concat(y,'">').concat(parseInt(o.data.result[M].value),"\nvs 前30天  ").concat(Math.abs(100*o.data.result[M].chain_ratio).toFixed(2),"%")+" ".concat(D,"</pre>");o.data.result["mallname"]=l,a.tableData2.push(o.data.result)}s.next=14;break;case 12:s.prev=12,s.t0=s["catch"](1);case 14:return s.prev=14,--i.count,s.finish(14);case 17:case"end":return s.stop()}}),s,null,[[1,12,14,17]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.Loading1=!0,t.tableData2=[],!(t.mall.length>0)){e.next=8;break}return e.next=5,Object(n["c"])(t.mall,t.getTableData);case 5:t.$message.success("查询完成"),e.next=9;break;case 8:t.$message({message:"请先选择店铺",type:"warning"});case 9:t.Loading1=!1;case 10:case"end":return e.stop()}}),e)})))()}}},h=o,c=(a("9070"),a("2877")),u=Object(c["a"])(h,s,i,!1,null,"94a88fae",null);e["default"]=u.exports},8992:function(t,e,a){"use strict";a("4c28")},9070:function(t,e,a){"use strict";a("f3063")},b85c:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");var s=a("06c5");function i(t,e){var a="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=Object(s["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var i=0,l=function(){};return{s:l,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,n=!0,o=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return n=t.done,t},e:function(t){o=!0,r=t},f:function(){try{n||null==a["return"]||a["return"]()}finally{if(o)throw r}}}}},f3063:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],l=a("1da1"),r=a("b85c"),n=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),h=a("2b0e");h["default"].directive("loadmore",{bind:function(t,e){var a=this,s=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");s.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)})),s.addEventListener("blur",(function(){a.scrollTop=0}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=this.isShowName,i=e.includes(""),l=t.includes("");if(i!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!s||s&&!this.isShowNameAll)){var o=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),h=new Set([].concat(Object(n["a"])(o),Object(n["a"])(e)));this.site=Object(n["a"])(h),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var c=[];if(s){var u=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),d=u.length>this.site.length&&this.site||u,m=u.length>this.site.length&&u||this.site;c=new Set(this.site);var p,f=Object(r["a"])(m);try{for(f.s();!(p=f.n()).done;){var Y=p.value;d.includes(Y)&&c.delete(Y)}}catch(_){f.e(_)}finally{f.f()}c.delete("")}this.site=Object(n["a"])(c)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(s),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,i,l,r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],s=e.countryVal,i=[],!(e.jsonMallData.length>0)){a.next=7;break}i=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,i=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(i.length>0)){a.next=17;break}1===t&&(e.siteList=""===s?i:i.filter((function(t){return t.country===s}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){i.forEach((function(a){s?t===a.group_id&&s===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:n=a.sent,200===n.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",n.data),o=n.data||[],e.siteList=o,e.jsonMallData=o,e.siteList=""===s?o:o.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.mallShowIndex=0,e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},u=c,d=(a("8992"),a("2877")),m=Object(d["a"])(u,s,i,!1,null,null,null);e["a"]=m.exports}}]);