(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35a25cd6"],{"07eb":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"160",prop:"mallname"}}),a("el-table-column",{attrs:{prop:"shop_uv",label:"访客数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{prop:"chats_enquired",label:"聊天询问数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.chats_enquired)}})]}}])}),a("el-table-column",{attrs:{prop:"visitors_enquired",label:"访客询问数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.visitors_enquired)}})]}}])}),a("el-table-column",{attrs:{prop:"responded_chats",label:"已回复聊天数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.responded_chats)}})]}}])}),a("el-table-column",{attrs:{prop:"non_responded_chats",label:"未回复聊天数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.non_responded_chats)}})]}}])}),a("el-table-column",{attrs:{prop:"response_time",label:"回复时间",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.response_time)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"orders",label:"订单量",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders)}})]}}])}),a("el-table-column",{attrs:{prop:"units",label:"下单件数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.units)}})]}}])}),a("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.sales)}})]}}])})],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),n=a("feb6"),o={components:{storeChoose:n["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");u[5]=d[0],u[6]=Number(d[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var h=this.$dayjs(this.timechoose).format("YYYY-MM-01"),p=h.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");m[5]="0",m[6]="1",m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=p.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function s(){var i,l,r,n,o,c,u,d,h,p,m,f,Y,y,v,M,_,D,g,w,b,x,j,S,L,$,I,k,T,N,A,O,C,H,R,V,F,P,q,G,E,z,B,J,W,U;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s.prev=1,l=t.mall_alias_name||t.platform_mall_name,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},s.next=6,a.$shopeemanService.getrealtime(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(n=s.sent,n&&(o=JSON.parse(n)),o.data=JSON.parse(o.data),200===o.status){for(D in c={},c["mallname"]=l,c["shop_uv"]=o.data.result.shop_uv.value,c["chats_enquired"]=o.data.result.chats_enquired.value,c["visitors_enquired"]=o.data.result.visitors_enquired.value,c["responded_chats"]=o.data.result.responded_chats.value,c["non_responded_chats"]=o.data.result.non_responded_chats.value,u=[],d=o.data.result["response_time"].value,d/3600>=1?(h=Math.floor(d/3600),d-=3600*h,h/10<1&&(h="0".concat(h)),u.push(h),d/60>=1?(p=Math.floor(d/60),d-=60*p,p/10<1&&(p="0".concat(p)),u.push(p),m=d,m/10<1&&(m="0".concat(m)),u.push(m)):(u.push("00"),f=d,f/10<1&&(f="0".concat(f)),u.push(f))):(u.push("00"),d/60>=1?(Y=Math.floor(d/60),d-=60*Y,Y/10<1&&(Y="0".concat(Y)),u.push(Y),y=d,y/10<1&&(y="0".concat(y)),u.push(y)):(u.push("00"),v=d,v/10<1&&(v="0".concat(v)),u.push(v))),M="".concat(u[0],":").concat(u[1],":").concat(u[2]),c["response_time"]=M,c["buyers"]=o.data.result.buyers.value,c["orders"]=o.data.result.orders.value,c["units"]=o.data.result.units.value,c["sales"]=o.data.result.sales.value,a.exportdata.push(c),_={},_["mallname"]=l,o.data.result)g="green",o.data.result[D].ratio<0&&(g="red"),"yesterday"===a.Statisticaltime?"sales"===D?_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[D].value.toFixed(2),"</pre>")+"<pre style='color:".concat(g,"'>vs 前一天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"):"response_time"===D?(w=[],o.data.result[D].value/3600>=1?(b=Math.floor(o.data.result[D].value/3600),o.data.result[D].value=o.data.result[D].value-3600*b,b/10<1&&(b="0".concat(b)),w.push(b),o.data.result[D].value/60>=1?(x=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*x,x/10<1&&(x="0".concat(x)),w.push(x),j=o.data.result[D].value,j/10<1&&(j="0".concat(j)),w.push(j)):(w.push("00"),S=o.data.result[D].value,S/10<1&&(S="0".concat(S)),w.push(S))):(w.push("00"),o.data.result[D].value/60>=1?(L=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*L,L/10<1&&(L="0".concat(L)),w.push(L),$=o.data.result[D].value,$/10<1&&($="0".concat($)),w.push($)):(w.push("00"),I=o.data.result[D].value,I/10<1&&(I="0".concat(I)),w.push(I))),k="".concat(w[0],":").concat(w[1],":").concat(w[2]),_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(k,"</pre>")+"<pre style='color:".concat(g,"'>vs 前一天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>")):_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(o.data.result[D].value,"</pre>")+"<pre style='color:".concat(g,"'>vs 前一天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?"sales"===D?_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[D].value.toFixed(2),"</pre>")+"<pre style='color:".concat(g,"'>vs 前7天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"):"response_time"===D?(T=[],o.data.result[D].value/3600>=1?(N=Math.floor(o.data.result[D].value/3600),o.data.result[D].value=o.data.result[D].value-3600*N,N/10<1&&(N="0".concat(N)),T.push(N),o.data.result[D].value/60>=1?(A=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*A,A/10<1&&(A="0".concat(A)),T.push(A),O=o.data.result[D].value,O/10<1&&(O="0".concat(O)),T.push(O)):(T.push("00"),C=o.data.result[D].value,C/10<1&&(C="0".concat(C)),T.push(C))):(T.push("00"),o.data.result[D].value/60>=1?(H=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*H,H/10<1&&(H="0".concat(H)),T.push(H),R=o.data.result[D].value,R/10<1&&(R="0".concat(R)),T.push(R)):(T.push("00"),V=o.data.result[D].value,V/10<1&&(V="0".concat(V)),T.push(V))),F="".concat(T[0],":").concat(T[1],":").concat(T[2]),_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(F,"</pre>")+"<pre style='color:".concat(g,"'>vs 前7天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>")):_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(o.data.result[D].value,"</pre>")+"<pre style='color:".concat(g,"'>vs 前7天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&("sales"===D?_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(a.$filters.siteCoin(a.site)).concat(o.data.result[D].value.toFixed(2),"</pre>")+"<pre style='color:".concat(g,"'>vs 前30天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"):"response_time"===D?(P=[],o.data.result[D].value/3600>=1?(q=Math.floor(o.data.result[D].value/3600),o.data.result[D].value=o.data.result[D].value-3600*q,q/10<1&&(q="0".concat(q)),P.push(q),o.data.result[D].value/60>=1?(G=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*G,G/10<1&&(G="0".concat(G)),P.push(G),E=o.data.result[D].value,E/10<1&&(E="0".concat(E)),P.push(E)):(P.push("00"),z=o.data.result[D].value,z/10<1&&(z="0".concat(z)),P.push(z))):(P.push("00"),o.data.result[D].value/60>=1?(B=Math.floor(o.data.result[D].value/60),o.data.result[D].value=o.data.result[D].value-60*B,B/10<1&&(B="0".concat(B)),P.push(B),J=o.data.result[D].value,J/10<1&&(J="0".concat(J)),P.push(J)):(P.push("00"),W=o.data.result[D].value,W/10<1&&(W="0".concat(W)),P.push(W))),U="".concat(P[0],":").concat(P[1],":").concat(P[2]),_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(U,"</pre>")+"<pre style='color:".concat(g,"'>vs 前30天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>")):_["".concat(D)]="<pre style='color:".concat(g,"'>").concat(o.data.result[D].value,"</pre>")+"<pre style='color:".concat(g,"'>vs 前30天  ").concat((100*o.data.result[D].ratio).toFixed(2),"%</pre>"));a.tableData.push(_)}else 403===o.status&&a.errmall.push(l);s.next=14;break;case 12:s.prev=12,s.t0=s["catch"](1);case 14:return s.prev=14,--i.count,s.finish(14);case 17:case"end":return s.stop()}}),s,null,[[1,12,14,17]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(r["c"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数</td>\n        <td style="width: 200px; text-align:left;">聊天询问数</td>\n        <td style="width: 200px; text-align:left;">访客询问数</td>\n        <td style="width: 200px; text-align:left;">已回复聊天数</td>\n        <td style="width: 200px; text-align:left;">未回复聊天数</td>\n        <td style="width: 200px; text-align:left;">回复时间</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">下单件数</td>\n        <td style="width: 200px; text-align:left;">销售额</td>\n      </tr>',t.exportdata.map((function(e){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(e.mallname,'</td>\n          <td style="text-align:left;">').concat(e.shop_uv,'</td>\n          <td style="text-align:left;">').concat(e.chats_enquired,'</td>\n          <td style="text-align:left;">').concat(e.visitors_enquired,'</td>\n          <td style="text-align:left;">').concat(e.responded_chats,'</td>\n          <td style="text-align:left;">').concat(e.non_responded_chats,'</td>\n          <td style="text-align:left;">').concat(e.response_time,'</td>\n          <td style="text-align:left;">').concat(e.buyers,'</td>\n          <td style="text-align:left;">').concat(e.orders,'</td>\n          <td style="text-align:left;">').concat(e.units,'</td>\n          <td style="text-align:left;">').concat(t.$filters.siteCoin(t.site)).concat(e.sales,"</td>\n        </tr>\n        ")})),Object(r["i"])("实时聊天信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"实时聊天信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},c=o,u=(a("b2e8"),a("2877")),d=Object(u["a"])(c,s,i,!1,null,"d03ab392",null);e["default"]=d.exports},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},b2e8:function(t,e,a){"use strict";a("b9ab")},b85c:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");var s=a("06c5");function i(t,e){var a="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=Object(s["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var i=0,l=function(){};return{s:l,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,n=!0,o=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return n=t.done,t},e:function(t){o=!0,r=t},f:function(){try{n||null==a["return"]||a["return"]()}finally{if(o)throw r}}}}},b9ab:function(t,e,a){},feb6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,s){return t.showMall(e,s)?a("el-option",{key:s,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],l=a("1da1"),r=a("b85c"),n=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=this,s=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");s.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)})),s.addEventListener("blur",(function(){a.scrollTop=0}))}});var u={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var s=e.indexOf("")>-1,i=t.indexOf("")>-1;s!==i?this.groupId=i?[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var s=this.isShowName,i=e.includes(""),l=t.includes("");if(i!==l||e.toString()===t.toString()&&this.isShowNameAll)if(l&&(!s||s&&!this.isShowNameAll)){var o=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(n["a"])(o),Object(n["a"])(e)));this.site=Object(n["a"])(c),this.isShowNameAll=!0,s&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var u=[];if(s){var d=s&&Object(n["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),h=d.length>this.site.length&&this.site||d,p=d.length>this.site.length&&d||this.site;u=new Set(this.site);var m,f=Object(r["a"])(p);try{for(f.s();!(m=f.n()).done;){var Y=m.value;h.includes(Y)&&u.delete(Y)}}catch(y){f.e(y)}finally{f.f()}u.delete("")}this.site=Object(n["a"])(u)}else l?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(s),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,i,l,r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],s=e.countryVal,i=[],!(e.jsonMallData.length>0)){a.next=7;break}i=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:l=a.sent,i=JSON.parse(l)||[],e.jsonMallData=JSON.parse(l)||[];case 12:if(!(i.length>0)){a.next=17;break}1===t&&(e.siteList=""===s?i:i.filter((function(t){return t.country===s}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){i.forEach((function(a){s?t===a.group_id&&s===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:n=a.sent,200===n.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",n.data),o=n.data||[],e.siteList=o,e.jsonMallData=o,e.siteList=""===s?o:o.filter((function(t){return t.country===s}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(s){if(s){var i=t.siteList.find((function(t){return t.platform_mall_id===s}));e.push(i),a+=s+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.mallShowIndex=0,e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,s=this.site[0]===t.platform_mall_id;return s||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=u,h=(a("8992"),a("2877")),p=Object(h["a"])(d,s,i,!1,null,null,null);e["a"]=p.exports}}]);