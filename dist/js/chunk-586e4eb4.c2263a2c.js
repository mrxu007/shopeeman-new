(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-586e4eb4"],{"4c28":function(t,e,a){},5833:function(t,e,a){},"5a71":function(t,e,a){},"78bd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData3,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"100",prop:"index"}}),a("el-table-column",{attrs:{align:"center",prop:"mallname",label:"店铺",width:"230"}}),a("el-table-column",{attrs:{align:"center",prop:"buyers_type",label:"买家类型",width:"207"}}),a("el-table-column",{attrs:{prop:"buyers",label:"买家",width:"230",align:"center"}}),a("el-table-column",{attrs:{prop:"buyers_percentage",label:"买家%",width:"230",align:"center"}}),a("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"230",align:"center"}}),a("el-table-column",{attrs:{prop:"sales_percentage",label:"销售额%",width:"230",align:"center"}}),a("el-table-column",{attrs:{prop:"conversion_rate",label:"转化率",width:"230",align:"center"}})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},i=[],r=a("1da1"),l=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("b680"),a("99af"),a("feb6")),n=a("0e0b"),o={data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,eidtVisible:!1,allgroupid:[],allmallid:[],tableData:[],tableData1:[],tableData2:[],tableData3:[],errmall:[],indexs:1,indexs1:1,indexs2:1,currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"}]}},components:{storeChoose:l["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),m=o.split("");c[5]=m[0],c[6]=Number(m[1])+1,c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var d=this.$dayjs(this.timechoose).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=Y.split("");p[5]=f[0],p[6]=Number(f[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("month"===this.Statisticaltime){var n=this.$dayjs(t).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),m=o.split("");c[5]=m[0],c[6]=Number(m[1])+1,c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("month"===this.Statisticaltime){var d=this.$dayjs(t).format("YYYY-MM-01"),Y=d.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),f=Y.split("");p[5]=f[0],p[6]=Number(f[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var i,r,l,n,o,h,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,r=t.mall_alias_name||t.platform_mall_name,!0!==a.serchload){s.next=8;break}return a.Loading3=!1,setTimeout((function(){a.Loading1=!1}),3e3),a.serchload=!1,s.abrupt("return");case 8:return l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},s.next=11,a.$shopeemanService.getsalasstructure3(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 11:if(n=s.sent,n&&(o=JSON.parse(n)),200===o.status)for(o.data=JSON.parse(o.data),h=0;h<o.data.data.length;h++)c={},c["index"]=a.indexs2,a.indexs2++,c["mallname"]=r,c["buyers"]=o.data.data[h].buyers,c["buyers_type"]=o.data.data[h].buyers_type,"new_buyers"===c["buyers_type"]?c["buyers_type"]="新买家":"existing_buyers"===c["buyers_type"]&&(c["buyers_type"]="现有买家"),c["buyers_percentage"]=(100*o.data.data[h].buyers_percentage).toFixed(2)+"%",c["sales"]="".concat(a.currency).concat(o.data.data[h].sales),c["sales_percentage"]=(100*o.data.data[h].sales_percentage).toFixed(2)+"%",c["conversion_rate"]=(100*o.data.data[h].conversion_rate).toFixed(2)+"%",a.tableData3.push(c);else 403===o.status&&(a.$refs.Logs.writeLog("【".concat(r,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(r));s.next=18;break;case 16:s.prev=16,s.t0=s["catch"](1);case 18:return s.prev=18,--i.count,s.finish(18);case 21:case"end":return s.stop()}}),s,null,[[1,16,18,21]])})))()},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=23;break}return t.indexs=1,t.indexs1=1,t.indexs2=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.tableData1=[],t.tableData2=[],t.tableData3=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=18,Object(n["d"])(t.mall,t.getTableData);case 18:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=24;break;case 23:t.$message({message:"请选择店铺",type:"warning"});case 24:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0}}},h=o,c=(a("8391"),a("2877")),m=Object(c["a"])(h,s,i,!1,null,"649d33e2",null);e["default"]=m.exports},8391:function(t,e,a){"use strict";a("5833")},8992:function(t,e,a){"use strict";a("4c28")},f4e2:function(t,e,a){"use strict";a("5a71")},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,s){return a("el-option",{key:s,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},i=[],r=a("1da1"),l=a("2909"),n=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new n["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(l["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s,i,r,n,o,h,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return s=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:i=a.sent,200===i.code?(r=i.data||[],e.isAShop||r.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=""===s?r:r.filter((function(t){return(null===t||void 0===t?void 0:t.country)===s||!t.platform_mall_id})),e.siteList=e.allSiteList):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(n=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),n.delete(void 0),o=Object(l["a"])(n),h=o.map((function(t){return JSON.parse(t)})),h.zzSort("id"),e.groupIdList=Object(l["a"])(h),e.groupId=[""].concat(Object(l["a"])(h.map((function(t){return t.id}))))),a.next=13;break;case 10:c=[],c=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=c;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,s=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var i=this.siteShowList.map((function(t){return t.platform_mall_id}));if(s.includes(t))s=s.filter((function(t){return!i.includes(t)}));else{var r=new Set([""].concat(Object(l["a"])(s),Object(l["a"])(i)));s=Object(l["a"])(r)}}else s=s.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var n=s.findIndex((function(e){return e===t}));if(n>-1)s.splice(n,1),s.includes("")&&s.splice(0,1);else if(s.push(t),a){var o,h=this.siteShowList.filter((function(t){return s.includes(t.platform_mall_id)}));s.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==h.length+1||s.unshift("")}else{var c;s.includes("")||(null===(c=this.siteList)||void 0===c?void 0:c.length)!==s.length+1||s.unshift("")}}this.siteId=s}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var s=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(s)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=this.groupId.includes("")&&a.length===this.siteList.length-1?"":a.toString();this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var s=e.mall_alias_name||e.platform_mall_name;a=s.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},h=o,c=(a("8992"),a("f4e2"),a("2877")),m=Object(c["a"])(h,s,i,!1,null,"7cb8233b",null);e["a"]=m.exports}}]);