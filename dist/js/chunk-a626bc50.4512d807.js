(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a626bc50"],{"2f6f":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("1da1"),r=a("d4ec"),s=a("bee2"),i=(a("96cf"),a("99af"),a("b0c0"),function(){function e(t){Object(r["a"])(this,e),this._this=t}return Object(s["a"])(e,[{key:"productSelector",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["offset"]=0,a["limit"]=100,a["need_brand"]=0,a["need_item_model"]=0,a["is_ads"]=0,t.sort_by&&(a["sort_by"]=t.sort_by),t.id&&(a["search_content"]=t.id,a["search_type"]=1),a["mallId"]=t.platform_mall_id,e.prev=9,e.next=12,this._this.$shopeemanService.getChinese(t.country,"/api/marketing/v3/public/product_selector/?",a);case 12:if(n=e.sent,r=this.isJsonString(this.isJsonString(n).data),"success"!==r.message){e.next=16;break}return e.abrupt("return",{code:200,data:r.data.item_list});case 16:if(r){e.next=18;break}return e.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 18:return e.abrupt("return",{code:201,data:"".concat(r.errcode," ").concat(r.message.indexOf("token not found")>-1?"未登录，请登录后再查询":r.message)});case 21:return e.prev=21,e.t0=e["catch"](9),e.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(e.t0)});case 24:case"end":return e.stop()}}),e,this,[[9,21]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGraphql",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,s,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={variables:{}},a["query"]="query Products($productIds: [String], $statusType: Int) {\n        products(productIds: $productIds, statusType: $statusType) {\n      items {\n        itemid,\n        name,\n        images,\n        sold,\n        price,\n      }\n    }\n      }",a["variables"]["productIds"]=t.item_id_list,a["variables"]["statusType"]=0,a["mallId"]=t.platform_mall_id,e.prev=5,e.next=8,this._this.$shopeemanService.postChineseReferer(t.country,"/api/marketing/v4/graphql/query/?",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 8:if(s=e.sent,i=this.isJsonString(this.isJsonString(s).data),o=null===i||void 0===i||null===(n=i.data)||void 0===n||null===(r=n.products)||void 0===r?void 0:r.items,!(o.length>0)){e.next=13;break}return e.abrupt("return",{code:200,data:o});case 13:if(i){e.next=15;break}return e.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 15:return e.abrupt("return",{code:201,data:"".concat(i.errcode," ").concat(i.message.indexOf("token not found")>-1?"未登录，请登录后再查询":i.message)});case 18:return e.prev=18,e.t0=e["catch"](5),e.abrupt("return",{code:-2,data:"getGraphql-error ".concat(e.t0)});case 21:case"end":return e.stop()}}),e,this,[[5,18]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"markeHotSalePlan",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,a){var n,r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n={},r="",e.t0=a,e.next="postChineseReferer"===e.t0?5:"deleteChinese"===e.t0?9:"putChinese"===e.t0?12:18;break;case 5:return n["item_id_list"]=t.item_id_list,n["name"]=t.name,r="portal/marketing/hotsale/new",e.abrupt("break",18);case 9:return n["plan_id"]=t.plan_id,r="portal/marketing/hotsale",e.abrupt("break",18);case 12:return n["plan_id"]=t.plan_id,n["name"]=t.name,n["status"]=t.status,n["item_id_list"]=t.item_id_list,r="portal/marketing/hotsale",e.abrupt("break",18);case 18:return n["mallId"]=t.platform_mall_id,e.prev=19,e.next=22,this._this.$shopeemanService[a](t.country,"/api/marketing/v4/hot_sale/plan/",n,{headers:{"Content-Type":"application/json",referer:r}});case 22:if(s=e.sent,i=this.isJsonString(this.isJsonString(s).data),"success"!==i.message){e.next=26;break}return e.abrupt("return",{code:200,data:i.data});case 26:if(i){e.next=28;break}return e.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 28:return e.abrupt("return",{code:201,data:"".concat(i.errcode||i.code," ").concat(i.message&&i.message.indexOf("token not found")>-1?"未登录，请登录后再查询":i.message)});case 31:return e.prev=31,e.t1=e["catch"](19),e.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(e.t1)});case 34:case"end":return e.stop()}}),e,this,[[19,31]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"markeHotSalePlanList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={},a["mallId"]=t.platform_mall_id,e.prev=2,e.next=5,this._this.$shopeemanService.getChineseReferer(t.country,"/api/marketing/v4/hot_sale/plan/list/?",a,{headers:{"Content-Type":"application/json",referer:"/portal/marketing/hotsale"}});case 5:if(n=e.sent,r=this.isJsonString(this.isJsonString(n).data),"success"!==r.message){e.next=9;break}return e.abrupt("return",{code:200,data:r.data});case 9:if(r){e.next=11;break}return e.abrupt("return",{code:-1,data:"店铺登录失败，请检查代理"});case 11:return e.abrupt("return",{code:201,data:"".concat(r.errcode," ").concat(r.message&&r.message.indexOf("token not found")>-1?"未登录，请登录后再查询":r.message)});case 14:return e.prev=14,e.t0=e["catch"](2),e.abrupt("return",{code:-2,data:"getHotSalePlanList-error ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[2,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isJsonString",value:function(e){if("string"!==typeof e)return e;try{return JSON.parse(e),JSON.parse(e)}catch(t){return e}}}]),e}())},"4c28":function(e,t,a){},"53ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function n(e){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}},"858b":function(e,t,a){},8992:function(e,t,a){"use strict";a("4c28")},c68c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"batch-chat"},[a("div",{staticClass:"select-box"},[a("div",{staticClass:"select-mall"},[a("storeChoose",{attrs:{"is-all":!0,"span-width":"80px","select-width":"180px",source:"orderCenter"},on:{changeMallList:e.changeMallList}}),e.btnLoading?a("el-button",{staticClass:"mar-left",attrs:{type:"primary",size:"mini"},on:{click:function(t){e.isStop=!0}}},[e._v("停 止")]):a("el-button",{staticClass:"mar-left",attrs:{type:"primary",size:"mini"},on:{click:e.chatStart}},[e._v("开 始")]),a("el-button",{staticClass:"mar-left",attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清空日志")]),a("el-checkbox",{staticClass:"mar-left",model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")])],1),a("div",{staticClass:"chat-set-box"},[a("div",{staticClass:"base-box left-box"},[a("span",{staticClass:"base-title"},[e._v("私聊对象")]),a("div",{staticClass:"base-item"},[a("div",{staticClass:"row-style"},[a("el-radio-group",{on:{change:e.changeUserType},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[a("el-radio",{attrs:{label:"order"}},[e._v("订单客户")]),a("el-radio",{attrs:{label:"fans"}},[e._v("粉丝用户")])],1)],1),a("div",{staticClass:"row-style"},[a("p",[a("el-checkbox",{attrs:{disabled:"fans"===e.radio},model:{value:e.filterCheck,callback:function(t){e.filterCheck=t},expression:"filterCheck"}},[e._v("过滤 ")]),a("el-input",{staticStyle:{width:"50px"},attrs:{disabled:"fans"===e.radio,placeholder:"请输入内容",size:"mini"},model:{value:e.filterDays,callback:function(t){e.filterDays=t},expression:"filterDays"}}),e._v(" 天以前的订单 ")],1)]),a("div",{staticClass:"row-style"},[a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[e._v("订单类型选择")]),a("div",{staticClass:"base-item"},[a("el-checkbox-group",{attrs:{disabled:"fans"===e.radio||e.btnLoading},model:{value:e.orderType,callback:function(t){e.orderType=t},expression:"orderType"}},e._l(e.orderTypeList,(function(t){return a("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.label))])})),1)],1)])])])]),a("div",{staticClass:"base-box center-box mar-left"},[a("span",{staticClass:"base-title"},[e._v("私聊内容")]),a("div",{staticClass:"base-item"},[a("div",{staticClass:"row-style"},[a("el-input",{staticStyle:{height:"60px"},attrs:{type:"textarea",rows:3,clearable:"",size:"mini"},model:{value:e.sendText,callback:function(t){e.sendText=t},expression:"sendText"}}),a("div",{staticClass:"chat-content-btn"},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnLoading},on:{click:e.addMessage}},[e._v("添加消息")]),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"若添加多条内容则会随机选择一条发送，建议添加多条不通的内容降低被平台屏蔽风险",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)],1),a("div",{staticClass:"row-style"},[a("div",{staticClass:"chat-content-list"},e._l(e.messageList,(function(t,n){return a("div",{key:n,staticClass:"chat-content-item"},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnLoading},on:{click:e.deleteMessage}},[e._v("删除")]),a("span",{staticClass:"mar-left"},[e._v(e._s(t))])],1)})),0)])])]),a("div",{staticClass:"right-box mar-left"},[a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[a("el-checkbox",{staticClass:"mar-left",attrs:{disabled:e.btnLoading},model:{value:e.isSendDiscount,callback:function(t){e.isSendDiscount=t},expression:"isSendDiscount"}},[e._v("是否发送优惠券")])],1),a("div",{staticClass:"base-item"},[a("el-radio",{attrs:{label:"random",disabled:e.btnLoading},model:{value:e.radioDiscountType,callback:function(t){e.radioDiscountType=t},expression:"radioDiscountType"}},[e._v("随机优惠券")]),a("el-radio",{attrs:{label:"fixed",disabled:e.btnLoading},model:{value:e.radioDiscountType,callback:function(t){e.radioDiscountType=t},expression:"radioDiscountType"}},[e._v("固定优惠券")]),a("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",disabled:e.btnLoading},model:{value:e.discountName,callback:function(t){e.discountName=t},expression:"discountName"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请输入固定优惠券的名称，多个店铺可以通过名称找到相应的优惠券",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[a("el-checkbox",{staticClass:"mar-left",attrs:{disabled:e.btnLoading},model:{value:e.isSendGoods,callback:function(t){e.isSendGoods=t},expression:"isSendGoods"}},[e._v("是否发送商品")])],1),a("div",{staticClass:"base-item"},[a("el-radio",{attrs:{label:"random",disabled:e.btnLoading},model:{value:e.radioGoodsType,callback:function(t){e.radioGoodsType=t},expression:"radioGoodsType"}},[e._v("随机商品")]),a("el-radio",{attrs:{label:"fixed",disabled:e.btnLoading},model:{value:e.radioGoodsType,callback:function(t){e.radioGoodsType=t},expression:"radioGoodsType"}},[e._v("固定商品")]),a("el-input",{staticStyle:{width:"180px","margin-left":"24px"},attrs:{size:"mini",disabled:e.btnLoading},model:{value:e.GoodsId,callback:function(t){e.GoodsId=t},expression:"GoodsId"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请输入固定商品ID，固定商品只在商品所在店铺下有效",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[e._v("发送设置")]),a("div",{staticClass:"base-item"},[e._v(" 发送私聊数量"),a("el-input",{staticStyle:{width:"50px"},attrs:{size:"mini"},model:{value:e.sendNum,callback:function(t){e.sendNum=t},expression:"sendNum"}}),e._v("（0标表示无限制）发送间隔 "),a("el-input",{staticStyle:{width:"50px"},attrs:{size:"mini"},model:{value:e.sendTime,callback:function(t){e.sendTime=t},expression:"sendTime"}}),e._v("秒 ")],1)])])])]),a("div",{staticClass:"content"},[a("u-table",{ref:"multipleTable",attrs:{data:e.tableData,"header-cell-style":{background:"#f7fafa"},height:"550px"}},[a("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1))]}}])}),a("u-table-column",{attrs:{width:"80px",label:"站点",prop:"country",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e._f("chineseSite")(a.country))+" ")]}}])}),a("u-table-column",{attrs:{width:"120px",label:"店铺名称",prop:"mallInfo.platform_mall_name",align:"center","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",prop:"userName",label:"私聊用户",width:"120","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",prop:"userType",label:"用户类型",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e.userType[a.userType])+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"chatMessage",label:"私聊内容",width:"300"}}),a("u-table-column",{attrs:{prop:"chatDiscount",label:"发送优惠券",align:"center",width:"120px"}}),a("u-table-column",{attrs:{align:"center",prop:"chatGoods",label:"发送商品",width:"100"}}),a("u-table-column",{attrs:{align:"center",prop:"remark",label:"操作信息","min-width":"400","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.remark))]}}])})],1)],1),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)},r=[],s=a("53ca"),i=a("1da1"),o=(a("96cf"),a("99af"),a("fb6a"),a("ac1f"),a("466d"),a("159b"),a("3ca3"),a("ddb0"),a("498a"),a("a9e3"),a("c740"),a("4de4"),a("7db0"),a("b0c0"),a("d3b7"),a("25f0"),a("a434"),a("6c27")),c=a("feb6"),l=a("2f6f"),u=a("0e0b"),d={name:"BusinessAnalyseStoreSelection",components:{storeChoose:c["a"]},data:function(){return{selectMallList:[],showConsole:!0,radio:"order",filterDays:30,filterCheck:!1,orderType:["unpaid"],orderTypeList:[{label:"未支付",value:"unpaid"},{label:"待发货",value:"toship"},{label:"已发货",value:"shipping"},{label:"已取消",value:"cancelled"},{label:"已完成",value:"completed"}],userType:{unpaid:"未支付订单",toship:"待发货订单",shipping:"已发货订单",cancelled:"已取消订单",completed:"已完成订单",fans:"粉丝用户"},chatContent:"",sendNum:0,sendTime:10,radioDiscountType:"random",radioGoodsType:"random",discountName:"",GoodsId:"",isSendDiscount:!1,isSendGoods:!1,messageList:[],sendText:"",tableData:[],findChatList:[],StoreSelection:new l["a"](this),btnLoading:!1,isStop:!1}},mounted:function(){},methods:{changeUserType:function(){var e=this;"fans"===this.radio&&this.$confirm("批量私聊粉丝用户操作违反shopee官方政策，可能会被shopee官方冻结台湾站店铺发送消息大于1000个后，会被官方禁言24小时，因批量私聊粉丝用户导致店铺被封，后果自行承担，请谨慎使用","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){})).catch((function(){e.radio="order"}))},chatStart:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r,s,i,o,c,l,u,d,p;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.tableData=[],t.prev=1,e.isStop=!1,e.selectMallList.length){t.next=5;break}return t.abrupt("return",e.$message.warning("请选择店铺！"));case 5:if("order"!==e.radio){t.next=8;break}if(e.orderType.length){t.next=8;break}return t.abrupt("return",e.$message.warning("请至少选择一种订单类型！"));case 8:if(e.messageList.length||e.isSendDiscount&&(!e.isSendDiscount||"fixed"!=e.radioDiscountType||e.discountName)||e.isSendGoods&&(!e.isSendGoods||"fixed"!=e.radioGoodsType||e.GoodsId)){t.next=10;break}return t.abrupt("return",e.$message.warning("无可发送内容！"));case 10:if(e.btnLoading=!0,e.showConsole=!1,!e.isStop){t.next=15;break}return e.btnLoading=!1,t.abrupt("return",e.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}}));case 15:if("order"!=e.radio){t.next=57;break}a=0;case 17:if(!(a<e.selectMallList.length)){t.next=55;break}if(!e.isStop){t.next=21;break}return e.btnLoading=!1,t.abrupt("return",e.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}}));case 21:n=e.selectMallList[a],r=[],s="",i=0;case 25:if(!(i<e.orderType.length)){t.next=36;break}return s=e.orderType[i],t.next=29,e.getOrderUser(n,s);case 29:if(t.t0=t.sent,t.t0){t.next=32;break}t.t0=[];case 32:r=t.t0;case 33:i++,t.next=25;break;case 36:if(!r.length){t.next=51;break}if(o=r,!(e.sendNum>0)){t.next=46;break}if(!(e.sendNum>=r.length)){t.next=43;break}o=r,t.next=46;break;case 43:return t.next=45,e.getRandomArrayElements(r,e.sendNum);case 45:o=t.sent;case 46:return e.$refs.Logs.writeLog("店铺【".concat(n.platform_mall_name,"】获取到订单用户").concat(o.length,"条"),!0),t.next=49,e.batchSendMessage(o,n,s);case 49:t.next=52;break;case 51:e.$refs.Logs.writeLog("店铺【".concat(n.platform_mall_name,"】未获取到订单用户，聊天结束"),!0);case 52:a++,t.next=17;break;case 55:t.next=86;break;case 57:c=0;case 58:if(!(c<e.selectMallList.length)){t.next=86;break}if(!e.isStop){t.next=62;break}return e.btnLoading=!1,t.abrupt("return",e.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}}));case 62:return l=e.selectMallList[c],u="fans",t.next=66,e.getFansAll(l);case 66:if(d=t.sent,!d.length){t.next=82;break}if(p=d,!(e.sendNum>0)){t.next=77;break}if(!(e.sendNum>=d.length)){t.next=74;break}p=mallOrderList,t.next=77;break;case 74:return t.next=76,e.getRandomArrayElements(d,e.sendNum);case 76:p=t.sent;case 77:return e.$refs.Logs.writeLog("店铺【".concat(l.platform_mall_name,"】获取到粉丝用户").concat(p.length,"条"),!0),t.next=80,e.batchSendMessage(p,l,u);case 80:t.next=83;break;case 82:e.$refs.Logs.writeLog("店铺【".concat(l.platform_mall_name,"】未获取到粉丝用户，聊天结束"),!0);case 83:c++,t.next=58;break;case 86:e.btnLoading=!1,t.next=93;break;case 89:t.prev=89,t.t1=t["catch"](1),e.btnLoading=!1,e.$alert("出现错误，已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}});case 93:case"end":return t.stop()}}),t,null,[[1,89]])})))()},getRandomArrayElements:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,s,i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=e.slice(0),r=e.length,s=r-t;while(r-- >s)o=Math.floor((r+1)*Math.random()),i=n[o],n[o]=n[r],n[r]=i;return a.abrupt("return",n.slice(s));case 3:case"end":return a.stop()}}),a)})))()},getFansAll:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=1,r=40,s=[],a.next=5,t.getFans(e,n,r);case 5:i=a.sent;case 6:if(!i.length){a.next=21;break}if(!t.isStop){a.next=10;break}return t.$refs.Logs.writeLog("已停止执行！",!1),a.abrupt("break",21);case 10:if(s=s.concat(i),!(i.length<r)){a.next=15;break}i=[],a.next=19;break;case 15:return n++,a.next=18,t.getFans(e,n,r);case 18:i=a.sent;case 19:a.next=6;break;case 21:return a.abrupt("return",s);case 22:case"end":return a.stop()}}),a)})))()},getFans:function(e,t,a){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,i,o,c,l,u,d,p,m;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=3;break}return n.btnLoading=!1,r.abrupt("return",n.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}}));case 3:return s=[],r.next=6,n.$shopeemanService.getWebUrl(e.country);case 6:return i=r.sent,o=i+"/shop/"+e.platform_mall_id+"/followers/",c=(t-1)*a,l={offset:c,limit:a,offset_of_offset:0,_:(new Date).getTime(),__classic__:1},r.next=12,window["NetMessageBridgeService"].get(o,JSON.stringify({params:l,headers:{isGBK:!1}}));case 12:return u=r.sent,d=JSON.parse(u),p=d.data,m=p.match(/<li\s*data-follower-shop-id=.(\d+).\s*data-follower[^>]+>[\s\t\n]+<a[^>]+username='([^>]+)'\s*userid=.([0-9]+).\s*?class=.shop-href.>/g),m&&m.length&&m.forEach((function(e){var t=e.match(/data-follower-shop-id=.(\d+)/)[1],a=e.match(/username='(\w+)'/)?e.match(/username='(\w+)'/)[1]:"",n=e.match(/userid='(\d+)'/)[1],r={shopId:t,username:a,user_id:n};s.push(r)})),r.abrupt("return",s);case 18:case"end":return r.stop()}}),r)})))()},batchSendMessage:function(e,t,a){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=3;break}return n.btnLoading=!1,r.abrupt("return",n.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}}));case 3:return r.prev=3,r.delegateYield(regeneratorRuntime.mark((function r(){var i,o,c,l,d,p,m,h,f,b,g;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,window["ConfigBridgeService"].getGlobalCacheInfo("mallInfo",t.platform_mall_id);case 2:return i=r.sent,o=i&&JSON.parse(i),c=o.web_login_info.ShopeeUid,l={params:{_uid:"0-".concat(c),_v:"5.8.0",_ts:Math.round((new Date).getTime()/1e3)}},d={shop_id:t.platform_mall_id},r.next=9,n.$shopeemanService.loginMessage(t.country,d,l);case 9:p=r.sent,m=p.data.token,h="",f=regeneratorRuntime.mark((function r(s){var i,o,l,d,p,f,b,g,_,x,v,k,y,w,S,L,T,C,I,D,M,$,O,N,G,R,j,A,B,z,J,q;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=3;break}return n.btnLoading=!1,r.abrupt("return",{v:{v:n.$alert("已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}})}});case 3:if(i=e[s],o=i.buyer_user?i.buyer_user.user_name.trim():i.username.trim(),l=Number(i.user_id),m){r.next=8;break}return r.abrupt("return","continue");case 8:if(!n.messageList.length){r.next=19;break}return d=n.tableData.findIndex((function(e){return e.userName==o})),d<0&&(p={country:t.country,mallInfo:t,userName:o,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push(p)),f="",1==n.messageList.length?f=n.messageList[0]:(b=n.messageList.filter((function(e){return e!==h})),g=Math.floor(Math.random()*b.length),f=b[g]),_=(new Date).getTime(),r.next=16,n.sendMessage("text",f,{},l,Number(t.platform_mall_id),m,t.country,_,c);case 16:x=r.sent,v=n.tableData.findIndex((function(e){return e.userName==o})),200===x.code?(h=f,n.$set(n.tableData[v],"remark","".concat(n.tableData[v].remark,"【消息发送成功】")),n.$set(n.tableData[v],"chatMessage",f)):n.$set(n.tableData[v],"remark","".concat(n.tableData[v].remark,"【消息发送失败，").concat(x.data.message,"】"));case 19:if(!n.isSendDiscount){r.next=38;break}return r.next=22,n.sendDiscount(t.country,t.platform_mall_id);case 22:if(k=r.sent,y=n.tableData.findIndex((function(e){return e.userName==o})),y<0&&(w={country:t.country,mallInfo:t,userName:o,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push(w)),S=null,L="",k.length?"random"===n.radioDiscountType?(T=Math.floor(Math.random()*k.length),S=k[T]):(S=k.find((function(e){return e.name==n.discountName.trim()})),S||(L="【没有找到名为".concat(n.discountName,"】的优惠券"))):(S=null,L="【没有可以使用的优惠券】"),C=n.tableData.findIndex((function(e){return e.userName==o})),S){r.next=33;break}n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark).concat(L)),r.next=38;break;case 33:return I=(new Date).getTime(),r.next=36,n.sendMessage("voucher","",S,l,Number(t.platform_mall_id),m,t.country,I,c);case 36:D=r.sent,200===D.code?(n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark,"【优惠券发送成功】")),n.$set(n.tableData[C],"chatDiscount","".concat(S.name))):n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark,"【优惠券发送失败，").concat(D.data.message,"】"));case 38:if(!n.isSendGoods){r.next=66;break}if(M=n.tableData.findIndex((function(e){return e.userName==o})),M<0&&($={country:t.country,mallInfo:t,userName:o,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push($)),O=null,N="",G={offset:0,limit:100,need_brand:0,need_item_model:0,is_ads:0,platform_mall_id:t.platform_mall_id,country:t.country},"random"!=n.radioGoodsType){r.next=51;break}return r.next=47,n.StoreSelection.productSelector(G);case 47:R=r.sent,200==R.code&&R.data.length?(j=Math.floor(Math.random()*R.data.length),O=R.data[j]):N="【没有可以发送的商品】",r.next=56;break;case 51:return G["id"]=n.GoodsId,r.next=54,n.StoreSelection.productSelector(G);case 54:A=r.sent,200==A.code&&A.data.length?O=A.data[0]:N="【没有找到商品ID为".concat(n.GoodsId,"的商品】");case 56:if(B=n.tableData.findIndex((function(e){return e.userName==o})),O){r.next=61;break}n.$set(n.tableData[B],"remark","".concat(n.tableData[B].remark).concat(N)),r.next=66;break;case 61:return z=(new Date).getTime(),r.next=64,n.sendMessage("product","",O,l,Number(t.platform_mall_id),m,t.country,z,c);case 64:J=r.sent,200===J.code?(n.$set(n.tableData[B],"remark","".concat(n.tableData[B].remark,"【商品发送成功】")),n.$set(n.tableData[B],"chatGoods","".concat(O.itemid))):n.$set(n.tableData[B],"remark","".concat(n.tableData[B].remark,"【商品发送失败，").concat(J.data.message,"】"));case 66:q=n.tableData.findIndex((function(e){return e.userName==o})),n.$set(n.tableData[q],"remark","".concat(n.tableData[q].remark,"【操作结束】")),Object(u["u"])(n.sendTime);case 69:case"end":return r.stop()}}),r)})),b=0;case 14:if(!(b<e.length)){r.next=24;break}return r.delegateYield(f(b),"t0",16);case 16:if(g=r.t0,"continue"!==g){r.next=19;break}return r.abrupt("continue",21);case 19:if("object"!==Object(s["a"])(g)){r.next=21;break}return r.abrupt("return",g.v);case 21:b++,r.next=14;break;case 24:case"end":return r.stop()}}),r)}))(),"t0",5);case 5:if(i=r.t0,"object"!==Object(s["a"])(i)){r.next=8;break}return r.abrupt("return",i.v);case 8:r.next=12;break;case 10:r.prev=10,r.t1=r["catch"](3);case 12:case"end":return r.stop()}}),r,null,[[3,10]])})))()},sendDiscount:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,i,o,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={offset:0,limit:40,promotion_type:1,shop_id:t},s=[],n.next=4,a.$shopeemanService.getVouchers(e,r);case 4:i=n.sent,o=i.data.voucher_list;case 6:if(!o.length){n.next=23;break}if(!a.isStop){n.next=11;break}return a.btnLoading=!1,a.$refs.Logs.writeLog("已停止执行！",!1),n.abrupt("break",23);case 11:if(s=s.concat(o),!(o.length<40)){n.next=16;break}o=[],n.next=21;break;case 16:return r.promotion_type++,n.next=19,a.$shopeemanService.getVouchers(e,r);case 19:c=n.sent,o=c&&c.data&&c.data.voucher_list||[];case 21:n.next=6;break;case 23:return n.abrupt("return",s);case 24:case"end":return n.stop()}}),n)})))()},sendMessage:function(e,t,a,n,r,s,o,c,l){var u=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var d,p,m,h,f,b,g;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return g=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},b=function(){return g()+g()+"-"+g()+"-"+g()+"-"+g()+"-"+g()+g()+g()},d={},"text"==e&&(d={text:t}),"product"==e&&(d={product_id:a.itemid,shop_id:r}),"voucher"==e&&(d={voucher_code:a.voucher_code,voucher_id:a.voucher_id}),p={request_id:b(),to_id:n,type:e,content:d,chat_send_option:{force_send_cancel_order_warning:!1,comply_cancel_order_warning:!1},device_id:b(),shop_id:r},m=u.sha256("/webchat/api/v1.2/messages",p,c,l),h={headers:{referer:"/webchat/conversations","Content-Type":"text/plain;charset=UTF-8","x-s":m,"x-v":1,Authorization:"Bearer ".concat(s)},params:{_uid:"0-".concat(l),_ts:c,_v:"6.1.1"}},i.next=11,u.$shopeemanService.sendMessage(o,p,h);case 11:return f=i.sent,i.abrupt("return",f);case 13:case"end":return i.stop()}}),i)})))()},sha256:function(e,t,a,n){var r=e.match(/v\d+(.\d+)*/)[0],s="396c15ad-6d3e-4018-98be-cef58cb45cd0",i="6.1.1",c=r,l=n,u=t["request_id"],d=t["to_id"],p=t["type"],m="";"text"===p&&(m=t.content.text);var h="key=".concat(s,"&plat=").concat(i,"&ver=").concat(c,"&fromID=").concat(l,"&reqID=").concat(u,"&toID=").concat(d,"&timestamp=").concat(a,"&type=").concat(p,"&strinput=").concat(m),f="".concat(h),b=Object(o["sha256"])(f);return b},getOrderUser:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,i,o,c,l,u,d,p,m,h,f,b,g,_,x,v,k,y,w,S,L,T,C,I,D,M;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=[],"shipping"!=t){n.next=47;break}return s={page_size:40,page_number:1,total:0,sort_by:"confirmed_date_desc",shop_id:e.platform_mall_id},n.next=5,a.$shopeemanService.getToShipOrderIdList(e.country,s);case 5:if(i=n.sent,200!==i.code){n.next=40;break}o=i.data,c=o.package_list,l=o.total;case 8:if(!c.length){n.next=38;break}if(!a.isStop){n.next=13;break}return a.btnLoading=!1,a.$refs.Logs.writeLog("已停止执行！",!1),n.abrupt("break",38);case 13:u=[],d=0;case 15:if(!(d<c.length)){n.next=24;break}return p=c.slice(d,d+5),n.next=19,a.$shopeemanService.getDetailsByOrderIds(e.country,{from_seller_data:!1,orders:a.changeParams(p),shop_id:e.platform_mall_id});case 19:m=n.sent,200===m.code&&(h=m.data&&m.data.orders||[],u=u.concat(m.data.orders),h&&h.length&&(a.filterCheck?(f=h.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*a.filterDays*60*60*1e3})),r=r.concat(f)):r=r.concat(h)));case 21:d+=5,n.next=15;break;case 24:if(b="",b=u[u.length-1].create_time,!(c.length<40||b&&(new Date).getTime()-1e3*b>24*a.filterDays*60*60*1e3)){n.next=30;break}c=[],n.next=36;break;case 30:return s.page_number++,s.total=l,n.next=34,a.$shopeemanService.getToShipOrderIdList(a.mall.country,s);case 34:g=n.sent,c=g&&g.data&&g.data.package_list||[];case 36:n.next=8;break;case 38:n.next=45;break;case 40:if(403!==i.code){n.next=44;break}return n.abrupt("return",a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未登录"),!1));case 44:return n.abrupt("return",a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(i.code,"-").concat(i.data),!1));case 45:n.next=90;break;case 47:return _={from_page_number:1,source:t,page_size:40,page_number:1,total:0,is_massship:!1,shop_id:e.platform_mall_id},n.next=50,a.$shopeemanService.getOrderIdList(e.country,_);case 50:if(x=n.sent,200!==x.code){n.next=85;break}v=x.data,k=v.orders,y=v.page_info;case 53:if(!k.length){n.next=83;break}if(!a.isStop){n.next=58;break}return a.btnLoading=!1,a.$refs.Logs.writeLog("已停止执行！",!1),n.abrupt("break",83);case 58:w=[],S=0;case 60:if(!(S<k.length)){n.next=69;break}return L=k.slice(S,S+5),n.next=64,a.$shopeemanService.getDetailsByOrderIds(e.country,{from_seller_data:!1,orders:L,shop_id:e.platform_mall_id});case 64:T=n.sent,200===T.code&&(C=T.data&&T.data.orders||[],w=w.concat(T.data.orders),C&&C.length&&(a.filterCheck?(I=C.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*a.filterDays*60*60*1e3})),r=r.concat(I)):r=r.concat(C)));case 66:S+=5,n.next=60;break;case 69:if(D="",D=w[w.length-1].create_time,!(k.length<40||D&&(new Date).getTime()-1e3*D>24*a.filterDays*60*60*1e3)){n.next=75;break}k=[],n.next=81;break;case 75:return _.page_number++,_.total=y.total,n.next=79,a.$shopeemanService.getOrderIdList(e.country,_);case 79:M=n.sent,k=M&&M.data&&M.data.orders||[];case 81:n.next=53;break;case 83:n.next=90;break;case 85:if(403!==x.code){n.next=89;break}return n.abrupt("return",a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未登录"),!1));case 89:return n.abrupt("return",a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(x.code,"-").concat(x.data),!1));case 90:return n.abrupt("return",r);case 91:case"end":return n.stop()}}),n)})))()},changeParams:function(e){var t=[];return e.forEach((function(e){var a={order_id:e.order_id,region_id:e.region_id||e.region,shop_id:e.shop_id};t.push(a)})),t},addMessage:function(){if(""!=this.sendText)return this.messageList.indexOf(this.sendText.trim())>-1?this.$message.warning("请不要添加重复信息!"):void this.messageList.push(this.sendText)},deleteMessage:function(e){this.messageList.splice(e,1)},clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(e){this.selectMallList=e.mallList}}},p=d,m=(a("e60c"),a("2877")),h=Object(m["a"])(p,n,r,!1,null,"9f94053c",null);t["default"]=h.exports},e60c:function(e,t,a){"use strict";a("858b")},feb6:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.groupIdList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})}))],2)],1),a("li",{style:e.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:""},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[e.isShowName?e._e():a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,n){return e.showMall(t,n)?a("el-option",{key:n,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},r=[],s=a("1da1"),i=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(e,t){var a=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var l={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var n=t.indexOf("")>-1,r=e.indexOf("")>-1;n!==r?this.groupId=r?[""].concat(Object(i["a"])(this.groupIdList.map((function(e){return e.id})))):[]:r?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var n=t.indexOf("")>-1,r=e.indexOf("")>-1;n!==r?this.site=r?[""].concat(Object(i["a"])(this.siteList.map((function(e){return e.platform_mall_id})))):[]:r?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.site=[],a=t.countryVal,n=t.groupId.indexOf("")>-1&&t.groupId.slice(1).toString()||t.groupId.toString(),r={country:a,mallGroupIds:n},e.next=6,t.mallListAPIInstance.ddMallGoodsGetMallList(r);case 6:s=e.sent,200===s.code?(t.siteList=s.data,0===t.groupIdList.length&&(t.groupId=[""],t.siteList.forEach((function(e){var a=t.groupIdList.findIndex((function(t){return t.id===e.group_id}));e.group_name&&a<0&&(t.groupIdList.push({group_name:e.group_name,id:e.group_id}),t.groupId.push(e.group_id))}))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=[""]}),10)):t.$message.error("获取分组、店铺列表失败");case 8:case"end":return e.stop()}}),e)})))()},changeMallList:function(){var e=this,t=[],a="";this.site.forEach((function(n){if(n){var r=e.siteList.find((function(e){return e.platform_mall_id===n}));t.push(r),a+=n+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=t.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){this.isShowName=e||"";var t=this.siteList.filter((function(t){var a=t.mall_alias_name||t.platform_mall_name;return a.includes(e)}));this.showMallNumber=t.length-this.showMallNumber;var a=this.siteList.filter((function(t){var a=t.mall_alias_name||t.platform_mall_name;return!a.includes(e)}));this.siteShowList=[].concat(Object(i["a"])(t),Object(i["a"])(a))},showMall:function(e,t){var a=e.mall_alias_name||e.platform_mall_name,n=this.site[0]===e.platform_mall_id;return n||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var a=0;e?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=a}}}},u=l,d=(a("8992"),a("2877")),p=Object(d["a"])(u,n,r,!1,null,null,null);t["a"]=p.exports}}]);