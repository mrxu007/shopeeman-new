(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c0ad88cc"],{"0c34":function(t,e,a){},"232c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("storeChoose",{attrs:{"span-width":"80px",source:"true"},on:{changeMallList:t.changeMallList}}),a("ul",{staticStyle:{"margin-top":"10px"}},[a("li",{staticStyle:{"margin-left":"42px"}},[a("span",[t._v("类型：")]),a("el-select",{staticClass:"seltype",attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typelist,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("资料期间：")]),a("el-date-picker",{staticStyle:{width:"150px"},attrs:{size:"mini",type:"date",placeholder:"选择日期"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),a("li",{staticStyle:{"margin-left":"50px"}},[a("el-button",{attrs:{type:"primary",loading:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1),a("li",{staticStyle:{"margin-left":"10px"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clearLog}},[t._v("清除日志")])],1),a("li",[a("el-checkbox",{model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}},[t._v("隐藏日志")])],1)]),a("br"),a("div",{staticClass:"logging"},[a("Logs",{ref:"Logs",attrs:{clear:""},model:{value:t.showlog,callback:function(e){t.showlog=e},expression:"showlog"}})],1),a("div",{staticStyle:{"margin-left":"15px","margin-bottom":"10px"}},[1e4===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义：与之前7天相比，这些产品的销售额在过去7天内下降了30%或更多的产品")]):t._e(),10002===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去7天内收到过两星及以下评价的产品")]):t._e(),10003===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去45天内有2单及以上的订单申请退货或者退货率在10%及以上的产品")]):t._e(),10004===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去15天内有10单及以上的订单逾期发货或者逾期发货率在5%及以上的产品")]):t._e(),10006===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:在过去7天中，商品转化率(浏览-确定)低于相同二级分类商品中位数。商品转化率(浏览-确定)=已确定订单的买家数除以访客总数")]):t._e(),10007===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:和上一个7天相比，商品浏览量在过去7天中下降了50%以上")]):t._e(),10008===t.type?a("span",{staticStyle:{color:"red"}},[t._v("类型定义:由于卖家取消或是商品未成功出货，在过去7天内造成订单取消数量高于2或订单取消率高于5%")]):t._e()])],1),a("el-row",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"序列号",width:"80",type:"index"}}),a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"180",prop:"mallname"}}),t._e(),a("el-table-column",{attrs:{align:"center",prop:"type",label:"类型",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"productid",label:"商品ID",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[a("i",{staticClass:"el-icon-document-copy copyStyle",on:{click:function(e){return t.copy(i.productid)}}}),a("span",{staticClass:"tableActive",on:{click:function(e){return t.open(i)}}},[t._v(t._s(i.productid))])])]}}])}),a("el-table-column",{attrs:{prop:"img",label:"商品图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[i.img?a("el-tooltip",{staticStyle:{width:"50px",height:"50px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:i.img,width:"300px",height:"300px"}})]),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:i.img}})],1):t._e()]}}])}),a("el-table-column",{attrs:{prop:"title",label:"商品标题",width:"400",align:"center"}}),1e4===t.type?a("el-table-column",{attrs:{prop:"d2",label:"销售额("+t.time1+"-"+t.time2+")",width:"180",align:"center"}}):t._e(),1e4===t.type?a("el-table-column",{attrs:{prop:"d3",label:"销售额("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10002===t.type?a("el-table-column",{attrs:{prop:"d2",label:"总评论("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10002===t.type?a("el-table-column",{attrs:{prop:"d3",label:"差评("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10003===t.type?a("el-table-column",{attrs:{prop:"d2",label:"退货申请("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10003===t.type?a("el-table-column",{attrs:{prop:"d3",label:"退货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10004===t.type?a("el-table-column",{attrs:{prop:"d3",label:"高逾期出货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10004===t.type?a("el-table-column",{attrs:{prop:"d2",label:"逾期出货订单数("+t.time2+"-"+t.time3+")",width:"200",align:"center"}}):t._e(),10008===t.type?a("el-table-column",{attrs:{prop:"d3",label:"订单取消率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10008===t.type?a("el-table-column",{attrs:{prop:"d2",label:"已取消的订单数("+t.time2+"-"+t.time3+")",width:"220",align:"center"}}):t._e(),10006===t.type?a("el-table-column",{attrs:{prop:"d3",label:"转化率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),10006===t.type?a("el-table-column",{attrs:{prop:"d2",label:"访客数("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),10007===t.type?a("el-table-column",{attrs:{prop:"d2",label:"逾期出货订单数("+t.time1+"-"+t.time2+")",width:"200",align:"center"}}):t._e(),10007===t.type?a("el-table-column",{attrs:{prop:"d3",label:"逾期出货率("+t.time2+"-"+t.time3+")",width:"180",align:"center"}}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"pcnew_followers",label:"操作",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.viewDetails(i)}}},[t._v("编辑")])]}}])})],1)],1)],1)},l=[],s=a("1da1"),n=(a("96cf"),a("99af"),a("feb6")),o=a("0e0b"),r={components:{storeChoose:n["a"]},data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,showlog:!0,exportdata:[],type:1e4,indexs:1,typelist:[{value:1e4,label:"销售额下降"},{value:10002,label:"差评"},{value:10003,label:"高退货率"},{value:10004,label:"高逾期出货率"},{value:10006,label:"低转化率"},{value:10007,label:"低浏览量"},{value:10008,label:"高卖家取消率"}],time:(new Date).getTime(),time1:(new Date).getTime()-12096e5,time2:(new Date).getTime()-6048e5,time3:(new Date).getTime(),allgroupid:[],errmall:[],allmallid:[],tableData:[],total:0,Statisticaltime:"yesterday",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:1634659200,end_time:1634695200,returnStatisticaltime:[{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}]}},watch:{type:function(t,e){this.getallinfo()}},mounted:function(){this.time1=this.$dayjs(this.time1).format("MM/DD"),this.time2=this.$dayjs(this.time2).format("MM/DD"),this.time3=this.$dayjs(this.time3).format("MM/DD")},methods:{open:function(t){window.BaseUtilBridgeService.openUrl("https://xiapi.xiapibuy.com/product/"+t.mallid+"/"+t.productid)},copy:function(t){var e=document.createElement("div");e.id="tempTarget",e.style.opacity="0",e.innerText=t,document.body.appendChild(e);try{var a=document.createRange();a.selectNode(e),window.getSelection().removeAllRanges(),window.getSelection().addRange(a),document.execCommand("copy"),window.getSelection().removeAllRanges(),this.$message.success("复制成功")}catch(i){}e.parentElement.removeChild(e)},clearLog:function(){this.$refs.Logs.consoleMsg=""},changeMallList:function(t){this.site=t.country,this.mall=t.mallList},getTableData:function(t){var e=arguments,a=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var l,s,n,o,r,c,d,u,p,m,h,f,g,b,y,w,_,v;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:for(l=e.length>1&&void 0!==e[1]?e[1]:{count:1},i.prev=1,s=a.$dayjs(a.time).format("YYYYMMDD"),n=t.mall_alias_name||t.platform_mall_name,o={metric_id:a.type,mallId:t.platform_mall_id,dt:s,country:a.site,shopid:t.platform_mall_id,page_num:1,page_size:20},c=0;c<a.typelist.length;c++)a.typelist[c].value===a.type&&(r=a.typelist[c].label);return console.log("this is my parmas",o),i.next=9,a.$shopeemanService.getdiagnosis(a.site,o,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 9:if(d=i.sent,d&&(u=JSON.parse(d)),200===u.status){if(a.$refs.Logs.writeLog("【".concat(n,"】 查询 【").concat(r,"】 数据 成功"),!0),u.data=JSON.parse(u.data),console.log("ces",u.data.data.list),a.$refs.Logs.writeLog("【".concat(n,"】店铺数据【").concat(u.data.data.list.length,"】条"),!0),1e4===a.type&&u.data.data.list)for(p=0;p<u.data.data.list.length;p++)m={},m["index"]=a.indexs,a.indexs++,m["mallname"]=n,m["mallid"]=t.platform_mall_id,m["type"]=r,m["productid"]=u.data.data.list[p].itemid,m["img"]=u.data.data.list[p].image,m["title"]=u.data.data.list[p].title,m["d2"]="".concat(a.$filters.siteCoin(a.site)).concat(u.data.data.list[p].d1),m["d3"]="".concat(a.$filters.siteCoin(a.site)).concat(u.data.data.list[p].d2," ").concat(u.data.data.list[p].d3,"%"),a.tableData.push(m);else if(10002===a.type&&u.data.data.list)for(h=0;h<u.data.data.list.length;h++)f={},f["index"]=a.indexs,a.indexs++,f["mallname"]=n,f["mallid"]=t.platform_mall_name,f["type"]=r,f["productid"]=u.data.data.list[h].itemid,f["img"]=u.data.data.list[h].image,f["title"]=u.data.data.list[h].title,f["d2"]=u.data.data.list[h].d1,f["d3"]=u.data.data.list[h].d2,a.tableData.push(f);else if(10008===a.type||10006===a.type&&u.data.data.list)for(g=0;g<u.data.data.list.length;g++)b={},b["index"]=a.indexs,a.indexs++,b["mallname"]=n,b["mallid"]=t.platform_mall_name,b["type"]=r,b["productid"]=u.data.data.list[g].itemid,b["img"]=u.data.data.list[g].image,b["title"]=u.data.data.list[g].title,b["d2"]=u.data.data.list[g].d1,b["d3"]=u.data.data.list[g].d3+"%",a.tableData.push(b);else if(10007===a.type&&u.data.data.list)for(y=0;y<u.data.data.list.length;y++)w={},w["index"]=a.indexs,a.indexs++,w["mallname"]=n,w["mallid"]=t.platform_mall_name,w["type"]=r,w["productid"]=u.data.data.list[y].itemid,w["img"]=u.data.data.list[y].image,w["title"]=u.data.data.list[y].title,w["d2"]="".concat(u.data.data.list[y].d1),w["d3"]="".concat(u.data.data.list[y].d2," ").concat(u.data.data.list[y].d3,"%"),a.tableData.push(w);else if(u.data.data.list)for(_=0;_<u.data.data.list.length;_++)v={},v["index"]=a.indexs,a.indexs++,v["mallname"]=n,v["mallid"]=t.platform_mall_name,v["type"]=r,v["productid"]=u.data.data.list[_].itemid,v["img"]=u.data.data.list[_].image,v["title"]=u.data.data.list[_].title,v["d2"]=u.data.data.list[_].d2,v["d3"]=u.data.data.list[_].d3+"%",a.tableData.push(v)}else a.$refs.Logs.writeLog("【".concat(n,"】 查询 【").concat(r,"】 数据 异常：店铺未登录"),!1),a.errmall.push(n);i.next=17;break;case 14:i.prev=14,i.t0=i["catch"](1),console.log(i.t0);case 17:return i.prev=17,--l.count,i.finish(17);case 20:case"end":return i.stop()}}),i,null,[[1,14,17,20]])})))()},getallinfo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showlog=!1,t.$refs.Logs.writeLog("正在查询,请耐心等待",!0),!(t.mall.length>0)){e.next=14;break}return t.Loading1=!0,t.Loading3=!0,t.tableData=[],t.indexs=1,e.next=9,Object(o["d"])(t.mall,t.getTableData);case 9:t.Loading1=!1,t.Loading3=!1,t.$refs.Logs.writeLog("查询完毕",!0),e.next=15;break;case 14:t.$message({message:"请先选择店铺",type:"warning"});case 15:case"end":return e.stop()}}),e)})))()},viewDetails:function(t){var e={type:"itemDetail",shopId:t.mallid,id:t.productid};this.$BaseUtilService.getOrderDetailInfo(t.mallid,JSON.stringify(e))}}},c=r,d=(a("85cab"),a("2877")),u=Object(d["a"])(c,i,l,!1,null,"2d472a42",null);e["default"]=u.exports},"4c28":function(t,e,a){},"85cab":function(t,e,a){"use strict";a("0c34")},8992:function(t,e,a){"use strict";a("4c28")},feb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"storeChooseUL"},[t.isMall?a("li",[t._v(t._s(t._f("chineseSite")(t.countryVal)))]):a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("所属站点：")]),a("el-select",{staticClass:"siteSelectBox",attrs:{size:"mini",filterable:"",disabled:t.isBanPerform},model:{value:t.countryVal,callback:function(e){t.countryVal=e},expression:"countryVal"}},[t.isAll?a("el-option",{attrs:{label:"全部",value:""}}):t._e(),t._l(t.countries,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺分组：")]),a("el-select",{staticClass:"selectBox",attrs:{disabled:t.isBanPerform,multiple:"","collapse-tags":"",filterable:"",size:"mini"},model:{value:t.groupId,callback:function(e){t.groupId=e},expression:"groupId"}},t._l(t.groupIdList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.group_name,value:t.id}})})),1)],1),a("li",{style:t.isReset&&"margin-bottom: 5px"},[a("span",{style:{width:t.spanWidth}},[t._v("店铺名称：")]),a("el-select",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadmoreMall,expression:"loadmoreMall"}],staticClass:"selectBox",attrs:{disabled:t.isBanPerform,placeholder:"",multiple:!t.isAShop,"collapse-tags":"","filter-method":t.filterMall,size:"mini",filterable:"",clearable:""},on:{"visible-change":function(e){return t.filterMall("")}},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},[t.isAShop?t._e():a("el-option",{attrs:{label:"全部",value:""}}),t._l(t.siteShowList,(function(e,i){return t.showMall(e,i)?a("el-option",{key:i,attrs:{label:e.mall_alias_name||e.platform_mall_name,value:e.platform_mall_id}}):t._e()}))],2)],1),t.isReset?a("li",{staticStyle:{"margin-bottom":"5px","margin-left":"25px"}},[a("el-button",{staticStyle:{"justify-self":"self-end"},attrs:{size:"mini",type:"primary",disabled:t.isBanPerform},on:{click:t.reset}},[t._v("　刷　　新　")])],1):t._e()])])},l=[],s=a("1da1"),n=a("b85c"),o=a("2909"),r=(a("96cf"),a("d81d"),a("fb6a"),a("caad"),a("2532"),a("d3b7"),a("25f0"),a("99af"),a("6062"),a("3ca3"),a("ddb0"),a("4de4"),a("159b"),a("c740"),a("7db0"),a("7646")),c=a("2b0e");c["default"].directive("loadmore",{bind:function(t,e){var a=t.querySelector(".el-select-dropdown .el-select-dropdown__wrap");a.addEventListener("scroll",(function(){this.scrollHeight-this.scrollTop<=this.clientHeight+50?e.value(!0,this):this.scrollTop<30&&e.value(!1,this)}))}});var d={name:"StoreChoose",props:{spanWidth:{type:String,default:"80px"},parentCountry:{type:String,default:"TH"},isMall:{type:Boolean,default:function(){return!1}},isBanPerform:{type:Boolean,default:function(){return!1}},isAll:{type:Boolean,default:function(){return!1}},isReset:{type:Boolean,default:function(){return!1}},source:{type:String,default:function(){return""}},isAShop:{type:Boolean,default:function(){return!1}}},data:function(){return{isAllowSet1:!0,isAllowSet2:!0,countryVal:null,groupId:[],groupIdList:[],site:[],siteList:[],siteShowList:[],countries:this.$filters.countries_option,mallListAPIInstance:new r["a"](this),isShowName:"",isShowNameAll:!1,showMallNumber:100,mallShowIndex:0,jsonMallData:[],filterMallTime:null}},watch:{siteList:function(t){this.siteShowList=t},countryVal:{handler:function(t,e){this.isShowName="",this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},deep:!0},groupId:{handler:function(t,e){var a=this;if(this.isAllowSet2){this.isShowName="",this.isAllowSet2=!1;var i=e.indexOf("")>-1,l=t.indexOf("")>-1;i!==l?this.groupId=l?Object(o["a"])(this.groupIdList.map((function(t){return t.id}))):[]:l?this.groupId=t.slice(1):this.groupIdList.length>0&&this.groupId.length===this.groupIdList.length-1&&this.groupId.unshift(""),setTimeout((function(){a.isAllowSet2=!0,a.ddMallGoodsGetMallList(2)}),10)}},deep:!0},site:{handler:function(t,e){var a=this;if(this.isAllowSet1){this.isAllowSet1=!1;var i=this.isShowName;if(!this.isAShop){var l=e.includes(""),s=t.includes("");if(l!==s||e.toString()===t.toString()&&this.isShowNameAll)if(s&&(!i||i&&!this.isShowNameAll)){var r=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id})))||[""].concat(Object(o["a"])(this.siteList.map((function(t){return t.platform_mall_id})))),c=new Set([].concat(Object(o["a"])(r),Object(o["a"])(e)));this.site=Object(o["a"])(c),this.isShowNameAll=!0,i&&this.siteList.length===this.site.length&&this.site.unshift("")}else{this.isShowNameAll=!1;var d=[];if(i){var u=i&&Object(o["a"])(this.siteShowList.map((function(t){return t.platform_mall_id}))),p=u.length>this.site.length&&this.site||u,m=u.length>this.site.length&&u||this.site;d=new Set(this.site);var h,f=Object(n["a"])(m);try{for(f.s();!(h=f.n()).done;){var g=h.value;p.includes(g)&&d.delete(g)}}catch(b){f.e(b)}finally{f.f()}d.delete("")}this.site=Object(o["a"])(d)}else s?this.site=t.slice(1):this.siteList.length>0&&this.siteList.length===this.site.length?this.site.unshift(""):this.isShowNameAll=!1}setTimeout((function(){a.changeMallList(),a.filterMall(i),a.isAllowSet1=!0}),10)}},deep:!0}},mounted:function(){this.countryVal=this.isMall?this.parentCountry:this.isAll?"":"TH"},methods:{reset:function(){this.isAllowSet2=!1,this.groupId=[],this.groupIdList=[],this.ddMallGoodsGetMallList(1)},ddMallGoodsGetMallList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var i,l,s,n,r,c,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.site=[],i=e.countryVal,l=[],!(e.jsonMallData.length>0)){a.next=7;break}l=e.jsonMallData,a.next=12;break;case 7:return a.next=9,e.$appConfig.temporaryCacheInfo("get","mallAllData","");case 9:s=a.sent,l=JSON.parse(s)||[],e.jsonMallData=JSON.parse(s)||[];case 12:if(!(l.length>0)){a.next=17;break}1===t&&(e.siteList=""===i?l:l.filter((function(t){return t.country===i}))),2===t&&(0===e.groupId.length?e.siteList=[]:(e.siteList=[],e.groupId.forEach((function(t){l.forEach((function(a){i?t===a.group_id&&i===a.country&&e.siteList.push(a):t===a.group_id&&e.siteList.push(a)}))})))),a.next=22;break;case 17:return n={country:"",mallGroupIds:""},a.next=20,e.mallListAPIInstance.ddMallGoodsGetMallList(n);case 20:r=a.sent,200===r.code?(e.$appConfig.temporaryCacheInfo("save","mallAllData",r.data),c=r.data||[],e.siteList=c,e.jsonMallData=c,e.siteList=""===i?c:c.filter((function(t){return t.country===i}))):e.$message.error("获取分组、店铺列表失败");case 22:d=[],0===e.groupIdList.length&&(e.groupIdList=[{group_name:"全部",id:""}],e.siteList.forEach((function(t){var e=d.findIndex((function(e){return e&&e.id===t.group_id}));t.group_name&&e<0&&d.push({group_name:t.group_name,id:t.group_id})})),d.zzSort("id"),e.groupIdList=[].concat(Object(o["a"])(e.groupIdList),d),e.groupId=[""].concat(Object(o["a"])(d.map((function(t){return t.id}))))),setTimeout((function(){e.isAllowSet2=!0,e.isAllowSet1=!0,e.site=!e.isAShop&&[""]||""}),10);case 25:case"end":return a.stop()}}),a)})))()},changeMallList:function(){var t=this,e=[],a="";if(this.isAShop){var i=this.siteList.find((function(e){return e.platform_mall_id===t.site}));a=this.site,e.push(i)}else this.site.forEach((function(i){if(i){var l=t.siteList.find((function(t){return t.platform_mall_id===i}));e.push(l),a+=i+","}}));!this.countryVal&&this.groupId.indexOf("")>-1&&(a=e.length!==this.siteList.length&&a||""),this.source?this.$emit("changeMallList",{mallList:e,source:this.source,searchAll:a,country:this.countryVal.toLocaleUpperCase()}):(e["country"]=this.countryVal,this.$emit("changeMallList",e))},filterMall:function(t){var e=this,a=t&&this.isShowName!==t?1e3:100;this.filterMallTime&&(clearTimeout(this.filterMallTime),this.filterMallTime=null),this.filterMallTime=setTimeout((function(){e.isShowName!==t&&(e.mallShowIndex=0),e.isShowName=t||"";var a=e.siteList;t&&(a=e.siteList.filter((function(e){var a=e.mall_alias_name||e.platform_mall_name;return a.includes(t)}))),e.siteShowList=a}),a)},showMall:function(t,e){var a=t.mall_alias_name||t.platform_mall_name,i=this.site[0]===t.platform_mall_id;return i||this.mallShowIndex<=e&&e<=this.mallShowIndex+this.showMallNumber&&(!this.isShowName||a.includes(this.isShowName))},loadmoreMall:function(t,e){if(this.siteShowList.length>this.showMallNumber){var a=0;t?(a=this.mallShowIndex+10,a=a<this.siteShowList.length-this.showMallNumber&&a||this.siteShowList.length-this.showMallNumber):(a=this.mallShowIndex-10,a=a>0&&a||0),a!==this.mallShowIndex&&(e.scrollTop=t?e.scrollTop-100:30),this.mallShowIndex=a}}}},u=d,p=(a("8992"),a("2877")),m=Object(p["a"])(u,i,l,!1,null,null,null);e["a"]=m.exports}}]);