(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2138e555"],{"2b22":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"goods_tag_dialog"},[n("div",{staticClass:"on_new_dialog_box"},[n("div",[t._v("商品标签：")]),n("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini"},model:{value:t.goodsTagAction,callback:function(e){t.goodsTagAction=e},expression:"goodsTagAction"}},t._l(t.goodsTagList,(function(e,a){return n("el-option",{key:e.id,attrs:{value:e.label_name}},[n("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[n("div",[t._v(t._s(e.label_name))]),n("i",{staticClass:"el-icon-circle-close close-right",on:{click:function(n){return n.stopPropagation(),t.deleteClick(e.id,a)}}})])])})),1)],1),n("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"10px"}},[n("div",[t._v("当前标签：")]),n("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini"},model:{value:t.goodsTagCurrent,callback:function(e){t.goodsTagCurrent=e},expression:"goodsTagCurrent"}})],1),n("div",{staticClass:"on_new_dialog_box",staticStyle:{"justify-content":"space-evenly","margin-top":"10px"}},[n("el-button",{attrs:{type:"primary",size:"mini",loading:t.loadingBut},on:{click:t.updateGoodsTag}},[t._v("　确　定　")]),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.$emit("goodsTagChange","")}}},[t._v("　取　消　")])],1)])},r=[],o=n("2909"),i=n("1da1"),s=(n("7db0"),n("d81d"),n("a434"),n("96cf"),n("0e0b"),{name:"GoodsLabel",props:{goodsTableSelect:{type:Array,default:function(){return[]}}},data:function(){return{goodsTagList:[],goodsTagAction:"",goodsTagCurrent:"",loadingBut:!1}},watch:{goodsTagAction:function(t){this.goodsTagCurrent=t}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterGoodsTag();case 2:case"end":return e.stop()}}),e)})))()},methods:{updateGoodsTag:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i,s,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.loadingBut=!0,t.goodsTagCurrent===t.goodsTagAction){e.next=19;break}return e.next=4,t.$commodityService.addGoodsTag(t.goodsTagCurrent);case 4:if(n=e.sent,a=JSON.parse(n),200!==a.code){e.next=16;break}return e.next=9,t.$commodityService.getGoodsTagList();case 9:r=e.sent,i=JSON.parse(r),t.goodsTagList=i.data||[],t.$appConfig.temporaryCacheInfo("save","goodsLabelList",i.data),t.goodsTagAction=t.goodsTagCurrent,e.next=19;break;case 16:return t.loadingBut=!1,t.$message.error("商品标签设置失败"),e.abrupt("return");case 19:return s=t.goodsTagList.find((function(e){return e.label_name===t.goodsTagAction})),c=Object(o["a"])(t.goodsTableSelect.map((function(t){return t.id}))),e.next=23,t.$commodityService.addGoodsToTag(s.id,c);case 23:e.sent,t.loadingBut=!1,t.$emit("goodsTagChange",{category:s,goodsTagList:t.goodsTagList});case 26:case"end":return e.stop()}}),e)})))()},enterGoodsTag:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$appConfig.temporaryCacheInfo("get","goodsLabelList","");case 2:if(n=e.sent,"{}"===n){e.next=8;break}a=JSON.parse(n),a&&a.length>0&&(t.goodsTagList=a||[]),e.next=14;break;case 8:return e.next=10,t.$commodityService.getGoodsTagList();case 10:r=e.sent,o=JSON.parse(r),t.goodsTagList=o.data||[],t.$appConfig.temporaryCacheInfo("save","goodsLabelList",t.goodsTagList);case 14:t.goodsTagAction=t.goodsTagList[0].label_name,t.goodsTagCurrent=t.goodsTagList[0].label_name;case 16:case"end":return e.stop()}}),e)})))()},deleteClick:function(t,e){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.goodsTagList.splice(e,1),n.$commodityService.deleteGoodsTag([t]),a.next=4,n.$commodityService.getGoodsTagList();case 4:r=a.sent,o=JSON.parse(r),n.goodsTagList=o.data||[],n.$appConfig.temporaryCacheInfo("save","goodsLabelList",n.goodsTagList);case 8:case"end":return a.stop()}}),a)})))()}}}),c=s,u=n("2877"),d=Object(u["a"])(c,a,r,!1,null,"b51227f0",null);e["a"]=d.exports},9772:function(t,e,n){},b0bd:function(t,e,n){"use strict";n("9772")},eb09:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"category-mapp contaniner"},[n("div",{staticClass:"category_dialog"},[n("div",{staticClass:"category_box"},[n("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[n("div",{staticClass:"keepRight"},[t._v("店铺站点：")]),t.country?n("div",[t._v(t._s(t._f("chineseSite")(t.country)))]):n("div",[n("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return n("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)]),t._l(t.categoryList,(function(e,a){return n("div",{key:a,staticClass:"on_new_dialog_box"},[n("div",{staticClass:"keepRight"},[t._v(t._s(a+1)+"级类目：")]),n("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",filterable:""},on:{change:function(e){return t.setCategory(t.categoryAction[a],a)}},model:{value:t.categoryAction[a],callback:function(e){t.$set(t.categoryAction,a,e)},expression:"categoryAction[index]"}},[n("el-option",{attrs:{value:"",label:"全部"}}),t._l(e,(function(t){return n("el-option",{key:t.id,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1)}))],2),n("div",{staticClass:"category_box",staticStyle:{"margin-left":"20px"}},[t._m(0),t._l(t.attributesList,(function(e,a){return n("div",{key:a,staticClass:"on_new_dialog_box line_height_28"},[n("div",{staticClass:"width_single_150"},[t._v(t._s(e.attribute_name)+"("+t._s(e.attribute_cn_name)+")")]),n("div",[n("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini",filterable:""},model:{value:e.options,callback:function(n){t.$set(e,"options",n)},expression:"item.options"}},t._l(e.new_options_obj,(function(t){return n("el-option",{key:t.value_id,attrs:{label:t.value,value:t.value_id}})})),1)],1)])}))],2)]),n("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-top":"25px","justify-content":"space-evenly"}},[t.mallList[0]?n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory(0)}}},[t._v("　刷　新　")]):t._e(),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.confirmCategory()}}},[t._v("　确　定　")]),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.$emit("categoryChange","")}}},[t._v("　取　消　")])],1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[n("div",{staticClass:"width_single_150"},[t._v("属性名称：")]),n("div",[t._v("属性值"),n("span",{staticStyle:{color:"red"}},[t._v("(必填)")])])])}],o=n("1da1"),i=(n("159b"),n("7db0"),n("b0c0"),n("c740"),n("a434"),n("96cf"),{name:"category-mapping",props:{country:{type:String,default:function(){return""}},goodsCurrent:{type:Object,default:function(){return{}}},mallList:{type:Array,default:function(){return[]}}},data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",categoryAction:[],attributesCurrent:[],categoryList:[],attributesList:[]}},watch:{countryOption:function(t){this.enterCategory()}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.enterCategory();case 2:case"end":return e.stop()}}),e)})))()},methods:{confirmCategory:function(){var t=arguments,e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,r,o,i,s,c,u,d,g,l,p,y,_,b,m,f,v,h,C,x,T,k;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.length>0&&void 0!==t[0]?t[0]:-1,r=e.country||e.countryOption,o=[],e.categoryList.forEach((function(t,n){var a=t.find((function(t){return t.category_id===e.categoryAction[n]}));a&&o.push(a)})),!(e.goodsCurrent&&a<0)){n.next=17;break}if(i=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,s=e.goodsCurrent.platform||e.goodsCurrent.source,!i||!s){n.next=14;break}return c=[],e.attributesList.forEach((function(t){var e=t.new_options_obj.find((function(e){return e.value_id===t.options}));c.push({attributeId:t.attribute_id,attributeName:t.attribute_name,valueId:e.value_id,value:e.value})})),u={relationCategoryId:i,country:e.country,platformId:s,platformCategoryId:o[o.length-1].category_id,categoryAttributes:c},n.next=13,e.$commodityService.saveCategoryRelation(u);case 13:n.sent;case 14:e.$emit("categoryChange",{categoryList:o,attributesList:e.attributesList,country:r||e.countryOption}),n.next=56;break;case 17:return a=a<0?0:a,d=e.mallList[a],g=e.categoryAction[e.categoryAction.length-1],l={mallId:d.platform_mall_id,category_ids:g,brand_status:1,cursor:0,limit:100},n.next=23,e.$shopeemanService.getBrandList(r,l,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 23:if(p=n.sent,y=JSON.parse(p),!(y.status>=200&&y.status<=300)){n.next=54;break}if(_=JSON.parse(y.data),0!==_.code){n.next=51;break}return b=_.data&&_.data.list[0]&&_.data.list[0].brand_list,m=[],b.forEach((function(t){m.push({value:t.name,value_id:t.brand_id})})),f=[{category_id:g,attribute_id:0,is_mandatory:1,attribute_name:"Brand",attribute_cn_name:"品牌",attribute_type:"STRING_TYPE",country:r,options:JSON.stringify(m),attribute_label:"",is_key_attribute:1}],n.prev=32,n.next=35,e.$shopeemanService.getAttributeTree(r,l,{headers:{"Content-Type":"text/plain; charset=UTF-8"}});case 35:v=n.sent,h=JSON.parse(v),C=JSON.parse(h.data),x=C&&C.data&&C.data.list[0]&&C.data.list[0].attribute_tree||[],x.forEach((function(t){var e=[];t.children.forEach((function(t){e.push({value:t.display_name||t.name,value_id:t.value_id})})),f.push({category_id:g,attribute_id:t.attribute_id,is_mandatory:t.mandatory?1:0,attribute_name:t.display_name||t.name,attribute_cn_name:"",attribute_type:"STRING_TYPE",country:r,options:JSON.stringify(e),attribute_label:"",is_key_attribute:0})})),n.next=44;break;case 42:n.prev=42,n.t0=n["catch"](32);case 44:return n.prev=44,n.next=47,e.$commodityService.uploadCateGoryAttr(f);case 47:return T=n.sent,k=JSON.parse(T),200===k.code?e.$message.success("同步成功"):e.$message.error("同步失败"),n.finish(44);case 51:e.$emit("categoryChange",""),n.next=56;break;case 54:return n.next=56,e.confirmCategory(++a);case 56:case"end":return n.stop()}}),n,null,[[32,42,44,51]])})))()},getAttribute:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,a,r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.categoryAction[t.categoryAction.length-1]||t.categoryAction[t.categoryAction.length-2]||"0",a=t.country||t.countryOption,e.next=4,t.$commodityService.getAttributeInfo(a,n);case 4:r=e.sent,o=JSON.parse(r),t.attributesList=[],200===o.code&&(i=o.data&&o.data.attributes||[],i.forEach((function(e){var n=t.attributesCurrent.findIndex((function(t){return t.attribute_id===e.attribute_id})),a=t.attributesCurrent[n]&&t.attributesCurrent[n].value_id||0;e.new_options_obj=e.new_options&&JSON.parse(e.new_options)||[],e.options=n>-1&&parseInt(a)||e.new_options_obj[0]&&e.new_options_obj[0].value_id,t.attributesList.push(e)})),t.attributesCurrent=[]);case 8:case"end":return e.stop()}}),e)})))()},setCategory:function(t,e){this.categoryList.splice(e+1,this.categoryList.length-e),this.categoryAction.splice(e+1,this.categoryAction.length-e),this.enterCategory(t+"",++e)},enterCategory:function(){var t=arguments,e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,r,o,i,s,c,u,d,g,l,p,y,_,b,m,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.length>0&&void 0!==t[0]?t[0]:"0",r=t.length>1&&void 0!==t[1]?t[1]:0,o=t.length>2&&void 0!==t[2]?t[2]:null,i=t.length>3&&void 0!==t[3]?t[3]:"1",s=e.country||e.countryOption,0!==r||0!==e.attributesCurrent.length){n.next=19;break}if(e.categoryAction=o&&o.categoryIdList||[],!e.goodsCurrent||!e.goodsCurrent.goodsId&&!e.goodsCurrent.goods_id){n.next=19;break}return e.categoryAction=[],d=e.goodsCurrent.originCategoryId||e.goodsCurrent.category_id,g=e.goodsCurrent.platform||e.goodsCurrent.source,n.next=13,e.$commodityService.getCategoryRelation(d,s,g);case 13:l=n.sent,p=JSON.parse(l),e.attributesCurrent=p.data&&p.data.attributes||[],a=(null===p||void 0===p||null===(c=p.data)||void 0===c||null===(u=c.category)||void 0===u?void 0:u.platform_category_id)||a,i="0"===a&&i||0,!i&&e.categoryAction.unshift(a);case 19:if(!a){n.next=47;break}return y=JSON.parse(JSON.stringify(e.categoryList))||[],n.next=23,e.$commodityService.getCategoryTbInfo(s,a,i);case 23:if(_=n.sent,b=JSON.parse(_),200!==b.code){n.next=45;break}if(m=b.data,0!==i){n.next=35;break}return f=(null===m||void 0===m?void 0:m.categories[0].parent_id)||0,f&&e.categoryAction.unshift(f),i=0===f?1:0,n.next=33,e.enterCategory(f+"",0,null,i);case 33:n.next=45;break;case 35:if(!m||!m.categories){n.next=43;break}return y[r]=m.categories,e.categoryList=y,e.categoryAction[r]=e.categoryAction[r]||y[r][0].category_id,n.next=41,e.enterCategory(e.categoryAction[r],++r);case 41:n.next=45;break;case 43:return n.next=45,e.getAttribute();case 45:n.next=49;break;case 47:return n.next=49,e.getAttribute(!0);case 49:case"end":return n.stop()}}),n)})))()}}}),s=i,c=(n("b0bd"),n("2877")),u=Object(c["a"])(s,a,r,!1,null,null,null);e["a"]=u.exports}}]);