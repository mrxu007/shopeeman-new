(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76a2f2ae"],{"00c6":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基础设置",name:"setBase"}},[a("setBase",{attrs:{"user-info":e.userInfo}})],1),a("el-tab-pane",{attrs:{label:"代理翻译设置",name:"setProxy"}},[a("setProxy",{attrs:{"user-info":e.userInfo}})],1),a("el-tab-pane",{attrs:{label:"拍单发货设置",name:"setOrder"}},[a("setOrder",{attrs:{"user-info":e.userInfo}})],1),a("el-tab-pane",{attrs:{label:"自动关注取关",name:"autoFollow"}},[a("autoFollow",{attrs:{"user-info":e.userInfo}})],1)],1)],1)},r=[],o=a("1da1"),i=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("ul",[a("span",[e._v(" 是否自动获取上家物流信息设置 ")]),a("li",[a("div",[a("label",[e._v("获取物流单号间隔时间：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:e.interTime,callback:function(t){e.interTime=t},expression:"interTime"}}),e._v("小时 (请设置不超过两小时) ")],1),a("div",{staticStyle:{"margin-left":"47px","margin-top":"5px"}},[a("label",[e._v("是否自定获取：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:e.isAutoToken,callback:function(t){e.isAutoToken=t},expression:"isAutoToken"}},[a("el-option",{attrs:{label:"不自动获取",value:"1"}}),a("el-option",{attrs:{label:"自动获取",value:"2"}})],1),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.save()}}},[e._v("保存")])],1)]),a("span",[e._v(" 支付宝支付账户设置 ")]),a("li",[a("div",[a("label",[e._v("支付宝账号：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:e.accountZFB,callback:function(t){e.accountZFB=t},expression:"accountZFB"}})],1),a("div",{staticStyle:{"margin-left":"11px","margin-top":"5px"}},[a("label",[e._v("支付密码：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{type:e.passwordType,size:"mini"},model:{value:e.psdZFB,callback:function(t){e.psdZFB=t},expression:"psdZFB"}},[a("i",{staticClass:"el-input__icon el-icon-view",staticStyle:{color:"#000",cursor:"pointer"},attrs:{slot:"suffix"},on:{click:e.changePayType},slot:"suffix"})]),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.save()}}},[e._v("保存")])],1)]),a("span",[e._v(" 颜色标识设置： ")]),a("li",[a("label",[e._v("针对于订单列表和售后列表，对订单进行颜色标识")]),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:e.setColor}},[e._v("颜色标识设置")])],1),a("span",[e._v(" 网页翻译设置 ")]),a("li",[a("label",[e._v("翻译语言：")]),a("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini"},on:{change:function(t){return e.save()}},model:{value:e.setLanguage,callback:function(t){e.setLanguage=t},expression:"setLanguage"}},e._l(e.transLanguage,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("span",[e._v(" 汇率 ")]),a("li",[a("label",{staticStyle:{color:"red","margin-left":"28px"}},[e._v("以下汇率皆为各站点币种对人民币汇率")]),a("div",{staticClass:"coinRate"},e._l(e.coinRate,(function(t){return a("div",{key:t.value},[a("span",[e._v(e._s(t.name)+" :  "+e._s(t.value))])])})),0)]),a("span",[e._v(" 域名切换 ")]),a("li",[a("el-radio-group",{model:{value:e.changeIp,callback:function(t){e.changeIp=t},expression:"changeIp"}},[a("el-radio",{attrs:{label:"1"}},[e._v("自动切换")]),a("el-radio",{attrs:{label:"2"}},[e._v("大陆域名")]),a("el-radio",{attrs:{label:"3"}},[e._v("本土域名")])],1),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.save()}}},[e._v("保存")])],1)]),a("el-dialog",{staticClass:"dialog-color",attrs:{title:"标记颜色标识",width:"400px",top:"6vh","close-on-press-escape":!1,"close-on-click-modal":!1,visible:e.colorVisible},on:{"update:visible":function(t){e.colorVisible=t}}},[a("el-table",{attrs:{"header-cell-style":{background:"#f7fafa"},data:e.colorLogoList,"row-style":{height:"50px"},"max-height":"400"}},[a("el-table-column",{attrs:{prop:"color_name",label:"颜色","min-width":"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[a("div",{style:"width:100px;height:28px;background-color:"+t.color+";margin:0px auto"})]}}])}),a("el-table-column",{attrs:{prop:"name",label:"标识名称","min-width":"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:n.name,callback:function(t){e.$set(n,"name",t)},expression:"row.name"}})]}}])})],1),a("el-button",{staticStyle:{width:"120px","margin-top":"5px","margin-left":"111px"},attrs:{type:"primary",size:"mini"},on:{click:e.updateColor}},[e._v("保存")])],1)],1)}),s=[],l=(a("159b"),a("b0c0"),a("d3b7"),a("25f0"),a("a9e3"),a("0e0b")),c={components:{},props:["userInfo"],data:function(){return{userID:"",uid:"",colorVisible:!1,colorLogoList:[],colorLabelId1:"",interTime:"",isAutoToken:"",accountZFB:"",psdZFB:"",setLanguage:"",transLanguage:[{name:"英文",value:"en"},{name:"繁体",value:"zh-TW"},{name:"葡萄牙语",value:"pt"},{name:"泰语",value:"th"},{name:"越南语",value:"vi"},{name:"中文",value:"zh-CN"},{name:"印尼语",value:"id"},{name:"马来语",value:"ms"},{name:"西班牙语",value:"es"},{name:"波兰语",value:"pl"},{name:"法语",value:"fr"}],coinRate:[{name:"马来站",value:"1.51140000"},{name:"新加坡站",value:"4.71780000"},{name:"菲律宾站",value:"0.12300000"},{name:"泰国站",value:"0.19700000"},{name:"印尼站",value:"0.00044380"},{name:"台湾站",value:"0.22710000"},{name:"越南站",value:"0.00027723"},{name:"巴西站",value:"1.22500000"}],changeIp:"",passwordType:"password"}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["C"])((function(){return e.userInfo&&e.userInfo.id}));case 2:return t.next=4,e.getUserinfo();case 4:return t.next=6,e.getcolorList();case 6:case"end":return t.stop()}}),t)})))()},methods:{changePayType:function(){"password"===this.passwordType?this.passwordType="text":"text"===this.passwordType&&(this.passwordType="password")},getcolorList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getcolorList();case 2:a=t.sent,200===a.data.code?e.colorLogoList=a.data.data:e.$message.warning("颜色标识获取失败！".concat(a.data.data.message));case 4:case"end":return t.stop()}}),t)})))()},updateColor:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={lists:[]},e.colorLogoList.forEach((function(e){var t={id:e.id,color_name:e.color_name,color:e.color,Color:e.color,name:e.name,Name:e.name,status:"1",IsSelected:!1};a.lists.push(t)})),t.next=4,e.$api.updataColorList(a);case 4:n=t.sent,200===n.data.code?e.$message.success("修改成功"):e.$message.warning("修改失败".concat(n.data.data.message));case 6:case"end":return t.stop()}}),t)})))()},setColor:function(){this.colorVisible=!0,this.getcolorList()},getUserinfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.userID=e.userInfo.id,e.uid=e.userInfo.uid,e.interTime=e.userInfo.ori_logistics_interval_time,e.isAutoToken=e.userInfo.is_auto_ori_logistics.toString(),e.accountZFB=e.userInfo.pay_account,t.next=7,window.ConfigBridgeService.getAesDecrypt(e.userInfo.pay_password);case 7:if(t.t0=t.sent,t.t0){t.next=10;break}t.t0="";case 10:e.psdZFB=t.t0,e.setLanguage=e.userInfo.translate_language,e.changeIp=e.userInfo.domain_switch.toString();case 13:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(Number(e.interTime)<2)){t.next=3;break}return e.$message.warning("获取物流单号间隔时间不能少于2小时"),t.abrupt("return");case 3:return t.t0=e.interTime,t.t1=e.isAutoToken,t.t2=e.accountZFB,t.next=8,window.ConfigBridgeService.getAesEecrypt(e.psdZFB);case 8:if(t.t3=t.sent,t.t3){t.next=11;break}t.t3="";case 11:return t.t4=t.t3,t.t5=e.setLanguage,t.t6=e.changeIp,t.t7={oriLogisticsIntervalTime:t.t0,isAutoOriLogistics:t.t1,payAccount:t.t2,payPassword:t.t4,translateLanguage:t.t5,domainSwitch:t.t6},a={content:t.t7,type:1},t.prev=16,t.next=19,e.$api.setUserinfo(JSON.stringify(a));case 19:n=t.sent,200===n.data.code?e.$message.success("信息修改成功！"):e.$message.warning("信息修改失败！".concat(n.data.message)),t.next=25;break;case 23:t.prev=23,t.t8=t["catch"](16);case 25:case"end":return t.stop()}}),t,null,[[16,23]])})))()}}},u=c,d=(a("584a"),a("2877")),p=Object(d["a"])(u,i,s,!1,null,"f5f34d38",null),m=p.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("ul",[a("span",[e._v("  申请虾皮物流单号设置  ")]),a("li",[a("label",{staticStyle:{color:"red","margin-bottom":"10px"}},[e._v("温馨提示：请谨慎选择（应用于虾皮发货）")]),a("el-radio-group",{on:{change:function(t){return e.save()}},model:{value:e.set_AutoApply,callback:function(t){e.set_AutoApply=t},expression:"set_AutoApply"}},[a("el-radio",{attrs:{label:"1"}},[e._v("开启自动申请")]),a("el-radio",{attrs:{label:"2"}},[e._v("关闭自动申请")])],1)],1),a("span",[e._v("  淘宝相关设置  ")]),a("li",[a("label",{staticStyle:{color:"red","margin-bottom":"10px"}},[e._v("温馨提示：应用于淘宝")]),a("div",[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请不要放价格单",type:"textarea",resize:"none",rows:3,size:"mini"},model:{value:e.taobaoLeave,callback:function(t){e.taobaoLeave=t},expression:"taobaoLeave"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{change:function(t){return e.save()}}},[e._v("保存")])],1),a("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("淘宝物流同步异常(需要滑块验证)时，启用弹窗验证")])],1),a("span",[e._v("  1688自定义留言设置  ")]),a("li",[a("label",{staticStyle:{color:"red","margin-bottom":"10px"}},[e._v("温馨提示：应用于1688拍单")]),a("div",[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请不要放价格单",type:"textarea",resize:"none",rows:3,size:"mini"},model:{value:e.aliLeave,callback:function(t){e.aliLeave=t},expression:"aliLeave"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{change:function(t){return e.save()}}},[e._v("保存")])],1)]),a("span",[e._v("  拍单地址标识设置  ")]),a("li",{staticClass:"orderSet"},[a("label",{staticStyle:{color:"red","margin-bottom":"5px"}},[e._v("温馨提示：此设置只针对于自有仓库用户，若拍单发货至系统仓库，请勿取消勾选！")]),a("label",{staticStyle:{color:"red","margin-bottom":"5px"}},[e._v("温馨提示：由于部分拍单平台的买家姓名不能含有特殊字符，请以实际买家姓名为准！")]),a("div",{staticStyle:{height:"8px"}}),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_1,callback:function(t){e.orderset_1=t},expression:"orderset_1"}},[e._v("拍单时买家姓名自动增加软件用户名称标识（拼多多平台将放在详细地址末尾）")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_2,callback:function(t){e.orderset_2=t},expression:"orderset_2"}},[e._v("拍单时买家姓名自动增加拍单日期标识（拼多多平台将放在详细地址末尾）")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_3,callback:function(t){e.orderset_3=t},expression:"orderset_3"}},[e._v("拍单时买家姓名自动增加SPM字样标识（拼多多平台将放在详细地址末尾）")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_4,callback:function(t){e.orderset_4=t},expression:"orderset_4"}},[e._v("拍单时自动增加买家地址标识")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_5,callback:function(t){e.orderset_5=t},expression:"orderset_5"}},[e._v("拍单时买家姓名自动增加订单后6位")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.orderset_6,callback:function(t){e.orderset_6=t},expression:"orderset_6"}},[e._v("拍单时买家地址自动增加订单后6位")])],1),a("span",[e._v("  拼多多拍单  ")]),a("li",[a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.PDDset_defail,callback:function(t){e.PDDset_defail=t},expression:"PDDset_defail"}},[e._v("默认使用拼多多快捷拍单")]),a("el-checkbox",{on:{change:function(t){return e.save()}},model:{value:e.PDDset_other,callback:function(t){e.PDDset_other=t},expression:"PDDset_other"}},[e._v("使用拼多多聚合拍单")])],1)])])},v=[],g=(a("ac1f"),a("1276"),{components:{},props:["userInfo"],data:function(){return{userID:"",uid:"",set_AutoApply:"1",taobaoLeave:"",checked:!1,aliLeave:"",orderset_1:!1,orderset_2:!1,orderset_3:!1,orderset_4:!1,orderset_5:!1,orderset_6:!1,PDDset_defail:!1,PDDset_other:!1}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["C"])((function(){return e.userInfo&&e.userInfo.id}));case 2:return t.next=4,e.getUserinfo();case 4:case"end":return t.stop()}}),t)})))()},methods:{getUserinfo:function(){var e=this;if(this.userInfo){var t=this.userInfo;this.set_AutoApply=t.is_apply_shopee_logistics.toString(),this.taobaoLeave=t.taobao_leave_content,this.checked=1===t.is_taobao_alert_check,this.aliLeave=t.ali_leave_content;var a=t.shot_order_address_label.split(",")||[];a.forEach((function(t){switch(t){case"1":e.orderset_1=!0;break;case"2":e.orderset_2=!0;break;case"3":e.orderset_3=!0;break;case"4":e.orderset_4=!0;break;case"5":e.orderset_5=!0;break;case"6":e.orderset_6=!0;break}})),t.pdd_shot_order_set&&(1===Number(t.pdd_shot_order_set)?this.PDDset_defail=!0:this.PDDset_other=!0)}},save:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={content:{isApplyShopeeLogistics:e.set_AutoApply,taobaoLeaveContent:e.taobaoLeave,isTaobaoAlertCheck:e.checked?"1":"2",aliLeaveContent:e.aliLeave,shotOrderAddressLabel:"",pddShotOrderSet:""},type:3},n=[],e.orderset_1&&n.push("1"),e.orderset_2&&n.push("2"),e.orderset_3&&n.push("3"),e.orderset_4&&n.push("4"),e.orderset_5&&n.push("5"),e.orderset_6&&n.push("6"),a.content.shotOrderAddressLabel=n.toString()||"",r=[],e.PDDset_defail&&r.push("1"),e.PDDset_other&&r.push("2"),a.content.pddShotOrderSet=r.toString()||"",t.prev=13,t.next=16,e.$api.setUserinfo(JSON.stringify(a));case 16:o=t.sent,200===o.data.code?e.$message.success("信息修改成功！"):e.$message.warning("信息修改失败！".concat(o.data.message)),t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](13),e.$message.warning("信息修改失败！".concat(t.t0));case 23:case"end":return t.stop()}}),t,null,[[13,20]])})))()}}}),_=g,h=(a("13db"),Object(d["a"])(_,f,v,!1,null,"7372988e",null)),w=h.exports,b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("ul",[a("span",[e._v(" 翻译设置 ")]),a("li",[a("el-radio-group",{on:{change:function(t){return e.save()}},model:{value:e.selTrans,callback:function(t){e.selTrans=t},expression:"selTrans"}},[a("el-radio",{attrs:{label:"4"}},[e._v("阿里翻译（付费翻译，推荐使用0.000085元/字符）")]),a("el-radio",{attrs:{label:"5"}},[e._v("有道翻译（免费翻译，接口调用频繁容易封IP，只支持英文）")]),a("el-radio",{attrs:{label:"2"}},[e._v("谷歌翻译")]),a("el-radio",{attrs:{label:"3"}},[e._v("私有翻译（需要自己提供百度或者必应翻译API信息） "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:e.checkApi}},[e._v("添加/查看API信息")])],1)],1)],1),a("span",[e._v(" 语言设置 ")]),a("li",[a("el-radio-group",{on:{change:function(t){return e.save()}},model:{value:e.setLanguage,callback:function(t){e.setLanguage=t},expression:"setLanguage"}},[a("el-radio",{attrs:{label:"1"}},[e._v("简体中文")]),a("el-radio",{attrs:{label:"2"}},[e._v("English")])],1)],1)]),a("el-dialog",{attrs:{title:"添加/查看翻译",visible:e.dialog_compareData,width:"950px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialog_compareData=t}}},[a("div",{staticClass:"compareData_allItem"},[a("div",{staticClass:"compareData_item"},[a("label",[e._v("APP类别：")]),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini"},model:{value:e.typeAPP,callback:function(t){e.typeAPP=t},expression:"typeAPP"}},[a("el-option",{attrs:{label:"百度APP",value:"1"}}),a("el-option",{attrs:{label:"必应APP",value:"2"}})],1),a("label",[e._v("APPid：")]),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",clearable:""},model:{value:e.APPid,callback:function(t){e.APPid=t},expression:"APPid"}}),a("label",[e._v("APPKey：")]),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",clearable:""},model:{value:e.APPKey,callback:function(t){e.APPKey=t},expression:"APPKey"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini"},on:{click:e.newAddAPP}},[e._v("添加")])],1),a("div",[a("el-table",{attrs:{"header-cell-style":{background:"#f7fafa"},data:e.tableList,"row-style":{height:"50px"},"max-height":"400"}},[a("el-table-column",{attrs:{prop:"type",label:"APP类别","min-width":"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(1===a.type?"百度APP":"必应APP"))]}}])}),a("el-table-column",{attrs:{prop:"appid",label:"appid","min-width":"150px",align:"center"}}),a("el-table-column",{attrs:{prop:"appkey",label:"appkey","min-width":"150px",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"状态","min-width":"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(1===a.state?"正常":"异常"))]}}])}),a("el-table-column",{attrs:{prop:"comment",label:"备注","min-width":"100px",align:"center",fixed:"right"}}),a("el-table-column",{attrs:{prop:"",label:"操作","min-width":"100px",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.updataAPP(n)}}},[e._v("重置状态")])]}}])}),a("el-table-column",{attrs:{prop:"",label:"删除","min-width":"100px",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.deleteAPP(n)}}},[e._v("删除")])]}}])})],1)],1)])])],1)},x=[],y=(a("c740"),a("a434"),{components:{},props:["userInfo"],data:function(){return{userID:"",uid:"",selTrans:"1",setLanguage:"1",dialog_compareData:!1,typeAPP:"1",APPid:"",APPKey:"",tableList:[]}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["C"])((function(){return e.userInfo&&e.userInfo.id}));case 2:return t.next=4,e.getUserinfo();case 4:case"end":return t.stop()}}),t)})))()},methods:{getAppList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getAppList();case 2:a=t.sent,1===a.status?e.tableList=a.data:e.$message.warning("APP类别获取失败！");case 4:case"end":return t.stop()}}),t)})))()},getUserinfo:function(){this.selTrans=this.userInfo.translate_set.toString(),this.setLanguage="zh_CN"===this.userInfo.language_set?"1":"2"},updataAPP:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={id:e.id,state:e.state},a.next=3,t.$api.translateAppUpdate(n);case 3:r=a.sent,200===r.data.code?t.$message.success("重置成功！"):t.$message.warning("重置失败！".concat(r.data.message));case 5:case"end":return a.stop()}}),a)})))()},deleteAPP:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={id:e.id},a.next=3,t.$api.translateAppDelete(n);case 3:r=a.sent,200===r.data.code?(o=t.tableList.findIndex((function(t){return t.id===e.id})),t.tableList.splice(o,1),t.$message.success("删除成功！")):t.$message.warning("删除失败！".concat(r.data.message));case 5:case"end":return a.stop()}}),a)})))()},newAddAPP:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.APPid&&e.APPKey){t.next=3;break}return e.$message.warning("请输入添加信息"),t.abrupt("return");case 3:return a={type:e.typeAPP,appId:e.APPid,appKey:e.APPKey},t.next=6,e.$api.translateAppAdd(a);case 6:n=t.sent,200===n.data.code?e.checkApi():e.$message.warning("添加失败！".concat(n.data.message));case 8:case"end":return t.stop()}}),t)})))()},checkApi:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dialog_compareData=!0,t.next=3,e.$api.translateApp();case 3:a=t.sent,200===a.data.code?e.tableList=a.data.data:e.$message.warning("信息修改失败！".concat(a.data.message));case 5:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={content:{translateSet:e.selTrans,languageSet:"1"===e.setLanguage?"zh_CN":"en_US"},type:2},t.prev=1,t.next=4,e.$api.setUserinfo(JSON.stringify(a));case 4:n=t.sent,200===n.data.code?e.$message.success("信息修改成功！"):e.$message.warning("信息修改失败！".concat(n.data.message)),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](1);case 10:case"end":return t.stop()}}),t,null,[[1,8]])})))()}}}),k=y,S=(a("933ba"),Object(d["a"])(k,b,x,!1,null,"7511dc20",null)),A=S.exports,P=a("cf9f"),D={name:"UserConfig",components:{setBase:m,setOrder:w,setProxy:A,autoFollow:P["a"]},data:function(){return{activeName:"setBase",userInfo:""}},created:function(){this.getUserinfo()},methods:{handleClick:function(e,t){},getUserinfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$appConfig.getUserInfo();case 2:a=t.sent,200===a.data.code?e.userInfo=a.data.data:e.$message.warning("信息获取失败！".concat(a.data.data.message));case 4:case"end":return t.stop()}}),t)})))()}}},T=D,I=(a("37cf"),Object(d["a"])(T,n,r,!1,null,"7ecba31a",null));t["default"]=I.exports},"13db":function(e,t,a){"use strict";a("d004")},"37cf":function(e,t,a){"use strict";a("e340")},"584a":function(e,t,a){"use strict";a("d59a")},"71a1":function(e,t,a){},"933ba":function(e,t,a){"use strict";a("a9a13")},a9a13:function(e,t,a){},cf9f:function(e,t,a){"use strict";var n,r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detail"},[a("ul",[a("span",[e._v("  通用设置  ")]),a("li",[a("div",[a("label",[e._v("店铺商品上限：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},model:{value:e.limitgGoods,callback:function(t){e.limitgGoods=t},expression:"limitgGoods"}}),a("label",{staticStyle:{"margin-left":"120px"}},[e._v("最后活跃时间：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},model:{value:e.lastOnline,callback:function(t){e.lastOnline=t},expression:"lastOnline"}}),e._v("  天内 ")],1)]),a("span",[e._v("  关注设置  ")]),a("li",[a("ul",{staticStyle:{"margin-top":"-10px"}},[a("span",{staticStyle:{"margin-left":"-20px"}},[e._v("  关注对象  ")]),a("li",{staticStyle:{width:"450px","margin-left":"-20px"}},[a("el-radio-group",{model:{value:e.followActor,callback:function(t){e.followActor=t},expression:"followActor"}},[a("el-radio",{attrs:{label:"0"}},[e._v("店铺粉丝")])],1)],1)]),a("div",{staticStyle:{"margin-bottom":"10px"}},[a("label",[e._v("关注数量：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},model:{value:e.followNum,callback:function(t){e.followNum=t},expression:"followNum"}}),e._v(" （0为无限制） "),a("label",{staticStyle:{"margin-left":"110px"}},[e._v("关注间隔：")]),a("el-input",{staticStyle:{width:"50px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},model:{value:e.interTime,callback:function(t){e.interTime=t},expression:"interTime"}}),e._v(" 秒 ")],1),a("div",[a("el-checkbox",{staticStyle:{"margin-bottom":"10px"},model:{value:e.market,callback:function(t){e.market=t},expression:"market"}},[e._v("不关注订单评价小于等于 ")]),a("el-input",{staticStyle:{width:"50px"},attrs:{size:"mini"},on:{blur:function(t){e.market=!0}},model:{value:e.marketNum,callback:function(t){e.marketNum=t},expression:"marketNum"}}),e._v(" 的用户 ")],1),a("div",[a("el-checkbox",{model:{value:e.followDay,callback:function(t){e.followDay=t},expression:"followDay"}},[e._v("不关注 ")]),a("el-input",{staticStyle:{width:"75px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},on:{blur:function(t){e.followDay=!0}},model:{value:e.followDayNum,callback:function(t){e.followDayNum=t},expression:"followDayNum"}}),e._v(" 天内关注过的用户 ")],1)]),a("span",[e._v("  取关设置  ")]),a("li",[a("div",[a("label",[e._v("取关数量：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{onkeyup:"value=value.replace(/[^\\d.]/g,0)",size:"mini"},model:{value:e.cancerFollowNum,callback:function(t){e.cancerFollowNum=t},expression:"cancerFollowNum"}}),e._v(" （0为无限制） ")],1)]),a("span",[e._v("  自动关注  ")]),a("li",{staticClass:"orderSet"},[a("div",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v(" 开启任务请前往【爆粉神器】添加执行任务的店铺，随后进行参数设置"),a("br"),e._v(" 注意：1.关键词不能为空"),a("br"),e._v("           2.一个站点只能执行一条任务"),a("br"),e._v("           3.同一个站点的任务保存会替换原来的任务"),a("br")]),a("el-checkbox",{model:{value:e.startAddFence,callback:function(t){e.startAddFence=t},expression:"startAddFence"}},[e._v("开启定时刷粉")])],1),a("label",[e._v("每日启动时间  ")]),a("el-time-select",{staticStyle:{width:"100px"},attrs:{"picker-options":{start:"00:00",step:"00:01",end:"23:59"},placeholder:"选择时间",size:"mini"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),a("label",{staticStyle:{"margin-left":"20px"}},[e._v("关注关键词：")]),a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},model:{value:e.followKey,callback:function(t){e.followKey=t},expression:"followKey"}}),a("el-button",{attrs:{size:"mini"},on:{click:e.checkLog}},[e._v("查看日志")])],1)]),a("el-button",{staticStyle:{flex:"1","margin-left":"200px",width:"100px"},attrs:{size:"mini"},on:{click:function(t){return e.save()}}},[e._v("保存")])],1),a("el-dialog",{attrs:{title:"日志",visible:e.logVisible,width:"600px","close-on-click-modal":!1,"close-on-press-escape":!1,"append-to-body":""},on:{"update:visible":function(t){e.logVisible=t}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{"max-height":"400px",data:e.logList,"tooltip-effect":"dark","header-cell-style":{textAlign:"center",backgroundColor:"#f5f7fa"},"cell-style":{textAlign:"center"},"row-style":{height:"80px"}}},[a("el-table-column",{attrs:{label:"操作","min-width":"320px",prop:"option","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"时间","min-width":"180px",prop:"activeTime"}})],1)],1)],1)},o=[],i=a("ade3"),s=a("1da1"),l=(a("d3b7"),a("25f0"),a("ac1f"),a("1276"),a("d81d"),a("a9e3"),a("99af"),a("5319"),a("96cf"),a("0e0b")),c={components:{},props:["userInfo","mall"],data:function(){return{logVisible:!1,logList:[],userID:"",uid:"",showlog:!0,limitgGoods:"5",lastOnline:"1",followActor:"0",followNum:"100",interTime:"10",market:!0,marketNum:"4.5",followDay:!0,followDayNum:"30",cancerFollowNum:100,startAddFence:!1,startTime:"10:00",followKey:""}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["C"])((function(){return e.userInfo&&e.userInfo.id}));case 2:return t.next=4,e.getUserinfo();case 4:case"end":return t.stop()}}),t)})))()},methods:(n={checkLog:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r,o,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.logVisible=!0,a=["MY","TW","VN","ID","PH","TH","SG","BR","MX","CO","CL","PL"],n=0,r=a;case 3:if(!(n<r.length)){t.next=16;break}return o=r[n],t.next=7,window.BaseUtilBridgeService.getAttentionUserTask(o);case 7:if(i=t.sent,!i.length){t.next=13;break}return t.next=11,window.BaseUtilBridgeService.getAttentionUserLog(i[0].id);case 11:s=t.sent,s?e.logList=JSON.parse(s[0].log_message):e.$message.warning("日志请求失败");case 13:n++,t.next=3;break;case 16:case"end":return t.stop()}}),t)})))()},getUserinfo:function(){if(this.userInfo&&this.userInfo.auto_attention_set){var e,t,a,n,r,o,i,s,l,c,u,d;this.limitgGoods=(null===(e=this.userInfo.auto_attention_set)||void 0===e?void 0:e.ProductMax)||this.limitgGoods,this.lastOnline=(null===(t=this.userInfo.auto_attention_set)||void 0===t?void 0:t.LastLoginDay)||this.lastOnline,this.followActor=(null===(a=this.userInfo.auto_attention_set)||void 0===a?void 0:a.FollowType.toString())||this.followActor,this.followNum=(null===(n=this.userInfo.auto_attention_set)||void 0===n?void 0:n.FollowNumber)||this.followNum,this.interTime=(null===(r=this.userInfo.auto_attention_set)||void 0===r?void 0:r.FollowInterval)||this.interTime,this.marketNum=(null===(o=this.userInfo.auto_attention_set)||void 0===o?void 0:o.MinOrderEvaluation)||this.marketNum,this.market=(null===(i=this.userInfo.auto_attention_set)||void 0===i?void 0:i.IsNotFollowMinOrderEvaluation)||this.market,this.followDayNum=(null===(s=this.userInfo.auto_attention_set)||void 0===s?void 0:s.FollowedDay)||this.followDayNum,this.followDay=(null===(l=this.userInfo.auto_attention_set)||void 0===l?void 0:l.IsNotFollowFollowedDay)||this.followDay,this.cancerFollowNum=(null===(c=this.userInfo.auto_attention_set)||void 0===c?void 0:c.CancelFollowNumber)||this.cancerFollowNum,this.startAddFence=(null===(u=this.userInfo.auto_attention_set)||void 0===u?void 0:u.IsOpenTimerBrushFans)||this.startAddFence;var p=this.userInfo.auto_attention_set;this.startTime=(null===(d=this.userInfo.auto_attention_set)||void 0===d?void 0:d.OpenHour)+":"+("0"===p.OpenMinute?"00":p.OpenMinute)||this.startTime,this.followKey=this.userInfo.auto_attention_set.KeyWord||this.followKey}},add0:function(e){return e<10?"0"+e:e},formatTime:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(r)+" "+this.add0(o)+":"+this.add0(i)+":"+this.add0(s)},autoAddFence:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r,o,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.startAddFence||e.mall){t.next=3;break}return e.$message.warning("请前往【爆粉神器】设置需要执行的任务的店铺"),t.abrupt("return",!1);case 3:if(!e.startAddFence||e.followKey){t.next=6;break}return e.$message.warning("关键词不能为空"),t.abrupt("return",!1);case 6:if(a=e.startTime.split(":"),!e.startAddFence){t.next=38;break}return n={},n["country"]=e.mall[0].country,n["log_message"]=[],t.next=13,window.BaseUtilBridgeService.getAttentionUserTask(e.mall[0].country);case 13:if(r=t.sent,!r.length){t.next=20;break}return t.next=17,window.BaseUtilBridgeService.deleteAttentionUserTask(r[0].id);case 17:t.sent,n["log_message"].push("任务删除"),n["created_at"]=e.formatTime((new Date).getTime());case 20:return o={country:e.mall[0].country,mall_ids:e.mall.map((function(e){return e["platform_mall_id"]})).toString(),mall_names:e.mall.map((function(e){return e["mall_alias_name"]||e["platform_mall_name"]})).toString(),product_max:e.limitgGoods,last_login_day:e.lastOnline,open_hour:a[0].toString(),open_minute:a[1].toString(),key_word:e.followKey,follow_number:e.followNum,follow_interval:e.interTime,is_not_follow_min_order_evaluation:e.market?1:0,min_order_evaluation:e.marketNum,is_not_follow_followed_day:e.followDay?1:0,followed_day:e.followDayNum,followed_type:e.followActor,cancel_follow_number:Number(e.cancerFollowNum),cancel_follow_sort_type:0,exec_time:1e3*e.teskTime(e.startTime)},t.next=23,window.BaseUtilBridgeService.saveAttentionUserTask(o);case 23:if(i=t.sent,"200"!==i.code){t.next=33;break}return t.next=27,window.BaseUtilBridgeService.getAttentionUserTask(e.mall[0].country);case 27:s=t.sent,n["task_id"]=s[0].id,n["log_message"].push("任务创建成功"),n["created_at"]=e.formatTime((new Date).getTime()),t.next=35;break;case 33:n["log_message"].push("任务创建失败"),n["created_at"]=e.formatTime((new Date).getTime());case 35:return n["log_message"]=n["log_message"].toString(),t.next=38,window.BaseUtilBridgeService.saveAttentionUserLog(n);case 38:return t.abrupt("return",!0);case 39:case"end":return t.stop()}}),t)})))()},teskTime:function(e){var t="".concat((new Date).getFullYear(),"-").concat((new Date).getMonth(),"-").concat((new Date).getDay()," ").concat(e,":00"),a=t.replace(/:/g,"-");a=a.replace(/ /g,"-");var n=a.split("-"),r=new Date(Date.UTC(n[0],n[1]-1,n[2],n[3]-8,n[4],n[5]));return r.getTime()/1e3}},Object(i["a"])(n,"add0",(function(e){return e<10?"0"+e:e})),Object(i["a"])(n,"formatTime",(function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a+"-"+this.add0(n)+"-"+this.add0(r)+" "+this.add0(o)+":"+this.add0(i)+":"+this.add0(s)})),Object(i["a"])(n,"save",(function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r,o,i,s,l,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.startAddFence){t.next=6;break}return t.next=3,e.autoAddFence();case 3:if(a=t.sent,a){t.next=6;break}return t.abrupt("return");case 6:if(n=e.startTime.split(":"),!e.startAddFence){t.next=20;break}return r={},r["country"]=e.mall[0].country,r["log_message"]=[],o={country:e.mall[0].country,mall_ids:e.mall.map((function(e){return e["platform_mall_id"]})).toString(),mall_names:e.mall.map((function(e){return e["mall_alias_name"]||e["platform_mall_name"]})).toString(),product_max:e.limitgGoods,last_login_day:e.lastOnline,open_hour:n[0],open_minute:n[1],key_word:e.followKey,follow_number:e.followNum,follow_interval:e.interTime,is_not_follow_min_order_evaluation:e.market,min_order_evaluation:e.marketNum,is_not_follow_followed_day:e.followDay,followed_day:e.followDayNum,followed_type:e.followActor,cancel_follow_number:e.cancerFollowNum,cancel_follow_sort_type:0},t.next=14,window.BaseUtilBridgeService.saveAttentionUserTask(JSON.stringify(o));case 14:return i=t.sent,i?(r["task_id"]=i.task_id,r["log_message"].push("任务创建成功"),r["created_at"]=e.formatTime((new Date).getTime())):(r["log_message"].push("任务创建失败"),r["created_at"]=e.formatTime((new Date).getTime())),r["log_message"]=r["log_message"].toString(),t.next=19,window.BaseUtilBridgeService.saveAttentionUserLog(r);case 19:t.sent;case 20:return s={ProductMax:e.limitgGoods,LastLoginDay:e.lastOnline,FollowType:e.followActor,FollowNumber:e.followNum,FollowInterval:e.interTime,MinOrderEvaluation:e.marketNum,IsNotFollowMinOrderEvaluation:e.market,FollowedDay:e.followDayNum,IsNotFollowFollowedDay:e.followDay,CancelFollowNumber:e.cancerFollowNum,IsOpenTimerBrushFans:e.startAddFence,OpenHour:n[0],OpenMinute:n[1],KeyWord:e.followKey,IsNotFollowCrossBorderSeller:!1,CancelFollowSortType:"0"},l={content:{autoAttentionSet:JSON.stringify(s)},type:4},t.prev=22,t.next=25,e.$api.setUserinfo(JSON.stringify(l));case 25:c=t.sent,200===c.data.code?e.$message.success("信息修改成功！"):e.$message.warning("信息修改失败！".concat(c.data.message)),t.next=31;break;case 29:t.prev=29,t.t0=t["catch"](22);case 31:e.$emit("isSave",!0);case 32:case"end":return t.stop()}}),t,null,[[22,29]])})))()})),n)},u=c,d=(a("e5c5"),a("2877")),p=Object(d["a"])(u,r,o,!1,null,"a6bbd672",null);t["a"]=p.exports},d004:function(e,t,a){},d59a:function(e,t,a){},e340:function(e,t,a){},e5c5:function(e,t,a){"use strict";a("71a1")}}]);