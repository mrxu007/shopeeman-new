(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0aba652a"],{"089e":function(e,t,s){},"471eb":function(e,t,s){"use strict";s.r(t);var a=s("1da1"),i=(s("96cf"),s("159b"),s("a434"),s("4de4"),s("7db0"),s("d81d"),s("ac1f"),s("1276"),s("0e0b")),n={name:"PrivateWarehouse",data:function(){return{pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},goodsID:"",countryVal:"TH",searchTime:[],countries:this.$filters.countries_option,pageSize:20,currentPage:1,total:0,tableData:[],tableLoading:!1,insertGoodsVisible:!1,editInfo:{},goodsName:"",goodsUrl:"",goodsCountry:"TH",goodsImage:"",skuSecondCheck:!1,skuList:[],skuSpec1:[],skuSpec2:[],skuPrice:0,skuStock:0,spec1name:"规格一",spec2name:"规格二",skuListCopy:[]}},mounted:function(){var e=(new Date).getTime();this.searchTime=[this.$dayjs(e-2592e6).format("YYYY-MM-DD"),this.$dayjs(e).format("YYYY-MM-DD")],this.searchTableList()},methods:{saveInsert:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){var s,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.skuList.length){t.next=2;break}return t.abrupt("return",e.$message.warning("缺少sku信息！"));case 2:if(s=[],e.skuSpec1.forEach((function(t){e.skuSpec2.forEach((function(e){s.push({sku_id:0,id:0,sku_name:e.sku_name?t.sku_name+","+e.sku_name:t.sku_name,stock_num:0,sku_price:0,sku_image:"",remark:"",created_at:null})}))})),e.goodsName){t.next=6;break}return t.abrupt("return",e.$message.warning("商品名称不能为空！"));case 6:return a={country:e.goodsCountry,goodsName:e.goodsName,goodsUrl:e.goodsUrl,goodsImg:e.goodsImage,userStocksSkus:JSON.stringify(s)},t.next=9,e.$api.insertUserGoods(a);case 9:200===(a=t.sent).data.code?(e.$message.success("保存成功!"),e.insertGoodsVisible=!1,e.searchTableList()):e.$message.error(a.data.message);case 11:case"end":return t.stop()}}),t)})))()},saveUpdateGoods:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){var s,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=[],e.skuList.forEach((function(e){s.push({sku_id:e.sku_id,id:e.id,sku_name:e.sku_name2?e.sku_name1+","+e.sku_name2:e.sku_name1,stock_num:e.stock_num,sku_price:e.sku_price,sku_image:e.sku_image,remark:e.remark,created_at:e.created_at})})),a={country:e.goodsCountry,id:e.editInfo.id,goodsId:e.editInfo.goodsId,goodsName:e.goodsName,goodsImg:e.goodsImage,userStocksSkus:JSON.stringify(s)},t.next=5,e.$api.updataUserGoods(a);case 5:200===(a=t.sent).data.code?(e.$message.success("保存成功!"),e.insertGoodsVisible=!1,e.searchTableList()):e.$message.error(a.data.message);case 7:case"end":return t.stop()}}),t)})))()},deleteSku:function(e,t,s,i){var n=this;return Object(a.a)(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={id:t.id,skuIdList:JSON.stringify([s.id])},a.next=3,n.$api.deleteUserSku(r);case 3:200===(r=a.sent).data.code?(n.$message.success("删除成功!"),n.tableData[e].user_stocks_skus.splice(i,1)):n.$message.error(r.data.message);case 5:case"end":return a.stop()}}),a)})))()},setSkuPriceStock:function(){var e=this;this.skuList.length&&this.skuList.forEach((function(t){t.stock_num=e.skuStock,t.sku_price=e.skuPrice}))},addSpec1:function(){this.skuSpec1.push({sku_name:""}),this.createSkuList()},addSpec2:function(){this.skuSpec2.push({sku_name:""}),this.createSkuList()},deleteEditSku:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function s(){var a,i,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(a="",i=[],e.forEach((function(e){e.sys_stock_id&&(a=e.sys_stock_id,i.push(e.id))})),a&&i.length)return n={id:a,skuIdList:JSON.stringify(i)},s.next=7,t.$api.deleteUserSku(n);s.next=9;break;case 7:200===(n=s.sent).data.code?t.$message.success("删除成功!"):t.$message.error(n.data.message);case 9:case"end":return s.stop()}}),s)})))()},deleteSpec1:function(e){var t=this,s=JSON.parse(JSON.stringify(this.skuList));this.skuList=s.filter((function(s){return s.sku_name1!==t.skuSpec1[e].sku_name})),s=s.filter((function(s){return s.sku_name1===t.skuSpec1[e].sku_name})),s&&this.deleteEditSku(s),this.skuSpec1.splice(e,1)},deleteSpec2:function(e){var t=this,s=JSON.parse(JSON.stringify(this.skuList));this.skuList=s.filter((function(s){return s.sku_name1!==t.skuSpec2[e].sku_name})),s=s.filter((function(s){return s.sku_name1===t.skuSpec2[e].sku_name})),s&&this.deleteEditSku(s),this.skuSpec2.splice(e,1)},sepcInput:function(e,t){if(this.skuList.find((function(t){return t.sku_name1===e||t.sku_name2===e})))return this.$message.warning("此规格已存在");this.createSkuList()},createSkuList:function(){var e=this;if(this.skuList=[],0===this.skuSpec1.length&&0===this.skuSpec2.length&&(this.skuList=[]),0<this.skuSpec1.length&&0===this.skuSpec2.length&&(this.skuList=this.skuSpec1.map((function(t){var s=e.skuListCopy.find((function(e){return e.sku_name1===t.sku_name}));return s?{sys_stock_id:s.sys_stock_id,sku_id:s.sku_id,id:s.id,sku_name1:s.sku_name1,sku_name2:"",stock_num:s.stock_num,sku_price:s.sku_price,sku_image:s.sku_image,remark:s.remark,created_at:s.created_at}:{sku_id:0,id:0,sku_name1:t.sku_name,sku_name2:"",stock_num:0,sku_price:0,sku_image:"",remark:"",created_at:null}}))),0===this.skuSpec1.length&&0<this.skuSpec2.length)return this.$message.warning("规格一必填！");0<this.skuSpec1.length&&0<this.skuSpec2.length&&this.skuSpec1.forEach((function(t){e.skuSpec2.forEach((function(s){var a=e.skuListCopy.find((function(e){return e.sku_name1===t.sku_name&&e.sku_name2===s.sku_name}));a?e.skuList.push({sku_id:a.sku_id,id:a.id,sku_name1:a.sku_name1,sku_name2:a.sku_name2,stock_num:a.stock_num,sku_price:a.sku_price,sku_image:a.sku_image,remark:a.remark,created_at:a.created_at}):e.skuList.push({sku_id:0,id:0,sku_name1:t.sku_name,sku_name2:s.sku_name,stock_num:0,sku_price:0,sku_image:"",remark:"",created_at:null})}))}))},searchTableList:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(s={country:e.countryVal,goodsId:e.goodsID,createTime:""}).createTime=e.$dayjs(e.searchTime[0]).format("YYYY-MM-DD")+" 00:00:00/"+e.$dayjs(e.searchTime[1]).format("YYYY-MM-DD")+" 23:59:59",e.tableLoading=!0,t.next=5,e.$api.getUserStore(s);case 5:(s=t.sent)&&200===s.data.code?(e.total=s.data.data.total,e.tableData=s.data.data.data):e.$message.error(s.data.message),e.tableLoading=!1;case 8:case"end":return t.stop()}}),t)})))()},handleChange:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function s(){var n,r,o;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:n=t,r=e.raw,(o=new FileReader).readAsDataURL(r),o.onload=Object(a.a)(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.imgData=o.result,s=Object(i.n)(!1,32)+"_"+(new Date).getTime(),e.next=4,t.$ossService.uploadFile(n.imgData,s);case 4:s=e.sent,t.goodsImage=s;case 6:case"end":return e.stop()}}),e)})));case 5:case"end":return s.stop()}}),s)})))()},deleteGoods:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return a={id:e.id},s.next=3,t.$api.deleteUserGoods(a);case 3:200===(a=s.sent).data.code?(t.$message.success("删除成功"),t.searchTableList()):t.$message.error(a.data.message);case 5:case"end":return s.stop()}}),s)})))()},closeDialog:function(){this.countryVal="TH",this.goodsName="",this.goodsUrl="",this.goodsImage="",this.skuList=[],this.skuSpec1=[],this.skuSpec2=[],this.editInfo={}},editGoods:function(e){var t=this;this.insertGoodsVisible=!0,this.editInfo=e,this.goodsCountry=e.country,this.goodsName=e.goods_name,this.goodsUrl=e.goods_url,this.goodsImage=e.goods_img,e.user_stocks_skus.forEach((function(e,s){var a,i=e.sku_name.split(",")||[];1==i.length?(e.sku_name1=i[0],a={sku_name:i[0],sku_disabled:!0},t.skuSpec1.find((function(e){return e.sku_name===i[0]}))||t.skuSpec1.push(a)):2<=i.length&&(e.sku_name1=i[0],e.sku_name2=i[1],a={sku_name:i[0],sku_disabled:!0},e={sku_name:i[1],sku_disabled:!0},t.skuSpec1.find((function(e){return e.sku_name===i[0]}))||t.skuSpec1.push(a),t.skuSpec2.find((function(e){return e.sku_name===i[1]}))||t.skuSpec2.push(e))})),this.skuListCopy=JSON.parse(JSON.stringify(e.user_stocks_skus)),this.skuList=e.user_stocks_skus},totalStock:function(e){for(var t=0,s=0;s<e.length;s++)t+=e[s].stock_num;return t},handleCurrentChange:function(e){this.currentPage=e,this.searchTableList()},handleSizeChange:function(e){this.pageSize=e,this.searchTableList()}}};s("d755"),s=s("2877"),n=Object(s.a)(n,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"private-store"},[s("div",{staticClass:"tool-bar"},[s("div",{staticClass:"tool-row"},[s("div",{staticClass:"tool-item mar-right"},[s("span",{staticStyle:{width:"60px"}},[e._v("站点：")]),s("el-select",{attrs:{size:"mini",filterable:""},model:{value:e.countryVal,callback:function(t){e.countryVal=t},expression:"countryVal"}},e._l(e.countries,(function(e,t){return s("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),s("div",{staticClass:"tool-item mar-right"},[s("span",[e._v("商品ID：")]),s("el-input",{attrs:{placeholder:"",size:"mini",clearable:""},model:{value:e.goodsID,callback:function(t){e.goodsID=t},expression:"goodsID"}})],1),s("div",{staticClass:"tool-item mar-right"},[s("span",[e._v("查询时间：")]),s("el-date-picker",{staticStyle:{width:"200px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}})],1),s("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:e.searchTableList}},[e._v("查 询")]),s("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:function(t){e.insertGoodsVisible=!0}}},[e._v("新增商品")])],1)]),s("div",{staticClass:"content"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",attrs:{data:e.tableData,"tooltip-effect":"dark","max-height":"700"}},[s("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s((e.currentPage-1)*e.pageSize+t.$index+1))]}}])}),s("el-table-column",{attrs:{"min-width":"120px",label:"商品ID",prop:"goods_id",align:"center"}}),s("el-table-column",{attrs:{"min-width":"120px",label:"商品名称",prop:"goods_name",align:"center","show-overflow-tooltip":""}}),s("el-table-column",{attrs:{"min-width":"80",label:"商品链接",prop:"goods_url",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.goods_url?s("div",[s("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("查看商品")])],1):e._e()]}}])}),s("el-table-column",{attrs:{label:"商品图片",width:"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[s("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.row.goods_img}})]}}])}),s("el-table-column",{attrs:{"min-width":"60px",label:"库存",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.totalStock(t.row.user_stocks_skus)))]}}])}),s("el-table-column",{attrs:{type:"expand",width:"120",align:"center",label:"sku信息详情","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row,i=t.$index;return[s("div",{staticClass:"subTable"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:a.user_stocks_skus,"header-cell-style":{backgroundColor:"#a9a9a9",color:"#fff"}}},[s("el-table-column",{attrs:{label:"序号",type:"index",align:"center"}}),s("el-table-column",{attrs:{label:"SKU图片",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[s("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.row.sku_image}})]}}],null,!0)}),s("el-table-column",{attrs:{label:"SKU ID",prop:"sku_id",align:"center"}}),s("el-table-column",{attrs:{label:"SKU名称",prop:"sku_name",align:"center"}}),s("el-table-column",{attrs:{label:"价格",prop:"sku_price",align:"center"}}),s("el-table-column",{attrs:{label:"库存",prop:"stock_num",align:"center"}}),s("el-table-column",{attrs:{label:"操作",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.deleteSku(i,a,t.row,t.$index)}}},[e._v("删 除")])]}}],null,!0)})],1)],1)]}}])}),s("el-table-column",{attrs:{"min-width":"60px",label:"创建时间",prop:"created_at",align:"center"}}),s("el-table-column",{attrs:{label:"操作","min-width":"60px"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",[s("el-button",{staticClass:"mar-right",attrs:{type:"primary",size:"mini"},on:{click:function(s){return e.deleteGoods(t.row)}}},[e._v("删 除")]),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(s){return e.editGoods(t.row)}}},[e._v("编 辑")])],1)]}}])})],1),s("div",{staticClass:"pagination"},[s("el-pagination",{attrs:{background:"","page-sizes":[10,20,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1),s("el-dialog",{attrs:{title:"自有商品编辑",visible:e.insertGoodsVisible,width:"1200px",top:"5vh"},on:{"update:visible":function(t){e.insertGoodsVisible=t},close:e.closeDialog}},[s("div",{staticClass:"goodsInsert-dialog"},[s("div",{staticClass:"header-btn"},[s("el-row",{staticStyle:{width:"100%"}},[s("el-col",{staticClass:"mar-right",attrs:{span:9}},[s("div",{staticClass:"tool-item"},[s("span",[e._v("商品名称：")]),s("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"",size:"mini",clearable:""},model:{value:e.goodsName,callback:function(t){e.goodsName=t},expression:"goodsName"}})],1),s("div",{staticClass:"tool-item"},[s("span",[e._v("商品链接：")]),s("el-input",{staticStyle:{flex:"1"},attrs:{placeholder:"",size:"mini",clearable:""},model:{value:e.goodsUrl,callback:function(t){e.goodsUrl=t},expression:"goodsUrl"}})],1),s("div",{staticClass:"tool-item"},[s("div",{staticClass:"tool-item mar-right"},[s("span",[e._v("站点：")]),s("el-select",{staticStyle:{"min-width":"100px",flex:"1"},attrs:{size:"mini",filterable:""},model:{value:e.goodsCountry,callback:function(t){e.goodsCountry=t},expression:"goodsCountry"}},e._l(e.countries,(function(e,t){return s("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),e.goodsImage?s("div",{staticClass:"tool-item"},[s("span",[e._v("商品主图：")]),s("el-image",{staticStyle:{width:"148px",height:"148px"},attrs:{src:e.goodsImage},on:{click:function(t){e.goodsImage=""}}})],1):s("div",{staticClass:"tool-item"},[s("span",[e._v("商品主图：")]),s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"#","show-file-list":!1,"list-type":"picture-card","on-change":e.handleChange}},[s("i",{staticClass:"el-icon-plus"})])],1)])]),s("el-col",{staticClass:"mar-right",attrs:{span:7}},[s("div",{staticClass:"sku-box"},[s("span",{staticClass:"sku-title"},[e._v("规格一")]),s("div",{staticClass:"sku-item"},[s("div",{staticClass:"tool-item"},[s("span",[e._v("规格名称")]),s("el-input",{attrs:{placeholder:"",size:"mini",clearable:""},model:{value:e.spec1name,callback:function(t){e.spec1name=t},expression:"spec1name"}})],1),s("div",{staticClass:"tool-item"},[s("span",[e._v("选项")]),s("div",{staticClass:"sku-item-box"},e._l(e.skuSpec1,(function(t,a){return s("div",{key:a+"spec1",staticClass:"sku-Spec"},[s("el-input",{attrs:{placeholder:"",size:"mini",clearable:"",disabled:t.sku_disabled},on:{input:function(t){return e.sepcInput(t,a)}},model:{value:t.sku_name,callback:function(s){e.$set(t,"sku_name",s)},expression:"item.sku_name"}}),s("i",{staticClass:"el-icon-plus"}),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.deleteSpec1(a)}}},[e._v("删除")])],1)})),0)]),s("div",{staticClass:"tool-item"},[s("span"),s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",size:"mini"},on:{click:e.addSpec1}},[e._v("添加选项")])],1)])])]),s("el-col",{attrs:{span:7}},[s("div",{staticClass:"sku-box"},[s("div",{staticClass:"sku-title"},[s("el-checkbox",{model:{value:e.skuSecondCheck,callback:function(t){e.skuSecondCheck=t},expression:"skuSecondCheck"}},[e._v("规格二")])],1),s("div",{staticClass:"sku-item"},[s("div",{staticClass:"tool-item"},[s("span",[e._v("规格名称")]),s("el-input",{attrs:{placeholder:"",size:"mini",clearable:""},model:{value:e.spec2name,callback:function(t){e.spec2name=t},expression:"spec2name"}})],1),s("div",{staticClass:"tool-item"},[s("span",[e._v("选项")]),s("div",{staticClass:"sku-item-box"},e._l(e.skuSpec2,(function(t,a){return s("div",{key:a+"spec2",staticClass:"sku-Spec"},[s("el-input",{staticClass:"mar-right",attrs:{placeholder:"",size:"mini",clearable:"",disabled:!e.skuSecondCheck||t.sku_disabled},on:{input:function(t){return e.sepcInput(t,a)}},model:{value:t.sku_name,callback:function(s){e.$set(t,"sku_name",s)},expression:"item.sku_name"}}),s("el-button",{attrs:{type:"primary",size:"mini",disabled:!e.skuSecondCheck},on:{click:function(t){return e.deleteSpec2(a)}}},[e._v("删除")])],1)})),0)]),s("div",{staticClass:"tool-item"},[s("span"),s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",size:"mini",disabled:!e.skuSecondCheck},on:{click:e.addSpec2}},[e._v("添加选项")])],1)])])])],1),s("el-row",{staticStyle:{width:"100%",display:"flex","margin-top":"10px"}},[s("el-col",{staticClass:"mar-right",attrs:{span:9}}),s("el-col",{attrs:{span:14}},[s("div",{staticClass:"tool-item"},[s("span",{staticClass:"mar-right"},[e._v("规格咨询")]),s("span",[e._v("价格")]),s("el-input",{staticClass:"mar-right",staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini",clearable:""},on:{input:e.setSkuPriceStock},model:{value:e.skuPrice,callback:function(t){e.skuPrice=t},expression:"skuPrice"}}),s("span",[e._v("数量")]),s("el-input",{staticClass:"mar-right",staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini",clearable:""},on:{input:e.setSkuPriceStock},model:{value:e.skuStock,callback:function(t){e.skuStock=t},expression:"skuStock"}}),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.setSkuPriceStock}},[e._v("批量更新")])],1)])],1)],1),s("div",{staticClass:"content-table"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"skuTable",attrs:{data:e.skuList,"tooltip-effect":"dark",height:"280"}},[s("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),s("el-table-column",{attrs:{width:"120px",label:"规格一",prop:"sku_name1",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.sku_name1))]}}])}),s("el-table-column",{attrs:{width:"120px",label:"规格二",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.sku_name2))]}}])}),s("el-table-column",{attrs:{width:"120px",label:"库存",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.row.stock_num,callback:function(s){e.$set(t.row,"stock_num",s)},expression:"scope.row.stock_num"}})]}}])}),s("el-table-column",{attrs:{width:"120px",label:"单买价（元）",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.row.sku_price,callback:function(s){e.$set(t.row,"sku_price",s)},expression:"scope.row.sku_price"}})]}}])}),s("el-table-column",{attrs:{width:"120px",label:"规格备注",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.row.remark,callback:function(s){e.$set(t.row,"remark",s)},expression:"scope.row.remark"}})]}}])}),s("el-table-column",{attrs:{"min-width":"60px",label:"规格图",prop:"platform_mall_name",align:"center"}}),s("el-table-column",{attrs:{width:"140px",label:"SKU ID",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.sku_id))]}}])}),s("el-table-column",{attrs:{width:"160px",label:"创建时间",prop:"sku_name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.created_at))]}}])})],1)],1),s("div",{staticClass:"footer"},[e.editInfo.id?s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.saveUpdateGoods}},[e._v("保 存")]):s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.saveInsert}},[e._v("新 增")])],1)])])],1)}),[],!1,null,"2ebbd294",null);t.default=n.exports},d755:function(e,t,s){"use strict";s("089e")}}]);