(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-470accfc"],{"08d8":function(e,t,a){"use strict";a("58a9")},"58a9":function(e,t,a){},"6af1":function(e,t,a){"use strict";a("ac70")},ac70:function(e,t,a){},ec099:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"personal-container "},[a("header",[a("div",{staticClass:"header-left"},[a("p",{staticClass:"text"},[e._v("基础操作")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(4)}}},[e._v("批量添加尺寸图")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(7)}}},[e._v("批量删除尺寸图")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(8)}}},[e._v("一键上新")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(14)}}},[e._v("批量映射虾皮类目")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.markPreferredGoods("1")}}},[e._v("标记优选商品")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.markPreferredGoods("-1")}}},[e._v("取消标记优选商品")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openLabelVisabel("1")}}},[e._v("标记商品标签")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openLabelVisabel("-1")}}},[e._v("取消商品标签")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(20)}}},[e._v("翻译后的数据导出")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchProcessing(16)}}},[e._v("批量设置重量/体积")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.deleteGoods}},[e._v("取消收藏")]),e.uploadImgAdd?a("el-upload",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticStyle:{"margin-right":"10px"},attrs:{action:"#",drag:!0,"show-file-list":!1,limit:1,"auto-upload":!1,"on-change":e.imageUpload}},[a("el-button",{ref:"uploadImg",attrs:{size:"mini",type:"primary"}},[e._v("选择图片")])],1):e._e()],1),a("div",{staticClass:"header-right",staticStyle:{width:"calc(100vw - 500px)"}},[a("p",{staticClass:"text"},[e._v("列表筛选")]),a("ul",{staticClass:"search-list",staticStyle:{"flex-flow":"column"}},[a("li",[a("p",[e._v("采购来源：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.sourceVal,callback:function(t){e.sourceVal=t},expression:"sourceVal"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.source,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2),a("p",{staticStyle:{"margin-left":"10px"}},[e._v("筛选时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.timeType,callback:function(t){e.timeType=t},expression:"timeType"}},e._l(e.timeAt,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1),a("el-date-picker",{attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1),a("li",[a("p",[e._v("优选商品：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.isFeatured,callback:function(t){e.isFeatured=t},expression:"isFeatured"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),e._l(e.isFeaturedArr,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2),a("p",{staticStyle:{"margin-left":"10px"}},[e._v("编辑状态：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.isEditValue,callback:function(t){e.isEditValue=t},expression:"isEditValue"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.editArr,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2),a("p",{staticStyle:{"margin-left":"10px"}},[e._v("语种：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.language,callback:function(t){e.language=t},expression:"language"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.languageArr,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2),a("p",{staticStyle:{"margin-left":"10px"}},[e._v("价格区间：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",placeholder:""},model:{value:e.minPrice,callback:function(t){e.minPrice=t},expression:"minPrice"}}),a("span",{staticClass:"slot"},[e._v("-")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",placeholder:""},model:{value:e.maxPrice,callback:function(t){e.maxPrice=t},expression:"maxPrice"}})],1),a("li",[a("p",[e._v("商品ID：")]),a("el-input",{attrs:{size:"mini",placeholder:""},model:{value:e.goodsId,callback:function(t){e.goodsId=t},expression:"goodsId"}}),a("p",{staticStyle:{"margin-left":"10px"}},[e._v("商品标签：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.labelId,callback:function(t){e.labelId=t},expression:"labelId"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),e._l(e.labelList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label_name,value:e.id}})}))],2),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.getLabelList("refresh")}}},[e._v("刷新")])],1),a("li",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getGoodsList}},[e._v("搜索")])],1)])])]),a("article",[a("p",{staticClass:"tip"},[e._v("尊敬的用户：您好，为提高私有选品库模块的性能，系统只能保存近30天的非精选商品数据，为保证部分精选商品不被清理，请将需要保留的商品标记为精选商品")]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.buttonStatus.getList,expression:"buttonStatus.getList"}],ref:"plTable",attrs:{height:e.Height,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"row-key":"id","big-data-checkbox":!0,border:!1},on:{"selection-change":e.handleSelectionChange}},[a("u-table-column",{attrs:{align:"left",type:"selection"}}),a("u-table-column",{attrs:{align:"left",type:"index",label:"序号"}}),a("u-table-column",{attrs:{align:"left",label:"标签",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(e.getLabelName(r.sys_label_id)))])]}}])}),a("u-table-column",{attrs:{align:"left",label:"采购来源",width:"70","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(e.sourceObj[r.source+""]))])]}}])}),a("u-table-column",{attrs:{align:"left",label:"优选商品",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s("1"===a.is_featured?"是":"否")+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"商品Id",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("span",{staticClass:"goToGoods",on:{click:function(t){return t.stopPropagation(),e.goToGoods(r)}}},[e._v(e._s(r.goods_id))]),a("el-button",{staticClass:"copyIcon",attrs:{type:"text"},on:{click:function(t){return e.copy(r.goods_id)}}},[a("i",{staticClass:"el-icon-document-copy"})])]}}])}),a("u-table-column",{attrs:{align:"left",label:"标题",prop:"Price",width:"150px",fit:""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-input",{attrs:{resize:"none",type:"textarea",autosize:{minRows:4,maxRows:4},placeholder:"请输入标题"},on:{blur:function(t){return e.goodsListUpdate(r)}},model:{value:r.title,callback:function(t){e.$set(r,"title",t)},expression:"row.title"}})]}}])}),a("u-table-column",{attrs:{align:"left",label:"主图",width:"80",prop:"Sales"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-tooltip",{staticStyle:{width:"56px",height:"56px",display:"inline-block"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:r.image}})],1),a("el-image",{staticStyle:{width:"56px",height:"56px"},attrs:{src:e._f("changeImgSizeFilter")({url:r.image,source:r.source})}})],1)]}}])}),a("u-table-column",{attrs:{align:"left",label:"价格",width:"80",prop:"price","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"left",label:"库存",width:"80",prop:"stock","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"left",label:"销量",width:"80",prop:"sales","show-overflow-tooltip":""}}),a("u-table-column",{attrs:{align:"left",label:"重量(kg)",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-input",{attrs:{size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goodsListUpdate(r)}},model:{value:r.weight,callback:function(t){e.$set(r,"weight",t)},expression:"row.weight"}})]}}])}),a("u-table-column",{attrs:{align:"left",label:"体积",width:"110"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("ul",[a("li",{staticStyle:{display:"flex"}},[a("p",{staticStyle:{"margin-right":"5px"}},[e._v("长(cm)")]),a("el-input",{staticStyle:{flex:"1"},attrs:{size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goodsListUpdate(r)}},model:{value:r.long,callback:function(t){e.$set(r,"long",t)},expression:"row.long"}})],1),a("li",{staticStyle:{display:"flex"}},[a("p",{staticStyle:{"margin-right":"5px"}},[e._v("宽(cm)")]),a("el-input",{staticStyle:{flex:"1"},attrs:{size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goodsListUpdate(r)}},model:{value:r.width,callback:function(t){e.$set(r,"width",t)},expression:"row.width"}})],1),a("li",{staticStyle:{display:"flex"}},[a("p",{staticStyle:{"margin-right":"5px"}},[e._v("高(cm)")]),a("el-input",{staticStyle:{flex:"1"},attrs:{size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goodsListUpdate(r)}},model:{value:r.height,callback:function(t){e.$set(r,"height",t)},expression:"row.height"}})],1)])]}}])}),a("u-table-column",{attrs:{align:"left",label:"翻译语种",width:"80",prop:"language"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(e.languageArrObj[r.language]||r.language))])]}}])}),a("u-table-column",{attrs:{align:"left",label:"源平台类目","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e.getCategoty(a)||"未匹配到类目"))]}}])}),a("u-table-column",{attrs:{align:"left",label:"更新时间",width:"140px",prop:"updated_at"}}),a("u-table-column",{attrs:{align:"left",label:"收藏时间",width:"140px",prop:"created_at"}}),a("u-table-column",{attrs:{align:"left",label:"操作结果",width:"100px","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticClass:"goodsTableLine",staticStyle:{height:"80px","text-align":"left"}},[e._v(" "+e._s(r.handle_type||"")+" ")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next",total:e.total,"current-page":e.currentPage,"page-sizes":[30,100,200,500],"page-size":e.pageSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{staticClass:"label-dialog",attrs:{title:"商品标签",width:"300px",top:"15vh","close-on-click-modal":!1,modal:!1,visible:e.goodsLabelVisiable},on:{"update:visible":function(t){e.goodsLabelVisiable=t}}},[e.goodsLabelVisiable?a("goodsLabel",{attrs:{"select-label":e.sys_label,"goods-table-select":e.multipleSelection},on:{goodsTagChange:e.goodsTagChange}}):e._e()],1),a("div",{staticClass:"on_new_dialog"},[a("el-dialog",{attrs:{width:"1313px","close-on-click-modal":!1,top:"6vh",visible:e.isEditorVisible,modal:!1},on:{"update:visible":function(t){e.isEditorVisible=t}}},[a("template",{slot:"title"},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{"margin-right":"25px"}},[e._v("上新编辑")]),a("el-button",{attrs:{size:"mini",type:e.isNoFoldShow?"primary":""},nativeOn:{click:function(t){return t.stopPropagation(),e.setIsNoFoldShow.apply(null,arguments)}}},[e._v(" "+e._s(e.isNoFoldShow?"折叠":"展开")+" ")])],1)]),e.isEditorVisible?a("editor-on-new-goods",{ref:"editor_on_new_goods",attrs:{"mall-table":e.multipleSelection},on:{close:e.close}}):e._e()],2),a("el-dialog",{attrs:{title:"类目映射",width:"700px",top:"25vh","close-on-click-modal":!1,modal:!1,visible:e.categoryVisible},on:{"update:visible":function(t){e.categoryVisible=t}}},[e.categoryVisible?a("categoryMapping",{attrs:{"goods-current":{},"mall-list":[]},on:{categoryChange:e.categoryChange}}):e._e()],1),a("el-dialog",{attrs:{title:"设置商品重量和体积",width:"300px",top:"25vh","close-on-click-modal":!1,modal:!1,visible:e.goodsSizeVisible},on:{"update:visible":function(t){e.goodsSizeVisible=t}}},[e.goodsSizeVisible?a("goods-size",{on:{goodsSizeChange:e.goodsSizeChange}}):e._e()],1)],1)],1)},n=[],i=a("2909"),o=a("5530"),s=a("b85c"),l=a("1da1"),c=(a("96cf"),a("7db0"),a("c740"),a("3ca3"),a("ddb0"),a("159b"),a("a4d3"),a("e01a"),a("ac1f"),a("1276"),a("d3b7"),a("99af"),a("d81d"),a("caad"),a("2532"),a("fb6a"),a("0e0b")),u=a("d4ec"),d=a("bee2"),p=function(){function e(t){Object(u["a"])(this,e),this._this=t}return Object(d["a"])(e,[{key:"getCollectGoodsV2",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.getCollectGoodsV2(t);case 3:if(a=e.sent,a=JSON.parse(a),200!==a.code){e.next=8;break}return r=a.data.data.map((function(e){return e.information,e})),e.abrupt("return",{code:200,data:{total:a.data.total,data:r}});case 8:return e.abrupt("return",{code:a.code,data:a.msg});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getCollectGoodsV2-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getLabelList",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.getGoodsTagList();case 3:if(t=e.sent,t=JSON.parse(t),200!==t.code){e.next=7;break}return e.abrupt("return",{code:200,data:t.data});case 7:return e.abrupt("return",{code:t.code,data:t.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getLabelList-catch: ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"createLabel",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var a,r,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:"0",e.prev=1,e.next=4,this._this.$commodityService.addGoodsTag(t,a);case 4:if(r=e.sent,r=JSON.parse(r),200!==r.code){e.next=8;break}return e.abrupt("return",{code:200,data:r.msg});case 8:return e.abrupt("return",{code:r.code,data:r.msg});case 11:return e.prev=11,e.t0=e["catch"](1),e.abrupt("return",{code:-2,data:"createLabel-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[1,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"addGoodsToTag",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.addGoodsToTag(t,a);case 3:if(r=e.sent,r=JSON.parse(r),200!==r.code){e.next=7;break}return e.abrupt("return",{code:200,data:r.msg});case 7:return e.abrupt("return",{code:r.code,data:r.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"createLabel-catch: ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"markPreferredGoods",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.markPreferredGoods(t,a);case 3:if(r=e.sent,r=JSON.parse(r),200!==r.code){e.next=7;break}return e.abrupt("return",{code:200,data:r.data});case 7:return e.abrupt("return",{code:r.code,data:r.msg});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"markPreferredGoods-catch: ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"deleteGoods",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.deleteCollectGoodsInfo(t);case 3:if(a=e.sent,a=JSON.parse(a),200!==a.code){e.next=8;break}return e.abrupt("return",{code:200,data:a.msg});case 8:return e.abrupt("return",{code:a.code,data:a.msg});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"createLabel-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),g=a("5287"),b=a("da05"),f=a("eb09"),m=a("c12c"),h=a("2b22"),v={components:{editorOnNewGoods:b["a"],categoryMapping:f["a"],goodsSize:m["a"],goodsLabel:h["a"]},data:function(){return{isNoFoldShow:!0,isEditorVisible:!1,Height:"520",personalLibraryAPInstance:new p(this),goodsLabelVisiable:!1,labelType:"",value2:[],sourceObj:null,labelList:[],sourceVal:"",timeType:"2",timeAt:[{label:"收藏时间",value:"2"},{label:"更新时间",value:"3"}],isFeatured:"0",isFeaturedArr:[{value:"1",label:"是"},{value:"-1",label:"否"}],minPrice:"",maxPrice:"",isEditValue:"",editArr:[{value:"1",label:"是否已编辑标题"},{value:"0",label:"是否已编辑描述"}],goodsId:"",language:"",languageArr:[{value:"zh-hans",label:"简体"},{value:"zh-hant",label:"繁体"},{value:"en",label:"英语"},{value:"th",label:"泰语"},{value:"vi",label:"越南语"},{value:"id",label:"印度语"},{value:"ms",label:"马来语"}],languageArrObj:{"zh-Hans":"简体","zh-Hant":"繁体",en:"英语",th:"泰语",vi:"越南语",id:"印度语",ms:"马来语"},labelId:"0",labelId2:"",currentLabelName:"",goodsList:[],multipleSelection:[],buttonStatus:{getList:!1},total:0,currentPage:1,pageSize:30,uploadImgAdd:!1,categoryVisible:!1,goodsSizeVisible:!1,categoryList:{},isReplaceSize:!0,sys_label:""}},computed:{getLabelName:function(){return function(e,t){var a=this.labelList.find((function(t){return t.id===e+""}));return t&&(this.currentLabelName=a.label_name),(null===a||void 0===a?void 0:a.label_name)||""}},getCategoty:function(){return function(e){return this.categoryList[e.category_id]}}},watch:{categoryList:{handler:function(e){},deep:!0},goodsList:{handler:function(e){},deep:!0}},created:function(){this.sourceObj=g["i"],this.source=g["h"],this.getLabelList(),this.getValueFormat()},mounted:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getGoodsList();case 2:case"end":return t.stop()}}),t)})))()},methods:{batchProcessing:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var r,n,i,o,l,u,d,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!(t.multipleSelection.length<1)){a.next=3;break}return t.$message.error("请选择一个商品信息"),a.abrupt("return",!1);case 3:if(r=!1,n="",4!==e){a.next=11;break}t.uploadImgAdd=!0,i=t.multipleSelection.findIndex((function(e){return e.size_image_id})),i>-1?t.$confirm("批量新增尺寸图时，是否替换原有尺寸图?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.isReplaceSize=!0,setTimeout((function(){t.$refs["uploadImg"].$el.click()}),100)})).catch((function(){t.isReplaceSize=!1,setTimeout((function(){t.$refs["uploadImg"].$el.click()}),100)})):(t.isReplaceSize=!0,setTimeout((function(){t.$refs["uploadImg"].$el.click()}),100)),a.next=48;break;case 11:if(7!==e){a.next=30;break}o=Object(s["a"])(t.multipleSelection),a.prev=13,u=regeneratorRuntime.mark((function e(){var a,n,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=l.value,n=t.goodsList.findIndex((function(e){return e.id===a.id})),!a.size_image_id){e.next=12;break}return e.next=5,t.$commodityService.deleteGoodsImage(2,a.id,"0");case 5:i=e.sent,o=JSON.parse(i),r=200===o.code,t.$set(t.goodsList[n],"handle_type",r?"尺寸图删除成功":"尺寸图删除失败"),r&&t.$set(t.goodsList[n],"size_image_id",0),e.next=13;break;case 12:t.$set(t.goodsList[n],"handle_type","无尺寸图可删除");case 13:case"end":return e.stop()}}),e)})),o.s();case 16:if((l=o.n()).done){a.next=20;break}return a.delegateYield(u(),"t0",18);case 18:a.next=16;break;case 20:a.next=25;break;case 22:a.prev=22,a.t1=a["catch"](13),o.e(a.t1);case 25:return a.prev=25,o.f(),a.finish(25);case 28:a.next=48;break;case 30:if(8!==e){a.next=34;break}t.isEditorVisible=!0,a.next=48;break;case 34:if(14!==e){a.next=38;break}t.categoryVisible=!0,a.next=48;break;case 38:if(16!==e){a.next=42;break}t.goodsSizeVisible=!0,a.next=48;break;case 42:if(20!==e){a.next=48;break}return d=["标签","采购来源","优选商品","商品ID","商品标题","商品主图","价格","库存","销量","重量(kg)","长(cm)","宽(cm)","高(cm)","翻译语种","源平台类目","更新时间","收藏时间"],p=[],t.goodsList.forEach((function(e){var a=[];"zh-Hans"!==e.language&&(a[0]=t.getLabelName(e.sys_label_id)||"",a[1]=t.sourceObj[e.source+""]||"",a[2]="1"===e.is_featured?"是":"否",a[3]=e.goods_id||"",a[4]=e.title||"",a[5]=e.image||"",a[6]=e.price||"",a[7]=e.stock||"",a[8]=e.sales||"",a[9]=e.weight||"0",a[10]=e.long||"0",a[11]=e.width||"0",a[12]=e.height||"0",a[13]=t.languageArrObj[e.language]||e.language,a[14]=t.getCategoty(e)||"未匹配到类目",a[15]=e.updated_at,a[16]=e.created_at,p.push(a))})),a.next=48,Object(c["w"])(d,p,"商品数据");case 48:n&&r&&t.$message.success(n),n&&!r&&t.$message.error(n);case 50:case"end":return a.stop()}}),a,null,[[13,22,25,28]])})))()},imageUpload:function(e){var t=this,a=e.raw,r=new FileReader;r.readAsDataURL(a),this.uploadImgAdd=!1,r.onload=Object(l["a"])(regeneratorRuntime.mark((function e(){var a,n,i,o,l,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=r.result,n=Object(c["x"])(!1,32)+"_"+(new Date).getTime(),e.next=4,t.$ossService.uploadFile(a,n+".png");case 4:i=e.sent,o=Object(s["a"])(t.multipleSelection),e.prev=6,u=regeneratorRuntime.mark((function e(){var a,r,n,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=l.value,r=t.goodsList.findIndex((function(e){return e.id===a.id})),"zh-Hans"!==a.language){e.next=5;break}return t.$set(t.goodsList[r],"handle_type","简体数据无需添加尺寸图"),e.abrupt("return","continue");case 5:if(!t.isReplaceSize&&a.size_image_id){e.next=15;break}return e.next=8,t.$commodityService.storeGoodsSizeImages(a.id+"",i);case 8:n=e.sent,o=JSON.parse(n),s=i&&200===o.code,t.$set(t.goodsList[r],"handle_type",s?"尺寸图添加成功":"尺寸图添加失败"),s&&t.$set(t.goodsList[r],"size_image_id",1),e.next=16;break;case 15:t.$set(t.goodsList[r],"handle_type","已有尺寸图，未替换");case 16:case"end":return e.stop()}}),e)})),o.s();case 9:if((l=o.n()).done){e.next=16;break}return e.delegateYield(u(),"t0",11);case 11:if(d=e.t0,"continue"!==d){e.next=14;break}return e.abrupt("continue",14);case 14:e.next=9;break;case 16:e.next=21;break;case 18:e.prev=18,e.t1=e["catch"](6),o.e(e.t1);case 21:return e.prev=21,o.f(),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[6,18,21,24]])})))},categoryChange:function(e){var t=this;if(e){var a=[];e.attributesList.forEach((function(e){var t=e.new_options_obj.find((function(t){return t.value_id===e.options}));a.push({attributeId:e.attribute_id,attributeName:e.attribute_name,valueId:t.value_id,value:t.value})})),this.multipleSelection.forEach(function(){var r=Object(l["a"])(regeneratorRuntime.mark((function r(n){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i={relationCategoryId:n.category_id,country:e.country,platformId:n.source,platformCategoryId:e.categoryList[e.categoryList.length-1].category_id,categoryAttributes:a},r.next=3,t.$commodityService.saveCategoryRelation(i);case 3:r.sent;case 4:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}this.categoryVisible=!1},goodsSizeChange:function(e){var t=this;if(e){this.multipleSelection.forEach(function(){var a=Object(l["a"])(regeneratorRuntime.mark((function a(r){var n,i,s,l,c,u,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.goodsList.findIndex((function(e){return e.id===r.id})),i=r.id,s=r.description,l=r.title,a.next=6,t.$commodityService.updateGoods(Object(o["a"])({sysGoodsId:i,description:s,title:l},e));case 6:c=a.sent,u=Object.assign(t.goodsList[n],e),t.$set(t.goodsList,n,u),d=JSON.parse(c),200===d.code;case 11:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())}this.goodsSizeVisible=!1},setIsNoFoldShow:function(){this.isNoFoldShow=!this.isNoFoldShow,this.$refs.editor_on_new_goods.setIsNoFoldShow()},showCategory:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r,n,i,o,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.t0=regeneratorRuntime.keys(e.goodsList);case 1:if((t.t1=t.t0()).done){t.next=16;break}if(a=t.t1.value,r=e.goodsList[a],n=e.categoryList[r.category_id]||"",n){t.next=14;break}return i=JSON.parse(JSON.stringify(e.categoryList)),o=r.extra_info&&JSON.parse(r.extra_info).site||"",t.next=10,e.$collectService.getGoodsCat(r.category_id,r.source,o);case 10:s=t.sent,n=s.split("|")[0]||"",l=s.split("|")[1]||"",n&&l&&(i[l]=n||"未匹配到类目",e.categoryList=i);case 14:t.next=1;break;case 16:case"end":return t.stop()}}),t)})))()},goToGoods:function(e){var t=e.extra_info&&JSON.parse(e.extra_info)||{},a=Object.assign({productId:e.goods_id},t),r=Object(c["q"])(e.source,a);this.$BaseUtilService.openUrl(r.url)},handleClose1:function(e){e(),this.labelId2=this.labelList[0].id,this.currentLabelName=this.labelList[0].label_name},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getGoodsList()},handleCurrentChange:function(e){this.currentPage=e,this.getGoodsList()},handleSelectionChange:function(e){this.multipleSelection=e},getLabelList:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$appConfig.temporaryCacheInfo("get","goodsLabelList","");case 2:if(r=a.sent,"{}"===r){a.next=8;break}if(n=JSON.parse(r),!(n&&n.length>0&&"refresh"!==e)){a.next=8;break}return t.labelList=n||[],a.abrupt("return");case 8:return a.next=10,t.personalLibraryAPInstance.getLabelList();case 10:if(i=a.sent,200===i.code){a.next=13;break}return a.abrupt("return",t.$message.error("获取标签列表失败:".concat(i.code,":").concat(i.data)));case 13:t.labelList=i.data||[],t.$appConfig.temporaryCacheInfo("save","goodsLabelList",t.labelList),t.$message.success("获取标签列表成功");case 16:case"end":return a.stop()}}),a)})))()},goodsTagChange:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e&&(n=Object(i["a"])(t.multipleSelection.map((function(e){return e.id}))),t.goodsList.forEach((function(a,r){n.includes(a.id)&&t.$set(t.goodsList[r],"sys_label_id",e.category&&e.category.id)})),t.labelList=e.goodsTagList||[],t.sys_label=null===(r=e.category)||void 0===r?void 0:r.label_name),t.goodsLabelVisiable=!1;case 2:case"end":return a.stop()}}),a)})))()},getGoodsList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={page:e.currentPage,perpage:e.pageSize,goodsId:e.goodsId,language:e.language,source:e.sourceVal,keyword:"",minPrice:e.minPrice,maxPrice:e.maxPrice,timeType:e.timeType,startTime:"".concat(e.value2[0]," 00:00:00"),endTime:"".concat(e.value2[1]," 23:59:59"),isEditTitle:""===e.isEditValue?"":"0"===e.isEditValue?"2":"1",isEditDescription:""===e.isEditValue||"1"===e.isEditValue?"":"0",categoryId:"",isFeatured:e.isFeatured,mainShowData:"",sysLabelId:e.labelId},e.buttonStatus.getList=!0,e.goodsList=[],e.$refs.plTable.reloadData(e.goodsList),t.next=6,e.personalLibraryAPInstance.getCollectGoodsV2(a);case 6:r=t.sent,200!==r.code?e.$message.error("".concat(r.code,":").concat(r.data)):(e.total=r.data.total,(n=e.goodsList).push.apply(n,Object(i["a"])(r.data.data))),e.$refs.plTable.toggleAllSelection(),e.buttonStatus.getList=!1;case 10:case"end":return t.stop()}}),t)})))()},markPreferredGoods:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.multipleSelection,0!==r.length){a.next=4;break}return r=null,a.abrupt("return",t.$message.error("请先选择商品"));case 4:if(n=[],r.forEach((function(t){"1"===e?"1"!==t.is_featured&&n.push(t.id):"-1"!==t.is_featured&&n.push(t.id)})),0!==n.length){a.next=8;break}return a.abrupt("return",t.$message.error("该组商品已被".concat("1"===e?"标记优选":"取消优选",",请勿重复操作")));case 8:return a.next=10,t.personalLibraryAPInstance.markPreferredGoods(n,e);case 10:if(i=a.sent,200===i.code){a.next=13;break}return a.abrupt("return",t.$message.error("".concat("1"===e?"":"取消","标记优选商品失败")));case 13:t.$message.success("".concat("1"===e?"":"取消","标记优选商品成功")),r.map((function(t){t.is_featured="1"===e?"1":"-1"})),r=null;case 16:case"end":return a.stop()}}),a)})))()},openLabelVisabel:function(e){if(0===this.multipleSelection.length)return this.$message.error("请先选择商品");this.labelType=e,"1"===e?this.goodsLabelVisiable=!0:this.markGoodsLabel()},markGoodsLabel:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.multipleSelection,r=a.map((function(e){return e.id})),t.next=4,e.personalLibraryAPInstance.addGoodsToTag("0",r);case 4:if(n=t.sent,200===n.code){t.next=7;break}return t.abrupt("return",e.$message.error("取消商品标签失败:".concat(n.code,"-").concat(n.data)));case 7:e.$message.success("取消商品标签成功"),a.forEach((function(e){e.sys_label_id=""})),a=null;case 10:case"end":return t.stop()}}),t)})))()},goodsListUpdate:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var r,n,i,o,s,l,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.goodsList.findIndex((function(t){return t.id===e.id})),!e){a.next=11;break}return n=e.id,i=e.description,o=e.title,s={sysGoodsId:n,description:i,title:o,weight:e.weight,long:e.long,height:e.height,width:e.width},a.next=8,t.$commodityService.updateGoods(s);case 8:l=a.sent,c=JSON.parse(l),200===c.code?t.$set(t.goodsList[r],"handle_type","数据更新成功"):t.$set(t.goodsList[r],"handle_type","数据更新失败");case 11:case"end":return a.stop()}}),a)})))()},deleteGoods:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!==e.multipleSelection.length){t.next=2;break}return t.abrupt("return",e.$message.error("请选择需要取消收藏的商品"));case 2:return a=e.multipleSelection.map((function(e){return e.id})),t.next=5,e.personalLibraryAPInstance.deleteGoods(a);case 5:if(r=t.sent,200===r.code){t.next=8;break}return t.abrupt("return",e.$message.error("取消收藏商品失败:".concat(r.code,"-").concat(r.data)));case 8:e.$message.success("取消收藏商品成功"),e.getGoodsList();case 10:case"end":return t.stop()}}),t)})))()},getValueFormat:function(){var e=new Date,t=e-1728e5;t=new Date(e-1728e5).toISOString().slice(0,10),e=e.toISOString().slice(0,10),this.value2=[t,e]},copy:function(e){Object(c["f"])(e)},close:function(e){e&&(this[e]=!1)}}},y=v,w=(a("6af1"),a("08d8"),a("2877")),x=Object(w["a"])(y,r,n,!1,null,"93635b80",null);t["default"]=x.exports}}]);