(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eaa9b9ec"],{"4c28":function(t,e,a){},5034:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",[a("li",{staticStyle:{"margin-left":"42px"}},[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",{staticStyle:{"margin-left":"32px"}},[a("span",[t._v("资料期间：")]),a("el-date-picker",{staticStyle:{width:"130px"},attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",{staticStyle:{"margin-left":"80px"}},[a("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",type:"index",fixed:""}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"140",prop:"mallname",fixed:""}}),a("el-table-column",{attrs:{align:"center",prop:"uv",label:"商品访客数【访问】",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.uv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"pv",label:"商品页面访问量【访问】",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pv)}})]}}])}),a("el-table-column",{attrs:{prop:"iv",label:"已访问的商品【访问】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.iv)}})]}}])}),a("el-table-column",{attrs:{prop:"bounce_rate",label:"商品跳出率【访问】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.bounce_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"like_unit_num",label:"赞【访问】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.like_unit_num)}})]}}])}),a("el-table-column",{attrs:{prop:"atc_unit_num",label:"件数【加入购物车】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.atc_unit_num)}})]}}])}),a("el-table-column",{attrs:{prop:"atc_rate",label:"转换率【加入购物车】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.atc_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"placed_unit_num",label:"件数【已付款订单】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.placed_unit_num)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_gmv",label:"销售额【已付款订单】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.paid_gmv)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_items",label:"已付款的商品【已付款订单】",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.paid_items)}})]}}])}),a("el-table-column",{attrs:{prop:"uv_to_confirmed_buyers_rate",label:"转化率（访问至确定)【已付款订单】",width:"240",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.uv_to_confirmed_buyers_rate)}})]}}])})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},s=[],o=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("7039"),a("d81d"),a("feb6")),n=a("0e0b"),l={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,showlog:!0,Loading2:!1,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,currency:"฿",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var o=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");o[5]=r[0],o[6]=Number(r[1])+1,o=o.join(""),this.end_time=Date.parse(this.$dayjs(o).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),l=n.split("-")[1];if("12"===l){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),h=l.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var o=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");o[5]=r[0],o[6]=Number(r[1])+1,o=o.join(""),this.end_time=Date.parse(this.$dayjs(o).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var n=this.$dayjs(t).format("YYYY-MM-01"),l=n.split("-")[1];if("12"===l){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),h=l.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),u=m.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),Y=u.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var s,o,r,n,l,c,d,h,m,u,p,f,Y,_,y,M,g;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,o=t.mall_alias_name||t.platform_mall_name,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",r),i.next=7,a.$shopeemanService.getoverview(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 7:if(n=i.sent,!a.serchload){i.next=10;break}return i.abrupt("return");case 10:if(n&&(l=JSON.parse(n)),l.data=JSON.parse(l.data),console.log("this is data",l),200!==l.status){i.next=33;break}if(!a.serchload){i.next=16;break}return i.abrupt("return");case 16:for(d in a.$refs.Logs.writeLog("店铺【".concat(o,"】数据获取成功"),!0),c={},l.data)c["mallname"]=o,c["".concat(d)]="paid_gmv"===d?"".concat(a.currency).concat(l.data[d].value):l.data[d].value;if(a.exportdata.push(c),h={},m="",h["mallname"]=o,h["index"]=a.indexs,a.indexs++,"real_time"===a.Statisticaltime)for(u in m="vs 00:00-17:00 昨天 ",l.data)p="green",l.data[u].ratio<0&&(p="red"),h["".concat(u)]="bounce_rate"===u||"atc_rate"===u||"uv_to_placed_buyers_rate"===u||"uv_to_paid_buyers_rate"===u||"uv_to_confirmed_buyers_rate"===u?"<pre style='color:".concat(p,"'>").concat((100*l.data[u].value).toFixed(2),"%</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(l.data[u].ratio)).toFixed(2),"%</pre>"):"paid_gmv"===u?"<pre style='color:".concat(p,"'>").concat(a.currency).concat(l.data[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(l.data[u].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(l.data[u].value,"</pre><pre style='color:").concat(p,"'>").concat(m).concat((100*Number(l.data[u].ratio)).toFixed(2),"%</pre>");if("yesterday"===a.Statisticaltime||"day"===a.Statisticaltime)for(f in m="vs 前一天 ",l.data)Y="green",l.data[f].ratio<0&&(Y="red"),h["".concat(f)]="bounce_rate"===f||"atc_rate"===f||"uv_to_placed_buyers_rate"===f||"uv_to_paid_buyers_rate"===f||"uv_to_confirmed_buyers_rate"===f?"<pre style='color:".concat(Y,"'>").concat((100*l.data[f].value).toFixed(2),"%</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(l.data[f].ratio)).toFixed(2),"%</pre>"):"paid_gmv"===f?"<pre style='color:".concat(Y,"'>").concat(a.currency).concat(l.data[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(l.data[f].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(Y,"'>").concat(l.data[f].value,"</pre><pre style='color:").concat(Y,"'>").concat(m).concat((100*Number(l.data[f].ratio)).toFixed(2),"%</pre>");if("past7days"===a.Statisticaltime||"week"===a.Statisticaltime)for(_ in m="vs 前7天 ",l.data)y="green",l.data[_].ratio<0&&(y="red"),h["".concat(_)]="bounce_rate"===_||"atc_rate"===_||"uv_to_placed_buyers_rate"===_||"uv_to_paid_buyers_rate"===_||"uv_to_confirmed_buyers_rate"===_?"<pre style='color:".concat(y,"'>").concat((100*l.data[_].value).toFixed(2),"%</pre><pre style='color:").concat(y,"'>").concat(m).concat((100*Number(l.data[_].ratio)).toFixed(2),"%</pre>"):"paid_gmv"===_?"<pre style='color:".concat(y,"'>").concat(a.currency).concat(l.data[_].value,"</pre><pre style='color:").concat(y,"'>").concat(m).concat((100*Number(l.data[_].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(y,"'>").concat(l.data[_].value,"</pre><pre style='color:").concat(y,"'>").concat(m).concat((100*Number(l.data[_].ratio)).toFixed(2),"%</pre>");if("past30days"===a.Statisticaltime||"month"===a.Statisticaltime)for(M in m="vs 前30天 ",l.data)g="green",l.data[M].ratio<0&&(g="red"),h["".concat(M)]="bounce_rate"===M||"atc_rate"===M||"uv_to_placed_buyers_rate"===M||"uv_to_paid_buyers_rate"===M||"uv_to_confirmed_buyers_rate"===M?"<pre style='color:".concat(g,"'>").concat((100*l.data[M].value).toFixed(2),"%</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(l.data[M].ratio)).toFixed(2),"%</pre>"):"paid_gmv"===M?"<pre style='color:".concat(g,"'>").concat(a.currency).concat(l.data[M].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(l.data[M].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(g,"'>").concat(l.data[M].value,"</pre><pre style='color:").concat(g,"'>").concat(m).concat((100*Number(l.data[M].ratio)).toFixed(2),"%</pre>");console.log("datadatadata",h),Object.getOwnPropertyNames(h).length>8&&a.tableData.push(h),i.next=34;break;case 33:403===l.status&&(a.$refs.Logs.writeLog("【".concat(o,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(o));case 34:i.next=39;break;case 36:i.prev=36,i.t0=i["catch"](1),console.log(i.t0);case 39:return i.prev=39,--s.count,i.finish(39);case 42:case"end":return i.stop()}}),i,null,[[1,36,39,42]])})))()},getallinfo:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showlog=!1,"day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=5;break}if(!(t.timechoose.length<1)){e.next=5;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 5:if(!(t.mall.length>0)){e.next=21;break}return t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=15,Object(n["d"])(t.mall,t.getTableData);case 15:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,t.Loading2=!1,t.Loading1=!1,e.next=22;break;case 21:t.$message({message:"请选择店铺",type:"warning"});case 22:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">商品访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">商品页面访问量【访问】</td>\n        <td style="width: 200px; text-align:left;">已访问的商品【访问】</td>\n        <td style="width: 200px; text-align:left;">商品跳出率【访问】</td>\n        <td style="width: 200px; text-align:left;">赞【访问】</td>\n        <td style="width: 200px; text-align:left;">件数【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">转换率【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">件数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">已付款的商品【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">转化率 (访问至确定)【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.uv,'</td>\n          <td style="text-align:left;">').concat(t.pv,'</td>\n          <td style="text-align:left;">').concat(t.iv,'</td>\n          <td style="text-align:left;">').concat((100*t.bounce_rate).toFixed(2),'%</td>\n          <td style="text-align:left;">').concat(t.like_unit_num,'</td>\n          <td style="text-align:left;">').concat(t.atc_unit_num,'</td>\n          <td style="text-align:left;">').concat((100*t.atc_rate).toFixed(2),'%</td>\n          <td style="text-align:left;">').concat(t.placed_unit_num,'</td>\n          <td style="text-align:left;">').concat(t.paid_gmv,'</td>\n          <td style="text-align:left;">').concat(t.paid_items,'</td>\n          <td style="text-align:left;">').concat((100*t.uv_to_confirmed_buyers_rate).toFixed(2),"%</td>\n        </tr>\n        ")})),Object(n["k"])("商品概述信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"商品概述信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0,Object(n["A"])(),this.$refs.Logs.writeLog("正在取消查询")},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var i=new Date(t.getTime()-24*e*60*60*1e3);return i.setHours(0),i.setMinutes(0),i.setSeconds(0),i}}},c=l,d=(a("7617"),a("2877")),h=Object(d["a"])(c,i,s,!1,null,"8adfeaa8",null);e["default"]=h.exports},7617:function(t,e,a){"use strict";a("9726")},8992:function(t,e,a){"use strict";a("4c28")},9726:function(t,e,a){},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],o=a("1da1"),r=a("b85c"),n=a("2909"),l=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var d={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?Object(n["a"])(this.groupIdList.map((function(t){return t.id}))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName;if(!this.isAShop){var s=e.includes(""),o=t.includes("");if(s!==o||e.toString()===t.toString()&&this.isShowNameAll)if(o&&(!i||i&&!this.isShowNameAll)){var l=i&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(n["a"])(l),Object(n["a"])(e)));this.site=Object(n["a"])(c),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var d=[];if(i){var h=i&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),m=h.length>this.site.length&&this.site||h,u=h.length>this.site.length&&h||this.site;d=new Set(this.site);var p,f=Object(r["a"])(u);try{for(f.s();!(p=f.n()).done;){var Y=p.value;m.includes(Y)&&d.delete(Y)}}catch(_){f.e(_)}finally{f.f()}d.delete("")}this.site=Object(n["a"])(d)}else o?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){a.changeMallList(),a.filterMall(i),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var i,s,o,r,l,c,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],i=e.countryVal,s=[],!(e.jsonMallData.length>0)){a.next=7;break}s=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:o=a.sent,s=JSON.parse(o)||[],e.jsonMallData=JSON.parse(o)||[];case 12:if(!(s.length>0)){a.next=17;break}1===t&&(e.siteList=""===i?s:s.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){s.forEach((function(a){i?t===a.group_id&&i===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:l=a.sent,200===l.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",l.data),c=l.data||[],e.siteList=c,e.jsonMallData=c,e.siteList=""===i?c:c.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:d=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=d.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&d.push({group_name:t.group_name,id:t.group_id})})),d.zzSort("id"),e.groupIdList=[].concat(Object(n["a"])(e.groupIdList),d),e.groupId=[""].concat(Object(n["a"])(d.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";if(this.isAShop){var i=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,e.push(i)}else this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},h=d,m=(a("8992"),a("2877")),u=Object(m["a"])(h,i,s,!1,null,null,null);e["a"]=u.exports}}]);