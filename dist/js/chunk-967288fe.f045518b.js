(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-967288fe"],{"07eb":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"160",prop:"mallname"}}),a("el-table-column",{attrs:{prop:"shop_uv",label:"访客数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{prop:"chats_enquired",label:"聊天询问数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.chats_enquired)}})]}}])}),a("el-table-column",{attrs:{prop:"visitors_enquired",label:"访客询问数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.visitors_enquired)}})]}}])}),a("el-table-column",{attrs:{prop:"responded_chats",label:"已回复聊天数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.responded_chats)}})]}}])}),a("el-table-column",{attrs:{prop:"non_responded_chats",label:"未回复聊天数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.non_responded_chats)}})]}}])}),a("el-table-column",{attrs:{prop:"response_time",label:"回复时间",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.response_time)}})]}}])}),a("el-table-column",{attrs:{prop:"buyers",label:"买家数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"orders",label:"订单量",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.orders)}})]}}])}),a("el-table-column",{attrs:{prop:"units",label:"下单件数",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.units)}})]}}])}),a("el-table-column",{attrs:{prop:"sales",label:"销售额",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.sales)}})]}}])})],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),a("d81d"),a("0e0b")),o={data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var s=0;s<this.mallList.length;s++)t[a]===this.mallList[s].group_id&&this.mall.push(this.mallList[s].value)},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=n.split("");u[5]=d[0],u[6]=Number(d[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var h=this.$dayjs(this.timechoose).format("YYYY-MM-01"),p=h.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");m[5]="0",m[6]="1",m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var Y=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=p.split("");Y[5]=f[0],Y[6]=Number(f[1])+1,Y=Y.join(""),this.end_time=Date.parse(this.$dayjs(Y).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},site:function(t,e){this.mall=[],this.group=[],this.getInfo(),"MY"===this.site&&(this.currency="RM"),"TW"===this.site&&(this.currency="$"),"VN"===this.site&&(this.currency="₫"),"ID"===this.site&&(this.currency="Rp"),"PH"===this.site&&(this.currency="₱"),"TH"===this.site&&(this.currency="฿"),"SG"===this.site&&(this.currency="$"),"BR"===this.site&&(this.currency="R$"),"MX"===this.site&&(this.currency="MX$"),"CO"===this.site&&(this.currency="$"),"CL"===this.site&&(this.currency="$"),"PL"===this.site&&(this.currency="zł")}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,s,i,l,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(s=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===s.data.code){for(s.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),i=0;i<t.gruopList.length-1;i++)for(l=i+1;l<t.gruopList.length;l++)t.gruopList[i].value===t.gruopList[l].value&&t.gruopList.splice(l,1);for(r=0;r<t.gruopList.length;r++)t.allgroupid.push(t.gruopList[r].value);for(o=0;o<t.mallList.length;o++)t.allmallid.push(t.mallList[o].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,s,i,l,r,o,n,c,u,d,h,p,m,Y,f,v,y,D,_,M,g,b,w,x,$,j,L,k,S,T,H,F,P,R,q,C,N,O,z,I,G,J,V,B,E,X,W;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=26;break}t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],a=0;case 7:if(!(a<t.mall.length)){e.next=21;break}return s={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,mallId:t.mall[a]},e.next=11,t.$shopeemanService.getrealtime(t.site,s,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 11:for(i=e.sent,l=void 0,i&&(l=JSON.parse(i)),l.data=JSON.parse(l.data),r=void 0,o=0;o<t.mallList.length;o++)t.mallList[o].value===t.mall[a]&&(r=t.mallList[o].label);if(200===l.status){for(_ in n={},n["mallname"]=r,n["shop_uv"]=l.data.result.shop_uv.value,n["chats_enquired"]=l.data.result.chats_enquired.value,n["visitors_enquired"]=l.data.result.visitors_enquired.value,n["responded_chats"]=l.data.result.responded_chats.value,n["non_responded_chats"]=l.data.result.non_responded_chats.value,c=[],u=l.data.result["response_time"].value,u/3600>=1?(d=Math.floor(u/3600),u-=3600*d,d/10<1&&(d="0".concat(d)),c.push(d),u/60>=1?(h=Math.floor(u/60),u-=60*h,h/10<1&&(h="0".concat(h)),c.push(h),p=u,p/10<1&&(p="0".concat(p)),c.push(p)):(c.push("00"),m=u,m/10<1&&(m="0".concat(m)),c.push(m))):(c.push("00"),u/60>=1?(Y=Math.floor(u/60),u-=60*Y,Y/10<1&&(Y="0".concat(Y)),c.push(Y),f=u,f/10<1&&(f="0".concat(f)),c.push(f)):(c.push("00"),v=u,v/10<1&&(v="0".concat(v)),c.push(v))),y="".concat(c[0],":").concat(c[1],":").concat(c[2]),n["response_time"]=y,n["buyers"]=l.data.result.buyers.value,n["orders"]=l.data.result.orders.value,n["units"]=l.data.result.units.value,n["sales"]=l.data.result.sales.value,t.exportdata.push(n),D={},D["mallname"]=r,l.data.result)M="green",l.data.result[_].ratio<0&&(M="red"),"yesterday"===t.Statisticaltime?"sales"===_?D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(t.currency).concat(l.data.result[_].value.toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前一天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"):"response_time"===_?(g=[],l.data.result[_].value/3600>=1?(b=Math.floor(l.data.result[_].value/3600),l.data.result[_].value=l.data.result[_].value-3600*b,b/10<1&&(b="0".concat(b)),g.push(b),l.data.result[_].value/60>=1?(w=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*w,w/10<1&&(w="0".concat(w)),g.push(w),x=l.data.result[_].value,x/10<1&&(x="0".concat(x)),g.push(x)):(g.push("00"),$=l.data.result[_].value,$/10<1&&($="0".concat($)),g.push($))):(g.push("00"),l.data.result[_].value/60>=1?(j=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*j,j/10<1&&(j="0".concat(j)),g.push(j),L=l.data.result[_].value,L/10<1&&(L="0".concat(L)),g.push(L)):(g.push("00"),k=l.data.result[_].value,k/10<1&&(k="0".concat(k)),g.push(k))),S="".concat(g[0],":").concat(g[1],":").concat(g[2]),D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(S,"</pre>")+"<pre style='color:".concat(M,"'>vs 前一天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>")):D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(l.data.result[_].value,"</pre>")+"<pre style='color:".concat(M,"'>vs 前一天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"):"past7days"===t.Statisticaltime?"sales"===_?D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(t.currency).concat(l.data.result[_].value.toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前7天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"):"response_time"===_?(T=[],l.data.result[_].value/3600>=1?(H=Math.floor(l.data.result[_].value/3600),l.data.result[_].value=l.data.result[_].value-3600*H,H/10<1&&(H="0".concat(H)),T.push(H),l.data.result[_].value/60>=1?(F=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*F,F/10<1&&(F="0".concat(F)),T.push(F),P=l.data.result[_].value,P/10<1&&(P="0".concat(P)),T.push(P)):(T.push("00"),R=l.data.result[_].value,R/10<1&&(R="0".concat(R)),T.push(R))):(T.push("00"),l.data.result[_].value/60>=1?(q=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*q,q/10<1&&(q="0".concat(q)),T.push(q),C=l.data.result[_].value,C/10<1&&(C="0".concat(C)),T.push(C)):(T.push("00"),N=l.data.result[_].value,N/10<1&&(N="0".concat(N)),T.push(N))),O="".concat(T[0],":").concat(T[1],":").concat(T[2]),D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(O,"</pre>")+"<pre style='color:".concat(M,"'>vs 前7天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>")):D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(l.data.result[_].value,"</pre>")+"<pre style='color:".concat(M,"'>vs 前7天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"):"past30days"===t.Statisticaltime&&("sales"===_?D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(t.currency).concat(l.data.result[_].value.toFixed(2),"</pre>")+"<pre style='color:".concat(M,"'>vs 前30天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"):"response_time"===_?(z=[],l.data.result[_].value/3600>=1?(I=Math.floor(l.data.result[_].value/3600),l.data.result[_].value=l.data.result[_].value-3600*I,I/10<1&&(I="0".concat(I)),z.push(I),l.data.result[_].value/60>=1?(G=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*G,G/10<1&&(G="0".concat(G)),z.push(G),J=l.data.result[_].value,J/10<1&&(J="0".concat(J)),z.push(J)):(z.push("00"),V=l.data.result[_].value,V/10<1&&(V="0".concat(V)),z.push(V))):(z.push("00"),l.data.result[_].value/60>=1?(B=Math.floor(l.data.result[_].value/60),l.data.result[_].value=l.data.result[_].value-60*B,B/10<1&&(B="0".concat(B)),z.push(B),E=l.data.result[_].value,E/10<1&&(E="0".concat(E)),z.push(E)):(z.push("00"),X=l.data.result[_].value,X/10<1&&(X="0".concat(X)),z.push(X))),W="".concat(z[0],":").concat(z[1],":").concat(z[2]),D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(W,"</pre>")+"<pre style='color:".concat(M,"'>vs 前30天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>")):D["".concat(_)]="<pre style='color:".concat(M,"'>").concat(l.data.result[_].value,"</pre>")+"<pre style='color:".concat(M,"'>vs 前30天  ").concat((100*l.data.result[_].ratio).toFixed(2),"%</pre>"));t.tableData.push(D)}else 403===l.status&&t.errmall.push(r);case 18:a++,e.next=7;break;case 21:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1,e.next=27;break;case 26:t.$message.warning("请选择店铺！");case 27:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数</td>\n        <td style="width: 200px; text-align:left;">聊天询问数</td>\n        <td style="width: 200px; text-align:left;">访客询问数</td>\n        <td style="width: 200px; text-align:left;">已回复聊天数</td>\n        <td style="width: 200px; text-align:left;">未回复聊天数</td>\n        <td style="width: 200px; text-align:left;">回复时间</td>\n        <td style="width: 200px; text-align:left;">买家数</td>\n        <td style="width: 200px; text-align:left;">订单量</td>\n        <td style="width: 200px; text-align:left;">下单件数</td>\n        <td style="width: 200px; text-align:left;">销售额</td>\n      </tr>',t.exportdata.map((function(e){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(e.mallname,'</td>\n          <td style="text-align:left;">').concat(e.shop_uv,'</td>\n          <td style="text-align:left;">').concat(e.chats_enquired,'</td>\n          <td style="text-align:left;">').concat(e.visitors_enquired,'</td>\n          <td style="text-align:left;">').concat(e.responded_chats,'</td>\n          <td style="text-align:left;">').concat(e.non_responded_chats,'</td>\n          <td style="text-align:left;">').concat(e.response_time,'</td>\n          <td style="text-align:left;">').concat(e.buyers,'</td>\n          <td style="text-align:left;">').concat(e.orders,'</td>\n          <td style="text-align:left;">').concat(e.units,'</td>\n          <td style="text-align:left;">').concat(t.currency).concat(e.sales,"</td>\n        </tr>\n        ")})),Object(r["i"])("实时聊天信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"实时聊天信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},n=o,c=(a("af63"),a("2877")),u=Object(c["a"])(n,s,i,!1,null,"2392f794",null);e["default"]=u.exports},af63:function(t,e,a){"use strict";a("ea79")},ea79:function(t,e,a){}}]);