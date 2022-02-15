(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-540e590d"],{"01cd":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goods-item-selector"},[a("div",{staticClass:"goods-item-header"},[a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("el-select",{staticStyle:{"margin-right":"5px",width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.type,callback:function(e){t.$set(t.searchParams,"type",e)},expression:"searchParams.type"}},[a("el-option",{attrs:{value:0,label:"关键字"}}),a("el-option",{attrs:{value:1,label:"商品编号"}})],1),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.typeKey,callback:function(e){t.$set(t.searchParams,"typeKey",e)},expression:"searchParams.typeKey"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("排序：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.sort,callback:function(e){t.$set(t.searchParams,"sort",e)},expression:"searchParams.sort"}},[a("el-option",{attrs:{value:"",label:"默认排序"}}),a("el-option",{attrs:{value:"sales",label:"销量从低往高"}}),a("el-option",{attrs:{value:"-sales",label:"销量从高往低"}}),a("el-option",{attrs:{value:"price",label:"价格从低往高"}}),a("el-option",{attrs:{value:"-price",label:"价格从高往低"}})],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("价格区间：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.minPrice,callback:function(e){t.$set(t.searchParams,"minPrice",e)},expression:"searchParams.minPrice"}}),a("div",{staticClass:"heng"}),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.maxPrice,callback:function(e){t.$set(t.searchParams,"maxPrice",e)},expression:"searchParams.maxPrice"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:function(e){t.categoryVisible=!0}}},[t._v("选择类目")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.queryGoods}},[t._v("查询商品")]),a("el-button",{attrs:{type:"",size:"mini"},on:{click:t.cancelGoods}},[t._v("取消查询")])],1),a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"120px"}},[t._v("每一个店铺商品数量：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.goodsCount,callback:function(e){t.$set(t.searchParams,"goodsCount",e)},expression:"searchParams.goodsCount"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("过滤商品编号：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.filterNo,callback:function(e){t.$set(t.searchParams,"filterNo",e)},expression:"searchParams.filterNo"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"不同商品id使用,号隔开",placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"text"}},[a("i",{staticClass:"el-icon-question",staticStyle:{padding:"0 2px"}})])],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"72px"}},[t._v("销量区间：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.minSales,callback:function(e){t.$set(t.searchParams,"minSales",e)},expression:"searchParams.minSales"}}),a("div",{staticClass:"heng"}),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.maxSales,callback:function(e){t.$set(t.searchParams,"maxSales",e)},expression:"searchParams.maxSales"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.changeGoodsItem}},[t._v("添加已选商品")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{disabled:t.isRunning,size:"mini"},model:{value:t.isApplyCheck,callback:function(e){t.isApplyCheck=e},expression:"isApplyCheck"}},[t._v("仅显示适用商品 ")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("Logs",{ref:"goods_item_Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}}),a("div",{staticClass:"goods-item-table"},[a("u-table",{ref:"goodsTable",attrs:{height:"620px",data:t.goodsTable,"data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"big-data-checkbox":!0,border:!1,"use-virtual":""},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"center",type:"selection"}}),a("u-table-column",{attrs:{align:"center",type:"index",width:"80",label:"序号"}}),a("u-table-column",{attrs:{align:"center",label:"店铺名称",width:"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name||a.platform_mall_name))]}}])}),a("u-table-column",{attrs:{align:"center",label:"类目",width:""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("p",{staticStyle:{"white-space":"normal"}},[t._v(t._s(t.getCategoryName(r.categoryId)))])]}}])}),a("u-table-column",{attrs:{align:"center",label:"主图",width:"80",prop:"Sales"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticStyle:{"justify-content":"center",display:"flex"}},[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[r["isImgShow"]?a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([r.imageList[0]])}}):a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([r.imageList[0],!0])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("imageRender")([r.imageList[0],!0])},on:{mouseenter:function(t){r["isImgShow"]=!0}}})],1)],1)]}}])}),a("u-table-column",{attrs:{align:"center",label:"itemId",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.itemid))]}}])}),a("u-table-column",{attrs:{align:"center",label:"商品标题","min-width":"150",prop:"Price",fit:""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("div",{staticClass:"goodsTableLine",staticStyle:{height:"60px","text-align":"left"}},[t._v(" "+t._s(r.name)+" ")])]}}])}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"库存",width:"100",prop:"stock","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"销量",width:"100",prop:"sold","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"价格",width:"100",prop:"price","show-overflow-tooltip":""}})],1)],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible,modal:!1},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{"goods-current":{},"mall-list":t.mall},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},i=[],n=a("b85c"),s=a("2909"),o=a("1da1"),c=(a("96cf"),a("d81d"),a("99af"),a("3ca3"),a("ddb0"),a("5b81"),a("ac1f"),a("1276"),a("caad"),a("2532"),a("7db0"),a("0e0b")),l=a("eb09"),u={name:"GoodsItemSelector",components:{categoryMapping:l["a"]},props:{mall:{type:Array,default:function(){return[]}},isNeedFilterAct:{type:Boolean,default:function(){return!1}}},data:function(){return{searchParams:{type:1,typeKey:"",sort:"",minPrice:"0",maxPrice:"999999",goodsCount:"1000",filterNo:"",minSales:"0",maxSales:"999999"},goodsSelect:[],goodsTable:[],country:"",category:"",categoryList:{},isRunning:!1,isApplyCheck:!0,categoryVisible:!1,showlog:!0}},computed:{getCategoryName:function(){return function(t){var e=this.categoryList["category_".concat(t)];return e}}},watch:{},mounted:function(){this.country=this.mall.country},methods:{queryGoods:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showlog=!1,t.$refs.goods_item_Logs.writeLog("------开始获取商品列表------",!0),t.isRunning=!0,t.goodsTable=[],a=Object(s["a"])(t.mall.map((function(t){return t["offset"]=0,t}))),e.next=7,Object(c["c"])(a,t.queryGoodsList);case 7:!t.isRunning&&t.$refs.goods_item_Logs.writeLog("------列表获取停止成功------",!1),t.$refs.goods_item_Logs.writeLog("------商品列表获取结束------",!0),t.isRunning=!1;case 10:case"end":return e.stop()}}),e)})))()},cancelGoods:function(){this.showlog=!1,this.isRunning=!1,this.$refs.goods_item_Logs.writeLog("------开始停止列表获取------",!1),Object(c["z"])(this.queryGoodsList)},categoryChange:function(t){if(t){var e=t.categoryList,a=e[e.length-1]||"";this.category=a&&a.category_id||""}this.categoryVisible=!1},getCategoryTbInfo:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,i,n,s,o,c,l,u,d,g,m,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=(null===t||void 0===t||null===(r=t.global_cat)||void 0===r?void 0:r.catid)||[],n=i[i.length-1]+"",s=e.categoryList["category_".concat(n)],s){a.next=23;break}return a.next=6,e.$appConfig.temporaryCacheInfo("get","category_".concat(n),"");case 6:if(o=a.sent,c=e.isJsonString(o),c&&"{}"!==o){a.next=22;break}return e.$appConfig.temporaryCacheInfo("save","category_".concat(n),"正在获取类目"),a.next=12,e.$commodityService.getCategoryTbInfo(e.country,n,"0","");case 12:l=a.sent,u=e.isJsonString(l),d=u.data,g=d&&d.categories&&d.categories[0]||"",m=g&&g.category_cn_name||"未匹配到类目",p=g&&g.category_name||"未匹配到类目",e.categoryList["category_".concat(n)]=m,e.$appConfig.temporaryCacheInfo("save","category_".concat(n),{category_name:p,category_cn_name:m}),a.next=23;break;case 22:e.categoryList["category_".concat(n)]=c["category_cn_name"];case 23:case"end":return a.stop()}}),a)})))()},queryGoodsList:function(t){var e=arguments,a=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var i,s,o,l,u,d,g,m,p,y,h,f,_,b,v,x,C,w;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:{count:1},s=t.mall_alias_name||t.platform_mall_name,r.prev=2,o=t.offset||0,l=0,l=0===o?1:Math.floor(o/100+1),u=a.searchParams.goodsCount<100&&a.searchParams.goodsCount||t.limit||100,d={mallId:t.platform_mall_id,offset:o,limit:u,is_ads:"0",need_brand:"0",need_item_model:"0"},a.searchParams.typeKey&&(d["search_type"]=a.searchParams.type,d["search_content"]=a.searchParams.typeKey),a.category&&(d["category_type"]="shopee",d["category"]=a.category),a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】开始获取第").concat(l,"页商品列表"),!0),r.next=13,Object(c["y"])(1e3);case 13:return r.next=15,a.$shopeemanService.productSelector(t.country,d);case 15:g=r.sent,m=JSON.parse(g),p=JSON.parse(m.data),y=p.data&&p.data.item_list||[],h=p.data&&p.data.item_stock_price_infos||[],f=0,_=Object(n["a"])(y),r.prev=22,v=regeneratorRuntime.mark((function e(){var r,i,n,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i=b.value,n=a.searchParams.filterNo||"",n=n.replaceAll("，",","),s=n&&n.split(","),!(i.price<a.searchParams.minPrice||i.price>a.searchParams.maxPrice||s.includes(i.itemid)||i.sold<a.searchParams.minSales||i.sold>a.searchParams.maxSales)){e.next=7;break}return++f,e.abrupt("return","continue");case 7:if(!a.isApplyCheck||!a.isNeedFilterAct){e.next=14;break}if(o=h.find((function(t){return t.item_id===i.itemid})),!o||!o.sku_stock_price_list[0]){e.next=14;break}if(c=o.sku_stock_price_list[0].price_info,!c.price_promotion_type){e.next=14;break}return++f,e.abrupt("return","continue");case 14:return e.next=16,a.getCategoryTbInfo(i);case 16:l=(null===i||void 0===i||null===(r=i.global_cat)||void 0===r?void 0:r.catid)||[],u=Object.assign(i,{platform_mall_id:t.platform_mall_id,platform_mall_name:t.platform_mall_name,mall_alias_name:t.mall_alias_name,categoryId:l[l.length-1]||"",country:t.country,style_id:t.id,imageList:i.images&&i.images.split(",")}),u&&a.goodsTable.push(u);case 19:case"end":return e.stop()}}),e)})),_.s();case 25:if((b=_.n()).done){r.next=32;break}return r.delegateYield(v(),"t0",27);case 27:if(x=r.t0,"continue"!==x){r.next=30;break}return r.abrupt("continue",30);case 30:r.next=25;break;case 32:r.next=37;break;case 34:r.prev=34,r.t1=r["catch"](22),_.e(r.t1);case 37:return r.prev=37,_.f(),r.finish(37);case 40:if(a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取第").concat(l,"页商品列表成功，共商品").concat(y.length-f,"个"),!0),C=a.searchParams.goodsCount,o+=100,!(a.isRunning&&100===y.length&&o<C)){r.next=49;break}return w=C-o<100&&C-o||100,r.next=47,Object(c["c"])([Object.assign(t,{offset:o,limit:w})],a.queryGoodsList);case 47:r.next=52;break;case 49:a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取商品列表结束"),!0),t.offset=0,t.limit=100;case 52:r.next=57;break;case 54:r.prev=54,r.t2=r["catch"](2),a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取商品列表失败"),!1);case 57:return r.prev=57,--i.count,r.finish(57);case 60:case"end":return r.stop()}}),r,null,[[2,54,57,60],[22,34,37,40]])})))()},handleSelectionChange:function(t){this.goodsSelect=t},changeGoodsItem:function(){this.$emit("changeGoodsItem",{goodsList:this.goodsSelect})},isJsonString:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}},d=u,g=(a("1028"),a("2877")),m=Object(g["a"])(d,r,i,!1,null,null,null);e["a"]=m.exports},1028:function(t,e,a){"use strict";a("a294")},9772:function(t,e,a){},a294:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},eb09:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp contaniner"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,r){return a("div",{key:r,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(r+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[r],r)}},model:{value:t.categoryAction[r],callback:function(e){t.$set(t.categoryAction,r,e)},expression:"categoryAction[index]"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,r){return a("div",{key:r,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],n=a("1da1"),s=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[]}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,i,n,s,o,c,l,u,d,g,m,p,y,h,f,_,b,v,x,C,w,k;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.length>0&&void 0!==t[0]?t[0]:-1,i=e.country||e.countryOption,n=[],e.categoryList.forEach((function(t,a){var r=t.find((function(t){return t.category_id===e.categoryAction[a]}));r&&n.push(r)})),!(e.goodsCurrent&&r<0)){a.next=17;break}if(s=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,o=e.goodsCurrent.platform||e.goodsCurrent.source,!s||!o){a.next=14;break}return c=[],e.attributesList.forEach((function(t){var e=t.new_options_obj.find((function(e){return e.value_id===t.options}));c.push({attributeId:t.attribute_id,attributeName:t.attribute_name,valueId:e.value_id,value:e.value})})),l={relationCategoryId:s,country:e.country,platformId:o,platformCategoryId:n[n.length-1].category_id,categoryAttributes:c},a.next=13,e.$commodityService.saveCategoryRelation(l);case 13:a.sent;case 14:e.$emit("categoryChange",{categoryList:n,attributesList:e.attributesList,country:i||e.countryOption}),a.next=56;break;case 17:return r=r<0?0:r,u=e.mallList[r],d=e.categoryAction[e.categoryAction.length-1],g={mallId:u.platform_mall_id,category_ids:d,brand_status:1,cursor:0,limit:100},a.next=23,e.$shopeemanService.getBrandList(i,g,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 23:if(m=a.sent,p=JSON.parse(m),!(p.status>=200&&p.status<=300)){a.next=54;break}if(y=JSON.parse(p.data),0!==y.code){a.next=51;break}return h=y.data&&y.data.list[0]&&y.data.list[0].brand_list,f=[],h.forEach((function(t){f.push({value:t.name,value_id:t.brand_id})})),_=[{category_id:d,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:i,options:JSON.stringify(f),attribute_label:"",is_key_attribute:1}],a.prev=32,a.next=35,e.$shopeemanService.getAttributeTree(i,g,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 35:b=a.sent,v=JSON.parse(b),x=JSON.parse(v.data),C=x&&x.data&&x.data.list[0]&&x.data.list[0].attribute_tree||[],C.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),_.push({category_id:d,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:i,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=44;break;case 42:a.prev=42,a.t0=a["catch"](32);case 44:return a.prev=44,a.next=47,e.$commodityService.uploadCateGoryAttr(_);case 47:return w=a.sent,k=JSON.parse(w),200===k.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(44);case 51:e.$emit("categoryChange",""),a.next=56;break;case 54:return a.next=56,e.confirmCategory(++r);case 56:case"end":return a.stop()}}),a,null,[[32,42,44,51]])})))()},getAttribute:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r,i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",r=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(r,a);case 4:i=e.sent,n=JSON.parse(i),t.attributesList=[],200===n.code&&(s=n.data&&n.data.attributes||[],s.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),r=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(r)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,i,n,s,o,c,l,u,d,g,m,p,y,h,f,_;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.length>0&&void 0!==t[0]?t[0]:"0",i=t.length>1&&void 0!==t[1]?t[1]:0,n=t.length>2&&void 0!==t[2]?t[2]:null,s=t.length>3&&void 0!==t[3]?t[3]:"1",o=e.country||e.countryOption,0!==i||0!==e.attributesCurrent.length){a.next=19;break}if(e.categoryAction=n&&n.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId&&!e.goodsCurrent.goods_id){a.next=19;break}return e.categoryAction=[],u=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,d=e.goodsCurrent.platform||e.goodsCurrent.source,a.next=13,e.$commodityService.getCategoryRelation(u,o,d);case 13:g=a.sent,m=JSON.parse(g),e.attributesCurrent=m.data&&m.data.attributes||[],r=(null===m||void 0===m||null===(c=m.data)||void 0===c||null===(l=c.category)||void 0===l?void 0:l.platform_category_id)||r,s="0"===r&&s||0,!s&&e.categoryAction.unshift(r);case 19:if(!r){a.next=47;break}return p=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=23,e.$commodityService.getCategoryTbInfo(o,r,s);case 23:if(y=a.sent,h=JSON.parse(y),200!==h.code){a.next=45;break}if(f=h.data,0!==s){a.next=35;break}return _=(null===f||void 0===f?void 0:f.categories[0].parent_id)||0,_&&e.categoryAction.unshift(_),s=0===_?1:0,a.next=33,e.enterCategory(_+"",0,null,s);case 33:a.next=45;break;case 35:if(!f||!f.categories){a.next=43;break}return p[i]=f.categories,e.categoryList=p,e.categoryAction[i]=e.categoryAction[i]||p[i][0].category_id,a.next=41,e.enterCategory(e.categoryAction[i],++i);case 41:a.next=45;break;case 43:return a.next=45,e.getAttribute();case 45:a.next=49;break;case 47:return a.next=49,e.getAttribute(!0);case 49:case"end":return a.stop()}}),a)})))()}}}),o=s,c=(a("b0bd"),a("2877")),l=Object(c["a"])(o,r,i,!1,null,null,null);e["a"]=l.exports}}]);