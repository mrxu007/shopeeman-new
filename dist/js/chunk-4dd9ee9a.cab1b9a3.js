(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dd9ee9a"],{"4dc0":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("el-table",{ref:"shopGroupTable",attrs:{"highlight-current-row":"",width:"100",height:"825","data-changes-scroll-top":!1,"row-height":40,border:!1,data:t.shopGruopData,"row-class-name":t.tableRowClassName},on:{"row-click":t.rowClick}},[e("el-table-column",{attrs:{align:"center",prop:"group_name",label:"店铺分组"}})],1)],1)},r=[],s=e("1da1"),o=(e("96cf"),{props:{getData:{type:Function,default:null}},data:function(){return{shopGruopData:[]}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.getBindMallCount();case 2:case"end":return a.stop()}}),a)})))()},methods:{tableRowClassName:function(t){t.row;var a=t.rowIndex;if(0===a)return"default-current-row"},rowClick:function(t){this.$emit("getGroupId",t.id),0!==t.id&&(document.querySelector(".default-current-row").style.color="#60627d",document.querySelector(".default-current-row").style.backgroundColor="#fff"),this.getData()},getBindMallCount:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var e,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$api.getBindMallCount();case 2:e=a.sent,n=e.data,200===n.code?(t.shopGruopData=n.data,t.shopGruopData.unshift({id:0,group_name:"全部分组"}),t.shopGruopData.push({id:-1,group_name:"无分组"})):t.$message.error("店铺分组数据错误".concat(n.message));case 5:case"end":return a.stop()}}),a)})))()}}}),l=o,u=(e("c5bf"),e("2877")),c=Object(u["a"])(l,n,r,!1,null,"059d950c",null);a["a"]=c.exports},"4f6e":function(t,a,e){},"949c":function(t,a,e){"use strict";e("4f6e")},c5bf:function(t,a,e){"use strict";e("e64f")},c75b:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"contaniner"},[e("el-col",{attrs:{span:3}},[e("mallGroup",{attrs:{"get-data":t.getMallStatistics},on:{getGroupId:t.getGroupId}})],1),e("el-col",{staticClass:"right",attrs:{span:21}},[e("el-row",{staticClass:"header"},[e("el-col",{staticClass:"header-top",attrs:{span:24}},[e("ul",[e("li",[e("span",[t._v("站点：")]),e("el-select",{staticClass:"unnormal",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.form.site,callback:function(a){t.$set(t.form,"site",a)},expression:"form.site"}},[e("el-option",{attrs:{label:"全部",value:0}}),t._l(t.countries,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})}))],2)],1),e("li",[e("el-select",{staticClass:"unnormal",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.form.shopSelect,callback:function(a){t.$set(t.form,"shopSelect",a)},expression:"form.shopSelect"}},t._l(t.shopSelectList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1),e("el-input",{staticClass:"unnormal2",attrs:{placeholder:"",size:"mini",clearable:"",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:t.form.shopSelectVal,callback:function(a){t.$set(t.form,"shopSelectVal",a)},expression:"form.shopSelectVal"}})],1),e("li",[e("span",[t._v("客服数据统计时间(仅用于同步数据)：")]),e("el-select",{staticClass:"unnormal3",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.serviceDataTime,callback:function(a){t.serviceDataTime=a},expression:"serviceDataTime"}},t._l(t.serviceDataTimeList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1)],1),e("li",[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.page=1,t.getMallStatistics()}}},[t._v("查询")]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.exportSearch()}}},[t._v("导出数据")]),e("el-button",{attrs:{type:"primary",size:"mini",disabled:t.buttonStatus.asyncData},on:{click:function(a){return t.handlerSelectTableOperating("syncMallData")}}},[t._v("同步店铺数据")])],1),e("li",[e("el-progress",{directives:[{name:"show",rawName:"v-show",value:t.isShowProgress,expression:"isShowProgress"}],staticStyle:{width:"230px"},attrs:{"text-inside":!0,"stroke-width":24,percentage:t.percentage,status:"success"}})],1)])])],1),e("el-row",{staticClass:"header-two"},[e("el-col",{staticClass:"header-two-top",attrs:{span:24}},[e("span",[t._v("当前条件下，待拨款总订单数： "),e("p",[t._v(t._s(t.frozenAmountOrders))])]),e("span",[t._v("待拨款总金额： "),e("p",[t._v(t._s(parseFloat(t.frozenAmount).toFixed(2)))])]),e("span",[t._v("本周已拨款总金额： "),e("p",[t._v(t._s(parseFloat(t.weekAmount).toFixed(2)))])]),e("span",[t._v("本月已拨款总金额： "),e("p",[t._v(t._s(parseFloat(t.monthAmount).toFixed(2)))])]),e("span",[t._v("全部已拨款总金额： "),e("p",[t._v(t._s(parseFloat(t.availableAmount).toFixed(2)))])])])],1),e("el-row",{staticClass:"article"},[e("u-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],ref:"plTable",attrs:{"use-virtual":"",height:t.height,"row-height":t.rowHeight,"data-changes-scroll-top":!1,border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":t.handleSelectionChange}},[e("u-table-column",{attrs:{align:"center",fixed:"",type:"selection",width:"50"}}),e("u-table-column",{attrs:{align:"center",fixed:"",type:"index",label:"序列号",width:"60"}}),e("u-table-column",{attrs:{align:"center",fixed:"",prop:"country",label:"站点",width:"70"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(t._f("chineseSite")(e.country))+" ")]}}])}),e("u-table-column",{attrs:{align:"center",fixed:"",prop:"platform_mall_id",label:"店铺ID",width:"100"}}),e("u-table-column",{attrs:{align:"center",label:"店铺名称",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_alias_name?e.mall_alias_name:e.platform_mall_name)+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"店铺分组",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s("All"===e.group_name?"":e.group_name)+" ")]}}])}),e("u-table-column",{attrs:{align:"center",fixed:"right",label:"操作状态",width:"130","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.row;return[e("span",{style:n.color&&"color:"+n.color},[t._v(t._s(n.status))])]}}])}),e("u-table-column",{attrs:{align:"center",prop:"recent_order_create_time",label:"最近订单创建时间",width:"150"}}),e("u-table-column",{attrs:{align:"center",prop:"yesterday_order_num",label:"昨日订单数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"week_order_num",label:"近7天订单数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"history_order_num",label:"历史订单数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"mall_quota",label:"店铺额度",width:"100",sortable:""}}),e("u-table-column",{attrs:{align:"center",prop:"all_product_num",label:"全部产品数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"active_product_num",label:"上架产品数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"soldout_product_num",label:"售空产品数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"banned_product_num",label:"禁卖产品数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"unlisted_product_num",label:"未上架产品数",width:"100"}}),e("u-table-column",{attrs:{align:"center",prop:"chat_response_rate",label:"聊聊回复率",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"rating_star",label:"卖场评价",width:"80"}}),e("u-table-column",{attrs:{align:"center",prop:"order_non_fulfillment_rate",label:"订单未完成率",width:"100"}}),e("u-table-column",{attrs:{align:"center",prop:"followers_number",label:"关注量",width:"60"}}),e("u-table-column",{attrs:{align:"center",prop:"fans_number",label:"粉丝量",width:"60"}}),e("u-table-column",{attrs:{align:"center",prop:"today_view_product_count",label:"商品浏览量",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"yesterday_view_product_count",label:"昨日浏览量",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"week_view_product_count",label:"近7天浏览量",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"month_view_product_count",label:"近30天浏览量",width:"100"}}),e("u-table-column",{attrs:{align:"center",prop:"today_view_person_count",label:"访客数",width:"60"}}),e("u-table-column",{attrs:{align:"center",prop:"yesterday_view_person_count",label:"昨日访客数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"week_view_person_count",label:"近7日访客数",width:"90"}}),e("u-table-column",{attrs:{align:"center",prop:"month_view_person_count",label:"近30日访客数",width:"100"}}),e("u-table-column",{attrs:{align:"center",label:"客服不重复访客数","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatShopUvData?e.mall_datas.ChatShopUvData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服询问数","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatsEnquiredData?e.mall_datas.ChatsEnquiredData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服访客询问数","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatVisitorsEnquiredData?e.mall_datas.ChatVisitorsEnquiredData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服已回应数","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatRespondedChatsData?e.mall_datas.ChatRespondedChatsData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服无回应数","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatNonRespondedChatsData?e.mall_datas.ChatNonRespondedChatsData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服咨询买家数","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatBuyersData?e.mall_datas.ChatBuyersData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服咨询订单数","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatOrdersData?e.mall_datas.ChatOrdersData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服咨询件数","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatUnitsData?e.mall_datas.ChatUnitsData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服咨询销售额","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatSalesData?e.mall_datas.ChatSalesData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",label:"客服平均回应时间","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v(" "+t._s(e.mall_datas&&e.mall_datas.ChatResponseTimeData?e.mall_datas.ChatResponseTimeData:"-")+" ")]}}])}),e("u-table-column",{attrs:{align:"center",prop:"frozen_amount_orders",label:"待拨款订单数","min-width":"110"}}),e("u-table-column",{attrs:{align:"center",prop:"frozen_amount",label:"待拨款金额","min-width":"110"}}),e("u-table-column",{attrs:{align:"center",prop:"lastweek_amount",label:"本周已拨款","min-width":"110"}}),e("u-table-column",{attrs:{align:"center",prop:"lastmonth_amount",label:"本月已拨款","min-width":"110"}}),e("u-table-column",{attrs:{align:"center",prop:"available_amount",label:"全部已拨款","min-width":"100"}})],1),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[200,700,1e3,2e3],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)],1)},r=[],s=e("1da1"),o=(e("159b"),e("99af"),e("96cf"),e("4dc0")),l=e("0e0b"),u=e("d4ec"),c=e("bee2"),i=(e("b680"),e("ac1f"),e("5319"),e("6c27")),d=e("8237"),p=e.n(d),m=function(){function t(a){Object(u["a"])(this,t),this._this=a}return Object(c["a"])(t,[{key:"getProductStatisticalData",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,s={mallId:n,version:"3.1.0"},t.next=5,this._this.$shopeemanService.getChinese(r,e,s);case 5:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=11;break}return l=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).data,l&&(a["all_product_num"]=l.product_count_for_limit+l.unlisted_count+l.banned_count,a["active_product_num"]=l.product_count_for_limit,a["unlisted_product_num"]=l.unlisted_count,a["banned_product_num"]=l.banned_count,a["mall_quota"]=l.count_for_limit,a["soldout_product_num"]=l.sold_out_count),t.abrupt("return",{code:200,data:l||{}});case 11:return t.abrupt("return",{code:o.status,data:o.data});case 14:return t.prev=14,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[0,14]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"getShopProfile",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,s={mallId:n,version:"3.1.0"},t.next=5,this._this.$shopeemanService.getChinese(r,e,s);case 5:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=11;break}return l=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).data,l&&(a["chat_response_rate"]=l.shop.display_response_rate+"%",a["rating_star"]=parseFloat(l.shop.rating_star).toFixed(2),a["fans_number"]=l.shop.follower_count,a["followers_number"]=l.user.following_count,a["display_response_rate"]=l.shop.display_response_rate+"%"),t.abrupt("return",{code:200,data:l||{}});case 11:return t.abrupt("return",{code:o.status,data:o.data});case 14:return t.prev=14,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[0,14]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"getShopMetricsvalue",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,s={mallId:n,version:"3.1.0"},t.next=5,this._this.$shopeemanService.getChinese(r,e,s);case 5:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=11;break}return l=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).data,l&&(a["order_non_fulfillment_rate"]=100*l.non_fulfillment_rate+"%"),t.abrupt("return",{code:200,data:l||{}});case 11:return t.abrupt("return",{code:o.status,data:o.data});case 14:return t.prev=14,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[0,14]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"getKeyMetrics",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e,n,r){var s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a.platform_mall_id,s=a.country,t.next=4,this._this.$shopeemanService.getChinese(s,e,n);case 4:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=10;break}return l=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).result,l&&("today"===r?(a["today_view_product_count"]=l.shop_pv.value,a["today_view_person_count"]=l.shop_uv.value):"yesterday"===r?(a["yesterday_view_product_count"]=l.shop_pv.value,a["yesterday_view_person_count"]=l.shop_uv.value):"past7days"===r?(a["week_view_product_count"]=l.shop_pv.value,a["week_view_person_count"]=l.shop_uv.value):"past30days"===r&&(a["month_view_product_count"]=l.shop_pv.value,a["month_view_person_count"]=l.shop_uv.value)),t.abrupt("return",{code:200,data:l||{}});case 10:return t.abrupt("return",{code:o.status,data:o.data});case 13:return t.prev=13,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 16:case"end":return t.stop()}}),t,this,[[0,13]])})));function a(a,e,n,r){return t.apply(this,arguments)}return a}()},{key:"getChatDashboard",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e,n,r){var s,o,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a.platform_mall_id,s=a.country,t.next=4,this._this.$shopeemanService.getChinese(s,e,n);case 4:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=10;break}return u=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).result,u&&("real_time"===r||"yesterday"===r||"past7days"===r||"past30days"===r)&&(a.mall_datas||(a.mall_datas={}),a.mall_datas.ChatShopUvData=u.shop_uv.value,a.mall_datas.ChatsEnquiredData=u.chats_enquired.value,a.mall_datas.ChatVisitorsEnquiredData=u.visitors_enquired.value,a.mall_datas.ChatRespondedChatsData=u.responded_chats.value,a.mall_datas.ChatNonRespondedChatsData=u.non_responded_chats.value,a.mall_datas.ChatResponseTimeData=Object(l["l"])(u.response_time.value).replace(/-/g,""),a.mall_datas.ChatBuyersData=u.buyers.value,a.mall_datas.ChatOrdersData=u.orders.value,a.mall_datas.ChatUnitsData=u.units.value,a.mall_datas.ChatSalesData=u.sales.value),t.abrupt("return",{code:200,data:u||{}});case 10:return t.abrupt("return",{code:o.status,data:o.data});case 13:return t.prev=13,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 16:case"end":return t.stop()}}),t,this,[[0,13]])})));function a(a,e,n,r){return t.apply(this,arguments)}return a}()},{key:"getBankAccounts",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,t.next=4,this._this.$appConfig.getGlobalCacheInfo("mallInfo",n);case 4:return s=t.sent,o=JSON.parse(s),l={mallId:n,password_hash:Object(i["sha256"])(p()(o.mall_account_info.password)),page_size:30,page_number:1},t.next=9,this._this.$shopeemanService.postChinese(r,e,l,{headers:{"Content-Type":"application/json",charset:"UTF-8"}});case 9:if(u=t.sent,u=JSON.parse(u),200!==u.status){t.next=13;break}return t.abrupt("return",{code:200,data:{}});case 13:return t.abrupt("return",{code:u.status,data:u.data});case 16:return t.prev=16,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 19:case"end":return t.stop()}}),t,this,[[0,16]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"getIncomeMeta",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,s={mallId:n},t.next=5,this._this.$shopeemanService.getChinese(r,e,s);case 5:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=11;break}return l=o&&o.data&&JSON.parse(o.data)&&JSON.parse(o.data).data,l&&(a["frozen_amount"]=l.frozen,a["lastweek_amount"]=l.last_week_income,a["lastmonth_amount"]=l.last_month_income,a["available_amount"]=l.available),t.abrupt("return",{code:200,data:l||{}});case 11:return t.abrupt("return",{code:o.status,data:o.data});case 14:return t.prev=14,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[0,14]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"getFrozenAmountOrders",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,e){var n,r,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=a.platform_mall_id,r=a.country,s={mallId:n,tran_type:2,page_number:1,page_size:10},t.next=5,this._this.$shopeemanService.getChinese(r,e,s);case 5:if(o=t.sent,o=JSON.parse(o),200!==o.status){t.next=11;break}return l=o&&o.data&&JSON.parse(o.data),l&&(a["frozen_amount_orders"]=l.data.page_info.total),t.abrupt("return",{code:200,data:l||{}});case 11:return t.abrupt("return",{code:o.status,data:o.data});case 14:return t.prev=14,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 17:case"end":return t.stop()}}),t,this,[[0,14]])})));function a(a,e){return t.apply(this,arguments)}return a}()},{key:"uploadMallData",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e={allProduct:a.all_product_num,bannedProduct:a.banned_product_num,soldoutProduct:a.soldout_product_num,unlistedProduct:a.unlisted_product_num,activeProduct:a.active_product_num,fansNumber:a.fans_number,followersNumber:a.followers_number,displayResponseRate:a.display_response_rate,ratingStar:a.rating_star,nonFulfillmentRate:a.order_non_fulfillment_rate,todayViewProductCount:a.today_view_product_count,yesterdayViewProductCount:a.yesterday_view_product_count,weekViewProductCount:a.week_view_product_count,monthViewProductCount:a.month_view_product_count,todayViewPersonCount:a.today_view_person_count,yesterdayViewPersonCount:a.yesterday_view_person_count,weekViewPersonCount:a.week_view_person_count,monthViewPersonCount:a.month_view_person_count,mallQuota:a.mall_quota,lastweekAmount:a.lastweek_amount,lastmonthAmount:a.lastmonth_amount,availableAmount:a.available_amount,frozenAmount:a.frozen_amount,frozenAmountOrders:a.frozen_amount_orders,mallDatas:{ChatShopUvData:a.mall_datas.ChatShopUvData,ChatsEnquiredData:a.mall_datas.ChatsEnquiredData,ChatVisitorsEnquiredData:a.mall_datas.ChatVisitorsEnquiredData,ChatRespondedChatsData:a.mall_datas.ChatRespondedChatsData,ChatNonRespondedChatsData:a.mall_datas.ChatNonRespondedChatsData,ChatResponseTimeData:a.mall_datas.ChatResponseTimeData,ChatBuyersData:a.mall_datas.ChatBuyersData,ChatOrdersData:a.mall_datas.ChatOrdersData,ChatUnitsData:a.mall_datas.ChatUnitsData,ChatSalesData:a.mall_datas.ChatSalesData},sysMallId:a.id},t.next=4,this._this.$api.mallStatisticsSave(e);case 4:if(n=t.sent,200!==n.status){t.next=7;break}return t.abrupt("return",{code:200,data:n.data.date||""});case 7:return t.abrupt("return",{code:n.status,data:n.data});case 10:return t.prev=10,t.t0=t["catch"](0),t.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(t.t0)});case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));function a(a){return t.apply(this,arguments)}return a}()}]),t}(),_={components:{mallGroup:o["a"]},data:function(){return{mallDataApiInstance:new m(this),page:1,total:0,pageSize:200,height:638,rowHeight:50,isLoading:!1,percentage:0,isShowProgress:!1,tableData:[],availableAmount:0,monthAmount:0,weekAmount:0,frozenAmount:0,frozenAmountOrders:0,multipleSelection:[],countries:this.$filters.countries_option,form:{groupId:0,agoNoneOrderDays:"0",site:0,shopSelect:"0",shopSelectVal:""},shopSelectList:[{value:"0",label:"店铺名称"},{value:"1",label:"店铺ID"},{value:"2",label:"店铺别名"}],serviceDataTime:"real_time",serviceDataTimeList:[{value:"yesterday",label:"昨天"},{value:"real_time",label:"今天"},{value:"past7days",label:"7天"},{value:"past30days",label:"30天"}],buttonStatus:{asyncData:!1}}},mounted:function(){this.getMallStatistics()},methods:{syncMallData:function(t){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",a.$message("暂无同步数据"));case 2:if(!a.buttonStatus.asyncData){e.next=5;break}return a.$message.error("操作过快, 数据正在同步中"),e.abrupt("return");case 5:return a.buttonStatus.asyncData=!0,a.isShowProgress=!0,a.percentage=0,e.next=10,Object(l["d"])(t,a.syncMall,3);case 10:e.sent,a.percentage=100,a.buttonStatus.asyncData=!1;case 13:case"end":return e.stop()}}),e)})))()},syncMall:function(t){var a=arguments,e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,s,o,l,u,c,i,d,p,m,_,h,f,b,v,g,w,y,D,C,S,k,x;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=a.length>1&&void 0!==a[1]?a[1]:{count:1},n.prev=1,e.$set(t,"status","开始同步..."),n.next=5,e.mallDataApiInstance.getProductStatisticalData(t,"/api/v3/product/get_product_statistical_data/");case 5:if(s=n.sent,403!==s.code){n.next=10;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.abrupt("return");case 10:return n.next=12,e.mallDataApiInstance.getShopProfile(t,"/api/marketing/v4/shop/profile/get/");case 12:if(o=n.sent,403!==o.code){n.next=19;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=18,e.mallDataApiInstance.uploadMallData(t);case 18:return n.abrupt("return");case 19:return n.next=21,e.mallDataApiInstance.getShopMetricsvalue(t,"/api/marketing/v4/shop/metrics_value/");case 21:if(l=n.sent,403!==l.code){n.next=28;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=27,e.mallDataApiInstance.uploadMallData(t);case 27:return n.abrupt("return");case 28:return u=new Date((new Date).toLocaleDateString()).getTime(),c=new Date((new Date).toLocaleDateString()).getTime()+864e5-1,i={mallId:t.platform_mall_id,start_time:Math.round(u/1e3),end_time:Math.round(c/1e3),period:"real_time",fetag:"fetag"},n.next=33,e.mallDataApiInstance.getKeyMetrics(t,"/api/mydata/v3/dashboard/key-metrics/",i,"today");case 33:if(d=n.sent,403!==d.code){n.next=40;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=39,e.mallDataApiInstance.uploadMallData(t);case 39:return n.abrupt("return");case 40:return p={mallId:t.platform_mall_id,start_time:Math.round((u-86400)/1e3),end_time:Math.round((c-86400)/1e3),period:"yesterday",fetag:"fetag"},n.next=43,e.mallDataApiInstance.getKeyMetrics(t,"/api/mydata/v3/dashboard/key-metrics/",p,"yesterday");case 43:if(m=n.sent,403!==m.code){n.next=50;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=49,e.mallDataApiInstance.uploadMallData(t);case 49:return n.abrupt("return");case 50:return _={mallId:t.platform_mall_id,start_time:Math.round((u-604800)/1e3),end_time:Math.round(c/1e3),period:"past7days",fetag:"fetag"},n.next=53,e.mallDataApiInstance.getKeyMetrics(t,"/api/mydata/v3/dashboard/key-metrics/",_,"past7days");case 53:if(h=n.sent,403!==h.code){n.next=60;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=59,e.mallDataApiInstance.uploadMallData(t);case 59:return n.abrupt("return");case 60:return f={mallId:t.platform_mall_id,start_time:Math.round((u-2592e3)/1e3),end_time:Math.round(c/1e3),period:"past30days",fetag:"fetag"},n.next=63,e.mallDataApiInstance.getKeyMetrics(t,"/api/mydata/v3/dashboard/key-metrics/",f,"past30days");case 63:if(b=n.sent,403!==b.code){n.next=70;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=69,e.mallDataApiInstance.uploadMallData(t);case 69:return n.abrupt("return");case 70:return v=e.getTimeStamp(e.serviceDataTime),g=v.startTime,w=v.endTime,y={mallId:t.platform_mall_id,start_time:g,end_time:w,period:e.serviceDataTime},n.next=74,e.mallDataApiInstance.getChatDashboard(t,"/api/mydata/v2/chat/dashboard/funnel/",y,e.serviceDataTime);case 74:if(D=n.sent,403!==D.code){n.next=81;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=80,e.mallDataApiInstance.uploadMallData(t);case 80:return n.abrupt("return");case 81:return n.next=83,e.mallDataApiInstance.getBankAccounts(t,"/api/v3/finance/get_bank_accounts/");case 83:if(C=n.sent,403!==C.code){n.next=90;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=89,e.mallDataApiInstance.uploadMallData(t);case 89:return n.abrupt("return");case 90:return n.next=92,e.mallDataApiInstance.getIncomeMeta(t,"/api/v3/finance/get_income_meta/");case 92:if(S=n.sent,403!==S.code){n.next=99;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=98,e.mallDataApiInstance.uploadMallData(t);case 98:return n.abrupt("return");case 99:return n.next=101,e.mallDataApiInstance.getFrozenAmountOrders(t,"/api/v3/finance/income_transaction_histories/");case 101:if(k=n.sent,403!==k.code){n.next=108;break}return e.$set(t,"status","店铺未登录"),e.$set(t,"color","red"),n.next=107,e.mallDataApiInstance.uploadMallData(t);case 107:return n.abrupt("return");case 108:return e.$set(t,"status","同步完成"),e.$set(t,"color","green"),n.next=112,e.mallDataApiInstance.uploadMallData(t);case 112:x=n.sent,200===x.code?(e.$set(t,"status","同步成功-上报成功"),e.$set(t,"color","green")):(e.$set(t,"status","同步成功-上报失败"),e.$set(t,"color","red")),n.next=120;break;case 116:n.prev=116,n.t0=n["catch"](1),e.$set(t,"status","同步失败"),e.$set(t,"color","red");case 120:return n.prev=120,--r.count,n.finish(120);case 123:case"end":return n.stop()}}),n,null,[[1,116,120,123]])})))()},getMallStatistics:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var e,n,r,s,o,l,u,c,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isLoading=!0,t.availableAmount=0,t.monthAmount=0,t.weekAmount=0,t.frozenAmount=0,t.frozenAmountOrders=0,e=t.form.shopSelectVal,n={country:t.form.site,groupId:t.form.groupId,mallName:"0"===t.form.shopSelect?e:"",mallId:"1"===t.form.shopSelect?e:"",mallAliasName:"2"===t.form.shopSelect?e:"",page:t.page,pageSize:t.pageSize},a.next=10,t.$api.getMallStatistics(n);case 10:if(r=a.sent,s=r.data,200!==s.code){a.next=43;break}if(o=s.data,t.total=o.total,t.tableData=o.data,!t.tableData){a.next=39;break}l=0;case 18:if(!(l<t.tableData.length)){a.next=39;break}return u=t.tableData[l],a.next=22,t.$appConfig.getGlobalCacheInfo("mallInfo",u.platform_mall_id);case 22:c=a.sent,i=JSON.parse(c),u.mall_datas=JSON.parse(u.mall_datas),u.available_amount=u.available_amount?parseInt(u.available_amount):0,u.lastmonth_amount=u.lastmonth_amount?parseInt(u.lastmonth_amount):0,u.lastweek_amount=u.lastweek_amount?parseInt(u.lastweek_amount):0,u.frozen_amount=u.frozen_amount?parseInt(u.frozen_amount):0,u.frozen_amount_orders=u.frozen_amount_orders?u.frozen_amount_orders:0,t.availableAmount+=u.available_amount,t.monthAmount+=u.lastmonth_amount,t.weekAmount+=u.lastweek_amount,t.frozenAmount+=u.frozen_amount,t.frozenAmountOrders+=u.frozen_amount_orders,u.group_name=i.GroupName;case 36:l++,a.next=18;break;case 39:t.isLoading=!1,t.$refs.plTable.reloadData(t.tableData),a.next=45;break;case 43:t.$message.error("".concat(s.message)),t.isLoading=!1;case 45:case"end":return a.stop()}}),a)})))()},handlerSelectTableOperating:function(t){this.multipleSelection.length?this[t](this.multipleSelection):this[t](this.tableData)},getTimeStamp:function(t){var a=new Date((new Date).toLocaleDateString()).getTime(),e=new Date((new Date).toLocaleDateString()).getTime()+864e5-1,n="",r="";switch(t){case"yesterday":return n=Math.round((a-86400)/1e3),r=Math.round((e-86400)/1e3),{startTime:n,endTime:r};case"real_time":return n=Math.round(a/1e3),r=Math.round(e/1e3),{startTime:n,endTime:r};case"past7days":return n=Math.round(e/1e3),r=Math.round((e-604800)/1e3),{startTime:n,endTime:r};case"past30days":return n=Math.round(e/1e3),r=Math.round((e-2592e3)/1e3),{startTime:n,endTime:r}}},exportSearch:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var e,n,r,s,o,u,c,i,d,p,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(0!==t.total){a.next=2;break}return a.abrupt("return",t.$message("暂无导出数据"));case 2:t.isLoading=!0,e=[],n=t.form.shopSelectVal,r={country:t.form.site,groupId:t.form.groupId,mallName:"0"===t.form.shopSelect?n:"",mallId:"1"===t.form.shopSelect?n:"",mallAliasName:"2"===t.form.shopSelect?n:"",page:1,pageSize:t.pageSize};case 6:if(!(e.length<t.total)){a.next=42;break}return a.prev=7,a.next=10,t.$api.getMallStatistics(r);case 10:if(s=a.sent,o=s.data,200!==o.code){a.next=32;break}if(u=o.data.data,!u){a.next=28;break}c=0;case 16:if(!(c<u.length)){a.next=28;break}return i=u[c],a.next=20,t.$appConfig.getGlobalCacheInfo("mallInfo",i.platform_mall_id);case 20:d=a.sent,p=JSON.parse(d),i.country=t.$filters.chineseSite(i.country),i.mall_datas=JSON.parse(i.mall_datas),i.group_name=p.GroupName;case 25:c++,a.next=16;break;case 28:u.forEach((function(t){e.push(t)})),r.page++,a.next=34;break;case 32:t.$message.error("".concat(o.message)),t.isLoading=!1;case 34:a.next=40;break;case 36:return a.prev=36,a.t0=a["catch"](7),t.isLoading=!1,a.abrupt("break",42);case 40:a.next=6;break;case 42:m="<tr>\n          <td>站点</td>\n          <td>店铺ID</td>\n          <td>店铺名称</td>\n          <td>店铺分组</td>\n          <td>最近创建订单时间</td>\n          <td>昨日订单数</td>\n          <td>近7天订单数</td>\n          <td>历史订单总数</td>\n          <td>店铺额度</td>\n          <td>全部产品数</td>\n          <td>上架产品数</td>\n          <td>售空产品数</td>\n          <td>禁卖产品数</td>\n          <td>未上架产品数</td>\n          <td>聊聊回复率</td>\n          <td>卖场评价</td>\n          <td>订单未完成率</td>\n          <td>关注量</td>\n          <td>粉丝量</td>\n          <td>商品浏览量</td>\n          <td>昨日商品浏览量</td>\n          <td>近7天商品浏览量</td>\n          <td>近30天商品浏览量</td>\n          <td>访客数</td>\n          <td>昨日访客数</td>\n          <td>近7日访客数</td>\n          <td>近30日访客数</td>\n          <td>客服不重复访客数</td>\n          <td>客服询问数</td>\n          <td>客服访客询问数</td>\n          <td>客服已回应数</td>\n          <td>客服无回应数</td>\n          <td>客服咨询买家数</td>\n          <td>客服咨询订单数</td>\n          <td>客服咨询件数</td>\n          <td>客服咨询销售额</td>\n          <td>客服平均回应时间</td>\n          <td>待拨款订单数</td>\n          <td>待拨款金额</td>\n          <td>本周已拨款</td>\n          <td>本月已拨款</td>\n          <td>全部已拨款</td>\n        </tr>",e.forEach((function(a){m+="<tr>\n        <td>".concat(a.country?t.$filters.chineseSite(a.country):"\t","</td>\n        <td>").concat(a.platform_mall_id?a.platform_mall_id:"\t","</td>\n        <td>").concat(a.mall_alias_name?a.mall_alias_name:a.platform_mall_name+"\t","</td>\n        <td>").concat(a.group_name?a.group_name:"\t","</td>\n        <td>").concat(a.recent_order_create_time?a.recent_order_create_time:"\t","</td>\n        <td>").concat(a.yesterday_order_num?a.yesterday_order_num:"\t","</td>\n        <td>").concat(a.week_order_num?a.week_order_num:"\t","</td>\n        <td>").concat(a.history_order_num?a.history_order_num:"\t","</td>\n        <td>").concat(a.mall_quota?a.mall_quota:"\t","</td>\n        <td>").concat(a.all_product_num?a.all_product_num:"\t","</td>\n        <td>").concat(a.active_product_num?a.active_product_num:"\t","</td>\n        <td>").concat(a.soldout_product_num?a.soldout_product_num:"\t","</td>\n        <td>").concat(a.banned_product_num?a.banned_product_num:"\t","</td>\n        <td>").concat(a.unlisted_product_num?a.unlisted_product_num:"\t","</td>\n        <td>").concat(a.chat_response_rate?a.chat_response_rate:"\t","</td>\n        <td>").concat(a.rating_star?a.rating_star:"\t","</td>\n        <td>").concat(a.order_non_fulfillment_rate?a.order_non_fulfillment_rate:"\t","</td>\n        <td>").concat(a.followers_number?a.followers_number:"\t","</td>\n        <td>").concat(a.fans_number?a.fans_number:"\t","</td>\n        <td>").concat(a.today_view_product_count?a.today_view_product_count:"\t","</td>\n        <td>").concat(a.yesterday_view_product_count?a.yesterday_view_product_count:"\t","</td>\n        <td>").concat(a.week_view_product_count?a.week_view_product_count:"\t","</td>\n        <td>").concat(a.month_view_product_count?a.month_view_product_count:"\t","</td>\n        <td>").concat(a.today_view_person_count?a.today_view_person_count:"\t","</td>\n        <td>").concat(a.yesterday_view_person_count?a.yesterday_view_person_count:"\t","</td>\n        <td>").concat(a.week_view_person_count?a.week_view_person_count:"\t","</td>\n        <td>").concat(a.month_view_person_count?a.month_view_person_count:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatShopUvData?a.mall_datas.ChatShopUvData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatsEnquiredData?a.mall_datas.ChatsEnquiredData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatVisitorsEnquiredData?a.mall_datas.ChatVisitorsEnquiredData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatRespondedChatsData?a.mall_datas.ChatRespondedChatsData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatNonRespondedChatsData?a.mall_datas.ChatNonRespondedChatsData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatBuyersData?a.mall_datas.ChatBuyersData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatOrdersData?a.mall_datas.ChatOrdersData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatUnitsData?a.mall_datas.ChatUnitsData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatSalesData?a.mall_datas.ChatSalesData:"\t","</td>\n        <td>").concat(a.mall_datas&&a.mall_datas.ChatResponseTimeData?a.mall_datas.ChatResponseTimeData:"\t","</td>\n        <td>").concat(a.frozen_amount_orders?a.frozen_amount_orders:"\t","</td>\n        <td>").concat(a.frozen_amount?a.frozen_amount:"\t","</td>\n        <td>").concat(a.lastweek_amount?a.lastweek_amount:"\t","</td>\n        <td>").concat(a.lastmonth_amount?a.lastmonth_amount:"\t","</td>\n        <td>").concat(a.available_amount?a.available_amount:"\t","</td>\n        </tr>")})),Object(l["k"])("店铺数据",m),t.isLoading=!1;case 46:case"end":return a.stop()}}),a,null,[[7,36]])})))()},getGroupId:function(t){this.form.groupId=t,this.page=1},handleSizeChange:function(t){this.pageSize=t,this.getMallStatistics()},handleCurrentChange:function(t){this.page=t,this.getMallStatistics()},handleSelectionChange:function(t){this.multipleSelection=t}}},h=_,f=(e("949c"),e("2877")),b=Object(f["a"])(h,n,r,!1,null,"84f112f8",null);a["default"]=b.exports},e64f:function(t,a,e){}}]);