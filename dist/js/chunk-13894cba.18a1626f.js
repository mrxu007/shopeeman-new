(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-13894cba"],{"4bec":function(e,t,a){"use strict";a("88dd")},"4dc6":function(e,t,a){"use strict";a.r(t);var n=a("1da1"),i=(a("a9e3"),a("4de4"),a("96cf"),{data:function(){return{pageSize:30,page:1,total:0,isShowDialog:!1,isShowPhoneNum:!1,isloading:!1,isOpenIpCheck:"",phoneNum:"",ipVal:"",currentIp:"",remark:"",ipId:"",trustIpCount:"",phoneTableData:[],tableData:[]}},mounted:function(){this.getUserInfo(),this.getIPTrustList()},methods:{getIPTrustList:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isloading=!0,a={ip:e.ipVal},t.next=4,e.$api.getIPTrustList(a);case 4:a=t.sent,200===(a=a.data).code?(e.tableData=a.data,e.total=e.tableData.length):e.$message.error("获取数据失败".concat(a.message)),e.isloading=!1;case 7:case"end":return t.stop()}}),t)})))()},getUserInfo:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.getUserInfo();case 3:200===(a=t.sent).data.code?(n=a.data.data,e.isOpenIpCheck=n.is_open_ip_check+"",e.trustIpCount=n.trust_ip_count,e.phoneTableData=n.phone_list):e.$message.error("获取用户信息失败".concat(a.data.message)),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})))()},saveConfigure:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.trustIpCount){t.next=3;break}return e.$message("信任IP数不能为空"),t.abrupt("return");case 3:if(100<Number(e.trustIpCount))return e.$message("信任IP数量最大值为100，请重新设置"),t.abrupt("return");t.next=6;break;case 6:return a={isOpenIpCheck:e.isOpenIpCheck,trustIpCount:e.trustIpCount},t.next=9,e.$api.setIpCheck(a);case 9:a=t.sent,200===(a=a.data).code?e.$message.success("保存成功"):e.$message.error("保存失败".concat(a.message));case 12:case"end":return t.stop()}}),t)})))()},deleteTrustIp:function(e){var t=this;this.$confirm("此操作将永久删除该IP, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n.a)(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$api.deleteTrustedIP({id:e.id});case 2:n=a.sent,200===(n=n.data).code?t.$message.success("删除成功"):t.$message.error("删除失败".concat(n.message)),t.getIPTrustList();case 6:case"end":return a.stop()}}),a)}))))},editTruestIp:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.currentIp){t.next=3;break}return e.$message("请输入IP地址"),t.abrupt("return");case 3:return a={id:e.ipId,ip:e.currentIp,remark:e.remark},t.next=6,e.$api.updateTrustedIP(a);case 6:a=t.sent,200===(a=a.data).code?e.$message.success("保存成功"):e.$message.error("保存失败".concat(a.message)),e.isShowDialog=!1,e.getIPTrustList();case 11:case"end":return t.stop()}}),t)})))()},updataTrustIp:function(e){this.ipId=e.id,this.currentIp=e.ip,this.remark=e.remark},updatePhoneNum:function(e,t){var a,n=this;switch(e){case 1:if(1===e){if(""===this.phoneNum)return void this.$message("请输入手机号");if(!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.phoneNum))return void this.$message("手机号码格式有误");if(3<=(null===(a=this.phoneTableData)||void 0===a?void 0:a.length))return void this.$message("最多只能添加3个手机号码")}this.updatePhoneListForIp(e,t);break;case 2:this.$confirm("此操作将永久删除该手机号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n.updatePhoneListForIp(e,t)}))}},updatePhoneListForIp:function(e,t){var a=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var i,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i={phone:t,action:e},n.next=3,a.$api.updatePhoneListForIp(i);case 3:r=n.sent,200===(r=r.data).code?(1===i.action?a.phoneTableData.push(i.phone):a.phoneTableData=a.phoneTableData.filter((function(e){return e!==i.phone})),a.$message.success("更新成功")):a.$message.error("更新失败".concat(r.message));case 6:case"end":return n.stop()}}),n)})))()},closeDialog:function(){this.ipId="",this.currentIp="",this.remark=""},closePhoneDialog:function(){this.phoneNum=""},handleCurrentChange:function(e){this.page=e},handleSizeChange:function(e){this.pageSize=e}}});a("4bec"),a=a("2877"),i=Object(a.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"trustIp-management"},[a("div",{staticClass:"operation"},[a("div",{staticClass:"one"},[a("div",{staticClass:"o-item"},[a("span",{staticStyle:{width:"47px"}},[e._v("信任IP：")]),a("el-input",{staticStyle:{width:"130px"},attrs:{placeholder:"请输入内容",clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.ipVal,callback:function(t){e.ipVal=t},expression:"ipVal"}})],1),a("div",{staticClass:"o-item"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getIPTrustList}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.isShowDialog=!0}}},[e._v("添加信任IP")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.isShowPhoneNum=!0}}},[e._v("配置接收短信的手机号")])],1),a("div",{staticClass:"o-item-alone"},[a("span",{staticStyle:{width:"84px"}},[e._v("登录是否检测：")]),a("el-radio",{attrs:{label:"0"},model:{value:e.isOpenIpCheck,callback:function(t){e.isOpenIpCheck=t},expression:"isOpenIpCheck"}},[e._v("关闭检测")]),a("el-radio",{attrs:{label:"1"},model:{value:e.isOpenIpCheck,callback:function(t){e.isOpenIpCheck=t},expression:"isOpenIpCheck"}},[e._v("当信任IP数大于 "),a("el-input",{attrs:{size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.trustIpCount,callback:function(t){e.trustIpCount=t},expression:"trustIpCount"}}),e._v("时打开检测 ")],1)],1),a("div",{staticClass:"o-item"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.saveConfigure}},[e._v("保存配置")])],1)]),a("p",{staticClass:"tips"},[e._v(" 温馨提示：用于软件安全防护，可对登录的IP进行检测，若登录的IP不在信任IP列表中，将进行手机短信验证，接收短信验证码的手机号最多3个(默认开户手机号) ")])]),a("div",{staticClass:"table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isloading,expression:"isloading"}],attrs:{data:e.tableData.slice((e.page-1)*e.pageSize,e.page*e.pageSize),stripe:"",height:"calc(100vh - 163px)","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"序号","min-width":"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{prop:"ip",align:"center",label:"IP","min-width":"100"}}),a("el-table-column",{attrs:{prop:"remark",align:"center",label:"备注","min-width":"130"}}),a("el-table-column",{attrs:{prop:"created_at",align:"center",label:"添加时间","min-width":"140"}}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.isShowDialog=!0,e.updataTrustIp(n)}}},[e._v("修改")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.deleteTrustIp(n)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[30,50,100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("div",{staticClass:"dialog-content"},[a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"编辑信任IP",visible:e.isShowDialog},on:{"update:visible":function(t){e.isShowDialog=t},close:e.closeDialog}},[a("div",{staticClass:"form-content"},[a("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[a("el-form-item",{attrs:{label:"当前IP:"}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入IP",clearable:"",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.currentIp,callback:function(t){e.currentIp=t},expression:"currentIp"}})],1),a("el-form-item",{attrs:{label:"备注:"}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}})],1)],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.editTruestIp}},[e._v("确定")])],1)],1)])],1),a("div",{staticClass:"phone-dialog"},[a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"配置手机号码",visible:e.isShowPhoneNum},on:{"update:visible":function(t){e.isShowPhoneNum=t},close:e.closePhoneDialog}},[a("div",{staticStyle:{display:"flex","margin-bottom":"10px"}},[a("div",{staticClass:"o-item"},[a("span",[e._v("手机号码：")]),a("el-input",{attrs:{placeholder:"请输入手机号",clearable:"",size:"mini",oninput:"value=value.replace(/\\s+/g,'')"},model:{value:e.phoneNum,callback:function(t){e.phoneNum=t},expression:"phoneNum"}})],1),a("div",{staticClass:"o-item"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updatePhoneNum(1,e.phoneNum)}}},[e._v("添加手机号")])],1)]),a("div",{staticClass:"dialog-table"},[a("el-table",{staticStyle:{"min-width":"240px"},attrs:{data:e.phoneTableData,stripe:"","max-height":"400","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"序号","min-width":"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{prop:"",align:"center",label:"手机号","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return t=t.row,[e._v(" "+e._s(t||"")+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updatePhoneNum(2,n)}}},[e._v("删除")])]}}])})],1)],1)])],1)])}),[],!1,null,null,null);t.default=i.exports},"88dd":function(e,t,a){}}]);