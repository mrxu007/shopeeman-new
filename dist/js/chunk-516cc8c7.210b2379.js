(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-516cc8c7"],{"1ca3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("el-table",{ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"250px",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"usage_rate",label:"使用率","min-width":"250px"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.usage_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数","min-width":"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"orders",label:"订单量","min-width":"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders)}})]}}])}),a("el-table-column",{attrs:{prop:"sales",label:"销售额","min-width":"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.sales)}})]}}])}),a("el-table-column",{attrs:{prop:"claims",label:"领取数","min-width":"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.claims)}})]}}])}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"操作","min-width":"150px",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.view(s)}}},[t._v("优惠卷概览")])]}}])})],1),a("el-dialog",{attrs:{title:"优惠卷概览",visible:t.eidtVisible,width:"66%"},on:{"update:visible":function(e){t.eidtVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"套装优惠名称",width:"160",prop:"voucher_code"}}),a("el-table-column",{attrs:{align:"center",prop:"start_time",label:"开始时间",width:"140"}}),a("el-table-column",{attrs:{align:"center",prop:"end_time",label:"结束时间",width:"140"}}),a("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"100",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"orders",label:"订单数",width:"100"}}),a("el-table-column",{attrs:{align:"center",prop:"units",label:"订购的优惠套装数",width:"130"}}),a("el-table-column",{attrs:{align:"center",prop:"units",label:"售出件数",width:"100"}}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"sales_per_buyer",label:"每位买家的销售额",width:"130",align:"center"}})],1)],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("feb6")),n=a("0e0b"),o={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var u=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=u.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=m.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,l,r,n,o,c,h,d,u,m,p,f,Y,y,g;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,l=t.mall_alias_name||t.platform_mall_name,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,status:0},s.next=6,a.$shopeemanService.getcoupon(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(n=s.sent,o="",n&&(o=JSON.parse(n)),o.data=JSON.parse(o.data),200!==o.status){s.next=30;break}for(d in c={},c["mallname"]=l,c["sales"]=o.data.result.sales.value,c["claims"]=o.data.result.claims.value,c["orders"]=o.data.result.orders.value,c["buyers"]=o.data.result.buyers.value,c["usage_rate"]=o.data.result.usage_rate.value,c["cost"]=o.data.result.cost.value,a.exportdata.push(c),h={},h["mallname"]=l,o.data.result)u="green",o.data.result[d].chain_ratio<0&&(u="red"),"real_time"===a.Statisticaltime?(m=(new Date).getTime(),p=a.$dayjs(m).format("hh:00"),f=p.split(":"),f[0]=Number(f[0])-1,Y="".concat(f[0],":").concat(f[1]),h["".concat(d)]="sales"===d||"cost"===d?"<pre style='color:".concat(u,"'>").concat(a.currency).concat(o.data.result[d].value.toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 00:00 - ").concat(Y,"  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"usage_rate"===d?"<pre style='color:".concat(u,"'>").concat((100*o.data.result[d].value).toFixed(2),"%</pre>")+"<pre style='color:".concat(u,"'>vs 00:00 - ").concat(Y,"  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(o.data.result[d].value,"</pre>")+"<pre style='color:".concat(u,"'>vs 00:00 - ").concat(Y,"  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>")):"yesterday"===a.Statisticaltime?h["".concat(d)]="sales"===d||"cost"===d?"<pre style='color:".concat(u,"'>").concat(a.currency).concat(o.data.result[d].value.toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前一天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"usage_rate"===d?"<pre style='color:".concat(u,"'>").concat((100*o.data.result[d].value).toFixed(2),"%</pre>")+"<pre style='color:".concat(u,"'>vs 前一天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(o.data.result[d].value,"</pre>")+"<pre style='color:".concat(u,"'>vs 前一天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?h["".concat(d)]="sales"===d||"cost"===d?"<pre style='color:".concat(u,"'>").concat(a.currency).concat(o.data.result[d].value.toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前7天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"usage_rate"===d?"<pre style='color:".concat(u,"'>").concat((100*o.data.result[d].value).toFixed(2),"%</pre>")+"<pre style='color:".concat(u,"'>vs 前七天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(o.data.result[d].value,"</pre>")+"<pre style='color:".concat(u,"'>vs 前7天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(h["".concat(d)]="sales"===d||"cost"===d?"<pre style='color:".concat(u,"'>").concat(a.currency).concat(o.data.result[d].value.toFixed(2),"</pre>")+"<pre style='color:".concat(u,"'>vs 前30天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"usage_rate"===d?"<pre style='color:".concat(u,"'>").concat((100*o.data.result[d].value).toFixed(2),"%</pre>")+"<pre style='color:".concat(u,"'>vs 前30天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(o.data.result[d].value,"</pre>")+"<pre style='color:".concat(u,"'>vs 前30天  ").concat((100*o.data.result[d].chain_ratio).toFixed(2),"%</pre>"));return s.next=25,a.$shopeemanService.getcouponview(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 25:if(y=s.sent,y&&(y=JSON.parse(y),y.data=JSON.parse(y.data)),h["view"]=y.data.data,h["view"])for(g=0;g<h["view"].length;g++)h["view"][g].sales="".concat(a.currency).concat(h["view"][g].sales.toFixed(2)),h["view"][g].sales_per_buyer="".concat(a.currency).concat(h["view"][g].sales_per_buyer.toFixed(2)),h["view"][g].start_time=a.$dayjs(1e3*h["view"][g].start_time).format("YYYY-MM-DD hh:mm:ss"),h["view"][g].end_time=a.$dayjs(1e3*h["view"][g].end_time).format("YYYY-MM-DD hh:mm:ss");a.tableData.push(h);case 30:s.next=34;break;case 32:s.prev=32,s.t0=s["catch"](1);case 34:return s.prev=34,--i.count,s.finish(34);case 37:case"end":return s.stop()}}),s,null,[[1,32,34,37]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.Loading1=!0,t.tableData1=[],!(t.mall.length>0)){e.next=8;break}return e.next=5,Object(n["c"])(t.mall,t.getTableData);case 5:t.$message.success("查询完成"),e.next=9;break;case 8:t.$message({message:"请先选择店铺",type:"warning"});case 9:t.Loading1=!1;case 10:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">使用率</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">销售额</td>\n        <td style="width: 200px; text-align:left;">领取数</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.usage_rate,'</td>\n          <td style="text-align:left;">').concat(t.buyers,'</td>\n          <td style="text-align:left;">').concat(t.orders,'</td>\n          <td style="text-align:left;">').concat(t.sales,'</td>\n          <td style="text-align:left;">').concat(t.claims,"</td>\n        </tr>\n        ")})),Object(n["j"])("套装优惠信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"套装优惠信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},view:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.eidtVisible=!0,e.tableData1=t.view;case 2:case"end":return a.stop()}}),a)})))()}}},c=o,h=(a("4e78"),a("2877")),d=Object(h["a"])(c,s,i,!1,null,"156d3673",null);e["default"]=d.exports},"4c28":function(t,e,a){},"4e78":function(t,e,a){"use strict";a("af38")},8992:function(t,e,a){"use strict";a("4c28")},af38:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],l=a("1da1"),r=a("b85c"),n=a("2909"),o=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var h={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?Object(n["a"])(this.groupIdList.map((function(t){return t.id}))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=this.isShowName,i=e.includes(""),l=t.includes("");if(i!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!s||s&&!this.isShowNameAll)){var o=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(n["a"])(o),Object(n["a"])(e)));this.site=Object(n["a"])(c),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var h=[];if(s){var d=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),u=d.length>this.site.length&&this.site||d,m=d.length>this.site.length&&d||this.site;h=new Set(this.site);var p,f=Object(r["a"])(m);try{for(f.s();!(p=f.n()).done;){var Y=p.value;u.includes(Y)&&h.delete(Y)}}catch(y){f.e(y)}finally{f.f()}h.delete("")}this.site=Object(n["a"])(h)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(s),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,i,l,r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],s=e.countryVal,i=[],!(e.jsonMallData.length>0)){a.next=7;break}i=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,i=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(i.length>0)){a.next=17;break}1===t&&(e.siteList=""===s?i:i.filter((function(t){return t.country===s}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){i.forEach((function(a){s?t===a.group_id&&s===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:n=a.sent,200===n.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",n.data),o=n.data||[],e.siteList=o,e.jsonMallData=o,e.siteList=""===s?o:o.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=h,u=(a("8992"),a("2877")),m=Object(u["a"])(d,s,i,!1,null,null,null);e["a"]=m.exports}}]);