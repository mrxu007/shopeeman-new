(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-826e5328"],{"067b":function(t,e,a){},"894f":function(t,e,a){"use strict";a("067b")},c2d0:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("订单类型：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},t._l(t.returnStatusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"280",prop:"mallname",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"buyers",label:"买家总数",width:"280",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.buyers)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"new_buyers",label:"新买家数量",width:"280",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.new_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"existing_buyers",label:"现有买家",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.existing_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"potential_buyers",label:"潜在买家",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.potential_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"repeat_purchase_rate",label:"重复购买率",width:"280",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.repeat_purchase_rate)}})]}}])})],1)],1)],1)},i=[],r=a("1da1"),l=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),{data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,allgroupid:[],allmallid:[],tableData1:[],errmall:[],Status:"palced",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}],returnStatusList:[{value:"palced",label:"下单"},{value:"confirmed",label:"确认订单"},{value:"paid",label:"付费订单"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var s=0;s<this.mallList.length;s++)t[a]===this.mallList[s].group_id&&this.mall.push(this.mallList[s].value)},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),h=o.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var p=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=p.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=m.split("");_[5]=Y[0],_[6]=Number(Y[1])+1,_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},site:function(t,e){this.mall=[],this.group=[],this.getInfo()}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,i,r,l,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(s=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===s.data.code){for(s.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),i=0;i<t.gruopList.length-1;i++)for(r=i+1;r<t.gruopList.length;r++)t.gruopList[i].value===t.gruopList[r].value&&t.gruopList.splice(r,1);for(l=0;l<t.gruopList.length;l++)t.allgroupid.push(t.gruopList[l].value);for(n=0;n<t.mallList.length;n++)t.allmallid.push(t.mallList[n].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,i,r,l,n,o,c,d,h,p,m,u,_,Y,y,b,f,g,D,M,v,w,j,$,x,L,k,S,F,T,C,H,N,z,I,O,P,R,J,G,E,B,V,q,A,K,Q,U;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.Loading1=!0,t.Loading3=!0,t.tableData1=[],t.errmall=[],!(t.mall.length>0)){e.next=21;break}a=0;case 6:if(!(a<t.mall.length)){e.next=19;break}for(s={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,orderType:t.Status,mallId:t.mall[a],fetag:"fetag",limit:5},i=void 0,r=0;r<t.mallList.length;r++)t.mallList[r].value===t.mall[a]&&(i=t.mallList[r].label);return e.next=12,t.$shopeemanService.getCustomers(t.site,s,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:if(l=e.sent,l=JSON.parse(l),l.data=JSON.parse(l.data),200===l.status){if("real_time"===t.Statisticaltime)for(n in l.data)"buyers"===n&&(o="green",c="",l.data["buyers_change"]>0?c="↑":l.data["buyers_change"]<0&&(o="red",c="↓"),l.data[n]='<pre style="color:'.concat(o,'">').concat(l.data[n],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*l.data["buyers_change"]).toFixed(2),"% ").concat(c,"</pre>")),"new_buyers"===n&&(d="green",h="",l.data["new_buyers_rate"]>0?h="↑":l.data["new_buyers_rate"]<0&&(h="↓",d="red"),l.data[n]='<pre style="color:'.concat(d,'">').concat(l.data[n],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*l.data["new_buyers_rate"]).toFixed(2),"% ").concat(h,"</pre>")),"existing_buyers"===n&&(p="green",m="",l.data["existing_buyers_rate"]>0?m="↑":l.data["existing_buyers_rate"]<0&&(m="↓",p="red"),l.data[n]='<pre style="color:'.concat(p,'">').concat(l.data[n],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*l.data["existing_buyers_rate"]).toFixed(2),"% ").concat(m,"</pre>")),"potential_buyers"===n&&(u="green",_="",l.data["potential_buyers_change"]>0?_="↑":l.data["potential_buyers_change"]<0&&(_="↓",u="red"),l.data[n]='<pre style="color:'.concat(u,'">').concat(l.data[n],"\nvs 00:00 - 13:00 ").concat(Math.abs(100*l.data["potential_buyers_change"]).toFixed(2),"% ").concat(_,"</pre>")),"repeat_purchase_rate"===n&&(Y="green",y="",l.data["repeat_purchase_rate_change"]>0?y="↑":l.data["repeat_purchase_rate_change"]<0&&(y="↓",Y="red"),l.data[n]='<pre style="color:'.concat(Y,'">').concat((100*l.data[n]).toFixed(2),"%\nvs 00:00 - 13:00 ").concat(Math.abs(100*l.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(y,"</pre>"));if("yesterday"===t.Statisticaltime)for(b in l.data)"buyers"===b&&(f="green",g="",l.data["buyers_change"]>0?g="↑":l.data["buyers_change"]<0&&(g="↓",f="red"),l.data[b]='<pre style="color:'.concat(f,'">').concat(l.data[b],"\nvs 前一天 ").concat(Math.abs(100*l.data["buyers_change"]).toFixed(2),"% ").concat(g,"</pre>")),"new_buyers"===b&&(D="green",M="",l.data["new_buyers_rate"]>0?M="↑":l.data["new_buyers_rate"]<0&&(M="↓",D="red"),l.data[b]='<pre style="color:'.concat(D,'">').concat(l.data[b],"\nvs 前一天 ").concat(Math.abs(100*l.data["new_buyers_rate"]).toFixed(2),"% ").concat(M,"</pre>")),"existing_buyers"===b&&(v="green",w="",l.data["existing_buyers_rate"]>0?w="↑":l.data["existing_buyers_rate"]<0&&(w="↓",v="red"),l.data[b]='<pre style="color:'.concat(v,'">').concat(l.data[b],"\nvs 前一天 ").concat(Math.abs(100*l.data["existing_buyers_rate"]).toFixed(2),"% ").concat(w,"</pre>")),"potential_buyers"===b&&(j="green",$="",l.data["potential_buyers_change"]>0?$="↑":l.data["potential_buyers_change"]<0&&($="↓",j="red"),l.data[b]='<pre style="color:'.concat(j,'">').concat(l.data[b],"\nvs 前一天 ").concat(Math.abs(100*l.data["potential_buyers_change"]).toFixed(2),"% ").concat($,"</pre>")),"repeat_purchase_rate"===b&&(x="green",L="",l.data["repeat_purchase_rate_change"]>0?L="↑":l.data["repeat_purchase_rate_change"]<0&&(L="↓",x="red"),l.data[b]='<pre style="color:'.concat(x,'">').concat((100*l.data[b]).toFixed(2),"%\nvs 前一天 ").concat(Math.abs(100*l.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(L,"</pre>"));if("past7days"===t.Statisticaltime)for(k in l.data)"buyers"===k&&(S="green",F="",l.data["buyers_change"]>0?F="↑":l.data["buyers_change"]<0&&(F="↓",S="red"),l.data[k]='<pre style="color:'.concat(S,'">').concat(l.data[k],"\nvs 前7天 ").concat(Math.abs(100*l.data["buyers_change"]).toFixed(2),"% ").concat(F,"</pre>")),"new_buyers"===k&&(T="green",C="",l.data["new_buyers_rate"]>0?C="↑":l.data["new_buyers_rate"]<0&&(C="↓",T="red"),l.data[k]='<pre style="color:'.concat(T,'">').concat(l.data[k],"\nvs 前7天 ").concat(Math.abs(100*l.data["new_buyers_rate"]).toFixed(2),"% ").concat(C,"</pre>")),"existing_buyers"===k&&(H="",N="green",l.data["existing_buyers_rate"]>0?H="↑":l.data["existing_buyers_rate"]<0&&(H="↓",N="red"),l.data[k]='<pre style="color:'.concat(N,'">').concat(l.data[k],"\nvs 前7天 ").concat(Math.abs(100*l.data["existing_buyers_rate"]).toFixed(2),"% ").concat(H,"</pre>")),"potential_buyers"===k&&(z="green",I="",l.data["potential_buyers_change"]>0?I="↑":l.data["potential_buyers_change"]<0&&(I="↓",z="red"),l.data[k]='<pre style="color:'.concat(z,'">').concat(l.data[k],"\nvs 前7天 ").concat(Math.abs(100*l.data["potential_buyers_change"]).toFixed(2),"% ").concat(I,"</pre>")),"repeat_purchase_rate"===k&&(O="green",P="",l.data["repeat_purchase_rate_change"]>0?P="↑":l.data["repeat_purchase_rate_change"]<0&&(P="↓",O="red"),l.data[k]='<pre style="color:'.concat(O,'">').concat((100*l.data[k]).toFixed(2),"%\nvs 前7天 ").concat(Math.abs(100*l.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(P,"</pre>"));if("past30days"===t.Statisticaltime)for(R in l.data)"buyers"===R&&(J="green",G="",l.data["buyers_change"]>0?G="↑":l.data["buyers_change"]<0&&(J="red",G="↓"),l.data[R]='<pre style="color:'.concat(J,'">').concat(l.data[R],"\nvs 前30天 ").concat(Math.abs(100*l.data["buyers_change"]).toFixed(2),"% ").concat(G,"</pre>")),"new_buyers"===R&&(E="green",B="",l.data["new_buyers_rate"]>0?B="↑":l.data["new_buyers_rate"]<0&&(B="↓",E="red"),l.data[R]='<pre style="color:'.concat(E,'">').concat(l.data[R],"\nvs 前30天 ").concat(Math.abs(100*l.data["new_buyers_rate"]).toFixed(2),"% ").concat(B,"</pre>")),"existing_buyers"===R&&(V="green",q="",l.data["existing_buyers_rate"]>0?q="↑":l.data["existing_buyers_rate"]<0&&(q="↓",V="red"),l.data[R]='<pre style="color:'.concat(V,'">').concat(l.data[R],"\nvs 前30天 ").concat(Math.abs(100*l.data["existing_buyers_rate"]).toFixed(2),"% ").concat(q,"<pre>")),"potential_buyers"===R&&(A="green",K="",l.data["potential_buyers_change"]>0?K="↑":l.data["potential_buyers_change"]<0&&(K="↓",A="red"),l.data[R]='<pre style="color:'.concat(A,'">').concat(l.data[R],"\nvs 前30天 ").concat(Math.abs(100*l.data["potential_buyers_change"]).toFixed(2),"% ").concat(K,"</pre>")),"repeat_purchase_rate"===R&&(Q="",U="green",l.data["repeat_purchase_rate_change"]>0?Q="↑":l.data["repeat_purchase_rate_change"]<0&&(Q="↓",U="red"),l.data[R]='<pre style="color:'.concat(U,'">').concat((100*l.data[R]).toFixed(2),"%\nvs 前30天 ").concat(Math.abs(100*l.data["repeat_purchase_rate_change"]).toFixed(2),"% ").concat(Q,"</pre>"));l.data["mallname"]=i,t.tableData1.push(l.data)}else 2===l.data.errcode&&t.errmall.push(i);case 16:a++,e.next=6;break;case 19:e.next=22;break;case 21:t.$message({message:"请先选择店铺",type:"warning"});case 22:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1;case 25:case"end":return e.stop()}}),e)})))()}}}),n=l,o=(a("894f"),a("2877")),c=Object(o["a"])(n,s,i,!1,null,"962cb614",null);e["default"]=c.exports}}]);