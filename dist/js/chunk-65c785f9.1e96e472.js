(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65c785f9"],{"4cf2":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"contaniner"},[r("header",[r("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-tab-pane",{staticClass:"keyword",attrs:{label:"关键词采集",name:"first"}}),r("el-tab-pane",{attrs:{label:"配置管理",name:"second"}}),r("el-tab-pane",{attrs:{label:"角色管理",name:"third"}}),r("el-tab-pane",{attrs:{label:"定时任务补偿",name:"fourth"}})],1)],1),r("article",[r("div",{staticClass:"keyword-container"},[r("div",{staticClass:"keyword-banner-bar"},t._l(t.keyworBar,(function(e){return r("div",{key:e.value,staticClass:"barChilren",class:{active:t.currentKeywordPlatform===e.value},on:{click:function(r){return t.selectPlatform(e)}}},[t._v(t._s(e.label))])})),0),r("div",{staticClass:"keyword-banner-content"},[r("div",{staticClass:"con-sub-1"},[r("div",{staticClass:"item"},[r("p",[t._v("开始页码:")]),r("el-input",{attrs:{size:"mini"},model:{value:t.keywordAttr.page1,callback:function(e){t.$set(t.keywordAttr,"page1",e)},expression:"keywordAttr.page1"}}),r("p",[t._v("总页码:")]),r("el-input",{attrs:{size:"mini"},model:{value:t.keywordAttr.page2,callback:function(e){t.$set(t.keywordAttr,"page2",e)},expression:"keywordAttr.page2"}})],1),r("div",{staticClass:"item"},[r("p",[t._v("销售区间:")]),r("el-input",{attrs:{size:"mini"},model:{value:t.commonAttr.salesStart,callback:function(e){t.$set(t.commonAttr,"salesStart",e)},expression:"commonAttr.salesStart"}}),r("p",[t._v("-")]),r("el-input",{attrs:{size:"mini"},model:{value:t.commonAttr.salesEnd,callback:function(e){t.$set(t.commonAttr,"salesEnd",e)},expression:"commonAttr.salesEnd"}})],1),r("div",{staticClass:"item"},[r("p",[t._v("价格区间:")]),r("el-input",{attrs:{size:"mini"},model:{value:t.commonAttr.moneyStart,callback:function(e){t.$set(t.commonAttr,"moneyStart",e)},expression:"commonAttr.moneyStart"}}),r("p",[t._v("-")]),r("el-input",{attrs:{size:"mini"},model:{value:t.commonAttr.moneyEnd,callback:function(e){t.$set(t.commonAttr,"moneyEnd",e)},expression:"commonAttr.moneyEnd"}})],1)]),r("div",{staticClass:"con-sub-2"},[r("div",{staticClass:"item"},[r("p",[t._v("关键词(一行一个)")]),r("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:t.commonAttr.keywordVal,callback:function(e){t.$set(t.commonAttr,"keywordVal",e)},expression:"commonAttr.keywordVal"}})],1),r("div",{staticClass:"item"},[r("p",[t._v("过滤关键词(一行一个)")]),r("el-input",{attrs:{size:"mini",type:"textarea",rows:8,resize:"none"},model:{value:t.commonAttr.keywordFilter,callback:function(e){t.$set(t.commonAttr,"keywordFilter",e)},expression:"commonAttr.keywordFilter"}})],1)]),r("div",{staticClass:"con-sub-3"},[r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("开始采集")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("取消采集")]),r("div",{staticClass:"item"},[r("p",[t._v("起:")]),r("el-input",{attrs:{size:"mini",placeholder:""}}),r("p",[t._v("止:")]),r("el-input",{attrs:{size:"mini",placeholder:""}})],1),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("收藏商品")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("编辑上新")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("插件采集")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("清理全部")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("导出数据")]),r("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("批量删除")])],1),t._m(0)])])])])},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"con-sub-4"},[r("div",{staticClass:"con-sub5-log"})])}],a=r("bee2");function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){return s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},s(t,e)}function c(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}r("4ae1"),r("3410");function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function u(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}var p=r("7037"),m=r.n(p);function d(t,e){if(e&&("object"===m()(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return i(t)}function f(t){var e=u();return function(){var r,n=l(t);if(e){var o=l(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return d(this,r)}}var y=r("d4ec"),b=r("ade3"),v=function t(e){Object(y["a"])(this,t),Object(b["a"])(this,"_this",null),this._this=e},_=function(t){c(r,t);var e=f(r);function r(t){var n;return Object(y["a"])(this,r),n=e.call(this,t),Object(b["a"])(i(n),"_this",null),n._this=t,n}return Object(a["a"])(r,[{key:"reset",value:function(){}}]),r}(v),w=_,k=(r("d81d"),{1:"拼多多",1.2:"拼多多优惠采集",2:"淘宝",4:"京东",5:"自有",7:"货源甲",8:"1688",9:"Lazada",10:"京喜",11:"虾皮",12:"速卖通",13:"天猫淘宝海外平台",15:"货老板云仓"});function h(t){var e=[];return Array.isArray(t)?(t.map((function(t){k[t]&&e.push({label:k[t],value:t})})),e):e}var A=h,x={props:{baseConfig:{type:Object,required:!1,default:function(){return{keywordConfig:[1,1.2,2,8,9,10,11,12]}}}},data:function(){return{activeName:"first",CollectKeyWordApInstance:new w(this),currentKeywordPlatform:1,commonAttr:{salesStart:0,salesEnd:0,moneyStart:0,moneyEnd:999999999,keywordVal:"",keywordFilter:""},keywordAttr:{page1:1,page2:5}}},computed:{keyworBar:function(){var t=A(this.baseConfig.keywordConfig);return t}},created:function(){},methods:{handleClick:function(t,e){},selectPlatform:function(t){this.currentKeywordPlatform=t.value}}},C=x,z=(r("ed15"),r("2877")),O=Object(z["a"])(C,n,o,!1,null,"2c610ed6",null);e["default"]=O.exports},7037:function(t,e,r){function n(e){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?(t.exports=n=function(t){return typeof t},t.exports["default"]=t.exports,t.exports.__esModule=!0):(t.exports=n=function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports["default"]=t.exports,t.exports.__esModule=!0),n(e)}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),t.exports=n,t.exports["default"]=t.exports,t.exports.__esModule=!0},addc:function(t,e,r){},ed15:function(t,e,r){"use strict";r("addc")}}]);