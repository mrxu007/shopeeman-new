(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e7ea52ea"],{58660:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a("53ca"),r=a("b85c"),o=a("1da1"),i=a("d4ec"),s=a("bee2"),l=a("ade3"),c=(a("99af"),a("159b"),a("3ca3"),a("ddb0"),a("c740"),a("a9e3"),a("96cf"),a("f68b")),u=a("a254"),m=a("2b0e"),d=(a("0e0b"),null),p={},g=function(){function e(){Object(i["a"])(this,e),Object(l["a"])(this,"MallAPIInstance",new c["a"](new m["default"])),Object(l["a"])(this,"MarketManagerAPIInstance",new u["a"](new m["default"]))}return Object(s["a"])(e,[{key:"add0",value:function(e){return e<10?"0"+e:e}},{key:"formatTime",value:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a+"-"+d.add0(n)+"-"+d.add0(r)+" "+d.add0(o)+":"+d.add0(i)+":"+d.add0(s)}},{key:"isLogin",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.MallAPIInstance.isLogin(t);case 2:if(a=e.sent,200!==a.code||!a.data){e.next=7;break}return e.abrupt("return",!0);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"topAction",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.country,mallId:t.sys_mall_id,goodsID:t.id},e.next=3,d.MarketManagerAPIInstance.topGoods(a);case 3:if(n=e.sent,0!==n.ecode){e.next=10;break}return e.next=7,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.sys_mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品置顶成功"});case 7:return e.abrupt("return",!0);case 10:return e.next=12,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.sys_mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品【".concat(t.id,"】置顶失败").concat(n.message)});case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"init",value:function(){var e=this;d=this,this.getGoodsTopTask(),setInterval((function(){e.getGoodsTopTask()}),108e5)}},{key:"getGoodsTopTask",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,a,n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.BaseUtilBridgeService.getTopGoodsTask("all");case 2:if(e.t0=e.sent,e.t0){e.next=5;break}e.t0=[];case 5:for(a in t=e.t0,p)clearTimeout(p[a]),p[a]=null;t.forEach((function(e){var t=new Date(e.next_top_time).getTime(),a=(new Date).getTime();t-a<0?n.runtesk(e):p[e.mall_id]=setTimeout((function(){n.runtesk(e)}),t-a)}));case 8:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"runtesk",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a,o,i,s,l,c,u,m=this,p=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=p.length>1&&void 0!==p[1]?p[1]:{count:1},e.prev=1,e.next=4,window.BaseUtilBridgeService.getTopGoods(t.mall_id,"0");case 4:if(o=e.sent,o.length){e.next=9;break}return e.next=8,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"已置顶完所有商品"});case 8:return e.abrupt("return");case 9:return e.next=11,d.isLogin({platform_mall_id:t.mall_id,country:t.country});case 11:if(i=e.sent,i){e.next=17;break}return e.next=15,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"店铺未登录"});case 15:return setTimeout((function(){}),1e3),e.abrupt("return");case 17:s=Object(r["a"])(o),e.prev=18,c=regeneratorRuntime.mark((function e(){var a,n,r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=l.value,e.next=3,d.MarketManagerAPIInstance.topedGoods({country:t.country,mallId:t.mall_id});case 3:if(n=e.sent,0===n.ecode){e.next=8;break}return e.next=7,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"店铺【".concat(t.mall_name,"】商品置顶数据获取失败")});case 7:return e.abrupt("return",{v:void 0});case 8:if(r=n.data,!(r.findIndex((function(e){return e===Number(a.goods_id)}))>=0)){e.next=16;break}return e.next=12,window.BaseUtilBridgeService.saveTopGoods({mall_id:t.mall_id,goods_id:a.goods_id,is_top:"1"});case 12:return e.sent,e.next=15,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"".concat(a.goods_id,"商品正在置顶")});case 15:return e.abrupt("return","continue");case 16:if(!(r.length>=5)){e.next=20;break}return e.next=19,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品置顶已达上限"});case 19:return e.abrupt("return",{v:void 0});case 20:return o={country:a.country,mallId:a.sys_mall_id,goodsID:a.id},e.next=23,m.MarketManagerAPIInstance.topGoods(o);case 23:if(i=e.sent,0!==i.ecode){e.next=31;break}return e.next=27,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品置顶成功"});case 27:return e.next=29,window.BaseUtilBridgeService.saveTopGoods({mall_id:t.mall_name,goods_id:a.goods_id,is_top:"1"});case 29:e.next=33;break;case 31:return e.next=33,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品【".concat(a.id,"】置顶失败").concat(i.message)});case 33:case"end":return e.stop()}}),e)})),s.s();case 21:if((l=s.n()).done){e.next=30;break}return e.delegateYield(c(),"t0",23);case 23:if(u=e.t0,"continue"!==u){e.next=26;break}return e.abrupt("continue",28);case 26:if("object"!==Object(n["a"])(u)){e.next=28;break}return e.abrupt("return",u.v);case 28:e.next=21;break;case 30:e.next=35;break;case 32:e.prev=32,e.t1=e["catch"](18),s.e(e.t1);case 35:return e.prev=35,s.f(),e.finish(35);case 38:e.next=44;break;case 40:return e.prev=40,e.t2=e["catch"](1),e.next=44,window.BaseUtilBridgeService.saveTopGoodsHistory({country:t.country,mall_name:t.mall_name,mall_id:t.mall_id,log_time:d.formatTime((new Date).getTime()),log_message:"商品置顶失败".concat(e.t2)});case 44:return e.prev=44,--a.count,e.finish(44);case 47:case"end":return e.stop()}}),e,null,[[1,40,44,47],[18,32,35,38]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}()},"5daf":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"row",staticStyle:{display:"flex","margin-top":"25px","background-color":"white",padding:"15px 4px",overflow:"auto"}},[a("div",{staticClass:"row2_left",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px",width:"748px"}},[a("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("基础数据配置")]),a("ul",[a("li",[a("storeChoose",{staticStyle:{"margin-left":"-20px",width:"730px"},attrs:{"show-mall-all":!0},on:{changeMallList:e.changeMallList}})],1),a("li",{staticStyle:{"margin-top":"20px","align-items":"center"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.getTopTestTable}},[e._v("搜索任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delTeskFun("")}}},[e._v("批量删除任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.stopdTesk}},[e._v("停止创建任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1),e._m(0)])]),a("div",{staticClass:"row2_right",staticStyle:{border:"1px solid rgb(220, 228, 218)","border-radius":"5px","margin-left":"20px",width:"507px"}},[a("span",{staticStyle:{"margin-top":"-7px",display:"block","margin-left":"14px","background-color":"white","text-align":"center",width:"85px"}},[e._v("置顶任务操作")]),a("ul",{staticStyle:{width:"505px"}},[a("li",[a("div",[e._v(" 置顶时间设置： "),a("el-radio-group",{model:{value:e.set_time,callback:function(t){e.set_time=t},expression:"set_time"}},[a("el-radio",{attrs:{label:"1"}},[e._v("当前时间")]),a("el-radio",{staticStyle:{"margin-left":"11px"},attrs:{label:"2"}},[a("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"mini",type:"datetime","value-format":"timestamp","picker-options":e.pickerOptions,placeholder:"选择日期时间"},model:{value:e.cloumn_date,callback:function(t){e.cloumn_date=t},expression:"cloumn_date"}})],1)],1)],1)]),a("li",[a("div",[e._v(" 置顶维度设置： "),a("el-radio-group",{model:{value:e.otherConditon,callback:function(t){e.otherConditon=t},expression:"otherConditon"}},[a("el-radio",{attrs:{label:"1"}},[e._v("自定义商品")]),a("el-radio",{attrs:{label:"2"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.saleType,callback:function(t){e.saleType=t},expression:"saleType"}},[a("el-option",{attrs:{label:"默认排序",value:"2"}}),a("el-option",{attrs:{label:"销量从低往高",value:"3"}}),a("el-option",{attrs:{label:"销量从高往低",value:"4"}}),a("el-option",{attrs:{label:"价格从低往高",value:"5"}}),a("el-option",{attrs:{label:"价格从高往低",value:"6"}})],1)],1)],1),"1"===e.otherConditon?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")]):e._e()],1)]),a("li",{staticStyle:{"align-items":"baseline"}},[a("div",[e._v("循环置顶商品个数： "),a("el-input",{staticStyle:{width:"60px"},attrs:{size:"mini",onkeyup:"value=value.replace(/[^\\d.]/g,0)"},model:{value:e.loopGoodsNum,callback:function(t){e.loopGoodsNum=t},expression:"loopGoodsNum"}}),a("el-button",{staticStyle:{"margin-left":"32px"},attrs:{size:"mini",type:"primary"},on:{click:e.createTeskFun}},[e._v("创建任务")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.refreshTopGoods}},[e._v("重新获取置顶商品")])],1)])])])]),a("div",{staticClass:"tableDetail",staticStyle:{"margin-top":"8px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableList,height:"calc(100vh - 232px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{type:"index",fixed:"",label:"序号"}}),a("el-table-column",{attrs:{prop:"country",label:"站点",align:"center","min-width":"150px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e._f("chineseSite")(a.country)))]}}])}),a("el-table-column",{attrs:{prop:"mall_name",label:"店铺名称",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"sort_type",label:"置顶维度",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.top_typeList[n.sort_type+""]))])]}}])}),a("el-table-column",{attrs:{prop:"top_total_count",label:"置顶商品总数",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"toped_count",label:"已置顶商品数",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"created_at",label:"任务创建时间",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"next_top_time",label:"下次置顶时间",align:"center","min-width":"150px"}}),a("el-table-column",{attrs:{prop:"topping_goods_ids",label:"置顶商品",align:"center","min-width":"180px","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"msg",label:"操作结果",align:"center","min-width":"180px","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"",label:"历史记录",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.checkRecord(n)}}},[e._v("查看置顶记录")])]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delTeskFun(n)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[15,50,100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"置顶记录",top:"3vh",visible:e.dialogRecord,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"},on:{"update:visible":function(t){e.dialogRecord=t}}},[a("div",[a("el-table",{attrs:{data:e.recordList,"header-cell-style":{background:"#f7fafa"},"row-style":{color:"black",height:"50px"},"max-height":"400px"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"55"}}),a("el-table-column",{attrs:{prop:"log_time",label:"记录时间","min-width":"150",sortable:""}}),a("el-table-column",{attrs:{prop:"log_message",label:"历史信息","min-width":"280","show-overflow-tooltip":""}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogRecord=!1}}},[e._v("关 闭")])],1)]),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?a("goodsItemSelector",{attrs:{"is-need-filter-act":!0,mall:e.selectMalllist},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",{staticStyle:{color:"red",display:"block","margin-top":"5px"}},[e._v("提示：每个店铺可置顶商品数量大为5个，置顶时间为4小时")])])}],o=a("b85c"),i=a("1da1"),s=(a("d81d"),a("c740"),a("a9e3"),a("d3b7"),a("25f0"),a("99af"),a("96cf"),a("0b64")),l=a("feb6"),c=a("01cd"),u=a("0e0b"),m=a("a254"),d=a("f68b"),p=a("58660"),g={components:{storeChoose:l["a"],goodsItemSelector:c["a"]},data:function(){return{topGoodsInstance:new p["a"],MallAPIInstance:new d["a"](this),goodsItemSelectorVisible:!1,dialogRecord:!1,stoptoping:!1,createDel:!1,MarketManagerAPIInstance:new m["a"](this),loading:!1,GoodsList:new s["a"](this),top_typeList:{0:"自定义商品",1:"商品ID",2:"默认排序",3:"销量从低往高",4:"销量从高往低",5:"价格从低往高",6:"价格从高往低"},page:1,pageSize:15,total:0,showlog:!0,pickerOptions:{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}},cloumn_date:"",set_time:"1",otherConditon:"2",saleType:"2",loopGoodsNum:"",tableList:[],selectMalllist:[],selectTable:[],topHistoryMsg:[],recordList:[],currentDate:"",createTag:!1,couponGoodslist:[],topok:0}},mounted:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{addGoods:function(){this.selectMalllist.length>1?this.$message.warning("选择自定义商品时,只能选择一个店铺"):this.goodsItemSelectorVisible=!0},changeGoodsItem:function(e){e&&(this.loopGoodsNum=e.goodsList.length,this.couponGoodslist=e.goodsList.map((function(e){return e.itemid}))),this.goodsItemSelectorVisible=!1},clearLog:function(){this.$refs.Logs.consoleMsg=""},refreshTopGoods:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.showlog=!1,e.selectTable.length){t.next=4;break}return e.$message.warning("请选择需要操作的数据!"),t.abrupt("return");case 4:if("2"!==e.set_time||e.cloumn_date){t.next=10;break}if(!(e.cloumn_date<(new Date).getTime())){t.next=8;break}return e.$message.warning("置顶时间不能晚于当前时间"),t.abrupt("return");case 8:return e.$message.warning("请设置任务执行时间"),t.abrupt("return");case 10:if("1"!==e.otherConditon||e.couponGoodslist.length){t.next=13;break}return e.$message.warning("请选择自定义商品"),t.abrupt("return");case 13:if("2"!==e.otherConditon||e.loopGoodsNum){t.next=16;break}return e.$message.warning("请设置任务执行的商品个数"),t.abrupt("return");case 16:a=[],n=Object(o["a"])(e.selectTable);try{for(i=function(){var t=r.value,n=e.selectMalllist.findIndex((function(e){return e.platform_mall_id===Number(t.mall_id)}));n>=0&&a.push(e.selectMalllist[n])},n.s();!(r=n.n()).done;)i()}catch(s){n.e(s)}finally{n.f()}return e.$refs.Logs.writeLog("正在重新获取任务",!0),t.next=22,Object(u["d"])(a,e.createTesk);case 22:e.$refs.Logs.writeLog("任务获取完成",!0),e.getTopTestTable();case 24:case"end":return t.stop()}}),t)})))()},checkRecord:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.dialogRecord=!0,a.next=3,window.BaseUtilBridgeService.getTopGoodsHistory(e.mall_id);case 3:n=a.sent,t.recordList=n,n||t.$message.warning("置顶历史数据获取失败");case 6:case"end":return a.stop()}}),a)})))()},getTopTestTable:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,s,l,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.tableList=[],e.showlog=!1,e.$refs.Logs.writeLog("正在获取列表信息......",!0),a=e.selectMalllist.map((function(e){return e["platform_mall_id"]})).toString(),t.next=6,window.BaseUtilBridgeService.getTopGoodsTask(a);case 6:n=t.sent,n.length||e.$refs.Logs.writeLog("当前暂无置顶任务",!0),r=Object(o["a"])(n),t.prev=9,r.s();case 11:if((i=r.n()).done){t.next=25;break}return s=i.value,t.next=15,window.BaseUtilBridgeService.getTopGoods(s.mall_id,"1");case 15:return l=t.sent,s.toped_count=l.length,s.topping_goods_ids=l.map((function(e){return e.goods_id})).toString(),t.next=20,window.BaseUtilBridgeService.getTopGoodsHistory(s.mall_id);case 20:c=t.sent,s.msg=c[c.length-1].log_message,e.tableList.push(s);case 23:t.next=11;break;case 25:t.next=30;break;case 27:t.prev=27,t.t0=t["catch"](9),r.e(t.t0);case 30:return t.prev=30,r.f(),t.finish(30);case 33:e.$refs.Logs.writeLog("列表信息获取结束",!0);case 34:case"end":return t.stop()}}),t,null,[[9,27,30,33]])})))()},getMallTopGoods:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,i,s,l,c,u,m,d,p,g,_,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r={country:e.country,pageNumber:0,platform_mall_id:e.platform_mall_id},i={mItem:r,pageSize:48,listType:"all"},"3"===e.top_type&&(i.listOrderType="sales_asc"),"4"===e.top_type&&(i.listOrderType="sales_dsc"),"5"===e.top_type&&(i.listOrderType="price_asc"),"6"===e.top_type&&(i.listOrderType="price_dsc"),s=!0,l=[];case 8:if(!s){n.next=52;break}return r["pageNumber"]++,n.next=12,a.GoodsList.getMpskuList(i);case 12:if(c=n.sent,200!==c.code){n.next=49;break}if(null!==(u=c.data.list)&&void 0!==u&&u.length){n.next=17;break}return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】暂无商品数据")),n.abrupt("return",[]);case 17:m=c.data.list,d=Object(o["a"])(m),n.prev=19,d.s();case 21:if((p=d.n()).done){n.next=39;break}return g=p.value,_={},_["mall_id"]=e.platform_mall_id.toString(),_["goods_id"]=g.id.toString(),_["is_top"]="0",n.next=29,window.BaseUtilBridgeService.saveTopGoods(_);case 29:if(f=n.sent,"200"===f.code){n.next=34;break}return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(g.id,"上报失败"),!1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】任务创建失败"),!1),n.abrupt("return",[]);case 34:if(l.push({id:g.id}),!(l.length>=t)){n.next=37;break}return n.abrupt("return",l);case 37:n.next=21;break;case 39:n.next=44;break;case 41:n.prev=41,n.t0=n["catch"](19),d.e(n.t0);case 44:return n.prev=44,d.f(),n.finish(44);case 47:n.next=50;break;case 49:return n.abrupt("return",[]);case 50:n.next=8;break;case 52:return n.abrupt("return",l);case 53:case"end":return n.stop()}}),n,null,[[19,41,44,47]])})))()},topAction:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,o,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.MarketManagerAPIInstance.topedGoods({country:e.country,mallId:e.sys_mall_id});case 2:if(n=a.sent,0===n.ecode){a.next=8;break}return t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品置顶数据获取失败"),!1),a.next=7,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mallName,mall_id:e.sys_mall_id.toString(),log_time:t.formatTime((new Date).getTime()),log_message:"店铺【".concat(e.mallName,"】商品置顶数据获取失败")});case 7:return a.abrupt("return","top_data_fail");case 8:if(r=n.data,!(r.findIndex((function(t){return t===Number(e.id)}))>=0)){a.next=16;break}return a.next=12,window.BaseUtilBridgeService.saveTopGoods({mall_id:e.sys_mall_id.toString(),goods_id:e.id.toString(),is_top:"1"});case 12:return a.sent,a.next=15,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mallName,mall_id:e.sys_mall_id.toString(),log_time:t.formatTime((new Date).getTime()),log_message:"".concat(e.id.toString(),"该商品正在置顶")});case 15:return a.abrupt("return","toped");case 16:if(!(r.length>=5)){a.next=20;break}return a.next=19,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mallName,mall_id:e.sys_mall_id.toString(),log_time:t.formatTime((new Date).getTime()),log_message:"商品置顶已达上限"});case 19:return a.abrupt("return","full");case 20:return o={country:e.country,mallId:e.sys_mall_id,goodsID:e.id},a.next=23,t.MarketManagerAPIInstance.topGoods(o);case 23:if(i=a.sent,0!==i.ecode){a.next=31;break}return a.next=27,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mallName,mall_id:e.sys_mall_id.toString(),log_time:t.formatTime((new Date).getTime()),log_message:"商品置顶成功"});case 27:return t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶成功"),!0),a.abrupt("return","suc");case 31:return a.next=33,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mallName,mall_id:e.sys_mall_id.toString(),log_time:t.formatTime((new Date).getTime()),log_message:"商品【".concat(e.id,"】置顶失败").concat(i.message)});case 33:return t.$refs.Logs.writeLog("店铺【".concat(e.mallName,"】商品【").concat(e.id,"】置顶失败").concat(i.message),!1),a.abrupt("return","fails");case 35:case"end":return a.stop()}}),a)})))()},stopdTesk:function(){Object(u["B"])(),this.stoptoping=!0,this.$refs.Logs.writeLog("正在停止创建任务")},handleSelectionChange:function(e){this.selectTable=e},delTeskFun:function(e){var t=this;e||this.selectTable.length?this.$confirm("确定删除这些任务吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e){a.next=6;break}return a.next=3,t.delTesk(e);case 3:t.getTopTestTable(),a.next=14;break;case 6:n=0;case 7:if(!(n<t.selectTable.length)){a.next=13;break}return a.next=10,t.delTesk(t.selectTable[n]);case 10:n++,a.next=7;break;case 13:t.getTopTestTable();case 14:case"end":return a.stop()}}),a)})))):this.$message.warning("请选择要操作的数据！")},delTesk:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,window.BaseUtilBridgeService.deleteTopGoodsTask(e.mall_id.toString());case 2:return n=a.sent,a.next=5,window.BaseUtilBridgeService.deleteTopGoods(e.mall_id.toString());case 5:return r=a.sent,a.next=8,window.BaseUtilBridgeService.deleteTopGoodsHistory(e.mall_id.toString());case 8:o=a.sent,"200"===n.code&&"200"===r.code&&"200"===o.code?t.$refs.Logs.writeLog("".concat(e.mall_name,"删除成功"),!0):t.$refs.Logs.writeLog("删除失败:".concat(n.msg||r.msg||o.msg),!1);case 10:case"end":return a.stop()}}),a)})))()},isLogin:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.MallAPIInstance.isLogin(e);case 2:if(n=a.sent,200!==n.code||!n.data){a.next=7;break}return a.abrupt("return",!0);case 7:return t.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】店铺未登录"),!1),a.abrupt("return",!1);case 9:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(e){this.pageSize=e,this.getTopTestTable()},handleCurrentChange:function(e){this.page=e,this.getTopTestTable()},changeMallList:function(e){this.selectMalllist=e},createTeskFun:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectMalllist.length){t.next=3;break}return e.$message.warning("请选择要执行的任务的店铺"),t.abrupt("return");case 3:if("2"!==e.set_time||e.cloumn_date){t.next=9;break}if(!(e.cloumn_date<(new Date).getTime())){t.next=7;break}return e.$message.warning("置顶时间不能晚于当前时间"),t.abrupt("return");case 7:return e.$message.warning("请设置任务执行时间"),t.abrupt("return");case 9:if("1"!==e.otherConditon||e.couponGoodslist.length){t.next=12;break}return e.$message.warning("请选择自定义商品"),t.abrupt("return");case 12:if("2"!==e.otherConditon||e.loopGoodsNum){t.next=15;break}return e.$message.warning("请设置任务执行的商品个数"),t.abrupt("return");case 15:return e.showlog=!1,e.$refs.Logs.writeLog("正在创建任务",!0),t.next=19,Object(u["d"])(e.selectMalllist,e.createTesk);case 19:e.$refs.Logs.writeLog("任务创建结束",!0),e.getTopTestTable();case 21:case"end":return t.stop()}}),t)})))()},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(r)+" "+this.add0(o)+":"+this.add0(i)+":"+this.add0(s)},createTesk:function(e){var t=arguments,a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,i,s,l,c,u,m,d,p,g,_,f,b,w,h,v,x;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{count:1},n.prev=1,n.next=4,a.isLogin(e);case 4:if(i=n.sent,i){n.next=7;break}return n.abrupt("return");case 7:return n.next=9,window.BaseUtilBridgeService.getTopGoodsTask(e.platform_mall_id);case 9:if(s=n.sent,!s.length){n.next=14;break}return a.$refs.Logs.writeLog("任务更新",!0),n.next=14,a.delTesk({mall_id:e.platform_mall_id,mall_name:e.mall_alias_name||e.platform_mall_name});case 14:return l=(new Date).getTime(),c="1"===a.set_time?l:a.cloumn_date,u={country:e.country,mall_name:e.mall_alias_name||e.platform_mall_name,mall_id:e.platform_mall_id.toString(),top_task_type:s?2:1,top_total_count:"1"===a.otherConditon?a.couponGoodslist.length:a.loopGoodsNum,toped_count:0,sort_type:"1"===a.otherConditon?"0":a.saleType,next_top_time:a.formatTime(c+144e5),topping_goods_ids:"",message:"",created_at:a.formatTime(l),updated_at:a.formatTime(c)},n.next=19,window.BaseUtilBridgeService.saveTopGoodsTask(u);case 19:if(m=n.sent,"200"===m.code){n.next=25;break}return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】任务创建失败"),!1),n.abrupt("return");case 25:return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】任务创建成功"),!0),n.next=28,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mall_alias_name||e.platform_mall_name,mall_id:e.platform_mall_id,log_time:a.formatTime((new Date).getTime()),log_message:"任务创建成功"});case 28:if(d=[],"1"!==a.otherConditon){n.next=61;break}p=Object(o["a"])(a.couponGoodslist),n.prev=31,p.s();case 33:if((g=p.n()).done){n.next=51;break}if(_=g.value,!a.stoptoping){n.next=37;break}return n.abrupt("return");case 37:return f={},f["mall_id"]=e.platform_mall_id.toString(),f["goods_id"]=_.toString(),f["is_top"]="0",n.next=43,window.BaseUtilBridgeService.saveTopGoods(f);case 43:if(b=n.sent,"200"===b.code){n.next=48;break}return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】").concat(_.id,"上报置顶商品表失败:").concat(b.message),!1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】任务创建失败"),!1),n.abrupt("return");case 48:d.push({id:_});case 49:n.next=33;break;case 51:n.next=56;break;case 53:n.prev=53,n.t0=n["catch"](31),p.e(n.t0);case 56:return n.prev=56,p.f(),n.finish(56);case 59:n.next=66;break;case 61:return n.next=63,a.getMallTopGoods(e,a.loopGoodsNum);case 63:if(d=n.sent,d){n.next=66;break}return n.abrupt("return");case 66:return n.next=68,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mall_alias_name||e.platform_mall_name,mall_id:e.platform_mall_id,log_time:a.formatTime((new Date).getTime()),log_message:"获取置顶商品表:【".concat(d.length,"】个")});case 68:if("1"!==a.set_time){n.next=99;break}w=0;case 70:if(!(w<d.length)){n.next=97;break}if(!a.stoptoping){n.next=73;break}return n.abrupt("return");case 73:return h={},h.country=e.country,h.sys_mall_id=e.platform_mall_id,h.mallName=e.mall_alias_name||e.platform_mall_name,h.id=d[w].id,n.next=80,a.topAction(h);case 80:if(v=n.sent,"full"!==v&&"top_data_fail"!==v){n.next=85;break}return n.abrupt("break",97);case 85:if("toped"!==v){n.next=87;break}return n.abrupt("continue",94);case 87:return n.next=89,window.BaseUtilBridgeService.saveTopGoods({mall_id:e.platform_mall_id,goods_id:d[w].id.toString(),is_top:"1"});case 89:if(x=n.sent,"200"===x.code){n.next=94;break}return a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】更新置顶商品表失败:").concat(x.message),!1),a.$refs.Logs.writeLog("【".concat(e.mall_alias_name||e.platform_mall_name,"】任务创建失败"),!1),n.abrupt("return");case 94:w++,n.next=70;break;case 97:n.next=101;break;case 99:return n.next=101,window.BaseUtilBridgeService.saveTopGoodsHistory({country:e.country,mall_name:e.mall_alias_name||e.platform_mall_name,mall_id:e.platform_mall_id,log_time:a.formatTime((new Date).getTime()),log_message:"未到执行时间"});case 101:n.next=106;break;case 103:n.prev=103,n.t1=n["catch"](1),a.$refs.Logs.writeLog("【".concat(n.t1,"】"),!1);case 106:return n.prev=106,--r.count,n.finish(106);case 109:case"end":return n.stop()}}),n,null,[[1,103,106,109],[31,53,56,59]])})))()}}},_=g,f=(a("9ec0"),a("2877")),b=Object(f["a"])(_,n,r,!1,null,"8e4eea2c",null);t["default"]=b.exports},"9ec0":function(e,t,a){"use strict";a("c49e")},c49e:function(e,t,a){}}]);