(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54bb1459"],{3961:function(e,t,a){},"483f":function(e,t,a){"use strict";a("3961")},"5ef4":function(e,t,a){"use strict";a("8856")},8856:function(e,t,a){},f077:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"detail"},[a("div",{staticClass:"conditon",staticStyle:{"background-color":"white",padding:"8px 4px"}},[a("div",{staticClass:"row"},[a("GoodsChoose",{on:{getmall:e.getmall,changeMall:e.changeMall}}),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary",loading:e.searchLoading},on:{click:e.search}},[e._v("搜 索")])],1),a("div",{staticClass:"row"},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-left":"19px","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.addtypeName,callback:function(t){e.addtypeName=t},expression:"addtypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addCatorgry}},[e._v("添加")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCategory("2",null)}}},[e._v("批量删除")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("start")}}},[e._v("批量开启知名度")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("close")}}},[e._v("批量关闭知名度")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.closelogData}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1)]),a("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"tableDetail"},[a("el-table",{attrs:{height:"calc(100vh - 70px)",data:e.tableList_master,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{type:"index",label:"序号",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"name",label:"分类名称",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"id",label:"分类名称ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"type",label:"属性",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",[e._v(e._s("customized"===n.type?"自定义":"on_sale"===n.type?"Shopee|促销中":"Shopee|新上架"))])]}}])}),a("el-table-column",{attrs:{prop:"product_count",label:"商品数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"status",label:"知名度",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66",disabled:0===t.row.product_count},on:{change:function(a){return e.changeShow(t.row,t.$index)}},model:{value:t.row.isShow,callback:function(a){e.$set(t.row,"isShow",a)},expression:"scope.row.isShow"}})],1)]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{display:"flex"}},[t.row.product_count>0?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.checkDetail(t.row,t.$index),e.selDate=t.row}}},[e._v("查看详情")]):e._e(),0===t.row.product_count?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.goodsItemSelectorVisible=!0,e.selDate=t.row}}},[e._v("添加商品")]):e._e(),"customized"==t.row.type?a("el-button",{attrs:{size:"mini",type:"primary"},nativeOn:{click:function(a){return e.delCategory("1",t.row)}}},[e._v("删除")]):e._e()],1)]}}])})],1)],1),a("el-dialog",{staticClass:"dialogVisible_detail",attrs:{title:"编辑分类",visible:e.dialogVisible_detail,width:"1000px",top:"5vh","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible_detail=t},closed:e.clearDialog}},[a("div",{staticClass:"detail_conditon",staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.uptypeName,callback:function(t){e.uptypeName=t},expression:"uptypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.updataNameDetailGoods}},[e._v("重新命名")]),"customized"===e.selDate.type?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.goodsItemSelectorVisible=!0}}},[e._v("添加商品")]):e._e(),"customized"===e.selDate.type?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delDetailGoodsFun("2",null)}}},[e._v("批量删除")]):e._e(),a("span",{staticStyle:{margin:"4px"}},[e._v("此分类目前已在Shopee页面中显示")]),a("el-switch",{attrs:{"active-color":"#13ce66"},on:{change:e.detailchangeShow},model:{value:e.detailGoodsShow,callback:function(t){e.detailGoodsShow=t},expression:"detailGoodsShow"}})],1),a("div",{staticClass:"detail_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.detailLoading,expression:"detailLoading"}],ref:"goodstable",attrs:{data:e.tableDataCut,height:"calc(100vh - 236px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.DetailSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{type:"index",width:"55",label:"序号",fixed:""}}),a("el-table-column",{attrs:{prop:"itemid",label:"商品ID",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"images",label:"商品图片",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:e._f("imageRender")([t.row.images[0]])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("imageRender")([t.row.images[0],!0])}})],1)]}}])}),a("el-table-column",{attrs:{prop:"name",label:"标题","show-overflow-tooltip":"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"minPrice",label:"价格",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("siteCoin")(e.mallinfo.country))+e._s(n.minPrice))])]}}])}),a("el-table-column",{attrs:{prop:"stock",label:"数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",["customized"===e.selDate.type?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delDetailGoodsFun("1",n.itemid)}}},[e._v("删除")]):e._e()],1)]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{"margin-left":"376px","margin-top":"10px",display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[20,50,100,200],"page-size":e.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{visible:e.goodsItemSelectorVisible,top:"7vh",title:"商品选择","close-on-click-modal":!1,"close-on-press-escape":!1,width:"1280px"},on:{"update:visible":function(t){e.goodsItemSelectorVisible=t}}},[e.goodsItemSelectorVisible?a("goodsItemSelector",{attrs:{mall:e.selectMalllist},on:{changeGoodsItem:e.changeGoodsItem}}):e._e()],1)],1)],1)},i=[],r=a("2909"),o=a("1da1"),l=(a("96cf"),a("159b"),a("a9e3"),a("b0c0"),a("d3b7"),a("25f0"),a("fb6a"),a("99af"),a("c740"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"item"},[a("label",[e._v("所属站点：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},e._l(e.siteList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺分组：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.gruopList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})}))],2)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺名称：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},on:{change:e.changeMall},model:{value:e.mall,callback:function(t){e.mall=t},expression:"mall"}},e._l(e.mallList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1)])}),s=[],c={name:"GoodsChoose",data:function(){return{site:"TH",siteList:this.$filters.countries_option,group:"",gruopList:[],mall:"",mallList:[],selectMall:[]}},watch:{site:{handler:function(e,t){this.group="",this.mall="",this.site=e,this.getInfo()}},group:{handler:function(e,t){this.group=e,this.mall="",this.getInfo()}}},mounted:function(){this.getInfo()},methods:{changeMall:function(){var e=this;this.$emit("getmall",{mallID:this.mall,country:this.site});var t=this.selectMall.findIndex((function(t){return Number(t.platform_mall_id)===Number(e.mall)})),a=[this.selectMall[t]];a["country"]=this.site,this.$emit("changeMall",a)},getInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={country:e.site,mallGroupIds:e.group},t.next=3,e.$api.ddMallGoodsGetMallList(a);case 3:n=t.sent,e.mallList=[],e.gruopList=[],e.selectMall=[],200===n.data.code?(n.data.data.forEach((function(t){t.group_id&&e.gruopList.push({label:t.group_name,value:t.group_id}),t.id&&(e.mallList.push({label:t.mall_alias_name?t.mall_alias_name:t.platform_mall_name,value:t.platform_mall_id}),e.selectMall.push(t))})),e.mall=(null===(i=e.mallList[0])||void 0===i?void 0:i.value)||"",e.$emit("getmall",{mallID:e.mall,country:e.site})):e.$message.warning("店铺列表获取失败！");case 8:case"end":return t.stop()}}),t)})))()}}},u=c,d=(a("5ef4"),a("2877")),m=Object(d["a"])(u,l,s,!1,null,null,null),p=m.exports,g=a("e1e4"),h=a("01cd"),f=a("0e0b"),b={components:{GoodsChoose:p,goodsItemSelector:h["a"]},data:function(){return{selectMalllist:[],selDate:"",goodsItemSelectorVisible:!1,detailGoodsShow:!1,currentIndex:"",detailLoading:!1,collection_ids:[],selectList:[],loading:!1,loading_table:!1,searchLoading:!1,mallinfo:"",GoodsManagerAPIInstance:new g["a"](this),mall_goodsID:"",showlog:!0,showfit:!1,orderType:"1",tableList_add:[],dialogVisible_addGoods:!1,dialogVisible_detail:!1,tableList_master:[],addtypeName:"",uptypeName:"",tableList_detail:[],add_query:{searchType:"1",stock_max:9999,stock_min:0,searchContent:"",sale_min:0,sale_max:99999,price_min:0,price_max:99999,selcategory_id:"",pageSize:20,page:1,cursor:""},currentPage:1,pageSize:20,total:0,selectdetailgoods:[],tableDataCut:[]}},created:function(){},methods:{changeMall:function(e){this.selectMalllist=e},changeGoodsItem:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e.goodsList.length){a.next=16;break}return n=[],e.goodsList.forEach((function(e){n.push(Number(e.itemid))})),i={country:t.mallinfo.country,mallId:t.mallinfo.mallID,collection_id:Number(t.selDate.id),product_id_list:n},a.prev=4,a.next=7,t.GoodsManagerAPIInstance.addCollectionGoods(i);case 7:r=a.sent,0===r.ecode?(t.$set(t.selDate,"product_count",Number(t.selDate.product_count)+n.length),t.$message.success("添加成功")):t.$message.warning("添加失败".concat(r.message)),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](4),t.$message.warning("商品添加--catch".concat(a.t0));case 14:a.next=18;break;case 16:return t.$message.warning("请选择要添加的商品"),a.abrupt("return");case 18:t.goodsItemSelectorVisible=!1,t.dialogVisible_detail&&(t.getDetailGoodsList(),t.showlog=!1);case 20:case"end":return a.stop()}}),a,null,[[4,11]])})))()},closelogData:function(){this.$refs.autoReplyLogs.consoleMsg=""},handleSizeChange:function(e){this.pageSize=e,"customized"===this.selDate.type?this.dataCut():this.getShoppeGoodsIDList()},handleCurrentChange:function(e){this.currentPage=e,"customized"===this.selDate.type?this.dataCut():this.getShoppeGoodsIDList()},getinfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Object(f["p"])().then((function(t){e.mallinfo.mallName=Object(f["a"])(t,"label","value",e.mallinfo.mallID)}));case 1:case"end":return t.stop()}}),t)})))()},search:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.gettableList();case 2:case"end":return t.stop()}}),t)})))()},DetailSelectionChange:function(e){this.selectdetailgoods=e},checkDetail:function(e,t){this.dialogVisible_detail=!0,this.uptypeName=e.name,this.collection_ids=e.id,this.currentIndex=e,this.detailGoodsShow=e.isShow,"customized"===e.type?this.getDetailGoodsList():this.getShoppeGoodsIDList()},getShoppeGoodsIDList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,collection_ids:e.collection_ids,page_size:e.pageSize,page_number:e.currentPage},t.next=3,e.GoodsManagerAPIInstance.getshopGoodsid(a);case 3:if(n=t.sent,0!==n.ecode){t.next=14;break}if(e.total=n.data.page_info.total,i=[],n.data.list.forEach((function(e){i.push(e.toString())})),!i){t.next=12;break}return t.next=11,e.getShoppeGoodsListDetail(i);case 11:e.detailLoading=!1;case 12:t.next=15;break;case 14:e.$message.warning("".concat(n.message));case 15:case"end":return t.stop()}}),t)})))()},getShoppeGoodsListDetail:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,i,r,o,l,s,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:t.mallinfo.country,mallId:t.mallinfo.mallID,productIds:e},a.next=3,t.GoodsManagerAPIInstance.getshopGoodsDetail(n);case 3:if(i=a.sent,0===i.ecode){for(t.tableDataCut=[],r=i.data.products.items,o=null,l=0;l<r.length;l++){for(s=0;s<r[l].modelList.length;s++)o=r[l].modelList[0].inputOriginPrice||r[l].modelList[0].originPrice,c=r[l].modelList[s].inputOriginPrice||r[l].modelList[s].originPrice,o>c&&(o=c);r[l].minPrice=o}t.tableDataCut=r}case 5:case"end":return a.stop()}}),a)})))()},getDetailGoodsList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={collection_ids:e.collection_ids,country:e.mallinfo.country,mallId:e.mallinfo.mallID},t.prev=1,e.detailLoading=!0,t.next=5,e.GoodsManagerAPIInstance.getGoodsDetail(a);case 5:if(n=t.sent,0!==n.ecode){t.next=14;break}if(i=n.data.list[0].product_id_list||"",r=[],i.forEach((function(e){r.push(e.toString())})),!r){t.next=14;break}return t.next=13,e.getDetailGoodsListFun(r);case 13:e.detailLoading=!1;case 14:t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](1),e.$message.error(t.t0);case 19:case"end":return t.stop()}}),t,null,[[1,16]])})))()},getDetailGoodsListFun:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,i,r,o,l,s,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={country:t.mallinfo.country,mallId:t.mallinfo.mallID,productIds:e,collection_ids:t.collection_ids},a.prev=1,a.next=4,t.GoodsManagerAPIInstance.getGoodsDetailList(n);case 4:if(i=a.sent,0===i.ecode){for(t.tableList_detail=[],r=i.data.products.items,o=null,l=0;l<r.length;l++){for(s=0;s<r[l].modelList.length;s++)o=r[l].modelList[0].inputOriginPrice||r[l].modelList[0].originPrice,c=r[l].modelList[s].inputOriginPrice||r[l].modelList[s].originPrice,o>c&&(o=c);r[l].minPrice=o}t.tableList_detail=r,t.total=t.tableList_detail.length,t.dataCut()}a.next=11;break;case 8:a.prev=8,a.t0=a["catch"](1),t.$message.error("".concat(a.t0));case 11:case"end":return a.stop()}}),a,null,[[1,8]])})))()},dataCut:function(){this.tableDataCut=this.tableList_detail.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},updataNameDetailGoods:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.uptypeName||e.$message.warning("分类名称不能为空！"),a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,name:e.uptypeName,collection_ids:e.collection_ids},t.prev=2,t.next=5,e.GoodsManagerAPIInstance.getGoodsDetailListUpdateName(a);case 5:n=t.sent,0===n.ecode?e.$message.success("修改成功"):e.$message.error(n.message),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](2),e.$message.error("".concat(t.t0));case 12:case"end":return t.stop()}}),t,null,[[2,9]])})))()},delDetailGoodsFun:function(e,t){var a=this;this.$confirm("确定要删除该商品吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.delDetailGoods(e,t)})).catch((function(){}))},delDetailGoods:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var i,r,o,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=[],"1"===e&&i.push(Number(t)),"2"!==e){n.next=7;break}if(a.selectdetailgoods.length){n.next=6;break}return a.$message.warning("请选择要删除的数据"),n.abrupt("return");case 6:a.selectdetailgoods.forEach((function(e){i.push(Number(e.itemid))}));case 7:return r={country:a.mallinfo.country,mallId:a.mallinfo.mallID,product_id_list:i,collection_ids:a.collection_ids},a.detailLoading=!0,n.prev=9,n.next=12,a.GoodsManagerAPIInstance.getGoodsDetailListdel(r);case 12:o=n.sent,a.detailLoading=!1,0===o.ecode?(l=[],o.data.product_id_list.forEach((function(e){l.push(e.toString())})),a.getDetailGoodsListFun(l)):a.$message.error(o.message),n.next=20;break;case 17:n.prev=17,n.t0=n["catch"](9),a.$message.error("".concat(n.t0));case 20:case"end":return n.stop()}}),n,null,[[9,17]])})))()},addGoods:function(){},search_addGoods:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r,o,l,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.add_query.price_max<=0||""===e.add_query.price_max&&""===e.add_query.price_max&&e.add_query.sale_max<=0||""===e.add_query.sale_max&&""===e.add_query.sale_min)){t.next=3;break}return e.$message.warning("价格区间、销量区间必须是大于0的整数"),t.abrupt("return");case 3:if(""!==e.add_query.stock_min&&0!==e.add_query.stock_max&&""!==e.add_query.stock_max){t.next=6;break}return e.$message.warning("请输入有效库存数量"),t.abrupt("return");case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,search_type:1===Number(e.add_query.searchType)?"name":"id",keyword:e.add_query.searchContent,stock_max:e.add_query.stock_max,stock_min:e.add_query.stock_min,sold_max:e.add_query.sale_max,sold_min:e.add_query.sale_min,category_id:e.add_query.selcategory_id,list_type:e.showfit?"live":"all",page_number:e.add_query.page,page_size:e.add_query.pageSize,cursor:e.add_query.cursor},e.loading_table=!0,t.next=10,e.GoodsManagerAPIInstance.searchList(a);case 10:if(n=t.sent,e.loading_table=!1,e.tableList_add=[],0!==n.ecode){t.next=39;break}e.add_query.page=n.data.page_info.page_number,e.add_query.page_size=n.data.page_info.page_size,e.total=n.data.page_info.total,e.add_query.cursor=n.data.page_info.cursor,i=n.data.list,r=0;case 20:if(!(r<i.length)){t.next=37;break}return t.prev=21,o=i[r].category_path.length,l=i[r].category_path[o-1],t.next=26,window.CommodityBridgeService.callCategoryFunction("GetCategoryInfo",e.mallinfo.country,l.toString(),"0","");case 26:s=t.sent,c=JSON.parse(s),200===c.code&&function(){i[r].categoryName=c.data.categories[0].category_name;var t=i[r].model_list,a=0,n=0,o=0;t.forEach((function(e,t){a+=Number(e.stock_info.normal_stock),o+=Number(e.sold),n=0===t||n>Number(e.price_info.normal_price)?Number(e.price_info.normal_price):n})),i[r].totalStock=a,i[r].minprice=n,i[r].totSale=o,i[r].isSel=!1,e.tableList_add.push(i[r])}(),t.next=34;break;case 31:return t.prev=31,t.t0=t["catch"](21),t.abrupt("continue",34);case 34:r++,t.next=20;break;case 37:t.next=40;break;case 39:e.$message.error(n.message);case 40:case"end":return t.stop()}}),t,null,[[21,31]])})))()},startShow:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.selectList.length){a.next=3;break}return t.$message.warning("请选择要操作的数据"),a.abrupt("return");case 3:t.showlog=!1,n=0;case 5:if(!(n<t.selectList.length)){a.next=24;break}if(!(t.selectList[n].product_count>0)){a.next=20;break}return i={status:"start"===e?"active":"inactive",id:t.selectList[n].id,country:t.mallinfo.country,mallId:t.mallinfo.mallID},a.prev=8,a.next=11,t.GoodsManagerAPIInstance.updateShopCollection(i);case 11:r=a.sent,0===r.ecode?t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作成功"),!0):t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作失败"),!1),a.next=18;break;case 15:a.prev=15,a.t0=a["catch"](8),t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作失败,").concat(a.t0),!1);case 18:a.next=21;break;case 20:t.$refs.autoReplyLogs.writeLog("数量不足无法开启",!1);case 21:n++,a.next=5;break;case 24:t.$refs.autoReplyLogs.writeLog("操作结束"),t.gettableList();case 26:case"end":return a.stop()}}),a,null,[[8,15]])})))()},delCategory:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var i,o,l,s,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=[],"1"===e&&i.push(t),"2"!==e){n.next=8;break}if(o=a.selectList.findIndex((function(e){e.type})),!(o>=0)){n.next=7;break}return a.$message.warning("只能删除自定义分类"),n.abrupt("return");case 7:i.push.apply(i,Object(r["a"])(a.selectList));case 8:a.showlog=!1,l=0;case 10:if(!(l<i.length)){n.next=27;break}return s={id:i[l].id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},n.prev=12,a.$refs.autoReplyLogs.writeLog("开始删除分组...",!0),n.next=16,a.GoodsManagerAPIInstance.delShopCollection(s);case 16:c=n.sent,0===c.ecode?a.$refs.autoReplyLogs.writeLog("【".concat(i[l].name,"】删除成功"),!0):a.$refs.autoReplyLogs.writeLog("【".concat(i[l].name,"删除失败】,").concat(c.message),!1),n.next=24;break;case 20:return n.prev=20,n.t0=n["catch"](12),a.$refs.autoReplyLogs.writeLog("【".concat(i[l].name,"删除失败】,").concat(n.t0),!1),n.abrupt("continue",24);case 24:l++,n.next=10;break;case 27:a.$refs.autoReplyLogs.writeLog("操作结束"),a.gettableList();case 29:case"end":return n.stop()}}),n,null,[[12,20]])})))()},addCatorgry:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==e.addtypeName){t.next=3;break}return e.$message.warning("分类名称不能为空！"),t.abrupt("return");case 3:if(""!==e.mallinfo.mallID){t.next=6;break}return e.$message.warning("店铺不能为空！"),t.abrupt("return");case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,name:e.addtypeName},e.loading=!0,t.next=10,e.GoodsManagerAPIInstance.createShopCollection(a);case 10:n=t.sent,e.loading=!1,0===n.ecode||e.$message.error(n.message),e.gettableList(),e.addtypeName="";case 15:case"end":return t.stop()}}),t)})))()},detailchangeShow:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={status:e.detailGoodsShow?"active":"inactive",id:e.collection_ids,country:e.mallinfo.country,mallId:e.mallinfo.mallID},e.$set(e.currentIndex,"isShow",e.detailGoodsShow),t.prev=2,t.next=5,e.GoodsManagerAPIInstance.updateShopCollection(a).then((function(t){0===t.ecode?e.$message.success("操作成功~"):e.$message.error(t.message)}));case 5:t.next=9;break;case 7:t.prev=7,t.t0=t["catch"](2);case 9:e.dialogVisible_detail=!0;case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},changeShow:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={status:e.isShow?"active":"inactive",id:e.id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},t.prev=1,t.next=4,a.GoodsManagerAPIInstance.updateShopCollection(n).then((function(e){a.loading=!1,0===e.ecode?a.$message.success("操作成功~"):a.$message.error(e.message)}));case 4:t.next=8;break;case 6:t.prev=6,t.t0=t["catch"](1);case 8:case"end":return t.stop()}}),t,null,[[1,6]])})))()},handleSelectionChange:function(e){this.selectList=[],this.selectList=e},setCategory:function(e){this.add_query.selcategory_id=e.categoryList.length&&e.categoryList[e.categoryList.length-1].toString()||""},getmall:function(e){this.mallinfo=e},clearDialog:function(){},gettableList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==e.mallinfo.mallID){t.next=3;break}return e.$message.warning("请选择要查询的店铺"),t.abrupt("return");case 3:return e.tableList_master=[],a={country:e.mallinfo.country,mallId:e.mallinfo.mallID},e.getinfo(),e.searchLoading=!0,t.next=9,e.GoodsManagerAPIInstance.getcollectionlist(a);case 9:n=t.sent,e.searchLoading=!1,0===n.ecode?n.data.list.forEach((function(t){t.isShow="active"===t.status,e.tableList_master.push(t)})):e.$message.warning("当前店铺暂无信息");case 12:case"end":return t.stop()}}),t)})))()}}},_=b,y=(a("483f"),Object(d["a"])(_,n,i,!1,null,"22a77335",null));t["default"]=y.exports}}]);