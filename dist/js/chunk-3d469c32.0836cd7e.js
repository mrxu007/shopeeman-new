(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d469c32"],{"01cd":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goods-item-selector"},[a("div",{staticClass:"goods-item-header"},[a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("el-select",{staticStyle:{"margin-right":"5px",width:"120px"},attrs:{size:"mini"},model:{value:t.searchParams.type,callback:function(e){t.$set(t.searchParams,"type",e)},expression:"searchParams.type"}},[a("el-option",{attrs:{value:0,label:"关键字"}}),a("el-option",{attrs:{value:1,label:"商品编号"}})],1),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.typeKey,callback:function(e){t.$set(t.searchParams,"typeKey",e)},expression:"searchParams.typeKey"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("排序：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.sort,callback:function(e){t.$set(t.searchParams,"sort",e)},expression:"searchParams.sort"}},[a("el-option",{attrs:{value:"",label:"默认排序"}}),a("el-option",{attrs:{value:"sales",label:"销量从低往高"}}),a("el-option",{attrs:{value:"-sales",label:"销量从高往低"}}),a("el-option",{attrs:{value:"price",label:"价格从低往高"}}),a("el-option",{attrs:{value:"-price",label:"价格从高往低"}})],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("价格区间：")]),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.minPrice,callback:function(e){t.$set(t.searchParams,"minPrice",e)},expression:"searchParams.minPrice"}}),a("div",{staticClass:"heng"}),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.maxPrice,callback:function(e){t.$set(t.searchParams,"maxPrice",e)},expression:"searchParams.maxPrice"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:function(e){t.categoryVisible=!0}}},[t._v("选择类目")]),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.queryGoods}},[t._v("查询商品")]),a("el-button",{attrs:{type:"",size:"mini"},on:{click:t.cancelGoods}},[t._v("取消查询")])],1),a("div",{staticClass:"header-list"},[a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"120px"}},[t._v("每一个店铺商品数量：")]),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.goodsCount,callback:function(e){t.$set(t.searchParams,"goodsCount",e)},expression:"searchParams.goodsCount"}})],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text"},[t._v("过滤商品编号：")]),a("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini"},model:{value:t.searchParams.filterNo,callback:function(e){t.$set(t.searchParams,"filterNo",e)},expression:"searchParams.filterNo"}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"不同商品id使用,号隔开",placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"text"}},[a("i",{staticClass:"el-icon-question",staticStyle:{padding:"0 2px"}})])],1)],1),a("div",{staticClass:"header-item"},[a("div",{staticClass:"item-text",staticStyle:{width:"72px"}},[t._v("销量区间：")]),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.minSales,callback:function(e){t.$set(t.searchParams,"minSales",e)},expression:"searchParams.minSales"}}),a("div",{staticClass:"heng"}),a("el-input",{staticClass:"input_width",attrs:{size:"mini"},model:{value:t.searchParams.maxSales,callback:function(e){t.$set(t.searchParams,"maxSales",e)},expression:"searchParams.maxSales"}})],1),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isRunning},on:{click:t.changeGoodsItem}},[t._v("添加已选商品")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{disabled:t.isRunning,size:"mini"},model:{value:t.isApplyCheck,callback:function(e){t.isApplyCheck=e},expression:"isApplyCheck"}},[t._v("仅显示适用商品 ")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("Logs",{ref:"goods_item_Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}}),a("div",{staticClass:"goods-item-table"},[a("u-table",{ref:"goodsTable",attrs:{height:"620px",data:t.goodsTable,"data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"big-data-checkbox":!0,border:!1,"use-virtual":""},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"center",type:"selection"}}),a("u-table-column",{attrs:{align:"center",type:"index",width:"80",label:"序号"}}),a("u-table-column",{attrs:{align:"center",label:"店铺名称",width:"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mall_alias_name||a.platform_mall_name))]}}])}),a("u-table-column",{attrs:{align:"center",label:"类目",width:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("p",{staticStyle:{"white-space":"normal"}},[t._v(t._s(t.getCategoryName(i.categoryId)))])]}}])}),a("u-table-column",{attrs:{align:"center",label:"主图",width:"80",prop:"Sales"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{staticStyle:{"justify-content":"center",display:"flex"}},[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[i["isImgShow"]?a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([i.imageList[0]])}}):a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:t._f("imageRender")([i.imageList[0],!0])}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:t._f("imageRender")([i.imageList[0],!0])},on:{mouseenter:function(t){i["isImgShow"]=!0}}})],1)],1)]}}])}),a("u-table-column",{attrs:{align:"center",label:"itemId",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.itemid))]}}])}),a("u-table-column",{attrs:{align:"center",label:"商品标题","min-width":"150",prop:"Price",fit:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("div",{staticClass:"goodsTableLine",staticStyle:{height:"60px","text-align":"left"}},[t._v(" "+t._s(i.name)+" ")])]}}])}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"库存",width:"100",prop:"stock","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"销量",width:"100",prop:"sold","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"center",sortable:"",label:"价格",width:"100",prop:"price","show-overflow-tooltip":""}})],1)],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,visible:t.categoryVisible,modal:!1},on:{"update:visible":function(e){t.categoryVisible=e}}},[t.categoryVisible?a("categoryMapping",{attrs:{"goods-current":{},"mall-list":t.mall},on:{categoryChange:t.categoryChange}}):t._e()],1)],1)],1)},r=[],n=a("b85c"),s=a("2909"),o=a("1da1"),l=(a("96cf"),a("d81d"),a("99af"),a("3ca3"),a("ddb0"),a("5b81"),a("ac1f"),a("1276"),a("caad"),a("2532"),a("7db0"),a("0e0b")),c=a("eb09"),u={name:"GoodsItemSelector",components:{categoryMapping:c["a"]},props:{mall:{type:Array,default:function(){return[]}},isNeedFilterAct:{type:Boolean,default:function(){return!1}}},data:function(){return{searchParams:{type:1,typeKey:"",sort:"",minPrice:"0",maxPrice:"999999",goodsCount:"1000",filterNo:"",minSales:"0",maxSales:"999999",createTime:""},goodsSelect:[],goodsTable:[],country:"",category:"",categoryList:{},isRunning:!1,isApplyCheck:!0,categoryVisible:!1,showlog:!0}},computed:{getCategoryName:function(){return function(t){var e=this.categoryList["category_".concat(t)];return e}}},mounted:function(){this.country=this.mall.country},methods:{queryGoods:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showlog=!1,t.$refs.goods_item_Logs.writeLog("------开始获取商品列表------",!0),t.isRunning=!0,t.goodsTable=[],a=Object(s["a"])(t.mall.map((function(t){return t["offset"]=0,t}))),e.next=7,Object(l["d"])(a,t.queryGoodsList);case 7:!t.isRunning&&t.$refs.goods_item_Logs.writeLog("------列表获取停止成功------",!1),t.$refs.goods_item_Logs.writeLog("------商品列表获取结束------",!0),t.isRunning=!1;case 10:case"end":return e.stop()}}),e)})))()},cancelGoods:function(){this.showlog=!1,this.isRunning=!1,this.$refs.goods_item_Logs.writeLog("------开始停止列表获取------",!1),Object(l["B"])(this.queryGoodsList)},categoryChange:function(t){if(t){var e=t.categoryList,a=e[e.length-1]||"";this.category=a&&a.category_id||""}this.categoryVisible=!1},getCategoryTbInfo:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var i,r,n,s,o,l,c,u,d,p,g,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=(null===t||void 0===t||null===(i=t.global_cat)||void 0===i?void 0:i.catid)||[],n=r[r.length-1]+"",s=e.categoryList["category_".concat(n)],s){a.next=23;break}return a.next=6,e.$appConfig.temporaryCacheInfo("get","category_".concat(n),"");case 6:if(o=a.sent,l=e.isJsonString(o),l&&"{}"!==o){a.next=22;break}return e.$appConfig.temporaryCacheInfo("save","category_".concat(n),"正在获取类目"),a.next=12,e.$commodityService.getCategoryTbInfo(e.country,n,"0","");case 12:c=a.sent,u=e.isJsonString(c),d=u.data,p=d&&d.categories&&d.categories[0]||"",g=p&&p.category_cn_name||"未匹配到类目",m=p&&p.category_name||"未匹配到类目",e.categoryList["category_".concat(n)]=g,e.$appConfig.temporaryCacheInfo("save","category_".concat(n),{category_name:m,category_cn_name:g}),a.next=23;break;case 22:e.categoryList["category_".concat(n)]=l["category_cn_name"];case 23:case"end":return a.stop()}}),a)})))()},queryGoodsList:function(t){var e=arguments,a=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var r,s,o,c,u,d,p,g,m,h,f,_,y,b,v,x,w,S;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return r=e.length>1&&void 0!==e[1]?e[1]:{count:1},s=t.mall_alias_name||t.platform_mall_name,i.prev=2,o=t.offset||0,c=0,c=0===o?1:Math.floor(o/100+1),u=a.searchParams.goodsCount<100&&a.searchParams.goodsCount||t.limit||100,d={mallId:t.platform_mall_id,offset:o,limit:u,is_ads:"0",need_brand:"0",need_item_model:"0"},a.searchParams.typeKey&&(d["search_type"]=a.searchParams.type,d["search_content"]=a.searchParams.typeKey),a.category&&(d["category_type"]="shopee",d["category"]=a.category),a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】开始获取第").concat(c,"页商品列表"),!0),i.next=13,Object(l["A"])(1e3);case 13:return i.next=15,a.$shopeemanService.productSelector(t.country,d);case 15:p=i.sent,g=JSON.parse(p),m=JSON.parse(g.data),h=m.data&&m.data.item_list||[],f=m.data&&m.data.item_stock_price_infos||[],_=0,y=Object(n["a"])(h),i.prev=22,v=regeneratorRuntime.mark((function e(){var i,r,n,s,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=b.value,n=a.searchParams.filterNo||"",n=n.replaceAll("，",","),s=n&&n.split(","),!(r.price<a.searchParams.minPrice||r.price>a.searchParams.maxPrice||s.includes(r.itemid)||r.sold<a.searchParams.minSales||r.sold>a.searchParams.maxSales)){e.next=7;break}return++_,e.abrupt("return","continue");case 7:if(!a.isApplyCheck||!a.isNeedFilterAct){e.next=14;break}if(o=f.find((function(t){return t.item_id===r.itemid})),!o||!o.sku_stock_price_list[0]){e.next=14;break}if(l=o.sku_stock_price_list[0].price_info,!l.price_promotion_type){e.next=14;break}return++_,e.abrupt("return","continue");case 14:return e.next=16,a.getCategoryTbInfo(r);case 16:c=(null===r||void 0===r||null===(i=r.global_cat)||void 0===i?void 0:i.catid)||[],u=Object.assign(r,{platform_mall_id:t.platform_mall_id,platform_mall_name:t.platform_mall_name,mall_alias_name:t.mall_alias_name,categoryId:c[c.length-1]||"",country:t.country,style_id:t.id,imageList:r.images&&r.images.split(",")}),u&&a.goodsTable.push(u);case 19:case"end":return e.stop()}}),e)})),y.s();case 25:if((b=y.n()).done){i.next=32;break}return i.delegateYield(v(),"t0",27);case 27:if(x=i.t0,"continue"!==x){i.next=30;break}return i.abrupt("continue",30);case 30:i.next=25;break;case 32:i.next=37;break;case 34:i.prev=34,i.t1=i["catch"](22),y.e(i.t1);case 37:return i.prev=37,y.f(),i.finish(37);case 40:if(a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取第").concat(c,"页商品列表成功，共商品").concat(h.length-_,"个"),!0),w=a.searchParams.goodsCount,o+=100,!(a.isRunning&&100===h.length&&o<w)){i.next=49;break}return S=w-o<100&&w-o||100,i.next=47,Object(l["d"])([Object.assign(t,{offset:o,limit:S})],a.queryGoodsList);case 47:i.next=52;break;case 49:a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取商品列表结束"),!0),t.offset=0,t.limit=100;case 52:i.next=57;break;case 54:i.prev=54,i.t2=i["catch"](2),a.$refs.goods_item_Logs.writeLog("店铺【".concat(s,"】获取商品列表失败"),!1);case 57:return i.prev=57,--r.count,i.finish(57);case 60:case"end":return i.stop()}}),i,null,[[2,54,57,60],[22,34,37,40]])})))()},handleSelectionChange:function(t){this.goodsSelect=t},changeGoodsItem:function(){this.$emit("changeGoodsItem",{goodsList:this.goodsSelect})},isJsonString:function(t){if("string"!==typeof t)return t;try{return JSON.parse(t),JSON.parse(t)}catch(e){return t}}}},d=u,p=(a("1028"),a("2877")),g=Object(p["a"])(d,i,r,!1,null,null,null);e["a"]=g.exports},1028:function(t,e,a){"use strict";a("a294")},"4c28":function(t,e,a){},"5a71":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},9772:function(t,e,a){},a294:function(t,e,a){},b0bd:function(t,e,a){"use strict";a("9772")},eb09:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-mapp contaniner"},[a("div",{staticClass:"category_dialog"},[a("div",{staticClass:"category_box"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?a("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):a("div",[a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box"},[a("div",{staticClass:"keepRight"},[t._v(t._s(i+1)+"级类目：")]),a("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[i],i)}},model:{value:t.categoryAction[i],callback:function(e){t.$set(t.categoryAction,i,e)},expression:"categoryAction[index]"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return a("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),a("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,i){return a("div",{key:i,staticClass:"on_new_dialog_box line_height_28"},[a("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),a("div",[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(a){t.$set(e,"options",a)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return a("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),a("el-button",{attrs:{size:"mini",disabled:t.isConfirmCategory},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),a("div",[t._v("属性值"),a("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],n=a("1da1"),s=(a("159b"),a("7db0"),a("b0c0"),a("c740"),a("a434"),a("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[],isConfirmCategory:!1}},watch:{countryOption:function(t){this.categoryList=[],this.enterCategory()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,r,n,s,o,l,c,u,d,p,g,m,h,f,_,y,b,v,x,w,S,C;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:-1,r=e.country||e.countryOption,n=[],e.categoryList.forEach((function(t,a){var i=t.find((function(t){return t.category_id===e.categoryAction[a]}));i&&n.push(i)})),!(e.goodsCurrent&&i<0)){a.next=17;break}if(s=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,o=e.goodsCurrent.platform||e.goodsCurrent.source,!s||!o){a.next=14;break}return l=[],e.attributesList.forEach((function(t){var e=t.new_options_obj.find((function(e){return e.value_id===t.options}));l.push({attributeId:t.attribute_id,attributeName:t.attribute_name,valueId:e.value_id,value:e.value})})),c={relationCategoryId:s,country:e.country,platformId:o,platformCategoryId:n[n.length-1].category_id,categoryAttributes:l},a.next=13,e.$commodityService.saveCategoryRelation(c);case 13:a.sent;case 14:e.$emit("categoryChange",{categoryList:n,attributesList:e.attributesList,country:r||e.countryOption}),a.next=57;break;case 17:return e.isConfirmCategory=!0,i=i<0?0:i,u=e.mallList[i],d=e.categoryAction[e.categoryAction.length-1],p={mallId:u.platform_mall_id,category_ids:d,brand_status:1,cursor:0,limit:100},a.next=24,e.$shopeemanService.getBrandList(r,p,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 24:if(g=a.sent,m=JSON.parse(g),!(m.status>=200&&m.status<=300)){a.next=55;break}if(h=JSON.parse(m.data),0!==h.code){a.next=52;break}return f=h.data&&h.data.list[0]&&h.data.list[0].brand_list,_=[],f.forEach((function(t){_.push({value:t.name,value_id:t.brand_id})})),y=[{category_id:d,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:r,options:JSON.stringify(_),attribute_label:"",is_key_attribute:1}],a.prev=33,a.next=36,e.$shopeemanService.getAttributeTree(r,p,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 36:b=a.sent,v=JSON.parse(b),x=JSON.parse(v.data),w=x&&x.data&&x.data.list[0]&&x.data.list[0].attribute_tree||[],w.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),y.push({category_id:d,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:r,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),a.next=45;break;case 43:a.prev=43,a.t0=a["catch"](33);case 45:return a.prev=45,a.next=48,e.$commodityService.uploadCateGoryAttr(y);case 48:return S=a.sent,C=JSON.parse(S),200===C.code?e.$message.success("同步成功"):e.$message.error("同步失败"),a.finish(45);case 52:e.$emit("categoryChange",""),a.next=57;break;case 55:return a.next=57,e.confirmCategory(++i);case 57:e.isConfirmCategory=!1;case 58:case"end":return a.stop()}}),a,null,[[33,43,45,52]])})))()},getAttribute:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",i=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(i,a);case 4:r=e.sent,n=JSON.parse(r),t.attributesList=[],200===n.code&&(s=n.data&&n.data.attributes||[],s.forEach((function(e){var a=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),i=t.attributesCurrent[a]&&t.attributesCurrent[a].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=a>-1&&parseInt(i)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,r,n,s,o,l,c,u,d,p,g,m,h,f,_,y;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:"0",r=t.length>1&&void 0!==t[1]?t[1]:0,n=t.length>2&&void 0!==t[2]?t[2]:null,s=t.length>3&&void 0!==t[3]?t[3]:"1",o=e.country||e.countryOption,0!==r||0!==e.attributesCurrent.length){a.next=19;break}if(e.categoryAction=n&&n.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId&&!e.goodsCurrent.goods_id){a.next=19;break}return e.categoryAction=[],u=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,d=e.goodsCurrent.platform||e.goodsCurrent.source,a.next=13,e.$commodityService.getCategoryRelation(u,o,d);case 13:p=a.sent,g=JSON.parse(p),e.attributesCurrent=g.data&&g.data.attributes||[],i=(null===g||void 0===g||null===(l=g.data)||void 0===l||null===(c=l.category)||void 0===c?void 0:c.platform_category_id)||i,s="0"===i&&s||0,!s&&e.categoryAction.unshift(i);case 19:if(!i){a.next=47;break}return m=JSON.parse(JSON.stringify(e.categoryList))||[],a.next=23,e.$commodityService.getCategoryTbInfo(o,i,s);case 23:if(h=a.sent,f=JSON.parse(h),200!==f.code){a.next=45;break}if(_=f.data,0!==s){a.next=35;break}return y=(null===_||void 0===_?void 0:_.categories[0].parent_id)||0,y&&e.categoryAction.unshift(y),s=0===y?1:0,a.next=33,e.enterCategory(y+"",0,null,s);case 33:a.next=45;break;case 35:if(!_||!_.categories){a.next=43;break}return m[r]=_.categories,e.categoryList=m,e.categoryAction[r]=e.categoryAction[r]||m[r][0].category_id,a.next=41,e.enterCategory(e.categoryAction[r],++r);case 41:a.next=45;break;case 43:return a.next=45,e.getAttribute();case 45:a.next=49;break;case 47:return a.next=49,e.getAttribute(!0);case 49:case"end":return a.stop()}}),a)})))()}}}),o=s,l=(a("b0bd"),a("2877")),c=Object(l["a"])(o,i,r,!1,null,null,null);e["a"]=c.exports},f4e2:function(t,e,a){"use strict";a("5a71")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",style:{width:t.inputWidth},attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId,!0)}}}),t._l(t.groupIdList,(function(e,i){return a("el-option",{key:i,attrs:{label:e.group_name,value:e.id},nativeOn:{click:function(e){return t.changeGroupSelect(t.groupId)}}})}))],2)],1),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showGrade<2,expression:"showGrade < 2"}],style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-popover",{attrs:{placement:"top",width:"180",trigger:"click"}},[t.tableShow?a("u-table",{ref:"zz_mall_select_all",staticClass:"zz_mall_select_all",attrs:{"tooltip-effect":"dark","show-header":!1,"row-height":34,border:!1,"big-data-checkbox":"","use-virtual":"","show-body-overflow":"","data-changes-scroll-top":!1,data:t.siteShowList,"max-height":"250","cell-style":{padding:"0px!important"}}},[a("u-table-column",{attrs:{align:"left","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"zz_mall_select_item",class:t.siteId.includes(e.row.platform_mall_id)&&"zz_mall_select_active",on:{click:function(a){return t.changeSiteSelect(e.row.platform_mall_id,!e.row.platform_mall_id)}}},[t._v(" "+t._s(e.row.mall_alias_name||e.row.platform_mall_name)+" ")])]}}],null,!1,749083916)})],1):t._e(),a("div",{staticClass:"zz_mall_select_input",style:{width:t.inputWidth},attrs:{slot:"reference"},on:{click:t.goTableShowTop},slot:"reference"},[t.site.length?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v(" "+t._s(t.site[0].mall_alias_name||t.site[0].platform_mall_name)+" ")]):t._e(),t.site.length>1?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("+"+t._s(t.site.length-1))]):t._e(),a("el-input",{attrs:{size:"mini",clearable:""},on:{input:t.searchInput},model:{value:t.searchSite,callback:function(e){t.searchSite=e},expression:"searchSite"}})],1)],1)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v(" 　刷　　新　 ")])],1):t._e()])])},r=[],n=a("1da1"),s=a("2909"),o=(a("96cf"),a("a9e3"),a("caad"),a("2532"),a("99af"),a("d81d"),a("fb6a"),a("4de4"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("c740"),a("a434"),a("25f0"),a("7db0"),a("7646")),l={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},inputWidth:{type:String,default:"180px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}},showGrade:{type:Number,default:function(){return 0}}},data:function(){return{countryVal:null,groupId:[],groupIdList:[],allSiteList:[],site:[],siteId:[],siteList:[],siteShowList:[],tableShow:!0,searchSite:"",countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},deep:!0}},mounted:function(){this.countryVal=!this.isAll&&this.parentCountry||""},methods:{reset:function(){this.groupId=[],this.groupIdList=[],this.getMallGoodsGetMallList(1)},changeGroupSelect:function(t,e){e?t.includes("")?this.groupId=[""].concat(Object(s["a"])(this.groupIdList.map((function(t){return t.id})))):this.groupId=[]:t.includes("")||t.length!==this.groupIdList.length?t.includes("")&&t.length===this.groupIdList.length&&(this.groupId=t.slice(1)):this.groupId.unshift(""),this.getMallGoodsGetMallList(2)},getMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,r,n,o,l,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.searchSite="",1!==t){a.next=10;break}return i=e.countryVal,a.next=5,e.mallListAPIInstance.ddMallGoodsGetMallList();case 5:r=a.sent,200===r.code?(n=r.data||[],e.isAShop||n.unshift({platform_mall_name:"全部",platform_mall_id:""}),e.allSiteList=""===i?n:n.filter((function(t){return(null===t||void 0===t?void 0:t.country)===i||!t.platform_mall_id})),e.siteList=e.allSiteList):e.$message.error("获取分组、店铺列表失败"),0===e.groupIdList.length&&(o=new Set(e.siteList.map((function(t){if(t.group_id)return JSON.stringify({group_name:t.group_name,id:t.group_id})}))),o.delete(void 0),l=Object(s["a"])(o),c=l.map((function(t){return JSON.parse(t)})),c.zzSort("id"),e.groupIdList=Object(s["a"])(c),e.groupId=[""].concat(Object(s["a"])(c.map((function(t){return t.id}))))),a.next=13;break;case 10:u=[],u=""===e.groupId[0]?e.allSiteList:e.allSiteList.filter((function(t){if(e.groupId.includes(t.group_id)||!t.platform_mall_id)return t})),e.siteList=u;case 13:e.siteId=[],e.changeSiteSelect("",!0);case 15:case"end":return a.stop()}}),a)})))()},changeSiteSelect:function(t,e){var a=this.searchSite,i=this.siteId;if(this.isAShop)this.siteId=[t];else{if(e)if(a){var r=this.siteShowList.map((function(t){return t.platform_mall_id}));if(i.includes(t))i=i.filter((function(t){return!r.includes(t)}));else{var n=new Set([""].concat(Object(s["a"])(i),Object(s["a"])(r)));i=Object(s["a"])(n)}}else i=i.includes(t)?[]:this.siteList.map((function(t){return t.platform_mall_id}));else{var o=i.findIndex((function(e){return e===t}));if(o>-1)i.splice(o,1),i.includes("")&&i.splice(0,1);else if(i.push(t),a){var l,c=this.siteShowList.filter((function(t){return i.includes(t.platform_mall_id)}));i.includes("")||(null===(l=this.siteShowList)||void 0===l?void 0:l.length)!==c.length+1||i.unshift("")}else{var u;i.includes("")||(null===(u=this.siteList)||void 0===u?void 0:u.length)!==i.length+1||i.unshift("")}}this.siteId=i}this.changeMallList()},changeMallList:function(){var t=[],e="",a=this.siteId;if(this.isAShop){a=a[0];var i=this.siteList.find((function(t){return t.platform_mall_id===a}));e=a,t.push(i)}else this.site=this.siteList.filter((function(t){return a.includes(t.platform_mall_id)})),a.length&&""===a[0]?(a=a.slice(1),t=this.site.slice(1)):t=this.site,e=this.groupId.includes("")&&a.length===this.siteList.length-1?"":a.toString();this.source?this.$emit("changeMallList",{mallList:t,groupIdList:this.groupId,source:this.source,searchAll:e,country:this.countryVal.toLocaleUpperCase()}):(t["country"]=this.countryVal,this.$emit("changeMallList",t))},searchInput:function(){var t=this;this.searchSetTime&&clearTimeout(this.searchSetTime),this.searchSetTime=null,this.searchSetTime=setTimeout((function(){var e=t.siteList.filter((function(e){var a=!0;if(t.searchSite&&e.platform_mall_id){var i=e.mall_alias_name||e.platform_mall_name;a=i.includes(t.searchSite)}return a}));t.siteShowList=e,t.tableShow=!1,t.$nextTick((function(){t.tableShow=!0}))}),500)},goTableShowTop:function(){var t=this;this.tableShow=!1,this.$nextTick((function(){t.tableShow=!0}))}}},c=l,u=(a("8992"),a("f4e2"),a("2877")),d=Object(u["a"])(c,i,r,!1,null,"7cb8233b",null);e["a"]=d.exports}}]);