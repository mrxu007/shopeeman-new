(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cda54b26"],{"2aa6":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("ul",{staticStyle:{"margin-top":"10px"}},[a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData1}},[t._v("导出加购折扣数据")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData2}},[t._v("导出赠品满最低消费数据")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 115px)",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname",fixed:""}}),a("el-table-column",{attrs:{label:"加购折扣",align:"center"}},[a("el-table-column",{attrs:{prop:"sales",label:"销售（主要及加购商品）","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.sales)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_sales",label:"加购商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_units",label:"已售出的商品总件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_units)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_units",label:"已售出的加购商品件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_units)}})]}}])}),a("el-table-column",{attrs:{prop:"orders",label:"订单量","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_sales_per_buyer",label:"每位买家的销售额","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales_per_buyer)}})]}}])}),a("el-table-column",{attrs:{prop:"add_on_item_sales_per_buyer",label:"每位买家的加购商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.add_on_item_sales_per_buyer)}})]}}])})],1),a("el-table-column",{attrs:{label:"赠品满最低消费",align:"center"}},[a("el-table-column",{attrs:{prop:"main_item_sales1",label:"主商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales1)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_units1",label:"已售主商品总件数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_units1)}})]}}])}),a("el-table-column",{attrs:{prop:"orders1",label:"订单量","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders1)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers1",label:"买家数","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers1)}})]}}])}),a("el-table-column",{attrs:{prop:"main_item_sales_per_buyer1",label:"每位买家的主商品销售","min-width":"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.main_item_sales_per_buyer1)}})]}}])})],1)],1)],1)],1)},i=[],n=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),l=a("feb6"),o={components:{storeChoose:l["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata1:[],exportdata2:[],allgroupid:[],allmallid:[],tableData1:[],tableData2:[],errmall:[],total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var n=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");n[5]=r[0],n[6]=Number(r[1])+1,n=n.join(""),this.end_time=Date.parse(this.$dayjs(n).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var l=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=l.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),m=o.split("");d[5]=m[0],d[6]=Number(m[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var u=this.$dayjs(this.timechoose).format("YYYY-MM-01"),p=u.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");h[5]="0",h[6]="1",h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=p.split("");_[5]=f[0],_[6]=Number(f[1])+1,_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(n["a"])(regeneratorRuntime.mark((function s(){var i,n,r,l,o,c,d,m,u,p,h,_,f,y,Y,g,b,D,M,w,x,v,S;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,n=t.mall_alias_name||t.platform_mall_name,r={},l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},s.next=7,a.$shopeemanService.getAdditionalpurchase1(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 7:if(o=s.sent,o&&(c=JSON.parse(o)),c.data=JSON.parse(c.data),200===c.status)for(m in d={},d["mallname"]=n,d["sales"]=c.data.result.sales,d["buyers"]=c.data.result.buyers,d["orders"]=c.data.result.orders,d["add_on_item_sales"]=c.data.result.add_on_item_sales,d["add_on_item_units"]=c.data.result.add_on_item_units,d["add_on_item_sales_per_buyer"]=c.data.result.add_on_item_sales_per_buyer,d["main_item_sales"]=c.data.result.main_item_sales,d["main_item_units"]=c.data.result.main_item_units,d["main_item_sales_per_buyer"]=c.data.result.main_item_sales_per_buyer,a.exportdata1.push(d),r["mallname"]=n,c.data.result)u="".concat(m,"_pct_diff"),p="green",c.data.result[u]<0&&(p="red"),"real_time"===a.Statisticaltime?(h=(new Date).getTime(),_=a.$dayjs(h).format("hh:00"),f=_.split(":"),f[0]=Number(f[0])-1,y="".concat(f[0],":").concat(f[1]),r["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(p,"'>vs 00:00 - ").concat(y,"  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(p,"'>vs 00:00 - ").concat(y,"  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>")):"yesterday"===a.Statisticaltime?r["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(p,"'>vs 前一天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(p,"'>vs 前一天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?r["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(p,"'>vs 前7天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(p,"'>vs 前7天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(r["".concat(m)]="sales"===m||"add_on_item_sales"===m||"main_item_sales_per_buyer"===m||"add_on_item_sales_per_buyer"===m?"<pre style='color:".concat(p,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[m].toFixed(2),"</pre>")+"<pre style='color:".concat(p,"'>vs 前30天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"):"<pre style='color:".concat(p,"'>").concat(c.data.result[m],"</pre>")+"<pre style='color:".concat(p,"'>vs 前30天  ").concat((100*c.data.result[u]).toFixed(2),"%</pre>"));else 403===c.status&&a.errmall.push(n);return s.next=13,a.$shopeemanService.getAdditionalpurchase2(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 13:if(Y=s.sent,Y&&(Y=JSON.parse(Y)),Y.data=JSON.parse(Y.data),200===Y.status){for(b in g={},g["mallname"]=n,g["main_item_sales"]=c.data.result.main_item_sales,g["main_item_units"]=c.data.result.main_item_units,g["orders"]=c.data.result.orders,g["buyers"]=c.data.result.buyers,g["main_item_sales_per_buyer"]=c.data.result.main_item_sales_per_buyer,a.exportdata2.push(g),c.data.result)D="".concat(b,"_pct_diff"),M="green",c.data.result[D]<0&&(M="red"),"real_time"===a.Statisticaltime?(w=(new Date).getTime(),x=a.$dayjs(w).format("hh:00"),v=x.split(":"),v[0]=Number(v[0])-1,S="".concat(v[0],":").concat(v[1]),r["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(M,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 00:00 - ").concat(S,"  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(M,"'>vs 00:00 - ").concat(S,"  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>")):"yesterday"===a.Statisticaltime?r["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(M,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前一天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(M,"'>vs 前一天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?r["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(M,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前7天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(M,"'>vs 前7天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(r["".concat(b,"1")]="main_item_sales"===b||"main_item_sales_per_buyer"===b?"<pre style='color:".concat(M,"'>").concat(a.$filters.siteCoin(a.site)).concat(c.data.result[b].toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前30天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"):"<pre style='color:".concat(M,"'>").concat(c.data.result[b],"</pre>")+"<pre style='color:".concat(M,"'>vs 前30天  ").concat((100*c.data.result[D]).toFixed(2),"%</pre>"));a.tableData1.push(r)}s.next=21;break;case 19:s.prev=19,s.t0=s["catch"](1);case 21:return s.prev=21,--i.count,s.finish(21);case 24:case"end":return s.stop()}}),s,null,[[1,19,21,24]])})))()},getallinfo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=14;break}return t.Loading1=!0,t.Loading3=!0,t.tableData1=[],t.tableData2=[],t.exportdata1=[],t.exportdata2=[],t.errmall=[],e.next=10,Object(r["d"])(t.mall,t.getTableData);case 10:t.Loading1=!1,t.Loading3=!1,e.next=15;break;case 14:t.$message.warning("请选择店铺！");case 15:case"end":return e.stop()}}),e)})))()},DerivedData1:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata1.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">销售（主要及加购商品）</td>\n        <td style="width: 200px; text-align:left;">加购商品销售</td>\n        <td style="width: 200px; text-align:left;">已出售的商品总件数</td>\n        <td style="width: 200px; text-align:left;">已出售的加购商品总件数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额</td>\n        <td style="width: 200px; text-align:left;">每位买家的加购商品销售</td>\n      </tr>',t.exportdata1.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.sales,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_sales,'</td>\n          <td style="text-align:left;">').concat(t.main_item_units,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_units,'</td>\n          <td style="text-align:left;">').concat(t.orders,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales_per_buyer,'</td>\n          <td style="text-align:left;">').concat(t.add_on_item_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(r["k"])("加购折扣信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"加购折扣信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},DerivedData2:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata2.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">主商品销售</td>\n        <td style="width: 200px; text-align:left;">已售主商品总件数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">每位买家的主商品销售</td>\n      </tr>',t.exportdata2.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales,'</td>\n          <td style="text-align:left;">').concat(t.main_item_units,'</td>\n          <td style="text-align:left;">').concat(t.orders,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.main_item_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(r["k"])("赠品满最低消费信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"赠品满最低消费信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},c=o,d=(a("4a93"),a("2877")),m=Object(d["a"])(c,s,i,!1,null,"1ef6c620",null);e["default"]=m.exports},"4a93":function(t,e,a){"use strict";a("d56d")},"4c28":function(t,e,a){},"4f51":function(t,e,a){"use strict";a("50ca")},"50ca":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},d56d:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,s){return a("el-option",{key:s,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},i=[],n=a("1da1"),r=a("2909"),l=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),o={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,i,n,l,o,c,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return s=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:i=a.sent,200===i.code?(n=i.data||[],e.isAShop||n.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=n,e.siteList=""===s?n:n.filter((function(t){return(null===t||void 0===t?void 0:t.country)===s||!t.platform_mall_id}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(l=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),l.delete(void 0),o=Object(r["a"])(l),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(r["a"])(c),e.groupId=[""].concat(Object(r["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:d=[],d=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=d;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,s=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var i=this.siteShowList.map((function(t){return t.platform_mall_id}));if(s.includes(t))s=s.filter((function(t){return!i.includes(t)}));else{var n=new Set([""].concat(Object(r["a"])(s),Object(r["a"])(i)));s=Object(r["a"])(n)}}else s=s.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var l=s.findIndex((function(e){return e===t}));if(l>-1)s.splice(l,1),s.includes("")&&s.splice(0,1);else if(s.push(t),a){var o,c=this.siteShowList.filter((function(t){return s.includes(t.platform_mall_id)}));s.includes("")||(null===(o=this.siteShowList)||void 0===o?void 0:o.length)!==c.length+1||s.unshift("")}else{var d;s.includes("")||(null===(d=this.siteList)||void 0===d?void 0:d.length)!==s.length+1||s.unshift("")}}this.siteId=s}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var s=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(s)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=a.toString();!this.countryVal&&this.groupId.indexOf("")>-1&&(e=t.length!==this.siteList.length&&e||""),this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var s=e.mall_alias_name||e.platform_mall_name;a=s.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=o,d=(a("8992"),a("4f51"),a("2877")),m=Object(d["a"])(c,s,i,!1,null,"5836cb4c",null);e["a"]=m.exports}}]);