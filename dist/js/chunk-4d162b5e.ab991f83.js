(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d162b5e"],{"15d2":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"detail"},[i("div",{staticClass:"condition",staticStyle:{"background-color":"white",padding:"8px"}},[i("div",{staticClass:"row1",staticStyle:{display:"flex"}},[i("storeChoose",{staticStyle:{"margin-left":"-20px"},attrs:{"is-all":!0,"show-mall-all":!0},on:{changeMallList:e.changeMallList}}),i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isgoodslike,callback:function(t){e.isgoodslike=t},expression:"isgoodslike"}},[e._v("商品点赞")]),i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.iscommentlike,callback:function(t){e.iscommentlike=t},expression:"iscommentlike"}},[e._v("评价点赞")]),i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isbuy,callback:function(t){e.isbuy=t},expression:"isbuy"}},[e._v("商品加入购物车")]),i("el-button",{attrs:{size:"mini",type:"primary",loading:e.btnloading},on:{click:e.start}},[e._v("开始")]),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopFun}},[e._v("停止")]),i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1),i("div",{staticClass:"row2",staticStyle:{display:"flex","margin-top":"25px"}},[i("div",{staticClass:"row2_left",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px"}},[i("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"110px"}},[e._v("商品点赞/加购设置")]),i("ul",[i("li",[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeCreateMinDay,callback:function(t){e.isunlikeCreateMinDay=t},expression:"isunlikeCreateMinDay"}}),e._v("不点赞（加购）创建天数小于 "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.unlikeCreateMinDay,callback:function(t){e.unlikeCreateMinDay=t},expression:"unlikeCreateMinDay"}}),e._v("的商品")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeSaleMin,callback:function(t){e.isunlikeSaleMin=t},expression:"isunlikeSaleMin"}}),e._v("不点赞（加购）销量小于 "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.unlikeSaleMin,callback:function(t){e.unlikeSaleMin=t},expression:"unlikeSaleMin"}}),e._v("的商品")],1)]),i("li",[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeViewMinDay,callback:function(t){e.isunlikeViewMinDay=t},expression:"isunlikeViewMinDay"}}),e._v("不点赞（加购）浏览数小于 "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.unlikeViewMinDay,callback:function(t){e.unlikeViewMinDay=t},expression:"unlikeViewMinDay"}}),e._v("的商品")],1),i("div",{staticStyle:{"margin-left":"10px"}},[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeLikeMinDay,callback:function(t){e.isunlikeLikeMinDay=t},expression:"isunlikeLikeMinDay"}}),e._v("不点赞（加购）喜欢数小于 "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.unlikeLikeMinDay,callback:function(t){e.unlikeLikeMinDay=t},expression:"unlikeLikeMinDay"}}),e._v("的商品")],1)]),i("li",[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isRandomLikeMinDay,callback:function(t){e.isRandomLikeMinDay=t},expression:"isRandomLikeMinDay"}}),e._v("随机点赞（加购） "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.RandomLikeMinDay,callback:function(t){e.RandomLikeMinDay=t},expression:"RandomLikeMinDay"}}),e._v("个商品")],1)])])]),i("div",{staticClass:"row2_right",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px","margin-left":"20px"}},[i("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("评价点赞设置")]),i("ul",[i("li",[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar5,callback:function(t){e.isunlikestar5=t},expression:"isunlikestar5"}}),e._v("不点赞五星评价 ")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar4,callback:function(t){e.isunlikestar4=t},expression:"isunlikestar4"}}),e._v("不点赞四星评价 ")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar3,callback:function(t){e.isunlikestar3=t},expression:"isunlikestar3"}}),e._v("不点赞三星评价 ")],1)]),i("li",[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar2,callback:function(t){e.isunlikestar2=t},expression:"isunlikestar2"}}),e._v("不点赞二星评价 ")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar1,callback:function(t){e.isunlikestar1=t},expression:"isunlikestar1"}}),e._v("不点赞一星评价 ")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikehaventContent,callback:function(t){e.isunlikehaventContent=t},expression:"isunlikehaventContent"}}),e._v("不点赞无内容评价 ")],1)]),i("li",{staticStyle:{"align-items":"baseline"}},[i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikehaventPic,callback:function(t){e.isunlikehaventPic=t},expression:"isunlikehaventPic"}}),e._v("不点赞无图评价 ")],1),i("div",[i("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeMonthAgoComment,callback:function(t){e.isunlikeMonthAgoComment=t},expression:"isunlikeMonthAgoComment"}}),e._v("不点赞 "),i("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.unlikeMonthAgoComment,callback:function(t){e.unlikeMonthAgoComment=t},expression:"unlikeMonthAgoComment"}}),e._v("天前的评价 ")],1)])])])]),i("span",{staticStyle:{color:"red",display:"block",margin:"8px 0px"}},[e._v("温馨提示：同一站点下，至少存在两个店铺以上才能进行操作")])]),i("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),i("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px",width:"calc(100vw - 360px)"}},[i("u-table",{attrs:{"row-style":{height:"50px"},data:e.tableList,height:"500px",width:"600px","header-cell-style":{background:"#f7fafa"}}},[i("u-table-column",{attrs:{prop:"mallName",label:"店铺名称",align:"center","min-width":"150px",fixed:""}}),i("u-table-column",{attrs:{prop:"name",label:"商品名称",align:"center","min-width":"150px","show-overflow-tooltip":""}}),i("u-table-column",{attrs:{prop:"itemid",label:"商品编号",align:"center","min-width":"100px"}}),i("u-table-column",{attrs:{prop:"currenTime",label:"创建时间",align:"center","min-width":"100px"}}),i("u-table-column",{attrs:{prop:"historical_sold",label:"历史销量",align:"center","min-width":"100px"}}),i("u-table-column",{attrs:{prop:"cmt_count",label:"浏览数",align:"center","min-width":"100px"}}),i("u-table-column",{attrs:{prop:"liked_count",label:"点赞数",align:"center","min-width":"100px"}}),i("u-table-column",{attrs:{prop:"option_result",label:"操作结果",align:"center","min-width":"100px",fixed:"right"}})],1)],1)],1)},a=[],r=i("2909"),s=i("1da1"),l=(i("a9e3"),i("159b"),i("99af"),i("c740"),i("96cf"),i("feb6")),o=i("0e0b"),c=i("e1e4"),u={components:{storeChoose:l["a"]},data:function(){return{btnloading:!1,shopAccountList:[],GoodsManagerAPIInstance:new c["a"](this),tableList:[],selectMall:[],showlog:!0,isgoodslike:!1,iscommentlike:!1,isbuy:!1,isunlikeCreateMinDay:!1,unlikeCreateMinDay:"",isunlikeSaleMin:!1,unlikeSaleMin:"",isunlikeViewMinDay:!1,unlikeViewMinDay:"",isunlikeLikeMinDay:!1,unlikeLikeMinDay:"",isRandomLikeMinDay:!1,RandomLikeMinDay:"",isunlikestar1:!1,isunlikestar2:!1,isunlikestar3:!1,isunlikestar4:!1,isunlikestar5:!1,isunlikehaventContent:!1,isunlikehaventPic:!1,isunlikeMonthAgoComment:!0,unlikeMonthAgoComment:30}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Object(o["p"])().then((function(t){e.shopAccountList=t}));case 1:case"end":return t.stop()}}),t)})))()},stopFun:function(){Object(o["u"])(),this.btnloading=!1,this.$refs.autoReplyLogs.writeLog("停止搜索")},randomLikegoods:function(e){for(var t=[],i=0;i<Number(e).length;i++){var n=Math.floor(500*Math.random());t.push(n)}return t},changeMallList:function(e){this.selectMall=e},start:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isgoodslike||e.iscommentlike||e.isbuy){t.next=3;break}return e.$message.warning("请选择要操作的选项"),t.abrupt("return");case 3:if(e.btnloading=!0,e.$refs.autoReplyLogs.consoleMsg="",!e.isgoodslike&&!e.isbuy){t.next=21;break}if(e.isunlikeCreateMinDay||e.isunlikeSaleMin||e.isunlikeViewMinDay||e.isunlikeLikeMinDay||e.isRandomLikeMinDay){t.next=9;break}return e.$message.warning("请选择点赞设置"),t.abrupt("return");case 9:if(!(e.isunlikeCreateMinDay&&!e.unlikeCreateMinDay||!e.isunlikeCreateMinDay&&e.unlikeCreateMinDay)){t.next=12;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 12:if(!(e.unlikeSaleMin&&!e.isunlikeSaleMin||!e.unlikeSaleMin&&e.isunlikeSaleMin)){t.next=15;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 15:if(!(e.isunlikeViewMinDay&&!e.unlikeViewMinDay||!e.isunlikeViewMinDay&&e.unlikeViewMinDay)){t.next=18;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 18:if(!(e.isunlikeLikeMinDay&&!e.unlikeLikeMinDay||!e.isunlikeLikeMinDay&&e.unlikeLikeMinDay)){t.next=21;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 21:if(!e.iscommentlike){t.next=28;break}if(e.isunlikestar5||e.isunlikestar4||e.isunlikestar3||e.isunlikestar2||e.isunlikestar1||e.isunlikehaventContent||e.isunlikehaventPic||e.isunlikeMonthAgoComment||e.unlikeMonthAgoComment){t.next=25;break}return e.$message.warning("请选择评价设置"),t.abrupt("return");case 25:if(!(!e.isunlikeMonthAgoComment&&e.unlikeMonthAgoComment||e.isunlikeMonthAgoComment&&!e.unlikeMonthAgoComment)){t.next=28;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 28:return e.selectMall.forEach((function(e){e.page=1,e.goodslist=[]})),e.$refs.autoReplyLogs.writeLog("开始获取店铺信息",!0),e.tableList=[],t.next=33,Object(o["c"])(e.selectMall,e.getMallsku);case 33:t.sent;case 34:case"end":return t.stop()}}),t)})))()},getMallsku:function(e){var t=arguments,i=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a,s,l,c,u,m;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,s={country:e.country,page_number:e.page,mallId:e.platform_mall_id,page_size:48},i.showlog=!1,n.next=6,i.GoodsManagerAPIInstance.getSkuList(s);case 6:if(l=n.sent,0!==l.ecode){n.next=30;break}if(i.$refs.autoReplyLogs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】店铺有").concat(l.data.page_info.total,"条数据，开始查找第【").concat(e.page,"】页数据,一页48条"),!0),m=[],!i.isRandomLikeMinDay||!i.RandomLikeMinDay){n.next=14;break}return n.next=13,i.randomLikegoods(l.data.page_info.total);case 13:m=n.sent;case 14:if(l.data.list.forEach((function(t,i){t.shopid=e.platform_mall_id,t.country=e.country;var n=m.findIndex((function(e){return e===i}));t.randowLike=n>=0,t.cm_offset=0})),(c=e.goodslist).push.apply(c,Object(r["a"])(l.data.list)),!((null===(u=l.data.list)||void 0===u?void 0:u.length)>=48)){n.next=21;break}e.page++,i.getMallsku(e,a={count:a.count++}),n.next=28;break;case 21:return i.$refs.autoReplyLogs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】查找完毕"),!0),i.$refs.autoReplyLogs.writeLog("开始获取【".concat(e.mall_alias_name||e.platform_mall_name,"】商品信息"),!0),n.next=25,Object(o["c"])(e.goodslist,i.getDetailGoods);case 25:n.sent,i.$refs.autoReplyLogs.writeLog("------获取结束-----",!0),i.btnloading=!1;case 28:n.next=31;break;case 30:i.$refs.autoReplyLogs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】数据获取失败,").concat(l.message),!1);case 31:n.next=36;break;case 33:n.prev=33,n.t0=n["catch"](1),i.$refs.autoReplyLogs.writeLog("catch---【".concat(e.mall_alias_name||e.platform_mall_name,"】第").concat(e.page,"}页数据获取失败,").concat(n.t0),!1);case 36:return n.prev=36,a.count--,n.finish(36);case 39:case"end":return n.stop()}}),n,null,[[1,33,36,39]])})))()},trantime:function(e){var t=new Date(1e3*Number(e)),i=t.getFullYear()+"-",n=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",a=t.getDate()+" ";return i+n+a},chekinfo:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={country:"TH",shopid:"267731383",itemid:7368998848,cmtid:4965369836},t.next=3,e.GoodsManagerAPIInstance.LikeItemRating(i);case 3:n=t.sent,0===n.ecode&&(n.data.ratings,e.$refs.autoReplyLogs.writeLog("总评论数【".concat(n.data.item_rating_summary.rating_total,"】获取第【").concat(item.cm_offset/6+1,"】页评论,一页51条"),!0));case 5:case"end":return t.stop()}}),t)})))()},getDetailGoods:function(e){var t=arguments,i=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=t.length>1&&void 0!==t[1]?t[1]:{count:1};try{i.getgoodsdetail(e,a)}catch(r){}finally{a.count--}case 2:case"end":return n.stop()}}),n)})))()},addToCart:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,t.GoodsManagerAPIInstance.addToCart(e);case 3:if(n=i.sent,t.$refs.autoReplyLogs.writeLog("【商品加购".concat(e.itemid,"】测试,").concat(JSON.stringify(n)),!0),0!==n.ecode){i.next=10;break}return t.$refs.autoReplyLogs.writeLog("【商品加购".concat(e.itemid,"】成功"),!0),i.abrupt("return",!0);case 10:return t.$refs.autoReplyLogs.writeLog("【商品加购".concat(e.itemid,"】失败，").concat(n.message),!1),i.abrupt("return",!1);case 12:i.next=18;break;case 14:return i.prev=14,i.t0=i["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【商品点赞".concat(e.itemid,"】失败"),!1),i.abrupt("return",!1);case 18:case"end":return i.stop()}}),i,null,[[0,14]])})))()},getgoodsdetail:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n,a,r,s,l,c,u,m,p;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,n={country:e.country,shopid:e.shopid,itemid:e.id},t.$refs.autoReplyLogs.writeLog("正在获取商品点赞数据",!0),i.next=5,t.GoodsManagerAPIInstance.getGoodsDetailinfo(n);case 5:if(a=i.sent,0!==a.ecode){i.next=68;break}return t.$refs.autoReplyLogs.writeLog("商品【".concat(e.id,"】详情获取成功"),!0),r=a.data,i.next=11,t.trantime(r.ctime);case 11:if(r.currenTime=i.sent,r.mallName=Object(o["a"])(t.shopAccountList,"label","value",r.shopid),r.option_result="",t.tableList.push(r),!t.iscommentlike){i.next=21;break}return t.$refs.autoReplyLogs.writeLog("正在获取获取评论信息",!0),i.next=19,t.getRatings(e);case 19:s=i.sent,t.$set(r,"option_result",s?"评论点赞成功":"评论点赞失败");case 21:if(!t.isgoodslike&&!t.isbuy){i.next=66;break}if(!t.isunlikeCreateMinDay){i.next=26;break}if(l=Math.round((new Date).getTime()/1e3),!((l-Number(r.ctime))/3600/24<=Number(t.unlikeCreateMinDay))){i.next=26;break}return i.abrupt("return");case 26:if(!t.isunlikeSaleMin){i.next=29;break}if(!(Number(r.historical_sold)<=Number(t.unlikeSaleMin))){i.next=29;break}return i.abrupt("return");case 29:if(!t.isunlikeViewMinDay){i.next=32;break}if(!(Number(r.cmt_count)<=Number(t.unlikeViewMinDay))){i.next=32;break}return i.abrupt("return");case 32:if(!t.isunlikeLikeMinDay){i.next=35;break}if(!(Number(r.liked_count)<=Number(t.unlikeLikeMinDay))){i.next=35;break}return i.abrupt("return");case 35:if(!t.isRandomLikeMinDay||!e.randowLike){i.next=37;break}return i.abrupt("return");case 37:if(!r.liked){i.next=41;break}return t.$refs.autoReplyLogs.writeLog("【商品".concat(r.itemid,"】不能重复点赞"),!1),t.$set(r,"option_result","商品不能重复点赞"),i.abrupt("return");case 41:if(!t.isgoodslike){i.next=48;break}return i.next=44,t.GoodsbuyerLike(n);case 44:c=i.sent,222,t.$set(r,"option_result",c?"商品点赞成功":"商品点赞失败");case 48:if(!t.isbuy){i.next=66;break}if(!(r.models.length>0)){i.next=65;break}u=0;case 51:if(!(u<r.models.length)){i.next=63;break}if(!(r.models[u].stock>0)){i.next=60;break}return m=n,m.modelid=r.models[u].modelid,i.next=57,t.addToCart(m);case 57:return p=i.sent,t.$set(r,"option_result",p?"商品加购成功":"商品加购失败"),i.abrupt("return");case 60:u++,i.next=51;break;case 63:i.next=66;break;case 65:return i.abrupt("return");case 66:i.next=69;break;case 68:t.$refs.autoReplyLogs.writeLog("商品【".concat(e.id,"】详情获取失败,").concat(JSON.stringify(a.message)),!1);case 69:i.next=74;break;case 71:i.prev=71,i.t0=i["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--商品【".concat(e.id,"】详情获取失败,").concat(i.t0),!1);case 74:case"end":return i.stop()}}),i,null,[[0,71]])})))()},LikeItemRatingFun:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,n={country:e.country,shopid:Number(e.shopid),itemid:Number(e.itemid),cmtid:Number(e.cmtid),like:!0},i.next=4,t.GoodsManagerAPIInstance.LikeItemRating(n);case 4:if(a=i.sent,t.$refs.autoReplyLogs.writeLog("【商品评论点赞".concat(e.itemid,"】测试,").concat(JSON.stringify(a)),!0),0!==a.ecode){i.next=11;break}return t.$refs.autoReplyLogs.writeLog("【商品评论点赞".concat(e.itemid,"】成功"),!0),i.abrupt("return",!0);case 11:return t.$refs.autoReplyLogs.writeLog("【商品评论点赞".concat(e.itemid,"】失败，").concat(JSON.stringify(a.message)),!1),i.abrupt("return",!1);case 14:i.next=20;break;case 16:return i.prev=16,i.t0=i["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【商品评论点赞".concat(e.itemid,"】失败,").concat(i.t0),!0),i.abrupt("return",!1);case 20:case"end":return i.stop()}}),i,null,[[0,16]])})))()},getRatings:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n,a,r,s,l,o,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=1,n={country:e.country,shopid:e.shopid,itemid:e.id,offset:e.cm_offset},i.next=5,t.GoodsManagerAPIInstance.getRatings(n);case 5:if(a=i.sent,0!==a.ecode){i.next=51;break}if(0!==a.data.ratings.length){i.next=11;break}return t.$refs.autoReplyLogs.writeLog("【".concat(n.itemid,"】暂无任何评论"),!0),i.abrupt("return",!1);case 11:r=a.data.ratings,t.$refs.autoReplyLogs.writeLog("【".concat(n.itemid,"】总评论数【").concat(a.data.item_rating_summary.rating_total,"】获取第【").concat(e.cm_offset/51+1,"】页评论,一页51条"),!0),s=0;case 14:if(!(s<r.length)){i.next=43;break}if(!r[s].liked){i.next=18;break}return t.$refs.autoReplyLogs.writeLog("【".concat(r[s].cmtid,"不可重复点赞】"),!1),i.abrupt("continue",40);case 18:if(!t.isunlikestar5||5!==Number(r[s].rating_star)){i.next=20;break}return i.abrupt("continue",40);case 20:if(!t.isunlikestar4||4!==Number(r[s].rating_star)){i.next=22;break}return i.abrupt("continue",40);case 22:if(!t.isunlikestar3||3!==Number(r[s].rating_star)){i.next=24;break}return i.abrupt("continue",40);case 24:if(!t.isunlikestar2||2!==Number(r[s].rating_star)){i.next=26;break}return i.abrupt("continue",40);case 26:if(!t.isunlikestar1||1!==Number(r[s].rating_star)){i.next=28;break}return i.abrupt("continue",40);case 28:if(!t.isunlikehaventContent||!r[s].comment){i.next=30;break}return i.abrupt("continue",40);case 30:if(!t.isunlikehaventPic||null!==(l=r[s].images)&&void 0!==l&&l.length){i.next=32;break}return i.abrupt("continue",40);case 32:if(!t.isunlikeMonthAgoComment){i.next=36;break}if(o=Math.round((new Date).getTime()/1e3)-86400*Number(t.unlikeMonthAgoComment),!(Number(r[s].mtime)-o>0)){i.next=36;break}return i.abrupt("continue",40);case 36:return c={country:e.country,shopid:e.shopid,itemid:e.id,cmtid:r[s].cmtid},i.next=39,t.LikeItemRatingFun(c);case 39:return i.abrupt("return",i.sent);case 40:s++,i.next=14;break;case 43:if(!(a.data.ratings.length>=51)){i.next=48;break}e.cm_offset=e.cm_offset+51,t.getRatings(e),i.next=49;break;case 48:return i.abrupt("return");case 49:i.next=52;break;case 51:t.$refs.autoReplyLogs.writeLog("【".concat(n.itemid,"】评论信息，获取失败").concat(JSON.stringify(a.message)),!1);case 52:i.next=57;break;case 54:i.prev=54,i.t0=i["catch"](1),t.$refs.autoReplyLogs.writeLog("catch--【".concat(e.id,"】评论信息，获取失败").concat(i.t0),!1);case 57:case"end":return i.stop()}}),i,null,[[1,54]])})))()},GoodsbuyerLike:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return 111,i.prev=2,i.next=5,t.GoodsManagerAPIInstance.GoodsbuyerLike(e);case 5:if(n=i.sent,a=JSON.stringify(n),t.$refs.autoReplyLogs.writeLog("【商品点赞".concat(e.itemid,"】测试,").concat(a),!0),0!==n.ecode){i.next=14;break}return t.$refs.autoReplyLogs.writeLog("【商品点赞".concat(e.itemid,"】成功"),!0),i.abrupt("return",!0);case 14:return t.$refs.autoReplyLogs.writeLog("【商品点赞".concat(e.itemid,"】失败,").concat(JSON.stringify(n.message)),!1),i.abrupt("return",!1);case 16:i.next=22;break;case 18:return i.prev=18,i.t0=i["catch"](2),t.$refs.autoReplyLogs.writeLog("catch--【商品点赞".concat(e.itemid,"】失败,").concat(i.t0),!1),i.abrupt("return",!1);case 22:case"end":return i.stop()}}),i,null,[[2,18]])})))()}}},m=u,p=(i("b7d4"),i("2877")),d=Object(p["a"])(m,n,a,!1,null,"25f8b559",null);t["default"]=d.exports},"4c28":function(e,t,i){},8992:function(e,t,i){"use strict";i("4c28")},b203:function(e,t,i){},b7d4:function(e,t,i){"use strict";i("b203")},feb6:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("ul",{staticClass:"storeChooseUL"},[i("li",{style:e.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),i("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?i("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return i("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),i("li",{style:e.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),i("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},[i("el-option",{attrs:{label:"全部",value:""}}),e._l(e.groupIdList,(function(e,t){return i("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})}))],2)],1),i("li",{style:e.isReset&&"margin-bottom: 5px"},[i("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),i("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:""},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[e.isShowName?e._e():i("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,n){return e.showMall(t,n)?i("el-option",{key:n,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?i("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[i("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},a=[],r=i("1da1"),s=i("2909"),l=(i("96cf"),i("99af"),i("d81d"),i("fb6a"),i("d3b7"),i("25f0"),i("159b"),i("c740"),i("7db0"),i("4de4"),i("caad"),i("2532"),i("7646")),o=i("2b0e");o["default"].directive("loadmore",{bind:function(e,t){var i=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");i.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var i=this;if(this.isAllowSet2){this.isAllowSet2=!1;var n=t.indexOf("")>-1,a=e.indexOf("")>-1;n!==a?this.groupId=a?[""].concat(Object(s["a"])(this.groupIdList.map((function(e){return e.id})))):[]:a?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){i.isAllowSet2=!0,i.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var i=this;if(this.isAllowSet1){this.isAllowSet1=!1;var n=t.indexOf("")>-1,a=e.indexOf("")>-1;n!==a?this.site=a?[""].concat(Object(s["a"])(this.siteList.map((function(e){return e.platform_mall_id})))):[]:a?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){i.changeMallList(),i.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.site=[],i=t.countryVal,n=t.groupId.indexOf("")>-1&&t.groupId.slice(1).toString()||t.groupId.toString(),a={country:i,mallGroupIds:n},e.next=6,t.mallListAPIInstance.ddMallGoodsGetMallList(a);case 6:r=e.sent,200===r.code?(t.siteList=r.data,0===t.groupIdList.length&&(t.groupId=[""],t.siteList.forEach((function(e){var i=t.groupIdList.findIndex((function(t){return t.id===e.group_id}));e.group_name&&i<0&&(t.groupIdList.push({group_name:e.group_name,id:e.group_id}),t.groupId.push(e.group_id))}))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=[""]}),10)):t.$message.error("获取分组、店铺列表失败");case 8:case"end":return e.stop()}}),e)})))()},changeMallList:function(){var e=this,t=[],i="";this.site.forEach((function(n){if(n){var a=e.siteList.find((function(e){return e.platform_mall_id===n}));t.push(a),i+=n+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(i=t.length!==this.siteList.length&&i||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:i,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){this.isShowName=e||"";var t=this.siteList.filter((function(t){var i=t.mall_alias_name||t.platform_mall_name;return i.includes(e)}));this.showMallNumber=t.length-this.showMallNumber;var i=this.siteList.filter((function(t){var i=t.mall_alias_name||t.platform_mall_name;return!i.includes(e)}));this.siteShowList=[].concat(Object(s["a"])(t),Object(s["a"])(i))},showMall:function(e,t){var i=e.mall_alias_name||e.platform_mall_name,n=this.site[0]===e.platform_mall_id;return n||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||i.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var i=0;e?(i=this.mallShowIndex+10,i=i<this.siteShowList.length&&i||this.mallShowIndex):(i=this.mallShowIndex-10,i=i>0&&i||0),i!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=i}}}},u=c,m=(i("8992"),i("2877")),p=Object(m["a"])(u,n,a,!1,null,null,null);t["a"]=p.exports}}]);