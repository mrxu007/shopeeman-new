(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f772f22"],{"01cd":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goods-item-selector"},[a("div",{staticClass:"goods-item-header"},[a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("el-select",{staticStyle:{"margin-right":"5px",width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.type,callback:function(e){t.$set(t.searchParams,"type",e)},expression:"searchParams.type"}},[a("el-option",{attrs:{value:0,label:"关键字"}}),a("el-option",{attrs:{value:1,label:"商品编号"}})],1),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.typeKey,callback:function(e){t.$set(t.searchParams,"typeKey",e)},expression:"searchParams.typeKey"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("排序：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.sort,callback:function(e){t.$set(t.searchParams,"sort",e)},expression:"searchParams.sort"}},[a("el-option",{attrs:{value:"",label:"默认排序"}}),a("el-option",{attrs:{value:"sales",label:"销量从低往高"}}),a("el-option",{attrs:{value:"-sales",label:"销量从高往低"}}),a("el-option",{attrs:{value:"price",label:"价格从低往高"}}),a("el-option",{attrs:{value:"-price",label:"价格从高往低"}})],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("价格区间：")]),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.minPrice,callback:function(e){t.$set(t.searchParams,"minPrice",e)},expression:"searchParams.minPrice"}}),a("div",{staticClass:"heng"}),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.maxPrice,callback:function(e){t.$set(t.searchParams,"maxPrice",e)},expression:"searchParams.maxPrice"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:function(e){t.categoryVisible=!0}}},[t._v("选择类目")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.queryGoods}},[t._v("查询商品")]),a("el-button",{attrs:{type:"",size:"mini"},on:{click:t.cancelGoods}},[t._v("取消查询")])],1),a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"120px"}},[t._v("每一个店铺商品数量：")]),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.goodsCount,callback:function(e){t.$set(t.searchParams,"goodsCount",e)},expression:"searchParams.goodsCount"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("过滤商品编号：")]),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.filterNo,callback:function(e){t.$set(t.searchParams,"filterNo",e)},expression:"searchParams.filterNo"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"不同商品id使用,号隔开",placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"text"}},[a("i",{staticClass:"el-icon-question",staticStyle:{padding:"0 2px"}})])],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"72px"}},[t._v("销量区间：")]),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.minSales,callback:function(e){t.$set(t.searchParams,"minSales",e)},expression:"searchParams.minSales"}}),a("div",{staticClass:"heng"}),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.maxSales,callback:function(e){t.$set(t.searchParams,"maxSales",e)},expression:"searchParams.maxSales"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.changeGoodsItem}},[t._v("添加已选商品")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{disabled:t.isRunning,size:"mini"},model:{value:t.isApplyCheck,callback:function(e){t.isApplyCheck=e},expression:"isApplyCheck"}},[t._v("仅显示适用商品 ")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("Logs",{ref:"goods_item_Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}}),a("div",{staticClass:"goods-item-table"},[a("u-table",{ref:"goodsTable",attrs:{height:"620px",data:t.goodsTable,"data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"big-data-checkbox":!0,border:!1,"use-virtual":""},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"center",type:"selection"}}),a("u-table-column",{attrs:{align:"center",type:"index",width:"80",label:"序号"}}),a("u-table-column",{attrs:{align:"center",label:"店铺名称",width:"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name||a.platform_mall_name))]}}])}),a("u-table-column",{attrs:{align:"center",label:"类目",width:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("p",{staticStyle:{"white-space":"normal"}},[t._v(t._s(t.getCategoryName(i.categoryId)))])]}}])}),a("u-table-column",{attrs:{align:"center",label:"主图",width:"80",prop:"Sales"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{staticStyle:{"justify-content":"center",display:"flex"}},[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[i["isImgShow"]?a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([i.imageList[0]])}}):a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([i.imageList[0],!0])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("imageRender")([i.imageList[0],!0])},on:{mouseenter:function(t){i["isImgShow"]=!0}}})],1)],1)]}}])}),a("u-table-column",{attrs:{align:"center",label:"itemId",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.itemid))]}}])}),a("u-table-column",{attrs:{align:"center",label:"商品标题","min-width":"150",prop:"Price",fit:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{staticClass:"goodsTableLine",staticStyle:{height:"60px","text-align":"left"}},[t._v(" "+t._s(i.name)+" ")])]}}])}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"库存",width:"100",prop:"stock","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"销量",width:"100",prop:"sold","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"价格",width:"100",prop:"price","show-overflow-tooltip":""}})],1)],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible,modal:!1},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{"goods-current":{},"mall-list":t.mall},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},s=[],n=a("b85c"),r=a("2909"),o=a("1da1"),l=(a("96cf"),a("d81d"),a("99af"),a("3ca3"),a("ddb0"),a("5b81"),a("ac1f"),a("1276"),a("caad"),a("2532"),a("7db0"),a("0e0b")),c=a("eb09"),u={name:"GoodsItemSelector",components:{categoryMapping:c["a"]},props:{mall:{type:Array,default:function(){return[]}},isNeedFilterAct:{type:Boolean,default:function(){return!1}}},data:function(){return{searchParams:{type:1,typeKey:"",sort:"",minPrice:"0",maxPrice:"999999",goodsCount:"1000",filterNo:"",minSales:"0",maxSales:"999999",createTime:""},goodsSelect:[],goodsTable:[],country:"",category:"",categoryList:{},isRunning:!1,isApplyCheck:!0,categoryVisible:!1,showlog:!0}},computed:{getCategoryName:function(){return function(t){var e=this.categoryList["category_".concat(t)];return e}}},mounted:function(){console.log("mallList",this.mall),this.country=this.mall.country},methods:{queryGoods:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showlog=!1,t.$refs.goods_item_Logs.writeLog("------开始获取商品列表------",!0),t.isRunning=!0,t.goodsTable=[],a=Object(r["a"])(t.mall.map((function(t){return t["offset"]=0,t}))),e.next=7,Object(l["d"])(a,t.queryGoodsList);case 7:!t.isRunning&&t.$refs.goods_item_Logs.writeLog("------列表获取停止成功------",!1),t.$refs.goods_item_Logs.writeLog("------商品列表获取结束------",!0),t.isRunning=!1;case 10:case"end":return e.stop()}}),e)})))()},cancelGoods:function(){this.showlog=!1,this.isRunning=!1,this.$refs.goods_item_Logs.writeLog("------开始停止列表获取------",!1),Object(l["B"])(this.queryGoodsList)},categoryChange:function(t){if(t){var e=t.categoryList,a=e[e.length-1]||"";this.category=a&&a.category_id||""}this.categoryVisible=!1},getCategoryTbInfo:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var i,s,n,r,o,l,c,u,d,m,h,g;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(s=(null===t||void 0===t||null===(i=t.global_cat)||void 0===i?void 0:i.catid)||[],n=s[s.length-1]+"",r=e.categoryList["category_".concat(n)],r){a.next=23;break}return a.next=6,e.$appConfig.temporaryCacheInfo("get","category_".concat(n),"");case 6:if(o=a.sent,l=e.isJsonString(o),l&&"{}"!==o){a.next=22;break}return e.$appConfig.temporaryCacheInfo("save","category_".concat(n),"正在获取类目"),a.next=12,e.$commodityService.getCategoryTbInfo(e.country,n,"0","");case 12:c=a.sent,u=e.isJsonString(c),d=u.data,m=d&&d.categories&&d.categories[0]||"",h=m&&m.category_cn_name||"未匹配到类目",g=m&&m.category_name||"未匹配到类目",e.categoryList["category_".concat(n)]=h,e.$appConfig.temporaryCacheInfo("save","category_".concat(n),{category_name:g,category_cn_name:h}),a.next=23;break;case 22:e.categoryList["category_".concat(n)]=l["category_cn_name"];case 23:case"end":return a.stop()}}),a)})))()},queryGoodsList:function(t){var e=arguments,a=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var s,r,o,c,u,d,m,h,g,p,f,y,_,b,v,w,x,S;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:{count:1},console.log(t),r=t.mall_alias_name||t.platform_mall_name,i.prev=3,o=t.offset||0,c=0,c=0===o?1:Math.floor(o/100+1),u=a.searchParams.goodsCount<100&&a.searchParams.goodsCount||t.limit||100,d={mallId:t.platform_mall_id,offset:o,limit:u,is_ads:"0",need_brand:"0",need_item_model:"0"},a.searchParams.typeKey&&(d["search_type"]=a.searchParams.type,d["search_content"]=a.searchParams.typeKey),a.category&&(d["category_type"]="shopee",d["category"]=a.category),a.$refs.goods_item_Logs.writeLog("店铺【".concat(r,"】开始获取第").concat(c,"页商品列表"),!0),i.next=14,Object(l["A"])(1e3);case 14:return i.next=16,a.$shopeemanService.productSelector(t.country,d);case 16:m=i.sent,h=JSON.parse(m),g=JSON.parse(h.data),console.log("productSelectorJson",g),p=g.data&&g.data.item_list||[],f=g.data&&g.data.item_stock_price_infos||[],y=0,_=Object(n["a"])(p),i.prev=24,v=regeneratorRuntime.mark((function e(){var i,s,n,r,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(s=b.value,n=a.searchParams.filterNo||"",n=n.replaceAll("，",","),r=n&&n.split(","),!(s.price<a.searchParams.minPrice||s.price>a.searchParams.maxPrice||r.includes(s.itemid)||s.sold<a.searchParams.minSales||s.sold>a.searchParams.maxSales)){e.next=7;break}return++y,e.abrupt("return","continue");case 7:if(!a.isApplyCheck||!a.isNeedFilterAct){e.next=14;break}if(o=f.find((function(t){return t.item_id===s.itemid})),!o||!o.sku_stock_price_list[0]){e.next=14;break}if(l=o.sku_stock_price_list[0].price_info,!l.price_promotion_type){e.next=14;break}return++y,e.abrupt("return","continue");case 14:return e.next=16,a.getCategoryTbInfo(s);case 16:c=(null===s||void 0===s||null===(i=s.global_cat)||void 0===i?void 0:i.catid)||[],u=Object.assign(s,{platform_mall_id:t.platform_mall_id,platform_mall_name:t.platform_mall_name,mall_alias_name:t.mall_alias_name,categoryId:c[c.length-1]||"",country:t.country,style_id:t.id,imageList:s.images&&s.images.split(",")}),u&&a.goodsTable.push(u);case 19:case"end":return e.stop()}}),e)})),_.s();case 27:if((b=_.n()).done){i.next=34;break}return i.delegateYield(v(),"t0",29);case 29:if(w=i.t0,"continue"!==w){i.next=32;break}return i.abrupt("continue",32);case 32:i.next=27;break;case 34:i.next=39;break;case 36:i.prev=36,i.t1=i["catch"](24),_.e(i.t1);case 39:return i.prev=39,_.f(),i.finish(39);case 42:if(a.$refs.goods_item_Logs.writeLog("店铺【".concat(r,"】获取第").concat(c,"页商品列表成功，共商品").concat(p.length-y,"个"),!0),x=a.searchParams.goodsCount,o+=100,!(a.isRunning&&100===p.length&&o<x)){i.next=52;break}return S=x-o<100&&x-o||100,i.next=49,Object(l["d"])([Object.assign(t,{offset:o,limit:S})],a.queryGoodsList);case 49:console.log(a.goodsTable),i.next=55;break;case 52:a.$refs.goods_item_Logs.writeLog("店铺【".concat(r,"】获取商品列表结束"),!0),t.offset=0,t.limit=100;case 55:i.next=61;break;case 57:i.prev=57,i.t2=i["catch"](3),a.$refs.goods_item_Logs.writeLog("店铺【".concat(r,"】获取商品列表失败"),!1),console.log(i.t2);case 61:return i.prev=61,--s.count,i.finish(61);case 64:case"end":return i.stop()}}),i,null,[[3,57,61,64],[24,36,39,42]])})))()},handleSelectionChange:function(t){this.goodsSelect=t},changeGoodsItem:function(){this.$emit("changeGoodsItem",{goodsList:this.goodsSelect})},isJsonString:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}},d=u,m=(a("1028"),a("2877")),h=Object(m["a"])(d,i,s,!1,null,null,null);e["a"]=h.exports},1028:function(t,e,a){"use strict";a("a294")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},9772:function(t,e,a){},a294:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},eb09:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp contaniner"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(i+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[i],i)}},model:{value:t.categoryAction[i],callback:function(e){t.$set(t.categoryAction,i,e)},expression:"categoryAction[index]"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],n=a("1da1"),r=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[],isConfirmCategory:!1}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,r,o,l,c,u,d,m,h,g,p,f,y,_,b,v,w,x,S,C;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:-1,s=e.country||e.countryOption,n=[],e.categoryList.forEach((function(t,a){var i=t.find((function(t){return t.category_id===e.categoryAction[a]}));i&&n.push(i)})),!(e.goodsCurrent&&i<0)){a.next=17;break}if(r=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,o=e.goodsCurrent.platform||e.goodsCurrent.source,!r||!o){a.next=14;break}return l=[],e.attributesList.forEach((function(t){var e=t.new_options_obj.find((function(e){return e.value_id===t.options}));l.push({attributeId:t.attribute_id,attributeName:t.attribute_name,valueId:e.value_id,value:e.value})})),c={relationCategoryId:r,country:e.country,platformId:o,platformCategoryId:n[n.length-1].category_id,categoryAttributes:l},a.next=13,e.$commodityService.saveCategoryRelation(c);case 13:a.sent;case 14:e.$emit("categoryChange",{categoryList:n,attributesList:e.attributesList,country:s||e.countryOption}),a.next=58;break;case 17:return e.isConfirmCategory=!0,i=i<0?0:i,u=e.mallList[i],d=e.categoryAction[e.categoryAction.length-1],m={mallId:u.platform_mall_id,category_ids:d,brand_status:1,cursor:0,limit:100},a.next=24,e.$shopeemanService.getBrandList(s,m,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 24:if(h=a.sent,g=JSON.parse(h),!(g.status>=200&&g.status<=300)){a.next=56;break}if(p=JSON.parse(g.data),0!==p.code){a.next=53;break}return f=p.data&&p.data.list[0]&&p.data.list[0].brand_list,y=[],f.forEach((function(t){y.push({value:t.name,value_id:t.brand_id})})),_=[{category_id:d,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(y),attribute_label:"",is_key_attribute:1}],a.prev=33,a.next=36,e.$shopeemanService.getAttributeTree(s,m,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 36:b=a.sent,v=JSON.parse(b),w=JSON.parse(v.data),x=w&&w.data&&w.data.list[0]&&w.data.list[0].attribute_tree||[],x.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),_.push({category_id:d,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:s,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=46;break;case 43:a.prev=43,a.t0=a["catch"](33),console.log(a.t0);case 46:return a.prev=46,a.next=49,e.$commodityService.uploadCateGoryAttr(_);case 49:return S=a.sent,C=JSON.parse(S),200===C.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(46);case 53:e.$emit("categoryChange",""),a.next=58;break;case 56:return a.next=58,e.confirmCategory(++i);case 58:e.isConfirmCategory=!1;case 59:case"end":return a.stop()}}),a,null,[[33,43,46,53]])})))()},getAttribute:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,s,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",i=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(i,a);case 4:s=e.sent,n=JSON.parse(s),t.attributesList=[],200===n.code&&(r=n.data&&n.data.attributes||[],r.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),i=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(i)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,r,o,l,c,u,d,m,h,g,p,f,y,_;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:"0",s=t.length>1&&void 0!==t[1]?t[1]:0,n=t.length>2&&void 0!==t[2]?t[2]:null,r=t.length>3&&void 0!==t[3]?t[3]:"1",o=e.country||e.countryOption,0!==s||0!==e.attributesCurrent.length){a.next=20;break}if(e.categoryAction=n&&n.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId&&!e.goodsCurrent.goods_id){a.next=20;break}return e.categoryAction=[],u=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,d=e.goodsCurrent.platform||e.goodsCurrent.source,a.next=13,e.$commodityService.getCategoryRelation(u,o,d);case 13:m=a.sent,h=JSON.parse(m),e.attributesCurrent=h.data&&h.data.attributes||[],i=(null===h||void 0===h||null===(l=h.data)||void 0===l||null===(c=l.category)||void 0===c?void 0:c.platform_category_id)||i,console.log(h,i),r="0"===i&&r||0,!r&&e.categoryAction.unshift(i);case 20:if(!i){a.next=49;break}return g=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=24,e.$commodityService.getCategoryTbInfo(o,i,r);case 24:if(p=a.sent,f=JSON.parse(p),200!==f.code){a.next=47;break}if(y=f.data,console.log("categoryTbInfoData",y,e.categoryAction),0!==r){a.next=37;break}return _=(null===y||void 0===y?void 0:y.categories[0].parent_id)||0,_&&e.categoryAction.unshift(_),r=0===_?1:0,a.next=35,e.enterCategory(_+"",0,null,r);case 35:a.next=47;break;case 37:if(!y||!y.categories){a.next=45;break}return g[s]=y.categories,e.categoryList=g,e.categoryAction[s]=e.categoryAction[s]||g[s][0].category_id,a.next=43,e.enterCategory(e.categoryAction[s],++s);case 43:a.next=47;break;case 45:return a.next=47,e.getAttribute();case 47:a.next=51;break;case 49:return a.next=51,e.getAttribute(!0);case 51:case"end":return a.stop()}}),a)})))()}}}),o=r,l=(a("b0bd"),a("2877")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["a"]=c.exports},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],n=a("1da1"),r=a("b85c"),o=a("2909"),l=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var u={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new l["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?Object(o["a"])(this.groupIdList.map((function(t){return t.id}))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName;if(!this.isAShop){var s=e.includes(""),n=t.includes("");if(s!==n||e.toString()===t.toString()&&this.isShowNameAll)if(n&&(!i||i&&!this.isShowNameAll)){var l=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(o["a"])(l),Object(o["a"])(e)));this.site=Object(o["a"])(c),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var u=[];if(i){var d=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),m=d.length>this.site.length&&this.site||d,h=d.length>this.site.length&&d||this.site;u=new Set(this.site);var g,p=Object(r["a"])(h);try{for(p.s();!(g=p.n()).done;){var f=g.value;m.includes(f)&&u.delete(f)}}catch(y){p.e(y)}finally{p.f()}u.delete("")}this.site=Object(o["a"])(u)}else n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){a.changeMallList(),a.filterMall(i),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,r,l,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],i=e.countryVal,s=[],!(e.jsonMallData.length>0)){a.next=7;break}s=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:n=a.sent,s=JSON.parse(n)||[],e.jsonMallData=JSON.parse(n)||[];case 12:if(!(s.length>0)){a.next=17;break}1===t&&(e.siteList=""===i?s:s.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){s.forEach((function(a){i?t===a.group_id&&i===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return r={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(r);case 20:l=a.sent,200===l.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",l.data),c=l.data||[],e.siteList=c,e.jsonMallData=c,e.siteList=""===i?c:c.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:u=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=u.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&u.push({group_name:t.group_name,id:t.group_id})})),u.zzSort("id"),e.groupIdList=[].concat(Object(o["a"])(e.groupIdList),u),e.groupId=[""].concat(Object(o["a"])(u.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";if(this.isAShop){var i=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,e.push(i)}else this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},d=u,m=(a("8992"),a("2877")),h=Object(m["a"])(d,i,s,!1,null,null,null);e["a"]=h.exports}}]);