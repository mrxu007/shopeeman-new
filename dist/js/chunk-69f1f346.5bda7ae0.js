(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-69f1f346"],{"05e3":function(e,t,a){"use strict";var r=a("1da1"),n=(a("96cf"),a("a9e3"),{name:"CategoryChoose",props:{isSelect:{type:Boolean,default:!1},spanWidth:{type:String,default:""},isAll:{type:Boolean,default:!1},isCategoryAll:{type:Boolean,default:!0},level:{type:Number,default:3},isColumn:{type:Boolean,default:!1}},data:function(){return{countryVal:null,countries:this.$filters.countries_option,countries_id:{TH:"4",MY:"5",TW:"3",SG:"1",PH:"7",VN:"6",ID:"2",BR:"8",MX:"9",CO:"10",CL:"11",PL:"12"},category1:"",categoryList1:[],category2:"",categoryList2:[],category3:"",categoryList3:[],categoryList:[]}},watch:{countryVal:{handler:function(e,t){this.category1="",this.category2="",this.category3="",this.categoryList1=[],this.categoryList2=[],this.categoryList3=[],this.getCategory(e,0)},deep:!0},category1:function(e,t){this.category2="",this.category3="",this.categoryList2=[],this.categoryList3=[],this.sendParent()},category2:function(e,t){this.category3="",this.categoryList3=[],this.sendParent()}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{chageSite:function(e){this.countryVal=e},getCategory:function(e,t){var a=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var n,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a.countryVal){r.next=3;break}return a.sendParent(),r.abrupt("return");case 3:if(a.level===t)return a.sendParent(),r.abrupt("return");r.next=6;break;case 6:if(0===t||e){r.next=11;break}return a["category".concat(t+1)]="",a["categoryList".concat(t+1)]=[],a.sendParent(),r.abrupt("return");case 11:return i=[a.countryVal,0!==t?e&&""!==e?e:"":"0","1","tbCategory"],r.next=14,a.$commodityService.getCategory(i);case 14:if(n=r.sent){r.next=17;break}return r.abrupt("return",a.$message.warning("获取失败"));case 17:if(200!==(i=JSON.parse(n)).code){r.next=23;break}(i=i.data).categories&&(a["categoryList".concat(t+1)]=i.categories||[]),r.next=24;break;case 23:return r.abrupt("return",a.$message.warning("获取失败"));case 24:a.sendParent();case 25:case"end":return r.stop()}}),r)})))()},sendParent:function(){var e;this.categoryList=[],this.category1&&(e=[this.category1],this.categoryList=e),this.category1&&this.category2&&(e=[this.category1,this.category2],this.categoryList=e),this.category1&&this.category2&&this.category3&&(t=[this.category1,this.category2,this.category3],this.categoryList=t);var t={country:this.countryVal,categoryFirst:this.category1,categorySecond:this.category2,categoryThird:this.category3,categoryList:this.categoryList,platformId:this.countries_id[this.countryVal]};this.$emit("setCategory",t)}}});a("c79a"),a=a("2877"),n=Object(a.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{class:["category-content",{"category-column":!0===e.isColumn}]},[a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:"",disabled:e.isSelect},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},[e.isAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("一级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,1)}},model:{value:e.category1,callback:function(t){e.category1=t},expression:"category1"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList1,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1),3===e.level||2===e.level?a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("二级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,2)}},model:{value:e.category2,callback:function(t){e.category2=t},expression:"category2"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList2,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1):e._e(),3===e.level?a("li",{class:[{"column-item":!0===e.isColumn}]},[a("span",{style:{width:e.spanWidth}},[e._v("三级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(t){return e.getCategory(t,3)}},model:{value:e.category3,callback:function(t){e.category3=t},expression:"category3"}},[e.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._l(e.categoryList3,(function(e,t){return a("el-option",{key:t,attrs:{label:e.category_name+"("+e.category_cn_name+")",value:e.category_id}})}))],2)],1):e._e()])])}),[],!1,null,"65cef3da",null);t.a=n.exports},"45ba":function(e,t,a){"use strict";a("97671")},"5ef4":function(e,t,a){"use strict";a("8856")},8856:function(e,t,a){},97671:function(e,t,a){},c79a:function(e,t,a){"use strict";a("eb7d")},e1e4:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a("1da1"),n=a("d4ec"),i=a("bee2"),o=(a("b0c0"),a("99af"),a("96cf"),function(){function e(t){Object(n.a)(this,e),this._this=t,this.mallList=[]}var t,a,o,s,l,c,u,d,p;return Object(i.a)(e,[{key:"getSkuList",value:(p=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.country,a=t.page_number,r=t.mallId,i=t.page_size,i={page_number:a,mallId:r,page_size:i,source:"seller_center",version:"1.0.0"},e.next=5,this._this.$shopeemanService.getChinese(n,"/api/v3/mpsku/get_mpsku_list/?",i,{headers:{Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-CN,zh;q=0.9"}});case 5:return n=e.sent,i=JSON.parse(JSON.parse(n).data),n=i.code||i.errcode,n=i.errcode||i.code,i=i.data,e.abrupt("return",{ecode:n,data:i});case 13:return e.prev=13,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"getSkuList-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])}))),function(e){return p.apply(this,arguments)})},{key:"getcollectionlist",value:(d=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,r={mallId:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/shopcategory/v3/category/get_collection_list/?",r,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate"}});case 5:return a=e.sent,r=JSON.parse(JSON.parse(a).data),a=r.code||r.errcode,a=r.errcode||r.code,r=r.data,e.abrupt("return",{ecode:a,data:r});case 13:return e.prev=13,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"getcollectionlist-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])}))),function(e){return d.apply(this,arguments)})},{key:"createShopCollection",value:(u=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.country,a=t.mallId,r=t.name,a={mallId:a,name:r},e.next=5,this._this.$shopeemanService.postChinese(n,"/api/shopcategory/v3/category/create_shop_collection/?",a,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate",Referer:"/portal/category","Content-Type":"application/json"}});case 5:return r=e.sent,n=JSON.parse(JSON.parse(r).data),a=n.code||n.errcode,a=n.errcode||n.code,r=n.data,n=n.message,e.abrupt("return",{ecode:a,data:r,message:n});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"createShopCollection-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return u.apply(this,arguments)})},{key:"delShopCollection",value:(c=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.country,r=t.mallId,a=t.id,a={id:a,mallId:r},e.next=5,this._this.$shopeemanService.postChinese(n,"/api/shopcategory/v3/category/delete_shop_collection/?",a,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate",Referer:"/portal/category","Content-Type":"application/json"}});case 5:return r=e.sent,n=JSON.parse(JSON.parse(r).data),a=n.code||n.errcode,a=n.errcode||n.code,r=n.data,n=n.message,e.abrupt("return",{ecode:a,data:r,message:n});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"createShopCollection-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return c.apply(this,arguments)})},{key:"updateShopCollection",value:(l=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i=t.country,n=t.mallId,a=t.id,r=t.status,r={id:a,status:r,mallId:n},e.next=5,this._this.$shopeemanService.postChinese(i,"/api/shopcategory/v3/category/update_shop_collection/?",r,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate",Referer:"/portal/category","Content-Type":"application/json"}});case 5:return n=e.sent,i=JSON.parse(JSON.parse(n).data),r=i.code||i.errcode,r=i.errcode||i.code,n=i.data,i=i.message,e.abrupt("return",{ecode:r,data:n,message:i});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"updateShopCollection-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return l.apply(this,arguments)})},{key:"getMpskuList",value:(s=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i=t.country,a=t.mallId,r=t.page_number,n=t.page_size,r={mallId:a,page_number:r,page_size:n,list_type:"all",source:"seller_center",version:"1.0.0"},e.next=5,this._this.$shopeemanService.getChinese(i,"/api/v3/mpsku/get_mpsku_list/?",r,{headers:{"content-type":"application/json; charset=utf-8"}});case 5:return n=e.sent,i=JSON.parse(JSON.parse(n).data),r=i.code||i.errcode,r=i.errcode||i.code,n=i.data,i=i.message,e.abrupt("return",{ecode:r,data:n,message:i});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"getMpskuList-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return s.apply(this,arguments)})},{key:"searchList",value:(o=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n,i,o,s,l,c,u,d,p,m,g;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.mallId,n=t.search_type,i=t.keyword,o=t.stock_max,m=t.stock_min,s=t.sold_max,l=t.sold_min,c=t.category_id,d=t.list_type,g=t.page_number,p=t.page_size,u=t.cursor,d={mallId:r,page_number:g,search_type:n,keyword:i,page_size:p,cursor:u,stock_max:o,stock_min:m,sold_max:s,sold_min:l,category_id:c,list_type:d,count_list_types:"sold_out,banned,deboosted,deleted,unlisted",version:"4.0.0"},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/product/search_product_list/?",d,{headers:{"content-type":"application/json; charset=utf-8",Referer:"/portal/product/list/active?category=".concat(c,"&soldMax=").concat(s,"&soldMin=").concat(l,"&stockMax=").concat(o,"&stockMin=").concat(m,"&page=").concat(g,"&size=").concat(p)}});case 5:return m=e.sent,g=JSON.parse(JSON.parse(m).data),p=g.code||g.errcode,p=g.errcode||g.code,m=g.data,g=g.message,e.abrupt("return",{ecode:p,data:m,message:g});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"searchList-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return o.apply(this,arguments)})},{key:"getGoodsDetail",value:(a=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.mallId,a=t.collection_ids,n={collection_ids:a,mallId:n},e.next=5,this._this.$shopeemanService.getChinese(r,"/api/shopcategory/v3/category/get_collection/?",n,{headers:{accept:"application/json, text/plain, */*",referer:"/portal/category/".concat(a)}});case 5:return r=e.sent,n=JSON.parse(JSON.parse(r).data),a=n.code||n.errcode,a=n.errcode||n.code,r=n.data,n=n.message,e.abrupt("return",{ecode:a,data:r,message:n});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"getGoodsDetail-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return a.apply(this,arguments)})},{key:"getGoodsDetailList",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(t){var a,r,n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.country,a=t.mallId,i=t.productIds,r=t.collection_ids,i={mallId:a,query:"query Products($productIds: [String], $statusType: Int) {\n          products(productIds: $productIds, statusType: $statusType) {\n        items {\n          itemid,\n          name,\n          images,\n          normalStock,\n          normalSellerStock,\n          normalWmsStock,\n          sellerStock,\n          wmsStock,\n          stock,\n          pffTag,\n          modelList {\n            inputOriginPrice,\n            inputPromotionPrice,\n            originPrice,\n            promotionPrice\n          }\n        }\n      }\n        }",variables:{productIds:i,statusType:0}},e.next=5,this._this.$shopeemanService.postChineseReferer(n,"/api/marketing/v4/graphql/query/?",i,{headers:{"content-type":"application/json",referer:"/portal/category/".concat(r)}});case 5:return n=e.sent,i=JSON.parse(JSON.parse(n).data),r=i.code||i.errcode,r=i.errcode||i.code,n=i.data,i=i.message,e.abrupt("return",{ecode:r,data:n,message:i});case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{code:-2,data:"getGoodsDetail-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(e){return t.apply(this,arguments)})}]),e}())},eb7d:function(e,t,a){},f077:function(e,t,a){"use strict";a.r(t);var r=a("2909"),n=a("1da1"),i=(a("159b"),a("d3b7"),a("25f0"),a("a9e3"),a("b0c0"),a("c740"),a("96cf"),{name:"GoodsChoose",data:function(){return{site:"TH",siteList:this.$filters.countries_option,group:"",gruopList:[],mall:"",mallList:[]}},watch:{site:{handler:function(e,t){this.group="",this.mall="",this.site=e,this.getInfo()}},group:{handler:function(e,t){this.group=e,this.mall="",this.getInfo()}}},mounted:function(){this.getInfo()},methods:{changeMall:function(){this.$emit("getmall",{mallID:this.mall,country:this.site})},getInfo:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={country:e.site,mallGroupIds:e.group},t.next=3,e.$api.ddMallGoodsGetMallList(a);case 3:a=t.sent,e.mallList=[],e.gruopList=[],200===a.data.code?(a.data.data.forEach((function(t){t.group_id&&e.gruopList.push({label:t.group_name,value:t.group_id}),t.id&&e.mallList.push({label:t.mall_alias_name||t.platform_mall_name,value:t.platform_mall_id})})),e.mall=(null===(a=e.mallList[0])||void 0===a?void 0:a.value)||"",e.$emit("getmall",{mallID:e.mall,country:e.site})):e.$message.warning("店铺列表获取失败！");case 7:case"end":return t.stop()}}),t)})))()}}}),o=(a("5ef4"),a("2877")),s=Object(o.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"item"},[a("label",[e._v("所属站点：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},e._l(e.siteList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺分组：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.gruopList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})}))],2)],1),a("div",{staticClass:"item"},[a("label",[e._v("店铺名称：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",clearable:"",placeholder:""},on:{change:e.changeMall},model:{value:e.mall,callback:function(t){e.mall=t},expression:"mall"}},e._l(e.mallList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1)])}),[],!1,null,null,null).exports,l=(i=a("05e3"),a("e1e4")),c=a("0e0b");i={components:{GoodsChoose:s,categoryChoose:i.a},data:function(){return{selectList:[],loading:!1,loading_table:!1,searchLoading:!1,mallinfo:"",GoodsManagerAPIInstance:new l.a(this),mall_goodsID:"",showlog:!1,showfit:!1,orderType:"1",tableList_add:[],dialogVisible_addGoods:!1,dialogVisible_detail:!1,tableList_master:[],isShow_master:!0,addtypeName:"",uptypeName:"",tableList_detail:[],add_query:{searchType:"1",stock_max:9999,stock_min:0,searchContent:"",sale_min:0,sale_max:99999,price_min:0,price_max:99999,selcategory_id:"",pageSize:20,page:1,cursor:""},total:0}},created:function(){},methods:{handleSizeChange:function(e){this.add_query.pageSize=e,this.search_addGoods()},handleCurrentChange:function(e){this.add_query.page=e,this.search_addGoods()},getinfo:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object(c.m)().then((function(t){e.mallinfo.mallName=Object(c.a)(t,"label","value",e.mallinfo.mallID)}));case 1:case"end":return t.stop()}}),t)})))()},search:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.gettableList();case 2:case"end":return t.stop()}}),t)})))()},checkDetail:function(e){this.dialogVisible_detail=!0,this.getDetailGoodsList(e)},getDetailGoodsList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={collection_ids:e.id,country:t.mallinfo.country,mallId:t.mallinfo.mallID},a.prev=1,a.next=4,t.GoodsManagerAPIInstance.getGoodsDetail(n);case 4:if(0!==(n=a.sent).ecode){a.next=16;break}if(n=n.data.list[0].product_id_list||"",r=[],n.forEach((function(e){r.push(e.toString())})),r)return n={country:t.mallinfo.country,mallId:t.mallinfo.mallID,productIds:r,collection_ids:e.id},a.next=13,t.GoodsManagerAPIInstance.getGoodsDetailList(n);a.next=16;break;case 13:a.sent.ecode;case 16:a.next=21;break;case 18:a.prev=18,a.t0=a.catch(1),t.$message.error(a.t0);case 21:case"end":return a.stop()}}),a,null,[[1,18]])})))()},addGoods:function(){var e=this;this.dialogVisible_addGoods=!0,this.$nextTick((function(){e.$refs.goodsCategory.chageSite(e.mallinfo.country)})),this.search_addGoods()},search_addGoods:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a,r,n,i,o,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.add_query.price_max<=0||""===e.add_query.price_max&&""===e.add_query.price_max&&e.add_query.sale_max<=0||""===e.add_query.sale_max&&""===e.add_query.sale_min)return e.$message.warning("价格区间、销量区间必须是大于0的整数"),t.abrupt("return");t.next=3;break;case 3:if(""===e.add_query.stock_min||0===e.add_query.stock_max||""===e.add_query.stock_max)return e.$message.warning("请输入有效库存数量"),t.abrupt("return");t.next=6;break;case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,search_type:1===Number(e.add_query.searchType)?"name":"id",keyword:e.add_query.searchContent,stock_max:e.add_query.stock_max,stock_min:e.add_query.stock_min,sold_max:e.add_query.sale_max,sold_min:e.add_query.sale_min,category_id:e.add_query.selcategory_id,list_type:e.showfit?"live":"all",page_number:e.add_query.page,page_size:e.add_query.pageSize,cursor:e.add_query.cursor},e.loading_table=!0,t.next=10,e.GoodsManagerAPIInstance.searchList(a);case 10:if(r=t.sent,e.loading_table=!1,e.tableList_add=[],0!==r.ecode){t.next=39;break}e.add_query.page=r.data.page_info.page_number,e.add_query.page_size=r.data.page_info.page_size,e.total=r.data.page_info.total,e.add_query.cursor=r.data.page_info.cursor,n=r.data.list,i=0;case 20:if(i<n.length)return t.prev=21,o=n[i].category_path.length,o=n[i].category_path[o-1],t.next=26,window.CommodityBridgeService.callCategoryFunction("GetCategoryInfo",e.mallinfo.country,o.toString(),"0","");t.next=37;break;case 26:o=t.sent,200===(s=JSON.parse(o)).code&&function(){n[i].categoryName=s.data.categories[0].category_name;var t=n[i].model_list,a=0,r=0,o=0;t.forEach((function(e,t){a+=Number(e.stock_info.normal_stock),o+=Number(e.sold),r=0===t||r>Number(e.price_info.normal_price)?Number(e.price_info.normal_price):r})),n[i].totalStock=a,n[i].minprice=r,n[i].totSale=o,n[i].isSel=!1,e.tableList_add.push(n[i])}(),t.next=34;break;case 31:return t.prev=31,t.t0=t.catch(21),t.abrupt("continue",34);case 34:i++,t.next=20;break;case 37:t.next=40;break;case 39:e.$message.error(r.message);case 40:case"end":return t.stop()}}),t,null,[[21,31]])})))()},startShow:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t.selectList.length){a.next=3;break}return t.$message.warning("请选择要操作的数据"),a.abrupt("return");case 3:t.loading=!0,r=[],a.prev=5,n=0;case 7:if(!(n<t.selectList.length)){a.next=19;break}if(0<t.selectList[n].product_count)return i={status:"start"===e?"active":"inactive",id:t.selectList[n].id,country:t.mallinfo.country,mallId:t.mallinfo.mallID},a.next=12,t.GoodsManagerAPIInstance.updateShopCollection(i).then((function(e){}));a.next=14;break;case 12:a.next=16;break;case 14:return r.push("【"+t.selectList[n].name+"】"),a.abrupt("continue",16);case 16:n++,a.next=7;break;case 19:0<r.length&&t.$message.warning(r.toString("、")+"分组，数量不足无法开启"),t.loading=!1,a.next=27;break;case 23:a.prev=23,a.t0=a.catch(5),t.$message.error(a.t0),t.loading=!1;case 27:t.gettableList();case 28:case"end":return a.stop()}}),a,null,[[5,23]])})))()},delCategory:function(e,t){var a=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var i,o,s;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(i=[],"1"===e&&i.push(t),"2"!==e){n.next=8;break}if(0<=a.selectList.findIndex((function(e){e.type})))return a.$message.warning("只能删除自定义分类"),n.abrupt("return");n.next=7;break;case 7:i.push.apply(i,Object(r.a)(a.selectList));case 8:a.loading=!0,n.prev=9,o=0;case 11:if(o<i.length)return s={id:i[o].id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},n.next=15,a.GoodsManagerAPIInstance.delShopCollection(s).then((function(e){}));n.next=18;break;case 15:o++,n.next=11;break;case 18:a.loading=!0,n.next=25;break;case 21:n.prev=21,n.t0=n.catch(9),a.loading=!1,a.$message.error(n.t0);case 25:a.gettableList();case 26:case"end":return n.stop()}}),n,null,[[9,21]])})))()},addCatorgry:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===e.addtypeName)return e.$message.warning("分类名称不能为空！"),t.abrupt("return");t.next=3;break;case 3:if(""===e.mallinfo.mallID)return e.$message.warning("店铺不能为空！"),t.abrupt("return");t.next=6;break;case 6:return a={country:e.mallinfo.country,mallId:e.mallinfo.mallID,name:e.addtypeName},e.loading=!0,t.next=10,e.GoodsManagerAPIInstance.createShopCollection(a);case 10:a=t.sent,e.loading=!1,0===a.ecode||e.$message.error(a.message),e.gettableList(),e.addtypeName="";case 15:case"end":return t.stop()}}),t)})))()},changeShow:function(e,t){var a=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={status:e.isShow?"active":"inactive",id:e.id,country:a.mallinfo.country,mallId:a.mallinfo.mallID},a.loading=!0,t.prev=2,t.next=5,a.GoodsManagerAPIInstance.updateShopCollection(r).then((function(e){a.loading=!1,0===e.ecode?a.$message.success("操作成功~"):a.$message.error(e.message)}));case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),a.loading=!1;case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},handleSelectionChange:function(e){this.selectList=[],this.selectList=e},setCategory:function(e){this.add_query.selcategory_id=e.categoryList.length&&e.categoryList[e.categoryList.length-1].toString()||""},getmall:function(e){this.mallinfo=e},clearDialog:function(){},gettableList:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===e.mallinfo.mallID)return e.$message.warning("请选择要查询的店铺"),t.abrupt("return");t.next=3;break;case 3:return e.tableList_master=[],a={country:e.mallinfo.country,mallId:e.mallinfo.mallID},e.getinfo(),e.searchLoading=!0,t.next=9,e.GoodsManagerAPIInstance.getcollectionlist(a);case 9:a=t.sent,e.searchLoading=!1,0===a.ecode?a.data.list.forEach((function(t){t.isShow="active"===t.status,e.tableList_master.push(t)})):e.$message.warning("当前店铺暂无信息");case 12:case"end":return t.stop()}}),t)})))()}}},a("45ba"),i=Object(o.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"detail"},[a("div",{staticClass:"conditon"},[a("div",{staticClass:"row"},[a("GoodsChoose",{on:{getmall:e.getmall}}),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary",loading:e.searchLoading},on:{click:e.search}},[e._v("搜 索")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("刷新")])],1),a("div",{staticClass:"row"},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-left":"19px","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.addtypeName,callback:function(t){e.addtypeName=t},expression:"addtypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addCatorgry}},[e._v("添加")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delCategory("2",null)}}},[e._v("批量删除")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("start")}}},[e._v("批量开启知名度")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.startShow("close")}}},[e._v("批量关闭知名度")])],1)]),a("div",{staticClass:"tableDetail"},[a("el-table",{attrs:{height:"calc(100vh - 70px)",data:e.tableList_master,"header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"name",label:"分类名称",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"id",label:"分类名称ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"type",label:"属性",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return t=t.row,[a("div",[e._v(e._s("customized"===t.type?"自定义":"on_sale"===t.type?"Shopee|促销中":"Shopee|新上架"))])]}}])}),a("el-table-column",{attrs:{prop:"product_count",label:"商品数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"status",label:"知名度",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-switch",{attrs:{disabled:0===t.row.product_count},on:{change:function(a){return e.changeShow(t.row,t.$index)}},model:{value:t.row.isShow,callback:function(a){e.$set(t.row,"isShow",a)},expression:"scope.row.isShow"}})],1)]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticStyle:{display:"flex"}},[0<r.product_count?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.checkDetail(r)}}},[e._v("查看详情")]):e._e(),0===r.product_count?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")]):e._e(),"customized"==r.type?a("el-button",{attrs:{size:"mini",type:"primary"},nativeOn:{click:function(t){return e.delCategory("1",r)}}},[e._v("删除")]):e._e()],1)]}}])})],1)],1),a("el-dialog",{staticClass:"dialogVisible_detail",attrs:{title:"编辑分类",visible:e.dialogVisible_detail,width:"1000px",top:"5vh"},on:{"update:visible":function(t){e.dialogVisible_detail=t},closed:e.clearDialog}},[a("div",{staticClass:"detail_conditon",staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{display:"flex","align-items":"baseline","margin-right":"10px"}},[a("label",{staticStyle:{width:"80px"}},[e._v("分类名称：")]),e._v(" "),a("el-input",{attrs:{size:"mini"},model:{value:e.uptypeName,callback:function(t){e.uptypeName=t},expression:"uptypeName"}})],1),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("重新命名")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible_addGoods=!0}}},[e._v("添加商品")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("批量删除")]),a("span",{staticStyle:{margin:"4px"}},[e._v("点选显示，让买家看到此分类")]),a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.isShow_master,callback:function(t){e.isShow_master=t},expression:"isShow_master"}})],1),a("div",{staticClass:"detail_table"},[a("el-table",{attrs:{data:e.tableList_detail,height:"calc(100vh - 202px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"",label:"商品ID",align:"center","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"",label:"商品图片",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"标题",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"价格",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"数量",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"操作",align:"center","min-width":"100px"}},[[a("div",[a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("删除")])],1)]],2)],1)],1)]),a("el-dialog",{staticClass:"dialogVisible_add",attrs:{title:"添加商品",visible:e.dialogVisible_addGoods,width:"1100px",top:"5vh"},on:{"update:visible":function(t){e.dialogVisible_addGoods=t},closed:e.clearDialog}},[a("div",{staticClass:"detail_conditon",staticStyle:{display:"flex","flex-wrap":"wrap"}},[a("div",{staticClass:"row"},[a("category-choose",{ref:"goodsCategory",attrs:{level:3,"is-select":!0},on:{setCategory:e.setCategory}})],1),a("div",{staticClass:"row"},[a("div",[a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:e.add_query.searchType,callback:function(t){e.$set(e.add_query,"searchType",t)},expression:"add_query.searchType"}},[a("el-option",{attrs:{label:"关键字",value:"1"}}),a("el-option",{attrs:{label:"商品编号",value:"2"}})],1),a("el-input",{staticStyle:{width:"115px"},attrs:{size:"mini",clearable:""},model:{value:e.add_query.searchContent,callback:function(t){e.$set(e.add_query,"searchContent",t)},expression:"add_query.searchContent"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("价格区间：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.price_min,callback:function(t){e.$set(e.add_query,"price_min",t)},expression:"add_query.price_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.price_max,callback:function(t){e.$set(e.add_query,"price_max",t)},expression:"add_query.price_max"}})],1),a("el-checkbox",{staticStyle:{"margin-left":"8px"},model:{value:e.showfit,callback:function(t){e.showfit=t},expression:"showfit"}},[e._v("仅显示适用商品")]),a("el-checkbox",{staticStyle:{"margin-left":"-18px"},model:{value:e.showlog,callback:function(t){e.showlog=t},expression:"showlog"}},[e._v("隐藏日志")])],1),a("div",{staticClass:"row",staticStyle:{"align-items":"center"}},[a("div",[a("label",[e._v("商品库存：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.stock_min,callback:function(t){e.$set(e.add_query,"stock_min",t)},expression:"add_query.stock_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.stock_max,callback:function(t){e.$set(e.add_query,"stock_max",t)},expression:"add_query.stock_max"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("过滤商品编号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.mall_goodsID,callback:function(t){e.mall_goodsID=t},expression:"mall_goodsID"}})],1),a("div",{staticStyle:{"margin-left":"8px"}},[a("label",[e._v("销量区间：")]),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.sale_min,callback:function(t){e.$set(e.add_query,"sale_min",t)},expression:"add_query.sale_min"}}),e._v(" - "),a("el-input",{staticStyle:{width:"84px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,0)",size:"mini",clearable:""},model:{value:e.add_query.sale_max,callback:function(t){e.$set(e.add_query,"sale_max",t)},expression:"add_query.sale_max"}})],1),a("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"mini",type:"primary"},on:{click:e.search_addGoods}},[e._v("查询商品")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("取消操作")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("添加已选商品")])],1)]),a("div",{staticClass:"detail_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading_table,expression:"loading_table"}],attrs:{data:e.tableList_add,height:"calc(100vh - 353px)","header-cell-style":{background:"#f7fafa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),a("el-table-column",{attrs:{prop:"mallinfo.mallName",label:"店铺名称",align:"center","min-width":"100px",fixed:""}},[[a("span",[e._v(e._s(e.mallinfo.mallName))])]],2),a("el-table-column",{attrs:{prop:"categoryName",label:"类目",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"",label:"主图",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"200px",height:"200px"},attrs:{src:e._f("imageRender")([e.mallinfo.country,t.row.id,t.row.images[0]])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("imageRender")([e.mallinfo.country,t.row.id,t.row.images[0]])}})],1)]}}])}),a("el-table-column",{attrs:{prop:"id",label:"商品ID",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"name",label:"商品标题",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"totalStock",label:"库存",sortable:"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"totSale",label:"销量",sortable:"",align:"center","min-width":"100px"}}),a("el-table-column",{attrs:{prop:"minprice",label:"价格",sortable:"",align:"center","min-width":"100px"}})],1),a("div",{staticClass:"pagination",staticStyle:{"margin-left":"476px","margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":e.add_query.page,"page-sizes":[20,50,100,200],"page-size":e.add_query.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){return e.$set(e.add_query,"page",t)},"update:current-page":function(t){return e.$set(e.add_query,"page",t)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])],1)}),[],!1,null,"0a536d84",null);t.default=i.exports}}]);