(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c96296d2"],{"3e66":function(t,e,a){"use strict";a("fd04")},7558:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},on:{change:t.getsite},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),t.showMall?a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1):t._e()])])},n=[],i=a("1da1"),s=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),r={name:"Storechoosemall",props:{showMall:{type:Boolean,default:!1},spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var l=e.indexOf("")>-1,n=t.indexOf("")>-1;l!==n?n?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:n?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var l=e.indexOf("")>-1,n=t.indexOf("")>-1;l!==n?n?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}))}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{getsite:function(t){var e=t;this.$emit("getSite",e)},changeSelect:function(t){return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,l,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,l=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),n={country:a,mallGroupIds:l},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 6:i=t.sent,200===i.code?(e.siteList=i.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[];this.site.forEach((function(a){if(a){var l=t.siteList.filter((function(t){return t.platform_mall_id===a}));e.push(l[0])}})),this.source?(e["country"]=this.countryVal,this.$emit("changeMallList",{mallList:e,source:this.source})):(e["country"]=this.countryVal,this.$emit("changeMallList",e))}}},o=r,c=(a("3e66"),a("2877")),u=Object(c["a"])(o,l,n,!1,null,null,null);e["a"]=u.exports},efa0:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail",staticStyle:{padding:"10px"}},[a("div",{staticClass:"condition",staticStyle:{display:"flex"}},[a("Storechoosemall",{staticStyle:{"margin-left":"-20px"},attrs:{"show-mall":!0},on:{changeMallList:t.changeMallList,getSite:t.changeSite}}),a("el-button",{attrs:{type:"primary",size:"mini",loading:t.isStart},on:{click:t.startCompare}},[t._v("开始同步")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.cancerCompare}},[t._v("取消同步")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.closelogData}},[t._v("清空日志")]),a("el-checkbox",{staticStyle:{margin:"4px"},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1),a("div",{staticStyle:{color:"red",margin:"10px 0px"}},[t._v("温馨提示：此功能为同步虾皮后台已删除商品至云端")]),a("div",{staticClass:"tableDes"},[a("el-table",{attrs:{height:"calc(100vh - 70px)",data:t.tableList,"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{prop:"country",label:"站点",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t._f("chineseSite")(a.country)))]}}])}),a("el-table-column",{attrs:{prop:"",label:"店铺名称",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name?a.mall_alias_name:a.platform_mall_name))]}}])}),a("el-table-column",{attrs:{prop:"totalGoods",label:"虾皮商品总数",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"getGoods",label:"已获取虾皮商品数量",align:"center","min-width":"100px",fixed:"right"}})],1),a("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)])},n=[],i=a("2909"),s=a("1da1"),r=(a("99af"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("a9e3"),a("96cf"),a("7558")),o=a("e1e4"),c=a("0e0b"),u={components:{Storechoosemall:r["a"]},data:function(){return{nextTime:null,firstTime:null,isStart:!1,dataRuning:!1,loading:!1,showlog:!0,tableList:[],query:{country:"TH",mallGroupIds:[]},GoodsManagerAPIInstance:new o["a"](this),selectMall:[],mallTimeList:[]}},created:function(){},methods:{closelogData:function(){this.$refs.autoReplyLogs.consoleMsg=""},cancerCompare:function(){this.dataRuning=!0,Object(c["v"])(),this.$refs.autoReplyLogs.writeLog("已取消同步")},startCompare:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.closelogData(),t.isStart=!0,t.showlog=!1,t.dataRuning=!1,e.next=6,t.getinfo();case 6:return e.next=8,Object(c["c"])(t.tableList,t.comparefun);case 8:t.isStart=!1;case 9:case"end":return e.stop()}}),e)})))()},comparefun:function(t){var e=arguments,a=this;return Object(s["a"])(regeneratorRuntime.mark((function l(){var n,s,r,o,c,u,p,m,d,f,g,h,_;return regeneratorRuntime.wrap((function(l){while(1)switch(l.prev=l.next){case 0:n=e.length>1&&void 0!==e[1]?e[1]:{count:1},l.prev=1,s={country:a.query.country,page_number:1,mallId:t.platform_mall_id,page_size:48},r=2,o=1;case 5:if(!(o<=r)){l.next=58;break}return s.page_number=o,a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正在获取虾皮商品数据..."),!0),l.next=10,a.GoodsManagerAPIInstance.getSkuList(s);case 10:if(c=l.sent,!a.dataRuning){l.next=13;break}return l.abrupt("break",58);case 13:if(0!==c.ecode){l.next=51;break}if(p=c.data.page_info.total,m=c.data.page_info.page_size,r=p/m===0?p/m:Math.floor(p/m)+1,a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】商品总数").concat(c.data.page_info.total,"个"),!0),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正获取第【").concat(o,"】页数据,一页").concat(s.page_size,"个"),!0),d=c.data.list,(u=t.plantDate).push.apply(u,Object(i["a"])(d)),a.$set(t,"totalGoods",p),a.$set(t,"getGoods",t.plantDate.length),!a.dataRuning){l.next=25;break}return l.abrupt("break",58);case 25:if(o!==r){l.next=49;break}if(a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】虾皮商品数据获取完毕，开始获取服务端商品数据"),!0),!a.dataRuning){l.next=29;break}return l.abrupt("break",58);case 29:return f=t.id,l.prev=30,l.next=33,a.$commodityService.getMallAllRecordList(f.toString());case 33:if(g=l.sent,h=JSON.parse(g),200!==h.code){l.next=41;break}if(_=function(){var e=h.data.info;a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】虾皮商品数据获取完毕，服务端商品【").concat(e.length,"】个"),!0),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】虾皮商品数据获取完毕，服务端商品数据获取完毕"),!0);var l=[];if(e.forEach((function(e){var a=t.plantDate.findIndex((function(t){return Number(t.id)===Number(e.listing_id)}));a<0&&l.push({sysmallId:e.listing_id})})),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】开始同步商品数据"),!0),a.dataRuning)return"break";if(0===l.length)return a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】同步完成"),!0),"break";Math.floor(l.length/100)}(),"break"!==_){l.next=39;break}return l.abrupt("break",58);case 39:l.next=43;break;case 41:return a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】虾皮商品数据获取完毕，服务端商品数据获取失败"),!1),l.abrupt("break",58);case 43:l.next=49;break;case 45:return l.prev=45,l.t0=l["catch"](30),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】店铺,数据捕获异常，").concat(l.t0),!1),l.abrupt("continue",55);case 49:l.next=55;break;case 51:return a.$set(t,"totalGoods",0),a.$set(t,"getGoods",0),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】同步失败，发生异常：店铺未登录,请重新登录"),!1),l.abrupt("break",58);case 55:o++,l.next=5;break;case 58:l.next=63;break;case 60:l.prev=60,l.t1=l["catch"](1),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】同步失败，发生异常：").concat(l.t1),!1);case 63:return l.prev=63,n.count--,l.finish(63);case 66:case"end":return l.stop()}}),l,null,[[1,60,63,66],[30,45]])})))()},getinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.tableList=[],t.selectMall.forEach((function(e){e.plantDate=[],t.tableList.push(e)}));case 2:case"end":return e.stop()}}),e)})))()},changeMallList:function(t){this.selectMall=t},changeSite:function(t){this.query.country=t}}},p=u,m=a("2877"),d=Object(m["a"])(p,l,n,!1,null,null,null);e["default"]=d.exports},fd04:function(t,e,a){}}]);