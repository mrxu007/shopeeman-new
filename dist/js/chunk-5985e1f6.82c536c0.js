(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5985e1f6"],{"05e3":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{class:["category-content",{"category-column":!0===t.isColumn}]},[a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("一级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,1)}},model:{value:t.category1,callback:function(e){t.category1=e},expression:"category1"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList1,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1),3===t.level||2===t.level?a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("二级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,2)}},model:{value:t.category2,callback:function(e){t.category2=e},expression:"category2"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList2,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1):t._e(),3===t.level?a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("三级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,3)}},model:{value:t.category3,callback:function(e){t.category3=e},expression:"category3"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList3,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1):t._e()])])},i=[],o=a("1da1"),r=(a("96cf"),a("a9e3"),{name:"CategoryChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:!1},isCategoryAll:{type:Boolean,default:!0},level:{type:Number,default:3},isColumn:{type:Boolean,default:!1}},data:function(){return{countryVal:null,countries:this.$filters.countries_option,countries_id:{TH:"4",MY:"5",TW:"3",SG:"1",PH:"7",VN:"6",ID:"2",BR:"8",MX:"9",CO:"10",CL:"11",PL:"12"},category1:"",categoryList1:[],category2:"",categoryList2:[],category3:"",categoryList3:[],categoryList:[]}},watch:{countryVal:{handler:function(t,e){this.category1="",this.category2="",this.category3="",this.categoryList1=[],this.categoryList2=[],this.categoryList3=[],this.getCategory(t,0)},deep:!0},category1:function(t,e){this.category2="",this.category3="",this.categoryList2=[],this.categoryList3=[],this.sendParent()},category2:function(t,e){this.category3="",this.categoryList3=[],this.sendParent()}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{getCategory:function(t,e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var i,o,r,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a.countryVal){n.next=3;break}return a.sendParent(),n.abrupt("return");case 3:if(a.level!==e){n.next=6;break}return a.sendParent(),n.abrupt("return");case 6:if(0===e||t){n.next=11;break}return a["category".concat(e+1)]="",a["categoryList".concat(e+1)]=[],a.sendParent(),n.abrupt("return");case 11:return i=[a.countryVal,0!==e?t&&""!==t?t:"":"0","1","tbCategory"],n.next=14,a.$commodityService.getCategory(i);case 14:if(o=n.sent,o){n.next=17;break}return n.abrupt("return",a.$message.warning("获取失败"));case 17:if(r=JSON.parse(o),200!==r.code){n.next=23;break}l=r.data,l.categories&&(a["categoryList".concat(e+1)]=l.categories||[]),n.next=24;break;case 23:return n.abrupt("return",a.$message.warning("获取失败"));case 24:a.sendParent();case 25:case"end":return n.stop()}}),n)})))()},sendParent:function(){if(this.categoryList=[],this.category1){var t=[this.category1];this.categoryList=t}if(this.category1&&this.category2){var e=[this.category1,this.category2];this.categoryList=e}if(this.category1&&this.category2&&this.category3){var a=[this.category1,this.category2,this.category3];this.categoryList=a}var n={country:this.countryVal,categoryFirst:this.category1,categorySecond:this.category2,categoryThird:this.category3,categoryList:this.categoryList,platformId:this.countries_id[this.countryVal]};this.$emit("setCategory",n)}}}),l=r,s=(a("a91b"),a("2877")),c=Object(s["a"])(l,n,i,!1,null,"5514bec9",null);e["a"]=c.exports},"3c6e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product-put-on-popular-selection"},[a("div",{staticClass:"category-choose-box"},[a("category-choose",{attrs:{level:3},on:{setCategory:t.setCategory}}),a("div",{staticClass:"conditions-box"},[a("span",[t._v("出货地点：")]),a("el-select",{attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.deliveryPlace,callback:function(e){t.deliveryPlace=e},expression:"deliveryPlace"}},t._l(t.deliveryPlaceList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box"},[a("span",[t._v("店铺类型：")]),a("el-select",{attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.shopType,callback:function(e){t.shopType=e},expression:"shopType"}},t._l(t.shopTypeList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box"},[a("span",[t._v("排行：")]),a("el-select",{attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},t._l(t.sortByList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("月销量：")]),a("el-input",{attrs:{size:"mini"},model:{value:t.minSales,callback:function(e){t.minSales=e},expression:"minSales"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{attrs:{size:"mini"},model:{value:t.maxSales,callback:function(e){t.maxSales=e},expression:"maxSales"}})],1),a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("新增点赞数：")]),a("el-input",{attrs:{size:"mini"},model:{value:t.minGive,callback:function(e){t.minGive=e},expression:"minGive"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{attrs:{size:"mini"},model:{value:t.maxGive,callback:function(e){t.maxGive=e},expression:"maxGive"}})],1),a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("新增评论数：")]),a("el-input",{attrs:{size:"mini"},model:{value:t.minComments,callback:function(e){t.minComments=e},expression:"minComments"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{attrs:{size:"mini"},model:{value:t.maxComments,callback:function(e){t.maxComments=e},expression:"maxComments"}})],1),a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("价格区间(当地币种)：")]),a("el-input",{attrs:{size:"mini"},model:{value:t.minPrice,callback:function(e){t.minPrice=e},expression:"minPrice"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{attrs:{size:"mini"},model:{value:t.maxPrice,callback:function(e){t.maxPrice=e},expression:"maxPrice"}})],1),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.searchShopeeHotGoods}},[t._v("查询")]),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini"},on:{click:t.exportData}},[t._v("导出")])],1),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableData,"tooltip-effect":"dark",height:"calc(100vh - 150px)"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("el-table-column",{attrs:{width:"120px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.platform)))]}}])}),a("el-table-column",{attrs:{width:"120px",label:"商品ID",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.itemid))]}}])}),a("el-table-column",{attrs:{width:"100px",label:"商品图片",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-image",{attrs:{src:t._f("imageRender")([e.row.platform,e.row.shopid,e.row.image]),"preview-src-list":t._f("imageRender")([e.row.platform,e.row.shopid,e.row.image,1])}},[a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"商品名称",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.name))]}}])}),a("el-table-column",{attrs:{width:"100px",label:"官方店铺",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.is_official_shop?"是":"否"))]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"一级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path.split(">")[0])+"("+t._s(e.row.display_path_cn.split(">")[0])+") ")]}}])}),a("el-table-column",{attrs:{"min-width":"70px",label:"二级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path.split(">")[1]&&e.row.cat_path.split(">")[1]+"("+e.row.display_path_cn.split(">")[1]+")"||"")+" ")]}}])}),a("el-table-column",{attrs:{"min-width":"80px",label:"三级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path.split(">")[2]&&e.row.cat_path.split(">")[2]+"("+e.row.display_path_cn.split(">")[2]+")"||"")+" ")]}}])}),a("el-table-column",{attrs:{width:"100px",label:"创建时间",prop:"created_at",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$dayjs(1e3*e.row.ctime).format("YYYY-MM-DD")))]}}])}),a("el-table-column",{attrs:{width:"100px",label:"近30天销量",prop:"warehouse_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.sold||"")+" ")]}}])}),a("el-table-column",{attrs:{width:"80px",label:"价格",prop:"warehouse_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.price||""))]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])},i=[],o=a("1da1"),r=(a("ac1f"),a("1276"),a("99af"),a("b0c0"),a("96cf"),a("05e3")),l=a("0e0b"),s={components:{CategoryChoose:r["a"]},data:function(){return{tableData:[],country:"",platformId:0,categoryFirst:"",categorySecond:"",categoryThird:"",tableLoading:!1,deliveryPlaceList:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],shopTypeList:[{label:"全部",value:"2"},{label:"官方",value:"1"},{label:"非官方",value:"0"}],sortByList:[{label:"飙升",value:"1"},{label:"热门",value:"2"}],currentPage:1,total:0,pageSize:20,deliveryPlace:"-1",shopType:"2",sortBy:"1",minSales:0,maxSales:1e3,minGive:0,maxGive:1e3,minComments:0,maxComments:1e3,minPrice:0,maxPrice:1e3}},mounted:function(){},methods:{setCategory:function(t){this.country=t.country,this.platformId=t.platformId,this.categoryFirst=t.categoryFirst,this.categorySecond=t.categorySecond,this.categoryThird=t.categoryThird},searchShopeeHotGoods:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,n,i,o,r,l,s,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.minPrice+"_"+t.maxPrice,n=t.minSales+"_"+t.maxSales,i=t.minGive+"_"+t.maxGive,o=t.minComments+"_"+t.maxComments,r=(t.categoryThird?3:t.categorySecond&&2)||t.categoryFirst&&1||"",l=t.categoryThird||t.categorySecond||t.categoryFirst||"",s={page:t.currentPage+"",page_size:t.pageSize+"",platform_id:t.platformId+"",cat_id:l+"",level:r+"",price:a,month_sales:n,increment_like_count:i,increment_item_rating:o,location:t.deliveryPlace,shopType:t.shopType,sortBy:t.sortBy},t.tableLoading=!0,e.prev=8,e.next=11,t.$commodityService.searchShopeeHotGoods(s);case 11:c=e.sent,u=JSON.parse(c),t.tableData=u,t.total=3e3,e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](8),t.$message.error("获取爆款选品列表失败");case 20:return e.prev=20,t.tableLoading=!1,e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[8,17,20,23]])})))()},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n            <td>编号</td>\n            <td>站点</td>\n            <td>商品ID</td>\n            <td>商品图片</td>\n            <td>商品名称</td>\n            <td>官方店铺</td>\n            <td>一级类目</td>\n            <td>二级类目</td>\n            <td>三级类目</td>\n            <td>创建时间</td>\n            <td>近30天销量</td>\n            <td>价格</td>\n          </tr>",a=0;a<this.tableData.length;a++){var n=this.tableData[a],i=n.cat_path&&n.cat_path.split(">")[0]&&"".concat(n.cat_path.split(">")[0],"(").concat(n.display_path_cn.split(">")[0],")")||"",o=n.cat_path&&n.cat_path.split(">")[1]&&"".concat(n.cat_path.split(">")[1],"(").concat(n.display_path_cn.split(">")[1],")")||"",r=n.cat_path&&n.cat_path.split(">")[2]&&"".concat(n.cat_path.split(">")[2],"(").concat(n.display_path_cn.split(">")[2],")")||"";e+="<tr><td>".concat(t++,"</td>\n                  <td>").concat(this.$filters.chineseSite(n.platform)+"\t","</td>\n                  <td>").concat((n.itemid||"")+"\t","</td>\n                  <td>").concat(this.$filters.imageRender([n.platform,n.shopid,n.image])+"\t","</td>\n                  <td>").concat(n.name+"\t","</td>\n                  <td>").concat((n.is_official_shop?"是":"否")+"\t","</td>\n                  <td>").concat(i+"\t","</td>\n                  <td>").concat(o+"\t","</td>\n                  <td>").concat(r+"\t","</td>\n                  <td>").concat(Object(l["f"])(1e3*n.ctime,"yyyy-MM-dd")+"\t","</td>\n                  <td>").concat(n.sold||"0\t","</td>\n                  <td>").concat(n.price||"0\t","</td>\n              </tr>")}Object(l["h"])("爆款选品",e)},handleCurrentChange:function(t){this.currentPage=t,this.searchShopeeHotGoods()},handleSizeChange:function(t){this.pageSize=t,this.searchShopeeHotGoods()}}},c=s,u=(a("7b7d"),a("2877")),p=Object(u["a"])(c,n,i,!1,null,null,null);e["default"]=p.exports},"79d2":function(t,e,a){},"7b7d":function(t,e,a){"use strict";a("79d2")},a91b:function(t,e,a){"use strict";a("ff2a")},ff2a:function(t,e,a){}}]);