(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a3e548f"],{"0c89":function(e,t,a){"use strict";a("0df5")},"0df5":function(e,t,a){},dd8a:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contaniner"},[a("div",{staticClass:"operation"},[a("div",{staticClass:"o-item"},[a("span",{staticStyle:{"white-space":"nowrap"}},[e._v("站点：")]),a("el-select",{staticClass:"unnormal",staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.form.site,callback:function(t){e.$set(e.form,"site",t)},expression:"form.site"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],2)],1),a("div",{staticClass:"o-item"},[a("span",{staticStyle:{"min-width":"84px"}},[e._v("关键字类别：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.typeList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),a("div",{staticClass:"o-item"},[a("span",{staticStyle:{"min-width":"57px"}},[e._v("词来源：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.form.source,callback:function(t){e.$set(e.form,"source",t)},expression:"form.source"}},e._l(e.sourceList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),a("div",{staticClass:"o-item"},[a("span",{staticStyle:{"min-width":"57px"}},[e._v("关键词：")]),a("el-input",{staticStyle:{width:"130px"},attrs:{size:"mini",placeholder:"请输入关键词",clearable:"",oninput:"value=value.replace(/\\s/g,'')"},model:{value:e.form.keyWord,callback:function(t){e.$set(e.form,"keyWord",t)},expression:"form.keyWord"}})],1),a("div",{staticClass:"o-item"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.page=1,e.getBannedWordList()}}},[e._v("查询")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.batchDelete()}}},[e._v("批量删除")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogBanWordVisible=!0}}},[e._v(" 批量导入 ")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.exportSearch()}}},[e._v("导出数据")]),a("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}},[e._v("隐藏日志")])],1),a("div",{staticClass:"o-item"})]),a("div",{staticClass:"table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isloading,expression:"isloading"}],attrs:{data:e.tableData,height:"calc(100vh - 145px)",border:!1,"header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center","min-width":"55",fixed:""}}),a("el-table-column",{attrs:{type:"index",align:"center",label:"序号","min-width":"50",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.page-1)*e.pageSize+t.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{prop:"country",align:"center",label:"站点","min-width":"80"}}),a("el-table-column",{attrs:{prop:"uid",align:"center",label:"词来源","min-width":"80"}}),a("el-table-column",{attrs:{prop:"type",align:"center",label:"词类型","min-width":"80"}}),a("el-table-column",{attrs:{prop:"word",align:"center","show-overflow-tooltip":"",label:"关键词","min-width":"180"}}),a("el-table-column",{attrs:{prop:"created_at",align:"center","show-overflow-tooltip":"",label:"添加时间","min-width":"100",fixed:"right"}})],1)],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[10,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("div",{staticClass:"dialog-content"},[a("el-dialog",{attrs:{title:"添加禁售词",visible:e.dialogVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},close:e.dialogClose}},[a("span",[a("el-form",{attrs:{"label-position":"right","label-width":"80px"}},[a("el-form-item",{attrs:{label:"站点:"}},[a("el-select",{staticClass:"unnormal",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.dialogSite,callback:function(t){e.dialogSite=t},expression:"dialogSite"}},e._l(e.countries,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"类别:"}},[a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:e.dialogType,callback:function(t){e.dialogType=t},expression:"dialogType"}},e._l(e.typeList.slice(1),(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"关键词:"}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入关键词",clearable:"",oninput:"value=value.replace(/\\s/g,'')"},model:{value:e.dialogkeyWord,callback:function(t){e.dialogkeyWord=t},expression:"dialogkeyWord"}})],1),a("el-form-item",[a("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.addBannedWord()}}},[e._v("确 定")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)],1)],1)])],1),a("div",{staticClass:"dialog-ban-content"},[a("el-dialog",{attrs:{title:"批量导入禁售词",visible:e.dialogBanWordVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogBanWordVisible=t},close:e.dialogClose}},[a("div",{staticStyle:{display:"flex"}},[a("el-upload",{ref:"importRef",attrs:{accept:".xls,.xlsx ",action:"https://jsonplaceholder.typicode.com/posts/","on-change":e.importTemplateEvent,"show-file-list":!1,"auto-upload":!1}},[a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{data:e.importTemplateData,size:"mini",type:"primary"}},[e._v(" 批量导入 ")])],1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.downloadTemplate()}}},[e._v("下载模板")])],1),a("span",[a("div",{staticClass:"text-log-content",domProps:{innerHTML:e._s(e.batchConsoleMsg)}})]),a("span",{staticStyle:{display:"flex","justify-content":"center"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.dialogBanWordVisible=!1}}},[e._v("关闭")])],1)])],1),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:e.showConsole,callback:function(t){e.showConsole=t},expression:"showConsole"}})],1)])},i=[],r=a("1da1"),o=(a("96cf"),a("a9e3"),a("159b"),a("ac1f"),a("5319"),a("99af"),a("d3b7"),a("25f0"),a("d81d"),a("b0c0"),a("1146")),l=a.n(o),s=a("0e0b"),c={data:function(){return{showConsole:!0,consoleMsg:"",batchConsoleMsg:"",dialogBanWordVisible:!1,dialogVisible:!1,page:1,total:0,pageSize:30,isloading:!1,multipleSelection:[],importTemplateData:"",dialogSite:"MY",dialogType:"1",dialogkeyWord:"",countries:this.$filters.countries_option,siteObj:this.$filters.countries_site,form:{site:"",type:"0",source:"0",keyWord:""},sourceList:[{value:"0",label:"全部"},{value:"-1",label:"系统"},{value:"1",label:"用户"}],typeList:[{value:"0",label:"全部"},{value:"1",label:"禁运词"},{value:"2",label:"品牌词"},{value:"3",label:"违规词"}],typeObj:{"禁运词":"1","品牌词":"2","违规词":"3"},tableData:[]}},mounted:function(){this.getBannedWordList()},methods:{exportSearch:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r,o,l,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.isloading=!0,a=[],n=e.total%10===0?e.total/10:Math.floor(e.total/10)+1,i=1;case 4:if(!(i<=n)){t.next=19;break}return r={page:i,word:e.form.keyWord,country:e.form.site,source:Number(e.form.source),type:Number(e.form.type)},t.prev=6,t.next=9,e.$commodityService.getBannedWordList(r);case 9:o=t.sent,l=JSON.parse(o).data.data,l.forEach((function(e){a.push(e)})),t.next=16;break;case 14:t.prev=14,t.t0=t["catch"](6);case 16:i++,t.next=4;break;case 19:if(e.isloading=!1,null!==a&&void 0!==a&&a.length){t.next=24;break}return e.isloading=!1,e.$message("暂无导出数据"),t.abrupt("return");case 24:c="<tr>\n          <td>站点</td>\n          <td>词来源</td>\n          <td>词类型</td>\n          <td>关键词</td>\n          <td>添加时间</td>\n      </tr>",a.forEach((function(t){t.created_at=t.created_at.replace("T"," ").replace("Z",""),t.country=e.$filters.chineseSite(t.country),t.uid=0===t.uid?"系统":"用户",2===t.type?t.type="品牌词":3===t.type?t.type="违规词":t.type="禁运词",c+="<tr>\n        <td>".concat(t.country?t.country:"\t","</td>\n        <td>").concat(t.uid?t.uid:"\t","</td>\n        <td>").concat(t.type?t.type:"\t","</td>\n        <td>").concat(t.word?t.word:"\t","</td>\n        <td>").concat(t.created_at?t.created_at:"\t","</td>\n        </tr>")})),Object(s["k"])("品牌词库",c);case 27:case"end":return t.stop()}}),t,null,[[6,14]])})))()},batchDelete:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.multipleSelection.length<=0)){t.next=2;break}return t.abrupt("return",e.$message("请选择要删除的数据"));case 2:a=0;case 3:if(!(a<e.multipleSelection.length)){t.next=13;break}return n=e.multipleSelection[a],t.next=7,e.$commodityService.deleteDannedWord(n.id);case 7:i=t.sent,r=JSON.parse(i),200===r.code?e.$refs.Logs.writeLog("违规词【".concat(n.word,"】删除成功"),!0):e.$refs.Logs.writeLog("违规词【".concat(n.word,"】删除失败 ").concat(r.msg),!1);case 10:a++,t.next=3;break;case 13:e.showConsole=!1,e.getBannedWordList();case 15:case"end":return t.stop()}}),t)})))()},downloadTemplate:function(){var e='\n      <tr>\n        <td style="width: 500px">站点(马来站,台湾站,新加坡站,菲律宾站,泰国站,越南站,印尼站,巴西站)<span style="color:red">（必填）</span></td>\n        <td>关键词类型(违规词,品牌词,禁运词)<span style="color:red">（必填）</span></td>\n        <td>关键词<span style="color:red">（必填）</span></td>\n      </tr>\n      <tr>\n        <td>台湾站</td>\n        <td>违规词</td>\n        <td>食品</td>\n      </tr>\n      ';Object(s["k"])("SHOPEE品牌词模板",e)},batchImport:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r,o,l,s,c,d,u,p;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.importTemplateData.length,!(a<=0)){t.next=4;break}return e.batchWriteLog("表格数据为空",!1),t.abrupt("return");case 4:n=0,i=0,e.batchWriteLog("开始导入禁售词"),r=0;case 8:if(!(r<a)){t.next=57;break}if(o=e.importTemplateData[r],l=o["站点(马来站,台湾站,新加坡站,菲律宾站,泰国站,越南站,印尼站,巴西站)（必填）"],s=o["关键词类型(违规词,品牌词,禁运词)（必填）"],c=o["关键词（必填）"],l){t.next=17;break}return i++,e.batchWriteLog("【".concat(r+1,"】未找到站点(马来站,台湾站,新加坡站,菲律宾站,泰国站,越南站,印尼站,巴西站)（必填）"),!1),t.abrupt("continue",54);case 17:if(s){t.next=21;break}return i++,e.batchWriteLog("【".concat(r+1,"】未找到关键词类型(违规词,品牌词,禁运词)（必填）"),!1),t.abrupt("continue",54);case 21:if(c){t.next=25;break}return i++,e.batchWriteLog("【".concat(r+1,"】未找到关键词（必填）"),!1),t.abrupt("continue",54);case 25:if(e.siteObj[l]){t.next=29;break}return i++,e.batchWriteLog("【".concat(r+1,"】站点参数错误"),!1),t.abrupt("continue",54);case 29:if(e.typeObj[s]){t.next=33;break}return i++,e.batchWriteLog("【".concat(r+1,"】关键词类型参数错误"),!1),t.abrupt("continue",54);case 33:return d={word:c.toString(),country:e.siteObj[l],type:e.typeObj[s]},t.prev=34,t.next=37,e.$commodityService.addBannedWord(d);case 37:if(u=t.sent,p=JSON.parse(u),200!==p.code){t.next=48;break}if(1!==p.data){t.next=44;break}return e.batchWriteLog("【".concat(r+1,"】站点【").concat(l,"】 禁售词【").concat(c,"】 重复添加"),!1),i++,t.abrupt("continue",54);case 44:n++,e.batchWriteLog("【".concat(r+1,"】站点【").concat(l,"】 添加禁售词【").concat(c,"】 成功"),!0),t.next=49;break;case 48:e.$refs.Logs.writeLog("【".concat(r+1,"】站点【").concat(l,"】 禁售词【").concat(c,"】添加失败 ").concat(p.msg),!1);case 49:t.next=54;break;case 51:t.prev=51,t.t0=t["catch"](34),e.batchWriteLog("".concat(t.t0),!1);case 54:r++,t.next=8;break;case 57:e.getBannedWordList(),e.batchWriteLog("导入总数：".concat(a,"，成功数：").concat(n,"，失败数：").concat(i));case 59:case"end":return t.stop()}}),t,null,[[34,51]])})))()},addBannedWord:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.dialogkeyWord){t.next=2;break}return t.abrupt("return",e.$message("请填写禁售词"));case 2:return a={word:e.dialogkeyWord,country:e.dialogSite,type:e.dialogType},t.prev=3,t.next=6,e.$commodityService.addBannedWord(a);case 6:if(n=t.sent,i=JSON.parse(n),200!==i.code){t.next=15;break}if(1!==i.data){t.next=11;break}return t.abrupt("return",e.$message.error("不可重复添加"));case 11:e.$message.success("添加成功"),e.getBannedWordList(),t.next=16;break;case 15:e.$message.success("添加失败"+i.msg);case 16:t.next=20;break;case 18:t.prev=18,t.t0=t["catch"](3);case 20:e.dialogVisible=!1;case 21:case"end":return t.stop()}}),t,null,[[3,18]])})))()},getBannedWordList:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isloading=!0,a={page:e.page,perpage:e.pageSize,word:e.form.keyWord,country:e.form.site,source:Number(e.form.source),type:Number(e.form.type)},t.prev=2,t.next=5,e.$commodityService.getBannedWordList(a);case 5:n=t.sent,i=JSON.parse(n),200===i.code?(e.tableData=i.data.data,e.tableData&&e.tableData.map((function(t){t.created_at=t.created_at.replace("T"," ").replace("Z",""),t.country=e.$filters.chineseSite(t.country),t.uid=0===t.uid?"系统":"用户",2===t.type?t.type="品牌词":3===t.type?t.type="违规词":t.type="禁运词"})),e.total=i.data.total,e.isloading=!1):(e.$message.error("获取数据失败:".concat(i.msg)),e.isloading=!1),t.next=15;break;case 10:t.prev=10,t.t0=t["catch"](2),e.tableData=[],e.$message.error("获取数据失败"),e.isloading=!1;case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))()},importTemplateEvent:function(e){var t=this,a={0:e.raw};if(!/\.(xls|xlsx)$/.test(a[0].name.toLowerCase()))return this.$refs.Logs.writeLog("格式错误,请上传xls、xlsx格式的文件",!1),void(this.showConsole=!1);if(a.length<=0)this.$refs.Logs.writeLog("表格为空",!1);else{var n=new FileReader;n.onload=function(e){var a=e.target.result,n=l.a.read(a,{type:"binary"}),i=n.SheetNames[0],r=l.a.utils.sheet_to_json(n.Sheets[i]);t.importTemplateData=r,t.batchImport(),r=null,t.$refs.importRef.value=""},n.readAsBinaryString(a[0])}},batchWriteLog:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e){var a=t?"green":"red";this.batchConsoleMsg='<p style="color:'.concat(a,'; margin-top: 8px;">').concat(e,"</p>")+this.batchConsoleMsg}},handleSelectionChange:function(e){this.multipleSelection=e},handleCurrentChange:function(e){this.page=e,this.getBannedWordList()},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.getBannedWordList()},dialogClose:function(){this.batchConsoleMsg="",this.showConsole=!0,this.dialogkeyWord="",this.dialogSite="MY",this.dialogType="1"}}},d=c,u=(a("0c89"),a("2877")),p=Object(u["a"])(d,n,i,!1,null,null,null);t["default"]=p.exports}}]);