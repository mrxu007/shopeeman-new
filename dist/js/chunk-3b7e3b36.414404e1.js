(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b7e3b36"],{4824:function(e,t,a){"use strict";a("b1ac")},"67e0":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"condetion",staticStyle:{"background-color":"white",padding:"8px"}},[a("div",{staticClass:"row1"},[a("storeChoose",{staticStyle:{"margin-left":"-20px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}}),a("div",[a("label",[e._v("优惠劵类型：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.saleType,callback:function(t){e.saleType=t},expression:"saleType"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),a("el-option",{attrs:{label:"即将进行",value:"1"}}),a("el-option",{attrs:{label:"进行中",value:"2"}}),a("el-option",{attrs:{label:"已结束",value:"3"}})],1)],1),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary"},on:{click:e.getTableList}},[e._v("查询")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopSearch}},[e._v("取消查询")])],1),a("div",{staticClass:"row2",staticStyle:{"margin-top":"8px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.mallCoupon}},[e._v("创建店铺优惠劵")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.goodsCoupon}},[e._v("创建商品优惠劵")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopCreate}},[e._v("停止创建活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.MallvoucherStopMul}},[e._v("批量停止活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.MallvoucherDelMul}},[e._v("批量删除活动")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableList,height:"740","use-virtual":"",border:!1,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("u-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("u-table-column",{attrs:{type:"index",fixed:"",label:"序号","min-width":"50px"}}),a("u-table-column",{attrs:{prop:"",label:"站点",align:"center","min-width":"50px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e._f("chineseSite")(a.country)))]}}])}),a("u-table-column",{attrs:{prop:"mallName",label:"店铺",align:"center","min-width":"150px",fixed:""}}),a("u-table-column",{attrs:{prop:"name",label:"优惠劵",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"voucher_code",label:"优惠码",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"voucher_type",label:"优惠类型",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"discountInfo",label:"折扣金额",align:"center","min-width":"180px"}}),a("u-table-column",{attrs:{prop:"topNum",label:"最高上限数额",align:"center","min-width":"120px"}}),a("u-table-column",{attrs:{prop:"usage_limit",label:"优惠劵可使用数量",align:"center","min-width":"120px"}}),a("u-table-column",{attrs:{prop:"min_price",label:"最低消费记录",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"distributed_count",label:"已领取",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"current_usage",label:"已使用",align:"center","min-width":"100px"}}),a("u-table-column",{attrs:{prop:"",label:"期间",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",[e._v(e._s(n.formStartime)+"-")]),a("div",[e._v(e._s(n.formEndtime))])]}}])}),a("u-table-column",{attrs:{prop:"voucher_status",label:"状态",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return["进行中"===n.voucher_status?a("span",{staticStyle:{color:"#0ad10a"}},[e._v(e._s(n.voucher_status))]):e._e(),"即将开始"===n.voucher_status?a("span",{staticStyle:{color:"orange"}},[e._v(e._s(n.voucher_status))]):e._e(),"已过期"===n.voucher_status?a("span",[e._v(e._s(n.voucher_status))]):e._e()]}}])}),a("u-table-column",{attrs:{prop:"",label:"是否在基本页面显示",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.rule&&a.rule.hide?"否":"是"))]}}])}),a("u-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",["即将开始"===n.voucher_status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.MallvoucherDelFun(n),e.singerStop=!0}}},[e._v("删除")]):e._e()],1),a("span",["进行中"===n.voucher_status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.MallvoucherStop(n),e.singerStop=!0}}},[e._v("停止")]):e._e()],1)]}}])})],1)],1),a("el-dialog",{staticClass:"edit-group-dialog",attrs:{visible:e.CouponVisible,width:"620px",top:"5vh",title:e.dialogtitle,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.CouponVisible=t}}},[a("el-form",{attrs:{"label-position":"right","label-width":"160px"}},[a("el-form-item",{attrs:{label:"当前站点"}},[e._v(" "+e._s(e._f("chineseSite")(e.selectMallList[0]&&e.selectMallList[0].country))+" ")]),a("el-form-item",{staticStyle:{color:"red"},attrs:{label:"币种"}},[e._v(" "+e._s(e._f("siteCoin")(e.selectMallList[0]&&e.selectMallList[0].country))+"(优惠劵活动使用的是当地币种) ")]),a("el-form-item",{attrs:{label:"优惠劵名称"}},[a("el-input",{staticStyle:{width:"260px"},attrs:{size:"mini"},model:{value:e.couponName,callback:function(t){e.couponName=t},expression:"couponName"}})],1),a("el-form-item",{attrs:{label:"奖励类型"}},[a("el-radio-group",{on:{change:function(t){e.discountNum=""}},model:{value:e.rewardType,callback:function(t){e.rewardType=t},expression:"rewardType"}},[a("el-radio",{attrs:{label:"0"}},[e._v("折扣")]),a("el-radio",{attrs:{label:"1"}},[e._v("Shoppe币折扣 "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"买家使用Shoppee币回扣优惠劵并获得Shoppee币作为回报。Shoppee币成本将由您吸收",placement:"right-start"}},[a("i",{staticClass:"el-icon-question"})])],1)],1)],1),a("el-form-item",{staticClass:"discountitem",attrs:{label:"折扣类型 | 优惠限额"}},["0"===e.rewardType?a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择",size:"mini"},on:{change:function(t){e.discountNum=""}},model:{value:e.discountType,callback:function(t){e.discountType=t},expression:"discountType"}},[a("el-option",{attrs:{label:"折扣",value:"0"}}),a("el-option",{attrs:{label:"折扣金额",value:"1"}})],1):e._e(),"1"===e.rewardType?a("span",[e._v("折扣 ：")]):e._e(),a("div",{staticStyle:{display:"flex","flex-flow":"column"}},[a("div",["0"===e.rewardType&&"0"===e.discountType||"1"===e.rewardType?a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",maxlength:"2",clearable:"",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.discountNum,callback:function(t){e.discountNum=t},expression:"discountNum"}}):e._e(),"0"===e.rewardType&&"1"===e.discountType?a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",clearable:"",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.discountNum,callback:function(t){e.discountNum=t},expression:"discountNum"}}):e._e(),"0"===e.rewardType&&"0"===e.discountType?a("span",[e._v("%折扣")]):e._e(),"1"===e.rewardType?a("span",[e._v("%Shopee币折扣")]):e._e()],1),"0"===e.rewardType&&"0"===e.discountType?a("span",{staticStyle:{"margin-left":"-100px",color:"red","line-height":"10px","margin-bottom":"10px"}},[e._v(" 付款金额中的"+e._s(e.discountNum)+"%将退还给买家。 ")]):e._e(),"1"===e.rewardType?a("span",{staticStyle:{"margin-left":"-40px",color:"red","line-height":"10px","margin-bottom":"10px"}},[e._v(" 付款金额中的"+e._s(e.discountNum)+"%将以Shopee币退还给买家。 "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.contentDes,placement:"right-start"}},[a("i",{staticClass:"el-icon-question"})])],1):e._e()])],1),"0"===e.rewardType&&"0"===e.discountType||"1"===e.rewardType?a("el-form-item",{attrs:{label:"最高优惠金额"}},[a("el-radio-group",{model:{value:e.limitPrice,callback:function(t){e.limitPrice=t},expression:"limitPrice"}},[a("el-radio",{attrs:{label:"0"}},[e._v("无限制")]),a("el-radio",{attrs:{label:"1"}},[e._v("设置金额： "),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.maxPrice,callback:function(t){e.maxPrice=t},expression:"maxPrice"}})],1)],1)],1):e._e(),a("el-form-item",{attrs:{label:"最低消费金额"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.minPrice,callback:function(t){e.minPrice=t},expression:"minPrice"}})],1),a("el-form-item",{attrs:{label:"优惠时限"}},[a("el-date-picker",{staticStyle:{width:"330px"},attrs:{size:"mini","value-format":"timestamp",type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1),a("el-form-item",{attrs:{label:"优惠劵可使用数量(必填)"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.useQuantity,callback:function(t){e.useQuantity=t},expression:"useQuantity"}})],1),a("el-form-item",{attrs:{label:"优惠劵显示页面"}},[a("el-radio-group",{model:{value:e.couponhide,callback:function(t){e.couponhide=t},expression:"couponhide"}},[a("el-radio",{attrs:{label:"0"}},[e._v("在基本页面显示")]),a("el-radio",{attrs:{label:"1"}},[e._v("不显示")])],1),"0"===e.couponhide?a("div",{staticStyle:{color:"red","line-height":"16px",height:"32px"}},[e._v(" 选择此选项以便买家可以在商品页面，商品详情页面和购物车页面上查看您的优惠劵。 ")]):e._e(),"1"===e.couponhide?a("div",{staticStyle:{color:"red","line-height":"16px",height:"32px"}},[e._v("您的优惠劵不会显示在任何页面上但您可以与用户分享优惠劵代码。 ")]):e._e()],1),a("el-form-item",{attrs:{label:"优惠商品"}},["1"===e.coupontype?a("span",[e._v("所有商品")]):e._e(),"2"===e.coupontype?a("div",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.goodsItemSelectorVisible=!0}}},[e._v("添加商品")]),a("el-table",{staticClass:"goodstable",attrs:{data:e.couponGoodslist,"header-cell-style":{background:"#f7fafa"},height:"120px"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center","min-width":"60px"}}),a("el-table-column",{attrs:{prop:"itemid",label:"商品ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCouponGoods(n)}}},[e._v("删除")])],1)]}}],null,!1,1581092965)})],1)],1):e._e()]),a("el-form-item",["1"===e.coupontype?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.mallCouponFun}},[e._v("创建店铺优惠劵")]):e._e(),"2"===e.coupontype?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.goodsCouponFun}},[e._v("创建商品优惠劵")]):e._e(),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("取消")])],1)],1)],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?a("goodsItemSelector",{attrs:{"is-need-filter-act":!0,mall:e.selectMallList},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)],1)},r=[],o=a("2909"),i=a("1da1"),l=(a("96cf"),a("a9e3"),a("c740"),a("a434"),a("d3b7"),a("25f0"),a("b0c0"),a("99af"),a("159b"),a("ac1f"),a("466d"),a("feb6")),s=a("01cd"),c=a("a254"),u=a("0e0b"),p={components:{storeChoose:l["a"],goodsItemSelector:s["a"]},data:function(){return{siteLimitCost:{MY:1,TW:1,VN:1e3,ID:100,PH:5,TH:1,SG:1,BR:1,MX:1,CO:1,CL:1,PL:1,FR:1,ES:1},tableLoading:!1,singerStop:!1,MarketManagerAPIInstance:new c["a"](this),showlog:!0,saleType:"0",tableList:[],goodsItemSelectorVisible:!1,CouponVisible:!1,dialogtitle:"",coupontype:"2",couponName:"",rewardType:"0",discountType:"1",discountNum:"",limitPrice:"0",maxPrice:"",minPrice:"",dateTime:[],pickerOptions:{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}},useQuantity:"",couponhide:"0",couponGoodslist:[],selectMallList:[],stoptoping:!1,mallTableSelect:[],goodsItems:[]}},computed:{contentDes:function(){var e=this.$filters.siteCoin(this.selectMallList[0].country);return"Shopee币交换规则，".concat(e,"100=100 Shopee币")}},created:function(){},methods:{goodsCouponFun:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.couponName){t.next=3;break}return e.$message.warning("优惠券名称不能为空"),t.abrupt("return");case 3:if(e.discountNum){t.next=6;break}return e.$message.warning("请输入有效折扣信息"),t.abrupt("return");case 6:if(!("0"===e.rewardType&&"1"===e.discountType&&Number(e.discountNum)>Number(e.minPrice))){t.next=9;break}return e.$message.warning("折扣金额不能大于最低消费金额"),t.abrupt("return");case 9:if(!(Number(e.minPrice)<e.siteLimitCost[e.selectMallList[0].country.toLocaleUpperCase()])){t.next=12;break}return e.$message.warning("当前站点最低消费金额为".concat(e.siteLimitCost[e.selectMallList[0].country.toLocaleUpperCase()])),t.abrupt("return");case 12:if(e.useQuantity){t.next=15;break}return e.$message.warning("请输入有效优惠券数量"),t.abrupt("return");case 15:if(e.couponGoodslist.length){t.next=18;break}return e.$message.warning("请选择商品"),t.abrupt("return");case 18:if(e.dateTime.length){t.next=21;break}return e.$message.warning("请输入有效活动时间"),t.abrupt("return");case 21:return e.CouponVisible=!1,e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务"),t.next=26,Object(u["d"])(e.selectMallList,e.createCoupon);case 26:t.sent,e.$refs.Logs.writeLog("创建任务结束"),e.couponGoodslist=[],e.getTableList();case 30:case"end":return t.stop()}}),t)})))()},delCouponGoods:function(e){var t=this.couponGoodslist.findIndex((function(t){return t===e}));this.couponGoodslist.splice(t,1)},changeGoodsItem:function(e){e&&(this.couponGoodslist=e.goodsList),this.goodsItemSelectorVisible=!1},clearLog:function(){this.$refs.Logs.consoleMsg=""},handleSelectionChange:function(e){this.mallTableSelect=e},MallvoucherStopMul:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.mallTableSelect.length){t.next=3;break}return e.$message.warning("请选择要操作的数据"),t.abrupt("return");case 3:a=0;case 4:if(!(a<e.mallTableSelect.length)){t.next=11;break}if(2!==Number(e.mallTableSelect[a].promotion_type)){t.next=8;break}return t.next=8,e.MallvoucherStop(e.mallTableSelect[a]);case 8:a++,t.next=4;break;case 11:e.getTableList();case 12:case"end":return t.stop()}}),t)})))()},MallvoucherStop:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,voucher_id:e.voucher_id.toString()},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallvoucherStop(n);case 5:r=a.sent,0===r.ecode?(t.$set(e,"voucher_status","已过期"),t.$refs.Logs.writeLog("------已停止【".concat(e.name,"】优惠活动------"),!0)):t.$refs.Logs.writeLog("停止【".concat(e.name,"】优惠活动,").concat(r.message),!1),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("停止【".concat(e.name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop=!1;case 13:case"end":return a.stop()}}),a,null,[[1,9]])})))()},MallvoucherDelMul:function(){var e=this;this.mallTableSelect.length?this.$confirm("确定要删除这些优惠券吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.MallvoucherDelMulFun()})).catch((function(){})):this.$message.warning("请选择要操作的数据")},MallvoucherDelMulFun:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<e.mallTableSelect.length)){t.next=8;break}if(1!==Number(e.mallTableSelect[a].promotion_type)){t.next=5;break}return t.next=5,e.MallvoucherDel(e.mallTableSelect[a]);case 5:a++,t.next=1;break;case 8:e.getTableList();case 9:case"end":return t.stop()}}),t)})))()},MallvoucherDelFun:function(e){var t=this;this.$confirm("确定要删除该优惠券吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.MallvoucherDel(e)})).catch((function(){}))},MallvoucherDel:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:e.country,mallId:e.platform_mall_id,voucher_id:e.voucher_id.toString()},a.prev=1,t.showlog=!1,a.next=5,t.MarketManagerAPIInstance.MallvoucherDel(n);case 5:r=a.sent,0===r.ecode?t.$refs.Logs.writeLog("------成功删除【".concat(e.name,"】优惠活动------"),!0):(o="","no edit permission for the voucher"===r.message&&(o="您没有编辑权限"),t.$refs.Logs.writeLog("删除【".concat(e.name,"】优惠活动,").concat(r.message,":").concat(o),!1)),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),t.$refs.Logs.writeLog("删除【".concat(e.name,"】--catch,").concat(a.t0),!1);case 12:t.singerStop&&t.getTableList(),t.singerStop=!1;case 14:case"end":return a.stop()}}),a,null,[[1,9]])})))()},stopSearch:function(){Object(u["A"])(),this.stoptoping=!0,this.$refs.Logs.writeLog("正在停止查询")},stopCreate:function(){Object(u["A"])(),this.$refs.Logs.writeLog("已停止创建")},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=t.getHours(),i=t.getMinutes(),l=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(r)+" "+this.add0(o)+":"+this.add0(i)+":"+this.add0(l)},changeMallList:function(e){this.selectMallList=e},getInfo:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,i,l,s,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,i={country:e.country,mallId:e.platform_mall_id,offset:e.offset,limit:20,promotion_type:a.saleType},n.next=5,a.MarketManagerAPIInstance.Mallvoucher(i);case 5:if(l=n.sent,0!==l.ecode){n.next=20;break}if(c=l.data.data.voucher_list,c.forEach((function(t){var n;t.platform_mall_id=e.platform_mall_id,t.country=e.country,t.mallName=e.mall_alias_name||e.platform_mall_name,t.voucher_type=(null===(n=t.rule.shopids)||void 0===n?void 0:n.length)>0?"店铺优惠券":"商品优惠券",t.formStartime=a.formatTime(1e3*t.start_time),t.formEndtime=a.formatTime(1e3*t.end_time);var r=(new Date).getTime();r<1e3*t.start_time?(t.voucher_status="即将开始",t.promotion_type=1):r>1e3*t.start_time&&r<1e3*t.end_time?(t.voucher_status="进行中",t.promotion_type=2):(t.voucher_status="已过期",t.promotion_type=3),0===Number(t.rule.reward_type)&&(Number(t.discount)>0&&Number(t.max_value)>0?(t.discountInfo="".concat((100-Number(t.discount))/10,"折"),t.topNum=t.max_value):Number(t.discount)>0&&0===Number(t.max_value)?(t.discountInfo="".concat((100-Number(t.discount))/10,"折"),t.topNum="无限制"):(t.discountInfo=t.value,t.topNum="")),1===Number(t.rule.reward_type)&&(t.discountInfo="".concat(t.rule.coin_cashback_voucher.coin_percentage_real,"%折扣,(Shopee币回扣)"),t.topNum=0===Number(t.rule.coin_cashback_voucher.max_coin)?"无限制":t.rule.coin_cashback_voucher.max_coin+"(Shopee币)")})),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】总数据：").concat(l.data.data.total_count,"条,正在请求第【").concat(i.offset/i.limit+1,"】页"),!0),(s=a.getTable).push.apply(s,Object(o["a"])(c)),!((null===c||void 0===c?void 0:c.length)>=i.limit)){n.next=17;break}return e.offset=e.offset+i.limit,n.next=15,a.getInfo(e,{count:1});case 15:n.next=18;break;case 17:a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】请求数据结束"));case 18:n.next=21;break;case 20:"token not found"===l.message?a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(l.message,":店铺未登录"),!1):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(l.message),!1);case 21:n.next=26;break;case 23:n.prev=23,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】--catch，").concat(n.t0),!1);case 26:return n.prev=26,r.count--,n.finish(26);case 29:case"end":return n.stop()}}),n,null,[[1,23,26,29]])})))()},getTableList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.multipleTable.clearSelection(),e.selectMallList.forEach((function(e){e.offset=0})),e.getTable=[],e.showlog=!1,e.tableLoading=!0,e.$refs.Logs.writeLog("开始请求数据",!0),t.next=8,Object(u["d"])(e.selectMallList,e.getInfo);case 8:t.sent,e.$refs.Logs.writeLog("请求数据结束"),e.tableLoading=!1,e.tableList=e.getTable;case 12:case"end":return t.stop()}}),t)})))()},mallCoupon:function(){this.selectMallList.length?(this.showlog=!0,this.CouponVisible=!0,this.coupontype="1",this.dialogtitle="新建店铺优惠劵"):this.$message.warning("请选择店铺")},mallCouponFun:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.couponName){t.next=3;break}return e.$message.warning("优惠券名称不能为空"),t.abrupt("return");case 3:if(e.discountNum){t.next=6;break}return e.$message.warning("请输入有效折扣信息"),t.abrupt("return");case 6:if(!("0"===e.rewardType&&"1"===e.discountType&&Number(e.discountNum)>Number(e.minPrice))){t.next=9;break}return e.$message.warning("折扣金额不能大于最低消费金额"),t.abrupt("return");case 9:if(!(Number(e.minPrice)<e.siteLimitCost[e.selectMallList[0].country.toLocaleUpperCase()])){t.next=12;break}return e.$message.warning("当前站点最低消费金额为".concat(e.siteLimitCost[e.selectMallList[0].country.toLocaleUpperCase()])),t.abrupt("return");case 12:if(e.useQuantity){t.next=15;break}return e.$message.warning("请输入有效优惠券数量"),t.abrupt("return");case 15:if(e.dateTime.length){t.next=18;break}return e.$message.warning("请输入有效活动时间"),t.abrupt("return");case 18:if(!(e.dateTime[0]<(new Date).getTime())){t.next=21;break}return e.$message.warning("开启时间不能小于当前时间"),t.abrupt("return");case 21:return e.CouponVisible=!1,e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务"),t.next=26,Object(u["d"])(e.selectMallList,e.createCoupon);case 26:t.sent,e.$refs.Logs.writeLog("创建任务结束"),e.getTableList();case 29:case"end":return t.stop()}}),t)})))()},goodsCoupon:function(){this.selectMallList.length?this.selectMallList.length>1?this.$message.warning("只能在一个店铺里创建商品优惠劵"):(this.CouponVisible=!0,this.coupontype="2",this.dialogtitle="新建商品优惠劵",this.showlog=!0):this.$message.warning("请选择店铺")},IsNumOrAlp:function(e){if(e.length>6)return!1;var t=/[A-Za-z0-9]/g,a=e.match(t);return a},GetUserName:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r="",n.next=3,a.$appConfig.getGlobalCacheInfo("mallInfo",e.platform_mall_id);case 3:if(o=n.sent,r=0===t?JSON.parse(o).mall_account_info.username:JSON.parse(o).mall_account_info.userRealName,r){n.next=10;break}return n.next=8,a.MarketManagerAPIInstance.getShoppUserName(e);case 8:i=n.sent,r=i.data.user_name;case 10:return r||(a.$refs.Logs.writeLog("创建优惠券失败，请先同步店铺信息",!1),r=""),n.abrupt("return",r);case 12:case"end":return n.stop()}}),n)})))()},CreateCouponCode:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,o,i,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n="",r=0;case 2:if(!(r<e.length)){a.next=9;break}if(t.IsNumOrAlp(e[r].toString())&&(n+=e[r]),4!==n.length){a.next=6;break}return a.abrupt("break",9);case 6:r++,a.next=2;break;case 9:for(o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",i="",l=0;l<5;l++)i+=o[Math.floor(Math.random()*o.length)];return a.abrupt("return",(n+i).toUpperCase());case 13:case"end":return a.stop()}}),a)})))()},createCoupon:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,o,i,l,s,c,u,p;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,o=null,i=null,l=null,"0"===a.rewardType?"0"===a.discountType?o=a.discountNum:i=a.discountNum:l=a.discountNum,a.goodsItems=[],a.couponGoodslist.length&&a.couponGoodslist.forEach((function(e){a.goodsItems.push({itemid:Number(e.itemid)})})),s={country:e.country,mallId:e.platform_mall_id,min_price:a.minPrice,name:a.couponName,value:i,end_time:Math.floor(a.dateTime[1]/1e3),start_time:Math.floor(a.dateTime[0]/1e3),max_value:"0"===a.limitPrice?null:a.maxPrice,discount:o,usage_quantity:a.useQuantity,claim_quantity:"0",rule:{voucher_landing_page:l?"1":"0",reward_type:a.rewardType,hide:a.couponhide,backend_created:"0",items:a.goodsItems||[],coin_cashback_voucher:{coin_percentage_real:l,max_coin:l?a.maxPrice:null}},voucher_code:null},n.next=11,a.GetUserName(e,0);case 11:if(c=n.sent,c){n.next=14;break}return n.abrupt("return");case 14:return n.next=16,a.CreateCouponCode(c);case 16:return s.voucher_code=n.sent,n.next=19,a.MarketManagerAPIInstance.MallvoucherCreate(s);case 19:if(u=n.sent,"wrong voucher prefix"!==u.message){n.next=35;break}return n.next=23,a.GetUserName(e,1);case 23:if(c=n.sent,c){n.next=26;break}return n.abrupt("return");case 26:return n.next=28,a.CreateCouponCode(c);case 28:return s["voucher_code"]=n.sent,n.next=31,a.MarketManagerAPIInstance.MallvoucherCreate(s);case 31:u=n.sent,0!==u.ecode?a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(u.message),!1):a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建成功"),!0),n.next=36;break;case 35:0===u.ecode?a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建成功"),!0):(p="","fe param error"===u.message&&(p="输入数据不正确，请重新输入"),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(u.message,":【").concat(p,"】"),!1));case 36:n.next=41;break;case 38:n.prev=38,n.t0=n["catch"](1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】创建失败：").concat(n.t0,"};"),!1);case 41:return n.prev=41,r.count--,n.finish(41);case 44:case"end":return n.stop()}}),n,null,[[1,38,41,44]])})))()}}},m=p,d=(a("4824"),a("7376"),a("2877")),g=Object(d["a"])(m,n,r,!1,null,"3018df6c",null);t["default"]=g.exports},7376:function(e,t,a){"use strict";a("782a")},"782a":function(e,t,a){},b1ac:function(e,t,a){}}]);