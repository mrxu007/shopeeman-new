(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1019c6f3"],{"859f":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"refuse-sign"},[a("div",{staticClass:"operating-box"},[a("div",{staticClass:"form-item"},[a("span",{staticClass:"title"},[e._v("采购物流单号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.trackingNumber,callback:function(t){e.trackingNumber=t},expression:"trackingNumber"}}),a("el-button",{attrs:{type:"primary",size:"mini",loading:e.serchLoading},on:{click:function(t){return e.serchData(1)}}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加")])],1)]),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{height:"calc(100vh - 110px)",data:e.tableData,"tooltip-effect":"dark","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"},"cell-style":{textAlign:"center"}}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1))]}}])}),a("el-table-column",{attrs:{label:"采购物流单号",prop:"value","min-width":"140px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.value)+" "),a("span",{staticClass:"copyIcon",on:{click:function(a){return e.copy(t.row.value)}}},[a("i",{staticClass:"el-icon-document-copy"})])])]}}])}),a("el-table-column",{attrs:{label:"仓库名称",prop:"warehouse_name","min-width":"150px"}}),a("el-table-column",{attrs:{label:"类别",prop:"orderType","min-width":"90px"}}),a("el-table-column",{attrs:{label:"添加时间",prop:"created_at","min-width":"150px"}}),a("el-table-column",{attrs:{label:"拒收时间",prop:"rejected_time","min-width":"150px"}}),a("el-table-column",{attrs:{label:"状态",prop:"status","min-width":"70px"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.status?a("div",{staticClass:"btn-box"},[e._v(" "+e._s(e.statusText[t.row.status])+" ")]):e._e()]}}])}),a("el-table-column",{attrs:{label:"操作","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"btn-box"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.cancelSign(t.row.id)}}},[e._v("删除")])],1)]}}])})],1)],1),a("el-dialog",{attrs:{title:"添加签收管理信息",visible:e.dialogVisible,width:"360px","close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:function(t){e.trackingNumberAdd=""}}},[a("el-form",{attrs:{"label-position":"right","label-width":"100px"}},[a("el-form-item",{attrs:{label:"申请类别："}},[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:e.chooseType,callback:function(t){e.chooseType=t},expression:"chooseType"}},e._l(e.typeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"仓库："}},[a("el-select",{staticStyle:{width:"180px"},attrs:{size:"mini"},model:{value:e.warehouseUserId,callback:function(t){e.warehouseUserId=t},expression:"warehouseUserId"}},e._l(e.warehouseUserList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.warehouse_name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"采购物流单号："}},[a("li",[a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.trackingNumberAdd,callback:function(t){e.trackingNumberAdd=t},expression:"trackingNumberAdd"}})],1)])],1),a("div",{staticClass:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{loading:e.addLoding,size:"mini",type:"primary"},on:{click:e.packageSign}},[e._v("确 定")])],1)],1)],1)},r=[],i=a("1da1"),s=(a("96cf"),a("4de4"),a("a15b"),a("0e0b")),c={data:function(){return{addLoding:!1,warehouseUserList:[],warehouseUserId:"",serchLoading:!1,trackingNumber:"",tableData:[],isLoading:!1,createdAt:[],typeList:[{label:"申请拒签",value:1},{label:"申请签收",value:2}],Type:0,chooseType:1,trackingNumberAdd:"",statusText:["","未到货","已拒收","已签收"],pageSize:20,page:1,total:0,dialogVisible:!1,pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}}}},mounted:function(){this.createdAt=Object(s["e"])(30),this.serchData(),this.getUserWarehouse()},methods:{getUserWarehouse:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getUserWarehouse();case 2:a=t.sent,e.warehouseUserList,200===a.data.code?(e.warehouseUserList=a.data.data.filter((function(e){return 0===e.isUser})),e.warehouseUserId=e.warehouseUserList[0].id):e.$message.error("获取仓库数据失败");case 5:case"end":return t.stop()}}),t)})))()},newPage:function(e){this.page=e,this.serchData(e)},handleSizeChange:function(e){this.pageSize=e,this.page=1,this.serchData()},serchData:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,i,c,o,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.serchLoading=!0,t.tableData=[],t.isLoading=!0,n={pages:e||1,pageSize:t.pageSize,trackingNumber:t.trackingNumber},t.createdAt&&t.createdAt.length&&(n.createdAt=t.setDateFmt(t.createdAt).join("/")),a.prev=5,a.next=8,t.$api.refuseList({params:n});case 8:if(r=a.sent,i=r.data,200===i.code){for(c=i.data||[],o=0;o<c.length;o++)l=c[o],l.orderType=Object(s["r"])(t.typeList,"label","value",l.type);t.tableData=c}else t.$message({type:"error",message:i.message});t.isLoading=!1,t.serchLoading=!1,a.next=19;break;case 15:a.prev=15,a.t0=a["catch"](5),t.isLoading=!1,t.serchLoading=!1;case 19:case"end":return a.stop()}}),a,null,[[5,15]])})))()},packageSign:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.trackingNumberAdd){t.next=2;break}return t.abrupt("return",e.$message("请填写物流单号"));case 2:return e.addLoding=!0,a={trackingNumber:e.trackingNumberAdd,type:e.chooseType,warehouseUserId:e.warehouseUserId},t.prev=4,t.next=7,e.$api.packageSign(a);case 7:n=t.sent,r=n.data,200===r.code?(e.dialogVisible=!1,e.serchData(),e.$message({type:"success",message:"添加成功"})):e.$message({type:"error",message:r.message}),t.next=14;break;case 12:t.prev=12,t.t0=t["catch"](4);case 14:e.addLoding=!1;case 15:case"end":return t.stop()}}),t,null,[[4,12]])})))()},cancelSign:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$confirm("数据无法恢复，确定删除吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isLoading=!0,n={ids:e},a.prev=2,a.next=5,t.$api.cancelSign(n);case 5:r=a.sent,i=r.data,200===i.code?(t.serchData(),t.$message({type:"success",message:"删除成功"})):t.$message({type:"error",message:i.message}),t.isLoading=!1,t.serchData(),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](2),t.isLoading=!1,t.serchData();case 16:case"end":return a.stop()}}),a,null,[[2,12]])}))));case 1:case"end":return a.stop()}}),a)})))()},setDateFmt:function(e){return e[0]=e[0].length>15?e[0]:e[0]+" 00:00:00",e[1]=e[1].length>15?e[1]:e[1]+" 23:59:59",e},copy:function(e){var t=document.createElement("div");t.id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t);try{var a=document.createRange();a.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message({type:"success",message:"复制成功"})}catch(n){}t.parentElement.removeChild(t)}}},o=c,l=(a("86fd"),a("2877")),u=Object(l["a"])(o,n,r,!1,null,"070b2b9c",null);t["default"]=u.exports},"86fd":function(e,t,a){"use strict";a("df4b")},df4b:function(e,t,a){}}]);