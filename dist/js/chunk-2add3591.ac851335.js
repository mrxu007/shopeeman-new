(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2add3591"],{4046:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-row",{staticClass:"contaniner"},[s("el-row",{staticClass:"header"},[s("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[s("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),s("ul",[s("li",[s("span",[t._v("资料期间：")]),s("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return s("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),s("li",[s("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),s("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),s("li",[s("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),s("br"),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 120px)",data:t.tableData2,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[s("el-table-column",{attrs:{align:"center",label:"序列号",width:"180",prop:"index"}}),s("el-table-column",{attrs:{align:"center",prop:"mallname",label:"店铺",width:"250"}}),s("el-table-column",{attrs:{align:"center",prop:"price_zone",label:"价格范围",width:"250"}}),s("el-table-column",{attrs:{prop:"buyers",label:"买家",width:"250",align:"center"}}),s("el-table-column",{attrs:{prop:"buyers_percentage",label:"买家%",width:"250",align:"center"}}),s("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"250",align:"center"}}),s("el-table-column",{attrs:{prop:"conversion_rate",label:"转化率",width:"250",align:"center"}})],1),s("div",{staticClass:"logging"},[s("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},a=[],l=s("1da1"),r=(s("96cf"),s("ac1f"),s("1276"),s("a15b"),s("a9e3"),s("99af"),s("b680"),s("feb6")),o=s("0e0b"),n={data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],tableData2:[],tableData3:[],errmall:[],indexs:1,indexs1:1,indexs2:1,currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"}]}},components:{storeChoose:r["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var s=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=s.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var a=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");a[5]="0",a[6]="1",a=a.join(""),this.end_time=Date.parse(this.$dayjs(a).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),c=n.split("");m[5]=c[0],m[6]=Number(c[1])+1,m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var d=this.$dayjs(this.timechoose).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),p=Y.split("");f[5]=p[0],f[6]=Number(p[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("month"===this.Statisticaltime){var s=this.$dayjs(t).format("YYYY-MM-01"),i=s.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var a=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");a[5]="0",a[6]="1",a=a.join(""),this.end_time=Date.parse(this.$dayjs(a).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("month"===this.Statisticaltime){var o=this.$dayjs(t).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var m=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),c=n.split("");m[5]=c[0],m[6]=Number(c[1])+1,m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("month"===this.Statisticaltime){var d=this.$dayjs(t).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),p=Y.split("");f[5]=p[0],f[6]=Number(p[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,s=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var a,l,r,o,n,h,m;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(a=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,l=t.mall_alias_name||t.platform_mall_name,!0!==s.serchload){i.next=8;break}return s.Loading3=!1,setTimeout((function(){s.Loading1=!1}),3e3),s.serchload=!1,i.abrupt("return");case 8:return r={start_time:s.start_time,end_time:s.end_time,period:s.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",r),i.next=12,s.$shopeemanService.getsalasstructure2(s.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:if(o=i.sent,o&&(n=JSON.parse(o)),200===n.status)for(n.data=JSON.parse(n.data),h=0;h<n.data.data.length;h++)m={},m["index"]=s.indexs1,s.indexs1++,m["mallname"]=l,-1===n.data.data[h].price_zone[1]?m["price_zone"]="".concat(s.currency).concat(n.data.data[h].price_zone[0]," - ").concat(s.currency," 无上限"):m["price_zone"]="".concat(s.currency).concat(n.data.data[h].price_zone[0]," - ").concat(s.currency).concat(n.data.data[h].price_zone[1]),m["buyers"]=n.data.data[h].buyers,m["buyers_percentage"]=(100*n.data.data[h].buyers_percentage).toFixed(2)+"%",m["sales"]="".concat(s.currency).concat(n.data.data[h].sales),m["sales_percentage"]=(100*n.data.data[h].sales_percentage).toFixed(2)+"%",m["conversion_rate"]=(100*n.data.data[h].conversion_rate).toFixed(2)+"%",s.tableData2.push(m);else 403===n.status&&(s.$refs.Logs.writeLog("【".concat(l,"】 数据获取失败：店铺未登录"),!1),s.errmall.push(l));i.next=20;break;case 17:i.prev=17,i.t0=i["catch"](1),console.log(i.t0);case 20:return i.prev=20,--a.count,i.finish(20);case 23:case"end":return i.stop()}}),i,null,[[1,17,20,23]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=23;break}return t.indexs=1,t.indexs1=1,t.indexs2=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.tableData1=[],t.tableData2=[],t.tableData3=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=18,Object(o["d"])(t.mall,t.getTableData);case 18:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=24;break;case 23:t.$message({message:"请选择店铺",type:"warning"});case 24:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0}}},h=n,m=(s("ca50"),s("2877")),c=Object(m["a"])(h,i,a,!1,null,"7148f0d6",null);e["default"]=c.exports},"4c28":function(t,e,s){},8992:function(t,e,s){"use strict";s("4c28")},c567:function(t,e,s){},ca50:function(t,e,s){"use strict";s("c567")},feb6:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("ul",{staticClass:"storeChooseUL"},[t.isMall?s("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):s("li",{style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),s("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?s("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return s("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),s("li",{style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),s("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return s("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),s("li",{style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),s("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():s("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?s("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?s("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[s("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},a=[],l=s("1da1"),r=s("b85c"),o=s("2909"),n=(s("96cf"),s("d81d"),s("fb6a"),s("caad"),s("2532"),s("d3b7"),s("25f0"),s("99af"),s("6062"),s("3ca3"),s("ddb0"),s("4de4"),s("159b"),s("c740"),s("7db0"),s("7646")),h=s("2b0e");h["default"].directive("loadmore",{bind:function(t,e){var s=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");s.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var m={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new n["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var s=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,a=t.indexOf("")>-1;i!==a?this.groupId=a?Object(o["a"])(this.groupIdList.map((function(t){return t.id}))):[]:a?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){s.isAllowSet2=!0,s.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var s=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName;if(!this.isAShop){var a=e.includes(""),l=t.includes("");if(a!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!i||i&&!this.isShowNameAll)){var n=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),h=new Set([].concat(Object(o["a"])(n),Object(o["a"])(e)));this.site=Object(o["a"])(h),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var m=[];if(i){var c=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),d=c.length>this.site.length&&this.site||c,Y=c.length>this.site.length&&c||this.site;m=new Set(this.site);var u,f=Object(r["a"])(Y);try{for(f.s();!(u=f.n()).done;){var p=u.value;d.includes(p)&&m.delete(p)}}catch(M){f.e(M)}finally{f.f()}m.delete("")}this.site=Object(o["a"])(m)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){s.changeMallList(),s.filterMall(i),s.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,a,l,r,n,h,m;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(e.site=[],i=e.countryVal,a=[],!(e.jsonMallData.length>0)){s.next=7;break}a=e.jsonMallData,s.next=12;break;case 7:return s.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=s.sent,a=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(a.length>0)){s.next=17;break}1===t&&(e.siteList=""===i?a:a.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){a.forEach((function(s){i?t===s.group_id&&i===s.country&&e.siteList.push(s):t===s.group_id&&e.siteList.push(s)}))})))),s.next=22;break;case 17:return r={country:"",mallGroupIds:""},s.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:n=s.sent,200===n.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",n.data),h=n.data||[],e.siteList=h,e.jsonMallData=h,e.siteList=""===i?h:h.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:m=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=m.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&m.push({group_name:t.group_name,id:t.group_id})})),m.zzSort("id"),e.groupIdList=[].concat(Object(o["a"])(e.groupIdList),m),e.groupId=[""].concat(Object(o["a"])(m.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return s.stop()}}),s)})))()},changeMallList:function(){var t=this,e=[],s="";if(this.isAShop){var i=this.siteList.find((function(e){return e.platform_mall_id===t.site}));s=this.site,e.push(i)}else this.site.forEach((function(i){if(i){var a=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(a),s+=i+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(s=e.length!==this.siteList.length&&s||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:s,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,s=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var s=e.siteList;t&&(s=e.siteList.filter((function(e){var s=e.mall_alias_name||e.platform_mall_name;return s.includes(t)}))),e.siteShowList=s}),s)},showMall:function(t,e){var s=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||s.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var s=0;t?(s=this.mallShowIndex+10,s=s<this.siteShowList.length-this.showMallNumber&&s||this.siteShowList.length-this.showMallNumber):(s=this.mallShowIndex-10,s=s>0&&s||0),s!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=s}}}},c=m,d=(s("8992"),s("2877")),Y=Object(d["a"])(c,i,a,!1,null,null,null);e["a"]=Y.exports}}]);