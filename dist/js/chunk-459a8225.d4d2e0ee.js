(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-459a8225"],{3797:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"240",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"shop_uv",label:"访客数【访问】",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"placed_buyers",label:"买家数【已下订单】",width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家数【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales_per_buyer",label:"每位买家的销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales_per_buyer)}})]}}])})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},i=[],r=a("1da1"),l=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("7039"),a("d81d"),a("0e0b")),o=a("feb6"),n={data:function(){return{Loading1:!1,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},components:{storeChoose:o["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),h=n.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),p=m.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var Y=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=p.split("");Y[5]=f[0],Y[6]=Number(f[1])+1,Y=Y.join(""),this.end_time=Date.parse(this.$dayjs(Y).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var o=this.$dayjs(t).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),h=n.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),p=m.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var Y=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),f=p.split("");Y[5]=f[0],Y[6]=Number(f[1])+1,Y=Y.join(""),this.end_time=Date.parse(this.$dayjs(Y).format("YYYY-MM-01 00:00:00"))/1e3}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var i,r,l,o,n,c,d,h,m,p,u,Y,f,y,M,_,D;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,r=t.mall_alias_name||t.platform_mall_name,!0!==a.serchload){s.next=8;break}return a.Loading3=!1,setTimeout((function(){a.Loading1=!1}),3e3),a.serchload=!1,s.abrupt("return");case 8:return l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},s.next=11,a.$shopeemanService.getsalasoverview(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 11:if(o=s.sent,o&&(n=JSON.parse(o)),n.data=JSON.parse(n.data),200===n.status){for(d in c={},n.data.result)c["mallname"]=r,c["".concat(d)]="placed_sales"===d||"paid_sales"===d||"paid_sales_per_buyer"===d?"".concat(a.$filters.currencyShow(a.site)).concat(n.data.result[d].value):n.data.result[d].value;if(a.exportdata.push(c),h={},m="",h["mallname"]=r,h["index"]=a.indexs,a.indexs++,"real_time"===a.Statisticaltime)for(p in m="vs 00:00-17:00 昨天 ",n.data.result)u="green",n.data.result[p].ratio<0&&(u="red"),h["".concat(p)]="placed_sales"===p||"paid_sales"===p||"paid_sales_per_buyer"===p?"<pre style='color:".concat(u,"'>").concat(a.$filters.currencyShow(a.site)).concat(n.data.result[p].value,"</pre><pre style='color:").concat(u,"'>").concat(m).concat((100*Number(n.data.result[p].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(n.data.result[p].value,"</pre><pre style='color:").concat(u,"'>").concat(m).concat((100*Number(n.data.result[p].ratio)).toFixed(2),"%</pre>");if("yesterday"===a.Statisticaltime||"day"===a.Statisticaltime)for(Y in m="vs 前一天 ",n.data.result)f="green",n.data.result[Y].ratio<0&&(f="red"),h["".concat(Y)]="placed_sales"===Y||"paid_sales"===Y||"paid_sales_per_buyer"===Y?"<pre style='color:".concat(f,"'>").concat(a.$filters.currencyShow(a.site)).concat(n.data.result[Y].value,"</pre><pre style='color:").concat(f,"'>").concat(m).concat((100*Number(n.data.result[Y].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(f,"'>").concat(n.data.result[Y].value,"</pre><pre style='color:").concat(f,"'>").concat(m).concat((100*Number(n.data.result[Y].ratio)).toFixed(2),"%</pre>");if("past7days"===a.Statisticaltime||"week"===a.Statisticaltime)for(y in m="vs 前7天 ",n.data.result)M="green",n.data.result[y].ratio<0&&(M="red"),h["".concat(y)]="placed_sales"===y||"paid_sales"===y||"paid_sales_per_buyer"===y?"<pre style='color:".concat(M,"'>").concat(a.$filters.currencyShow(a.site)).concat(n.data.result[y].value,"</pre><pre style='color:").concat(M,"'>").concat(m).concat((100*Number(n.data.result[y].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(n.data.result[y].value,"</pre><pre style='color:").concat(M,"'>").concat(m).concat((100*Number(n.data.result[y].ratio)).toFixed(2),"%</pre>");if("past30days"===a.Statisticaltime||"month"===a.Statisticaltime)for(_ in m="vs 前30天 ",n.data.result)D="green",n.data.result[_].ratio<0&&(D="red"),h["".concat(_)]="placed_sales"===_||"paid_sales"===_||"paid_sales_per_buyer"===_?"<pre style='color:".concat(D,"'>").concat(a.$filters.currencyShow(a.site)).concat(n.data.result[_].value,"</pre><pre style='color:").concat(D,"'>").concat(m).concat((100*Number(n.data.result[_].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(n.data.result[_].value,"</pre><pre style='color:").concat(D,"'>").concat(m).concat((100*Number(n.data.result[_].ratio)).toFixed(2),"%</pre>");Object.getOwnPropertyNames(h).length>8&&a.tableData.push(h)}else 403===n.status&&(a.$refs.Logs.writeLog("【".concat(r,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(r));s.next=19;break;case 17:s.prev=17,s.t0=s["catch"](1);case 19:return s.prev=19,--i.count,s.finish(19);case 22:case"end":return s.stop()}}),s,null,[[1,17,19,22]])})))()},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=19;break}return t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=14,Object(l["c"])(t.mall,t.getTableData);case 14:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=20;break;case 19:t.$message({message:"请选择店铺",type:"warning"});case 20:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">买家数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.shop_uv,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(l["i"])("销售额概述信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"销售额概述信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var s=new Date(t.getTime()-24*e*60*60*1e3);return s.setHours(0),s.setMinutes(0),s.setSeconds(0),s}}},c=n,d=(a("eb6e"),a("2877")),h=Object(d["a"])(c,s,i,!1,null,"4e536ebb",null);e["default"]=h.exports},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},c124:function(t,e,a){},eb6e:function(t,e,a){"use strict";a("c124")},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],r=a("1da1"),l=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),n=a("2b0e");n["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?[""].concat(Object(l["a"])(this.groupIdList.map((function(t){return t.id})))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.site=i?[""].concat(Object(l["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:i?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,s,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,s=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),i={country:a,mallGroupIds:s},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(i);case 6:r=t.sent,200===r.code?(e.siteList=r.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(l["a"])(e),Object(l["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=c,h=(a("8992"),a("2877")),m=Object(h["a"])(d,s,i,!1,null,null,null);e["a"]=m.exports}}]);