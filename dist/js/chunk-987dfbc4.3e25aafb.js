(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-987dfbc4"],{"1e83":function(t,e,a){"use strict";a("2a46")},"2a46":function(t,e,a){},4182:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"160",prop:"mallname",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"apppage_views",label:"App端浏览量",width:"120",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.apppage_views)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"appavg_page_views",label:"App端平均浏览量",width:"160",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appavg_page_views)}})]}}])}),a("el-table-column",{attrs:{prop:"appavg_stay_time",label:"App端平均浏览时间",width:"160",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appavg_stay_time)}})]}}])}),a("el-table-column",{attrs:{prop:"appbounce_rate",label:"App端网页跳出率",width:"160",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appbounce_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"appvisitors",label:"App端访客量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appvisitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appnew_visitors",label:"App端新访客量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appnew_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"App端现有访客量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appexisting_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appnew_followers",label:"App新粉丝量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appnew_followers)}})]}}])}),a("el-table-column",{attrs:{prop:"pcpage_views",label:"Pc端浏览量",width:"130",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcpage_views)}})]}}])}),a("el-table-column",{attrs:{prop:"pcavg_page_views",label:"Pc端平均浏览量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcavg_page_views)}})]}}])}),a("el-table-column",{attrs:{prop:"pcavg_stay_time",label:"Pc端平均浏览时间",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcavg_stay_time)}})]}}])}),a("el-table-column",{attrs:{prop:"pcbounce_rate",label:"Pc端网页跳出率",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcbounce_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"pcvisitors",label:"Pc端访客量",width:"130",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcvisitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcnew_visitors",label:"Pc端新访客量",width:"130",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcnew_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcexisting_visitors",label:"Pc端现有访客量",width:"150",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcexisting_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcnew_followers",label:"Pc新浏粉丝量",width:"130",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcnew_followers)}})]}}])})],1)],1)],1)},s=[],n=a("1da1"),o=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),r=a("feb6"),l={data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},components:{storeChoose:r["a"]},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var n=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),o=i.split("");n[5]=o[0],n[6]=Number(o[1])+1,n=n.join(""),this.end_time=Date.parse(this.$dayjs(n).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var r=this.$dayjs(this.timechoose).format("YYYY-MM-01"),l=r.split("-")[1];if("12"===l){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=l.split("");p[5]=d[0],p[6]=Number(d[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var h=this.$dayjs(this.timechoose).format("YYYY-MM-01"),f=h.split("-")[1];if("12"===f){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");m[5]="0",m[6]="1",m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),u=f.split("");_[5]=u[0],_[6]=Number(u[1])+1,_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s,n,o,r,l,c,p,d,h,f,m,_,u,g,w,v,Y,y,M,b,D,x,j,L,S,$,I,k;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,n=(new Date).getTime()-864e5,o=a.$dayjs(n).format("YYYYMMDD"),r=t.mall_alias_name||t.platform_mall_name,l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,fetag:"fetag",dt:o},i.next=8,a.$shopeemanService.getFlow(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 8:c=i.sent,c&&(p=JSON.parse(c)),200===p.status?(p.data=JSON.parse(p.data),d=p.data.result.data.pc,h=p.data.result.data.app,f={},f["mallname"]=r,f["apppage_views"]=h.page_views,f["appavg_page_views"]=h.avg_page_views,f["appavg_stay_time"]=h.avg_stay_time,f["appbounce_rate"]=h.bounce_rate,f["appvisitors"]=h.visitors,f["appnew_visitors"]=h.new_visitors,f["appexisting_visitors"]=h.existing_visitors,f["appnew_followers"]=h.new_followers,f["pcpage_views"]=d.page_views,f["pcavg_page_views"]=d.avg_page_views,f["pcavg_stay_time"]=d.avg_stay_time,f["pcbounce_rate"]=d.bounce_rate,f["pcvisitors"]=d.visitors,f["pcnew_visitors"]=d.new_visitors,f["pcexisting_visitors"]=d.existing_visitors,f["pcnew_followers"]=d.new_followers,a.exportdata.push(f),m={},m["mallname"]=r,_="green",u="",h.page_views_pct_diff>=0?u="↑":(u="↓",_="red"),m["apppage_views"]='<pre style="color:'.concat(_,'">').concat(h.page_views,"\n提升率 ").concat(Math.abs(100*h.page_views_pct_diff).toFixed(2),"% ").concat(u,"</pre>"),g="",h.avg_page_views_pct_diff>=0?(_="green",g="↑"):(g="↓",_="red"),m["appavg_page_views"]='<pre style="color:'.concat(_,'">').concat(h.avg_page_views.toFixed(2),"\n提升率 ").concat(Math.abs(100*h.avg_page_views_pct_diff).toFixed(2),"% ").concat(g,"</pre>"),w="",h.avg_stay_time_pct_diff>=0?(_="green",w="↑"):(w="↓",_="red"),m["appavg_stay_time"]='<pre style="color:'.concat(_,'">').concat(h.avg_stay_time,"\n提升率 ").concat(Math.abs(100*h.avg_stay_time_pct_diff).toFixed(2),"% ").concat(w,"</pre>"),v="",h.bounce_rate_pct_diff>=0?(_="green",v="↑"):(v="↓",_="red"),m["appbounce_rate"]='<pre style="color:'.concat(_,'">').concat((100*h.bounce_rate).toFixed(2),"%\n提升率 ").concat(Math.abs(100*h.bounce_rate_pct_diff).toFixed(2),"% ").concat(v,"</pre>"),Y="",h.visitors_pct_diff>=0?(_="green",Y="↑"):(Y="↓",_="red"),m["appvisitors"]='<pre style="color:'.concat(_,'">').concat(h.visitors,"\n提升率 ").concat(Math.abs(100*h.visitors_pct_diff).toFixed(2),"% ").concat(Y,"</pre>"),y="",h.new_visitors_pct_diff>=0?(_="green",y="↑"):(y="↓",_="red"),m["appnew_visitors"]='<pre style="color:'.concat(_,'">').concat(h.new_visitors,"\n提升率 ").concat(Math.abs(100*h.new_visitors_pct_diff).toFixed(2),"% ").concat(y,"</pre>"),M="",h.existing_visitors_pct_diff>=0?(_="green",M="↑"):(M="↓",_="red"),m["appexisting_visitors"]='<pre style="color:'.concat(_,'">').concat(h.existing_visitors,"\n提升率 ").concat(Math.abs(100*h.existing_visitors_pct_diff).toFixed(2),"% ").concat(M,"</pre>"),b="",h.new_followers_pct_diff>=0?(_="green",b="↑"):(b="↓",_="red"),m["appnew_followers"]='<pre style="color:'.concat(_,'">').concat(h.new_followers,"\n提升率 ").concat(Math.abs(100*h.new_followers_pct_diff).toFixed(2),"% ").concat(b,"</pre>"),D="",d.page_views_pct_diff>=0?(_="green",D="↑"):(D="↓",_="red"),m["pcpage_views"]='<pre style="color:'.concat(_,'">').concat(d.page_views,"\n提升率 ").concat(Math.abs(100*d.page_views_pct_diff).toFixed(2),"% ").concat(D,"</pre>"),x="",d.avg_page_views_pct_diff>=0?(_="green",x="↑"):(x="↓",_="red"),m["pcavg_page_views"]='<pre style="color:'.concat(_,'">').concat(d.avg_page_views.toFixed(2),"\n提升率 ").concat(Math.abs(100*d.avg_page_views_pct_diff).toFixed(2),"% ").concat(x,"</pre>"),j="",d.avg_stay_time_pct_diff>=0?(_="green",j="↑"):(j="↓",_="red"),m["pcavg_stay_time"]='<pre style="color:'.concat(_,'">').concat(d.avg_stay_time,"\n提升率 ").concat(Math.abs(100*d.avg_stay_time_pct_diff).toFixed(2),"% ").concat(j,"</pre>"),L="",d.bounce_rate_pct_diff>=0?(_="green",L="↑"):(L="↓",_="red"),m["pcbounce_rate"]='<pre style="color:'.concat(_,'">').concat((100*d.bounce_rate).toFixed(2),"%\n提升率 ").concat(Math.abs(100*d.bounce_rate_pct_diff).toFixed(2),"% ").concat(L,"</pre>"),S="",d.visitors_pct_diff>=0?(_="green",S="↑"):(S="↓",_="red"),m["pcvisitors"]='<pre style="color:'.concat(_,'">').concat(d.visitors,"\n提升率 ").concat(Math.abs(100*d.visitors_pct_diff).toFixed(2),"% ").concat(S,"</pre>"),$="",d.new_visitors_pct_diff>=0?(_="green",$="↑"):($="↓",_="red"),m["pcnew_visitors"]='<pre style="color:'.concat(_,'">').concat(d.new_visitors,"\n提升率 ").concat(Math.abs(100*d.new_visitors_pct_diff).toFixed(2),"% ").concat($,"</pre>"),I="",d.existing_visitors_pct_diff>=0?(_="green",I="↑"):(I="↓",_="red"),m["pcexisting_visitors"]='<pre style="color:'.concat(_,'">').concat(d.existing_visitors,"\n提升率 ").concat(Math.abs(100*d.existing_visitors_pct_diff).toFixed(2),"% ").concat(I,"</pre>"),k="",d.new_followers_pct_diff>=0?(_="green",k="↑"):(k="↓",_="red"),m["pcnew_followers"]='<pre style="color:'.concat(_,'">').concat(d.new_followers,"\n提升率 ").concat(Math.abs(100*d.new_followers_pct_diff).toFixed(2),"% ").concat(k,"</pre>"),a.tableData.push(m)):403===p.status&&a.errmall.push(r),i.next=15;break;case 13:i.prev=13,i.t0=i["catch"](1);case 15:return i.prev=15,--s.count,i.finish(15);case 18:case"end":return i.stop()}}),i,null,[[1,13,15,18]])})))()},getallinfo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=9;break}return t.Loading1=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=7,Object(o["c"])(t.mall,t.getTableData);case 7:t.Loading1=!1,t.Loading3=!1;case 9:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">App端浏览量</td>\n        <td style="width: 200px; text-align:left;">App端平均浏览量</td>\n        <td style="width: 200px; text-align:left;">App端平均浏览时间</td>\n        <td style="width: 200px; text-align:left;">App端网页跳出率</td>\n        <td style="width: 200px; text-align:left;">App端访客量</td>\n        <td style="width: 200px; text-align:left;">App端新访客量</td>\n        <td style="width: 200px; text-align:left;">App端现有访客量</td>\n        <td style="width: 200px; text-align:left;">App新粉丝量</td>\n        <td style="width: 200px; text-align:left;">Pc端浏览量</td>\n        <td style="width: 200px; text-align:left;">Pc端平均浏览量</td>\n        <td style="width: 200px; text-align:left;">Pc端平均浏览时间</td>\n        <td style="width: 200px; text-align:left;">Pc端网页跳出率</td>\n        <td style="width: 200px; text-align:left;">Pc端访客量</td>\n        <td style="width: 200px; text-align:left;">Pc端新访客量</td>\n        <td style="width: 200px; text-align:left;">Pc端现有访客量</td>\n        <td style="width: 200px; text-align:left;">Pc新粉丝量</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.apppage_views,'</td>\n          <td style="text-align:left;">').concat(t.appavg_page_views.toFixed(2),'</td>\n          <td style="text-align:left;">').concat(t.appavg_stay_time,'</td>\n          <td style="text-align:left;">').concat(100*t.appbounce_rate,'%</td>\n          <td style="text-align:left;">').concat(t.appvisitors,'</td>\n          <td style="text-align:left;">').concat(t.appnew_visitors,'</td>\n          <td style="text-align:left;">').concat(t.appexisting_visitors,'</td>\n          <td style="text-align:left;">').concat(t.appnew_followers,'</td>\n          <td style="text-align:left;">').concat(t.pcpage_views,'</td>\n          <td style="text-align:left;">').concat(t.pcavg_page_views.toFixed(2),'</td>\n          <td style="text-align:left;">').concat(t.pcavg_stay_time,'</td>\n          <td style="text-align:left;">').concat(100*t.pcbounce_rate,'%</td>\n          <td style="text-align:left;">').concat(t.pcvisitors,'</td>\n          <td style="text-align:left;">').concat(t.pcnew_visitors,'</td>\n          <td style="text-align:left;">').concat(t.pcexisting_visitors,'</td>\n          <td style="text-align:left;">').concat(t.pcnew_followers,"</td>\n        </tr>\n        ")})),Object(o["i"])("流量信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"流量信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},c=l,p=(a("1e83"),a("2877")),d=Object(p["a"])(c,i,s,!1,null,"a8ee9054",null);e["default"]=d.exports},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],n=a("1da1"),o=a("2909"),r=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),l=a("2b0e");l["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?[""].concat(Object(o["a"])(this.groupIdList.map((function(t){return t.id})))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.site=s?[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:s?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,i,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,i=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),s={country:a,mallGroupIds:i},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(s);case 6:n=t.sent,200===n.code?(e.siteList=n.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(o["a"])(e),Object(o["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},p=c,d=(a("8992"),a("2877")),h=Object(d["a"])(p,i,s,!1,null,null,null);e["a"]=h.exports}}]);