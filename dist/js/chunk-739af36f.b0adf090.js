(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-739af36f"],{"0c94":function(t,e,a){"use strict";a("1d08")},"1d08":function(t,e,a){},4182:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"160px",prop:"mallname",fixed:""}}),a("el-table-column",{attrs:{align:"center",prop:"apppage_views",label:"App端浏览量","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.apppage_views)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"appavg_page_views",label:"App端平均浏览量","min-width":"160px",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appavg_page_views)}})]}}])}),a("el-table-column",{attrs:{prop:"appavg_stay_time",label:"App端平均浏览时间","min-width":"160px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appavg_stay_time)}})]}}])}),a("el-table-column",{attrs:{prop:"appbounce_rate",label:"App端网页跳出率","min-width":"160px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appbounce_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"appvisitors",label:"App端访客量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appvisitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appnew_visitors",label:"App端新访客量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appnew_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"App端现有访客量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appexisting_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"appnew_followers",label:"App新粉丝量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.appnew_followers)}})]}}])}),a("el-table-column",{attrs:{prop:"pcpage_views",label:"Pc端浏览量","min-width":"130px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcpage_views)}})]}}])}),a("el-table-column",{attrs:{prop:"pcavg_page_views",label:"Pc端平均浏览量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcavg_page_views)}})]}}])}),a("el-table-column",{attrs:{prop:"pcavg_stay_time",label:"Pc端平均浏览时间","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcavg_stay_time)}})]}}])}),a("el-table-column",{attrs:{prop:"pcbounce_rate",label:"Pc端网页跳出率","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcbounce_rate)}})]}}])}),a("el-table-column",{attrs:{prop:"pcvisitors",label:"Pc端访客量","min-width":"130px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcvisitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcnew_visitors",label:"Pc端新访客量","min-width":"130px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcnew_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcexisting_visitors",label:"Pc端现有访客量","min-width":"150px",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcexisting_visitors)}})]}}])}),a("el-table-column",{attrs:{prop:"pcnew_followers",label:"Pc新浏粉丝量","min-width":"130px",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.pcnew_followers)}})]}}])})],1)],1)],1)},s=[],n=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),o=a("feb6"),l={components:{storeChoose:o["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var n=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");n[5]=r[0],n[6]=Number(r[1])+1,n=n.join(""),this.end_time=Date.parse(this.$dayjs(n).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),l=o.split("-")[1];if("12"===l){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=l.split("");p[5]=d[0],p[6]=Number(d[1])+1,p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var h=this.$dayjs(this.timechoose).format("YYYY-MM-01"),f=h.split("-")[1];if("12"===f){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var _=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");_[5]="0",_[6]="1",_=_.join(""),this.end_time=Date.parse(this.$dayjs(_).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),u=f.split("");m[5]=u[0],m[6]=Number(u[1])+1,m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s,n,r,o,l,c,p,d,h,f,_,m,u,g,v,w,Y,y,b,M,x,D,S,j,L,$,k,I;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,n=(new Date).getTime()-864e5,r=a.$dayjs(n).format("YYYYMMDD"),o=t.mall_alias_name||t.platform_mall_name,l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,fetag:"fetag",dt:r},i.next=8,a.$shopeemanService.getFlow(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 8:c=i.sent,c&&(p=JSON.parse(c)),200===p.status?(p.data=JSON.parse(p.data),d=p.data.result.data.pc,h=p.data.result.data.app,f={},f["mallname"]=o,f["apppage_views"]=h.page_views,f["appavg_page_views"]=h.avg_page_views,f["appavg_stay_time"]=h.avg_stay_time,f["appbounce_rate"]=h.bounce_rate,f["appvisitors"]=h.visitors,f["appnew_visitors"]=h.new_visitors,f["appexisting_visitors"]=h.existing_visitors,f["appnew_followers"]=h.new_followers,f["pcpage_views"]=d.page_views,f["pcavg_page_views"]=d.avg_page_views,f["pcavg_stay_time"]=d.avg_stay_time,f["pcbounce_rate"]=d.bounce_rate,f["pcvisitors"]=d.visitors,f["pcnew_visitors"]=d.new_visitors,f["pcexisting_visitors"]=d.existing_visitors,f["pcnew_followers"]=d.new_followers,a.exportdata.push(f),_={},_["mallname"]=o,m="green",u="",h.page_views_pct_diff>=0?u="↑":(u="↓",m="red"),_["apppage_views"]='<pre style="color:'.concat(m,'">').concat(h.page_views,"\n提升率 ").concat(Math.abs(100*h.page_views_pct_diff).toFixed(2),"% ").concat(u,"</pre>"),g="",h.avg_page_views_pct_diff>=0?(m="green",g="↑"):(g="↓",m="red"),_["appavg_page_views"]='<pre style="color:'.concat(m,'">').concat(h.avg_page_views.toFixed(2),"\n提升率 ").concat(Math.abs(100*h.avg_page_views_pct_diff).toFixed(2),"% ").concat(g,"</pre>"),v="",h.avg_stay_time_pct_diff>=0?(m="green",v="↑"):(v="↓",m="red"),_["appavg_stay_time"]='<pre style="color:'.concat(m,'">').concat(h.avg_stay_time,"\n提升率 ").concat(Math.abs(100*h.avg_stay_time_pct_diff).toFixed(2),"% ").concat(v,"</pre>"),w="",h.bounce_rate_pct_diff>=0?(m="green",w="↑"):(w="↓",m="red"),_["appbounce_rate"]='<pre style="color:'.concat(m,'">').concat((100*h.bounce_rate).toFixed(2),"%\n提升率 ").concat(Math.abs(100*h.bounce_rate_pct_diff).toFixed(2),"% ").concat(w,"</pre>"),Y="",h.visitors_pct_diff>=0?(m="green",Y="↑"):(Y="↓",m="red"),_["appvisitors"]='<pre style="color:'.concat(m,'">').concat(h.visitors,"\n提升率 ").concat(Math.abs(100*h.visitors_pct_diff).toFixed(2),"% ").concat(Y,"</pre>"),y="",h.new_visitors_pct_diff>=0?(m="green",y="↑"):(y="↓",m="red"),_["appnew_visitors"]='<pre style="color:'.concat(m,'">').concat(h.new_visitors,"\n提升率 ").concat(Math.abs(100*h.new_visitors_pct_diff).toFixed(2),"% ").concat(y,"</pre>"),b="",h.existing_visitors_pct_diff>=0?(m="green",b="↑"):(b="↓",m="red"),_["appexisting_visitors"]='<pre style="color:'.concat(m,'">').concat(h.existing_visitors,"\n提升率 ").concat(Math.abs(100*h.existing_visitors_pct_diff).toFixed(2),"% ").concat(b,"</pre>"),M="",h.new_followers_pct_diff>=0?(m="green",M="↑"):(M="↓",m="red"),_["appnew_followers"]='<pre style="color:'.concat(m,'">').concat(h.new_followers,"\n提升率 ").concat(Math.abs(100*h.new_followers_pct_diff).toFixed(2),"% ").concat(M,"</pre>"),x="",d.page_views_pct_diff>=0?(m="green",x="↑"):(x="↓",m="red"),_["pcpage_views"]='<pre style="color:'.concat(m,'">').concat(d.page_views,"\n提升率 ").concat(Math.abs(100*d.page_views_pct_diff).toFixed(2),"% ").concat(x,"</pre>"),D="",d.avg_page_views_pct_diff>=0?(m="green",D="↑"):(D="↓",m="red"),_["pcavg_page_views"]='<pre style="color:'.concat(m,'">').concat(d.avg_page_views.toFixed(2),"\n提升率 ").concat(Math.abs(100*d.avg_page_views_pct_diff).toFixed(2),"% ").concat(D,"</pre>"),S="",d.avg_stay_time_pct_diff>=0?(m="green",S="↑"):(S="↓",m="red"),_["pcavg_stay_time"]='<pre style="color:'.concat(m,'">').concat(d.avg_stay_time,"\n提升率 ").concat(Math.abs(100*d.avg_stay_time_pct_diff).toFixed(2),"% ").concat(S,"</pre>"),j="",d.bounce_rate_pct_diff>=0?(m="green",j="↑"):(j="↓",m="red"),_["pcbounce_rate"]='<pre style="color:'.concat(m,'">').concat((100*d.bounce_rate).toFixed(2),"%\n提升率 ").concat(Math.abs(100*d.bounce_rate_pct_diff).toFixed(2),"% ").concat(j,"</pre>"),L="",d.visitors_pct_diff>=0?(m="green",L="↑"):(L="↓",m="red"),_["pcvisitors"]='<pre style="color:'.concat(m,'">').concat(d.visitors,"\n提升率 ").concat(Math.abs(100*d.visitors_pct_diff).toFixed(2),"% ").concat(L,"</pre>"),$="",d.new_visitors_pct_diff>=0?(m="green",$="↑"):($="↓",m="red"),_["pcnew_visitors"]='<pre style="color:'.concat(m,'">').concat(d.new_visitors,"\n提升率 ").concat(Math.abs(100*d.new_visitors_pct_diff).toFixed(2),"% ").concat($,"</pre>"),k="",d.existing_visitors_pct_diff>=0?(m="green",k="↑"):(k="↓",m="red"),_["pcexisting_visitors"]='<pre style="color:'.concat(m,'">').concat(d.existing_visitors,"\n提升率 ").concat(Math.abs(100*d.existing_visitors_pct_diff).toFixed(2),"% ").concat(k,"</pre>"),I="",d.new_followers_pct_diff>=0?(m="green",I="↑"):(I="↓",m="red"),_["pcnew_followers"]='<pre style="color:'.concat(m,'">').concat(d.new_followers,"\n提升率 ").concat(Math.abs(100*d.new_followers_pct_diff).toFixed(2),"% ").concat(I,"</pre>"),a.tableData.push(_)):403===p.status&&(a.errmall.push(o),a.$message.warning("【".concat(t.mall_alias_name||t.platform_mall_name,"】店铺未登录"))),i.next=15;break;case 13:i.prev=13,i.t0=i["catch"](1);case 15:return i.prev=15,--s.count,i.finish(15);case 18:case"end":return i.stop()}}),i,null,[[1,13,15,18]])})))()},getallinfo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=11;break}return t.Loading1=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=7,Object(r["d"])(t.mall,t.getTableData);case 7:t.Loading1=!1,t.Loading3=!1,e.next=12;break;case 11:t.$message.warning("请选择要操作的店铺");case 12:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">App端浏览量</td>\n        <td style="width: 200px; text-align:left;">App端平均浏览量</td>\n        <td style="width: 200px; text-align:left;">App端平均浏览时间</td>\n        <td style="width: 200px; text-align:left;">App端网页跳出率</td>\n        <td style="width: 200px; text-align:left;">App端访客量</td>\n        <td style="width: 200px; text-align:left;">App端新访客量</td>\n        <td style="width: 200px; text-align:left;">App端现有访客量</td>\n        <td style="width: 200px; text-align:left;">App新粉丝量</td>\n        <td style="width: 200px; text-align:left;">Pc端浏览量</td>\n        <td style="width: 200px; text-align:left;">Pc端平均浏览量</td>\n        <td style="width: 200px; text-align:left;">Pc端平均浏览时间</td>\n        <td style="width: 200px; text-align:left;">Pc端网页跳出率</td>\n        <td style="width: 200px; text-align:left;">Pc端访客量</td>\n        <td style="width: 200px; text-align:left;">Pc端新访客量</td>\n        <td style="width: 200px; text-align:left;">Pc端现有访客量</td>\n        <td style="width: 200px; text-align:left;">Pc新粉丝量</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.apppage_views,'</td>\n          <td style="text-align:left;">').concat(t.appavg_page_views.toFixed(2),'</td>\n          <td style="text-align:left;">').concat(t.appavg_stay_time,'</td>\n          <td style="text-align:left;">').concat(100*t.appbounce_rate,'%</td>\n          <td style="text-align:left;">').concat(t.appvisitors,'</td>\n          <td style="text-align:left;">').concat(t.appnew_visitors,'</td>\n          <td style="text-align:left;">').concat(t.appexisting_visitors,'</td>\n          <td style="text-align:left;">').concat(t.appnew_followers,'</td>\n          <td style="text-align:left;">').concat(t.pcpage_views,'</td>\n          <td style="text-align:left;">').concat(t.pcavg_page_views.toFixed(2),'</td>\n          <td style="text-align:left;">').concat(t.pcavg_stay_time,'</td>\n          <td style="text-align:left;">').concat(100*t.pcbounce_rate,'%</td>\n          <td style="text-align:left;">').concat(t.pcvisitors,'</td>\n          <td style="text-align:left;">').concat(t.pcnew_visitors,'</td>\n          <td style="text-align:left;">').concat(t.pcexisting_visitors,'</td>\n          <td style="text-align:left;">').concat(t.pcnew_followers,"</td>\n        </tr>\n        ")})),Object(r["k"])("流量信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"流量信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()}}},c=l,p=(a("0c94"),a("2877")),d=Object(p["a"])(c,i,s,!1,null,"de4a8632",null);e["default"]=d.exports},"4c28":function(t,e,a){},"4f51":function(t,e,a){"use strict";a("50ca")},"50ca":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,i){return a("el-option",{key:i,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},s=[],n=a("1da1"),r=a("2909"),o=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),l={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,o,l,c,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return i=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:s=a.sent,200===s.code?(n=s.data||[],e.isAShop||n.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=n,e.siteList=""===i?n:n.filter((function(t){return(null===t||void 0===t?void 0:t.country)===i||!t.platform_mall_id}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(o=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),o.delete(void 0),l=Object(r["a"])(o),c=l.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(r["a"])(c),e.groupId=[""].concat(Object(r["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:p=[],p=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=p;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,i=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var s=this.siteShowList.map((function(t){return t.platform_mall_id}));if(i.includes(t))i=i.filter((function(t){return!s.includes(t)}));else{var n=new Set([""].concat(Object(r["a"])(i),Object(r["a"])(s)));i=Object(r["a"])(n)}}else i=i.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var o=i.findIndex((function(e){return e===t}));if(o>-1)i.splice(o,1),i.includes("")&&i.splice(0,1);else if(i.push(t),a){var l,c=this.siteShowList.filter((function(t){return i.includes(t.platform_mall_id)}));i.includes("")||(null===(l=this.siteShowList)||void 0===l?void 0:l.length)!==c.length+1||i.unshift("")}else{var p;i.includes("")||(null===(p=this.siteList)||void 0===p?void 0:p.length)!==i.length+1||i.unshift("")}}this.siteId=i}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var i=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(i)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=a.toString();!this.countryVal&&this.groupId.indexOf("")>-1&&(e=t.length!==this.siteList.length&&e||""),this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var i=e.mall_alias_name||e.platform_mall_name;a=i.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=l,p=(a("8992"),a("4f51"),a("2877")),d=Object(p["a"])(c,i,s,!1,null,"5836cb4c",null);e["a"]=d.exports}}]);