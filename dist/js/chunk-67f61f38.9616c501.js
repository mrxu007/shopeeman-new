(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67f61f38"],{"15d2":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"detail"},[n("div",{staticClass:"condition",staticStyle:{"background-color":"white",padding:"8px"}},[n("div",{staticClass:"row1",staticStyle:{display:"flex"}},[n("storeChoose",{staticStyle:{"margin-left":"-20px"},attrs:{"is-all":!0,"show-mall-all":!0},on:{changeMallList:e.changeMallList}}),n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isgoodslike,callback:function(t){e.isgoodslike=t},expression:"isgoodslike"}},[e._v("商品点赞")]),n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.iscommentlike,callback:function(t){e.iscommentlike=t},expression:"iscommentlike"}},[e._v("评价点赞")]),n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isbuy,callback:function(t){e.isbuy=t},expression:"isbuy"}},[e._v("商品加入购物车")]),n("el-button",{attrs:{size:"mini",type:"primary",loading:e.btnloading},on:{click:e.start}},[e._v("开始")]),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopFun}},[e._v("停止")]),n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1),n("div",{staticClass:"row2",staticStyle:{display:"flex","margin-top":"25px"}},[n("div",{staticClass:"row2_left",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px"}},[n("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"110px"}},[e._v("商品点赞/加购设置")]),n("ul",[n("li",[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeCreateMinDay,callback:function(t){e.isunlikeCreateMinDay=t},expression:"isunlikeCreateMinDay"}}),e._v("不点赞（加购）创建天数小于 "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.unlikeCreateMinDay,callback:function(t){e.unlikeCreateMinDay=t},expression:"unlikeCreateMinDay"}}),e._v("的商品")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeSaleMin,callback:function(t){e.isunlikeSaleMin=t},expression:"isunlikeSaleMin"}}),e._v("不点赞（加购）销量小于 "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.unlikeSaleMin,callback:function(t){e.unlikeSaleMin=t},expression:"unlikeSaleMin"}}),e._v("的商品")],1)]),n("li",[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeViewMinDay,callback:function(t){e.isunlikeViewMinDay=t},expression:"isunlikeViewMinDay"}}),e._v("不点赞（加购）浏览数小于 "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.unlikeViewMinDay,callback:function(t){e.unlikeViewMinDay=t},expression:"unlikeViewMinDay"}}),e._v("的商品")],1),n("div",{staticStyle:{"margin-left":"10px"}},[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeLikeMinDay,callback:function(t){e.isunlikeLikeMinDay=t},expression:"isunlikeLikeMinDay"}}),e._v("不点赞（加购）喜欢数小于 "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.unlikeLikeMinDay,callback:function(t){e.unlikeLikeMinDay=t},expression:"unlikeLikeMinDay"}}),e._v("的商品")],1)]),n("li",[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isRandomLikeMinDay,callback:function(t){e.isRandomLikeMinDay=t},expression:"isRandomLikeMinDay"}}),e._v("随机点赞（加购） "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.RandomLikeMinDay,callback:function(t){e.RandomLikeMinDay=t},expression:"RandomLikeMinDay"}}),e._v("个商品")],1)])])]),n("div",{staticClass:"row2_right",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px","margin-left":"20px"}},[n("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("评价点赞设置")]),n("ul",[n("li",[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar5,callback:function(t){e.isunlikestar5=t},expression:"isunlikestar5"}}),e._v("不点赞五星评价 ")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar4,callback:function(t){e.isunlikestar4=t},expression:"isunlikestar4"}}),e._v("不点赞四星评价 ")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar3,callback:function(t){e.isunlikestar3=t},expression:"isunlikestar3"}}),e._v("不点赞三星评价 ")],1)]),n("li",[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar2,callback:function(t){e.isunlikestar2=t},expression:"isunlikestar2"}}),e._v("不点赞二星评价 ")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikestar1,callback:function(t){e.isunlikestar1=t},expression:"isunlikestar1"}}),e._v("不点赞一星评价 ")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikehaventContent,callback:function(t){e.isunlikehaventContent=t},expression:"isunlikehaventContent"}}),e._v("不点赞无内容评价 ")],1)]),n("li",{staticStyle:{"align-items":"baseline"}},[n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikehaventPic,callback:function(t){e.isunlikehaventPic=t},expression:"isunlikehaventPic"}}),e._v("不点赞无图评价 ")],1),n("div",[n("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.isunlikeMonthAgoComment,callback:function(t){e.isunlikeMonthAgoComment=t},expression:"isunlikeMonthAgoComment"}}),e._v("不点赞 "),n("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.unlikeMonthAgoComment,callback:function(t){e.unlikeMonthAgoComment=t},expression:"unlikeMonthAgoComment"}}),e._v("天前的评价 ")],1)])])])]),n("span",{staticStyle:{color:"red",display:"block",margin:"8px 0px"}},[e._v("温馨提示：同一站点下，至少存在两个店铺以上才能进行操作")])]),n("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),n("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px",width:"calc(100vw - 360px)"}},[n("u-table",{attrs:{"row-style":{height:"50px"},data:e.tableList,height:"800px",width:"600px","header-cell-style":{background:"#f7fafa"}}},[n("u-table-column",{attrs:{type:"index",width:"55",label:"序号"}}),n("u-table-column",{attrs:{prop:"mallName",label:"店铺名称",align:"center","min-width":"150px"}}),n("u-table-column",{attrs:{prop:"name",label:"商品名称",align:"center","min-width":"150px","show-overflow-tooltip":""}}),n("u-table-column",{attrs:{prop:"itemid",label:"商品编号",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{attrs:{type:"text"},on:{click:function(t){return e.open(i)}}},[e._v(e._s(i.itemid))])]}}])}),n("u-table-column",{attrs:{prop:"currenTime",label:"创建时间",align:"center","min-width":"100px"}}),n("u-table-column",{attrs:{prop:"historical_sold",label:"历史销量",align:"center","min-width":"80px"}}),n("u-table-column",{attrs:{prop:"cmt_count",label:"浏览数",align:"center","min-width":"80px"}}),n("u-table-column",{attrs:{prop:"liked_count",label:"点赞数",align:"center","min-width":"80px"}}),n("u-table-column",{attrs:{prop:"option_result",label:"操作结果",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("div",["评论点赞成功"===i.option_result.iscommentLike?n("span",{staticStyle:{color:"green"}},[e._v(e._s(i.option_result.iscommentLike))]):n("span",{staticStyle:{color:"red"}},[e._v(e._s(i.option_result.iscommentLike))])]),n("div",["商品点赞成功"===i.option_result.isgoodsLike?n("span",{staticStyle:{color:"green"}},[e._v(e._s(i.option_result.isgoodsLike))]):n("span",{staticStyle:{color:"red"}},[e._v(e._s(i.option_result.isgoodsLike))])]),n("div",["商品加购成功"===i.option_result.isbuy?n("span",{staticStyle:{color:"green"}},[e._v(e._s(i.option_result.isbuy))]):n("span",{staticStyle:{color:"red"}},[e._v(e._s(i.option_result.isbuy))])])]}}])})],1)],1)],1)},a=[],r=n("1da1"),s=(n("96cf"),n("d3b7"),n("25f0"),n("99af"),n("a9e3"),n("159b"),n("3ca3"),n("ddb0"),n("c740"),n("feb6")),l=n("0e0b"),o=n("e1e4"),u={components:{storeChoose:s["a"]},data:function(){return{addMax:"",btnloading:!1,shopAccountList:[],GoodsManagerAPIInstance:new o["a"](this),tableList:[],selectMall:[],showlog:!0,isgoodslike:!1,iscommentlike:!1,isbuy:!1,isunlikeCreateMinDay:!1,unlikeCreateMinDay:"",isunlikeSaleMin:!1,unlikeSaleMin:"",isunlikeViewMinDay:!1,unlikeViewMinDay:"",isunlikeLikeMinDay:!1,unlikeLikeMinDay:"",isRandomLikeMinDay:!1,RandomLikeMinDay:"",isunlikestar1:!0,isunlikestar2:!0,isunlikestar3:!0,isunlikestar4:!1,isunlikestar5:!1,isunlikehaventContent:!1,isunlikehaventPic:!1,isunlikeMonthAgoComment:!0,unlikeMonthAgoComment:30}},mounted:function(){this.getInfo()},methods:{open:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.selectMall.country,a={mallId:e.shopid.toString()},n.next=4,t.$shopeemanService.getWebUrlLocal(i,a);case 4:r=n.sent,t.$BaseUtilService.openUrl("".concat(r,"/product/").concat(e.shopid,"/").concat(e.itemid));case 6:case"end":return n.stop()}}),n)})))()},getInfo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Object(l["s"])().then((function(t){e.shopAccountList=t}));case 1:case"end":return t.stop()}}),t)})))()},stopFun:function(){Object(l["B"])(),this.btnloading=!1,this.$refs.autoReplyLogs.writeLog("停止搜索",!0)},randomLikegoods:function(e){for(var t=[],n=0;n<Number(e).length;n++){var i=Math.floor(48*Math.random());t.push(i)}return t},changeMallList:function(e){this.selectMall=e},start:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.selectMall.length<2)){t.next=3;break}return e.$message.warning("统一站点下，请至少选择两个店铺"),t.abrupt("return");case 3:if(e.isgoodslike||e.iscommentlike||e.isbuy){t.next=6;break}return e.$message.warning("请选择要操作的选项"),t.abrupt("return",!1);case 6:if(e.$refs.autoReplyLogs.consoleMsg="",!e.isgoodslike&&!e.isbuy){t.next=20;break}if(!(e.isunlikeCreateMinDay&&!e.unlikeCreateMinDay||!e.isunlikeCreateMinDay&&e.unlikeCreateMinDay)){t.next=11;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 11:if(!(e.unlikeSaleMin&&!e.isunlikeSaleMin||!e.unlikeSaleMin&&e.isunlikeSaleMin)){t.next=14;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 14:if(!(e.isunlikeViewMinDay&&!e.unlikeViewMinDay||!e.isunlikeViewMinDay&&e.unlikeViewMinDay)){t.next=17;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 17:if(!(e.isunlikeLikeMinDay&&!e.unlikeLikeMinDay||!e.isunlikeLikeMinDay&&e.unlikeLikeMinDay)){t.next=20;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 20:if(!e.iscommentlike){t.next=27;break}if(e.isunlikestar5||e.isunlikestar4||e.isunlikestar3||e.isunlikestar2||e.isunlikestar1||e.isunlikehaventContent||e.isunlikehaventPic||e.isunlikeMonthAgoComment||e.unlikeMonthAgoComment){t.next=24;break}return e.$message.warning("请选择评价设置"),t.abrupt("return");case 24:if(!(!e.isunlikeMonthAgoComment&&e.unlikeMonthAgoComment||e.isunlikeMonthAgoComment&&!e.unlikeMonthAgoComment)){t.next=27;break}return e.$message.warning("请确保勾选项及内容正确"),t.abrupt("return");case 27:return e.selectMall.forEach((function(e){e.page=1,e.goodslist=[]})),e.$refs.autoReplyLogs.writeLog("开始获取店铺信息",!0),e.tableList=[],e.btnloading=!0,t.next=33,Object(l["d"])(e.selectMall,e.getMallsku);case 33:e.btnloading=!1,e.$refs.autoReplyLogs.writeLog("信息获取结束",!0);case 35:case"end":return t.stop()}}),t)})))()},getMallsku:function(e){var t=arguments,n=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:{count:1},i.prev=1,i.delegateYield(regeneratorRuntime.mark((function t(){var i,a,r,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={country:e.country,page_number:e.page,mallId:e.platform_mall_id,page_size:48},n.showlog=!1,t.next=4,n.GoodsManagerAPIInstance.getSkuList(i);case 4:a=t.sent,r=0===a.ecode?a.data.list:[],s=[];case 7:if(!r.length){t.next=23;break}return console.log("markeLike",s.length),r.forEach((function(t,i){t.shopid=e.platform_mall_id,t.country=e.country,t.cm_offset=0,n.isRandomLikeMinDay&&n.RandomLikeMinDay&&(t.randowLike=s.length<Number(n.RandomLikeMinDay),s.length<Number(n.RandomLikeMinDay)&&s.push(t))})),t.next=12,n.getgoodsdetail(r);case 12:if(!(r.length<48)){t.next=16;break}r=[],t.next=21;break;case 16:return i.page_number++,t.next=19,n.GoodsManagerAPIInstance.getSkuList(i);case 19:l=t.sent,r=0===l.ecode?l.data.list:[];case 21:t.next=7;break;case 23:n.$refs.autoReplyLogs.writeLog("------【".concat(e.mall_alias_name||e.platform_mall_name,"】获取结束-----"),!0);case 24:case"end":return t.stop()}}),t)}))(),"t0",3);case 3:i.next=8;break;case 5:i.prev=5,i.t1=i["catch"](1),n.$refs.autoReplyLogs.writeLog("catch---【".concat(e.mall_alias_name||e.platform_mall_name,"】第").concat(e.page,"}页数据获取失败,").concat(i.t1),!1);case 8:return i.prev=8,a.count--,i.finish(8);case 11:case"end":return i.stop()}}),i,null,[[1,5,8,11]])})))()},trantime:function(e){var t=new Date(1e3*Number(e)),n=t.getFullYear()+"-",i=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",a=t.getDate()+" ";return n+i+a},chekinfo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={country:"TH",shopid:"267731383",itemid:7368998848,cmtid:4965369836},t.next=3,e.GoodsManagerAPIInstance.LikeItemRating(n);case 3:i=t.sent,0===i.ecode&&(i.data.ratings,e.$refs.autoReplyLogs.writeLog("总评论数【".concat(i.data.item_rating_summary.rating_total,"】获取第【").concat(item.cm_offset/6+1,"】页评论,一页51条")));case 5:case"end":return t.stop()}}),t)})))()},addGoodsFun:function(e,t,n){var i=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var r,s,l,o,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!i.isbuy){a.next=40;break}if(i.btnloading){a.next=3;break}return a.abrupt("return");case 3:if(!i.isunlikeCreateMinDay){a.next=7;break}if(r=Math.round((new Date).getTime()/1e3),!((r-Number(n.ctime))/3600/24<=Number(i.unlikeCreateMinDay))){a.next=7;break}return a.abrupt("return");case 7:if(!i.isunlikeSaleMin){a.next=10;break}if(!(Number(n.historical_sold)<=Number(i.unlikeSaleMin))){a.next=10;break}return a.abrupt("return");case 10:if(!i.isunlikeViewMinDay){a.next=13;break}if(!(Number(n.cmt_count)<=Number(i.unlikeViewMinDay))){a.next=13;break}return a.abrupt("return");case 13:if(!i.isunlikeLikeMinDay){a.next=16;break}if(!(Number(n.liked_count)<=Number(i.unlikeLikeMinDay))){a.next=16;break}return a.abrupt("return");case 16:if(!i.isRandomLikeMinDay||t.randowLike){a.next=18;break}return a.abrupt("return");case 18:if(!(n.models.length>0)){a.next=39;break}s=0;case 20:if(!(s<n.models.length)){a.next=37;break}if(i.btnloading){a.next=23;break}return a.abrupt("return");case 23:if(!(n.models[s].stock>0)){a.next=34;break}return l=e,l.modelid=n.models[s].modelid,a.next=28,i.addToCart(l);case 28:return o=a.sent,n.option_result.isbuy=o?"商品加购成功":"商品加购失败",i.addMax&&(n.option_result.isbuy=i.addMax),u=i.tableList.findIndex((function(e){return e===n})),u>=0?i.$set(n,"option_result",n.option_result):i.tableList.push(n),a.abrupt("return");case 34:s++,a.next=20;break;case 37:a.next=40;break;case 39:return a.abrupt("return");case 40:case"end":return a.stop()}}),a)})))()},commentFun:function(e,t){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!n.iscommentlike){i.next=11;break}if(n.btnloading){i.next=3;break}return i.abrupt("return");case 3:return n.$refs.autoReplyLogs.writeLog("正在获取评论信息"),i.next=6,n.getRatings(e);case 6:a=i.sent,a&&n.$set(t,"liked_count",t.liked_count+1),t.option_result.iscommentLike=a?"评论点赞成功":"评论点赞失败",r=n.tableList.findIndex((function(e){return e===t})),r>=0?n.$set(t,"option_result",t.option_result):n.tableList.push(t);case 11:case"end":return i.stop()}}),i)})))()},goodsLikeFun:function(e,t,n){var i=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var r,s,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!i.isgoodslike){a.next=32;break}if(i.btnloading){a.next=3;break}return a.abrupt("return");case 3:if(!i.isunlikeCreateMinDay){a.next=7;break}if(r=Math.round((new Date).getTime()/1e3),!((r-Number(n.ctime))/3600/24<=Number(i.unlikeCreateMinDay))){a.next=7;break}return a.abrupt("return");case 7:if(!i.isunlikeSaleMin){a.next=10;break}if(!(Number(n.historical_sold)<=Number(i.unlikeSaleMin))){a.next=10;break}return a.abrupt("return");case 10:if(!i.isunlikeViewMinDay){a.next=13;break}if(!(Number(n.cmt_count)<=Number(i.unlikeViewMinDay))){a.next=13;break}return a.abrupt("return");case 13:if(!i.isunlikeLikeMinDay){a.next=16;break}if(!(Number(n.liked_count)<=Number(i.unlikeLikeMinDay))){a.next=16;break}return a.abrupt("return");case 16:if(!i.isRandomLikeMinDay||t.randowLike){a.next=18;break}return a.abrupt("return");case 18:if(i.btnloading){a.next=20;break}return a.abrupt("return");case 20:if(!n.liked){a.next=26;break}return i.$refs.autoReplyLogs.writeLog("【商品".concat(n.itemid,"】不能重复点赞"),!1),n.option_result.isgoodsLike="商品不能重复点赞",s=i.tableList.findIndex((function(e){return e===n})),s>=0?i.$set(n,"option_result",n.option_result):i.tableList.push(n),a.abrupt("return");case 26:return a.next=28,i.GoodsbuyerLike(e);case 28:l=a.sent,n.option_result.isgoodsLike=l?"商品点赞成功":"商品点赞失败",i.$set(n,"option_result",n.option_result),l&&i.$set(n,"liked_count",n.liked_count+1);case 32:case"end":return a.stop()}}),a)})))()},addToCart:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.prev=0,t.btnloading){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,t.GoodsManagerAPIInstance.addToCart(e);case 5:if(i=n.sent,t.btnloading){n.next=8;break}return n.abrupt("return");case 8:if(0!==i.ecode){n.next=15;break}if(t.btnloading){n.next=11;break}return n.abrupt("return");case 11:return t.$refs.autoReplyLogs.writeLog("【商品加购".concat(e.itemid,"】成功"),!0),n.abrupt("return",!0);case 15:if(t.btnloading){n.next=17;break}return n.abrupt("return");case 17:return a="","This product has been suspended/deleted. You can buy other products."===i.message&&(a="此产品已被暂停/删除"),"You already have 1 quantity in cart. Unable to add selected quantity to cart as it would exceed your purchase limit."===i.message&&(a="加购数量已达上限",t.addMax="加购数量已达上限"),"Sản phẩm này đã bị khóa/xóa. Vui lòng mua sản phẩm khác."===i.message&&(a="此产品已锁定并被删除"),t.$refs.autoReplyLogs.writeLog("【商品加购".concat(e.itemid,"】失败，").concat(a||i.message),!1),n.abrupt("return",!1);case 23:n.next=30;break;case 25:return n.prev=25,n.t0=n["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【商品点赞".concat(e.itemid,"】失败"),!1),console.log("---addToCart-catch","".concat(n.t0)),n.abrupt("return",!1);case 30:case"end":return n.stop()}}),n,null,[[0,25]])})))()},getgoodsdetail:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a,r,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=0;case 1:if(!(i<e.length)){n.next=38;break}if(a=e[i],r={country:a.country,shopid:a.shopid,itemid:a.id},t.btnloading){n.next=6;break}return n.abrupt("return");case 6:return t.$refs.autoReplyLogs.writeLog("正在获取商品详情"),n.prev=7,n.next=10,t.GoodsManagerAPIInstance.getGoodsDetailinfo(r);case 10:if(s=n.sent,0!==s.ecode){n.next=26;break}if(t.btnloading){n.next=14;break}return n.abrupt("return");case 14:return t.$refs.autoReplyLogs.writeLog("商品【".concat(a.id,"】详情获取成功")),o=s.data,n.next=18,t.trantime(o.ctime);case 18:o.currenTime=n.sent,o.mallName=Object(l["a"])(t.shopAccountList,"label","value",o.shopid),o.option_result={iscommentLike:"",isgoodsLike:"",isbuy:""},t.addGoodsFun(r,a,o),t.commentFun(a,o),t.goodsLikeFun(r,a,o),n.next=29;break;case 26:if(t.btnloading){n.next=28;break}return n.abrupt("return",null);case 28:t.$refs.autoReplyLogs.writeLog("商品【".concat(a.id,"】详情获取失败,").concat(JSON.stringify(s.message)),!1);case 29:n.next=35;break;case 31:n.prev=31,n.t0=n["catch"](7),console.log(n.t0),t.$refs.autoReplyLogs.writeLog("catch--商品【".concat(a.id,"】详情获取失败,").concat(n.t0),!1);case 35:i++,n.next=1;break;case 38:console.log("----",t.tableList);case 39:case"end":return n.stop()}}),n,null,[[7,31]])})))()},LikeItemRatingFun:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.prev=0,i={country:e.country,shopid:Number(e.shopid),itemid:Number(e.itemid),cmtid:Number(e.cmtid),like:!0},t.btnloading){n.next=4;break}return n.abrupt("return");case 4:return n.next=6,t.GoodsManagerAPIInstance.LikeItemRating(i);case 6:if(a=n.sent,0!==a.ecode){n.next=14;break}if(t.btnloading){n.next=10;break}return n.abrupt("return");case 10:return t.$refs.autoReplyLogs.writeLog("【商品评论点赞".concat(e.itemid,"】成功"),!0),n.abrupt("return",!0);case 14:if(t.btnloading){n.next=16;break}return n.abrupt("return");case 16:return t.$refs.autoReplyLogs.writeLog("【商品评论点赞".concat(e.itemid,"】失败，").concat(JSON.stringify(a.message)),!1),n.abrupt("return",!1);case 18:n.next=24;break;case 20:return n.prev=20,n.t0=n["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【商品评论点赞".concat(e.itemid,"】失败,").concat(n.t0),!0),n.abrupt("return",!1);case 24:case"end":return n.stop()}}),n,null,[[0,20]])})))()},getRatings:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a,r,s,l,o,u,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.prev=0,i={country:e.country,shopid:e.shopid,itemid:e.id,offset:e.cm_offset},t.btnloading){n.next=4;break}return n.abrupt("return");case 4:return n.next=6,t.GoodsManagerAPIInstance.getRatings(i);case 6:if(a=n.sent,0!==a.ecode){n.next=56;break}if(t.btnloading){n.next=10;break}return n.abrupt("return");case 10:if(0!==a.data.ratings.length){n.next=13;break}return t.$refs.autoReplyLogs.writeLog("【".concat(i.itemid,"】暂无任何评论,点赞失败"),!1),n.abrupt("return");case 13:r=a.data.ratings,t.$refs.autoReplyLogs.writeLog("【".concat(i.itemid,"】总评论数【").concat(a.data.item_rating_summary.rating_total,"】获取第【").concat(e.cm_offset/51+1,"】页评论,一页51条")),s=0;case 16:if(!(s<r.length)){n.next=48;break}if(t.btnloading){n.next=19;break}return n.abrupt("return");case 19:if(!r[s].liked){n.next=22;break}return t.$refs.autoReplyLogs.writeLog("【".concat(r[s].cmtid,"不可重复点赞】"),!1),n.abrupt("continue",45);case 22:if(!t.isunlikestar5||5!==Number(r[s].rating_star)){n.next=24;break}return n.abrupt("continue",45);case 24:if(!t.isunlikestar4||4!==Number(r[s].rating_star)){n.next=26;break}return n.abrupt("continue",45);case 26:if(!t.isunlikestar3||3!==Number(r[s].rating_star)){n.next=28;break}return n.abrupt("continue",45);case 28:if(!t.isunlikestar2||2!==Number(r[s].rating_star)){n.next=30;break}return n.abrupt("continue",45);case 30:if(!t.isunlikestar1||1!==Number(r[s].rating_star)){n.next=32;break}return n.abrupt("continue",45);case 32:if(!t.isunlikehaventContent||!r[s].comment){n.next=34;break}return n.abrupt("continue",45);case 34:if(!t.isunlikehaventPic||null!==(l=r[s].images)&&void 0!==l&&l.length){n.next=36;break}return n.abrupt("continue",45);case 36:if(!t.isunlikeMonthAgoComment){n.next=40;break}if(o=Math.round((new Date).getTime()/1e3)-86400*Number(t.unlikeMonthAgoComment),!(Number(r[s].mtime)-o>0)){n.next=40;break}return n.abrupt("continue",45);case 40:return u={country:e.country,shopid:e.shopid,itemid:e.id,cmtid:r[s].cmtid},n.next=43,t.LikeItemRatingFun(u);case 43:return c=n.sent,n.abrupt("return",c);case 45:s++,n.next=16;break;case 48:if(!(a.data.ratings.length>=51)){n.next=53;break}e.cm_offset=e.cm_offset+51,t.btnloading&&t.getRatings(e),n.next=54;break;case 53:return n.abrupt("return");case 54:n.next=59;break;case 56:if(t.btnloading){n.next=58;break}return n.abrupt("return");case 58:t.$refs.autoReplyLogs.writeLog("【".concat(i.itemid,"】评论信息，获取失败").concat(JSON.stringify(a.message)),!1);case 59:n.next=64;break;case 61:n.prev=61,n.t0=n["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【".concat(e.id,"】评论信息，获取失败").concat(n.t0),!1);case 64:case"end":return n.stop()}}),n,null,[[0,61]])})))()},GoodsbuyerLike:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.prev=0,t.btnloading){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,t.GoodsManagerAPIInstance.GoodsbuyerLike(e);case 5:if(i=n.sent,JSON.stringify(i),0!==i.ecode){n.next=14;break}if(t.btnloading){n.next=10;break}return n.abrupt("return");case 10:return t.$refs.autoReplyLogs.writeLog("【商品点赞".concat(e.itemid,"】成功"),!0),n.abrupt("return",!0);case 14:if(t.btnloading){n.next=16;break}return n.abrupt("return");case 16:return t.$refs.autoReplyLogs.writeLog("【商品点赞".concat(e.itemid,"】失败,").concat(JSON.stringify(i.message)),!1),n.abrupt("return",!1);case 18:n.next=24;break;case 20:return n.prev=20,n.t0=n["catch"](0),t.$refs.autoReplyLogs.writeLog("catch--【商品点赞".concat(e.itemid,"】失败,").concat(n.t0),!1),n.abrupt("return",!1);case 24:case"end":return n.stop()}}),n,null,[[0,20]])})))()}}},c=u,d=(n("7f3a"),n("2877")),p=Object(d["a"])(c,i,a,!1,null,"02583835",null);t["default"]=p.exports},"1c6f":function(e,t,n){},"4c28":function(e,t,n){},"7f3a":function(e,t,n){"use strict";n("1c6f")},8992:function(e,t,n){"use strict";n("4c28")},feb6:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"storeChooseUL"},[e.isMall?n("li",[e._v(e._s(e._f("chineseSite")(e.countryVal)))]):n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("所属站点：")]),n("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:e.isBanPerform},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?n("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("店铺分组：")]),n("el-select",{staticClass:"selectBox",attrs:{disabled:e.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},e._l(e.groupIdList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.group_name,value:e.id}})})),1)],1),n("li",{style:e.isReset&&"margin-bottom: 5px"},[n("span",{style:{width:e.spanWidth}},[e._v("店铺名称：")]),n("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:e.isBanPerform,placeholder:"",multiple:!e.isAShop,"collapse-tags":"","filter-method":e.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(t){return e.filterMall("")}},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[e.isAShop?e._e():n("el-option",{attrs:{label:"全部",value:""}}),e._l(e.siteShowList,(function(t,i){return e.showMall(t,i)?n("el-option",{key:i,attrs:{label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id}}):e._e()}))],2)],1),e.isReset?n("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[n("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:e.isBanPerform},on:{click:e.reset}},[e._v("　刷　　新　")])],1):e._e()])])},a=[],r=n("1da1"),s=n("b85c"),l=n("2909"),o=(n("96cf"),n("d81d"),n("fb6a"),n("caad"),n("2532"),n("d3b7"),n("25f0"),n("99af"),n("6062"),n("3ca3"),n("ddb0"),n("4de4"),n("159b"),n("c740"),n("7db0"),n("7646")),u=n("2b0e");u["default"].directive("loadmore",{bind:function(e,t){var n=e.querySelector(".el-select-dropdown .el-select-dropdown__wrap");n.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?t.value(!0,this):this.scrollTop<30&&t.value(!1,this)}))}});var c={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(e){this.siteShowList=e},countryVal:{handler:function(e,t){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(e,t){var n=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=t.indexOf("")>-1,a=e.indexOf("")>-1;i!==a?this.groupId=a?Object(l["a"])(this.groupIdList.map((function(e){return e.id}))):[]:a?this.groupId=e.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){n.isAllowSet2=!0,n.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(e,t){var n=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName;if(!this.isAShop){var a=t.includes(""),r=e.includes("");if(a!==r||t.toString()===e.toString()&&this.isShowNameAll)if(r&&(!i||i&&!this.isShowNameAll)){var o=i&&Object(l["a"])(this.siteShowList.map((function(e){return e.platform_mall_id})))||[""].concat(Object(l["a"])(this.siteList.map((function(e){return e.platform_mall_id})))),u=new Set([].concat(Object(l["a"])(o),Object(l["a"])(t)));this.site=Object(l["a"])(u),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var c=[];if(i){var d=i&&Object(l["a"])(this.siteShowList.map((function(e){return e.platform_mall_id}))),p=d.length>this.site.length&&this.site||d,m=d.length>this.site.length&&d||this.site;c=new Set(this.site);var h,b=Object(s["a"])(m);try{for(b.s();!(h=b.n()).done;){var g=h.value;p.includes(g)&&c.delete(g)}}catch(k){b.e(k)}finally{b.f()}c.delete("")}this.site=Object(l["a"])(c)}else r?this.site=e.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){n.changeMallList(),n.filterMall(i),n.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,a,r,s,o,u,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.site=[],i=t.countryVal,a=[],!(t.jsonMallData.length>0)){n.next=7;break}a=t.jsonMallData,n.next=12;break;case 7:return n.next=9,t.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:r=n.sent,a=JSON.parse(r)||[],t.jsonMallData=JSON.parse(r)||[];case 12:if(!(a.length>0)){n.next=17;break}1===e&&(t.siteList=""===i?a:a.filter((function(e){return e.country===i}))),2===e&&(0===t.groupId.length?t.siteList=[]:(t.siteList=[],t.groupId.forEach((function(e){a.forEach((function(n){i?e===n.group_id&&i===n.country&&t.siteList.push(n):e===n.group_id&&t.siteList.push(n)}))})))),n.next=22;break;case 17:return s={country:"",mallGroupIds:""},n.next=20,t.mallListAPIInstance.ddMallGoodsGetMallList(s);case 20:o=n.sent,200===o.code?(t.$appConfig.temporaryCacheInfo("save","mallAllData",o.data),u=o.data||[],t.siteList=u,t.jsonMallData=u,t.siteList=""===i?u:u.filter((function(e){return e.country===i}))):t.$message.error("获取分组、店铺列表失败");case 22:c=[],0===t.groupIdList.length&&(t.groupIdList=[{group_name:"全部",id:""}],t.siteList.forEach((function(e){var t=c.findIndex((function(t){return t&&t.id===e.group_id}));e.group_name&&t<0&&c.push({group_name:e.group_name,id:e.group_id})})),c.zzSort("id"),t.groupIdList=[].concat(Object(l["a"])(t.groupIdList),c),t.groupId=[""].concat(Object(l["a"])(c.map((function(e){return e.id}))))),setTimeout((function(){t.isAllowSet2=!0,t.isAllowSet1=!0,t.site=!t.isAShop&&[""]||""}),10);case 25:case"end":return n.stop()}}),n)})))()},changeMallList:function(){var e=this,t=[],n="";if(this.isAShop){var i=this.siteList.find((function(t){return t.platform_mall_id===e.site}));n=this.site,t.push(i)}else this.site.forEach((function(i){if(i){var a=e.siteList.find((function(e){return e.platform_mall_id===i}));t.push(a),n+=i+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(n=t.length!==this.siteList.length&&n||""),this.source?this.$emit("changeMallList",{mallList:t,source:this.source,searchAll:n,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},filterMall:function(e){var t=this,n=e&&this.isShowName!==e?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){t.isShowName!==e&&(t.mallShowIndex=0),t.isShowName=e||"";var n=t.siteList;e&&(n=t.siteList.filter((function(t){var n=t.mall_alias_name||t.platform_mall_name;return n.includes(e)}))),t.siteShowList=n}),n)},showMall:function(e,t){var n=e.mall_alias_name||e.platform_mall_name,i=this.site[0]===e.platform_mall_id;return i||this.mallShowIndex<=t&&t<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||n.includes(this.isShowName))},loadmoreMall:function(e,t){if(this.siteShowList.length>this.showMallNumber){var n=0;e?(n=this.mallShowIndex+10,n=n<this.siteShowList.length-this.showMallNumber&&n||this.siteShowList.length-this.showMallNumber):(n=this.mallShowIndex-10,n=n>0&&n||0),n!==this.mallShowIndex&&(t.scrollTop=e?t.scrollTop-100:30),this.mallShowIndex=n}}}},d=c,p=(n("8992"),n("2877")),m=Object(p["a"])(d,i,a,!1,null,null,null);t["a"]=m.exports}}]);