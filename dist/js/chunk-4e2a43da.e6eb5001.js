(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e2a43da"],{"20d9":function(e,r,t){"use strict";t.r(r);var i=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-row",{staticClass:"contaniner"},[t("el-col",{staticClass:"left",attrs:{span:3}},[t("mallGroup",{attrs:{"get-data":e.getMallStatistics},on:{getGroupId:e.getGroupId}})],1),t("el-col",{staticClass:"right",attrs:{span:21}},[t("el-row",{staticClass:"header"},[t("el-col",{staticClass:"header-top"},[t("ul",[t("li",[t("span",[e._v("站点：")]),t("el-select",{staticClass:"unnormal",attrs:{size:"mini",filterable:""},model:{value:e.form.site,callback:function(r){e.$set(e.form,"site",r)},expression:"form.site"}},[t("el-option",{attrs:{label:"全部",value:0}}),e._l(e.countries,(function(e,r){return t("el-option",{key:r,attrs:{label:e.label,value:e.value}})}))],2)],1),t("li",[t("span",[e._v("店铺ID：")]),t("el-input",{staticClass:"shopId",attrs:{size:"mini",clearable:"",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.form.mallId,callback:function(r){e.$set(e.form,"mallId",r)},expression:"form.mallId"}})],1),t("li",[t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){e.page=1,e.getMallStatistics()}}},[e._v("查询")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return e.handlerSelectTableOperating("syncMallData")}}},[e._v("同步店铺指标数据")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return e.exportSearch()}}},[e._v("导出数据")])],1),t("li",[t("el-progress",{directives:[{name:"show",rawName:"v-show",value:e.isShowProgress,expression:"isShowProgress"}],staticStyle:{width:"230px"},attrs:{"text-inside":!0,"stroke-width":24,percentage:e.percentage,status:"success"}})],1)])]),t("el-col",{staticClass:"header-top"},[t("ul")])],1),t("el-row",{staticClass:"article"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],ref:"plTable",attrs:{height:"calc(100vh - 165px)","data-changes-scroll-top":!1,border:!1,data:e.tableData},on:{"table-body-scroll":e.tableScroll,"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),t("el-table-column",{attrs:{align:"center",type:"index",label:"序列号",width:"80"}}),t("el-table-column",{attrs:{align:"center",prop:"country",label:"站点"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(e._f("chineseSite")(t.country))+" ")]}}])}),t("el-table-column",{attrs:{align:"center",prop:"platform_mall_id",label:"店铺ID","min-width":"120"}}),t("el-table-column",{attrs:{align:"center",label:"店铺名称","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.mall_alias_name?t.mall_alias_name:t.platform_mall_name)+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"操作状态","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var i=r.row;return[t("span",{style:i.color&&"color:"+i.color},[e._v(e._s(i.status))])]}}])}),t("el-table-column",{attrs:{align:"center",label:"本季度计分","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.SumPoints?t.order_service_indicators.SumPoints:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"买家满意度","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.BuyerSatisfaction?t.order_service_indicators.BuyerSatisfaction:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"上期买家满意度","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekBuyerSatisfaction?t.order_service_indicators.WeekBuyerSatisfaction:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"买家满意度计分","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.BuyerSatisfactionPoint?t.order_service_indicators.BuyerSatisfactionPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"订单完成率"}},[t("el-table-column",{attrs:{align:"center",label:"未完成率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.UnOrderRate?t.order_service_indicators.UnOrderRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"取消率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.CancellOrderRate?t.order_service_indicators.CancellOrderRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"退货/退款率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ReturnOrRefundRate?t.order_service_indicators.ReturnOrRefundRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"逾期出货率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.OverTimeDeliveryRate?t.order_service_indicators.OverTimeDeliveryRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"准备时间"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PrepareTime?t.order_service_indicators.PrepareTime:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"上期订单完成率"}},[t("el-table-column",{attrs:{align:"center",label:"未完成率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekUnOrderRate?t.order_service_indicators.WeekUnOrderRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"取消率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekCancellOrderRate?t.order_service_indicators.WeekCancellOrderRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"退货/退款率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekReturnOrRefundRate?t.order_service_indicators.WeekReturnOrRefundRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"逾期出货率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekOverTimeDeliveryRate?t.order_service_indicators.WeekOverTimeDeliveryRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"准备时间"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekPrepareTime?t.order_service_indicators.WeekPrepareTime:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"订单未完成率计分"}},[t("el-table-column",{attrs:{align:"center",label:"未完成率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.UnOrderRatePoint?t.order_service_indicators.UnOrderRatePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"取消率"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.CancellOrderRatePoint?t.order_service_indicators.CancellOrderRatePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"退货/退款率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ReturnOrRefundRatePoint?t.order_service_indicators.ReturnOrRefundRatePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"逾期出货率","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.OverTimeDeliveryRatePoint?t.order_service_indicators.OverTimeDeliveryRatePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"准备时间"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PrepareTimePoint?t.order_service_indicators.PrepareTimePoint:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"违反上架规范"}},[t("el-table-column",{attrs:{align:"center",label:"严重违规商品","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ViolatingGoods?t.order_service_indicators.ViolatingGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"垃圾商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.JunkGoods?t.order_service_indicators.JunkGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"仿冒品或侵犯知识产权商品","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.CounterfeitGoods?t.order_service_indicators.CounterfeitGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违禁商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ProhibitedGoods?t.order_service_indicators.ProhibitedGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的%","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PreOrderedGoodsRate?t.order_service_indicators.PreOrderedGoodsRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的天数%超过目标","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PreOrderedOverTarget?t.order_service_indicators.PreOrderedOverTarget:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违反其他上架规范","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.OtherViolatingGoods?t.order_service_indicators.OtherViolatingGoods:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"上期违反上架规范"}},[t("el-table-column",{attrs:{align:"center",label:"严重违规商品","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekViolatingGoods?t.order_service_indicators.WeekViolatingGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"垃圾商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekJunkGoods?t.order_service_indicators.WeekJunkGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"仿冒品或侵犯知识产权商品","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekCounterfeitGoods?t.order_service_indicators.WeekCounterfeitGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违禁商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekProhibitedGoods?t.order_service_indicators.WeekProhibitedGoods:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的%","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekPreOrderedGoodsRate?t.order_service_indicators.WeekPreOrderedGoodsRate:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的天数%超过目标","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekPreOrderedOverTarget?t.order_service_indicators.WeekPreOrderedOverTarget:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违反其他上架规范","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekOtherViolatingGoods?t.order_service_indicators.WeekOtherViolatingGoods:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"违反上架规范计分"}},[t("el-table-column",{attrs:{align:"center",label:"严重违规商品","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ViolatingGoodsPoint?t.order_service_indicators.ViolatingGoodsPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"垃圾商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.JunkGoodsPoint?t.order_service_indicators.JunkGoodsPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"仿冒品或侵犯知识产权商品","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.CounterfeitGoodsPoint?t.order_service_indicators.CounterfeitGoodsPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违禁商品"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ProhibitedGoodsPoint?t.order_service_indicators.ProhibitedGoodsPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的%","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PreOrderedGoodsRatePoint?t.order_service_indicators.PreOrderedGoodsRatePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"预购商品的天数%超过目标","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.PreOrderedOverTargetPoint?t.order_service_indicators.PreOrderedOverTargetPoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"违反其他上架规范","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.OtherViolatingGoodsPoint?t.order_service_indicators.OtherViolatingGoodsPoint:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"客服"}},[t("el-table-column",{attrs:{align:"center",label:"聊天回应"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ChatResponse?t.order_service_indicators.ChatResponse:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"回应速度"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ResponseSpeed?t.order_service_indicators.ResponseSpeed:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"上期客服"}},[t("el-table-column",{attrs:{align:"center",label:"聊天回应"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekChatResponse?t.order_service_indicators.WeekChatResponse:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"回应速度"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.WeekResponseSpeed?t.order_service_indicators.WeekResponseSpeed:"-")+" ")]}}])})],1),t("el-table-column",{attrs:{align:"center",label:"客服计分"}},[t("el-table-column",{attrs:{align:"center",label:"聊天回应"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ChatResponsePoint?t.order_service_indicators.ChatResponsePoint:"-")+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"回应速度"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.row;return[e._v(" "+e._s(t.order_service_indicators&&t.order_service_indicators.ResponseSpeedPoint?t.order_service_indicators.ResponseSpeedPoint:"-")+" ")]}}])})],1)],1),t("div",{staticClass:"pagination"},[t("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[700,1e3,1500,2e3],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},o=[],n=t("1da1"),a=(t("d3b7"),t("3ca3"),t("ddb0"),t("d81d"),t("159b"),t("99af"),t("96cf"),t("4dc0")),s=t("0e0b"),d=t("d4ec"),c=t("bee2"),l=function(){function e(r){Object(d["a"])(this,e),this._this=r}return Object(c["a"])(e,[{key:"theQuarterPoint",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r,t){var i,o,n,a,s,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i=r.platform_mall_id,o=r.country,n={mallId:i},e.next=5,this._this.$shopeemanService.getChinese(o,t,n);case 5:if(a=e.sent,a=JSON.parse(a),200!==a.status){e.next=9;break}return e.abrupt("return",{code:200,data:{totalPoints:(null===(s=JSON.parse(a.data))||void 0===s||null===(d=s.data)||void 0===d?void 0:d.totalPoints)||0}});case 9:return e.abrupt("return",{code:a.status,data:a.statusText});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function r(r,t){return e.apply(this,arguments)}return r}()},{key:"getShopPerformance",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r,t){var i,o,n,a,s,d,c,l,_,u,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i=r.platform_mall_id,o=r.country,n=r.platform_mall_name,a={mallId:i},e.next=5,this._this.$shopeemanService.getChinese(o,t,a);case 5:if(s=e.sent,s=JSON.parse(s),200!==s.status){e.next=45;break}return d=JSON.parse(s.data).data,c=d.listingViolations,l=d.fulFillMent,_=d.customerService,u=d.customerSatisfaction,v={},v["buyer_satisfaction"]=null===u[0].my?null:u[0].my,v["non_performance_rate"]=null===l[0].my?null:l[0].my/1e4,v["cancel_rate"]=null===l[0].children[0].my?null:l[0].children[0].my/1e4,v["return_rate"]=l[0].children[1].my,v["delay_rate"]=null===l[1].my?null:l[1].my/1e4,v["ready_time"]=l[2].my,v["serious_listing_violations"]=c[0].my,v["email_num"]=c[0].children[0].my,v["knowledge_Protect"]=c[0].children[1].my,v["lawless_goods"]=c[0].children[2].my,v["pre_order_list"]=c[1].children[0].my,v["violation_days"]=c[1].children[0].my,v["other_error"]=c[2].my,v["response_speed"]=_[0].my,v["response_time"]=_[1].my,v["buyer_satisfaction_last"]=u[0].lastPeriod,v["non_performance_rate_last"]=null===l[0].lastPeriod?null:l[0].lastPeriod/1e4,v["cancel_rate_last"]=null===l[0].children[0].lastPeriod?null:l[0].children[0].lastPeriod/1e4,v["return_rate_last"]=null===l[0].children[1].lastPeriod?null:l[0].children[1].lastPeriod/1e4,v["delay_rate_last"]=null===l[1].lastPeriod?null:l[1].lastPeriod/1e4,v["ready_time_last"]=l[2].lastPeriod,v["serious_listing_violations_last"]=c[0].lastPeriod,v["email_num_last"]=c[0].children[0].lastPeriod,v["knowledge_Protect_last"]=c[0].children[1].lastPeriod,v["lawless_goods_last"]=c[0].children[2].lastPeriod,v["pre_order_list_last"]=c[1].children[0].lastPeriod,v["violation_days_last"]=c[1].children[0].lastPeriod,v["other_error_last"]=c[2].lastPeriod,v["response_speed_last"]=_[0].lastPeriod,v["response_time_last"]=_[1].lastPeriod,v["MallName"]=n,v["MallId"]=i,v["SiteStr"]=o,v["Site"]=o,e.abrupt("return",{code:200,data:v});case 45:return e.abrupt("return",{code:s.status,data:s.statusText});case 48:return e.prev=48,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"theQuarterPoint-catch: ".concat(e.t0)});case 51:case"end":return e.stop()}}),e,this,[[0,48]])})));function r(r,t){return e.apply(this,arguments)}return r}()}]),e}(),_={components:{mallGroup:a["a"]},data:function(){return{page:1,total:0,pageSize:700,isLoading:!1,tableData:[],multipleSelection:[],percentage:0,isShowProgress:!1,countries:this.$filters.countries_option,mallTargetApiInstance:new l(this),form:{site:0,orderIndex:"0",buyerIndex:"0",serviceIndex:"0",rating:"0",violationPutIndex:"0",mallId:""},formIndexList:[{value:"0",label:"全部"},{value:"1",label:"正常"},{value:"2",label:"异常"}],ratingList:[{value:"0",label:"全部"},{value:"1",label:"佳"},{value:"2",label:"差"},{value:"3",label:"危险"}],addPercentage:0}},mounted:function(){this.getMallStatistics()},methods:{syncMallData:function(e){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return",r.$message("暂无同步数据"));case 2:return r.isShowProgress=!0,r.percentage=0,i=e.length,r.addPercentage=100/i,t.next=8,Object(s["c"])(e,r.syncMall);case 8:t.sent,r.percentage=100;case 10:case"end":return t.stop()}}),t)})))()},syncMall:function(e){var r=arguments,t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var o,n,a,s,d,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return o=r.length>1&&void 0!==r[1]?r[1]:{count:1},i.prev=1,t.$set(e,"status","开始同步"),t.$set(e,"color",""),n=t.mallTargetApiInstance.theQuarterPoint(e,"/api/v2/shops/sellerCenter/ongoingPoints"),a=t.mallTargetApiInstance.getShopPerformance(e,"/api/v2/shops/sellerCenter/shopPerformance"),i.next=8,Promise.all([n,a]);case 8:if(s=i.sent,d={mallDatas:"",sysMallId:e.id},200!==s[0].code||200!==s[1].code){i.next=19;break}return d["violationScore"]=s[0].data.totalPoints,d["orderServiceIndicators"]=s[1].data,i.next=15,t.$api.mallStatisticsSave(d);case 15:c=i.sent,200===c.data.code?t.$set(e,"status","同步成功"):(t.$set(e,"color","#F56C6C"),t.$set(e,"status","同步失败:上报失败")),i.next=21;break;case 19:t.$set(e,"color","#F56C6C"),t.$set(e,"status","同步失败");case 21:i.next=27;break;case 23:i.prev=23,i.t0=i["catch"](1),t.$set(e,"color","#F56C6C"),t.$set(e,"status","同步失败");case 27:return i.prev=27,--o.count,t.percentage+=t.addPercentage,i.finish(27);case 31:case"end":return i.stop()}}),i,null,[[1,23,27,31]])})))()},getMallStatistics:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,i,o,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.isLoading=!0,t={country:e.form.site,mallId:e.form.mallId,groupId:e.form.groupId,page:e.page,pageSize:e.pageSize},r.next=4,e.$api.getMallStatistics(t);case 4:i=r.sent,o=i.data,200===o.code?(n=o.data,e.total=n.total,e.tableData=n.data,e.tableData&&e.tableData.map((function(e){e.order_service_indicators=e.order_service_indicators?JSON.parse(e.order_service_indicators):""})),e.isLoading=!1):(e.$message.error("".concat(o.message)),e.isLoading=!1);case 7:case"end":return r.stop()}}),r)})))()},handlerSelectTableOperating:function(e){this.multipleSelection.length?this[e](this.multipleSelection):this[e](this.tableData)},exportSearch:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,i,o,n,a,d,c,l,_,u,v;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.isLoading=!0,t=[],i=e.total%700===0?e.total/700:Math.floor(e.total/700)+1,o=1;case 4:if(!(o<=i)){r.next=20;break}return n={country:e.form.site,mallId:e.form.mallId,groupId:e.form.groupId,page:o},r.prev=6,r.next=9,e.$api.getMallStatistics(n);case 9:if(a=r.sent,d=a.data,200===d.code){if(c=d.data.data,c)for(l=0;l<c.length;l++)_=c[l],_.order_service_indicators=_.order_service_indicators?JSON.parse(_.order_service_indicators):"";c.forEach((function(e){t.push(e)}))}else e.$message.error("".concat(d.message)),e.isLoading=!1;r.next=17;break;case 14:r.prev=14,r.t0=r["catch"](6),e.isLoading=!1;case 17:o++,r.next=4;break;case 20:if(u=t,null!==u&&void 0!==u&&u.length){r.next=25;break}return e.isLoading=!1,e.$message("暂无导出数据"),r.abrupt("return");case 25:v="<tr>\n          <td>站点</td>\n          <td>店铺ID</td>\n          <td>店铺名称</td>\n          <td>本季度计分</td>\n          <td>买家满意度</td>\n          <td>上家买家满意度</td>\n          <td>买家满意度计分</td>\n          <td>订单未完成率</td>\n          <td>订单取消率</td>\n          <td>订单退货/退款率</td>\n          <td>订单逾期出货率</td>\n          <td>订单准备时间</td>\n          <td>上期订单未完成率</td>\n          <td>上期订单取消率</td>\n          <td>上期订单退货/退款率</td>\n          <td>上期订单逾期出货率</td>\n          <td>上期订单准备时间</td>\n          <td>订单未完成率计分</td>\n          <td>订单取消率计分</td>\n          <td>订单退货/退款率计分</td>\n          <td>订单逾期出货率计分</td>\n          <td>订单准备时间计分</td>\n          <td>严重违规商品</td>\n          <td>垃圾商品</td>\n          <td>仿冒品或侵犯知识产权商品</td>\n          <td>违禁商品</td>\n          <td>预购商品的%</td>\n          <td>预购商品的天数%超过目标</td>\n          <td>违反其他上架规范</td>\n          <td>上期严重违规商品</td>\n          <td>上期垃圾商品</td>\n          <td>上期仿冒品或侵犯知识产权商品</td>\n          <td>上期违禁商品</td>\n          <td>上期预购商品的%</td>\n          <td>上期预购商品的天数%超过目标</td>\n          <td>上期违反其他上架规范</td>\n          <td>严重违规商品计分</td>\n          <td>垃圾商品计分</td>\n          <td>仿冒品或侵犯知识产权商品计分</td>\n          <td>违禁商品计分</td>\n          <td>预购商品的%计分</td>\n          <td>预购商品的天数%超过目标计分</td>\n          <td>违反其他上架规范计分</td>\n          <td>客服聊天回应</td>\n          <td>客服回应速度</td>\n          <td>上期客服聊天回应</td>\n          <td>上期客服回应速度</td>\n          <td>客服聊天回应计分</td>\n          <td>客服回应速度计分</td>\n        </tr>",u.forEach((function(r){v+="<tr>\n        <td>".concat(r.country?e.$filters.chineseSite(r.country):"\t","</td>\n        <td>").concat(r.platform_mall_id?r.platform_mall_id:"\t","</td>\n        <td>").concat(r.mall_alias_name?r.mall_alias_name:r.platform_mall_name+"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.SumPoints?r.order_service_indicators.SumPoints:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.BuyerSatisfaction?r.order_service_indicators.BuyerSatisfaction:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekBuyerSatisfaction?r.order_service_indicators.WeekBuyerSatisfaction:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.BuyerSatisfactionPoint?r.order_service_indicators.BuyerSatisfactionPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.UnOrderRate?r.order_service_indicators.UnOrderRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.CancellOrderRate?r.order_service_indicators.CancellOrderRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ReturnOrRefundRate?r.order_service_indicators.ReturnOrRefundRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.OverTimeDeliveryRate?r.order_service_indicators.OverTimeDeliveryRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PrepareTime?r.order_service_indicators.PrepareTime:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekUnOrderRate?r.order_service_indicators.WeekUnOrderRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekCancellOrderRate?r.order_service_indicators.WeekCancellOrderRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekReturnOrRefundRate?r.order_service_indicators.WeekReturnOrRefundRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekOverTimeDeliveryRate?r.order_service_indicators.WeekOverTimeDeliveryRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekPrepareTime?r.order_service_indicators.WeekPrepareTime:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.UnOrderRatePoint?r.order_service_indicators.UnOrderRatePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.CancellOrderRatePoint?r.order_service_indicators.CancellOrderRatePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ReturnOrRefundRatePoint?r.order_service_indicators.ReturnOrRefundRatePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.OverTimeDeliveryRatePoint?r.order_service_indicators.OverTimeDeliveryRatePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PrepareTimePoint?r.order_service_indicators.PrepareTimePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ViolatingGoods?r.order_service_indicators.ViolatingGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.JunkGoods?r.order_service_indicators.JunkGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.CounterfeitGoods?r.order_service_indicators.CounterfeitGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ProhibitedGoods?r.order_service_indicators.ProhibitedGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PreOrderedGoodsRate?r.order_service_indicators.PreOrderedGoodsRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PreOrderedOverTarget?r.order_service_indicators.PreOrderedOverTarget:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.OtherViolatingGoods?r.order_service_indicators.OtherViolatingGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekViolatingGoods?r.order_service_indicators.WeekViolatingGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekJunkGoods?r.order_service_indicators.WeekJunkGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekCounterfeitGoods?r.order_service_indicators.WeekCounterfeitGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekProhibitedGoods?r.order_service_indicators.WeekProhibitedGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekPreOrderedGoodsRate?r.order_service_indicators.WeekPreOrderedGoodsRate:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekPreOrderedOverTarget?r.order_service_indicators.WeekPreOrderedOverTarget:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekOtherViolatingGoods?r.order_service_indicators.WeekOtherViolatingGoods:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ViolatingGoodsPoint?r.order_service_indicators.ViolatingGoodsPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.JunkGoodsPoint?r.order_service_indicators.JunkGoodsPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.CounterfeitGoodsPoint?r.order_service_indicators.CounterfeitGoodsPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ProhibitedGoodsPoint?r.order_service_indicators.ProhibitedGoodsPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PreOrderedGoodsRatePoint?r.order_service_indicators.PreOrderedGoodsRatePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.PreOrderedOverTargetPoint?r.order_service_indicators.PreOrderedOverTargetPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.OtherViolatingGoodsPoint?r.order_service_indicators.OtherViolatingGoodsPoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ChatResponse?r.order_service_indicators.ChatResponse:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ResponseSpeed?r.order_service_indicators.ResponseSpeed:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekChatResponse?r.order_service_indicators.WeekChatResponse:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.WeekResponseSpeed?r.order_service_indicators.WeekResponseSpeed:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ChatResponsePoint?r.order_service_indicators.ChatResponsePoint:"\t","</td>\n        <td>").concat(r.order_service_indicators&&r.order_service_indicators.ResponseSpeedPoint?r.order_service_indicators.ResponseSpeedPoint:"\t","</td>\n        </tr>")})),Object(s["g"])("店铺指标",v),e.isLoading=!1;case 29:case"end":return r.stop()}}),r,null,[[6,14]])})))()},getGroupId:function(e){this.form.groupId=e},tableScroll:function(){},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.getMallStatistics()},handleCurrentChange:function(e){this.page=e,this.getMallStatistics()},handleSelectionChange:function(e){this.multipleSelection=e}}},u=_,v=(t("5477"),t("2877")),f=Object(v["a"])(u,i,o,!1,null,"ce3ff4e6",null);r["default"]=f.exports},"36c1":function(e,r,t){},"4dc0":function(e,r,t){"use strict";var i=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("el-table",{ref:"shopGroupTable",attrs:{"highlight-current-row":"",width:"100",height:"calc(100vh - 30px)","data-changes-scroll-top":!1,"row-height":40,border:!1,data:e.shopGruopData,"row-class-name":e.tableRowClassName},on:{"row-click":e.rowClick}},[t("el-table-column",{attrs:{align:"center",prop:"group_name",label:"店铺分组"}})],1)],1)},o=[],n=t("1da1"),a=(t("96cf"),{props:{getData:{type:Function,default:null}},data:function(){return{shopGruopData:[]}},mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.getBindMallCount();case 2:case"end":return r.stop()}}),r)})))()},methods:{tableRowClassName:function(e){e.row;var r=e.rowIndex;if(0===r)return"default-current-row"},rowClick:function(e){this.$emit("getGroupId",e.id),0!==e.id&&(document.querySelector(".default-current-row").style.color="#60627d",document.querySelector(".default-current-row").style.backgroundColor="#fff"),this.getData()},getBindMallCount:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$api.getBindMallCount();case 2:t=r.sent,i=t.data,200===i.code?(e.shopGruopData=i.data,e.shopGruopData.unshift({id:0,group_name:"全部分组"}),e.shopGruopData.push({id:-1,group_name:"无分组"})):e.$message.error("店铺分组数据错误".concat(i.message));case 5:case"end":return r.stop()}}),r)})))()}}}),s=a,d=(t("cbc80"),t("2877")),c=Object(d["a"])(s,i,o,!1,null,"4599139a",null);r["a"]=c.exports},5477:function(e,r,t){"use strict";t("c21b")},c21b:function(e,r,t){},cbc80:function(e,r,t){"use strict";t("36c1")}}]);