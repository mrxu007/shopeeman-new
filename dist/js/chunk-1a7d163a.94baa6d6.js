(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a7d163a"],{"22eb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"condetion",staticStyle:{"background-color":"white",padding:"8px"}},[a("div",{staticClass:"row1"},[a("storeChoose",{staticStyle:{"margin-left":"-20px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}}),a("div",{staticStyle:{"margin-left":"20px"}},[a("label",[e._v("状态：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.activeType,callback:function(t){e.activeType=t},expression:"activeType"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),a("el-option",{attrs:{label:"进行中",value:"1"}}),a("el-option",{attrs:{label:"接下来有活动",value:"2"}}),a("el-option",{attrs:{label:"活动已过期",value:"3"}})],1)],1),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini",type:"primary"},on:{click:e.getTableList}},[e._v("搜索")])],1),a("div",{staticClass:"row2",staticStyle:{"margin-top":"8px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.mallCoupon}},[e._v("创建加购促销活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.MallvoucherStopMul}},[e._v("批量删除/结束活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")]),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.isShowPast,callback:function(t){e.isShowPast=t},expression:"isShowPast"}},[e._v("不显示过期活动")])],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableList,height:"800px","use-virtual":"",border:!1,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("u-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("u-table-column",{attrs:{type:"index",fixed:"",label:"序号","min-width":"50px"}}),a("u-table-column",{attrs:{prop:"mallName",label:"店铺",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"follow_prize_name",label:"促销名称",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"quota",label:"活动状态",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"claimed",label:"促销期间",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"discountInfo",label:"运送渠道",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"topNum",label:"运费",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"min_spend",label:"操作",align:"center","min-width":"150px"}},[[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("删除")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("编辑商品")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("复制活动")])]],2)],1)],1),a("el-dialog",{staticClass:"edit-group-dialog",attrs:{visible:e.proVisible,width:"1100px",height:"600px",top:"5vh",title:"加购优惠","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.proVisible=t}}},[a("ul",[a("li",[a("ul",{staticStyle:{border:"1px solid #d4d1d1",padding:"10px","border-radius":"8px"}},[a("div",[e._v("基本资料")]),a("li",{staticStyle:{display:"flex"}},[a("div",[a("label",[e._v("操作店铺")]),a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.optionMall,callback:function(t){e.optionMall=t},expression:"optionMall"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.shopAccountMallList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})}))],2)],1),a("div",[a("el-radio-group",{model:{value:e.discountType,callback:function(t){e.discountType=t},expression:"discountType"}},[a("el-radio",{attrs:{label:"0"}},[e._v("折扣优惠")]),a("el-radio",{attrs:{label:"1"}},[e._v("赠品满最低消费")])],1),"0"===e.discountType?a("span",[e._v(" 加购限制 "),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.addLimit,callback:function(t){e.addLimit=t},expression:"addLimit"}})],1):e._e(),"1"===e.discountType?a("span",[e._v(" 赠品规则 消费"),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.costNum,callback:function(t){e.costNum=t},expression:"costNum"}}),e._v(" 以获得"),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.sendNum,callback:function(t){e.sendNum=t},expression:"sendNum"}}),e._v(" 个赠品 ")],1):e._e()],1)]),a("li",{staticStyle:{display:"flex"}},[a("div",[e._v(" 促销名称 "),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini",maxlength:"24"},model:{value:e.proName,callback:function(t){e.proName=t},expression:"proName"}})],1),a("div",[e._v(" 活动时间 "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"开始时间必须比当前时间晚一个小时;结束时间必须比开始时间晚一个小时",placement:"top-start"}},[a("el-date-picker",{staticStyle:{width:"330px"},attrs:{size:"mini","value-format":"timestamp",type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.proTime,callback:function(t){e.proTime=t},expression:"proTime"}})],1)],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("保存活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1)])]),a("li",{staticStyle:{display:"flex"}},[a("div",{staticClass:"masterGoods"},[a("span",[e._v("主要商品")]),a("ul",[a("li",[a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("开启")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("关闭")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("删除")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("添加主要商品")])],1),a("li",[a("el-table",{attrs:{data:e.masterGoodslist,"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{type:"index",label:"店铺",align:"center","min-width":"60px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"商品",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"状态",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCouponGoods(n)}}},[e._v("删除")])],1)]}}])})],1)],1)])]),a("div",{staticClass:"addGoods"},[a("span",[e._v("加购商品")]),a("ul",[a("li",[a("div",[e._v("折扣："),a("el-input",{staticStyle:{width:"50px"},attrs:{size:"mini"},model:{value:e.addGoodsDiscount,callback:function(t){e.addGoodsDiscount=t},expression:"addGoodsDiscount"}}),e._v("%")],1),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("批量更新")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("开启")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("关闭")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("删除")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("添加加购商品")])],1),a("li",[a("el-table",{attrs:{data:e.addGoodsList,"header-cell-style":{background:"#f7fafa"}}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),a("el-table-column",{attrs:{type:"index",label:"店铺",align:"center","min-width":"60px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"商品",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"原价",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"折扣",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"加购价格",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"状态",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCouponGoods(n)}}},[e._v("删除")])],1)]}}])})],1)],1)])])])])])],1)},i=[],l=a("2909"),r=a("1da1"),o=(a("96cf"),a("c740"),a("a434"),a("a9e3"),a("99af"),a("159b"),a("feb6")),s=a("a254"),c=a("0e0b"),u={components:{storeChoose:o["a"]},data:function(){return{addGoodsDiscount:"",addGoodsList:[],masterGoodslist:[],sendNum:0,costNum:0,addLimit:0,optionMall:"",freightobj:{minCost:null,freightType:0,freight:1},freightlist:[],deliverWay:[],proTimeType:"0",proTime:[],proName:"",isShowPast:!1,tableLoading:!1,singerStop:!1,MarketManagerAPIInstance:new s["a"](this),showlog:!0,activeType:"0",tableList:[],proVisible:!0,dialogtitle:"",coupontype:"2",couponName:"",rewardType:"0",discountType:"0",discountNum:"",limitPrice:"0",maxPrice:"",minPrice:"",pickerOptions:{disabledDate:function(e){}},shopAccountMallList:[],selectMallList:[],stoptoping:!1,mallTableSelect:[],getTable:[]}},created:function(){this.freightlist.push(this.freightobj),this.initMall()},methods:{initMall:function(){var e=this;Object(c["p"])((function(t){e.shopAccountMallList=t}))},delrule:function(e){var t=this.couponGoodslist.findIndex((function(t){return t===e}));this.freightlist.splice(t,1)},save:function(){},addRule:function(){this.freightlist.push(this.freightobj)},clearLog:function(){this.$refs.Logs.consoleMsg=""},handleSelectionChange:function(e){this.mallTableSelect=e},MallvoucherStopMul:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.mallTableSelect.length){t.next=3;break}return e.$message.warning("请选择要操作的数据"),t.abrupt("return");case 3:a=0;case 4:if(!(a<e.mallTableSelect.length)){t.next=11;break}if(2!==Number(e.mallTableSelect[a].promotion_type)){t.next=8;break}return t.next=8,e.MallvoucherStop(e.mallTableSelect[a]);case 8:a++,t.next=4;break;case 11:e.getTableList();case 12:case"end":return t.stop()}}),t)})))()},MallvoucherStop:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,campaign_id:Number(e.campaign_id),action:"stop"},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallPrizeDel(n);case 5:i=a.sent,0===i.ecode?t.$refs.Logs.writeLog("------已停止【".concat(e.follow_prize_name,"】优惠活动------"),!0):t.$refs.Logs.writeLog("停止【".concat(e.follow_prize_name,"】优惠活动,").concat(i.message),!1),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("停止【".concat(e.follow_prize_name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop&&t.getTableList(),t.singerStop=!1;case 14:case"end":return a.stop()}}),a,null,[[1,9]])})))()},MallvoucherDelMul:function(){var e=this;this.mallTableSelect.length?this.$confirm("确定要删除这些优惠卷吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.MallvoucherDelMulFun()})).catch((function(){})):this.$message.warning("请选择要操作的数据")},MallvoucherDelMulFun:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<e.mallTableSelect.length)){t.next=8;break}if(1!==Number(e.mallTableSelect[a].promotion_type)){t.next=5;break}return t.next=5,e.MallvoucherDel(e.mallTableSelect[a]);case 5:a++,t.next=1;break;case 8:e.getTableList();case 9:case"end":return t.stop()}}),t)})))()},MallvoucherDelFun:function(e){var t=this;this.$confirm("确定该优惠卷吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.MallvoucherDel(e)})).catch((function(){}))},MallvoucherDel:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,campaign_id:Number(e.campaign_id),action:"delete"},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallPrizeDel(n);case 5:i=a.sent,0===i.ecode?t.$refs.Logs.writeLog("------成功删除【".concat(e.follow_prize_name,"】优惠活动------"),!0):t.$refs.Logs.writeLog("删除【".concat(e.follow_prize_name,"】优惠活动,").concat(i.message),!1),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("删除【".concat(e.follow_prize_name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop&&t.getTableList(),t.singerStop=!1;case 14:case"end":return a.stop()}}),a,null,[[1,9]])})))()},stopSearch:function(){Object(c["v"])(),this.stoptoping=!0,this.$refs.Logs.writeLog("正在停止查询")},stopCreate:function(){Object(c["v"])(),this.$refs.Logs.writeLog("已停止创建")},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,i=t.getDate(),l=t.getHours(),r=t.getMinutes(),o=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(i)+" "+this.add0(l)+":"+this.add0(r)+":"+this.add0(o)},changeMallList:function(e){this.selectMallList=e},getInfo:function(e){var t=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,r,o,s,u,p,m,d,g,h,f,b,v,_,w,y,x;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,r={country:e.country,mallId:e.platform_mall_id,offset:e.offset,limit:20},n.next=5,a.MarketManagerAPIInstance.FollowPrize(r);case 5:if(o=n.sent,0!==o.data.code){n.next=35;break}if(u=o.data.data.follow_prize_list,u.forEach((function(t){t.platform_mall_id=e.platform_mall_id,t.country=e.country,t.mallName=e.mall_alias_name||e.platform_mall_name,t.formStartime=a.formatTime(1e3*t.start_time),t.formEndtime=a.formatTime(1e3*t.end_time)})),(s=e.prizeList).push.apply(s,Object(l["a"])(u)),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】总数据：").concat(o.data.data.total_count,"条,正在请求第【").concat(r.offset/r.limit+1,"】页"),!0),!((null===u||void 0===u?void 0:u.length)>=r.limit)){n.next=16;break}e.offset=e.offset+r.limit,a.getInfo(e,{count:1}),n.next=33;break;case 16:for(p=[],m=[],d=[],g=[],h=[],f=0;f<e.prizeList.length;f++)b=e.prizeList[f],b.discountInfo="",b.topNum="",b.min_spend="",v=(new Date).getTime(),v<1e3*b.start_time?(b.voucher_status="即将开始",b.promotion_type=1,p.push(b)):v>1e3*b.start_time&&v<1e3*b.end_time?(b.voucher_status="进行中",b.promotion_type=2,p.push(b)):(b.voucher_status="已过期",b.promotion_type=3),"1"===a.saleType&&v<1e3*b.start_time&&d.push(b),"2"===a.saleType&&v>1e3*b.start_time&&v<1e3*b.end_time&&g.push(b),"3"===a.saleType&&v>1e3*b.end_time&&h.push(b),m.push(b);if("1"===a.saleType&&(_=a.getTable).push.apply(_,d),"2"===a.saleType&&(w=a.getTable).push.apply(w,g),"3"===a.saleType&&(y=a.getTable).push.apply(y,h),"0"===a.saleType&&(x=a.getTable).push.apply(x,m),p.length){n.next=28;break}return n.abrupt("return");case 28:return a.$refs.Logs.writeLog("正在查看店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】优惠卡券详情"),!0),n.next=31,Object(c["c"])(p,a.getPrizeDetail);case 31:n.sent,a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】查找完毕"),!0);case 33:n.next=36;break;case 35:a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(o.data.message||"店铺异常"),!1);case 36:n.next=41;break;case 38:n.prev=38,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】--catch，").concat(n.t0),!1);case 41:return n.prev=41,i.count--,n.finish(41);case 44:case"end":return n.stop()}}),n,null,[[1,38,41,44]])})))()},getPrizeDetail:function(e){var t=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,l,r,o,s,c,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,l={country:e.country,mallId:e.platform_mall_id,campaign_id:e.campaign_id},n.next=5,a.MarketManagerAPIInstance.FollowPrizeDetail(l);case 5:r=n.sent,0===r.data.code?(o=r.data.data,s=null,c=null,u=o.min_spend,0===Number(o.reward_type)&&(o.discount.value?(s=o.discount.value,c=""):(s="".concat((100-Number(o.discount.percentage))/10,"折"),c="0.00"===o.discount.cap?"无限制":o.discount.cap)),1===Number(o.reward_type)&&(s="".concat(o.coin_cash_back.percentage,"%折扣,(Shopee币回扣)"),c="0.00"===o.coin_cash_back.cap?"无限制":o.coin_cash_back.cap+"(Shopee币)"),a.$set(e,"discountInfo",s),a.$set(e,"topNum",c),a.$set(e,"min_spend",u)):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】,").concat(r.message),!1),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),a.$refs.Logs.writeLog("Detailcatch，".concat(n.t0),!1);case 12:return n.prev=12,i.count--,n.finish(12);case 15:case"end":return n.stop()}}),n,null,[[1,9,12,15]])})))()},getTableList:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.multipleTable.clearSelection(),e.selectMallList.forEach((function(e){e.offset=0,e.prizeList=[]})),e.getTable=[],e.showlog=!1,e.tableLoading=!0,e.$refs.Logs.writeLog("正在请求数据......",!0),t.next=8,Object(c["c"])(e.selectMallList,e.getInfo);case 8:t.sent,e.$refs.Logs.writeLog("请求数据结束"),e.tableLoading=!1,e.tableList=e.getTable;case 12:case"end":return t.stop()}}),t)})))()},mallCoupon:function(){this.showlog=!0,this.selectMallList.length?this.proVisible=!0:this.$message.warning("请选择店铺")},mallCouponFun:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.discountNum>100)){t.next=3;break}return e.$message.warning("请输入有效折扣"),t.abrupt("return");case 3:if(!(e.dateTime[1]-e.dateTime[0]<=864e5)){t.next=6;break}return e.$message.warning("活动期间不能少于一天"),t.abrupt("return");case 6:if(!(e.couponName.length>20)){t.next=9;break}return e.$message.warning("关注礼名称不能超过20个字符"),t.abrupt("return");case 9:return e.proVisible=!1,e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务......"),t.next=14,Object(c["c"])(e.selectMallList,e.createCoupon);case 14:t.sent,e.$refs.Logs.writeLog("创建任务结束"),e.getTableList();case 17:case"end":return t.stop()}}),t)})))()},createCoupon:function(e){var t=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,l,r,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,l=null,r=null,"0"===a.rewardType?l="0"===a.discountType?{percentage:(100-a.discountNum)/10,cap:"0"===a.limitPrice?null:a.maxPrice}:{value:Number(a.discountNum)}:r={percentage:a.discountNum,cap:"0"===a.limitPrice?0:a.maxPrice},o={country:e.country,mallId:e.platform_mall_id,discount:l,end_time:a.dateTime[1]/1e3,follow_prize_name:a.couponName,min_spend:a.minPrice,quota:a.useQuantity,reward_type:a.rewardType,start_time:a.dateTime[0]/1e3},"1"===a.rewardType&&(o.coin_cash_back=r),n.next=9,a.MarketManagerAPIInstance.followPrizeCreate(o);case 9:s=n.sent,0!==s.ecode?a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(s.message),!1):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建成功"),!0),n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(n.t0,"};"),!1);case 16:return n.prev=16,i.count--,n.finish(16);case 19:case"end":return n.stop()}}),n,null,[[1,13,16,19]])})))()}}},p=u,m=(a("eade"),a("2877")),d=Object(m["a"])(p,n,i,!1,null,"75a5cb14",null);t["default"]=d.exports},"666a":function(e,t,a){},eade:function(e,t,a){"use strict";a("666a")}}]);