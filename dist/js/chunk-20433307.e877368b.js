(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20433307"],{"1e7a":function(t,a,e){"use strict";e("ca918")},"7d65":function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"contaniner"},[e("el-row",{staticClass:"header"},[e("ul",{staticStyle:{"margin-bottom":"10px"}},[e("li",[e("span",[t._v("站点：")]),e("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(a){t.site=a},expression:"site"}},t._l(t.siteList,(function(t,a){return e("el-option",{key:a,attrs:{value:t.value,label:t.label}})})),1)],1),e("li",[e("span",[t._v("店铺分组：")]),e("el-select",{attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"medium",filterable:""},model:{value:t.group,callback:function(a){t.group=a},expression:"group"}},[t.selectall?e("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():e("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})}))],2)],1),e("li",[e("span",[t._v("店铺：")]),e("el-select",{attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"medium",filterable:""},model:{value:t.mall,callback:function(a){t.mall=a},expression:"mall"}},[t.selectall1?e("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():e("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})}))],2)],1),e("li",[e("span",[t._v("统计时间：")]),e("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(a){t.Statisticaltime=a},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1)],1),e("li",[e("span",[t._v("订单类型：")]),e("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Status,callback:function(a){t.Status=a},expression:"Status"}},t._l(t.returnStatusList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1)],1),e("li",[e("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)]),e("br"),e("div",{staticStyle:{border:"1px solid black",width:"100%"}},[e("span",{staticStyle:{"margin-left":"20px"}},[t._v("指标数据")]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData2,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[e("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"160",prop:"mallname",sortable:""}}),e("el-table-column",{attrs:{align:"center",prop:"place_gmv",label:"销售量",width:"260",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.place_gmv)}})]}}])}),e("el-table-column",{attrs:{align:"center",prop:"place_orders",label:"订单总数",width:"260",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.place_orders)}})]}}])}),e("el-table-column",{attrs:{prop:"shop_uv_to_placed_buyers_rate",label:"访客转换率",width:"260",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.shop_uv_to_placed_buyers_rate)}})]}}])}),e("el-table-column",{attrs:{prop:"place_sales_per_order",label:"各订单销售额",width:"260",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.place_sales_per_order)}})]}}])}),e("el-table-column",{attrs:{prop:"shop_uv",label:"访客",width:"245",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.shop_uv)}})]}}])}),e("el-table-column",{attrs:{prop:"shop_pv",label:"页面浏览量",width:"245",align:"center",sortable:""},scopedSlots:t._u([{key:"default",fn:function(a){var l=a.row;return[e("div",{domProps:{innerHTML:t._s(l.shop_uv)}})]}}])})],1)],1)])],1)},r=[],i=e("1da1"),s=(e("96cf"),e("99af"),e("159b"),e("a434"),e("b680"),{data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,allgroupid:[],allmallid:[],tableData2:[],errmall:[],Status:"palced",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:1634659200,end_time:1634695200,returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}],returnStatusList:[{value:"palced",label:"下单"},{value:"confirmed",label:"确认订单"},{value:"paid",label:"付费订单"}]}},watch:{group:function(t,a){this.mall=[];for(var e=0;e<t.length;e++)if(0===t[e])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[e])this.group=[],this.mall=[],this.selectall=!0;else for(var l=0;l<this.mallList.length;l++)t[e]===this.mallList[l].group_id&&this.mall.push(this.mallList[l].value)},mall:function(t,a){for(var e=0;e<t.length;e++)0===t[e]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[e]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,a){"real_time"===t?(this.start_time=1634659200,this.end_time=1634695200):"yesterday"===t||"past7days"===t?(this.start_time=1634054400,this.end_time=1634659200):"past30days"===t&&(this.start_time=1632067200,this.end_time=1634659200)},site:function(t,a){this.mall=[],this.group=[],this.getInfo()}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e,l,r,i,s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e={country:t.site,mallGroupIds:t.group},a.next=3,t.$api.ddMallGoodsGetMallList(e);case 3:if(l=a.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===l.data.code){for(l.data.data.forEach((function(a){a.group_id&&t.gruopList.push({label:a.group_name,value:a.group_id}),a.id&&t.mallList.push({label:a.mall_alias_name?a.mall_alias_name:a.platform_mall_name,value:a.platform_mall_id,group_id:a.group_id})})),r=0;r<t.gruopList.length-1;r++)for(i=r+1;i<t.gruopList.length;i++)t.gruopList[r].value===t.gruopList[i].value&&t.gruopList.splice(i,1);for(s=0;s<t.gruopList.length;s++)t.allgroupid.push(t.gruopList[s].value);for(n=0;n<t.mallList.length;n++)t.allmallid.push(t.mallList[n].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return a.stop()}}),a)})))()},getallinfo:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e,l,r,i,s,n,o,u,c,d,p,m,_,h;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.Loading1=!0,t.Loading3=!0,t.tableData2=[],t.errmall=[],e=0;case 5:if(!(e<t.mall.length)){a.next=18;break}return l={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,orderType:t.Status,mallId:t.mall[e],fetag:"fetag",limit:5},a.next=9,t.$shopeemanService.dashboard(t.site,l,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 9:for(r=a.sent,i=void 0,r&&(i=JSON.parse(r)),s=void 0,n=0;n<t.mallList.length;n++)t.mallList[n].value===t.mall[e]&&(s=t.mallList[n].label);if(200===i.status){if(i.data=JSON.parse(i.data),"real_time"===t.Statisticaltime)for(o in i.data.result)u="",i.data.result[o].chain_ratio>0?u="↑":i.data.result[o].chain_ratio<0&&(u="↓"),i.data.result[o]="shop_uv_to_placed_buyers_rate"===o?"<pre>".concat((100*i.data.result[o].value).toFixed(2),"%\nvs 00:00 - 13:00  ").concat(Math.abs(100*i.data.result[o].chain_ratio).toFixed(2),"%")+" ".concat(u,"</pre>"):"<pre>".concat(parseInt(i.data.result[o].value),"\nvs 00:00 - 13:00  ").concat(Math.abs(100*i.data.result[o].chain_ratio).toFixed(2),"%")+" ".concat(u,"</pre>");if("yesterday"===t.Statisticaltime)for(c in i.data.result)d="",i.data.result[c].chain_ratio>0?d="↑":i.data.result[c].chain_ratio<0&&(d="↓"),i.data.result[c]="shop_uv_to_placed_buyers_rate"===c?"<pre>".concat((100*i.data.result[c].value).toFixed(2),"%\nvs 前一天  ").concat(Math.abs(100*i.data.result[c].chain_ratio).toFixed(2),"%")+" ".concat(d,"</pre>"):"<pre>".concat(parseInt(i.data.result[c].value),"\nvs 前一天  ").concat(Math.abs(100*i.data.result[c].chain_ratio).toFixed(2),"%")+" ".concat(d,"</pre>");if("past7days"===t.Statisticaltime)for(p in i.data.result)m="",i.data.result[p].chain_ratio>0?m="↑":i.data.result[p].chain_ratio<0&&(m="↓"),i.data.result[p]="shop_uv_to_placed_buyers_rate"===p?"<pre>".concat((100*i.data.result[p].value).toFixed(2),"%\nvs 前7天  ").concat(Math.abs(100*i.data.result[p].chain_ratio).toFixed(2),"%")+" ".concat(m,"</pre>"):"<pre>".concat(parseInt(i.data.result[p].value),"\nvs 前7天  ").concat(Math.abs(100*i.data.result[p].chain_ratio).toFixed(2),"%")+" ".concat(m,"</pre>");if("past30days"===t.Statisticaltime)for(_ in i.data.result)h="",i.data.result[_].chain_ratio>0?h="↑":i.data.result[_].chain_ratio<0&&(h="↓"),i.data.result[_]="shop_uv_to_placed_buyers_rate"===_?"<pre>".concat((100*i.data.result[_].value).toFixed(2),"%\nvs 前30天  ").concat(Math.abs(100*i.data.result[_].chain_ratio).toFixed(2),"%")+" ".concat(h,"</pre>"):"<pre>".concat(parseInt(i.data.result[_].value),"\nvs 前30天  ").concat(Math.abs(100*i.data.result[_].chain_ratio).toFixed(2),"%")+" ".concat(h,"</pre>");i.data.result["mallname"]=s,t.tableData2.push(i.data.result)}else 403===i.status&&t.errmall.push(s);case 15:e++,a.next=5;break;case 18:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1;case 21:case"end":return a.stop()}}),a)})))()}}}),n=s,o=(e("1e7a"),e("2877")),u=Object(o["a"])(n,l,r,!1,null,"b9ffeffa",null);a["default"]=u.exports},ca918:function(t,a,e){}}]);