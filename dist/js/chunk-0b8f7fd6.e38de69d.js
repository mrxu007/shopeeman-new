(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b8f7fd6"],{"4c28":function(t,e,i){},6246:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticClass:"contaniner"},[i("el-row",{staticClass:"header"},[i("ul",{staticStyle:{"margin-bottom":"10px"}},[i("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),i("li",[i("span",[t._v("统计时间：")]),i("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),i("li",[i("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 85px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[i("el-table-column",{attrs:{label:"序号","min-width":"60px",type:"index",align:"center",fixed:""}}),i("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"220px",prop:"mallname"}}),i("el-table-column",{attrs:{align:"center",prop:"triggered_faq_cnt",label:"被触发的FAQ数","min-width":"220px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.triggered_faq_cnt)}})]}}])}),i("el-table-column",{attrs:{prop:"question_clicks",label:"被点击的FAQ数","min-width":"220px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.question_clicks)}})]}}])}),i("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数","min-width":"220px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.resolved_question_cnt)}})]}}])}),i("el-table-column",{attrs:{prop:"transferred_live_agent_cnt",label:"转实时专员次数","min-width":"220px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.transferred_live_agent_cnt)}})]}}])}),i("el-table-column",{attrs:{prop:"helpful_clicks",label:"有帮助点击数","min-width":"220px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.helpful_clicks)}})]}}])}),i("el-table-column",{attrs:{prop:"unhelpful_clicks",label:"没有帮助点击数","min-width":"220px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.unhelpful_clicks)}})]}}])}),i("el-table-column",{attrs:{prop:"appexisting_visitors",label:"操作","min-width":"150px",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.view(a)}}},[t._v("FAQ问题列表")])]}}])})],1),i("el-dialog",{attrs:{title:"FAQ问题列表",visible:t.eidtVisible,width:"56%"},on:{"update:visible":function(e){t.eidtVisible=e}}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[i("el-table-column",{attrs:{align:"center",label:"FAQ问题",width:"200",prop:"faq_info"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("div",{domProps:{innerHTML:t._s(a.faq_info)}})]}}])}),i("el-table-column",{attrs:{align:"center",prop:"question_clicks",label:"被点击的FAQ",width:"140"}}),i("el-table-column",{attrs:{align:"center",prop:"ctr",label:"点击率",width:"140"}}),i("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数",width:"100",align:"center"}}),i("el-table-column",{attrs:{align:"center",prop:"resolution_rate",label:"解决率",width:"100"}}),i("el-table-column",{attrs:{align:"center",prop:"helpful_clicks",label:"有帮助点击数",width:"130"}}),i("el-table-column",{attrs:{align:"center",prop:"helpful_rate",label:"有帮助率",width:"100"}})],1)],1)],1)],1)},s=[],l=i("1da1"),n=(i("96cf"),i("ac1f"),i("1276"),i("a15b"),i("a9e3"),i("99af"),i("b680"),i("d81d"),i("0e0b")),r=i("feb6"),o={components:{storeChoose:r["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var i=this.$dayjs(this.timechoose).format("YYYY-MM-01"),a=i.split("-")[1];if("12"===a){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),n=a.split("");l[5]=n[0],l[6]=Number(n[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var r=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=r.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var u=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=u.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=m.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3,console.log(this.end_time)}this.timecant=!1}}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,i=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var s,l,n,r,o,c,h,d,u,m,p,f;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},a.prev=1,l=t.mall_alias_name||t.platform_mall_name,n={start_time:i.start_time,end_time:i.end_time,period:i.Statisticaltime,mallId:t.platform_mall_id},console.log("this is my parmas",n),a.next=7,i.$shopeemanService.getfaqassistant(i.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 7:if(r=a.sent,r&&(o=JSON.parse(r)),o.data=JSON.parse(o.data),200!==o.status){a.next=33;break}for(d in c={},c["mallname"]=l,c["triggered_faq_cnt"]=o.data.result.triggered_faq_cnt,c["question_clicks"]=o.data.result.question_clicks,c["resolved_question_cnt"]=o.data.result.resolved_question_cnt,c["transferred_live_agent_cnt"]=o.data.result.transferred_live_agent_cnt,c["helpful_clicks"]=o.data.result.helpful_clicks,c["unhelpful_clicks"]=o.data.result.unhelpful_clicks,i.exportdata.push(c),h={},h["mallname"]=l,o.data.result)u="".concat(d,"_pct_diff"),m="green",o.data.result[u]<0&&(m="red"),"yesterday"===i.Statisticaltime?h["".concat(d)]="<pre style='color:".concat(m,"'>").concat(o.data.result[d],"</pre>")+"<pre style='color:".concat(m,"'>vs 前一天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"):"past7days"===i.Statisticaltime?h["".concat(d)]="<pre style='color:".concat(m,"'>").concat(o.data.result[d],"</pre>")+"<pre style='color:".concat(m,"'>vs 前7天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"):"past30days"===i.Statisticaltime&&(h["".concat(d)]="<pre style='color:".concat(m,"'>").concat(o.data.result[d],"</pre>")+"<pre style='color:".concat(m,"'>vs 前30天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"));return a.next=25,i.$shopeemanService.getfaqassistant1(i.site,n,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 25:if(p=a.sent,p&&(p=JSON.parse(p),p.data=JSON.parse(p.data)),console.log("zhelizhelizheli",p),h["view"]=p.data.result,h["view"])for(f=0;f<h["view"].length;f++)h["view"][f].faq_info="<pre>".concat(h["view"][f].faq_info.faq_type,"</pre><pre>").concat(h["view"][f].faq_info.faq_question,"</pre><pre>更新时间：").concat(i.$dayjs(1e3*h["view"][f].faq_info.update_time).format("YYYY-MM-DD HH:mm:ss"),"</pre>"),h["view"][f].ctr="".concat((100*h["view"][f].ctr).toFixed(2),"%"),h["view"][f].resolution_rate="".concat((100*h["view"][f].resolution_rate).toFixed(2),"%"),h["view"][f].helpful_rate="".concat((100*h["view"][f].helpful_rate).toFixed(2),"%");i.tableData.push(h),a.next=34;break;case 33:403===o.status&&i.errmall.push(l);case 34:a.next=39;break;case 36:a.prev=36,a.t0=a["catch"](1),console.log(a.t0);case 39:return a.prev=39,--s.count,a.finish(39);case 42:case"end":return a.stop()}}),a,null,[[1,36,39,42]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(n["d"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}i='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">被触发的FAQ数</td>\n        <td style="width: 200px; text-align:left;">被点击的FAQ数</td>\n        <td style="width: 200px; text-align:left;">问题解决次数</td>\n        <td style="width: 200px; text-align:left;">转实时专员次数</td>\n        <td style="width: 200px; text-align:left;">有帮助点击数</td>\n        <td style="width: 200px; text-align:left;">没有帮助点击数</td>\n      </tr>',t.exportdata.map((function(t){i+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.triggered_faq_cnt,'</td>\n          <td style="text-align:left;">').concat(t.question_clicks,'</td>\n          <td style="text-align:left;">').concat(t.resolved_question_cnt,'</td>\n          <td style="text-align:left;">').concat(t.transferred_live_agent_cnt,'</td>\n          <td style="text-align:left;">').concat(t.helpful_clicks,'</td>\n          <td style="text-align:left;">').concat(t.unhelpful_clicks,"</td>\n        </tr>\n        ")})),Object(n["k"])("常见问题助手信息",i),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"常见问题助手信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},view:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:e.eidtVisible=!0,e.tableData1=t.view;case 2:case"end":return i.stop()}}),i)})))()}}},c=o,h=(i("a5ca"),i("2877")),d=Object(h["a"])(c,a,s,!1,null,"3f85c836",null);e["default"]=d.exports},8992:function(t,e,i){"use strict";i("4c28")},a5ca:function(t,e,i){"use strict";i("f6d3")},f6d3:function(t,e,i){},feb6:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"storeChooseUL"},[t.isMall?i("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?i("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),i("li",{style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[i("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,a){return i("el-option",{key:a,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),i("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),i("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():i("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeSiteSelect(t.site,!0)}}}),t._l(t.siteShowList,(function(e,a){return t.showMall(e,a)?i("el-option",{key:a,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id},nativeOn:{click:function(e){return t.changeSiteSelect(t.site)}}}):t._e()}))],2)],1),t.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},s=[],l=i("1da1"),n=i("b85c"),r=i("2909"),o=(i("96cf"),i("a9e3"),i("caad"),i("2532"),i("99af"),i("d81d"),i("fb6a"),i("d3b7"),i("6062"),i("3ca3"),i("ddb0"),i("4de4"),i("25f0"),i("7db0"),i("7646")),c=i("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var i=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var h={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.isShowName="",this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},changeSiteSelect:function(t,e){var i=this.isShowName;if(!this.isAShop)if(e)if(t.includes("")){var a=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(r["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),s=new Set([].concat(Object(r["a"])(a),Object(r["a"])(t)));this.site=Object(r["a"])(s),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{var l=[];if(i){var o=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),c=o.length>this.site.length&&this.site||o,h=o.length>this.site.length&&o||this.site;l=new Set(this.site);var d,u=Object(n["a"])(h);try{for(u.s();!(d=u.n()).done;){var m=d.value;c.includes(m)&&l.delete(m)}}catch(p){u.e(p)}finally{u.f()}l.delete("")}this.site=Object(r["a"])(l)}else!t.includes("")&&this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):t.includes("")&&(this.site=t.slice(1));this.changeMallList(),this.filterMall(i)},getMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var a,s,l,n,o,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(console.log("getMallGoodsGetMallList - val",t),1!==t){i.next=10;break}return a=e.countryVal,i.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:s=i.sent,200===s.code?(l=s.data||[],e.allSiteList=l,e.siteList=""===a?l:l.filter((function(t){return t.country===a}))):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(n=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),n.delete(void 0),o=Object(r["a"])(n),c=o.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(r["a"])(c),e.groupId=[""].concat(Object(r["a"])(c.map((function(t){return t.id}))))),i.next=11;break;case 10:e.siteList=e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id))return t}));case 11:e.changeSiteSelect([""],!0);case 12:case"end":return i.stop()}}),i)})))()},changeMallList:function(){var t=this,e=(new Date).getTime(),i=[],a="",s=this.site;if(this.isAShop){var l=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,i.push(l)}else s.length&&""===s[0]&&(s=s.slice(1)),a=s.toString(),i=this.siteList.filter((function(t){return s.includes(t.platform_mall_id)})),console.log(new Date-e);!this.countryVal&&this.groupId.indexOf("")>-1&&(a=i.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:i,groupIdList:this.groupId,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(i["country"]=this.countryVal,this.$emit("changeMallList",i))},filterMall:function(t){var e=this,i=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var i=[];i=t?e.siteList.filter((function(e){var i=e.mall_alias_name||e.platform_mall_name;return i.includes(t)})):e.siteList,e.siteShowList=i}),i)},showMall:function(t,e){var i=t.mall_alias_name||t.platform_mall_name,a=this.site[0]===t.platform_mall_id;return a||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||i.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var i=0;t?(i=this.mallShowIndex+10,i=i<this.siteShowList.length-this.showMallNumber&&i||this.siteShowList.length-this.showMallNumber):(i=this.mallShowIndex-10,i=i>0&&i||0),i!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=i}}}},d=h,u=(i("8992"),i("2877")),m=Object(u["a"])(d,a,s,!1,null,null,null);e["a"]=m.exports}}]);