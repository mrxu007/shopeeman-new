(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5341112e"],{"66d3":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[n("el-form-item",{attrs:{label:"收货省："}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择",size:"mini"},on:{change:function(t){e.flag=!1}},model:{value:e.province,callback:function(t){e.province=t},expression:"province"}},e._l(e.provinceList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.RegionName||e.division_name,value:e.RegionId||e.id}})})),1)],1),n("el-form-item",{attrs:{label:"收货市："}},[n("el-select",{attrs:{disabled:!e.province,placeholder:"请选择",size:"mini"},on:{change:function(t){e.flag=!1}},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}},e._l(e.cityList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.RegionName||e.division_name,value:e.RegionId||e.id}})})),1)],1),n("el-form-item",{attrs:{label:"收货区："}},[n("el-select",{attrs:{disabled:!e.city,placeholder:"请选择",size:"mini"},on:{change:function(t){e.flag=!1}},model:{value:e.distinct,callback:function(t){e.distinct=t},expression:"distinct"}},e._l(e.distinctList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.RegionName||e.division_name,value:e.RegionId||e.id}})})),1)],1)],1)],1)},a=[],i=n("1da1"),s=(n("96cf"),n("159b"),n("d3b7"),n("25f0"),n("99af"),{name:"AddressModel",props:{isInit:{type:Boolean,default:!1},country:{type:String,default:""}},data:function(){return{provinceList:[],cityList:[],distinctList:[],province:"",city:"",distinct:"",provinceName:"",cityName:"",distinctName:"",addressData:{},flag:!1}},watch:{country:{handler:function(e,t){this.getPddAddressModel("0","provinceList","province")}},province:{handler:function(e,t){var n=this;this.getPddAddressModel(this.province,"cityList","city"),this.provinceList.forEach((function(e){e.RegionId!==n.province&&e.id!==n.province||(n.addressData["province_id"]=e.RegionId||e.id.toString(),n.addressData["province_text"]=e.RegionName||e.division_name)})),this.sendData()},deep:!0},city:{handler:function(e,t){var n=this;this.getPddAddressModel(this.city,"distinctList","distinct"),this.cityList.forEach((function(e){e.RegionId!==n.city&&e.id!==n.city||(n.addressData["city_id"]=e.RegionId||e.id.toString(),n.addressData["city_text"]=e.RegionName||e.division_name)})),this.sendData()},deep:!0},distinct:{handler:function(e,t){var n=this;this.distinctList.forEach((function(e){e.RegionId!==n.distinct&&e.id!==n.distinct||(n.addressData["distinct_id"]=e.RegionId||e.id.toString(),n.addressData["distinct_text"]=e.RegionName||e.division_name)})),this.sendData()},deep:!0}},mounted:function(){this.isInit&&this.init()},methods:{update:function(e,t,n){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r.flag=!0,a.next=3,r.getPddAddressModel("0","provinceList","province");case 3:return r.province=e.toString(),a.next=6,r.getPddAddressModel(r.province,"cityList","city");case 6:return r.city=t.toString(),a.next=9,r.getPddAddressModel(r.city,"distinctList","distinctList");case 9:r.distinct=n.toString(),r.sendData();case 11:case"end":return a.stop()}}),a)})))()},init:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.flag=!1,t.next=3,e.getPddAddressModel("0","provinceList","province");case 3:e.sendData();case 4:case"end":return t.stop()}}),t)})))()},getPddAddressModel:function(e,t,n){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var i,s,o,l,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=e,"TW"!==r.country){a.next=22;break}return a.next=4,r.$BaseUtilService.getPddAddressModel(e);case 4:if(s=a.sent,o=[],"tw"===e&&(i="0"),"0"!==e){a.next=12;break}l={RegionName:"台湾",RegionId:"tw"},o=[l],a.next=18;break;case 12:return c=r.$filters.sitePlatform("TW"),a.next=15,r.$commodityService.getShopeeAddress(c,"1",i);case 15:o=a.sent,o=o&&JSON.parse(o)||[],o.forEach((function(e){e["RegionId"]=e.id}));case 18:r[t]=s.concat(o),r[n]=r.flag?r[n]:r[t][0]?r[t][0].RegionId:"",a.next=27;break;case 22:return a.next=24,r.$BaseUtilService.getPddAddressModel(e);case 24:u=a.sent,r[t]=u,r[n]=r.flag?r[n]:r[t][0].RegionId;case 27:case"end":return a.stop()}}),a)})))()},sendData:function(){this.$emit("sendData",this.addressData)}}}),o=s,l=(n("b4843"),n("2877")),c=Object(l["a"])(o,r,a,!1,null,"1fab177e",null);t["a"]=c.exports},"7c76":function(e,t,n){},8039:function(e,t,n){},b4843:function(e,t,n){"use strict";n("7c76")},daa1:function(e,t,n){"use strict";n("8039")},fe1b:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-row",{staticClass:"contaniner"},[n("el-row",{staticClass:"header"},[n("ul",{staticStyle:{"margin-bottom":"10px"}},[n("li",[n("span",[e._v("包裹签收时间：")]),n("el-date-picker",{attrs:{"unlink-panels":"",size:"mini",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.signingTime,callback:function(t){e.$set(e.form,"signingTime",t)},expression:"form.signingTime"}})],1),n("li",[n("span",[e._v("订单编号：")]),n("el-input",{attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",t)},expression:"form.orderNum"}})],1),n("li",[n("span",[e._v("包裹物流编号：")]),n("el-input",{attrs:{clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.form.logisticsNum,callback:function(t){e.$set(e.form,"logisticsNum",t)},expression:"form.logisticsNum"}})],1)]),n("ul",[n("li",[n("span",[e._v("申请退件时间：")]),n("el-date-picker",{attrs:{"unlink-panels":"",size:"mini",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.applyReturnTime,callback:function(t){e.$set(e.form,"applyReturnTime",t)},expression:"form.applyReturnTime"}})],1),n("li",[n("span",[e._v("包裹状态：")]),n("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.form.packageStatus,callback:function(t){e.$set(e.form,"packageStatus",t)},expression:"form.packageStatus"}},[n("el-option",{attrs:{label:"全部",value:0}}),e._l(e.packageStatusList,(function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),n("li",[n("el-button",{attrs:{type:"primary",size:"mini",disabled:e.cancelLoading},on:{click:function(t){e.page=1,e.getSignPackageList()}}},[e._v("查询")]),n("el-button",{attrs:{type:"primary",size:"mini",disabled:e.cancelLoading},on:{click:function(t){return e.returnParts(e.multipleSelection,1)}}},[e._v("批量申请退件")]),n("el-button",{attrs:{type:"primary",size:"mini",loading:e.cancelLoading},on:{click:function(t){return e.cancelReturn(e.multipleSelection)}}},[e._v("批量取消退件")])],1)])]),n("el-row",{attrs:{id:"article"}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isShowLoading,expression:"isShowLoading"}],ref:"plTable",attrs:{"row-style":{height:"68px"},height:"calc(100vh - 200px)",data:e.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{align:"center",type:"selection","min-width":"50px",fixed:""}}),n("el-table-column",{attrs:{align:"center",type:"index",label:"序号",fixed:""}}),n("el-table-column",{attrs:{align:"center",prop:"package_code",label:"包裹物流单号","min-width":"150px",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(" "+e._s(r.package_code)+" "),r.package_code?n("span",{staticClass:"copyIcon",on:{click:function(t){return e.copy(r.package_code)}}},[n("i",{staticClass:"el-icon-document-copy"})]):e._e()])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"order_sn",label:"订单编号","min-width":"180px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(" "+e._s(r.order_sn)+" "),r.order_sn?n("span",{staticClass:"copyIcon",on:{click:function(t){return e.copy(r.order_sn)}}},[n("i",{staticClass:"el-icon-document-copy"})]):e._e()])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"variation_sku",label:"商品规格","min-width":"120px","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{align:"center",prop:"warehouse_name",label:"签收仓库","min-width":"130px","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{align:"center",prop:"package_time",label:"签收时间","min-width":"180px"}}),n("el-table-column",{attrs:{align:"center",prop:"status",label:"状态","min-width":"70px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s(e.statusObj[n.status]?e.statusObj[n.status]:"")+" ")]}}])}),n("el-table-column",{attrs:{align:"center",prop:"package_image",label:"签收图片","min-width":"120px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.package_image?n("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("el-image",{staticStyle:{width:"400px",height:"400px"},attrs:{src:r.package_image}},[n("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1),n("el-image",{attrs:{src:r.package_image,alt:""}},[n("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"})])],1):e._e()]}}])}),n("el-table-column",{attrs:{align:"center",label:"退件信息","min-width":"180px"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[2===r.isApplyReturn?n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.getReturnInfo(r)}}},[e._v("查看")]):e._e()]}}])}),n("el-table-column",{attrs:{align:"center",prop:"appli_return_time",label:"申请退件时间","min-width":"180px"}}),n("el-table-column",{attrs:{align:"center",prop:"return_shipping_number",label:"退件物流单号","min-width":"180px"}}),n("el-table-column",{attrs:{align:"center",prop:"return_time",label:"退件时间","min-width":"180px"}}),n("el-table-column",{attrs:{align:"center",prop:"return_shipping_name",label:"退件物流公司","min-width":"180px"}}),n("el-table-column",{attrs:{label:"操作","min-width":"120px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[1===r.isApplyReturn?n("el-button",{attrs:{disabled:e.cancelLoading,type:"primary",size:"mini"},on:{click:function(t){return e.returnParts(r,2)}}},[e._v(e._s(3===r.warehouse_type?"海外仓退件":"退件")+" ")]):e._e(),2===r.isApplyReturn?n("el-button",{attrs:{disabled:e.cancelLoading,type:"primary",size:"mini"},on:{click:function(t){return e.cancelReturn(r)}}},[e._v("取消退件")]):e._e()]}}])})],1),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e.returnMsgDialog?n("el-dialog",{staticClass:"dialog",attrs:{title:"填写退件信息","close-on-click-modal":!1,visible:e.returnMsgDialog,width:"350px","close-on-press-escape":!1,"show-close":!e.isButLoading},on:{"update:visible":function(t){e.returnMsgDialog=t},close:e.handleClose}},[n("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[n("el-form-item",{attrs:{label:"收件人："}},[n("el-input",{attrs:{clearable:"",placeholder:"请填写收件人",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.returnMsg.returnContact,callback:function(t){e.$set(e.returnMsg,"returnContact",t)},expression:"returnMsg.returnContact"}})],1),n("el-form-item",{attrs:{label:"联系电话："}},[n("el-input",{attrs:{clearable:"",placeholder:"请填写联系电话",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.returnMsg.returnPhoneNumber,callback:function(t){e.$set(e.returnMsg,"returnPhoneNumber",t)},expression:"returnMsg.returnPhoneNumber"}})],1),e.isOverseas?e._e():n("div",[n("address-model",{ref:"addressModel",attrs:{"is-init":""},on:{sendData:e.sendData}})],1),n("el-form-item",{attrs:{label:e.isOverseas?"退件地址：":"详细地址："}},[n("el-input",{attrs:{type:"textarea",resize:"none",placeholder:"请填写详细地址",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.returnMsg.returnAddress,callback:function(t){e.$set(e.returnMsg,"returnAddress",t)},expression:"returnMsg.returnAddress"}})],1),e.isOverseas?n("div",[n("div",{staticClass:"tip"},[n("p",[e._v("shoppe平台包裹：上传平台返回的退件包裹二维码")]),n("p",[e._v("Lazada平台包裹：上传平台返回的退件包裹PDF文件")])]),n("el-form-item",{attrs:{label:"包裹文件："}},[n("div",{staticStyle:{display:"flex"}},[n("div",[n("el-button",{attrs:{loading:e.upFileLiadding,type:"primary",size:"mini"},on:{click:e.reupload}},[n("i",{staticClass:"el-icon-upload el-icon--right"},[e._v(" 上传文件 ")])])],1),n("div",{staticClass:"img-box",staticStyle:{width:"40px",height:"40px","margin-left":"5px"}},[n("img",{attrs:{src:e.returnMsg.returnFile,alt:"",width:"40px",height:"40px"}})])])])],1):e._e(),n("el-form-item",{attrs:{label:"退件备注："}},[n("el-input",{attrs:{type:"textarea",resize:"none",size:"mini",placeholder:"请填写退件备注",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.returnMsg.returnRemarks,callback:function(t){e.$set(e.returnMsg,"returnRemarks",t)},expression:"returnMsg.returnRemarks"}})],1)],1),n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{staticStyle:{width:"100px"},attrs:{loading:e.isButLoading,type:"primary",size:"mini"},on:{click:e.saveReturnMsg}},[e._v("保 存")])],1)],1):e._e(),n("el-dialog",{staticClass:"dialog",attrs:{title:"退件详情","close-on-click-modal":!1,visible:e.returnInfoDialog,width:"400px"},on:{"update:visible":function(t){e.returnInfoDialog=t},close:e.handleClose}},[n("el-form",{attrs:{"label-position":"right","label-width":"100px"}},[n("el-form-item",{attrs:{label:"退件人"}},[n("el-input",{attrs:{size:"mini"},model:{value:e.returnInfoVal.return_contact,callback:function(t){e.$set(e.returnInfoVal,"return_contact",t)},expression:"returnInfoVal.return_contact"}})],1),n("el-form-item",{attrs:{label:"退件电话"}},[n("el-input",{attrs:{size:"mini"},model:{value:e.returnInfoVal.return_phone_number,callback:function(t){e.$set(e.returnInfoVal,"return_phone_number",t)},expression:"returnInfoVal.return_phone_number"}})],1),n("el-form-item",{attrs:{label:"退件金额"}},[n("el-input",{attrs:{size:"mini"},model:{value:e.returnInfoVal.return_amount,callback:function(t){e.$set(e.returnInfoVal,"return_amount",t)},expression:"returnInfoVal.return_amount"}})],1),n("el-form-item",{attrs:{label:"退件物流单号"}},[n("el-input",{attrs:{size:"mini"},model:{value:e.returnInfoVal.return_shipping_number,callback:function(t){e.$set(e.returnInfoVal,"return_shipping_number",t)},expression:"returnInfoVal.return_shipping_number"}})],1),n("el-form-item",{attrs:{label:"退件物流公司"}},[n("el-input",{attrs:{size:"mini"},model:{value:e.returnInfoVal.return_shipping_name,callback:function(t){e.$set(e.returnInfoVal,"return_shipping_name",t)},expression:"returnInfoVal.return_shipping_name"}})],1),n("el-form-item",{attrs:{label:"退件地址"}},[n("el-input",{attrs:{type:"textarea",resize:"none",size:"mini"},model:{value:e.returnInfoVal.return_address,callback:function(t){e.$set(e.returnInfoVal,"return_address",t)},expression:"returnInfoVal.return_address"}})],1),n("el-form-item",{attrs:{label:"退件备注"}},[n("el-input",{attrs:{type:"textarea",resize:"none",size:"mini"},model:{value:e.returnInfoVal.return_remarks,callback:function(t){e.$set(e.returnInfoVal,"return_remarks",t)},expression:"returnInfoVal.return_remarks"}})],1)],1)],1),n("div",{staticClass:"logging"},[n("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)],1)},a=[],i=n("1da1"),s=(n("96cf"),n("b0c0"),n("d81d"),n("5b81"),n("159b"),n("ac1f"),n("1276"),n("99af"),n("a9e3"),n("66d3")),o={components:{AddressModel:s["a"]},data:function(){return{address:"",isOverseas:!1,showConsole:!0,selectAddress:{province:"",city:"",area:"",address:""},returnMsg:{lists:[],returnContact:"",returnPhoneNumber:"",returnAddress:"",returnRemarks:"",returnFile:""},returnInfoVal:{return_contact:"",return_phone_number:"",return_amount:"",return_shipping_number:"",return_shipping_name:"",return_address:"",return_remarks:""},isShowLoading:!1,isButLoading:!1,cancelLoading:!1,upFileLiadding:!1,form:{signingTime:[(new Date).getTime()-6048e5,new Date],applyReturnTime:"",packageStatus:0,orderNum:"",logisticsNum:""},total:0,pageSize:100,page:1,tableData:[],packageStatusList:[{value:"1",label:"已签收"},{value:"2",label:"已经拒收"},{value:"3",label:"匹配不到订单包"},{value:"4",label:"包裹已销毁"},{value:"5",label:"包裹丢件"},{value:"6",label:"申请退件"},{value:"7",label:"已退件"}],statusObj:{1:"已签收",2:"已经拒收",3:"匹配不到订单包",4:"包裹已销毁",5:"包裹丢件",6:"申请退件",7:"已退件"},returnMsgDialog:!1,returnInfoDialog:!1,multipleSelection:[],packageCodes:[]}},mounted:function(){this.getSignPackageList()},methods:{reupload:function(){var e=this,t=document.createElement("input");t.type="file",t.onchange=function(){var n=t.files[0];if(!/\.(jpg|png|pdf)$/.test(n.name.toLowerCase()))return e.$refs.Logs.writeLog("格式错误,请上传jpg、png、pdf格式的文件",!1),void(e.showConsole=!1);var r=new FileReader;r.readAsDataURL(n),r.onload=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=r.result,e.upFileLiadding=!0,t.next=4,e.$ossService.uploadFile(a,Math.round(1e8*Math.random())+".png");case 4:i=t.sent,e.returnMsg.returnFile="",e.returnMsg.returnFile=i,e.upFileLiadding=!1;case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};var n=new MouseEvent("click");t.dispatchEvent(n)},getReturnInfo:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={packageCode:e.package_code,gpcId:e.gpcId},n.next=3,t.$api.getReturnInfo(r);case 3:a=n.sent,i=a.data,200===i.code?(t.returnInfoDialog=!0,t.returnInfoVal={return_contact:i.data.return_contact,return_phone_number:i.data.return_phone_number,return_amount:i.data.return_amount,return_shipping_number:i.data.return_shipping_number,return_shipping_name:i.data.return_shipping_name,return_address:i.data.return_address,return_remarks:i.data.return_remarks}):t.$message.error(i.message);case 6:case"end":return n.stop()}}),n)})))()},cancelReturn:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.packageCodes=[],!Array.isArray(e)){n.next=7;break}if(e.length){n.next=4;break}return n.abrupt("return",t.$message("请选择需要取消退件的包裹"));case 4:e.map((function(e){t.packageCodes.push(e.package_code)})),n.next=8;break;case 7:t.packageCodes.push(e.package_code);case 8:return t.cancelLoading=!0,n.next=11,t.$api.cancelReturn({packageCodes:t.packageCodes});case 11:r=n.sent,200===r.data.code?(t.getSignPackageList(),t.$message.success("取消退件成功")):t.$message.error(r.data.message),t.cancelLoading=!1;case 14:case"end":return n.stop()}}),n)})))()},returnParts:function(e,t){var n=this;if(this.handleClose(),1===t){if(!e.length)return this.$message("请选择需要申请退件的包裹");e.every((function(t){return t.warehouse_type===e[0].warehouse_type}))?(e.map((function(e){n.returnMsg.lists.push({gpcId:e.gpcId,packageCode:e.package_code}),3===e.warehouse_type&&(n.isOverseas=!0)})),this.returnMsgDialog=!0):this.$message.error("无法同时退不同仓库的包裹")}else this.returnMsg.lists.push({gpcId:e.gpcId,packageCode:e.package_code}),3===e.warehouse_type&&(this.isOverseas=!0),this.returnMsgDialog=!0},saveReturnMsg:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,e.returnMsg.returnContact){t.next=3;break}return t.abrupt("return",e.$message("收件人不能为空"));case 3:if(e.returnMsg.returnPhoneNumber){t.next=5;break}return t.abrupt("return",e.$message("联系电话不能为空"));case 5:if(n.test(e.returnMsg.returnPhoneNumber)||e.isOverseas){t.next=7;break}return t.abrupt("return",e.$message("联系电话码格式有误"));case 7:if(e.returnMsg.returnAddress){t.next=9;break}return t.abrupt("return",e.$message("详细地址不能为空"));case 9:if(e.returnMsg.returnFile||!e.isOverseas){t.next=11;break}return t.abrupt("return",e.$message("海外仓必须上传退件包裹文件"));case 11:return e.isButLoading=!0,e.showConsole=!1,r=JSON.parse(JSON.stringify(e.returnMsg)),r.returnAddress=e.address.replaceAll(","," ")+e.returnMsg.returnAddress,t.prev=15,t.next=18,e.$api.applicationForreJection(r);case 18:a=t.sent,i=a.data,200===i.code?i.data.forEach((function(t){e.$refs.Logs.writeLog("物流单号【".concat(t.split("：")[0],"】申请退件成功"),!0),e.getSignPackageList()})):i.data.forEach((function(t){e.$refs.Logs.writeLog("【".concat(t.split("：")[0],"】").concat(t.split("：")[1]),!1)})),t.next=26;break;case 23:t.prev=23,t.t0=t["catch"](15),e.$message.error("保存退件信息异常");case 26:e.returnMsgDialog=!1,e.isButLoading=!1;case 28:case"end":return t.stop()}}),t,null,[[15,23]])})))()},getSignPackageList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r,a,i,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isShowLoading=!0,n=e.form.signingTime?"".concat(e.$dayjs(e.form.signingTime[0]).format("YYYY-MM-DD 00:00:00"),"/").concat(e.$dayjs(e.form.signingTime[1]).format("YYYY-MM-DD 23:59:59")):"",r=e.form.applyReturnTime?"".concat(e.$dayjs(e.form.applyReturnTime[0]).format("YYYY-MM-DD 00:00:00"),"/").concat(e.$dayjs(e.form.applyReturnTime[1]).format("YYYY-MM-DD 23:59:59")):"",a={packageCode:e.form.logisticsNum,mainOrderSn:e.form.orderNum,status:Number(e.form.packageStatus),packageTime:n,appliReturnTime:r,page:e.page,pageSize:e.pageSize},t.prev=4,t.next=7,e.$api.getSignPackageList(a);case 7:i=t.sent,s=i.data,200===s.code?(e.total=s.data.total,o=s.data.data,o&&(e.tableData=o)):e.$message.error("获取数据失败",s.message),t.next=14;break;case 12:t.prev=12,t.t0=t["catch"](4);case 14:e.isShowLoading=!1;case 15:case"end":return t.stop()}}),t,null,[[4,12]])})))()},copy:function(e){var t=document.createElement("div");t.id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t);try{var n=document.createRange();n.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(n),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(r){}t.parentElement.removeChild(t)},sendData:function(e){var t=e.province_text,n=e.city_text,r=e.distinct_text;this.address=t+","+n+","+r+","},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.getSignPackageList()},handleCurrentChange:function(e){this.page=e,this.getSignPackageList()},handleClose:function(){this.returnMsg={lists:[],returnFile:""},this.returnInfoVal={},this.isButLoading=!1,this.isOverseas=!1},handleSelectionChange:function(e){this.multipleSelection=e}}},l=o,c=(n("daa1"),n("2877")),u=Object(c["a"])(l,r,a,!1,null,"2549e180",null);t["default"]=u.exports}}]);