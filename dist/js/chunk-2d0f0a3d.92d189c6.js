(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0a3d"],{"9cda":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("div",[t._v("店铺站点：")]),a("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",filterable:""},model:{value:t.countryOption,callback:function(e){t.countryOption=e},expression:"countryOption"}},t._l(t.countriesOption,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),a("div",{staticStyle:{"margin-left":"20px"}},[t._v("任务名称：")]),a("el-input",{staticStyle:{width:"140px"},attrs:{size:"mini"},model:{value:t.taskName,callback:function(e){t.taskName=e},expression:"taskName"}}),a("div",{staticStyle:{"margin-left":"20px"}},[t._v("任务日期：")]),a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",size:"mini",placeholder:"选择开始日期"},model:{value:t.taskTimeStart,callback:function(e){t.taskTimeStart=e},expression:"taskTimeStart"}}),a("div",{staticStyle:{width:"6px",height:"1px",background:"#1a1a1a",margin:"0 7px"}}),a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",size:"mini",placeholder:"选择结束日期"},model:{value:t.taskTimeEnd,callback:function(e){t.taskTimeEnd=e},expression:"taskTimeEnd"}})],1),a("div",{staticClass:"on_new_dialog_box",staticStyle:{"margin-bottom":"10px"}},[a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("搜索任务")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("启动任务")]),a("el-button",{attrs:{size:"mini"}},[t._v("取消任务")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("删除任务")])],1)]),a("u-table",{attrs:{data:t.taskTable,"use-virtual":"","data-changes-scroll-top":!1,"header-cell-style":{backgroundColor:"#f5f7fa",height:"50px"},"row-key":"id",border:!1,"big-data-checkbox":!0,height:"680"},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{align:"left",type:"selection",width:"50"}}),a("u-table-column",{attrs:{align:"left",label:"序列号",type:"index",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"任务名称","min-width":"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(t){t.row}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺名称","min-width":"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(t){t.row}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺站点",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;return[t._v(t._s(t._f("chineseSite")(t.countryOption)))]}}])}),a("u-table-column",{attrs:{align:"left",label:"店铺分组",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(l.title)+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"执行时间",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mallName||"")+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"商品总数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("div",{staticClass:"goodsTableLine"},[t._v(" "+t._s(l.statusName)+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"上新成功数",prop:"category_name",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mallName||"")+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"上新失败数",prop:"categoryName",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.enterCategory(0,e.row)}}},[t._v(" "+t._s(e.row.categoryName||t.goodsClassName[e.row.category_id]||"请选择类目")+" ")])]}}])}),a("u-table-column",{attrs:{align:"left",label:"执行状态",prop:"price",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mallName||"")+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"任务详情",prop:"sys_label_name",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mallName||"")+" ")]}}])}),a("u-table-column",{attrs:{align:"left",label:"启动任务",prop:"sourceName",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.mallName||"")+" ")]}}])})],1)],1)},n=[],o={data:function(){return{countriesOption:this.$filters.countries_option,countryOption:"TH",taskName:"",taskTimeStart:new Date((new Date).getTime()-1728e5),taskTimeEnd:new Date((new Date).getTime()),taskTable:[],taskSelectTable:[]}},methods:{handleSelectionChange:function(t){this.taskSelectTable=t}}},i=o,s=a("2877"),r=Object(s["a"])(i,l,n,!1,null,null,null);e["default"]=r.exports}}]);