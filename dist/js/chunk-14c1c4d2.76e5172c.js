(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-14c1c4d2"],{"05e3":function(t,e,a){"use strict";var i=a("1da1"),n=(a("96cf"),a("a9e3"),{name:"CategoryChoose",props:{isSelect:{type:Boolean,default:!1},spanWidth:{type:String,default:""},isAll:{type:Boolean,default:!1},isCategoryAll:{type:Boolean,default:!0},level:{type:Number,default:3},isColumn:{type:Boolean,default:!1}},data:function(){return{countryVal:null,countries:this.$filters.countries_option,countries_id:{TH:"4",MY:"5",TW:"3",SG:"1",PH:"7",VN:"6",ID:"2",BR:"8",MX:"9",CO:"10",CL:"11",PL:"12"},category1:"",categoryList1:[],category2:"",categoryList2:[],category3:"",categoryList3:[],categoryList:[]}},watch:{countryVal:{handler:function(t,e){this.category1="",this.category2="",this.category3="",this.categoryList1=[],this.categoryList2=[],this.categoryList3=[],this.getCategory(t,0)},deep:!0},category1:function(t,e){this.category2="",this.category3="",this.categoryList2=[],this.categoryList3=[],this.sendParent()},category2:function(t,e){this.category3="",this.categoryList3=[],this.sendParent()}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{chageSite:function(t){this.countryVal=t},getCategory:function(t,e){var a=this;return Object(i.a)(regeneratorRuntime.mark((function i(){var n,o;return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(a.countryVal){i.next=3;break}return a.sendParent(),i.abrupt("return");case 3:if(a.level===e)return a.sendParent(),i.abrupt("return");i.next=6;break;case 6:if(0===e||t){i.next=11;break}return a["category".concat(e+1)]="",a["categoryList".concat(e+1)]=[],a.sendParent(),i.abrupt("return");case 11:return o=[a.countryVal,0!==e?t&&""!==t?t:"":"0","1","tbCategory"],i.next=14,a.$commodityService.getCategory(o);case 14:if(n=i.sent){i.next=17;break}return i.abrupt("return",a.$message.warning("获取失败"));case 17:if(200!==(o=JSON.parse(n)).code){i.next=23;break}(o=o.data).categories&&(a["categoryList".concat(e+1)]=o.categories||[]),i.next=24;break;case 23:return i.abrupt("return",a.$message.warning("获取失败"));case 24:a.sendParent();case 25:case"end":return i.stop()}}),i)})))()},sendParent:function(){var t;this.categoryList=[],this.category1&&(t=[this.category1],this.categoryList=t),this.category1&&this.category2&&(t=[this.category1,this.category2],this.categoryList=t),this.category1&&this.category2&&this.category3&&(e=[this.category1,this.category2,this.category3],this.categoryList=e);var e={country:this.countryVal,categoryFirst:this.category1,categorySecond:this.category2,categoryThird:this.category3,categoryList:this.categoryList,platformId:this.countries_id[this.countryVal]};this.$emit("setCategory",e)}}});a("c79a"),a=a("2877"),n=Object(a.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{class:["category-content",{"category-column":!0===t.isColumn}]},[a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:"",disabled:t.isSelect},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("一级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,1)}},model:{value:t.category1,callback:function(e){t.category1=e},expression:"category1"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList1,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1),3===t.level||2===t.level?a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("二级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,2)}},model:{value:t.category2,callback:function(e){t.category2=e},expression:"category2"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList2,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1):t._e(),3===t.level?a("li",{class:[{"column-item":!0===t.isColumn}]},[a("span",{style:{width:t.spanWidth}},[t._v("三级类目：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:function(e){return t.getCategory(e,3)}},model:{value:t.category3,callback:function(e){t.category3=e},expression:"category3"}},[t.isCategoryAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.categoryList3,(function(t,e){return a("el-option",{key:e,attrs:{label:t.category_name+"("+t.category_cn_name+")",value:t.category_id}})}))],2)],1):t._e()])])}),[],!1,null,"65cef3da",null);e.a=n.exports},"3c6e":function(t,e,a){"use strict";a.r(e);var i=a("1da1"),n=(a("96cf"),a("159b"),a("99af"),a("d3b7"),a("25f0"),a("ac1f"),a("1276"),a("b0c0"),a("05e3")),o=a("0e0b"),r=a("d4ec"),s=a("bee2"),c=function(){function t(e){Object(r.a)(this,t),this._this=e}var e;return Object(s.a)(t,[{key:"tokenDianBdata",value:(e=Object(i.a)(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=e,t.next=4,this._this.$shopeemanService.getChineseLaiZan("http://open.dianba6.com/?",a,{headers:{Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","Accept-Encoding":"gzip, deflate","Accept-Language":"zh-CN,zh;q=0.9","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"}});case 4:return t.sent,t.abrupt("return",{code:des.code,data:des.data,message:des.message});case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",{code:-2,data:"refreshAccessToken-catch: ".concat(t.t0)});case 11:case"end":return t.stop()}}),t,this,[[0,8]])}))),function(t){return e.apply(this,arguments)})}]),t}();n={components:{CategoryChoose:n.a},data:function(){return{popularSelectionApiInstance:new c(this),tableData:[],country:"",platformId:4,categoryFirst:"",categorySecond:"",categoryThird:"",tableLoading:!1,deliveryPlaceList:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],shopTypeList:[{label:"全部",value:"2"},{label:"官方",value:"1"},{label:"非官方",value:"0"}],sortByList:[{label:"飙升",value:"1"},{label:"热门",value:"2"}],currentPage:1,total:0,pageSize:20,deliveryPlace:"-1",shopType:"2",sortBy:"1",minSales:0,maxSales:1e3,minGive:0,maxGive:1e3,minComments:0,maxComments:1e3,minPrice:0,maxPrice:1e3}},created:function(){this.searchShopeeHotGoods()},methods:{getLink:function(t){window.BaseUtilBridgeService.openUrl("https://xiapi.xiapibuy.com/product/"+t.shopid+"/"+t.itemid)},fasterToken:function(){var t=[];this.tableData.forEach((function(e){e="https://xiapi.xiapibuy.com/product/".concat(e.shopid,"/").concat(e.itemid),t.push(e)})),this.$message.success("链接添加成功，请手动点击采集！")},watchDBData:function(){var t=this;return Object(i.a)(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$appConfig.getUserInfo();case 2:return a=e.sent,i={uid:a.muid,phone:a.Phone,time:Date.parse(new Date).toString().substr(0,10),sign:""},e.next=6,window.BaseUtilBridgeService.getDianBaDataSign(i.time).then((function(t){i.sign=t}));case 6:window.BaseUtilBridgeService.openUrl("http://open.dianba6.com/?uid="+i.uid+"&mobile="+i.phone+"&platform=shopee&time="+i.time+"&invite_code=Wr38mSR3&version=1.0&sign="+i.sign+"&app_key=dbyEOmrAqF7unG2Mxj5L");case 7:case"end":return e.stop()}}),e)})))()},setCategory:function(t){this.country=t.country,this.platformId=t.platformId,this.categoryFirst=t.categoryFirst,this.categorySecond=t.categorySecond,this.categoryThird=t.categoryThird},searchShopeeHotGoods:function(){var t=this;return Object(i.a)(regeneratorRuntime.mark((function e(){var a,i,n,o,r,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.minPrice+"_"+t.maxPrice,i=t.minSales+"_"+t.maxSales,n=t.minGive+"_"+t.maxGive,s=t.minComments+"_"+t.maxComments,o=(t.categoryThird?3:t.categorySecond&&2)||t.categoryFirst&&1||"",r=t.categoryThird||t.categorySecond||t.categoryFirst||"",s={page:t.currentPage+"",page_size:t.pageSize+"",platform_id:t.platformId+"",cat_id:r+"",level:o+"",price:a,month_sales:i,increment_like_count:n,increment_item_rating:s,location:t.deliveryPlace,shopType:t.shopType,sortBy:t.sortBy},t.tableLoading=!0,e.prev=8,e.next=11,t.$commodityService.searchShopeeHotGoods(s);case 11:s=e.sent,s=JSON.parse(s),t.tableData=s,t.total=3e3,e.next=20;break;case 17:e.prev=17,e.t0=e.catch(8),t.$message.error("获取爆款选品列表失败");case 20:return e.prev=20,t.tableLoading=!1,e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[8,17,20,23]])})))()},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n              <td>编号</td>\n              <td>站点</td>\n              <td>商品ID</td>\n              <td>商品图片</td>\n              <td>商品名称</td>\n              <td>官方店铺</td>\n              <td>一级类目</td>\n              <td>二级类目</td>\n              <td>三级类目</td>\n              <td>创建时间</td>\n              <td>近30天销量</td>\n              <td>价格</td>\n            </tr>",a=0;a<this.tableData.length;a++){var i=this.tableData[a],n=i.cat_path&&i.cat_path.split(">")[0]&&"".concat(i.cat_path.split(">")[0],"(").concat(i.display_path_cn.split(">")[0],")")||"",r=i.cat_path&&i.cat_path.split(">")[1]&&"".concat(i.cat_path.split(">")[1],"(").concat(i.display_path_cn.split(">")[1],")")||"",s=i.cat_path&&i.cat_path.split(">")[2]&&"".concat(i.cat_path.split(">")[2],"(").concat(i.display_path_cn.split(">")[2],")")||"";e+="<tr><td>".concat(t++,"</td>\n                    <td>").concat(this.$filters.chineseSite(i.platform)+"\t","</td>\n                    <td>").concat((i.itemid||"")+"\t","</td>\n                    <td>").concat(this.$filters.imageRender([i.platform,i.shopid,i.image])+"\t","</td>\n                    <td>").concat(i.name+"\t","</td>\n                    <td>").concat((i.is_official_shop?"是":"否")+"\t","</td>\n                    <td>").concat(n+"\t","</td>\n                    <td>").concat(r+"\t","</td>\n                    <td>").concat(s+"\t","</td>\n                    <td>").concat(Object(o.f)(1e3*i.ctime,"yyyy-MM-dd")+"\t","</td>\n                    <td>").concat(i.sold||"0\t","</td>\n                    <td>").concat(i.price||"0\t","</td>\n                </tr>")}Object(o.h)("爆款选品",e)},handleCurrentChange:function(t){this.currentPage=t,this.searchShopeeHotGoods()},handleSizeChange:function(t){this.pageSize=t,this.searchShopeeHotGoods()}}},a("7b7d"),a=a("2877"),n=Object(a.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product-put-on-popular-selection"},[a("div",{staticClass:"category-choose-box"},[a("category-choose",{staticStyle:{"margin-left":"25px"},attrs:{level:3},on:{setCategory:t.setCategory}}),a("div",{staticClass:"conditions-box",staticStyle:{"margin-left":"10px"}},[a("span",[t._v("出货地点：")]),a("el-select",{staticStyle:{width:"180px"},attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.deliveryPlace,callback:function(e){t.deliveryPlace=e},expression:"deliveryPlace"}},t._l(t.deliveryPlaceList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box"},[a("span",[t._v("店铺类型：")]),a("el-select",{attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.shopType,callback:function(e){t.shopType=e},expression:"shopType"}},t._l(t.shopTypeList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box",staticStyle:{"margin-left":"25px"}},[a("span",[t._v("排行：")]),a("el-select",{attrs:{placeholder:"",value:"",size:"mini",filterable:""},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},t._l(t.sortByList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"conditions-box conditions-input",staticStyle:{"margin-left":"12px"}},[a("span",[t._v("月销量：")]),a("el-input",{staticStyle:{width:"81px"},attrs:{size:"mini"},model:{value:t.minSales,callback:function(e){t.minSales=e},expression:"minSales"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{staticStyle:{width:"81px"},attrs:{size:"mini"},model:{value:t.maxSales,callback:function(e){t.maxSales=e},expression:"maxSales"}})],1),a("div",{staticClass:"conditions-box conditions-input",staticStyle:{"margin-left":"-10px"}},[a("span",[t._v("新增点赞数：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.minGive,callback:function(e){t.minGive=e},expression:"minGive"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.maxGive,callback:function(e){t.maxGive=e},expression:"maxGive"}})],1),a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("新增评论数：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.minComments,callback:function(e){t.minComments=e},expression:"minComments"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.maxComments,callback:function(e){t.maxComments=e},expression:"maxComments"}})],1),a("div",{staticClass:"conditions-box"},[a("div",{staticClass:"conditions-box conditions-input"},[a("span",[t._v("价格区间(当地币种)：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.minPrice,callback:function(e){t.minPrice=e},expression:"minPrice"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#111",margin:"0 5px"}}),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:t.maxPrice,callback:function(e){t.maxPrice=e},expression:"maxPrice"}})],1),a("el-button",{staticStyle:{"margin-bottom":"10px","margin-left":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.searchShopeeHotGoods}},[t._v("查询")]),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.exportData}},[t._v("导出")]),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.fasterToken}},[t._v("一键采集商品")]),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.watchDBData}},[t._v("查看电霸数据")])],1)],1),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:t.tableData,"tooltip-effect":"dark","row-style":{height:"100px"},height:"calc(100vh - 215px)"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))]}}])}),a("el-table-column",{attrs:{width:"120px",label:"站点",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.platform)))]}}])}),a("el-table-column",{attrs:{width:"120px",label:"商品ID",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.getLink(e.row)}}},[t._v(t._s(e.row.itemid))])]}}])}),a("el-table-column",{attrs:{width:"100px",label:"商品图片",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-image",{attrs:{src:t._f("imageRender")([e.row.platform,e.row.shopid,e.row.image]),"preview-src-list":t._f("imageRender")([e.row.platform,e.row.shopid,e.row.image,1])}},[a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),a("span",{staticClass:"dot"},[t._v("...")])])])]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"商品名称",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.name))]}}])}),a("el-table-column",{attrs:{width:"100px",label:"官方店铺",prop:"country",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.is_official_shop?"是":"否"))]}}])}),a("el-table-column",{attrs:{"min-width":"60px",label:"一级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path&&e.row.cat_path.split(">")[0])+"("+t._s(e.row.display_path_cn&&e.row.display_path_cn.split(">")[0])+") ")]}}])}),a("el-table-column",{attrs:{"min-width":"70px",label:"二级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path.split(">")[1]&&e.row.cat_path.split(">")[1]+"("+e.row.display_path_cn.split(">")[1]+")"||"")+" ")]}}])}),a("el-table-column",{attrs:{"min-width":"80px",label:"三级类目",prop:"",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.cat_path.split(">")[2]&&e.row.cat_path.split(">")[2]+"("+e.row.display_path_cn.split(">")[2]+")"||"")+" ")]}}])}),a("el-table-column",{attrs:{width:"100px",label:"创建时间",prop:"created_at",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$dayjs(1e3*e.row.ctime).format("YYYY-MM-DD")))]}}])}),a("el-table-column",{attrs:{width:"100px",label:"近30天销量",prop:"warehouse_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.sold||"")+" ")]}}])}),a("el-table-column",{attrs:{width:"80px",label:"价格",prop:"warehouse_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.price||""))]}}])})],1),a("div",{staticClass:"pagination",staticStyle:{display:"flex","flex-flow":"row-reverse","margin-top":"10px"}},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])}),[],!1,null,null,null);e.default=n.exports},"79d2":function(t,e,a){},"7b7d":function(t,e,a){"use strict";a("79d2")},c79a:function(t,e,a){"use strict";a("eb7d")},eb7d:function(t,e,a){}}]);