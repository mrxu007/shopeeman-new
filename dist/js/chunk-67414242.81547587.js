(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67414242"],{"0dc6":function(e,t,a){},"37aa":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"detail"},[a("div",{staticClass:"condition"},[a("div",{staticClass:"condition_item"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogVisible_token=!0}}},[e._v("新增授权")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.refeshSatua}},[e._v("刷新状态")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.open("1")}}},[e._v(" 下载教程")]),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){return e.open("2")}}},[a("span",{staticClass:"linkdec"},[e._v("注册淘宝天猫海外平台账号")])])],1),a("div",{staticClass:"condition_item"},[a("div",{staticClass:"conditon_item_dec"},[a("span",[e._v("账号别名：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.query.account_alies,callback:function(t){e.$set(e.query,"account_alies",t)},expression:"query.account_alies"}})],1),a("div",{staticClass:"conditon_item_dec"},[a("span",[e._v("账号：")]),a("el-input",{staticStyle:{width:"180px"},attrs:{clearable:"",size:"mini"},model:{value:e.query.account,callback:function(t){e.$set(e.query,"account",t)},expression:"query.account"}})],1),a("el-button",{staticClass:"conditon_item_dec",attrs:{type:"primary",size:"mini"},on:{click:e.getTableList}},[e._v("搜索")])],1)]),a("div",{staticClass:"tabledes"},[a("el-table",{attrs:{height:"calc(100vh - 106px)","header-cell-style":{background:"#f7fafa"},data:e.tableList}},[a("el-table-column",{attrs:{label:"账号",prop:"account","min-width":"200px"}}),a("el-table-column",{attrs:{label:"账号别名",prop:"account_alias_name","min-width":"200px"}}),a("el-table-column",{attrs:{label:"授权状态",prop:"status","min-width":"200px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(1===Number(n.status)?"正常":"授权过期"))])]}}])}),a("el-table-column",{attrs:{label:"创建时间",prop:"created_at","min-width":"200px"}}),a("el-table-column",{attrs:{label:"更新时间",prop:"updated_at","min-width":"200px"}}),a("el-table-column",{attrs:{label:"操作",prop:"","min-width":"250px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updataName(n)}}},[e._v("修改账号别名")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.delAccount(n)}}},[e._v("删除账号")])]}}])})],1)],1),a("el-dialog",{attrs:{title:"修改账号别名",visible:e.dialogVisible_updata,width:"400px"},on:{"update:visible":function(t){e.dialogVisible_updata=t},closed:e.clearVisible}},[a("div",[a("div",{staticStyle:{display:"flex","align-items":"baseline"}},[a("span",[e._v("当前账号别名：")]),a("h3",{staticStyle:{color:"red"}},[e._v(e._s(e.currentName))])]),a("div",{staticStyle:{display:"flex","align-items":"baseline"}},[a("span",[e._v("新的账号别名：")]),a("el-input",{staticStyle:{width:"250px","margin-top":"10px"},attrs:{type:"text",size:"mini",clearable:""},model:{value:e.newName,callback:function(t){e.newName=t},expression:"newName"}})],1),a("el-button",{staticStyle:{width:"100px","margin-top":"10px","margin-left":"115px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updataNameFun()}}},[e._v("确定")])],1)]),a("el-dialog",{attrs:{title:"天猫淘宝海外平台授权",visible:e.dialogVisible_token,width:"400px"},on:{"update:visible":function(t){e.dialogVisible_token=t},closed:e.clearVisible}},[a("div",{staticStyle:{display:"flex","justify-content":"center","flex-wrap":"wrap"}},[a("div",{staticStyle:{display:"flex","align-items":"baseline"}},[a("span",[e._v("账号别名：")]),a("el-input",{staticStyle:{width:"250px"},attrs:{type:"text",size:"mini",clearable:""},model:{value:e.tokenName,callback:function(t){e.tokenName=t},expression:"tokenName"}})],1),a("div",{staticStyle:{"margin-top":"10px"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"mini"},on:{click:e.getToken}},[e._v("确定")])],1)])])],1)},i=[],r=a("1da1"),s=(a("159b"),a("96cf"),a("d4ec")),c=a("bee2"),o=function(){function e(t){Object(s["a"])(this,e),this._this=t}return Object(c["a"])(e,[{key:"refreshAccessToken",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.userId,n={userId:a},e.next=5,this._this.$shopeemanService.postChineseLaiZan("http://api.laizand.com/api/open/refreshAccessToken",n,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 5:return i=e.sent,r=JSON.parse(i),s=JSON.parse(r.data),e.abrupt("return",{code:s.code,data:s.data,message:s.message});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"refreshAccessToken-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getTbGlobalUser",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s,c,o,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.uid,n=t.uuid,i=t.account,r=t.accountAliasName,s={uid:a,uuid:n,account:i,accountAliasName:r},e.next=5,this._this.$shopeemanService.getChineseLaiZan("http://api.laizand.com/api/open/getTbGlobalUser?",s,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":" gzip, deflate","User-Agent":"RestSharp/106.3.1.0"}});case 5:return c=e.sent,o=JSON.parse(c),u=JSON.parse(o.data),e.abrupt("return",{code:u.code,data:u.data,message:u.message});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getGloableUser-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateAliasName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.id,n=t.uuid,i=t.accountAliasName,r={id:a,uuid:n,accountAliasName:i},e.next=5,this._this.$shopeemanService.postChineseLaiZan("http://api.laizand.com/api/open/updateAliasName",r,{headers:{"Content-Type":"application/json"}});case 5:return s=e.sent,c=JSON.parse(s),o=JSON.parse(c.data),e.abrupt("return",{code:o.code,data:o.data,message:o.message});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"updateAliasName-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.id,n={id:a},e.next=5,this._this.$shopeemanService.postChineseLaiZan("http://api.laizand.com/api/open/deleteAccount",n,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 5:return i=e.sent,r=JSON.parse(i),s=JSON.parse(r.data),e.abrupt("return",{code:s.code,data:s.data,message:s.message});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"deleteAccount-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getTbGlobalAuthUrl",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.accountAliasName,n={accountAliasName:a},e.next=5,this._this.$shopeemanService.postChineseLaiZan("http://api.laizand.com/api/open/getTbGlobalAuthUrl",n,{headers:{Accept:"application/json, application/xml, text/json, text/x-json, text/javascript, text/xml","Accept-Encoding":"gzip, deflate","User-Agent":"RestSharp/106.3.1.0","Content-Type":"application/x-www-form-urlencoded"}});case 5:return i=e.sent,r=JSON.parse(i),s=JSON.parse(r.data),e.abrupt("return",{code:s.code,data:s.data,message:s.message});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getTbGlobalAuthUrl-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),u={data:function(){return{rowData:"",loading:!1,dialogVisible_token:!1,tokenName:"",currentName:"",newName:"",dialogVisible_updata:!1,tableList:[],query:{account_alies:"",account:""},TBApiInstance:new o(this),user_uid:"",user_uuid:"0",downPDF:"https://shopeeman.oss-cn-shenzhen.aliyuncs.com/files/shopeemanFiles/appFiles/20211111/20211111153709618cc825a8c5b.pdf"}},created:function(){this.getUser()},methods:{open:function(e){"1"===e?window.open(this.downPDF):window.BaseUtilBridgeService.openUrl('https://distributor.taobao.global/apps/seller/login"')},getToken:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.tokenName){t.next=3;break}return e.$message.warning("填写信息不能为空"),t.abrupt("return");case 3:return a={accountAliasName:e.tokenName},t.next=6,e.TBApiInstance.getTbGlobalAuthUrl(a);case 6:n=t.sent,console.log("token",n),200===n.code?(i=n.data.url,window.BaseUtilBridgeService.openUrl(i)):e.$message.error(n.data);case 9:case"end":return t.stop()}}),t)})))()},delAccount:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={id:e.id},t.loading=!0,a.next=4,t.TBApiInstance.deleteAccount(n);case 4:i=a.sent,t.loading=!1,200===i.code?t.$message.success("删除成功"):t.$message.error(i.data),t.getTableList();case 8:case"end":return a.stop()}}),a)})))()},updataName:function(e){this.rowData=e,this.currentName=e.account_alias_name,this.dialogVisible_updata=!0},updataNameFun:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.newName){t.next=3;break}return e.$message.warning("填写信息不能为空"),t.abrupt("return");case 3:return a={id:e.rowData.id,uuid:e.user_uuid,accountAliasName:e.newName},e.loading=!0,t.next=7,e.TBApiInstance.updateAliasName(a);case 7:n=t.sent,console.log("update",n),200===n.code?e.$message.success("修改成功"):e.$message.error(n.data),e.dialogVisible_updata=!1,e.getTableList(),e.newName="";case 13:case"end":return t.stop()}}),t)})))()},clearVisible:function(){this.newName="",this.tokenName=""},getUser:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$appConfig.getUserInfo();case 2:a=t.sent,e.user_uid=a.muid,e.getTableList();case 5:case"end":return t.stop()}}),t)})))()},refeshSatua:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.tableList.forEach((function(t){var a={userId:t.user_id};e.loading=!0,e.TBApiInstance.refreshAccessToken(a).then((function(t){e.loading=!1,console.log(t)}))})),e.getTableList();case 2:case"end":return t.stop()}}),t)})))()},getTableList:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={uid:e.user_uid,uuid:e.user_uuid,account:e.query.account,accountAliasName:e.query.account_alies},e.loading=!0,t.next=4,e.TBApiInstance.getTbGlobalUser(a);case 4:n=t.sent,e.loading=!1,200===n.code?e.tableList=n.data.data:e.$message.error(n.data);case 7:case"end":return t.stop()}}),t)})))()}}},l=u,p=(a("ef2ba"),a("2877")),d=Object(p["a"])(l,n,i,!1,null,"1768fc17",null);t["default"]=d.exports},ef2ba:function(e,t,a){"use strict";a("0dc6")}}]);