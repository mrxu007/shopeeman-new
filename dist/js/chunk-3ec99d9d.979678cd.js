(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ec99d9d"],{"4cf2":function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"contaniner"},[t("header",[t("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"关键词采集",name:"first"}},[t("div",{staticClass:"keyword-container"},[t("div",{staticClass:"keyword-banner-bar"},e._l(e.keyworBar,(function(a){return t("div",{key:a.value,staticClass:"barChilren",class:{active:e.currentKeywordPlatform===a.value},on:{click:function(t){return e.selectPlatform(a)}}},[e._v(e._s(a.label))])})),0),t("div",{staticClass:"keyword-banner-content"},[t("div",{staticClass:"con-sub-1"},[t("div",{staticClass:"item"},[t("p",[e._v("开始页码:")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartPage,callback:function(a){e.$set(e.commonAttr,"StartPage",a)},expression:"commonAttr.StartPage"}}),t("p",[e._v("总页码:")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndPage,callback:function(a){e.$set(e.commonAttr,"EndPage",a)},expression:"commonAttr.EndPage"}})],1),t("div",{staticClass:"item"},[t("p",[e._v("销售区间:")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartSales,callback:function(a){e.$set(e.commonAttr,"StartSales",a)},expression:"commonAttr.StartSales"}}),t("p",[e._v("-")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndSales,callback:function(a){e.$set(e.commonAttr,"EndSales",a)},expression:"commonAttr.EndSales"}})],1),t("div",{staticClass:"item"},[t("p",[e._v("价格区间:")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.StartPrice,callback:function(a){e.$set(e.commonAttr,"StartPrice",a)},expression:"commonAttr.StartPrice"}}),t("p",[e._v("-")]),t("el-input",{attrs:{size:"mini"},model:{value:e.commonAttr.EndPrice,callback:function(a){e.$set(e.commonAttr,"EndPrice",a)},expression:"commonAttr.EndPrice"}})],1),t("div",{staticClass:"item"},[t("p",[e._v("站点:")]),t("el-select",{attrs:{placeholder:"",size:"mini"},on:{change:e.getShopeePlace},model:{value:e.shopeeAttr.siteCode,callback:function(a){e.$set(e.shopeeAttr,"siteCode",a)},expression:"shopeeAttr.siteCode"}},e._l(e.getSite,(function(e,a){return t("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1),t("p",[e._v("排序方式:")]),t("el-select",{attrs:{placeholder:"",size:"mini"},model:{value:e.commonAttr.sortWayVal,callback:function(a){e.$set(e.commonAttr,"sortWayVal",a)},expression:"commonAttr.sortWayVal"}},e._l(e.commonAttr.sortWay,(function(e,a){return t("el-option",{key:a,attrs:{label:e.label,value:e.value}})})),1)],1),t("div",{staticClass:"item"},[t("p",[e._v("出货地点:")]),t("el-select",{attrs:{placeholder:"",size:"mini",multiple:"","collapse-tags":""},on:{change:e.selectPlaceValEvent},model:{value:e.shopeeAttr.placeVal,callback:function(a){e.$set(e.shopeeAttr,"placeVal",a)},expression:"shopeeAttr.placeVal"}},[t("el-checkbox",{attrs:{label:"全部"},on:{change:e.selectAllEvent},model:{value:e.shopeeAttr.isSelectAll,callback:function(a){e.$set(e.shopeeAttr,"isSelectAll",a)},expression:"shopeeAttr.isSelectAll"}}),e._l(e.shopeeAttr.placeOrigin,(function(e,a){return t("el-option",{key:a,attrs:{label:e.label,value:e.value}})}))],2)],1),t("div",{staticClass:"item"},[t("p",[e._v("创建时间:")]),t("el-input",{attrs:{size:"mini"}})],1)]),t("div",{staticClass:"con-sub-2"},[t("div",{staticClass:"item"},[t("p",[e._v("关键词(一行一个)")]),t("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:e.key,callback:function(a){e.key=a},expression:"key"}})],1),t("div",{staticClass:"item"},[t("p",[e._v("过滤关键词(一行一个)")]),t("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:e.commonAttr.keyFilter,callback:function(a){e.$set(e.commonAttr,"keyFilter",a)},expression:"commonAttr.keyFilter"}})],1)]),t("div",{staticClass:"con-sub-3"},[t("div",{staticClass:"item"},[t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.StartCollection}},[e._v("开始采集")]),t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("取消采集")])],1),t("div",{staticClass:"item"},[t("p",[e._v("起:")]),t("el-input",{attrs:{size:"mini",placeholder:""}}),t("p",[e._v("止:")]),t("el-input",{attrs:{size:"mini",placeholder:""}})],1),t("div",{staticClass:"item"},[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("收藏商品")]),t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("编辑上新")])],1),t("div",{staticClass:"item"},[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("插件采集")]),t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("清理全部")])],1),t("div",{staticClass:"item"},[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("导出数据")]),t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("批量删除")])],1)]),t("div",{staticClass:"con-sub-4"},[t("div",{staticClass:"con-sub5-log",domProps:{innerHTML:e._s(e.consoleMsg)}})])])])]),t("el-tab-pane",{attrs:{label:"商品链接采集",name:"second"}}),t("el-tab-pane",{attrs:{label:"整店采集",name:"third"}}),t("el-tab-pane",{attrs:{label:"定时任务补偿",name:"fourth"}})],1)],1),t("article",[t("u-table",{ref:"plTable",attrs:{"max-height":e.Height,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa"},"row-key":"id","big-data-checkbox":!0,border:!1},on:{"selection-change":e.handleSelectionChange}},[t("u-table-column",{attrs:{align:"center",type:"selection"}}),t("u-table-column",{attrs:{align:"center",type:"index",label:"序号"}}),t("u-table-column",{attrs:{align:"center",label:"主图"},scopedSlots:e._u([{key:"default",fn:function(e){var a=e.row;return[t("div",{staticStyle:{"justify-content":"center",display:"flex"}},[t("img",{staticStyle:{width:"56px",height:"56px"},attrs:{src:a.Image}})])]}}])}),t("u-table-column",{attrs:{align:"center",label:"上家ID",prop:"GoodsId"}}),t("u-table-column",{attrs:{align:"center",label:"标题",prop:"Title",width:"500px",fit:""},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row;return[t("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(l.Title))])]}}])}),t("u-table-column",{attrs:{align:"center",label:"类目",prop:"CategoryName"},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row;return[t("p",{staticStyle:{"white-space":"normal"}},[e._v(e._s(l.CategoryName))])]}}])}),t("u-table-column",{attrs:{align:"center",label:"价格",prop:"Price"}}),t("u-table-column",{attrs:{align:"center",label:"销量",prop:"Sales"}}),t("u-table-column",{attrs:{align:"center",label:"发货地"}}),t("u-table-column",{attrs:{align:"center",label:"来源",prop:"Origin"}}),t("u-table-column",{attrs:{align:"center",label:"操作"}}),t("u-table-column",{attrs:{align:"center",label:"操作结果"}})],1)],1)])},n=[],r=t("2909"),i=t("1da1"),o=(t("96cf"),t("d81d"),t("498a"),t("ac1f"),t("1276"),t("5319"),t("99af"),t("4d63"),t("25f0"),t("d3b7"),t("d4ec")),s=t("bee2"),c=t("ade3"),u=function(){function e(a){Object(o["a"])(this,e),Object(c["a"])(this,"_this",null),this._this=a,this.platformId=null,this.commonAttr=null,this.keywordAttr=null,this.delayTime=1e3,this.GoodsData=null}return Object(s["a"])(e,[{key:"_initKeyWord",value:function(e,a){this.platformId=e,this.commonAttr=a}},{key:"keywordSearch",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){var t,l,n,i,o,s,c,u,b,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.GoodsData=null,this.GoodsData=[],t=this.commonAttr.StartPage-0,l=this.commonAttr.EndPage-0,n=this.commonAttr.StartPrice-0,i=this.commonAttr.EndPrice-0,o={},o["key"]=a,e.prev=8;case 9:if(!t){e.next=44;break}e.t0=this.platformId,e.next=1===e.t0||1.2===e.t0?13:2===e.t0?15:4===e.t0?19:5===e.t0?20:7===e.t0?21:8===e.t0?22:9===e.t0?23:10===e.t0?24:11===e.t0?25:12===e.t0?26:13===e.t0?27:15===e.t0?28:29;break;case 13:return o["Page"]=t,e.abrupt("break",29);case 15:return o["Page"]=t,o["StartPrice"]=n,o["EndPrice"]=i,e.abrupt("break",29);case 19:return e.abrupt("break",29);case 20:return e.abrupt("break",29);case 21:return e.abrupt("break",29);case 22:return e.abrupt("break",29);case 23:return e.abrupt("break",29);case 24:return e.abrupt("break",29);case 25:return e.abrupt("break",29);case 26:return e.abrupt("break",29);case 27:return e.abrupt("break",29);case 28:return e.abrupt("break",29);case 29:return e.next=31,this._this.$collectService.querySpuByKeyworld(this.platformId,o);case 31:if(b=e.sent,b=JSON.parse(b),200!==b.Code&&this.writeLog("采集".concat(a,"关键词第").concat(t,"页第一部分失败：").concat(b.Code,"-").concat(b.Msg),!1),p=null===(s=b)||void 0===s||null===(c=s.ListItem)||void 0===c?void 0:c.length,this.writeLog("采集".concat(a,"关键词第").concat(t,"页第一部分，采集到约").concat(p,"条"),!0),p){e.next=38;break}return e.abrupt("break",44);case 38:if((u=this.GoodsData).push.apply(u,Object(r["a"])(b.ListItem)),!(t>=l)){e.next=41;break}return e.abrupt("break",44);case 41:t++,e.next=9;break;case 44:e.next=49;break;case 46:e.prev=46,e.t1=e["catch"](8),this.writeLog("采集".concat(a,"关键词第").concat(t,"页第一部分，捕获错误").concat(e.t1),!1);case 49:return this.GoodsData=this.GoodsData.map((function(e,a){return e.id=a+1,e.information="",e})),e.abrupt("return",{code:200,data:this.GoodsData});case 51:case"end":return e.stop()}}),e,this,[[8,46]])})));function a(a){return e.apply(this,arguments)}return a}()},{key:"keywordSearchTwo",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){var t,l,n,i,o,s,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.GoodsData=null,this.GoodsData=[],t=this.commonAttr.StartPage-0,l=this.commonAttr.EndPage-0,n={},n["key"]=a,t=this.commonAttr.StartPage-0,e.prev=7;case 8:if(!t){e.next=25;break}return n["page"]=t,e.next=12,this._this.$collectService.querySpuByKeyworld(1.1,n);case 12:if(c=e.sent,c=JSON.parse(c),200!==c.Code&&this.writeLog("采集".concat(a,"关键词第").concat(t,"页第二部分失败：").concat(c.Code,"-").concat(c.Msg),!1),u=null===(i=c)||void 0===i||null===(o=i.ListItem)||void 0===o?void 0:o.length,this.writeLog("采集".concat(a,"关键词第").concat(t,"页第二部分，采集到约").concat(u,"条"),!0),u){e.next=19;break}return e.abrupt("break",25);case 19:if((s=this.GoodsData).push.apply(s,Object(r["a"])(c.ListItem)),!(t>=l)){e.next=22;break}return e.abrupt("break",25);case 22:t++,e.next=8;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e["catch"](7),this.writeLog("采集".concat(a,"关键词第").concat(t,"页第二部分，捕获错误").concat(e.t0),!1);case 30:return this.GoodsData=this.GoodsData.map((function(e,a){return e.id=a+1,e.information="",e})),e.abrupt("return",{code:200,data:this.GoodsData});case 32:case"end":return e.stop()}}),e,this,[[7,27]])})));function a(a){return e.apply(this,arguments)}return a}()},{key:"writeLog",value:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(void 0!==this._this.consoleMsg&&e){var t=a?"green":"red",l=this.dateFormat(new Date(Date.now()),"hh:mm:ss");this._this.consoleMsg+='<p style="color:'.concat(t,'; margin-top: 5px;">').concat(l,":").concat(e,"</p>")}}},{key:"dateFormat",value:function(e,a){var t={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var l in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+l+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?t[l]:("00"+t[l]).substr((""+t[l]).length)));return a}},{key:"delay",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var t=setTimeout((function(){clearTimeout(t),e(!0)}),a)})));case 1:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()}]),e}(),b=u,p={TW:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],ID:[{lebel:"本地",value:"Dalam Negeri"},{lebel:"海外",value:"Luar Negeri"},{lebel:"Jabodetabek（雅博德塔别克）",value:"Jabodetabek"},{lebel:"DKI Jakarta（DKI雅加达）",value:"DKI Jakarta"},{lebel:"Jawa Barat（西爪哇）",value:"Jawa Barat"},{lebel:"Jawa Timur（东爪哇）",value:"Jawa Timur"},{lebel:"Jawa Tengah（中爪哇）",value:"Jawa Tengah"},{lebel:"Kepulauan Riau（廖内群岛）",value:"Kepulauan Riau"},{lebel:"Banten（万丹）",value:"Banten"},{lebel:"Sumatera Utara（北苏门答腊）",value:"Sumatera Utara"},{lebel:"DI Yogyakarta（在日惹）",value:"DI Yogyakarta"},{lebel:"Bali（巴厘岛）",value:"Bali"},{lebel:"Lampung（楠榜）",value:"Lampung"},{lebel:"Sumatera Selatan（南苏门答腊）",value:"Sumatera Selatan"},{lebel:"Sulawesi Selatan（南苏拉威西）",value:"Sulawesi Selatan"},{lebel:"Riau（廖内）",value:"Riau"},{lebel:"Jambi（占碑）",value:"Jambi"},{lebel:"Kalimantan Timur（东加里曼丹）",value:"Kalimantan Timur"},{lebel:"Kalimantan Selatan（南加里曼丹）",value:"Kalimantan Selatan"},{lebel:"Kalimantan Barat（西加里曼丹）",value:"Kalimantan Barat"}],MY:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"West Malaysia（西马）",value:"West Malaysia"},{label:"East Malaysia（东马来西亚）",value:"East Malaysia"},{label:"Selangor（雪兰莪）",value:"Selangor"},{label:"Kuala Lumpur（吉隆坡）",value:"Kuala Lumpur"},{label:"Penang（槟城）",value:"Penang"},{label:"Johor（柔佛）",value:"Johor"},{label:"Kedah（吉打）",value:"Kedah"},{label:"Perak（霹雳州）",value:"Perak"},{label:"Melaka（马六甲）",value:"Melaka"},{label:"Pahang（彭亨）",value:"Pahang"},{label:"Negeri Sembilan（森美兰州）",value:"Negeri Sembilan"},{label:"Terengganu（登嘉楼）",value:"Terengganu"},{label:"Sarawak（砂拉越）",value:"Sarawak"},{label:"Kelantan（吉兰丹）",value:"Kelantan"},{label:"Perlis（玻璃市）",value:"Perlis"},{label:"Sabah（沙巴）",value:"Sabah"},{label:"Putrajaya（布城）",value:"Putrajaya"},{label:"Labuan（纳闽）",value:"Labuan"}],SG:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}],PH:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"Metro Manila（马尼拉大都会）",value:"Metro Manila"},{label:"North Luzon（北吕宋）",value:"North Luzon"},{label:"South Luzon（南吕宋岛）",value:"South Luzon"},{label:"Visayas（米沙鄢）",value:"Visayas"},{label:"Mindanao（棉兰老岛）",value:"Mindanao"}],VN:[{label:"海外",value:"Nước ngoài"},{label:"Hà Nội（河内）",value:"Hà Nội"},{label:"TP. Hồ Chí Minh（胡志明）",value:"TP. Hồ Chí Minh"},{label:"Thái Nguyên（泰阮）",value:"Thái Nguyên"},{label:"Vĩnh Phúc（永福）",value:"Vĩnh Phúc"},{label:"Hải Phòng（海防）",value:"Hải Phòng"},{label:"Đồng Nai（同奈）",value:"Đồng Nai"},{label:"Hưng Yên（红颜）",value:"Hưng Yên"},{label:"Bình Dương（平阳）",value:"Bình Dương"},{label:"Bắc Ninh（北宁）",value:"Bắc Ninh"},{label:"Đà Nẵng（岘港）",value:"Đà Nẵng"},{label:"Quảng Ninh（广宁）",value:"Quảng Ninh"},{label:"Hải Dương（海阳）",value:"Hải Dương"},{label:"Nam Định（南定）",value:"Nam Định"},{label:"Cần Thơ（芹苴）",value:"Cần Thơ"},{label:"Phú Thọ（富都）",value:"Phú Thọ"},{label:"Bà Rịa - Vũng Tàu（BA Ria 头顿）",value:"Bà Rịa - Vũng Tàu"},{label:"Đắk Lắk（多乐）",value:"Đắk Lắk"},{label:"Thanh Hóa（清化）",value:"Thanh Hóa"},{label:"Thái Bình（平静的）",value:"Thái Bình"},{label:"Nước ngoài（外国的）",value:"Nước ngoài"}],TH:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"กรุงเทพและปริมณฑล（曼谷及周边地区）",value:"กรุงเทพและปริมณฑล"},{label:"ภาคกลาง（中央）",value:"ภาคกลาง"},{label:"ภาคตะวันออกเฉียงเหนือ（东北）",value:"ภาคตะวันออกเฉียงเหนือ"},{label:"ภาคใต้（南）",value:"ภาคใต้"},{label:"ภาคเหนือ（北方）",value:"ภาคเหนือ"},{label:"ภาคตะวันออก（东部地区）",value:"ภาคตะวันออก"},{label:"ภาคตะวันตก（西部地区）",value:"ภาคตะวันตก"}],BR:[{label:"本地",value:"-1"},{label:"海外",value:"-2"},{label:"São Paulo（圣保罗）",value:"São Paulo"},{label:"Acre（英亩）",value:"Acre"},{label:"Alagoas（阿拉戈斯）",value:"Alagoas"},{label:"Amapá（阿马帕）",value:"Amapá"},{label:"Amazonas（亚马逊人）",value:"Amazonas"},{label:"Bahia（巴伊亚）",value:"Bahia"},{label:"Ceará（塞阿拉）",value:"Ceará"},{label:"Distrito Federal（联邦区）",value:"Distrito Federal"},{label:"Espírito Santo（神圣的灵魂）",value:"Espírito Santo"},{label:"Goiás（戈亚斯）",value:"Goiás"},{label:"Maranhão（马拉尼昂）",value:"Maranhão"},{label:"Mato Grosso（马托格罗索州）",value:"Mato Grosso"},{label:"Mato Grosso do Sul（南马托格罗索州）",value:"Mato Grosso do Sul"},{label:"Minas Gerais（米纳斯吉拉斯州）",value:"Minas Gerais"},{label:"Pará（为了）",value:"Pará"},{label:"Paraíba（帕拉伊巴）",value:"Paraíba"},{label:"Paraná（巴拉那）",value:"Paraná"},{label:"Pernambuco（伯南布哥）",value:"Pernambuco"},{label:"Piauí（皮奥伊）",value:"Piauí"},{label:"Rio de Janeiro（里约热内卢）",value:"Rio de Janeiro"},{label:"Rio Grande do Norte（北大河）",value:"Rio Grande do Norte"},{label:"Rio Grande do Sul（南里奥格兰德）",value:"Rio Grande do Sul"},{label:"Rondônia（朗多尼亚）",value:"Rondônia"},{label:"Roraima（罗赖马）",value:"Roraima"},{label:"Santa Catarina（圣卡塔琳娜）",value:"Santa Catarina"},{label:"Sergipe（塞尔吉佩）",value:"Sergipe"},{label:"Tocantins（托坎廷斯）",value:"Tocantins"}],MX:[{label:"本地",value:"-1"},{label:"海外",value:"-2"}]},v=[{value:"TW",label:"台湾"},{value:"ID",label:"印尼"},{value:"MY",label:"马来"},{value:"SG",label:"新加坡"},{value:"PH",label:"菲律宾"},{value:"VN",label:"越南"},{value:"TH",label:"泰国"},{value:"BR",label:"巴西"},{value:"MX",label:"墨西哥"}],h={1:"拼多多",1.2:"拼多多优惠采集",2:"淘宝",4:"京东",5:"自有",7:"货源甲",8:"1688",9:"Lazada",10:"京喜",11:"虾皮",12:"速卖通",13:"天猫淘宝海外平台",15:"货老板云仓"};function m(e){var a=[];return Array.isArray(e)?(e.map((function(e){h[e]&&a.push({label:h[e],value:e})})),a):a}function d(e){return p[e]}var g={props:{baseConfig:{type:Object,required:!1,default:function(){return{keywordConfig:[1,2,11,8,1.2,10,12,9]}}}},data:function(){return{Height:650,activeName:"first",CollectKeyWordApInstance:new b(this),multipleSelection:[],goodsList:[],buttonStatus:{keyword:!1},currentKeywordPlatform:11,commonAttr:{StartPage:1,EndPage:2,StartSales:0,EndSales:999999999,StartPrice:0,EndPrice:999999999,keyFilter:"",sortWay:[{label:"价格从低到高",value:"price,asc"},{label:"价格从高到低",value:"price,desc"},{label:"销量从低到高",value:"sales,asc"},{label:"销量从高到低",value:"sales,desc"}],sortWayVal:"price,asc"},key:"",consoleMsg:"",keywordAttr:{},shopeeAttr:{placeOrigin:"",siteCode:"TW",placeVal:[],isSelectAll:!1}}},computed:{keyworBar:function(){var e=m(this.baseConfig.keywordConfig);return e},getSite:function(){return v}},created:function(){this.getShopeePlace()},mounted:function(){},methods:{selectPlaceValEvent:function(){this.shopeeAttr.placeOrigin.length===this.shopeeAttr.placeVal.length?this.shopeeAttr.isSelectAll=!0:this.shopeeAttr.isSelectAll=!1},selectAllEvent:function(){var e=this;this.shopeeAttr.isSelectAll?this.shopeeAttr.placeOrigin.map((function(a){e.shopeeAttr.placeVal.push(a.value)})):this.shopeeAttr.placeVal=[]},getShopeePlace:function(){this.shopeeAttr.placeVal=[],this.shopeeAttr.isSelectAll=!1,this.shopeeAttr.placeOrigin=d(this.shopeeAttr.siteCode)},handleClick:function(e,a){},handleSelectionChange:function(e){this.multipleSelection=e},selectPlatform:function(e){this.currentKeywordPlatform=e.value},StartCollection:function(){switch(this.activeName){case"first":this["keywordSearch"]();break;case"second":this["linksSearch"]();break;case"third":this["entireMallSearch"]();break;default:this.$message.error("采集操作非法！！！！");break}},handleKeyFactory:function(){try{var e=this.key.trim();return e?(e=this.key.replace(/\s/g,";").split(";"),{code:200,data:e}):{code:-3,data:"参数不能为空"}}catch(a){return{code:-2,data:"关键词格式不规范：".concat(a)}}},keywordSearch:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var t,l,n,i,o,s,c,u,b,p,v,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t=e.handleKeyFactory(),200===t.code){a.next=3;break}return a.abrupt("return",-2===t.code?e.$message.error(""):void 0);case 3:l=t.data,n=t.data.length,i=e.currentKeywordPlatform,e.buttonStatus.keyword=!0,e.consoleMsg="",e.goodsList=[],e.$refs.plTable.reloadData(e.goodsList),e.CollectKeyWordApInstance._initKeyWord(i,e.commonAttr),e.writeLog("开始采集搜索........",!0),e.writeLog("开始采集".concat(h[i],"的商品......."),!0),o=0;case 14:if(!(o<n)){a.next=25;break}return c=l[o],a.next=18,e.CollectKeyWordApInstance.keywordSearch(c);case 18:if(u=a.sent,200===u.code){a.next=21;break}return a.abrupt("continue",22);case 21:(s=e.goodsList).push.apply(s,Object(r["a"])(u.data));case 22:o++,a.next=14;break;case 25:if(1!==i){a.next=38;break}b=0;case 27:if(!(b<n)){a.next=38;break}return v=l[b],a.next=31,e.CollectKeyWordApInstance.keywordSearchTwo(v);case 31:if(m=a.sent,200===m.code){a.next=34;break}return a.abrupt("continue",35);case 34:(p=e.goodsList).push.apply(p,Object(r["a"])(m.data));case 35:b++,a.next=27;break;case 38:e.writeLog("".concat(h[i],"：共采集：").concat(e.goodsList.length,"条"),!0),e.writeLog("".concat(h[i],"的商品采集完毕........"),!0),l=null,e.buttonStatus.keyword=!1;case 42:case"end":return a.stop()}}),a)})))()},linksSearch:function(){},entireMallSearch:function(){},writeLog:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(void 0!==this.consoleMsg&&e){var t=a?"green":"red",l=this.dateFormat(new Date(Date.now()),"hh:mm:ss");this.consoleMsg+='<p style="color:'.concat(t,'; margin-top: 5px;">').concat(l,":").concat(e,"</p>")}},dateFormat:function(e,a){var t={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var l in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+l+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?t[l]:("00"+t[l]).substr((""+t[l]).length)));return a},delay:function(e){return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.abrupt("return",new Promise((function(a){var t=setTimeout((function(){clearTimeout(t),a(!0)}),e)})));case 1:case"end":return a.stop()}}),a)})))()}}},f=g,k=(t("b5ef"),t("2877")),y=Object(k["a"])(f,l,n,!1,null,"f4481434",null);a["default"]=y.exports},6779:function(e,a,t){},b5ef:function(e,a,t){"use strict";t("6779")}}]);