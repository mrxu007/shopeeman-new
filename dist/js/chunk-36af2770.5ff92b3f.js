(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36af2770"],{"232c":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("li",[a("span",[t._v("类型：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typelist,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)],1),a("br"),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1),1e4===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义：与之前7天相比，这些产品的销售额在过去7天内下降了30%或更多的产品")]):t._e(),10002===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去7天内收到过两星及以下评价的产品")]):t._e(),10003===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去45天内有2单及以上的订单申请退货或者退货率在10%及以上的产品")]):t._e(),10004===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去15天内有10单及以上的订单逾期发货或者逾期发货率在5%及以上的产品")]):t._e(),10006===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去7天中，商品转化率(浏览-确定)低于相同二级分类商品中位数。商品转化率(浏览-确定)=已确定订单的买家数除以访客总数")]):t._e(),10007===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:和上一个7天相比，商品浏览量在过去7天中下降了50%以上")]):t._e(),10008===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:由于卖家取消或是商品未成功出货，在过去7天内造成订单取消数量高于2或订单取消率高于5%")]):t._e(),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"60",prop:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"180",prop:"mallname"}}),t._e(),a("el-table-column",{attrs:{align:"center",prop:"type",label:"类型",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"productid",label:"商品ID",width:"180"}}),a("el-table-column",{attrs:{prop:"img",label:"商品图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[l.img?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:l.img,width:"300px",height:"300px"}})]),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:l.img}})],1):t._e()]}}])}),a("el-table-column",{attrs:{prop:"title",label:"商品标题",width:"400",align:"center"}}),1e4===t.type?a("el-table-column",{attrs:{prop:"d2",label:"销售额("+t.time1+"-"+t.time2+")",width:"180",align:"center"}}):t._e(),1e4===t.type?a("el-table-column",{attrs:{prop:"d3",label:"销售额("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10002===t.type?a("el-table-column",{attrs:{prop:"d2",label:"总评论("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10002===t.type?a("el-table-column",{attrs:{prop:"d3",label:"差评("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10003===t.type?a("el-table-column",{attrs:{prop:"d2",label:"退货申请("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10003===t.type?a("el-table-column",{attrs:{prop:"d3",label:"退货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10004===t.type?a("el-table-column",{attrs:{prop:"d3",label:"高逾期出货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10004===t.type?a("el-table-column",{attrs:{prop:"d2",label:"逾期出货订单数("+t.time2+"-"+t.time3+")",width:"200",align:"center"}}):t._e(),10008===t.type?a("el-table-column",{attrs:{prop:"d3",label:"订单取消率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10008===t.type?a("el-table-column",{attrs:{prop:"d2",label:"已取消的订单数("+t.time2+"-"+t.time3+")",width:"220",align:"center"}}):t._e(),10006===t.type?a("el-table-column",{attrs:{prop:"d3",label:"转化率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10006===t.type?a("el-table-column",{attrs:{prop:"d2",label:"访客数("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10007===t.type?a("el-table-column",{attrs:{prop:"d2",label:"逾期出货订单数("+t.time1+"-"+t.time2+")",width:"200",align:"center"}}):t._e(),10007===t.type?a("el-table-column",{attrs:{prop:"d3",label:"逾期出货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"pcnew_followers",label:"操作",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.viewDetails(l)}}},[t._v("编辑")])]}}])})],1)],1)],1)},i=[],s=a("1da1"),n=(a("96cf"),a("99af"),a("feb6")),o=a("0e0b"),r={data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,showlog:!0,exportdata:[],type:1e4,indexs:1,typelist:[{value:1e4,label:"销售额下降"},{value:10002,label:"差评"},{value:10003,label:"高退货率"},{value:10004,label:"高逾期出货率"},{value:10006,label:"低转化率"},{value:10007,label:"低浏览量"},{value:10008,label:"高卖家取消率"}],time:(new Date).getTime(),time1:(new Date).getTime()-12096e5,time2:(new Date).getTime()-6048e5,time3:(new Date).getTime(),allgroupid:[],errmall:[],allmallid:[],tableData:[],total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:1634659200,end_time:1634695200,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},components:{storeChoose:n["a"]},watch:{type:function(t,e){this.getallinfo()}},mounted:function(){this.time1=this.$dayjs(this.time1).format("MM/DD"),this.time2=this.$dayjs(this.time2).format("MM/DD"),this.time3=this.$dayjs(this.time3).format("MM/DD")},methods:{changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(s["a"])(regeneratorRuntime.mark((function l(){var i,s,n,o,r,d,c,u,p,m,h,g,f,b,_,w,y,v;return regeneratorRuntime.wrap((function(l){while(1)switch(l.prev=l.next){case 0:for(i=e.length>1&&void 0!==e[1]?e[1]:{count:1},l.prev=1,s=a.$dayjs(a.time).format("YYYYMMDD"),n=t.mall_alias_name||t.platform_mall_name,o={metric_id:a.type,mallId:t.platform_mall_id,dt:s,country:a.site,shopid:t.platform_mall_id,page_num:1,page_size:20},d=0;d<a.typelist.length;d++)a.typelist[d].value===a.type&&(r=a.typelist[d].label);return l.next=8,a.$shopeemanService.getdiagnosis(a.site,o,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 8:if(c=l.sent,c&&(u=JSON.parse(c)),200===u.status){if(a.$refs.Logs.writeLog("【".concat(n,"】 查询 【").concat(r,"】 数据 成功"),!0),u.data=JSON.parse(u.data),1e4===a.type&&u.data.data.list)for(p=0;p<u.data.data.list.length;p++)m={},m["index"]=a.indexs,a.indexs++,m["mallname"]=n,m["mallid"]=t.platform_mall_name,m["type"]=r,m["productid"]=u.data.data.list[p].itemid,m["img"]=u.data.data.list[p].image,m["title"]=u.data.data.list[p].title,m["d2"]="".concat(a.$filters.currencyShow(a.site)).concat(u.data.data.list[p].d1),m["d3"]="".concat(a.$filters.currencyShow(a.site)).concat(u.data.data.list[p].d2," ").concat(u.data.data.list[p].d3,"%"),a.tableData.push(m);else if(10002===a.type&&u.data.data.list)for(h=0;h<u.data.data.list.length;h++)g={},g["index"]=a.indexs,a.indexs++,g["mallname"]=n,g["mallid"]=t.platform_mall_name,g["type"]=r,g["productid"]=u.data.data.list[h].itemid,g["img"]=u.data.data.list[h].image,g["title"]=u.data.data.list[h].title,g["d2"]=u.data.data.list[h].d1,g["d3"]=u.data.data.list[h].d2,a.tableData.push(g);else if(10008===a.type||10006===a.type&&u.data.data.list)for(f=0;f<u.data.data.list.length;f++)b={},b["index"]=a.indexs,a.indexs++,b["mallname"]=n,b["mallid"]=t.platform_mall_name,b["type"]=r,b["productid"]=u.data.data.list[f].itemid,b["img"]=u.data.data.list[f].image,b["title"]=u.data.data.list[f].title,b["d2"]=u.data.data.list[f].d1,b["d3"]=u.data.data.list[f].d3+"%",a.tableData.push(b);else if(10007===a.type&&u.data.data.list)for(_=0;_<u.data.data.list.length;_++)w={},w["index"]=a.indexs,a.indexs++,w["mallname"]=n,w["mallid"]=t.platform_mall_name,w["type"]=r,w["productid"]=u.data.data.list[_].itemid,w["img"]=u.data.data.list[_].image,w["title"]=u.data.data.list[_].title,w["d2"]="".concat(u.data.data.list[_].d1),w["d3"]="".concat(u.data.data.list[_].d2," ").concat(u.data.data.list[_].d3,"%"),a.tableData.push(w);else if(u.data.data.list)for(y=0;y<u.data.data.list.length;y++)v={},v["index"]=a.indexs,a.indexs++,v["mallname"]=n,v["mallid"]=t.platform_mall_name,v["type"]=r,v["productid"]=u.data.data.list[y].itemid,v["img"]=u.data.data.list[y].image,v["title"]=u.data.data.list[y].title,v["d2"]=u.data.data.list[y].d2,v["d3"]=u.data.data.list[y].d3+"%",a.tableData.push(v)}else a.$refs.Logs.writeLog("【".concat(n,"】 查询 【").concat(r,"】 数据 异常：店铺未登录"),!1),a.errmall.push(n);l.next=15;break;case 13:l.prev=13,l.t0=l["catch"](1);case 15:return l.prev=15,--i.count,l.finish(15);case 18:case"end":return l.stop()}}),l,null,[[1,13,15,18]])})))()},getallinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.mall.length>0)){e.next=13;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.errmall=[],t.indexs=1,e.next=8,Object(o["c"])(t.mall,t.getTableData);case 8:t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1,e.next=14;break;case 13:t.$message({message:"请先选择店铺",type:"warning"});case 14:case"end":return e.stop()}}),e)})))()},viewDetails:function(t){var e={type:"itemDetail",shopId:t.mallid,id:t.productid};this.$BaseUtilService.getOrderDetailInfo(t.mallid,JSON.stringify(e))}}},d=r,c=(a("c723"),a("2877")),u=Object(c["a"])(d,l,i,!1,null,"82ae2e3e",null);e["default"]=u.exports},"4c28":function(t,e,a){},8992:function(t,e,a){"use strict";a("4c28")},c723:function(t,e,a){"use strict";a("d0125")},d0125:function(t,e,a){},feb6:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:""},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"",size:"mini",filterable:""},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{placeholder:"",multiple:"","collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isShowName?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,l){return t.showMall(e,l)?a("el-option",{key:l,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary"},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},i=[],s=a("1da1"),n=a("2909"),o=(a("96cf"),a("99af"),a("d81d"),a("fb6a"),a("d3b7"),a("25f0"),a("159b"),a("c740"),a("7db0"),a("4de4"),a("caad"),a("2532"),a("7646")),r=a("2b0e");r["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var d={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new o["a"](this),isShowName:"",showMallNumber:100,mallShowIndex:0}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isAllowSet2=!1;var l=e.indexOf("")>-1,i=t.indexOf("")>-1;l!==i?this.groupId=i?[""].concat(Object(n["a"])(this.groupIdList.map((function(t){return t.id})))):[]:i?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var l=e.indexOf("")>-1,i=t.indexOf("")>-1;l!==i?this.site=i?[""].concat(Object(n["a"])(this.siteList.map((function(t){return t.platform_mall_id})))):[]:i?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length&&this.site.unshift(""),setTimeout((function(){a.changeMallList(),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,l,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.site=[],a=e.countryVal,l=e.groupId.indexOf("")>-1&&e.groupId.slice(1).toString()||e.groupId.toString(),i={country:a,mallGroupIds:l},t.next=6,e.mallListAPIInstance.ddMallGoodsGetMallList(i);case 6:s=t.sent,200===s.code?(e.siteList=s.data,0===e.groupIdList.length&&(e.groupId=[""],e.siteList.forEach((function(t){var a=e.groupIdList.findIndex((function(e){return e.id===t.group_id}));t.group_name&&a<0&&(e.groupIdList.push({group_name:t.group_name,id:t.group_id}),e.groupId.push(t.group_id))}))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=[""]}),10)):e.$message.error("获取分组、店铺列表失败");case 8:case"end":return t.stop()}}),t)})))()},changeMallList:function(){var t=this,e=[],a="";this.site.forEach((function(l){if(l){var i=t.siteList.find((function(t){return t.platform_mall_id===l}));e.push(i),a+=l+","}})),!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){this.isShowName=t||"";var e=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}));this.showMallNumber=e.length-this.showMallNumber;var a=this.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return!a.includes(t)}));this.siteShowList=[].concat(Object(n["a"])(e),Object(n["a"])(a))},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,l=this.site[0]===t.platform_mall_id;return l||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length&&a||this.mallShowIndex):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},c=d,u=(a("8992"),a("2877")),p=Object(u["a"])(c,l,i,!1,null,null,null);e["a"]=p.exports}}]);