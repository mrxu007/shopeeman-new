(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f7073502"],{"62c5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"condetion",staticStyle:{"background-color":"white",padding:"8px"}},[a("div",{staticClass:"row1"},[a("storeChoose",{staticStyle:{"margin-left":"-20px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}}),a("div",[a("label",[e._v("关注礼类型：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.saleType,callback:function(t){e.saleType=t},expression:"saleType"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),a("el-option",{attrs:{label:"即将进行",value:"1"}}),a("el-option",{attrs:{label:"进行中",value:"2"}}),a("el-option",{attrs:{label:"已结束",value:"3"}})],1)],1),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary"},on:{click:e.getTableList}},[e._v("查询")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopSearch}},[e._v("取消查询")])],1),a("div",{staticClass:"row2",staticStyle:{"margin-top":"8px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.mallCoupon}},[e._v("创建关注礼")]),a("el-button",{attrs:{size:"mini"},on:{click:e.stopCreate}},[e._v("停止创建关注礼活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.MallvoucherStopMul}},[e._v("批量停止关注礼活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.MallvoucherDelMul}},[e._v("批量删除关注礼活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableList,height:"800px","use-virtual":"",border:!1,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("u-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("u-table-column",{attrs:{type:"index",fixed:"",label:"序号","min-width":"50px"}}),a("u-table-column",{attrs:{prop:"",label:"站点",align:"center","min-width":"50px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e._f("chineseSite")(a.country)))]}}])}),a("u-table-column",{attrs:{prop:"mallName",label:"店铺",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"follow_prize_name",label:"关注礼",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"quota",label:"可领取总数",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"claimed",label:"新粉丝/领取数",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"discountInfo",label:"折扣金额（折）",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"topNum",label:"最高上限数额",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"min_spend",label:"最低消费金额",align:"center","min-width":"150px"}}),a("u-table-column",{attrs:{prop:"",label:"期间",align:"center","min-width":"200px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",[e._v(e._s(n.formStartime)+"-")]),a("div",[e._v(e._s(n.formEndtime))])]}}])}),a("u-table-column",{attrs:{prop:"voucher_status",label:"状态",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return["进行中"===n.voucher_status?a("span",{staticStyle:{color:"#0ad10a"}},[e._v(e._s(n.voucher_status))]):e._e(),"即将开始"===n.voucher_status?a("span",{staticStyle:{color:"orange"}},[e._v(e._s(n.voucher_status))]):e._e(),"已过期"===n.voucher_status?a("span",[e._v(e._s(n.voucher_status))]):e._e()]}}])}),a("u-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",["即将开始"===n.voucher_status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.MallvoucherDelFun(n),e.singerStop=!0}}},[e._v("删除")]):e._e()],1),a("span",["进行中"===n.voucher_status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.MallvoucherStop(n),e.singerStop=!0}}},[e._v("停止")]):e._e()],1)]}}])})],1)],1),a("el-dialog",{staticClass:"edit-group-dialog",attrs:{visible:e.CouponVisible,width:"620px",top:"5vh",title:"创建关注礼活动","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.CouponVisible=t}}},[a("el-form",{attrs:{"label-position":"right","label-width":"160px"}},[a("el-form-item",{attrs:{label:"当前站点"}},[e._v(" "+e._s(e._f("chineseSite")(e.selectMallList[0]&&e.selectMallList[0].country))+" ")]),a("el-form-item",{staticStyle:{color:"red"},attrs:{label:"币种"}},[e._v(" "+e._s(e._f("siteCoin")(e.selectMallList[0]&&e.selectMallList[0].country))+"(优惠劵活动使用的是当地币种) ")]),a("el-form-item",{attrs:{label:"关注礼名称"}},[a("el-input",{staticStyle:{width:"260px","margin-right":"5px"},attrs:{size:"mini"},model:{value:e.couponName,callback:function(t){e.couponName=t},expression:"couponName"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"关注礼名称不能超过20个字符",placement:"right-start"}},[a("i",{staticClass:"el-icon-question"})])],1),a("el-form-item",{attrs:{label:"关注礼类型"}},[a("span",[e._v("优惠券")]),e._v(" "),a("span",{staticStyle:{color:"red"}},[e._v("优惠券代码将自动生成")])]),a("el-form-item",{attrs:{label:"奖励类型"}},[a("el-radio-group",{on:{change:function(t){e.discountNum=""}},model:{value:e.rewardType,callback:function(t){e.rewardType=t},expression:"rewardType"}},[a("el-radio",{attrs:{label:"0"}},[e._v("折扣")]),a("el-radio",{attrs:{label:"1"}},[e._v("Shoppe币折扣 "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"买家使用Shoppee币回扣优惠劵并获得Shoppee币作为回报。Shoppee币成本将由您吸收",placement:"right-start"}},[a("i",{staticClass:"el-icon-question"})])],1)],1)],1),a("el-form-item",{staticClass:"discountitem",attrs:{label:"折扣类型/金额"}},["0"===e.rewardType?a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择",size:"mini"},on:{change:function(t){e.discountNum=""}},model:{value:e.discountType,callback:function(t){e.discountType=t},expression:"discountType"}},[a("el-option",{attrs:{label:"折扣",value:"0"}}),a("el-option",{attrs:{label:"折扣金额",value:"1"}})],1):e._e(),"1"===e.rewardType?a("span",[e._v("折扣 ：")]):e._e(),a("div",{staticStyle:{display:"flex","flex-flow":"column"}},[a("div",["0"===e.rewardType&&"0"===e.discountType||"1"===e.rewardType?a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",maxlength:"2",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.discountNum,callback:function(t){e.discountNum=t},expression:"discountNum"}}):e._e(),"0"===e.rewardType&&"1"===e.discountType?a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.discountNum,callback:function(t){e.discountNum=t},expression:"discountNum"}}):e._e(),"0"===e.rewardType&&"0"===e.discountType?a("span",[e._v("%折扣")]):e._e(),"1"===e.rewardType?a("span",[e._v("%Shopee币折扣")]):e._e()],1),"0"===e.rewardType&&"0"===e.discountType?a("span",{staticStyle:{"margin-left":"-100px",color:"red","line-height":"10px","margin-bottom":"10px"}},[e._v(" 付款金额中的"+e._s(e.discountNum)+"%将退还给买家。 ")]):e._e(),"1"===e.rewardType?a("span",{staticStyle:{"margin-left":"-40px",color:"red","line-height":"10px","margin-bottom":"10px"}},[e._v(" 付款金额中的"+e._s(e.discountNum)+"%将以Shopee币退还给买家。 "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.contentDes,placement:"right-start"}},[a("i",{staticClass:"el-icon-question"})])],1):e._e()])],1),"0"===e.rewardType&&"0"===e.discountType||"1"===e.rewardType?a("el-form-item",{attrs:{label:"最高折扣金额"}},[a("el-radio-group",{model:{value:e.limitPrice,callback:function(t){e.limitPrice=t},expression:"limitPrice"}},[a("el-radio",{attrs:{label:"0"}},[e._v("无限制")]),a("el-radio",{attrs:{label:"1"}},[e._v("设置金额："),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.maxPrice,callback:function(t){e.maxPrice=t},expression:"maxPrice"}})],1)],1)],1):e._e(),a("el-form-item",{attrs:{label:"最低消费金额"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.minPrice,callback:function(t){e.minPrice=t},expression:"minPrice"}})],1),a("el-form-item",{attrs:{label:"关注礼时限"}},[a("el-date-picker",{staticStyle:{width:"330px"},attrs:{size:"mini","value-format":"timestamp",type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}}),a("div",{staticStyle:{color:"red","line-height":"20px"}},[e._v("* 结束时间必须大于开始时间，且活动时间必须大于一天！")]),a("div",{staticStyle:{color:"red","line-height":"20px"}},[e._v("* 所选时间段内不可存在其他后续奖券")])],1),a("el-form-item",{attrs:{label:"折扣劵可使用数量(必填)"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d]/g,0)"},model:{value:e.useQuantity,callback:function(t){e.useQuantity=t},expression:"useQuantity"}})],1),a("el-form-item",{attrs:{label:"使用期限"}},[a("div",[e._v("从收到折扣券+7天")])]),a("el-form-item",{attrs:{label:"说明"}},[a("div",[e._v("通过提供吸引人的折扣优惠券以让用户关注您的商店")])]),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.mallCouponFun}},[e._v("创建关注礼活动")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("取消")])],1)],1)],1)],1)},r=[],i=a("2909"),l=a("1da1"),o=(a("96cf"),a("a9e3"),a("99af"),a("159b"),a("feb6")),s=a("a254"),c=a("0e0b"),u={components:{storeChoose:o["a"]},data:function(){return{tableLoading:!1,singerStop:!1,MarketManagerAPIInstance:new s["a"](this),showlog:!0,saleType:"0",tableList:[],CouponVisible:!1,dialogtitle:"",coupontype:"2",couponName:"",rewardType:"0",discountType:"1",discountNum:"",limitPrice:"0",maxPrice:null,minPrice:"",dateTime:[],pickerOptions:{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}},useQuantity:"",couponhide:"0",couponGoodslist:[],selectMallList:[],stoptoping:!1,mallTableSelect:[],getTable:[]}},computed:{contentDes:function(){var e=this.$filters.siteCoin(this.selectMallList[0].country);return"Shopee币交换规则，".concat(e,"100=100 Shopee币")}},created:function(){},methods:{clearLog:function(){this.$refs.Logs.consoleMsg=""},handleSelectionChange:function(e){this.mallTableSelect=e},MallvoucherStopMul:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.mallTableSelect.length){t.next=3;break}return e.$message.warning("请选择要操作的数据"),t.abrupt("return");case 3:a=0;case 4:if(!(a<e.mallTableSelect.length)){t.next=11;break}if(2!==Number(e.mallTableSelect[a].promotion_type)){t.next=8;break}return t.next=8,e.MallvoucherStop(e.mallTableSelect[a]);case 8:a++,t.next=4;break;case 11:e.getTableList();case 12:case"end":return t.stop()}}),t)})))()},MallvoucherStop:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,campaign_id:Number(e.campaign_id),action:"stop"},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallPrizeDel(n);case 5:r=a.sent,0===r.ecode?t.$refs.Logs.writeLog("------已停止【".concat(e.follow_prize_name,"】优惠活动------"),!0):t.$refs.Logs.writeLog("停止【".concat(e.follow_prize_name,"】优惠活动,").concat(r.message),!1),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("停止【".concat(e.follow_prize_name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop&&t.getTableList(),t.singerStop=!1;case 14:case"end":return a.stop()}}),a,null,[[1,9]])})))()},MallvoucherDelMul:function(){var e=this;this.mallTableSelect.length?this.$confirm("确定要删除这些优惠券吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.MallvoucherDelMulFun()})).catch((function(){})):this.$message.warning("请选择要操作的数据")},MallvoucherDelMulFun:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<e.mallTableSelect.length)){t.next=8;break}if(1!==Number(e.mallTableSelect[a].promotion_type)){t.next=5;break}return t.next=5,e.MallvoucherDel(e.mallTableSelect[a]);case 5:a++,t.next=1;break;case 8:e.getTableList();case 9:case"end":return t.stop()}}),t)})))()},MallvoucherDelFun:function(e){var t=this;this.$confirm("确定该优惠券吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.MallvoucherDel(e)})).catch((function(){}))},MallvoucherDel:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var n,r,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,campaign_id:Number(e.campaign_id),action:"delete"},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallPrizeDel(n);case 5:r=a.sent,0===r.ecode?t.$refs.Logs.writeLog("------成功删除【".concat(e.follow_prize_name,"】优惠活动------"),!0):(i="","no edit permission for the voucher"===r.message&&(i="您没有编辑权限"),t.$refs.Logs.writeLog("删除【".concat(e.follow_prize_name,"】优惠活动,").concat(r.message,":").concat(i),!1)),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("删除【".concat(e.follow_prize_name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop&&t.getTableList(),t.singerStop=!1;case 14:case"end":return a.stop()}}),a,null,[[1,9]])})))()},stopSearch:function(){Object(c["v"])(),this.stoptoping=!0,this.$refs.Logs.writeLog("正在停止查询")},stopCreate:function(){Object(c["v"])(),this.$refs.Logs.writeLog("已停止创建")},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),i=t.getHours(),l=t.getMinutes(),o=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(r)+" "+this.add0(i)+":"+this.add0(l)+":"+this.add0(o)},changeMallList:function(e){this.selectMallList=e},getInfo:function(e){var t=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){var r,l,o,s,u,p,m,d,g,f,h,_,b,v,w,y,x;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,l={country:e.country,mallId:e.platform_mall_id,offset:e.offset,limit:20},n.next=5,a.MarketManagerAPIInstance.FollowPrize(l);case 5:if(o=n.sent,0!==o.data.code){n.next=35;break}if(u=o.data.data.follow_prize_list,u.forEach((function(t){t.platform_mall_id=e.platform_mall_id,t.country=e.country,t.mallName=e.mall_alias_name||e.platform_mall_name,t.formStartime=a.formatTime(1e3*t.start_time),t.formEndtime=a.formatTime(1e3*t.end_time)})),(s=e.prizeList).push.apply(s,Object(i["a"])(u)),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】总数据：").concat(o.data.data.total_count,"条,正在请求第【").concat(l.offset/l.limit+1,"】页"),!0),!((null===u||void 0===u?void 0:u.length)>=l.limit)){n.next=16;break}e.offset=e.offset+l.limit,a.getInfo(e,{count:1}),n.next=33;break;case 16:for(p=[],m=[],d=[],g=[],f=[],h=0;h<e.prizeList.length;h++)_=e.prizeList[h],_.discountInfo="",_.topNum="",_.min_spend="",b=(new Date).getTime(),b<1e3*_.start_time?(_.voucher_status="即将开始",_.promotion_type=1,p.push(_)):b>1e3*_.start_time&&b<1e3*_.end_time?(_.voucher_status="进行中",_.promotion_type=2,p.push(_)):(_.voucher_status="已过期",_.promotion_type=3),"1"===a.saleType&&b<1e3*_.start_time&&d.push(_),"2"===a.saleType&&b>1e3*_.start_time&&b<1e3*_.end_time&&g.push(_),"3"===a.saleType&&b>1e3*_.end_time&&f.push(_),m.push(_);if("1"===a.saleType&&(v=a.getTable).push.apply(v,d),"2"===a.saleType&&(w=a.getTable).push.apply(w,g),"3"===a.saleType&&(y=a.getTable).push.apply(y,f),"0"===a.saleType&&(x=a.getTable).push.apply(x,m),p.length){n.next=28;break}return n.abrupt("return");case 28:return a.$refs.Logs.writeLog("正在查看店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】优惠卡券详情"),!0),n.next=31,Object(c["c"])(p,a.getPrizeDetail);case 31:n.sent,a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】查找完毕"),!0);case 33:n.next=36;break;case 35:"token not found"===o.message?a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(o.data.message,":【店铺未登录】"),!1):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(o.data.message||"店铺异常"),!1);case 36:n.next=41;break;case 38:n.prev=38,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】--catch，").concat(n.t0),!1);case 41:return n.prev=41,r.count--,n.finish(41);case 44:case"end":return n.stop()}}),n,null,[[1,38,41,44]])})))()},getPrizeDetail:function(e){var t=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){var r,i,l,o,s,c,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,i={country:e.country,mallId:e.platform_mall_id,campaign_id:e.campaign_id},n.next=5,a.MarketManagerAPIInstance.FollowPrizeDetail(i);case 5:l=n.sent,0===l.data.code?(o=l.data.data,s=null,c=null,u=o.min_spend,0===Number(o.reward_type)&&(o.discount.value?(s=o.discount.value,c=""):(s="".concat((100-Number(o.discount.percentage))/10,"折"),c="0.00"===o.discount.cap?"无限制":o.discount.cap)),1===Number(o.reward_type)&&(s="".concat(o.coin_cash_back.percentage,"%折扣,(Shopee币回扣)"),c="0.00"===o.coin_cash_back.cap?"无限制":o.coin_cash_back.cap+"(Shopee币)"),a.$set(e,"discountInfo",s),a.$set(e,"topNum",c),a.$set(e,"min_spend",u)):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】,").concat(l.message),!1),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),a.$refs.Logs.writeLog("Detailcatch，".concat(n.t0),!1);case 12:return n.prev=12,r.count--,n.finish(12);case 15:case"end":return n.stop()}}),n,null,[[1,9,12,15]])})))()},getTableList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.multipleTable.clearSelection(),e.selectMallList.forEach((function(e){e.offset=0,e.prizeList=[]})),e.getTable=[],e.showlog=!1,e.tableLoading=!0,e.$refs.Logs.writeLog("正在请求数据......",!0),t.next=8,Object(c["c"])(e.selectMallList,e.getInfo);case 8:t.sent,e.$refs.Logs.writeLog("请求数据结束"),e.tableLoading=!1,e.tableList=e.getTable;case 12:case"end":return t.stop()}}),t)})))()},mallCoupon:function(){this.showlog=!0,this.selectMallList.length?this.CouponVisible=!0:this.$message.warning("请选择店铺")},mallCouponFun:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.couponName){t.next=3;break}return e.$message.warning("优惠券名称不能为空"),t.abrupt("return");case 3:if(e.discountNum){t.next=6;break}return e.$message.warning("请输入有效折扣信息"),t.abrupt("return");case 6:if(!(e.couponName.length>20)){t.next=9;break}return e.$message.warning("关注礼名称不能超过20个字符"),t.abrupt("return");case 9:if(!("0"===e.rewardType&&"1"===e.discountType&&Number(e.discountNum)>Number(e.minPrice))){t.next=12;break}return e.$message.warning("折扣金额不能大于最低消费金额"),t.abrupt("return");case 12:if(e.dateTime.length){t.next=15;break}return e.$message.warning("请输入有效活动时间"),t.abrupt("return");case 15:if(!(e.dateTime[1]-e.dateTime[0]<=864e5)){t.next=18;break}return e.$message.warning("活动期间不能少于一天"),t.abrupt("return");case 18:if(e.useQuantity){t.next=21;break}return e.$message.warning("请输入有效优惠券"),t.abrupt("return");case 21:return e.CouponVisible=!1,e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务......"),t.next=26,Object(c["c"])(e.selectMallList,e.createCoupon);case 26:t.sent,e.$refs.Logs.writeLog("创建任务结束"),e.getTableList();case 29:case"end":return t.stop()}}),t)})))()},createCoupon:function(e){var t=arguments,a=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){var r,i,l,o,s,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,i=null,l=null,"0"===a.rewardType?i="0"===a.discountType?{percentage:(100-a.discountNum)/10,cap:"0"===a.limitPrice?null:a.maxPrice}:{value:Number(a.discountNum)}:l={percentage:Number(a.discountNum),cap:"0"===a.limitPrice?0:Number(a.maxPrice)},o={country:e.country,mallId:e.platform_mall_id,discount:i,end_time:a.dateTime[1]/1e3,follow_prize_name:a.couponName,min_spend:a.minPrice,quota:a.useQuantity,reward_type:a.rewardType,start_time:a.dateTime[0]/1e3},"1"===a.rewardType&&(o.coin_cash_back=l),n.next=9,a.MarketManagerAPIInstance.followPrizeCreate(o);case 9:s=n.sent,0!==s.ecode?(c="","param err"===s.message&&(c="输入参数有误"),"quota error:"===s.message&&(c="所选时间有误"),"campaign overlap"===s.message&&(c="活动重叠;此时间段内已存在其他后续奖券，请选择其他时间段。"),"token not found"===s.message&&(c="店铺未登录"),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(s.message,":").concat(c),!1)):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建成功"),!0),n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(n.t0,"};"),!1);case 16:return n.prev=16,r.count--,n.finish(16);case 19:case"end":return n.stop()}}),n,null,[[1,13,16,19]])})))()}}},p=u,m=(a("7e30"),a("2877")),d=Object(m["a"])(p,n,r,!1,null,"f5b938e2",null);t["default"]=d.exports},"7e30":function(e,t,a){"use strict";a("fd2c")},fd2c:function(e,t,a){}}]);