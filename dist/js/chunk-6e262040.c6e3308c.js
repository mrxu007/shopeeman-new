(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e262040"],{"4c28":function(t,e,s){},5833:function(t,e,s){},"78bd":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-row",{staticClass:"contaniner"},[s("el-row",{staticClass:"header"},[s("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[s("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),s("ul",[s("li",[s("span",[t._v("资料期间：")]),s("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return s("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),s("li",[s("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),s("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),s("li",[s("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),s("br"),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData3,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[s("el-table-column",{attrs:{align:"center",label:"序列号",width:"100",prop:"index"}}),s("el-table-column",{attrs:{align:"center",prop:"mallname",label:"店铺",width:"230"}}),s("el-table-column",{attrs:{align:"center",prop:"buyers_type",label:"买家类型",width:"207"}}),s("el-table-column",{attrs:{prop:"buyers",label:"买家",width:"230",align:"center"}}),s("el-table-column",{attrs:{prop:"buyers_percentage",label:"买家%",width:"230",align:"center"}}),s("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"230",align:"center"}}),s("el-table-column",{attrs:{prop:"sales_percentage",label:"销售额%",width:"230",align:"center"}}),s("el-table-column",{attrs:{prop:"conversion_rate",label:"转化率",width:"230",align:"center"}})],1),s("div",{staticClass:"logging"},[s("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},a=[],l=s("1da1"),r=(s("96cf"),s("ac1f"),s("1276"),s("a15b"),s("a9e3"),s("b680"),s("99af"),s("feb6")),n=s("0e0b"),o={data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],tableData2:[],tableData3:[],errmall:[],indexs:1,indexs1:1,indexs2:1,currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"}]}},components:{storeChoose:r["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var s=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=s.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var a=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");a[5]="0",a[6]="1",a=a.join(""),this.end_time=Date.parse(this.$dayjs(a).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),c=o.split("");m[5]=c[0],m[6]=Number(c[1])+1,m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var d=this.$dayjs(this.timechoose).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=Y.split("");p[5]=f[0],p[6]=Number(f[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("month"===this.Statisticaltime){var s=this.$dayjs(t).format("YYYY-MM-01"),i=s.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var a=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");a[5]="0",a[6]="1",a=a.join(""),this.end_time=Date.parse(this.$dayjs(a).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("month"===this.Statisticaltime){var n=this.$dayjs(t).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var m=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),c=o.split("");m[5]=c[0],m[6]=Number(c[1])+1,m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("month"===this.Statisticaltime){var d=this.$dayjs(t).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),f=Y.split("");p[5]=f[0],p[6]=Number(f[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,s=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var a,l,r,n,o,h,m;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(a=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,l=t.mall_alias_name||t.platform_mall_name,!0!==s.serchload){i.next=8;break}return s.Loading3=!1,setTimeout((function(){s.Loading1=!1}),3e3),s.serchload=!1,i.abrupt("return");case 8:return r={start_time:s.start_time,end_time:s.end_time,period:s.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",r),i.next=12,s.$shopeemanService.getsalasstructure3(s.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:if(n=i.sent,n&&(o=JSON.parse(n)),200===o.status)for(o.data=JSON.parse(o.data),console.log("wuhuwhuwhuwhuwhuwuwhuwhuwhuwuwhuwuh",o),h=0;h<o.data.data.length;h++)m={},m["index"]=s.indexs2,s.indexs2++,m["mallname"]=l,m["buyers"]=o.data.data[h].buyers,m["buyers_type"]=o.data.data[h].buyers_type,"new_buyers"===m["buyers_type"]?m["buyers_type"]="新买家":"existing_buyers"===m["buyers_type"]&&(m["buyers_type"]="现有买家"),m["buyers_percentage"]=(100*o.data.data[h].buyers_percentage).toFixed(2)+"%",m["sales"]="".concat(s.currency).concat(o.data.data[h].sales),m["sales_percentage"]=(100*o.data.data[h].sales_percentage).toFixed(2)+"%",m["conversion_rate"]=(100*o.data.data[h].conversion_rate).toFixed(2)+"%",console.log("zhelizhelizheli",m),s.tableData3.push(m);else 403===o.status&&(s.$refs.Logs.writeLog("【".concat(l,"】 数据获取失败：店铺未登录"),!1),s.errmall.push(l));i.next=20;break;case 17:i.prev=17,i.t0=i["catch"](1),console.log(i.t0);case 20:return i.prev=20,--a.count,i.finish(20);case 23:case"end":return i.stop()}}),i,null,[[1,17,20,23]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=23;break}return t.indexs=1,t.indexs1=1,t.indexs2=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.tableData1=[],t.tableData2=[],t.tableData3=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=18,Object(n["d"])(t.mall,t.getTableData);case 18:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=24;break;case 23:t.$message({message:"请选择店铺",type:"warning"});case 24:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0}}},h=o,m=(s("8391"),s("2877")),c=Object(m["a"])(h,i,a,!1,null,"649d33e2",null);e["default"]=c.exports},8391:function(t,e,s){"use strict";s("5833")},8992:function(t,e,s){"use strict";s("4c28")},feb6:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("ul",{staticClass:"storeChooseUL"},[t.isMall?s("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):s("li",{style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),s("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?s("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return s("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),s("li",{style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),s("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[s("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,i){return s("el-option",{key:i,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),s("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[s("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),s("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():s("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeSiteSelect(t.site,!0)}}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?s("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id},nativeOn:{click:function(e){return t.changeSiteSelect(t.site)}}}):t._e()}))],2)],1),t.isReset?s("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[s("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},a=[],l=s("1da1"),r=s("b85c"),n=s("2909"),o=(s("96cf"),s("a9e3"),s("caad"),s("2532"),s("99af"),s("d81d"),s("fb6a"),s("d3b7"),s("6062"),s("3ca3"),s("ddb0"),s("4de4"),s("25f0"),s("7db0"),s("7646")),h=s("2b0e");h["default"].directive("loadmore",{bind:function(t,e){var s=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");s.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var m={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.isShowName="",this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},changeSiteSelect:function(t,e){var s=this.isShowName;if(!this.isAShop)if(e)if(t.includes("")){var i=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),a=new Set([].concat(Object(n["a"])(i),Object(n["a"])(t)));this.site=Object(n["a"])(a),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{var l=[];if(s){var o=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),h=o.length>this.site.length&&this.site||o,m=o.length>this.site.length&&o||this.site;l=new Set(this.site);var c,d=Object(r["a"])(m);try{for(d.s();!(c=d.n()).done;){var Y=c.value;h.includes(Y)&&l.delete(Y)}}catch(u){d.e(u)}finally{d.f()}l.delete("")}this.site=Object(n["a"])(l)}else!t.includes("")&&this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):t.includes("")&&(this.site=t.slice(1));this.changeMallList(),this.filterMall(s)},getMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,a,l,r,o,h;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(console.log("getMallGoodsGetMallList - val",t),1!==t){s.next=10;break}return i=e.countryVal,s.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:a=s.sent,200===a.code?(l=a.data||[],e.allSiteList=l,e.siteList=""===i?l:l.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(r=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),r.delete(void 0),o=Object(n["a"])(r),h=o.map((function(t){return JSON.parse(t)})),h.zzSort("id"),e.groupIdList=Object(n["a"])(h),e.groupId=[""].concat(Object(n["a"])(h.map((function(t){return t.id}))))),s.next=11;break;case 10:e.siteList=e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id))return t}));case 11:e.changeSiteSelect([""],!0);case 12:case"end":return s.stop()}}),s)})))()},changeMallList:function(){var t=this,e=(new Date).getTime(),s=[],i="",a=this.site;if(this.isAShop){var l=this.siteList.find((function(e){return e.platform_mall_id===t.site}));i=this.site,s.push(l)}else a.length&&""===a[0]&&(a=a.slice(1)),i=a.toString(),s=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),console.log(new Date-e);!this.countryVal&&this.groupId.indexOf("")>-1&&(i=s.length!==this.siteList.length&&i||""),this.source?this.$emit("changeMallList",{mallList:s,groupIdList:this.groupId,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):(s["country"]=this.countryVal,this.$emit("changeMallList",s))},filterMall:function(t){var e=this,s=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var s=[];s=t?e.siteList.filter((function(e){var s=e.mall_alias_name||e.platform_mall_name;return s.includes(t)})):e.siteList,e.siteShowList=s}),s)},showMall:function(t,e){var s=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||s.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var s=0;t?(s=this.mallShowIndex+10,s=s<this.siteShowList.length-this.showMallNumber&&s||this.siteShowList.length-this.showMallNumber):(s=this.mallShowIndex-10,s=s>0&&s||0),s!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=s}}}},c=m,d=(s("8992"),s("2877")),Y=Object(d["a"])(c,i,a,!1,null,null,null);e["a"]=Y.exports}}]);