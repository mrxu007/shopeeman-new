(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7043d5eb"],{"05e3":function(e,t,a){"use strict";var n=a("1da1"),i=(a("96cf"),a("a9e3"),{name:"CategoryChoose",props:{isSelect:{type:Boolean,default:!1},spanWidth:{type:String,default:""},isAll:{type:Boolean,default:!1},isCategoryAll:{type:Boolean,default:!0},level:{type:Number,default:3},isColumn:{type:Boolean,default:!1}},data:function(){return{countryVal:null,countries:this.$filters.countries_option,countries_id:{TH:"4",MY:"5",TW:"3",SG:"1",PH:"7",VN:"6",ID:"2",BR:"8",MX:"9",CO:"10",CL:"11",PL:"12"},category1:"",categoryList1:[],category2:"",categoryList2:[],category3:"",categoryList3:[],categoryList:[]}},watch:{countryVal:{handler:function(e,t){this.category1="",this.category2="",this.category3="",this.categoryList1=[],this.categoryList2=[],this.categoryList3=[],this.getCategory(e,0)},deep:!0},category1:function(e,t){this.category2="",this.category3="",this.categoryList2=[],this.categoryList3=[],this.sendParent()},category2:function(e,t){this.category3="",this.categoryList3=[],this.sendParent()}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{chageSite:function(e){this.countryVal=e},getCategory:function(e,t){var a=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var i,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a.countryVal){n.next=3;break}return a.sendParent(),n.abrupt("return");case 3:if(a.level===t)return a.sendParent(),n.abrupt("return");n.next=6;break;case 6:if(0===t||e){n.next=11;break}return a["category".concat(t+1)]="",a["categoryList".concat(t+1)]=[],a.sendParent(),n.abrupt("return");case 11:return r=[a.countryVal,0!==t?e&&""!==e?e:"":"0","1","tbCategory"],n.next=14,a.$commodityService.getCategory(r);case 14:if(i=n.sent){n.next=17;break}return n.abrupt("return",a.$message.warning("获取失败"));case 17:if(200!==(r=JSON.parse(i)).code){n.next=23;break}(r=r.data).categories&&(a["categoryList".concat(t+1)]=r.categories||[]),n.next=24;break;case 23:return n.abrupt("return",a.$message.warning("获取失败"));case 24:a.sendParent();case 25:case"end":return n.stop()}}),n)})))()},sendParent:function(){var e;this.categoryList=[],this.category1&&(e=[this.category1],this.categoryList=e),this.category1&&this.category2&&(e=[this.category1,this.category2],this.categoryList=e),this.category1&&this.category2&&this.category3&&(t=[this.category1,this.category2,this.category3],this.categoryList=t);var t={country:this.countryVal,categoryFirst:this.category1,categorySecond:this.category2,categoryThird:this.category3,categoryList:this.categoryList,platformId:this.countries_id[this.countryVal]};this.$emit("setCategory",t)}}});a("c79a"),a=a("2877"),i=Object(a.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{class:["category-content",{"category-column":!0===e.isColumn}]},[a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:"",disabled:e.isSelect},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("一级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,1)}},model:{value:e.category1,callback:function(t){e.category1=t},expression:"category1"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList1,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1),3===e.level||2===e.level?a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("二级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,2)}},model:{value:e.category2,callback:function(t){e.category2=t},expression:"category2"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList2,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1):e._e(),3===e.level?a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("三级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,3)}},model:{value:e.category3,callback:function(t){e.category3=t},expression:"category3"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList3,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1):e._e()])])}),[],!1,null,"65cef3da",null);t.a=i.exports},2695:function(e,t,a){},"5ef4":function(e,t,a){"use strict";a("8856")},8856:function(e,t,a){},ad73:function(e,t,a){"use strict";a("2695")},c79a:function(e,t,a){"use strict";a("eb7d")},eb7d:function(e,t,a){},f077:function(e,t,a){"use strict";a.r(t);var n=a("2909"),i=a("1da1"),r=(a("b0c0"),a("159b"),a("d3b7"),a("25f0"),a("fb6a"),a("a9e3"),a("99af"),a("c740"),a("96cf"),{name:"GoodsChoose",data:function(){return{site:"TH",siteList:this.$filters.countries_option,group:"",gruopList:[],mall:"",mallList:[]}},watch:{site:{handler:function(e,t){this.group="",this.mall="",this.site=e,this.getInfo()}},group:{handler:function(e,t){this.group=e,this.mall="",this.getInfo()}}},mounted:function(){this.getInfo()},methods:{changeMall:function(){this.$emit("getmall",{mallID:this.mall,country:this.site})},getInfo:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={country:e.site,mallGroupIds:e.group},t.next=3,e.$api.ddMallGoodsGetMallList(a);case 3:a=t.sent,e.mallList=[],e.gruopList=[],200===a.data.code?(a.data.data.forEach((function(t){t.group_id&&e.gruopList.push({label:t.group_name,value:t.group_id}),t.id&&e.mallList.push({label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id})})),e.mall=(null===(a=e.mallList[0])||void 0===a?void 0:a.value)||"",e.$emit("getmall",{mallID:e.mall,country:e.site})):e.$message.warning("店铺列表获取失败！");case 7:case"end":return t.stop()}}),t)})))()}}}),l=(a("5ef4"),a("2877")),o=Object(l.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"item"},[a("label",[e._v("所属站点：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},e._l(e.siteList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺分组：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.gruopList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})}))],2)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺名称：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},on:{change:e.changeMall},model:{value:e.mall,callback:function(t){e.mall=t},expression:"mall"}},e._l(e.mallList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1)])}),[],!1,null,null,null).exports,s=(r=a("05e3"),a("e1e4")),c=a("0e0b");r={components:{GoodsChoose:o,categoryChoose:r.a},data:function(){return{detailGoodsShow:!1,currentIndex:"",detailLoading:!1,collection_ids:[],selectList:[],loading:!1,loading_table:!1,searchLoading:!1,mallinfo:"",GoodsManagerAPIInstance:new s.a(this),mall_goodsID:"",showlog:!0,showfit:!1,orderType:"1",tableList_add:[],dialogVisible_addGoods:!1,dialogVisible_detail:!1,tableList_master:[],addtypeName:"",uptypeName:"",tableList_detail:[],add_query:{searchType:"1",stock_max:9999,stock_min:0,searchContent:"",sale_min:0,sale_max:99999,price_min:0,price_max:99999,selcategory_id:"",pageSize:20,page:1,cursor:""},currentPage:1,pageSize:20,total:0,selectdetailgoods:[],tableDataCut:[]}},created:function(){},methods:{closelogData:function(){this.$refs.autoReplyLogs.consoleMsg=""},handleSizeChange:function(e){this.pageSize=e,this.dataCut()},handleCurrentChange:function(e){this.currentPage=e,this.dataCut()},getinfo:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object(c.m)().then((function(t){e.mallinfo.mallName=Object(c.a)(t,"label","value",e.mallinfo.mallID)}));case 1:case"end":return t.stop()}}),t)})))()},search:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.gettableList();case 2:case"end":return t.stop()}}),t)})))()},DetailSelectionChange:function(e){this.selectdetailgoods=e},checkDetail:function(e,t){this.dialogVisible_detail=!0,this.uptypeName=e.name,this.collection_ids=e.id,this.currentIndex=e,this.detailGoodsShow=e.isShow,this.getDetailGoodsList()},getDetailGoodsList:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={collection_ids:e.collection_ids,country:e.mallinfo.country,mallId:e.mallinfo.mallID},t.prev=1,e.detailLoading=!0,t.next=5,e.GoodsManagerAPIInstance.getGoodsDetail(a);case 5:if(0!==(a=t.sent).ecode){t.next=14;break}if(a=a.data.list[0].product_id_list||"",n=[],a.forEach((function(e){n.push(e.toString())})),n)return t.next=13,e.getDetailGoodsListFun(n);t.next=14;break;case 13:e.detailLoading=!1;case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(1),e.$message.error(t.t0);case 19:case"end":return t.stop()}}),t,null,[[1,16]])})))()},getDetailGoodsListFun:function(e){var t=this;return Object(i.a)(regeneratorRuntime.mark((function a(){var n,i,r,l,o,s;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={country:t.mallinfo.country,mallId:t.mallinfo.mallID,productIds:e,collection_ids:t.collection_ids},a.prev=1,a.next=4,t.GoodsManagerAPIInstance.getGoodsDetailList(n);case 4:if(0===(n=a.sent).ecode){for(t.tableList_detail=[],i=n.data.products.items,r=null,l=0;l<i.length;l++){for(o=0;o<i[l].modelList.length;o++)r=i[l].modelList[0].inputOriginPrice||i[l].modelList[0].originPrice,(s=i[l].modelList[o].inputOriginPrice||i[l].modelList[o].originPrice)<r&&(r=s);i[l].minPrice=r}t.tableList_detail=i,t.total=t.tableList_detail.length,t.dataCut()}a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),t.$message.error("".concat(a.t0));case 11:case"end":return a.stop()}}),a,null,[[1,8]])})))()},dataCut:function(){this.tableDataCut=this.tableList_detail.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},updataNameDetailGoods:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.uptypeName||e.$message.warning("分类名称不能为空！"),a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,name:e.uptypeName,collection_ids:e.collection_ids},t.prev=2,t.next=5,e.GoodsManagerAPIInstance.getGoodsDetailListUpdateName(a);case 5:0===(a=t.sent).ecode?e.$message.success("修改成功"):e.$message.error(a.message),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),e.$message.error("".concat(t.t0));case 12:case"end":return t.stop()}}),t,null,[[2,9]])})))()},delDetailGoodsFun:function(e,t){var a=this;this.$confirm("确定要删除该商品吗？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.delDetailGoods(e,t)})).catch((function(){}))},delDetailGoods:function(e,t){var a=this;return Object(i.a)(regeneratorRuntime.mark((function n(){var i,r,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(i=[],"1"===e&&i.push(Number(t)),"2"!==e){n.next=7;break}if(a.selectdetailgoods.length){n.next=6;break}return a.$message.warning("请选择要删除的数据"),n.abrupt("return");case 6:a.selectdetailgoods.forEach((function(e){i.push(Number(e.itemid))}));case 7:return r={country:a.mallinfo.country,mallId:a.mallinfo.mallID,product_id_list:i,collection_ids:a.collection_ids},a.detailLoading=!0,n.prev=9,n.next=12,a.GoodsManagerAPIInstance.getGoodsDetailListdel(r);case 12:r=n.sent,a.detailLoading=!1,0===r.ecode?(l=[],r.data.product_id_list.forEach((function(e){l.push(e.toString())})),a.getDetailGoodsListFun(l)):a.$message.error(r.message),n.next=20;break;case 17:n.prev=17,n.t0=n.catch(9),a.$message.error("".concat(n.t0));case 20:case"end":return n.stop()}}),n,null,[[9,17]])})))()},addGoods:function(){var e=this;this.dialogVisible_addGoods=!0,this.$nextTick((function(){e.$refs.goodsCategory.chageSite(e.mallinfo.country)})),this.search_addGoods()},search_addGoods:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a,n,i,r,l,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.add_query.price_max<=0||""===e.add_query.price_max&&""===e.add_query.price_max&&e.add_query.sale_max<=0||""===e.add_query.sale_max&&""===e.add_query.sale_min)return e.$message.warning("价格区间、销量区间必须是大于0的整数"),t.abrupt("return");t.next=3;break;case 3:if(""===e.add_query.stock_min||0===e.add_query.stock_max||""===e.add_query.stock_max)return e.$message.warning("请输入有效库存数量"),t.abrupt("return");t.next=6;break;case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,search_type:1===Number(e.add_query.searchType)?"name":"id",keyword:e.add_query.searchContent,stock_max:e.add_query.stock_max,stock_min:e.add_query.stock_min,sold_max:e.add_query.sale_max,sold_min:e.add_query.sale_min,category_id:e.add_query.selcategory_id,list_type:e.showfit?"live":"all",page_number:e.add_query.page,page_size:e.add_query.pageSize,cursor:e.add_query.cursor},e.loading_table=!0,t.next=10,e.GoodsManagerAPIInstance.searchList(a);case 10:if(n=t.sent,e.loading_table=!1,e.tableList_add=[],0!==n.ecode){t.next=39;break}e.add_query.page=n.data.page_info.page_number,e.add_query.page_size=n.data.page_info.page_size,e.total=n.data.page_info.total,e.add_query.cursor=n.data.page_info.cursor,i=n.data.list,r=0;case 20:if(r<i.length)return t.prev=21,l=i[r].category_path.length,l=i[r].category_path[l-1],t.next=26,window.CommodityBridgeService.callCategoryFunction("GetCategoryInfo",e.mallinfo.country,l.toString(),"0","");t.next=37;break;case 26:l=t.sent,200===(o=JSON.parse(l)).code&&function(){i[r].categoryName=o.data.categories[0].category_name;var t=i[r].model_list,a=0,n=0,l=0;t.forEach((function(e,t){a+=Number(e.stock_info.normal_stock),l+=Number(e.sold),n=0===t||n>Number(e.price_info.normal_price)?Number(e.price_info.normal_price):n})),i[r].totalStock=a,i[r].minprice=n,i[r].totSale=l,i[r].isSel=!1,e.tableList_add.push(i[r])}(),t.next=34;break;case 31:return t.prev=31,t.t0=t.catch(21),t.abrupt("continue",34);case 34:r++,t.next=20;break;case 37:t.next=40;break;case 39:e.$message.error(n.message);case 40:case"end":return t.stop()}}),t,null,[[21,31]])})))()},startShow:function(e){var t=this;return Object(i.a)(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t.selectList.length){a.next=3;break}return t.$message.warning("请选择要操作的数据"),a.abrupt("return");case 3:t.showlog=!1,n=0;case 5:if(!(n<t.selectList.length)){a.next=24;break}if(0<t.selectList[n].product_count)return i={status:"start"===e?"active":"inactive",id:t.selectList[n].id,country:t.mallinfo.country,mallId:t.mallinfo.mallID},a.prev=8,a.next=11,t.GoodsManagerAPIInstance.updateShopCollection(i);a.next=20;break;case 11:0===a.sent.ecode?t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作成功"),!0):t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作失败"),!1),a.next=18;break;case 15:a.prev=15,a.t0=a.catch(8),t.$refs.autoReplyLogs.writeLog("【".concat(t.selectList[n].name,"】操作失败,").concat(a.t0),!1);case 18:a.next=21;break;case 20:t.$refs.autoReplyLogs.writeLog("数量不足无法开启",!1);case 21:n++,a.next=5;break;case 24:t.$refs.autoReplyLogs.writeLog("操作结束"),t.gettableList();case 26:case"end":return a.stop()}}),a,null,[[8,15]])})))()},delCategory:function(e,t){var a=this;return Object(i.a)(regeneratorRuntime.mark((function i(){var r,l,o;return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(r=[],"1"===e&&r.push(t),"2"!==e){i.next=8;break}if(0<=a.selectList.findIndex((function(e){e.type})))return a.$message.warning("只能删除自定义分类"),i.abrupt("return");i.next=7;break;case 7:r.push.apply(r,Object(n.a)(a.selectList));case 8:a.showlog=!1,l=0;case 10:if(l<r.length)return o={id:r[l].id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},i.prev=12,a.$refs.autoReplyLogs.writeLog("开始删除分组...",!0),i.next=16,a.GoodsManagerAPIInstance.delShopCollection(o);i.next=27;break;case 16:0===(o=i.sent).ecode?a.$refs.autoReplyLogs.writeLog("【".concat(r[l].name,"】删除成功"),!0):a.$refs.autoReplyLogs.writeLog("【".concat(r[l].name,"删除失败】,").concat(o.message),!1),i.next=24;break;case 20:return i.prev=20,i.t0=i.catch(12),a.$refs.autoReplyLogs.writeLog("【".concat(r[l].name,"删除失败】,").concat(i.t0),!1),i.abrupt("continue",24);case 24:l++,i.next=10;break;case 27:a.$refs.autoReplyLogs.writeLog("操作结束"),a.gettableList();case 29:case"end":return i.stop()}}),i,null,[[12,20]])})))()},addCatorgry:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===e.addtypeName)return e.$message.warning("分类名称不能为空！"),t.abrupt("return");t.next=3;break;case 3:if(""===e.mallinfo.mallID)return e.$message.warning("店铺不能为空！"),t.abrupt("return");t.next=6;break;case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,name:e.addtypeName},e.loading=!0,t.next=10,e.GoodsManagerAPIInstance.createShopCollection(a);case 10:a=t.sent,e.loading=!1,0===a.ecode||e.$message.error(a.message),e.gettableList(),e.addtypeName="";case 15:case"end":return t.stop()}}),t)})))()},detailchangeShow:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={status:e.detailGoodsShow?"active":"inactive",id:e.collection_ids,country:e.mallinfo.country,mallId:e.mallinfo.mallID},e.$set(e.currentIndex,"isShow",e.detailGoodsShow),t.prev=2,t.next=5,e.GoodsManagerAPIInstance.updateShopCollection(a).then((function(t){0===t.ecode?e.$message.success("操作成功~"):e.$message.error(t.message)}));case 5:t.next=9;break;case 7:t.prev=7,t.t0=t.catch(2);case 9:e.dialogVisible_detail=!0;case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},changeShow:function(e,t){var a=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={status:e.isShow?"active":"inactive",id:e.id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},t.prev=1,t.next=4,a.GoodsManagerAPIInstance.updateShopCollection(n).then((function(e){a.loading=!1,0===e.ecode?a.$message.success("操作成功~"):a.$message.error(e.message)}));case 4:t.next=8;break;case 6:t.prev=6,t.t0=t.catch(1);case 8:case"end":return t.stop()}}),t,null,[[1,6]])})))()},handleSelectionChange:function(e){this.selectList=[],this.selectList=e},setCategory:function(e){this.add_query.selcategory_id=e.categoryList.length&&e.categoryList[e.categoryList.length-1].toString()||""},getmall:function(e){this.mallinfo=e},clearDialog:function(){},gettableList:function(){var e=this;return Object(i.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===e.mallinfo.mallID)return e.$message.warning("请选择要查询的店铺"),t.abrupt("return");t.next=3;break;case 3:return e.tableList_master=[],a={country:e.mallinfo.country,mallId:e.mallinfo.mallID},e.getinfo(),e.searchLoading=!0,t.next=9,e.GoodsManagerAPIInstance.getcollectionlist(a);case 9:a=t.sent,e.searchLoading=!1,0===a.ecode?a.data.list.forEach((function(t){t.isShow="active"===t.status,e.tableList_master.push(t)})):e.$message.warning("当前店铺暂无信息");case 12:case"end":return t.stop()}}),t)})))()}}},a("ad73"),r=Object(l.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"detail"},[a("div",{staticClass:"conditon",staticStyle:{"background-color":"white"}},[a("div",{staticClass:"row"},[a("GoodsChoose",{on:{getmall:e.getmall}}),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary",loading:e.searchLoading},on:{click:e.search}},[e._v("搜 索")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("刷新")])],1),a("div",{staticClass:"row"},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-left":"19px","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.addtypeName,callback:function(t){e.addtypeName=t},expression:"addtypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addCatorgry}},[e._v("添加")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCategory("2",null)}}},[e._v("批量删除")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("start")}}},[e._v("批量开启知名度")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("close")}}},[e._v("批量关闭知名度")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.closelogData}},[e._v("清除日志")]),a("el-checkbox",{staticStyle:{margin:"4px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1)]),a("Logs",{ref:"autoReplyLogs",attrs:{clear:""},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}}),a("div",{staticClass:"tableDetail"},[a("el-table",{attrs:{height:"calc(100vh - 70px)",data:e.tableList_master,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"name",label:"分类名称",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"id",label:"分类名称ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"type",label:"属性",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return t=t.row,[a("div",[e._v(e._s("customized"===t.type?"自定义":"on_sale"===t.type?"Shopee|促销中":"Shopee|新上架"))])]}}])}),a("el-table-column",{attrs:{prop:"product_count",label:"商品数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"status",label:"知名度",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-switch",{attrs:{disabled:0===t.row.product_count},on:{change:function(a){return e.changeShow(t.row,t.$index)}},model:{value:t.row.isShow,callback:function(a){e.$set(t.row,"isShow",a)},expression:"scope.row.isShow"}})],1)]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{display:"flex"}},[0<t.row.product_count?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.checkDetail(t.row,t.$index)}}},[e._v("查看详情")]):e._e(),0===t.row.product_count?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")]):e._e(),"customized"==t.row.type?a("el-button",{attrs:{size:"mini",type:"primary"},nativeOn:{click:function(a){return e.delCategory("1",t.row)}}},[e._v("删除")]):e._e()],1)]}}])})],1)],1),a("el-dialog",{staticClass:"dialogVisible_detail",attrs:{title:"编辑分类",visible:e.dialogVisible_detail,width:"1000px",top:"5vh","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible_detail=t},closed:e.clearDialog}},[a("div",{staticClass:"detail_conditon",staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.uptypeName,callback:function(t){e.uptypeName=t},expression:"uptypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.updataNameDetailGoods}},[e._v("重新命名")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible_addGoods=!0}}},[e._v("添加商品")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delDetailGoodsFun("2",null)}}},[e._v("批量删除")]),a("span",{staticStyle:{margin:"4px"}},[e._v("点选显示，让买家看到此分类")]),a("el-switch",{on:{change:e.detailchangeShow},model:{value:e.detailGoodsShow,callback:function(t){e.detailGoodsShow=t},expression:"detailGoodsShow"}})],1),a("div",{staticClass:"detail_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.detailLoading,expression:"detailLoading"}],ref:"goodstable",attrs:{data:e.tableDataCut,height:"calc(100vh - 236px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.DetailSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"itemid",label:"商品ID",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"images",label:"商品图片",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:e._f("imageRenderhaventID")([e.mallinfo.country,null,t.row.images[0]])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("imageRenderhaventID")([e.mallinfo.country,null,t.row.images[0]])}})],1)]}}])}),a("el-table-column",{attrs:{prop:"name",label:"标题","show-overflow-tooltip":"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"minPrice",label:"价格",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return t=t.row,[a("span",[e._v(e._s(e._f("siteCoin")(e.mallinfo.country))+e._s(t.minPrice))])]}}])}),a("el-table-column",{attrs:{prop:"stock",label:"数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delDetailGoodsFun("1",n.itemid)}}},[e._v("删除")])],1)]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{"margin-left":"376px","margin-top":"10px",display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[20,50,100,200],"page-size":e.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),a("el-dialog",{staticClass:"dialogVisible_add",attrs:{title:"添加商品",visible:e.dialogVisible_addGoods,width:"1100px",top:"5vh"},on:{"update:visible":function(t){e.dialogVisible_addGoods=t},closed:e.clearDialog}},[a("div",{staticClass:"detail_conditon",staticStyle:{display:"flex","flex-wrap":"wrap"}},[a("div",{staticClass:"row"},[a("category-choose",{ref:"goodsCategory",attrs:{level:3,"is-select":!0},on:{setCategory:e.setCategory}})],1),a("div",{staticClass:"row"},[a("div",[a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.add_query.searchType,callback:function(t){e.$set(e.add_query,"searchType",t)},expression:"add_query.searchType"}},[a("el-option",{attrs:{label:"关键字",value:"1"}}),a("el-option",{attrs:{label:"商品编号",value:"2"}})],1),a("el-input",{staticStyle:{width:"115px"},attrs:{size:"mini",clearable:""},model:{value:e.add_query.searchContent,callback:function(t){e.$set(e.add_query,"searchContent",t)},expression:"add_query.searchContent"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("价格区间：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.price_min,callback:function(t){e.$set(e.add_query,"price_min",t)},expression:"add_query.price_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.price_max,callback:function(t){e.$set(e.add_query,"price_max",t)},expression:"add_query.price_max"}})],1),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showfit,callback:function(t){e.showfit=t},expression:"showfit"}},[e._v("仅显示适用商品")]),a("el-checkbox",{staticStyle:{"margin-left":"-18px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1),a("div",{staticClass:"row",staticStyle:{"align-items":"center"}},[a("div",[a("label",[e._v("商品库存：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.stock_min,callback:function(t){e.$set(e.add_query,"stock_min",t)},expression:"add_query.stock_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.stock_max,callback:function(t){e.$set(e.add_query,"stock_max",t)},expression:"add_query.stock_max"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("过滤商品编号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.mall_goodsID,callback:function(t){e.mall_goodsID=t},expression:"mall_goodsID"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("销量区间：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.sale_min,callback:function(t){e.$set(e.add_query,"sale_min",t)},expression:"add_query.sale_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.sale_max,callback:function(t){e.$set(e.add_query,"sale_max",t)},expression:"add_query.sale_max"}})],1),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary"},on:{click:e.search_addGoods}},[e._v("查询商品")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("取消操作")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("添加已选商品")])],1)]),a("div",{staticClass:"detail_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading_table,expression:"loading_table"}],attrs:{data:e.tableList_add,height:"calc(100vh - 353px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"mallinfo.mallName",label:"店铺名称",align:"center","min-width":"100px",fixed:""}},[[a("span",[e._v(e._s(e.mallinfo.mallName))])]],2),a("el-table-column",{attrs:{prop:"categoryName",label:"类目",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"主图",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"200px",height:"200px"},attrs:{src:e._f("imageRender")([e.mallinfo.country,t.row.id,t.row.images[0]])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("imageRender")([e.mallinfo.country,t.row.id,t.row.images[0]])}})],1)]}}])}),a("el-table-column",{attrs:{prop:"id",label:"商品ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"name",label:"商品标题",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"totalStock",label:"库存",sortable:"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"totSale",label:"销量",sortable:"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"minprice",label:"价格",sortable:"",align:"center","min-width":"100px"}})],1),a("div",{staticClass:"pagination",staticStyle:{"margin-left":"476px","margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":e.add_query.page,"page-sizes":[20,50,100,200],"page-size":e.add_query.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){return e.$set(e.add_query,"page",t)},"update:current-page":function(t){return e.$set(e.add_query,"page",t)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])],1)}),[],!1,null,"c4cc2dca",null);t.default=r.exports}}]);