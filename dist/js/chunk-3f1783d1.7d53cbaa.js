(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f1783d1"],{"2aa6":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("ul",{staticStyle:{"margin-top":"10px"}},[a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData1}},[t._v("导出加购折扣数据")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData2}},[t._v("导出赠品满最低消费数据")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 115px)",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname",fixed:""}}),a("el-table-column",{attrs:{label:"加购折扣",align:"center"}},[a("el-table-column",{attrs:{prop:"sales",label:"销售（主要及加购商品）","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.sales)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_sales",label:"加购商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_units",label:"已售出的商品总件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_units)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_units",label:"已售出的加购商品件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_units)}})]}}])}),a("el-table-column",{attrs:{prop:"orders",label:"订单量","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_sales_per_buyer",label:"每位买家的销售额","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales_per_buyer)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_sales_per_buyer",label:"每位买家的加购商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_sales_per_buyer)}})]}}])})],1),a("el-table-column",{attrs:{label:"赠品满最低消费",align:"center"}},[a("el-table-column",{attrs:{prop:"main_item_sales1",label:"主商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales1)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_units1",label:"已售主商品总件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_units1)}})]}}])}),a("el-table-column",{attrs:{prop:"orders1",label:"订单量","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders1)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers1",label:"买家数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers1)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_sales_per_buyer1",label:"每位买家的主商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales_per_buyer1)}})]}}])})],1)],1)],1)],1)},i=[],l=a("1da1"),n=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),r=a("feb6"),o={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata1:[],exportdata2:[],allgroupid:[],allmallid:[],tableData1:[],tableData2:[],errmall:[],total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),n=s.split("");l[5]=n[0],l[6]=Number(n[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var r=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=r.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),m=o.split("");d[5]=m[0],d[6]=Number(m[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var h=this.$dayjs(this.timechoose).format("YYYY-MM-01"),u=h.split("-")[1];if("12"===u){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=u.split("");_[5]=f[0],_[6]=Number(f[1])+1,_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,l,n,r,o,c,d,m,h,u,p,_,f,y,Y,g,b,M,D,w,x,v,S;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,l=t.mall_alias_name||t.platform_mall_name,n={},r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",r),s.next=8,a.$shopeemanService.getAdditionalpurchase1(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 8:if(o=s.sent,o&&(c=JSON.parse(o)),c.data=JSON.parse(c.data),200===c.status)for(m in d={},d["mallname"]=l,d["sales"]=c.data.result.sales,d["buyers"]=c.data.result.buyers,d["orders"]=c.data.result.orders,d["add_on_item_sales"]=c.data.result.add_on_item_sales,d["add_on_item_units"]=c.data.result.add_on_item_units,d["add_on_item_sales_per_buyer"]=c.data.result.add_on_item_sales_per_buyer,d["main_item_sales"]=c.data.result.main_item_sales,d["main_item_units"]=c.data.result.main_item_units,d["main_item_sales_per_buyer"]=c.data.result.main_item_sales_per_buyer,a.exportdata1.push(d),n["mallname"]=l,c.data.result)h="".concat(m,"_pct_diff"),u="green",c.data.result[h]<0&&(u="red"),"real_time"===a.Statisticaltime?(p=(new Date).getTime(),_=a.$dayjs(p).format("hh:00"),f=_.split(":"),f[0]=Number(f[0])-1,y="".concat(f[0],":").concat(f[1]),n["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(u,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 00:00 - ").concat(y,"  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(u,"'>vs 00:00 - ").concat(y,"  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>")):"yesterday"===a.Statisticaltime?n["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(u,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前一天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(u,"'>vs 前一天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?n["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(u,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前7天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(u,"'>vs 前7天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(n["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(u,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前30天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(u,"'>vs 前30天  ").concat((100*c.data.result[h]).toFixed(2),"%</pre>"));else 403===c.status&&a.errmall.push(l);return s.next=14,a.$shopeemanService.getAdditionalpurchase2(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 14:if(Y=s.sent,Y&&(Y=JSON.parse(Y)),Y.data=JSON.parse(Y.data),console.log("this is data",Y),200===Y.status){for(b in g={},g["mallname"]=l,g["main_item_sales"]=c.data.result.main_item_sales,g["main_item_units"]=c.data.result.main_item_units,g["orders"]=c.data.result.orders,g["buyers"]=c.data.result.buyers,g["main_item_sales_per_buyer"]=c.data.result.main_item_sales_per_buyer,a.exportdata2.push(g),c.data.result)M="".concat(b,"_pct_diff"),D="green",c.data.result[M]<0&&(D="red"),"real_time"===a.Statisticaltime?(w=(new Date).getTime(),x=a.$dayjs(w).format("hh:00"),v=x.split(":"),v[0]=Number(v[0])-1,S="".concat(v[0],":").concat(v[1]),n["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(D,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(D,"'>vs 00:00 - ").concat(S,"  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(D,"'>vs 00:00 - ").concat(S,"  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>")):"yesterday"===a.Statisticaltime?n["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(D,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(D,"'>vs 前一天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(D,"'>vs 前一天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?n["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(D,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(D,"'>vs 前7天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(D,"'>vs 前7天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(n["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(D,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(D,"'>vs 前30天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(D,"'>vs 前30天  ").concat((100*c.data.result[M]).toFixed(2),"%</pre>"));a.tableData1.push(n)}s.next=24;break;case 21:s.prev=21,s.t0=s["catch"](1),console.log(s.t0);case 24:return s.prev=24,--i.count,s.finish(24);case 27:case"end":return s.stop()}}),s,null,[[1,21,24,27]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=14;break}return t.Loading1=!0,t.Loading3=!0,t.tableData1=[],t.tableData2=[],t.exportdata1=[],t.exportdata2=[],t.errmall=[],e.next=10,Object(n["d"])(t.mall,t.getTableData);case 10:t.Loading1=!1,t.Loading3=!1,e.next=15;break;case 14:t.$message.warning("请选择店铺！");case 15:case"end":return e.stop()}}),e)})))()},DerivedData1:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata1.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">销售（主要及加购商品）</td>\n        <td style="width: 200px; text-align:left;">加购商品销售</td>\n        <td style="width: 200px; text-align:left;">已出售的商品总件数</td>\n        <td style="width: 200px; text-align:left;">已出售的加购商品总件数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额</td>\n        <td style="width: 200px; text-align:left;">每位买家的加购商品销售</td>\n      </tr>',t.exportdata1.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.sales,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_sales,'</td>\n          <td style="text-align:left;">').concat(t.main_item_units,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_units,'</td>\n          <td style="text-align:left;">').concat(t.orders,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales_per_buyer,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(n["k"])("加购折扣信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"加购折扣信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},DerivedData2:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata2.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">主商品销售</td>\n        <td style="width: 200px; text-align:left;">已售主商品总件数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">每位买家的主商品销售</td>\n      </tr>',t.exportdata2.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales,'</td>\n          <td style="text-align:left;">').concat(t.main_item_units,'</td>\n          <td style="text-align:left;">').concat(t.orders,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(n["k"])("赠品满最低消费信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"赠品满最低消费信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},c=o,d=(a("4a93"),a("2877")),m=Object(d["a"])(c,s,i,!1,null,"1ef6c620",null);e["default"]=m.exports},"4a93":function(t,e,a){"use strict";a("d56d")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},d56d:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],l=a("1da1"),n=a("b85c"),r=a("2909"),o=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var d={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?Object(r["a"])(this.groupIdList.map((function(t){return t.id}))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=this.isShowName;if(!this.isAShop){var i=e.includes(""),l=t.includes("");if(i!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!s||s&&!this.isShowNameAll)){var o=s&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(r["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(r["a"])(o),Object(r["a"])(e)));this.site=Object(r["a"])(c),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var d=[];if(s){var m=s&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),h=m.length>this.site.length&&this.site||m,u=m.length>this.site.length&&m||this.site;d=new Set(this.site);var p,_=Object(n["a"])(u);try{for(_.s();!(p=_.n()).done;){var f=p.value;h.includes(f)&&d.delete(f)}}catch(y){_.e(y)}finally{_.f()}d.delete("")}this.site=Object(r["a"])(d)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){a.changeMallList(),a.filterMall(s),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,i,l,n,o,c,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],s=e.countryVal,i=[],!(e.jsonMallData.length>0)){a.next=7;break}i=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,i=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(i.length>0)){a.next=17;break}1===t&&(e.siteList=""===s?i:i.filter((function(t){return t.country===s}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){i.forEach((function(a){s?t===a.group_id&&s===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return n={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 20:o=a.sent,200===o.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",o.data),c=o.data||[],e.siteList=c,e.jsonMallData=c,e.siteList=""===s?c:c.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败");case 22:d=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=d.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&d.push({group_name:t.group_name,id:t.group_id})})),d.zzSort("id"),e.groupIdList=[].concat(Object(r["a"])(e.groupIdList),d),e.groupId=[""].concat(Object(r["a"])(d.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";if(this.isAShop){var s=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,e.push(s)}else this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},m=d,h=(a("8992"),a("2877")),u=Object(h["a"])(m,s,i,!1,null,null,null);e["a"]=u.exports}}]);