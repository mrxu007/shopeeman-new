(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-190f83d0"],{"1e64":function(t,e,a){"use strict";a("fcc2")},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},"8d6a":function(t,e,a){},e6ba:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header-two"},[a("div",{staticStyle:{display:"flex","margin-bottom":"10px"}},[a("storeChoose",{on:{changeMallList:t.changeMallList}}),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.synchronousShops}},[t._v("同步店铺金额")]),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.tiedCardPrepare()}}},[t._v("批量绑卡")])],1),a("el-col",{staticClass:"header-two-top",attrs:{span:24}},[a("p",[t._v("当前可提现总金额："),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.canCarry))])]),a("p",[t._v("当前提现中总金额："),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.withdrawal))])]),a("p",{staticStyle:{"margin-right":"10px"}},[t._v(" 各店铺满 "),a("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"",size:"mini"},model:{value:t.demand,callback:function(e){t.demand=e},expression:"demand"}}),t._v(" 才可以提现 ")],1),a("p",{staticStyle:{"margin-right":"5px"}},[t._v(" 预留金额： "),a("el-input",{staticStyle:{margin:"0 5px"},attrs:{placeholder:"",size:"mini"},model:{value:t.reserved,callback:function(e){t.reserved=e},expression:"reserved"}})],1),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.exportData}},[t._v("导出")])],1)],1),a("el-row",{staticClass:"article"},[a("u-table",{ref:"plTable",attrs:{height:"height","use-virtual":"",data:t.tableData,"data-changes-scroll-top":!1,height:t.height,"row-height":t.rowHeight,border:!1},on:{"selection-change":t.handleSelectionChange,"table-body-scroll":t.tableScroll}},[a("u-table-column",{attrs:{align:"center",type:"selection",width:"50"}}),a("u-table-column",{attrs:{align:"center",type:"index",label:"序列号",width:"60"}}),a("u-table-column",{attrs:{align:"center",label:"站点",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("chineseSite")(e.row.country)))]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,width:"120px",label:"店铺名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.platform_mall_name))]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,width:"120px",label:"店铺别名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.mall_alias_name))]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,width:"120px",label:"银行"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankAccounts&&e.row.bankAccounts.list&&e.row.bankAccounts.list[0]&&e.row.bankAccounts.list[0].bank_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,width:"120px",label:"持卡人"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankAccounts&&e.row.bankAccounts.list&&e.row.bankAccounts.list[0]&&e.row.bankAccounts.list[0].account_name)+" ")]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,label:"银行卡号"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankAccounts&&e.row.bankAccounts.list&&e.row.bankAccounts.list[0]&&e.row.bankAccounts.list[0].account_number)+" ")]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,label:"ICNumber"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankAccounts&&e.row.bankAccounts.list&&e.row.bankAccounts.list[0]&&e.row.bankAccounts.list[0].mtime)+" ")]}}])}),a("u-table-column",{attrs:{align:"center",width:"120px",label:"可提现金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.balance))]}}])}),a("u-table-column",{attrs:{align:"center",width:"120px",label:"提现中金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.withdrawal_no))]}}])}),a("u-table-column",{attrs:{align:"center",label:"今日是否可提现"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.num_of_free_times?"是":"否"))]}}])}),a("u-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,label:"操作状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.error||"同步成功"))]}}])})],1)],1),a("div",{staticClass:"deposit_dialog"},[a("el-dialog",{attrs:{title:t.active&&(t.active.mall_alias_name||t.active.platform_mall_name)+"提现密码",visible:t.depositVisible,"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){t.depositVisible=e}}},[a("el-input",{attrs:{size:"mini"},model:{value:t.depositPassword,callback:function(e){t.depositPassword=e},expression:"depositPassword"}}),a("div",{staticClass:"deposit_footer"},[a("el-button",{attrs:{size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.batchWithdrawal}},[t._v("确定")])],1)],1)],1),a("div",{staticClass:"tiedCard_dialog"},[a("el-dialog",{attrs:{title:"绑定银行卡",visible:t.tiedCardVisible,"close-on-click-modal":!1,width:"350px"},on:{"update:visible":function(e){t.tiedCardVisible=e}}},[t.active?a("div",{staticClass:"tiedCardBox"},[a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("当前店铺名：")]),t._v(" "+t._s(t.active&&(t.active.mall_alias_name||t.active.platform_mall_name))+" ")]),a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("当前手机号：")]),t._v(" "+t._s(t.active&&t.active.phone)+" ")]),a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("银行账号：")]),t._v(" "+t._s(t.bankCard&&t.bankCard.bank_name)+" ")]),a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("持卡人姓名：")]),t._v(" "+t._s(t.bankCard&&t.bankCard.full_name)+" ")]),a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("IC卡号：")]),t._v(" "+t._s(t.bankCard&&t.bankCard.ic_number)+" ")]),a("div",{staticClass:"tiedCardItem"},[a("span",{staticClass:"tiedCardLabel"},[t._v("银行名称：")]),t._v(" "+t._s(t.bankCard&&t.bankCard.account_number)+" ")]),a("div",{staticClass:"tiedCardItem"},[a("el-input",{attrs:{size:"mini"},model:{value:t.cardCode,callback:function(e){t.cardCode=e},expression:"cardCode"}},[a("el-button",{attrs:{slot:"append"},on:{click:t.getWalletOtpSeed},slot:"append"},[t._v(" 发送验证码")])],1)],1),a("div",{staticClass:"tiedCardItem",staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-button",{attrs:{size:"mini"},on:{click:t.cancel}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.tiedCard}},[t._v("确定")])],1)]):t._e()])],1)],1)},s=[],n=a("1da1"),l=(a("96cf"),a("159b"),a("ac1f"),a("1276"),a("c740"),a("a434"),a("4de4"),a("99af"),a("feb6")),r=a("6c27"),o=a("8237"),c=a.n(o),d=a("0e0b"),u=a("7646"),h={components:{storeChoose:l["a"]},data:function(){return{mallListAPIInstance:new u["a"](this),isShowLog:!0,depositVisible:!1,tiedCardVisible:!1,active:null,depositPassword:"",canCarry:0,withdrawal:0,demand:50,reserved:30,height:300,rowHeight:50,SiteList:[],tableData:[],selectData:[],cardCode:"",selectIndex:-1,bankList:[],bankCard:null,seed:""}},watch:{selectData:function(t,e){this.selectIndex=-1}},created:function(){var t=this;this.resizeHeight(),window.addEventListener("resize",(function(e){t.resizeHeight()}))},mounted:function(){this.getBankList()},methods:{synchronousShops:function(){var t=this;this.tableData=[],this.SiteList.forEach(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(a){var i,s,n,l,o,u,h,p,m,f,b,_,w,g,v,y,k,S,C,x,I,L,A,M;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=(new Date).getTime(),s=Object(d["g"])(i,"yyyy-MM-dd"),e.next=4,t.$appConfig.getGlobalCacheInfo("mallInfo",a.platform_mall_id);case 4:return n=e.sent,l=JSON.parse(n),o=l&&l.mall_account_info&&l.mall_account_info.password||"",u=o&&Object(r["sha256"])(c()(o))||"",h=Object(d["g"])(i-2592e6,"yyyy-MM-dd"),p={shop_id:parseInt(a.platform_mall_id),password_hash:u},m={shop_id:parseInt(a.platform_mall_id),transaction_types:"201,203",start_date:s,end_date:h,wallet_type:0,page_number:1,page_size:20},f={shop_id:parseInt(a.platform_mall_id),wallet_type:0},b=JSON.parse(JSON.stringify(a)),_="",e.next=16,t.$shopeemanService.getBankAccounts(a.country,p,{params:{page_size:30,page_number:1},headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 16:return w=e.sent,e.next=19,t.$shopeemanService.getWalletTransactions(a.country,m);case 19:return g=e.sent,e.next=22,t.$shopeemanService.getWalletStatus(a.country,f);case 22:v=e.sent;try{y=JSON.parse(w),k=JSON.parse(g),S=JSON.parse(v),C=JSON.parse(y.data),x=JSON.parse(k.data),I=JSON.parse(S.data),0===C.code?b=Object.assign(b,{bankAccounts:C.data}):_+=(_?",":"")+"无法同步银行卡信息",0===x.code?b=Object.assign(b,{walletTransactionsDate:x.data}):_+=(_?",":"")+"无法同步详细信息",0===I.code?b=Object.assign(b,I.data):_+=(_?",":"")+"无法同步银行卡金额",_=3===_.split(",").length?"同步失败":_}catch(O){_="同步失败"}finally{b=Object.assign(b,{error:_}),L=t.tableData.findIndex((function(t){return t.platform_mall_id===b.platform_mall_id})),L>-1?t.tableData.splice(L,1,b):t.tableData.push(b),A=0,M=0,t.tableData.forEach((function(t){var e=t.withdrawal_no||0,a=t.balance||0;A+=a,M+=e})),t.canCarry=A,t.withdrawal=M}case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},batchWithdrawal:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=Object(r["sha256"])(c()(t.depositPassword)),i={payment_password:a,mallId:t.active.platform_mall_id},e.next=4,t.$shopeemanService.verifyPaymentPass(t.active.country,i);case 4:s=e.sent,JSON.parse(s),t.depositVisible=!1,t.selectIndex++,t.allBatchWithdrawal(!0);case 9:case"end":return e.stop()}}),e)})))()},allBatchWithdrawal:function(t){this.selectData.length||t?this.selectIndex<0?(this.selectIndex=0,this.active=this.selectData[this.selectIndex],this.depositVisible=!0):(this.active=this.selectData[this.selectIndex]||null,this.active?this.depositVisible=!0:this.selectIndex=-1):this.$message.error("至少选择一条店铺信息")},cancel:function(){this.selectIndex>=0?(this.selectIndex++,this.depositVisible?(this.depositVisible=!1,this.allBatchWithdrawal(!0)):(this.tiedCardVisible=!1,this.tiedCardPrepare(!0))):(this.depositVisible=!1,this.tiedCardVisible=!1)},getBankList:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.mallListAPIInstance.getBankList();case 2:a=e.sent,t.bankList=a.data||[];case 4:case"end":return e.stop()}}),e)})))()},tiedCardPrepare:function(t){var e=this;this.selectData.length||t?(this.selectData.forEach(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(a){var i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.account_number=!0,t.next=3,e.$appConfig.getGlobalCacheInfo("mallInfo",a.platform_mall_id);case 3:i=t.sent,s=JSON.parse(i),e.$set(a,"phone",s.mall_account_info&&s.mall_account_info.phone||"");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.allTiedCard()):this.$message.error("至少选择一条银行卡信息")},allTiedCard:function(){var t=this;if(this.cardCode="",this.seed="",this.selectData.length||type)if(this.selectIndex<0){this.selectIndex=0,this.active=this.selectData[this.selectIndex];var e=this.bankList.filter((function(e){return e.site===t.active.country})),a=e&&e[0]&&e[0].bank_list||[],i=Math.floor(Math.random()*a.length);this.bankCard=a[i]||null,this.tiedCardVisible=!0}else if(this.active=this.selectData[this.selectIndex]||null,this.active){var s=this.bankList.filter((function(e){return e.site.toLocaleUpperCase()===t.active.country})),n=s&&s[0]&&s[0].bank_list||[],l=Math.floor(Math.random()*n.length);this.bankCard=n[l]||null,this.tiedCardVisible=!0}else this.selectIndex=-1;else this.$message.error("至少选择一条店铺信息")},getWalletOtpSeed:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$shopeemanService.getWalletOtpSeed(t.active.country,{mallId:t.active.platform_mall_id});case 2:a=e.sent,i=JSON.parse(a),i.status>=200&&i.status<300?(s=JSON.parse(i.data).data,t.seed=s.seed,t.$message.success("发送成功")):t.$message.error("发送失败");case 5:case"end":return e.stop()}}),e)})))()},tiedCard:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i,s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.seed&&t.cardCode){e.next=4;break}return a=t.seed?"请输入验证码":"请发送验证码，并输入",t.$message.error(a),e.abrupt("return");case 4:return i={mallId:t.active.platform_mall_id,account_name:t.bankCard.full_name,account_number:t.bankCard.account_number,bank_account_id:null,bank_code:"",bank_name:t.bankCard.bank_name,bank_name_id:t.bankCard.bank_name_id,ic_number:t.bankCard.ic_number,branch_name:"",region:"",status:4},s={params:{seed:t.seed,code:t.cardCode,otp_seed:"bank-account"}},e.next=8,t.$shopeemanService.bindBankAccount(t.active.country,i,s);case 8:n=e.sent,JSON.parse(n),t.tiedCardVisible=!1,t.selectIndex++,t.allTiedCard(!0);case 13:case"end":return e.stop()}}),e)})))()},handleSelectionChange:function(t){this.selectData=t},exportData:function(){if(!this.tableData.length)return this.$message.warning("没有可导出的数据");for(var t=1,e="<tr>\n              <td>编号</td>\n              <td>站点</td>\n              <td>店铺名称</td>\n              <td>银行</td>\n              <td>持卡人</td>\n              <td>银行卡号</td>\n              <td>ICNumber</td>\n              <td>可提现金额</td>\n              <td>提现中金额</td>\n            </tr>",a=0;a<this.tableData.length;a++){var i=this.tableData[a];i.display_path&&i.display_path.split(">")[0]&&"".concat(i.display_path.split(">")[0],"(").concat(i.display_path_cn.split(">")[0],")"),i.display_path&&i.display_path.split(">")[1]&&"".concat(i.display_path.split(">")[1],"(").concat(i.display_path_cn.split(">")[1],")");e+="<tr><td>".concat(t++,"</td>\n                    <td>").concat(this.$filters.chineseSite(i.country)+"\t","</td>\n                    <td>").concat(i.platform_mall_name+"\t","</td>\n                    <td>").concat((i.bankAccounts&&i.bankAccounts.list&&i.bankAccounts.list[0]&&i.bankAccounts.list[0].bank_name||"")+"\t","</td>\n                    <td>").concat((i.bankAccounts&&i.bankAccounts.list&&i.bankAccounts.list[0]&&i.bankAccounts.list[0].account_name||"")+"\t","</td>\n                    <td>").concat((i.bankAccounts&&i.bankAccounts.list&&i.bankAccounts.list[0]&&i.bankAccounts.list[0].account_number||"")+"\t","</td>\n                    <td>").concat((i.bankAccounts&&i.bankAccounts.list&&i.bankAccounts.list[0]&&i.bankAccounts.list[0].mtime||"")+"\t","</td>\n                    <td>").concat((i.balance||"")+"\t","</td>\n                    <td>").concat((i.withdrawal_no||"")+"\t","</td>\n                </tr>")}Object(d["j"])("热搜词推荐",e)},changeMallList:function(t){this.SiteList=Object.assign(t)},resizeHeight:function(){var t=window.innerHeight;this.height=t-150},tableScroll:function(){}}},p=h,m=(a("fcea"),a("1e64"),a("2877")),f=Object(m["a"])(p,i,s,!1,null,"1e0482ab",null);e["default"]=f.exports},fcc2:function(t,e,a){},fcea:function(t,e,a){"use strict";a("8d6a")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},s=[],n=a("1da1"),l=a("b85c"),r=a("2909"),o=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var d={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,s=t.indexOf("")>-1;i!==s?this.groupId=s?Object(r["a"])(this.groupIdList.map((function(t){return t.id}))):[]:s?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName,s=e.includes(""),n=t.includes("");if(s!==n||e.toString()===t.toString()&&this.isShowNameAll)if(n&&(!i||i&&!this.isShowNameAll)){var o=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(r["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(r["a"])(o),Object(r["a"])(e)));this.site=Object(r["a"])(c),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var d=[];if(i){var u=i&&Object(r["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),h=u.length>this.site.length&&this.site||u,p=u.length>this.site.length&&u||this.site;d=new Set(this.site);var m,f=Object(l["a"])(p);try{for(f.s();!(m=f.n()).done;){var b=m.value;h.includes(b)&&d.delete(b)}}catch(_){f.e(_)}finally{f.f()}d.delete("")}this.site=Object(r["a"])(d)}else n?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1;setTimeout((function(){a.changeMallList(),a.filterMall(i),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n,l,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],i=e.countryVal,s=[],!(e.jsonMallData.length>0)){a.next=7;break}s=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:n=a.sent,s=JSON.parse(n)||[],e.jsonMallData=JSON.parse(n)||[];case 12:if(!(s.length>0)){a.next=17;break}1===t&&(e.siteList=""===i?s:s.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){s.forEach((function(a){i?t===a.group_id&&i===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return l={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(l);case 20:r=a.sent,200===r.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",r.data),o=r.data||[],e.siteList=o,e.jsonMallData=o,e.siteList=""===i?o:o.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10);case 24:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(i){if(i){var s=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(s),a+=i+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},u=d,h=(a("8992"),a("2877")),p=Object(h["a"])(u,i,s,!1,null,null,null);e["a"]=p.exports}}]);