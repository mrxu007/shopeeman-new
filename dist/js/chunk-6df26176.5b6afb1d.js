(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6df26176"],{3797:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",{staticStyle:{"margin-left":"25px"}},[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-date-picker",{staticClass:"seltime",attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"240",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"shop_uv",label:"访客数【访问】",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"placed_buyers",label:"买家数【已下订单】",width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家数【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales_per_buyer",label:"每位买家的销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales_per_buyer)}})]}}])})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},i=[],r=a("1da1"),l=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("7039"),a("d81d"),a("0e0b")),n=a("feb6"),o={components:{storeChoose:n["a"]},data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),h=o.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var n=this.$dayjs(t).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),h=o.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var i,r,l,n,o,c,d,h,m,u,p,f,Y,y,_,M,g;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,r=t.mall_alias_name||t.platform_mall_name,!0!==a.serchload){s.next=8;break}return a.Loading3=!1,setTimeout((function(){a.Loading1=!1}),3e3),a.serchload=!1,s.abrupt("return");case 8:return l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},s.next=11,a.$shopeemanService.getsalasoverview(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 11:if(n=s.sent,n&&(o=JSON.parse(n)),o.data=JSON.parse(o.data),200===o.status){for(d in a.$refs.Logs.writeLog("店铺【".concat(r,"】数据获取成功"),!0),c={},o.data.result)c["mallname"]=r,c["".concat(d)]="placed_sales"===d||"paid_sales"===d||"paid_sales_per_buyer"===d?"".concat(a.$filters.siteCoin(a.site)).concat(o.data.result[d].value):o.data.result[d].value;if(a.exportdata.push(c),h={},m="",h["mallname"]=r,h["index"]=a.indexs,a.indexs++,"real_time"===a.Statisticaltime)for(u in m="vs 00:00-17:00 昨天 ",o.data.result)p="green",o.data.result[u].ratio<0&&(p="red"),h["".concat(u)]="placed_sales"===u||"paid_sales"===u||"paid_sales_per_buyer"===u?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(o.data.result[u].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(o.data.result[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(o.data.result[u].ratio)).toFixed(2),"%</pre>");if("yesterday"===a.Statisticaltime||"day"===a.Statisticaltime)for(f in m="vs 前一天 ",o.data.result)Y="green",o.data.result[f].ratio<0&&(Y="red"),h["".concat(f)]="placed_sales"===f||"paid_sales"===f||"paid_sales_per_buyer"===f?"<pre style='color:".concat(Y,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(o.data.result[f].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(Y,"'>").concat(o.data.result[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(o.data.result[f].ratio)).toFixed(2),"%</pre>");if("past7days"===a.Statisticaltime||"week"===a.Statisticaltime)for(y in m="vs 前7天 ",o.data.result)_="green",o.data.result[y].ratio<0&&(_="red"),h["".concat(y)]="placed_sales"===y||"paid_sales"===y||"paid_sales_per_buyer"===y?"<pre style='color:".concat(_,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[y].value,"</pre><pre style='color:").concat(_,"'>").concat(m).concat((100*Number(o.data.result[y].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(_,"'>").concat(o.data.result[y].value,"</pre><pre style='color:").concat(_,"'>").concat(m).concat((100*Number(o.data.result[y].ratio)).toFixed(2),"%</pre>");if("past30days"===a.Statisticaltime||"month"===a.Statisticaltime)for(M in m="vs 前30天 ",o.data.result)g="green",o.data.result[M].ratio<0&&(g="red"),h["".concat(M)]="placed_sales"===M||"paid_sales"===M||"paid_sales_per_buyer"===M?"<pre style='color:".concat(g,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[M].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(o.data.result[M].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(g,"'>").concat(o.data.result[M].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(o.data.result[M].ratio)).toFixed(2),"%</pre>");Object.getOwnPropertyNames(h).length>8&&a.tableData.push(h)}else 403===o.status&&(a.$refs.Logs.writeLog("【".concat(r,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(r));s.next=19;break;case 17:s.prev=17,s.t0=s["catch"](1);case 19:return s.prev=19,--i.count,s.finish(19);case 22:case"end":return s.stop()}}),s,null,[[1,17,19,22]])})))()},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showlog=!1,"day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=5;break}if(!(t.timechoose.length<1)){e.next=5;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 5:if(!(t.mall.length>0)){e.next=20;break}return t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=15,Object(l["d"])(t.mall,t.getTableData);case 15:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=21;break;case 20:t.$message({message:"请选择店铺",type:"warning"});case 21:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">买家数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.shop_uv,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(l["k"])("销售额概述信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"销售额概述信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var s=new Date(t.getTime()-24*e*60*60*1e3);return s.setHours(0),s.setMinutes(0),s.setSeconds(0),s}}},c=o,d=(a("8332"),a("2877")),h=Object(d["a"])(c,s,i,!1,null,"5be522c5",null);e["default"]=h.exports},"4c28":function(t,e,a){},"744d":function(t,e,a){},"744e":function(t,e,a){"use strict";a("744d")},8332:function(t,e,a){"use strict";a("eb1a")},8992:function(t,e,a){"use strict";a("4c28")},eb1a:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,s){return a("el-option",{key:s,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},i=[],r=a("1da1"),l=a("2909"),n=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new n["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(l["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s,i,r,n,o,c,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return s=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:i=a.sent,200===i.code?(r=i.data||[],e.isAShop||r.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=r,e.siteList=""===s?r:r.filter((function(t){return(null===t||void 0===t?void 0:t.country)===s||!t.platform_mall_id}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(n=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),n.delete(void 0),o=Object(l["a"])(n),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(l["a"])(c),e.groupId=[""].concat(Object(l["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:d=[],d=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=d;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,s=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var i=this.siteShowList.map((function(t){return t.platform_mall_id}));if(s.includes(t))s=s.filter((function(t){return!i.includes(t)}));else{var r=new Set([""].concat(Object(l["a"])(s),Object(l["a"])(i)));s=Object(l["a"])(r)}}else s=s.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var n=s.findIndex((function(e){return e===t}));if(n>-1)s.splice(n,1),s.includes("")&&s.splice(0,1);else if(s.push(t),a){var o,c=this.siteShowList.filter((function(t){return s.includes(t.platform_mall_id)}));s.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==c.length+1||s.unshift("")}else{var d;s.includes("")||(null===(d=this.siteList)||void 0===d?void 0:d.length)!==s.length+1||s.unshift("")}}this.siteId=s}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var s=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(s)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=a.toString();!this.countryVal&&this.groupId.indexOf("")>-1&&(e=t.length!==this.siteList.length&&e||""),this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var s=e.mall_alias_name||e.platform_mall_name;a=s.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=o,d=(a("8992"),a("744e"),a("2877")),h=Object(d["a"])(c,s,i,!1,null,"0d0a99f8",null);e["a"]=h.exports}}]);