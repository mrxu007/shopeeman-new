(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29a4c7b0"],{"859f":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"refuse-sign"},[a("div",{staticClass:"operating-box"},[a("div",{staticClass:"form-item"},[a("span",{staticStyle:{"margin-left":"20px"}},[e._v("添加时间：")]),a("el-date-picker",{staticStyle:{width:"195px","margin-right":"20px"},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","picker-options":e.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.createdAt,callback:function(t){e.createdAt=t},expression:"createdAt"}}),a("span",{staticClass:"title"},[e._v("类别：")]),a("el-select",{staticStyle:{width:"100px","margin-right":"20px"},attrs:{size:"mini"},model:{value:e.Type,callback:function(t){e.Type=t},expression:"Type"}},[a("el-option",{attrs:{label:"全部",value:0}}),e._l(e.typeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],2),a("span",{staticClass:"title"},[e._v("采购物流单号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.trackingNumber,callback:function(t){e.trackingNumber=t},expression:"trackingNumber"}}),a("el-button",{staticStyle:{width:"80px",height:"30px"},attrs:{type:"primary",size:"mini",loading:e.serchLoading},on:{click:function(t){return e.serchData(1)}}},[e._v("搜索")]),a("el-button",{staticStyle:{"margin-left":"10px",width:"80px",height:"30px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加")])],1)]),a("div",{staticClass:"table-box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{height:"calc(100vh - 170px)",data:e.tableData,"tooltip-effect":"dark","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"},"cell-style":{textAlign:"center"}}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1))]}}])}),a("el-table-column",{attrs:{label:"采购物流单号",prop:"value","min-width":"140px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.value)+" "),a("span",{staticClass:"copyIcon",on:{click:function(a){return e.copy(t.row.value)}}},[a("i",{staticClass:"el-icon-document-copy"})])])]}}])}),a("el-table-column",{attrs:{label:"类别",prop:"orderType","min-width":"90px"}}),a("el-table-column",{attrs:{label:"添加时间",prop:"created_at","min-width":"150px"}}),a("el-table-column",{attrs:{label:"拒收时间",prop:"appli_rejected_time","min-width":"150px"}}),a("el-table-column",{attrs:{label:"状态",prop:"status","min-width":"70px"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.status?a("div",{staticClass:"btn-box"},[e._v(" "+e._s(e.statusText[t.row.status])+" ")]):e._e()]}}])}),a("el-table-column",{attrs:{label:"操作","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"btn-box"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.cancelSign(t.row.id)}}},[e._v("删除")])],1)]}}])})],1),a("div",{staticClass:"page_to"},[a("el-pagination",{staticStyle:{display:"inline-block"},attrs:{background:"","current-page":e.page,"page-size":e.pageSize,layout:"total,sizes, prev, pager, next, jumper",total:e.total,"page-sizes":[20,50,100,200]},on:{"size-change":e.handleSizeChange,"current-change":e.newPage}})],1)],1),a("el-dialog",{attrs:{title:"添加签收管理信息",visible:e.dialogVisible,width:"360px"},on:{"update:visible":function(t){e.dialogVisible=t},closed:function(t){e.trackingNumberAdd=""}}},[a("p",{staticStyle:{"font-size":"14px",padding:"0px 14px 0 31px"}},[a("span",{staticStyle:{color:"red"}},[e._v("*")]),e._v("申请类别： "),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:e.chooseType,callback:function(t){e.chooseType=t},expression:"chooseType"}},e._l(e.typeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("p",{staticStyle:{"font-size":"14px",padding:"12px 14px 0 60px"}},[a("span",{staticStyle:{color:"red"}},[e._v("*")]),e._v("仓库："),a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:e.warehouseUserId,callback:function(t){e.warehouseUserId=t},expression:"warehouseUserId"}},e._l(e.warehouseUserList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("p",{staticStyle:{"font-size":"14px",padding:"12px 14px 0 4px"}},[a("span",{staticStyle:{color:"red"}},[e._v("*")]),e._v("采购物流单号： "),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.trackingNumberAdd,callback:function(t){e.trackingNumberAdd=t},expression:"trackingNumberAdd"}})],1),a("span",{staticClass:"dialog-footer",staticStyle:{"text-align":"center",display:"block",margin:"-10px 0 10px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{width:"80px","margin-right":"20px"},attrs:{size:"small"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{staticStyle:{width:"80px",margin:"0"},attrs:{size:"small",type:"primary"},on:{click:e.packageSign}},[e._v("确 定")])],1)])],1)},n=[],r=a("1da1"),s=(a("96cf"),a("159b"),a("a15b"),a("0e0b")),l={data:function(){return{warehouseUserList:[],warehouseUserId:"",serchLoading:!1,trackingNumber:"",tableData:[],isLoading:!1,createdAt:[],typeList:[{label:"申请拒签",value:1},{label:"申请签收",value:2}],Type:0,chooseType:1,trackingNumberAdd:"",statusText:["","未到货","已拒收","已签收"],pageSize:20,page:1,total:0,dialogVisible:!1,pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}}}},mounted:function(){this.createdAt=Object(s["e"])(30),this.serchData(),this.warehouseAddress()},methods:{warehouseAddress:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.warehouseAddress();case 2:a=t.sent,e.warehouseUserList=[],200===a.data.code&&a.data.data.forEach((function(t){e.warehouseUserList.push({label:t.warehouse_name,value:t.id})}));case 5:case"end":return t.stop()}}),t)})))()},newPage:function(e){this.page=e,this.serchData(e)},handleSizeChange:function(e){this.pageSize=e,this.page=1,this.serchData()},serchData:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i,n,r,l,c,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.serchLoading=!0,t.tableData=[],t.isLoading=!0,i={pages:e||1,pageSize:t.pageSize,trackingNumber:t.trackingNumber,type:t.Type},t.createdAt&&t.createdAt.length&&(i.createdAt=t.setDateFmt(t.createdAt).join("/")),a.prev=5,a.next=8,t.$api.refuseList({params:i});case 8:if(n=a.sent,r=n.data,200===r.code){for(l=r.data||[],c=0;c<l.length;c++)o=l[c],o.orderType=Object(s["l"])(t.typeList,"label","value",o.type);t.total=r.data.total,t.tableData=l}else t.$notify({type:"error",message:r.message});t.isLoading=!1,t.serchLoading=!1,a.next=19;break;case 15:a.prev=15,a.t0=a["catch"](5),t.isLoading=!1,t.serchLoading=!1;case 19:case"end":return a.stop()}}),a,null,[[5,15]])})))()},packageSign:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.trackingNumberAdd){t.next=2;break}return t.abrupt("return",e.$notify({type:"error",message:"请填写物流单号"}));case 2:if(e.warehouseUserId){t.next=4;break}return t.abrupt("return",e.$notify({type:"error",message:"请选择物流仓库"}));case 4:return a={trackingNumber:e.trackingNumberAdd,type:e.chooseType,warehouseUserId:e.warehouseUserId},t.prev=5,t.next=8,e.$api.packageSign(a);case 8:i=t.sent,n=i.data,200===n.code?(e.dialogVisible=!1,e.serchData(),e.$notify({type:"success",message:"添加成功"})):e.$notify({type:"error",message:n.message}),t.next=15;break;case 13:t.prev=13,t.t0=t["catch"](5);case 15:case"end":return t.stop()}}),t,null,[[5,13]])})))()},cancelSign:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i,n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isLoading=!0,i={ids:e},a.prev=2,a.next=5,t.$api.cancelSign(i);case 5:n=a.sent,r=n.data,200===r.code?(t.serchData(),t.$notify({type:"success",message:"删除成功"})):t.$notify({type:"error",message:r.message}),t.isLoading=!1,t.serchData(),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](2),t.isLoading=!1,t.serchData();case 16:case"end":return a.stop()}}),a,null,[[2,12]])})))()},setDateFmt:function(e){return e[0]=e[0].length>15?e[0]:e[0]+" 00:00:00",e[1]=e[1].length>15?e[1]:e[1]+" 23:59:59",e},copy:function(e){var t=document.createElement("div");t.id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t);try{var a=document.createRange();a.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$notify({type:"success",message:"复制成功"})}catch(i){}t.parentElement.removeChild(t)}}},c=l,o=(a("c81a"),a("2877")),p=Object(o["a"])(c,i,n,!1,null,"16968f34",null);t["default"]=p.exports},"9e02":function(e,t,a){},c81a:function(e,t,a){"use strict";a("9e02")}}]);