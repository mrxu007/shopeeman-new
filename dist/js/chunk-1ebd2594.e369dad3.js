(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ebd2594"],{"1c5f6":function(e,t,a){},"2aba":function(e,t,a){"use strict";a("1c5f6")},"3b9d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"suit-style"},[a("div",{staticClass:"header-btn"},[a("storeChoose",{attrs:{"is-all":!1},on:{changeMallList:e.changeMallList}}),a("div",{staticClass:"header-row"},[a("div",{staticClass:"item-box"},[a("span",[e._v("活动类型：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择店铺",clearable:"",size:"mini",filterable:""},model:{value:e.activeState,callback:function(t){e.activeState=t},expression:"activeState"}},[a("el-option",{attrs:{label:"全部",value:1}}),e._l(e.statuslist,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("el-button",{staticStyle:{"margin-left":"27px"},attrs:{type:"primary",disabled:e.loading,size:"mini"},on:{click:e.batchGetSuitData}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",disabled:e.loading,size:"mini"},on:{click:e.openCreateActive}},[e._v("创建套装促销活动")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.stopCreate}},[e._v("停止活动创建")]),a("el-button",{attrs:{type:"primary",disabled:e.loading,size:"mini"},on:{click:function(t){return e.batchStopSuit(e.multipleSelection)}}},[e._v("批量删除/结束勾选活动")]),a("el-button",{attrs:{type:"primary",disabled:e.loading,size:"mini"},on:{click:e.clearLog}},[e._v("清除日志")]),a("el-checkbox",{staticClass:"mar-left",model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")]),a("el-checkbox",{model:{value:e.showexpiredactivities,callback:function(t){e.showexpiredactivities=t},expression:"showexpiredactivities"}},[e._v("不显示过期活动")])],1)],1),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 110px)",data:e.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),a("el-table-column",{attrs:{align:"center",label:"序号",width:"60",type:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺",width:"180",prop:"mallName"}}),a("el-table-column",{attrs:{prop:"name",label:"套装促销名称",width:"160",align:"center"}}),a("el-table-column",{attrs:{prop:"usage_limit",label:"限购次数",width:"80",align:"center"}}),a("el-table-column",{attrs:{prop:"time_status",label:"活动规则",width:"280",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.changeRule(n)))])]}}])}),a("el-table-column",{attrs:{prop:"time_status",label:"活动状态",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",{style:{color:2==n.time_status?"orange":3==n.time_status?"#0ad10a":"#000"}},[e._v(" "+e._s(e.changeType(n.time_status)))])]}}])}),a("el-table-column",{attrs:{prop:"extinfo_images.item_total_count",label:"商品数量",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"time",label:"促销期间",width:"280",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e.$dayjs(1e3*a.start_time).format("YYYY/MM/DD HH:mm:ss")+" - "+e.$dayjs(1e3*a.end_time).format("YYYY/MM/DD HH:mm:ss"))+" ")]}}])}),a("el-table-column",{attrs:{prop:"shippingcount",label:"操作",align:"center",width:"370"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updateSuit(n)}}},[e._v("编辑商品")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.copyActive(n)}}},[e._v("复制活动")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.shareLink(n)}}},[e._v("分享链接")]),3===n.time_status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchStopSuit([n])}}},[e._v("结束")]):e._e(),2===n.time_status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchStopSuit([n])}}},[e._v("删除")]):e._e()]}}])})],1)],1),a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),e.creatactivity?a("el-dialog",{attrs:{title:"创建套装促销活动","close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.creatactivity,width:"450px"},on:{"update:visible":function(t){e.creatactivity=t},close:e.closeDialog}},[a("div",{staticClass:"create-style"},[a("div",{staticClass:"item-box"},[a("span",[e._v("套装名称：")]),a("el-input",{staticStyle:{width:"260px"},attrs:{clearable:"",size:"mini",placeholder:"24个字符以内",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.creatname,callback:function(t){e.creatname=t},expression:"creatname"}})],1),a("div",{staticClass:"item-box mar-top"},[a("span",[e._v("套装期间：")]),a("el-date-picker",{staticStyle:{width:"340px"},attrs:{format:"yyyy-MM-dd HH:mm:ss","unlink-panels":"",size:"mini",type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.creattime,callback:function(t){e.creattime=t},expression:"creattime"}})],1),a("div",{staticClass:"item-box mar-top"},[a("span",[e._v("套装类型：")]),a("el-radio-group",{model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[a("el-radio",{attrs:{label:2}},[e._v("折扣比率")]),a("el-radio",{attrs:{label:3}},[e._v("折扣金额")]),a("el-radio",{attrs:{label:1}},[e._v("套装特价")])],1)],1),2==e.radio?a("div",{staticClass:"diff-type mar-top"},[a("div",{staticClass:"diff-item"},[a("p",[e._v("购买")]),a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.creatnum,callback:function(t){e.creatnum=t},expression:"creatnum"}}),a("p",[e._v("个商品")]),a("el-input",{staticStyle:{width:"120px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/[^\\d]/g,'')"},on:{input:e.changeCreateDiscount},model:{value:e.creatdiscount,callback:function(t){e.creatdiscount=t},expression:"creatdiscount"}},[a("template",{staticStyle:{width:"30px"},slot:"append"},[e._v("%")])],2)],1),a("div",{staticClass:"diff-item",attrs:{"mar-top":""}},[e.creatdiscount?a("p",{staticClass:"activeColor mar-top"},[e._v("*折扣比率 = 总结算价 - "+e._s(e.creatdiscount)+"%")]):e._e(),e.isNull?a("p",{staticClass:"activeColor mar-top"},[e._v("此栏位最小值必须>=1且为整数")]):e._e()])]):e._e(),3==e.radio?a("div",{staticClass:"diff-type mar-top"},[a("div",{staticClass:"diff-item"},[a("p",[e._v("购买")]),a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.creatnum,callback:function(t){e.creatnum=t},expression:"creatnum"}}),a("p",[e._v("个商品")]),a("el-input",{staticStyle:{width:"120px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},on:{change:e.changeCreateDiscount},model:{value:e.creatdiscount,callback:function(t){e.creatdiscount=t},expression:"creatdiscount"}},[a("template",{staticStyle:{width:"30px"},slot:"append"},[e._v(e._s(e._f("siteCoin")(e.country)))])],2)],1),a("div",{staticClass:"diff-item mar-top"},[e.creatdiscount?a("p",{staticClass:"activeColor mar-top"},[e._v("*折扣金额 = 总结算价 - "+e._s(e._f("siteCoin")(e.country))+e._s(e.creatdiscount))]):e._e(),e.isNull?a("p",{staticClass:"activeColor mar-top"},[e._v("此栏位最小值必须>=1且为整数")]):e._e()])]):e._e(),1==e.radio?a("div",{staticClass:"diff-type mar-top"},[a("div",{staticClass:"diff-item"},[a("p",[e._v("购买")]),a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.creatnum,callback:function(t){e.creatnum=t},expression:"creatnum"}}),a("p",[e._v("个商品")]),a("el-input",{staticStyle:{width:"120px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},on:{change:e.changeCreateDiscount},model:{value:e.creatdiscount,callback:function(t){e.creatdiscount=t},expression:"creatdiscount"}},[a("template",{staticStyle:{width:"30px"},slot:"append"},[e._v(e._s(e._f("siteCoin")(e.country)))])],2)],1),a("div",{staticClass:"diff-item mar-top"},[e.creatdiscount?a("p",{staticClass:"activeColor mar-top"},[e._v("*套装特价"+e._s(e._f("siteCoin")(e.country))+e._s(e.creatdiscount))]):e._e(),e.isNull?a("p",{staticClass:"activeColor mar-top"},[e._v("此栏位最小值必须>=1且为整数")]):e._e()])]):e._e(),a("div",{staticClass:"item-box mar-top"},[a("span",[e._v("购买限制：")]),e._v(" 买家最多可以购买此套装优惠 "),a("el-input",{staticStyle:{width:"100px"},attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.creatcount,callback:function(t){e.creatcount=t},expression:"creatcount"}}),e._v(" 次 ")],1),a("div",{staticClass:"item-box mar-top"},[a("el-button",{staticStyle:{"margin-left":"130px"},attrs:{type:"primary",size:"mini"},on:{click:e.batchCreateSuit}},[e._v("保存")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.creatactivity=!1}}},[e._v("取消")])],1)])]):e._e(),e.updateSuitVisible?a("el-dialog",{attrs:{title:"编辑活动","close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.updateSuitVisible,width:"1200px"},on:{"update:visible":function(t){e.updateSuitVisible=t},close:e.closeDialog}},[a("div",{staticClass:"create-style"},[a("div",{staticClass:"header-btn"},[a("p",{staticClass:"activeColor"},[e._v("开启商品后，请勿更换物流商，否则买家无法购买套装优惠。")]),a("div",{staticClass:"header-row"},[a("div",{staticClass:"item-box"},[a("span",[e._v("商品ID：")]),a("el-input",{attrs:{size:"mini"},model:{value:e.goodsID,callback:function(t){e.goodsID=t},expression:"goodsID"}})],1),a("el-button",{staticClass:"mar-left",attrs:{size:"mini",type:"primary"},on:{click:e.searchSuitGoods}},[e._v("搜索")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.goodsItemSelectorVisible=!0}}},[e._v("添加商品")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.batchDeleteSuitGoods(e.goodsSelection)}}},[e._v("批量删除")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.batchCloseSuitGoods(e.goodsSelection,0)}}},[e._v("批量关闭")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.batchCloseSuitGoods(e.goodsSelection,1)}}},[e._v("批量开启")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],ref:"editTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"400",data:e.editGoodsList,"header-cell-style":{backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange1}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),a("el-table-column",{attrs:{align:"center",label:"序号",width:"60",type:"index"}}),a("el-table-column",{attrs:{align:"center",label:"商品ID",width:"120",prop:"itemid"}}),a("el-table-column",{attrs:{label:"商品图片",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticStyle:{width:"32px",height:"32px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:e._f("imageRender")([t.row.images[0]])}})],1),a("el-image",{staticStyle:{width:"32px",height:"32px"},attrs:{src:e._f("imageRender")([t.row.images[0],!0])}})],1)]}}],null,!1,3881087189)}),a("el-table-column",{attrs:{prop:"name",label:"标题",width:"140",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"price",label:"价格",width:"80",align:"center"}}),a("el-table-column",{attrs:{prop:"stock",label:"库存",width:"80",align:"center"}}),a("el-table-column",{attrs:{label:"运送渠道",width:"260",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;return[a("p",{domProps:{innerHTML:e._s(e.shipType)}})]}}],null,!1,1212326979)}),a("el-table-column",{attrs:{label:"开关",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1},on:{change:function(t){return e.batchCloseSuitGoods([n],n.status)}},model:{value:n.status,callback:function(t){e.$set(n,"status",t)},expression:"row.status"}})]}}],null,!1,1708127539)}),a("el-table-column",{attrs:{prop:"shippingcount",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchDeleteSuitGoods([n])}}},[e._v("删除")])]}}],null,!1,880246526)})],1)],1)]):e._e(),a("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?a("goodsItemSelector",{attrs:{mall:e.selectMallListEdit},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)},i=[],r=a("1da1"),s=(a("96cf"),a("a9e3"),a("99af"),a("7db0"),a("159b"),a("d3b7"),a("25f0"),a("ac1f"),a("1276"),a("c740"),a("a434"),a("caad"),a("2532"),a("a15b"),a("b0c0"),a("4de4"),a("feb6")),o=a("0e0b"),c=a("01cd"),l={components:{storeChoose:s["a"],goodsItemSelector:c["a"]},data:function(){return{isNull:!1,loading:!1,showlog:!1,showexpiredactivities:!0,creatactivity:!1,creatactivity1:!1,radio:2,creatnum:2,creatdiscount:1,creatcount:1,creatname:"",tableData:[],errmall:[],creattime:[],statuslist:[{label:"进行中",value:3},{label:"即将开始",value:2},{label:"已过期",value:4}],activeState:1,selectMallList:[],country:"",multipleSelection:[],updateSuitVisible:!1,editGoodsList:[],goodsSelection:[],goodsID:"",editLoading:!1,shipType:"",activeRow:{},selectMallListEdit:[],goodsItemSelectorVisible:!1,createType:"",editGoodsListCopy:[]}},mounted:function(){},methods:{closeDialog:function(){this.radio=2,this.creatnum=2,this.creatdiscount=1,this.creatcount=1,this.creatname="",this.createType="",this.editGoodsList=[],this.activeRow={}},openCreateActive:function(){this.creatactivity=!0;var e=(new Date).getTime()+18e5,t=e+36e5;this.creattime=[this.$dayjs(e).format("YYYY-MM-DD HH:mm:ss"),this.$dayjs(t).format("YYYY-MM-DD HH:mm:ss")]},copyActive:function(e){this.activeRow=e,this.creatactivity=!0;var t=(new Date).getTime()+18e5,a=t+36e5;this.creattime=[this.$dayjs(t).format("YYYY-MM-DD HH:mm:ss"),this.$dayjs(a).format("YYYY-MM-DD HH:mm:ss")],this.createType="single",this.radio=e.bundle_deal_rule.rule_type,this.creatnum=e.bundle_deal_rule.min_amount,this.creatcount=e.usage_limit,1===e.bundle_deal_rule.rule_type?this.creatdiscount=Number(e.bundle_deal_rule.fix_price):2===e.bundle_deal_rule.rule_type?this.creatdiscount=Number(e.bundle_deal_rule.discount_percentage):this.creatdiscount=Number(e.bundle_deal_rule.discount_value)},changeRule:function(e){var t="";return t=1===e.bundle_deal_rule.rule_type?"购买【".concat(e.bundle_deal_rule.min_amount,"】个商品【").concat(e.bundle_deal_rule.fix_price).concat(this.$filters.siteCoin(e.country),"】"):2===e.bundle_deal_rule.rule_type?"购买【".concat(e.bundle_deal_rule.min_amount,"】个商品优惠【").concat(e.bundle_deal_rule.discount_percentage,"%】"):"购买【".concat(e.bundle_deal_rule.min_amount,"】个商品优惠【").concat(e.bundle_deal_rule.discount_value).concat(this.$filters.siteCoin(e.country),"】"),t},shareLink:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$shopeemanService.getWebUrl(e.country);case 2:n=a.sent,i=n+"/bundle-deal/"+e.bundle_deal_id,t.copyItem(i);case 5:case"end":return a.stop()}}),a)})))()},copyItem:function(e){var t=document.createElement("div");t.id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t);try{var a=document.createRange();a.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(n){}t.parentElement.removeChild(t)},searchSuitGoods:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r,s,o,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.goodsID){t.next=5;break}a=e.editGoodsListCopy.find((function(t){return t.itemid==e.goodsID})),a&&(e.editGoodsList=[a]),t.next=24;break;case 5:return e.shipType="",e.editGoodsList=[],n={bundle_deal_id:e.activeRow.bundle_deal_id,need_all:0,country:e.activeRow.country,mallId:e.activeRow.mallId},t.next=10,e.$shopeemanService.getSuitShipType(e.activeRow.country,n);case 10:if(i=t.sent,200!==i.code){t.next=23;break}return i.data.shop_logistics_info.disabled&&i.data.shop_logistics_info.disabled.forEach((function(t){e.shipType=e.shipType+"<p>".concat(t.display_name,"</p>")})),i.data.shop_logistics_info.enabled&&i.data.shop_logistics_info.enabled.forEach((function(t){e.shipType=e.shipType+"<p>".concat(t.display_name,"</p>")})),r=i.data&&i.data.items||[],s=[],r.forEach((function(e){s.push(e.itemid.toString())})),o={query:"query Products($productIds: [String], $statusType: Int) {\n      products(productIds: $productIds, statusType: $statusType) \n    {\n      items {\n        itemid,\n    sold,\n    price,\n    promotions {\n      itemid,\n      promotionId,\n      startTime,\n      price,\n      endTime,\n      promotionType\n    },\n    logisticsChannels {\n      name,\n      enabled\n    },\n        name,\n        inputOriginPrice,\n        originPrice,\n        normalStock,\n        status,\n        stock,\n        pffTag,\n        normalSellerStock,\n        normalWmsStock,\n        images,\n        hasWholesale,\n        minPurchaseLimit,\n        modelList {\n          itemid,\n          modelid,\n          name,\n          inputOriginPrice,\n          originPrice,\n          normalStock,\n          stock,\n          pffTag,\n          normalSellerStock,\n          normalWmsStock,\n          isDefault\n        }\n      }\n    }\n  \n    }",variables:{productIds:s,statusType:0},mallId:e.activeRow.mallId},e.editLoading=!0,t.next=21,e.$shopeemanService.getSuitGoods(e.activeRow.country,o);case 21:c=t.sent,200===c.code?(e.editGoodsList=c.data,e.editGoodsListCopy=JSON.parse(JSON.stringify(c.data))):e.$message.error("获取商品详情失败");case 23:e.editLoading=!1;case 24:case"end":return t.stop()}}),t)})))()},changeGoodsItem:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.goodsItemSelectorVisible=!1,n=[],e.goodsList.forEach((function(e){e.status=0,e.images=e.images.split(",");var t={item_id:e.itemid,status:1};n.push(t)})),t.editGoodsList=e.goodsList,a.next=6,t.addGoods(n);case 6:case"end":return a.stop()}}),a)})))()},addGoods:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i,r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={bundle_deal_id:t.activeRow.bundle_deal_id,items:e,mallId:t.activeRow.mallId},t.editLoading=!0,a.next=4,t.$shopeemanService.mixSuitShipType(t.activeRow.country,n,"put");case 4:if(i=a.sent,t.editLoading=!1,200!==i.code){a.next=10;break}t.$alert("添加商品成功","提示",{confirmButtonText:"确定",callback:function(e){t.searchSuitGoods()}}),a.next=16;break;case 10:if(50003!==i.code){a.next=15;break}return r=i.data.failed_items||[],s="",r.forEach((function(e){for(var t in e)1400101524==e[t].err_code&&(s+="<p>商品【".concat(t,"】重复参加活动</p>\n"))})),a.abrupt("return",t.$alert(s,"提示",{dangerouslyUseHTMLString:!0,confirmButtonText:"确定"}));case 15:return a.abrupt("return",t.$alert("添加商品失败，".concat(i.data),"提示",{confirmButtonText:"确定"}));case 16:case"end":return a.stop()}}),a)})))()},searchProductDetail:function(e,t,a){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={product_id:e,version:"3.2.0",shop_id:t},a.next=3,n.$shopeemanService.searchProductDetail(n.activeRow.country,i);case 3:if(r=a.sent,200!==r.code){a.next=8;break}return a.abrupt("return",r.data.model_list);case 8:return a.abrupt("return",[]);case 9:case"end":return a.stop()}}),a)})))()},batchCloseSuitGoods:function(e,t){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,r,s,o,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.length){n.next=2;break}return n.abrupt("return",a.$message.warning("请选择商品"));case 2:for(i=[],r=0;r<e.length;r++)s={item_id:e[r].itemid,status:t},i.push(s);return o={bundle_deal_id:a.activeRow.bundle_deal_id,items:i,mallId:a.activeRow.mallId},n.next=7,a.$shopeemanService.mixSuitShipType(a.activeRow.country,o,"put");case 7:if(c=n.sent,200!==c.code){n.next=13;break}return e.forEach((function(e){var n=a.editGoodsList.findIndex((function(t){return t.itemid==e.itemid}));a.$set(a.editGoodsList[n],"status",t)})),n.abrupt("return",a.$message.success("".concat(0==t?"关闭":"开启","成功")));case 13:return n.abrupt("return",a.$message.error("".concat(0==t?"关闭":"开启","失败，").concat(c.data)));case 14:case"end":return n.stop()}}),n)})))()},batchDeleteSuitGoods:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i,r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.length){a.next=2;break}return a.abrupt("return",t.$message.warning("请选择商品"));case 2:for(n=[],i=0;i<e.length;i++)r={item_id:e[i].itemid},n.push(r);return s={bundle_deal_id:t.activeRow.bundle_deal_id,items:n,mallId:t.activeRow.mallId},a.next=7,t.$shopeemanService.mixSuitShipType(t.activeRow.country,s,"delete");case 7:if(o=a.sent,200!==o.code){a.next=12;break}e.forEach((function(e){var a=t.editGoodsList.findIndex((function(t){return t.itemid==e.itemid}));t.editGoodsList.splice(a,1)})),a.next=13;break;case 12:return a.abrupt("return",t.$message.error("删除失败，".concat(o.data.includes("bundle deal error bundle deal ended")?"商品已过期":o.data)));case 13:case"end":return a.stop()}}),a)})))()},updateSuit:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i,r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.activeRow=e,t.selectMallListEdit=[e.mallInfo],t.updateSuitVisible=!0,!e.extinfo.itemid_list||!e.extinfo.itemid_list.length){a.next=20;break}return n=e.extinfo.itemid_list.join(",").split(","),i={query:"query Products($productIds: [String], $statusType: Int) {\n      products(productIds: $productIds, statusType: $statusType) \n    {\n      items {\n        itemid,\n    sold,\n    price,\n    promotions {\n      itemid,\n      promotionId,\n      startTime,\n      price,\n      endTime,\n      promotionType\n    },\n    logisticsChannels {\n      name,\n      enabled\n    },\n        name,\n        inputOriginPrice,\n        originPrice,\n        normalStock,\n        status,\n        stock,\n        pffTag,\n        normalSellerStock,\n        normalWmsStock,\n        images,\n        hasWholesale,\n        minPurchaseLimit,\n        modelList {\n          itemid,\n          modelid,\n          name,\n          inputOriginPrice,\n          originPrice,\n          normalStock,\n          stock,\n          pffTag,\n          normalSellerStock,\n          normalWmsStock,\n          isDefault\n        }\n      }\n    }\n  \n    }",variables:{productIds:n,statusType:0},mallId:e.mallId},t.editLoading=!0,a.next=9,t.$shopeemanService.getSuitGoods(e.country,i);case 9:return r=a.sent,200===r.code?(t.editGoodsList=r.data,t.editGoodsListCopy=JSON.parse(JSON.stringify(r.data))):t.$message.error("获取商品详情失败"),s={bundle_deal_id:e.bundle_deal_id,country:e.country,mallId:e.mallId},a.next=14,t.$shopeemanService.getSuitShipType(e.country,s);case 14:o=a.sent,t.shipType="",200===o.code&&(o.data.shop_logistics_info.disabled&&o.data.shop_logistics_info.disabled.forEach((function(e){t.shipType=t.shipType+"<p>".concat(e.display_name,"</p>")})),o.data.shop_logistics_info.enabled&&o.data.shop_logistics_info.enabled.forEach((function(e){t.shipType=t.shipType+"<p>".concat(e.display_name,"</p>")}))),t.editLoading=!1,a.next=22;break;case 20:return a.next=22,t.searchSuitGoods();case 22:case"end":return a.stop()}}),a)})))()},changeType:function(e){switch(e){case 2:return"即将开始";case 3:return"进行中";case 4:return"已过期";default:return""}},batchStopSuit:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i,r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.length){a.next=2;break}return a.abrupt("return",t.$message.warning("请选择数据！"));case 2:n=0;case 3:if(!(n<e.length)){a.next=20;break}return i=e[n],r={mallId:i.mallId,bundle_deal_id:i.bundle_deal_id,action:2===i.time_status?"delete":"stop"},a.next=8,t.$shopeemanService.stopSuit(i.country,r);case 8:if(s=a.sent,200!==s.code){a.next=16;break}if(t.$refs.Logs.writeLog("店铺【".concat(i.mallName,"】").concat(2===i.time_status?"删除":"停止","活动【").concat(i.name,"】成功"),!0),n!==e.length-1){a.next=14;break}return a.next=14,t.batchGetSuitData();case 14:a.next=17;break;case 16:403===s.code?t.$refs.Logs.writeLog("店铺【".concat(i.mallName,"】").concat(2===i.time_status?"删除":"停止","活动【").concat(i.name,"】失败，店铺未登录"),!1):t.$refs.Logs.writeLog("店铺【".concat(i.mallName,"】").concat(2===i.time_status?"删除":"停止","活动【").concat(i.name,"】失败，").concat(s.data),!1);case 17:n++,a.next=3;break;case 20:case"end":return a.stop()}}),a)})))()},stopCreate:function(){Object(o["B"])(),this.$alert("正在停止操作，可能需要一些时间！","提示",{confirmButtonText:"确定"}),this.loading=!1},changeCreateDiscount:function(e){this.isNull=!e},changeMallList:function(e){this.selectMallList=e,this.country=e.country},batchGetSuitData:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectMallList.length){t.next=2;break}return t.abrupt("return",e.$message.warning("请选择店铺！"));case 2:return e.loading=!0,e.tableData=[],t.next=6,Object(o["d"])(e.selectMallList,e.getSuitData);case 6:e.loading=!1,e.$refs.Logs.writeLog("套装数据获取结束！",!0);case 8:case"end":return t.stop()}}),t)})))()},getSuitData:function(e){var t=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,r,s,o,c,l,u,d;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{count:5},r=e.mall_alias_name||e.platform_mall_name,s=e.platform_mall_id,o=40,n.prev=4,c={status:a.activeState,offset:0,limit:o,mallId:s},n.next=8,a.$shopeemanService.getSuitList(e.country,c);case 8:if(l=n.sent,200!==l.code){n.next=29;break}u=l.data.bundle_deal_list||[];case 11:if(!u.length){n.next=26;break}if(a.showexpiredactivities&&(u=u.filter((function(e){return 4!==e.time_status}))),u.forEach((function(t){t.mallName=r,t.mallId=s,t.country=e.country,t.mallInfo=e})),a.tableData=a.tableData.concat(u),!(u.length<o)){n.next=19;break}u=[],n.next=24;break;case 19:return c.offset+=o,n.next=22,a.$shopeemanService.getSuitList(e.country,c);case 22:d=n.sent,u=200===d.code?d.data.bundle_deal_list:[];case 24:n.next=11;break;case 26:a.$refs.Logs.writeLog("获取店铺【".concat(r,"】套装优惠数据完成"),!0),n.next=30;break;case 29:403===l.code?a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】获取套装优惠失败，店铺未登录"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】获取套装优惠失败，").concat(l.data),!1);case 30:n.next=34;break;case 32:n.prev=32,n.t0=n["catch"](4);case 34:return n.prev=34,--i.count,n.finish(34);case 37:case"end":return n.stop()}}),n,null,[[4,32,34,37]])})))()},clearLog:function(){this.$refs.Logs.consoleMsg=""},handleSelectionChange:function(e){this.multipleSelection=e},handleSelectionChange1:function(e){this.goodsSelection=e},batchCreateSuit:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.creatname&&e.creatnum&&e.creatdiscount){t.next=2;break}return t.abrupt("return",e.$message.warning("请完整填写的活动信息！"));case 2:if(!(e.creatname.length<3)){t.next=4;break}return t.abrupt("return",e.$message.warning("活动名称必须三个字以上！"));case 4:if(e.selectMallList.length){t.next=6;break}return t.abrupt("return",e.$message.warning("请选择店铺！"));case 6:if(e.loading=!0,e.creatactivity=!1,"single"!==e.createType){t.next=13;break}return t.next=11,e.savecreat(e.activeRow.mallInfo);case 11:t.next=15;break;case 13:return t.next=15,Object(o["d"])(e.selectMallList,e.savecreat);case 15:return e.loading=!1,e.closeDialog(),t.next=19,e.batchGetSuitData();case 19:case"end":return t.stop()}}),t)})))()},savecreat:function(e){var t=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var i,r,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{count:5},n.prev=1,r=e.platform_mall_id,s={mallId:r,name:a.creatname,rule_type:a.radio,min_amount:a.creatnum,start_time:Math.round(new Date(a.creattime[0]).getTime()/1e3),end_time:Math.round(new Date(a.creattime[1]).getTime()/1e3),usage_limit:a.creatcount,fix_price:0,discount_value:0,discount_percentage:0},1===a.radio?s.fix_price=a.creatdiscount:2===a.radio?s.discount_percentage=a.creatdiscount:s.discount_value=a.creatdiscount,n.next=7,a.$shopeemanService.createSuit(e.country,s);case 7:o=n.sent,200===o.code?a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】创建套装活动成功"),!0):403===o.code?a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】创建套装活动失败，店铺未登录"),!1):a.$refs.Logs.writeLog("店铺【".concat(e.mall_alias_name||e.platform_mall_name,"】创建套装活动失败，").concat(o.data),!1),n.next=13;break;case 11:n.prev=11,n.t0=n["catch"](1);case 13:return n.prev=13,--i.count,n.finish(13);case 16:case"end":return n.stop()}}),n,null,[[1,11,13,16]])})))()}}},u=l,d=(a("2aba"),a("2877")),m=Object(d["a"])(u,n,i,!1,null,"c4ceaff6",null);t["default"]=m.exports}}]);