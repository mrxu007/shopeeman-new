(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8395ad1a"],{"4cf2":function(e,a,l){"use strict";l.r(a);var t=function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{staticClass:"contaniner"},[l("header",[l("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:"关键词采集",name:"first"}},[l("div",{staticClass:"keyword-container"},[l("div",{staticClass:"keyword-banner-bar"},e._l(e.keyworBar,(function(a){return l("div",{key:a.value,staticClass:"barChilren",class:{active:e.currentKeywordPlatform===a.value},on:{click:function(l){return e.switchPlatform(a)}}},[e._v(e._s(a.label))])})),0),l("div",{staticClass:"keyword-banner-content"},[l("div",{staticClass:"con-sub-1"},[l("div",{staticClass:"item"},[l("p",[e._v("开始页码:")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartPage,callback:function(a){e.$set(e.commonAttr,"StartPage",a)},expression:"commonAttr.StartPage"}}),l("p",[e._v("总页码:")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndPage,callback:function(a){e.$set(e.commonAttr,"EndPage",a)},expression:"commonAttr.EndPage"}})],1),l("div",{staticClass:"item"},[l("p",[e._v("销售区间:")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartSales,callback:function(a){e.$set(e.commonAttr,"StartSales",a)},expression:"commonAttr.StartSales"}}),l("p",[e._v("-")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndSales,callback:function(a){e.$set(e.commonAttr,"EndSales",a)},expression:"commonAttr.EndSales"}})],1),l("div",{staticClass:"item"},[l("p",[e._v("价格区间:")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartPrice,callback:function(a){e.$set(e.commonAttr,"StartPrice",a)},expression:"commonAttr.StartPrice"}}),l("p",[e._v("-")]),l("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndPrice,callback:function(a){e.$set(e.commonAttr,"EndPrice",a)},expression:"commonAttr.EndPrice"}})],1),l("div",{staticClass:"item"},[l("p",[e._v("站点:")]),l("el-select",{attrs:{placeholder:"",size:"mini"},on:{change:e.getShopeeGoodsPlace},model:{value:e.commonAttr.shopeeSiteCode,callback:function(a){e.$set(e.commonAttr,"shopeeSiteCode",a)},expression:"commonAttr.shopeeSiteCode"}},e._l(e.commonAttr.shopeeSite,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1),l("p",[e._v("站点2:")]),l("el-select",{attrs:{placeholder:"",size:"mini"},on:{change:e.getShopeeGoodsPlace},model:{value:e.commonAttr.lazadaSiteCode,callback:function(a){e.$set(e.commonAttr,"lazadaSiteCode",a)},expression:"commonAttr.lazadaSiteCode"}},e._l(e.commonAttr.lazadaSite,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1),l("p",[e._v("排序方式:")]),l("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.commonAttr.shopeeSortTypeVal,callback:function(a){e.$set(e.commonAttr,"shopeeSortTypeVal",a)},expression:"commonAttr.shopeeSortTypeVal"}},e._l(e.commonAttr.shopeeSortType,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1),l("p",[e._v("排序方式alibaba:")]),l("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.commonAttr.alibabaSortTypeVal,callback:function(a){e.$set(e.commonAttr,"alibabaSortTypeVal",a)},expression:"commonAttr.alibabaSortTypeVal"}},e._l(e.commonAttr.alibabaSortType,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1)],1),e._l(e.commonAttr.lazadaPlace,(function(a,t,n){return l("div",{key:n,staticClass:"item"},[l("p",[e._v(e._s(t))]),l("el-select",{attrs:{placeholder:"",size:"mini",multiple:"","collapse-tags":""},on:{change:function(a){return e.selectPlaceValEvent2(n)}},model:{value:e.commonAttr.lazadaPlaceVal[n],callback:function(a){e.$set(e.commonAttr.lazadaPlaceVal,n,a)},expression:"commonAttr.lazadaPlaceVal[index]"}},[l("el-checkbox",{attrs:{label:"全部"},on:{change:function(a){return e.selectAllEvent2(n)}},model:{value:e.isSelectAll2[n],callback:function(a){e.$set(e.isSelectAll2,n,a)},expression:"isSelectAll2[index]"}}),e._l(a,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})}))],2)],1)})),l("div",{staticClass:"item"},[l("p",[e._v("出货地点:")]),l("el-select",{attrs:{placeholder:"",size:"mini",multiple:"","collapse-tags":""},on:{change:e.selectPlaceValEvent},model:{value:e.commonAttr.placeVal,callback:function(a){e.$set(e.commonAttr,"placeVal",a)},expression:"commonAttr.placeVal"}},[l("el-checkbox",{attrs:{label:"全部"},on:{change:e.selectAllEvent},model:{value:e.isSelectAll,callback:function(a){e.isSelectAll=a},expression:"isSelectAll"}}),e._l(e.commonAttr.placeOrigin,(function(e,a){return l("el-option",{key:a,attrs:{label:e.label,value:e.value}})}))],2)],1),l("div",{staticClass:"item"},[l("p",[e._v("创建时间:")]),l("el-input",{attrs:{size:"mini"}})],1)],2),l("div",{staticClass:"con-sub-2"},[l("div",{staticClass:"item"},[l("p",[e._v("关键词(一行一个)")]),l("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:e.key,callback:function(a){e.key=a},expression:"key"}})],1),l("div",{staticClass:"item"},[l("p",[e._v("过滤关键词(一行一个)")]),l("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:e.commonAttr.keyFilter,callback:function(a){e.$set(e.commonAttr,"keyFilter",a)},expression:"commonAttr.keyFilter"}})],1)]),l("div",{staticClass:"con-sub-3"},[l("div",{staticClass:"item"},[l("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.StartCollection}},[e._v("开始采集")]),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("取消采集")])],1),l("div",{staticClass:"item"},[l("p",[e._v("起:")]),l("el-input",{attrs:{size:"mini",placeholder:""}}),l("p",[e._v("止:")]),l("el-input",{attrs:{size:"mini",placeholder:""}})],1),l("div",{staticClass:"item"},[l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("收藏商品")]),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("编辑上新")])],1),l("div",{staticClass:"item"},[l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("插件采集")]),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("清理全部")])],1),l("div",{staticClass:"item"},[l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("导出数据")]),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("批量删除")])],1)]),l("div",{staticClass:"con-sub-4"},[l("div",{staticClass:"con-sub5-log",domProps:{innerHTML:e._s(e.consoleMsg)}})])])])]),l("el-tab-pane",{attrs:{label:"商品链接采集",name:"second"}}),l("el-tab-pane",{attrs:{label:"整店采集",name:"third"}}),l("el-tab-pane",{attrs:{label:"定时任务补偿",name:"fourth"}})],1)],1),l("article",[l("u-table",{ref:"plTable",attrs:{"max-height":e.Height,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"row-key":"id","big-data-checkbox":!0,border:!1},on:{"selection-change":e.handleSelectionChange}},[l("u-table-column",{attrs:{align:"center",type:"selection"}}),l("u-table-column",{attrs:{align:"center",type:"index",label:"序号"}}),l("u-table-column",{attrs:{align:"center",label:"主图"},scopedSlots:e._u([{key:"default",fn:function(e){var a=e.row;return[l("div",{staticStyle:{"justify-content":"center",display:"flex"}},[l("img",{staticStyle:{width:"56px",height:"56px"},attrs:{src:a.Image}})])]}}])}),l("u-table-column",{attrs:{align:"center",label:"上家ID",prop:"GoodsId"}}),l("u-table-column",{attrs:{align:"center",label:"标题",prop:"Title",width:"500px",fit:""},scopedSlots:e._u([{key:"default",fn:function(a){var t=a.row;return[l("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(t.Title))])]}}])}),l("u-table-column",{attrs:{align:"center",label:"类目",prop:"CategoryName"},scopedSlots:e._u([{key:"default",fn:function(a){var t=a.row;return[l("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(t.CategoryName))])]}}])}),l("u-table-column",{attrs:{align:"center",label:"价格",prop:"Price"}}),l("u-table-column",{attrs:{align:"center",label:"销量",prop:"Sales"}}),l("u-table-column",{attrs:{align:"center",label:"发货地"}}),l("u-table-column",{attrs:{align:"center",label:"来源",prop:"Origin"}}),l("u-table-column",{attrs:{align:"center",label:"操作"}}),l("u-table-column",{attrs:{align:"center",label:"操作结果"}})],1)],1)])},n=[],r=l("2909"),o=l("1da1"),i=(l("96cf"),l("d81d"),l("498a"),l("ac1f"),l("1276"),l("5319"),l("99af"),l("4d63"),l("25f0"),l("d3b7"),l("d4ec")),s=l("bee2"),c=l("ade3"),u=(l("a15b"),function(){function e(a){Object(i["a"])(this,e),Object(c["a"])(this,"_this",null),this._this=a,this.platformId=null,this.commonAttr=null,this.keywordAttr=null,this.delayTime=1e3,this.GoodsData=null}return Object(s["a"])(e,[{key:"_initKeyWord",value:function(e,a){this.platformId=e,this.commonAttr=a}},{key:"keywordSearch",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var l,t,n,o,i,s,c,u,b,v,m,d,h,p,g,S;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.GoodsData=null,this.GoodsData=[],l=this.commonAttr.StartPage-0,t=this.commonAttr.EndPage-0,n=this.commonAttr.StartPrice-0,o=this.commonAttr.EndPrice-0,i=this.commonAttr.shopeeSortTypeVal,s=i.split(",")[0],c=i.split(",")[1],u=this.commonAttr.siteCode,b=this.commonAttr.placeVal,v=this.commonAttr.alibabaSortTypeVal,m={},m["Key"]=a,e.prev=14;case 15:if(!l){e.next=57;break}e.t0=this.platformId,e.next=1===e.t0||1.2===e.t0?19:2===e.t0?21:8===e.t0?25:9===e.t0?28:10===e.t0?29:11===e.t0?31:12===e.t0?39:41;break;case 19:return m["Page"]=l,e.abrupt("break",41);case 21:return m["Page"]=l,m["StartPrice"]=n,m["EndPrice"]=o,e.abrupt("break",41);case 25:return m["Page"]=l,m["SortType"]=v,e.abrupt("break",41);case 28:return e.abrupt("break",41);case 29:return m["Page"]=l,e.abrupt("break",41);case 31:return m["Page"]=l,m["By"]=s,m["Order"]=c,m["StartPrice"]=n,m["EndPrice"]=o,m["Site"]=u.toLowerCase(),m["Location"]=b.join(","),e.abrupt("break",41);case 39:return m["Page"]=l,e.abrupt("break",41);case 41:return e.next=44,this._this.$collectService.querySpuByKeyworld(this.platformId,m);case 44:if(g=e.sent,g=JSON.parse(g),200!==g.Code&&this.writeLog("采集".concat(a,"关键词第").concat(l,"页第一部分失败：").concat(g.Code,"-").concat(g.Msg),!1),S=null===(d=g)||void 0===d||null===(h=d.ListItem)||void 0===h?void 0:h.length,this.writeLog("采集".concat(a,"关键词第").concat(l,"页第一部分，采集到约").concat(S,"条"),!0),S){e.next=51;break}return e.abrupt("break",57);case 51:if((p=this.GoodsData).push.apply(p,Object(r["a"])(g.ListItem)),!(l>=t)){e.next=54;break}return e.abrupt("break",57);case 54:l++,e.next=15;break;case 57:e.next=62;break;case 59:e.prev=59,e.t1=e["catch"](14),this.writeLog("采集".concat(a,"关键词第").concat(l,"页第一部分，捕获错误").concat(e.t1),!1);case 62:return this.GoodsData=this.GoodsData.map((function(e,a){return e.id=a+1,e.information="",e})),e.abrupt("return",{code:200,data:this.GoodsData});case 64:case"end":return e.stop()}}),e,this,[[14,59]])})));function a(a){return e.apply(this,arguments)}return a}()},{key:"keywordSearchTwo",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var l,t,n,o,i,s,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.GoodsData=null,this.GoodsData=[],l=this.commonAttr.StartPage-0,t=this.commonAttr.EndPage-0,n={},n["key"]=a,l=this.commonAttr.StartPage-0,e.prev=7;case 8:if(!l){e.next=25;break}return n["page"]=l,e.next=12,this._this.$collectService.querySpuByKeyworld(1.1,n);case 12:if(c=e.sent,c=JSON.parse(c),200!==c.Code&&this.writeLog("采集".concat(a,"关键词第").concat(l,"页第二部分失败：").concat(c.Code,"-").concat(c.Msg),!1),u=null===(o=c)||void 0===o||null===(i=o.ListItem)||void 0===i?void 0:i.length,this.writeLog("采集".concat(a,"关键词第").concat(l,"页第二部分，采集到约").concat(u,"条"),!0),u){e.next=19;break}return e.abrupt("break",25);case 19:if((s=this.GoodsData).push.apply(s,Object(r["a"])(c.ListItem)),!(l>=t)){e.next=22;break}return e.abrupt("break",25);case 22:l++,e.next=8;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e["catch"](7),this.writeLog("采集".concat(a,"关键词第").concat(l,"页第二部分，捕获错误").concat(e.t0),!1);case 30:return this.GoodsData=this.GoodsData.map((function(e,a){return e.id=a+1,e.information="",e})),e.abrupt("return",{code:200,data:this.GoodsData});case 32:case"end":return e.stop()}}),e,this,[[7,27]])})));function a(a){return e.apply(this,arguments)}return a}()},{key:"writeLog",value:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(void 0!==this._this.consoleMsg&&e){var l=a?"green":"red",t=this.dateFormat(new Date(Date.now()),"hh:mm:ss");this._this.consoleMsg+='<p style="color:'.concat(l,'; margin-top: 5px;">').concat(t,":").concat(e,"</p>")}}},{key:"dateFormat",value:function(e,a){var l={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var t in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),l)new RegExp("("+t+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?l[t]:("00"+l[t]).substr((""+l[t]).length)));return a}},{key:"delay",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var l=setTimeout((function(){clearTimeout(l),e(!0)}),a)})));case 1:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()}]),e}()),b=u,v={TW:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],ID:[{lebel:"本地",value:"Dalam Negeri"},{lebel:"海外",value:"Luar Negeri"},{lebel:"Jabodetabek（雅博德塔别克）",value:"Jabodetabek"},{lebel:"DKI Jakarta（DKI雅加达）",value:"DKI Jakarta"},{lebel:"Jawa Barat（西爪哇）",value:"Jawa Barat"},{lebel:"Jawa Timur（东爪哇）",value:"Jawa Timur"},{lebel:"Jawa Tengah（中爪哇）",value:"Jawa Tengah"},{lebel:"Kepulauan Riau（廖内群岛）",value:"Kepulauan Riau"},{lebel:"Banten（万丹）",value:"Banten"},{lebel:"Sumatera Utara（北苏门答腊）",value:"Sumatera Utara"},{lebel:"DI Yogyakarta（在日惹）",value:"DI Yogyakarta"},{lebel:"Bali（巴厘岛）",value:"Bali"},{lebel:"Lampung（楠榜）",value:"Lampung"},{lebel:"Sumatera Selatan（南苏门答腊）",value:"Sumatera Selatan"},{lebel:"Sulawesi Selatan（南苏拉威西）",value:"Sulawesi Selatan"},{lebel:"Riau（廖内）",value:"Riau"},{lebel:"Jambi（占碑）",value:"Jambi"},{lebel:"Kalimantan Timur（东加里曼丹）",value:"Kalimantan Timur"},{lebel:"Kalimantan Selatan（南加里曼丹）",value:"Kalimantan Selatan"},{lebel:"Kalimantan Barat（西加里曼丹）",value:"Kalimantan Barat"}],MY:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"West Malaysia（西马）",value:"West Malaysia"},{label:"East Malaysia（东马来西亚）",value:"East Malaysia"},{label:"Selangor（雪兰莪）",value:"Selangor"},{label:"Kuala Lumpur（吉隆坡）",value:"Kuala Lumpur"},{label:"Penang（槟城）",value:"Penang"},{label:"Johor（柔佛）",value:"Johor"},{label:"Kedah（吉打）",value:"Kedah"},{label:"Perak（霹雳州）",value:"Perak"},{label:"Melaka（马六甲）",value:"Melaka"},{label:"Pahang（彭亨）",value:"Pahang"},{label:"Negeri Sembilan（森美兰州）",value:"Negeri Sembilan"},{label:"Terengganu（登嘉楼）",value:"Terengganu"},{label:"Sarawak（砂拉越）",value:"Sarawak"},{label:"Kelantan（吉兰丹）",value:"Kelantan"},{label:"Perlis（玻璃市）",value:"Perlis"},{label:"Sabah（沙巴）",value:"Sabah"},{label:"Putrajaya（布城）",value:"Putrajaya"},{label:"Labuan（纳闽）",value:"Labuan"}],SG:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],PH:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"Metro Manila（马尼拉大都会）",value:"Metro Manila"},{label:"North Luzon（北吕宋）",value:"North Luzon"},{label:"South Luzon（南吕宋岛）",value:"South Luzon"},{label:"Visayas（米沙鄢）",value:"Visayas"},{label:"Mindanao（棉兰老岛）",value:"Mindanao"}],VN:[{label:"海外",value:"Nước ngoài"},{label:"Hà Nội（河内）",value:"Hà Nội"},{label:"TP. Hồ Chí Minh（胡志明）",value:"TP. Hồ Chí Minh"},{label:"Thái Nguyên（泰阮）",value:"Thái Nguyên"},{label:"Vĩnh Phúc（永福）",value:"Vĩnh Phúc"},{label:"Hải Phòng（海防）",value:"Hải Phòng"},{label:"Đồng Nai（同奈）",value:"Đồng Nai"},{label:"Hưng Yên（红颜）",value:"Hưng Yên"},{label:"Bình Dương（平阳）",value:"Bình Dương"},{label:"Bắc Ninh（北宁）",value:"Bắc Ninh"},{label:"Đà Nẵng（岘港）",value:"Đà Nẵng"},{label:"Quảng Ninh（广宁）",value:"Quảng Ninh"},{label:"Hải Dương（海阳）",value:"Hải Dương"},{label:"Nam Định（南定）",value:"Nam Định"},{label:"Cần Thơ（芹苴）",value:"Cần Thơ"},{label:"Phú Thọ（富都）",value:"Phú Thọ"},{label:"Bà Rịa - Vũng Tàu（BA Ria 头顿）",value:"Bà Rịa - Vũng Tàu"},{label:"Đắk Lắk（多乐）",value:"Đắk Lắk"},{label:"Thanh Hóa（清化）",value:"Thanh Hóa"},{label:"Thái Bình（平静的）",value:"Thái Bình"},{label:"Nước ngoài（外国的）",value:"Nước ngoài"}],TH:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"กรุงเทพและปริมณฑล（曼谷及周边地区）",value:"กรุงเทพและปริมณฑล"},{label:"ภาคกลาง（中央）",value:"ภาคกลาง"},{label:"ภาคตะวันออกเฉียงเหนือ（东北）",value:"ภาคตะวันออกเฉียงเหนือ"},{label:"ภาคใต้（南）",value:"ภาคใต้"},{label:"ภาคเหนือ（北方）",value:"ภาคเหนือ"},{label:"ภาคตะวันออก（东部地区）",value:"ภาคตะวันออก"},{label:"ภาคตะวันตก（西部地区）",value:"ภาคตะวันตก"}],BR:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"São Paulo（圣保罗）",value:"São Paulo"},{label:"Acre（英亩）",value:"Acre"},{label:"Alagoas（阿拉戈斯）",value:"Alagoas"},{label:"Amapá（阿马帕）",value:"Amapá"},{label:"Amazonas（亚马逊人）",value:"Amazonas"},{label:"Bahia（巴伊亚）",value:"Bahia"},{label:"Ceará（塞阿拉）",value:"Ceará"},{label:"Distrito Federal（联邦区）",value:"Distrito Federal"},{label:"Espírito Santo（神圣的灵魂）",value:"Espírito Santo"},{label:"Goiás（戈亚斯）",value:"Goiás"},{label:"Maranhão（马拉尼昂）",value:"Maranhão"},{label:"Mato Grosso（马托格罗索州）",value:"Mato Grosso"},{label:"Mato Grosso do Sul（南马托格罗索州）",value:"Mato Grosso do Sul"},{label:"Minas Gerais（米纳斯吉拉斯州）",value:"Minas Gerais"},{label:"Pará（为了）",value:"Pará"},{label:"Paraíba（帕拉伊巴）",value:"Paraíba"},{label:"Paraná（巴拉那）",value:"Paraná"},{label:"Pernambuco（伯南布哥）",value:"Pernambuco"},{label:"Piauí（皮奥伊）",value:"Piauí"},{label:"Rio de Janeiro（里约热内卢）",value:"Rio de Janeiro"},{label:"Rio Grande do Norte（北大河）",value:"Rio Grande do Norte"},{label:"Rio Grande do Sul（南里奥格兰德）",value:"Rio Grande do Sul"},{label:"Rondônia（朗多尼亚）",value:"Rondônia"},{label:"Roraima（罗赖马）",value:"Roraima"},{label:"Santa Catarina（圣卡塔琳娜）",value:"Santa Catarina"},{label:"Sergipe（塞尔吉佩）",value:"Sergipe"},{label:"Tocantins（托坎廷斯）",value:"Tocantins"}],MX:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}]},m=[{value:"TW",label:"台湾"},{value:"ID",label:"印尼"},{value:"MY",label:"马来"},{value:"SG",label:"新加坡"},{value:"PH",label:"菲律宾"},{value:"VN",label:"越南"},{value:"TH",label:"泰国"},{value:"BR",label:"巴西"},{value:"MX",label:"墨西哥"}],d=[{value:"TH",label:"泰国"},{value:"MY",label:"马来"},{value:"ID",label:"印尼"},{value:"VN",label:"越南"},{value:"SG",label:"新加坡"},{value:"PH",label:"菲律宾"}],h={ID:{"Lokal（本地）：":[{label:"Jawa Barat（西爪哇）",value:"1794"},{label:"DKI Jakarta（雅加达DKI）",value:"1796"},{label:"Jawa Timur（东爪哇）",value:"1795"},{label:"Banten（万丹）",value:"1791"},{label:"Jawa Tengah（中爪哇省）",value:"1797"},{label:"North Sumatra（北苏门答腊）",value:"1817"},{label:"Riau Islands（廖内群岛）",value:"1800"},{label:"Di Yogyakarta（在日惹）",value:"1818"},{label:"South Sumatra（南苏门答腊）",value:"1815"},{label:"Sulawesi Selatan（南苏拉威西岛）",value:"1813"},{label:"Riau（廖内）",value:"1809"},{label:"West Sumatra（西苏门答腊）",value:"1811"},{label:"Bali（巴厘岛）",value:"1788"},{label:"West Kalimantan（西加里曼丹）",value:"1798"}],"Luar Negeri（海外）：":[{label:"Tiongkok（中国）",value:"-49"},{label:"Amerika Serikat（美国）",value:"-231"},{label:"India（印度）",value:"-105"},{label:"Jerman（德国）",value:"-57"},{label:"Korea Selatan（南韩）",value:"-122"},{label:"Taiwan（台湾）",value:"-226"},{label:"Makau SAR Tiongkok（澳门）",value:"-148"},{label:"Malaysia（马来西亚）",value:"-158"},{label:"Kanada（加拿大）",value:"-39"}]},MY:{"Local（本地）：":[{label:"West Malaysia（西马）",value:"West Malaysia"},{label:"East Malaysia（东马）",value:"East Malaysia"}],"Overseas（海外）：":[{value:"-49",label:"China（中国）"},{value:"-226",label:"Taiwan（台湾）"},{value:"-15",label:"Australia（澳大利亚）"},{value:"-105",label:"India（印度）"},{value:"-231",label:"United States（美国）"},{value:"-122",label:"South Korea（韩国）"},{value:"-148",label:"Macau SAR China（澳门）"},{value:"-114",label:"Japan（日本）"},{value:"-47",label:"Chile（智利）"},{value:"-75",label:"France（法国）"},{value:"-14",label:"Austria（奥地利）"},{value:"-7",label:"Albania（阿尔巴尼亚）"},{value:"-167",label:"Norway（挪威）"},{value:"-4",label:"Afghanistan（阿富汗）"},{value:"-177",label:"Philippines（菲律宾）"},{value:"-22",label:"Belgium（比利时）"},{value:"-39",label:"Canada（加拿大）"},{value:"-77",label:"United Kingdom（英国）"},{value:"-117",label:"Cambodia（柬埔寨）"},{value:"-171",label:"New Zealand（新西兰）"}]},SG:{"Location（位置）：":[{label:"Singapore（新加坡）",value:"local"},{label:"China（中国）",value:"-49"},{label:"Malaysia（马来西亚）",value:"-158"},{label:"South Korea（南韩）",value:"-122"},{label:"Germany（德国）",value:"-57"},{label:"United States（美国）",value:"-231"},{label:"Macau SAR China（澳门）",value:"-148"},{label:"Canada（加拿大）",value:"-39"}]},PH:{"Location（位置）：":[{label:"NCR",value:"NCR"},{label:"South Luzon（南吕宋）",value:"South Luzon"},{label:"Visayas（米沙鄢）",value:"Visayas"},{label:"Mindanao（棉兰老）",value:"Mindanao"},{label:"North Luzon（北吕宋）",value:"North Luzon"},{label:"Overseas（海外）",value:"overseas"}]},VN:{"Nội địa（本地）：":[{label:"Hồ Chí Minh（胡志明市）",value:"Ho Chi Minh"},{label:"Hà Nội（河内）",value:"Hanoi"},{label:"Miền Nam（南方）",value:"South"},{label:"Miền Bắc（北方）",value:"North"},{label:"Miền Trung（中央）",value:"Middle"}],"Nước ngoài（海外）：":[{value:"-49",label:"Trung Quốc（中国）"},{value:"-57",label:"Germany（德国）"},{value:"-231",label:"Hoa Kỳ（美国）"},{value:"-226",label:"Đài Loan（台湾）"}]},TH:{"สถานที่（本地）：":[{value:"local",label:"ในประเทศ（本地）"},{value:"-49",label:"จีน（中国）"},{value:"-231",label:"สหรัฐอเมริกา（美国）"},{value:"-226",label:"ไต้หวัน（台湾）"},{value:"-148",label:"มาเก๊า（澳门）"},{value:"-8",label:"อาร์เมเนีย（亚美尼亚）"},{value:"-57",label:"เยอรมัน（德语）"}]}},p={1:"拼多多",1.2:"拼多多优惠采集",2:"淘宝",4:"京东",5:"自有",7:"货源甲",8:"1688",9:"Lazada",10:"京喜",11:"虾皮",12:"速卖通",13:"天猫淘宝海外平台",15:"货老板云仓"};function g(e){var a=[];return Array.isArray(e)?(e.map((function(e){p[e]&&a.push({label:p[e],value:e})})),a):a}function S(e){return v[e]}function f(e){return 11===e?m:9===e?d:[]}function y(e){return h[e]}var k={props:{baseConfig:{type:Object,required:!1,default:function(){return{keywordConfig:[1,2,11,8,1.2,10,12,9]}}}},data:function(){return{Height:650,activeName:"first",CollectKeyWordApInstance:new b(this),multipleSelection:[],goodsList:[],buttonStatus:{keyword:!1},currentKeywordPlatform:11,commonAttr:{StartPage:1,EndPage:2,StartSales:0,EndSales:999999999,StartPrice:0,EndPrice:999999999,shopeeSortType:[{label:"价格从低到高",value:"price,asc"},{label:"价格从高到低",value:"price,desc"},{label:"销量从低到高",value:"sales,asc"},{label:"销量从高到低",value:"sales,desc"}],shopeeSortTypeVal:"price,asc",placeOrigin:"",placeVal:[],shopeeSite:[],lazadaSite:[],shopeeSiteCode:"TW",lazadaSiteCode:"ID",alibabaSortType:[{label:"综合排序",value:"pop"},{label:"价格从低到高",value:"price_fale"},{label:"价格从高到低",value:"price_true"},{label:"销量从低到高",value:"booked_false"},{label:"销量从高到低",value:"booked_true"}],alibabaSortTypeVal:"pop",lazadaPlace:{},lazadaPlaceVal:[[],[]]},key:"",keyFilter:"",isSelectAll:!1,isSelectAll2:[!1,!1],consoleMsg:""}},computed:{keyworBar:function(){var e=g(this.baseConfig.keywordConfig);return e}},created:function(){this.getShopeeGoodsPlace(),this.getSite()},mounted:function(){},methods:{selectPlaceValEvent:function(){this.commonAttr.placeOrigin.length===this.commonAttr.placeVal.length?this.isSelectAll=!0:this.isSelectAll=!1},selectAllEvent:function(){var e=this;this.isSelectAll?this.commonAttr.placeOrigin.map((function(a){e.commonAttr.placeVal.push(a.value)})):this.commonAttr.placeVal=[]},selectPlaceValEvent2:function(e){},selectAllEvent2:function(e){},getSite:function(){var e,a=f(this.currentKeywordPlatform);this.commonAttr.site=a,this.commonAttr.siteCode=(null===(e=a[0])||void 0===e?void 0:e.value)||""},getShopeeGoodsPlace:function(){this.isSelectAll=!1,this.commonAttr.placeOrigin=[],11===this.currentKeywordPlatform?this.commonAttr.placeOrigin=S(this.commonAttr.siteCode):9===this.currentKeywordPlatform&&(this.commonAttr.lazadaPlaceVal[0]=[],this.commonAttr.lazadaPlaceVal[1]=[],this.getLazadaGoodsPlace())},getLazadaGoodsPlace:function(){var e=y(this.commonAttr.siteCode);this.commonAttr.lazadaPlace=e},handleClick:function(e,a){},handleSelectionChange:function(e){this.multipleSelection=e},switchPlatform:function(e){this.currentKeywordPlatform=e.value,this.commonAttr.placeVal=[],11===this.currentKeywordPlatform?(this.getSite(),this.commonAttr.lazadaPlace={},this.commonAttr.lazadaPlaceVal=[[],[]],this.getShopeeGoodsPlace()):9===this.currentKeywordPlatform&&(this.getSite(),this.commonAttr.placeOrigin=[],this.getLazadaGoodsPlace())},StartCollection:function(){switch(this.activeName){case"first":this["keywordSearch"]();break;case"second":this["linksSearch"]();break;case"third":this["entireMallSearch"]();break;default:this.$message.error("采集操作非法！！！！");break}},handleKeyFactory:function(){try{var e=this.key.trim();return e?(e=this.key.replace(/\s/g,";").split(";"),{code:200,data:e}):{code:-3,data:"参数不能为空"}}catch(a){return{code:-2,data:"关键词格式不规范：".concat(a)}}},keywordSearch:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var l,t,n,o,i,s,c,u,b,v,m,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(l=e.handleKeyFactory(),200===l.code){a.next=3;break}return a.abrupt("return",-2===l.code?e.$message.error(""):void 0);case 3:t=l.data,n=l.data.length,o=e.currentKeywordPlatform,e.buttonStatus.keyword=!0,e.consoleMsg="",e.goodsList=[],e.$refs.plTable.reloadData(e.goodsList),e.CollectKeyWordApInstance._initKeyWord(o,e.commonAttr),e.writeLog("开始采集搜索........",!0),e.writeLog("开始采集".concat(p[o],"的商品......."),!0),i=0;case 14:if(!(i<n)){a.next=25;break}return c=t[i],a.next=18,e.CollectKeyWordApInstance.keywordSearch(c);case 18:if(u=a.sent,200===u.code){a.next=21;break}return a.abrupt("continue",22);case 21:(s=e.goodsList).push.apply(s,Object(r["a"])(u.data));case 22:i++,a.next=14;break;case 25:if(1!==o){a.next=38;break}b=0;case 27:if(!(b<n)){a.next=38;break}return m=t[b],a.next=31,e.CollectKeyWordApInstance.keywordSearchTwo(m);case 31:if(d=a.sent,200===d.code){a.next=34;break}return a.abrupt("continue",35);case 34:(v=e.goodsList).push.apply(v,Object(r["a"])(d.data));case 35:b++,a.next=27;break;case 38:e.writeLog("".concat(p[o],"：共采集：").concat(e.goodsList.length,"条"),!0),e.writeLog("".concat(p[o],"的商品采集完毕........"),!0),t=null,e.buttonStatus.keyword=!1;case 42:case"end":return a.stop()}}),a)})))()},linksSearch:function(){},entireMallSearch:function(){},writeLog:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(void 0!==this.consoleMsg&&e){var l=a?"green":"red",t=this.dateFormat(new Date(Date.now()),"hh:mm:ss");this.consoleMsg+='<p style="color:'.concat(l,'; margin-top: 5px;">').concat(t,":").concat(e,"</p>")}},dateFormat:function(e,a){var l={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var t in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),l)new RegExp("("+t+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?l[t]:("00"+l[t]).substr((""+l[t]).length)));return a},delay:function(e){return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.abrupt("return",new Promise((function(a){var l=setTimeout((function(){clearTimeout(l),a(!0)}),e)})));case 1:case"end":return a.stop()}}),a)})))()}}},A=k,P=(l("cab2"),l("2877")),w=Object(P["a"])(A,t,n,!1,null,"4a85195a",null);a["default"]=w.exports},"88a4":function(e,a,l){},cab2:function(e,a,l){"use strict";l("88a4")}}]);