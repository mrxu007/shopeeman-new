(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c96296d2"],{"3e66":function(t,e,a){"use strict";a("fd04")},7558:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},on:{change:t.getsite},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),t.showMall?a("li",[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}})}))],2)],1):t._e()])])},r=[],l=a("1da1"),s=(a("96cf"),a("159b"),a("fb6a"),a("d3b7"),a("25f0"),a("c740"),a("4de4"),a("7646")),n={name:"Storechoosemall",props:{showMall:{type:Boolean,default:!1},spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],countries:this.$filters.countries_option,mallListAPIInstance:new s["a"](this)}},watch:{countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var o=e.indexOf("")>-1,r=t.indexOf("")>-1;o!==r?r?(this.groupId=[""],this.groupIdList.forEach((function(t){a.groupId.push(t.id)}))):this.groupId=[]:r?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var o=e.indexOf("")>-1,r=t.indexOf("")>-1;o!==r?r?(this.site=[""],this.siteList.forEach((function(t){a.site.push(t.platform_mall_id)}))):this.site=[]:r?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}))}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{getsite:function(t){var e=t;this.$emit("getSite",e)},changeSelect:function(t){return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t);case 1:case"end":return e.stop()}}),e)})))()},ddMallGoodsGetMallList:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,o,r,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,o=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),r={country:a,mallGroupIds:o},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 6:l=t.sent,200===l.code?(console.log(l.data),e.siteList=l.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[];this.site.forEach((function(a){if(a){var o=t.siteList.filter((function(t){return t.platform_mall_id===a}));e.push(o[0])}})),this.source?(e["country"]=this.countryVal,this.$emit("changeMallList",{mallList:e,source:this.source})):(e["country"]=this.countryVal,this.$emit("changeMallList",e))}}},i=n,c=(a("3e66"),a("2877")),u=Object(c["a"])(i,o,r,!1,null,null,null);e["a"]=u.exports},efa0:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail",staticStyle:{padding:"10px"}},[a("div",{staticClass:"condition",staticStyle:{display:"flex"}},[a("Storechoosemall",{staticStyle:{"margin-left":"-20px"},attrs:{"show-mall":!0},on:{changeMallList:t.changeMallList,getSite:t.changeSite}}),a("el-button",{attrs:{type:"primary",size:"mini",loading:t.isStart},on:{click:t.startCompare}},[t._v("开始同步")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.cancerCompare}},[t._v("取消同步")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.closelogData}},[t._v("清空日志")]),a("el-checkbox",{staticStyle:{margin:"4px"},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1),a("div",{staticStyle:{color:"red",margin:"10px 0px"}},[t._v("温馨提示：此功能为同步虾皮后台已删除商品至云端")]),a("div",{staticClass:"tableDes"},[a("el-table",{attrs:{height:"calc(100vh - 70px)",data:t.tableList,"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center",fixed:""}}),a("el-table-column",{attrs:{prop:"country",label:"站点",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t._f("chineseSite")(a.country)))]}}])}),a("el-table-column",{attrs:{prop:"",label:"店铺名称",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name?a.mall_alias_name:a.platform_mall_name))]}}])}),a("el-table-column",{attrs:{prop:"totalGoods",label:"虾皮商品总数",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.totalGoods?a.totalGoods:"--"))]}}])}),a("el-table-column",{attrs:{prop:"getGoods",label:"已获取虾皮商品数量",align:"center","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.getGoods?a.getGoods:"--"))]}}])}),a("el-table-column",{attrs:{prop:"endstatus",label:"同步状态",align:"center","min-width":"120px",fixed:"right"}})],1),a("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1)])},r=[],l=a("ade3"),s=a("1da1"),n=(a("96cf"),a("ac1f"),a("1276"),a("a9e3"),a("c740"),a("99af"),a("d3b7"),a("25f0"),a("159b"),a("a434"),a("c4e3"),a("7558")),i=a("e1e4"),c=a("0e0b"),u={components:{Storechoosemall:n["a"]},data:function(){return{platformData:{},nextTime:null,firstTime:null,isStart:!1,dataRuning:!1,showlog:!0,tableList:[],query:{country:"TH",mallGroupIds:[]},GoodsManagerAPIInstance:new i["a"](this),selectMall:[],mallTimeList:[]}},created:function(){},methods:{decryptShopeeItemSku:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var o,r,l,s,n,i,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,o=/^[+-]?\d*[.]?\d*$/,!(t.length<30)){a.next=10;break}return a.next=5,e.$userInfo.user_create_time;case 5:r=a.sent,r&&(l=new Date(r).getTime(),s=new Date("2018-12-20 00:00:00").getTime(),l>s&&(e.platformData["platform"]=5,e.platformData["productId"]=t)),t.indexOf("_")>-1?(n=t.split("_"),o.test(n[0])&&o.test(n[1])?(i=Number(n[1]),1===i||2===i||3===i||5===i||6===i||7===i||8===i?(e.platformData["platform"]=i,e.platformData["productId"]=n[0]):(e.platformData["platform"]=5,e.platformData["productId"]=t)):(e.platformData["platform"]=5,e.platformData["productId"]=t)):o.test(t)?(e.platformData["platform"]=1,e.platformData["productId"]=t):(e.platformData["platform"]=5,e.platformData["productId"]=t),a.next=14;break;case 10:return a.next=12,e.$BaseUtilService.decGoodCode(t);case 12:c=a.sent,c.indexOf("-")>-1?(u=c.split("-"),e.getPlatformSimpleStr(u[0],u)):(e.platformData["platform"]=5,e.platformData["productId"]=t);case 14:a.next=19;break;case 16:a.prev=16,a.t0=a["catch"](0),console.log("解密异常",a.t0);case 19:case"end":return a.stop()}}),a,null,[[0,16]])})))()},getPlatformSimpleStr:function(t,e){try{var a=e[1];"pdd"===t.toLocaleLowerCase()?(this.platformData["platform"]=1,this.platformData["productId"]=a):"tb"===t.toLocaleLowerCase()||"tm"===t.toLocaleLowerCase()?(this.platformData["platform"]=2,this.platformData["productId"]=a):"tb"===t.toLocaleLowerCase()?(this.platformData["platform"]=3,this.platformData["productId"]=a):"own"===t.toLocaleLowerCase()?(this.platformData["platform"]=5,this.platformData["productId"]=a):"ghpt"===t.toLocaleLowerCase()?(this.platformData["platform"]=6,this.platformData["productId"]=a):"alibaba"===t.toLocaleLowerCase()?(this.platformData["platform"]=8,this.platformData["productId"]=a):"hyj"===t.toLocaleLowerCase()||"hlb"===t.toLocaleLowerCase()?(this.platformData["platform"]=7,this.platformData["productId"]=a,this.platformData["site"]=e[2],this.platformData["shopId"]=e[3]):"shopee"===t.toLocaleLowerCase()?(this.platformData["platform"]=11,this.platformData["productId"]=a,this.platformData["site"]=e[2],this.platformData["shopId"]=e[3]):"aliexpress"===t.toLocaleLowerCase()?(this.platformData["platform"]=12,this.platformData["productId"]=a):"lazada"===t.toLocaleLowerCase()?(this.platformData["platform"]=9,this.platformData["productId"]=a,this.platformData["site"]=e[2]):"hyjhw"===t.toLocaleLowerCase()?(this.platformData["platform"]=15,this.platformData["productId"]=a,this.platformData["site"]=e[2]):"jx"===t.toLocaleLowerCase()?(this.platformData["platform"]=10,this.platformData["productId"]=a,this.platformData["site"]=e[2]):"crossbroder"===t.toLocaleLowerCase()&&(this.platformData["platform"]=13,this.platformData["productId"]=a,this.platformData["userId"]=e.Length>2?e[2]:"")}catch(o){console.log("匹配上家异常",o)}},closelogData:function(){this.$refs.autoReplyLogs.consoleMsg=""},add0:function(t){return t<10?"0"+t:t},formatTime:function(t){var e=new Date(t),a=e.getFullYear(),o=e.getMonth()+1,r=e.getDate(),l=e.getHours(),s=e.getMinutes(),n=e.getSeconds();return a+"-"+this.add0(o)+"-"+this.add0(r)+" "+this.add0(l)+":"+this.add0(s)+":"+this.add0(n)},cancerCompare:function(){this.dataRuning=!0,Object(c["B"])(),this.$refs.autoReplyLogs.writeLog("正在取消同步---------")},startCompare:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.closelogData(),t.isStart=!0,t.showlog=!1,t.dataRuning=!1,e.next=6,t.getinfo();case 6:return e.next=8,Object(c["d"])(t.tableList,t.comparefun);case 8:t.$refs.autoReplyLogs.writeLog("数据请求结束---------"),t.isStart=!1;case 10:case"end":return e.stop()}}),e)})))()},comparefun:function(t){var e=arguments,a=this;return Object(s["a"])(regeneratorRuntime.mark((function o(){var r,s,n,i,c,u,p,m,f,d,g,h,_,L,b,w,x,y,I,v,D;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(r=e.length>1&&void 0!==e[1]?e[1]:{count:1},o.prev=1,s={country:a.query.country,page_number:1,mallId:t.platform_mall_id,page_size:48},!a.dataRuning){o.next=5;break}return o.abrupt("return");case 5:return a.$set(t,"totalGoods",0),a.$set(t,"getGoods",0),a.$set(t,"endstatus",""),n=[],o.next=11,a.GoodsManagerAPIInstance.getSkuList(s);case 11:if(i=o.sent,0===i.ecode){o.next=16;break}return a.$set(t,"endstatus","店铺未登录"),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】平台数据：店铺未登录"),!1),o.abrupt("return");case 16:return a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正在获取平台数据")),c=t.mall_alias_name||t.platform_mall_name,o.next=20,a.$appConfig.temporaryCacheInfo("get","mallTimeList","");case 20:if(u=o.sent,p=JSON.parse(u),!p.length){o.next=38;break}if(m=p.findIndex((function(t){return t.mallName===c})),!(m>=0)){o.next=34;break}if(!(p[m].nextTime>(new Date).getTime())){o.next=31;break}return a.$set(t,"endstatus","同步时间未到,下次时间：".concat(a.formatTime(p[m].nextTime))),a.$refs.autoReplyLogs.writeLog("【店铺：".concat(c,"】每4小时可进行一次同步，下次同步时间为【").concat(a.formatTime(p[m].nextTime),"】"),!0),o.abrupt("return");case 31:p[m].nextTime=(new Date).getTime()+144e5;case 32:o.next=36;break;case 34:f={mallName:c,firstTime:(new Date).getTime(),nextTime:(new Date).getTime()+144e5},p.push(f);case 36:o.next=40;break;case 38:d={mallName:c,firstTime:(new Date).getTime(),nextTime:(new Date).getTime()+144e5},p=[d];case 40:if(a.$appConfig.temporaryCacheInfo("save","mallTimeList",p),g=0===i.ecode?i.data.list:[],h=i.data.page_info.total,h){o.next=47;break}return a.$set(t,"endstatus","平台无数据"),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】平台暂无商品"),!0),o.abrupt("return");case 47:console.log("277",g),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】平台商品总数").concat(h,"个"),!0);case 49:if(!g.length){o.next=75;break}if(!a.dataRuning){o.next=52;break}return o.abrupt("return");case 52:a.$set(t,"totalGoods",h),a.$set(t,"getGoods",Number(t.getGoods)+g.length),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正获取第【").concat(s.page_number,"】页数据,一页").concat(s.page_size,"个"),!0),_=0;case 56:if(!(_<g.length)){o.next=64;break}return L=g[_],o.next=60,a.decryptShopeeItemSku(L.parent_sku);case 60:"5"!==a.platformData.platform&&a.platformData.productId&&n.push({homeID:a.platformData.productId,gID:L.id});case 61:_++,o.next=56;break;case 64:if(!(g.length<48)){o.next=68;break}g=[],o.next=73;break;case 68:return s.page_number++,o.next=71,a.GoodsManagerAPIInstance.getSkuList(s);case 71:b=o.sent,g=0===b.ecode?b.data.list:[];case 73:o.next=49;break;case 75:return console.log("300",n),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】平台数据获取结束")),w=[],a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正在获取服务端数据")),o.next=81,a.$commodityService.getMallAllRecordList(t.id.toString());case 81:if(x=o.sent,200!==JSON.parse(x).code){o.next=94;break}if(w=200===JSON.parse(x).code?JSON.parse(x).data.info:[],console.log("307",w),!w.length){o.next=89;break}a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端商品总数").concat(w.length,"个"),!0),o.next=92;break;case 89:return a.$set(t,"endstatus","服务端无数据"),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端商品暂无商品信息"),!0),o.abrupt("return");case 92:o.next=96;break;case 94:return a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端商品数据：").concat(JSON.parse(x).msg),!1),o.abrupt("return");case 96:if(a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端数据获取结束")),y=[],w.forEach((function(t){var e=n.findIndex((function(e){return Number(e.homeID)===Number(t.item_sku)}));e<0&&y.push(Object(l["a"])({},t.sys_mall_id.toString(),t.item_sku))})),I=y.splice(0,100),console.log("delL",I),I.length){o.next=105;break}return a.$set(t,"endstatus","已是同步状态"),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】无需删除，已是同步状态"),!0),o.abrupt("return");case 105:if(!I.length){o.next=127;break}if(!a.dataRuning){o.next=108;break}return o.abrupt("return");case 108:return console.log("delCloudItems - params",I),o.next=111,a.$commodityService.delCloudItems(JSON.stringify(I));case 111:if(v=o.sent,console.log("delCloudItems",v),D=JSON.parse(v),200!==D.code){o.next=121;break}a.$set(t,"endstatus","同步成功，同步成功数：".concat(I.length)),a.$refs.autoReplyLogs.writeLog("-----------",!0),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端已删除【").concat(I.length,"】个商品"),!0),a.$refs.autoReplyLogs.writeLog("-----------",!0),o.next=124;break;case 121:return a.$set(t,"endstatus","同步失败"),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】服务端删除失败，").concat(D.msg),!1),o.abrupt("return");case 124:I=y.length<100?[]:y.splice(0,100),o.next=105;break;case 127:a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】同步完成")),o.next=133;break;case 130:o.prev=130,o.t0=o["catch"](1),a.$refs.autoReplyLogs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】同步失败，发生异常：").concat(o.t0),!1);case 133:return o.prev=133,r.count--,o.finish(133);case 136:case"end":return o.stop()}}),o,null,[[1,130,133,136]])})))()},getinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.tableList=[],t.selectMall.forEach((function(e){e.plantDate=[],t.tableList.push(e)}));case 2:case"end":return e.stop()}}),e)})))()},changeMallList:function(t){this.selectMall=t},changeSite:function(t){this.query.country=t}}},p=u,m=a("2877"),f=Object(m["a"])(p,o,r,!1,null,null,null);e["default"]=f.exports},fd04:function(t,e,a){}}]);