(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7700e5f6"],{"12b4":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}})],1),a("ul",[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typelist,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",["shopee"===t.type?a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.categorychooce}},[t._v("shopee类目选择")]):t._e(),"shop"===t.type?a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.b,callback:function(e){t.b=e},expression:"b"}},t._l(t.B,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1):t._e(),a("el-input",{staticStyle:{"margin-left":"10px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')",placeholder:"搜索商品"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),t.btcontrol?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.a1}},[t._v("▲选择条件")]):t._e(),t.btcontrol?t._e():a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.a2}},[t._v("▼选择条件")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"36px"}},[t._v("访问：")]),a("li",[a("el-checkbox",{model:{value:t.column1,callback:function(e){t.column1=e},expression:"column1"}},[t._v("商品访客数")])],1),a("li",[a("el-checkbox",{model:{value:t.column2,callback:function(e){t.column2=e},expression:"column2"}},[t._v("商品页面访问量")])],1),a("li",[a("el-checkbox",{model:{value:t.column3,callback:function(e){t.column3=e},expression:"column3"}},[t._v("商品跳出率")])],1),a("li",[a("el-checkbox",{model:{value:t.column4,callback:function(e){t.column4=e},expression:"column4"}},[t._v("赞")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",[t._v("加入购物车：")]),a("li",[a("el-checkbox",{model:{value:t.column5,callback:function(e){t.column5=e},expression:"column5"}},[t._v("商品访客数")])],1),a("li",[a("el-checkbox",{model:{value:t.column6,callback:function(e){t.column6=e},expression:"column6"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column7,callback:function(e){t.column7=e},expression:"column7"}},[t._v("转化率（加入购物车）")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"12px"}},[t._v("已下订单：")]),a("li",[a("el-checkbox",{model:{value:t.column8,callback:function(e){t.column8=e},expression:"column8"}},[t._v("买家")])],1),a("li",[a("el-checkbox",{model:{value:t.column9,callback:function(e){t.column9=e},expression:"column9"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column10,callback:function(e){t.column10=e},expression:"column10"}},[t._v("销售额")])],1),a("li",[a("el-checkbox",{model:{value:t.column11,callback:function(e){t.column11=e},expression:"column11"}},[t._v("转化率（访问至下单）")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"12px"}},[t._v("已下订单：")]),a("li",[a("el-checkbox",{model:{value:t.column12,callback:function(e){t.column12=e},expression:"column12"}},[t._v("买家")])],1),a("li",[a("el-checkbox",{model:{value:t.column13,callback:function(e){t.column13=e},expression:"column13"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column14,callback:function(e){t.column14=e},expression:"column14"}},[t._v("销售额")])],1),a("li",[a("el-checkbox",{model:{value:t.column15,callback:function(e){t.column15=e},expression:"column15"}},[t._v("转化率（访问至付款）")])],1)]):t._e(),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"140",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",label:"商品ID",width:"140",prop:"id"}}),t.column1?a("el-table-column",{attrs:{align:"center",prop:"uv",label:"商品访客数【访问】",width:"140"}}):t._e(),t.column2?a("el-table-column",{attrs:{align:"center",prop:"pv",label:"商品页面访问量【访问】",width:"170"}}):t._e(),t.column3?a("el-table-column",{attrs:{prop:"bounce_rate",label:"商品跳出率【访问】",width:"180",align:"center"}}):t._e(),t.column4?a("el-table-column",{attrs:{prop:"likes",label:"赞【访问】",width:"180",align:"center"}}):t._e(),t.column5?a("el-table-column",{attrs:{prop:"add_to_cart_buyers",label:"商品访客数【加入购物车】",width:"170",align:"center"}}):t._e(),t.column6?a("el-table-column",{attrs:{prop:"add_to_cart_units",label:"件数【加入购物车】",width:"180",align:"center"}}):t._e(),t.column7?a("el-table-column",{attrs:{prop:"uv_to_add_to_cart_rate",label:"转换率【加入购物车】",width:"170",align:"center"}}):t._e(),t.column8?a("el-table-column",{attrs:{prop:"placed_buyers",label:"买家【已下订单】",width:"150",align:"center"}}):t._e(),t.column9?a("el-table-column",{attrs:{prop:"placed_units",label:"件数【已下订单】",width:"180",align:"center"}}):t._e(),t.column10?a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"180",align:"center"}}):t._e(),t.column11?a("el-table-column",{attrs:{prop:"uv_to_placed_buyers_rate",label:"转化率（访问至下单)【已下订单】",width:"220",align:"center"}}):t._e(),t.column12?a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家【已付款订单】",width:"150",align:"center"}}):t._e(),t.column13?a("el-table-column",{attrs:{prop:"paid_units",label:"件数【已付款订单】",width:"180",align:"center"}}):t._e(),t.column14?a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"150",align:"center"}}):t._e(),t.column15?a("el-table-column",{attrs:{prop:"uv_to_paid_buyers_rate",label:"转化率（访问至付款)【已付款订单】",width:"240",align:"center"}}):t._e()],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1),a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{country:t.site,"mall-list":t.mallList},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},s=[],n=a("1da1"),l=(a("96cf"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("b680"),a("99af"),a("d81d"),a("0e0b")),o=a("eb09"),r=a("feb6"),c={components:{categoryMapping:o["a"],storeChoose:r["a"]},data:function(){return{Loading1:!1,column1:!0,column2:!1,column3:!0,column4:!1,column5:!0,column6:!1,column7:!0,column8:!0,column9:!1,column10:!0,column11:!0,column12:!0,column13:!1,column14:!0,column15:!0,showlog:!0,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,btcontrol:!0,textcontrol:!1,categoryVisible:!1,keyword:"",categoryid:-1,type:"shopee",exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,currency:"฿",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),typelist:[{value:"shopee",label:"按shopee分类筛选"},{value:"shop",label:"按商店分类筛选"}],returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{keyword:function(t,e){this.categoryid=-1},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var n=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),l=i.split("");n[5]=l[0],n[6]=Number(l[1])+1,n=n.join(""),this.end_time=Date.parse(this.$dayjs(n).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var o=this.$dayjs(this.timechoose).format("YYYY-MM-01"),r=o.split("-")[1];if("12"===r){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),u=r.split("");d[5]=u[0],d[6]=Number(u[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),h=m.split("-")[1];if("12"===h){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),_=h.split("");f[5]=_[0],f[6]=Number(_[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var n=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),l=i.split("");n[5]=l[0],n[6]=Number(l[1])+1,n=n.join(""),this.end_time=Date.parse(this.$dayjs(n).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var o=this.$dayjs(t).format("YYYY-MM-01"),r=o.split("-")[1];if("12"===r){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var d=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),u=r.split("");d[5]=u[0],d[6]=Number(u[1])+1,d=d.join(""),this.end_time=Date.parse(this.$dayjs(d).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),h=m.split("-")[1];if("12"===h){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var f=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),_=h.split("");f[5]=_[0],f[6]=Number(_[1])+1,f=f.join(""),this.end_time=Date.parse(this.$dayjs(f).format("YYYY-MM-01 00:00:00"))/1e3}}},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s,n,l,o,r,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(s=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,n=t.mall_alias_name||t.platform_mall_name,!0!==a.serchload){i.next=8;break}return a.Loading3=!1,setTimeout((function(){a.Loading1=!1}),3e3),a.serchload=!1,i.abrupt("return");case 8:if(-1!==a.categoryid||""!==a.keyword){i.next=15;break}return l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,sort_by:"placed_units.desc",metric_ids:"all",limit:20,offset:0},i.next=12,a.$shopeemanService.getperformance(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:o=i.sent,i.next=19;break;case 15:return l={start_time:a.start_time,end_time:a.end_time,period:a.Statisticaltime,mallId:t.platform_mall_id,category_type:a.type,keyword:a.keyword,category:a.categoryid,sort_by:"placed_units.desc",metric_ids:"all",page_size:20,page_num:1},i.next=18,a.$shopeemanService.getperformance1(a.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 18:o=i.sent;case 19:if(o&&(r=JSON.parse(o)),r.data=JSON.parse(r.data),200===r.status)for(c=0;c<r.data.result.items.length;c++)r.data.result.items.length>1&&(r.data.result.items[c]["mallname"]=n,r.data.result.items[c]["index"]=a.indexs,a.indexs++,r.data.result.items[c]["bounce_rate"]=(100*r.data.result.items[c]["bounce_rate"]).toFixed(2)+"%",r.data.result.items[c]["uv_to_add_to_cart_rate"]=(100*r.data.result.items[c]["uv_to_add_to_cart_rate"]).toFixed(2)+"%",r.data.result.items[c]["uv_to_placed_buyers_rate"]=(100*r.data.result.items[c]["uv_to_placed_buyers_rate"]).toFixed(2)+"%",r.data.result.items[c]["uv_to_paid_buyers_rate"]=(100*r.data.result.items[c]["uv_to_paid_buyers_rate"]).toFixed(2)+"%",r.data.result.items[c]["placed_sales"]="".concat(a.currency).concat(r.data.result.items[c]["placed_sales"]),r.data.result.items[c]["paid_sales"]="".concat(a.currency).concat(r.data.result.items[c]["paid_sales"]),a.exportdata.push(r.data.result.items[c]),a.tableData.push(r.data.result.items[c]));else 403===r.status&&(a.$refs.Logs.writeLog("【".concat(n,"】 数据获取失败：店铺未登录"),!1),a.errmall.push(n));i.next=26;break;case 24:i.prev=24,i.t0=i["catch"](1);case 26:return i.prev=26,--s.count,i.finish(26);case 29:case"end":return i.stop()}}),i,null,[[1,24,26,29]])})))()},getallinfo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=19;break}return t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),e.next=14,Object(l["c"])(t.mall,t.getTableData);case 14:t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=20;break;case 19:t.$message({message:"请选择店铺",type:"warning"});case 20:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">商品ID</td>\n        <td style="width: 200px; text-align:left;">商品访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">商品页面访问量【访问】</td>\n        <td style="width: 200px; text-align:left;">商品跳出率【访问】</td>\n        <td style="width: 200px; text-align:left;">赞【访问】</td>\n        <td style="width: 200px; text-align:left;">商品访客数【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">件数【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">转换率【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">买家【已下订单】</td>\n        <td style="width: 200px; text-align:left;">件数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">转化率 (访问至下单)【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">件数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">转化率 (访问至付款)【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.id,'</td>\n          <td style="text-align:left;">').concat(t.uv,'</td>\n          <td style="text-align:left;">').concat(t.pv,'</td>\n          <td style="text-align:left;">').concat(t.bounce_rate,'</td>\n          <td style="text-align:left;">').concat(t.likes,'</td>\n          <td style="text-align:left;">').concat(t.add_to_cart_buyers,'</td>\n          <td style="text-align:left;">').concat(t.add_to_cart_units,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_add_to_cart_rate,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_units,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_placed_buyers_rate,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_units,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_paid_buyers_rate,"</td>\n        </tr>\n        ")})),Object(l["i"])("商品表现信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"商品表现信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},a1:function(){this.btcontrol=!1,this.textcontrol=!0},a2:function(){this.btcontrol=!0,this.textcontrol=!1},categoryChange:function(t){t&&(this.categoryid=t.categoryList[1].category_id),this.categoryVisible=!1},categorychooce:function(){this.categoryVisible=!0,this.categoryid=-1},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var i=new Date(t.getTime()-24*e*60*60*1e3);return i.setHours(0),i.setMinutes(0),i.setSeconds(0),i}}},d=c,u=(a("67ba"),a("2877")),m=Object(u["a"])(d,i,s,!1,null,"1cc46aff",null);e["default"]=m.exports},"4c28":function(t,e,a){},"67ba":function(t,e,a){"use strict";a("907e")},8992:function(t,e,a){"use strict";a("4c28")},"907e":function(t,e,a){},9772:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},eb09:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp contaniner"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(i+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[i],i)}},model:{value:t.categoryAction[i],callback:function(e){t.$set(t.categoryAction,i,e)},expression:"categoryAction[index]"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],n=a("1da1"),l=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[]}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,l,o,r,c,d,u,m,h,p,f,_,y,g,Y,b;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:-1,s=e.country||e.countryOption,!(e.goodsCurrent&&i<0)){a.next=8;break}n=[],e.categoryList.forEach((function(t,a){var i=t.find((function(t){return t.category_id===e.categoryAction[a]}));i&&n.push(i)})),e.$emit("categoryChange",{categoryList:n,attributesList:e.attributesList,country:s||e.countryOption}),a.next=46;break;case 8:return i=i<0?0:i,l=e.mallList[i],o=e.categoryAction[e.categoryAction.length-1],r={mallId:l.platform_mall_id,category_ids:o,brand_status:1,cursor:0,limit:100},a.next=14,e.$shopeemanService.getBrandList(s,r,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 14:if(c=a.sent,d=JSON.parse(c),!(d.status>=200&&d.status<=300)){a.next=45;break}if(u=JSON.parse(d.data),0!==u.code){a.next=42;break}return m=u.data&&u.data.list[0]&&u.data.list[0].brand_list,h=[],m.forEach((function(t){h.push({value:t.name,value_id:t.brand_id})})),p=[{category_id:o,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(h),attribute_label:"",is_key_attribute:1}],a.prev=23,a.next=26,e.$shopeemanService.getAttributeTree(s,r,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 26:f=a.sent,_=JSON.parse(f),y=JSON.parse(_.data),g=y&&y.data&&y.data.list[0]&&y.data.list[0].attribute_tree||[],g.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),p.push({category_id:o,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=35;break;case 33:a.prev=33,a.t0=a["catch"](23);case 35:return a.prev=35,a.next=38,e.$commodityService.uploadCateGoryAttr(p);case 38:return Y=a.sent,b=JSON.parse(Y),200===b.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(35);case 42:e.$emit("categoryChange",""),a.next=46;break;case 45:e.confirmCategory(++i);case 46:case"end":return a.stop()}}),a,null,[[23,33,35,42]])})))()},getAttribute:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,s,n,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",i=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(i,a);case 4:s=e.sent,n=JSON.parse(s),t.attributesList=[],200===n.code&&(l=n.data&&n.data.attributes||[],l.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),i=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(i)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,l,o,r,c,d,u,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:"0",s=t.length>1&&void 0!==t[1]?t[1]:0,n=t.length>2&&void 0!==t[2]?t[2]:null,l=e.country||e.countryOption,0!==s){a.next=12;break}if(e.categoryAction=n&&n.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId){a.next=12;break}return a.next=9,e.$commodityService.getCategoryRelation(e.goodsCurrent.originCategoryId,l,e.goodsCurrent.platform+"");case 9:o=a.sent,r=JSON.parse(o),e.attributesCurrent=r.data&&r.data.attributes||[];case 12:if(!i){a.next=21;break}return c=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=16,e.$commodityService.getCategoryTbInfo(l,i);case 16:d=a.sent,u=JSON.parse(d),200===u.code&&(m=u.data,m&&m.categories?(c[s]=m.categories,e.categoryList=c,e.categoryAction[s]=e.categoryAction[s]||c[s][0].category_id,e.enterCategory(e.categoryAction[s]+"",++s)):e.getAttribute()),a.next=22;break;case 21:e.getAttribute(!0);case 22:case"end":return a.stop()}}),a)})))()}}}),o=l,r=(a("b0bd"),a("2877")),c=Object(r["a"])(o,i,s,!1,null,null,null);e["a"]=c.exports},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],n=a("1da1"),l=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),r=a("2b0e");r["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?[""].concat(Object(l["a"])(this.groupIdList.map((function(t){return t.id})))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.site=s?[""].concat(Object(l["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:s?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,i,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,i=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),s={country:a,mallGroupIds:i},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(s);case 6:n=t.sent,200===n.code?(e.siteList=n.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(l["a"])(e),Object(l["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=c,u=(a("8992"),a("2877")),m=Object(u["a"])(d,i,s,!1,null,null,null);e["a"]=m.exports}}]);