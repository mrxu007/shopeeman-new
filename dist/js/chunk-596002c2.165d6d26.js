(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-596002c2"],{3797:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1)]),a("ul",[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"240",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",prop:"shop_uv",label:"访客数【访问】",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.shop_uv)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"placed_buyers",label:"买家数【已下订单】",width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.placed_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家数【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_buyers)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales)}})]}}])}),a("el-table-column",{attrs:{prop:"paid_sales_per_buyer",label:"每位买家的销售额【已付款订单】",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.paid_sales_per_buyer)}})]}}])})],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)],1)],1)},i=[],r=a("1da1"),l=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),a("7039"),a("d81d"),a("0e0b")),o={data:function(){return{Loading1:!1,showlog:!1,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,currency:"฿",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var s=0;s<this.mallList.length;s++)t[a]===this.mallList[s].group_id&&this.mall.push(this.mallList[s].value)},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=n.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),Y=m.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=Y.split("");u[5]=f[0],u[6]=Number(f[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var r=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),l=s.split("");r[5]=l[0],r[6]=Number(l[1])+1,r=r.join(""),this.end_time=Date.parse(this.$dayjs(r).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var o=this.$dayjs(t).format("YYYY-MM-01"),n=o.split("-")[1];if("12"===n){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),d=n.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),Y=m.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),f=Y.split("");u[5]=f[0],u[6]=Number(f[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}}},site:function(t,e){this.mall=[],this.group=[],this.getInfo(),"MY"===this.site&&(this.currency="RM"),"TW"===this.site&&(this.currency="$"),"VN"===this.site&&(this.currency="₫"),"ID"===this.site&&(this.currency="Rp"),"PH"===this.site&&(this.currency="₱"),"TH"===this.site&&(this.currency="฿"),"SG"===this.site&&(this.currency="$"),"BR"===this.site&&(this.currency="R$"),"MX"===this.site&&(this.currency="MX$"),"CO"===this.site&&(this.currency="$"),"CL"===this.site&&(this.currency="$"),"PL"===this.site&&(this.currency="zł")},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,i,r,l,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(s=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===s.data.code){for(s.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),i=0;i<t.gruopList.length-1;i++)for(r=i+1;r<t.gruopList.length;r++)t.gruopList[i].value===t.gruopList[r].value&&t.gruopList.splice(r,1);for(l=0;l<t.gruopList.length;l++)t.allgroupid.push(t.gruopList[l].value);for(o=0;o<t.mallList.length;o++)t.allmallid.push(t.mallList[o].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,i,r,l,o,n,c,h,d,m,Y,p,u,f,y,M,D;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=38;break}t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),a=0;case 13:if(!(a<t.mall.length)){e.next=32;break}if(!0!==t.serchload){e.next=19;break}return t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),t.serchload=!1,e.abrupt("return");case 19:for(s=void 0,i=0;i<t.mallList.length;i++)t.mallList[i].value===t.mall[a]&&(s=t.mallList[i].label);return r={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,mallId:t.mall[a]},e.next=24,t.$shopeemanService.getsalasoverview(t.site,r,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 24:if(l=e.sent,o=void 0,l&&(o=JSON.parse(l)),o.data=JSON.parse(o.data),200===o.status){for(c in n={},o.data.result)n["mallname"]=s,n["".concat(c)]="placed_sales"===c||"paid_sales"===c||"paid_sales_per_buyer"===c?"".concat(t.currency).concat(o.data.result[c].value):o.data.result[c].value;if(t.exportdata.push(n),h={},d="",h["mallname"]=s,h["index"]=t.indexs,t.indexs++,"real_time"===t.Statisticaltime)for(m in d="vs 00:00-17:00 昨天 ",o.data.result)Y="green",o.data.result[m].ratio<0&&(Y="red"),h["".concat(m)]="placed_sales"===m||"paid_sales"===m||"paid_sales_per_buyer"===m?"<pre style='color:".concat(Y,"'>").concat(t.currency).concat(o.data.result[m].value,"</pre><pre style='color:").concat(Y,"'>").concat(d).concat((100*Number(o.data.result[m].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(Y,"'>").concat(o.data.result[m].value,"</pre><pre style='color:").concat(Y,"'>").concat(d).concat((100*Number(o.data.result[m].ratio)).toFixed(2),"%</pre>");if("yesterday"===t.Statisticaltime||"day"===t.Statisticaltime)for(p in d="vs 前一天 ",o.data.result)u="green",o.data.result[p].ratio<0&&(u="red"),h["".concat(p)]="placed_sales"===p||"paid_sales"===p||"paid_sales_per_buyer"===p?"<pre style='color:".concat(u,"'>").concat(t.currency).concat(o.data.result[p].value,"</pre><pre style='color:").concat(u,"'>").concat(d).concat((100*Number(o.data.result[p].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(u,"'>").concat(o.data.result[p].value,"</pre><pre style='color:").concat(u,"'>").concat(d).concat((100*Number(o.data.result[p].ratio)).toFixed(2),"%</pre>");if("past7days"===t.Statisticaltime||"week"===t.Statisticaltime)for(f in d="vs 前7天 ",o.data.result)y="green",o.data.result[f].ratio<0&&(y="red"),h["".concat(f)]="placed_sales"===f||"paid_sales"===f||"paid_sales_per_buyer"===f?"<pre style='color:".concat(y,"'>").concat(t.currency).concat(o.data.result[f].value,"</pre><pre style='color:").concat(y,"'>").concat(d).concat((100*Number(o.data.result[f].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(y,"'>").concat(o.data.result[f].value,"</pre><pre style='color:").concat(y,"'>").concat(d).concat((100*Number(o.data.result[f].ratio)).toFixed(2),"%</pre>");if("past30days"===t.Statisticaltime||"month"===t.Statisticaltime)for(M in d="vs 前30天 ",o.data.result)D="green",o.data.result[M].ratio<0&&(D="red"),h["".concat(M)]="placed_sales"===M||"paid_sales"===M||"paid_sales_per_buyer"===M?"<pre style='color:".concat(D,"'>").concat(t.currency).concat(o.data.result[M].value,"</pre><pre style='color:").concat(D,"'>").concat(d).concat((100*Number(o.data.result[M].ratio)).toFixed(2),"%</pre>"):"<pre style='color:".concat(D,"'>").concat(o.data.result[M].value,"</pre><pre style='color:").concat(D,"'>").concat(d).concat((100*Number(o.data.result[M].ratio)).toFixed(2),"%</pre>");Object.getOwnPropertyNames(h).length>8&&t.tableData.push(h)}else 403===o.status&&(t.$refs.Logs.writeLog("【".concat(s,"】 数据获取失败：店铺未登录"),!1),t.errmall.push(s));case 29:a++,e.next=13;break;case 32:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=39;break;case 38:t.$message({message:"请选择店铺",type:"warning"});case 39:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">买家数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">每位买家的销售额【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.shop_uv,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales_per_buyer,"</td>\n        </tr>\n        ")})),Object(l["i"])("销售额概述信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"销售额概述信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var s=new Date(t.getTime()-24*e*60*60*1e3);return s.setHours(0),s.setMinutes(0),s.setSeconds(0),s}}},n=o,c=(a("9cfb"),a("2877")),h=Object(c["a"])(n,s,i,!1,null,"ddecee9e",null);e["default"]=h.exports},"9cfb":function(t,e,a){"use strict";a("b3a1")},b3a1:function(t,e,a){}}]);