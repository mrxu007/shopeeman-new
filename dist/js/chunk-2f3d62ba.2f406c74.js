(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f3d62ba"],{"12b4":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px","margin-left":"24px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1)]),a("ul",[a("li",[a("span",[t._v("资料期间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{attrs:{disabled:t.timecant,size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.timechoose,callback:function(e){t.timechoose=e},expression:"timechoose"}})],1),a("li",[a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typelist,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",["shopee"===t.type?a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.categorychooce}},[t._v("shopee类目选择")]):t._e(),"shop"===t.type?a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.b,callback:function(e){t.b=e},expression:"b"}},t._l(t.B,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1):t._e(),a("el-input",{staticStyle:{"margin-left":"10px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')",placeholder:"搜索商品"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")]),t.btcontrol?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.a1}},[t._v("▲选择条件")]):t._e(),t.btcontrol?t._e():a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.a2}},[t._v("▼选择条件")]),a("el-button",{attrs:{type:"primary",disabled:t.Loading2,size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.DerivedData}},[t._v("数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"36px"}},[t._v("访问：")]),a("li",[a("el-checkbox",{model:{value:t.column1,callback:function(e){t.column1=e},expression:"column1"}},[t._v("商品访客数")])],1),a("li",[a("el-checkbox",{model:{value:t.column2,callback:function(e){t.column2=e},expression:"column2"}},[t._v("商品页面访问量")])],1),a("li",[a("el-checkbox",{model:{value:t.column3,callback:function(e){t.column3=e},expression:"column3"}},[t._v("商品跳出率")])],1),a("li",[a("el-checkbox",{model:{value:t.column4,callback:function(e){t.column4=e},expression:"column4"}},[t._v("赞")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",[t._v("加入购物车：")]),a("li",[a("el-checkbox",{model:{value:t.column5,callback:function(e){t.column5=e},expression:"column5"}},[t._v("商品访客数")])],1),a("li",[a("el-checkbox",{model:{value:t.column6,callback:function(e){t.column6=e},expression:"column6"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column7,callback:function(e){t.column7=e},expression:"column7"}},[t._v("转化率（加入购物车）")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"12px"}},[t._v("已下订单：")]),a("li",[a("el-checkbox",{model:{value:t.column8,callback:function(e){t.column8=e},expression:"column8"}},[t._v("买家")])],1),a("li",[a("el-checkbox",{model:{value:t.column9,callback:function(e){t.column9=e},expression:"column9"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column10,callback:function(e){t.column10=e},expression:"column10"}},[t._v("销售额")])],1),a("li",[a("el-checkbox",{model:{value:t.column11,callback:function(e){t.column11=e},expression:"column11"}},[t._v("转化率（访问至下单）")])],1)]):t._e(),t.textcontrol?a("ul",[a("li",{staticStyle:{"margin-left":"12px"}},[t._v("已下订单：")]),a("li",[a("el-checkbox",{model:{value:t.column12,callback:function(e){t.column12=e},expression:"column12"}},[t._v("买家")])],1),a("li",[a("el-checkbox",{model:{value:t.column13,callback:function(e){t.column13=e},expression:"column13"}},[t._v("件数")])],1),a("li",[a("el-checkbox",{model:{value:t.column14,callback:function(e){t.column14=e},expression:"column14"}},[t._v("销售额")])],1),a("li",[a("el-checkbox",{model:{value:t.column15,callback:function(e){t.column15=e},expression:"column15"}},[t._v("转化率（访问至付款）")])],1)]):t._e(),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"140",prop:"mallname"}}),a("el-table-column",{attrs:{align:"center",label:"商品ID",width:"140",prop:"id"}}),t.column1?a("el-table-column",{attrs:{align:"center",prop:"uv",label:"商品访客数【访问】",width:"140"}}):t._e(),t.column2?a("el-table-column",{attrs:{align:"center",prop:"pv",label:"商品页面访问量【访问】",width:"170"}}):t._e(),t.column3?a("el-table-column",{attrs:{prop:"bounce_rate",label:"商品跳出率【访问】",width:"180",align:"center"}}):t._e(),t.column4?a("el-table-column",{attrs:{prop:"likes",label:"赞【访问】",width:"180",align:"center"}}):t._e(),t.column5?a("el-table-column",{attrs:{prop:"add_to_cart_buyers",label:"商品访客数【加入购物车】",width:"170",align:"center"}}):t._e(),t.column6?a("el-table-column",{attrs:{prop:"add_to_cart_units",label:"件数【加入购物车】",width:"180",align:"center"}}):t._e(),t.column7?a("el-table-column",{attrs:{prop:"uv_to_add_to_cart_rate",label:"转换率【加入购物车】",width:"170",align:"center"}}):t._e(),t.column8?a("el-table-column",{attrs:{prop:"placed_buyers",label:"买家【已下订单】",width:"150",align:"center"}}):t._e(),t.column9?a("el-table-column",{attrs:{prop:"placed_units",label:"件数【已下订单】",width:"180",align:"center"}}):t._e(),t.column10?a("el-table-column",{attrs:{prop:"placed_sales",label:"销售额【已下订单】",width:"180",align:"center"}}):t._e(),t.column11?a("el-table-column",{attrs:{prop:"uv_to_placed_buyers_rate",label:"转化率（访问至下单)【已下订单】",width:"220",align:"center"}}):t._e(),t.column12?a("el-table-column",{attrs:{prop:"paid_buyers",label:"买家【已付款订单】",width:"150",align:"center"}}):t._e(),t.column13?a("el-table-column",{attrs:{prop:"paid_units",label:"件数【已付款订单】",width:"180",align:"center"}}):t._e(),t.column14?a("el-table-column",{attrs:{prop:"paid_sales",label:"销售额【已付款订单】",width:"150",align:"center"}}):t._e(),t.column15?a("el-table-column",{attrs:{prop:"uv_to_paid_buyers_rate",label:"转化率（访问至付款)【已付款订单】",width:"240",align:"center"}}):t._e()],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1),a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{country:t.site,"mall-list":t.mallList},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},s=[],l=a("1da1"),n=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),a("d81d"),a("0e0b")),r=a("eb09"),o={components:{categoryMapping:r["a"]},data:function(){return{Loading1:!1,column1:!0,column2:!1,column3:!0,column4:!1,column5:!0,column6:!1,column7:!0,column8:!0,column9:!1,column10:!0,column11:!0,column12:!0,column13:!1,column14:!0,column15:!0,showlog:!1,Loading2:!0,Loading3:!1,timecant:!0,timechoose:new Date,serchload:!1,selectall:!0,selectall1:!0,btcontrol:!0,textcontrol:!1,categoryVisible:!1,keyword:"",categoryid:-1,type:"shopee",exportdata:[],allgroupid:[],allmallid:[],tableData:[],errmall:[],indexs:1,currency:"฿",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),typelist:[{value:"shopee",label:"按shopee分类筛选"},{value:"shop",label:"按商店分类筛选"}],returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"过去7天"},{value:"past30days",label:"过去30天"},{value:"day",label:"按日"},{value:"week",label:"按周"},{value:"month",label:"按月"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var i=0;i<this.mallList.length;i++)t[a]===this.mallList[i].group_id&&this.mall.push(this.mallList[i].value)},keyword:function(t,e){this.categoryid=-1},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 01:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),n=i.split("");l[5]=n[0],l[6]=Number(n[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 11:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var r=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=r.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");u[5]=d[0],u[6]=Number(d[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format("YYYY-MM-DD 00:00:00"))/1e3+604800,this.timecant=!1;else if("month"===t){var m=this.$dayjs(this.timechoose).format("YYYY-MM-01"),h=m.split("-")[1];if("12"===h){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var y=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),_=h.split("");y[5]=_[0],y[6]=Number(_[1])+1,y=y.join(""),this.end_time=Date.parse(this.$dayjs(y).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},timechoose:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 01:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 01:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var a=this.$dayjs(t).format("YYYY-MM-01"),i=a.split("-")[1];if("12"===i){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var s=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split("");s[5]="0",s[6]="1",s=s.join(""),this.end_time=Date.parse(this.$dayjs(s).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(t).format("YYYY-MM-01 01:00:00").split(""),n=i.split("");l[5]=n[0],l[6]=Number(n[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}}}else if("BR"===this.site){if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 11:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 11:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var r=this.$dayjs(t).format("YYYY-MM-01"),o=r.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var c=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 11:00:00"))/1e3;var u=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");u[5]=d[0],u[6]=Number(d[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 11:00:00"))/1e3}}}else if("day"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(t).format("YYYY-MM-DD 00:00:00"))/1e3;else if("week"===this.Statisticaltime)this.start_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Date.parse(this.$dayjs(this.getMonday(t)).format("YYYY-MM-DD 00:00:00"))/1e3+604800;else if("month"===this.Statisticaltime){var m=this.$dayjs(t).format("YYYY-MM-01"),h=m.split("-")[1];if("12"===h){this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var p=this.$dayjs(t).format("YYYY-MM-01 00:00:00").split("");p[5]="0",p[6]="1",p=p.join(""),this.end_time=Date.parse(this.$dayjs(p).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(t).format("YYYY-MM-01 00:00:00"))/1e3;var y=this.$dayjs(t).format("YYYY-MM-01 11:00:00").split(""),_=h.split("");y[5]=_[0],y[6]=Number(_[1])+1,y=y.join(""),this.end_time=Date.parse(this.$dayjs(y).format("YYYY-MM-01 00:00:00"))/1e3}}},site:function(t,e){this.mall=[],this.group=[],this.getInfo(),"MY"===this.site&&(this.currency="RM"),"TW"===this.site&&(this.currency="$"),"VN"===this.site&&(this.currency="₫"),"ID"===this.site&&(this.currency="Rp"),"PH"===this.site&&(this.currency="₱"),"TH"===this.site&&(this.currency="฿"),"SG"===this.site&&(this.currency="$"),"BR"===this.site&&(this.currency="R$"),"MX"===this.site&&(this.currency="MX$"),"CO"===this.site&&(this.currency="$"),"CL"===this.site&&(this.currency="$"),"PL"===this.site&&(this.currency="zł")},Loading3:function(t,e){!0===this.Loading3?this.Loading2=!1:this.Loading2=!0}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,i,s,l,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(i=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===i.data.code){for(i.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),s=0;s<t.gruopList.length-1;s++)for(l=s+1;l<t.gruopList.length;l++)t.gruopList[s].value===t.gruopList[l].value&&t.gruopList.splice(l,1);for(n=0;n<t.gruopList.length;n++)t.allgroupid.push(t.gruopList[n].value);for(r=0;r<t.mallList.length;r++)t.allmallid.push(t.mallList[r].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,i,s,l,n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("day"!==t.Statisticaltime&&"week"!==t.Statisticaltime&&"month"!==t.Statisticaltime){e.next=4;break}if(!(t.timechoose.length<1)){e.next=4;break}return t.$message.error("请选择您需要查看的日期"),e.abrupt("return");case 4:if(!(t.mall.length>0)){e.next=47;break}t.indexs=1,t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.exportdata=[],t.errmall=[],t.$refs.Logs.writeLog("开始查询"),a=0;case 13:if(!(a<t.mall.length)){e.next=41;break}if(!0!==t.serchload){e.next=19;break}return t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),t.serchload=!1,e.abrupt("return");case 19:for(i=void 0,s=0;s<t.mallList.length;s++)t.mallList[s].value===t.mall[a]&&(i=t.mallList[s].label);if(l=void 0,n=void 0,-1!==t.categoryid||""!==t.keyword){e.next=30;break}return l={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,mallId:t.mall[a],sort_by:"placed_units.desc",metric_ids:"all",limit:20,offset:0},e.next=27,t.$shopeemanService.getperformance(t.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 27:n=e.sent,e.next=34;break;case 30:return l={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,mallId:t.mall[a],category_type:t.type,keyword:t.keyword,category:t.categoryid,sort_by:"placed_units.desc",metric_ids:"all",page_size:20,page_num:1},e.next=33,t.$shopeemanService.getperformance1(t.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 33:n=e.sent;case 34:if(r=void 0,n&&(r=JSON.parse(n)),r.data=JSON.parse(r.data),200===r.status)for(o=0;o<r.data.result.items.length;o++)r.data.result.items.length>1&&(r.data.result.items[o]["mallname"]=i,r.data.result.items[o]["index"]=t.indexs,t.indexs++,r.data.result.items[o]["bounce_rate"]=(100*r.data.result.items[o]["bounce_rate"]).toFixed(2)+"%",r.data.result.items[o]["uv_to_add_to_cart_rate"]=(100*r.data.result.items[o]["uv_to_add_to_cart_rate"]).toFixed(2)+"%",r.data.result.items[o]["uv_to_placed_buyers_rate"]=(100*r.data.result.items[o]["uv_to_placed_buyers_rate"]).toFixed(2)+"%",r.data.result.items[o]["uv_to_paid_buyers_rate"]=(100*r.data.result.items[o]["uv_to_paid_buyers_rate"]).toFixed(2)+"%",r.data.result.items[o]["placed_sales"]="".concat(t.currency).concat(r.data.result.items[o]["placed_sales"]),r.data.result.items[o]["paid_sales"]="".concat(t.currency).concat(r.data.result.items[o]["paid_sales"]),t.exportdata.push(r.data.result.items[o]),t.tableData.push(r.data.result.items[o]));else 403===r.status&&(t.$refs.Logs.writeLog("【".concat(i,"】 数据获取失败：店铺未登录"),!1),t.errmall.push(i));case 38:a++,e.next=13;break;case 41:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.$refs.Logs.writeLog("查询结束"),t.Loading3=!1,setTimeout((function(){t.Loading1=!1}),3e3),e.next=48;break;case 47:t.$message({message:"请选择店铺",type:"warning"});case 48:case"end":return e.stop()}}),e)})))()},DerivedData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.exportdata.length){e.next=6;break}a='<tr>\n        <td style="width: 200px; text-align:left;">店铺名称</td>\n        <td style="width: 200px; text-align:left;">商品ID</td>\n        <td style="width: 200px; text-align:left;">商品访客数【访问】</td>\n        <td style="width: 200px; text-align:left;">商品页面访问量【访问】</td>\n        <td style="width: 200px; text-align:left;">商品跳出率【访问】</td>\n        <td style="width: 200px; text-align:left;">赞【访问】</td>\n        <td style="width: 200px; text-align:left;">商品访客数【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">件数【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">转换率【加入购物车】</td>\n        <td style="width: 200px; text-align:left;">买家【已下订单】</td>\n        <td style="width: 200px; text-align:left;">件数【已下订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>\n        <td style="width: 200px; text-align:left;">转化率 (访问至下单)【已下订单】</td>\n        <td style="width: 200px; text-align:left;">买家【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">件数【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>\n        <td style="width: 200px; text-align:left;">转化率 (访问至付款)【已付款订单】</td>\n      </tr>',t.exportdata.map((function(t){a+='\n        <tr>\n          <td style="text-align:left;">'.concat(t.mallname,'</td>\n          <td style="text-align:left;">').concat(t.id,'</td>\n          <td style="text-align:left;">').concat(t.uv,'</td>\n          <td style="text-align:left;">').concat(t.pv,'</td>\n          <td style="text-align:left;">').concat(t.bounce_rate,'</td>\n          <td style="text-align:left;">').concat(t.likes,'</td>\n          <td style="text-align:left;">').concat(t.add_to_cart_buyers,'</td>\n          <td style="text-align:left;">').concat(t.add_to_cart_units,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_add_to_cart_rate,'</td>\n          <td style="text-align:left;">').concat(t.placed_buyers,'</td>\n          <td style="text-align:left;">').concat(t.placed_units,'</td>\n          <td style="text-align:left;">').concat(t.placed_sales,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_placed_buyers_rate,'</td>\n          <td style="text-align:left;">').concat(t.paid_buyers,'</td>\n          <td style="text-align:left;">').concat(t.paid_units,'</td>\n          <td style="text-align:left;">').concat(t.paid_sales,'</td>\n          <td style="text-align:left;">').concat(t.uv_to_paid_buyers_rate,"</td>\n        </tr>\n        ")})),Object(n["i"])("商品表现信息",a),e.next=7;break;case 6:return e.abrupt("return",t.$notify({title:"商品表现信息",type:"warning",message:"没有可以导出的信息"}));case 7:case"end":return e.stop()}}),e)})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},cancel:function(){this.serchload=!0},a1:function(){this.btcontrol=!1,this.textcontrol=!0},a2:function(){this.btcontrol=!0,this.textcontrol=!1},categoryChange:function(t){t&&(this.categoryid=t.categoryList[1].category_id),this.categoryVisible=!1},categorychooce:function(){this.categoryVisible=!0,this.categoryid=-1},getMonday:function(t){var e,a=t.getDay();e=0===a?6:a-1;var i=new Date(t.getTime()-24*e*60*60*1e3);return i.setHours(0),i.setMinutes(0),i.setSeconds(0),i}}},c=o,u=(a("8257"),a("2877")),d=Object(u["a"])(c,i,s,!1,null,"276e80ec",null);e["default"]=d.exports},8257:function(t,e,a){"use strict";a("bd2a")},9772:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},bd2a:function(t,e,a){},eb09:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(i+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[i],i)}},model:{value:t.categoryAction[i],callback:function(e){t.$set(t.categoryAction,i,e)},expression:"categoryAction[index]"}},t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})})),1)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],l=a("1da1"),n=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[]}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,s,l,n,r,o,c,u,d,m,h,p,y,_,f,Y,g,b;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:-1,s=e.country||e.countryOption,!(e.goodsCurrent&&i<0)){a.next=9;break}l=[],[],e.categoryList.forEach((function(t,a){var i=t.find((function(t){return t.category_id===e.categoryAction[a]}));l.push(i)})),e.$emit("categoryChange",{categoryList:l,attributesList:e.attributesList,country:s||e.countryOption}),a.next=47;break;case 9:return i=i<0?0:i,n=e.mallList[i],r=e.categoryAction[e.categoryAction.length-1],o={mallId:n.platform_mall_id,category_ids:r,brand_status:1,cursor:0,limit:100},a.next=15,e.$shopeemanService.getBrandList(s,o,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 15:if(c=a.sent,u=JSON.parse(c),!(u.status>=200&&u.status<=300)){a.next=46;break}if(d=JSON.parse(u.data),0!==d.code){a.next=43;break}return m=d.data&&d.data.list[0]&&d.data.list[0].brand_list,h=[],m.forEach((function(t){h.push({value:t.name,value_id:t.brand_id})})),p=[{category_id:r,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(h),attribute_label:"",is_key_attribute:1}],a.prev=24,a.next=27,e.$shopeemanService.getAttributeTree(s,o,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 27:y=a.sent,_=JSON.parse(y),f=JSON.parse(_.data),Y=f&&f.data&&f.data.list[0]&&f.data.list[0].attribute_tree||[],Y.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),p.push({category_id:r,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=36;break;case 34:a.prev=34,a.t0=a["catch"](24);case 36:return a.prev=36,a.next=39,e.$commodityService.uploadCateGoryAttr(p);case 39:return g=a.sent,b=JSON.parse(g),200===b.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(36);case 43:e.$emit("categoryChange",""),a.next=47;break;case 46:e.confirmCategory(++i);case 47:case"end":return a.stop()}}),a,null,[[24,34,36,43]])})))()},getAttribute:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,i,s,l,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]+"",i=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(i,a);case 4:s=e.sent,l=JSON.parse(s),t.attributesList=[],200===l.code&&(n=l.data&&l.data.attributes,n.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),i=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(i)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,s,l,n,r,o,c,u,d,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:"0",s=t.length>1&&void 0!==t[1]?t[1]:0,l=t.length>2&&void 0!==t[2]?t[2]:null,n=e.country||e.countryOption,0!==s){a.next=12;break}if(e.categoryAction=l&&l.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId){a.next=12;break}return a.next=9,e.$commodityService.getCategoryRelation(e.goodsCurrent.originCategoryId,n,e.goodsCurrent.platform+"");case 9:r=a.sent,o=JSON.parse(r),e.attributesCurrent=o.data&&o.data.attributes||[];case 12:return c=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=15,e.$commodityService.getCategoryTbInfo(n,i);case 15:u=a.sent,d=JSON.parse(u),200===d.code&&(m=d.data,m&&m.categories?(c[s]=m.categories,e.categoryList=c,e.categoryAction[s]=e.categoryAction[s]||c[s][0].category_id,e.enterCategory(e.categoryAction[s]+"",++s)):e.getAttribute());case 18:case"end":return a.stop()}}),a)})))()}}}),r=n,o=(a("b0bd"),a("2877")),c=Object(o["a"])(r,i,s,!1,null,null,null);e["a"]=c.exports}}]);