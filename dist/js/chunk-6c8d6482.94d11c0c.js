(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c8d6482"],{"429b":function(t,e,a){"use strict";a("b27e")},6246:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.DerivedData}},[t._v("导出")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"220",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"triggered_faq_cnt",label:"被触发的FAQ数",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.triggered_faq_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"question_clicks",label:"被点击的FAQ数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.question_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.resolved_question_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"transferred_live_agent_cnt",label:"转实时专员次数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.transferred_live_agent_cnt)}})]}}])}),a("el-table-column",{attrs:{prop:"helpful_clicks",label:"有帮助点击数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.helpful_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"unhelpful_clicks",label:"没有帮助点击数",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.unhelpful_clicks)}})]}}])}),a("el-table-column",{attrs:{prop:"appexisting_visitors",label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.view(i)}}},[t._v("FAQ问题列表")])]}}])})],1),a("el-dialog",{attrs:{title:"FAQ问题列表",visible:t.eidtVisible,width:"56%"},on:{"update:visible":function(e){t.eidtVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",data:t.tableData1,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"FAQ问题",width:"200",prop:"faq_info"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{domProps:{innerHTML:t._s(i.faq_info)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"question_clicks",label:"被点击的FAQ",width:"140"}}),a("el-table-column",{attrs:{align:"center",prop:"ctr",label:"点击率",width:"140"}}),a("el-table-column",{attrs:{prop:"resolved_question_cnt",label:"问题解决次数",width:"100",align:"center"}}),a("el-table-column",{attrs:{align:"center",prop:"resolution_rate",label:"解决率",width:"100"}}),a("el-table-column",{attrs:{align:"center",prop:"helpful_clicks",label:"有帮助点击数",width:"130"}}),a("el-table-column",{attrs:{align:"center",prop:"helpful_rate",label:"有帮助率",width:"100"}})],1)],1)],1)],1)},s=[],l=a("1da1"),r=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),a("d81d"),a("0e0b")),n={data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,eidtVisible:!1,exportdata:[],allgroupid:[],allmallid:[],tableData:[],tableData1:[],errmall:[],currency:"฿",total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,end_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var i=0;i<this.mallList.length;i++)t[a]===this.mallList[i].group_id&&this.mall.push(this.mallList[i].value)},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=i.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),p=m.split("-")[1];if("12"===p){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");u[5]="0",u[6]="1",u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),Y=p.split("");f[5]=Y[0],f[6]=Number(Y[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},site:function(t,e){this.mall=[],this.group=[],this.getInfo(),"MY"===this.site&&(this.currency="RM"),"TW"===this.site&&(this.currency="$"),"VN"===this.site&&(this.currency="₫"),"ID"===this.site&&(this.currency="Rp"),"PH"===this.site&&(this.currency="₱"),"TH"===this.site&&(this.currency="฿"),"SG"===this.site&&(this.currency="$"),"BR"===this.site&&(this.currency="R$"),"MX"===this.site&&(this.currency="MX$"),"CO"===this.site&&(this.currency="$"),"CL"===this.site&&(this.currency="$"),"PL"===this.site&&(this.currency="zł")}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,i,s,l,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(i=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===i.data.code){for(i.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),s=0;s<t.gruopList.length-1;s++)for(l=s+1;l<t.gruopList.length;l++)t.gruopList[s].value===t.gruopList[l].value&&t.gruopList.splice(l,1);for(r=0;r<t.gruopList.length;r++)t.allgroupid.push(t.gruopList[r].value);for(n=0;n<t.mallList.length;n++)t.allmallid.push(t.mallList[n].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,i,s,l,r,n,o,c,h,d,m,p,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=48;break}t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],a=0;case 7:if(!(a<t.mall.length)){e.next=43;break}return i={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,mallId:t.mall[a]},e.next=11,t.$shopeemanService.getfaqassistant(t.site,i,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 11:for(s=e.sent,l=void 0,s&&(l=JSON.parse(s)),l.data=JSON.parse(l.data),r=void 0,n=0;n<t.mallList.length;n++)t.mallList[n].value===t.mall[a]&&(r=t.mallList[n].label);if(200!==l.status){e.next=39;break}for(h in o={},o["mallname"]=r,o["triggered_faq_cnt"]=l.data.result.triggered_faq_cnt,o["question_clicks"]=l.data.result.question_clicks,o["resolved_question_cnt"]=l.data.result.resolved_question_cnt,o["transferred_live_agent_cnt"]=l.data.result.transferred_live_agent_cnt,o["helpful_clicks"]=l.data.result.helpful_clicks,o["unhelpful_clicks"]=l.data.result.unhelpful_clicks,t.exportdata.push(o),c={},c["mallname"]=r,l.data.result)d="".concat(h,"_pct_diff"),m="green",l.data.result[d]<0&&(m="red"),"yesterday"===t.Statisticaltime?c["".concat(h)]="<pre style='color:".concat(m,"'>").concat(l.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前一天  ").concat((100*l.data.result[d]).toFixed(2),"%</pre>"):"past7days"===t.Statisticaltime?c["".concat(h)]="<pre style='color:".concat(m,"'>").concat(l.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前7天  ").concat((100*l.data.result[d]).toFixed(2),"%</pre>"):"past30days"===t.Statisticaltime&&(c["".concat(h)]="<pre style='color:".concat(m,"'>").concat(l.data.result[h],"</pre>")+"<pre style='color:".concat(m,"'>vs 前30天  ").concat((100*l.data.result[d]).toFixed(2),"%</pre>"));return e.next=32,t.$shopeemanService.getfaqassistant1(t.site,i,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 32:if(p=e.sent,p&&(p=JSON.parse(p),p.data=JSON.parse(p.data)),c["view"]=p.data.result,c["view"])for(u=0;u<c["view"].length;u++)c["view"][u].faq_info="<pre>".concat(c["view"][u].faq_info.faq_type,"</pre><pre>").concat(c["view"][u].faq_info.faq_question,"</pre><pre>更新时间：").concat(t.$dayjs(1e3*c["view"][u].faq_info.update_time).format("YYYY-MM-DD HH:mm:ss"),"</pre>"),c["view"][u].ctr="".concat((100*c["view"][u].ctr).toFixed(2),"%"),c["view"][u].resolution_rate="".concat((100*c["view"][u].resolution_rate).toFixed(2),"%"),c["view"][u].helpful_rate="".concat((100*c["view"][u].helpful_rate).toFixed(2),"%");t.tableData.push(c),e.next=40;break;case 39:403===l.status&&t.errmall.push(r);case 40:a++,e.next=7;break;case 43:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1,e.next=49;break;case 48:t.$message.warning("请选择店铺！");case 49:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">被触发的FAQ数</td>\n        <td style="width: 200px; text-align:left;">被点击的FAQ数</td>\n        <td style="width: 200px; text-align:left;">问题解决次数</td>\n        <td style="width: 200px; text-align:left;">转实时专员次数</td>\n        <td style="width: 200px; text-align:left;">有帮助点击数</td>\n        <td style="width: 200px; text-align:left;">没有帮助点击数</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.triggered_faq_cnt,'</td>\n          <td style="text-align:left;">').concat(t.question_clicks,'</td>\n          <td style="text-align:left;">').concat(t.resolved_question_cnt,'</td>\n          <td style="text-align:left;">').concat(t.transferred_live_agent_cnt,'</td>\n          <td style="text-align:left;">').concat(t.helpful_clicks,'</td>\n          <td style="text-align:left;">').concat(t.unhelpful_clicks,"</td>\n        </tr>\n        ")})),Object(r["i"])("常见问题助手信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"常见问题助手信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},view:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.eidtVisible=!0,e.tableData1=t.view;case 2:case"end":return a.stop()}}),a)})))()}}},o=n,c=(a("429b"),a("2877")),h=Object(c["a"])(o,i,s,!1,null,"bfbfd740",null);e["default"]=h.exports},b27e:function(t,e,a){}}]);