(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61d37d84"],{"1fbf":function(t,e,a){},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},c2d0:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("订单类型：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},t._l(t.returnStatusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)],1),a("br"),a("el-table",{ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"280",prop:"mallname",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"buyers",label:"买家总数",width:"280",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"new_buyers",label:"新买家数量",width:"280",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.new_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"existing_buyers",label:"现有买家",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.existing_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"potential_buyers",label:"潜在买家",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.potential_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"repeat_purchase_rate",label:"重复购买率",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.repeat_purchase_rate)}})]}}])})],1)],1)],1)},i=[],r=a("1da1"),n=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("feb6")),o=a("0e0b"),l={data:function(){return{Loading1:!1,tableData1:[],Status:"palced",total:0,Statisticaltime:"real_time",site:"TH",mall:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}],returnStatusList:[{value:"palced",label:"下单"},{value:"confirmed",label:"确认订单"},{value:"paid",label:"付费订单"}]}},components:{storeChoose:n["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),n=s.split("");r[5]=n[0],r[6]=Number(n[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),l=o.split("-")[1];if("12"===l){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=l.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var u=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=u.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=m.split("");_[5]=f[0],_[6]=Number(f[1])+1,_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.Loading1=!0,t.tableData1=[],!(t.mall.length>0)){e.next=8;break}return e.next=5,Object(o["d"])(t.mall,t.getTableData);case 5:t.$message.success("查询完成"),e.next=9;break;case 8:t.$message({message:"请先选择店铺",type:"warning"});case 9:t.Loading1=!1;case 10:case"end":return e.stop()}}),e)})))()},getTableData:function(t){var e=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var i,r,n,o,l,c,h,d,u,m,p,_,f,y,Y,b,g,M,D,w,v,S,x,j,L,$,I,k,O,N,T,F,G,C,B,A,P,R,V,H,z,W,J,E,U,q,K,Q;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,orderType:a.Status,mallId:t.platform_mall_id,fetag:"fetag",limit:5},n=t.mall_alias_name||t.platform_mall_name,s.next=6,a.$shopeemanService.getCustomers(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(o=s.sent,o=JSON.parse(o),console.log("this is res.data",o),200===o.status){if(o.data=JSON.parse(o.data),"real_time"===a.Statisticaltime)for(l in o.data)"buyers"===l&&(c="green",h="",o.data["buyers_change"]>0?h="↑":o.data["buyers_change"]<0&&(c="red",h="↓"),o.data[l]='<pre style="color:'.concat(c,'">').concat(o.data[l]," vs 00:00 - 13:00 ").concat(Math.abs(100*o.data["buyers_change"]).toFixed(2),"% ").concat(h,"</pre>")),"new_buyers"===l&&(d="green",u="",o.data["new_buyers_rate"]>0?u="↑":o.data["new_buyers_rate"]<0&&(u="↓",d="red"),o.data[l]='<pre style="color:'.concat(d,'">').concat(o.data[l],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*o.data["new_buyers_rate"]).toFixed(2),"% ").concat(u,"</pre>")),"existing_buyers"===l&&(m="green",p="",o.data["existing_buyers_rate"]>0?p="↑":o.data["existing_buyers_rate"]<0&&(p="↓",m="red"),o.data[l]='<pre style="color:'.concat(m,'">').concat(o.data[l],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*o.data["existing_buyers_rate"]).toFixed(2),"% ").concat(p,"</pre>")),"potential_buyers"===l&&(_="green",f="",o.data["potential_buyers_change"]>0?f="↑":o.data["potential_buyers_change"]<0&&(f="↓",_="red"),o.data[l]='<pre style="color:'.concat(_,'">').concat(o.data[l],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*o.data["potential_buyers_change"]).toFixed(2),"% ").concat(f,"</pre>")),"repeat_purchase_rate"===l&&(y="green",Y="",o.data["repeat_purchase_rate_change"]>0?Y="↑":o.data["repeat_purchase_rate_change"]<0&&(Y="↓",y="red"),o.data[l]='<pre style="color:'.concat(y,'">').concat((100*o.data[l]).toFixed(2),"%\nvs 00:00 - 13:00 ").concat(Math.abs(100*o.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(Y,"</pre>"));if("yesterday"===a.Statisticaltime)for(b in o.data)"buyers"===b&&(g="green",M="",o.data["buyers_change"]>0?M="↑":o.data["buyers_change"]<0&&(M="↓",g="red"),o.data[b]='<pre style="color:'.concat(g,'">').concat(o.data[b],"\nvs 前一天 ").concat(Math.abs(100*o.data["buyers_change"]).toFixed(2),"% ").concat(M,"</pre>")),"new_buyers"===b&&(D="green",w="",o.data["new_buyers_rate"]>0?w="↑":o.data["new_buyers_rate"]<0&&(w="↓",D="red"),o.data[b]='<pre style="color:'.concat(D,'">').concat(o.data[b],"\nvs 前一天 ").concat(Math.abs(100*o.data["new_buyers_rate"]).toFixed(2),"% ").concat(w,"</pre>")),"existing_buyers"===b&&(v="green",S="",o.data["existing_buyers_rate"]>0?S="↑":o.data["existing_buyers_rate"]<0&&(S="↓",v="red"),o.data[b]='<pre style="color:'.concat(v,'">').concat(o.data[b],"\nvs 前一天 ").concat(Math.abs(100*o.data["existing_buyers_rate"]).toFixed(2),"% ").concat(S,"</pre>")),"potential_buyers"===b&&(x="green",j="",o.data["potential_buyers_change"]>0?j="↑":o.data["potential_buyers_change"]<0&&(j="↓",x="red"),o.data[b]='<pre style="color:'.concat(x,'">').concat(o.data[b],"\nvs 前一天 ").concat(Math.abs(100*o.data["potential_buyers_change"]).toFixed(2),"% ").concat(j,"</pre>")),"repeat_purchase_rate"===b&&(L="green",$="",o.data["repeat_purchase_rate_change"]>0?$="↑":o.data["repeat_purchase_rate_change"]<0&&($="↓",L="red"),o.data[b]='<pre style="color:'.concat(L,'">').concat((100*o.data[b]).toFixed(2),"%\nvs 前一天 ").concat(Math.abs(100*o.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat($,"</pre>"));if("past7days"===a.Statisticaltime)for(I in o.data)"buyers"===I&&(k="green",O="",o.data["buyers_change"]>0?O="↑":o.data["buyers_change"]<0&&(O="↓",k="red"),o.data[I]='<pre style="color:'.concat(k,'">').concat(o.data[I],"\nvs 前7天 ").concat(Math.abs(100*o.data["buyers_change"]).toFixed(2),"% ").concat(O,"</pre>")),"new_buyers"===I&&(N="green",T="",o.data["new_buyers_rate"]>0?T="↑":o.data["new_buyers_rate"]<0&&(T="↓",N="red"),o.data[I]='<pre style="color:'.concat(N,'">').concat(o.data[I],"\nvs 前7天 ").concat(Math.abs(100*o.data["new_buyers_rate"]).toFixed(2),"% ").concat(T,"</pre>")),"existing_buyers"===I&&(F="",G="green",o.data["existing_buyers_rate"]>0?F="↑":o.data["existing_buyers_rate"]<0&&(F="↓",G="red"),o.data[I]='<pre style="color:'.concat(G,'">').concat(o.data[I],"\nvs 前7天 ").concat(Math.abs(100*o.data["existing_buyers_rate"]).toFixed(2),"% ").concat(F,"</pre>")),"potential_buyers"===I&&(C="green",B="",o.data["potential_buyers_change"]>0?B="↑":o.data["potential_buyers_change"]<0&&(B="↓",C="red"),o.data[I]='<pre style="color:'.concat(C,'">').concat(o.data[I],"\nvs 前7天 ").concat(Math.abs(100*o.data["potential_buyers_change"]).toFixed(2),"% ").concat(B,"</pre>")),"repeat_purchase_rate"===I&&(A="green",P="",o.data["repeat_purchase_rate_change"]>0?P="↑":o.data["repeat_purchase_rate_change"]<0&&(P="↓",A="red"),o.data[I]='<pre style="color:'.concat(A,'">').concat((100*o.data[I]).toFixed(2),"%\nvs 前7天 ").concat(Math.abs(100*o.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(P,"</pre>"));if("past30days"===a.Statisticaltime)for(R in o.data)"buyers"===R&&(V="green",H="",o.data["buyers_change"]>0?H="↑":o.data["buyers_change"]<0&&(V="red",H="↓"),o.data[R]='<pre style="color:'.concat(V,'">').concat(o.data[R],"\nvs 前30天 ").concat(Math.abs(100*o.data["buyers_change"]).toFixed(2),"% ").concat(H,"</pre>")),"new_buyers"===R&&(z="green",W="",o.data["new_buyers_rate"]>0?W="↑":o.data["new_buyers_rate"]<0&&(W="↓",z="red"),o.data[R]='<pre style="color:'.concat(z,'">').concat(o.data[R],"\nvs 前30天 ").concat(Math.abs(100*o.data["new_buyers_rate"]).toFixed(2),"% ").concat(W,"</pre>")),"existing_buyers"===R&&(J="green",E="",o.data["existing_buyers_rate"]>0?E="↑":o.data["existing_buyers_rate"]<0&&(E="↓",J="red"),o.data[R]='<pre style="color:'.concat(J,'">').concat(o.data[R],"\nvs 前30天 ").concat(Math.abs(100*o.data["existing_buyers_rate"]).toFixed(2),"% ").concat(E,"<pre>")),"potential_buyers"===R&&(U="green",q="",o.data["potential_buyers_change"]>0?q="↑":o.data["potential_buyers_change"]<0&&(q="↓",U="red"),o.data[R]='<pre style="color:'.concat(U,'">').concat(o.data[R],"\nvs 前30天 ").concat(Math.abs(100*o.data["potential_buyers_change"]).toFixed(2),"% ").concat(q,"</pre>")),"repeat_purchase_rate"===R&&(K="",Q="green",o.data["repeat_purchase_rate_change"]>0?K="↑":o.data["repeat_purchase_rate_change"]<0&&(K="↓",Q="red"),o.data[R]='<pre style="color:'.concat(Q,'">').concat((100*o.data[R]).toFixed(2),"%\nvs 前30天 ").concat(Math.abs(100*o.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(K,"</pre>"));o.data["mallname"]=n,a.tableData1.push(o.data)}s.next=15;break;case 12:s.prev=12,s.t0=s["catch"](1),console.log(s.t0);case 15:return s.prev=15,--i.count,s.finish(15);case 18:case"end":return s.stop()}}),s,null,[[1,12,15,18]])})))()}}},c=l,h=(a("e6f8"),a("2877")),d=Object(h["a"])(c,s,i,!1,null,"52a381bf",null);e["default"]=d.exports},e6f8:function(t,e,a){"use strict";a("1fbf")},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,s){return a("el-option",{key:s,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeSiteSelect(t.site,!0)}}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id},nativeOn:{click:function(e){return t.changeSiteSelect(t.site)}}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},i=[],r=a("1da1"),n=a("b85c"),o=a("2909"),l=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("25f0"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var h={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.isShowName="",this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(o["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},changeSiteSelect:function(t,e){var a=this.isShowName;if(!this.isAShop)if(e)if(t.includes("")){var s=a&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),i=new Set([].concat(Object(o["a"])(s),Object(o["a"])(t)));this.site=Object(o["a"])(i),this.isShowNameAll=!0,a&&this.siteList.length===this.site.length&&this.site.unshift("")}else{var r=[];if(a){var l=a&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),c=l.length>this.site.length&&this.site||l,h=l.length>this.site.length&&l||this.site;r=new Set(this.site);var d,u=Object(n["a"])(h);try{for(u.s();!(d=u.n()).done;){var m=d.value;c.includes(m)&&r.delete(m)}}catch(p){u.e(p)}finally{u.f()}r.delete("")}this.site=Object(o["a"])(r)}else!t.includes("")&&this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):t.includes("")&&(this.site=t.slice(1));this.changeMallList(),this.filterMall(a)},getMallGoodsGetMallList:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s,i,r,n,l,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log("getMallGoodsGetMallList - val",t),1!==t){a.next=10;break}return s=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:i=a.sent,200===i.code?(r=i.data||[],e.allSiteList=r,e.siteList=""===s?r:r.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(n=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),n.delete(void 0),l=Object(o["a"])(n),c=l.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(o["a"])(c),e.groupId=[""].concat(Object(o["a"])(c.map((function(t){return t.id}))))),a.next=11;break;case 10:e.siteList=e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id))return t}));case 11:e.changeSiteSelect([""],!0);case 12:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=(new Date).getTime(),a=[],s="",i=this.site;if(this.isAShop){var r=this.siteList.find((function(e){return e.platform_mall_id===t.site}));s=this.site,a.push(r)}else i.length&&""===i[0]&&(i=i.slice(1)),s=i.toString(),a=this.siteList.filter((function(t){return i.includes(t.platform_mall_id)})),console.log(new Date-e);!this.countryVal&&this.groupId.indexOf("")>-1&&(s=a.length!==this.siteList.length&&s||""),this.source?this.$emit("changeMallList",{mallList:a,groupIdList:this.groupId,source:this.source,searchAll:s,country:this.countryVal.toLocaleUpperCase()}):(a["country"]=this.countryVal,this.$emit("changeMallList",a))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=[];a=t?e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)})):e.siteList,e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=h,u=(a("8992"),a("2877")),m=Object(u["a"])(d,s,i,!1,null,null,null);e["a"]=m.exports}}]);