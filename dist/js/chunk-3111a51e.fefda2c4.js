(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3111a51e"],{"422c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("el-col",{staticClass:"header-top",attrs:{span:24}},[a("ul",[a("li",[a("span",[e._v("分组名称：")]),a("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:e.groupName,callback:function(t){e.groupName=t},expression:"groupName"}})],1),a("li",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getGroup}},[e._v("查询")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openGroupDialog(null)}}},[e._v("新增分组")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.deleteGroup}},[e._v("删除当前分组")])],1)])])],1),a("el-row",{staticClass:"article"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.buttonStatus.search,expression:"buttonStatus.search"}],ref:"plTable",attrs:{height:"calc(100vh - 140px)",data:e.groupList,"header-cell-style":{backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),a("el-table-column",{attrs:{align:"center",type:"index",label:"序列号",width:"100"}}),a("el-table-column",{attrs:{align:"center",label:"分组名称",prop:"group_name"}}),a("el-table-column",{attrs:{align:"center",label:"绑定运营"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.new_role_operator.join(",")||"-")+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"绑定客服"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.new_role_customer_servicer.join(",")||"-")+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"绑定跟单"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.new_role_follower_id.join(",")||"-")+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openGroupDialog(n)}}},[e._v("修改分组")])]}}])})],1)],1),a("el-dialog",{staticClass:"edit-group-dialog",attrs:{title:e.typeOpt?"修改店铺分组":"新增店铺分组",visible:e.editGroupDialogVisible,width:"1000px","before-close":e.handleClose,"close-on-click-modal":!1,"close-on-press-escape":!1,modal:!1},on:{"update:visible":function(t){e.editGroupDialogVisible=t}}},[a("el-row",{staticClass:"contaniner-dialog"},[a("div",{staticClass:"con-lft"},[a("ul",[a("li",{directives:[{name:"show",rawName:"v-show",value:e.typeOpt,expression:"typeOpt"}]},[a("p",{staticStyle:{width:"72px"}},[e._v("分组列表：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},on:{change:e.switchSelectMallStatus},model:{value:e.groupId,callback:function(t){e.groupId=t},expression:"groupId"}},e._l(e.groupList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.group_name}})})),1)],1),a("li",[a("p",[e._v(e._s(e.typeOpt?"修改分组名：":"新增分组："))]),a("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:e.addGroupName,callback:function(t){e.addGroupName="string"===typeof t?t.trim():t},expression:"addGroupName"}})],1),a("li",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addOrUpdatemallGroup}},[e._v("保存")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.typeOpt,expression:"!typeOpt"}],attrs:{type:"primary",size:"mini"},on:{click:e.openExcelDialog}},[e._v("Excel导入分组")])],1),a("li",[a("div",{staticClass:"text-log"},[a("div",{staticClass:"text-log-content"})])])])]),a("div",{staticClass:"con-rht"},[a("ul",[a("li",[a("p",[e._v("站点：")]),a("el-select",{attrs:{placeholder:"",size:"mini"},on:{change:e.switchSelectMallStatus},model:{value:e.siteId,callback:function(t){e.siteId=t},expression:"siteId"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.switchSelectMallStatus}},[e._v("刷新店铺")])],1),a("li",[a("p",[e._v("店铺ID：")]),a("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:e.systemId,callback:function(t){e.systemId="string"===typeof t?t.trim():t},expression:"systemId"}}),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.switchSelectMallStatus}},[e._v("查询")]),a("el-checkbox",{on:{change:e.switchSelectMallStatus},model:{value:e.isHide,callback:function(t){e.isHide=t},expression:"isHide"}},[e._v("隐藏已绑定分组店铺")])],1)]),a("div",{staticClass:"con-rht-text"},[a("span",[e._v("绑定当前分组的店铺始终会显示")])]),a("div",{staticClass:"con-rht-table"},[a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.buttonStatus.mallList,expression:"buttonStatus.mallList"}],ref:"plTable2",attrs:{height:420,"use-virtual":"","header-cell-style":{backgroundColor:"#f5f7fa"},"data-changes-scroll-top":!1,"row-height":50,border:!1}},[a("u-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.$index;return[e._v(" "+e._s((e.currentPage-1)*e.pageSize+a+1)+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"",label:"站点",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(e._f("chineseSite")(a.country))+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"platform_mall_id",label:"店铺ID"}}),a("u-table-column",{attrs:{align:"center",prop:"platform_mall_name",label:"店铺名称"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.mall_alias_name||a.platform_mall_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"center",prop:"group_name",label:"已绑定分组"}}),a("u-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-checkbox",{attrs:{label:"全选"},on:{change:e.selectAllEvent},model:{value:e.isSelectAll,callback:function(t){e.isSelectAll=t},expression:"isSelectAll"}})]}},{key:"default",fn:function(t){var n=t.row;return[n.isSelected?a("el-button",{staticStyle:{margin:"0"},attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.delbingingMall(n,!0)}}},[e._v("删除")]):a("el-button",{staticStyle:{margin:"0"},attrs:{size:"mini",plain:""},on:{click:function(t){return e.addbingingMall(n,!0)}}},[e._v("添加")])]}}])})],1)],1)])])],1),a("el-dialog",{staticClass:"excel-dialog",attrs:{title:"Excel导入店铺分组",visible:e.ExcelDialogVisible,width:"500px","before-close":e.handleClose2,"close-on-click-modal":!1,"close-on-press-escape":!1,modal:!1},on:{"update:visible":function(t){e.ExcelDialogVisible=t}}},[a("ul",[a("li",{staticClass:"btn"},[a("el-upload",{ref:"importRef",attrs:{accept:".xls, .xlsx",action:"https://jsonplaceholder.typicode.com/posts/","on-change":e.importTemplateEvent,"show-file-list":!1,"auto-upload":!1}},[a("el-button",{attrs:{data:e.importTemplateData,size:"mini",type:"primary"}},[e._v(" 批量导入 ")])],1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.downloadTemplate("downExcelGroupTemplate")}}},[e._v("下载模板")]),a("span",{staticClass:"tip"},[e._v("请先下载数据模板再进行批量导入")])],1),a("li",{staticClass:"tip2"},[a("p",[e._v("导入信息：")])]),a("li",[a("div",{staticClass:"text-log"},[a("div",{staticClass:"text-log-content",domProps:{innerHTML:e._s(e.consoleMsg)}})])])])])],1)},r=[],l=a("1da1"),i=(a("96cf"),a("b0c0"),a("d81d"),a("99af"),a("b64b"),a("3ca3"),a("ddb0"),a("7db0"),a("a15b"),a("d3b7"),a("159b"),a("c740"),a("a434"),a("498a"),a("4de4"),a("ac1f"),a("841c"),a("5319"),a("4d63"),a("25f0"),a("0e0b")),s=a("1146"),o=a.n(s),c=a("7646"),u={data:function(){return{mallListAPIInstance:new c["a"](this),groupName:"",groupList:[],groupListTemp:[],consoleMsg:"",buttonStatus:{search:!1,addGroup:!1,delGroup:!1,mallList:!1},multipleSelection:[],isSelectAll:!1,typeOpt:"",editGroupDialogVisible:!1,ExcelDialogVisible:!1,groupId:"",siteId:"",systemId:"",addGroupName:"",mallList:[],mallListTemp:[],countries:this.$filters.countries_option,isHide:!1,bindMallList:[],bindMallListObj:{del:{},add:{}},firstReFresh:!0,importTemplateData:"",total:0,currentPage:1,pageSize:200}},created:function(){this.getGroup()},methods:{handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e,this.currentPage=1,this.getMallList()},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.currentPage=e,this.getMallList()},handleSelectionChange:function(e){this.multipleSelection=e},handleClose:function(e){e(),this.reset()},handleClose2:function(e){e(),this.consoleMsg=""},downloadTemplate:function(e){this[e]()},importTemplateEvent:function(e){var t=this,a={0:e.raw};if(/\.(xls|xlsx)$/.test(a[0].name.toLowerCase()))if(a.length<=0)this.writeLog("表格为空",!1);else{var n=new FileReader;n.onload=function(e){var a=e.target.result,n=o.a.read(a,{type:"binary"}),r=n.SheetNames[0],l=o.a.utils.sheet_to_json(n.Sheets[r]);t.importTemplateData=l,l=null,t.writeLog("正在读取中...",!0),t.importGroupName(),t.$refs.importRef.value=""},n.readAsBinaryString(a[0])}else this.writeLog("上传格式不对,请上传xls、xls格式的文件",!1)},importGroupName:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,r,l,i,s,o,c,u,p,d,m,g,b;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=e.importTemplateData.length,n={},r={},e.mallListTemp.map((function(e){r["".concat(e.platform_mall_id)]=e.id})),l=0;case 5:if(!(l<a)){t.next=20;break}if(i=e.importTemplateData[l],i["店铺ID(必填)"]){t.next=10;break}return e.writeLog("(".concat(l+1,"/").concat(a,")item['店铺ID(必填)']"),!1),t.abrupt("continue",17);case 10:if(i["分组名称(必填)"]){t.next=13;break}return e.writeLog("(".concat(l+1,"/").concat(a,")分组名称(必填)"),!1),t.abrupt("continue",17);case 13:s=i["店铺ID(必填)"]+"",o=i["分组名称(必填)"],n["".concat(o)]||(n["".concat(o)]=[]),n["".concat(o)].push(r[s]);case 17:l++,t.next=5;break;case 20:c={},u=null,p=1,d=Object.keys(n).length,m=regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=e.groupList.find((function(e){return e.group_name===a})),!r){t.next=11;break}return console.log("找到重复分组名",r),c["groupName"]=a,c["groupId"]=r.id,c["sysMallIds"]=n[a].join(","),t.next=8,e.$api.updateGroup(c);case 8:u=t.sent,t.next=17;break;case 11:return console.log("创建新分组名",r),c["groupName"]=a,c["sysMallIds"]=n[a].join(","),t.next=16,e.$api.addGroup(c);case 16:u=t.sent;case 17:if(200===u.data.code){t.next=22;break}return e.$message.error(),e.writeLog("(".concat(p,"/").concat(d,")店铺分组导入失败: ").concat(u.data.message),!1),e.buttonStatus.addGroup=!1,t.abrupt("return","continue");case 22:e.writeLog("(".concat(p,"/").concat(d,")店铺分组名：【").concat(a,"】导入成功"),!0),p++;case 24:case"end":return t.stop()}}),t)})),t.t0=regeneratorRuntime.keys(n);case 26:if((t.t1=t.t0()).done){t.next=34;break}return g=t.t1.value,t.delegateYield(m(g),"t2",29);case 29:if(b=t.t2,"continue"!==b){t.next=32;break}return t.abrupt("continue",26);case 32:t.next=26;break;case 34:e.getGroup(),e.getMallList(),e.writeLog("导入结束",!0),e.importTemplateData=null;case 38:case"end":return t.stop()}}),t)})))()},downExcelGroupTemplate:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=["店铺名称(必填)","店铺ID(必填)","分组名称(必填)"],n=[],e.mallListTemp.forEach((function(e){var t=[e.platform_mall_name,e.platform_mall_id,e.group_name||""];n.push(t)})),t.next=5,Object(i["w"])(a,n,"分组模板");case 5:case"end":return t.stop()}}),t)})))()},openExcelDialog:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.ExcelDialogVisible=!0;case 1:case"end":return t.stop()}}),t)})))()},openGroupDialog:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.typeOpt=e,t.editGroupDialogVisible=!0,t.siteId="",t.systemId="",a.next=6,t.getMallList();case 6:t.reset(),e&&(t.groupId=e.id),t.switchSelectMallStatus();case 9:case"end":return a.stop()}}),a)})))()},tableScroll:function(e){var t=e.scrollTop,a=e.scrollLeft,n=e.table,r=e.judgeFlse;console.log(t,a,n,r)},delbingingMall:function(e,t){var a=this.bindMallList.findIndex((function(t){return t.id===e.id}));e.isSelected=!1,this.bindMallListObj["del"][e.id]||(this.bindMallListObj["del"][e.id]=e,this.bindMallListObj["add"][e.id]&&delete this.bindMallListObj["add"][e.id]),this.bindMallList.splice(a,1),t&&(this.bindMallList.length===this.total?this.isSelectAll=!0:this.isSelectAll=!1)},addbingingMall:function(e,t){this.bindMallList.push(e),this.bindMallListObj["add"][e.id]||(this.bindMallListObj["add"][e.id]=e,this.bindMallListObj["del"][e.id]&&delete this.bindMallListObj["del"][e.id]),e.isSelected=!0,t&&(this.bindMallList.length===this.total?this.isSelectAll=!0:this.isSelectAll=!1)},selectAllEvent:function(){var e=this;this.bindMallList=[],this.isSelectAll?this.mallListTemp.map((function(t){e.addbingingMall(t,null)})):this.mallListTemp.map((function(t){e.delbingingMall(t,null)}))},search:function(){var e=this,t=0;this.mallListTemp=this.mallList;var a=!1,n=!1;""!==this.siteId&&(a=!0,t++),this.systemId.trim()&&(n=!0,t++),t>0&&(this.mallListTemp=this.mallListTemp.filter((function(r){var l=0;if(a&&r["country"]===e.siteId&&l++,n&&e.systemId.indexOf("".concat(r.platform_mall_id))>-1&&l++,l===t)return r}))),this.isHide&&(this.mallListTemp=this.mallListTemp.filter((function(e){return!e.group_name}))),this.$refs.plTable2.reloadData(this.mallListTemp)},reset:function(){this.bindMallList=[],this.bindMallListObj["del"]={},this.bindMallListObj["add"]={},this.isSelectAll=!1},switchSelectMallStatus:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.reset(),console.log("groupId",e.groupId),console.log("bindMallList",e.bindMallList),e.typeOpt?e.mallList.map((function(t){t.group_id===e.groupId?e.addbingingMall(t):t.isSelected=!1})):e.mallList.map((function(e){e.isSelected=!1})),e.search(),n={},e.mallListTemp.map((function(e){n["".concat(e.platform_mall_id)]="1"})),r=[],e.bindMallList.map((function(e){var t=n[e.platform_mall_id];t?console.log("找到重复的店铺信息",e.platform_mall_name):r.push(e)})),(a=e.mallListTemp).push.apply(a,r),e.$nextTick((function(){e.$refs.plTable2.reloadData(e.mallListTemp)}));case 11:case"end":return t.stop()}}),t)})))()},getGroup:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.buttonStatus.search){t.next=2;break}return t.abrupt("return");case 2:return e.buttonStatus.search=!0,a={groupName:e.groupName},t.next=6,e.$api.getMallGroup(a);case 6:if(n=t.sent,200===n.data.code){t.next=11;break}return e.$message.error("获取店铺分组列表失败:  ".concat(n.data.message)),e.buttonStatus.search=!1,t.abrupt("return");case 11:e.groupList=n.data.data,e.groupListTemp=e.groupList,console.log("this.groupList",e.groupList),e.buttonStatus.search=!1;case 15:case"end":return t.stop()}}),t)})))()},addOrUpdatemallGroup:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,r,l,i,s,o,c,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.buttonStatus.addGroup){t.next=2;break}return t.abrupt("return");case 2:if(a=e.addGroupName,n=e.typeOpt,r=n?"修改":"添加",a||n){t.next=8;break}return e.$message.error("新增分组名不能为空"),t.abrupt("return");case 8:if(l=e.groupList.find((function(e){return e.group_name===a})),!l||n){t.next=12;break}return e.$message.error("分组名已存在"),t.abrupt("return");case 12:if(e.buttonStatus.addGroup=!0,i=e.bindMallList.map((function(e){return e.id})),0!==i.length||!n){t.next=18;break}return e.$message.error("请至少勾选一个店铺"),e.buttonStatus.addGroup=!1,t.abrupt("return");case 18:if(s={},s["sysMallIds"]=i.join(","),o=null,n){t.next=28;break}return s["groupName"]=e.addGroupName,t.next=25,e.$api.addGroup(s);case 25:o=t.sent,t.next=34;break;case 28:return u=null===(c=e.groupList.find((function(t){return t.id===e.groupId})))||void 0===c?void 0:c.group_name,s["groupName"]=e.addGroupName||u,s["groupId"]=e.groupId,t.next=33,e.$api.updateGroup(s);case 33:o=t.sent;case 34:if(200===o.data.code){t.next=38;break}return e.$message.error("店铺分组".concat(r,"失败: ").concat(o.data.message)),e.buttonStatus.addGroup=!1,t.abrupt("return");case 38:e.$message.success("店铺分组".concat(r,"成功")),e.buttonStatus.addGroup=!1,e.editGroupDialogVisible=!1,e.addGroupName="",e.$nextTick((function(){e.updateClientData(),e.getGroup()}));case 43:case"end":return t.stop()}}),t)})))()},updateClientData:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,r,l,i,s,o,c,u,p,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("this.bindMallListObj",e.bindMallListObj),n=e.bindMallListObj["add"],r=e.bindMallListObj["del"],console.log("groupId",e.groupId),l=e.groupId,i=null===(a=e.groupList.find((function(e){return e.id===l})))||void 0===a?void 0:a.group_name,t.t0=regeneratorRuntime.keys(r);case 7:if((t.t1=t.t0()).done){t.next=18;break}return s=t.t1.value,console.log("delArr",s,r[s]),o=r[s].platform_mall_id,t.next=13,e.$appConfig.getGlobalCacheInfo("mallInfo",o);case 13:c=t.sent,c=JSON.parse(c),void 0!==c.GroupName&&"".concat(l)!==c.mall_group_id||(console.log("该店铺分组为当前分组，需要删除"),c.GroupName="",c.mall_group_id=0,e.$appConfig.updateInfoMall(o,JSON.stringify(c))),t.next=7;break;case 18:t.t2=regeneratorRuntime.keys(n);case 19:if((t.t3=t.t2()).done){t.next=35;break}return u=t.t3.value,console.log("addArr",u,n[u]),p=n[u].platform_mall_id,t.next=25,e.$appConfig.getGlobalCacheInfo("mallInfo",p);case 25:if(d=t.sent,d=JSON.parse(d),void 0!==d.GroupName&&"".concat(l)!==d.mall_group_id){t.next=29;break}return t.abrupt("continue",19);case 29:console.log("该店铺为新添加分组"),d.GroupName=i,d.mall_group_id="".concat(l),e.$appConfig.updateInfoMall(p,JSON.stringify(d)),t.next=19;break;case 35:case"end":return t.stop()}}),t)})))()},deleteGroup:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.buttonStatus.delGroup){t.next=2;break}return t.abrupt("return");case 2:if(e.buttonStatus.delGroup=!0,0!==e.multipleSelection.length){t.next=6;break}return e.$message.error("请选择需要删除的分组"),t.abrupt("return");case 6:return a=e.multipleSelection.map((function(e){return e.id})),n={groupId:a.join(",")},t.next=10,e.$api.deleteGroup(n);case 10:if(r=t.sent,200===r.data.code){t.next=15;break}return e.$message.error("删除店铺分组失败: ".concat(r.data.message)),e.buttonStatus.delGroup=!1,t.abrupt("return");case 15:e.getGroup(),e.buttonStatus.delGroup=!1;case 17:case"end":return t.stop()}}),t)})))()},getMallList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.buttonStatus.mallList){t.next=2;break}return t.abrupt("return");case 2:return a={country:""},e.buttonStatus.mallList=!0,t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(a);case 6:if(n=t.sent,200===n.code){t.next=11;break}return e.buttonStatus.mallList=!1,e.$message.error("获取店铺列表失败"),t.abrupt("return");case 11:e.mallList=n.data.map((function(e){return e.isSelected=!1,e})),e.mallListTemp=e.mallList,e.buttonStatus.mallList=!1;case 14:case"end":return t.stop()}}),t)})))()},writeLog:function(e,t,a){if(e){var n=t?"green":"red";a&&(n=a);var r=this.dateFormat(new Date(Date.now()),"hh:mm:ss");this.consoleMsg='<p style="color:'.concat(n,'">').concat(r,":").concat(e,"</p>")+this.consoleMsg}},dateFormat:function(e,t){var a={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?a[n]:("00"+a[n]).substr((""+a[n]).length)));return t}}},p=u,d=(a("64be7"),a("2877")),m=Object(d["a"])(p,n,r,!1,null,"e9ec321c",null);t["default"]=m.exports},"64be7":function(e,t,a){"use strict";a("773c")},"773c":function(e,t,a){}}]);