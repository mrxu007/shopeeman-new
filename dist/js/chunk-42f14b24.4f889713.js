(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42f14b24"],{"3cdd":function(e,t,a){"use strict";a("d39f")},"53ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function n(e){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}},c68c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"batch-chat"},[a("div",{staticClass:"select-box"},[a("div",{staticClass:"select-mall"},[a("storeChoose",{attrs:{"is-all":!0,"span-width":"80px","select-width":"180px",source:"orderCenter"},on:{changeMallList:e.changeMallList}}),e.btnLoading?a("el-button",{staticClass:"mar-left",attrs:{type:"primary",size:"mini"},on:{click:e.cancel}},[e._v("停 止")]):a("el-button",{staticClass:"mar-left",attrs:{type:"primary",size:"mini"},on:{click:e.chatStart}},[e._v("开 始")]),a("el-button",{staticClass:"mar-left",attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清空日志")]),a("el-checkbox",{staticClass:"mar-left",model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")])],1),a("div",{staticClass:"chat-set-box"},[a("div",{staticClass:"base-box left-box"},[a("span",{staticClass:"base-title"},[e._v("私聊对象")]),a("div",{staticClass:"base-item"},[a("div",{staticClass:"row-style"},[a("el-radio-group",{on:{change:e.changeUserType},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[a("el-radio",{attrs:{label:"order"}},[e._v("订单客户")]),a("el-radio",{attrs:{label:"fans"}},[e._v("粉丝用户")])],1)],1),a("div",{staticClass:"row-style"},[a("p",[a("el-checkbox",{attrs:{disabled:"fans"===e.radio},model:{value:e.filterCheck,callback:function(t){e.filterCheck=t},expression:"filterCheck"}},[e._v("过滤 ")]),a("el-input",{staticStyle:{width:"50px"},attrs:{disabled:"fans"===e.radio,placeholder:"请输入内容",size:"mini"},model:{value:e.filterDays,callback:function(t){e.filterDays=t},expression:"filterDays"}}),e._v(" 天以前的订单 ")],1)]),a("div",{staticClass:"row-style"},[a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[e._v("订单类型选择")]),a("div",{staticClass:"base-item"},[a("el-checkbox-group",{attrs:{disabled:"fans"===e.radio||e.btnLoading},model:{value:e.orderType,callback:function(t){e.orderType=t},expression:"orderType"}},e._l(e.orderTypeList,(function(t){return a("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.label))])})),1)],1)])])])]),a("div",{staticClass:"base-box center-box mar-left"},[a("span",{staticClass:"base-title"},[e._v("私聊内容")]),a("div",{staticClass:"base-item"},[a("div",{staticClass:"row-style"},[a("el-input",{staticStyle:{height:"60px"},attrs:{type:"textarea",resize:"none",rows:3,clearable:"",size:"mini"},model:{value:e.sendText,callback:function(t){e.sendText=t},expression:"sendText"}}),a("div",{staticClass:"chat-content-btn"},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnLoading},on:{click:e.addMessage}},[e._v("添加消息")]),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"若添加多条内容则会随机选择一条发送，建议添加多条不通的内容降低被平台屏蔽风险",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)],1),a("div",{staticClass:"row-style"},[a("div",{staticClass:"chat-content-list"},e._l(e.messageList,(function(t,n){return a("div",{key:n,staticClass:"chat-content-item"},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnLoading},on:{click:function(t){return e.deleteMessage(n)}}},[e._v("删除")]),a("span",{staticClass:"mar-left"},[e._v(e._s(t))])],1)})),0)])])]),a("div",{staticClass:"right-box mar-left"},[a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[a("el-checkbox",{staticClass:"mar-left",attrs:{disabled:e.btnLoading},model:{value:e.isSendDiscount,callback:function(t){e.isSendDiscount=t},expression:"isSendDiscount"}},[e._v("是否发送优惠券")])],1),a("div",{staticClass:"base-item"},[a("el-radio",{attrs:{label:"random",disabled:e.btnLoading},model:{value:e.radioDiscountType,callback:function(t){e.radioDiscountType=t},expression:"radioDiscountType"}},[e._v("随机优惠券")]),a("el-radio",{attrs:{label:"fixed",disabled:e.btnLoading},model:{value:e.radioDiscountType,callback:function(t){e.radioDiscountType=t},expression:"radioDiscountType"}},[e._v("固定优惠券")]),a("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",disabled:e.btnLoading},model:{value:e.discountName,callback:function(t){e.discountName=t},expression:"discountName"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请输入固定优惠券的名称，多个店铺可以通过名称找到相应的优惠券",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[a("el-checkbox",{staticClass:"mar-left",attrs:{disabled:e.btnLoading},model:{value:e.isSendGoods,callback:function(t){e.isSendGoods=t},expression:"isSendGoods"}},[e._v("是否发送商品")])],1),a("div",{staticClass:"base-item"},[a("el-radio",{attrs:{label:"random",disabled:e.btnLoading},model:{value:e.radioGoodsType,callback:function(t){e.radioGoodsType=t},expression:"radioGoodsType"}},[e._v("随机商品")]),a("el-radio",{attrs:{label:"fixed",disabled:e.btnLoading},model:{value:e.radioGoodsType,callback:function(t){e.radioGoodsType=t},expression:"radioGoodsType"}},[e._v("固定商品")]),a("el-input",{staticStyle:{width:"180px","margin-left":"24px"},attrs:{size:"mini",disabled:e.btnLoading},model:{value:e.GoodsId,callback:function(t){e.GoodsId=t},expression:"GoodsId"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请输入固定商品ID，固定商品只在商品所在店铺下有效",placement:"right-end"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{staticClass:"base-box mar-top"},[a("span",{staticClass:"base-title"},[e._v("发送设置")]),a("div",{staticClass:"base-item"},[e._v(" 发送私聊数量"),a("el-input",{staticStyle:{width:"50px"},attrs:{size:"mini"},model:{value:e.sendNum,callback:function(t){e.sendNum=t},expression:"sendNum"}}),e._v("（0标表示无限制）发送间隔 "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.sendTime,expression:"sendTime"}],staticStyle:{width:"50px"},attrs:{size:"mini"},domProps:{value:e.sendTime},on:{input:function(t){t.target.composing||(e.sendTime=t.target.value)}}}),e._v("秒 ")],1)])])])]),a("div",{staticClass:"content"},[a("u-table",{ref:"multipleTable",attrs:{data:e.tableData,"header-cell-style":{background:"#f7fafa"},height:"520px"}},[a("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1))]}}])}),a("u-table-column",{attrs:{width:"80px",label:"站点",prop:"country",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e._f("chineseSite")(a.country))+" ")]}}])}),a("u-table-column",{attrs:{width:"120px",label:"店铺名称",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.mallInfo.mall_alias_name||a.mallInfo.platform_mall_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"userName",label:"私聊用户",width:"120","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",prop:"userType",label:"用户类型",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e.userType[a.userType])+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"chatMessage",label:"私聊内容",width:"300"}}),a("u-table-column",{attrs:{prop:"chatDiscount",label:"发送优惠券",align:"center",width:"120px"}}),a("u-table-column",{attrs:{align:"center",prop:"chatGoods",label:"发送商品",width:"100"}}),a("u-table-column",{attrs:{align:"center",prop:"remark",label:"操作信息","min-width":"400","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.remark))]}}])})],1)],1),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)},r=[],s=a("53ca"),o=a("2909"),i=a("1da1"),c=(a("96cf"),a("99af"),a("fb6a"),a("ac1f"),a("466d"),a("159b"),a("3ca3"),a("ddb0"),a("498a"),a("a9e3"),a("c740"),a("4de4"),a("caad"),a("2532"),a("7db0"),a("b0c0"),a("d3b7"),a("25f0"),a("a434"),a("6c27")),l=a("feb6"),u=a("2f6f"),d=a("0e0b"),m={name:"BusinessAnalyseStoreSelection",components:{storeChoose:l["a"]},data:function(){return{selectMallList:[],showConsole:!0,radio:"order",filterDays:30,filterCheck:!1,orderType:["unpaid"],orderTypeList:[{label:"未支付",value:"unpaid"},{label:"待发货",value:"toship"},{label:"已发货",value:"shipping"},{label:"已取消",value:"cancelled"},{label:"已完成",value:"completed"}],userType:{unpaid:"未支付订单",toship:"待发货订单",shipping:"已发货订单",cancelled:"已取消订单",completed:"已完成订单",fans:"粉丝用户"},chatContent:"",sendNum:0,sendTime:10,radioDiscountType:"random",radioGoodsType:"random",discountName:"",GoodsId:"",isSendDiscount:!1,isSendGoods:!1,messageList:[],sendText:"",tableData:[],findChatList:[],StoreSelection:new u["a"](this),btnLoading:!1,isStop:!1}},mounted:function(){},methods:{cancel:function(){this.isStop=!0,Object(d["B"])(),this.$refs.Logs.writeLog("停止操作,可能需要一些时间！",!1),this.$alert("正在停止操作，可能需要一些时间！","提示",{confirmButtonText:"确定"})},changeUserType:function(){var e=this;"fans"===this.radio&&this.$confirm("批量私聊粉丝用户操作违反shopee官方政策，可能会被shopee官方冻结台湾站店铺发送消息大于1000个后，会被官方禁言24小时，因批量私聊粉丝用户导致店铺被封，后果自行承担，请谨慎使用","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){})).catch((function(){e.radio="order"}))},orderBatchMessage:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,i,c,l,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.length>1&&void 0!==t[1]?t[1]:{count:5},n.prev=1,!a.isStop){n.next=4;break}return n.abrupt("return");case 4:s=[],i="",a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】正在获取订单用户"),!0),c=0;case 8:if(!(c<a.orderType.length)){n.next=20;break}return i=a.orderType[c],n.next=12,a.getOrderUser(e,i);case 12:if(n.t0=n.sent,n.t0){n.next=15;break}n.t0=[];case 15:l=n.t0,s=[].concat(Object(o["a"])(s),Object(o["a"])(l));case 17:c++,n.next=8;break;case 20:if(console.log("mallOrderList",s),!s.length){n.next=38;break}if(u=s,!(a.sendNum>0)){n.next=31;break}if(!(a.sendNum>=s.length)){n.next=28;break}u=s,n.next=31;break;case 28:return n.next=30,a.getRandomArrayElements(s,a.sendNum);case 30:u=n.sent;case 31:return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】获取到订单用户").concat(u.length,"条"),!0),n.next=34,a.batchSendMessage(u,e,i);case 34:return n.next=36,Object(d["j"])(1e3*(a.sendTime||1));case 36:n.next=39;break;case 38:a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未获取到订单用户，聊天结束"),!0);case 39:n.next=43;break;case 41:n.prev=41,n.t1=n["catch"](1);case 43:return n.prev=43,--r.count,n.finish(43);case 46:case"end":return n.stop()}}),n,null,[[1,41,43,46]])})))()},fansBatchMessage:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.length>1&&void 0!==t[1]?t[1]:{count:5},n.prev=1,!a.isStop){n.next=4;break}return n.abrupt("return");case 4:return s="fans",n.next=7,a.getFansAll(e);case 7:if(o=n.sent,console.log(o,"fansList"),!o.length){n.next=26;break}if(i=o,!(a.sendNum>0)){n.next=19;break}if(!(a.sendNum>=o.length)){n.next=16;break}i=o,n.next=19;break;case 16:return n.next=18,a.getRandomArrayElements(o,a.sendNum);case 18:i=n.sent;case 19:return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】获取到粉丝用户").concat(i.length,"条"),!0),n.next=22,a.batchSendMessage(i,e,s);case 22:return n.next=24,Object(d["j"])(1e3*(a.sendTime||1));case 24:n.next=27;break;case 26:a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未获取到粉丝用户，聊天结束"),!0);case 27:n.next=31;break;case 29:n.prev=29,n.t0=n["catch"](1);case 31:return n.prev=31,--r.count,n.finish(31);case 34:case"end":return n.stop()}}),n,null,[[1,29,31,34]])})))()},chatStart:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.tableData=[],t.prev=1,e.isStop=!1,e.selectMallList.length){t.next=5;break}return t.abrupt("return",e.$message.warning("请选择店铺！"));case 5:if("order"!==e.radio){t.next=8;break}if(e.orderType.length){t.next=8;break}return t.abrupt("return",e.$message.warning("请至少选择一种订单类型！"));case 8:if(e.messageList.length||e.isSendDiscount&&(!e.isSendDiscount||"fixed"!=e.radioDiscountType||e.discountName)||e.isSendGoods&&(!e.isSendGoods||"fixed"!=e.radioGoodsType||e.GoodsId)){t.next=10;break}return t.abrupt("return",e.$message.warning("无可发送内容！"));case 10:if(e.btnLoading=!0,e.showConsole=!1,"order"!=e.radio){t.next=17;break}return t.next=15,Object(d["d"])(e.selectMallList,e.orderBatchMessage);case 15:t.next=19;break;case 17:return t.next=19,Object(d["d"])(e.selectMallList,e.fansBatchMessage);case 19:t.next=25;break;case 21:t.prev=21,t.t0=t["catch"](1),console.log(t.t0),e.$alert("出现错误，已停止执行","提示",{confirmButtonText:"确定",callback:function(e){}});case 25:return t.prev=25,e.btnLoading=!1,t.finish(25);case 28:case"end":return t.stop()}}),t,null,[[1,21,25,28]])})))()},getRandomArrayElements:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,s,o,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=e.slice(0),r=e.length,s=r-t;while(r-- >s)i=Math.floor((r+1)*Math.random()),o=n[i],n[i]=n[r],n[r]=o;return a.abrupt("return",n.slice(s));case 5:case"end":return a.stop()}}),a)})))()},getFansAll:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=1,r=40,s=[],a.next=5,t.getFans(e,n,r);case 5:o=a.sent;case 6:if(!o.length){a.next=20;break}if(!t.isStop){a.next=9;break}return a.abrupt("break",20);case 9:if(s=s.concat(o),!(o.length<r)){a.next=14;break}o=[],a.next=18;break;case 14:return n++,a.next=17,t.getFans(e,n,r);case 17:o=a.sent;case 18:a.next=6;break;case 20:return console.log(s,"fansList"),a.abrupt("return",s);case 22:case"end":return a.stop()}}),a)})))()},getFans:function(e,t,a){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var o,i,c,l,u,d,m,f,p;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=2;break}return r.abrupt("return");case 2:return o=[],r.next=5,n.$shopeemanService.getWebUrl(e.country);case 5:return i=r.sent,c=i+"/shop/"+e.platform_mall_id+"/followers/",l=(t-1)*a,console.log(l,"offset",t,a,Object(s["a"])(t),Object(s["a"])(a)),u={offset:l,limit:a,offset_of_offset:0,_:(new Date).getTime(),__classic__:1},r.next=12,window["NetMessageBridgeService"].get(c,JSON.stringify({params:u,headers:{isGBK:!1}}));case 12:return d=r.sent,m=JSON.parse(d),f=m.data,p=f.match(/<li\s*data-follower-shop-id=.(\d+).\s*data-follower[^>]+>[\s\t\n]+<a[^>]+username='([^>]+)'\s*userid=.([0-9]+).\s*?class=.shop-href.>/g),p&&p.length&&p.forEach((function(e){var t=e.match(/data-follower-shop-id=.(\d+)/)[1],a=e.match(/username='(\w+)'/)?e.match(/username='(\w+)'/)[1]:"";if(""!==a){var n=e.match(/userid='(\d+)'/)[1],r={shopId:t,username:a,user_id:n};o.push(r)}})),r.abrupt("return",o);case 18:case"end":return r.stop()}}),r)})))()},batchSendMessage:function(e,t,a){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var o,i,c,l,u,m,f,p;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=2;break}return r.abrupt("return");case 2:return r.prev=2,n.$refs.Logs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正在登陆客服系统"),!0),r.next=6,n.$appConfig.getGlobalCacheInfo("mallInfo",t.platform_mall_id);case 6:return o=r.sent,i=o&&JSON.parse(o),c=i.web_login_info.ShopeeUid,console.log(i,"mallInfoObj"),l={params:{_uid:"0-".concat(c),_v:"5.8.0",_ts:Math.round((new Date).getTime()/1e3)}},u={shop_id:t.platform_mall_id},r.next=14,n.$shopeemanService.loginMessage(t.country,u,l);case 14:if(m=r.sent,console.log("loginRes",m),f=m.data.token||"",!f){r.next=24;break}return r.delegateYield(regeneratorRuntime.mark((function r(){var o,i,l,u;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n.$refs.Logs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】正在登录客服系统"),!0),o="",i=regeneratorRuntime.mark((function r(s){var i,l,u,m,p,b,h,g,_,x,v,k,y,w,D,S,L,T,C,$,M,N,O,I,R,j,G,z,B,U,A,q,E;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.isStop){r.next=2;break}return r.abrupt("return",{v:{v:void 0}});case 2:if(i=e[s],l=i.buyer_user?i.buyer_user.user_name.trim():i.username.trim(),u=Number(i.user_id),m=Number(i.order_id),f){r.next=8;break}return r.abrupt("return","continue");case 8:if(!n.messageList.length){r.next=19;break}return p=n.tableData.findIndex((function(e){return e.userName==l})),p<0&&(b={country:t.country,mallInfo:t,userName:l,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push(b)),h="",1===n.messageList.length?h=n.messageList[0]:(g=n.messageList.filter((function(e){return e!==o})),_=Math.floor(Math.random()*g.length),h=g[_]),r.next=15,n.sendMessage("text",h,{},u,Number(t.platform_mall_id),f,t.country,m,c);case 15:x=r.sent,v=n.tableData.findIndex((function(e){return e.userName==l})),200===x.code?(o=h,n.$set(n.tableData[v],"remark","".concat(n.tableData[v].remark,"【消息发送成功】")),n.$set(n.tableData[v],"chatMessage",h)):(k="",x.data.message.includes("user_is_forbiddenUser is forbidden for this action")?k="该用户禁止发送消息":x.data.message||(k="此消息被平台屏蔽"),n.$set(n.tableData[v],"remark","".concat(n.tableData[v].remark,"【消息发送失败  ").concat(k,"】"))),console.log(x,"msgRes");case 19:if(!n.isSendDiscount){r.next=38;break}return r.next=22,n.sendDiscount(t.country,t.platform_mall_id);case 22:if(y=r.sent,w=n.tableData.findIndex((function(e){return e.userName==l})),w<0&&(D={country:t.country,mallInfo:t,userName:l,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push(D)),S=null,L="",y.length?"random"===n.radioDiscountType?(T=Math.floor(Math.random()*y.length),S=y[T]):(S=y.find((function(e){return e.name==n.discountName.trim()})),S||(L="【没有找到名为".concat(n.discountName,"】的优惠券"))):(S=null,L="【没有可以使用的优惠券】"),C=n.tableData.findIndex((function(e){return e.userName==l})),S){r.next=33;break}n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark).concat(L)),r.next=37;break;case 33:return r.next=35,n.sendMessage("voucher","",S,u,Number(t.platform_mall_id),f,t.country,m,c);case 35:$=r.sent,200===$.code?(n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark,"【优惠券发送成功】")),n.$set(n.tableData[C],"chatDiscount","".concat(S.name))):(M="",$.data.message.includes("user_is_forbiddenUser is forbidden for this action")?M="该用户禁止发送消息":msgRes.data.message||(M="此消息被平台屏蔽"),n.$set(n.tableData[C],"remark","".concat(n.tableData[C].remark,"【消息发送失败  ").concat(M,"】")));case 37:console.log(y,"vouchers");case 38:if(!n.isSendGoods){r.next=65;break}if(N=n.tableData.findIndex((function(e){return e.userName==l})),N<0&&(O={country:t.country,mallInfo:t,userName:l,userType:a,chatMessage:"",chatDiscount:"",chatGoods:"",remark:""},n.tableData.push(O)),I=null,R="",j={offset:0,limit:100,need_brand:0,need_item_model:0,is_ads:0,platform_mall_id:t.platform_mall_id,country:t.country},"random"!=n.radioGoodsType){r.next=51;break}return r.next=47,n.StoreSelection.productSelector(j);case 47:G=r.sent,200==G.code&&G.data.length?(z=Math.floor(Math.random()*G.data.length),I=G.data[z]):R="【没有可以发送的商品】",r.next=56;break;case 51:return j["id"]=n.GoodsId,r.next=54,n.StoreSelection.productSelector(j);case 54:B=r.sent,200==B.code&&B.data.length?I=B.data[0]:R="【没有找到商品ID为".concat(n.GoodsId,"的商品】");case 56:if(U=n.tableData.findIndex((function(e){return e.userName==l})),I){r.next=61;break}n.$set(n.tableData[U],"remark","".concat(n.tableData[U].remark).concat(R)),r.next=65;break;case 61:return r.next=63,n.sendMessage("product","",I,u,Number(t.platform_mall_id),f,t.country,m,c);case 63:A=r.sent,200===A.code?(n.$set(n.tableData[U],"remark","".concat(n.tableData[U].remark,"【商品发送成功】")),n.$set(n.tableData[U],"chatGoods","".concat(I.itemid))):(q="",A.data.message.includes("user_is_forbiddenUser is forbidden for this action")?q="该用户禁止发送消息":msgRes.data.message||(q="此消息被平台屏蔽"),n.$set(n.tableData[U],"remark","".concat(n.tableData[U].remark,"【消息发送失败  ").concat(q,"】")));case 65:return E=n.tableData.findIndex((function(e){return e.userName==l})),n.$set(n.tableData[E],"remark","".concat(n.tableData[E].remark,"【操作结束】")),r.next=69,Object(d["j"])(1e3*(n.sendTime||1));case 69:case"end":return r.stop()}}),r)})),l=0;case 4:if(!(l<e.length)){r.next=14;break}return r.delegateYield(i(l),"t0",6);case 6:if(u=r.t0,"continue"!==u){r.next=9;break}return r.abrupt("continue",11);case 9:if("object"!==Object(s["a"])(u)){r.next=11;break}return r.abrupt("return",u.v);case 11:l++,r.next=4;break;case 14:case"end":return r.stop()}}),r)}))(),"t0",19);case 19:if(p=r.t0,"object"!==Object(s["a"])(p)){r.next=22;break}return r.abrupt("return",p.v);case 22:r.next=25;break;case 24:n.$refs.Logs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】客服系统登录失败"),!1);case 25:r.next=31;break;case 27:r.prev=27,r.t1=r["catch"](2),n.$refs.Logs.writeLog("店铺【".concat(t.mall_alias_name||t.platform_mall_name,"】出现异常结束私聊"),!1),console.log(r.t1);case 31:case"end":return r.stop()}}),r,null,[[2,27]])})))()},sendDiscount:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,o,i,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={offset:0,limit:40,promotion_type:1,shop_id:t},s=[],n.next=4,a.$shopeemanService.getVouchers(e,r);case 4:o=n.sent,i=o.data.voucher_list;case 6:if(!i.length){n.next=21;break}if(!a.isStop){n.next=9;break}return n.abrupt("break",21);case 9:if(s=s.concat(i),!(i.length<40)){n.next=14;break}i=[],n.next=19;break;case 14:return r.promotion_type++,n.next=17,a.$shopeemanService.getVouchers(e,r);case 17:c=n.sent,i=c&&c.data&&c.data.voucher_list||[];case 19:n.next=6;break;case 21:return n.abrupt("return",s);case 22:case"end":return n.stop()}}),n)})))()},sendMessage:function(e,t,a,n,r,s,o,c,l){var u=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var d,m,f,p,b,h,g,_;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return _=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},g=function(){return _()+_()+"-"+_()+"-"+_()+"-"+_()+"-"+_()+_()+_()},d=(new Date).getTime(),m={},"text"==e&&(m={text:t}),"product"==e&&(m={product_id:a.itemid,shop_id:r}),"voucher"==e&&(m={voucher_code:a.voucher_code,voucher_id:a.voucher_id}),f={request_id:g(),to_id:n,type:e,content:m,chat_send_option:{force_send_cancel_order_warning:!1,comply_cancel_order_warning:!1},device_id:g(),shop_id:r},c&&(f["source_type"]="order",f["order_id"]=c,f["source_content"]={order_id:c,shop_id:r}),p=u.sha256("/webchat/api/v1.2/messages",f,d,l),b={headers:{referer:"/webchat/conversations","Content-Type":"text/plain;charset=UTF-8","x-s":p,"x-v":1,Authorization:"Bearer ".concat(s)},params:{_uid:"0-".concat(l),_ts:d,_v:"6.3.4"}},i.next=13,u.$shopeemanService.sendMessage(o,f,b);case 13:return h=i.sent,i.abrupt("return",h);case 15:case"end":return i.stop()}}),i)})))()},sha256:function(e,t,a,n){var r=e.match(/v\d+(.\d+)*/)[0],s="396c15ad-6d3e-4018-98be-cef58cb45cd0",o="6.1.1",i=r,l=n,u=t["request_id"],d=t["to_id"],m=t["type"],f="";"text"===m&&(f=t.content.text);var p="key=".concat(s,"&plat=").concat(o,"&ver=").concat(i,"&fromID=").concat(l,"&reqID=").concat(u,"&toID=").concat(d,"&timestamp=").concat(a,"&type=").concat(m,"&strinput=").concat(f),b="".concat(p),h=Object(c["sha256"])(b);return h},getOrderUser:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,s,o,i,c,l,u,d,m,f,p,b,h,g,_,x,v,k,y,w,D,S,L,T,C,$,M;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=[],"shipping"!==t){n.next=52;break}return s={page_size:40,page_number:1,total:0,sort_by:"confirmed_date_desc",shop_id:e.platform_mall_id},n.next=5,a.$shopeemanService.getToShipOrderIdList(e.country,s);case 5:if(o=n.sent,console.log(o,"toShip"),200!==o.code){n.next=43;break}i=o.data,c=i.package_list,l=i.total;case 9:if(!c.length){n.next=41;break}if(!a.isStop){n.next=12;break}return n.abrupt("break",41);case 12:u=[],d=0;case 14:if(!(d<c.length)){n.next=24;break}return m=c.slice(d,d+5),n.next=18,a.$shopeemanService.getDetailsByOrderIds(e.country,{from_seller_data:!1,orders:a.changeParams(m),shop_id:e.platform_mall_id});case 18:f=n.sent,console.log(f,"resDetail"),200===f.code&&(p=f.data&&f.data.orders||[],u=u.concat(f.data.orders),p&&p.length&&(a.filterCheck?(b=p.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*a.filterDays*60*60*1e3})),r=r.concat(b)):r=r.concat(p)));case 21:d+=5,n.next=14;break;case 24:if(h="",h=u[u.length-1].create_time,console.log(h,"lastTime",(new Date).getTime()-1e3*h>24*a.filterDays*60*60*1e3),!(c.length<40||h&&(new Date).getTime()-1e3*h>24*a.filterDays*60*60*1e3)){n.next=31;break}c=[],n.next=39;break;case 31:return console.log("toShip翻页--------------------"),s.page_number++,s.total=l,n.next=36,a.$shopeemanService.getToShipOrderIdList(e.country,s);case 36:g=n.sent,c=g&&g.data&&g.data.package_list||[],console.log("------下一页数量",c);case 39:n.next=9;break;case 41:n.next=50;break;case 43:if(403!==o.code){n.next=48;break}return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未登录"),!1),n.abrupt("return",!1);case 48:return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(o.code,"-").concat(o.data),!1),n.abrupt("return",!1);case 50:n.next=100;break;case 52:return _={from_page_number:1,source:t,page_size:40,page_number:1,total:0,is_massship:!1,shop_id:e.platform_mall_id},n.next=55,a.$shopeemanService.getOrderIdList(e.country,_);case 55:if(x=n.sent,console.log(x,"res-first"),200!==x.code){n.next=93;break}v=x.data,k=v.orders,y=v.page_info;case 59:if(!k.length){n.next=91;break}if(!a.isStop){n.next=62;break}return n.abrupt("break",91);case 62:w=[],D=0;case 64:if(!(D<k.length)){n.next=74;break}return S=k.slice(D,D+5),n.next=68,a.$shopeemanService.getDetailsByOrderIds(e.country,{from_seller_data:!1,orders:S,shop_id:e.platform_mall_id});case 68:L=n.sent,console.log(L,"resDetail"),200===L.code&&(T=L.data&&L.data.orders||[],w=w.concat(L.data.orders),T&&T.length&&(a.filterCheck?(C=T.filter((function(e){return(new Date).getTime()-1e3*e.create_time<24*a.filterDays*60*60*1e3})),console.log(C,"过滤"),r=r.concat(C)):r=r.concat(T)));case 71:D+=5,n.next=64;break;case 74:if($="",console.log("自动翻页",w,w[w.length-1]),$=w[w.length-1].create_time,console.log($,"lastTime",(new Date).getTime()-1e3*$>24*a.filterDays*60*60*1e3),!(k.length<40||$&&(new Date).getTime()-1e3*$>24*a.filterDays*60*60*1e3)){n.next=82;break}k=[],n.next=89;break;case 82:return console.log("other翻页--------------------"),_.page_number++,_.total=y.total,n.next=87,a.$shopeemanService.getOrderIdList(e.country,_);case 87:M=n.sent,k=M&&M.data&&M.data.orders||[];case 89:n.next=59;break;case 91:n.next=100;break;case 93:if(403!==x.code){n.next=98;break}return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】未登录"),!1),n.abrupt("return",!1);case 98:return a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(x.code,"-").concat(x.data),!1),n.abrupt("return",!1);case 100:return n.abrupt("return",r);case 101:case"end":return n.stop()}}),n)})))()},changeParams:function(e){var t=[];return e.forEach((function(e){var a={order_id:e.order_id,region_id:e.region_id||e.region,shop_id:e.shop_id};t.push(a)})),t},addMessage:function(){if(""!=this.sendText)return this.messageList.indexOf(this.sendText.trim())>-1?this.$message.warning("请不要添加重复信息!"):void this.messageList.push(this.sendText)},deleteMessage:function(e){console.log(e,"deleteMessage"),this.messageList.splice(e,1)},clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(e){console.log(e),this.selectMallList=e.mallList}}},f=m,p=(a("3cdd"),a("2877")),b=Object(p["a"])(f,n,r,!1,null,"19a4faff",null);t["default"]=b.exports},d39f:function(e,t,a){}}]);