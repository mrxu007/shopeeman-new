(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8682ed0a"],{"4c28":function(t,e,a){},"5af3":function(t,e,a){"use strict";a("a1d1")},6246:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"220",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"triggered_faq_cnt",label:"被触发的FAQ数",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.triggered_faq_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"question_clicks",label:"被点击的FAQ数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.question_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.resolved_question_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"transferred_live_agent_cnt",label:"转实时专员次数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.transferred_live_agent_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"helpful_clicks",label:"有帮助点击数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.helpful_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"unhelpful_clicks",label:"没有帮助点击数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.unhelpful_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.view(i)}}},[t._v("FAQ问题列表")])]}}])})],1),a("el-dialog",{attrs:{title:"FAQ问题列表",visible:t.eidtVisible,width:"56%"},on:{"update:visible":function(e){t.eidtVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"FAQ问题",width:"200",prop:"faq_info"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.faq_info)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"question_clicks",label:"被点击的FAQ",width:"140"}}),a("el-table-column",{attrs:{align:"center",prop:"ctr",label:"点击率",width:"140"}}),a("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数",width:"100",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"resolution_rate",label:"解决率",width:"100"}}),a("el-table-column",{attrs:{align:"center",prop:"helpful_clicks",label:"有帮助点击数",width:"130"}}),a("el-table-column",{attrs:{align:"center",prop:"helpful_rate",label:"有帮助率",width:"100"}})],1)],1)],1)],1)},s=[],l=a("1da1"),r=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("99af"),a("b680"),a("d81d"),a("0e0b")),n=a("feb6"),o={data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),h=o.split("");d[5]=h[0],d[6]=Number(h[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var u=this.$dayjs(this.timechoose).format("YYYY-MM-01"),m=u.split("-")[1];if("12"===m){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=m.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}}},components:{storeChoose:n["a"]},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var s,l,r,n,o,c,d,h,u,m,p,f;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,l=t.mall_alias_name||t.platform_mall_name,r={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id},i.next=6,a.$shopeemanService.getfaqassistant(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 6:if(n=i.sent,n&&(o=JSON.parse(n)),o.data=JSON.parse(o.data),200!==o.status){i.next=31;break}for(h in c={},c["mallname"]=l,c["triggered_faq_cnt"]=o.data.result.triggered_faq_cnt,c["question_clicks"]=o.data.result.question_clicks,c["resolved_question_cnt"]=o.data.result.resolved_question_cnt,c["transferred_live_agent_cnt"]=o.data.result.transferred_live_agent_cnt,c["helpful_clicks"]=o.data.result.helpful_clicks,c["unhelpful_clicks"]=o.data.result.unhelpful_clicks,a.exportdata.push(c),d={},d["mallname"]=l,o.data.result)u="".concat(h,"_pct_diff"),m="green",o.data.result[u]<0&&(m="red"),"yesterday"===a.Statisticaltime?d["".concat(h)]="<pre style='color:".concat(m,"'>").concat(o.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前一天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"):"past7days"===a.Statisticaltime?d["".concat(h)]="<pre style='color:".concat(m,"'>").concat(o.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前7天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"):"past30days"===a.Statisticaltime&&(d["".concat(h)]="<pre style='color:".concat(m,"'>").concat(o.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前30天  ").concat((100*o.data.result[u]).toFixed(2),"%</pre>"));return i.next=24,a.$shopeemanService.getfaqassistant1(a.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 24:if(p=i.sent,p&&(p=JSON.parse(p),p.data=JSON.parse(p.data)),d["view"]=p.data.result,d["view"])for(f=0;f<d["view"].length;f++)d["view"][f].faq_info="<pre>".concat(d["view"][f].faq_info.faq_type,"</pre><pre>").concat(d["view"][f].faq_info.faq_question,"</pre><pre>更新时间：").concat(a.$dayjs(1e3*d["view"][f].faq_info.update_time).format("YYYY-MM-DD HH:mm:ss"),"</pre>"),d["view"][f].ctr="".concat((100*d["view"][f].ctr).toFixed(2),"%"),d["view"][f].resolution_rate="".concat((100*d["view"][f].resolution_rate).toFixed(2),"%"),d["view"][f].helpful_rate="".concat((100*d["view"][f].helpful_rate).toFixed(2),"%");a.tableData.push(d),i.next=32;break;case 31:403===o.status&&a.errmall.push(l);case 32:i.next=36;break;case 34:i.prev=34,i.t0=i["catch"](1);case 36:return i.prev=36,--s.count,i.finish(36);case 39:case"end":return i.stop()}}),i,null,[[1,34,36,39]])})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=12;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],e.next=8,Object(r["c"])(t.mall,t.getTableData);case 8:t.Loading1=!1,t.Loading3=!1,e.next=13;break;case 12:t.$message.warning("请选择店铺！");case 13:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">被触发的FAQ数</td>\n        <td style="width: 200px; text-align:left;">被点击的FAQ数</td>\n        <td style="width: 200px; text-align:left;">问题解决次数</td>\n        <td style="width: 200px; text-align:left;">转实时专员次数</td>\n        <td style="width: 200px; text-align:left;">有帮助点击数</td>\n        <td style="width: 200px; text-align:left;">没有帮助点击数</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.triggered_faq_cnt,'</td>\n          <td style="text-align:left;">').concat(t.question_clicks,'</td>\n          <td style="text-align:left;">').concat(t.resolved_question_cnt,'</td>\n          <td style="text-align:left;">').concat(t.transferred_live_agent_cnt,'</td>\n          <td style="text-align:left;">').concat(t.helpful_clicks,'</td>\n          <td style="text-align:left;">').concat(t.unhelpful_clicks,"</td>\n        </tr>\n        ")})),Object(r["i"])("常见问题助手信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"常见问题助手信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},view:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.eidtVisible=!0,e.tableData1=t.view;case 2:case"end":return a.stop()}}),a)})))()}}},c=o,d=(a("5af3"),a("2877")),h=Object(d["a"])(c,i,s,!1,null,"01299677",null);e["default"]=h.exports},8992:function(t,e,a){"use strict";a("4c28")},a1d1:function(t,e,a){},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],l=a("1da1"),r=a("2909"),n=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),o=a("2b0e");o["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new n["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?[""].concat(Object(r["a"])(this.groupIdList.map((function(t){return t.id})))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.site=s?[""].concat(Object(r["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:s?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,i=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),s={country:a,mallGroupIds:i},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(s);case 6:l=t.sent,200===l.code?(e.siteList=l.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(r["a"])(e),Object(r["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=c,h=(a("8992"),a("2877")),u=Object(h["a"])(d,i,s,!1,null,null,null);e["a"]=u.exports}}]);