(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10f523a0"],{3797:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",{staticStyle:{"margin-left":"25px"}},[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-date-picker",{staticClass:"seltime",attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"240",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"shop_uv",label:"访客数【访问】",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"placed_buyers",label:"买家数【已下订单】",width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家数【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales_per_buyer",label:"每位买家的销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales_per_buyer)}})]}}])})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("7039"),a("d81d"),a("0e0b")),o=a("feb6"),n={components:{storeChoose:o["a"]},data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=n.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var o=this.$dayjs(t).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),d=n.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,l,r,o,n,c,h,d,m,u,p,f,Y,y,M,_,g;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,l=t.mall_alias_name||t.platform_mall_name,!0!==a.serchload){s.next=8;break}return a.Loading3=!1,setTimeout((function(){a.Loading1=!1}),3e3),a.serchload=!1,s.abrupt("return");case 8:return r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",r),s.next=12,a.$shopeemanService.getsalasoverview(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:if(o=s.sent,o&&(n=JSON.parse(o)),n.data=JSON.parse(n.data),console.log("this is data",n),200===n.status){for(h in a.$refs.Logs.writeLog("店铺【".concat(l,"】数据获取成功"),!0),c={},n.data.result)c["mallname"]=l,c["".concat(h)]="placed_sales"===h||"paid_sales"===h||"paid_sales_per_buyer"===h?"".concat(a.$filters.siteCoin(a.site)).concat(n.data.result[h].value):n.data.result[h].value;if(a.exportdata.push(c),d={},m="",d["mallname"]=l,d["index"]=a.indexs,a.indexs++,"real_time"===a.Statisticaltime)for(u in m="vs 00:00-17:00 昨天 ",n.data.result)p="green",n.data.result[u].ratio<0&&(p="red"),d["".concat(u)]="placed_sales"===u||"paid_sales"===u||"paid_sales_per_buyer"===u?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(n.data.result[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(n.data.result[u].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(n.data.result[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(n.data.result[u].ratio)).toFixed(2),"%</pre>");if("yesterday"===a.Statisticaltime||"day"===a.Statisticaltime)for(f in m="vs 前一天 ",n.data.result)Y="green",n.data.result[f].ratio<0&&(Y="red"),d["".concat(f)]="placed_sales"===f||"paid_sales"===f||"paid_sales_per_buyer"===f?"<pre style='color:".concat(Y,"'>").concat(a.$filters.siteCoin(a.site)).concat(n.data.result[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(n.data.result[f].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(Y,"'>").concat(n.data.result[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(n.data.result[f].ratio)).toFixed(2),"%</pre>");if("past7days"===a.Statisticaltime||"week"===a.Statisticaltime)for(y in m="vs 前7天 ",n.data.result)M="green",n.data.result[y].ratio<0&&(M="red"),d["".concat(y)]="placed_sales"===y||"paid_sales"===y||"paid_sales_per_buyer"===y?"<pre style='color:".concat(M,"'>").concat(a.$filters.siteCoin(a.site)).concat(n.data.result[y].value,"</pre><pre style='color:").concat(M,"'>").concat(m).concat((100*Number(n.data.result[y].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(n.data.result[y].value,"</pre><pre style='color:").concat(M,"'>").concat(m).concat((100*Number(n.data.result[y].ratio)).toFixed(2),"%</pre>");if("past30days"===a.Statisticaltime||"month"===a.Statisticaltime)for(_ in m="vs 前30天 ",n.data.result)g="green",n.data.result[_].ratio<0&&(g="red"),d["".concat(_)]="placed_sales"===_||"paid_sales"===_||"paid_sales_per_buyer"===_?"<pre style='color:".concat(g,"'>").concat(a.$filters.siteCoin(a.site)).concat(n.data.result[_].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(n.data.result[_].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(g,"'>").concat(n.data.result[_].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(n.data.result[_].ratio)).toFixed(2),"%</pre>");console.log("datadatadata",d),Object.getOwnPropertyNames(d).length>8&&a.tableData.push(d)}else 403===n.status&&(a.$refs.Logs.writeLog("【".concat(l,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(l));s.next=22;break;case 19:s.prev=19,s.t0=s["catch"](1),console.log(s.t0);case 22:return s.prev=22,--i.count,s.finish(22);case 25:case"end":return s.stop()}}),s,null,[[1,19,22,25]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showlog=!1,"day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=5;break}if(!(t.timechoose.length<1)){e.next=5;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 5:if(!(t.mall.length>0)){e.next=20;break}return t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=15,Object(r["d"])(t.mall,t.getTableData);case 15:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=21;break;case 20:t.$message({message:"请选择店铺",type:"warning"});case 21:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">买家数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.shop_uv,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(r["k"])("销售额概述信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"销售额概述信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var s=new Date(t.getTime()-24*e*60*60*1e3);return s.setHours(0),s.setMinutes(0),s.setSeconds(0),s}}},c=n,h=(a("8332"),a("2877")),d=Object(h["a"])(c,s,i,!1,null,"5be522c5",null);e["default"]=d.exports},"4c28":function(t,e,a){},8332:function(t,e,a){"use strict";a("eb1a")},8992:function(t,e,a){"use strict";a("4c28")},eb1a:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],l=a("1da1"),r=a("b85c"),o=a("2909"),n=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var h={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new n["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?Object(o["a"])(this.groupIdList.map((function(t){return t.id}))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=this.isShowName;if(!this.isAShop){var i=e.includes(""),l=t.includes("");if(i!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!s||s&&!this.isShowNameAll)){var n=s&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(o["a"])(n),Object(o["a"])(e)));this.site=Object(o["a"])(c),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var h=[];if(s){var d=s&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),m=d.length>this.site.length&&this.site||d,u=d.length>this.site.length&&d||this.site;h=new Set(this.site);var p,f=Object(r["a"])(u);try{for(f.s();!(p=f.n()).done;){var Y=p.value;m.includes(Y)&&h.delete(Y)}}catch(y){f.e(y)}finally{f.f()}h.delete("")}this.site=Object(o["a"])(h)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){a.changeMallList(),a.filterMall(s),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,i,l,r,n,c,h;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],s=e.countryVal,i=[],!(e.jsonMallData.length>0)){a.next=7;break}i=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,i=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(i.length>0)){a.next=17;break}1===t&&(e.siteList=""===s?i:i.filter((function(t){return t.country===s}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){i.forEach((function(a){s?t===a.group_id&&s===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:n=a.sent,200===n.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",n.data),c=n.data||[],e.siteList=c,e.jsonMallData=c,e.siteList=""===s?c:c.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败");case 22:h=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=h.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&h.push({group_name:t.group_name,id:t.group_id})})),h.zzSort("id"),e.groupIdList=[].concat(Object(o["a"])(e.groupIdList),h),e.groupId=[""].concat(Object(o["a"])(h.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";if(this.isAShop){var s=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,e.push(s)}else this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=h,m=(a("8992"),a("2877")),u=Object(m["a"])(d,s,i,!1,null,null,null);e["a"]=u.exports}}]);