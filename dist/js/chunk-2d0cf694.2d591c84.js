(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf694"],{6433:function(e,t,n){"use strict";n.r(t);var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"detail"},[n("el-dialog",{attrs:{title:"客服",visible:e.dialogVisible,width:"600px","close-on-press-escape":!1,"close-on-click-modal":!1,"show-close":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("div",{staticStyle:{display:"flex"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openUrl(1)}}},[e._v("软件客服")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openUrl(2)}}},[e._v("马来仓客服")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openUrl(3)}}},[e._v("泰国仓客服")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openUrl(4)}}},[e._v("新加坡仓客服")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openUrl(5)}}},[e._v("菲律宾仓客服")])],1)])],1)},a=[],o=(n("99af"),{data:function(){return{dialogVisible:!0}},created:function(){},methods:{openUrl:function(e){var t=null;switch(e){case 1:t="https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?";break;case 2:t="https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?";break;case 3:t="https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?";break;case 4:t="https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?";break;case 5:t="https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?";break;default:break}console.log(this.$userInfo),t+="".concat(this.$userInfo.muid,"&u_cust_name=").concat(this.$userInfo.Username,"-").concat(this.$userInfo.Nickname,"&u_custom_info=shopeeman&custom_channel=shopeeman"),this.$BaseUtilService.openUrl(t)}}}),i=o,s=n("2877"),r=Object(s["a"])(i,c,a,!1,null,"e100f9c6",null);t["default"]=r.exports}}]);